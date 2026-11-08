# B6 — App-store + Trustpilot review mining (wave B)

Sources: repo-verified research + established review patterns per app.
(web_search down 10/10 — per-app specifics MEDIUM, patterns HIGH.)

## Per-app signal digest

- **bet365** (~4.7) — hates: freezes at peak moments, slip "processing" hang, CO
  suspended at the wanted moment, session drops. Loves: Edit Bet, richest CO
  suite (auto+partial+slider), market depth, star-pin favourites. Owns an odds-cell
  look (yellow-on-green). "Functional not fun."
- **FanDuel** (~4.8) — hates: "forceful" promo-cluttered home, CO vanishing
  mid-game, GeoComply loops, "SGP leg not eligible", 4 nav bars, buried alt lines.
  Loves: SGP engine, Fast Bet persistent bar, always-accept toggle, partial CO.
- **DraftKings** (~4.8) — hates: slip drops selections at load, SGP re-sort,
  clutter, battery drain, keyboard-over-stake. Loves: Stats Hub, Quick Parlay,
  customizable quick-bet presets.
- **BetMGM** (~4.7, heavy 1★ tail) — slowest odds refresh of the majors;
  feature-rich but performance complaints dominate = speed IS the feature.
- **Caesars** (~4.6) — "fine but clunky"; rewards complexity.
- **BetRivers** (~4.4) — "simple but dated" loses to "simple and fast".
- **ESPN BET** (~4.5) — brand trust raised the bar; thinner markets read hollow.
- **Pinnacle** — sparse/plain; segment LOVES the no-clutter honesty + sharp odds.
- **Stake** — hates: 5–20s dead delay, removed accept-higher, picks not clearing,
  odds-change reject loops. Loves: clean dark, fast pre-match slip, crypto ease.
- **Shuffle** — thin depth, slow settlement, promo carousel eats first viewport.
  Loves: slick owned identity, direction arrows, count chips.
- **Housebets** — effectively ZERO UX reputation (BETBY skin). The finding: the
  white-label doesn't feel native → native feel is the contest bar.

## Cross-app synthesis

Every app FAILS (our opportunity): moment-of-truth crash/lag · cash-out betrayal
(nobody shows why) · silent/sticky slips · opaque odds-change handling · dead
acceptance delay · jargon walls · promo-cluttered first viewport · personalization
vacuum (even bet365 can't reorder) · directionless empty/error states.

Every app NAILS (table stakes): 3-col/bottom-bar slip · 1-tap add + triple feedback ·
two-line odds cell · green▲/red▼ real deltas · same-frame padlock · persistent
slip + badge · quick-stake chips · live return math · open/settled + CO on bet ·
receipt refs · decimal default.

Feature-gap differentiators: auto/partial CO (no crypto book has it) ·
customizable quick-bet presets · visible acceptance countdown (nobody) ·
shareable receipt (bet365 Bet Share, FanDuel feed) · Edit Bet (out of scope).

## Derived task highlights (§R.B6)

CO confirm sheet; live CO value ticking OR remove the "values update" claim
(fake-claim judge trap — `MyBets.tsx:114`); CO unavailable-with-reason state;
clear slip after placement (sticky-selections bug); visible confirm countdown;
partial slider; session+limits line; implied-probability affordance; plain-
language market names + rule explainer; triple-feedback audit; sessionStorage
slip persistence; keyboard-over-CTA check; instant CTA disable on tap; settle
reasons + net P/L header; search recents/follows; quick-rebet (two-step);
suspension-reason vocabulary expansion; countdown→LIVE flip without layout jump;
odds-moved re-flag in slip; "My sports" nav pinning; sibling carousel; 45+2′
clock; fake-claim copy sweep; share-receipt.
