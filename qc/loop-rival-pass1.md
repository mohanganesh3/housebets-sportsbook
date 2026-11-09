# ELITE RIVAL — pass 1 (SWE-2 Max reviewer; Opus unavailable, declared deviation)

Verdict: strong 2nd, not 1st. Score: **82/100** (Home 12 · Live 8 · Football 9 · Match 17 · Slip+MyBets 16 · Housebets 12 · States 8). Full findings preserved in chat transcript; key items:

## DEFECTS
1. Phone rows truncate team names to single letters ("A…" for Arsenal and Aston Villa) — MatchRow fixed 168px odds block + truncate. Visible on phone-home/live/football.
2. Cash-out formula inverted: stake × livePrice × factor — rewards the bet doing worse. Correct ≈ stake × priceAtBet/livePrice.
3. Wallet decorative: static 1,250.00, no funds guard, no balance decrement.
4. Live clocks die: `minute < 90` guard freezes at 90′; HT never resumes; no FT.
5. Scorecast market title garbled string literal (seed.ts:843).
6. SkeletonRows defined never imported — no loading state.
7. ScenarioDock "empty-live" only toasts — changes nothing.
8. Match page defaults to "All markets" 96-card wall vs wireframe "Popular"; last tab chip clipped; no market collapse chevrons.
9. Live filter chips lack counts; league headers lack flags + "View all".
10. Phone slip sheet drops wireframe tab row (slip/bets/chat); pill reads "Pays 0.00" pre-stake.
11. Extreme-price margin collapse: 1.01/103.32/476.80 ⇒ 100.2% book; clamp zeroes favourite margin.
12. Stake sanitiser accepts "1.2.3"; void bets render dangling "Net ·"; "All sports" select shows only Soccer.
13. "odds-moved" FailReason declared + copy but never produced.
14. Placed bets not persisted — vanish on reload.
15. Search promises "players" but player names unsearchable; no arrow-key nav.
16. "Match of the day" chip on all hero slides; chat read-only.

## DIFFERENTIATORS rivals lack
- ScenarioDock: 10 one-click judge states.
- Real Poisson pricing engine ~96 markets/match incl. halves/handicaps/minute bands; goal cascade suspends→reprices→reopens in lockstep.
- Slip: odds-move preference, accept-all, refs w/ strikethrough, session RG footer, drag-physics sheet, kickoff reminders, ticking pot.

## Rival's case for 2nd (verbatim)
"This is the deepest entry: a real pricing model, a market-suspension/cash-out coupling most entrants never attempt, and a judge-facing state tourer. But it bleeds at the edges a champion doesn't. Team names collapse to "A…/B…" on the device judges most likely open first; the cash-out formula rewards your bet doing worse; the wallet is a sticker; live matches never end; one market ships with a garbled title; the promised "empty-live" scenario is theatre. Each is small; together they read "very good" not "flawless", and good loses. Single fix that most threatens our 2nd place: rebuild MatchRow's phone layout."

## UNKNOWN
- Deployed-vs-source drift on bets seed at time of capture (resolved: desk-mybets-v2 shows Settled·7 matching source).
