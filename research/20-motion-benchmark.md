# B10 — Motion/microinteraction benchmark + spec (wave B)

Sources: Material M3 motion, Apple HIG, Val Head *Designing Interface Animation*,
Doherty threshold, WCAG 2.3.3/2.2.2 + audit of our ~65 existing motion sites.
(web_search down — specs are stable public knowledge; live-book timings MEDIUM.)

## The rule: animation is a DATA CHANNEL, not decoration

In a sportsbook, motion encodes: direction (color/icon), availability (instant
lock), causality (fly-to-slip). Decorative motion pollutes the channel —
if nothing changed, nothing moves. Springs = things the USER moves;
timed easings = things DATA changes. Never spring a color.

## Tokens to codify (`src/lib/motion.ts`)

Durations: instant 0 · xxs 100 · xs 150 · sm 200-250 · md 280-350 · flash 900-1200
· goal 1200.
Easings: enter `[0.05,0.7,0.1,1]` · exit `[0.3,0,1,1]` · move `[0.32,0.72,0,1]`
· flash `[0.2,0.8,0.3,1]` (fast attack, long decay — the decay IS the message).
Springs (user-driven only): sheet `360/34` · micro `500/30` · badge `600/18`
(sole permitted overshoot).

## Spec table (element → trigger → treatment → PRM fallback)

| Element | Treatment | PRM |
|---|---|---|
| Odds tick | ::after tint overlay opacity 1→0 1s (compositor-only — current bg+shadow animates paint per-frame) | static tint ~2s |
| Price digits | instant swap + tnum — never tween money | same |
| Cell select | whileTap .94 + fill swap ≤100ms | same |
| Fly-to-slip (NEW) | ghost clone cell→slip rect 450ms arc + scale→.35 → badge-pop | skip flight |
| Suspension | **0ms** padlock swap + one 350ms amber pulse; ALL cells same frame, NEVER stagger (stagger = partial availability) | instant lock |
| Resume | prices restore ≤200ms; flash only on real deltas | instant |
| Goal | amber flash 1.2s → score pop → banner → 600ms → mass suspend → 8s reprice | color-only |
| Accordion | replace `<details>` w/ height 0↔auto 280ms + chevron 200ms | instant |
| Sheet | spring 360/34 + `drag="y"` dismiss | fade |
| Tab indicator | layoutId shared-element | instant |
| Route change | INSTANT (deliberate — speed>wipes in a book) | same |
| Skeleton→content | wire dead `SkeletonRows`; opacity-only 150-200ms | static swap |
| Place-bet wait | spinner + **determinate-feel bar scaleX over delay + staged labels** | static text |
| Success | pathLength draw (PRM: static check via useReducedMotion) | static |
| Fail | shake 300ms once + reason | color+text only |
| CO suspended | lock + **draining scaleX bar over known resume window** | static text |
| Follow star | fill swap + optional 150ms scale-pop | instant |
| Hero auto-advance | 6s crossfade + **visible pause control + PRM off** (WCAG 2.2.2) | manual only |

## Gaps found in current build

1. No `MotionConfig reducedMotion="user"` — all JS animation ignores PRM (CSS block
   covers keyframes only) → wrap app in main.tsx.
2. `SkeletonRows` dead code → wire it.
3. `<details>` can't animate → controlled accordion.
4. No fly-to-slip (industry differentiator).
5. `layout` prop on every OddsCell = dead measurement per tick → remove.
6. No CO countdown affordance.
7. Flash animates background-color/box-shadow → convert to opacity overlay.
8. `flashes` dict never cleared → expire entries ~1.2s.
9. Hero auto-rotate lacks pause control (WCAG fail).
10. One mount-fade on static section (`index.tsx:406`) = slop fingerprint → remove.

## Derived task highlights (§R.B10)

MotionConfig wrap; motion.ts tokens + refactor ~65 literals; flash→opacity
overlay; expire flash entries; remove OddsCell layout prop; animated accordion;
fly-to-slip; sheet drag-dismiss; place-bet progress bar + staged labels; CO
countdown bar; wire skeletons; route-transition decision documented; hero pause
control + PRM; toast TTL 2.8→4s; resume-flash scoping verify; simultaneity audit;
PRM verification pass; static-check PRM path; remove mount-fade; star scale-pop;
screen-reader parity for engine events; optimistic pending-bet ghost; codify
docs in motion.ts header (banned-slop rules: no mount fades, no staggers,
overshoot only on badge).
