import type { Competition, Market, Match, SportKey, Team } from "./types";

const T = (id: string, name: string, short: string, hue: number): Team => ({
  id,
  name,
  short,
  hue,
});

export const TEAMS: Record<string, Team> = {
  ars: T("ars", "Arsenal", "ARS", 355),
  bha: T("bha", "Brighton & Hove Albion", "BHA", 205),
  avl: T("avl", "Aston Villa", "AVL", 330),
  ful: T("ful", "Fulham", "FUL", 0),
  new: T("new", "Newcastle United", "NEW", 220),
  eve: T("eve", "Everton", "EVE", 215),
  liv: T("liv", "Liverpool", "LIV", 355),
  mun: T("mun", "Manchester United", "MUN", 350),
  mci: T("mci", "Manchester City", "MCI", 195),
  tot: T("tot", "Tottenham Hotspur", "TOT", 220),
  int: T("int", "Inter", "INT", 220),
  rma: T("rma", "Real Madrid", "RMA", 50),
  bay: T("bay", "Bayern Munich", "BAY", 355),
  bar: T("bar", "Barcelona", "BAR", 340),
  psg: T("psg", "Paris Saint-Germain", "PSG", 210),
  atm: T("atm", "Atlético Madrid", "ATM", 350),
  sev: T("sev", "Sevilla", "SEV", 45),
  juv: T("juv", "Juventus", "JUV", 0),
  rom: T("rom", "Roma", "ROM", 15),
  lev: T("lev", "Bayer Leverkusen", "B04", 355),
  s04: T("s04", "Schalke 04", "S04", 205),
  nap: T("nap", "Napoli", "NAP", 195),
  mil: T("mil", "Milan", "MIL", 355),
  benf: T("benf", "SL Benfica", "BEN", 355),
  est: T("est", "Estrela Amadora", "EST", 200),
};

export const COMPS: Record<string, Competition> = {
  epl: {
    id: "epl",
    name: "Premier League",
    short: "Premier League",
    country: "England",
    flag: "gb-eng",
    sport: "soccer",
    followed: true,
  },
  ucl: {
    id: "ucl",
    name: "Champions League",
    short: "Champions League",
    country: "Europe",
    flag: "eu",
    sport: "soccer",
  },
  laliga: {
    id: "laliga",
    name: "LaLiga",
    short: "LaLiga",
    country: "Spain",
    flag: "es",
    sport: "soccer",
  },
  seriea: {
    id: "seriea",
    name: "Serie A",
    short: "Serie A",
    country: "Italy",
    flag: "it",
    sport: "soccer",
  },
  bundes: {
    id: "bundes",
    name: "Bundesliga",
    short: "Bundesliga",
    country: "Germany",
    flag: "de",
    sport: "soccer",
  },
  ligue1: {
    id: "ligue1",
    name: "Ligue 1",
    short: "Ligue 1",
    country: "France",
    flag: "fr",
    sport: "soccer",
  },
  erediv: {
    id: "erediv",
    name: "Eredivisie",
    short: "Eredivisie",
    country: "Netherlands",
    flag: "nl",
    sport: "soccer",
  },
  liga: {
    id: "liga",
    name: "Liga Portugal",
    short: "Liga Portugal",
    country: "Portugal",
    flag: "pt",
    sport: "soccer",
  },
  nba: {
    id: "nba",
    name: "NBA",
    short: "NBA",
    country: "USA",
    flag: "us",
    sport: "basketball",
  },
  atp: {
    id: "atp",
    name: "ATP Paris",
    short: "ATP Paris",
    country: "France",
    flag: "fr",
    sport: "tennis",
  },
  nfl: {
    id: "nfl",
    name: "NFL",
    short: "NFL",
    country: "USA",
    flag: "us",
    sport: "american-football",
  },
  lol: {
    id: "lol",
    name: "Worlds 2026",
    short: "Worlds 2026",
    country: "Esports",
    flag: "lol",
    sport: "esports",
  },
};

// Fictional player pool — invented names, assigned deterministically per team.
const NAME_POOL = [
  "K. Adeyemi",
  "L. Fontaine",
  "M. Okafor",
  "D. Santana",
  "R. Ashworth",
  "T. Lindqvist",
  "J. Moreau",
  "A. Castellanos",
  "P. Duarte",
  "S. Whitfield",
  "N. Ferreira",
  "E. Kaminski",
  "B. Osei",
  "V. Marchetti",
  "C. Bergström",
  "F. Ilves",
  "H. Oyarzabal",
  "I. Petrenko",
  "J. Quispe",
  "K. Tanaka",
  "L. Vasquez",
  "M. Wachira",
  "N. Xhafa",
  "O. Yeboah",
  "P. Zielinski",
  "R. Abiodun",
  "S. Boulahia",
  "T. Chukwuma",
  "U. Delacroix",
  "V. Einarsson",
  "W. Figueroa",
  "X. Groenewald",
  "Y. Halvorsen",
  "Z. Ibarra",
  "A. Johansson",
  "B. Kowalczyk",
  "C. Lawal",
  "D. Mustafa",
  "E. Nilsen",
  "F. Osorio",
  "G. Padovani",
  "H. Quintana",
  "I. Rashidi",
  "J. Salminen",
  "K. Traoré",
  "L. Ueda",
  "M. Vandermeer",
  "N. Witek",
  "O. Yilmaz",
  "P. Zambrano",
  "Q. Andersen",
  "R. Banda",
  "S. Cissé",
  "T. Doherty",
  "U. Ellison",
  "V. Fuentes",
  "W. Garrido",
  "X. Herrera",
  "Y. Iglesias",
  "Z. Jensen",
];

// Per-team strength rating (Elo-ish, 60–90) — drives every price below.
const STR: Record<string, number> = {
  ars: 86,
  bha: 75,
  avl: 78,
  ful: 72,
  new: 79,
  eve: 70,
  liv: 87,
  mun: 77,
  mci: 88,
  tot: 82,
  int: 84,
  rma: 89,
  bay: 86,
  bar: 85,
  psg: 84,
  atm: 82,
  sev: 73,
  juv: 81,
  rom: 77,
  lev: 84,
  s04: 62,
  nap: 82,
  mil: 80,
  benf: 80,
  est: 64,
};

