# T7 — Typography + spacing system for a dense sportsbook (live-sourced)

Research agent T7, Housebets sportsbook contest entry. Research date: 2026-11-10 (real
`date`: Tue Nov 10 00:17 IST). Method: web_search + webfetch on primary docs (M3, Apple
HIG, Geist, MDN, W3C, Carbon, NN/g) plus **direct binary inspection of our self-hosted
font files** with fontTools 4.60.2 — the font facts below are measured, not assumed.
`qc/ASKS.md` and `src/` were **not** edited; proposals are at the end only.

**One-line thesis: a sportsbook is a numbers product wearing a text product's clothes.**
Every serious system we opened (TradingView, Smarkets, Sofascore, Coinbase, Robinhood,
Stripe, Linear, Geist, M3) treats digits as first-class typography: tabular by rule,
mono-flavored where it matters, and sized/leading'd from a small deliberate scale — never
ad-hoc px values. Our current build has 16 different arbitrary `text-[Npx]` sizes
including 8px and 9px text — that is the thing to fix.

---

## 0. Verified font facts — measured from `research/brand/*.woff2` (primary evidence)

Inspected with fontTools `TTFont` + `getBestCmap`/`hmtx`/`OS/2`/`glyf` (brotli-decoded):

| File | Default figures | `tnum` | `lnum`/`onum` | Other numeric feats | Metrics (upm=1000) |
|---|---|---|---|---|---|
| `figtree-variable.woff2` | **Proportional lining** (digit 1 = 410‰, 8 = 615‰ — a "1" is ~33% narrower than an "8") | **yes** | neither (lining is the only figure set) | `pnum frac ordn ss01 ss02` | xH 500, cap 700, typoAsc 950 / desc -250 (line box ≈1.20em at `normal`) |
| `oxanium-600/700.woff2` | **Tabular lining — all digits exactly 578‰** | no (unneeded) | neither | `pnum` (opt *out* of tabular), `zero` slashed zero | xH 515, cap 690, typoAsc 790 / desc -210 (line box ≈1.00em) |
| `redhat-display-700.woff2` | Proportional lining (1 = 330‰ vs 0 = 678‰) | **yes** | neither | `pnum zero frac ss01 ss02` | xH 515, cap 700, typoAsc 1018 / desc -305 (line box ≈1.32em!) |

Consequences for the build:

1. **Oxanium is already tabular** — odds/scores/clocks in `--font-odds` get jitter-free
   digits for free. Our `.tnum` class adds `"tnum" 1` which is a silent no-op on Oxanium
   (harmless) — keep it, it protects the Figtree fallback in the `--font-odds` stack.
2. **Figtree and Red Hat Display have real `tnum`** — `font-variant-numeric: tabular-nums`
   works on both. The `"lnum" 1` in `.tnum` is also a no-op (no `lnum`/`onum` features;
   lining is the only digit set in all three fonts — measured `0` glyph tops ≈ capHeight).
3. **Never use `line-height: normal`.** At the same px size the three families produce
   line boxes of ~1.00em (Oxanium), ~1.20em (Figtree), ~1.32em (RHD). Every step in the
   scale needs an explicit lh value or rows will size unpredictably by font.
4. The embedded book today is Figtree-only (research/03) — so its odds render
   proportional. Switching odds to Oxanium/`.tnum` is a *measurable upgrade* over the
   incumbent widget, not just taste.

When a font lacks `tnum` (recipe, cited): (a) swap to a tabular font for numeric contexts
(what we do with Oxanium); (b) `@font-face` with `unicode-range: U+0030-0039` maps digits
only to a tabular face inside one family name — MDN documents the descriptor for exactly
this character-subset use [S-MDN-UR]; (c) last resort, fixed `ch` width per digit —
fragile, not recommended (UNKNOWN: untested in our stack).

---

## 1. Evidence — type scales in serious systems

### Material 3 (opened: m3.material.io applying-type; tokencatalog mirror of token values)
- 15 baseline styles: 5 roles (Display/Headline/Title/Body/Label) × 3 sizes.
  Sizes/lh/weight/tracking: Display 57·45·36 (lh 64·52·44 ≈ 1.12–1.22×, w400, −0.25/0/0);
  Headline 32·28·24 (lh 40·36·32 ≈1.25–1.33×); Title 22·16·14 (lh 28·24·20, w500 on the
  small two); Body 16·14·12 (lh 24·20·16 ≈1.4–1.5×, w400, +0.25–0.5 tracking);
  Label 14·12·11 (lh 20·16·16, **w500**, +0.1–0.5 tracking). [S-M3-1][S-M3-2]
