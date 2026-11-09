# T6 — Colour psychology + per-token rationale (wave 5x)

Research agent T6, Housebets sportsbook contest entry. Session of 2026-11-09.
The verified Housebets palette in `research/03-brand-system.md` is **law** — this
file supplies the *why* and the *rules of engagement* for each token, plus the
honest state of the science. `qc/ASKS.md` was **not** edited; proposals live at
the end only (§6).

Method: live web sources opened via web_search/webfetch (log below) + computed
measurements on the actual token values in `src/index.css` (WCAG 2.x relative
luminance; Machado et al. 2009 CVD simulation matrices, severity 1.0).

**Honesty note:** colour psychology is one of the weakest-evidence branches of
applied psychology. Strong findings (universal colour-emotion associations,
cultural red/green market conventions, ageing-lens physics, WCAG math) are cited
as such. Industry colour claims ("gold = jackpot", "neon = Gen Z") come from
trade press and are tagged WEAK. Where no source exists, it says UNKNOWN — no
pop-psych invention.

---

## Source-access log

**READ IN FULL / SUBSTANTIAL (webfetch or search returned real text):**

- [S1] Labrecque & Milne, "Exciting red and competent blue", *J Academy of
  Marketing Science* 40(5), 2011/2012 — https://doi.org/10.1007/s11747-010-0245-y
  (abstract + summaries). Blue → competence; red → excitement; saturation/value
  amplify brand-personality traits. ~740 citations.
- [S2] Elliot, Maier, Moller, Friedman & Meinhardt 2007, *J Exp Psychol: General*
  136(1):154–168 — https://pubmed.ncbi.nlm.nih.gov/17324089/ — red primes
  avoidance motivation, impairs achievement performance, below awareness.
  (Replication record is mixed — see §1 "Red" caveat; treat as a weak
  contextual nudge, not a law.)
- [S3] Jiang, Lu, Yao, Yue & Au 2014, *J Behavioral Decision Making* 27 — 
  https://onlinelibrary.wiley.com/doi/10.1002/bdm.1800 — Mainland China shows a
  red-up/green-down implicit association; Hong Kong shows the opposite
  (green-up/red-down). Culturally learned, measurable with IAT-style tasks.
- [S4] Zhang & Han 2014, *PLOS ONE* — https://pmc.ncbi.nlm.nih.gov/articles/PMC3933460/
  — direct evidence that *experience* reverses the red effect: Chinese
  stockbrokers (trained on red-up markets) showed approach responses to red that
  college students did not.
- [S5] Jonauskaite et al. 2020, *Psychological Science* 31(10) —
  https://pubmed.ncbi.nlm.nih.gov/32900287/ — n=4,598, 30 nations, 22 languages:
  colour-emotion associations are largely universal (r=.88), modulated by
  linguistic/geographic proximity. Red is the only hue globally tied to BOTH a
  positive (love) and a negative (anger) emotion.
- [S6] "Adaptive fusion of multi-cultural visual elements" 2025, *Scientific
  Reports* — https://www.nature.com/articles/s41598-025-13386-5/tables/1 —
  comparative colour-semantics table across East Asia / West / Middle East /
  Latin America / Africa (used in §2).
- [S7] Charness & Holley review, "Design Principles to Accommodate Older
  Adults" — https://pmc.ncbi.nlm.nih.gov/articles/PMC4777049/ — ageing reduces
  violet-blue-green discrimination; warm colours discriminated more easily
  (cites Wijk et al. 1999; Werner et al. 1990). Also Ishihara et al. 2001
  (https://www.sciencedirect.com/science/article/abs/pii/S0169814101000282):
  the crystalline lens thickens and yellows with age, cutting blue-light
  transmission.
- [S8] British & Irish Orthoptic Journal, chromostereopsis study —
  https://bioj-online.com/articles/10.22599/bioj.515 — on black backgrounds,
  blue text produces the greatest accommodative lag (perceived most distant,
  hardest to read); red perceived closest; yellow easiest to read.
- [S9] Hallock 2003, "Colour Assignment" (UW undergrad thesis, n=232, ~79% US —
  WEAK but the standard industry dataset) —
  https://www.joehallock.com/edu/COM498/preferences.html — blue most-favoured
  across all age groups; purple preference rises in older groups; green
  favoured by younger groups (consistent with Birren: maturity → shorter-
  wavelength preference).
- [S10] Machado, Oliveira & Fernandes 2009, "A Physiologically-based Model for
  Simulation of Color Vision Deficiency", *IEEE TVCG* 15(6) — the matrices used
  for the §3 simulations (severity 1.0, sRGB).
- [S11] W3C WCAG 2.2 Recommendation — https://www.w3.org/TR/WCAG22/ — SC 1.4.1
  (Use of Color, A), 1.4.3 (4.5:1 AA / 3:1 large), 1.4.6 (7:1 AAA / 4.5:1
  large), 1.4.11 (3:1 non-text, AA), 2.3.1 (≤3 flashes/s, A). Verbatim text
  captured from the spec page.
- [S12] APCA / Bridge-PCA docs — https://apcacontrast.com/ and
  https://www.myndex.com/BPCA/ — Lc↔ratio alignment (Lc60≈3:1, Lc75≈4.5:1,
  Lc90>7:1); WCAG 2.x math overstates contrast near black; APCA is the WCAG 3
  candidate method, not yet normative.
