# 55 — Motion spec for the Housebets entry (agent T8)

Consolidates 20-motion-benchmark, 24-cinematic-canon, 29-competitor-motion and the
motion law in `.devin/skills/housebets-craft/SKILL.md` §2 into one implementable
spec. Judge's own rule (32-judge-dna §6): *"a soft glow for under three seconds,
no confetti spam. Small enough to survive a hundred rounds, big enough to feel
like something happened."* Every number below is either cited or marked (ours).

**Verdict: the spec is nearly codified already — the gaps are (a) interruption/
velocity rules stated but not yet enforced per-effect, (b) no odds-roll variant,
(c) reduced-motion twins exist in CSS but Motion JS paths are unverified, (d)
the win-glow moment is unspecified.**

---

## 1. Duration categories (law → tokens)

Law (SKILL.md §2): *responses under 300ms; feedback 100–150ms; nothing
decorative over 400ms on a money path.* Independent canon agrees almost exactly:

| Source | Rule | Cite |
|---|---|---|
| NN/g | feedback ≈100ms; screen changes 200–300ms; >400ms "feels like a real drag"; enters longer than exits | nngroup.com/articles/animation-duration |
| Material M3 | Standard decelerate 250ms enter / accelerate 200ms exit; 16 duration tokens 50–1000ms; M3 Expressive now ships *springs* (spatial vs effects split) | m3.material.io/styles/motion/easing-and-duration |
| Kowalski | "usually shorter than 300ms"; modal <200ms w/ ease-out; pace by frequency | emilkowal.ski/ui/great-animations |
| Freiberg | "duration should not be more than 200ms for interactions to feel immediate"; scale ∝ trigger size | interfaces.rauno.me |
| Doherty | <400ms keeps flow (note: the literal "threshold" is contested — use as upper bound, not target) | Laws of UX ch.10; flashover.blog/posts/dohertys-threshold-is-a-lie |

**Categories (ours):**

| Cat | Budget | Use |
|---|---|---|
| `instant` | 0ms | suspension lock, price text swap, keyboard-initiated anything |
| `feedback` | 100–150ms | press states, toggles, selection fill, hover |
| `transition` | 200–300ms | sheet/panel/tab moves, route morphs, accordion, slip entry |
| `signal` | 350–1200ms | data-channel flashes (odds tick, suspend pulse, score flash) — the decay IS the message, so these may exceed 400ms; they are honest motion, not decoration |
| `moment` | ≤3000ms | goal cascade, win glow — judge's ceiling, plays once, never on money path input |

Decorative motion >400ms is banned on money paths (law). Off money paths
(hero, promo) the cap is still ~700ms one-shot — anything longer reads as
delay, not cinema.

## 2. Easings

Law: *enter/exit → ease-out; move/morph → ease-in-out; hover → ease; constant →
linear. Enter from scale 0.95 never 0; pressed 0.97; transform-origin at trigger.*

Concrete set (ours, matches existing index.css + M3 decelerate family):

| Token | Value | Job |
|---|---|---|
| `ease-enter` | `cubic-bezier(0.22,1,0.36,1)` | entrances; already the house curve (roll-in, reveal, vt-in, hero-cine) |
| `ease-exit` | `cubic-bezier(0.3,0,0.8,0.15)` | exits (M3 emphasized-accelerate) |
| `ease-move` | `cubic-bezier(0.2,0,0,1)` | on-screen moves/morphs (M3 standard) |
| `ease-flash` | `cubic-bezier(0.2,0.8,0.3,1)` | fast attack, long decay — existing flash curve; keep |
| `linear` | marquee ticker only | constant motion |

Springs (user-driven only — law: things the *user* moves; timed easings for
things *data* changes; never spring a color):

| Spring | Params | Job |
|---|---|---|
| sheet | ~stiffness 360 / damping 34 (≈ response 0.5s, dampingFraction ~0.9) | bet-slip sheet, overlays |
| micro | 500/30 | chip morphs, tab indicator |
| badge-pop | 600/18 — sole permitted overshoot | slip count badge (matches existing `slip-badge-pop` keyframe 0.22s) |

Apple reference values for calibration: SwiftUI `.default` = response 0.55 /
dampingFraction 1.0 (critically damped, no overshoot); `spring()` doc defaults
0.5/0.825 ≈ stiffness 157.9/damping 20.7 (vawe.dev conversion). Apple's
duration+bounce parameterization is now their universal spring vocabulary
(WWDC23 "Animate with springs").

