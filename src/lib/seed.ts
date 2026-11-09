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

const FICTIONAL_PLAYERS = [
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
];

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
    a = m.away.name;
  const g = (over: number, under: number) =>
    m3(m.id, "tg25", "Total goals", "goals", [
      [`Over 2.5`, over],
      [`Under 2.5`, under],
    ]);
  const list: Market[] = [
    m3(
      m.id,
      "h2h",
      "Match result",
      "popular",
      [
        [h, 1.85],
        ["Draw", 3.6],
        [a, 4.4],
      ],
      { popular: true },
    ),
    m3(
      m.id,
      "dc",
      "Double chance",
      "popular",
      [
        [`${m.home.short} or draw`, 1.28],
        [`${m.home.short} or ${m.away.short}`, 1.35],
        [`Draw or ${m.away.short}`, 2.1],
      ],
      { popular: true },
    ),
    m3(
      m.id,
      "btts",
      "Both teams to score",
      "goals",
      [
        ["Yes", 1.75],
        ["No", 2.05],
      ],
      { popular: true },
    ),
    g(2.1, 1.7),
    m3(m.id, "ah1", `Handicap ${m.home.short} (-1)`, "handicaps", [
      [`${m.home.short} -1`, 2.9],
      [`${m.away.short} +1`, 1.42],
    ]),
    m3(m.id, "h1", "1st half result", "halves", [
      [h, 2.5],
      ["Draw", 2.05],
      [a, 5.5],
    ]),
    m3(m.id, "h2", "2nd half result", "halves", [
      [h, 2.6],
      ["Draw", 2.15],
      [a, 5.0],
    ]),
    m3(m.id, "corners", "Total corners", "corners", [
      ["Over 9.5", 1.85],
      ["Under 9.5", 1.95],
    ]),
    m3(m.id, "cards", "Total cards", "corners", [
      ["Over 4.5", 2.05],
      ["Under 4.5", 1.75],
    ]),
    m3(
      m.id,
      "gs_any",
      "Anytime goalscorer",
      "goalscorers",
      FICTIONAL_PLAYERS.slice(0, 6).map(
        (n) => [n, +(1.9 + Math.random() * 3).toFixed(2)] as [string, number],
      ),
    ),
    m3(
      m.id,
      "gs_first",
      "First goalscorer",
      "goalscorers",
      FICTIONAL_PLAYERS.slice(0, 5).map(
        (n) => [n, +(4 + Math.random() * 4).toFixed(2)] as [string, number],
      ),
    ),
    m3(m.id, "min1", "Goal in minutes 1-15", "minutes", [
      ["Yes", 3.4],
      ["No", 1.3],
    ]),
    m3(
      m.id,
      "p_motm",
      "Player of the match",
      "players",
      FICTIONAL_PLAYERS.slice(6, 10).map(
        (n) => [n, +(6 + Math.random() * 5).toFixed(2)] as [string, number],
      ),
    ),
    m3(m.id, "sp_cs", "Correct score", "specials", [
      ["1-0", 6.5],
      ["2-1", 8.0],
      ["0-0", 9.0],
      ["1-1", 6.0],
    ]),
  ];
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
];

// Fix new-eve suspended to demo state (matches wireframe)
const newEve = MATCHES.find((x) => x.id === "new-eve")!;
newEve.markets.find((x) => x.key === "h2h")!.status = "suspended";
const atmSev = MATCHES.find((x) => x.id === "atm-sev")!;
atmSev.markets.find((x) => x.key === "h2h")!.status = "suspended";

// Arsenal-Brighton: exact wireframe odds
const flagship = MATCHES.find((x) => x.id === "ars-bha")!;
const h2h = flagship.markets.find((x) => x.key === "h2h")!;
h2h.outcomes[0].price = 1.3;
h2h.outcomes[1].price = 4.6;
h2h.outcomes[2].price = 11.0;
const dc = flagship.markets.find((x) => x.key === "dc")!;
dc.outcomes[0].price = 1.03;
dc.outcomes[1].price = 1.18;
dc.outcomes[2].price = 3.3;
const tg = flagship.markets.find((x) => x.key === "tg25")!;
tg.outcomes[0].price = 2.73;
tg.outcomes[1].price = 1.44;

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
export const outcomeById = (id: string) => {
  for (const mt of MATCHES)
    for (const mk of mt.markets)
      for (const o of mk.outcomes)
        if (o.id === id) return { outcome: o, market: mk, match: mt };
  return null;
};
