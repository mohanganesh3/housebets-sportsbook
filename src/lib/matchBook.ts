import type { Market, MarketGroupKey, Match, Outcome } from "./types";

// ────────────────────────────────────────────────────────────────────
// matchBook — the flagship book's shared rules (E-M-06/08/10/11/14).
// Tab order is T42-09 law: Popular first, All markets LAST.
// ────────────────────────────────────────────────────────────────────

export const GROUP_ORDER: { key: MarketGroupKey; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "goalscorers", label: "Goalscorers" },
  { key: "goals", label: "Goals" },
  { key: "players", label: "Players" },
  { key: "halves", label: "Halves" },
  { key: "handicaps", label: "Handicaps" },
  { key: "corners", label: "Corners & cards" },
  { key: "minutes", label: "Minutes" },
];

// COPY vocabulary for suspension reasons (T42-01) — one spelling, every
// surface: `Suspended — {reason}` on the board, `This pick is suspended
// — {reason}` on the ticket.
export const SUSP_GOAL = "goal scored";
export const SUSP_UNKNOWN = "betting paused";
export const SUSP_ATTACK = "dangerous attack";

// F3 lock rule (M-08/E-M-10): every market derivable from the score
// locks on a goal — result, totals, scorers, handicaps, halves. Corners,
// cards and minutes stay open by definition; a score-derived market left
// open mid-cascade is a stale arb, not a state.
const DERIVED_GROUPS: ReadonlySet<Market["group"]> = new Set([
  "popular",
  "goals",
  "halves",
  "handicaps",
  "goalscorers",
]);
const DERIVED_KEYS: ReadonlySet<string> = new Set(["scoreassist"]);
export const isScoreDerived = (mk: Market) =>
  DERIVED_GROUPS.has(mk.group) || DERIVED_KEYS.has(mk.key);

export const impliedPct = (price: number) => Math.round(100 / price);

// Markets whose cell carries the pre-bet `CO` eligibility marker (E-M-08
// owns the pre-bet flag; the ticket owns the live quote).
const CO_KEYS: ReadonlySet<string> = new Set([
  "h2h",
  "dc",
  "dnb",
  "btts",
  "tg25",
]);
export const isCashoutEligible = (mk: Market) => CO_KEYS.has(mk.key);

// `Settles on 90′ + stoppage` rides the accordion header on full-time
// markets only (T42-22 trust microcopy) — halves/minutes grade earlier.
export const settlesOn90 = (mk: Market) =>
  mk.group !== "halves" && mk.group !== "minutes" && mk.key !== "htft";

// ── Settlement ────────────────────────────────────────────────────────
// FT grading from the final score (E-M-14/F1: suspended-at-FT markets
// settle like everything else; `Void` is reserved for what can't be
// proven from the score — the same verdict the ticket ledger applies).
export type Verdict = "won" | "lost" | "void";

export function outcomeVerdict(mk: Market, o: Outcome, mt: Match): Verdict {
  const sh = mt.score.home,
    sa = mt.score.away;
  const hN = mt.home.name,
    aN = mt.away.name,
    hS = mt.home.short,
    aS = mt.away.short;
  const pick = o.name;
  const res = sh > sa ? "H" : sh === sa ? "D" : "A";
  const btts = sh > 0 && sa > 0;
  const total = sh + sa;
  const diff = sh - sa;
  const bool = (v: boolean): Verdict => (v ? "won" : "lost");
  const sideOf = (s: string) =>
    s.startsWith(hS)
      ? "H"
      : s.startsWith(aS)
        ? "A"
        : s.startsWith("Draw")
          ? "D"
          : null;

  switch (mk.key) {
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
    case "h1btts":
    case "h2btts":
      return bool((pick === "Yes") === btts);
    case "cs":
    case "h1cs": {
      const m = pick.match(/^(\d+)-(\d+)$/);
      return m ? bool(+m[1] === sh && +m[2] === sa) : "void";
    }
    case "oddeven":
      return bool((pick === "Odd") === (total % 2 === 1));
    case "exactg": {
      const n = pick === "5+" ? total >= 5 : total === +pick;
      return bool(n);
    }
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
    case "h1":
    case "h2":
      // halves can't be graded from the final score alone (HT score is
      // not modelled) — honest void, same verdict the ledger gives
      return "void";
    case "htft":
      return "void";
    case "highhalf":
      return "void";
  }
  // asian handicaps (ah1, ahm05, ah15): "SHORT ±N.5"
  if (/^ah/.test(mk.key)) {
    const m = pick.match(/^(.*?) ([+-]\d+\.5)$/);
    if (!m) return "void";
    const side = m[1] === hS ? diff : m[1] === aS ? -diff : null;
    if (side === null) return "void";
    return bool(side + +m[2] > 0);
  }
  // european handicaps: "ARS (-1)", "Draw (-1)", "BHA (+1)"
  if (/^eh/.test(mk.key)) {
    const m = pick.match(/^.*?\(([+-]\d+)\)$/);
    if (!m) return "void";
    const e = +m[1];
    const adj = diff + e;
    if (pick.startsWith("Draw")) return bool(adj === 0);
    if (pick.startsWith(hS)) return bool(adj > 0);
    if (pick.startsWith(aS)) return bool(adj < 0);
    return "void";
  }
  // totals (tgXX, atg275) and team totals (tthXX/ttaXX): line in name
  if (/^(tg|tt[ha]|atg)\d+$/.test(mk.key)) {
    const m = mk.name.match(/([\d.]+)\s*$/);
    if (!m) return "void";
    const g = mk.key.startsWith("tth")
      ? sh
      : mk.key.startsWith("tta")
        ? sa
        : total;
    const line = +m[1];
    if (g === line) return "void"; // whole-line push — stake back
    return bool(pick === "Over" ? g > line : g < line);
  }
  if (/^h1ou|^h2ou/.test(mk.key)) return "void"; // half totals — HT score
  // asian total .75 splits stake half-win/half-void — grade Over/Under
  // against the line the name carries (2.75 → grade vs 2.5/3.0 split is
  // beyond cell density; honest dim via void)
  return "void";
}
