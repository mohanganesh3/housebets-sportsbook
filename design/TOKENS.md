# Design Tokens — Housebets Sportsbook (spec v0)

Status: v0 — colour/layout/art sections are VERIFIED from the live brand (`research/03-brand-system.md`, 254 extracted CSS vars). Type-scale, motion-timing and contrast-ratio cells marked **[PENDING-T6/T7/T8]** fill in when those research nodes land and get locked at v1 before any visual code.

Mirror file: `src/styles/tokens.css` (to be created in D0). Components may consume semantic tokens only — no raw hex/px/ms (0 and 1px hairlines excepted). Enforced by the raw-value grep gate.

## 1. Colour — VERIFIED BRAND LAW

Roles, not just values. The mistake to kill: neon cyan used as fill (generic crypto).

| Token | Value | Role / allowed | Banned |
|---|---|---|---|
| `bg-app` | `#041015` | App background | — |
| `surface-1` | `#0b1920` | Cards, panel, sheet | — |
| `surface-2` | `#0e202a` | Odds cell fill, chips | — |
| `surface-3` | `#0d2a38` | Raised/active surface | — |
| `border-soft` | `#0d2531` | Hairlines | — |
| `border-strong` | `#0d2a38` | Cell/row borders | — |
| `border-accent` | `#0ad4d4` | Focus-adjacent accents | Large areas |
| `text-1` | `#f9f9fb` | Primary text | — |
| `text-2` | `#8f96a8` | Secondary text | Text on surface-1 below AA **[PENDING-T6 measure]** |
| `text-disabled` | `#464b59` | Disabled only | — |
| `accent-neon` | `#02f8f8` | Prices, icons, borders, glow — TEXT/ICON/BORDER ONLY | **Never a large fill** |
| `cta-fill` | `#c4f4f1` | Primary CTA fill (Register, Place bet, Accept) | — |
| `cta-fill-hover` | `#82e0e0` | CTA hover | — |
| `cta-text` | `#041015` | Text on pale-cyan | — |
| `interactive-secondary` | `#113a4c` | Secondary buttons | — |
| `input-bg` | `#0d2531` | Inputs | — |
| `live` | red-pink (verify exact from `#f41f50` family) | LIVE badge only | Any non-live use |
| `success` | `#47d496` | Wins, up direction (with glyph) | Colour alone |
| `error` | `#f41f50` | Failures, down direction (with glyph) | Colour alone |
| `warn` | `#e17823` | Suspended band, cautions | — |
| `gold` | `#daa520` | Follow/star, premium markers | Error/caution |
| `usdt` | `#26a17b` | Tether denomination | — |
| `tab-bg` | `#09667d26` | Segmented containers (from live) | — |

Contrast gate: AA on all text, AAA on odds/money — measured with culori at token lock **[PENDING-T6]**.
Second-cue rule: every meaningful state pairs colour with glyph/label/pattern — colour alone never carries state (deuteranopia).

## 2. Type — BRAND FONTS VERIFIED · scale [PENDING-T7]

| Token | Family | Role |
|---|---|---|
| `font-ui` | Figtree variable 300–900 | All UI text |
| `font-display` | Red Hat Display 700 | Hero/section display |
| `font-num` | Oxanium 600/700 | Odds, scores, clocks, money — tabular lining required; fallback `tabular-nums` on Figtree if tnum absent (verify glyph table at D0) |

Scale (draft, T7 refines): display 28/32 · h1 20/26 · h2 15/20 semibold · body 13/18 · label 11/14 semibold caps-on-context · odds 15/20 Oxanium · score 40/48 Oxanium hero · micro 10/13.
Rule: hierarchy from weight/size/alignment, not boxes. Money numbers right-aligned, fixed-width cells.

## 3. Space — 4px base

`space-1:4 space-2:8 space-3:12 space-4:16 space-5:20 space-6:24 space-8:32 space-10:40 space-12:48`
Row heights: list row 48 phone / 40 desktop (T4 Fitts check pending). Touch target ≥44×44.

## 4. Radius — deliberate set

`r-1:4 r-2:6 r-3:8 r-4:12` — cells/chips r-2, buttons r-3, cards r-4, pills only where Housebets uses them (LIVE badge, chips). NOT one radius everywhere (slop H1).

## 5. Elevation & borders

Shadow-below grammar: `elev-1` subtle down shadow for sheets/popovers; ONE halo budget per screen (slop H5 — glow halos capped). Suspended = amber band (full-width on list rows, per-cell on match markets).

## 6. Motion [PENDING-T8 refinement — law already set]

Feedback 100–150ms · transitions 200–300ms · nothing decorative >400ms on money paths · suspension 0ms same-frame · ease-out enter / ease-in-out morph / linear tickers · interruptible always · reduced-motion twin for every effect · win glow <3s (judge's own rule).

## 7. Layout / shell — VERIFIED

`header-h:60` contest pages (live sports header 80 — wireframes read ~72; T1 inventory is law) · `bottombar-h:67` phone · `panel-w` right slip rail desktop (T1 measure) · `rail-w:72` left icon rail if used.
Breakpoints: 360 / 390 / 430 / 768 / 1024 / 1440. Desktop grid written in storyboards (no dead bands, no stretched rows — T4 informs).

## 8. Iconography & art — CUSTOM ONLY

- One custom sport-glyph set, single stroke weight — never default Lucide look-alikes (slop H3).
- Crests: unique silhouettes via crest grammar — never initials-in-disc, never emoji flags (slop H3/H4).
- Motif: illustrated matchday/crowd family (extends their "SEASON STARTS HERE" art) as section backgrounds; hand-drawn accents allowed.
- Hubie: empty/error cameo only, never decoration.
- Hero: slideshow of FEATURED FIXTURES — zero promo copy (out-of-scope + A37a).

## 9. Verbatim conventions locked (from T1 inventory + brand extraction)

Phone slip bar shows the pick (`count + selection @ odds + ⌃`) · `All markets N` tab LAST · Football `Market: Match result ▾` rebinds rows · `★ Following` chip on scoreboard · quick-stakes `1/10/50/100` USDT, 50 highlighted · labels verbatim: `Live now` `Starting soon` `Corners & cards` `Place bet` `Cash out` `Payout ₮` · phone My bets lives inside the slip sheet (per live wireframe set).
