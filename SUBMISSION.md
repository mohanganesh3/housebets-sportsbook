# Contest submission

**Prototype URL (public, no login):**
https://mohanganesh-intern-pixel.github.io/housebets-sportsbook/

**Repo:** https://github.com/mohanganesh-intern-pixel/housebets-sportsbook

**Pages to select:** Sports home · Live · Football · Match page · Bet slip & My bets

**Works at:** 1440px desktop and 390px phone (bottom slip bar → bottom sheet)

**Judge demo tool:** tap the flask FAB (bottom-right on desktop, above the tab bar on phone) — one click triggers every scored state: odds change → accept, market suspension + same-frame slip cascade, suspended pick, place success/fail, goal flash, cash-out suspension, empty-live state.

## Big idea (≤800 chars)

Every sportsbook entry will render odds cells. Ours behaves like a trading terminal you can read at a glance: odds don't just change — they move, with direction arrows and flashes that carry meaning; when a market suspends you watch the lock cascade into your slip in the same frame; when a goal lands the score flashes and pricing freezes like a real book. The bet slip is a living object that tells you what it needs — accept the new odds, wait out a suspension, or place. And because states win or lose a contest, we built a State Tourer: every required state (suspended, changed, placed, failed, cash-out) is one tap from the flask button, no waiting for the demo gods. Familiar on first glance — this is how a native Housebets book should feel.

(592 chars)

## Tools/templates used

React 19 + Vite 8 + TypeScript · TanStack Router · Tailwind CSS v4 (Housebets design tokens extracted from the live site: Figtree/Oxanium/Red Hat Display, cyan-on-deep-teal palette) · Zustand state + deterministic mock-odds engine · Motion (direction-aware odds ticks, sheet, micro-interactions) · Base UI Dialog (phone bet-slip sheet) · Lucide icons · Biome · GitHub Pages.
