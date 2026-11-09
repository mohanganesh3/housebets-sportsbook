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
| `live` | `#cc1b44` fill (white text = 5.24 ✓) — `#f41f50` fill FAILS 3.87 | LIVE badge only | Any non-live use; dot+`error-300` clock style also compliant |
| `success` | `#47d496` | Wins, up direction (with glyph) | Colour alone; 7.9–10.2:1 on surfaces |
| `error` | `#f41f50` | Fills/borders/large only — **4.10:1 small text FAILS on s2** | Small text → `tick-down #ff4d75` (5.22) or error-300 |
| `tick-down` | `#ff4d75` | Small down/error text | Fills |
| `warn` | `#e17823` | Suspended band, cautions | Small text on s3 — pair w/ dark text or glyph |
| `gold` | `#daa520` | Follow/star, premium markers | White text on fill FAILS — dark text/glyph only |
| `usdt` | `#26a17b` | Tether denomination — 4.60 on s3 borderline, use ≥13px or bold | — |
| `tab-bg` | `#09667d26` | Segmented containers (from live) | — |
| `positive-500` | `#26ba50` | **DEAD token — removed (T6 C-21)** | — |

Contrast gate (T6 measured): AA all text, AAA odds/money — full matrix `research/53-colour.md`. **CVD law: error/warn/gold collapse to one olive family under deuteranopia+protanopia → second channel (glyph/label/edge-position) is MANDATORY on every meaning-bearing colour.**
Second-cue rule: every meaningful state pairs colour with glyph/label/pattern — colour alone never carries state.

## 2. Type — BRAND FONTS VERIFIED · hb-* scale locked (T7 measured)

| Token | Family | Role |
|---|---|---|
| `font-ui` | Figtree variable 300–900 | All UI text — **`font-variant-numeric: tabular-nums` REQUIRED on any ticking number** (Figtree "1" is 33% narrower than "8" — jitter without tnum, T7 measured) |
| `font-display` | Red Hat Display 700 | Hero/section display — has real tnum too; lh ≈1.32em box |
| `font-num` | Oxanium 600/700 | Odds, scores, clocks, money — **digits natively tabular (578‰ all), plus `pnum` + `zero` slashed-zero** (T7 fontTools). lh ≈1.0em box — needs explicit line-height |

**LAW: `line-height: normal` banned** — fonts' boxes differ sharply (Oxanium 1.0 / Figtree 1.2 / RHD 1.32em). Explicit lh everywhere. Weight never below 400 (Apple + Refactoring UI).

hb-* scale (T7): `hb-11` micro labels · `hb-13` body/labels · `hb-15` h2 semibold · `hb-17` h1 · `hb-20` section · `hb-24` match score · `hb-28` display · `hb-40` hero score — full table `research/54-type-and-space.md`. **Floor: 11px absolute min** (Apple); 8/9/10px sizes in old build are violations to purge.
Rule: hierarchy from weight/size/alignment, not boxes. Money numbers right-aligned, fixed-width cells. Long team names may use condensed variant (Sofascore precedent).

## 3. Space — 4px base (T7 density rules)

`space-1:4 space-2:8 space-3:12 space-4:16 space-5:20 space-6:24 space-8:32 space-10:40 space-12:48`
Density: odds cells 44px @390 / 36–40px @1440 · match rows 52–56px · sticky league headers. Touch target ≥44×44 (WCAG floor 24 — we use Apple 44).

## 4. Radius — deliberate set

`r-1:4 r-2:6 r-3:8 r-4:12` — cells/chips r-2, buttons r-3, cards r-4, pills only where Housebets uses them (LIVE badge, chips). NOT one radius everywhere (slop H1).

## 5. Elevation & borders

Shadow-below grammar: `elev-1` subtle down shadow for sheets/popovers; ONE halo budget per screen (slop H5 — glow halos capped). Suspended = amber band (full-width on list rows, per-cell on match markets).

## 6. Motion — LOCKED (T8 registry + MOTION-PALETTE.md)

Buckets: instant 0 (suspension same-frame) · feedback 100–150 · transitions 200–300 · signal 350–1200 · moment ≤3s. Enter curve `cubic-bezier(0.22,1,0.36,1)` · spring 0.5/0.825 · interruptible always · RM twin per effect (deletion ≠ twin) · win glow <3s · whole-value roll over per-digit odometer (2.10→3.40 reads wrong per-digit, T8). Only 12 motions exist — MOTION-PALETTE.md.

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
