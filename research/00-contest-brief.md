# Contest Brief — "Housebets Sportsbook is coming"

Source: https://www.housebets.com/contests/sportsbook-design (captured 2026-11-09)

## Meta
- Prize pool: **$15,000** — 1st $9,000 / 2nd $4,000 / 3rd $2,000 (USDT, cash, no wagering)
- Window: Nov 4 → **Nov 14, 2026 18:00 UTC** (extended once already; ~5d 21h left at capture)
- Entries so far: **119** · Submit: **a public link** (Vercel/Netlify/GitHub Pages, no login)
- Rate limit: 3 submissions / 24h; **every submission judged, best one counts** — we can iterate
- Judged by: Housebets product + design team. Results ~7 days after close.
- Winning test (their words): **"The sportsbook we'd ship tomorrow wins."**
- Tie-breakers: higher **Match page** score, then **Feels like Housebets**.

## Scorecard (100 pts)
| Item | Pts |
|---|---|
| Sports home | 15 |
| Live | 10 |
| Football | 10 |
| Match page | 20 |
| Bet slip + My bets | 20 |
| Feels like Housebets | 15 |
| Every state: suspended, changed, failed | 10 |

## Required pages (5 — "bet slip + my bets share one page")
1. **Sports home**: Live now · Starting soon · Top competitions · Sports nav · Search (teams, players, competitions, markets)
2. **Live**: every in-play match · filter by sport & competition · live score + clock · empty → Starting soon
3. **Football**: Premier League, Champions League, LaLiga, Serie A, Bundesliga · match-result odds on each row · follow a team or competition
4. **Match page**: Arsenal v Brighton live · scoreboard (score, clock) · market groups: Popular, Goals, Halves, Handicaps, Goalscorers, Corners & cards · odds moving, markets suspended
5. **Bet slip + My bets**: tap odds → slip · singles only · decimal odds · stakes in USDT · stake/odds/potential return · **odds changed → player must accept** · selection suspended · bet placed / bet failed · My bets: open, settled, cash out

## Deliver
- All 5 pages **linked** (clickable prototype, front end only)
- Works at **390px (phone)** and **1440px (desktop)**
- Phone bet slip = **bar at the bottom**
- In their **site shell**: top bar, left nav, side panel (shell + brand pack in starter files — gated behind entering the contest / login)
- **Sample data only**: no real players, no real money
- Public link, no login

## Out of scope (do NOT build)
- Multis, accumulators, bet builder · Boosts, free bets, promos · Outrights, specials · Stats widgets, match trackers · AI search

## Rules (Rules tab)
- Staff/family can't win · entries shared publicly under your alias
- Win → Housebets owns code/designs/rights; prize = full payment
- **"Sample fixtures and odds only. Don't copy another sportsbook."**
- Own work; public libraries/models/tools fine — **name them in the note**
- One account per person · Not open to: US, FR, NL · Free to enter

## Starter files (BLOCKED)
- "Enter the contest to download the files" — requires Housebets login.
- Contents believed to be: site shell template + brand pack (logo, fonts, colors) + the 12 wireframes.
- **Mitigation done**: extracted the live design-token system (254 CSS vars), logo SVG, font files (Figtree/Oxanium/Red Hat Display), shell geometry, and all 12 wireframes from the public site. See `03-brand-system.md`.

## Submission form asks
1. Link to clickable prototype (public)
2. Tick all five pages
3. "Your big idea" — **what makes it Housebets, 80–800 chars** ← we must draft this
4. Tools/templates used (optional, name them all)
5. Confirmations: singles only · no real data/money · own work + tools named · can share publicly · winner hands over rights
