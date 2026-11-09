# STORYBOARDS — Boards: Sports home (15) · Live (10) · Football (10)

Frames at 390 + 1440 with exact copy. Law: PRINCIPLES P1–P6, TOKENS, MOTION S1–S8, COPY deck,
MENTAL-MAP zones. Parity anchors: wireframe INVENTORY W1/W2/W3 element IDs cited per frame.
Element cards: `design/ELEMENTS/boards.md` (match row, group header, nav pill, hero slide,
countdown, filter chips, live badge, empty state, skeleton).

## Shared board grammar (all three pages)

- **Coupon = hairline-separated list regions on `--c-bg`, not nested cards** (SA4-01). A
  competition group = `--c-surface-1` region, r-md, rows separated by 1px `--c-surface-2`
  hairlines. Card chrome reserved for hero slide + ticket (U-40 density-via-rhythm).
- **Match row anatomy (list row, desk):** `clock column | crest+name / crest+name (scores
  right-aligned) | 1X2 cells ×3 | +N ›`. Phone card variant folds to: header line
  (`● LIVE 52' · competition · ☆ · +N ›`) + two team lines + 3-cell odds row (W1-06..08).
- **Odds cell:** `--c-surface-2` fill + hairline, label hb-label text-2 over price hb-odds
  Oxanium `--c-brand-neon`; selected = `--c-cta` fill + `--c-cta-fg` + ✓ (71 task 3); implied %
  rides beside every price at hb-micro (`1.30 · 77%` — P1, U-47).
- **Suspended row:** full-width amber band replaces ONLY the odds row — `🔒 Suspended —
  {reason}` (`--c-suspend` text + lock + hairline band), last prices visible dimmed 60% behind
  it on desk, `+N ›` stays navigable (U-04, U-27, R-YAB-19; W2-09/W2-26 parity).
- **Clock column honesty:** live = `● LIVE` + `52'`/`HT`/`45+2'`; scheduled = `20:00` +
  `Tue, Oct 20`; never `0–0` for unstarted matches — countdown instead (U-39, T42-17).
- **Sticky group headers** at 32–36px (T7-08); counts attached to every header/tab (U-28).
- **Follow ★:** gold `--c-gold` filled = followed, outline text-3 = not; appears on
  competition headers, team rows, match cards — followable from EVERYWHERE (M4 ask, A37.S2).
- **State in URL:** sport, competition filter, tab, market selection all serialise (U-45).
- **Motion budget:** ≤4 simultaneous motions/viewport (P3); odds ticks = S1 tint+glyph decays
  ~1s; real deltas only, never on mount (P52-22, P55-04).

---

# 1. SPORTS HOME (15 pts)

Section order (both widths — identical map, MENTAL-MAP rule 4):
search → sport nav → favourites → **live strip** → **hero slideshow** → your matches →
starting soon → top competitions → upcoming tail.

> Decision: live strip precedes hero so an in-play rail sits inside the first 390 viewport
> (P51-14); the hero is editorial not louder. Wireframe order (favourites→your matches→
> featured→upcoming) is preserved as elements; reordering is justified by the brief's own
> "Live now · Starting soon · Top competitions" ask.

## HM-01 — 1440 arrival (signed-in, follows exist)

