# Design Principles — Housebets v2

Six principles. Every element card cites at least one. Counter-examples are what v0.2/current build
did wrong — each is a rejection we already made.

## P1 — The price is the product
Odds, stakes, returns, scores, clocks are the content; chrome serves them. Tabular Oxanium numerals,
fixed-width cells, implied probability beside every price, numbers never truncate or shift layout.
- Example: odds cell renders `1.30 · 77%` — price and honesty in one glance.
- Counter-example: old build treated prices as decoration inside generic cards.

## P2 — Never surprise a player's money
Every money-affecting change is announced in-frame with reason and consent affordance: moved odds
ask (default: accept better only), suspension locks with reason same-frame, cash-out re-confirms
on value change, receipt shows accepted odds + ref. (U1 #1 pain, U4 evidence.)
- Example: `1.80 → 2.05` strikethrough + amber edge + Accept/Decline.
- Counter-example: silent re-fetch that swaps a price under the Place button.

## P3 — Calm is the brand
Housebets' neon is a voice, not a shout: pale-cyan fills do the acting (CTAs, selected), neon cyan
is reserved for text/glow accents. ≤4 simultaneous motions per viewport; ambient dims while staking.
- Example: suspension = amber reason chip; no pulsing anywhere near money.
- Counter-example: cyan glow on every interactive element (the AI fingerprint we're scrapping).

## P4 — Respond to the hand, respect the exit
Gestures follow the finger live; release velocity decides; everything interruptible; closes are
faster than opens; newest state wins — nothing queues. (Freiberg, U3, U5.)
- Example: slip sheet drag cancels mid-flight and settles back without penalty.
- Counter-example: modal that ignores input during its open animation.

## P5 — One thumb, one eye-path
49% one-handed / 75% thumb-driven: primary actions sit in reach; each state has ONE focal point
written in its attention map; ≤2 taps to any market; slip is reachable blind.
- Example: phone slip bar lower-third, pick name visible, sheet opens upward into the thumb arc.
- Counter-example: desktop layout stretched to phone, CTA at top edge.

## P6 — Ship-shaped, not demo-shaped
Every element exists in all its states; sample data is consistent (real overround 103–107%);
empty/error/offline/suspended are designed, not absent; a hidden /design-system route proves the
system. A Head of Design can audit the tokens and find them honored.
- Example: market suspended shows last price dimmed + reason, never a dead button.
- Counter-example: "0–0" for a match that hasn't started (U3 rule: countdown, not 0–0).