- Guidance verbatim-ish: lh ratio ~**1.2× for display/headline/title**, ~**1.5× for
  body/label**; "Use tabular figures … in tables or places where values may change often,
  such as clocks"; "no single product will use all the styles — select styles most
  appropriate". [S-M3-1]
- M3 spacing tokens: base unit `space100` = **8dp**, main units multiples of 8; nested
  2/4/6/10dp allowed only where components need them. [S-M3-3] Android layout guide:
  8dp grid for layout, 4dp for "smaller elements such as icons, type". [S-AND-GRID]

### Apple HIG (opened typography.md — full markdown)
- iOS text: **default 17pt, absolute minimum 11pt** (macOS 13/10). "Follow the
  recommended default and minimum text sizes … for both custom and system fonts." [S-HIG]
- "In general, avoid light font weights … prefer Regular, Medium, Semibold, or Bold …
  especially when text is small."
- Hierarchy = adjust **weight, size, and color**; "minimize the number of typefaces".
- Leading: tighter leading acceptable "in a list row … area where height is constrained",
  but "if you need to display three or more lines of text, avoid tight leading".

### Linear — measured live CSS (font-inspector.com, designlang, design.brooksnewmedia)
- Inter **Variable**, weights **400/510/590** (variable granularity — no 600/700);
  Berkeley Mono for IDs. Sizes in use: 64·48·24·20·15·14·13·12·**10**.
  Body 15px/1.6/−0.011em; small 12px/1.17; display lh 1.0 with −0.022em tracking. [S-LIN]
- Design breakdown: "tight tracking … reads as precise"; **tabular numerics for issue
  numbers** so they don't "bounce around" when scanning. [S-LIN-2]
- Spacing scale observed: xs 6 · sm 16 · md 24 · lg 32 · xl 64. [S-LIN-3]

### Vercel Geist design system (opened vercel.com/geist/typography — full)
- Semantic scale, not a ratio scale: `heading` 72→14 (7 steps used in-product),
  `button` 16/14/12, `label` 20→12 "designed for single-lines, and given ample
  line-height for highlighting & marrying up with icons", `copy` 24→13 "higher line
  height than Label". `label-13` note verbatim: "**Tabular is used when conveying
  numbers for consistent spacing.**" Distinct `*-mono` steps pair mono with text sizes.
- Takeaway: lh is role-based (single-line labels ≠ multi-line copy), and the floor for
  product UI text is 12 (13 for copy). [S-GEIST]

### Refactoring UI (opened refactoringui.com TOC + free Medium excerpt)
- "Use color and weight to create hierarchy **instead of size**" — 2–3 text colors
  (primary/grey/lighter grey), "two font weights is usually enough (400/500 + 600/700)".
- "**Stay away from font weights under 400 for UI work** … too hard to read at smaller
  sizes." [S-RUI]
- Chapter titles (book, paywalled — cite as TOC only): "Establish a type scale",
  "Line-height is proportional", "Establish a spacing and sizing system",
  "Avoid ambiguous spacing", "Baseline, not center", "Size isn't everything". [S-RUI-TOC]

### Pattern across all five
Dense product UI lives in an **11–16px band** with 4–6 usable steps; display roles exist
but are rationed; small text compensates with **weight 500 + positive tracking** (M3
labels, Geist labels, Linear 510); lh compresses toward ~1.0–1.2 as size grows
(Butterick: optimal 120–145% for running text [S-PT]); ratios (√2, golden) are absent —
everyone ships *named roles*, not math.

---

## 2. Evidence — numerals for odds (tabular lining figures)

- **M3**: tabular for "tables or places where values may change often, such as clocks";
  prevents layout shift. [S-M3-1]
- **Maersk Design System** (opened): monospaced/tabular numbers for tables and
  financials; dynamic values otherwise show "horizontal wiggling"; implemented as
  `font-feature-settings: 'tnum'`. [S-MAERSK]
- **TradingView** (Pentagram case study, opened): "For clarity, **monospaced numbers
  were used throughout**." [S-TV]