```
SPORT NAV   Home | ● Live 13 | Soccer | Tennis | Basketball | Baseball | Am. Football | Esports
FAVOURITES  ★ Premier League ×   ⚽ Arsenal ×          [+ Add — via ★ anywhere]
LIVE NOW · 13 ─────────────────────────────────── View all live ›
  ● LIVE 52'  Arsenal 1–0 Brighton        1.30 · 4.60 · 11.00      +115 ›
  ● LIVE HT   Aston Villa 0–0 Fulham      2.25 · 2.90 · 3.60        +7 ›
  ● LIVE 37'  Atlético 1–0 Sevilla   🔒 Suspended — dangerous attack +8 ›
FEATURED — featured fixtures, no promos               ‹ 1 / 5 ›
  ┌ hero slide: Premier League · ● LIVE 52' · crests 48px · ARS 1–0 BHA
    1.30 · 77% | 4.60 | 11.00        [View match] ·········· (dots) ┐
YOUR MATCHES · 3 matches — from your follows                    Match result
  16:30 Sun, Oct 18  Liverpool v Man Utd ★   1.65 · 4.00 · 4.33   +10 ›
  20:00 Tue, Oct 20  Arsenal ★ v Inter       1.95 · 3.50 · 4.00    +8 ›
STARTING SOON — countdown blocks (real kickoffs only)
  Kicks off in 04:12   Napoli v Milan        2.10 · 3.40 · 3.50    +12 ›
  Kicks off in 18:47   Real Madrid v Bayern  2.20 · 3.70 · 2.90    +9 ›
TOP COMPETITIONS — 5 league entries w/ live counts
  England PL ·3 live | Champions League ·1 | LaLiga ·1 | Serie A ·1 | Bundesliga ·1
UPCOMING EVENTS  17:00 Napoli v Milan …
```

Copy notes: `LIVE NOW · 13` count = rail badge parity; `Kicks off in 04:12` is Oxanium hb-clock
on a `--c-surface-1` chip (R-YAB-12: countdowns only to real events); `View all live ›` deep-links
`/live`. Section hairlines only; zero promo surfaces in first viewport (T42-14 fold audit).

Attention (A11): 1) live strip first row prices · 2) hero crests+score · 3) pale-cyan View match.
Taps to any market: home → price tap = 1; → match page = 2 (A20.b).

## HM-02 — 390 arrival

Top bar + sport row (SH-04). Board stacks the same order; differences:
- Live strip = horizontal scroll of compact live cards (`● LIVE 52'` + score + 1X2 mini cells),
  edge fades; next card peeks 24px (W1-09 pattern).
- Hero slideshow = full-bleed single card, swipe-snap + dots; no ‹ › buttons at 390 (thumb
  swipe instead — P5); auto-advance OFF (P51-02 removes rotation; manual only, pause exists).
- `Your matches` renders as the phone card variant (W1-06 anatomy); `Top competitions` = 5
  list rows with crest mark + name + `· N live` + `›`, not tiles (progressive density, U-17).

## HM-03 — No-follows / first-visit variant

Favourites section → empty module: `Nothing followed yet — ★ any team or league pins it here`
+ inline `★ Premier League` `★ Arsenal` suggestion chips (T42-06 empty suite: explainer +
quick-follow). `Your matches` section collapses entirely (never a dead header — X05).
Zero-onboarding value: live strip still leads (Apple-Sports rule, 72-canon).

## HM-04 — Loading (first paint, X04, U-42)

Skeleton rows = real row markup with `is-loading`: crest discs, name bars (60%/40% widths),
3 odds-cell blocks — exact final geometry, zero CLS. Opacity-only shimmer ≤2 loops, held off
150–300ms so fast loads never flash (T42-07, U-57). Hero slides in statically (no entrance
replay on return — U-37).

## HM-05 — Board-level odds movement (live strip)

Price tick on `Arsenal 1.30 → 1.36`: S1 digit morph 250ms + `--c-up`/`--c-down` edge tint +
▲/▼ glyph persisting ~9s muted (T42-08). Movement is a delta-fact — no pulse, no momentum
narration (U-50). If the slip has a pending stake, the tint stays but ambient motion elsewhere
dims (S8 calm-live).

---

# 2. LIVE (10 pts)

## LV-01 — 1440 all-in-play (default)

