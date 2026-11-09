# Teardown — FanDuel Sportsbook (sportsbook.fanduel.com)

Date researched: 2026-11-09 (real `date`). Public pages only; no login, no money.
Direct fetch: **BLOCKED** — `https://sportsbook.fanduel.com` failed (curl 000;
US geo/bot wall). A search-result snippet of the homepage was readable and is
marked [SNIP]. Several items come from FanDuel's own support docs and from
portfolio case studies by FanDuel product designers — high-value sourcing.

Source labels: [SUPPORT] = official FanDuel help · [GUIDE] = fanduel.com betting
guide · [CASE] = designer case study (FanDuel staff/agency) · [WEB] · [INF].

## 1. Information architecture

- **Home opens on "Popular"** — the most-bet games/parlays of the day, with
  `Live` and `Upcoming` sibling tabs + occasional seasonal tab (e.g. Playoffs);
  promos scroll across the top [WEB: sportsbookscout.com; ussportsbonus.com].
  Homepage snippet today shows `Popular Same Game Parlay™ Bets` card +
  `Enter Parlay Hub` [SNIP: sportsbook.fanduel.com].
- **Left rail = all sports** (NFL, NBA, MLB, NHL, soccer, tennis, golf…);
  in-progress games get their own section up top; each matchup row shows the
  classic trio `Spread · Moneyline · Total` [WEB: oddsshopper.com;
  sportsbookscout.com].
- **Match/game page** [CASE: alextle.com/work/fanduel]: scoreboard (score,
  clock, fouls, timeouts — swipe for quarter-by-quarter) → `Track Live` expands
  *in place* under the scoreboard; `Stats` slides up as a sheet over the page
  (Box Score / Play-By-Play tabs; each play carries a suggested bet) → market
  tabs `Same Game Parlay · Points · Threes · Rebounds · Assists` (NBA example)
  → game lines + collapsible player `X+` markets, SGP-eligible flagged.
- **Navigation load:** 4 distinct nav/menu bars on the app home — called out as
  a Hick's-law violation in a comparative audit [WEB: davemorales.work].
- `My Action` (case-study feature): lists only live games you already have bets
  on, with current markets under the score — one tap back in to hedge/double
  [CASE: alextle.com].

## 2. Bet slip — placement & behaviour

- **Desktop: right side panel** [WEB: sportsbookscout.com]. **Dual stake input:**
  enter `Wager` *or* `To Win`, the other auto-computes [WEB: sportsbookscout.com].
- **App: Fast Bet** — a bottom sheet that appears on first selection *anywhere*
  in the app; "users can place a bet without ever leaving where they are"
  [CASE: stewartbradford.com — the actual designer]. Multi-leg adds parlay /
  teaser options; per-leg trash-can delete [WEB: ussportsbonus.com].
- Design rule quoted by their team: the slip must make it obvious what happens
  when you tap Place Bet — "no surprises" [CASE: stewartbradford.com].
- Cash-out eligibility is visible **on the betslip pre-placement** as a gray
  `CASH OUT` box on eligible legs [SUPPORT: cash-out article].

## 3. Odds changes — display & acceptance

- Cells: **green odds + ▲ = price increased; red + ▼ = decreased**, tied to
  live game events [GUIDE: fanduel.com what-is-live-betting].
- Acceptance: a single **`Always accept odds movement` toggle lives on the
  betslip** — ON = bet submits at whatever price is current; OFF = confirm
  changes each time [GUIDE]. One boolean vs the industry's 3-way — simple but
  loses the "higher only" middle path.
- "Prices shown may change before a bet is confirmed"; live betting briefly
  pauses while prices recalculate [GUIDE].

## 4. Suspension / locked markets

- Betting "briefly pauses while the Sportsbook recalculates prices" during key
  plays [GUIDE]. Cash Out "can be temporarily suspended" around pitching
  changes, injuries, between plays [SUPPORT].
- Exact lock visual: UNKNOWN (geo-blocked); industry-typical greyed cells [INF].

## 5. Live score + clock

- Scoreboard carries score + clock + situation stats (fouls, timeouts); swipe
  for per-quarter detail; animated `Track Live` court + last-play callouts
  expand in place [CASE: alextle.com].
