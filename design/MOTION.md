# Motion Spec v2 — authored vocabulary, binding

Vocabulary source: research/74-motion-mastery.md (lead-authored after U5 rate limit). Laws:
research/72-craft-canon.md (Salaja curves, Family sheet grammar, Apple/Geist). This file is the
implementation contract — `src/styles/tokens.css` motion tokens + per-effect spec.

## Token law (from TOKENS.md)

Curves: `--ease-out-expo (0.23,1,0.32,1)` enters · `--ease-standard (0.77,0,0.175,1)` moves ·
sheet spring ~380/32. Durations: feedback 120–150 · enter 200–260 · move 250–300 · close 120–180.
Every effect below lists: trigger / duration+curve / changed properties / interruption / RM twin.

## The signature system (numbered = S-ids from RESET_PLAN §18)

| # | Effect | Spec |
|---|---|---|
| S1 | Odds digit morph | NumberFlow `trend=0`; spinTiming 250ms ease-out-expo; cell width fixed; ▲/▼ glyph + tint decays ~1s linear | New tick supersedes · RM: instant swap+glyph |
| S2 | Pick→ticket flight | layoutId morph cell→slip-zone chip, 280ms ease-standard; ONLY on explicit add | Cancel = none needed (one-shot) · RM: ticket count pulses once |
| S3 | Suspension shutter | 0ms same-frame: padlock + reason chip + dim to 60%; last price visible | n/a — integrity, no animation · RM identical |
| S4 | Goal cascade | score roll (NumberFlow +1, 300ms) → scoreboard edge flash 400ms → markets suspend same-frame → reprice ticks; total arc ≤2.5s | Later event supersedes · RM: score+event line only |
| S5 | Receipt stamp | Place-CTA container-transforms to receipt card, 260ms out-expo; success tint fades <3s; ref types in | RM: instant card |
| S6 | Masthead | CSS scroll-snap slides; scroll-driven `view()` reveal where Baseline, else static; kinetic team-name weight shift only | RM: static slides + controls |
| S7 | Cash-out quote | NumberFlow value; changed → "new amount" chip + required reconfirm; neutral (no pulse — U4) | RM: instant value |
| S8 | Calm-live dim | while slip has pending stake: board ambient motion → opacity .6 equivalent (tint-only ticks) | RM: same rule |

## Sheet physics (phone slip)

Drag: translateY follows finger 1:1; release → velocity decides open/closed (flick ≈0.11px/ms
threshold, Salaja); mid-drag cancel settles back; scrim fades with drag distance; scroll-lock only
when fully open. Sheet heights differ per content (Family rule: chained sheets must differ).
Desktop panel: 240ms slide-in-right, closes 160ms; scrim optional at ≤1024.

## Attention law

≤4 simultaneous motions per viewport; ticks exempt from count but muted to tint-only during pending
stake (S8). Hero motion once per flow. Repeat actions (chips, steppers, tabs already visited) get
zero animation (U3 rule 17).

## Verification

Every effect: Playwright recording at 390+1440, plus interrupted-gesture capture for sheet.
RM pass = every state reachable without motion. File artifacts under qc/shots/<sha>/motion/.
