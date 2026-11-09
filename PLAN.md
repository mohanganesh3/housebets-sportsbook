# HOUSEBETS SPORTSBOOK — MASTER PLAN & STORYBOARD

> SUPERSEDED BY `RESET_PLAN.md`. Mohan rejects this visual direction. Retain this
> document as history only; do not execute its layout, scope, stack or cinematic
> decisions. Follow the reset plan and original RESET requirements instead.
$9,000 · ~119 entries · "The sportsbook we'd ship tomorrow wins."
Deadline: Nov 14, 2026 18:00 UTC · Deliverable: public link, 5 pages, 390px + 1440px

---

## 0. Reading of the room (strategy thesis)

**Who judges:** Housebets *product + design* team. They wrote wireframes deliberately plain ("match them, then beat them"), they score states explicitly, they excluded promos/trackers/builders — they want to see **product craft**, not marketing flash. Every other entrant will vibe-code a pretty skin. Our edge = **systems thinking made visible**: real state machine, honest motion semantics, casino-operator maturity (RG signals), and a motion+density system so consistent it reads as designed-by-team, not generated.

**The three lenses every decision passes through:**
1. **Judge lens** — does it score the card? Does it look shippable? Is every scored state reachable in seconds?
2. **Bettor lens** — does it feel instantly familiar (Jakob) yet smoother (peak-end, anticipation design)?
3. **Operator lens** — does it make money *responsibly*? (frictionless loop + visible integrity + no detectable dark patterns)

**Big idea (draft for the 80–800 char field):**
> "Most sportsbooks look like casinos bolted on a spreadsheet. This one is built like Housebets itself: the cyan glow stays quiet until the moment it matters — odds move with direction you can *feel*, suspensions lock honestly in the same frame, the slip is a living object that never leaves your side, and every state — changed, suspended, failed — is designed like a feature, not an apology. Familiar in a glance. Trustworthy in a minute. Housebets in a heartbeat."

---

## 1. Scorecard → effort allocation

