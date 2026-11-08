import type { Match } from "./types";

// Single source of truth: a match is "followed" if the match itself,
// either of its teams, or its competition is starred.
export function isMatchFollowed(m: Match, follows: Set<string>): boolean {
  return (
    follows.has(m.id) ||
    follows.has(m.competitionId) ||
    follows.has(m.home.id) ||
    follows.has(m.away.id)
  );
}
