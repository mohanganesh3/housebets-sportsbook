# research/26-reddit-live.md — Reddit Live Mining (Part A: slip & cash-out pain)

**Method:** ~30 live web searches across Reddit complaint ecosystems plus adjacent forums (Stake Community, BMR, bitcointalk, Betfair Community, Trustpilot, App Store reviews). Round 1 was offline; everything below was pulled live.

**Source-quality key:** 🟢 direct user thread/forum post | 🟡 secondary coverage quoting Reddit threads | 🔴 official docs proving the mechanism exists

---

## 1. BET SLIP GRIEVANCES (highest-frequency cluster)

### 1a. Unconfirmed selections vanish on refresh / app-switch
- 🟢 Stake Community: *"If the page refreshes, any bet that has not been placed yet gets removed from the betslip… especially for long accumulators."*
- 🟢 BetOnline parlay bug: selections disappear mid-build, odds reset, desktop AND mobile.
- 🟡 Draft betslips typically session-local, not cloud-synced.
- **→ Persistent slip — selections saved across refresh/nav with "restored selections" banner + per-leg price revalidation. Demo: kill page mid-build → reload → slip intact.**

### 1b. Silent repricing & leg reordering — bettors submit blind
- 🟡 41,000 parlay placements at 4 US books: **38% of bettors whose leg odds changed mid-build submitted without confirming the new number**. Failure modes: display re-sorting, silent repricing, leg substitution/voiding.
- 🟢 DK PissedConsumer: picked Mariners ML, slip showed Athletics — display conventions confuse repeat users.
- **→ Locked-odds ticket preview; explicit per-leg diff row (old → new, payout delta), stable leg ordering, final review screen.**

### 1c. "Accept odds changes" misunderstood AND buggy
- 🟢 Sportsbet.io: *"'accept all odds changes' turned on… still does not accept… usually need at least 5 attempts to get a live bet placed."*
- 🟢 BMR: "accept in my favor" → bet went through at WORSE price (-145→-189).
- 🔴 OddsMonkey: the toggle only covers add→place window — widely misunderstood.
- **→ 3-state preference (accept better / ask on worse / never) + post-placement receipt showing locked vs current odds.**

### 1d. "Did my bet go through?" — ambiguous confirmation & duplicates
- 🟢 Matchbook: submission delay → users tap again → accidental duplicate bets.
- **→ Explicit pending ("placing…") → hard receipt (bet ID, timestamp, locked odds) or explicit reject reason. Place-Bet disabled while pending.** (implemented round-3)

### 1e. Sticky selections / deposit-flow drops the bet
- 🟢 Betway: selections survive app kill — frustrating for some; Sportsbet: quick-deposit flow leaves bet unplaced.
- **→ Post-placement behavior explicit (auto-clear chosen + receipt); deposit-from-slip returns to intact slip.**

---

## 2. CASH-OUT COMPLAINTS (most rage-inducing cluster)

### 2a. Suspended/removed exactly when wanted
- 🟢 SportyBet (Jan 2026): CO/Open-Bets disabled ~90 min across all 18 UCL matches; 500+ users demanded boycott.
- 🟢 bet365 UCL outage ~30 min; FanDuel Eagles–Commanders — users read timing as deliberate.
- 🔴 UKGC maintains a dedicated "I can't cash out" public page — complaint volume is structural.

### 2b. No reason shown for suspension
- 🔴 Betfair lists 7 suspension triggers — **none surfaced in UI**. Users see a greyed button, nothing else.
- **→ Suspension reason chip on CO card (Goal/VAR/Penalty/Feed) + "typically returns after play resumes" + "notify when it reopens" toggle.** (reasons implemented; notify still open)

### 2c. Multi-leg cash-out fragility
- 🔴 Sky Bet: game can suspend 5–6 min per VAR incident; 6-fold acca suspended "30 of the 90 minutes… terrible customer experience."
- **→ Per-leg CO health on the open-bet card ("4/5 legs priceable — leg 3 suspended").**

### 2d. Value drops mid-action; offer isn't honored
- **→ CO value as live ticker + last-updated timestamp + "price held for Ns"; failed CO → explicit new offer.**

### 2e. Accidental one-tap cash-outs irreversible
- 🔴 Betfair ships "Show Cash Out confirmation" toggle because this happens.
- **→ Confirm gate ON by default (implemented) + optional 3s undo window.**

### 2f. Partial/auto cash-out rare
- 🔴 Betfair partial is desktop-only; auto CO exists at ~3 books.
- **→ Partial CO slider + "auto cash out if value reaches $X".**

---

## 3. SUSPENSION & LIVE-STATE ANNOYANCE

- 🟢 Betfair VAR sagas: 5-min suspensions, CO voided then reinstated after FT — *"how the hell are you supposed to know where you stand."*
- **→ Suspension shows incident + live clock + slip-leg reason; live-stats honesty ("updated 12s ago"); "submit at reopen" queue option.**

## 4. NAVIGATION, DISCOVERABILITY & PROMO CLUTTER
- 🟡 FD shows 4 nav bars; Caesars redundant menus; Sportsbet = "promotional assault."
- 🔴 NCL: **93% of sportsbook push notifications are ads.**
- **→ Working search (done), recents rail, market-count badges; promo declutter; notification channel split.**

## 5. PARLAY / SGP BUILDER PAIN
- 🟡 "Combination not available" — no reason which legs conflict.
- **→ Anticipatory combined price + conflict explainer chip.**

## 6. FEATURE WHITE SPACE

| Wish | Evidence |
|---|---|
| Follow teams/leagues → personalized rail | 🟢 Hard Rock launched "For You" hub Dec 2025 — demand proven |
| Kickoff/price/settlement notifications | 🟢 bet365 "My Alerts" praised differentiator |
| Watchlist — track a line without staking | 🟡 third-party economy (BetIQ, EdgHouse) monetizes the gap |
| Share betslip link/code | 🟢 Book-a-Bet codes, Share My Bet |
| Auto cash-out target | 🔴 ~3 books globally |
| Edit bet | 🔴 bet365 Edit Bet praised, rare elsewhere |
| Open-bets sorting/filtering | 🟢 Pikkit: "sort by start time, or by sport" |
| Bet history transparency | 🟢 users beg for leg-level statuses |
| Slow/opaque grading | 🟢 Stake forum: bets unsettled 3+ hrs |
| Odds format toggle | 🔴 buried absurdly; implied-% almost nowhere |
| Live-bet latency honesty | 🟡 200–500ms delays measurably cut wagering |

## 7. TOP-5 "if you only build a few"

**#1 persistent slip, #2 no-silent-repricing contract, #4 suspension reason, #5 cash-out transparency card, #9 favorites rail** — covers the four loudest complaint clusters + the one wish a real book just shipped.

## 8. Caveats
- Direct reddit.com URLs under-surfaced (index suppression); threads confirmed via multiple quoting sources.
- Limiting/withdrawal disputes dominate raw volume but are policy problems, not demoable UX — deprioritized.
