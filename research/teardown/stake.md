# Teardown — Stake Sports (stake.com/sports)

Date researched: 2026-11-09 (real `date`). Public pages only; no login, no money.
Direct fetch: **BLOCKED** — `https://stake.com/sports/home` and `https://stake.com/sports`
both failed (curl exit 000, TLS/edge block) and `https://help.stake.com/en/articles/4872560`
failed via fetch. Everything below is web-sourced or flagged [INF].

Source labels: [WEB] = article opened today · [FORUM] = stakecommunity.com threads ·
[HELP] = Stake help-center text (via search result, page itself unreachable) · [INF] = inference.

## 1. Information architecture

- **Top-level sports tabs (horizontal, under header):** `Sports Home · Live Betting ·
  My Bets · Starting Soon` [WEB: football365.com/reviews/stake]. Search bar sits just
  under the header/banner zone and covers sports events [WEB: football365.com].
- **Left rail:** sport/competition tree — top sports, "active & upcoming" events,
  season markets, then the long A–Z list; 30+ sports, popular competitions pinned
  near the top [WEB: en.virtual-sport.eu; ssbet.io/stake-sportsbook-review].
- **Sport page (e.g. Soccer):** sub-tabs `Live & Upcoming · Outrights · All Soccer`
  [WEB: decks.optimizexl.com/app/stake vision-model teardown; bonustiime.com].
- **Live page:** "Live Events" collects every in-play game; per-event icons for
  bet builder, live stream and live stats sit next to each row [WEB:
  cryptobetting.com/reviews/stake; ssbet.io].
- **Match page:** opens all markets for the fixture; `Bet Builder` tab builds a
  same-game multi from that fixture's markets [WEB: collegefootballpoll.com;
  fantasysixpack.net]. Market tab names per-fixture UNKNOWN (blocked fetch).
- **Match rows:** league-grouped; selections show **bet-percentage popularity
  indicators** on some markets (crowd sentiment on the cell) [WEB: d-sport.net] —
  a Stake-ish signature most books don't have.
- **Density:** minimalist flat dark navy/slate, hairline dividers; "terminal-clean"
  [INF consistent with repo research/17 + multiple reviews: "minimalist bet slip",
  "unique interface… super-convenient once learned" cryptobetting.com].

## 2. Bet slip — placement & behaviour

- Desktop: right column; mobile: bottom-bar tab `Bet Slip` inside
  `Browse · Casino · Bet Slip · Sports · Chat` [WEB: football365.com].
- Slip internals: `Single` / `Multi` tabs; empty state = "bet slip is empty" copy +
  disabled `Place Single Bet` CTA [WEB: decks.optimizexl.com vision teardown].
- Shows estimated payout before confirm; stake + odds format + accept-changes in
  slip settings [WEB: stake-global.com/sports].
- **Known behaviours/bugs (user-reported):** picks stay selected in the slip after
  a parlay is placed — forced "clear all" [FORUM: stakecommunity.com/topic/150061];
  slip can show "pending" then a locked market refunds later [FORUM: /topic/223413].

## 3. Odds changes — display & acceptance

- Slip settings: **accept any odds / accept higher only / reject all changes**;
  new accounts default to none → a pop-up asks you to accept the new price
  [WEB: bonustiime.com; stake-global.com].
- Users report the "accept only higher" option was effectively removed in the
  current UI — a regression they feel [FORUM: /topic/150061].
- Reject-on-change doesn't always hold under the acceptance delay: user-documented
  case where a cash-out was taken at stale odds 3 s after the price moved [FORUM:
  /topic/42792].
- On-cell movement indication: UNKNOWN (live fetch blocked; prior repo research
  flags Stake as clean/quick but documents no signature tick — treat as [INF]
  subtle flash at most).

## 4. Suspension / locked markets

- Markets suspend after goals/penalties/key moments and reopen repriced
  [WEB: bonustiime.com; stakereferralcode.ca].
- Tennis bettors report aggressive mid-rally freezes — "the odds completely freeze",
  workaround = preload stake and fire when the board reopens [FORUM: /topic/221763].
- A bet attempted into a locked market fails with "market unavailable"; stake
  refunded if it slipped through [FORUM: /topic/223413].
- Visual treatment of the lock itself: UNKNOWN (fetch blocked; likely
  greyed/frozen cells per industry convention — [INF], not verified).

## 5. Live score + clock

