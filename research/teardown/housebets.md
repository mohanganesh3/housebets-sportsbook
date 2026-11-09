# Teardown — Housebets live /sports (housebets.com/sports)

Date researched: 2026-11-09 (real `date`). Public pages only; no login, no money.
Direct fetch: **BLOCKED today** — `https://www.housebets.com/sports` and
`/sports/live` both 403 (Cloudflare). **BUT the repo holds real captures**:
`contest-page-snapshot.yml` (full a11y DOM of the site shell, 2026-11-09),
`hb-sports-page.png` + `hb-sports-mobile.png` (2026-11-09),
`shadow-dom-info.json` (the embedded book's rendered DOM text dump, 549 KB
HTML), and a **Wayback capture of /sports from 2025-11-08** fetched today.
The sportsbook itself is a **BETBY white-label web component** — that fact IS
the teardown's thesis.

Source labels: [WB] = Wayback 2025-11-08 · [DOM] = repo DOM captures 2026-11-09 ·
[R##] = prior repo research files · [INF] = inference.

## 0. What the product actually is

- `/sports` embeds a BETBY (third-party) sportsbook as a shadow-DOM web
  component styled to Housebets tokens (Figtree only, `sc-*` styled-components,
  96 style blocks) [DOM: shadow-dom-info.json; R03].
- Sports routes are query-param proxies into the widget:
  `/sports?bt-path=/live`, `/bets`, `/soccer-1`, `/tennis-5`, `/basketball-2`,
  `/ice-hockey-4`, `/117`(MMA), `/109`(CS2), `/40`(F1), `/55`(racing)… [WB].
- This is why the contest exists: the embed "doesn't feel native" (R16).

## 1. Information architecture

- **Site shell** [DOM: contest-page-snapshot.yml + R18]: top bar = menu toggle ·
  logo · **centred Leaderboard prize widget** (`Weekly Prize $50,000.00 /
  Monthly Prize $100,000.00`) · Rewards crown · Search · Chat · `Log In` dark
  pill · `Register` pale-cyan pill (the only primary CTA in chrome).
- **Left rail:** icon-only; `Casino | Sports` peer toggle; casino nav
  (Lobby/House Games/New Releases/Slots/Live Casino/House Studios); support
  pinned bottom [DOM; R18].
- **Sports sidebar (BETBY):** `Home · Upcoming Events · Bet Live · My Bets`
  → `Sports Games` list (Soccer, Tennis, Cricket, Basketball, American
  Football, Ice Hockey, MMA, CS2, F1) → `Games` groups `All Sports /
  All eSports (CS2, Dota2, LoL, SC2) / All Racing (Horse, Greyhound, Harness)`
  [WB — note the "Hamess" typo in their shipped labels].
- **Book home tabs:** `Popular · Live · Upcoming · Predictions` → sport chip
  row (Football, Tennis, American Football, eSoccer, Basketball, Ice Hockey,
  Cricket, Volleyball, eCricket, League of Legends) → league-grouped match
  cards → `Go to All Markets` links → `Hot Combos · Top Events · Top Outrights`
  → footer `ODDS FORMAT: European` toggle [DOM: shadow-dom-info.json; R03/R18].
- **Match rows (verbatim DOM text):** `Italy · Serie A · 29′ 1st half · 1–0 ·
  ACF Fiorentina · Juventus · 1x2 [1:1.82 draw:3.72 2:4.3]`; NFL rows
  `43′ 3rd quarter · 8–12 · Winner (incl. overtime)`; NHL `Second break ·
  Winner (incl. overtime and penalties)` [DOM].
- **Density:** flat, low hierarchy — league header → rows; "flat Figtree,
  no motion language, promo-y, buried states" (R03 verdict).

## 2. Bet slip — placement & behaviour

- Widget has a betslip surface; Housebets' own quick-stake widget chips are
  `1 / 10 / 50 / 100 USDT` with **50 highlighted** (seen in their live widget)
  [R03/R18, DOM]. Slip rail position = BETBY default right column [INF].
- Phone tab bar `Menu · Sports · Casino · Chat · Support` — **no dedicated
  bet-slip tab in the shell** [DOM; R18]; slip entry lives inside the widget.
- Verbatim behavioural detail: thin — the DOM dump covers the coupon, not the
  slip internals. UNKNOWN beyond above.

## 3. Odds changes — display & acceptance

- UNKNOWN for the live widget (no capture of a moving cell). BETBY-class books
  do standard flash-on-delta + reprice prompt [INF, unverified — do not quote
  as fact in the design rationale].

## 4. Suspension / locked markets

- No suspension frame captured in the DOM dump. BETBY convention = greyed cell.
  UNKNOWN for their exact look.

## 5. Live score + clock

- Clock format (verbatim from dump): `29′ 1st half`, `33′ 1st half`,
  `43′ 3rd quarter`, `46′ 4th quarter`, `Second break`, `Break` — score sits
  between clock and team names [DOM]. Phonetic strings like `Back online`
  appear as a connectivity toast [DOM].

## 6. Market group tabs & counts

- Book-home tabs: `Popular · Live · Upcoming · Predictions` (4; Predictions is
  BETBY-generic, not Housebets voice — R18 flags dropping it) [DOM].
- Match-page market groups: UNKNOWN (no match page captured). Row→market
  drill via `Go to All Markets` (BETBY wording) [DOM].

## 7. Cash-out

- UNKNOWN — not present in captured DOM; BETBY supports CO but no Housebets
  evidence was captured. Do not claim either way.

## 8. My bets

- `My Bets` exists in the BETBY sidebar nav (`/sports?bt-path=/bets`) [WB].
- Internal layout: login-gated — UNKNOWN.

## 9. Search

- `Search` button in the top shell bar [DOM snapshot]. The contest wireframe
  spec upgrades it to "teams, players or leagues" content search (R18), which
  implies the embed's current search is weak/site-level [INF, well-founded].

## 10. Empty & loading states

- `Back online` connectivity toast captured verbatim [DOM] — their one
  observed state nicety. Other empties/loading: UNKNOWN.

## 11. Promo/clutter in first viewport

- Shell top bar carries the ticking **Leaderboard prize pools** — ambient
  casino-gravity in the chrome itself [DOM]. Book home mixes `Hot Combos /
  Top Outrights` promotional modules into the feed [DOM; R03 "promo-y"].

## Why this teardown matters most

The judge team built this surface and finds it generic. Every answer in the
"Ours" column should read as **the same shell, a natively better book**:
verbatim BETBY weak points = verbose market names (`Winner (incl. overtime and
penalties)` → concise), `1x2/draw` → `Match result / 1 X 2`, `Go to All
Markets` → `+N ›`, `ODDS FORMAT` toggle → decimal-only, Predictions tab →
drop, flat no-motion → semantic motion, no shell-level slip tab → phone
bottom slip bar [R18 divergences list].

## Sources actually opened

- https://web.archive.org/web/20251108085307/https://www.housebets.com/sports
  (Wayback, captured 2025-11-08; fetched 2026-11-09)
- Repo captures (2026-11-09): `contest-page-snapshot.yml`,
  `shadow-dom-info.json`, `hb-sports-page.png`, `hb-sports-mobile.png`
- Repo research reused: `03-brand-system.md`, `18-housebets-dna-2.md`
- Attempted & blocked today: https://www.housebets.com/sports (403),
  https://housebets.com/sports (403), https://www.housebets.com/sports/live (403)
