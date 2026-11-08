# Sportsbook UX Benchmark — crypto + fiat (research agent report)

## 1. Convention table (condensed)

- **Stake**: left league list + coupon + right slip; top tabs Sports Home/Live/My Bets/Starting Soon; mobile bottom bar (Browse/Casino/Bet Slip/Sports/Chat); dark navy + green CTA; complaints: new UI removed "accept higher only", picks don't clear post-parlay, 5–20s live-bet delay.
- **Shuffle** (screenshotted): left sidebar nav (Casino/Sports toggle, token card, counts), glossy promo banner carousel, tabs Featured/Upcoming/Bet Live 138/All Sports, sport icon grid, Trending Now cards (LIVE + stat icons +222 markets, teams+scores, odds cells with green 2.75▲ / red 1.45▼ direction arrows). Black+purple.
- **Sportsbet.io**: big search → sport-icon toolbar → Featured; sport pages: In-Play/Next 24h/Upcoming/Outrights/Leagues/News; Rapid Betting micro-markets 30–45s; Bet Builder 12 legs; Share Betslip (anonymized); Price Boost.
- **Cloudbet**: sidebar w/ live flags; Pulse/In-Play/Bet Builder/Promos; one-click stake; max-stake shown per customer; Whale Mode.
- **BC.Game**: left 60–80 sports, right persistent slip; Predictions (Polymarket-style), Event Builder, public Bets Feed; color-cued odds shifts pre-confirm; two parallel books w/ different margins (trust issue).
- **Roobet**: beveled 3D cells; praised bottom menu; dark only.
- **Duelbits 3.0**: sleek but "noisy maze of submenus".
- **Gamdom**: clean minimal; Bet Stack usable in-play; slow first load.
- **bet365**: EKG "gold standard" 18.4/20 — #1 UX/features, 4th aesthetics ("functional not fun"); classic = text cells + yellow price on dark green; new app = SwiftUI cards+swipe IA preserving state; Flash green=shorten/red=drift on real deltas only; suspension loud same-frame; **Edit Bet; Auto + Partial + slider Cash Out (richest)**; Bet Share w/ themes; star-pin favourites.
- **DraftKings**: pill cards (line above price); Stats Hub; Quick Parlay; most customizable quick-bet presets ($10/25/50); green▲/red▼; complaints: promo-cluttered home, slip drops selections at load, SGP edit gate re-sorts legs.
- **FanDuel**: Fast Bet persistent bottom bar (bet from anywhere); SGP gold standard (correlated legs); "Always accept odds movement" toggle; Share Bet → Community Feed badges; partial cash out; complaints: "forceful", alt lines behind "show more", 4 nav bars = Hick overload.
- **Betfair Exchange**: 3-col price ladder (blue back/pink lay + liquidity £); unmatched bets queue visibly; liability/hedge math shown.
- **Thrill/Razed/Betpanda**: clean fast dark; Thrill slip-share to chat; minimal animation.

**Universal match-row order:** `time|live-clock → teams → score → icons → 1X2 → "+N markets"`; competition-grouped headers; EU stacks teams vertically, US "Team A v Team B" w/ 3 aligned columns.

## 2. Bet slip conventions (what must exist)

- Fixed right column desktop / collapsed bottom bar (count+return) → full sheet mobile.
- Quick-bet mode (one-tap stake): BC.Game, Cloudbet, DK customizable presets.
- Stake chips (5/10/25; DK user-settable); custom numpad > system keyboard.
- Return math live per keystroke; never mutate stake on odds move.
- Odds-change labels in industry: "accept any odds change" / "accept higher only" / Sportradar MTS enum None/Any/Lower/Higher; theScore: Auto-Accept All/Favorable/Manual; changed leg shows old struck-through → new + direction.
- Six designed slip states (iDesy): empty / odds-changed / suspended / insufficient-funds (w/ in-slip deposit!) / min-max limits pre-entry / accepted.
- Rejection reasons plain-language + next step (Blask, Spinlab).
- Triple feedback on add (cell state + counter + toast) prevents double-tap-remove.
- Live-bet acceptance delay universal (Stake 5–20s hated) → visible countdown beats dead button.

