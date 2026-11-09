# 24 — Cinematic web craft for the sportsbook (wave C1)

Subagent research brief, returned 2025-11-10. Verdict: **Motion + CSS first, GSAP/Lenis only if earned.** GSAP and Lenis are NOT installed. Film-noir ambition stays off money paths.

## Platform support (verified against caniuse/MDN, Nov 2026)

| Feature | Status | Verdict |
|---|---|---|
| `animation-timeline: scroll()`/`view()` | Baseline since 2026-10-27 (FF 159 closed it), ~89% usage | Use inside `@supports` + static fallback |
| Same-doc View Transitions | Baseline since Oct 14 2025, ~93% | Safe; types resolver can return `false` to skip |
| Cross-document VT | No Firefox yet | Irrelevant — SPA |
| `@starting-style` + `allow-discrete` | Baseline since Aug 2024 | Safe for sheet/panel entry |
| clip-path / mask / backdrop-filter / sticky / scroll-snap / IO | Long Baseline | Free (keep `-webkit-mask-image`) |
| `scroll-state()` container queries | Chromium-only ~70% | NO — use IO sentinel for stuck-styling |
| Navigation API | Baseline Jan 2026 | Available |

Posture: **CSS scroll timelines default, ScrollTrigger only where pinning/scrub is truly needed, everything behind `@supports` + `prefers-reduced-motion`.**

## Technique → surface map (distilled)

### Scroll choreography
- `view()` reveals: promo/featured surfaces only, NEVER odds rows or LCP (starting at opacity:0 delays LCP paint). ~0 JS bytes, compositor-side.
- Sticky: CSS sticky is free — sticky market-group headers, sticky slip rail, pinned live match rows (Mollybet-verified pattern: analysts pin live events so the list can update beneath).
- GSAP pin+scrub: earned only for ONE hero featured-match scene; `scrub: 0.5–0.8` numeric, `ease:'none'`, `anticipatePin:1`, disable pins below 64rem via `gsap.matchMedia`.
- Lenis (~5.4KB gz): desktop wheel only, `syncTouch:false`, conditional on fine-pointer + no-preference. Default: **skip** — smoothing inside a dense utility app fights virtualized lists.

### Mask/clip reveals
- clip-path wipes: hero media + featured-card hover only. Same shape function required (inset→inset). `fill: both` to kill first-frame flash. ≤ a few simultaneous (repaint per frame).
- **View-transition shared-element morphs = highest-value cinematic move**: event card → match page hero/title morph; slip pill → expanded slip; direction-aware route slides. 0 bytes, Baseline. Gate via types resolver returning `false` for reduced-motion + same-tab nav. Also scope `::view-transition-* { animation: none }` under reduce.
- FLIP via Motion `layout`/`layoutId`: selection chip → slip morph, in-list reorders.

### Text
- Line-mask stagger: hero headline, empty states, "GOAL"/"FULL TIME" labels only. NEVER in odds grids/market names/slip — anything scanned repeatedly renders instantly. Stagger 0.03–0.06, play once, never on scroll-back.
- Marquee: a live-results/trending ticker strip is the ONE place a marquee is native to the genre. ≤40px/s, pause on hover/focus, aria-hidden duplicate.

### Surface DO/DON'T (money rule)
- Odds cells: `tabular-nums`, fixed-width cells, green/red flash ONLY on real feed deltas <1s, suspension = immediate lock same frame. NO ambient animation, no easing on every render, no flashes on re-render, no resize (CLS).
- Direction-aware odds roll (awsomee.com A/B-verified): old rolls out, new rolls in — encodes direction pre-attentively. Behind a flag/user setting (Action Network ships exactly this toggle).
- Money paths (stake, payout, balance): dead conventional. Zero choreography.
- Slip: slide-in transform-only, `@starting-style` entry, `layoutId` chip morph, state machine per leg.
- Route transitions: typed viewTransition slide-left/right, ~250–350ms cap 400ms.
- Goal moment: ONE owned restrained effect (score-band pulse + scoreline update). Never confetti — Bashagha's note: "soft glow under three seconds, no confetti spam".
- Mobile sheet: drag-follows-finger 1:1, velocity-seeded spring on release (`animate(y, target, {type:'spring', velocity})`), momentum-projected snap (position + velocity×~200ms), rubber-band 0.55, flick threshold ~0.5–0.65px/ms, 150ms crossfade reduced-motion twin, keyboard-operable handle (ArrowUp/Down between snaps).

