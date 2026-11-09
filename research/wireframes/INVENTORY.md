# Wireframe Inventory — Housebets Sportsbook Design Contest

**Verified against live page: 2026-11-09T17:48–17:58 UTC** — https://www.housebets.com/contests/sportsbook-design
(Playwright headless-Chromium fetch; direct curl/webfetch get Cloudflare 403. Method note in `../00-contest-brief.md`.)

## File parity: local vs live (checked 2026-11-09T17:58Z)
All **12/12** live asset filenames match local files exactly (content-hashed names ⇒ same assets).
Byte check: live `desk-home.36rrct0bzj7df.webp` downloaded, md5 `e219d3a07c37d66107c9173acd83b90b` = local file. ✅

| # | Live viewer label | Phone file | Desk file |
|---|---|---|---|
| 1 | Sports home | phone-home.298wrslikrd9s.webp | desk-home.36rrct0bzj7df.webp |
| 2 | Live | phone-live.0sen33g5d_zx5.webp | desk-live.0922jch9nod__.webp |
| 3 | Football | phone-football.1lxc2a8itk90s.webp | desk-football.3hg5yfnwo0xv5.webp |
| 4 | Match page | phone-match.41nq-arvrjgy_.webp | desk-match.1dzi8539_ewqc.webp |
| 5 | Bet slip | phone-slip.089v5e1rp42p1.webp + phone-slip-open.3m5w2bgtk_skd.webp | desk-slip.0ta9-jl3qs44u.webp |
| 6 | My bets | — (no phone frame; My bets is a tab inside the phone slip sheet) | desk-mybets.2bx-okxqkx1-o.webp |

⚠️ **Wireframes 5+6 (Bet slip, My bets) are ONE page in our entry** — brief verbatim: *"Pages 5 and 6 here are one page in your entry."* and *"Bet slip and My bets share one page."* On desk they're a right side-panel tab pair + a full-page My bets view; on phone a bottom sheet with `Bet slip | My bets | Chat` tabs.

## VERBATIM BRIEF BLOCKS (re-verified from live page today)

**Scorecard (100 pts):** Sports home 15 · Live 10 · Football 10 · Match page 20 · Bet slip + My bets 20 · Feels like Housebets 15 · Every state: suspended, changed, failed 10.
**Ties (verbatim):** "Ties: the higher Match page score wins, then Feels like Housebets."
**Minimum bar (verbatim):** "Your prototype should be at least this good." / "Our wireframes. Match them, then beat them. Pages 5 and 6 here are one page in your entry."
**Winning test (verbatim):** "The sportsbook we'd ship tomorrow wins."

**Out of scope (verbatim):**
- Multis, accumulators, bet builder
- Boosts, free bets, promos
- Outrights, specials
- Stats widgets, match trackers
- AI search

**What to deliver (verbatim):**
- All 5 pages, linked.
- Works at 390px (phone) and 1440px (desktop).
- Bet slip on phones: a bar at the bottom.
- A clickable prototype. Front end only.
- Share a public link that opens without a login: Vercel, Netlify, GitHub Pages or similar.
- Sample data only: no real players, no real money.

**Form fields (verbatim):** 1. "Link to your clickable prototype" — "A public link: Vercel, Netlify, GitHub Pages or similar." · 2. "Pages in your prototype" — "Tick all five. Your prototype must have every one." · 3. "Your big idea" — "What makes it Housebets? 80 to 800 characters." · 4. "Tools and templates you used" (Optional) — "Figma, v0, Claude, a UI kit. Name them all."

**Confirmations (verbatim, 5 boxes):**
1. "My bet slip takes singles only. No multis, boosts or free bets."
2. "No real player data and no real money anywhere in it."
3. "It's my own work. I've named any tools, templates or kits I used in this form."
4. "Housebets can share my entry publicly."
5. "If I win, the prize is the full payment and Housebets owns the winning code, designs and rights."

**Other:** Entries **131** (↑ from 119) · Deadline **Nov 14, 2026 18:00 UTC** (countdown "05 DAYS 00 HOURS ~10 MINS" at fetch) · Submit = "A link" · 3 submissions/24h, every submission judged, best counts · Results ~7 days after close · Prize ladder $9,000/$4,000/$2,000.

## SHARED SHELL ELEMENTS (appear in all frames)

