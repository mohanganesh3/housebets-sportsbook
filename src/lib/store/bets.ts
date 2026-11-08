import { create } from "zustand";
import { matchById } from "../seed";
import type { Bet, SlipSelection } from "../types";

// bet refs avoid 0/O/1/I — Oxanium has no disambiguating zero glyph
const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const mkRef = () =>
  `HB-${Array.from({ length: 3 }, () => REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)]).join("")}`;
const mkBet = (s: SlipSelection): Bet => {
  const stake = parseFloat(s.stake) || 0;
  const factor = +(0.55 + Math.random() * 0.3).toFixed(4);
  const value = +(stake * s.livePrice * factor).toFixed(2);
  return {
    id: mkRef(),
    placedAt: Date.now(),
    matchId: s.matchId,
    marketId: s.marketId,
    outcomeId: s.outcomeId,
    pick: s.pick,
    marketName: s.marketName,
    odds: s.livePrice,
    stake,
    returns: +(stake * s.livePrice).toFixed(2),
    result: "open",
    cashout: { value, was: value, factor, status: "available" },
  };
};

const seedHistory: Bet[] = [
  {
    id: "HB-087",
    placedAt: Date.now() - 86400000,
    matchId: "juv-rom",
    marketId: "juv-rom-h2h",
    outcomeId: "juv-rom-h2h-draw",
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
    marketId: "nap-mil-h2h",
    outcomeId: "nap-mil-h2h-draw",
  },
  {
    id: "HB-075",
    placedAt: Date.now() - 259200000,
    matchId: "atm-sev",
    marketId: "atm-sev-total",
    outcomeId: "atm-sev-total-over",
    pick: "Over 2.5",
    marketName: "Total goals",
    odds: 2.1,
    stake: 20,
    returns: 38.4,
    result: "cashedout",
    cashout: undefined,
    settledNote: "Cashed out · net +18.40 USDT",
  },
];

interface BetsState {
  bets: Bet[];
  addBets: (sel: SlipSelection[]) => Bet[];
  cashOut: (id: string) => void;
  suspendCashout: (matchId: string) => void;
  resumeCashout: (matchId: string) => void;
  tickCashout: (outcomeId: string, newPrice: number) => void;
}

export const useBets = create<BetsState>()((set) => ({
  bets: seedHistory,
  addBets: (sel) => {
    const made = sel.map(mkBet).reverse();
    set((s) => ({ bets: [...made, ...s.bets] }));
    return made;
  },
  cashOut: (id) =>
    set((s) => ({
      bets: s.bets.map((b) => {
        if (b.id !== id || b.cashout?.status !== "available") return b;
        const net = +(b.cashout.value - b.stake).toFixed(2);
        return {
          ...b,
          result: "cashedout",
          settledNote: `Cashed out · net ${net >= 0 ? "+" : "−"}${Math.abs(net).toFixed(2)} USDT`,
          returns: b.cashout.value,
          cashout: undefined,
        };
      }),
    })),
  tickCashout: (outcomeId, newPrice) =>
    set((s) => ({
      bets: s.bets.map((b) => {
        if (b.outcomeId !== outcomeId || !b.cashout) return b;
        const v = +(b.stake * newPrice * b.cashout.factor).toFixed(2);
        if (v === b.cashout.value) return b;
        return {
          ...b,
          cashout: { ...b.cashout, was: b.cashout.value, value: v },
        };
      }),
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
