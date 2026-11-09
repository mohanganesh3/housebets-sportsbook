# Element Cards — Home · Live · Football shared board elements (v1)

The list/board vocabulary — one set of atoms across all three list screens.

## E-BD-01 Section header `Label · N ›`
WHERE: every list section (Your matches, Live now, Starting soon, league groups)
LAW: count always present (A37a); › deep-links when a fuller view exists
TYPE: label body bold 13 text-2† caps; count num 12
FAILURE: stale count → store-derived or it's a correctness bug

## E-BD-02 Match row (the list atom)
ANATOMY: `[crest+name block] [status col] [odds 3up] [+N ›]` — SAME order all screens [P4/P5]
SIZE: h-56 two-line teams / h-44 single-line; hairline border-soft below
STATUS COL variants: 🔴LIVE+clock+score | 🕐time ("14:30"/"Today") | FT | Postponed
MOTION: score roll on change; row flash = team-colour 2px left-edge 200ms (not full-row bg — calm lists)
TAP: row → match page; cells → pick (two targets, no accidental navigation from cell taps)
A11Y: row role=link "Arsenal versus Brighton, live 67 minutes, 1 nil"; cells buttons "Back Arsenal at 1.30"

## E-BD-03 League group header (collapsible)
crest-24 + name + live-count badge + ▸; collapse persists per session
KEYBOARD: Enter/Space + arrows through rows
LAW: suspended band inside group never swallows rows' +N› (R-YAB-19)

## E-BD-04 Odds 3up cell group
Three cells, gap-1; the ELEMENT-LAW atom; +N› cell at end (surface-1 ghost, count only)
MOBILE 360: cells ≥56w — if tight, +N moves to row end full-height
FAILURE: odds truncate → min-content width, never clip digits

## E-BD-05 Move edges (persistent direction)
Moved cell keeps 2px tinted left-edge (up=success/down=tick-down) until NEXT move or page nav — direction survives the roll, solves "did that move?" blindness (selective attention research)
FAILURE: edges must clear on new move — re-tint, don't stack

## E-BD-06 Countdown (Starting soon)
"Starts in 04:12" real countdown, ticks 1s silent text — NO motion per tick (ambient rule)
<60s: switches to "Starting now" then flips LIVE — honest handoff

## E-BD-07 Masthead (home only)
Frame: full-bleed illustrated fixture card(s), CSS scroll-snap, manual controls (‹ › dots), NO auto-advance (calm law; carousel slop)
ART: per-fixture illustration (brief: ILLUSTRATION-BRIEF.md) + kinetic team type overlay
A11Y: region labelled, controls buttoned, slide change announces

## E-BD-08 Favourites chips
★ + comp/team crest + ×; reorderable? (PENDING — nice-to-have); × removes + undo toast
EMPTY: not rendered (never an empty band)

## E-BD-09 Competition tile (football/home grids)
crest-40 + name + "N matches" + ★corner; authored tile art variant (PENDING-ILLUST)
TAP → competition section/page anchor

## E-BD-10 Edit-mode board dimming
Ticket open on phone / editing stake → board signals dim to ~40% opacity (CSS class, cheap)
WHY: attention budget (RHYTHM); the money being edited wins — T10 anxiety pattern killed
RM: dim is opacity not motion — same for all users

## E-BD-11 Board-status line (live page)
"Live prices · updated 4s ago" ticking silently | stale → "Prices paused — reconnecting" warn
WHY: books never admit staleness; we do (trust differentiator, T10 #2)

Cards: 11. Challenge pending. Evidence pending.
