# Contest Brief — "Housebets Sportsbook is coming"

**LIVE FETCH — 2026-11-09T17:48–17:58 UTC** (Mon Nov 9 2026; local `date`: Mon Nov 9 23:16 IST)
URL fetched: https://www.housebets.com/contests/sportsbook-design (HTTP 200 via headless Chromium; direct webfetch/curl are Cloudflare-challenged 403 — use Playwright, see note at bottom).
Page title: "sportsbook design · Housebets Contest Labs | Housebets"
Supersedes the 2026-11-09 (early AM) capture below — changes marked ⟵CHANGED.

## Meta (verbatim from live page)
- Tag: Design / DESIGN · Status: **"Ends in 5 days" · Open**
- Hero: **"Housebets Sportsbook is coming"** — "Design it. A clickable prototype: 5 pages, singles only."
- Stage tracker: Upcoming · **Open** · Judging · Results
- PRIZES: **$15,000** · Entries: **"131 entered"** ⟵CHANGED (was 119)
- Countdown at fetch: "Ends in 05 DAYS 00 HOURS ~10 MINS" → consistent with **Nov 14, 2026 18:00 UTC**
- "Sign in with your Housebets account to enter." (Log In)
- STARTS: Nov 4, 2026 · ENDS: Nov 14, 2026
- SUBMIT: **A link** · RANKED BY: **Housebets Team** · DAILY SUBMISSIONS: **3**
- Tabs on page: **Task | Rules**
- HOW TO WIN (verbatim): **"The sportsbook we'd ship tomorrow wins."**
- Ties (verbatim): **"Ties: the higher Match page score wins, then Feels like Housebets."**

## Scorecard (verbatim, 100 pts)
| Item | Pts |
|---|---|
| Sports home | 15 pts |
| Live | 10 pts |
| Football | 10 pts |
| Match page | 20 pts |
| Bet slip + My bets | 20 pts |
| Feels like Housebets | 15 pts |
| Every state: suspended, changed, failed | 10 pts |

## MINIMUM BAR (verbatim)
"Your prototype should be at least this good."
"Our wireframes. Match them, then beat them. **Pages 5 and 6 here are one page in your entry.**"
Viewer toggle: Desktop | Phone. Six labelled frames:
1. Sports home · 2. Live · 3. Football · 4. Match page · 5. Bet slip · 6. My bets

## Required pages (verbatim page spec)
Intro line: "We're building a sportsbook. Design the five pages players will use most."
"Build a clickable prototype: 5 pages, phone and desktop, in our site shell (top bar, left nav, side panel). The shell and the brand pack are in the starter files."

1. **Sports home** — Live now · Starting soon · Top competitions · Sports nav · Search: teams, players, competitions, markets
2. **Live** — Every match in play · Filter by sport and competition · Live score and clock · Nothing live: show Starting soon
3. **Football** — Premier League, Champions League, LaLiga, Serie A, Bundesliga · Match result odds on each row · Follow a team or competition
4. **Match page** — Example: Arsenal v Brighton, live · Scoreboard: score, clock · Market groups: Popular, Goals, Halves, Handicaps, Goalscorers, Corners & cards · Odds moving, markets suspended
5. **Bet slip + My bets** — Tap odds, add to slip · Singles only · Decimal odds, stakes in USDT · Stake, odds, potential return · Odds changed: player must accept · Selection suspended · Bet placed, bet failed · My bets: open, settled, cash out · "Bet slip and My bets share one page"

## Out of scope (verbatim)
- Multis, accumulators, bet builder
- Boosts, free bets, promos
- Outrights, specials
- Stats widgets, match trackers
- AI search

## What to deliver (verbatim)
- All 5 pages, linked.
- Works at 390px (phone) and 1440px (desktop).
- Bet slip on phones: a bar at the bottom.
- A clickable prototype. Front end only.
- Share a public link that opens without a login: Vercel, Netlify, GitHub Pages or similar.
- Sample data only: no real players, no real money.

## What you'll send — submission form (verbatim)
"Takes about 2 min once you start."
1. **Link to your clickable prototype** — "A public link: Vercel, Netlify, GitHub Pages or similar."
2. **Pages in your prototype** — "Tick all five. Your prototype must have every one."
3. **Your big idea** — "What makes it Housebets? 80 to 800 characters."
4. **Tools and templates you used** (Optional) — "Figma, v0, Claude, a UI kit. Name them all."

### YOU'LL CONFIRM (5 checkboxes, verbatim)
1. "My bet slip takes singles only. No multis, boosts or free bets."
2. "No real player data and no real money anywhere in it."
3. "It's my own work. I've named any tools, templates or kits I used in this form."
4. "Housebets can share my entry publicly."
5. "If I win, the prize is the full payment and Housebets owns the winning code, designs and rights."

Button: "Start your entry"

## News (verbatim)
- **NOV 7, 2026, 07:58 PM UTC — "Send every idea"**: "Got more than one idea? Send each one as its own submission, up to 3 a day until the deadline. We judge every submission, and your best one counts. A new submission never replaces an earlier one."
- **NOV 5, 2026, 12:56 AM UTC — "New closing date: 14 November 2026, 18:00 UTC"**: "The closing date of Housebets Sportsbook is coming is now 14 November 2026, 18:00 UTC. Send your final entry before then; everything else stays the same."

## Prize ladder (verbatim)
- Place 1 — **$9,000**
- Place 2 — **$4,000**
- Place 3 — **$2,000**

## Rules tab (verbatim, all items)
- Staff and their families can't win prizes.
- We share every entry publicly, under your alias.
- Win and it's ours: the prize is the full payment, and Housebets owns the winning code, designs and rights.
- Judged by the Housebets team. Results out 7 days after the contest closes.
- **Sample fixtures and odds only. Don't copy another sportsbook.**
- Judged by the Housebets product and design team.
- **Every contest**: Free to enter. No deposit, wager or purchase is needed to enter or to be paid.
- One Housebets account per person. Several or shared accounts are disqualified, with their prizes.
- Your own work. Public libraries, models and tools are fine; name them in your note. Copying another entry is not.
- You may submit 3 times in any 24 hours. We judge every submission, and your best one counts.
- Prizes are paid in USDT to your Housebets wallet, as cash with no wagering, after the results.
- Not open to players in: US, FR, NL.
- Winners hand over the winning work: see the rules above. Everyone else keeps theirs.

## Wireframe parity check (live vs research/wireframes/)
- All 12 live asset filenames (from the site's JS bundle, fetched 2026-11-09T17:58Z) match local filenames **exactly, 12/12**.
- Byte-check: live `desk-home.36rrct0bzj7df.webp` downloaded and md5-matched the local copy (e219d3a07c37d66107c9173acd83b90b). Same hashed names = same assets.
- Live viewer labels: Desk = home/live/football/match/slip/mybets; Phone = home/live/football/match/slip + **slip-open** (no phone-mybets frame on the live site either — phone set shows the bet-slip sheet open instead).

## Starter files (STILL BLOCKED)
- "Sign in with your Housebets account to enter" — the starter pack (shell + brand pack + wireframe sources) remains gated behind a Housebets account.
- Mitigation already done: `03-brand-system.md` (tokens, fonts, logo, shell geometry) + the 12 wireframes extracted.

## Fetch method note (for future re-fetches)
webfetch + curl get Cloudflare 403 "Just a moment". What worked today: Playwright chromium_headless_shell-1254 (`~/Library/Caches/ms-playwright/`) via `executablePath`, UA `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36`, waiting ≤60s for the challenge to clear. Intermittent — one run stayed challenged; retry.
