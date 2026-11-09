# 72 — Craft canon: the OTHER masters (Housebets sportsbook)

Scope: everything beyond Rauno Freiberg + Emil Kowalski (already covered in 20/24/55).
Method: real pages opened via webfetch; searches cross-checked. UNKNOWN marked.
Complements 55-motion.md (NN/g, Material, Kowalski durations) and 57-how-pros-work.md (crit rituals) — minimal overlap, this file is law + signals, not process.

## Sources opened

| URL | What it is |
|---|---|
| benji.org/family-values | Benji Taylor's ~4k-word essay on how Family (iOS wallet) was designed — trays, morphs, delight. OPENED (partial: cut at delight section) |
| raw.githubusercontent.com/raphaelsalaja/skills/main/skills/motion/SKILL.md | Salaja's house motion law — exact curves, durations, gesture physics. OPENED full |
| raw.githubusercontent.com/raphaelsalaja/skills/main/skills/defaults/SKILL.md | Salaja's interface defaults — hit areas, shadows, loading, forms, numbers. OPENED full |
| raphaelsalaja.com + warp.co/blog/rise-of-design-engineering | Salaja (design eng at Warp, ex-Family/Avara): "details most people never notice but always feel." OPENED |
| karrisaarinen.com/posts/why-is-quality-so-rare/ | Linear CEO Config 2025 keynote on craft. OPENED full |
| figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out/ | Karri's 10 craft rules. OPENED full |
| linear.app/method + /method/manage-design-projects | Linear Method — design project practice. OPENED |
| vercel.com/geist/colors + /typography (+ glenn.me/vercel) | Geist system rationale: 10-step scale semantics, type bundles, icon grid. OPENED |
| developer.apple.com/design/human-interface-guidelines/motion (.md) | HIG motion — purpose, gesture-following, brevity, cancelability. OPENED full |
| lickability.com/blog/apple-sports/ | Design critique of Apple Sports — vibrancy, width-axis score type, cloth motion bg. OPENED |
| aymanjaddaa.com/work/apple-sports | Apple Sports designer: principles = speed, simplicity, personalization; one source → many surfaces. OPENED |
| dezzayn.com/apps/fotmob | FotMob density/rating-chip/momentum-graph breakdown. OPENED |
| uxsnaps.com/soccer-match-details | FotMob match screen lessons: countdown-not-0–0, color restraint. OPENED |
| ixd.prattsi.org/2026/09/design-critique-sofascore-ios-app/ | Sofascore critique = anti-pattern catalog. OPENED |
| yuinchien.com/p/stripe-press + earnaspot.com/spot/stripe-press + whatthefrontend.com/sites/stripe-press/ | Stripe Press 3D shelf — spectacle on product, not chrome. OPENED |
| devblogs.sh/posts/to-design-and-develop-an-interactive-globe | Stripe globe: 60fps over fidelity, fewer dots. OPENED (summary) |
| stripe.dev/blog/harbor-stripes-ai-assisted-prototyping-tool | Prototype in real DS w/ real data; shipped animation ≈ prototype. OPENED |
| dappasol.com/guides/cinematic-website-examples/ | Cinematic-websites genre: Igloo Inc, Lusion, Active Theory as benchmarks. OPENED |
| linkedin.com/posts/tylerawalters…design-review | Tyler Walters' review order: focus order first, contrast = typo-level. OPENED via search capture |
| writeupcafe.com/when-interaction-design-becomes-a-technical-problem | "Feel" is emergent system property — state/interruption/reversibility questions. OPENED |
| mejba.me/blog/claude-code-ui-designer | impeccable-skill review: "contrast is measured, not assumed" (brand green was 1.9:1). OPENED |
| interfaces.pro | UNKNOWN — fetch failed (site unreachable/JS-gated) |
| userinterface.wiki | UNKNOWN (partial) — homepage shell only; rule content is JS-rendered. Skills repo (above) carries the same law |

## Rules by master (concrete, checkable)

### Benji Taylor / Family
- Consecutive overlays must **vary in height** so progression is unmistakable — rewrite content if two trays would be same height.
- One piece of content OR one primary action per sheet. Never more.
- Transient actions (confirm, warn, approve) = overlay trays that **preserve context**; they unfold *from* the element that spawned them. Full-screen is for permanent destinations.
- Tray theme adapts to the flow's context (dark flow → darker tray).
- Navigation motion is **directional**: tap a left tab → content moves left. "We fly instead of teleport."
- Consequential label changes **morph text**, animating shared letters (Continue→Confirm, "Con" persists). Never instant-swap on a money step.
- A component that persists across a transition must **stay visually constant** — never re-enter/re-duplicate. Applies to empty-state copy: change only the words that changed.
- Result elements **travel to where they now live**: spinner morphs into the tab holding the pending transaction; speed-up spinner returns to the original tray.
- Every animation must have an architectural answer (how/why A→B); the app holds "unbreakable physical rules."
- Delight = **selective emphasis**: sprinkle where surprise multiplies (rare flows get *more* intensity, not less); but polish is uniform everywhere — "a fancy restaurant with a dirty bathroom" fails the whole.