- Active bets in My Bets carry **live trackers** — e.g. a progress bar of a
  pitcher's strikeout count vs your over/under [WEB: oddsshopper.com].

## 6. Market group tabs & counts

- Game page (NBA example): `Same Game Parlay · Points · Threes · Rebounds ·
  Assists` + game lines + collapsible `X+` player markets [CASE: alextle.com].
- Alt lines sit behind `show more` — a documented frustration ("having to hit
  'show more' each time you wanna take an alternate spread makes no sense")
  [WEB: godfreygu.com user quotes].

## 7. Cash-out

- Placement: **`My Bets` tab** → green `Cash Out` button on the bet → confirm
  sheet (cash out / learn more / cancel) → funds to wallet instantly; bet moves
  to `Settled` as "Cashed Out" [SUPPORT].
- **Cash Out Value shown live on the bet and changes dynamically** "nearly
  every play"; amount shown = amount paid [SUPPORT].
- Pre-placement: gray `CASH OUT` box flags eligible selections in the slip
  [SUPPORT] — most books don't flag eligibility until after placement.
- Partial cash out supported [WEB: ohiobetapps matrix]; CO on Bonus Bets pays
  net winnings only [SUPPORT].

## 8. My bets

- `My Bets` is a bottom-nav tab; splits **active / settled**; cards mirror the
  betslip's visual language deliberately ("keep as much similarity to how
  their bet was shown in the Betslip") [CASE: stewartbradford.com;
  WEB: oddsshopper.com].
- Active bets embed live trackers + CO value; settled shows "Cashed Out"
  status [SUPPORT; WEB: oddsshopper.com].

## 9. Search

- Team picker with search field exists in their design language ("782 teams"
  screen) [CASE: humbleteam.com]; search behaviour/coverage on the book:
  UNKNOWN (geo-blocked). Sports browsed via left rail [WEB: oddsshopper.com].

## 10. Empty & loading states

- Their design-system case study explicitly lists `live, losing, loading,
  empty` as first-class states "drawn into the language" [CASE: humbleteam.com]
  — they *think* about states, but no public evidence of distinctive empty
  designs. UNKNOWN beyond that.

## 11. Promo/clutter in first viewport

- **HIGH:** promos scroll across the top of home and are "larger than average
  with bright contrasting backgrounds"; rewards section "too large" per user
  research quotes; overall feel called "forceful" [WEB: davemorales.work;
  godfreygu.com]. Promo cards double as education entry points (SGP teaching)
  [CASE: stuartwalker.webflow.io].

## Beat-it list (for the table)

First viewport = sport, not promos; alt-line `show more` pain → market groups
with counts + Popular first; 3-way odds-accept vs their binary toggle; My Bets
that mirrors the slip (adopt their own rule, execute cleaner); Fast Bet sheet
physics — match the bar→sheet pattern the brief already requires.

## Sources actually opened

- https://support.fanduel.com/s/article/What-is-the-Cash-Out-Feature (official)
- https://www.fanduel.com/sports-betting-guide/what-is-live-betting (official)
- https://stewartbradford.com/fanduel-sportsbook-version-2 (FanDuel designer)
- https://alextle.com/work/fanduel (FanDuel designer case study)
- https://humbleteam.com/work/fanduel (agency case study, Formation DS)
- https://stuartwalker.webflow.io/fanduel-education-case-study
- https://loveland.design/case-study/fanduel
- https://www.godfreygu.com/fanduel
- https://www.davemorales.work/projects/true-sport
- https://www.sportsbookscout.com/sportsbook-reviews/fanduel-sportsbook
- https://www.oddsshopper.com/articles/betting-101/how-to-bet-on-fanduel
- https://ussportsbonus.com/guide/fanduel-app-review/
- https://www.sportbotai.com/blog/fanduel-reddit-what-bettors-say
- https://ohiobetapps.com/blog/bet-slip-features-compared.html
- https://sportsbook.fanduel.com/ (search-result snippet only — fetch blocked)
- Attempted & blocked: https://sportsbook.fanduel.com
