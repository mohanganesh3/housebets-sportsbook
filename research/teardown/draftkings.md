# Teardown — DraftKings Sportsbook (sportsbook.draftkings.com)

Date researched: 2026-11-09 (real `date`). Public pages only; no login, no money.
Direct fetch: **BLOCKED** — `https://sportsbook.draftkings.com` failed (curl 000;
US geo/bot wall). Material is review + designer-portfolio sourced.

Source labels: [WEB] = article · [CASE] = DK product-designer portfolio ·
[RULES] = quoted house rules · [INF] = inference.

## 1. Information architecture

- **Two stacked header rows:** brand tabs `Daily Fantasy · Sportsbook · Casino ·
  Marketplace` → sportsbook tabs `Home · My Bets · Live In-Game · Promos` →
  promo banners → featured games [WEB: winnersandwhiners.com; oddsshopper.com].
- **Left rail:** all sports/leagues; "popular leagues" quick links at top of the
  menu [WEB: winnersandwhiners.com; usgambling.com].
- **Lobby:** "revolving list of active promos" + trending games; "busy but in
  a good way… not exactly cluttered" per one reviewer, "too busy at times,
  especially mobile" per another [WEB: usgambling.com; winnersandwhiners.com].
- **Game page:** tab system — `game lines (spread + alternates) · props ·
  halves · game props · player props` + SGP builder; a sliding rail exposes
  the extra bet categories [WEB: usgambling.com; betpreview.com].
- **Filters as a feature:** `A–Z sports · Sports Teams · Playoff Pages ·
  Championship Pages`; promos page itself has filters + "how long each promo
  remains active" indicators [WEB: usgambling.com].
- **App:** bottom tabs — A–Z sports (second from right), live betting tab
  showing in-progress games grouped by league with period + score updating;
  quick access to active bets + cash-out from bottom nav [WEB: legalbet.com;
  squawka.com].
- Signature look: black + neon-green [WEB: winnersandwhiners.com].

## 2. Bet slip — placement & behaviour

- **Desktop right rail — embedded and scroll-following:** "the bet slip is
  embedded and will 'follow' your cursor as you scroll so that it's always
  easy to access" [WEB: usgambling.com]. Pick → tap price → leg lands in slip
  → stake → payout preview → confirm [WEB: oddsshopper.com].
- **Quick Bet:** most customizable in class — user-editable preset stake
  amounts ($10/$25/$50 style) toggled on the slip; built for live-betting
  speed [WEB: ohiobetapps.com matrix — rated best].
- Internally redesigned as a "shopping cart" model by their own team
  [CASE: alexhagelis.com]; **Quick bet, live stats integration, trending bets**
  are named features [CASE].
- Known bug/complaint: slip drops selections at load; SGP edit gate re-sorts
  legs (repo research/16 — sourced review pattern).

## 3. Odds changes — display & acceptance

- House rule: "before a bet is accepted by DraftKings, **all market odds are
  subject to variation at any time**" — reprice-then-ask flow on the slip
  [RULES via dimesvault.com].
- A published accept-changes toggle was **not found in any public help page**;
  users are told to check the slip's settings gear [WEB: dimesvault.com]. So:
  accept/decline prompt = yes; a user-facing auto-accept control = UNKNOWN.
- Live lines show direction via colour + arrows (green ▲ up / red ▼ down —
  industry pattern, documented on US books incl. DK's category) [WEB:
  fantasylife.com — MEDIUM confidence for DK specifically].

## 4. Suspension / locked markets

- Live lines "go gray / fade" when locked — the standard US-book pattern,
  documented in a live-betting explainer covering DK [WEB: fantasylife.com].
- DK was among the first US books with live cash-out; CO also suspends with
  the market [WEB: fantasylife.com]. Lock reason shown: UNKNOWN.

## 5. Live score + clock

- Live tab: games grouped by league, **period/clock + score update in place**
  [WEB: legalbet.com]. Live stats integrated into the event experience —
  named internal feature [CASE: alexhagelis.com]. Event drawer + swipe-
  between-events noted in repo motion research [research/29, obs].

## 6. Market group tabs & counts

- Game page tabs: game lines · player props · game props · halves · SGP —
  organized per sport; league pages get the same tab system [WEB:
  usgambling.com; betpreview.com]. Counts on tabs: UNKNOWN.
- `Trending bets` module surfaces popular wagers [CASE: alexhagelis.com].

## 7. Cash-out

- CO offered "for all main markets and large events" — notably consistent
  availability, including on **parlays/SGPs** where rivals often refuse
  [WEB: betpreview.com].
- Placement: dedicated **button next to the active bet in bet slip or My Bets**;
  on confirm the amount credits instantly and the bet closes [WEB: squawka.com].
- **Partial cash out: yes** [WEB: ohiobetapps matrix]. Auto CO: no [same].
- Early CO sometimes offered **before the event starts** on line moves [WEB:
  fantasylife.com].

## 8. My bets

- `My Bets` top tab holds live/upcoming/settled [WEB: oddsshopper.com].
- Cards-based list with **sorting + filtering** — a named internal redesign
  project [CASE: hadasliberman.com — "introduced 'My Bets' cards for
  centralized bet management and sorting/filtering options"].
- Once placed: **no cancel/edit** — only CO where offered [WEB: squawka.com].

## 9. Search

- Search exists in the app (player/team pages were a named project to stop
  users leaving for Google) [CASE: hadasliberman.com — dedicated player,
  team, conference, league pages]. Search box placement/behaviour: UNKNOWN.

## 10. Empty & loading states

- UNKNOWN — no public evidence found either way.

## 11. Promo/clutter in first viewport

- **MEDIUM:** revolving promo carousel in the lobby; "randomly placed
  promotional offers" inside menus add to the busy feel [WEB: usgambling.com].
- Counterpoint from a comparative audit: DK does a "great job of not filling
  space for the sake of it" vs FanDuel/bet365 [WEB: davemorales.work].
- Still: 4 stacked nav surfaces (brand tabs → book tabs → banners → featured)
  = the cautionary Hick-fail (repo research/17).

## Beat-it list (for the table)

Single-layer navigation (no 4-bar stack); selection-never-drop slip guarantee
(their regression is our test case); published 3-way accept-odds control vs
their undocumented gear; promo-free fold; quick-stake presets — match their
one good idea, pre-filled USDT chips like Housebets' own 1/10/50/100 widget.

## Sources actually opened

- https://winnersandwhiners.com/reviews/draftkings-sportsbook
- https://www.usgambling.com/sports-betting/draftkings-sportsbook/
- https://www.oddsshopper.com/articles/betting-101/how-to-bet-on-draftkings
- https://betpreview.com/sportsbooks/draftkings-sportsbook-review/
- https://www.squawka.com/us/bet/betting-sites/draftkings/
- https://legalbet.com/betting-school/making-bets-on-the-draftkings-sportsbook-app/
- https://bettingapps.com/draftkings-sportsbook
- https://dimesvault.com/blogs/strategy/why-does-my-live-bet-keep-getting-rejected
- https://www.fantasylife.com/articles/betting/what-is-live-betting
- https://ohiobetapps.com/blog/bet-slip-features-compared.html
- https://www.alexhagelis.com/work/draftkings (DK designer)
- https://hadasliberman.com/draftkings (DK designer)
- https://www.davemorales.work/projects/true-sport
- Attempted & blocked: https://sportsbook.draftkings.com