// Deterministic hash → [0,1) so prices are stable across reloads.
function h01(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h / 4294967296;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const FACT = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
const pois = (k: number, l: number) => (Math.exp(-l) * l ** k) / FACT[k];
const poisCdf = (n: number, l: number) => {
  let s = 0;
  for (let k = 0; k <= n; k++) s += pois(k, l);
  return s;
};

// Squad picker: 6 names per team, disjoint between the two sides of a match.
function squads(homeId: string, awayId: string): [string[], string[]] {
  const pick = (seedStr: string, stride: number, skip: Set<string>) => {
    const out: string[] = [];
    const off = Math.floor(h01(seedStr) * NAME_POOL.length);
    for (let i = 0; out.length < 6 && i < NAME_POOL.length * 2; i++) {
      const nm = NAME_POOL[(off + i * stride) % NAME_POOL.length];
      if (!skip.has(nm) && !out.includes(nm)) out.push(nm);
    }
    return out;
  };
  const home = pick(homeId, 5, new Set());
  const away = pick(awayId, 7, new Set(home));
  return [home, away];
}

let _oid = 0;
const oid = () => `o${++_oid}`;

function m3(
  matchId: string,
  key: string,
  name: string,
  group: Market["group"],
  prices: [string, number][],
  opts: Partial<Market> = {},
): Market {
  return {
    id: `${matchId}-${key}`,
    key,
    name,
    group,
    status: "open",
    outcomes: prices.map(([n, p]) => ({
      id: oid(),
      name: n,
      price: p,
      status: "open" as const,
    })),
    ...opts,
  };
}

function marketsFor(m: Match): Market[] {
  const h = m.home.name,
    a = m.away.name,
    hs = m.home.short,
    as = m.away.short;
  const sh = STR[m.home.id] ?? 75;
  const sa = STR[m.away.id] ?? 75;
  const diff = sh - sa;
  const jit = (k: string) => h01(`${m.id}|${k}`) - 0.5;

  // Remaining-match expected goals (live matches scale down with the clock).
  const played = m.status === "live" && m.minute != null ? m.minute : 0;
  const f =
    m.period === "HT"
      ? 0.52
      : played > 0
        ? clamp((94 - played) / 94, 0.07, 1)
        : 1;
  const lh = clamp((1.34 + diff * 0.055) * f + jit("lh") * 0.14, 0.22, 3.4);
  const la = clamp((1.04 - diff * 0.05) * f + jit("la") * 0.14, 0.22, 3.2);
  const lt = lh + la;
  const gH = m.score.home,
    gA = m.score.away;

  // Price a probability into a decimal odd. Two-way books run a slimmer margin.
  const P = (p: number, key: string, twoWay = false): number => {
    const mar = (twoWay ? 1.035 : 1.045) + h01(`${m.id}|mar|${key}`) * 0.022;
    return clamp(
      Math.round((1 / Math.max(p, 0.002) / mar) * 100) / 100,
      1.01,
      501,
    );
  };

  // Scoreline matrix over remaining goals.
  const N = 8;
  const MX: number[][] = Array.from({ length: N + 1 }, (_, i) =>
    Array.from({ length: N + 1 }, (_, j) => pois(i, lh) * pois(j, la)),
  );
  const p: Record<"H" | "D" | "A", number> = { H: 0, D: 0, A: 0 };
  const diffP: Record<number, number> = {};
  const totP: Record<number, number> = {};
  for (let i = 0; i <= N; i++)
    for (let j = 0; j <= N; j++) {
      const pi = MX[i][j];
      const d = gH + i - (gA + j);
      p[d > 0 ? "H" : d === 0 ? "D" : "A"] += pi;
      diffP[d] = (diffP[d] ?? 0) + pi;
      totP[i + j] = (totP[i + j] ?? 0) + pi;
    }
  const pDiff = (lo: number, hi: number) => {
    let s = 0;
    for (let d = lo; d <= hi; d++) s += diffP[d] ?? 0;
    return s;
  };

  // First/second half lambdas (first half ≈ 44% of goals).
  const f1 = played >= 45 ? 0 : clamp((45 - played) / 45, 0, 1);
  const lh1 =
    lh * 0.44 * (m.period === "HT" ? 0 : f1 || (played === 0 ? 1 : 0));
  const la1 =
    la * 0.44 * (m.period === "HT" ? 0 : f1 || (played === 0 ? 1 : 0));
  const lh2 = lh - lh1,
    la2 = la - la1;
  const halfDone = m.period === "HT" || played >= 45;

  const mxFor = (l1: number, l2: number) =>
    Array.from({ length: N + 1 }, (_, i) =>
      Array.from({ length: N + 1 }, (_, j) => pois(i, l1) * pois(j, l2)),
    );
  const p3 = (MXm: number[][], baseH: number, baseA: number) => {
    const r = { H: 0, D: 0, A: 0 };
    for (let i = 0; i <= N; i++)
      for (let j = 0; j <= N; j++) {
        const d = baseH + i - (baseA + j);
        r[d > 0 ? "H" : d === 0 ? "D" : "A"] += MXm[i][j];
      }
    return r;
  };

  const list: Market[] = [];
  const push = (
    key: string,
    name: string,
    group: Market["group"],
    pairs: [string, number][],
    opts: { popular?: boolean; susp?: boolean } = {},
  ) =>
    list.push({
      ...m3(
        m.id,
        key,
        name,
        group,
        pairs,
        opts.popular ? { popular: true } : {},
      ),
      status: opts.susp ? "suspended" : "open",
    });
  const ou = (
    key: string,
    name: string,
    group: Market["group"],
    over: number,
    opts: { popular?: boolean; susp?: boolean } = {},
  ) =>
    push(
      key,
      name,
      group,
      [
        ["Over", P(over, key, true)],
        ["Under", P(1 - over, key, true)],
      ],
      opts,
    );
  const line = (l: number) => {
    // P(total goals > l) where l is a .5 line
    const need = Math.ceil(l) - (gH + gA);
    return need <= 0 ? 0.999 : 1 - poisCdf(need - 1, lt);
  };

  // ── Popular (curated 10 — mirrors the wireframe tab count) ──
  push("h2h", "Match result", "popular", [
    [h, P(p.H, "h2h")],
    ["Draw", P(p.D, "h2h")],
    [a, P(p.A, "h2h")],
  ]);
  push("dc", "Double chance", "popular", [
    [`${h}/Draw`, P(p.H + p.D, "dc")],
    [`${h}/${a}`, P(p.H + p.A, "dc")],
    [`Draw/${a}`, P(p.D + p.A, "dc")],
  ]);
  const pBtts =
    (gH > 0 ? 1 : 1 - Math.exp(-lh)) * (gA > 0 ? 1 : 1 - Math.exp(-la));
  push("btts", "Both teams to score", "popular", [
    ["Yes", P(pBtts, "btts", true)],
    ["No", P(1 - pBtts, "btts", true)],
  ]);
  ou("tg25", "Total goals 2.5", "popular", line(2.5));
  push("dnb", "Draw no bet", "popular", [
    [h, P(p.H / (p.H + p.A), "dnb", true)],
    [a, P(p.A / (p.H + p.A), "dnb", true)],
  ]);
  // Joint result×BTTS approximation: scorer-share independence penalty 0.85.
  const rb = (r: number, b: number) => r * b * 0.85;
  push("resbtts", "Result & both teams to score", "popular", [
    [`${hs} & yes`, P(rb(p.H, pBtts), "rb1")],
    [`Draw & yes`, P(rb(p.D, pBtts * 0.8), "rb2")],
    [`${as} & yes`, P(rb(p.A, pBtts), "rb3")],
    [`${hs} & no`, P(rb(p.H, 1 - pBtts), "rb4")],
    [`Draw & no`, P(rb(p.D, 1 - pBtts * 0.8), "rb5")],
    [`${as} & no`, P(rb(p.A, 1 - pBtts), "rb6")],
  ]);
  ou(
    "tth15",
    `${hs} total goals 1.5`,
    "popular",
    (() => {
      const need = 2 - gH;
      return need <= 0 ? 0.999 : 1 - poisCdf(need - 1, lh);
    })(),
  );
  push("cs", "Correct score", "popular", csOutcomes());
  push("ah1", `Handicap ${hs} (-1.5)`, "popular", [
    [`${hs} -1.5`, P(pDiff(2, N), "ah1", true)],
    [`${as} +1.5`, P(1 - pDiff(2, N), "ah1", true)],
  ]);
  push("resou", `Result & total goals`, "popular", [
    [`${hs} & over 2.5`, P(pDiff(1, N) * line(2.5) * 1.1, "ro1")],
    [`Draw & over 2.5`, P(p.D * line(2.5) * 1.15, "ro2")],
    [`${as} & over 2.5`, P(pDiff(-N, -1) * line(2.5) * 1.1, "ro3")],
    [`${hs} & under 2.5`, P(pDiff(1, N) * (1 - line(2.5)) * 1.1, "ro4")],
    [`Draw & under 2.5`, P(p.D * (1 - line(2.5)) * 1.15, "ro5")],
    [`${as} & under 2.5`, P(pDiff(-N, -1) * (1 - line(2.5)) * 1.1, "ro6")],
  ]);

  // ── Goals ──
  for (const l of [0.5, 1.5, 3.5, 4.5, 5.5])
    ou(`tg${String(l).replace(".", "")}`, `Total goals ${l}`, "goals", line(l));
  for (const l of [0.5, 2.5]) {
    const needH = Math.ceil(l) + 1 - gH;
    const needA = Math.ceil(l) + 1 - gA;
    ou(
      `tth${String(l).replace(".", "")}`,
      `${hs} total goals ${l}`,
      "goals",
      needH <= 0 ? 0.999 : 1 - poisCdf(needH - 1, lh),
    );
    ou(
      `tta${String(l).replace(".", "")}`,
      `${as} total goals ${l}`,
      "goals",
      needA <= 0 ? 0.999 : 1 - poisCdf(needA - 1, la),
    );
  }
  const pOdd = Object.entries(totP).reduce(
    (s, [k, v]) => s + (+k % 2 === 1 ? v : 0),
    0,
  );
  push("oddeven", "Total goals odd/even", "goals", [
    ["Odd", P(pOdd, "oe", true)],
    ["Even", P(1 - pOdd, "oe", true)],
  ]);
  push("winmar", "Winning margin", "goals", [
    [`${hs} by 1`, P(diffP[1] ?? 0.01, "wm1")],
    [`${hs} by 2`, P(diffP[2] ?? 0.01, "wm2")],
    [`${hs} by 3+`, P(pDiff(3, N), "wm3")],
    ["Draw", P(p.D, "wm4")],
    [`${as} by 1`, P(diffP[-1] ?? 0.01, "wm5")],
    [`${as} by 2`, P(diffP[-2] ?? 0.01, "wm6")],
    [`${as} by 3+`, P(pDiff(-N, -3), "wm7")],
  ]);
  push(
    "firstscore",
    "First team to score",
    "goals",
    [
      [h, P((lh / lt) * (1 - Math.exp(-lt)), "fs")],
      ["No goal", P(Math.exp(-lt), "fs")],
      [a, P((la / lt) * (1 - Math.exp(-lt)), "fs")],
    ],
    { susp: gH + gA > 0 },
  );
  push("bh2h", `${hs} to score in both halves`, "goals", [
    [
      "Yes",
      P((1 - Math.exp(-lh1 || lh * 0.44)) * (1 - Math.exp(-lh2)), "bhh", true),
    ],
    [
      "No",
      P(
        1 - (1 - Math.exp(-lh1 || lh * 0.44)) * (1 - Math.exp(-lh2)),
        "bhh",
        true,
      ),
    ],
  ]);
  push("bh2a", `${as} to score in both halves`, "goals", [
    [
      "Yes",
      P((1 - Math.exp(-la1 || la * 0.44)) * (1 - Math.exp(-la2)), "bha", true),
    ],
    [
      "No",
      P(
        1 - (1 - Math.exp(-la1 || la * 0.44)) * (1 - Math.exp(-la2)),
        "bha",
        true,
      ),
    ],
  ]);
  push("cleanh", `${hs} clean sheet`, "goals", [
    ["Yes", P(gA > 0 ? 0.002 : Math.exp(-la), "ch", true)],
    ["No", P(gA > 0 ? 0.998 : 1 - Math.exp(-la), "ch", true)],
  ]);
  push("cleana", `${as} clean sheet`, "goals", [
    ["Yes", P(gH > 0 ? 0.002 : Math.exp(-lh), "ca", true)],
    ["No", P(gH > 0 ? 0.998 : 1 - Math.exp(-lh), "ca", true)],
  ]);
  push(
    "exactg",
    "Exact total goals",
    "goals",
    [0, 1, 2, 3, 4]
      .map((k) => {
        const pk = totP[k - (gH + gA)] ?? 0.002;
        return [`${k}`, P(k < gH + gA ? 0.002 : pk, `eg${k}`)] as [
          string,
          number,
        ];
      })
      .concat([
        [
          "5+",
          P(
            1 -
              [0, 1, 2, 3, 4].reduce(
                (s, k) => s + (totP[k - (gH + gA)] ?? 0),
                0,
              ),
            "eg5",
          ),
        ],
      ]),
  );
  push("pen", "Penalty awarded", "goals", [
    ["Yes", P(0.3 + jit("pen") * 0.06, "pen", true)],
    ["No", P(0.7 - jit("pen") * 0.06, "pen", true)],
  ]);
  push("bttsou", "BTTS & total 2.5", "goals", [
    ["Yes & over", P(pBtts * line(2.5) * 1.12, "bo1")],
    ["Yes & under", P(pBtts * (1 - line(2.5)) * 1.12, "bo2")],
    ["No & over", P((1 - pBtts) * line(2.5) * 1.12, "bo3")],
    ["No & under", P((1 - pBtts) * (1 - line(2.5)) * 1.12, "bo4")],
  ]);
  push("dcou", `Double chance & total 2.5`, "goals", [
    [`${hs}/D & over`, P((p.H + p.D) * line(2.5) * 1.05, "dco1")],
    [`${as}/D & over`, P((p.A + p.D) * line(2.5) * 1.05, "dco2")],
    [`${hs}/${as} & over`, P((p.H + p.A) * line(2.5) * 1.05, "dco3")],
    [`${hs}/D & under`, P((p.H + p.D) * (1 - line(2.5)) * 1.05, "dco4")],
    [`${as}/D & under`, P((p.A + p.D) * (1 - line(2.5)) * 1.05, "dco5")],
    [`${hs}/${as} & under`, P((p.H + p.A) * (1 - line(2.5)) * 1.05, "dco6")],
  ]);

  function csOutcomes(): [string, number][] {
    const rows: [string, number, number][] = [];
    for (let i = 0; i <= 5; i++)
      for (let j = 0; j <= 5; j++)
        if (gH + i <= 6 && gA + j <= 6)
          rows.push([`${gH + i}-${gA + j}`, MX[i][j], 0]);
    rows.sort((x, y) => y[1] - x[1]);
    return rows
      .slice(0, 16)
      .map(([nm, pr]) => [nm, P(pr, `cs|${nm}`)] as [string, number])
      .sort((x, y) => x[1] - y[1]);
  }

  // ── Halves ──
  const M1 = mxFor(lh1, la1);
  const r1 = p3(M1, 0, 0);
  const M2 = mxFor(lh2, la2);
  push(
    "h1",
    "1st half result",
    "halves",
    [
      [h, P(r1.H, "h1")],
      ["Draw", P(r1.D, "h1")],
      [a, P(r1.A, "h1")],
    ],
    { susp: halfDone },
  );
  const r2 = p3(M2, halfDone ? gH : 0, halfDone ? gA : 0);
  push("h2", "2nd half result", "halves", [
    [h, P(r2.H, "h2")],
    ["Draw", P(r2.D, "h2")],
    [a, P(r2.A, "h2")],
  ]);
  // HT/FT from joint halves matrix.
  const htft: [string, number][] = [];
  for (const [hr, hc] of [
    ["H", 1],
    ["D", 0],
    ["A", -1],
  ] as const)
    for (const [fr, fc] of [
      ["H", 1],
      ["D", 0],
      ["A", -1],
    ] as const) {
      let pr = 0;
      for (let i = 0; i <= N; i++)
        for (let j = 0; j <= N; j++) {
          const hd = i - j;
          if ((hd > 0 ? 1 : hd === 0 ? 0 : -1) !== hc) continue;
          for (let x = i; x <= N; x++)
            for (let y = j; y <= N; y++) {
              const fd = x - y;
              if ((fd > 0 ? 1 : fd === 0 ? 0 : -1) !== fc) continue;
              pr += M1[i][j] * M2[x - i][y - j];
            }
        }
      const hNm = hr === "H" ? hs : hr === "D" ? "Draw" : as;
      const fNm = fr === "H" ? hs : fr === "D" ? "Draw" : as;
      htft.push([`${hNm} / ${fNm}`, pr]);
    }
  push(
    "htft",
    "Half-time / full-time",
    "halves",
    htft.map(([nm, pr], i) => [nm, P(pr, `htft${i}`)] as [string, number]),
    { susp: played > 80 },
  );
  ou(
    "h1ou05",
    "1st half total goals 0.5",
    "halves",
    1 - Math.exp(-(lh1 + la1)),
    { susp: halfDone },
  );
  ou(
    "h1ou15",
    "1st half total goals 1.5",
    "halves",
    1 - poisCdf(1, lh1 + la1),
    { susp: halfDone },
  );
  push(
    "h1btts",
    "1st half both teams to score",
    "halves",
    [
      ["Yes", P((1 - Math.exp(-lh1)) * (1 - Math.exp(-la1)), "h1b", true)],
      ["No", P(1 - (1 - Math.exp(-lh1)) * (1 - Math.exp(-la1)), "h1b", true)],
    ],
    { susp: halfDone },
  );
  const l1 = lh1 + la1,
    l2 = lh2 + la2;
  const e1 = l1 / (l1 + l2 || 1);
  push("highhalf", "Highest scoring half", "halves", [
    ["1st half", P(e1 * (l1 > l2 ? 1.35 : 0.72) + 0.05, "hh1")],
    ["Tie", P(0.24, "hh2")],
    ["2nd half", P((1 - e1) * (l2 >= l1 ? 1.35 : 0.72) + 0.05, "hh3")],
  ]);
  ou("h2ou15", "2nd half total goals 1.5", "halves", 1 - poisCdf(1, l2));
  push("h2btts", "2nd half both teams to score", "halves", [
    ["Yes", P((1 - Math.exp(-lh2)) * (1 - Math.exp(-la2)), "h2b", true)],
    ["No", P(1 - (1 - Math.exp(-lh2)) * (1 - Math.exp(-la2)), "h2b", true)],
  ]);
  push(
    "h1cs",
    "1st half correct score",
    "halves",
    (() => {
      const rows: [string, number][] = [];
      for (let i = 0; i <= 3; i++)
        for (let j = 0; j <= 3; j++) rows.push([`${i}-${j}`, M1[i][j]]);
      return rows
        .sort((x, y) => y[1] - x[1])
        .slice(0, 8)
        .map(([nm, pr]) => [nm, P(pr, `h1cs|${nm}`)] as [string, number])
        .sort((x, y) => x[1] - y[1]);
    })(),
    { susp: halfDone },
  );

  // ── Handicaps ──
  // Home covers handicap h when diff + h > 0 → diff ≥ floor(-h) + 1.
  for (const lineH of [-2.5, -0.5, 0.5, 1.5]) {
    const covers = pDiff(Math.floor(-lineH) + 1, N);
    push(
      `ah${String(lineH).replace("-", "m").replace(".", "")}`,
      `Asian handicap ${lineH > 0 ? `+${lineH}` : lineH}`,
      "handicaps",
      [
        [
          `${hs} ${lineH > 0 ? "+" : ""}${lineH}`,
          P(covers, `ah${lineH}`, true),
        ],
        [
          `${as} ${-lineH > 0 ? "+" : ""}${-lineH}`,
          P(1 - covers, `ah${lineH}`, true),
        ],
      ],
    );
  }
  // European handicap e applied to home: win diff>e, draw diff==e, lose diff<e.
  for (const e of [-1, -2, 1]) {
    push(
      `eh${e < 0 ? `m${-e}` : `p${e}`}`,
      `European handicap ${e > 0 ? `+${e}` : e}`,
      "handicaps",
      [
        [`${hs} (${e > 0 ? "+" : ""}${e})`, P(pDiff(e + 1, N), `eh${e}a`)],
        [`Draw (${e > 0 ? "+" : ""}${e})`, P(diffP[e] ?? 0.01, `eh${e}b`)],
        [`${as} (${-e > 0 ? "+" : ""}${-e})`, P(pDiff(-N, e - 1), `eh${e}c`)],
      ],
    );
  }
  // Asian total 2.75 — average of the 2.5 and 3.5 lines.
  ou(
    "atg275",
    "Asian total goals 2.75",
    "handicaps",
    (line(2.5) + line(3.5)) / 2,
  );

  // ── Goalscorers (fictional squads, per-team λ shares) ──
  const [sqH, sqA] = squads(m.home.id, m.away.id);
  const shares = [0.26, 0.17, 0.13, 0.1, 0.07, 0.05];
  const anyP = (nm: string, lam: number, i: number) =>
    1 - Math.exp(-lam * (shares[i] ?? 0.04) * (1 + jit(`gs|${nm}`) * 0.5));
  const gsRows = (squad: string[], k: (i: number) => number) =>
    squad.map((nm, i) => [nm, P(k(i), `g|${m.id}|${nm}`)] as [string, number]);
  push(
    `anygs_h`,
    `${hs} anytime goalscorer`,
    "goalscorers",
    gsRows(sqH, (i) => anyP(sqH[i], lh, i)),
  );
  push(
    `anygs_a`,
    `${as} anytime goalscorer`,
    "goalscorers",
    gsRows(sqA, (i) => anyP(sqA[i], la, i)),
  );
  const pAnyGoal = 1 - Math.exp(-lt);
  const firstP = (nm: string, lam: number, i: number) =>
    ((lam * (shares[i] ?? 0.04) * (1 + jit(`f|${nm}`) * 0.5)) / lt) * pAnyGoal;
  push(
    `firstgs_h`,
    `${hs} first goalscorer`,
    "goalscorers",
    gsRows(sqH, (i) => firstP(sqH[i], lh, i)),
    { susp: gH + gA > 0 },
  );
  push(
    `firstgs_a`,
    `${as} first goalscorer`,
    "goalscorers",
    gsRows(sqA, (i) => firstP(sqA[i], la, i)),
    { susp: gH + gA > 0 },
  );
  const lh1sq = lh1 || lh * 0.44,
    la1sq = la1 || la * 0.44;
  push(
    `h1gs_h`,
    `${hs} 1st half scorer`,
    "goalscorers",
    gsRows(sqH.slice(0, 5), (i) => anyP(sqH[i], lh1sq, i)),
    { susp: halfDone },
  );
  push(
    `h1gs_a`,
    `${as} 1st half scorer`,
    "goalscorers",
    gsRows(sqA.slice(0, 5), (i) => anyP(sqA[i], la1sq, i)),
    { susp: halfDone },
  );
  const lastP = (lam: number, i: number) =>
    ((lam * (shares[i] ?? 0.04)) / lt) * pAnyGoal;
  push("lastgs", "Last goalscorer", "goalscorers", [
    ...gsRows(sqH.slice(0, 4), (i) => lastP(lh, i)),
    ...gsRows(sqA.slice(0, 4), (i) => lastP(la, i)),
  ]);
  push(
    "gs2plus",
    "To score 2 or more",
    "goalscorers",
    [...sqH.slice(0, 3), ...sqA.slice(0, 3)].map((nm) => {
      const lam = sqH.includes(nm) ? lh : la;
      const i = (sqH.includes(nm) ? sqH : sqA).indexOf(nm);
      const pAny = anyP(nm, lam, i);
      return [nm, P(pAny * pAny * 0.55, `2+|${nm}`)] as [string, number];
    }),
  );
  push(
    "gs3",
    "Hat-trick",
    "goalscorers",
    [sqH[0], sqH[1], sqA[0], sqA[1]].map((nm) => {
      const lam = sqH.includes(nm) ? lh : la;
      const i = (sqH.includes(nm) ? sqH : sqA).indexOf(nm);
      const pAny = anyP(nm, lam, i);
      return [nm, P(pAny ** 3 * 0.4, `3|${nm}`)] as [string, number];
    }),
  );
  push(
    "scorecast",
    "Scorecast · scorer & team to win",
    "goalscorers",
    [sqH[0], sqH[1], sqA[0], sqA[1]].flatMap((nm) => {
      const isH = sqH.includes(nm);
      const lam = isH ? lh : la;
      const i = (isH ? sqH : sqA).indexOf(nm);
      const pAny = anyP(nm, lam, i);
      return [
        [nm, P(pAny * (isH ? p.H : p.A) * 0.8, `sc|${nm}`)] as [string, number],
      ];
    }),
  );

  // ── Players ──
  push(
    "motm",
    "Player of the match",
    "players",
    [...sqH.slice(0, 4), ...sqA.slice(0, 4)].map((nm) => {
      const isH = sqH.includes(nm);
      const lam = isH ? lh : la;
      const i = (isH ? sqH : sqA).indexOf(nm);
      return [nm, P(anyP(nm, lam, i) * 0.16 + 0.02, `motm|${nm}`)] as [
        string,
        number,
      ];
    }),
  );
  push(
    "anyassist",
    "Anytime assist",
    "players",
    [...sqH.slice(1, 5), ...sqA.slice(1, 5)].map((nm) => {
      const isH = sqH.includes(nm);
      const lam = isH ? lh : la;
      const i = (isH ? sqH : sqA).indexOf(nm);
      return [nm, P(anyP(nm, lam, i) * 0.7, `as|${nm}`)] as [string, number];
    }),
  );
  push(
    "tobecarded",
    "To be shown a card",
    "players",
    [...sqH.slice(2, 6), ...sqA.slice(2, 6)].map((nm) => {
      const i = (sqH.includes(nm) ? sqH : sqA).indexOf(nm);
      return [
        nm,
        P(0.14 + (shares[i] ?? 0.04) * 0.9 + jit(`c|${nm}`) * 0.08, `cd|${nm}`),
      ] as [string, number];
    }),
  );
  push(
    "scoreassist",
    "To score or assist",
    "players",
    [...sqH.slice(0, 4), ...sqA.slice(0, 4)].map((nm) => {
      const isH = sqH.includes(nm);
      const lam = isH ? lh : la;
      const i = (isH ? sqH : sqA).indexOf(nm);
      return [nm, P(anyP(nm, lam, i) * 1.5, `sa|${nm}`)] as [string, number];
    }),
  );
  push(
    "firstcard",
    "First player carded",
    "players",
    [...sqH.slice(3, 6), ...sqA.slice(3, 6)].map(
      (nm) =>
        [nm, P(0.05 + jit(`fc|${nm}`) * 0.04, `fc|${nm}`)] as [string, number],
    ),
    { susp: gH + gA > 1 },
  );
  push(
    "subbed",
    "To be substituted",
    "players",
    [...sqH.slice(0, 3), ...sqA.slice(0, 3)].map((nm) => {
      const i = (sqH.includes(nm) ? sqH : sqA).indexOf(nm);
      return [nm, P(0.3 + jit(`sb|${nm}`) * 0.25 + i * 0.08, `sb|${nm}`)] as [
        string,
        number,
      ];
    }),
  );
  const sot = (nm: string, i: number) =>
    ou(
      `psot${i}`,
      `${nm} shots on target 1.5`,
      "players",
      1 - poisCdf(1, 0.8 + (shares[i] ?? 0.04) * 6),
    );
  sot(sqH[0], 0);
  sot(sqH[1], 1);
  sot(sqA[0], 2);
  const fls = (nm: string, i: number) =>
    ou(
      `pfoul${i}`,
      `${nm} fouls committed 1.5`,
      "players",
      1 - poisCdf(1, 0.9 + jit(`fl|${nm}`) * 0.5 + i * 0.1),
    );
  fls(sqH[4], 0);
  fls(sqA[4], 1);

  // ── Corners & cards ──
  const lcH = 5.2 + diff * 0.04,
    lcA = 4.5 - diff * 0.04,
    lcT = lcH + lcA;
  const lc = lcT * f;
  for (const l of [7.5, 8.5, 9.5, 10.5])
    ou(
      `tc${String(l).replace(".", "")}`,
      `Total corners ${l}`,
      "corners",
      1 - poisCdf(Math.floor(l), lc),
    );
  const pCH = (lcH / lcT) * 0.62;
  push("c1x2", "Corners match result", "corners", [
    [h, P(pCH, "c1")],
    ["Tie", P(0.16, "c2")],
    [a, P(1 - pCH - 0.16, "c3")],
  ]);
  ou("chc", `${hs} total corners 4.5`, "corners", 1 - poisCdf(4, lcH * f));
  ou("cac", `${as} total corners 4.5`, "corners", 1 - poisCdf(4, lcA * f));
  for (const tgt of [5, 7, 9])
    push(`race${tgt}`, `Race to ${tgt} corners`, "corners", [
      [h, P(pCH * 1.28, `r${tgt}h`, true)],
      ["Neither", P(0.14 + (9 - tgt) * 0.05, `r${tgt}n`, true)],
      [a, P((1 - pCH) * 0.78, `r${tgt}a`, true)],
    ]);
  push("cbands", "Total corners bands", "corners", [
    ["0–8", P(poisCdf(8, lc), "cb1")],
    ["9–11", P(poisCdf(11, lc) - poisCdf(8, lc), "cb2")],
    ["12+", P(1 - poisCdf(11, lc), "cb3")],
  ]);
  const ld = 2.1 - diff * 0.014 + 2.35 + diff * 0.014; // ~4.45 total cards λ
  for (const l of [3.5, 4.5, 5.5])
    ou(
      `cards${String(l).replace(".", "")}`,
      `Total cards ${l}`,
      "corners",
      1 - poisCdf(Math.floor(l), ld * f),
    );
  ou(
    "carh",
    `${hs} total cards 2.5`,
    "corners",
    1 - poisCdf(2, (2.1 - diff * 0.014) * f),
  );
  ou(
    "cara",
    `${as} total cards 2.5`,
    "corners",
    1 - poisCdf(2, (2.35 + diff * 0.014) * f),
  );
  push("redcard", "Red card in match", "corners", [
    ["Yes", P(0.16 + jit("rc") * 0.05, "rc", true)],
    ["No", P(0.84 - jit("rc") * 0.05, "rc", true)],
  ]);
  ou(
    "bookpts",
    "Booking points 40.5",
    "corners",
    1 - poisCdf(4, ld * f * 1.05),
  );

  // ── Minutes ──
  const bands: [number, number][] = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
    [76, 90],
    [90, 120],
  ];
  for (const [s, e] of bands) {
    const pBand =
      Math.exp((-lt * s) / 90) * (1 - Math.exp((-lt * (e - s + 1)) / 90));
    push(
      `mb${s}`,
      `Goal between ${s}:00 and ${e}:59`,
      "minutes",
      [
        ["Yes", P(pBand, `mb${s}`, true)],
        ["No", P(1 - pBand, `mb${s}`, true)],
      ],
      { susp: played >= e },
    );
  }
  push(
    "fgband",
    "Time of 1st goal",
    "minutes",
    [
      ...bands.map(
        ([s, e], i) =>
          [
            `${s}–${e}`,
            P(
              Math.exp((-lt * (s - 1)) / 90) - Math.exp((-lt * e) / 90),
              `fg${i}`,
            ),
          ] as [string, number],
      ),
      ["No goal", P(Math.exp(-lt), "fgn")],
    ],
    { susp: gH + gA > 0 },
  );
  push(
    "g10",
    "Goal in first 10 minutes",
    "minutes",
    [
      ["Yes", P(1 - Math.exp((-lt * 10) / 90), "g10", true)],
      ["No", P(Math.exp((-lt * 10) / 90), "g10", true)],
    ],
    { susp: played >= 10 },
  );
  push(
    "m10res",
    "Result after 10 minutes",
    "minutes",
    [
      [h, P((lh / lt) * 0.24, "m10h")],
      ["Draw", P(1 - 0.26, "m10d")],
      [a, P((la / lt) * 0.24, "m10a")],
    ],
    { susp: played >= 10 },
  );

  return list;
}

