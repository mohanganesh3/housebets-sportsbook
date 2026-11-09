# HOUSEBETS JUDGE — pass 1 (Bashagha persona; SWE-2 Max, Opus unavailable — declared deviation)

Bar: "the sportsbook we'd ship tomorrow." Verdict: **not yet — 78/100.**
(Home 12/15 · Live 9/10 · Football 8/10 · Match 16/20 · Slip+MyBets 15/20 · Housebets 12/15 · States 6/10)

## Ship-blockers
1. Placement never tears down — setTimeout-only resolve; no visibilitychange/blur/pagehide/sheet-close handling anywhere in src. Bet lands silently if sheet closes mid-place.
2. Unstaked legs mint real 0.00-stake bets (ready checks total only).
3. Team names truncate to one letter at 390px (MatchRow ~110px column; Team.short unused).
4. State-tourer FAB occludes content incl. the Responsible-gambling footer link. [fixed since review: FAB→Menu sheet]
5. Garbled market name ships: "Scorecast · scorer Scorecast — scorer & team win team win" (seed.ts:843).
6. Missing terminals: no insufficient-funds (stake 9999 vs hardcoded 1250, balance goes negative silently), no offline state though Support copy promises it.
7. League-header FollowStar uses stopPropagation not preventDefault — star toggle also collapses accordion.
8. SkeletonRows dead code; no skeleton→splash boot. [partially fixed: static branded shell shipped]
9. Sheets don't pad iOS home indicator (pb-3 only; BottomBar has env() but sheets don't).
10. DEMO badge `hidden sm:inline` — phone balance unlabeled.
11. Vocabulary: Football/All soccer/Soccer split.
12. "Match of the day" on all 4 hero slides; autoplay no document.hidden pause.
13. Phone slip sheet lacks wireframe Slip/My bets/Chat tab strip.
14. Progress bar constant 2.9s vs variable 0.65–3s delay.
15. ⌘K palette: no arrow-key/Enter navigation; BetRow click-only.
16. BellButton hidden on phone but kickoff toasts fire for everyone.
17. `bg-brand-a10` undefined token on the new Demo-states row (edited mid-review).
18. Market groups not collapsible; "All markets" is one long scroll.

## Differentiators that earned the score
- Poisson pricing with real overround 104–108%; flagship pinned to wireframe prices; game-state market suspensions.
- Frame-locked suspension cascade (market+slip+cash-out in one transaction).
- Three-mode odds acceptance (Ask/Higher/Any).
- Two-step cash-out, was-delta, "Below stake" honesty.
- Full reduced-motion twins + MotionConfig reducedMotion="user"; all flashes ≤1.2s; no confetti.
- Hand-drawn craft: heraldic crests, custom sport glyphs at Lucide grammar, Hubie sloth, disambiguated bet refs.
- Cost honesty: session+net line, balance-after-bet preview, delayed-scores disclaimer.
- Kickoff reminders that actually fire.

## Judge verdict (verbatim)
"Not tomorrow. The spine is right — priced like a book, suspends like a book, and the copy tells the truth even when it costs something. But 'ship tomorrow' means surviving the commute home on hotel wifi: placement doesn't tear down on blur, tab-hide or sheet-close; a stake-less leg mints a 0.00 bet; there is no offline and no insufficient-funds terminal; and at 390px my tourer flask sits on top of live odds while team names collapse to 'A…'. Fix that and this is the conversation I want to be having."

## Top-3 asks
1. Teardown + terminals (quarantine placing on hidden; offline + insufficient-funds; balance store: debit on stake, credit on cash-out).
2. 390px integrity (short names under sm [done]; FAB→menu [done]; safe-area sheets; restore DEMO tag).
3. Money-path hygiene (block empty-stake legs; Scorecast string; preventDefault on league star).
