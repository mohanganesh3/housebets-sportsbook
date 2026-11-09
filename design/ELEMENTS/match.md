# Element Cards — Match page (v1, 20pts tie-break)

† verify at token lock · motion per research/55 registry · cards cite P-rules

## E-MA-01 Match header (sticky)
WHERE: page top, sticks under shell bar on scroll — crests+score NEVER leave frame
SHOWS: ◂ comp+matchday | crests-32 + names | score big font-num 24 | 🔴 LIVE + clock 67' | ★ follow | venue micro
PHONE: condenses to single line on scroll (names shrink, score+clock persist)
MOTION: score roll on goal (registry #5 beat-1); sticky condense 200ms
FAILURE: header eats >96px phone → condense state mandatory
A11Y: role=banner, score live-labelled (not live-region)

## E-MA-02 Market-context strip
WHERE: directly under header, sticky with it; horizontal 1X2 cells mini (h-36)
WHY: headline price never scrolls away — THE differentiator [P1]
MIRROR of the Match result board cells — tap either = same pick, same selected state (one source of truth)
FAILURE: strip desyncs from board → render from same store slice, test asserted
A11Y: labelled "Match result quick prices"

## E-MA-03 Market tabs
Popular | All | Goals | Corners | Cards | Specials (+counts)
WHY: two speeds — 90% of bettors only check Popular (Pareto R-YAB); depth behind All
A11Y: roving tabindex, arrow keys, aria-selected
PHONE: horizontal scroll if overflow (tab pattern, not pills)

## E-MA-04 Market group ▸ (collapsible)
WHERE: board headers; ▸ chevron + name + count + expand state
KEYBOARD: Enter/Space toggles, aria-expanded, focus stays on header
MOTION: height spring 200ms interruptible; content fade 150ms delayed 50ms; RM=instant
FAILURE: content jump → animate height, never margin

## E-MA-05 Odds board cell grids
Per ELEMENT-LAW §1 atom; layouts: 3-col 1X2 · 2-col Yes/No · correct-score grid (score labels INSIDE cells above odds)
SPECIAL: O/U lines show line+price pair "Over 2.5 · 1.95"
FAILURE: line unlabeled → every O/U cell carries its line (no header-only context)

## E-MA-06 Goal cascade choreography
TRIGGER: world store goal event (or scenario dock)
SEQUENCE: (0ms) score roll → (0ms) ALL cells lock + amber band "Suspended — reviewing after goal" → (1200ms) bands lift bottom-up, 80ms stagger, markets reprice w/ direction → (~2.5s) calm
RM TWIN: instant lock + instant prices + toast "Goal — prices updated"
BUDGET: cascade = ONE moment (RHYTHM §3); no other signals during window
FAILURE: mid-cascade new event → queue beats, never overlap
A11Y: toast+status announces "Goal, Arsenal 1-0, prices updated"

## E-MA-07 Suspension band (per board + whole-page)
WHERE: overlays board region in-frame (never toast — reason must live WHERE the cells locked)
SHOWS: 🔒 "Suspended — <reason>" + duration "8s" live-updating
REASONS: honest copy — VAR review / after goal / medical / feed delay
R-YAB-19: band NEVER swallows the +N› link or row identity
FAILURE: reason unknown → "Suspended" generic + "markets resume shortly" (still honest, never fake)

## E-MA-08 Clock
LIVE: 67' ticking + stoppage "+3" · HT: "Half-time" stopped · FT: "Full-time" grey
TRUTH: clock derives world store — offline → freezes + offline strip (B03 verified)
FAILURE: clock must never run ahead of data — freeze, don't extrapolate

## E-MA-09 Correct-score grid
Special cell: score top (num 12 text-2†), price bottom (num 13 bold)
WHY: grid reads fastest for score markets (gestalt uniform connectedness)
PHONE: 3-col scroll grid; touch ≥44

## E-MA-10 Player/specials rows
First goalscorer etc: name + price cell, alphabetical; sample data honest
SCOPE: if no sample data exists, board omits — no fake depth

## E-MA-11 FT settled view
Boards → read-only, winning cells marked ✓ success edge; header "Full-time"
Ticket link "Your settled bets ›"; Same-again disabled "Match ended" (B10)

## E-MA-12 Reconnect/paused state
Feed stale: banner "Prices paused — reconnecting" + cells dimmed unplaceable + retry
WHY: truth > activity; never show prices we can't honour (P2)

Cards: 12. Challenge pending pre-D-build. Evidence pending.
