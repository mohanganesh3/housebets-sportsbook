# research/25-library-frontier.md — Library & Platform Frontier (Nov 2026)

> **Stack as pinned:** `react@19.3.1`, `vite@8.3.6`, `@tanstack/react-router@1.170.46`, `motion@14.10.1`, `@base-ui/react@1.9.0`, `tailwindcss@4.3.5`, `tw-animate-css@1.4.0`, `zustand@5.1.0`, `sonner@2.0.8`, `@tanstack/react-virtual@3.14.26`. StrictMode on. GH Pages base `/housebets-sportsbook/` via `GH_PAGES`.

## 1. CSS scroll-driven animations — Baseline (Oct 27 2026)

Chrome 115+, Safari 26+, Firefox 159+. Zero JS bytes, compositor-driven. Cheapest scroll-reveal path — prefer over GSAP ScrollTrigger for fire-and-forget reveals.

**Recipes (drop into `src/index.css`):**

```css
/* a) Section/card reveal — LeagueSection, MarketCard, footer blocks */
@keyframes hb-reveal {
  from { opacity: 0; translate: 0 18px; }
  to { opacity: 1; translate: 0 0; }
}
.reveal {
  animation: hb-reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%;
}

/* b) Row stagger via per-index range offsets */
.reveal-rows > * {
  animation: hb-reveal linear both;
  animation-timeline: view();
  animation-range: entry calc(5% + var(--i, 0) * 8%) entry calc(45% + var(--i, 0) * 8%);
}

/* c) Hero parallax fade (match-page scoreboard header) */
.hero-parallax {
  animation: hb-parallax linear both;
  animation-timeline: scroll(root block);
  animation-range: 0 320px;
}
@keyframes hb-parallax { to { translate: 0 -40px; opacity: 0.25; } }

/* d) Scroll progress bar (under sticky market tabs) */
.scroll-progress {
  position: fixed; top: var(--shell-header-h); left: 0; right: 0;
  height: 2px; background: var(--color-brand-500);
  transform-origin: 0 50%; scale: 0 1;
  animation: hb-progress linear both;
  animation-timeline: scroll(root block);
}
@keyframes hb-progress { to { scale: 1 1; } }
```

**Fallback:** wrap in `@supports (animation-timeline: view())` — below baseline content just shows (correct for a data app). Gate `@media (prefers-reduced-motion: no-preference)` — scroll-driven anims ignore duration-nuking; set `animation: none` inside reduce.

## 2. View Transitions — two layers, don't mix blindly

### Layer A: TanStack Router built-in (installed 1.170.46)

`createRouter({ defaultViewTransition: { types: (info) => [...] }, scrollRestoration: true })` — types land on `<html>` as `active-view-transition-type`, styled via `html:active-view-transition-type(slide-left)::view-transition-old(root)`. Keep `::view-transition-old/new(root)` at 200ms.

### Layer B: React 19.3 `<ViewTransition>` (stable since 19.3.0)

- Fires on `startTransition`/router navs — NOT plain setState.
- Props: `name`, `default`, `enter`/`exit`/`update`/`share`/`layout` (`"auto"|"none"|<class>`).
- **Must be first child of its parent** to fire enter/exit. `default="none"` + `name` + `share="morph"` is the morph recipe.
- `flushSync` anywhere near navigation kills the transition. Never call `document.startViewTransition` manually.
- **No names on ticking elements** (OddsCell price, LiveBadge, score digits) — mutations get batched into transitions and stutter.

**Match-row → header morph:**
```tsx
<ViewTransition name={`match-${mt.id}`} default="none" share="morph">
  <div className="flex min-w-0 flex-col gap-1.5">…teams…</div>
</ViewTransition>
```
Same name on the scoreboard grid in `match.$matchId.tsx`.

**Odds-cell → slip morph: SKIP** — cell stays mounted after selection (share needs delete+insert). Use a WAAPI clone flight (~30 lines) or keep Motion `popLayout` (current).

## 3. GSAP — `gsap@3.15.1`, all plugins free (Webflow acquisition)

