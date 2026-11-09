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
