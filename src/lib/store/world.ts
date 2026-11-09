import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { MATCHES } from "../seed";
import type { MarketStatus, Match } from "../types";
import { useBets } from "./bets";
import { useSlip } from "./slip";
import { useUI } from "./ui";

interface WorldState {
  matches: Match[];
  goalFlashes: Record<string, number>;
  suspReasons: Record<string, string>;
  liveEmpty: boolean;
  setLiveEmpty: (v: boolean) => void;
  setMarketStatus: (
    matchId: string,
    marketId: string,
    status: MarketStatus,
    reason?: string,
  ) => void;
  setScore: (matchId: string, score: [number, number]) => void;
  setMinute: (matchId: string, minute: number) => void;
  goalFlash: (matchId: string) => void;
  bumpMinute: (matchId: string) => void;
  advance: (matchId: string) => void;
  kickoff: (matchId: string) => void;
}

const htDwell = new Map<string, number>();

export const useWorld = create<WorldState>()(
  subscribeWithSelector((set, get) => ({
    matches: MATCHES,
    goalFlashes: {},
    // seed-suspended markets carry a generic reason — engine suspensions
    // write specific ones via setMarketStatus
    suspReasons: Object.fromEntries(
      MATCHES.flatMap((mt) =>
        mt.markets
          .filter((mk) => mk.status === "suspended")
          .map((mk) => [mk.id, "Suspended by trader"]),
      ),
    ),
    liveEmpty: false,
    setLiveEmpty: (v) => set({ liveEmpty: v }),
    setMarketStatus: (matchId, marketId, status, reason) =>
      set((s) => ({
        suspReasons:
          status === "suspended" && reason
            ? { ...s.suspReasons, [marketId]: reason }
            : status === "open"
              ? Object.fromEntries(
                  Object.entries(s.suspReasons).filter(([k]) => k !== marketId),
                )
              : s.suspReasons,
        matches: s.matches.map((mt) =>
          mt.id !== matchId
            ? mt
            : {
                ...mt,
                markets: mt.markets.map((mk) => {
                  if (mk.id !== marketId) return mk;
                  return {
                    ...mk,
                    status,
                    outcomes: mk.outcomes.map((o) => ({ ...o, status })),
                  };
                }),
              },
        ),
      })),
    setScore: (matchId, [h, a]) =>
      set((s) => ({
        matches: s.matches.map((mt) =>
          mt.id === matchId ? { ...mt, score: { home: h, away: a } } : mt,
        ),
      })),
    setMinute: (matchId, minute) =>
      set((s) => ({
        matches: s.matches.map((mt) =>
          mt.id === matchId && mt.status === "live"
            ? { ...mt, minute, period: "2nd half" }
            : mt,
        ),
      })),
    goalFlash: (matchId) => {
      set((s) => ({
        goalFlashes: { ...s.goalFlashes, [matchId]: Date.now() },
      }));
      // clear after the flash animation so repeat goals re-fire it
      setTimeout(
        () =>
          set((s) => {
            const { [matchId]: _drop, ...rest } = s.goalFlashes;
            return { goalFlashes: rest };
          }),
        4_500,
      );
    },
    bumpMinute: (matchId) =>
      set((s) => ({
        matches: s.matches.map((mt) =>
          mt.id === matchId && mt.minute != null
            ? { ...mt, minute: mt.minute + 1 }
            : mt,
        ),
      })),
    advance: (matchId) =>
      set((s) => ({
        matches: s.matches.map((mt) => {
          if (mt.id !== matchId || mt.status !== "live") return mt;
          // HT break: hold two ticks so the whistle actually reads as a break
          if (mt.period === "HT" && mt.minute == null) {
            const dwell = (htDwell.get(mt.id) ?? 0) + 1;
            htDwell.set(mt.id, dwell);
            if (dwell < 2) return mt;
            htDwell.delete(mt.id);
            return { ...mt, period: "2nd half", minute: 46 };
          }
          if (mt.minute == null) return mt;
          // stoppage time, then full time: markets close, every open bet
          // settles or voids, cash-out locks for good
          if (mt.minute >= 93) {
            useBets.getState().settleMatch(mt.id, mt.score.home, mt.score.away);
            const closed = {
              ...mt,
              status: "finished" as const,
              period: "FT",
              markets: mt.markets.map((mk) => ({
                ...mk,
                status: "suspended" as const,
              })),
            };
            for (const mk of closed.markets) {
              useSlip.getState().onMarketSuspended(mk.id);
            }
            useBets.getState().suspendCashout(mt.id);
            return closed;
          }
          // half time whistle (compressed — demo clock)
          if (mt.minute >= 45 && mt.period === "1st half")
            return { ...mt, period: "HT", minute: null };
          return { ...mt, minute: mt.minute + 1 };
        }),
      })),
    kickoff: (matchId) => {
      const mt = get().matches.find((m) => m.id === matchId);
      set((s) => ({
        matches: s.matches.map((m) =>
          m.id === matchId && m.status === "scheduled"
            ? { ...m, status: "live", minute: 1, period: "1st half" }
            : m,
        ),
      }));
      if (mt) {
        const ui = useUI.getState();
        if (ui.reminds.has(matchId)) {
          ui.toggleRemind(matchId);
          ui.toast(
            `Kickoff · ${mt.home.name} v ${mt.away.name} is live`,
            "success",
          );
        } else {
          ui.toast(`${mt.home.short} v ${mt.away.short} kicked off`, "info");
        }
      }
    },
  })),
);

// Clock tick: advance live minutes every 60s (demo: every 30s); flip scheduled
// matches to live the moment their kickoff time passes.
if (typeof window !== "undefined") {
  setInterval(() => {
    // offline freeze is honest: the whole board — clock included — holds
    if (useUI.getState().offline) return;
    const { matches, advance, kickoff } = useWorld.getState();
    const now = Date.now();
    for (const mt of matches) {
      if (mt.status === "live") advance(mt.id);
      if (mt.status === "scheduled" && mt.kickoffAt <= now) kickoff(mt.id);
    }
  }, 30_000);
  // fast pass for kickoff flips so countdowns land crisply
  setInterval(() => {
    if (useUI.getState().offline) return;
    const { matches, kickoff } = useWorld.getState();
    const now = Date.now();
    for (const mt of matches)
      if (mt.status === "scheduled" && mt.kickoffAt <= now) kickoff(mt.id);
  }, 1_000);
}