const now = Date.now();
const m = (
  id: string,
  comp: string,
  home: Team,
  away: Team,
  status: Match["status"],
  minute: number | null,
  period: string | null,
  score: [number, number],
  kickoffInMin: number,
  featured = false,
): Match => {
  const mt: Match = {
    id,
    sport: COMPS[comp].sport,
    competitionId: comp,
    home,
    away,
    status,
    minute,
    period,
    score: { home: score[0], away: score[1] },
    kickoffAt: now + kickoffInMin * 60000,
    markets: [],
    featured,
  };
  mt.markets = marketsFor(mt);
  if (status === "finished")
    for (const mk of mt.markets) {
      mk.status = "suspended";
      for (const o of mk.outcomes) o.status = "suspended";
    }
  return mt;
};

export const MATCHES: Match[] = [
  m(
    "ars-bha",
    "epl",
    TEAMS.ars,
    TEAMS.bha,
    "live",
    52,
    "2nd half",
    [1, 0],
    -52,
    true,
  ),
  m(
    "avl-ful",
    "epl",
    TEAMS.avl,
    TEAMS.ful,
    "live",
    null,
    "HT",
    [0, 0],
    -45,
    true,
  ),
  m(
    "new-eve",
    "epl",
    TEAMS.new,
    TEAMS.eve,
    "live",
    58,
    "2nd half",
    [2, 1],
    -58,
    true,
  ),
  m(
    "liv-mun",
    "epl",
    TEAMS.liv,
    TEAMS.mun,
    "scheduled",
    null,
    null,
    [0, 0],
    300,
  ),
  m(
    "mci-ful2",
    "epl",
    TEAMS.mci,
    TEAMS.ful,
    "scheduled",
    null,
    null,
    [0, 0],
    2880,
  ),
  m(
    "ars-int",
    "ucl",
    TEAMS.ars,
    TEAMS.int,
    "scheduled",
    null,
    null,
    [0, 0],
    1750,
    true,
  ),
  m(
    "rma-bay",
    "ucl",
    TEAMS.rma,
    TEAMS.bay,
    "scheduled",
    null,
    null,
    [0, 0],
    1760,
    true,
  ),
  m(
    "bar-psg",
    "ucl",
    TEAMS.bar,
    TEAMS.psg,
    "scheduled",
    null,
    null,
    [0, 0],
    3200,
  ),
  m(
    "atm-sev",
    "laliga",
    TEAMS.atm,
    TEAMS.sev,
    "live",
    37,
    "1st half",
    [1, 0],
    -37,
  ),
  m(
    "juv-rom",
    "seriea",
    TEAMS.juv,
    TEAMS.rom,
    "live",
    49,
    "2nd half",
    [1, 1],
    -49,
    true,
  ),
  m(
    "lev-s04",
    "bundes",
    TEAMS.lev,
    TEAMS.s04,
    "live",
    64,
    "2nd half",
    [2, 0],
    -64,
  ),
  m(
    "nap-mil",
    "seriea",
    TEAMS.nap,
    TEAMS.mil,
    "scheduled",
    null,
    null,
    [0, 0],
    2,
  ),
  m(
    "benf-est",
    "liga",
    TEAMS.benf,
    TEAMS.est,
    "scheduled",
    null,
    null,
    [0, 0],
    600,
  ),
  // Seeded full-time matches: the settled seed bets (liv-tot, int-psg) need real
  // fixtures, and the terminal state must be visible without waiting ~20 min.
  m(
    "liv-tot",
    "epl",
    TEAMS.liv,
    TEAMS.tot,
    "finished",
    90,
    "FT",
    [3, 1],
    -2880,
  ),
  m(
    "int-psg",
    "ucl",
    TEAMS.int,
    TEAMS.psg,
    "finished",
    90,
    "FT",
    [2, 0],
    -4320,
  ),
];

