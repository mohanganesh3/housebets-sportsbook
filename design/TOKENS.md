# TOKENS v2 — Housebets grammar (verified where cited)

Brand facts from research/71-brand-dna-v2.md (Wayback/captures; live site Cloudflare-gated — each
value marks its provenance). Implementation target: `src/styles/tokens.css` (does not exist yet —
index.css vars remain until D0). Components may use tokens only.

## Color

| Token | Value | Provenance | Allowed use |
|---|---|---|---|
| --c-bg | #002026 | live CSS (BETBY-era teal) | page background |
| --c-surface-1 | #08333C | live CSS | rows, panels |
| --c-surface-2 | #0b414d* | *derived +1 level | cards, inputs — VERIFY vs capture |
| --c-surface-3 | #104f5c* | *derived hover | hover/active fills |
| --c-brand-neon | #02F7FD | logo glyph, live CSS | text accents, glow, icons — NEVER fills |
| --c-cta | #C4F4F1 | judge's NEW system token | primary fills (Place bet, Deposit, Accept) |
| --c-cta-fg | #062B31* | *derived on-CTA text | text on pale-cyan (check ≥7:1) |
| --c-text | #F4FBFB* | *near-white derived | primary text |
| --c-text-2 | #9FB8BC* | *derived muted | secondary text — also implied-%/session/disabled-reason (post-crit: text-3 failed 2.09–3.10:1) |
| --c-text-3 | #8AA6AB* | *bumped post-crit | ONLY decorative/hairline-adjacent text — never meaning-bearing |
| --c-up | #26BA50 | live CSS green | odds up, won, success |
| --c-down | #FF6B86* | *lightened post-crit (4.22→target ≥4.5 on s-1/2) | odds down, lost, error |
| --c-suspend | #E17823 bg + #2A1200 fg* | existing warning var; chip = amber bg/dark text post-crit | suspension band, changed-odds edge |
| --c-gold | #FFD205 | live CSS gold | prize/trophy accents only |
| --c-live | #FF4D6D bg + #14060A fg* | *derived badge pair | LIVE badge (word+icon, never color alone) |
| --c-focus | #02F7FD ring 2px | brand | focus-visible, offset 2px |

`*` = our derivation pending T6 contrast measurement (culori, dev-only). Banned: neon cyan fills,
gradient blobs, glassmorphism, amber as decoration.

## Type

Families (verified): Figtree 400/500/600/700 (UI), Oxanium 600/700 (betting numerals only —
check tnum, fallback tabular-nums Figtree), Red Hat Display 600/700 (display/hero only).
Scale (hb-* measured set from T7, v0.2 baseline — re-verify in D0):
`hb-display 28/32 · hb-score 22/26 · hb-title 20/24 · hb-h1 16/20 · hb-odds 15/20 · hb-body 14/20 ·
hb-odds-sm 13/16 · hb-body-sec 13/18 · hb-label 12/16 · hb-clock 12/14 · hb-micro 11/14`
Rules: 11px floor; every step has explicit line-height; numerals tabular lining, never condensed
for prices (condensed-width allowed for scoreboard only per Apple-Sports note).

## Space / radius / elevation

4px base: 4·8·12·16·20·24·32·48·64. Radius: `r-sm 4, r-md 8 (DOMINANT — 158× on live site),
r-lg 12 (sheets only), r-pill 999`. Elevation: hairline borders (1px, surface-tinted) over shadows;
max one 8px-y 24px-blur shadow for sheets. No nested cards inside cards.

## Motion tokens

| Token | Value | Use |
|---|---|---|
| --ease-out-expo | cubic-bezier(0.23,1,0.32,1) | enters, appears (U3/Salaja) |
| --ease-standard | cubic-bezier(0.77,0,0.175,1) | on-screen movement (U3) |
| --ease-spring-sheet | spring ~ stiffness 380 / damping 32 | sheets, drag settle |
| --dur-feedback | 120–150ms | press, toggle, tick tint |
| --dur-enter | 200–260ms | appears, overlays (≤300 user-started) |
| --dur-move | 250–300ms | container transforms, route |
| --dur-close | 120–180ms | exits (faster than opens — Family) |

Rules: transform/opacity only on money paths; newest-state-wins; RM twin = opacity cross-fade.

## Layout

Breakpoints: 360/390/430/768/1024/1440. Desktop grid: 72px icon rail | fluid content (12-col,
24px gutters, max 1312) | 360px side panel. Phone: content + 67px bottom bar + floating slip pill.
Touch targets ≥44×44 (pseudo-element when visual smaller).

## Iconography & art

One custom sport-glyph set, 1.5px stroke, 20px grid — no stock icon standing in for a sport.
Crests: authored silhouettes, 3 detail tiers (disc 16px / chip 24px / hero 48px). House-glyph
cameo ≤1 per view; Hubie UNVERIFIED in brand (use house "h" glyph instead — U2).
