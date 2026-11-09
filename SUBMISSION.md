# Contest submission — Housebets sportsbook prototype

**Prototype URL (public, no login):**
https://mohanganesh3.github.io/housebets-sportsbook/

**Repo:** https://github.com/mohanganesh3/housebets-sportsbook

**Pages to select:** Sports home · Live · Football · Match page · Bet slip & My bets

**Works at:** 1440px desktop and 390px phone (bottom slip pill → drag-to-dismiss bottom sheet). All deep links (`/live`, `/football`, `/bets`, `/following`, `/match/ars-bha`) are prerendered and return HTTP 200.

## 60-second judge tour

1. **0–10s · Home:** live minute badges ticking, sport glyphs (custom SVGs, not stock icons), removable favourite chips, hero with a one-shot letterbox reveal.
2. **10–20s · State tourer:** on desktop tap the flask FAB (bottom-right); on phone open **Menu → Demo states**. One tap triggers every scored state — odds moves, suspension with a named reason, goal flash, cash-out suspension, errors — each of which also happens on its own if you just watch the board.
3. **20–35s · Match page (`/match/ars-bha`):** 96 priced markets across 9 groups plus pinnable "My markets"; market search scans everything; Follow/Following chips under the teams; boxed live score with LIVE pill.
4. **35–45s · Slip:** tap any odds cell → the phone pill shows count, pick, price and payout; open it, drag it, it dismisses on velocity. Add a stake, place, get a referenced receipt.
5. **45–60s · My bets (`/bets`):** the open Arsenal bet tracks a live score with a ticking cash-out you can confirm or watch fall; seven settled rows show won / lost / cashed out / void with honest returns.

## Big idea (702 chars)

A sportsbook is a state machine wearing a skin, and Housebets skin is pale cyan on deep teal — so ours wears the real chrome: prize widget, icon rail, pale-cyan calls to action, gold kept for follows and prizes. Under it, every pixel tells the truth: odds move with persistent direction arrows; suspensions name their reason and lock your slip, your cash-out and the market in the same frame; lost bets show the loss, never a dressed-up return; cash-out confirms twice and can fall as well as rise. Favourites work the way bettors think — star a team or league, bell a kickoff, your board sorts live-first. The flask tour triggers every scored state on demand. Familiar to a regular, honest to a judge.

## What we deliberately didn't build

- **No dark patterns.** No fake urgency ("3 people are betting this"), no loss-disguising "returns", no default-on notifications, no streak bait. Lost bets say `Returned 0.00`.
- **No multis/parlays, boosts, promos, outrights or specials** — out of scope, and they're also where books hide their worst value.
- **No autoplay, no confetti, no scrolljacking** — every animation has a `prefers-reduced-motion` twin and nothing on a money path exceeds ~400ms.
- **No real-money anything.** Every price, score, cash-out value and balance is seeded sample data; deposit and casino routes explain they're demo surfaces instead of pretending.

## Engineering notes a judge can verify

- **Pricing model:** each fixture is priced from team-strength Poisson λ with a live-score drift — 96 markets per match, zero duplicated 1X2 lines across the slate, overrounds measured at 104.8–107.8% (one 2–0 blowout book sits at 100.2%, which is the honest math — a real book would suspend it).
- **Suspension vocabulary:** locks carry reasons (VAR check, penalty, red card), not a generic "unavailable".
- **Accessibility:** odds cells carry their visible label inside their accessible name; disabled-text token was raised to AA contrast (`#7d919c`, ≥4.5:1 on both surfaces); tablist/tab roles audited; keyboard path and `aria-live` toasts in place.
- **Lighthouse** (prod build, Chrome headless — JSONs in `qc/lh/`): desktop performance 90–100, accessibility 91–96, best-practices 100 on all five routes; mobile run in `qc/v3-lighthouse.md` when the batch completes. Numbers are stated as measured, not estimated.

## Tools & templates used

- **Built with Devin (SWE-2 Max)** by Cognition — the whole research → design → code → deploy loop, including the subagent-run research waves documented in `research/` and the adversarial QC loop in `qc/`.
- React 19 + Vite 8 + TypeScript · TanStack Router (typed, view-transition wired) · Tailwind CSS v4 with `tw-animate-css` (Housebets design tokens: Figtree/Oxanium/Red Hat Display, cyan-on-deep-teal palette) · Zustand stores + a deterministic seeded match/pricing engine · Motion (direction-aware odds ticks, sheet drag physics, one-shot reveals — all reduced-motion paired) · Base UI Dialog (sheets, search palette) · Lucide icons for generic chrome + a hand-drawn inline-SVG set for all sport glyphs and the Hubie sloth mascot · Biome · GitHub Pages with prerendered route folders.
- No templates, no component kits, no copied sportsbook UI. Every fixture, player name, price and cash-out figure is fictional sample data.
