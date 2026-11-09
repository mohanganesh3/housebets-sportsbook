# 74 — Motion Mastery: a sportsbook-specific motion vocabulary

Lead-authored (agent U5 9b7893ef died on free-model rate limit 20:01 UTC; lead covered manually).
Fetch date: 2026-11-10 ~02:55 IST. Proposals are labelled [proposal]; sourced facts cite the URL.

## Sources actually opened

- NumberFlow for React docs — https://number-flow.barvian.me/ + npm page. Facts: dependency-free,
  accessible, `trend` prop controls digit direction (+1 always up / 0 per-digit / -1 always down);
  separate `transformTiming`, `spinTiming`, `opacityTiming` props; designed to compose with Motion
  layout animations (wrap in `motion` + `layoutRoot`); ~3.1M weekly downloads; MIT, v0.6.2.
- Material motion system — https://m2.material.io/design/motion/the-motion-system.html +
  https://m3.material.io/styles/motion/transitions/applying-transitions. Facts: four patterns —
  container transform (persistent containers, hero moments, "reserve for the right context",
  avoid in deep hierarchies), shared axis (spatial/nav relationship), fade-through (unrelated
  elements), fade (enter/exit within bounds).
- Freiberg "Invisible Details" + Kowalski "Great Animations"/"Agents with Taste" (see 25b file).
- Browser facts for SD view transitions + scroll-driven anims: research/25b (caniuse/Chrome/MDN).

## Mechanism notes by moment class

- Digit transitions: NumberFlow `trend={0}` gives per-digit direction (up-if-increased) — matches
  price changes where no overall trend is implied. For scores use `trend` +1/-1 only when the value
  actually trends. Keep opacityTiming ~150-250ms; digits spin under ~400ms.
- Shared element: Material's guidance maps to pick→ticket (a chip/odds cell is a persistent
  container — container transform is the hero pattern; use sparingly = it's dramatic).
- Interruption: Freiberg — gestures follow the finger, respect release velocity, cancel mid-flight.
- Frequency pacing: Kowalski — frequent things quiet+fast; rare moments earn personality.

## Sportsbook motion vocabulary [proposal unless cited]

| Moment | Feel | Mechanism | Interrupt / reduced-motion twin |
|---|---|---|---|
| Odds tick up/down | A price finding its new level — direction obvious, no jitter | NumberFlow `trend=0` digits + ▲/▼ glyph + edge tint decay ~1s; transform/opacity only, cell min-width fixed | New tick supersedes (never queues); RM: instant swap + glyph + tint |
| Market suspension | A shutter — honest, instant | 0ms same-frame lock glyph + reason chip + dim; no animation of the lock itself (integrity, [ours]) | Identical (no motion) |
| Resume from suspension | Market waking | Brief 150ms un-dim; prices may then tick normally | RM: instant |
| Goal scored | Cause → effect in one glance | Sequence: score digit rolls (NumberFlow trend +1) → scoreboard edge flash ~400ms → affected markets suspend same-frame → reprice ticks [proposal] | RM: score updates + one-line event text, no flash |
| Kickoff approaching | Quiet urgency, honest clock | Real countdown; tint shift at <10min; no pulsing (attention budget) | Same (no motion) |
| Bet place → receipt | The prestige — a stamp | Button morphs to receipt card (container transform, 250ms ease-out); ref appears; quiet success tint <3s total | RM: instant receipt swap |
| Place failed | Respectful | 150ms horizontal settle (one small shake ≤4px) + reason line + recovery action | RM: reason text only |
| Cash-out value | A live instrument | NumberFlow on value; changed value gets "new amount" chip + requires reconfirm (B09) | RM: instant value + chip |
| Odds-changed await-accept | Demanding attention without panic | Strikethrough old→new + amber card edge STATIC + `moved` label; NO pulse — P3 bans pulsing near money (post-crit reconcile) | RM: static card + label |
| Slip sheet open (phone) | Physical — follows the thumb | Motion drag, springs; release velocity respected; dismiss mid-flight cancels (Freiberg) | RM: 150ms fade/translate fixed |
| Pick→ticket flight | The pick travels to its home | layoutId morph cell→slip-bar chip ~300ms; ONLY on explicit add, not ticks | RM: count+1 badge |
| List rows entering | Composed, not theatrical | Stagger ≤30ms/row, fade+4px rise, first-paint only — never on live updates | RM: instant |
| Route transitions | Continuity | SD View Transition where supported (feature-detect types); fallback = Motion exit/enter 200ms | RM: instant swap |
| Empty/loading | Quiet confidence | Skeleton exact-geometry shimmer (opacity only, 1.2s loop, max 2 iterations then static) | RM: static skeleton |
| Toast | Peripheral notice | Slide+fade 200ms from top-center; aria-live; never blocks odds | RM: appear/disappear |

## Attention law [proposal, from Kowalski "pace by frequency"]

- Simultaneous motion budget: ≤4 animating elements in a viewport; live ticks are exempt by count
  but muted (tint only) while the slip has a pending stake ("calm live" S8).
- Hero motion allowed exactly once per flow peak (receipt, goal). Everything else stays under 300ms.

## Derived motion rules (checkable)

1. Odds tick = glyph + tint + digit morph, transform/opacity only, cell width fixed, ≤400ms.
2. Suspension = 0ms same-frame, always with a reason label. No lock animation.
3. New state supersedes: an interrupted animation resolves to the newest state, never queues.
4. Sheet drags follow the finger live; release velocity decides open/closed.
5. Receipts celebrate <3s; losses get respect (one reason line, a recovery action).
6. One hero transition per flow; container transform reserved for pick→ticket and receipt.
7. Lists stagger ≤30ms/row on first paint; zero enter-animation on live updates.
8. Every effect ships with its reduced-motion twin in the same commit + a video artifact in QC.
9. Money paths: nothing decorative over 400ms, zero layout shift (CLS≈0 target).
10. While a stake is pending in the open slip, ambient board motion dims (attention budget).
