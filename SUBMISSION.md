# Contest submission

**Prototype URL (public, no login):**
https://mohanganesh3.github.io/housebets-sportsbook/

**Repo:** https://github.com/mohanganesh3/housebets-sportsbook

**Pages to select:** Sports home · Live · Football · Match page · Bet slip & My bets

**Works at:** 1440px desktop and 390px phone (bottom slip bar → bottom sheet)

**Judge demo tool:** tap the flask FAB (bottom-right on desktop, above the tab bar on phone) — one click triggers every scored state: odds change → accept, market suspension + same-frame slip cascade (with reason), suspended pick, place success/fail, goal flash, cash-out suspension, empty-live state.

**Worth a look:** pale-cyan Housebets chrome (prize widget, icon rail, real footer) · selections clear on placement with a referenced receipt · lost bets show `Returned 0.00` + net, never their potential · cash-out is a two-tap confirm that tracks live odds and can fall as well as rise · follow stars AND kickoff-reminder bells (star = save, bell = alert) · "Live at the House" is the real engine event feed, not fabricated wins · search has recents and follow-aware ranking · session/net line + take-a-break inside the slip · kickoff countdown → scheduled matches flip live in front of you.

## Big idea (≤800 chars)

A sportsbook is a state machine wearing a skin, and Housebets skin is pale cyan on deep teal — so ours wears the real chrome: prize widget, icon rail, pale-cyan calls to action, gold kept for follows and prizes. Under it, every pixel tells the truth: odds move with persistent direction arrows; suspensions name their reason and lock your slip, your cash-out, and the market in the same frame; lost bets show you the loss, never a dressed-up return; cash-out confirms and can fall as well as rise. Favorites work the way bettors think — star a team or league, bell a kickoff, and your board sorts itself live-first. And because states are the contest, the flask button tours every one of them on demand. Familiar to a regular, honest to a judge.

(766 chars)

## Tools/templates used

React 19 + Vite 8 + TypeScript · TanStack Router · Tailwind CSS v4 (Housebets design tokens extracted from the live site: Figtree/Oxanium/Red Hat Display, cyan-on-deep-teal palette) · Zustand state + deterministic mock-odds engine · Motion (direction-aware odds ticks, sheet, micro-interactions; honors reduced-motion) · Base UI Dialog (phone bet-slip sheet) · Lucide icons · Biome · GitHub Pages.

No real money, no real odds — all fixtures, prices, and cash-out values are seeded sample data for the prototype.
