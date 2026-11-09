export type SportKey =
  | "soccer"
  | "tennis"
  | "basketball"
  | "baseball"
  | "american-football"
  | "esports"
  | "ice-hockey"
  | "cricket"
  | "volleyball"
  | "rugby";

export type MatchStatus = "scheduled" | "live" | "finished";
export type MarketStatus = "open" | "suspended";
export type OddsDir = "up" | "down" | null;

export interface Team {
  id: string;
  name: string;
  short: string;
  hue: number;
}
export interface Competition {
  id: string;
  name: string;
  short: string;
  country: string;
  flag: string;
  sport: SportKey;
  followed?: boolean;
}

export interface Outcome {
  id: string;
  name: string;
  price: number;
  status: MarketStatus;
}

export interface Market {
  id: string;
  key: string;
  name: string;
  group: MarketGroupKey;
  status: MarketStatus;
  outcomes: Outcome[];
  popular?: boolean;
}

export type MarketGroupKey =
  | "popular"
  | "goalscorers"
  | "goals"
  | "players"
  | "halves"
  | "handicaps"
  | "corners"
  | "minutes";

export interface Match {
  id: string;
  sport: SportKey;
  competitionId: string;
  home: Team;
  away: Team;
  status: MatchStatus;
  minute: number | null;
  period: string | null;
  score: { home: number; away: number };
  kickoffAt: number;
  markets: Market[];
  featured?: boolean;
}

export interface SlipSelection {
  outcomeId: string;
  matchId: string;
  marketId: string;
  marketName: string;
  pick: string;
  priceAtPick: number;
  livePrice: number;
  status: "active" | "changed" | "suspended";
  stake: string;
  /** Auto-accepted move fact (E-06): consent pre-given by the mode
   *  control, announced on the leg — better under "Better only"/"Any",
   *  worse under "Any". Persists until the next event on this leg. */
  moved?: { from: number; to: number; kind: "better" | "worse" };
}

export type SlipStatus =
  | "idle"
  | "placing"
  | "placed"
  | "failed"
  // D-19: the response was lost (offline blip / suspend mid-flight / killed
  // tab). The request may have LANDED — never claim "untouched", never
  // blind-retry. Reconcile in My bets first.
  | "unconfirmed";

export interface Bet {
  id: string;
  placedAt: number;
  matchId: string;
  marketId: string;
  outcomeId: string;
  pick: string;
  marketName: string;
  odds: number;
  stake: number;
  returns: number;
  result: "open" | "won" | "lost" | "void" | "cashedout";
  cashout?: {
    value: number;
    was: number;
    factor: number;
    status: "available" | "suspended" | "unavailable";
  };
  settledNote?: string;
  /** Idempotency key (D-19): a retried submit carries the same key, so
   *  the ledger can never mint the same bet twice. */
  idemKey?: string;
  /** Fixture label for ledger records whose match isn't in this book
   *  (settled seed bets on fixtures the demo doesn't model). */
  fixture?: string;
}