```
‹  Live now · 13 in play                    Scores may be delayed ~seconds (U-15 honesty)
Filters:  All 13 | Soccer 6 | Tennis 3 | Basketball 1 | Baseball 1 | Am. Football 1 | Esports 1
          [All competitions ▾]                                   Session 47 min · Net −24.00

● Premier League · 3 matches ★                                    View all ›
  ● LIVE 52'  Arsenal 1–0 Brighton          1.30 | 4.60 | 11.00  +115 ›
  ● LIVE HT   Aston Villa 0–0 Fulham        2.25 | 2.90 | 3.60    +7 ›
  ● LIVE 58'  Newcastle 2–1 Everton   🔒 Suspended — dangerous attack +6 ›
● LaLiga · 1 match ☆                                            View all ›
  ● LIVE 37'  Atlético 1–0 Sevilla    🔒 Suspended — re-pricing   +8 ›
● Serie A · 1 match ☆                                           View all ›
  ● LIVE 49'  Juventus 1–1 Roma             2.40 | 3.10 | 3.20    +6 ›
● Bundesliga · 1 match ☆ …
```

- Competition groups = live events grouped by tournament (R-YAB-05 chunking); followed comps
  sort first after PL (follows-first, T42-15).
- `HT`/`45+2'`/`Break`/`Second break` states verbatim (T42-17 honesty pack; betby phonetics).
- Suspension vocabulary: `Goal | VAR review | Penalty | Red card | Dangerous attack |
  Re-pricing | Feed issue` (T42-01, XV4-02) — always a reason, or `Suspended — betting paused`.
- Filter chips carry live counts (U-28); `All competitions ▾` narrows within the sport filter;
  counts update live as filters combine; zero-result combinator → empty module (LV-03 pattern).
- `Session` line rides the live sub-head — in-play is the highest-risk surface (P52-21, U-49).
- Attention: 1) first price column 2) suspended band (amber is meaningful, not decorative —
  C-09) 3) filter row.

## LV-02 — 390 folded

`‹` + `Live now` pill header (W2-01). Sport chips scroll; competition filter becomes a sheet
dropdown. Group cards keep the phone anatomy; suspended band identical (`🔒 Suspended —
dangerous attack`). Slip pill floats above bottom nav when legs exist. One-thumb audit: chips
and first odds row inside lower-2/3 reach band (P5, U-18).

## LV-03 — NOTHING LIVE → Starting soon (the brief's empty ask, X05, P52-23)

```
Live now · 0 in play
Filters: All 0 | Soccer 0 | …           (chips render but disabled, counts honest at 0)

  Nothing in play right now — starting soon below        (COPY.md verbatim)

STARTING SOON
  Kicks off in 04:12   Napoli v Milan        2.10 · 3.40 · 3.50   +12 ›   [Countdown pill]
  Kicks off in 18:47   Real Madrid v Bayern  2.20 · 3.70 · 2.90   +9 ›
  Tomorrow 14:00       Man City v Spurs      1.50 · 4.50 · 5.25   +8 ›
```

Next kickoff countdown pills are the art — real fixtures only, never fabricated filler
(P52-23). One primary action: `View all starting soon ›` → football page. Countdown→LIVE flip
at 0 fires without layout jump (T42-17, XV4-13). This frame is the scored "empty" exhibit.

## LV-04 — Goal/suspension cascade (S4 choreography, T42-21)

Deterministic sequence the judge can trigger twice: goal event → 1) score roll +1 (300ms,
NumberFlow) on the row → 2) row edge flash 400ms → 3) affected market cells lock same-frame
`🔒 Suspended — goal scored` (S3: 0ms, integrity) → 4) reopen with repriced ticks (S1).
Total arc ≤2.5s; a later event supersedes mid-cascade; RM = score+event line only, no motion.
Suspended rows remain navigable to the match (W2-26: `+N ›` live).

## LV-05 — Filter composed state

`Soccer 6` + `Premier League` → board shows only PL group; breadcrumb `Live › Soccer ›
Premier League · 3` with × clears; URL `/live?sport=soccer&comp=pl` share-safe (U-45).
Counts on remaining chips dim but stay (context), per progressive-disclosure rule.

---

# 3. FOOTBALL (10 pts)

## FB-01 — 1440 league page (default `Live & Upcoming`)