## 3. Interruption + velocity rules

Sources: Apple `UISpringTimingParameters.initialVelocity` (velocity normalized
to distance), WWDC23 (velocity preservation on retarget is *why* springs feel
natural), WWDC17-230 (pausesOnCompletion, velocity decomposed per-axis),
Rauno §"let people interrupt", law "every animation is interruptible and
reversible mid-way; a new price supersedes the running tick".

Rules (ours, to enforce):

1. **Data supersedes animation.** A running odds-tick flash or roll interrupted
   by a newer tick restarts from the *new* value — never queue flashes, never
   coalesce two deltas into one. The last truth wins the frame.
2. **Gesture hands off velocity.** Sheet release seeds the spring with gesture
   velocity (`velocity` param on the spring, normalized per Apple: pts/s ÷
   distance). Snap target projected by position + velocity×~200ms. Flick
   threshold ~0.5px/ms (24-canon), rubber-band 0.55 past limits.
3. **Retarget preserves velocity.** Mid-flight FLIP/spring retargets keep
   current velocity as initial velocity — no stop-then-start. (Motion does
   this natively on springs; CSS-keyframe paths must be rebuilt, not reversed.)
4. **Every interruptible effect also cancels.** Sheet drag can cancel mid-
   gesture back to closed; route morphs under a second nav skip to the new
   state; pending "placing" state tears down on blur/tab-hide/sheet-close
   (judge's teardown matrix — 32-judge-dna).
5. **Keyboard-initiated actions never animate** (law) — ArrowUp/Down sheet
   snaps are instant under this rule even for no-preference users.
6. **FLIP discipline** (movin.design, nan.fyi): animate transform+opacity only;
   counter-scale children of scaled containers; text-heavy shared elements
   crossfade contents while the container transforms. Never FLIP inside the
   odds grid — no `layout` prop on OddsCell (dead measurement per tick,
   20-benchmark gap #5).

## 4. Reduced-motion twins + vestibular safety

WCAG anchors (w3.org C39, WCAG22 2.2.2, 2.3.3; MDN prefers-reduced-motion;
ta11y.org, web.dev/learn/accessibility/motion):

- 2.2.2 (A): auto-moving/blinking/scrolling >5s in parallel with content →
  must have pause/stop/hide. **Hits our ticker marquee + live-pulse dot.**
- 2.3.3 (AAA): non-essential interaction-triggered motion → can disable.
- Flash ≤3/second (2.3.1) — our flashes are single-shot, fine.
- Vestibular triggers are *scaling/panning large objects, parallax, scroll-
  linked motion* — opacity/color/dissolve are safe substitutes (MDN).

Twin table (effect → PRM twin). Existing CSS `prefers-reduced-motion` block
collapses keyframes to 0.01ms — correct pattern, but twins must still *convey
the same state*, so prefer a static/color change over deletion:

| Effect | PRM twin |
|---|---|
| odds tick flash | static tint held ~2s + direction caret (no flash) |
| odds roll (if shipped) | instant swap + caret |
| pick-to-ticket | cell state + badge appear instantly; no flight |
| suspension | same — already 0ms |
| goal cascade | color-only score update + banner text |
| win glow | static tinted state, no glow animation |
| sheet | fade 150ms (no spring, no drag-follow? — drag still follows finger: it's essential, user-driven) |
| route morph | resolver returns `false` → instant swap |
| view() reveals | content just present (never `opacity:0` initial) |
| skeleton shimmer | static skeleton, fade to content 150ms |
| ticker marquee | static strip, or pause control |
| live-pulse dot | static dot |

Non-negotiables:
- `MotionConfig reducedMotion="user"` wraps the app — without it every JS
  animation ignores PRM (20-benchmark gap #1; verify actually landed).
- Scope `::view-transition-* { animation: none }` under reduce — done
  (index.css:388-393).
- Never gate *information* behind motion: suspension, price, receipt must be
  identical state under reduce, just non-moving.
- Looping animations pause offscreen (Freiberg) — live-pulse/ticker off via IO.
- User-facing "odds animation" toggle in settings (Action Network precedent —
  ships exactly this toggle; awsomee buckets PRM users separately).

## 5. Banned list (law + canon, consolidated)

On **money paths** (odds cells, stake, returns, balance, slip mechanics,
settle): parallax · scroll-jacking/smooth-scroll libs · WebGL · particles ·
confetti · springs on color · per-digit odometer rolls · mount fades ·
staggers on state changes · ambient looping decoration · flashes on mount/
re-render (honest-delta only) · layout-shift-producing animation.

Everywhere: custom cursor · autoplay video hero · scale-from-0 entrances ·
uniform 150ms-everything · fade-up-on-everything · marquee >40px/s without
pause control · text stagger inside scanned content (odds grids, market
names, slip rows).

## 6. Cinematic canon → sportsbook fit (what's allowed and where)

The exact X/Twitter thread Mohan referenced is **UNKNOWN** (X content is
poorly indexed; the C1 brief only says "X-post genre teardown"). Closest
current canon opened: dappasol.com/guides/cinematic-website-examples (Igloo
Inc, Active Theory, Lusion — "a film you direct with your scroll"),
KOTA coolest-websites list, Awwwards Elements cinematic pages (EAST 64
end-credits transitions, CA Film Creatives scroll-driven transition, Box
Office chapter title cards), scrolltide.co library.

Distilled genre vocabulary and where it may live:

| Technique | Sportsbook home |
|---|---|
| Scroll choreography (`view()` reveals, sticky) | promo/featured surfaces, sticky market headers, pinned live rows — NEVER odds rows or LCP |
| Mask/clip reveals (letterbox, wipe) | ONE hero featured-match moment (existing `hero-cine` 0.7s) + featured-card hover; same-shape clip functions only |
| Kinetic type (line-mask stagger) | hero headline, empty states, "GOAL"/"FULL TIME" labels — once, never on scroll-back, never in scanned content |
| Route morphs (shared-element VT) | event card → match hero/title; slip pill → slip; direction-aware slides ≤300ms — highest-value move, ~0 bytes, Baseline |
| Marquee | live-results ticker only — native to genre |
| Scrub/pin (GSAP) | at most ONE pinned hero scene, off money paths, `matchMedia`-gated |
| Grain/vignette | 2–4% static grain on hero — then done |

## 7. Per-effect registry (proposed)

| # | Effect | Trigger | Duration + easing | Interruption | PRM twin | Status in build |
|---|---|---|---|---|---|---|
| 1 | **Odds tick flash** | genuine feed delta only | 1s `ease-flash` ::after opacity overlay (not bg/paint — 20-benchmark #7) | new tick restarts; never queues | static tint 2s + caret | exists (`.flash-up/down` 1s) but animates bg+shadow → port to opacity overlay; expire dict ~1.2s |
| 2 | **Odds roll (direction-aware)** | same as flash, behind flag+setting | 380ms `ease-enter`, whole-value roll (per-change unit — awsomee: per-digit is wrong for 2.10→3.40), direction = roll direction | same as 1 | instant swap + caret | NOT built — propose behind `odds-roll` flag + settings toggle |
| 3 | **Pick-to-ticket** (triple feedback) | odds cell tap | cell whileTap 0.97 (100ms) + fill swap ≤100ms + badge-pop spring 600/18 + row slide-in ~250ms — all simultaneous | re-tap deselects instantly mid-flight | instant cell+badge | partial: press + badge-pop exist; no fly-to-slip (industry-standard is triple-feedback w/o flight — 29-motion; fly optional, ghost-clone 450ms max, skip under PRM) |
| 4 | **Suspension** | feed suspend | **0ms** lock+grey same render; one 350ms `suspend-pulse` allowed; ALL cells same frame, never stagger | n/a — instant | identical | exists (`.suspend-in` 0.35s) — verify same-frame integrity across all cells |
| 5 | **Goal cascade** | engine goal event | score-flash 1.2s → score roll 380ms → banner ≤600ms → mass suspend → reprice; total under 3s per judge | new goal/suspend supersedes | color-only + text | partial: score-flash + roll-in exist; verify cascade ordering + total ≤3s |
| 6 | **Receipt / win glow** | bet placed / settled win | placed: check-draw pathLength ~400ms + ref copy; **win: soft glow <3s, no confetti** (judge verbatim); loss: quiet static | new state supersedes | static check / static tint | UNKNOWN — verify exists; glow must be specified, not improvised |
| 7 | **Sheet drag** (mobile slip) | touch drag | follows finger 1:1; release → velocity-seeded spring 360/34; momentum snap pos+v×200ms; rubber-band 0.55; flick ~0.5px/ms; keyboard handle instant | cancel back to closed mid-gesture; tears down on blur/tab-hide | fade 150ms; drag-follow stays (essential) | UNKNOWN — verify `drag="y"` + velocity param wired |
| 8 | **Route morph** | router nav | VT: out 160ms ease-out + in 220ms `ease-enter` (existing); direction-aware slide ≤300ms if added; shared-element: event-card→match hero only | second nav skips to latest | resolver `false` → instant | exists root-morph; shared-element event→match is the proposed upgrade |
| 9 | **Skeleton→content** | data ready | real-markup skeleton + shimmer 1.4s L→R (existing); content swap opacity 150–200ms; `aria-busy`/`role=status` | data mid-shimmer just swaps | static skeleton → 150ms fade | shimmer exists; verify swap is opacity-only, no re-layout |
| 10 | **Live dot** | live badge | 1.4s ease-in-out pulse — the only permitted ambient loop | — | static dot | exists; add IO pause offscreen |
| 11 | **Ticker** | results strip | CSS marquee ≤40px/s, pause on hover/focus, aria-hidden dup | — | static | UNKNOWN — verify pause control (WCAG 2.2.2) |
| 12 | **Fail shake** | rejected bet | 300ms once + reason text | — | color+text | exists (`.fail-shake` 0.3s) |
| 13 | **Hero cinematic** | mount/`view()` | letterbox 0.7s `ease-enter` once — then static forever | skip on repeat nav | content present | exists (`hero-cine`) — verify no `opacity:0`-initial LCP regression |
| 14 | **Accordion/details** | tap | height 0↔auto 280ms `ease-move` + chevron 200ms | mid-way retarget keeps velocity | instant | verify `<details>` replaced (can't animate natively) |

## 8. DERIVED ASK PROPOSALS (→ qc/ASKS.md; not appended by this agent)

1. Port odds flash from `background-color`/`box-shadow` keyframes to a
   compositor-only `::after` opacity overlay; add rAF-batched feed→flash path.
2. Expire flash-state dict entries ~1.2s so flashes never fire on remount.
3. Direction-aware odds roll: whole-value roll, `ease-enter` ~380ms, behind
   `odds-roll` flag + user "Odds animation" setting (Action Network pattern);
   PRM → instant swap.
4. Honest-flash audit: prove flashes never fire on mount/re-render — genuine
   deltas only (regulatory dark-pattern line, vp0).
5. Suspension same-frame integrity test: every cell locks in the render the
   feed says suspended; assert no stagger, no transition delay.
6. Goal cascade timing audit: score-flash→roll→banner→mass-suspend chain
   completes <3s end-to-end; new events supersede mid-cascade.
7. Win-receipt glow spec: single soft glow <3s, zero confetti/particles;
   loss receipt static; placed receipt = check-draw ≤400ms + copyable ref.
8. Sheet physics: `drag="y"` 1:1, release velocity into spring 360/34,
   momentum snap (pos + v×200ms), rubber-band 0.55, flick 0.5px/ms, keyboard
   ArrowUp/Down instant snaps.
9. Placement teardown matrix (judge verbatim): "placing" state cancels on
   blur, visibilitychange, sheet-close, route-change, rejected bet — test each.
10. `MotionConfig reducedMotion="user"` at root; verify every Motion/JS
    animation honors it (Playwright under `reduce`).
11. Shared-element VT: event-card→match hero/title morph (`view-transition-name`),
    unique-name rule (one per pair — Chrome docs); remove name on return nav;
    odds grid excluded.
12. Direction-aware route slides ≤300ms for forward/back nav typing.
13. Live-dot + ticker pause when offscreen via IntersectionObserver; ticker
    pause-on-hover/focus control (WCAG 2.2.2).
14. Skeleton = real row markup + `is-loading`; opacity-only swap 150–200ms;
    `aria-busy` + `role="status"`.
15. Interruption test suite: new-tick-supersedes-tick; sheet cancel
    mid-gesture; nav-during-morph; retarget preserves velocity (springs only).
16. Replace `<details>` accordions with controlled 0↔auto height 280ms.
17. Remove any `layout`/`layoutId` on OddsCell; FLIP only for chip→slip and
    in-list reorders.
18. LCP guard: zero `opacity:0`-initial on above-fold content; all `view()`
    reveals behind `@supports` + `no-preference` + non-money-path only.
19. Motion token codification: durations {0/100-150/200-300/350-1200/≤3000} +
    easings {enter/exit/move/flash} + springs {sheet 360/34, micro 500/30,
    badge 600/18} into `src/lib/motion.ts`; refactor literal ms values in
    index.css to vars (audit the ~14 keyframes present).
20. Overshoot audit: only `badge-pop` may overshoot (600/18 or the 0.22s
    keyframe with 1.18 peak); strip 1.56-style cubic-bezier overshoot anywhere
    else.
21. Settings: "Odds animation" toggle (off/flash/roll tri-state) + persist.
22. Screen-reader parity: engine events (suspend, goal, price, receipt)
    announced once via live region — not per animated frame/digit.
23. No mount-fades/no staggers lint rule for money-path components
    (self-rejection feed into qc/BUGS.md).
24. Hero `hero-cine` once-per-session guard; disable under repeat nav;
    confirm never blocks LCP.

## 9. Citations (opened this session)

- m3.material.io/styles/motion/easing-and-duration (+ /tokens-specs;
  material-web _md-sys-motion.scss token dump)
- emilkowal.ski/ui/great-animations · emilkowal.ski/ui/agents-with-taste ·
  github.com/emilkowalski/skills (emil-design-eng, review-animations,
  remove-animations — direct model for our SKILL.md pattern)
- interfaces.rauno.me (Web Interface Guidelines, Motion §) ·
  rauno.me/craft/interaction-design
- developer.apple.com/…/uispringtimingparameters/initialvelocity ·
  WWDC23 "Animate with springs" · WWDC17-230 notes (UIViewPropertyAnimator) ·
  SwiftUI Spring docs · vawe.dev/springs/swiftui-spring (param conversion)
- w3.org/WAI/WCAG22/Techniques/css/C39 · MDN prefers-reduced-motion ·
  ta11y.org motion-and-animation · web.dev/learn/accessibility/motion ·
  a11y-examples.com reduced-motion
- css-tricks.com/animating-layouts-with-the-flip-technique ·
  movin.design/blog/shared-element-transitions · nan.fyi/magic-motion
- developer.chrome.com same-document-transitions · web.dev view-transitions-
  spas · MDN View_Transition_API/Using · nextjs.org view-transitions guide
- awsomee.com/cases/rolling-the-odds (FULL FETCH — per-change not per-digit,
  flag+A/B, PRM-bucketed, honest latency labels, 5KB→40KB correction)
- gromontova.com/projects/bwin (arrows-in-button beat numeric alone) ·
  actionnetworkhq.zendesk.com odds-change-animation toggle ·
  vp0.com bet365-odds journal (same-frame suspension = "integrity moment") ·
  github.com/omexit/claude-skills-pack igaming-design-patterns.md
- vocab.design/count-up-animation · tactileui.dev animated-number-counters-
  compared · design.solhun.com/en/motion/odometer · animationpatterns.art
  number-counter-odometer (fixed-slot, tabular, final-value-once to SRs)
- nngroup.com/articles/animation-duration · Laws of UX ch.10 (Doherty) ·
  flashover.blog Doherty's-threshold-is-a-lie (counterpoint — bound, not target)
- dappasol.com/guides/cinematic-website-examples · kota.co.uk coolest
  websites · awwwards.com/inspiration cinematic Elements (EAST 64, CA Film,
  Box Office) · scrolltide.co

## 10. UNKNOWN / blocked

- The specific "cinematic websites" X/Twitter thread Mohan referenced — X is
  not indexed well enough to recover it; closest current canon substituted (§6).
  Parent action: ask Mohan for the thread URL if the genre teardown needs
  refreshing.
- Current build verification for: fly-to-slip, sheet velocity param, receipt
  glow, ticker pause control, MotionConfig landing — flagged UNKNOWN in the
  registry; needs a source pass by the implementing agent.
- Exact Motion library version/spring param names in package.json (not read).
