# Design-Psychology Playbook — Crypto Sportsbook (research agent report)

**Context:** Scorecard: Match page 20, Bet slip + My bets 20, Sports home 15, "Feels like Housebets" 15, Live 10, Football 10, Every state (suspended/changed/failed) 10. Ties break on Match page, then brand fit. Shell = top bar + left nav + side panel; 390px + 1440px; phone slip = bottom bar; singles only, decimal odds, USDT; no multis/boosts/trackers. Brand font: Figtree. Judges: the casino's own product+design team — "the sportsbook we'd ship tomorrow" → state-coverage and maturity > gimmicks. Prioritize: **Match page ≈ Bet slip > Home > Live/Football**; states are a first-class deliverable.

## 1. Core principles table

| # | Principle | Source | Mechanism | Application | Where |
|---|---|---|---|---|---|
| 1 | Variable-ratio reinforcement | Skinner | Unpredictable reward/timing → highest response rate | Odds tick on non-uniform cadence; live strip always has new motion | Live feeds |
| 2 | Reward prediction error | Schultz | Dopamine spikes on anticipation/unexpected change | Pending "Placing…" ~600–900ms; goal-flash before settle; cash-out value ticking | Match, slip, My bets |
| 3 | Machine zone / perfect contingency | Schüll, Addiction by Design | Tight action→feedback loop, zero interruptions | One-tap odds→slip→place, no page transitions; session clock as ethical brake | Slip loop |
| 4 | Loss aversion ~2:1 | Kahneman/Tversky | Frame as gains/returns, never "risk to win" | "Potential return 21.00"; cash-out converts open risk into offer | Slip, My bets |
| 5 | Cash-out as risk-reduction option | Psychol. Sci. 2024 | Availability ↑ stakes up to 35%, reduces bet anxiety | Cash-out always visible on open bets + honest suspended state | My bets |
| 6 | Near-miss effect | Clark et al. 2009 | Losses proximal to wins recruit win circuitry | Settled-lost bets show why ("Lost — conceded 90'+2"); never fabricate | My bets settled |
| 7 | Illusion of control | Langer 1975 | Agency ↑ engagement | User-controlled: follows, markets, stake, accept-odds mode, cash out | Football, slip |
| 8 | Anchoring | Tversky & Kahneman; Ariely | First number drags judgment | Quick-stake chips anchor scale; auto "Potential return"; strike-through old odds | Slip, odds-changed |
| 9 | Commitment escalation / endowment | Kahneman; Cialdini | Built things feel owned | Slip persists w/ badge; placed bet → receipt + ref ID | Slip, confirm |
| 10 | Goal-gradient | Hull; Kivetz | Effort ↑ near goal | "Starting soon" countdowns; "kicks off in 4 min" pills | Home, Live empty, My bets |
| 11 | Social proof | Cialdini | Popularity reduces uncertainty | "Top competitions" ranking; follow counts; optional "n bets" chips | Home, Football |
| 12 | Gambler's fallacy vs hot-hand | Xu & Harvey 2014 | Losers pick riskier next | Facts (form W/D/L) not "due" narratives; no hot-odds upsell after loss | Football, My bets |
| 13 | System 1 glanceability | Kahneman | Fast pattern recognition | Tabular nums, right-aligned odds, stable grid, ≥11px, dual coding | Odds grids |
| 14 | Honest urgency only | Cialdini; CAP guidance | Real deadlines focus; fake destroy trust | Real suspension/kickoff clocks only; no fake expiry countdowns | Live, Match |
| 15 | Serial-position + peak-end | Ebbinghaus; Kahneman | First/last remembered; peak+ending judged | Nav Home first/My Bets last; end flows on designed moments; goal-flash = peak | Nav, goal flash, confirm |
| 16 | Von Restorff isolation | — | Visually distinct wins attention | LIVE pill, padlock, one primary CTA per view = only high-sat elements | Global |
| 17 | Fitts's law | Fitts | Time ∝ distance/size | Cells ≥44px; slip bottom on phone; Place-bet full-width | Targets |
| 18 | Hick's law | Hick | Decision time ∝ choices | ≤6 market tabs (matches brief); collapse secondary markets | Match tabs |
| 19 | Miller 7±2 | Miller | Working memory ceiling | ~7 sports nav items; ≤9 rows before fold | Nav, rows |
| 20 | Jakob's law | Nielsen | Users carry bet365/Stake conventions | 1X2 L→R home/draw/away, green/red ticks, padlock, right-rail slip — match conventions, innovate in polish | Layout |
| 21 | Tesler's law | Tesler | Complexity is conserved — absorb it | UI computes returns/moves; user never does arithmetic | Slip math |
| 22 | Defaults = choice architecture | Thaler & Sunstein | Defaults are recommendations | Remember-last-stake ON; accept-odds = "Ask" default; editable chips | Slip settings |
| 23 | Mapping & affordance | Norman | Layout mirrors the thing; signifiers show control | 1 X 2 under Home/Draw/Away order; cells look like buttons | Odds cells |
| 24 | Scanning & satisficing | Krug | F-scan, first acceptable option | League headers as anchors, zebra/hover, self-evident empty states | Home, Live, Football |
| 25 | Hooked loop | Eyal | Trigger→Action→Variable reward→Investment | Trigger=live tick → Action=tap → reward=movement/result → **Investment=follows/stake/history** | Follows, My bets |
| 26 | Visceral/behavioral/reflective | Norman, Emotional Design | Visceral: dark+brand glow; Behavioral: <100ms feedback; Reflective: "I follow my club" | Theme, follows | All |
| 27 | Hot-cognition risk | AGRC literature | Speed+emotion → impulsive betting | Fast loop BUT money facts always visible (balance, net session); no one-tap re-bet after loss | Slip, My bets |