Phone: top bar = `Housebets` wordmark+wave logo left; `Log In` (dark pill) + `Register` (mint pill) right. Bottom tab bar = `Menu` (hamburger) · `Sports` (active teal) · `Casino` · `Chat` · promo avatar (palm-tree, truncated "Su…" label).
Desk: top bar = sidebar-toggle icon + logo; center `Weekly Prize` trophy `$50,000.00` + crown icon; right search icon, side-panel toggle, `Log In`, `Register`. Left icon rail ~70px (one icon teal-active per page; e.g. video icon active on Live, person icon on My bets).

---

## W1 — SPORTS HOME (scorecard 15 pts)

### Phone image (phone-home), top→bottom
- W1-01 Search bar: `⌕ Search teams, players or leagues` — brief: "Search: teams, players, competitions, markets" → opens search.
- W1-02 Sport nav strip (scrollable): `Home` (house icon, active teal) · `Live 13` (video icon, red dot + red count) · `Soccer` · `Tennis` · `Basketball` → navigate pages; Live count = in-play matches.
- W1-03 `Favourites` label.
- W1-04 Favourite chips (removable): `★ Premier League ×` · `[Arsenal crest] Arsenal ×` → × removes favourite; chip tap likely filters/navigates.
- W1-05 Card `Your matches` + dim `3 matches` count (brief: your followed teams' matches).
- W1-06 Live match card: `LIVE` red pill + `52'` + `· Premi…` competition + `☆` follow toggle + `+115 >` more-markets link.
- W1-07 Team rows: crest + `Arsenal` — score `1` right; crest + `Brighton & Hove Albion` — `0`.
- W1-08 Odds row (3 chips): `Arsenal 1.30` · `Draw 4.60` · `Brighton 11.00` → tap adds selection to bet slip.
- W1-09 Next match card peeks at right edge (`16:3…` + Liverpool/Man Utd crests + `1.6…`) → horizontal card scroll.
- W1-10 `Featured matches` header + `<` `>` carousel arrows.
- W1-11 Featured card: competition label `Premier League` top-left, `LIVE 52'` top-right; team rows; odds row 1.30/4.60/11.00; next card (`Premi…`) peeks right.
- W1-12 Bottom tab bar (shared).

### Desk image (desk-home) — same elements, layout differs
- W1-20 Desk top bar + left icon rail (rail icons incl. sports/quick links; casino-roulette icon active).
- W1-21 Search bar full content width.
- W1-22 Nav row extends: `Home · Live 13 · Soccer · Tennis · Basketball · Baseball · American Football · Esports`.
- W1-23 `Favourites` chips row (same two).
- W1-24 `Your matches 3 matches` — **table** (not cards): header `Match result` over odds column.
- W1-25 Table row live: `LIVE` + `52'` stacked · team rows w/ crests + scores · 3 wide odds buttons (label left, odds right) · `+115 >`.
- W1-26 Upcoming row: `16:30` / `Sun, Oct 18` (no score) · Liverpool v Manchester United + gold ★ in row · `1.65/4.00/4.33` · `+10 >`.
- W1-27 Upcoming row: `20:00 Tue, Oct 20` · Arsenal v Inter · `1.95/3.50/4.00` · `+8 >`.
- W1-28 `Featured matches` + `<>`: cards `Premier League LIVE 52'` ARS-BHA; `Premier League Sun, Oct 18 · 16:30` LIV-MUN 1.65/4.00/4.33; `Champions League Tue, Oct 20 · 20:00` RMA-BAY 2.20/3.70/2.90; `Premier League Sun, Oct 18 · 14:00` MCI-TOT 1.50/4.50/5.25; 5th card `N…` peeking.
- W1-29 `Upcoming events` section below (`17:00` Napoli v Milan row starting).

**Brief expects:** Live now · Starting soon · Top competitions · Sports nav · Search. Wireframe adds Favourites/Your matches/Featured/Upcoming — the "beat them" baseline.

## W2 — LIVE (scorecard 10 pts)

### Phone image (phone-live)
- W2-01 Header: `<` back + `Live now` title pill.
- W2-02 Search bar (same placeholder).
- W2-03 Sport filter chips w/ live counts: `All 13` (active, video icon) · `Soccer 6` · `Tennis 3` → brief: "Filter by sport and competition".
- W2-04 Competition card header: `[England flag] ● Premier League` + gold ★ (followed) + `View all >`.
- W2-05 Live match card ARS-BHA (LIVE 52', ☆, +115, 1.30/4.60/11.00) — same pattern as W1-06/07/08.
- W2-06 Second match peeking: `LIVE` + Villa/Fulham crests + `Villa… 2.2…`.
- W2-07 `LaLiga` card: flag+live dot, outline ☆ (unfollowed), `View all >`.
- W2-08 Live card `37'` Atlético Madrid 1 — Sevilla 0, `+8 >`.
- W2-09 **Suspended state**: full-width outlined bar `🔒 Suspended` in orange replaces the odds row → brief: "markets suspended" + scorecard "Every state".
- W2-10 `Serie A` card starting below.

### Desk image (desk-live)
- W2-20 Header `< Live now`; live icon active in left rail.
- W2-21 Filter row extends: `All 13 · Soccer 6 · Tennis 3 · Basketball 1 · Baseball 1 · American Football 1 · Esports 1`.
- W2-22 Competition tables: `Premier League 3 matches` + ★ + `View all >`; rows: ARS-BHA `LIVE 52'` (+115), `LIVE HT` Aston Villa 0-0 Fulham 2.25/2.90/3.60 (+7), `LIVE 58'` Newcastle 2-1 Everton **Suspended** (+6).
- W2-23 `LaLiga 1 match` ☆ — Atlético-Sevilla Suspended (+8).
- W2-24 `Serie A 1 match` ☆ — Juventus 1-1 Roma 2.40/3.10/3.20 (+6).
- W2-25 `Bundesliga 1 match` starting.
- W2-26 Suspended keeps `+N >` markets link live on the row.

**Brief expects:** every in-play match · sport+competition filters · live score + clock · empty → "show Starting soon". HT treated as clock state. Suspended row still navigable to match.

## W3 — FOOTBALL (scorecard 10 pts)

### Phone image (phone-football)
- W3-01 Header: `<` + `Soccer ⌄` sport-switcher dropdown + sliders/filter icon button right.
- W3-02 Search bar.
- W3-03 Segmented tabs: `Live & Upcoming 6` (active) | `All Soccer`.
- W3-04 `Premier League` card: flag, gold ★, `All 10 >` → rows ARS-BHA live card + Villa-Fulham peek.
- W3-05 `Champions League` card (globe/UCL icon) ☆ `All 4 >`: **upcoming** card `20:00 Tue, Oct 20` Arsenal v Inter — no scores, `+8 >`, odds `1.95/3.50/4.00`; next `R Ma…` v Bayern `2.2…`.
- W3-06 `LaLiga` card `All 4 >` starting.
- Brief: "Follow a team or competition" → ★ toggles in card headers & match rows.

### Desk image (desk-football)
- W3-20 Header: `<` `Soccer ⌄` + meta line `5 competitions · 6 live`; right `Market` label + `Match result ⌄` dropdown (changes which market the row odds buttons show).
- W3-21 Tabs `Live & Upcoming 6 | All Soccer` + right dropdown `All competitions ⌄` (competition filter).
- W3-22 PL table `10 matches` ★ `View all 10 >`: 3 live rows incl. Suspended Newcastle-Everton.
- W3-23 UCL table `4 matches` ☆ `Show all 4 >` (label variant): upcoming rows `20:00 Tue, Oct 20` ARS-INT 1.95/3.50/4.00 +8; RMA-BAY 2.20/3.70/2.90 +9; `Wed, Oct 21` BAR-PSG 2.05/3.80/3.30 +8.
- W3-24 LaLiga `4 matches` `Show all 4 >` starting.
- Brief: 5 competitions = PL, UCL, LaLiga, Serie A, Bundesliga · "Match result odds on each row" · follow team/competition.

## W4 — MATCH PAGE (scorecard 20 pts — biggest single item + first tie-break)

### Phone image (phone-match)
- W4-01 Header: `<` + `ARS - BHA ⌄` match-switcher dropdown.
- W4-02 Scoreboard card: `<` chevron left edge (prev match?), `PREMIER LEAGUE` small-caps center, `☆` top-right (follow match).
- W4-03 Teams row: Arsenal crest+name left · `1 - 0` boxed score center · Brighton crest + `Brighton & Hove…` right.
- W4-04 `● LIVE 52'` red status centered under score.
- W4-05 Follow pills under teams: `★ Following` (gold, Arsenal) · `☆ Follow` (Brighton).
- W4-06 Search `⌕ Search markets or players` — different placeholder; brief out-of-scope bans "AI search" but plain market search is in the wireframe.
- W4-07 Market-group tab strip w/ counts: `Popular 10` (active) · `Goalscorers 9` · `Goals 11`.
- W4-08 Accordion `Match result` expanded `^`: 3 odds chips `Arsenal 1.30 / Draw 4.60 / Brighton 11.00`.
- W4-09 Accordion `Double chance` expanded: `Arsenal/Dr… 1.03 · Arsenal/Br… 1.18 · Draw/Brig… 3.30` (truncated labels).
- W4-10 Next accordion peeking.

### Desk image (desk-match)
- W4-20 Breadcrumb bar: `<` + `Soccer ⌄ | England ⌄ | Premier League ⌄ | ARS - BHA ⌄` (4 dropdown levels).
- W4-21 Scoreboard card: `PREMIER LEAGUE` + ☆ top-right; Arsenal crest+name+`★ Following` left; `1 - 0` + `● LIVE 52'` center; Brighton name+crest+`☆ Follow` right.
- W4-22 Search markets/players bar.
- W4-23 Tabs row (10): `Popular 10 · Goalscorers 9 · Goals 11 · Players 11 · Halves 8 · Handicaps 5 · Corners & cards 14 · Minutes 10 · Specials 7 · All markets 85`.
- W4-24 Accordions full-width `^`: `Match result` (wide buttons label-left/odds-right: Arsenal 1.30, Draw 4.60, Brighton & Hove Albion 11.00) · `Double chance` (Arsenal or draw 1.03, Arsenal or Brighton & Hove Albion 1.18, Draw or Brighton & Hove Albion 3.30) · `Total goals` (Over 2.5 2.73, Under 2.5 1.44).
- Brief: market groups Popular/Goals/Halves/Handicaps/Goalscorers/Corners & cards · "Odds moving, markets suspended" → need movement flashes + suspended states beyond what static frame shows.

## W5 — BET SLIP (with W6 = one page; combined scorecard 20 pts)

### Phone image 1 (phone-slip) — collapsed bar
- W5-01 Match page behind; `Arsenal 1.30` odds chip now **selected**: brighter cyan fill + white `✓` top-right.
- W5-02 Bottom bet-slip **bar** above tab bar (brief: "a bar at the bottom"): dark badge `1` count + `Arsenal @ 1.30` + `^` expand chevron. Mint/light bar.

### Phone image 2 (phone-slip-open) — sheet open
- W5-03 Page dimmed under scrim; sheet occupies lower ~55%.
- W5-04 Sheet tabs: `Bet slip ①`(active, blue badge) · `My bets ①`(mint badge) · `Chat` · `✕` close.
- W5-05 `Singles · 1 selection` + `Clear all`.
- W5-06 Selection card: `Arsenal` bold, `1.30` cyan right, `✕` remove.
- W5-07 Sub-line: `Match result · Arsenal v Brighton & Hove Al… · 1–0 · 52'` (score+minute red-pink) — live context inside slip.
- W5-08 Stake input `$ 0.00` + `Returns —` label right.
- W5-09 Totals: `Total stake $0.00 ₮` · `Payout $0.00 ₮` (USDT ₮ icons — brief: "stakes in USDT", "decimal odds", "stake, odds, potential return").
- W5-10 `Place bet` — disabled state shown (dim).

### Desk image (desk-slip) — right side panel
- W5-20 Right panel (~330px): same tabs `Bet slip ① | My bets ① | Chat | ✕`; top-bar panel-toggle icon highlighted.
- W5-21 Same Singles/selection card/stake/returns/totals/disabled Place bet stack.
- W5-22 Arsenal odds button in main content shows selected state (cyan + ✓).
- Brief requires beyond frame: odds-changed → "player must accept" prompt; suspended selection state; placed/failed feedback.

## W6 — MY BETS (desk full page; phone = slip-sheet tab)

### Desk image (desk-mybets)
- W6-01 Header `<` + `My bets` + meta `1 open · 7 settled`; person icon active in rail.
- W6-02 Segmented tabs `Open (1)` | `Settled (7)`.
- W6-03 Filter chips: `All time` (active) `Today` `Last 7 days` `Last 30 days` `Custom` + `All sports ⌄` dropdown right.
- W6-04 Table header: `Placed | Bet | Odds | Stake | Returns | Result` + expand `⌄` col.
- W6-05 Row: `Oct 17 14:58` · `Arsenal` + `Arsenal v Brighton & Hove Albion` + live badges `●52'` `1–0` · `1.80` · `$20.00` · `$36.00` · `Open` pill · `⌄` (expand — likely holds cash out + details; brief: "My bets: open, settled, cash out").
- No phone frame exists — phone renders My bets as the middle tab of the bottom sheet (W5-04).

**Brief expects on W5+W6 page:** tap odds → slip · singles only · decimal odds · USDT stakes · stake/odds/potential return · odds changed → accept · selection suspended · bet placed/failed · open, settled, cash out.

---

## DERIVED ASK PROPOSALS

1. Bottom phone bet-slip bar shows count badge + `Selection @ odds` + expand chevron — our bar must collapse to exactly this.
2. Odds chips everywhere need three visual states: default, selected (cyan+✓), suspended (replaced by `🔒 Suspended` bar) — plus brief's 4th: odds-changed alert inside slip.
3. `Suspended` renders as full-width outlined amber bar w/ lock icon replacing the entire odds row on cards AND table rows — while `+N >` markets link stays clickable.
4. Live match cards on home/live/football share one anatomy: `LIVE` pill + clock/HT · competition (home only) · ☆ · `+N >` · two team rows w/ crests + right-aligned scores · 3 odds chips. Reuse one component.
5. Upcoming cards/rows swap `LIVE+clock` for `HH:MM` + `Day, Mon DD` and drop the score column — two card variants needed.
6. `+N >` on every match = markets count → navigates to match page. Counts seen: +115, +10, +9, +8, +7, +6.
7. Every competition header = flag/crest icon + live dot (live only) + name + `N matches` (desk) + ★ follow toggle + `View all N >`/`Show all N >`/`All N >` link — label differs phone (`All N`) vs desk (`View all`/`Show all N`).
8. Follow states: gold filled ★ = followed, outline ☆ = not; match page adds `★ Following`/`☆ Follow` pills under each team. Removing favourites = `×` chips on home.
9. Sport filter chips carry live counts (`All 13`, `Soccer 6`, `Tennis 3`…); active chip = teal fill. Live page must filter by sport AND competition (dropdown needed on phone — desk uses `All competitions ⌄` on Football only; Live page desk shows sport chips only).
10. Match page needs desk breadcrumb `Sport ⌄ Country ⌄ Competition ⌄ Match ⌄` vs phone `ARS - BHA ⌄` single dropdown + prev-match `<` inside scoreboard.
11. Market-group tabs carry counts (Popular 10, Goalscorers 9, Goals 11, Players 11, Halves 8, Handicaps 5, Corners & cards 14, Minutes 10, Specials 7, All markets 85) — phone shows a scrollable subset. Our match page needs ≥ the 6 brief-named groups; "All markets N" total tab is a nice-to-have from desk frame.
12. Market accordions default expanded (Match result, Double chance, Total goals shown open); chevron `^` top-right collapses. Odds buttons: phone = compact chips label-over-odds, desk = wide rows label-left odds-right.
13. "Search markets or players" search inside match page (separate from global "Search teams, players or leagues") — both placeholders must exist; AI search stays out of scope.
14. Slip needs: `Singles · N selection` line, `Clear all`, per-selection card (name, odds, ✕, market+fixture+live score sub-line, `$` stake input, `Returns`), totals row w/ ₮ icons, disabled→enabled `Place bet`. Singles only — no multi UI anywhere (confirmation #1).
15. Phone slip sheet + desk right panel share tabs `Bet slip N | My bets N | Chat | ✕` — My bets must be reachable both as sheet/panel tab and full page (desk-mybets frame).
16. My bets page: `Open (n) | Settled (n)` segmented tabs, time filters (All time/Today/Last 7/Last 30/Custom), `All sports ⌄`, table cols Placed/Bet/Odds/Stake/Returns/Result + expandable row. Open bet shows live score+minute badges and presumably cash out in expansion — brief requires cash out visible on open bets.
17. States scorecard (10 pts) demands visible demos: odds changed→accept prompt in slip, suspended selection in slip, suspended market on cards/match page, bet placed confirmation, bet failed error.
18. `Live now` filter on Football = `Live & Upcoming N | All Soccer`; Live page empty state must fall back to "Starting soon" list (no wireframe exists for it — ask needed).
19. Desk top bar must include Weekly Prize `$50,000.00` + crown promo slot, search + panel toggles, Log In/Register — shell parity = "Feels like Housebets" pts.
20. Bottom phone tab bar: Menu/Sports/Casino/Chat + promo avatar; Sports stays active on all 5 pages.
21. Left desk rail is icon-only ~70px with teal active indicator — our shell should mirror icon rail + active states per page.
22. Search must cover teams, players, competitions, markets (brief) — results UI has no wireframe (UNKNOWN, needs design).
23. Entry count moved 119→131 in ~14h — iterate submissions allowed (3/day, best counts) so ship early then polish.
24. Big-idea field (80–800 chars) and tools-named note need drafting before submission — content task, not build.
25. No real crests/logos rule ambiguity: wireframes use real club crests, but rules say "Sample fixtures and odds only. Don't copy another sportsbook" — using the same sample teams (Arsenal/Brighton etc.) matches their wireframes; crests should be generic/stylized to stay safe.
