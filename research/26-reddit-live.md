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

---

# Part B — Trust signals, app feel, personalization wishes

## 1. Executive clusters
1. **Trust is built at the withdrawal and the ticket, not the promo** — payout speed is the #1 "why I stay"; honest ticket states + visible net P/L close behind.
2. **Perceived speed beats measured speed** — 2s load + skeleton + instant tap feedback is forgiven; 300ms freeze unacknowledged is rage.
3. **Personalization is the #1 unmet wish** — favorites rails, bettable search, "my games first" home.
4. **Bettors keep spreadsheets because books hide the number** — "the books don't show you the number" is tracker-app marketing; in-app honest ledger = trust + RG foundation.
5. **RG that works is structural** — Danish regulator field study (14k): dismissible popups do ~nothing; limit-as-default, one-tap access, net-result displays land.

## 2. Speed & feel
- "Designed in 2010" thread: FD = least annoying/smoothest; Caesars dedicated hate thread.
- Slip state loss on app-switch = silent killer (Novig: "when it clears the parlay I just give up"); inverse: stale selections resurrecting confusingly (Betway). → **persist draft + revalidate legs + mark moved prices, never silent-clear or stale-resurrect.**
- Stake backlash: legs stay selected after parlay → auto-clear on placement (done) + accept-odds prefs first-class (done).
- Peak-event degradation: Caesars 18min AFC Championship outage; DK rejects delayed more when odds move → skeletons + instant press feedback + graceful copy.
- Density > flash for regulars: 10+ games at a glance, compact rows, dark mode by name.
- Session timeout rage → configurable timeout / biometric re-auth returning to slip+scroll state.

## 3. Trust signals / killer details
- Withdrawal tracker with visible stages (Request→Review→Sent→Received) + per-method ETA — the review stage is where delay hides.
- Merged cash+bonus balances feel like scam → split-balance display + every rejection carries a reason.
- Stale odds without staleness signal destroys trust → "updated Xs ago" freshness pulse + auto-dim stale + suspension reasons (done).
- Live-bet delay shown not hidden: Betfair 5–12s countdowns are LIKED by power users → "Placing bet in Xs" (our progress bar) + confirmed-ticket state.
- Crash-recovery: "checking if your bet was placed…" reconciliation before resubmit.
- Voided-leg opacity → per-leg Won/Lost/Void/Repriced + inline rule ("DNP = void") pre-placement.
- Geolocation/KYC timing → status chip + pre-placement check; verification progress meter early.
- Promo profiling resentment → promo cap, never in slip, never post-loss.

## 4. Personalization gaps
- Favorites/My Teams = most-requested least-delivered (Hard Rock "For You" shipped Dec 2025 proving demand).
- Search broken industry-wide (Caesars hid its own) → typeahead + typos + bettable results + saved filters.
- Promo clutter = home-screen tax → ≤3 slots, dismissible, promo-free toggle.
- SGP builders optimize "add one more leg" → show joint implied-% beside payout (honesty differentiator); filter-by-player table stakes.
- Dead tickets haunt My Bets → auto-archive lost, "hide settled" filter.
- Bolla Snapbet: betting-profile onboarding → 94% adoption, time-to-bet 184s→32s.

## 5. Notifications
- Wrong: 93% of pushes are ads (NCL 2025); marketing+security bundled; stale pushes; over-broad live toggles.
- Right: granular channels (transactional always-wanted), quiet hours w/ perishable-alert discarding + settlement roundup batching, event-personalized alerts tied to follows, Live Activity trackers (whole app category exists for "is my parlay alive").

## 6. Net P/L opportunity
- "It stops you from lying to yourself" — tracking threads canonical; CLV = the column pros add.
- Books deliberately obscure lifetime P/L (Action Network exposé; FD praised-but-cumbersome); Juice/Pikkit monetize the gap; ~60% keep no records → in-app ledger serves silent majority.
- Bet-history export adversarial → one-tap CSV.

## 7. RG that doesn't feel preachy
- Buried tools = pretend compliance (BetMGM 4-5 clicks).
- Pop-ups measurably don't work (DCCA 14k field study).
- What works: limits default at registration (must decline), one-tap-from-wallet, lower-instant/raise-24h cooldown, reality check requiring micro-decision w/ net number, duty-of-care framing.
- North-star line: *"the home screen should answer 'what's happening with my money right now' before it sells anything."*

## 8. Anti-pattern catalog (never ship)
Default above-min stakes · one-click no-confirm bets · re-bet prompt post-placement · invisible session loss · withdrawal sludge · "most popular bet" bandwagon · post-loss promo push · marketing bundled w/ security alerts · merged balances · slip cleared-or-resurrected-stale · legs staying post-parlay · dead tickets pinned · search returning U21/women's variants.

## 9. Top derived tasks (beyond Part A's top-5)
Net P/L ledger · withdrawal-stage tracker · split balances · leg-level live status w/ rules · freshness pulse · pending-countdown copy · geolocation/KYC status · promo governance · notification channels · hide-settled filter · joint implied-% · density toggle · CSV export · player-event alerts.
