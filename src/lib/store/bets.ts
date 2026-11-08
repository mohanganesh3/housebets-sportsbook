import { create } from "zustand";
import { matchById } from "../seed";
import type { Bet, SlipSelection } from "../types";

let n = 100;
const mkBet = (s: SlipSelection): Bet => ({
  id: `HB-${++n}`,
  placedAt: Date.now(),
  matchId: s.matchId,
  pick: s.pick,
  marketName: s.marketName,
  odds: s.livePrice,
  stake: parseFloat(s.stake) || 0,
  returns: +((parseFloat(s.stake) || 0) * s.livePrice).toFixed(2),
  result: "open",
  cashout: {
    value: +(
      (parseFloat(s.stake) || 0) *
      s.livePrice *
      (0.55 + Math.random() * 0.3)
    ).toFixed(2),
    status: "available",
  },
});

const seedHistory: Bet[] = [
  {
    id: "HB-087",
    placedAt: Date.now() - 86400000,
    matchId: "juv-rom",
    pick: "Draw",
    marketName: "Match result",
    odds: 3.4,
    stake: 10,
    returns: 34,
    result: "won",
    settledNote: "Settled · FT 1-1",
  },
  {
    id: "HB-082",
    placedAt: Date.now() - 172800000,
    matchId: "nap-mil",
    pick: "Milan",
    marketName: "Match result",
    odds: 2.9,
    stake: 15,
    returns: 43.5,
    result: "lost",
    settledNote: "Settled · FT 2-0",
  },
  {
    id: "HB-075",
    placedAt: Date.now() - 259200000,
    matchId: "atm-sev",
    pick: "Over 2.5",
    marketName: "Total goals",
    odds: 2.1,
    stake: 20,
    returns: 42,
    result: "won",
    cashout: undefined,
    settledNote: "Cashed out · +38.40 USDT",
  },
];

interface BetsState {
  bets: Bet[];
  addBets: (sel: SlipSelection[]) => void;
  cashOut: (id: string) => void;
  suspendCashout: (matchId: string) => void;
  resumeCashout: (matchId: string) => void;
}

export const useBets = create<BetsState>()((set) => ({
  bets: seedHistory,
  addBets: (sel) =>
    set((s) => ({ bets: [...sel.map(mkBet).reverse(), ...s.bets] })),
  cashOut: (id) =>
    set((s) => ({
      bets: s.bets.map((b) =>
        b.id === id && b.cashout?.status === "available"
          ? {
              ...b,
              result: "won",
              settledNote: `Cashed out · +${b.cashout.value.toFixed(2)} USDT`,
              returns: b.cashout.value,
              cashout: undefined,
            }
          : b,
      ),
    })),
  suspendCashout: (matchId) =>
    set((s) => ({
      bets: s.bets.map((b) =>
        b.matchId === matchId && b.cashout
          ? { ...b, cashout: { ...b.cashout, status: "suspended" } }
          : b,
      ),
    })),
  resumeCashout: (matchId) =>
    set((s) => ({
      bets: s.bets.map((b) =>
        b.matchId === matchId && b.cashout?.status === "suspended"
          ? { ...b, cashout: { ...b.cashout, status: "available" } }
          : b,
      ),
    })),
}));

export { matchById };