- [S13] YouGov US crypto-gambling survey —
  https://yougov.com/en-us/articles/47391 — 62% of potential crypto gamblers
  are 18–34; 62% male. Statista 2024 cross-country wallet survey:
  https://www.statista.com/statistics/1537664/ (paywalled chart; abstract read).
- [S14] Trading/fintech a11y practitioner sources: HedgeUI
  https://www.hedgeui.com/blog/accessibility-trading-uis (second-channel rules);
  Colorblind Collective https://colorblind.org/guides/designing-for-color-blindness/
  (red/green classic problem pair; blue/orange safe; lightness survives CVD);
  ColorArchive https://colorarchive.org/guides/financial-ui-color-guide/;
  Accessible Data Interfaces candlestick patterns
  https://www.accessible-data-interfaces.com/virtualization-charts-dynamic-data-displays/chart-type-specific-patterns/accessible-candlestick-and-financial-charts/
  (hollow=up / filled=down convention; SC mapping).
- [S15] Google Android developer story — Futubull shipped a user-toggleable
  CVD-optimised colour scheme for a trading app:
  https://developer.android.com/stories/apps/futu
- [S16] Betfair exchange help + betting.co.uk — blue=back / pink=lay on Betfair;
  Smarkets green/blue; Betdaq orange/green; **position (back left / lay right in
  LTR) is the invariant** across exchanges:
  https://content.betfair.com/xgHelp/?product=games&sWhichKey=cdr.general ,
  https://www.betting.co.uk/news/betting-co-uk-basics-back-and-lay-betting/
- [S17] iGaming trade press (WEAK — vendor/agency blogs, no data): IBTimes
  https://www.ibtimes.co.uk/ux-high-stakes-how-interface-design-impacts-risk-perception-online-gambling-1737380;
  Milo https://milomagazine.co.uk/neon-gold-and-dark-backgrounds-how-the-visual-style-of-online-casinos-influences-perception/;
  CasinoWow https://www.casinowow.com/news/11/9/2024/decoding-popular-colour-schemes-in-online-casinos-and-their-purpose;
  Marc Wallace https://marcwallace.com/online-casinos-love-red-and-gold/;
  Chromeye https://www.chromeye.com/blog/designing-for-engagement-the-psychology-behind-igaming-ux;
  PumpSite crypto-branding https://pumpsite.gg/blog/color-psychology-crypto-branding-token-design-guide;
  Uberman esports branding https://uberman.agency/blog/esports-betting-brand-strategy-gaming-culture/
- [S18] Cultural/localization practitioner sources (WEAK-MED): Translating
  Colours PDF https://www.globalpropaganda.fresa.net/articles/TranslatingColours.pdf
  (Shiite green sacred → use cautiously; East Asian groups make the most
  affective colour distinctions; many liking associations pancultural);
  Pangea https://www.pangea.global/blog/localizing-colours-for-different-cultures/
  (green = Islam/fertility/luck/wealth in Middle East; Indonesia: forbidden;
  red = luck/prosperity in Asia, mourning in parts of Africa);
  Translated https://translated.com/resources/color-design-adaptation-visual-localization
  (RTL mirroring; Iran blue ≈ mourning; Malaysia green ≈ danger).
- [S19] Penn State Accessibility — vibrating colour combinations
  https://accessibility.psu.edu/color/brightcolors/ (red/green, blue/green,
  yellow/cyan etc. can pass AA yet produce afterimage "vibration"; separate
  with neutrals); Luminanze chromostereopsis 3S method
  http://www.luminanze.com/writings/chromostereopsis_in_ux_design.html;
  ETH newmedia ISO 9241-12 notes https://www.newmedia.ethz.ch/SaturatedColours.htm
  (avoid red+blue on dark; avoid blue for fine detail/motion — S-cones are
  sparse and slow).
- [S20] Repo sources: `research/03-brand-system.md` (verified palette = law),
  `research/21-attention-a11y.md` (B11 prior findings), `research/06-competitor-benchmark.md`,
  `research/teardown/bet365.md` (flash green=shorten/red=drift on real deltas),
  `research/teardown/shuffle.md` (persistent green ▲ / red ▼ per odds cell),
  `research/13-gambling-psych.md`, `src/index.css` (token values audited),
  `src/components/primitives.tsx` (LiveBadge/FollowStar/OddsCell implementation).

**BLOCKED / UNKNOWN:** colorassignment.com fetch failed (data obtained via
joehallock.com mirror instead); Statista chart paywalled (abstract only);
several casino-psychology claims exist only in affiliate/marketing content —
all tagged WEAK.

---

## §1 Evidence summary per colour

### Blue / cyan family — `#02f8f8`, `#c4f4f1`, teal surfaces

- **Trust axis (strong-ish).** Blue → competence/trust is the most-replicated
  brand-personality mapping we have [S1]; Jonauskaite's 30-nation data show
  blue emotions cluster on calm/contentment universally [S5]. Fintech adopts
  blue almost by default (Coinbase, PayPal) [S17-PumpSite, WEAK].