```
‹  Soccer ▾   5 competitions · 6 live              Market: [Match result ▾]
Tabs:  [ Live & Upcoming 6 | All Soccer ]                     [All competitions ▾]

England Premier League · 10 matches ★                    Match result · View all 10 ›
  ● LIVE 52'  Arsenal 1–0 Brighton          1.30 | 4.60 | 11.00  +115 ›
  ● LIVE HT   Aston Villa 0–0 Fulham        2.25 | 2.90 | 3.60    +7 ›
  ● LIVE 58'  Newcastle 2–1 Everton   🔒 Suspended — VAR review  +6 ›
Champions League · 4 matches ☆                           Match result · Show all 4 ›
  20:00 Tue, Oct 20   Arsenal v Inter        1.95 | 3.50 | 4.00   +8 ›
  20:00 Tue, Oct 20   Real Madrid v Bayern   2.20 | 3.70 | 2.90   +9 ›
  20:00 Wed, Oct 21   Barcelona v PSG        2.05 | 3.80 | 3.30   +8 ›
LaLiga · 4 matches ☆    Serie A · 3 matches ☆    Bundesliga · 4 matches ☆  (all five — brief)
```

- **Five leagues, always:** PL · Champions League · LaLiga · Serie A · Bundesliga (W3 brief).
- **Mixed live + scheduled** inside one group — live rows first, then kickoff order; scheduled
  rows show `HH:MM · Day, Mon DD`, live rows `● LIVE` + clock; suspended sits inline in live
  order (parity W2-22/23, beat with named reasons).
- **Market control** `Market: Match result ▾` rebinds all row cells to that market's outcomes
  (e.g., `Both teams to score` → Yes/No two-cell rows; W3-20). Rebind = 200ms content swap,
  no row-height jump (cell grid is market-agnostic — T7-16 alignment).
- **Competition control** `All competitions ▾` = checklist dropdown w/ counts; selection
  collapses board to chosen leagues, URL-serialised.
- **Tabs** `Live & Upcoming 6 | All Soccer` — `All Soccer` = all 25 fixtures across five
  leagues incl. finished-today? No: scheduled+live only; count honest.
- **Follow stars:** group header ★ follows competition; in-row team ★ follows the team (W1-26
  gold star in row). Both feed Favourites + `Your matches` + search ranking (T42-15).
- `+N ›` per row → match page at that market group (T42-16 deep-link semantics).
- Attention: 1) meta line `5 competitions · 6 live` confirms scope 2) first live price column
  3) `Market` dropdown (control, not content). One display step (`hb-display`) max — league
  headers stay hb-h1 (T7-14).

## FB-02 — 390 folded

`‹` + `Soccer ⌄` sport-switcher + `≡` market/filter button (W3-01). Segmented tabs
`Live & Upcoming 6 | All Soccer` full-width. Groups = phone card anatomy; mixed
live/upcoming identical order. `All N ›` per header. Market rebind lives under `≡` sheet
(`Market: Match result ✓ / Both teams to score / Total goals`) — 2 taps to rebind (U-16).

## FB-03 — Market rebound state

`Market: Both teams to score` → every row's 3-cell grid becomes `Yes | No` (+`—` n/a column
collapsed); cells keep geometry; prices re-tick; `+N ›` count unchanged. Change is instant
— controls that already exist get zero animation on repeat (U-43).

## FB-04 — Empty competition filter result

`All competitions ▾` → deselect all five → board module: `No competitions selected` +
`Select at least one ›` + `Reset filter` ghost — never a blank board (X05/X06).

## FB-05 — Cross-page consistency gate

Same match row component renders on Home strip, Live groups, Football groups — one anatomy,
one encoding (U-40, T42 rule: component = same spec everywhere). Parity map: W3-20 meta line,
W3-21 tabs+dropdown, W3-22/23/24 five groups all present at both widths.

---

## Board loading + offline variants (all three pages)

- **Skeleton:** per HM-04 — real markup + `is-loading`, exact geometry, opacity-only (X04).
- **Offline:** board keeps last data; clocks freeze; cells inert + `Frozen` captions; toast per
  SH-07. Reconnect revalidates and flashes only real deltas.
- **Route return:** scroll + active tab/filter restored (U-20); entrances never replay (U-37).
