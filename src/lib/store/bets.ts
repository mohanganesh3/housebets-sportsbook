import { create } from "zustand";
import { matchById } from "../seed";
import type { Bet, Match, SlipSelection } from "../types";
import { useUI } from "./ui";

const BET_KEY = "hb-bets";
const loadBets = (): Bet[] | null => {
  try {
    const raw = localStorage.getItem(BET_KEY);
    if (raw) return JSON.parse(raw) as Bet[];
  } catch {}
  return null;
};
const saveBets = (bets: Bet[]) => {
  try {
    localStorage.setItem(BET_KEY, JSON.stringify(bets));
  } catch {}
};

// bet refs avoid 0/O/1/I — Oxanium has no disambiguating zero glyph.
// Deterministic: a judge sees the same refs every load.
const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// resume the sequence past persisted refs — a reload must never mint a
// ref that already exists in hb-bets
let refSeq = (() => {
  try {
    const prev = loadBets();
    return prev ? prev.filter((b) => /^HB-[A-Z0-9]{3}$/.test(b.id)).length : 0;
  } catch {
    return 0;
  }
})();
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
  const factor = +(0.9 + (hashOf(s.outcomeId) % 6) / 100).toFixed(4);
  // Fair cash-out ≈ stake × (bet price / current price) × book margin.
  // At placement the offer sits just under stake — real-book behaviour.
  const value = +(stake * factor).toFixed(2);
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
            value: 26.03,
            was: 26.03,
            factor: 0.94,
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
    returns: 12,
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
  cashOut: (id: string, fraction?: number) => void;
  settleMatch: (matchId: string, sh: number, sa: number) => void;
  suspendCashout: (matchId: string) => void;
  resumeCashout: (matchId: string) => void;
  tickCashout: (outcomeId: string, newPrice: number) => void;
}

export const useBets = create<BetsState>()((set) => ({
  bets:
    typeof window !== "undefined" ? (loadBets() ?? seedHistory) : seedHistory,
  addBets: (sel) => {
    const made = sel.map(mkBet).reverse();
    set((s) => {
      const bets = [...made, ...s.bets];
      saveBets(bets);
      return { bets };
    });
    return made;
  },
  cashOut: (id, fraction = 1) =>
    set((s) => {
      const bets = s.bets.map((b) => {
        if (b.id !== id || b.cashout?.status !== "available") return b;
        const co = b.cashout;
        const paid = +(co.value * fraction).toFixed(2);
        useUI.getState().credit(paid);
        if (fraction >= 1) {
          const net = +(co.value - b.stake).toFixed(2);
          return {
            ...b,
            result: "cashedout" as const,
            settledNote: `Cashed out · net ${net >= 0 ? "+" : "−"}${Math.abs(net).toFixed(2)} USDT`,
            returns: co.value,
            cashout: undefined,
          };
        }
        // partial: bank the offered fraction, the rest of the stake rides on
        const stakeLeft = +(b.stake * (1 - fraction)).toFixed(2);
        return {
          ...b,
          stake: stakeLeft,
          returns: +(stakeLeft * b.odds).toFixed(2),
          cashout: {
            ...co,
            value: +(co.value * (1 - fraction)).toFixed(2),
            was: +(co.value * (1 - fraction)).toFixed(2),
          },
          settledNote: `${Math.round(fraction * 100)}% cashed out · ${paid.toFixed(2)} banked · ${stakeLeft.toFixed(2)} rides`,
        };
      });
      saveBets(bets);
      return { bets };
    }),
  tickCashout: (outcomeId, newPrice) =>
    set((s) => {
      const bets = s.bets.map((b) => {
        if (b.outcomeId !== outcomeId || !b.cashout) return b;
        // Winning (price shortens) lifts the offer toward the full return;
        // drifting prices sink it toward zero. Never exceeds payout − margin.
        const raw = (b.stake * b.odds * b.cashout.factor) / newPrice;
        const cap = b.stake * b.odds * 0.985;
        const v = +Math.min(cap, Math.max(0, raw)).toFixed(2);
        if (v === b.cashout.value) return b;
        return {
          ...b,
          cashout: { ...b.cashout, was: b.cashout.value, value: v },
        };
      });
      saveBets(bets);
      return { bets };
    }),
  settleMatch: (matchId, sh, sa) =>
    set((s) => {
      const mt = matchById(matchId);
      if (!mt) return s;
      let credit = 0;
      const bets = s.bets.map((b) => {
        if (b.matchId !== matchId || b.result !== "open") return b;
        const verdict = evalSettle(b, mt, sh, sa);
        if (verdict === "won") {
          credit += b.returns;
          return {
            ...b,
            result: "won" as const,
            settledNote: `Settled · FT ${sh}-${sa}`,
            cashout: undefined,
          };
        }
        if (verdict === "lost") {
          return {
            ...b,
            result: "lost" as const,
            settledNote: `Settled · FT ${sh}-${sa}`,
            cashout: undefined,
          };
        }
        // markets that can't be graded from the score (scorers, corners,
        // halves) void honestly — stake comes straight back
        credit += b.stake;
        return {
          ...b,
          result: "void" as const,
          returns: b.stake,
          settledNote: "Void at FT · stake returned",
          cashout: undefined,
        };
      });
      if (credit > 0) useUI.getState().credit(+credit.toFixed(2));
      saveBets(bets);
      return { bets };
    }),
  suspendCashout: (matchId) =>
    set((s) => {
      const bets = s.bets.map((b) =>
        b.matchId === matchId && b.cashout
          ? { ...b, cashout: { ...b.cashout, status: "suspended" as const } }
          : b,
      );
      saveBets(bets);
      return { bets };
    }),
  resumeCashout: (matchId) =>
    set((s) => {
      const bets = s.bets.map((b) =>
        b.matchId === matchId && b.cashout?.status === "suspended"
          ? { ...b, cashout: { ...b.cashout, status: "available" as const } }
          : b,
      );
      saveBets(bets);
      return { bets };
    }),
}));