- **Smarkets betting exchange** (designer's case study, opened): design-system rule
  baked in — "**odds values always use tabular numerals** … a system-level requirement
  rather than a per-screen decision." [S-SMK]
- **Coinbase DS** (cds.coinbase.com): label/caption styles "have **tabular numbers by
  default**" and "in extraordinarily dense interfaces they can replace Headline & Body";
  CoinbaseMono exists for tabular data. [S-CB]
- **Robinhood** (design-system analysis): "Numbers are typography … tabular/mono figures
  … digits never jitter as values update"; Capsule Sans Mono for tickers/amounts. [S-RH]
- **Stripe** (design analysis): `tnum` applied **per-element on money/numeric cells, not
  globally** — `body-tabular` token is "the canonical money body type". [S-STRIPE]
- **Smashing Magazine fintech typeface guide**: tabular digits "keep the layout while
  values change in real time"; align numbers **right side or by decimal separator**;
  plan corner cases (long decimals). [S-SM]
- **MDN**: `font-variant-numeric: tabular-nums` ↔ OpenType `tnum`. [S-MDN]

Consensus rule for us: **every digit that compares, ticks, or totals is tabular** —
odds, scores, clocks, stakes, returns, "+N" counts, dates ("Nov 21"). Text-embedded
digits (team names with numbers) stay proportional.

---

## 3. Evidence — spacing, density, row heights, line-height

- **8pt grid** (spec.fm, canonical article): multiples of 8 for dimensions/padding/
  margin; pair with a **4pt baseline grid** for text; hard vs soft grids; 8 divides most
  screen widths and survives @2x/@3x. [S-8PT]
- **M3 spacing**: 8dp base, nested 2/4/6/10 allowed; Android: 4dp for icons/type. [S-M3-3]
- **Touch targets**: WCAG 2.2 SC 2.5.8 → **24×24 CSS px minimum** (AA) with a spacing
  exception for undersized targets; Apple HIG 44×44pt; Material/Android 48×48dp with
  ≥8dp separation (~9mm physical). [S-WCAG][S-A11Y]
- **Carbon data table** (opened guidelines): row heights xs **24** (highly dense),
  sm **32** (compact), md **40** (default), lg 48, xl 64; header row must match row size;
  column padding 16. Proof that "dense" is a *named mode*, not a vibe. [S-CARBON]
- **Line-height**: M3 ~1.2 large / ~1.5 small [S-M3-1]; Butterick 120–145% [S-PT];
  Linear lh 1.0 display → 1.6 body [S-LIN]; Geist splits single-line `label` (ample) vs
  multi-line `copy` (higher) [S-GEIST]; Apple: tight leading ok ≤2 lines in constrained
  rows, never ≥3 lines [S-HIG].
- **Touch vs density reconciliation**: odds cells are *targets* → 44px floor on phone
  (Apple) vs Carbon "sm/md" 32–40 for pointer tables. Answer: **cell ≥44px at 390,
  ≥36–40px at 1440** — pointer precision on desktop permits the tighter end; both stay
  far above the 24px WCAG floor.

---

## 4. Evidence — how top sports/fintech products set numbers

- **Sofascore** (itsnicethat, opened): commissioned a bespoke variable family "inspired
  by raw data and a numbers-heavy approach"; designers "focused on the appearance of
  numbers and how the type may translate on different screen sizes"; **condensed styles
  exist specifically so long team/player names fit limited containers**; matched Roboto
  vertical metrics to "avoid baseline shifts when replacing"; small-size legibility
  engineered via open "flat bridges in diagonal joints". Specimen shows Sans + Condensed
  + **Monospace** variants. [S-SOFA]
- **Flashscore**: custom "Livesport Finder" family; measured scale runs 12→60px, labels
  12–14px w500–600 with +0.01–0.02em tracking. [S-FLS]
- **FotMob**: GT Walsheim throughout (designmd snapshot — thin source, noted only).
- **bet365** (repo teardown + eng blog): app built around "a database of fixtures … the
  customer navigates up and down" — density is the product. Exact sizes: UNKNOWN.
- TradingView / Smarkets / Coinbase / Robinhood / Stripe as §2 — the number-typography
  pattern is *mono-flavored digits + restrained display + right/decimal alignment*.

Read across: live-score incumbents differentiate **with number craft** (bespoke figure
design, condensed names, mono variants) — exactly the channel where Housebets' Oxanium
(a techno/esports cut with native tabular figures) is brand-right *and* functional.

---

## 5. Evidence — minimum readable sizes & mobile vs desktop in dense tables

- Floors: **Apple iOS 11pt minimum** [S-HIG]; **Android a11y: body ≥ 12sp** [S-AND-A11Y];
  Digital.gov: "<12pt … often forces the reader to zoom", base body 16px [S-DGOV];
  WCAG 1.4.4: survive 200% resize. → Our floor: **11px for ancillary labels only,
  12px+ for anything that carries information**; **the build currently has 8px, 9px and
  10px text — non-compliant, must go.**
- **NN/g mobile tables** (opened): sticky column headers for anything >1 viewport;
  "number-heavy" tables can use narrower columns (more fit legibly) while wordy tables
  fit ~2 columns; horizontal scroll is "somewhat acceptable" for large tables on mobile
  (but our row design should avoid needing it); legible without zoom is the bar. [S-NNG]
- **Filament Group** responsive tables: declare columns *essential vs optional* — show
  the subset that fits, progressive-enhance the rest. [S-FG]
- **LogRocket density** (opened): no universal density; desktop-dense can overwhelm
  mobile — keep density *consistent* by prioritizing content, not by shrinking type.
- What actually differs at 390 vs 1440 (synthesis): **column count** (markets visible
  per row: 1x2 only at 390 → 1x2 + totals/spreads at 1440), **target height** (44 vs
  36–40), **gutter width** (12–16 vs 20–24), **slip** (bottom bar vs side panel). What
  does **not** change: the 11–15px data band itself — desktop buys *more columns*, not
  bigger body text (Linear/Geist/Carbon all keep 12–14px data type on wide screens).

---

## 6. Proposed type scale — `hb` roles (maps to existing `--font-*` tokens)

Sizes target the 11–16px data band + 3 display steps. lh is explicit everywhere (font
metric variance §0.3). Tracking in em. "F"=Figtree, "O"=Oxanium, "R"=Red Hat Display.

| Step | Size / lh | Family / weight | Tracking | Usage |
|---|---|---|---|---|
| `hb-score` | 22/26 | O 700 | 0 | Live scoreline, slip payout totals |
| `hb-odds` | 15/20 | O 700 | 0 | Primary price in odds cell (1X2) |
| `hb-odds-sm` | 13/16 | O 600 | 0 | Secondary market prices, "+N", slip odds |
| `hb-clock` | 12/14 | O 600 | +0.02 | Match clock 43′, period labels — tabular anti-jitter |
| `hb-display` | 28/32 | R 700 | −0.02 | Match-page hero / page-level moments ONLY |
| `hb-title` | 20/24 | R 700 | −0.01 | League/group section headers, desktop page titles |
| `hb-h1` | 16/20 | F 600 | −0.005 | Market group names, slip sections, card headers |
| `hb-body` | 14/20 | F 400 (500 on inverse fills) | 0 | Team names, market selections, button text |
| `hb-body-sec` | 13/18 | F 400 | +0.005 | Secondary lines in rows (kickoff time, competition) |
| `hb-label` | 12/16 | F 500 | +0.02 | Column headers (1 X 2), league meta, badges, chips |
| `hb-micro` | 11/14 | F 500 | +0.04 | Ancillary only: "+12" markets, RG microcopy — **floor** |

Rules baked into the scale:
- Nothing below 11px, ever (Apple floor + Android 12sp body guidance).
- Weight ladder only 400/500/600 (Figtree var) + 600/700 (Oxanium) + 700 (RHD) —
  Refactoring UI "two weights is usually enough"; Apple "avoid light weights small".
- Hierarchy by **color+weight first, size second** (RUI): primary `#f9f9fb`, secondary
  `#8f96a8`, tertiary `#7f99a4` — don't reach for a smaller size to de-emphasize.
- Display lh ≈1.15–1.2×; single-line data lh ~1.25–1.35×; multi-line copy ≥1.4×;
  2-line match cells use 13/16 pairs — tight but >1.2 (Apple: ≤2 lines may run tight).
- Every numeric step is tabular by family (O) or `.tnum` (F/R). `hb-odds` digits 578‰
  uniform → price flashes (`flash-up/down`) animate color, never width.

## 7. Proposed spacing tokens — 4px base, named (spec.fm + M3 + current Tailwind habit)

Current code already leans on Tailwind's 4px scale (px-3/gap-2 dominate) — formalize:

| Token | px | Use |
|---|---|---|
| `s1` | 4 | icon↔text gap, cell inner gap, hairline offsets |
| `s2` | 8 | chip gaps, inline element gaps, min target separation |
| `s3` | 12 | row horizontal padding @390, league header inset |
| `s4` | 16 | card padding, page gutter @390, column padding (Carbon parity) |
| `s5` | 20 | page gutter @1440, panel padding |
| `s6` | 24 | section/league-group separation |
| `s8` | 32 | major section breaks, desktop grid gaps |
| `s12` | 48 | page-section separation |
| `s16` | 64 | desktop hero/section rhythm (Linear's xl step) |

Line-height outputs land on the 4pt baseline grid (lh 14·16·18·20·24·26·32) so stacked
rows stay rhythm-locked. 2/6/10 allowed only inside components (M3 nested-unit rule).

## 8. Density rules — odds grids & league rows

1. **Touch row @390**: odds cell `min-height 44px` (Apple); match row with 2 text lines
   ≈ 52–56px total; league header 32–36px **sticky** (NN/g). Budget check: 844px
   viewport − 60 header − 67 tab bar ≈ 715px → **12–13 match rows or ~9 rows + 2 league
   headers per fold** — density comes from row geometry, not smaller type.
2. **Pointer row @1440**: cells 36–40px, rows 44–48px (Carbon md-lg); header matches
   row height (Carbon rule).
3. WCAG floor: never ship a target <24px; spacing-exception only for icon-level actions
   with ≥8px separation (2.5.8). [S-WCAG]
4. Columns per width: @390 show 1X2 only + "+N" deep-link (Filament essential-column
   rule); @1440 add O/U + handicap columns before widening gutters.
5. Truncate team names with ellipsis at a fixed column budget rather than shrinking
   type (Sofascore solved this with condensed cuts — we solve with truncation + title).
6. Numbers right-aligned in columns / decimal-aligned where decimals mix (Smashing).
7. League-group spacing `s6` (24px) — separation by space, not borders (RUI "use fewer
   borders / add extra spacing").

## 9. DERIVED ASK PROPOSALS (do not edit qc/ASKS.md)

| # | Proposed check |
|---|---|
| T7-01 | Define `hb-*` type scale tokens (11 steps, §6) in index.css; no component uses raw `text-[Npx]` outside the scale. |
| T7-02 | Delete/upgrade all `text-[8px]`, `text-[9px]`, `text-[10px]` usage — floor is 11px ancillary, 12px informational (Apple 11pt / Android 12sp). |
| T7-03 | Every numeric surface that ticks or compares renders tabular: Oxanium family or `.tnum` — odds, scores, clocks, stakes, returns, dates, "+N". |
| T7-04 | Verify at runtime that `font-variant-numeric: tabular-nums` actually changes Figtree advance widths (DevTools audit — features verified present in file, render test pending). |
| T7-05 | No `line-height: normal` anywhere — every step carries explicit lh (3 fonts have 1.0/1.2/1.32em boxes). |
| T7-06 | Adopt spacing tokens `s1…s16` (§7); component code uses tokens, not bare px. |
| T7-07 | Odds cells ≥44px tall @390, ≥36px @1440; document touch-vs-pointer split in the component comment. |
| T7-08 | Match rows land at 52–56px @390 / 44–48px @1440; league headers sticky at 32–36px. |
| T7-09 | @390: league-grouped list shows 1X2 + "+N" only; extra markets behind the match page (essential-columns pattern). |
| T7-10 | Team-name cells truncate with ellipsis at a fixed budget — never shrink below `hb-body` to fit. |
| T7-11 | Price-change flashes animate color/background only — digit width must not move (tnum property + Oxanium verify). |
| T7-12 | De-emphasis uses color/weight (text-secondary/tertiary + 400→600), never a smaller-than-scale size. |
| T7-13 | Weight vocabulary limited to Figtree 400/500/600, Oxanium 600/700, RHD 700; no <400 weights anywhere (Apple + RUI). |
| T7-14 | Display steps (`hb-display`/`hb-title`) rationed to one per view; data pages may use zero. |
| T7-15 | All line-heights land on 4px multiples so stacked rows hold the baseline grid. |
| T7-16 | Numbers right-aligned (or decimal-aligned) inside market columns; headers align to their data. |
| T7-17 | Clock/score glyphs (′, :, +, −) live inside the same tabular run — no proportional punctuation splitting a timer. |
| T7-18 | Add a `.tnum` coverage audit to QC: grep tsx for digits rendered without tnum/Oxanium in odds contexts. |
| T7-19 | Squint-test: at 390 blurred, price column must remain the second thing the eye lands on after team names (attention budget). |
| T7-20 | Desktop adds market columns before adding whitespace — density stays consistent across breakpoints (LogRocket rule). |
| T7-21 | Keep `.tnum` applied inside `--font-odds` stacks even though Oxanium is natively tabular — protects the Figtree fallback path. |
| T7-22 | unicode-range digit-swap recipe documented in the code comment for `.tnum` as the fallback plan for any future font without `tnum`. |

## 10. UNKNOWN / not verifiable this session

- Exact px sizes/row heights used by the live Housebets embedded book — shadow-DOM
  stylesheet text wasn't captured in shadow-dom-info.json (only `fonts: ['figtree']`).
- bet365/FanDuel/DraftKings precise type specs — teardowns are screenshot-level.
- Whether Oxanium's `pnum`/`zero` alternates are worth enabling — judgment call, not a
  fact gap (recommend leaving `zero` off; O/0 collisions are rare in odds contexts).
- Coinbase/Robinhood/Stripe type internals are from design-system mirrors/analyses
  (cds.coinbase.com is first-party for Coinbase; Robinhood/Stripe entries are
  third-party DESIGN.md analyses — treat as strong but secondary).

## Sources actually opened (webfetch) or extracted via search

- [S-HIG] developer.apple.com/design/human-interface-guidelines/typography.md — fetched full
- [S-M3-1] m3.material.io/styles/typography/applying-type — via search extract (JS-only); values cross-checked vs tokencatalog.dev/md3 mirror — fetched
- [S-M3-3] m3.material.io/styles/spacing/tokens — via search extract
- [S-AND-GRID] developer.android.com/design/ui/mobile/guides/layout-and-content/grids-and-units — via search extract
- [S-AND-A11Y] developer.android.com/design/ui/mobile/guides/foundations/accessibility — via search extract
- [S-GEIST] vercel.com/geist/typography — fetched full
- [S-LIN] font-inspector.com/fonts-used-by/linear — via search extract; designlang.app/gallery/linear-app — via search extract
- [S-LIN-2] designmd.co/blog/linear-design-system-breakdown — via search extract
- [S-LIN-3] designmunk.com/linear — via search extract
- [S-RUI] medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886 — fetched
- [S-RUI-TOC] refactoringui.com — fetched (TOC)
- [S-MAERSK] designsystem.maersk.com/content/numbers/monospaced-numbers — via search extract
- [S-TV] pentagram.com/work/tradingview/story — via search extract
- [S-SMK] matthewallen.design/smarkets-betting-exchange — fetched
- [S-SOFA] itsnicethat.com/articles/hot-type-sofascore-graphic-design-sponsored-content-200923 — fetched
- [S-CB] cds.coinbase.com/components/typography/Text — via search extract
- [S-RH] oh-my-design.kr/design-systems/robinhood — via search extract
- [S-STRIPE] shadcn.io/design/stripe — via search extract
- [S-SM] smashingmagazine.com/2023/10/choose-typefaces-fintech-products-best-practices-guide-part2 — via search extract
- [S-MDN] developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric — via search extract
- [S-MDN-UR] developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range — fetched
- [S-8PT] spec.fm/specifics/8-pt-grid — via search extract (+ gradual.design summary)
- [S-WCAG] w3.org/WAI/WCAG22/Understanding/target-size-minimum — via search extract
- [S-A11Y] support.google.com/accessibility/android/answer/7101858; govt.nz web-a11y guidance; shopify.dev tap-target doc — via search extracts
- [S-CARBON] carbondesignsystem.com/.../data-table/guidelines + /specifications — via search extract
- [S-PT] practicaltypography.com/line-spacing.html — fetched
- [S-NNG] nngroup.com/articles/mobile-tables — via search extract
- [S-FG] filamentgroup.com/lab/responsive-design-approach-for-complex-multicolumn-data-tables — via search extract
- [S-DGOV] digital.gov/guides/mobile-principles/tap-targets — via search extract
- [S-FLS] sokosumi.com/tools/design-md/analysis/flashscore — via search extract
- Font metrics/digit tables: measured locally with fontTools on research/brand/*.woff2