// Fix new-eve suspended to demo state (matches wireframe)
const newEve = MATCHES.find((x) => x.id === "new-eve")!;
newEve.markets.find((x) => x.key === "h2h")!.status = "suspended";
const atmSev = MATCHES.find((x) => x.id === "atm-sev")!;
atmSev.markets.find((x) => x.key === "h2h")!.status = "suspended";

// Arsenal-Brighton: DATA-CANON prices (D-21). 1/1.30 + 1/4.80 + 1/11.00 =
// 76.92 + 20.83 + 9.09 = 106.85% — inside the 103–107% book law; the
// wireframe's 4.60 priced 107.75% and failed the band.
const flagship = MATCHES.find((x) => x.id === "ars-bha")!;
const h2h = flagship.markets.find((x) => x.key === "h2h")!;
h2h.outcomes[0].price = 1.3;
h2h.outcomes[1].price = 4.8;
h2h.outcomes[2].price = 11.0;
// Double chance re-derived (M-12): 1/1.02 + 1/1.16 + 1/3.34 =
// 98.04 + 86.21 + 29.94 = 214.19% ≈ 2× the 1X2 margin — DC books sum
// ≈2× overround by construction.
const dc = flagship.markets.find((x) => x.key === "dc")!;
dc.outcomes[0].price = 1.02;
dc.outcomes[1].price = 1.16;
dc.outcomes[2].price = 3.34;
// Total goals 2.5 keeps the wireframe book: 1/2.73 + 1/1.44 =
// 36.63 + 69.44 = 106.07% ✓ in band as drawn.
const tg = flagship.markets.find((x) => x.key === "tg25")!;
tg.outcomes[0].price = 2.73;
tg.outcomes[1].price = 1.44;

