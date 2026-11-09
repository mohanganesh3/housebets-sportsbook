# D0 report — canonical token layer + hidden specimen + measured gates

**Status: PASS.** 32/32 contrast pairs measured (culori), 0 raw literals in D0 files,
`npm run build` + `npm run check` green, `/design-system` → 200 (dev + prerendered).

## Built

- `src/styles/tokens.css` — canonical token layer. `:root` holds TOKENS.md's `--c-*`
  colors, `hb-*` type steps, `--s-*` space, `--r-*` radii, `--dur-*`/`--spring-*`
  motion, `--bp-*`, `--layout-*` literals verbatim (always emitted); `@theme` maps
  them to Tailwind-4 utility namespaces (`bg-c-*`, `text-c-*`, `text-hb-*`,
  `font-hb-*`, `rounded-hb-*`, `ease-out-expo`/`ease-standard`, `shadow-hb-sheet`)
  that resolve via `var()` — nothing duplicated. Hex verbatim for brand-verified +
  crit-measured values; `color-mix()`/oklch only for D0-derived alpha tints/shades.
- `src/index.css` — one added `@import "./styles/tokens.css"`; all legacy vars intact.
- `src/routes/design-system.tsx` — hidden specimen route (no nav links). Renders:
  every color token w/ notes, the **measured contrast table** (live-computed from
  the same constants the gate checks), full `hb-*` type scale, spacing/radii/
  elevation/44 px target, motion tokens w/ hover demos, breakpoints + shell metrics,
  the **odds-cell matrix — all 14 E-M-08 states + skeleton** (default/hover/pressed/
  focused/selected/tick-up/tick-down/suspended/selected+suspended/reopened/settled
  ×2/void/offline/break), 4 button variants, live/suspend/CO/break/sport-pill/
  quick-stake chips, changed-odds ask, and canon strings (session line, both pill
  payloads, suspended band, offline banner). Uses ONLY D0 tokens + ds-* helpers.
- `src/styles/design-system.css` — specimen-only helpers (glow, tick ::after tints,
  live-dot pulse, skeleton bg, motion demo) resolving through the vars; not a
  token file and outside the lint scan.
- `src/lib/design-tokens.ts` — shared constants: `HB_COLORS`, `HB_PAIRS` (the gate
  manifest), type/space/radii/motion/layout/sample tables, WCAG math helpers.
  Erasable TS so node imports it directly. Page + script share this one file —
  verified bit-identical ratios vs culori (max Δ 0.0000).
- `scripts/check-contrast.mjs` — culori `wcagContrast` over `HB_PAIRS`; table + exit 1
  on fail. `npm run check:contrast`.
- `scripts/check-tokens.mjs` — raw-literal lint over `src/components` + `src/routes`
  (hex, rgb/hsl/oklch/color-mix, `Npx`, `Nms`, `Ns`; whitelist `0px`/`1px`/`0ms`).
  KNOWN legacy list reported; fails only on NEW violations in D0 files.
  `npm run check:tokens`.
- `scripts/prerender.mjs` — `design-system` added to static routes; 404.html
  unchanged (still written + verified).
- `package.json` — `check:contrast` + `check:tokens` scripts; `culori@4.0.2` devDep.
- `design/TOKENS.md` — the three measured adjustments documented in-table + footnote.

## Measured adjustments (direction: lighten fg on dark — culori-verified)

| Token | Was | Now | Why |
|---|---|---|---|
| `--c-text-2` | `#9FB8BC` | `#A5C0C5` | failed 4.38 on s-3 hover fill → 4.77 |
| `--c-down` | `#FF6B86` | `#FF8AA2` | failed its own target on s-2 (4.10) → 5.01 |
| `--c-up-text` | — | `#2DBF54` (new) | `--c-up` on s-2 = 4.38 <4.5 for price text; pair-token step like `--c-suspend-fg`/`--c-live-fg` |

## Contrast gate (32 pairs — `npm run check:contrast`)

- money ≥7: all pass — cell price 10.67 · session/balance 12.94/16.23 · CTA pair
  12.56 · neon price 8.38.
- text ≥4.5: all pass — t2/s2 implied-% 5.83 (was the crit's ≈2.6 defect) · t2/s3
  4.77 · suspend chip 5.83 · LIVE badge 6.16 · upText 4.63/5.61 · down 5.01/6.07.
- non-text ≥3: all pass — live dot 4.22/3.48 · suspend edge 4.46/3.68 · focus ring
  10.15/8.38 · gold ★ 9.34 · brand-up glyph on s2 4.38 (icon role only).
- decorative t3 ≥3 (AA-exempt by token law, sanity floor): 6.58/5.24/4.33/3.54.
- suspended last-price @60% blend = 4.94 — held to AA 4.5 deliberately (dim =
  not-actionable; AAA floor is for live money facts). Documented on the page.

## Build / gates

- `npm run build` — tsc -b clean (strict), vite build 20 prerendered routes
  (4 named + design-system + 15 match ids) + 404.html + .nojekyll. `design-system`
  chunk auto code-split (41.2 kB, 10.4 kB gzip).
- `npm run check` (biome) — clean, 0 errors/warnings.
- `vite preview` → `/housebets-sportsbook/design-system/` 200; `/` 200; dev server
  `/design-system` 200.

## KNOWN legacy raw-value list (reported, not gated — for later units)

`check:tokens` counts per file: Shell 48 · match.$matchId 42 · index 40 ·
BetSlip 39 · MyBets 29 · Overlays 28 · MatchRow 18 · __root 14 · football 12 ·
following 12 · Crest 13 · Hubie 11 · primitives 9 · live 7 · bets 4 ·
SportGlyph 2 · HousebetsLogo 1 — **329 hits total**, all pre-D0 code.

## Deviations / notes

- `--c-up` (brand-verified green) left untouched; the failing text role got the
  derived `--c-up-text` step instead of editing a live-CSS value.
- Suspended last-price asserted at AA 4.5 not AAA — dim is the not-actionable
  signal; documented in pair note + TOKENS.md footnote.
- `src/lib/store/bets.ts` — one-line biome fix (`forEach` arrow returning
  `setTimeout` value → braces). Pre-existing lint error blocking `npm run check`;
  no behavior change.
- `.tanstack/` (router-plugin cache) added to `.gitignore`.
- Prose in the specimen writes units spaced ("72 px") so `\d+px` stays a pure
  violation signal in the lint.
