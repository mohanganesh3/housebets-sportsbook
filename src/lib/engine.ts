import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { liveMatches, outcomeById } from "./seed";
import type { OddsDir } from "./types";

// Deterministic PRNG
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(0x5eeded);

export type EngineEventKind =
  | "odds-change"
  | "goal"
  | "suspend"
  | "resume"
  | "minute";
export interface EngineEvent {
  kind: EngineEventKind;
  at: number;
  matchId: string;
  outcomeId?: string;
  marketId?: string;
  prevPrice?: number;
  newPrice?: number;
  delta?: number;
  dir?: OddsDir;
  scorer?: string;
  newScore?: [number, number];
  resumeDelay?: number;
  reason?: string;
}

interface EngineState {
  events: EngineEvent[];
  started: boolean;
  feed: EngineEvent[];
  pushEvent: (e: EngineEvent) => void;
  start: () => void;
  stop: () => void;
}

let timer: ReturnType<typeof setTimeout> | null = null;

// Script: odds drift on live matches, one market suspend/resume cycle, one goal.
function buildScript(): EngineEvent[] {
  const evs: EngineEvent[] = [];
  const live = liveMatches();
  let t = 5_000;
  // ambient odds ticks every ~6-9s
  for (let i = 0; i < 40; i++) {
    const mt = live[Math.floor(rand() * live.length)];
    const open = mt.markets.filter((mk) => mk.status === "open");
    const mk = open[Math.floor(rand() * open.length)];
    const oc = mk.outcomes[Math.floor(rand() * mk.outcomes.length)];
    // carry a signed delta — the walk applies to the *current* price at
    // fire time, so ticks drift instead of ping-ponging the seed
    const dir = rand() > 0.5 ? 1 : -1;
    const delta = +(dir * (0.02 + rand() * 0.12)).toFixed(2);
    evs.push({
      kind: "odds-change",
      at: t,
      matchId: mt.id,
      marketId: mk.id,
      outcomeId: oc.id,
      dir: (dir > 0 ? "up" : "down") as OddsDir,
      delta,
    });
    t += 6000 + Math.floor(rand() * 4000);
  }
  // suspensions around minute marks
  evs.push({
    kind: "suspend",
    at: 32_000,
    matchId: "ars-bha",
    marketId: "ars-bha-h2h",
    resumeDelay: 16_000,
  });
  evs.push({
    kind: "goal",
    at: 55_000,
    matchId: "ars-bha",
    scorer: "R. Ashworth",
    newScore: [2, 0],
  });
  evs.push({
    kind: "goal",
    at: 118_000,
    matchId: "new-eve",
    scorer: "D. Santana",
    newScore: [2, 2],
  });
  return evs.sort((a, b) => a.at - b.at);
}

export const useEngine = create<EngineState>()(
  subscribeWithSelector((set, get) => ({
    events: [],
    started: false,
    feed: [],
    pushEvent: (e) => {
      set((s) => ({ feed: [...s.feed.slice(-49), e] }));
      applyEvent(e);
    },
    start: () => {
      if (get().started || timer) return;
      set({ started: true, events: buildScript() });
      let idx = 0;
      const t0 = Date.now();
      const tick = () => {
        const evs = get().events;
        while (idx < evs.length && evs[idx].at <= Date.now() - t0) {
          get().pushEvent(evs[idx]);
          idx++;
        }
        timer = setTimeout(tick, 500);
      };
      tick();
    },
    stop: () => {
      if (timer) clearTimeout(timer);
      timer = null;
    },
  })),
);

// Apply an engine event to the world — mutates seed data + notifies stores.
import { useBets } from "./store/bets";
import { useOdds } from "./store/odds";
import { useSlip } from "./store/slip";
import { useUI } from "./store/ui";
import { useWorld } from "./store/world";

// feed events never touch a finished match — FT is terminal, nothing
// reopens or reprices after the whistle
const isLive = (matchId: string) =>
  useWorld.getState().matches.find((m) => m.id === matchId)?.status === "live";

// keep the book honest: implied probs should sum near a real overround
// (~6.5%). A 1.01 favourite whose siblings still imply 25% is a
// bookmaker red flag — stretch the long shots instead.
function normalizeBook(matchId: string, marketId: string) {
  const mt = useWorld.getState().matches.find((m) => m.id === matchId);
  const mk = mt?.markets.find((x) => x.id === marketId);
  if (mt?.status !== "live" || !mk) return;
  const TARGET = 1.065;
  const floor = (p: number) => Math.min(501, Math.max(1.01, +p.toFixed(2)));
  const seed = mk.outcomes.map(
    (o) => useOdds.getState().price(o.id) ?? o.price,
  );
  const implied = seed.reduce((a, p) => a + 1 / p, 0);
  if (implied <= TARGET + 0.02) return;
  const cur = [...seed];
  for (let pass = 0; pass < 3; pass++) {
    const imp = cur.reduce((a, p) => a + 1 / p, 0);
    if (imp <= TARGET + 0.005) break;
    const fixedImp = cur
      .filter((p) => p <= 1.02)
      .reduce((a, p) => a + 1 / p, 0);
    const freeImp = TARGET - fixedImp;
    const curFreeImp = imp - fixedImp;
    if (freeImp <= 0.02 || curFreeImp <= 0) break;
    const k = curFreeImp / freeImp;
    for (let i = 0; i < cur.length; i++)
      if (cur[i] > 1.02) cur[i] = floor(cur[i] * k);
  }
  mk.outcomes.forEach((o, i) => {
    if (cur[i] !== seed[i]) {
      useOdds
        .getState()
        .applyChange(o.id, cur[i], cur[i] > seed[i] ? "up" : "down");
      useSlip.getState().onOddsChange(o.id, cur[i]);
      useBets.getState().tickCashout(o.id, cur[i]);
    }
  });
}

