# D5 — Match page (`/match/ars-bha`, flagship)

## Files
- `src/components/odds/OddsCell.tsx` + `odds-cell.css` — canonical E-M-08 cell: fixed geometry, Oxanium tabular, price+implied, ▲/▼ caret, ~1s tint overlay, selected = `--c-cta` edge + corner ✓ (no fill flip), suspend = 0ms lock + 60% dim + last price, CO chip, offline/break/settled/void states, `aria-pressed`/`aria-disabled`, arrow-key grid nav, SR `Arsenal to win, 1.30, implied 77%`.
- `src/lib/matchBook.ts` — GROUP_ORDER (T42-09), suspend vocabulary, `isScoreDerived` F3 rule, `impliedPct`, CO-eligibility, `settlesOn90`, `outcomeVerdict` FT grader (suspended-at-FT settles; `Void` only where provable).
- `src/lib/engine.ts` — S4 cascade rewritten: beat1 score t=0 → beat2 flash+locks t=300ms → beat3 reprice+staggered reopens t=700–2500ms; per-fixture timers cancel on newer events (supersede, never queue). Canon reprice 1.44/4.00/8.00.
- `src/lib/seed.ts` — flagship fixes: h2h draw 4.60→4.80 (107.75% was out of band → **1/1.30+1/4.80+1/11.00 = 76.92+20.83+9.09 = 106.85%** ✓); DC re-derived 1.02/1.16/3.34 (98.04+86.21+29.94 = 214.2% ≈ 2×106.85 ✓); mb90 +120→120; book curated to 8 groups × 78 (10+9+11+11+8+5+14+10 = 78 ✓, Specials dropped).
- `src/routes/match.$matchId.tsx` + `src/styles/match.css` — rebuilt: breadcrumb (text path @desk / pill @phone), scoreboard card → 44px pinned strip (combined sticky chrome with tabs), event line h20 slot, `Your bet` strip (CO quote / paused / moved-amber / settled), search (`/` shortcut, re-sums `N of M`), tabs `Popular 10…All markets 78` in URL `?group=`, accordions (first-3@1440/first-2@390 open, `+N` tails, reason chips, `Settles on 90′ + stoppage`), FT grading, live-region announcements.
- `src/lib/engine.ts`, `store/world.ts` suspReasons → `betting paused` fallback; `components/Overlays.tsx` — dock `goal` = BHA equalise@54′ (canon `S. Whitfield`), `suspend-market` → `ars-bha-tg25` `dangerous attack`; `components/Crest.tsx` — drop-shadow removed (SA4-05 flat).

## Frames
M-01 arrival ✓ · M-02 pinned strip ✓ · M-03 search ✓ · M-04 tabs+counts ✓ · M-05 1X2 implied ✓ · M-06 ticks (caret+tint+`was→` title) ✓ · M-07 suspend chip ✓ · M-08 cascade ≤2.5s ✓ · M-09 pick→pill `●1 Arsenal @1.30` ✓ · M-10 bet strip ✓ · M-11 FT ✓ (`Settled · won/lost`, verdicts per cell) · M-12 accordion depth ✓ · M-13 line-clamp-2 + end-ellipsis ✓ · M-14 offline band + break strip ✓.

## Deviations
- S2 flight: layoutId across page→Shell slip-pill boundary is unsafe (pill is D1/D3-owned, outside this route's tree) — fallback per brief: pill updates via store with its own enter anim; `onAdd` hook left on OddsCell for a safe in-tree flight later.
- `1440` desk BP read from `--bp-1440` at runtime (px literals gate-banned).
- NumberFlow substituted by Motion `MorphNumber` (trend-0 roll, transform/opacity only) — no @number-flow dep in tree.
- Desk 1X2 renders W4-24 rows; >3-outcome books keep 3-up grid at desk (cell rows would starve density).

## Arithmetic
1X2 106.85% ✓ · post-goal 1/1.44+1/4.00+1/8.00 = 106.94% ✓ · DC 214.2% ✓ · O/U 2.5 (2.73/1.44) = 106.07% ✓ · tabs sum 78 ✓ · balance 180+60=240 (canon bets HB-48213/14/15) ✓.

## Evidence — `qc/shots/d5-match/`
390: overview · pickflow · pinned · suspended · search · cascade-mid/done · ft. 1440: overview · full · allmarkets · cascade-mid/done · ft · cell-states.
Verified live: susp chips 0→11 mid-cascade (corners/cards/minutes stayed open), score 1–1 at 54′, settle verdicts at FT, chip #E17823/#2A1200, selected edge #C4F4F1.

## Gates
`tsc -b` ✓ · `biome check` 35 files clean ✓ · `vite build` ✓ · `check:tokens` 0 new (D5 files clean) · `check:contrast` 32/32 ✓.
