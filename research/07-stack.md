# Frontend stack research (agent report — verified against live registries, Nov 2026)

## Final stack

| Layer | Choice | Ver | Why |
|---|---|---|---|
| Runtime | Node LTS | 22.x | Vite 8 floor `^20.19||>=22.12` |
| Framework | **Vite + React + TanStack Router** | vite 8.3.6, react 19.3.1, router ^1.170 | client-only demo; Rolldown fast; typed routes/search params; static deploy trivial. Next 16's SSR/RSC buys nothing for a static prototype |
| Styling | **Tailwind CSS v4 CSS-first** | 4.3.5 + @tailwindcss/vite | @theme + OKLCH tokens = brand pack; container queries, data-*, starting:, motion-reduce built in |
| Primitives | **Base UI** | @base-ui/react ^1.9 | Radix successor, stable; **Drawer w/ snap points + swipe + keyboard = the phone slip sheet**; Dialog/Popover/Tabs/Select/Tooltip |
| Kit | shadcn CLI (Base UI styles) + betui.fyi | shadcn 4.23 | `npx shadcn init` picks Base UI; betui = MIT betting components (bet buttons, market cards, rails) — name it in "tools used" |
| Animation | **motion** (ex framer-motion) + CSS | motion 14.10 `motion/react` | springs, layout/FLIP, AnimatePresence; odds ticks = CSS keyframes via data-dir (cheap, no re-render storms) |
| State | **Zustand** | 5.1 + persist + subscribeWithSelector | slip = discriminated-union state machine; per-cell subscriptions so ticks don't re-render pages |
| Virtual | @tanstack/react-virtual | 3.14 | long market lists |
| Icons | lucide-react + @tabler/icons-react | 1.70 / 3.x | lucide UI glyphs; Tabler Sport category fills sport gaps |
| Fonts | self-hosted brand woff2 | — | research/brand/*; @font-face + preload Figtree; fallback @fontsource-variable |
| Lint | Biome | ^2.3 | one binary lint+format+a11y |
| Toasts | sonner | ^2 | placed/failed feedback |
| Deploy | Vercel | — | SPA fallback zero-config; GH Pages needs 404 hack |
| RNG | mulberry32 seed | — | deterministic demo odds |

**Skip:** Next static export, XState, jotai, TanStack Query, GSAP, Lenis (harms scroll-snap rails + app feel), Storybook, PWA (stale-cache = worst demo failure), React Compiler, Park UI (Panda-coupled), Headless UI (stale), vaul (unmaintained — shadcn moved to Base UI).

## Architecture sketch

```
routes: / (sports home) · /live · /sports/football · /match/$matchId · /bets (slip+mybets ONE page)
layout: HB shell = topbar | left nav | <main> | slip side-panel (≥1024px) / bottom bar+Drawer (<1024px)
stores: feedStore(engine-written normalized events/markets/outcomes) · slipStore(union machine) ·
        betsStore(persist localStorage) · uiStore(sheet/nav/filters/follows, persist)
engine: MockFeed(seed): clock 1s · odds 1.5–3s · suspend/resume · goals; ?scenario=suspend|oddsjump|fail
anim map: odds tick→CSS keyframe (data-dir) · sheet→Base UI Drawer · slip add/remove→AnimatePresence+layout
          · reorder→motion layout · route→React <ViewTransition> (guarded) · press→CSS
```

## Data model (The Odds API v4 shape)

```ts
{ id, sport_key:"soccer_epl", sport_title:"Premier League", commence_time,
  home_team, away_team,
  live?:{ score:{home,away}, clock:"67'", period:"2nd half" },
  markets:[{ key:"h2h"|"totals"|"btts"|"corners"|"goalscorer",
    status:"open"|"suspended",
    outcomes:[{name, price:1.85, point?:-1.5, suspended?:bool}] }] }
```
Decimal odds, USDT, singles only; prices from implied prob + ~5% overround.

## Key techniques

- Slip state machine: `idle|selected|stake-editing|placing|placed|failed|odds-changed|suspended`; `placedStakeSnapshot` locks odds at tap → honest "odds changed → accept".
- Per-cell subscriptions (useShallow) — tick re-renders one button not page.
- Pause engine on `document.hidden`.
- Scenario hooks REQUIRED — judges must reach scored states in seconds (?scenario= or discreet demo FAB).
- Cash-out needs suspend guard + fake ~800ms processing.
- Crests: deterministic SVG monogram shields (initials + seeded colors) — real crests = trademarked artwork, don't ship. Club names OK (brief uses them); fictional player names for Goalscorer markets.
- View Transitions baseline all engines Oct 2025 — guard + reduced-motion off.
- `tabular-nums` + min-width cells or rows reflow on ticks.
- Phone: `env(safe-area-inset-bottom)`, `dvh`, body scroll-lock on sheet.
- Pitfalls: SPA deep-link redirects; tick storms (batch ≤1/900ms); suspend interaction not just styling (aria-disabled + tooltip).

## 10-step setup

1. `npm create vite@latest hb-sports -- --template react-ts` 2. deps (router, zustand, motion, base-ui, lucide, tabler, virtual, sonner; dev: router-plugin, tailwind, biome, tw-animate-css) 3. vite.config plugins order (tanstackRouter → react → tailwindcss) 4. index.css @theme tokens + @font-face 5. file routes + __root shell 6. seed data + engine + scenario hooks 7. components (OddsButton, MatchRow, MarketGroup virtualized, Scoreboard, SlipItem, SlipPanel Dialog→Drawer<1024, MyBetsList, TeamCrest generator, SearchPalette) 8. slip machine + bets persist + toasts + cash-out 9. biome check + tsc + 390/1440 eyeball + reduced-motion 10. build → vercel deploy dist → cold smoke-test public link.
