import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { MATCHES } from "../seed";
import type { MarketStatus, Match } from "../types";
import { useBets } from "./bets";
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
  goalFlash: (matchId: string) => void;
  bumpMinute: (matchId: string) => void;
  advance: (matchId: string) => void;
  kickoff: (matchId: string) => void;
}

export const useWorld = create<WorldState>()(
  subscribeWithSelector((set, get) => ({
    matches: MATCHES,
    goalFlashes: {},
    suspReasons: {},
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
    advance: (matchId) =>
      set((s) => ({
        matches: s.matches.map((mt) => {
          if (mt.id !== matchId || mt.status !== "live") return mt;
          // HT break ends → second half resumes
          if (mt.period === "HT" && mt.minute == null)
            return { ...mt, period: "2nd half", minute: 46 };
          if (mt.minute == null) return mt;
          // full time: markets close, open h2h bets settle
          if (mt.minute >= 90) {
            useBets.getState().settleMatch(mt.id, mt.score.home, mt.score.away);
            return {
              ...mt,
              status: "finished",
              period: "FT",
              markets: mt.markets.map((mk) => ({ ...mk, status: "suspended" })),
            };
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
    const { matches, advance, kickoff } = useWorld.getState();
    const now = Date.now();
    for (const mt of matches) {
      if (mt.status === "live") advance(mt.id);
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