## 2. Page-by-page application map

**Global shell** — tokens reuse shell dark scale; Figtree; `tabular-nums` for all odds/scores/money; right-aligned numerics; balance pill in top bar w/ decrement animation on place; left nav ≤7 items + More, LIVE gets only persistent pulse-dot; search `⌘K` grouped results (Teams/Competitions/Matches/Markets); desktop side rail = persistent slip (endowment); phone slip = 56px bottom bar → sheet ~85% (markets partially visible beneath).

**Sports home** — Live-now strip = variable-ratio engine (snap cards: icon, teams, ticking clock, score, compact 1X2; independent updates → perpetual motion; ~7 visible); highest-leverage events first; Starting soon rows get real countdowns `Starts in 04:12`; Top competitions = social-proof tile grid w/ follow stars; sports nav ~7 chips + ⌘K search; one accent color for actionable things only.

**Live** — grouped sport→league collapsible headers; filters ≤7 chips + league dropdown + count badge; score+clock column = visual peak (brighter weight); goal → amber flash on score cell 1.2s + affected odds nudge simultaneously; suspension = padlock+40% dim same frame (trust moment); empty → "Nothing live" + Starting soon + next-kickoff countdown + CTA.

**Football** — top-5 league tabs w/ crests + follow stars; row anatomy `[time/live min][Home v Away]…[1][X][2][›]`; cells 64×40 desktop / 48×44 phone, hover lift (affordance); 1X2 order = natural mapping home/draw/away; star toggle 180ms scale-pop; follows feed "My teams" on Home; keep quiet — restraint reads premium.

**Match page** — scoreboard hero ~120px/96px: breadcrumb, crests, score ~40px, live clock+phase, event ticker; goal → digit pulse + accent glow 1.2s (peak-end); six market tabs sticky under scoreboard, "Popular" first (serial+satisficing); market cards: name header + selection grid ≥56px; tri-state cell idle/selected/suspended + up/down flash; selected persists over flash; suspension cascade → affected market dims+padlocks same frame, SUSPENDED ribbon on scoreboard, selected suspended pick stays in slip (state showcase); 2-col grid desktop / 1-col phone; collapse beyond first two groups.

**Bet slip + My bets** — selection card: pick, market, match, old→new odds when changed (`2.10 → 2.30` strike+dir color), remove, state chip (Active/Changed/Suspended); stake input + chips 5/10/25/50 (+muted Max); potential return live-computes while typing, accent color; accept-odds segmented `Ask/Higher only/Any` default Ask; changed slip card → amber + `Accept 2.30` button (demo-able); Place bet full-width bottom w/ stake on CTA (`Place bet · 10.00 USDT`); flow: tap → pending 600–900ms → check-draw + receipt (bet ref, stake, odds, return, View in My bets); failure → shake + reason + recovery CTA; My bets: Open/Settled, cash-out inside open cards w/ live value + match score, confirm sheet + partial slider 50/100%, unavailable state honest; settled: Won green/Lost muted + result reason + net P/L.

