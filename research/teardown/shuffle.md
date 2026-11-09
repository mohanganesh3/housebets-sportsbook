# Teardown — Shuffle Sports (shuffle.com/sports)

Date researched: 2026-11-09 (real `date`). Public pages only; no login, no money.
Direct fetch: **SUCCESS** — `https://shuffle.com/sports` fetched today (200).
Note: the served page is SEO text + nav skeleton; JS content areas rendered as
`Loading`, so some fields come from a real screenshot captured in-repo
(`shuffle-sports.png`, 2026-11-09) and reviews — flagged per line.

Source labels: [LIVE] = fetched today · [SHOT] = repo screenshot · [WEB] = article.

## 1. Information architecture

- **Left sidebar nav** [LIVE]: `Casino | Sports` peer toggle → SHFL token card
  (live price, "Convert/Dashboard") → `Home · Upcoming · Bet Live` →
  `SHFL Airdrop · Promotions ▸ · All sports ▸ · All Esports ▸` →
  `VIP · Blog · Affiliate · Live Support`; Login/Register bottom.
  Review adds `My Bets` + `SHFL Lottery` to that General group, with live counts
  (`Upcoming 1,194`, `Bet Live 100`) [WEB: sportsbookratings.eu/go/reviews/en/shufflesports].
- **First viewport:** glossy promo **banner carousel** — ~10 cards seen today:
  `NBA SGM RETURN`, `LEAGUE WORLDS 26`, `SCORE FIRST PROTEC`, `BOOSTED ODDS`,
  `UFC BAD BEAT REFUND`, `2GOALSUP`, `COMBINE-SGM`, `Watch Sports on Shuffle`,
  `3x XP with Sports bets` — with scroll arrows [LIVE]. Then a sport-icon row
  and tab strip `Featured · Upcoming · Bet Live N · All Sports` [LIVE + SHOT].
- **Home sections:** `Trending Now` cards — LIVE chip + stat/stream icons +
  `+222` market-count chip, teams + scores, 1×2 odds cells showing green
  `2.75 ▲` / red `1.45 ▼` direction markers [SHOT: shuffle-sports.png].
- **Bet Live:** dedicated in-play section; streams sit alongside markets with
  **split-screen** betting and pop-out video; green play icon marks streamed
  events [LIVE page copy].
- **League/match pages:** deep markets + "original bets"; parlay/SGM builder
  called "one of the cleaner ones" [WEB: online-casino-listings.com]. Exact
  match-page tab bar: UNKNOWN (JS didn't render in fetch).

## 2. Bet slip — placement & behaviour

- "Quick bet slip" that assembles as you tap, keeps open positions visible,
  settles in crypto balance without a conversion step [WEB: sportsbookratings.eu].
- Mobile: **persistent bet slip** across pages [LIVE page copy: "persistent bet
  slips for easy bet tracking and editing"]; prior repo research notes the slip
  survives casino↔sports nav [research/29, obs].
- Slip placement (right rail vs sheet): right-rail on desktop [INF from
  3-col convention + SHOT]; phone presentation UNKNOWN (no live render).

## 3. Odds changes — display & acceptance

- **Persistent ▲/▼ direction arrows as a cell ornament** — green up / red down
  next to the price on home rows [SHOT]. This residue pattern (arrow outlives
  the flash) is the thing worth stealing.
- Acceptance flow (accept-changed-odds UI/toggles): UNKNOWN — not in fetched
  content or reviews; likely standard reprice-on-slip [INF, unverified].
- Sub-second odds refresh claimed by a review ("the line you see is the line
  you get") [WEB: potsofgold.com]; bet submissions carry short delays and
  markets pause at key moments [WEB: racinginsider.com].

## 4. Suspension / locked markets

- "Usual suspensions on volatile moments"; lower-tier markets suspend more
  aggressively [WEB: online-casino-listings.com]. "Pausing markets during key
  moments… before reopening with updated odds" [WEB: racinginsider.com].
- Visual lock treatment: UNKNOWN (fetch rendered `Loading` on live rows).

## 5. Live score + clock

- Live rows show score + live badge + stat icons in Trending Now cards [SHOT].
- Exact clock typography (`45+2'` etc.): UNKNOWN.

## 6. Market group tabs & counts

- Home tabs: `Featured · Upcoming · Bet Live N · All Sports` [LIVE].
- Sidebar counts: `Upcoming ~1,194 · Bet Live ~100` [WEB: sportsbookratings.eu].
- Row-level `+N` market chips (`+222` seen) [SHOT].
- Match-page market group tabs: UNKNOWN.

## 7. Cash-out

- Cash Out supported "where the market allows" [LIVE + WEB: sportyfolio.com];
  review claims it "settles at the price you accept" with no delay games
  [WEB: potsofgold.com].
- Placement: with the open bet (My Bets area) [INF — standard; no direct
  screenshot evidence]. Partial/auto CO: not offered per any source found —
  treat as absent [INF].

## 8. My bets

- `My Bets` exists as a first-class nav item [WEB: sportsbookratings.eu].
- Internal layout (open/settled tabs, CO display): UNKNOWN — no public
  rendering without login.

## 9. Search

- `Search` field in the site header (top-left of the sportsbook hub) — "usually
  the fastest way of finding whatever you're looking for" [LIVE + WEB:
  thelines.com]. Results/direct-to-market behaviour: UNKNOWN.

## 10. Empty & loading states

- Fetch literally rendered `Loading` placeholders where the coupon/slip JS
  mounts — i.e. spinner-class loading, not skeletons [LIVE].
- Documented empties: none found. UNKNOWN beyond that.

## 11. Promo/clutter in first viewport

- **HIGH** — the promo carousel is the entire first viewport above the fold on
  /sports (10 banners counted today). Review wording: "clutter-free *aside
  from* the promo banners at the top… neon-coloured to pop against black and
  purple" [WEB: thelines.com]. This is their exploitable weakness (matches
  research/16: "promo carousel eats first viewport").

## Beat-it list (for the table)

Zero promos above live sport (banner-blindness respect); their persistent
▲/▼ arrows — adopt, then extend with direction-aware roll + reason-tagged
suspensions; real skeletons vs `Loading`; My Bets demo fully designed vs
login-gated; count chips + Popular-first market order — match, then beat with
settlement-rule tooltips.

## Sources actually opened

- https://shuffle.com/sports (fetched 2026-11-09 — nav, tabs, carousel items,
  feature copy: SGM, Cash Out, Boosted Odds, Sure Sub, 6 odds formats,
  split-screen streams, persistent mobile slip)
- Repo capture: /Users/mohanganesh/contest3/shuffle-sports.png (2026-11-09)
- https://www.sportsbookratings.eu/go/reviews/en/shufflesports/
- https://www.thelines.com/ca/betting/shuffle/
- https://potsofgold.com/shuffle-sportsbook/
- https://online-casino-listings.com/review/shuffle-sportsbook/
- https://www.racinginsider.com/promotions/live-betting-with-shuffle-20260128-0007/
- https://sportyfolio.com/bookmakers/shuffle/