### WebGL
- three ~186KB gz. Skip entirely or one canvas-2D noise field. Data density + trust is the differentiator, not shaders.

## Verified references (URLs opened by the agent)
- awwwards.com/sites/optibet — BoostyMedia submission; polarized jury 1.0–9.4 (mean ≈4.6). Nominee. Agent could NOT observe rendered motion — parent action: open the page + live optibet to catalog.
- awwwards.com/sites/opticodds — Flatstudio; Odds Screen V2 designed for "market readability, reduced visual noise". Terminal-grade dark data UI is the award register.
- dribbble.com/shots/24537770 + flatstudio.co/work/mollybet — richest reference: two parallel design systems (Classic/Exchange), price-comparison slip up to 12 books, "Best Price" flag, pinned live events from observed analyst pain, +37% registrations, 981 components.
- flatstudio.co/blog/why-your-betslip-is-wrong-ux-of-a-trading-terminal — pros "execute orders", casuals "place bets".
- awsomee.com/cases/rolling-the-odds — direction-aware roll, A/B-verified.
- Action Network — user-facing "Odds Change Animation" toggle (precedent for a Housebets motion setting).
- gromontova.com/projects/bwin — arrows inside odds button beat numeric updates alone.
- murattunali.com.tr — 12/12 scenes migrated ScrollTrigger→CSS scroll timelines: vendor JS 51.1→33.5KB, zero scroll listeners, LCP 592–640→440ms. THE template.
- GSAP post-Webflow: SplitText now 100% free.

## Budget
- Motion full ~50KB gz; LazyMotion+m ≈31KB. GSAP core ~27–28KB + ScrollTrigger ~17KB + SplitText ~3.5KB. react-dom reference = 67KB.

## Anti-slop guardrails (verified)
- Unchosen gradients (indigo→violet), neutral-on-axis grays, uniform 150ms-everything, fade-up-on-everything, 3-of-everything card rows, decorative mixed-weight icons, over-easing on scrubbed motion, neon-glow dark, custom cursor, scrolljacking, autoplay video hero.
- House rule: ONE flat dark ground + #c4f4f1 accent confined to interactive/live states; one border/elevation rule; one entrance curve `cubic-bezier(0.22,1,0.36,1)` ~400–560ms + real-velocity springs; 1.5px icon weight.

## Derived tasks (append to 10-master-asks; ordered by scored-surface value)
1. `tabular-nums` + fixed min-widths on all odds cells; CLS ≤ 0.1 under live feed.
2. Odds-tick: green/red flash on genuine deltas only <1s + direction-aware roll variant behind flag + user "odds animation" setting.
3. Suspended state: immediate lock+grey, same render as feed, zero transition delay.
4. TanStack `viewTransition` typed slide-left/right; reduced-motion → resolver `false`.
5. Event card → match page shared-element morph (hero media + title only, NOT odds grid).
6. Slip panel `@starting-style` entry + `layoutId` chip→slip morph.
7. Mobile sheet physics per spec above (velocity spring, momentum snap, rubber-band 0.55, keyboard handle).
8. CSS `view()` reveals on promo surfaces only, `@supports` + `no-preference` gated.
9. Sticky market-group headers + pinned live rows (Mollybet pattern) + IO-sentinel stuck styling.
10. ONE hero cinematic: line-mask headline + letterbox clip-path grow on `view()` + 2–4% grain — then static.
11. Live-results ticker strip (CSS marquee, pause on hover/focus, aria-hidden dup).
12. Token discipline per guardrails (accent confinement, one curve, 1.5px icons).
13. LCP audit: zero `opacity:0`-initial on above-fold; reveals `@supports`-gated.
14. `LazyMotion`+`m` on grid-heavy routes if Motion shows in bundle budget.
15. Reduced-motion parity: every technique ships its twin; Playwright check under `reduce`.
16. Parent action: open the Optibet/OpticOdds award pages + live sites to catalog rendered motion (agent couldn't fetch).

UNKNOWN: exact motion inventory of the Optibet/OpticOdds live sites (unverified by direct observation).
