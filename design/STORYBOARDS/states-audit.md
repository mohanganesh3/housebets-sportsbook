# Storyboard — State coverage & audit surfaces

## A. Authored empty/error states (X05 — every list state gets a designed state, never a blank)

| State | Copy pattern | Art | Next step |
|---|---|---|---|
| Empty slip | "Tap any odds cell to start a ticket" | hubie-empty | › Live now |
| Empty My bets | "No bets yet — tickets land here after placing" | hubie-empty | › Live now |
| No live matches | "Nothing live right now" | pitch-geometry dim | › Starting soon |
| No follows | "Follow a competition to pin it here" | star glyph large | ★ demo on nearest comp |
| Search empty | "No matches for 'xyz'" | — | suggestion chips |
| Offline | "Offline — prices frozen. Bets can't be placed." | warn band | auto-retry + retry btn |
| Reconnecting | "Prices paused — reconnecting" | warn band | auto |
| Break active | "You're on a break until 14:32" | neutral | End break (confirm) |
| Suspended leg | "Suspended — <reason>" | amber band | Remove leg / wait |
| Settlement fail | "Settlement delayed — we'll retry" | — | auto-retry |
| Placement reject | reason + "No money moved" | hubie-error | fix-the-thing hint |

## B. Hidden design-system audit page (`/__audit`)

Purpose: judge+ourselves can inspect the whole system on one page. Hidden route (not nav-linked), deep-linkable for review.

Sections: token swatches (all colours + measured contrast on surface) · type scale hb-11→hb-40 rendered · the 5 chips live · odds cell all 7 states · buttons ×3 fills × states · list atom variants · sheet/panel anatomy · motion demos w/ RM toggle · crests+glyphs set · illustration frames · empty-state gallery · a11y notes per component.

## C. States matrix (product-level, drives scenario dock)

World states the dock must reach in one tap: live-playing · suspended-market · suspended-match · goal-flash · FT-settling · offline · reconnecting · empty-boards · odds-moving · break-active. Each maps to B-row + element states.
