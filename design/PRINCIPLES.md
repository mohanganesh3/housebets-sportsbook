# Design Principles — Housebets Sportsbook (v1)

Five principles. Every element card and screen decision cites ≥1 (P-IDs). Conflict resolution: P2 outranks everything; P1 outranks decoration.

## P1 — The price is the product
Odds, stakes, returns, balance: tabular lining numerals, fixed-width cells, right-aligned, zero layout shift on change. A price never moves silently — direction is triple-coded (glyph + colour + motion).
*Example:* odds cell showing 1.80→2.05 with ▲ + green edge + digit roll. *Counter-example:* old build's plain text that changed without direction.

## P2 — Never surprise a player's money
Every money action is explicit: stake visible beside returns, moved odds require consent (ask-first default), suspension locks in the same frame with a reason, cash-out reconfirms changed values, one tap = one bet. Errors name what happened, that money is safe, and the recovery action.
*Example:* reject-at-999999 with "Not enough balance", no debit. *Counter-example:* Stake's silent 5–20s dead delay (most-hated pattern per T10/T2).

## P3 — Live is calm, not loud
The board breathes; it doesn't shout. Attention budget per screen is written; while the ticket is being edited, board motion dims. Wins get a soft glow under three seconds — no confetti, no urgency theatre beyond real price refresh (judge's own rule; Schüll charter T5).
*Example:* goal → score rolls once, affected markets lock then reprice in order. *Counter-example:* pulsing banners, promo carousels, manufactured countdowns.

## P4 — Familiar first, authored always
Bettors' conventions are law (Jakob): 1X2 rows, live badge, right-rail/bottom-bar slip, market tabs, Open/Settled. Authorship lives inside them: custom glyphs, crest silhouettes, illustrated motif, pale-cyan CTA law — never borrowed looks from other books, never AI-template defaults.
*Example:* their amber suspension band + our reason chip nobody else ships. *Counter-example:* initials-in-disc crests, pill-row nav, hero-card sameness.

## P5 — One picture, one hand, one page
The mental map is identical phone and desktop: left/top = where am I, centre = the match, right/bottom = my ticket. One primary action per state, in the thumb's easy zone at 390. Bet slip and My bets are ONE surface everywhere.
*Example:* slip bar shows the actual pick (`❶ Arsenal @ 1.30 ⌃`), not a count. *Counter-example:* desktop panel vs a different phone flow that forgets picks on refresh (the #1 real-world slip pain, T10a).

## Precedence notes
- P2 (money truth) beats P3 (calm): a suspended market locks loudly, instantly — calm never delays truth.
- P4 familiar beats P1 flourish: if a motion makes the board unfamiliar, familiarity wins.
- All five yield to the scope ban list and the ethics charter (research/52).
