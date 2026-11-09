# MOTION-PALETTE — the only motions allowed in the product

Derived from research/55-motion.md registry + craft skill §2. If a motion isn't listed here, it doesn't ship. Implementation details live in the research file; this is the design contract.

## The cast (12 motions, that's all)

| # | Motion | Where | Duration/Easing | PRM twin |
|---|---|---|---|---|
| M1 | Price flash edge | moved odds cells | 150ms ease-out, persists as edge | static edge tint |
| M2 | Whole-value roll | odds/returns/cash-out change | 200ms ease-out, direction-aware | instant swap |
| M3 | Pick-to-ticket flight | cell → slip bar | 400ms transform-only arc, interruptible | instant appear + bump |
| M4 | Sheet rise | phone ticket/filters | 240ms spring (0.5/0.825), velocity-aware | instant open |
| M5 | Suspension band | market/leg lock | slides 150ms + amber fade | instant appear |
| M6 | Goal cascade | match boards | ≤2.5s total, 80ms stagger | instant + toast |
| M7 | Receipt glow | placed/settled | ≤3s once, soft radial | static ✓ |
| M8 | Score roll | scoreboard digits | 300ms roll | instant |
| M9 | Skeleton→content | loads | 200ms crossfade | instant |
| M10 | Tab/segment slide | tab indicators | 150ms ease-out layout anim | instant |
| M11 | Fail shake | rejected action | 150ms once, ≤6px | color cue only |
| M12 | Light sweep | masthead only | ≤8s ambient loop, pausable | static |

## Global law
- transform+opacity only (compositor); never animate width/height on grids — FLIP where layout must move
- Everything interruptible mid-flight; gesture-driven uses velocity (initialVelocity normalized)
- One Moment at a time (RHYTHM); Signals merge within 300ms
- `MotionConfig reducedMotion="user"` global; every motion has a twin — deletion is NOT a twin
- Ambient loops (M12, live-dot) ship with pause control (WCAG 2.2.2)
- The only sanctioned delay: `Placing…` 600–900ms (R-YAB-11)

## Banned forever
scroll-hijack · parallax on betting surfaces · auto-rotating carousels · confetti/particle wins · scale-bounce on taps (use opacity) · gradient shimmer on data · anything >400ms on a frequent path
