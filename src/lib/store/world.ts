import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { MATCHES } from "../seed";
import type { MarketStatus, Match } from "../types";

interface WorldState {
  matches: Match[];
  goalFlashes: Record<string, number>;
  suspReasons: Record<string, string>;
  setMarketStatus: (
    matchId: string,
    marketId: string,
    status: MarketStatus,
    reason?: string,
  ) => void;
  setScore: (matchId: string, score: [number, number]) => void;
  goalFlash: (matchId: string) => void;
  bumpMinute: (matchId: string) => void;
  kickoff: (matchId: string) => void;
}

export const useWorld = create<WorldState>()(
  subscribeWithSelector((set) => ({
    matches: MATCHES,
    goalFlashes: {},
    suspReasons: {},
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
    goalFlash: (matchId) =>
      set((s) => ({
        goalFlashes: { ...s.goalFlashes, [matchId]: Date.now() },
      })),
    bumpMinute: (matchId) =>
      set((s) => ({
        matches: s.matches.map((mt) =>
          mt.id === matchId && mt.minute != null
            ? { ...mt, minute: mt.minute + 1 }
            : mt,
        ),
      })),
    kickoff: (matchId) =>
      set((s) => ({
        matches: s.matches.map((mt) =>
          mt.id === matchId && mt.status === "scheduled"
            ? { ...mt, status: "live", minute: 1, period: "1st half" }
            : mt,
        ),
      })),
  })),
);

// Clock tick: advance live minutes every 60s (demo: every 30s); flip scheduled
// matches to live the moment their kickoff time passes.
if (typeof window !== "undefined") {
  setInterval(() => {
    const { matches, bumpMinute, kickoff } = useWorld.getState();
    const now = Date.now();
    for (const mt of matches) {
      if (mt.status === "live" && mt.minute != null && mt.minute < 90)
        bumpMinute(mt.id);
      if (mt.status === "scheduled" && mt.kickoffAt <= now) kickoff(mt.id);
    }
  }, 30_000);
  // fast pass for kickoff flips so countdowns land crisply
  setInterval(() => {
    const { matches, kickoff } = useWorld.getState();
    const now = Date.now();
    for (const mt of matches)
      if (mt.status === "scheduled" && mt.kickoffAt <= now) kickoff(mt.id);
  }, 1_000);
}