| Item | Pts | Strategy |
|---|---|---|
| Match page | 20 | Flagship: scoreboard hero + 6 market groups + live engine + suspension cascade. Tiebreaker #1 — polish hardest |
| Bet slip + My bets | 20 | The hero object: tri-state selections, stake machine, accept-odds flow, placed/failed/receipt, cash-out |
| Sports home | 15 | First impression: live-now engine strip + favourites personalization + search ⌘K |
| Feels like Housebets | 15 | Exact shell + extracted token system + Figtree/Oxanium + restraint (tiebreak #2) |
| Live | 10 | Clean grouped feed + filters + the best empty state anyone submits |
| Football | 10 | Top-5 leagues + follow system (the Hooked investment layer) |
| Every state | 10 | Demo-mode: every scored state reachable deterministically (URL flags + demo control) |

## 2. Design system — "Housebets Native"

**Tokens:** verbatim extracted vars (research/03). `bg #041015 · surfaces #0b1920/#0e202a/#0d2a38 · brand #02f8f8 · primary-fill #c4f4f1 (the pale-cyan Register color — our Place-bet/primary CTA) · text #f9f9fb/#8f96a8 · success #47d496 · error #f41f50 · warn #e17823 · gold #daa520`
**Fonts:** Figtree (UI) · Oxanium 600/700 (odds, scores, clocks — verify tnum else tabular Figtree) · Red Hat Display 700 (hero/display)
**Signature odds cell** (the brand carrier — ~100s per page):
- idle: `surface.2` fill + hairline `border.strong`, label 11px secondary over price 15px Oxanium cyan
- hover: +6% luminance, 80ms (affordance: it's a button)
- press: 96% scale 80ms
- **selected: cyan border 1.5px + cyan glow + ✓ corner pip** — NOT a fill flip (keeps shape; wireframe's flat cyan fill is the bar, ours is richer)
- **tick up/down: edge-glow green/red 250–400ms + ▲▼ chevron, decay to cyan ~1s** (direction + color dual-coded; never on re-render)
- **suspended: amber wash + 🔒 + "Suspended" same frame** (0ms — integrity)
**Shell fidelity:** top bar (menu, logo, prize widget $50k, rewards crown, search, panel toggle, Log In dark + Register pale-cyan), left icon rail 72px (cyan active edge), phone bottom bar 67px (Menu/Sports/Casino/Chat), right side panel (Bet slip/My bets/Chat tabs) — all rebuilt faithfully but re-composed cleaner.

## 3. The six signature differentiators (what makes judges pause)

1. **Semantic odds motion** — ticks carry direction (edge-glow + ▲▼ + optional digit cross-fade); green up / red down only on real deltas. Signature nobody ships.
2. **Suspension theater-with-integrity** — padlock in the same frame, amber ribbon on scoreboard, slip selection marked; the "we'd ship it" moment.
3. **Slip as living object** — persistent right rail w/ count badge; phone: slip bar `❶ Arsenal @ 1.30 ⌃` → sheet; selection cards carry live context (score·minute); fly-to-slip animation.
4. **Odds-changed accept flow, demo-able** — `1.80 → 2.05` strike-through + amber card + `Accept` + segmented `Ask/Higher/Any` (default Ask = honest consent).
5. **Goal-flash causality** — score cell pulses amber 1.2s *while* affected odds tick; cause & effect in one glance.
6. **Demo dashboard (hidden gem)** — `?scenario=` + subtle "Demo" FAB letting judges trigger: goal, suspension, odds-jump, bet-fail, cash-out value change, empty-live — converts the 10-pt states card into a tour. Nobody else will do this; it reads as *confidence*.

## 4. Page storyboards (before-build spec)

### P1 Sports home
Top bar → search pill (`⌘K` hint chip) → sport nav (Home active | Live•13 red-dot | Soccer…Esports, ~7 max) → **Favourites chips** (★ league, crest team, × remove; empty state teaches starring) → **Your matches** card (followed matches first: status col | crests+names | score | 3 cells | +N›) → **Featured** snap carousel (‹ › in header, live card first) → **Starting soon** (real countdown `Starts in 04:12`) → **Top competitions** tile grid (crest + follow star).
Phone: icon-grid sport nav; match cards swipe; same order.

### P2 Live
‹ Live now → search → sport pills w/ counts (All 13 | Soccer 6…) → league group cards (crest+name+count+★ + View all›) → rows (LIVE badge+clock | teams | score | cells | +N) → suspended rows inline → **empty: "Nothing live" + Starting soon list + next-kickoff + home CTA**.

### P3 Football ("Soccer")
‹ Soccer ▾ + "5 competitions · 6 live" → Market selector ▾ (Match result/BTTS/Total — rows re-bind!) + All competitions ▾ → segmented Live&Upcoming/All → league groups (PL★ UCL LaLiga Serie A Bundesliga) → mixed live/scheduled rows → follow stars on league headers + rows.

### P4 Match page — flagship
Breadcrumb pills (Soccer▾ England▾ Premier League▾ ARS–BHA▾) → **Scoreboard card**: comp caption, crest+name L/R, boxed score 1–0 (~40px Oxanium), LIVE 52' pink, ★Following / ☆Follow, ☆ top-right → "Search markets or players" → **sticky market tabs** Popular 10 | Goalscorers 9 | Goals 11 | Players 11 | Halves 8 | Handicaps 5 | Corners & cards 14 | Minutes 10 | Specials 7 | All markets 85 → market accordions (Match result 3-cell; Double chance; Total goals 2-col; goalscorer list w/ fictional names; corners&cards grid…) → suspension cascade demo.
Phone: compact breadcrumb, stacked scoreboard, 1-col markets, slip bar floats above tab bar.

### P5 Bet slip + My bets (one page)
Desktop: panel tabs Bet slip❶|My bets❶|Chat|✕. Slip: `Singles · n | Clear all` → selection cards (pick, market·match, `old→new` if changed, live `1–0·52'`, state chip, ✕) → stake input $ + chips 5/10/25/50 → `Returns 23.00` (accent) → Total stake ₮ | Payout ₮ → **Place bet · 10.00 USDT** → pending → receipt (ref, check-draw, View in My bets) / failure shake+reason. Accept-odds segmented under cards. Session line + Set limits microcopy.
My bets: ‹ title "1 open · 7 settled" → Open(1)/Settled(7) → time+sport filters → expandable rows (placed|pick,match ●52' 1–0|odds|stake|returns|Result pill|⌄) → open row: **Cash out $X button → confirm sheet w/ exact payout + partial 50/100 + suspended state** → settled rows: Won+/Lost− net.
Phone: bar → sheet w/ same tabs.

## 5. Mock-feed engine (the invisible star)

Seeded mulberry32 → deterministic demo. Channels: clock 1s · odds drift 1.5–3s (banded random-walk, plausible overround) · suspend/resume events · goals (rare, triggers causality flash) · kickoff transitions (starting→live). `?scenario=` + Demo FAB presets. Pause on `document.hidden`. Per-cell store subscriptions — tick = 1 DOM node update.

## 6. Build task tree (execution order)

```
T0  Scaffold (vite+react+ts+router+tailwind4+biome) + fonts + tokens         [~setup]
T1  Design system: tokens.css, OddsButton, Cell, Badge, PillTabs, Segmented, Crest generator
T2  Data layer: seed.ts (fixtures/leagues/markets per wireframe names), engine.ts, stores
T3  Shell: TopBar, LeftRail, SidePanel (tabs), MobileTabBar, SearchPalette (⌘K)
T4  MatchRow/MatchCard/LeagueGroup (tri-state cells wired to engine)
T5  P1 Home · T6 P2 Live (+empty) · T7 P3 Football (+market rebind, follows)
T8  P4 Match page (scoreboard, tabs, accordions, cascade)                  ← deepest QC
T9  P5 Slip+MyBets (machine, accept flow, place/fail, receipt, cash-out)
T10 Demo dashboard + scenario flags
T11 Polish pass: motion tuning, focus rings, reduced-motion, skeletons, 404
T12 QC matrix run (below) · build · deploy Vercel · cold-link verification
```

## 7. QC checklist (the 10–20× recheck regime — every item verified at 390 AND 1440)

- [ ] Every odds cell: hover→press→select→deselect; selected survives tick flash
- [ ] Ticks: up=green▲, down=red▼, ≤4 simultaneous, never on mount; reduced-motion swaps instant
- [ ] Suspend: padlock same frame, aria-disabled, cells dead, slip leg marked; resume clean
- [ ] Odds-changed on slip: requires explicit accept; Ask/Higher/Any semantics correct
- [ ] Stake: chips, manual, return math exact (stake×odds, 2dp), invalid input guarded
- [ ] Place: pending 600–900ms → receipt ref+link; fail → reason+recovery; no double-submit
- [ ] Cash out: value, confirm, partial, suspended-cashout, success decrement
- [ ] My bets: open/settled counts correct; expanded row content; live badge ticking
- [ ] Live empty state → starting soon works
- [ ] Search: grouped results, navigates to match/market, recent, empty→popular
- [ ] Follows: star toggles persist (localStorage), feed home ordering
- [ ] Nav: all 5 pages linked, deep-links work on Vercel (SPA rewrite), back buttons correct
- [ ] Slip: persists across routes; phone bar↔sheet physics; scrim; scroll-lock; safe-area
- [ ] Numbers: tabular, right-aligned, no jitter on ticks (cell min-width)
- [ ] Neon budget ≤8% viewport; ≤3 glows; contrast AA on all text
- [ ] Focus visible on every interactive; aria-live on slip count + live clock
- [ ] Load: skeletons <400ms; first paint <2s on fast 3G; bundle sane
- [ ] Demo FAB hidden-but-findable; scenarios deterministic (seeded)
- [ ] "Sample data" badge; no real player names in goalscorer markets; USDT formatting ₮
- [ ] Verify at 390×844 AND 1440×900, plus ~768 mid; iOS Safari + Chrome

## 8. Open decisions for user
1. **Starter kit**: gated behind Housebets login — do you have an account to pull official files? (We already reconstructed the brand kit; official files would only confirm.)
2. **Deploy target**: Vercel recommended (free, SPA-friendly). GitHub repo name?
3. **Alias**: entries shared under your Housebets alias — needed at submit time, not build time.
