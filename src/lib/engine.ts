import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { isScoreDerived, SUSP_ATTACK, SUSP_GOAL } from "./matchBook";
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

// S4 cascade timers per fixture — a newer event supersedes mid-cascade:
// pending beats are cancelled, never queued (P4).
const cascades = new Map<string, ReturnType<typeof setTimeout>[]>();
function cancelCascade(matchId: string) {
  for (const t of cascades.get(matchId) ?? []) clearTimeout(t);
  cascades.delete(matchId);
}
function schedule(matchId: string, ms: number, fn: () => void) {
  const t = setTimeout(fn, ms);
  const arr = cascades.get(matchId) ?? [];
  arr.push(t);
  cascades.set(matchId, arr);
}

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
  // suspensions around minute marks — M-07: `Total goals` locks on a
  // dangerous attack, reason chip tells the player why
  evs.push({
    kind: "suspend",
    at: 32_000,
    matchId: "ars-bha",
    marketId: "ars-bha-tg25",
    reason: SUSP_ATTACK,
    resumeDelay: 16_000,
  });
  // M-08: Brighton equalise — the deterministic S4 cascade
  evs.push({
    kind: "goal",
    at: 55_000,
    matchId: "ars-bha",
    scorer: "S. Whitfield",
    newScore: [1, 1],
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
      let ambientAt = 0;
      const tick = () => {
        const evs = get().events;
        while (idx < evs.length && evs[idx].at <= Date.now() - t0) {
          get().pushEvent(evs[idx]);
          idx++;
        }
        // the scripted feed ends ~5min in — keep the board breathing with a
        // low-frequency ambient random walk on whatever is still live
        if (idx >= evs.length) {
          if (ambientAt === 0) ambientAt = Date.now() + 9_000;
          if (Date.now() >= ambientAt) {
            ambientAt = Date.now() + 7_000 + Math.floor(rand() * 9_000);
            const liveNow = useWorld
              .getState()
              .matches.filter((m) => m.status === "live");
            if (liveNow.length && !useUI.getState().offline) {
              const mt = liveNow[Math.floor(rand() * liveNow.length)];
              const open = mt.markets.filter((mk) => mk.status === "open");
              if (open.length) {
                const mk = open[Math.floor(rand() * open.length)];
                const oc = mk.outcomes[Math.floor(rand() * mk.outcomes.length)];
                const dir = rand() > 0.5 ? 1 : -1;
                get().pushEvent({
                  kind: "odds-change",
                  at: Date.now() - t0,
                  matchId: mt.id,
                  marketId: mk.id,
                  outcomeId: oc.id,
                  dir: (dir > 0 ? "up" : "down") as OddsDir,
                  delta: +(dir * (0.02 + rand() * 0.1)).toFixed(2),
                });
              }
            }
          }
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
    const reason = e.reason ?? SUSP_ATTACK;
    world.setMarketStatus(e.matchId, e.marketId, "suspended", reason);
    useSlip.getState().onMarketSuspended(e.marketId);
    // cash-out locks in lockstep with the market — always
    useBets.getState().suspendCashout(e.matchId);
    useUI.getState().toast(`Market suspended · ${reason}`, "info");
    if (e.resumeDelay) {
      setTimeout(() => {
        // the match may have gone FT inside the delay — never resurrect;
        // and a market can't reopen while the board is frozen
        if (!isLive(e.matchId) || useUI.getState().offline) return;
        useWorld.getState().setMarketStatus(e.matchId, e.marketId!, "open");
        useSlip.getState().onMarketResumed(e.marketId!);
        useBets.getState().resumeCashout(e.matchId);
        useUI.getState().toast("Market reopened · prices live again", "info");
      }, e.resumeDelay);
    }
  }
  if (e.kind === "goal" && e.newScore) {
    // S4 goal cascade — the deterministic three-beat arc (M-08/E-M-10):
    //   beat 1  t=0        score rolls, event line types in
    //   beat 2  t≈300ms    scoreboard edge flash + every score-derived
    //                      market locks the same frame (`Suspended —
    //                      goal scored`); corners/cards/minutes stay open
    //   beat 3  t≈700–2500 markets reopen one-by-one in list order,
    //                      prices re-enter as reprice ticks
    // Total ≤2.5s. A newer event supersedes mid-cascade — pending beats
    // for this fixture are cancelled, newest state wins (P4/S4).
    const prev = useWorld
      .getState()
      .matches.find((m) => m.id === e.matchId)?.score;
    const homeScored = prev ? e.newScore[0] > prev.home : true;
    cancelCascade(e.matchId);
    world.setScore(e.matchId, e.newScore);
    useBets.getState().suspendCashout(e.matchId);
    useUI
      .getState()
      .toast(
        `GOAL ${e.newScore[0]}-${e.newScore[1]}${e.scorer ? ` · ${e.scorer}` : ""} — markets suspended, repricing`,
        "success",
      );
    let closedByGoal = new Set<string>();
    // beat 2 — edge flash and the lock land in the same frame
    schedule(e.matchId, 300, () => {
      const mt = useWorld.getState().matches.find((m) => m.id === e.matchId);
      if (mt?.status !== "live" || useUI.getState().offline) return;
      world.goalFlash(e.matchId);
      const open = mt.markets.filter(
        (mk) => mk.status === "open" && isScoreDerived(mk),
      );
      closedByGoal = new Set(open.map((mk) => mk.id));
      for (const mk of open) {
        useWorld
          .getState()
          .setMarketStatus(e.matchId, mk.id, "suspended", SUSP_GOAL);
        useSlip.getState().onMarketSuspended(mk.id);
      }
    });
    // beat 3 — reprice then reopen one-by-one in list order, last beat
    // landing by 2.5s total
    schedule(e.matchId, 700, () => {
      const mt2 = useWorld.getState().matches.find((m) => m.id === e.matchId);
      if (mt2?.status !== "live" || useUI.getState().offline) return;
      const closed = mt2.markets.filter((m) => closedByGoal.has(m.id));
      const h2h = closed.find((mk) => mk.key === "h2h");
      if (h2h) {
        // flagship equaliser reprices to DATA-CANON book (M-08):
        // 1.30→1.44 ▲ · 4.80→4.00 ▼ · 11.00→8.00 ▼ — 1/1.44+1/4+1/8 =
        // 69.44+25.00+12.50 = 106.94% ✓ still in the 103–107 band (F2)
        const canon =
          e.matchId === "ars-bha" &&
          e.newScore?.[0] === 1 &&
          e.newScore?.[1] === 1
            ? [1.44, 4.0, 8.0]
            : null;
        for (const [i, oc] of h2h.outcomes.entries()) {
          const isScorer =
            (oc.name === mt2.home.name && homeScored) ||
            (oc.name === mt2.away.name && !homeScored);
          const cur = useOdds.getState().price(oc.id) ?? oc.price;
          const np = Math.max(
            1.01,
            canon?.[i] ??
              +(
                isScorer
                  ? cur * 0.72
                  : oc.name === "Draw"
                    ? cur * 1.15
                    : cur * 1.4
              ).toFixed(2),
          );
          if (np !== cur) {
            useOdds.getState().applyChange(oc.id, np, np > cur ? "up" : "down");
            useSlip.getState().onOddsChange(oc.id, np);
            useBets.getState().tickCashout(oc.id, np);
          }
        }
        if (!canon) normalizeBook(e.matchId, h2h.id);
      }
      const step = closed.length > 1 ? Math.min(60, 1800 / closed.length) : 0;
      closed.forEach((mk, i) => {
        schedule(e.matchId, i * step, () => {
          const mt3 = useWorld
            .getState()
            .matches.find((m) => m.id === e.matchId);
          if (mt3?.status !== "live" || useUI.getState().offline) return;
          useWorld.getState().setMarketStatus(e.matchId, mk.id, "open");
          useSlip.getState().onMarketResumed(mk.id);
        });
      });
      useBets.getState().resumeCashout(e.matchId);
    });
  }
  if (e.kind === "minute") world.bumpMinute(e.matchId);
}
