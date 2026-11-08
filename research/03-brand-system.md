# Housebets brand system — extracted live from housebets.com (2026-11-09)

Method: computed styles + stylesheets from the real site (data-brand="base", class="dark", Tailwind v4 + Lightning CSS). 254 CSS vars captured; condensed to what matters.

## Fonts (all Google Fonts, self-hostable — files in `research/brand/`)
- **Figtree** variable 300–900 — UI body/labels (the embedded sportsbook uses Figtree only)
- **Red Hat Display** 700 — display/headings
- **Oxanium** 600, 700 — techno/esports numerals → odds, scores, clocks
- Noto Sans Arabic variable — RTL fallback (ignore for entry)
- html classes map to: Xkrioa=figtree, HDEBLG=redHatDisplay, aIcdaa=oxanium

## Logo
- `housebets-logo.svg` — wordmark 116×18 (white "housebets" + cyan h-mark)
- `desktop_logo.png` — raster variant; wireframes show wordmark + wave emblem

## Color primitives
- Brand cyan scale: 25 `#e2faf8` … **500 `#02f8f8`** (signature) … 950 `#0e2834`
- Secondary (teal surface scale): 25 `#80e7fe` … 500 `#0a4f66` … **950 `#0b1920`**
- Base: 50 `#f9f9fb` (text) → 900 `#041015` (app bg), 800 `#040d13`, 700 `#09151b`
- Success `#47d496` (500) · Error `#f41f50` (500) / `#fa2e5d` (400) · Warning `#e17823` (500) · Gold `#daa520` · USDT `#26a17b` · positive-500 `#26ba50`

## Semantic tokens (verbatim from site)
- `--bg-primary: #041015` · surface-primary `#0b1920` · surface-secondary `#0e202a` · surface-tertiary `#0d2a38`
- text-primary `#f9f9fb` · text-secondary `#8f96a8` · text-disabled `#464b59` · text-accent `#02f8f8`
- **interactive-primary-bg: #c4f4f1** (light cyan!) hover `#82e0e0` — text on it = `#041015` (dark) → this is why "Register" is a pale-cyan button
- interactive-secondary-bg `#113a4c` hover `#0d2531`
- input-bg `#0d2531`, border `#02f8f833`, focus `#28f3f3`
- toast-bg `#0b1920`; borders: soft `#0d2531` / strong `#0d2a38` / very-strong `#113a4c` / accent `#0ad4d4`
- top-nav surface `#0b1920`, border `#0d2531`, interactive `#0d2a38`

## Shell metrics
- `--shell-header-height: 60px` (contest pages; /sports header measured 80px — wireframes ≈72–80px)
- `--shell-bottom-bar-height: 67px` (phone tab bar)
- left rail 72px; safe-area env() respected
- Radius vocabulary from live classes: rounded-md (6), pills full, cards ~12

## Component cues from live site + embedded book
- Pills/tabs: segmented containers `bg-interactive-tab-bg` (#09667d26), selected = alpha-secondary-30
- Odds cells: surface-secondary fill + hairline; price in cyan; selected = cyan fill + dark text + ✓
- LIVE badge: red-pink pill, white text, sometimes pulsing dot
- Suspended: full-width amber cell, 🔒 + "Suspended"
- Follow: ☆ → gold ★ (gold = premium/follow, not error-amber)
- Buttons: primary pale-cyan fill + dark text; secondary teal fill + light text; radius ~8
- Chip/quick stakes: 1/10/50/100 USDT chips (live widget), 50 highlighted

## The embedded sportsbook widget (current product — our baseline to beat)
- Web Component (shadow DOM, styled-components `sc-*`), Figtree only, themed to brand
- IA: Popular / Live / Upcoming / Predictions tabs → sport chip row → league-grouped match cards (1x2) → "Go to All Markets" → Hot Combos / Top Events / Top Outrights → "ODDS FORMAT: European"
- Live states: `29' 1st half`, `43' 3rd quarter`, `Second break`, `Break`; scores beside names; "+N" markets
- Verdict: generic BETBY-class embed — flat hierarchy, promo-y, no motion language, buried states. Replacing it with a NATIVE-feeling book is the whole contest premise.
