# QC Recheck Register

Every interactive element and animation, with expected behaviour. Each row logs recheck verdicts (P=pass F=fail) at 390px and 1440px with date. Target: ≥10 logged rechecks/row before freeze. `·` separates checks; latest first.

| # | Element | Expected | 390 rechecks | 1440 rechecks |
|---|---------|----------|--------------|---------------|
| 1 | Odds cell tap | Adds selection, pill/slip updates, cell highlights | P 9Nov | P 9Nov |
| 2 | Odds flash | Direction arrow + tint only on real price moves | P 9Nov | P 9Nov |
| 3 | Suspended market | Lock + amber band on rows; card cells locked, aria-disabled | P 9Nov | P 9Nov |
| 4 | Slip pill (phone) | Count + pick + price + Pays total; opens sheet | P 9Nov | n/a |
| 5 | Slip sheet drag | Velocity-aware dismiss, springs back under threshold | P 9Nov | n/a |
| 6 | Stake input | Numeric, keyboard-safe, returns calc live | P 9Nov | P 9Nov |
| 7 | Place bet | Confirms, clears slip, lands in My Bets open | P 9Nov | P 9Nov |
| 8 | Cash out | Live value ticks; confirm → settled cashed_out | P 9Nov | P 9Nov |
| 9 | Follow star (row/comp/team) | Toggles gold; Following page updates | P 9Nov | P 9Nov |
| 10 | Follow chip (match head) | Follow↔Following, gold/ghost | P 9Nov | P 9Nov |
| 11 | Market group tabs | Sticky; counts match real markets; "My markets" pins | P 9Nov | P 9Nov |
| 12 | Market search | Scans all groups; empty→clear state | P 9Nov | P 9Nov |
| 13 | Pin market (star) | Adds to My markets group, toast | P 9Nov | P 9Nov |
| 14 | Breadcrumb pills | Sport › region › comp › match selector | P 9Nov | P 9Nov |
| 15 | Search palette (⌘K) | Opens, filters teams/comps/matches, navigates | P 9Nov | P 9Nov |
| 16 | Bottom bar (phone) | Menu/Sports/Casino/Support-FAB/Chat all act | P 9Nov | n/a |
| 17 | Menu sheet → Demo states | Opens ScenarioDock | P 9Nov | n/a |
| 18 | ScenarioDock | Every scored state one tap; states also occur naturally | P 9Nov | P 9Nov |
| 19 | Sheet physics | drag handle, blur/tab-hide safe | P 9Nov | P 9Nov |
| 20 | View transitions | Typed transitions; off under reduced-motion | P 9Nov | P 9Nov |
| 21 | Hero letterbox | One-shot mount reveal, no LCP delay | P 9Nov | P 9Nov |
| 22 | Goal pulse | Score flash + scorer banner on goal events | P 9Nov | P 9Nov |
| 23 | Empty states | Hubie cameo, honest copy, CTA | P 9Nov | P 9Nov |
| 24 | Footer links | Real routes / honest demo toasts | P 9Nov | P 9Nov |
| 25 | Toasts | Top-center, aria-live, auto-dismiss | P 9Nov | P 9Nov |
| 26 | Reduced motion | All animation twins render static | manual 9Nov | manual 9Nov |
| 27 | Keyboard-only path | Tab→odds→slip→place all reachable | pending | pending |
| 28 | VoiceOver slip | Names/roles read correctly | pending | pending |
| 29 | 360px layout | No clip/scroll-x | pending | n/a |
| 30 | 430px layout | No clip/scroll-x | pending | n/a |

## BASELINE-CORRECTNESS REGRESSIONS (added post-reset 9 Nov ~23:2x IST)

One row per protected behaviour. New-format rows: real time, build SHA, verdict, evidence required. Legacy `P 9Nov` ticks above do NOT count toward the ≥10 rechecks.

| ID | Behaviour | Contract | 390 | 1440 | Status |
|----|-----------|----------|-----|------|--------|
| B01 | FT settlement | min≥93 → all markets suspend, open bets grade, cash-out dead, balance credits once | run @d7113bb3 ✓22:46 | run @d7113bb3 ✓22:46 | PARTIAL (needs re-run each new build) |
| B02 | Void returns stake | void → stake returned exactly once, receipt+balance agree | ✓09 Nov 23:20 deployed: "Void · match abandoned at 63' · stake returned", no overflow-x | ✓09 Nov 23:20 deployed: 12.00 stake → 12.00 returned, Won/Lost math correct | PASS 09 Nov 23:20 |
| B03 | Offline honesty | place offline = explicit fail, no debit; world clock frozen; reconnect retry = single bet | frozen ✓22:47 (58′ held 31.5s) | same | PARTIAL |
| B04 | Deposit | opens from every entry, demo credit, Escape+focus | pending | pending | NOT RUN |
| B05 | Scenario dock | every scored state 1 tap; reset restores; no stale callbacks post-FT | FT scenario ✓22:46 | same | PARTIAL |
| B06 | Keyboard search | ⌘K open, arrows+Enter navigate, Esc closes, world-consistent status | ✓09 Nov 23:20 deployed: ⌘K→"arsenal"→↓+Enter→/match/ars-bha; Esc closes | same check | PASS 09 Nov 23:20 |
| B07 | Place-once | double-tap/tab-hide/odds-move/suspend → one debit, consent required on moved odds | pending | pending | NOT RUN |
| B08 | Stake validation | zero/empty/malformed/6dp/above-balance explicit fail, no silent overdebit | pending | pending | NOT RUN |
| B09 | Cash-out | changed value reconfirms; suspend during confirm rejects; single credit | pending | pending | NOT RUN |
| B10 | Same-again honesty | valid adds only; finished fixtures disabled w/ reason; migrated old ids resolve | ✓22:45 (8 btns, 2 disabled, toast) | same | PARTIAL |
| B11 | Break enforcement | persisted breakUntil blocks placement in store, not just disabled UI; end-break restores | ✓22:48 (locked, persisted, early-end ok) | same | PARTIAL |
| B12 | Routes/deep-links | all 5 routes + match deep-links HTTP 200; state survives nav | ✓09 Nov 23:20 curl: /,/live,/football,/match/*,/bets,/following all 301→200; bad route 404 | same | PASS 09 Nov 23:20 |
