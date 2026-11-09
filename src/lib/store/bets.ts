import { create } from "zustand";
import { matchById } from "../seed";
import type { Bet, SlipSelection } from "../types";

// bet refs avoid 0/O/1/I — Oxanium has no disambiguating zero glyph.
// Deterministic: a judge sees the same refs every load.
const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let refSeq = 0;
const mkRef = () => {
  refSeq += 1;
  let n = refSeq * 137 + 29;
  let out = "";
  for (let i = 0; i < 3; i++) {
    out += REF_CHARS[n % REF_CHARS.length];
    n = Math.floor(n / REF_CHARS.length) + refSeq * 11;
  }
  return `HB-${out}`;
};
const hashOf = (s: string) => {
  let h = 7;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};
const mkBet = (s: SlipSelection): Bet => {
  const stake = parseFloat(s.stake) || 0;
  const factor = +(0.58 + (hashOf(s.outcomeId) % 28) / 100).toFixed(4);
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

// The open bet must reference the real seeded outcome so cash-out ticks with
// the live feed — wireframe parity: Arsenal 1.80 · $20.00 · $36.00
const arsHome = matchById("ars-bha")?.markets.find((m) => m.key === "h2h")
  ?.outcomes[0];

const seedHistory: Bet[] = [
  ...(arsHome
    ? [
        {
          id: "HB-091",
          placedAt: Date.now() - 3600000 * 4,
          matchId: "ars-bha",
          marketId: "ars-bha-h2h",
          outcomeId: arsHome.id,
          pick: "Arsenal",
          marketName: "Match result",
          odds: 1.8,
          stake: 20,
          returns: 36,
          result: "open" as const,
          cashout: {
            value: 22.1,
            was: 22.1,
            factor: 0.85,
            status: "available" as const,
          },
        },
      ]
    : []),
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
  {
    id: "HB-071",
    placedAt: Date.now() - 345600000,
    matchId: "rma-bay",
    marketId: "rma-bay-btts",
    outcomeId: "rma-bay-btts-yes",
    pick: "Yes",
    marketName: "Both teams to score",
    odds: 1.95,
    stake: 12,
    returns: 23.4,
    result: "void",
    settledNote: "Void · match abandoned at 63' · stake returned",
  },
  {
    id: "HB-068",
    placedAt: Date.now() - 432000000,
    matchId: "liv-tot",
    marketId: "liv-tot-h2h",
    outcomeId: "liv-tot-h2h-home",
    pick: "Liverpool",
    marketName: "Match result",
    odds: 1.65,
    stake: 25,
    returns: 41.25,
    result: "won",
    settledNote: "Settled · FT 3-1",
  },
  {
    id: "HB-064",
    placedAt: Date.now() - 518400000,
    matchId: "new-eve",
    marketId: "new-eve-tg25",
    outcomeId: "new-eve-tg25-under",
    pick: "Under 2.5",
    marketName: "Total goals 2.5",
    odds: 2.0,
    stake: 8,
    returns: 16,
    result: "lost",
    settledNote: "Settled · FT 2-1",
  },
  {
    id: "HB-060",
    placedAt: Date.now() - 604800000,
    matchId: "int-psg",
    marketId: "int-psg-h2h",
    outcomeId: "int-psg-h2h-home",
    pick: "Inter",
    marketName: "Match result",
    odds: 2.4,
    stake: 10,
    returns: 16.9,
    result: "cashedout",
    cashout: undefined,
    settledNote: "Cashed out · net +6.90 USDT",
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
