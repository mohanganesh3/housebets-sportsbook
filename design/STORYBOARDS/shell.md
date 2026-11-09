# Storyboard — Shell (top bar · left nav · side panel · phone bottom bar)

Frames at 390 and 1440. Cards referenced by ID (ELEMENTS/shell.md). Principle cites in [P#].

## Design intent
The shell IS Housebets — the single biggest "feels like Housebets" carrier after tokens. Wireframe + live-site conventions are law: centered prize widget, pale-cyan Register, icon rail, right slip panel, 67px phone bar. Elevation = tighter spacing, real hierarchy, no dead controls [P4].

## Frame S1 — Desktop 1440, default state
```
┌────────────────────────────────────────────────────────────────────┐
│ ☰  housebets     [👑 Weekly Prize $50,025.00]  🔍⌘K 💬 ₮1,250 [Deposit] │
│                                                                   │ ← top bar h=60 [P1: balance+search top]
├────┬──────────────────────────────────────────┬───────────────────┤
│ H  │                                          │ Bet slip (1)      │
│ L● │        page content (varies)             │ My bets (1) ✕     │ ← badge = OPEN count only
│ F  │                                          │ Chat              │
│ ★9 │                                          │ ┌───────────────┐ │
│    │                                          │ │ selection…    │ │ ← right panel w≈340, toggle-able [P5]
│ 👤 │                                          │ │ Place bet     │ │
└────┴──────────────────────────────────────────┴───────────────────┘
```
Left rail w=72 icon-only: Home · Live● · Football · Following9 · Casino · My bets (👤 person glyph; badges = actionable counts only — hidden at 0). Center = the page. Right rail = the ticket — one living object, never a modal; ✕ on tab row + top-bar ⊟ toggle collapse it to reclaim content width [P4 familiar, P5 picture]. On `/bets` page the panel defaults to Bet slip tab (page shows My bets — never the same list twice). ☰ collapses the rail to icons-only w=48 (labels already sr-only → collapsed = tighter icons).

## Frame S2 — Phone 390, default state
```
┌──────────────────────────┐
│ housebets      ₮1,250 +  │ ← compact top bar: logo, ₮glyph+balance, Deposit [P1]
│ ⌕ Search teams, players… │ ← full-bleed search row h-44 (wireframe row 2)
├──────────────────────────┤
│      page content        │
│                          │
├──────────────────────────┤
│ ❶ Singles · Arsenal…@1.30⌃│ ← slip bar ABOVE tab bar, shows the pick [P5]
├──────────────────────────┤
│ Menu Sports Casino Chat ★│ ← h=67 bottom bar, 5 cells
└──────────────────────────┘
```
Slip bar: `Singles` + count + pick (truncated "Brighton & Hove…") + odds + chevron → opens sheet (Frame S4). Multi-pick: `Singles · N selections` + LAST-ADDED pick name. Menu = left-nav sheet (sports list). Bottom bar 5th cell = ★ Following — fills the wireframe's promo-avatar geometry without shipping a promo (decision documented: promo avatar DROPPED — out-of-scope + ad-signal per T4 §5). Active cell = Sports (wireframe law). Casino → honest "Casino isn't in this demo" sheet state, not a dead control. Scroll padding = bar height + safe-area so the bar never occludes the last row (P51-07).

## Frame S3 — Search palette (⌘K / Ctrl+K twin / tap)
```
┌─────────────────────────────┐
│ 🔍 Teams, players, leagues… │ ← dialog, input focused (verbatim placeholder)
├─────────────────────────────┤
│ zero-query (the authored    │
│   bit nobody ships):        │
│ LIVE NOW      Arsenal 1-0 ▸ │
│ YOUR TEAMS    ★Premier Lg ▸ │
│ NEXT KICKOFFS Sat 14:30 ▸   │
├─────────────────────────────┤
│ typed → MATCHES             │
│ ○ Arsenal v Brighton   LIVE │ ← world-state badge (not seed-stale)
│ TEAMS · COMPS · MARKETS     │
└─────────────────────────────┘
```
Esc closes, arrows+Enter navigate, focus restored on close [P2]. `⌘K` label swaps to `Ctrl+K` on non-Apple platforms.

## Frame S4 — Phone slip sheet (from S2 bar)
```
┌──────────────────────────┐
│        ▂ (drag)          │
│ Bet slip(1) My bets Chat✕│ ← three tabs + ✕ close, h-40 (P51-05)
├──────────────────────────┤
│ Singles · 1 selection    │ ← wireframe header line + Clear all (right, ghost)
│ ┌────────────────────┐   │
│ │crest Arsenal    ✕ │   │ ← ✕ removes the leg
│ │Match result @1.30 │   │
│ │v Brighton · 1-0 52'│  │ ← LIVE CONTEXT inside ticket (score+minute)
│ └────────────────────┘   │
│ odds old→new if moved    │
│ stake [ 10.00 ] chips    │
│ Total stake ₮10.00       │
│ Payout ₮19.00            │ ← verbatim Payout label
│ [    Place bet      ]    │ ← pale-cyan CTA [P1/P4 brand law]
│ ▓ Session chip ▓         │ ← contrast chip (Lole: must-see ≠ grey micro)
└──────────────────────────┘
```
Height: snap-to-content, cap ≈55% viewport (wireframe W5-03 — a 1-leg slip never opens a half-empty 85% sheet). Velocity-aware drag on handle + sheet-header region; scroll-up at list-top hands to drag; scrim behind freezes board flashes (E-BD-10). Focus trap; Esc closes; focus returns to slip bar. Sheet-over-sheet: Deposit/palette open above with their own traps — Esc unwinds stack top-first. Offline while open: banner state ALSO renders inside the ticket — Place bet disabled + inline "Prices frozen — bets can't be placed" at the CTA, per-leg frozen styling (never a banner hidden under the scrim).

## Frame S5 — Desktop slip panel states
Right panel default = Bet slip tab; badge = open/actionable count (hidden at 0). Empty slip → AUTHORED state: ghost ticket-stub outline (perforated edge, the ticket's own silhouette) + "Tap a price — it lands here" + 2–3 real live prices as quick-pick cells — teaches the product's one magic trick, never apologizes [X05]. Odds-moved → per-leg old→new + accept row. Pending→receipt→rejection beats: owned by slip-page.md §2 (same component, two widths — the rail IS the page component). Suspended-in-slip: amber leg band + reason (E-SL-02/03). Offline: Place bet disabled + in-ticket inline reason (S4 law).

## Frame S6 — Breakpoint geometry (owns every resize a judge drags)

| width | left nav | right ticket | top bar |
|---|---|---|---|
| ≥1024 | icon rail w=72 | right panel w≈340 (toggle-able) | full: logo·prize·search·chat·balance·Deposit |
| 768–1023 | icon rail w=72 | **slip-bar model** (fixed bottom bar as phone, above nothing — no bottom tab bar on desktop widths; bar docks at bottom-center max-w-420) | full minus prize widget |
| <768 | bottom bar h=67 (Menu·Sports·Casino·Chat·★) | slip bar + sheet | compact: logo·balance·Deposit; search row moves into content |

RESIZE RULE (owns the judge's drag): an **open phone sheet** while crossing ≥768 morphs to the docked slip-bar (sheet animates down-off, bar carries the same ticket — stake, selections, tab all preserved; focus moves to bar). An **open docked sheet/panel** while crossing <768 morphs to the bottom sheet at the same snap height. Ticket state is one object — geometry is the only thing that changes. Collapsed-panel toggle state persists per session. Menu sheet (phone-only) closing on widen: closes, no desktop equivalent needed since rail appears.

## Interactions (all verified B-rows)
- ⌘K / click search → palette; Esc closes; Enter navigates
- Tap odds cell anywhere → pick appears in panel (desktop) or bar count bumps + bar shows pick (phone)
- Deposit → dialog, chip credit, Esc close [B04]
- Menu (phone) → sheet with full nav; Chat → panel/tab
- Offline → banner honesty, no fake actions [B03]

## Elevation vs wireframe (must beat, A2)
1. Prize widget ticks subtly — their static text → living brand heartbeat (motion law allows ambient <400ms, non-money)
2. Slip bar shows the PICK not just count (their own convention, kept and honored)
3. Search results carry world-state LIVE badges — no stale seed
4. Session/limits line inside the ticket, not buried in footer
5. Every nav item reachable ≤2 taps; dead controls = zero

## Failure modes
- Sheet open + route change → sheet persists (state survives nav B12)
- Deposit during placement → modal queues, no debit conflict
- Slip count stale after FT settle → badge recounts from store

## Evidence to file
qc/shots/<sha>/shell-{390,1440}-{default,search,sheet}.png · sheet-drag recording · focus-ring captures
