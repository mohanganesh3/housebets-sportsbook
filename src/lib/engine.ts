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
  dir?: OddsDir;
  scorer?: string;
  newScore?: [number, number];
  resumeDelay?: number;
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
    const dir = rand() > 0.5 ? "up" : "down";
    const delta = +(0.02 + rand() * 0.12).toFixed(2);
    const np =
      dir === "up"
        ? +(oc.price + delta).toFixed(2)
        : Math.max(1.01, +(oc.price - delta).toFixed(2));
    evs.push({
      kind: "odds-change",
      at: t,
      matchId: mt.id,
      marketId: mk.id,
      outcomeId: oc.id,
      dir: dir as OddsDir,
      newPrice: np,
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
import { useOdds } from "./store/odds";
import { useSlip } from "./store/slip";
import { useWorld } from "./store/world";

function applyEvent(e: EngineEvent) {
  const world = useWorld.getState();
  if (e.kind === "odds-change" && e.outcomeId && e.newPrice != null) {
    const found = outcomeById(e.outcomeId);
    if (!found) return;
    e.prevPrice = found.outcome.price;
    e.dir = e.newPrice > found.outcome.price ? "up" : "down";
    useOdds.getState().applyChange(e.outcomeId, e.newPrice, e.dir);
    useSlip.getState().onOddsChange(e.outcomeId, e.newPrice);
  }
  if (e.kind === "suspend" && e.marketId) {
    world.setMarketStatus(e.matchId, e.marketId, "suspended");
    useSlip.getState().onMarketSuspended(e.marketId);
    if (e.resumeDelay) {
      setTimeout(() => {
        useWorld.getState().setMarketStatus(e.matchId, e.marketId!, "open");
        useSlip.getState().onMarketResumed(e.marketId!);
      }, e.resumeDelay);
    }
  }
  if (e.kind === "goal" && e.newScore) {
    world.setScore(e.matchId, e.newScore);
    world.goalFlash(e.matchId);
  }
  if (e.kind === "minute") world.bumpMinute(e.matchId);
}