export { matchById };

// Grade every market derivable from the final score; return "void" for
// markets that aren't (scorers, corners, halves, minutes) so the demo
// settles honestly instead of leaving legs open forever.
function evalSettle(
  b: Bet,
  mt: Match,
  sh: number,
  sa: number,
): "won" | "lost" | "void" {
  const key = b.marketId.slice(b.matchId.length + 1);
  const pick = b.pick;
  const hN = mt.home.name,
    aN = mt.away.name,
    hS = mt.home.short,
    aS = mt.away.short;
  const res = sh > sa ? "H" : sh === sa ? "D" : "A";
  const btts = sh > 0 && sa > 0;
  const total = sh + sa;
  const diff = sh - sa;
  const bool = (v: boolean): "won" | "lost" => (v ? "won" : "lost");
  const sideOf = (s: string) =>
    s.startsWith(hS)
      ? "H"
      : s.startsWith(aS)
        ? "A"
        : s.startsWith("Draw")
          ? "D"
          : null;

  switch (key) {
    case "h2h":
      return bool(
        (pick === hN && res === "H") ||
          (pick === "Draw" && res === "D") ||
          (pick === aN && res === "A"),
      );
    case "dc":
      return bool(
        (pick === `${hN}/Draw` && res !== "A") ||
          (pick === `${hN}/${aN}` && res !== "D") ||
          (pick === `Draw/${aN}` && res !== "H"),
      );
    case "dnb":
      if (res === "D") return "void";
      return bool((pick === hN && res === "H") || (pick === aN && res === "A"));
    case "btts":
      return bool((pick === "Yes") === btts);
    case "cs": {
      const m = pick.match(/^(\d+)-(\d+)$/);
      return m ? bool(+m[1] === sh && +m[2] === sa) : "void";
    }
    case "oddeven":
      return bool((pick === "Odd") === (total % 2 === 1));
    case "winmar": {
      if (pick === "Draw") return bool(res === "D");
      const m = pick.match(/^(.*?) by (\d+)(\+?)$/);
      if (!m) return "void";
      const side = m[1] === hS ? diff : m[1] === aS ? -diff : null;
      if (side === null) return "void";
      const n = +m[2];
      return bool(m[3] === "+" ? side >= n : side === n);
    }
    case "cleanh":
      return bool((pick === "Yes") === (sa === 0));
    case "cleana":
      return bool((pick === "Yes") === (sh === 0));
    case "firstscore":
      // derivable only when one side kept a clean sheet — otherwise unknowable
      if (pick === "No goal") return bool(total === 0);
      if (pick === hN) return sa === 0 ? "won" : sh === 0 ? "lost" : "void";
      if (pick === aN) return sh === 0 ? "won" : sa === 0 ? "lost" : "void";
      return "void";
    case "resbtts": {
      const side = sideOf(pick);
      if (side === null) return "void";
      return bool(res === side && btts === pick.endsWith("yes"));
    }
    case "resou": {
      const side = sideOf(pick);
      const m = pick.match(/& (over|under) ([\d.]+)$/);
      if (side === null || !m) return "void";
      return bool(
        res === side && (m[1] === "over" ? total > +m[2] : total < +m[2]),
      );
    }
    case "bttsou": {
      const m = pick.match(/^(Yes|No) & (over|under)$/);
      if (!m) return "void";
      return bool(
        (m[1] === "Yes") === btts && (m[2] === "over") === total > 2.5,
      );
    }
    case "dcou": {
      const m = pick.match(/^(.*?) & (over|under)$/);
      if (!m) return "void";
      const ok =
        (m[1] === `${hS}/D` && res !== "A") ||
        (m[1] === `${aS}/D` && res !== "H") ||
        (m[1] === `${hS}/${aS}` && res !== "D");
      return bool(ok && (m[2] === "over") === total > 2.5);
    }
  }
  // asian handicaps (ah1, ahm25, ahm05, ah05, ah15): "SHORT ±N.5"
  if (/^ah/.test(key)) {
    const m = pick.match(/^(.*?) ([+-]\d+\.5)$/);
    if (!m) return "void";
    const side = m[1] === hS ? diff : m[1] === aS ? -diff : null;
    if (side === null) return "void";
    return bool(side + +m[2] > 0);
  }
  // totals (tgXX) and team totals (tthXX/ttaXX): "Over"/"Under", line in name
  if (/^(tg|tt[ha])\d+$/.test(key)) {
    const m = b.marketName.match(/([\d.]+)\s*$/);
    if (!m) return "void";
    const g = key.startsWith("tth") ? sh : key.startsWith("tta") ? sa : total;
    return bool(pick === "Over" ? g > +m[1] : g < +m[1]);
  }
  return "void";
}