## 3. Micro-interaction spec (motion = meaning; motion communicates state, nothing more)

| Element | Trigger | Spec | Principle |
|---|---|---|---|
| Odds up-tick | feed ↑ | cell bg→green @25% 900–1200ms, fade 300ms ease-out; digits cross-fade 150ms; ▲ 200ms | improved value; cell flash = peripheral-visible |
| Odds down-tick | feed ↓ | same, red; ▼ | worse |
| Flash discipline | — | only real deltas; never on first paint/re-render/scroll; batch >2/s; reduced-motion → instant | honest motion = integrity test |
| Market suspend | feed | 0ms padlock + 40% desat + pointer-events none same frame; label fades 150ms | never a stale tappable price |
| Market reopen | feed | padlock out, neutral | neutral |
| Tap odds→slip | tap | press-in 80ms; chip flies to slip 300–350ms cubic-bezier(.2,.8,.2,1); count badge pops 200ms spring | triple feedback stops double-tap |
| Sheet open | tap | rise 250ms ease-out, scrim 40% | context preserved |
| Place bet | tap | `Placing…` 600–900ms fixed | anticipation (RPE) |
| Bet success | confirm | check stroke 300ms + card rise 250ms + subtle glow (no confetti cannon) | peak-end designed ending |
| Bet failure | reject | shake 2×40px 300ms + reason + recovery | Norman feedback+mapping |
| Goal flash | score ↑ | score cell amber 1.2s + minute bump + odds tick together | causality visible |
| Countdown | kickoff | mm:ss → flips to LIVE | goal-gradient |
| Skeleton | nav | shimmer <400ms; never spinners on odds | speed perception |
| Reduced motion | — | flashes/shakes off; ≤150ms transitions | a11y = professionalism |

Latency: <100ms tap response; >250ms interaction latency loses engagement — prototype must feel instant.

## 4. Anti-patterns (credibility killers w/ casino product team)

1. Losses disguised as wins · 2. Fake urgency countdowns · 3. Manufactured odds flashes (no real delta = fined dark pattern) · 4. Pre-ticked "accept any odds" or hidden changed-price accept · 5. Hidden/decaying cash-out · 6. One-tap re-bet after loss · 7. Stake-inflation nudges (highlighted Max, auto-double) · 8. Loss→riskier-odds upsell · 9. Generic error modals (need reason+next step) · 10. Unexplained jargon markets ("AH -0.75" w/o plain label) · 11. Non-tabular number jitter · 12. Instructional text walls.

## 5. Responsible-gambling patterns that WIN points

Session info in slip footer (`Session 42m` + net position); transparent odds math (`stake × odds = return`, implied-probability tooltip `2.00 ≈ 50%`); balance always visible + decremented on place; net P/L not just "Won!"; "Set limits" line under place button (proximity-to-money); demo/sample badge; honest suspended/failed/changed states (=10 pts AND trust core).

## 6. Top 15 highest-impact wins (by scorecard leverage)

1. Tri-state odds cell + up/down flash + ▲▼ dual-coding (Match 20 + States 10)
2. Frame-perfect suspension cascade (padlock same-frame; integrity moment)
3. Live slip side rail / phone bottom bar w/ persistent count (endowment)
4. Odds-changed accept flow as visible feature (`2.10→2.30` + Ask/Higher/Any, default Ask)
5. Cash-out done properly (ticking value, confirm sheet, partial slider, honest unavailable)
6. Receipt moment (pending→check-draw→bet-ref receipt→My bets deep-link)
7. Goal-flash causality (score pulse + simultaneous odds ticks)
8. Quick chips + live return math in accent (`Stake × odds = return`)
9. Follows as Hooked investment (star teams/leagues; Home resurfaces them)
10. Live strip = variable-ratio engine (independent ticking cards)
11. Goal-gradient countdowns (real `Starts in 04:12`; empty→action)
12. Social-proof ranking sans fake numbers (Top competitions; Popular tab first)
13. Tabular-numeral + right-aligned discipline everywhere
14. Failure states w/ reason + recovery
15. Session-info + limits line in slip (maturity whisper)