// DATA-CANON: the flagship book is exactly 78 markets (85 wireframe minus
// the out-of-scope Specials 7 — D-22). Per-group counts are the storyboard's
// binding tab labels: 10 + 9 + 11 + 11 + 8 + 5 + 14 + 10 = 78.
const FLAGSHIP_BOOK: Record<string, string[]> = {
  popular: [
    "h2h",
    "dc",
    "btts",
    "tg25",
    "dnb",
    "resbtts",
    "tth15",
    "cs",
    "ah1",
    "resou",
  ],
  goalscorers: [
    "anygs_h",
    "anygs_a",
    "firstgs_h",
    "firstgs_a",
    "h1gs_h",
    "h1gs_a",
    "lastgs",
    "gs2plus",
    "gs3",
  ],
  goals: [
    "tg05",
    "tg15",
    "tg35",
    "tg45",
    "tg55",
    "tth05",
    "tth25",
    "tta05",
    "tta25",
    "oddeven",
    "firstscore",
  ],
  players: [
    "motm",
    "anyassist",
    "tobecarded",
    "scoreassist",
    "firstcard",
    "subbed",
    "psot0",
    "psot1",
    "psot2",
    "pfoul0",
    "pfoul1",
  ],
  halves: [
    "h1",
    "h2",
    "htft",
    "h1ou05",
    "h1ou15",
    "h1btts",
    "highhalf",
    "h2ou15",
  ],
  handicaps: ["ahm05", "ah15", "ehm1", "ehp1", "atg275"],
  corners: [
    "tc75",
    "tc85",
    "tc95",
    "tc105",
    "c1x2",
    "chc",
    "cac",
    "race5",
    "race7",
    "race9",
    "cards35",
    "cards45",
    "cards55",
    "redcard",
  ],
  minutes: [
    "mb1",
    "mb16",
    "mb31",
    "mb46",
    "mb61",
    "mb76",
    "mb90",
    "fgband",
    "g10",
    "m10res",
  ],
};
flagship.markets = flagship.markets.filter((mk) =>
  FLAGSHIP_BOOK[mk.group]?.includes(mk.key),
);