### Karri Saarinen / Linear
- Spec is the **baseline**, never the finish line; put in more care than necessary.
- Reduce scope to raise quality: build a part exceptionally well, not the whole adequately.
- Design opinionated — for someone specific; flexible-generic is a weak position.
- Quality ≠ perfection: every *detail correct* before public release; rough is for internal/beta only. Linear's bar: MVPs internal-only, bugs fixed ≤7 days.
- Intuition + users over A/B data; "you must surprise users" — data can't tell you how.
- Process law: verify the problem before designing (users' requested X ≠ problem Y); explore freely without feasibility judgment; alternate feedback asks between overall-design and specific-detail (people can't do both at once); engineers in the room before direction locks.

### Raphaël Salaja (motion + defaults house skills)
Motion — exact:
- Anything user-started **≤300ms** (panel/drawer ≤400ms). Press/hover 120–180ms; small state 180–260ms; **closes faster than opens**; hover color **instant (0ms)**.
- Curves: enter/exit `cubic-bezier(0.23,1,0.32,1)`; on-screen movement `cubic-bezier(0.77,0,0.175,1)`; bare `ease-out` too weak; `linear` for progress/clocks only.
- Page/panel/loading chrome **fades opacity only** — no slide/scale; animate only the axis that changes; never `transition: all`.
- Entrances **never replay** on route return; cached views render instantly (no skeleton flash).
- Toggled states use transitions/springs (retarget on reversal); keyframes only for run-once sequences.
- `transform-origin` = the trigger's edge; entrances start ≥`scale(0.95)` + `opacity:0`, **never from 0**.
- Gestures = springs fed pointer velocity; flick-dismiss threshold ≈**0.11px/ms**; edges give growing friction, not walls; every gesture has a click + keyboard twin.
- Frequent actions don't animate: typing, hotkeys, command palette (instant), context menu (instant in, may fade out).
- Tooltip group: first waits, neighbors open instantly, all close instantly.
- Icon swap = cross-fade (scale 0.25→1, blur 4→0px); a cross-fade reading as two objects gets `blur(2px)` bridge; blur <20px (Safari cost).
- Press scale **0.98**; squash bounds 0.95–1.05; list stagger <50ms; staged hero entrance 100ms; routine interactions never stagger.
- Reduced motion ⇒ opacity cross-fade only; size animations measure an inner element, animate the outer; collapsing panel content keeps its open width.
Defaults — exact:
- Hit target ≥**24px** short side; aim 40px pointer/**44px touch**; pseudo-element carries expanded area; expanded hit areas **never overlap**.
- Scroll containers fade ends (`mask-image`), never hard-cut; pad scrollers so child shadows aren't clipped; `overscroll-behavior: contain` on overlays.
- Sticky chrome gets a 1px border + `scroll-padding-block-start` = its height.
- Floating surface = translucent 1px ring inside shadow stack (not opaque border); keep 1px transparent border for forced-colors mode.
- Shadows: 3 layers, blur grows/opacity falls, one direction; hover-raise via pseudo-element fade — never transition `box-shadow`.
- Content images: 1px inset outline @10% (black light mode / white dark).
- No nested cards; radius token not `9999px` pills; **no decorative glows/gradients**.
- `:focus-visible` only; dialog traps + returns focus to trigger; never stack dialogs.
- `tabular-nums` on all numbers/counters/timers; `text-wrap: balance` headings, `pretty` body; numbers/amounts/dates **never truncate**; filenames middle-truncate.
- Loading: respond ≤400ms or optimistic/skeleton; hold spinner back **150–300ms**, keep ≥300–500ms once shown; skeleton matches the layout it stands in for.
- Busy button keeps label + indicator + disables; destructive = undo or in-place confirm.
- Status never color alone (icon or word pair); `role="status"` for toasts/counts.
- State in URL (filters, tabs, pagination, open panels); links are `<a href>`.
- Controls `user-select:none`; `touch-action:manipulation`; tap-highlight transparent + real `:active`; hover styles inside `@media(hover:hover)`; `100dvh`/`svh` + `env(safe-area-inset-*)`; inputs ≥16px iOS + correct inputmode/autocomplete; Enter submits; accept messy pasted input.
- Sound: confirmations/must-not-miss errors only, always with a visual twin, volume 0.3 default, user off-switch.
- Method itself: every rule is a **pair** — the broken line + the line that replaces it; findings as `file:line - [rule-id]`.
- Warp talk: design engineer = the person who fills "the gap where quality goes to die"; leave no gaps, everything at 110%.

### Vercel Geist
- 10-step color scales with **fixed semantic jobs**: 100 default bg → 200 hover → 300 active → 400 border → 500 hover border → 600 active border → 700 high-contrast bg → 800 hover hc → 900 secondary text/icons → 1000 primary text/icons.
- Exactly **2 page backgrounds**; Background 2 sparingly.
- Draw each border once — overlapping alpha borders make intersections double-dark; shadows translucent (opaque = gray halo); gray-*alpha* only where bg must show through.
- Type ships as **bundles** (size+line-height+tracking+weight) named by job; mono pairs one step down (label-13-mono with label-14); tabular numerals for number-bearing labels.
- Icons: 16×16 grid, 1.5pt stroke, hard caps, consistent angles (per glenn.me/vercel).

### Apple HIG — motion
- Motion must have purpose; never the **sole channel** for important info (pair visual+haptic/audio).
- Feedback motion follows the gesture's axis/expectation: reveal-by-slide-down ⇒ dismiss on the same axis.
- Brief + precise beats prominent; avoid animating frequent interactions; let users **cancel/skip** — never make them wait out an animation.
- (visionOS law, transferable): avoid peripheral-vision motion; use fades to relocate objects; avoid sustained ~0.2Hz oscillation; keep movement inside a stationary frame of reference.

### Stripe
- Spend spectacle on the **product**, not the transitions: real-time 3D books rotate spine→cover on scrubbed scroll; everything else is quiet serif + museum-label spacing, zero chrome breaking the spell.
- Globe: render *fewer* elements to hold 60fps (dot count cut, AA off) — frame budget outranks fidelity; design+engineering prototype together early.
- Harbor: prototype inside the real design system with real data — shipped animation carried "nearly one-for-one" from prototype; the prototype is the review artifact.

### Cinematic-websites genre
- Igloo Inc: **total commitment** — no normal page hiding underneath; loading, nav, story all live in one continuous scene.
- Lusion: physics + playfulness; "responds to you like a game" — cinematic ≠ slow or self-serious.
- Grade the whole surface as one art direction: light, grain, type.

### Review/engineering craft
- Walters: review **focus order before visual hierarchy**; treat contrast like a typo — 4.5:1 has no "close enough"; ask specific scenarios ("what does a screen reader hear first on this card?"); automated tools catch ~30% only.
- WriteUpCafe: "feel" is an **emergent system property** — continuous feedback needs real-time state, instant response needs perf budgets, forgiveness needs reversible architecture. Ask of every interaction: what state does it create? what if interrupted? what must be reversible? what must stay fast?
- Mejba (impeccable skill review): direction-pass then critic-pass; tokens before templates; "contrast is measured, not assumed" (his own brand green measured 1.9:1).

## "Designed not generated" signals (what makes a judge believe authorship)

1. **One encoding learned once, reused everywhere** — FotMob rating chip, Geist's fixed 100–1000 scale jobs. Generated work varies its encodings; authored work has a thesis.
2. **Visible restraint** — removed glows, no pill buttons, color only where meaningful (Salaja "no decoration", FotMob neutrals). Generation adds; authorship deletes.
3. **One strong idea executed totally** — Igloo's world-is-the-site, Stripe Press's shelf, Family's everything-morphs. Judges spot a single governing metaphor vs. a pile of nice parts.
4. **Care in unseen places** — polish uniform in rare flows (Family's "dirty bathroom"); details nobody notices but everyone feels (Salaja/Warp). Empty states, error rows, the 47th market cell.
5. **Physical coherence** — unbreakable spatial rules: things originate from triggers, results travel to where they live, same axis in and out. Generated UI teleports.
6. **Measured, not assumed** — computed contrast, exact durations/curves, tabular numerals, type bundles. Authorship is checkable numbers, not vibes.
7. **Authored surprise** — selective emphasis, easter eggs, a signature transformation nobody asked for (Karri: "you must surprise users"; Family delight-intensity varies).
8. **Copy that mutates only what changed** — shared-letter morphs, stable phrases in updating states (Family). Generated UI re-renders whole sentences.
9. **Survives stress data** — columns aligned at 200% text (Apple Sports), longest-real-value testing, middle-truncation. Generation assumes average content.
10. **Opinion over option** — designed for someone specific (Karri); the flexible-generic "kind of good" is the generated smell.

## Live-score craft notes (Apple Sports / FotMob / Sofascore)

- **Score numerals use the font width axis** — bold + *condensed* digits glance faster (Apple Sports, Lickability-observed). Pair with tabular-nums.
- **Vibrancy for secondary text** — stacked fills + blend modes let the background bleed through labels; not flat 60% opacity (Lickability).
- **Chrome responds physically** — nav bar stretches on over-scroll, squishes when collapsed (Apple Sports).
- **Data apps need living surfaces** — Apple Sports' ambient gradient (±10% shift) + shimmer + warped cloth texture keeps static data from feeling dead. Keep amplitude low; honor reduced motion.
- **Pinned minimal header, depth in tabs** — crests + numbers + minute pinned; stats/lineup/table each get a full swipeable pane (FotMob).
- **Density from rhythm+grouping, never smaller type** (FotMob).
- **Chips not table columns** — 2-digit rating in a small colored rounded square; graded color scale (red→green→blue=exceptional) reused on every surface.
- **Momentum graph** — mirrored bars up/down from center axis on a timeline, goals annotated inline; 90min readable <1s.
- **Pre-match ≠ 0–0** — show start time + countdown (FotMob/uxsnaps).
- **Yesterday/Today/Upcoming** is the mental model; follow-first feeds float followed teams; collapsible league groups (Apple Sports, FotMob).
- **One match → many surfaces** — same source rendered per surface from full hub to lock-screen glance (Apple Sports designer).
- **Zero-onboarding value** — real games visible before any setup (Apple Sports).
- **Anti-patterns (Sofascore critique)**: unordered score grid, ads interspersed among scores, unlabeled icon rows — clutter reads as uncared-for, which reads as untrustworthy for money.

## Derived rules for our build

| # | Rule | Source | Surface |
|---|---|---|---|
| 1 | Odds change = cross-fade with `blur(2px)` bridge + directional tint flash ≤260ms; never instant-swap | Salaja + Family | odds cell |
| 2 | Score/odds numerals: tabular-nums + condensed-width display cut | Apple Sports + Salaja | score header, odds cell |
| 3 | ONE movement encoding (up-tint/down-tint) reused identically on cells, slip, match page | FotMob chip | all odds surfaces |
| 4 | User-started motion ≤300ms; slip/sheet ≤400ms; closes faster than opens | Salaja | motion global |
| 5 | Enter/exit `cubic-bezier(0.23,1,0.32,1)`; moving elements `cubic-bezier(0.77,0,0.175,1)`; linear only on clocks/progress | Salaja | motion global |
| 6 | Slip = tray emerging from the tapped cell (transform-origin at trigger), overlay not route; consecutive sheets differ in height | Family + Salaja | slip |
| 7 | Placed-bet indicator travels to Open Bets tab (element flies to where result lives) | Family | slip→open bets |
| 8 | Entrances start ≥scale(0.95)+opacity 0, never 0; page/panel chrome fades only | Salaja | panels, routes |
| 9 | Match page: pinned minimal header (crests, score, minute); depth in swipeable tabs | FotMob/Apple Sports | match page |
| 10 | Pre-match shows kickoff time + countdown, never 0–0 | FotMob | match card |
| 11 | Density via vertical rhythm + grouping; never shrink type; no nested cards | FotMob + Salaja | markets, match page |
| 12 | Low-amplitude ambient motion behind live headers (gradient shift/shimmer); data screens must not feel dead; cross-fade under reduced motion | Apple Sports + Family | live match surfaces |
| 13 | LIVE/odds-frozen states never color alone — word + icon/pulse | Salaja | match cards, cells |
| 14 | Loading: optimistic first; skeleton only after 150–300ms, held ≥300–500ms, shaped like target layout | Salaja | odds refresh, slip |
| 15 | Hit targets ≥24px (44px touch); pseudo-element expands small glyphs; expanded areas never overlap | Salaja | odds cell, tabs |
| 16 | Every tappable: real `:active` (scale ≤0.98), tap-highlight transparent, touch-action:manipulation | Salaja | all touch surfaces |
| 17 | Rapid-repeat actions (quick-add, qty steppers, hotkeys) get NO animation | Salaja + Apple HIG | odds cell, slip |
| 18 | Reduced motion = opacity cross-fade incl. odds ticks, live pulse, slip travel | Salaja + HIG | a11y motion |
| 19 | Remove-selection/cash-out: undo or in-place confirm; never dialog-on-dialog | Salaja | slip, cash out |
| 20 | Busy stake button keeps label + adds indicator + disables; result in `role="status"` | Salaja | slip |
| 21 | Numbers/amounts/dates never truncate; long team names middle-truncate w/ expand path | Salaja | match rows |
| 22 | Market tab, slip state, filters live in URL — refresh/share-safe | Salaja | nav, slip |
| 23 | ONE signature magician move, authored + rare (e.g., selection flies to slip along a curved path); everything else disciplined | Family + Karri + Igloo | signature moment |
| 24 | UI copy: Title Case, short, one-line descriptions, no em dashes | Salaja /copy | all text |
| 25 | Review order: focus order & 4.5:1 contrast before visual polish; measured not assumed | Walters + Mejba | pre-ship QA |