function applyEvent(e: EngineEvent) {
  // offline freezes the whole board — the banner's promise is kept:
  // no ticks, no suspensions, no goals land until reconnect
  if (useUI.getState().offline) return;
  if (!isLive(e.matchId)) return;
  const world = useWorld.getState();
  if (
    e.kind === "odds-change" &&
    e.outcomeId &&
    (e.newPrice != null || e.delta != null)
  ) {
    const found = outcomeById(e.outcomeId);
    if (!found) return;
    const cur = useOdds.getState().price(e.outcomeId) ?? found.outcome.price;
    const np =
      e.newPrice ??
      Math.min(501, Math.max(1.01, +(cur + (e.delta ?? 0)).toFixed(2)));
    if (np === cur) return;
    e.prevPrice = cur;
    e.newPrice = np;
    e.dir = np > cur ? "up" : "down";
    useOdds.getState().applyChange(e.outcomeId, np, e.dir);
    useSlip.getState().onOddsChange(e.outcomeId, np);
    useBets.getState().tickCashout(e.outcomeId, np);
  }
  if (e.kind === "suspend" && e.marketId) {
    const reason = e.reason ?? "Dangerous attack";
    world.setMarketStatus(e.matchId, e.marketId, "suspended", reason);
    useSlip.getState().onMarketSuspended(e.marketId);
    // cash-out locks in lockstep with the market — always
    useBets.getState().suspendCashout(e.matchId);
    useUI.getState().toast(`Market suspended · ${reason}`, "info");
    if (e.resumeDelay) {
      setTimeout(() => {
        // the match may have gone FT inside the delay — never resurrect
        if (!isLive(e.matchId)) return;
        useWorld.getState().setMarketStatus(e.matchId, e.marketId!, "open");
        useSlip.getState().onMarketResumed(e.marketId!);
        useBets.getState().resumeCashout(e.matchId);
        useUI.getState().toast("Market reopened · prices live again", "info");
      }, e.resumeDelay);
    }
  }
  if (e.kind === "goal" && e.newScore) {
    // trader sequence: score lands → a beat → every open market suspends →
    // reprices → reopens. Cash-out locks for the whole window.
    const prev = useWorld
      .getState()
      .matches.find((m) => m.id === e.matchId)?.score;
    const homeScored = prev ? e.newScore[0] > prev.home : true;
    world.setScore(e.matchId, e.newScore);
    world.goalFlash(e.matchId);
    useBets.getState().suspendCashout(e.matchId);
    useUI
      .getState()
      .toast(
        `GOAL ${e.newScore[0]}-${e.newScore[1]}${e.scorer ? ` · ${e.scorer}` : ""} — markets suspended, repricing`,
        "success",
      );
    setTimeout(() => {
      const mt = useWorld.getState().matches.find((m) => m.id === e.matchId);
      if (mt?.status !== "live") return;
      const open = mt.markets.filter((mk) => mk.status === "open");
      // remember which markets THIS cascade closed — trader suspensions
      // that predate the goal stay closed when we reopen
      const closedByGoal = new Set(open.map((mk) => mk.id));
      for (const mk of open) {
        useWorld
          .getState()
          .setMarketStatus(e.matchId, mk.id, "suspended", "Goal");
        useSlip.getState().onMarketSuspended(mk.id);
      }
      setTimeout(() => {
        const mt2 = useWorld.getState().matches.find((m) => m.id === e.matchId);
        if (mt2?.status !== "live") return;
        // reprice h2h toward the scoring side before reopening
        const h2h = mt2.markets.find((mk) => mk.key === "h2h");
        if (h2h) {
          for (const oc of h2h.outcomes) {
            const isScorer =
              (oc.name === mt2.home.name && homeScored) ||
              (oc.name === mt2.away.name && !homeScored);
            // reprice from the CURRENT price, not the seed — prior ticks
            // may have already moved it
            const cur = useOdds.getState().price(oc.id) ?? oc.price;
            const np = isScorer
              ? Math.max(1.01, +(cur * 0.72).toFixed(2))
              : oc.name === "Draw"
                ? +(cur * 1.15).toFixed(2)
                : +(cur * 1.4).toFixed(2);
            useOdds.getState().applyChange(oc.id, np, np > cur ? "up" : "down");
            useSlip.getState().onOddsChange(oc.id, np);
            useBets.getState().tickCashout(oc.id, np);
          }
          // raw multipliers skew the overround after big swings —
          // stretch the long shots back to a realistic book
          normalizeBook(e.matchId, h2h.id);
        }
        for (const mk of mt2.markets.filter(
          (m) => m.status === "suspended" && closedByGoal.has(m.id),
        )) {
          useWorld.getState().setMarketStatus(e.matchId, mk.id, "open");
          useSlip.getState().onMarketResumed(mk.id);
        }
        useBets.getState().resumeCashout(e.matchId);
      }, 8_000);
    }, 600);
  }
  if (e.kind === "minute") world.bumpMinute(e.matchId);
}
