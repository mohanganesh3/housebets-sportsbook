# B8 — Housebets forensics round 2 (wave B)

Sources: verbatim `contest-page-snapshot.yml` DOM + `shadow-dom-info.json` BETBY dump
+ source audit of our build. (web_search down; HIGH confidence — captured ground
truth, not inference.)

## Real product anatomy (verified DOM)

- **Top bar**: menu-toggle → logo → **centered Leaderboard prize widget** (`Weekly
  Prize $50,000.00 / Monthly Prize $100,000.00`) → Rewards crown → Search + Chat
  icon buttons → `Log In` dark pill + `Register` **pale-cyan** pill (the only
  primary-looking button). The ticking prize pool IS their chrome identity.
- **Left nav**: icon-only; Casino/Sports peer toggle; House Games/House Studios/
  Contest Labs/XP Race/Leaderboard surfaces; support pinned bottom.
- **Footer — 6 real columns** incl. Payments (deep-linked Intercom help), Support
  (Provably Fair, Self-Exclusion, Independent Gambling Support), Legal (Fairness
  Policy), Community (X/Telegram) + GCB cert + GR + 18+ + full license line
  (Bridge Technologies B.V., Curaçao OGL/2024/431/0231) + `©2026`.
- **Phone tab bar**: `Menu | Sports(active) | Casino | Chat | Support` — community
  chat is chrome, not a page.

## Visual system — the corrections that matter most

1. **Primary CTA = `#c4f4f1` pale-cyan FILL + `#041015` text** (hover `#82e0e0`,
   pressed `#02f8f8b3`). Neon `#02f8f8` = text/icons/borders/glow ONLY.
   → Our neon fills (Place bet, Accept, View match, Deposit) read generic-crypto.
   Highest-leverage "feels like Housebets" fix.
2. Wireframe suspended row = **single full-width amber `🔒 Suspended` band**
   replacing the odds area (list rows); per-cell locks belong on match page.
3. Market tabs: `Popular 10 | … | All markets 85` — **All LAST with count**.
4. Phone slip bar = cyan pill `❶ Arsenal @ 1.30 ⌃` showing the pick, not a count.
5. Football signatures: breadcrumb pills `‹ | Soccer ▾ | "5 competitions · 6 live"`;
   **`≡ Market: Match result ▾` rebinds row odds**; `All competitions ▾`;
   segmented `Live & Upcoming 6 | All Soccer`.
6. Match breadcrumb = ▾ pills ending `ARS – BHA ▾`; scoreboard `★ Following` chip
   + `☆ Follow` text button.
7. Home: content search pill "Search teams, players or leagues"; Favourites
   removable chips `★ Premier League ×`; "Your matches · N" card headed
   `Match result` with `+115 ›`; featured snap carousel; phone sport-nav =
   icon-grid segmented card.
8. Quick-stake chips: **1/10/50/100 USDT, 50 highlighted** (their widget).
9. My bets = full-page table: `1 open · 7 settled`, Open/Settled segmented,
   time filters (All time/Today/7d/30d/Custom) + `All sports ▾`, columns
   `Placed|Bet|Odds|Stake|Returns|Result|⌄` expandable w/ `●52' 1–0` chips.
10. Labels verbatim: `Log In`, `Register`, `Place bet`, `Bet slip`, `My bets`,
    `Follow/Following`, `Live now`, `Starting soon`, `Corners & cards`,
    `Match result`, `Cash out`, `Open/Settled`, per-leg `Returns`, footer `Payout ₮`.

## Voice rules (verbatim-derived)

Sentence case · terse declaratives/imperatives · NO exclamation marks · no emojis ·
numerals not words · dry confidence ("at least this good") · second person ·
short noun labels ("Contest Labs", "Prize ladder"). Off-voice items found:
"Here's what's teeing up next" (golf idiom), invented chat dead-end copy,
caps "GOAL —" toast.

## BETBY baseline → deliberate divergences

Tabs Popular/Live/Upcoming/**Predictions** (drop — not their voice) · lowercase
`1x2` + word `draw` → `Match result` + `1 X 2` · verbose `Winner (incl. overtime
and penalties)` → concise names · promo interstitials → banned anyway · `Go to All
Markets` → `+N ›` · `ODDS FORMAT` footer toggle → decimal-only · keep their good
phonetics (`29′ 1st half`, `Back online` toast) · flat Figtree/no motion →
3-font Oxanium signature + semantic motion.

## Keep-as-correct (already native)

"The house is patient." + HouseGlyph · delay disclaimer · `SUSPENDED · Goal`
pills · `HB-###` refs · "Accepted at live odds" · WaveArt+roofline+Grain ·
restrained check-draw · gold= follows/prizes only.

## Open/flagged (web was down)

Hubie form unknown → house glyph is the safe mascot proxy, one cameo max.
Trustpilot/BETBY-complaint quotes unverified — re-fetch when search returns
(citation gold for big-idea field).
