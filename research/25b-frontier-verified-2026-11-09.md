# Frontend Frontier — Verified 9 Nov 2026 (T9 seed)

Fetched: `2026-11-09 23:00:39 IST` (from `date`, same exec as the registry scan).
Method: npm registry `dist-tags.latest` per package via `/tmp/libscan.mjs`; browser support from
the caniuse/MDN/Chrome pages actually returned by search. Anything not listed here is UNKNOWN
until T9 verifies it. This file seeds `research/25-library-frontier.md`; it does not replace it.

## 1. Registry Facts (latest, registry "modified" date)

| Package | Latest | Registry modified | Installed here | Note |
|---|---|---|---|---|
| motion | 14.11.1 | 2026-11-09 | 14.10.1 | Latest is under the 7-day rule: STAY on 14.10.1 |
| gsap | 3.15.1 | 2026-11-05 | — | Candidate only for non-money hero choreography; likely reject |
| lenis | 1.3.27 | 2026-10-29 | — | Smooth-scroll hijack: REJECT (money paths, a11y, native feel) |
| @number-flow/react | 0.6.2 | 2026-07-18 | — | Strong candidate: odds, returns, balance, cash-out digits |
| @formkit/auto-animate | 0.10.2 | 2026-11-06 | — | Redundant with Motion layout: reject |
| @rive-app/react-canvas | 4.38.1 | 2026-11-04 | — | Only if a free authored .riv exists; editor cost UNKNOWN |
| @lottiefiles/dotlottie-react | 0.21.1 | 2026-11-02 | — | No authored assets: reject |
| @paper-design/shaders-react | 0.0.82 | 2026-11-08 | — | Pre-1.0 WebGL: reject live; a pre-rendered still is allowed |
| @react-three/fiber | 9.8.2 | 2026-10-21 | — | WebGL has no player benefit here: REJECT |
| @base-ui/react | 1.9.0 | 2026-10-09 | 1.9.0 | Keep: accessible Dialog/Tabs/Popover/Menu; verify NumberField/Combobox/Drawer in T9 |
| @radix-ui/react-dialog | 1.3.1 | 2026-10-14 | — | Redundant with Base UI |
| react-aria-components | 1.22.1 | 2026-10-09 | — | Benchmark for a11y behaviour; do not double-stack primitives |
| vaul | 1.1.2 | 2024-12-14 | — | Stale ~23 months: reject; keep Motion drag sheet or Base UI drawer |
| cmdk | 1.1.1 | 2025-08-27 | — | Compare against Base UI combobox for search; pick one |
| sonner | 2.0.8 | 2026-08-09 | 2.0.8 (unused) | Adopt for toasts with live regions, or remove the dependency |
| @floating-ui/react | 0.27.20 | 2026-07-11 | — | Only if native anchor positioning fails support checks |
| embla-carousel-react | 8.6.0 | 2026-10-08 | — | Hero slideshow candidate vs CSS scroll-snap (CSS first) |
| @use-gesture/react | 10.3.1 | 2024-03-21 | — | Stale: reject; Motion covers drag |
| react | 19.3.1 | 2026-11-09 | 19.3.1 | Keep |
| @tanstack/react-router | 1.170.46 | 2026-10-22 | 1.170.46 | Keep; check built-in view-transition support in T9 |
| @tanstack/react-virtual | 3.14.26 | 2026-11-03 | 3.14.26 (unused) | Use only if a list measurably needs it; else remove |
| zustand | 5.1.0 | 2026-11-06 | 5.1.0 | Keep |
| tailwindcss | 4.3.5 | 2026-11-06 | 4.3.5 | Keep: `@theme` tokens in OKLCH |
| vite | 8.3.7 | 2026-11-09 | 8.3.6 | Stay; 8.3.7 is under the 7-day rule |
| typescript | 7.0.2 | 2026-11-09 | 7.0.2 | Keep |
| babel-plugin-react-compiler | 1.0.0 | 2026-05-08 | — | Evaluate: fewer re-renders under live ticks; measure before adopting |
| culori | 4.0.2 | 2026-04-03 | — | Dev-only: OKLCH token generation + measured contrast in tests |
| @fontsource-variable/figtree | 5.3.0 | 2026-07-19 | — | Variable self-hosting option; confirm the real brand font first |
| @fontsource-variable/red-hat-display | 5.3.0 | 2026-07-19 | — | Same |
| @fontsource-variable/oxanium | 5.3.0 | 2026-07-19 | — | Same; check tabular lining numerals |
| @axe-core/playwright | 4.14.0 | 2026-11-06 | — | QC gate (dev-only) |
| @playwright/test | 1.65.0 | 2026-11-09 | — | QC gate; pin a version older than 7 days when adding |
| lighthouse | 13.6.0 | 2026-11-06 | — | Perf/A11y gate |
| web-vitals | 6.2.3 | 2026-10-05 | — | INP/CLS measured in the browser |
| react-scan | 0.5.7 | 2026-05-27 | — | Dev-only render audit during live ticks |

Rule: a dependency is added only after (1) the version is at least 7 days old, (2) its bundle
cost is measured in our build, (3) it beats the native/CSS option with a stated player benefit.

## 2. Platform Facts (sources actually returned)

- Same-document View Transitions: Interop 2025 focus; Firefox 144 shipped them (stable 14 Oct 2025)
  WITHOUT view-transition types — feature-detect types.
  Source: https://developer.chrome.com/blog/view-transitions-in-2025
- Cross-document View Transitions: Chrome 126+, Safari 18.2+, Firefox partial (144+); caniuse global
  89.6%. Source: https://caniuse.com/cross-document-view-transitions — we are an SPA, so same-document is the path.
- `match-element` auto-naming works only for same-document transitions (same Chrome post).
- CSS scroll-driven animations (`animation-timeline: scroll()/view()`): Baseline Newly available since
  Firefox 159 on 27 Oct 2026; Chrome/Edge 115, Safari 26. Sources: https://caniuse.com/wf-scroll-driven-animations,
  https://scroll-driven-animations.style/demos/baseline-newly-available/css/
  Gotcha: the `animation` shorthand resets `animation-timeline`; declare the timeline AFTER the shorthand
  (https://dev.to/iamprincejkc/stop-listening-to-scroll-for-progress-bars-css-scroll-timelines-are-baseline-1kcg).
- UNKNOWN until T9 checks: anchor positioning, Popover API + `popover=hint`, `@starting-style`,
  `interpolate-size`, scroll-state container queries, CSS carousel `::scroll-marker`, `field-sizing`.

## 3. Craft Sources Opened (for T3/T8)

- Rauno Freiberg, "Invisible Details of Interaction Design" (July 2023): https://rauno.me/craft/interaction-design
  — respond to the hand, interruptibility, motion matched to frequency, spatial consistency.
- Emil Kowalski, "Great Animations": https://emilkowal.ski/ui/great-animations — fast (usually under 300ms),
  ease-out for responses, purpose, pace by frequency, never animate keyboard-initiated actions.
- Emil Kowalski, "Agents with Taste": https://emilkowal.ski/ui/agents-with-taste — encode taste as
  skill files for coding agents (active scale 0.97, enter from 0.95 not 0, transform-origin at trigger,
  44px hit areas, an easing decision flowchart). Adopted: `.devin/skills/housebets-craft/SKILL.md`.
