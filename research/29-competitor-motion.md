# research/29-competitor-motion.md — Motion-Identity + Microcraft Teardown

**Grades:** [docs] official design-system docs · [obs] observed/reported · [inf] inferred from consensus

## Industry mechanics

**Odds ticks:** directional cell flash ≈150–300ms ease-out then rest; honesty rule = flash ONLY on genuine feed deltas (never mount/rerender); arrows persist muted after flash fades (bwin/BetBurger pattern — residue of "what just happened"); direction-aware number roll = old value exits up+new enters up on lengthen (reversed on shorten), color rides during motion only; odds pill six states `default/hover/selected/suspended/price-up/price-down`; Action Network ships a user toggle for odds-change animation. Note: green/red direction semantics VARY by book — our ▲green-up/▼red-down + persistent arrow is defensible.

**Slip-add:** NO documented fly-to-slip on major books — standard is triple-feedback: cell state change + badge pop (spring ~500/28) + row slide-in, simultaneous. FanDuel Fast Bet sheet appears on first selection anywhere; Sheets spec: pinned bottom, 8px top radius, elevation-high, 60% dim optional, drag handle, summary→full-screen expand. Slip persistence across navigation = Shuffle signature.

**Suspension:** bet365 = the gold standard — odds replaced by symbol/grey, instant, **same frame** as incident, dead still (absence of motion IS the signal). Loud, immediate, unbettable.

**Skeletons:** reuse real row markup + `is-loading`, one shared shimmer L→R ~1.4s, 60ms staggered fade-in, `aria-busy`+`role="status"`, shimmer off under reduced-motion. Shimmer reads premium, pulse reads fine.

**Route transitions:** crypto books = instant swap (speed IS the brand); FanDuel 200–500ms documented system (standard `cubic-bezier(0.4,0,0.2,1)`); DK event drawer + swipe-between-events; bet365 ~zero transitions. **Verdict for us: ≤200ms or none; shared-element only for match-row→match-page.**

**Microcopy:** imperative fragments on money surfaces ("Place Bet", "Cash Out £14.32" — value inside the button); DK conversational question-form in promos only; "Placing your bet in X seconds" pending copy is copy-not-spinner; empty states instructional ("Click the odds to add selections").

## The "expensive" 10%

1. Tabular numerals on all odds (Smarkets codified; jitter = cheap)
2. Honest motion only — feels like trading terminal not slot machine
3. Type as trust — tight tracking, heavier weight on scannable odds
4. Negative space inside density
5. Perceived performance IS premium (Stake "fintech product"; Duelbits polish-over-perf reads hollow)
6. Branded art as one family (one light source/material)
7. Persistent state (slip survives nav)
8. Shuffle's craft = discipline: one accent family, consistent radius, speed — restraint over ornament

## Per-book identity cards

- **Stake** — fintech terminal in a casino coat: tersest copy, instant swap, slip + stream column, public bet feed ticker.
- **Shuffle** — restraint champion: black+purple, slip persists casino↔sports, split-screen live, craft = consistency+speed.
- **Rollbit** — trading desk + arcade: direction-encoding CTA (green Up/red Down).
- **Duelbits** — cautionary: premium look, weak WebVitals → hollow.
- **bet365** — honest machine: density as virtue, accept-or-reject reprice dialog, symbol-suspension same-frame.
- **Pinnacle** — Bloomberg for sharps: stake-OR-win input, near-zero motion.
- **FanDuel** — motion systematizer: 200–500ms intent motion, Fast Bet sheet.
- **DraftKings** — dense friend: question-form offers, event drawer swipe, SGP slickest.

## Derived tasks → our build

Ordered: (1) OddsCell six-state machine [ours: 5, add hover]; (2) honest-flash-only audit — confirm flashes never fire on mount/rerender; (3) direction-aware number roll (whole-string, not per-digit); (4) persistent muted caret post-flash — done (9s); (5) suspended = dead same-frame state; (6) tnum everywhere odds render; (7) triple-feedback on tap; (8) fast-bet sheet physics; (9) slip persistence across route changes — already; (10) skeleton=real markup+shimmer; (11) motion tokens dur {150/250/400} + Material curves; (12) route transitions ≤200ms or none; (13) batched odds feed via rAF; (14) in-slip reprice accept flow — done; (15) "Placing in Xs" pending copy; (16) microcopy system; (17) empty slip = popular picks; (18) press physics whileTap 0.97; (19) suspension same-frame integrity test; (20) reduced-motion contract; (21) odds-flash toggle in settings; (22) toast replace-not-stack + undo on remove.

**Identity thesis:** bet365 honesty + FanDuel systematic motion + Shuffle restraint. Skip Rollbit density, Duelbits perf trap.
