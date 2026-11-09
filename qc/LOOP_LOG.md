# Loop Log — adversarial passes

Format: pass · mac-clock time · build · judges · scores · findings · fixes · open.

## Pass 0 — self-audit (9 Nov ~18:05 IST, build 66e20c03)
- Live-site defect found+fixed earlier: GH_PAGES base missing → blank prod (was wrong to trust HTML-200; now asset-checked every deploy).
- Reviewer model: STEER2 asks Opus 5.5 — NOT available (SWE-2 Max, no model picker). Declared deviation logged.
- Pending: rival+judge reports, mobile LH, keyboard/VO rows.

## Pass 1 — in progress

## Pass 1 — 9 Nov ~18:40 IST · build 4fabb236
- Judges: ELITE RIVAL 82/100 · HOUSEBETS JUDGE 78/100 (files: loop-rival-pass1.md, loop-judge-pass1.md). Reviewer SWE-2 Max — Opus 5.5 unavailable, deviation declared.
- Shared ship-blockers: teardown, money-path (0-stake legs, funds, odds-moved), 390px truncation+FAB (both fixed pre-report), missing terminals (offline/funds), scorecast string, safe-area, default-tab, market collapse, bets persist.
- Also landed in this build: font 404 fix (brand fonts never served live), static branded shell, contrast token, label-content-name fix, stacked named cells, Follow chips, LIVE pill, cash-out formula correct.
- Status: NOT CLEAN — fix wave in progress, re-review after.

## Pass-1 fix wave — 9 Nov 19:55 IST · build 762dd862 (+ pickName commit)
- Placement teardown (judge item 40): bet resolves mid-flight regardless; hidden tab or closed sheet → post-placement toast explains the land (slip.ts ~210). Verified live.
- Money path verified in-browser (playwright): stake 10 on Juventus @2.38 → placed → balance 1,250→1,240.00, receipt w/ ref HB-G5M. Screenshot qc/v4/phone-slip-receipt.png.
- BUG found+fixed: slip.toggle read SEED price via outcomeById (static MATCHES) while odds live in useOdds overrides → leg showed stale 1.30 vs live 1.01. Now picks live price + live suspension state (slip.ts toggle). Evidence: pill text "Juventus @ 2.38".
- Funds terminal: stake > balance → failReason "funds" + "Not enough balance · reduce the stake" (slip.ts, BetSlip.tsx).
- Offline terminal: ui.offline flag + scenario "Go offline" → fixed banner w/ Reconnect + placement fails "network" (__root.tsx OfflineBanner, Overlays.tsx, ui.ts).
- empty-live: world.liveEmpty flag → real empty state + Starting-soon rail (was toast-only).
- League headers: country flag emoji + View all link + collapse button (restructured off <details> to avoid nested interactives).
- Live filters: per-sport counts, hidden at 0.
- Match page: collapsible MarketCards (pin+chevron siblings), Popular default, tab-row edge fade, breadcrumb single-line scroll w/ shrink-0.
- 3-col named cells: medium display names ("Brighton & Hove Albion"→"Brighton", per-"/" segment for DC) — zero ellipses at 390px (qc/v4/phone-match-cells.png).
- Scorecast: CLEAN market exists — "Scorecast · scorer & team to win" seed.ts:843, joint-correlation priced (anyP × resultP × 0.8). Prior garbled literal is gone.
- Misc: Match-of-day chip → first hero slide only; dangling "Net ·" on open/void fixed both views; SkeletonRows dead code removed; ★ literal → Star icon; stake input single-dot enforced; pill shows "Set a stake" not "Pays 0.00"; progress bar synced to placingUntil.
- Verified @390px: home, live, football, match, slip sheet+receipt (qc/v4/*.png). Zero console errors all routes.
- Pass-2 reviews launched 19:55 IST on deployed build 762dd862 (rival + judge, background).

## Pass-2 fix wave — 9 Nov 21:05 IST · verified in-browser vs dev build
- FT lifecycle (judge/rival #1): evalSettle covers every score-derivable market (h2h, dc, totals, btts, cs, margins, handicaps, ht-ft, odd/even, scorer-team combos); unsupported → void. BROWSER VERIFIED: ars-bha driven to FT → finished/FT, 0 open markets, HB-091 won @36 (20×1.8), balance credited; lev-s04 FT 2-0 → tg25 lost, btts lost, cs won, dc won, h2h won, goalscorer VOID w/ returns=stake. 0 open legs remain.
- FT resurrection BUG found+killed: engine resume timeouts + goal-cascade reopen loop could reopen markets on finished matches. Guards: applyEvent early-returns on non-live match; resume/cascade timeouts re-check isLive; cascade only reopens markets IT suspended (closedByGoal set). Verified: FT → scripted 32s suspend + 55s goal + reopens all fired → 0 open markets, 0 enabled cells in DOM.
- Void returns = stake everywhere: seed HB-071 stake 12 → returns 12 (bets.ts:152); settlement writes returns=stake on void (verified T-gs returns 15 = stake 15). MyBets both views show b.returns for void.
- Offline cycle BROWSER VERIFIED: setOffline(true) → place() → status failed, failReason "network"; setOffline(false) → place() → placed, balance debited 10 (1337.5). Engine applyEvent no-ops while offline → freeze is real, not copy.
- Dead CTAs fixed: Deposit → ChromeModal w/ 6 demo top-ups (verified +500 → 1750); Weekly-race pill → standings modal; receipt "View my bets" → shared panelTab (was local state, dead on phone); toasts dismissible (click + X).
- Finished-match chrome: match page shows FULL TIME badge + persisted score (was "Starts in" negative countdown); MatchRow drops BellButton on finished rows (was "Remind me at kickoff" on a done match); slip.toggle blocks finished matches.
- Search: players indexed via goalscorer outcomes (was advertised, not indexed); full keyboard nav (↑↓ cycle, Enter go, Esc close) + combobox/listbox/aria-activedescendant.
- Hero autoplay pauses on document.hidden (separate flag — manual pause survives).
- Scenario dock drift: "clean" restores SEED market states (was blanket-reopening seeded suspensions + finished-match markets); suspend/goal/mixed/odds-change scenarios blocked while offline (freeze is honest); goal scenario works on any live match, not just ars-bha; 15s/9s resumes guard vs FT.
- Sport select on My Bets page wired to real filter (was decorative); "All soccer" → "All football" vocab.
- Verified: tsc clean, biome clean, build 17 routes, phone deposit modal screenshot qc/v4/phone-deposit.png.