- Core ~27–28KB gz; +ScrollTrigger ~45KB. `useGSAP` hook via `@gsap/react` — StrictMode-safe, reverts on unmount. Never tween in bare useEffect.
- **ScrollSmoother: SKIP** — transforms #smooth-content → breaks all our `position: fixed` chrome.
- **Verdict: adopt ONLY if CSS can't express a sequence** (pinned hero scrollytelling). Lazy-load ScrollTrigger per route.

## 4. Lenis — `lenis@1.3.27` — SKIP for us

Native scroll (sticky/CSS timelines survive), respects reduced-motion since 1.3.26, BUT: main-thread wheel handling = jank under our tick churn; needs `data-lenis-prevent` on SlipSheet/SearchPalette + stop()/start() wired to `setMobileOpen`. Utility app — skip.

## 5. Motion — `motion@14.10.1` (current, keep)

`useScroll` uses native ScrollTimeline where supported (hw-accelerated). Keep for: slip layout/presence, tab layoutId, GOAL banner, springs, ticks. CSS-scroll for reveals · Motion for state/gesture/layout · ViewTransition for route morphs · GSAP only for what neither expresses.

## 6. Rive — SKIP; fake Hubie

canvas-lite ~222–373KB WASM + JS + .riv asset. Hubie needs 3–4 states (idle/cheer/console/sweat) → inline SVG + CSS keyed off `useSlip.status`/`goalFlashes`. ~0 bytes, deterministic.

## 7. New CSS baseline — recipe per feature

| Feature | Status | Recipe |
|---|---|---|
| `color-mix()` | ~95% | `color-mix(in oklch, var(--color-brand-500) 30%, transparent)` — collapse hard-coded alpha hexes |
| `oklch` relative color | ~94% | `oklch(from var(--color-brand-500) l c h / 20%)` for glows |
| `interpolate-size` | ⚠️ Chromium only | `height:0→auto` for LeagueSection collapse — @supports guard |
| scroll-state `stuck` | ⚠️ Chromium 144+ | stuck-header shadow on sticky market tabs — enhancement only |
| `text-wrap: balance` | ~94% | match header team names, EmptyState titles |
| `text-wrap: pretty` | ✅ | footer RG copy |
| `field-sizing: content` | ~88% | stake input grows with amount |
| `scrollbar-gutter` | Baseline | `html { scrollbar-gutter: stable }` — kills layout shift on sheet open |
| `@container` | Baseline 2024 | MarketCard grid by card width not viewport (correct inside 344px SidePanel) |
| `:has()` | Baseline 2024 | `MatchRow:has(.flash-up)` row highlight |

## 8. Platform state

- **TSR 1.170.46**: unused features = `defaultViewTransition`, `scrollRestoration` (replaces manual scrollTo), `defaultPreload:"intent"` (free win on MatchRow links), `__TSR_index` directional types.
- **React 19.3**: `<Activity>` could keep /live feed mounted-hidden to preserve scroll+tick on nav.
- **GH Pages SPA**: prerender.mjs now emits per-route index.html + 404 fallback (done).

## Dependency-decision table

| Lib | Ver | Cost | Verdict |
|---|---|---|---|
| motion | 14.10.1 ✓ | ~45KB | **Keep** |
| CSS scroll-driven | — | 0 | **Adopt** |
| `<ViewTransition>` | in react | 0 | **Adopt** (row→header morph + root crossfade) |
| gsap+@gsap/react | 3.15.1 | 27–45KB | **Defer** — only for a named sequence |
| lenis | 1.3.27 | ~8KB | **Skip** |
| ScrollSmoother | in gsap | +15KB | **Skip** (breaks fixed chrome) |
| Rive canvas-lite | 2.x | 222KB+ | **Skip** — SVG+CSS Hubie |
| TSR new features | 1.170.46 ✓ | — | **Adopt** defaultViewTransition, scrollRestoration, intent preload |

## Derived tasks (filed into §R.C* of 10-master-asks)

router VT+scrollRestoration+intent preload · VT CSS 200ms+PRM none · match morph names · .reveal on sections · scroll-progress bar · color-mix tokens · scrollbar-gutter · text-wrap balance/pretty · field-sizing stake · @container MarketCard · scroll-state stuck shadow · WAAPI fly-to-slip · SVG Hubie states · <Activity> for /live · no names on ticking elements