export const SPORTS_NAV: { key: SportKey | "home" | "live"; label: string }[] =
  [
    { key: "home", label: "Home" },
    { key: "live", label: "Live" },
    { key: "soccer", label: "Soccer" },
    { key: "tennis", label: "Tennis" },
    { key: "basketball", label: "Basketball" },
    { key: "baseball", label: "Baseball" },
    { key: "american-football", label: "American Football" },
    { key: "esports", label: "Esports" },
  ];

export const liveMatches = () => MATCHES.filter((x) => x.status === "live");
export const matchById = (id: string) => MATCHES.find((x) => x.id === id);
export const compById = (id: string) => COMPS[id];
export const teamById = (id: string) => TEAMS[id];
// league badges: explicit abbreviations, never name.slice() guesses
const COMP_SHORT: Record<string, string> = {
  epl: "PL",
  ucl: "UCL",
  laliga: "LAL",
  seriea: "SA",
  bundes: "BL",
  ligue1: "L1",
  erediv: "ERE",
  liga: "LP",
  nba: "NBA",
  atp: "ATP",
  nfl: "NFL",
  lol: "W",
};
const COUNTRY_FLAG: Record<string, string> = {
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Europe: "🇪🇺",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Netherlands: "🇳🇱",
  Portugal: "🇵🇹",
  USA: "🇺🇸",
  Esports: "🎮",
};
export const countryFlag = (country?: string) =>
  (country && COUNTRY_FLAG[country]) || "🌍";

export const compShort = (id: string) =>
  COMP_SHORT[id] ?? id.slice(0, 3).toUpperCase();
export const outcomeById = (id: string) => {
  for (const mt of MATCHES)
    for (const mk of mt.markets)
      for (const o of mk.outcomes)
        if (o.id === id) return { outcome: o, market: mk, match: mt };
  return null;
};
