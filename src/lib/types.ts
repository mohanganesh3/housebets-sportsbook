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
  | "minutes"
  | "specials";

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
}

export type SlipStatus = "idle" | "placing" | "placed" | "failed";

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
}
