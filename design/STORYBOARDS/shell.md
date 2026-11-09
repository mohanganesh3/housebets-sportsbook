# Storyboard — Shell (top bar · left nav · side panel · phone bottom bar)

Frames at 390 and 1440. Cards referenced by ID (ELEMENTS/shell.md). Principle cites in [P#].

## Design intent
The shell IS Housebets — the single biggest "feels like Housebets" carrier after tokens. Wireframe + live-site conventions are law: centered prize widget, pale-cyan Register, icon rail, right slip panel, 67px phone bar. Elevation = tighter spacing, real hierarchy, no dead controls [P4].

## Frame S1 — Desktop 1440, default state
```
┌────────────────────────────────────────────────────────────────────┐
│ ☰  housebets        [Weekly race $50,025]      🔍⌘K  💬  [Deposit] │
│                                                                   │ ← top bar h=60 [P1: balance+search top]
├────┬──────────────────────────────────────────┬───────────────────┤
│ H  │                                          │ Bet slip (1)      │
│ L● │        page content (varies)             │ My bets (8)       │
│ F  │                                          │ Chat              │
│ ★9 │                                          │ ┌───────────────┐ │
│    │                                          │ │ selection…    │ │ ← right panel w≈340, always visible [P5]
│ ❤  │                                          │ │ Place bet     │ │
└────┴──────────────────────────────────────────┴───────────────────┘
```
Left rail w=72 icon-only: Home · Live● · Football · Following9 · My bets (count badges). Center = the page. Right rail = the ticket — one living object, never a modal [P4 familiar, P5 picture].

## Frame S2 — Phone 390, default state
```
┌──────────────────────────┐
│ housebets      T1,250 D+ │ ← compact top bar: logo, balance+Deposit [P1]
├──────────────────────────┤
│      page content        │
│                          │
├──────────────────────────┤
│ ❶ Arsenal @1.30 ⌃       │ ← slip bar ABOVE tab bar, shows the pick [P5]
├──────────────────────────┤
│ Menu Sports Casino Chat  │ ← h=67 bottom bar (verbatim labels)
└──────────────────────────┘
```
Slip bar: count + pick + odds + chevron → opens sheet (Frame S4). Menu = left-nav sheet (sports list). Chat = community.

## Frame S3 — Search palette (⌘K / tap)
```
┌─────────────────────────────┐
│ 🔍 Teams, players, comps…   │ ← dialog, input focused
├─────────────────────────────┤
│ MATCHES                     │
│ ○ Arsenal v Brighton   LIVE │ ← world-state badge (not seed-stale)
│ TEAMS · COMPS · MARKETS     │
└─────────────────────────────┘
```
Esc closes, arrows+Enter navigate, focus restored on close [P2].

## Frame S4 — Phone slip sheet (from S2 bar)
```
┌──────────────────────────┐
│        ▂ (drag)          │
│ Bet slip(1) My bets Chat │ ← three tabs, same surface [P5]
├──────────────────────────┤
│ card: pick, market, ✕    │
│ odds old→new if moved    │
│ stake [ 10.00 ] chips    │
│ Returns 23.00            │
│ [    Place bet      ]    │ ← pale-cyan CTA [P1/P4 brand law]
│ Session · limits line    │ ← RG cue [P2]
└──────────────────────────┘
```
Velocity-aware drag-to-dismiss; blur/tab-hide safe; scrim behind.

## Frame S5 — Desktop slip panel states
right panel default = Bet slip tab; badge counts live. Empty slip → authored empty state + "browse live" next step [X05]. Odds-moved selection → per-leg old→new + accept row [P2].

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