## 3. My bets

- Open/Settled(/Void) tabs; cards mirror slip (FanDuel) or rows w/ mini-score modules (bet365).
- Cash-out: amount ON the bet + repeat in confirm; six states (available/partial/value-changed/suspended/unavailable/done); placement matters — header-above-slip placement doubled taps 6.1%→12.4% (ShowOn 410k sessions); partial slider (Paddy Power/bet365); auto cash-out target (bet365).
- Receipt/share: bet365 Bet Share image+themes; Sportsbet.io anonymized share + copy-commission; FanDuel Community Feed badges.
- Live status inside rows (score + cash-out value inline).

## 4. Live specifics

- Score+period+clock lead and persist while scrolling; stat/stream icons per row (Stake).
- Tick: green ▲/red ▼ (or flash) only on real deltas; alt: direction-aware odometer roll (Godoy case — motion encodes direction; beats flash under change-blindness).
- Suspension on dangerous attacks; loud same-frame; visible accept countdown > dead button.
- 85% of stakes on <10 markets → Popular first, collapse long tail.
- Trackers out of our scope, but steal pattern: stats as overlay over markets.

## 5. Must-match familiarity checklist (violate = feels broken)

3-col desktop (sport tree | coupon | persistent slip) · mobile bottom nav w/ slip badge + bar→sheet · two-line odds cell (label small, price bold), accent-fill selected + count badge + toast · row order time→teams→score→icons→1X2→+N · green/red ticks; suspended visibly dead · slip auto single/multi, chips, live return, clear leg/all, 3-option odds-accept · My bets tabs + cash-out on bet + receipt w/ ID · decimal default · 1-tap add · skeletons not spinners · slip persists across nav.

## 6. Top differentiation moves (judge-visible <60s)

1. Direction-aware odds motion (odometer roll — nobody in crypto does it; semantic motion)
2. The slip as hero (books treat it as afterthought; smarter slip = highest-leverage surface)
3. Suspension & state honesty designed (six states w/ reasons + next actions)
4. Visible bet-acceptance countdown (turns hated Stake delay into feature)
5. Cash-out where the action is (event card value + near slip header; partial slider; auto target)
6. Social layer (share slip as image/link; Bets Feed; copy-bet — crypto-native identity makes it safe)
7. Search that actually works (fuzzy, direct-to-market, recent/favourite pinning)
8. Market hierarchy for the 85% (Popular first, progressive disclosure, saved view)
9. Coherent motion+density system (bento, glassy sheet, honest flashes, 8pt, tabular)
10. Micro-gamification ambient (XP, progress, shareable win cards — EGR/SBC rewarded this)
11. One-hand live mode (thumb-zone actions, swipe between live matches — bet365 iOS IA)
12. Receipt as object (shareable card w/ live status + cash-out ticker — post-bet dead space → retention)
13. Empty/error states with direction (universally ignored = free win)
14. Trust microcopy (settle rules, void policy, suspension reasons, novice-friendly market names)
15. Signature odds-cell aesthetic (most-repeated element = strongest brand carrier; bet365's yellow-on-green identifiable at a glance — no crypto book owns a look)

## 7. Anti-patterns to avoid (from real complaints)

Sticky selections post-placement · edit gates re-sorting legs/resetting toggles · stake carryover to next leg · silent odds updates / slip-nuking modals · dead suspended odds w/o explanation · fake "cash out successful" · promo banners in first viewport (Shuffle/DK do this) · 4+ nav bars · hidden second book w/ different margin · one-tap re-bet dark pattern · withdrawal > deposit journey · webview/container-app feel (Degree 53 audit: UK leaders ~54/100) · keyboard covering slip CTA · duplicate bets from laggy submit.

## Award signals

EGR M&I 2025 — Kaizen/Betano (native app + innovation); EGR B2B 2024 — BETBY engine; SBC 2025 — Kaizen; Sportsbet.io esports innovation 2024. Judges reward **native-feeling apps, bet-builder-class flows, engagement mechanics — not market count**.