- **Cyan specifically** sits on the blue trust axis but reads *technical /
  digital / novel* — the "trading terminal, not bank" register (B11; consistent
  with [S17-Uberman]: cyan/electric = cyberpunk, tech-forward accent, WEAK).
  For a crypto book this is the right register: native to the audience, and
  — unlike Stake purple or bet365 yellow — essentially unclaimed in the
  sportsbook field (B11 + 06-benchmark note "no crypto book owns a look").
- **Physiology cautions:** short wavelengths on black produce the largest
  accommodative lag and read as "distant" [S8]; S-cones are sparse and slow →
  saturated blue is bad for fine detail and moving targets [S19]. Our cyan is
  greener than pure blue (hue ~180°, not 240°) which mitigates this — but it is
  still a neon: use for accents, hairlines, resting prices; never body text or
  large fills behind white text (white on #02f8f8 ≈ 1.4:1).
- **Dark + neon = category vernacular (WEAK-MED).** iGaming trade sources agree
  dark UI reduces session eye-strain, mimics casino floors, and funnels
  attention to value actions [S17-Chromeye]; crypto/gaming audiences treat
  dark+neon as the native dialect [S17-Uberman]. Judges ≠ users though — neon
  budget must stay low enough that the design reads "system", not "arcade".

### Green — `#47d496` (success), `#26ba50` (positive), `#26a17b` (USDT)

- **Win/up semantics:** green-up/red-down is the Western and crypto/trading
  convention [S3, S14]; bet365 flashes green=shorten, Shuffle ships persistent
  green ▲ [S20]. Smarkets even uses green for *back* [S16]. Convention strength
  for our audience: HIGH (crypto natives).
- **Money association:** green = growth/prosperity/DeFi [S17-PumpSite WEAK];
  Middle East: green = fertility, paradise, Islam → strongly positive [S6, S18].
- **Caveat 1 — learned not innate:** Mainland-China convention is inverted
  (red-up/green-down) [S3]; the association is learned and experience can even
  reverse red's psychological effect [S4]. Glyphs + labels must carry meaning
  so the colour is a redundant accelerator, not the message.
- **Caveat 2 — CVD:** our mint #47d496 simulates to a desaturated lavender-grey
  under deuteranopia (#7c71a9) — the hue code itself is invisible to ~8% of
  males; only the lightness/direction cues survive (§3).
- **Caveat 3 — two greens + a teal:** success #47d496, positive #26ba50
  (currently UNUSED in src — dead token risk), USDT #26a17b all collapse into
  the same grey-violet family for deutans; roles must be disjoint by *channel*,
  not just hue (§5).

### Red — `#f41f50` / `#fa2e5d` / `#ff4d75`

- **Loss/danger/error:** near-universal negative register — West: danger, stop,
  loss [S6]; globally tied to anger (and love) [S5]; achievement contexts:
  primes avoidance [S2 — contested replications, treat as weak nudge].
- **Betting-specific:** red = drift/down in prices (bet365, Shuffle) [S20];
  red = *lay* on Betfair [S16]; live badges and "hot" markers industry-wide are
  red-pink — Housebets itself ships a red-pink LIVE pill [S20/03].
- **China inversion (resolved for us):** red-up in Mainland markets [S3] means
  a CN-localised product *could* invert — but (a) crypto books' audience skews
  global/crypto-native where green-up dominates, (b) HK uses green-up too, and
  (c) Housebets ships no CN locale in scope. Keep green-up/red-down; let ▲▼ +
  signed deltas carry meaning so no user depends on the hue convention (§3).
- **Physiology:** red on dark is the *least* accommodative-lag colour and pops
  forward [S8] — which is why a red badge feels alarmed even at small sizes.
  Pair-wise adjacency with saturated cyan/blue triggers chromostereopsis
  "vibration" [S19] → red sits on neutral surfaces with ≥1px hairline
  separation, never flush against cyan accents.

### Amber / yellow-orange — `#e17823` / `#e68a42` (warning)

- **Caution/suspension:** yellow-orange = caution in West, happiness/prosperity
  in Middle East, royalty/honour in East Asia [S6]; safety-signage convention
  (amber = attend-but-not-stop) is near-universal — the right register for
  *market suspended / cash-out locked / confirm this*: salient, not alarming.
- **Housebets convention:** suspended = full-width amber cell + 🔒 [S20/03] —
  keep verbatim.
- **Caution:** under deuteranopia amber, gold and our red-pink collapse to the
  same olive-yellow (§3) — amber may never distinguish "suspended" from
  "followed" or "lost" by hue alone; the 🔒 + "Suspended" text is the carrier.
- Yellow reads easiest on black [S8] but yellow-on-cyan is a vibrating pair
  [S19] — amber must not abut cyan accents.

### Gold — `#daa520`

- **Status/premium/win register:** culturally the *most consistent* positive in
  the cross-cultural table — wealth/nobility/achievement in all five regions
  [S6]. Casino trade press: gold = VIP, jackpot, "small win feels big"
  [S17-WEAK]. Housebets itself uses ☆→★ gold for follow [S20/03].
- **Rules:** reserve for follow/premium/achievement semantics ONLY; never for
  warnings (collides with amber under CVD), never for cash-out value or odds.
- Scarcity is the mechanism — trade sources agree gold loses meaning when
  overused [S17-Milo WEAK; consistent with attention economics].

### USDT teal — `#26a17b`

- Tether's brand green-teal: meaning is **denominational**, not emotional — it
  says "this number is USDT". Only ever appears attached to the ₮ glyph or the
  string "USDT" — the label is the identity; the colour is decoration. 5.14–
  5.93:1 on our surfaces (AA for text); 4.60:1 on surface-tertiary — borderline.
- Under deuteranopia it collapses toward the success/USDT grey family —
  never rely on it to separate "money" from "win" (§3, §5).

### Purple — *deliberately absent from the palette*

- Purple = royalty/luxury/virtue cross-culturally [S6]; in streaming/gaming =
  "the Twitch colour" [S17-Uberman]; in crypto branding = AI/innovation register
  [S17-PumpSite]. It is also the single most generic crypto-casino hue (Stake's
  family territory) and the Material-3 default (#6750A4) — maximum sameness
  risk [S17-stan.vision]. Exclusion is correct twice over: hue budget (Wickens
  ~5–7 codes, B11) is already at ceiling, and differentiating from the crypto-
  casino template is the contest premise. If a promo/VIP hue is ever needed,
  gold already covers it.

### Near-black base — `#041015` / surfaces `#0b1920`–`#0d2a38`

- Brand-tinted near-black, not #000: preserves shadow headroom and reduces
  halation of bright text (B11). The teal-blue tint keeps the whole frame in
  the "cool/trust" family [S1, S14] while letting neon accents pop at low
  pixel-budget.
- Ageing eyes lose blue-green discrimination [S7] → depth must be carried by
  *lightness steps* (04→0b→0e→0d→11→14 ladder) not hue differences; the ladder
  already does this.

---

## §2 Age & culture for a 20-locale, 156-country, RTL-aware audience

**Demographics (what we know):** potential crypto gamblers skew 18–34 (62%)
and male (62%) [S13-YouGov]; aggregator reports: 25–34 ≈40%, ~70% male, 65%
mobile [S13-Blockonomi, WEAK aggregator]. Consequences:

- Core cohort tolerates — expects — dark + saturated neon [S17]. That is a
  *preference licence*, not a readability licence: density + small type still
  demands contrast and tnum discipline regardless of age.
- Male-skewed audience ⇒ red-green CVD (~8% of males, ~0.5% females [S14,
  National Eye Institute figure via eldertech]) hits roughly 1 in 12–16 users —
  higher than the general population average.
- Judges + older tail: ageing lenses transmit less blue and discriminate
  violet-blue-green poorly; warm hues read easier [S7]. Mitigations: lightness-
  ladder depth (not hue depth), no saturated blue fine detail/motion [S19],
  text ≥11px and ≥450 weight (B11). Favourite-colour data: blue dominates all
  age bands; purple preference *rises* with age; green favoured by the young
  [S9 — weak n, US-skewed].
- **CN inversion footnote:** Mainland-China red-up is real [S3] but irrelevant
  to current locales; the second-channel rules in §3 make us robust if it ever
  matters. Do not ship an inverted scheme.
- **Middle East / Islamic locales:** green is sacred/positive (Islam, paradise)
  [S6, S18] — our win-green and brand teal are *safe* there; the Translating
  Colours note that Shiite contexts treat green as sacred means avoiding green
  for frivolous/error-adjacent uses, which we already do (green = money motion
  only). Amber=joy/prosperity, gold=wealth in-region [S6] — both read positive,
  so the 🔒+label must carry "suspended" (§3).
- **RTL (Arabic):** colour meaning doesn't flip; *directional* semantics do.
  ▲▼ are orientation-agnostic — safe. Left/right positional meaning (Betfair
  back-left/lay-right [S16]) must NOT be load-bearing: with `dir=rtl` the 1X2
  grid and slip rail mirror, so positional semantics break by design if relied
  on. Horizontal arrows/icons must mirror; numeric digits stay Latin with
  Oxanium (crypto convention) — verify per locale.
- **UNKNOWNs (honest):** no opened source measured colour-attitude differences
  *within betting UI specifically* by age band; Hallock n=232 is thin and
  US-skewed [S9]; the 2025 Nature table [S6] is broad but regional — country-
  level deviations (Indonesia green taboo, Iran blue mourning, Malaysia green
  danger [S18]) are single-source claims; treat per-locale colour tuning as
  out of scope beyond the global rules in §3–§5.

---

## §3 CVD-safe status communication

**Prevalence:** red-green CVD ~8% males / ~0.5% females [S14]; severity rises
with age. Tritanopia (blue-yellow) is rare — and our palette survives it almost
intact (sim below).

**Machado simulation of OUR tokens** (severity 1.0, computed in-repo):

| Token | Hex | → Deutan | → Protan | → Tritan |
|---|---|---|---|---|
| success-500 | #47d496 | #7c71a9 grey-violet | #8485a5 grey-violet | #47b3b7 teal (safe) |
| error-500 | #f41f50 | #a4b441 olive | #989644 olive | #f43936 red (safe) |
| warning-500 | #e17823 | #bac23d olive | #b4b338 olive | #e14b50 (safe) |
| gold-500 | #daa520 | #c6ca48 olive | #c3c340 olive | #da5f66 (safe) |
| usdt | #26a17b | #544b86 grey-violet | #5b5c84 grey-violet | #268d8f (safe) |
| cyan-500 | #02f8f8 | #5e4cf8 violet | #6d6ff8 violet | #02f8f8 (unchanged) |
| positive-500 | #26ba50 | #5e5270 grey-violet | #66676a grey | #268288 teal |

**Findings:**
1. **error / warning / gold collapse to one olive-yellow family** under
   deutan+protan — hue separation between *loss*, *suspended* and *followed*
   is ZERO for ~1 in 12 users. Three distinct non-colour channels are
   mandatory: ✕/label for error, 🔒+word for suspended, ☆→★ shape for follow.
2. **success vs cyan stay separable** (grey-violet vs saturated violet) — but
   only by saturation/lightness, barely by hue → ▲/+ glyphs still required on
   up-deltas since the *direction*, not the hue, is the message.
3. **USDT vs success converge** (both grey-violet family) → ₮/label carries.
4. Tritan: whole palette survives → no extra work.

**What the industry does (evidence of conventions):**
- Shuffle: persistent green▲/red▼ per odds cell — the glyph IS the direction
  channel [S20]. bet365: green/red flash on real deltas only [S20]. Exchanges:
  position is the invariant (back always left in LTR), colour varies per venue
  [S16]. Candlestick convention: hollow=up / filled=down predates colour and is
  the documented accessible fallback [S14]. Futubull: shipped an opt-in CVD
  palette toggle [S15].
- General rule (WCAG SC 1.4.1 A; every a11y source): colour may never be the
  only channel [S11, S14]. Second channels in order of preference for our UI:
  glyph (▲▼ 🔒 ★ ✕ ₮) > word/label (Suspended, Won, Lost) > shape/fill-style
  (hollow vs filled, outline vs solid) > position (never load-bearing in RTL).

**House rules:** every state that money depends on carries colour + ≥1 other
channel: odds dir = hue + ▲▼ + signed delta; selected = cyan fill + dark text +
✓; suspended = amber + 🔒 + "Suspended" + disabled; win/loss = hue + word +
signed amount; live = red dot + period text; error = red + ✕/shake + message;
USDT = teal + ₮ label. (Verifies A13.c and the B11 slip finding.)

---

## §4 Contrast law for data-dense dark UI

**WCAG 2.2 verbatim [S11]:** SC 1.4.3 (AA) — text ≥4.5:1, large-scale (≥24px or
≥19px bold) ≥3:1, incidental/inactive exempt. SC 1.4.6 (AAA) — ≥7:1 text,
≥4.5:1 large. SC 1.4.11 (AA) — UI components, states and graphical objects
≥3:1 vs adjacent. SC 1.4.1 (A) — colour never sole channel. SC 2.3.1 — ≤3
flashes/second (our 1s pulse animations are fine; no strobe).

**AA vs AAA allocation for this UI (A27.c: "AA minimum on all text, AAA on
odds and money"):** money facts — price, stake, return, balance, cash-out,
P/L — get text-primary (#f9f9fb, 15.9–18.3:1) i.e. AAA headroom. Secondary
metadata sits on text-secondary/tertiary at AA. Where a semantic colour *is*
the money text (win amount in green, loss in red), require ≥4.5:1 + the §3
second channel; full 7:1 on colour-coded money is impractical (error red caps
~5.2) — document as a reasoned AA-floor exception: the *word + sign* is the
AAA-legible channel, the hue is ornament.

**APCA vs WCAG 2.x [S12]:** 2.x ratios overstate contrast near black and are
perceptually uneven — our dark UI is exactly where it misleads (a "passing"
4.5:1 grey on near-black can be functionally dim). APCA Lc is perceptually
uniform and polarity-aware; alignment: Lc60≈3:1, Lc75≈4.5:1, Lc90>7:1. APCA is
the WCAG 3 candidate — **not yet normative**: ship WCAG 2.x AA/AAA numbers as
the compliance claim, run Bridge-PCA/APCA as a sanity lens on the top pairs
(odds cell, CTA, slip money, live badge). Also: WCAG "false fails" on light-
text-on-colour exist; don't pass a failing pair because a ratio looks near.

**Computed ratio table (WCAG 2.x, our tokens — measured, not guessed):**

| Foreground | on #041015 | on #0b1920 | on #0e202a | on #0d2a38 | AA-verdict (text) |
|---|---|---|---|---|---|
| text-primary #f9f9fb | 18.32 | 17.01 | 15.87 | — | AAA everywhere |
| text-secondary #8f96a8 | 6.51 | — | 5.64 | — | AA |
| text-tertiary #7f99a4 | 6.42 | — | 5.56 | 4.98 | AA (metadata only) |
| text-disabled #7d919c | — | — | 5.09 | — | AA — inactive use only |
| text-accent #02f8f8 | 14.48 | — | 12.54 | 11.23 | AAA — accent only |
| success-500 #47d496 | 10.21 | 9.48 | 8.84 | 7.92 | AAA |
| positive-500 #26ba50 | 7.54 | 7.00 | 6.53 | 5.85 | AA/AAA border |
| usdt #26a17b | 5.93 | 5.51 | 5.14 | 4.60 | AA (s3 borderline) |
| error-500 #f41f50 | 4.73 | 4.39 | **4.10** | 3.67 | **FAILS small text ≥s2** |
| error-400 #fa2e5d | 5.15 | 4.78 | **4.46** | 3.99 | borderline-fails on s2 |
| tick-down-text #ff4d75 | 6.03 | 5.60 | 5.22 | 4.68 | AA — use for small red text |
| error-300 #dd627f | 5.62 | 5.22 | 4.87 | 4.36 | AA on ≤s2 only |
| warning-500 #e17823 | 6.34 | 5.89 | 5.49 | 4.92 | AA |
| warning-400 #e68a42 | 7.41 | 6.88 | 6.42 | 5.75 | AA/AAA border |
| gold-500 #daa520 | 8.61 | 7.99 | 7.46 | 6.68 | AA/AAA border |
| brand-600 #0ad4d4 | — | 9.69 | — | 8.10 | AAA-ish — hairlines/accents |
| base-200 #585d6a | — | — | 2.53 | — | decorative only |
| #464b59 (live-site disabled) | — | 2.05 | — | — | **do not use for text** |

Inverse-polarity pairs: dark #041015 on pale-CTA #c4f4f1 = **16.11**; on neon
#02f8f8 = 14.48; on warning #e17823 = 6.34; on gold #daa520 = 8.61; on USDT
#26a17b = 5.93; on error-500 = 4.73. White #f9f9fb on interactive-secondary
#113a4c = 11.52; **white on error-500 = 3.87 (fails small text — LIVE-badge
trap)**; white on error-600 #cc1b44 = 5.24 (passes); white on gold = 2.13 /
on success = 1.80 / on USDT = 3.09 — all fail → fills in these hues take DARK
text or no text.

**Vibration/chromostereopsis guard [S8, S19]:** saturated red↔cyan adjacency
produces false-depth "vibration"; saturated blue slows focus. Rules: red never
flush-adjacent to cyan at equal emphasis (neutral hairline ≥1px between);
neon cyan never body text; error/warning fills sit on neutral surfaces, not
on brand-a* tints.

---

## §5 PER-TOKEN rationale table

Schema: **Meaning (evidence)** · **Allowed** · **Banned** · **Min contrast** ·
**Second cue**. "Money text" = price/stake/return/balance/CO/P-L.

| Token | Hex | Meaning (evidence) | Allowed | Banned | Min contrast | Second cue |
|---|---|---|---|---|---|---|
| bg-primary | #041015 | Cool-dark trust canvas; neon headroom [S1,S14,S17] | app bg only | text fill on any surface (it's text-inverse); pure #000 swap | — | — |
| surface-primary | #0b1920 | Elevation L1; quiet utility zone | nav/rail/toast/panels | money-critical text bg for disabled-tone copy | — | elevation = lightness step, not hue |
| surface-secondary | #0e202a | L2 cards/odds cells | odds cells, market rows, cards | pairing with #464b59-class text | — | hairline border on s1 |
| surface-tertiary | #0d2a38 | L3 / strongest surface | selected rows, headers, strong borders | red-500 text on it (3.67) | — | — |
| surface-elevated | #142b36 | floating layer only | popovers, sheets, toasts | structural surfaces | — | shadow + position |
| text-primary | #f9f9fb | primary + **money facts** | all text incl. AAA money/odds | coloured-money substitute (hue is ornament) | 15.9–18.3:1 measured | — |
| text-secondary | #8f96a8 | secondary metadata | team names, league labels, timestamps | money-critical small text | 5.6–6.5:1 AA | — |
| text-tertiary | #7f99a4 | tertiary captions | captions, hints, star-off state | money info; anything on s3 needed at AA (4.98 borderline) | ≥4.5:1 AA | — |
| text-disabled | #7d919c | genuinely inactive | disabled controls ONLY | suspended prices (suspension ≠ disabled — it's a live state) | 5.09 AA; use only for inactive | disabled = non-interactive affordance |
| text-accent | #02f8f8 | brand neon: interactive/resting price, links, focus info | accents, prices at rest, tabular accents, hairlines | body text; up/down/win/loss meaning; large fills under white text | 12.5–14.5:1 AAA | interaction affordance (underline/hover) |
| text-inverse | #041015 | text on pale/neon fills | on #c4f4f1 CTA, on cyan-fill selected cells | on any dark surface | 14.5–16.1 measured | — |
| interactive-primary | #c4f4f1 | THE primary action; pale-cyan Housebets signature (trust at the money moment) | exactly one primary CTA per view (Place bet, Register, Deposit) | alerts, status, promo fills; white text on it | 16.11 w/ dark text | position (bottom bar/slip), size, label |
| interactive-primary-hover | #82e0e0 | hover of above | hover only | resting state | 11+ w/ dark | — |
| interactive-secondary | #113a4c | secondary action | secondary buttons | primary affordance | 11.52 w/ white | position adjacent to primary |
| brand-500 | #02f8f8 | neon accent fill | selected odds-cell fill (+dark text+✓), selection, glow ≤ ~5% pixel budget | behind white text (1.4:1); semantic status | 14.48 w/ dark text | ✓ + shape change on selection |
| brand-400 | #28f3f3 | focus ring | focus-visible outline | as sole ring on cyan fills (1.04:1 — needs dark offset ring) | ≥3:1 vs adjacent (1.4.11) | ring geometry + offset |
| brand-600 | #0ad4d4 | accent hairline | borders, focus accents, tiny fills | text below ~13px | 8.1–9.7 | — |
| brand-a05/a20/a30/a70 | rgba cyan | brand glow tints | selected/tab backgrounds, ::selection | under vibrating red pairs | n/a (non-text) | underlying glyph/label |
| secondary-a15/a20/a30 | rgba teal | tab/segmented fills | tab tracks | status semantics | n/a | active tab = position + weight |
| success-300/400 | #7cdbb0/#60d4a0 | lighter win | large glows, wins celebrations <3s | — | 9.1–11.6 | ▲/+ glyph |
| success-500 | #47d496 | win / odds-UP / positive delta (learned convention [S3,S20]; not innate) | ▲ ticks, +deltas, win labels, flash-up | loss-adjacent use; sole channel; huge fills | 7.9–10.2 measured (AAA-capable) | ▲ or + sign + word (Won) |
| success-600/800 | #34b881/#277f5d | win fills/borders | chips/borders on dark | small text on s3 (5.92 borderline) | 5.9–7.6 | glyph |
| success-a15/a20 | rgba green | win glow bg | flash-up, win card tint | — | n/a | glyph |
| error-500 | #f41f50 | loss / odds-DOWN / error / LIVE accent (alarm register [S2,S5,S8]) | ▼ ticks, loss labels, error fills, LIVE dot; fills with DARK text or no text | small text on s2/s3 (4.10/3.67 — fails); adjacent to saturated cyan; sole channel | ≥4.5:1 only on ≤s1 for text; fills ≥3:1 (1.4.11) | ▼, ✕, word (Lost/Error), shake ≤0.3s |
| error-400 | #fa2e5d | lighter loss accent | text ≥14px on bg/s1 only (4.46 on s2 = marginal fail) | small text on s2/s3 | ≥4.5 AA | glyph |
| tick-down-text | #ff4d75 | small red text variant | down-deltas, loss amounts, small red labels | — | 5.22/4.68 AA | ▼ or − sign |
| error-300 | #dd627f | soft red text | live clock text (current usage), errors on bg/s1 | s3 surfaces (4.36) | 4.87–5.62 | label |
| error-600 | #cc1b44 | deep red fill | LIVE badge fill w/ white text (5.24 — the badge fix) | text on dark | fill 3:1+; white text 5.24 | pulsing dot + "LIVE"+clock text |
| error-a15/a30 | rgba red | error tint | error surfaces/toasts | — | n/a | ✕ + message text |
| warning-400 | #e68a42 | suspension/caution accent | 🔒 icon, suspend glow, attention chips | wins/follows/errors; adjacent to cyan | 5.75–7.41 | 🔒 + "Suspended" word |
| warning-500 | #e17823 | suspended/caution fill (Housebets amber cell) | suspended cells (fill + dark text 6.34), lock accents | follow-star (unified to gold), promos, money deltas | fill ≥3:1; dark text on it 6.34 | 🔒 + word + disabled state |
| warning-600/900 | #c6691b/#673b0f | deep amber | borders/tints | text | non-text | — |
| warning-a15/a40 | rgba amber | caution tint | suspended-cell tint, suspend-pulse ring | — | n/a | 🔒 + word |
| gold-500 | #daa520 | premium/follow/achievement (most cross-culturally stable positive [S6]) | ★ fill, VIP/premium markers ONLY | warnings, errors, odds, money text, cash-out, promos | 6.68–8.61; fills take dark text (8.61) | ☆→★ shape change + aria-pressed |
| usdt | #26a17b | denomination marker (brand, not emotion) | always beside ₮ glyph or "USDT" label; stake/return chip accents | meaning "money" alone; separating money from win by hue | 4.60–5.93; s3 borderline | ₮ glyph / "USDT" string — label IS the identity |
| positive-500 | #26ba50 | (currently UNUSED in src) | either delete or assign single role (e.g., P/L delta text on my-bets) | duplicating success-500's role ambiguously | 5.85–7.54 | glyph if ever used |
| border-soft / strong / very-strong | #0d2531/#0d2a38/#113a4c | hairline ladder | separators (hairlines > shadows > zebra on dark, B11) | focus/state borders | non-text; keep ≥1px | — |
| border-interactive | #2e5563 | interactive affordance border | inputs, interactive cells at rest | — | aim ≥3:1 vs surface (measure) | underline/focus state |
| border-focus | #28f3f3 | focus | focus ring | sole ring on cyan fills | ≥3:1 adjacent + dark offset when on cyan | ring + offset geometry |
| border-accent | #0ad4d4 | accent hairline | special rows/accents | status meaning | 8.1–9.7 | — |
| skeleton gradient | #0e202a→#14303c→#0e202a | loading shimmer | skeletons only | meaningful content | n/a | shimmer motion (off under PRM) |
| ::selection | #02f8f833 | user selection | selection | — | n/a | system behaviour |

Cross-cutting rules from §3/§4 that apply to ALL rows: no colour-only states;
money text = text-primary (AAA) with hue as ornament only; ≤3 flashes/s;
red-never-flush-with-cyan; no new hues (palette at Wickens ceiling);
position never load-bearing (RTL mirrors it).

---

## §6 DERIVED ASK PROPOSALS (not added to qc/ASKS.md — proposals only)

C-01. **No colour-only state anywhere.** Every money/status distinction carries
colour + ≥1 of glyph/label/fill-style; verify under deuteranopia+protanopia
simulated screenshots committed to qc/ (Machado sim shows error/warning/gold
all collapse to one olive family — hue can never be the separator).
C-02. **Odds direction = green▲ / red▼ + signed price text on every cell**
(Shuffle convention verified in-repo; bet365 flashes confirm), Western/
crypto order kept; never inverted.
C-03. **Three-channel separation for the olive-collapse trio:** error = ✕/word
(+optional 0.3s shake); suspended = 🔒 + "Suspended" word + disabled; follow =
☆→★ shape. The three may never rely on hue to differ from each other.
C-04. **error-500 text ban ≥s2:** #f41f50 fails AA small text on surface-
secondary (4.10) and tertiary (3.67) → for red text use tick-down-text
#ff4d75 (5.22/4.68) or error-300 ≤s2; error-500 allowed as fill (≥3:1,
1.4.11) with dark text or glyph only.
C-05. **LIVE badge:** if a red pill with white "LIVE" is used, fill must be
error-600 #cc1b44 (white = 5.24) not error-500/400 (3.87/3.56 fail); current
dot+error-300-clock treatment passes (4.87 on s2) — keep or fix, don't regress.
C-06. **Success-500 may carry small money text** (8.84 on s2, AAA-capable) but
still ships ▲/+/word — hue is ornament, not message.
C-07. **USDT teal never means "money" alone** — always ₮ glyph or "USDT"
label; on surface-tertiary (4.60) keep to ≥12px bold or bump to a lighter step.
C-08. **Gold = follow/premium only.** Banned for warnings, errors, money
deltas, cash-out, promo fills. Scarcity is the mechanism (overuse kills the
signal; also under CVD gold ≈ amber).
C-09. **Amber = suspended/caution only,** always with 🔒+word; never
follows/wins/boosts. (Continues B11's gold-vs-amber unification.)
C-10. **Neon-cyan budget ≤ ~5% of pixels/screen**; cyan banned for status
semantics so the green/red motion channel stays unpolluted; banned as body
text and as fill under white text (1.4:1).
C-11. **Selected-cell fill-flip keeps dark text + ✓** (Housebets convention)
and the focus ring becomes dual-tone (cyan ring + dark offset) — current
ring-on-cyan is 1.04:1, invisible on the most-pressed control.
C-12. **AAA on money facts:** price, stake, return, balance, cash-out, P/L use
text-primary (≥15.9:1) or a passing semantic (success ≥7:1). Where hue carries
the money label (win/loss amounts), floor = 4.5:1 + word/sign channel;
document the reasoned exception.
C-13. **Suspended ≠ disabled:** suspended cells keep warning-amber + 🔒 + word,
never disabled-grey; text-disabled/#464b59 reserved for genuinely inactive
controls (2.05–5.09 bands are not for state info).
C-14. **Contrast audit artefact:** a script measuring every text/surface pair
used in components; committed output to qc/; every text pair ≥4.5:1, money
facts ≥7:1, non-text state affordances ≥3:1.
C-15. **APCA/Bridge-PCA cross-check** on the top ~10 pairs (bg, odds cell,
CTA, slip, LIVE badge, suspended) as dark-mode sanity — reported as Lc only;
WCAG 2.x numbers remain the compliance claim.
C-16. **CVD regression shots:** each of the 5 pages + slip-open through
deuteranopia AND protanopia filters before freeze; legs: up/down, selected,
suspended, win/loss, live all legible by non-colour channel.
C-17. **Chromostereopsis guard:** saturated red never flush-adjacent to
saturated cyan (≥1px neutral hairline or different emphasis); no saturated
blue for fine detail/motion (S-cone sparsity); our green-leaning cyan is the
already-correct mitigation.
C-18. **RTL audit:** positional/horizontal cues never carry meaning (grid and
rails mirror under dir=rtl); ▲▼/🔒/★ are direction-agnostic — verify Arabic
locale screenshots; Latin digits for odds (Oxanium) intentional.
C-19. **Locale note in submission copy:** green-up/red-down kept as the
global crypto/trading convention; Mainland-China red-up documented as a
known inversion we deliberately don't ship; glyphs+words carry meaning for
any market.
C-20. **RG/safer-gambling surfaces stay neutral:** session clock, limits, 18+
use text-secondary on surfaces — no red alarmism, no gold reward framing;
the channel is the words.
C-21. **positive-500 resolution:** delete the unused #26ba50 token or assign
it one documented role (e.g., P/L delta on My bets) — two role-ambiguous
greens collapse to the same CVD grey and dilute the code.
C-22. **Hue budget freeze:** no new hues; every new semantic maps onto the
existing scale (Wickens ~5–7 code ceiling; cyan+green+red+amber+gold+USDT
already at it).
C-23. **Skeleton harmonise:** shimmer mid-stop #14303c stays within the
surface ladder (it does — 0e202a/14303c/0e202a); keep and document as
decorative-only.
C-24. **Age-respectful floor:** no text <11px, ≥450 weight on data rows, no
pure-white-on-black (halation) — judges and older tail see violet-blue-green
worst; depth stays a lightness ladder, never a hue ladder.

— end of T6 —