- Score and clock on each live row; per-event stream/stats/builder icons
  [WEB: cryptobetting.com]. Live-stream coverage across major sports is a
  selling point [WEB: cryptobetting.com; ssbet.io].
- Clock format detail (e.g. `45+2'`): UNKNOWN.

## 6. Market group tabs & counts

- Fixture page: full market list + `Bet Builder` tab [WEB: fantasysixpack.net].
- Sport pages: `Live & Upcoming · Outrights · All Soccer` [WEB: decks.optimizexl.com].
- Big soccer matches carry "hundreds of markets" [WEB: ssbet.io]; per-tab counts UNKNOWN.

## 7. Cash-out

- Early cash-out on **single and multi, pre-match and live** [WEB: cryptobetting.com];
  accessed from My Bets [WEB: anonwager.com summary of Stake policy].
- Every cash-out has a **time delay**; unavailable while the market is suspended;
  can fail if odds change during the delay; SGM = no cash-out, player props =
  pre-match only, no live coverage = no CO [HELP: help.stake.com article 4872560
  via search snippet].
- Stake may reverse a cash-out settled in error and can remove CO for latency abuse
  [WEB: anonwager.com]. Reviewers note **no early-cashout icon on rows** —
  discoverability gap [WEB: cryptobetting.com].

## 8. My bets

- `My Bets` is a top-level tab; open bets + cash-out offers + settled history
  [WEB: stake-global.com]. Casino side shows `My Bets · All Bets · High Rollers ·
  Race Leaderboard` — the **public all-bets feed** is ambient social proof
  [WEB: football365.com]. Sports-page My Bets column detail: UNKNOWN.

## 9. Search

- Global search bar under the header covers sports events/teams/competitions
  [WEB: football365.com; bonustiime.com]. Fuzzy/direct-to-market behaviour: UNKNOWN.

## 10. Empty & loading states

- Empty slip: instructional message + dead CTA (documented). Other empties thin —
  prior repo review mining flags "empty states thin = beatable" [INF from
  research/16-review-mine.md, MEDIUM confidence]. Loading-state style: UNKNOWN.

## 11. Promo/clutter in first viewport

- **No promo carousel on the sports home** — restraint is the identity; dark flat
  theme, minimal chrome [WEB: football365.com "doesn't mess around with too many
  colors"; research/17 M-H]. Promos exist (Stake Shield, event boosts) but live
  in their own area [WEB: ca-sport.com].

## Beat-it list (for the table)

Visible acceptance countdown vs their dead 5–20 s delay; designed suspension
reasons vs silent freeze; empty states with direction; selection-never-sticky
slip; cash-out shown on the row/card, not buried in My Bets.

## Sources actually opened

- https://www.football365.com/reviews/stake
- https://stakecommunity.com/topic/150061-sportsbook-ui-new-updated/
- https://stakecommunity.com/topic/42792-odds-changed-bet-still-accepted/
- https://stakecommunity.com/topic/221763-tennis-live-betting-how-do-you-deal-with-the-live-odds-freezing/
- https://stakecommunity.com/topic/223413-market-was-unavailable-to-place-bet/
- https://www.cryptobetting.com/reviews/stake/
- https://decks.optimizexl.com/app/stake (vision-model screen teardown)
- https://bonustiime.com/stake/guides/soccer/
- https://stake-global.com/sports/
- https://anonwager.com/en/guides/cashout-and-early-settlement
- https://ssbet.io/stake-sportsbook-review/
- https://www.stakereferralcode.ca/guides/stake-sportsbook-canada
- https://en.virtual-sport.eu/Sport-betting/Stake-Sportsbook-A-Practical-Guide-to-Markets-Live-Betting-Odds-Types-and-Promotions.html
- http://d-sport.net/Sport-betting/Stake-Sportsbook-A-Feature-First-Guide-to-Markets-Live-Betting-and-Promotions.html
- http://ca-sport.com/Sport-betting/Stake-Sportsbook-Features-Promotions-amp-User-Experience-What-Makes-It-Stand-Out.html
- https://www.collegefootballpoll.com/news/stake-adds-same-game-multi-bets-for-american-sports/
- https://fantasysixpack.net/mastering-same-game-multi-bets-your-ultimate-guide-to-bet-building-on-stake/
- Attempted & blocked: https://stake.com/sports/home · https://stake.com/sports ·
  https://help.stake.com/en/articles/4872560-why-is-cashout-not-available-for-my-bet
