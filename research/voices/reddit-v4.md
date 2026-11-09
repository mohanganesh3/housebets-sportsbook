# research/voices/reddit-v4.md — Reddit Voice Mining v4 (verified-citation pass)

**Brief:** Research agent T10a — mine REAL bettor feedback to ground the Housebets
design-contest entry. Builds on `research/14-reddit-mine.md` and
`research/26-reddit-live.md`; this pass re-verifies claims against actually-opened
thread pages and adds clusters those files didn't cover (crypto expectations,
error/geo dead ends, praise worth borrowing).

**Method note (read before trusting):** Direct Reddit/API access was blocked
(HTTP 403, JS challenge, Anubis PoW on redlib mirrors). Every citation below is a
thread that was **actually opened and read** — mostly via Wayback Machine
snapshots of the canonical Reddit URL, a few via translated-proxy renders.
Quotes are verbatim where marked `"..."` and close-paraphrase otherwise.
Nothing below was sourced from AI-generated search summaries.

**Source-quality key:**
- 🟢 direct bettor post/comment (thread opened, quote captured)
- 🟡 secondary/official coverage (opened, but not a bettor's own words)
- `UNKNOWN` = searched but could not verify; claim held open, not asserted

**Caveat:** these are anecdotes, not incidence stats. Where a thread contains
conflicting opinions that conflict is shown — treat each as "at least one real
bettor experienced/said this," never "most users."

---

## CLUSTER 1 — BET SLIP PROBLEMS
(lost selections · silent repricing · accept-odds confusion · duplicates · sticky)

### 1a. Slip/bet vanishes after placement — "my winning slip disappeared"
- 🟢 DraftKings — missing settled slip:
  https://www.reddit.com/r/DraftKingsDiscussion/comments/16y0i2f/has_anyone_experienced_a_missing_bet_slip/
  *"I had a winning slip and as soon as the Jets came finished it disappeared. I had
  Kansas City -2.5 as my last leg."* — a bet the user believes won is simply absent
  from bet history; no receipt to appeal with.
- 🟢 FanDuel — "Saved Bets" tab silently removed:
  https://www.reddit.com/r/fanduel/comments/18h1d6t/did_they_remove_the_saved_bets_tab/
  *"can't save future bets and don't see tab anymore"*; replies show the feature
  disappeared for some users/devices but not others — feature regressions land
  unevenly and users get no changelog, so they assume the bet/app is broken.

### 1b. Odds/line silently differ from what the bettor thought they locked
- 🟢 Bovada — odds moved while the confirmation spinner ran:
  https://www.reddit.com/r/Bovada/comments/tfj0po/bovada_changing_the_odds_as_im_getting_the/
  *"While the lights [were] spinning, the odds changed to -600… Bet went through
  at -600."* — the price changed *during* the pending state with no diff shown.
- 🟢 FanDuel — user believes the total was changed retroactively:
  https://www.reddit.com/r/sportsbetting/comments/u3euwe/999_when_i_placed_this_bet_the_ou_was_2355_i_am/
  User posted "999 when I placed this bet the O/U was 235.5" insisting the placed
  ticket differed from what they saw; replies explain live-line movement and
  default auto-accept. Whether or not the book erred, the *perception* of a
  retroactively altered ticket is real — users can't diff "what I tapped" vs
  "what I got." (Frame as user-perception evidence, not proof of book error.)
- 🟢 Roobet (crypto book) — accept-odds applied asymmetrically:
  https://www.reddit.com/r/Roobet/comments/13eq5yq/roobet_sportsbook_unethical/
  *"if the odds move in the favor of the book… rather than the bet not going
  through it will go through, even if it is above the max wager… BUT if the odds
  go against the book… the book will NEVER accept your bet."* Poster claims screen
  recordings and calls it "about as close as you can get" to cheating. The toxic
  detail for design: acceptance logic felt one-directional, and over-max-wager
  bets were forced through when it suited the book.

### 1c. "Accept odds changes" toggle misunderstood
- 🟢 r/SoccerBetting — bettor unsure what the toggle does:
  https://www.reddit.com/r/SoccerBetting/comments/iyyd40/accept_odd_changes/
  *"Put a few bets on tonight's games and my cashout has dropped from £5.00 to
  £1.85 without a ball being kicked… is it better to generally accept the odd
  changes?"* — users conflate auto-accept, line drift and cash-out value into one
  blurry "the numbers move against me" grievance. (Archived capture thin; title
  + snippet verified.)
- 🟢 Stake — opaque stake limit + vague errors:
  https://www.reddit.com/r/Stake/comments/127c3ti/whats_wrong_with_sportsbetting_slip_on_stake/
  *"It says I'm over the limit… the worst part is stake doesn't tell me the max
  bet… why is this difficult to show on the screen?"* — bet rejected with no
  limit shown; also repeated "unknown error" until support confirmed placement.

### 1d. Duplicates from ambiguous pending state
- `UNKNOWN` — direct duplicate-bet threads were discovered in earlier passes
  (Matchbook re-tap → duplicate, per `26-reddit-live.md`) but no fresh Reddit
  thread was opened this pass to re-verify. Keep the claim sourced to file 26.

### Design implication
- Slip must show **stake limits before entry fails** (min/max on the slip itself).
- A placed-ticket **receipt with locked odds/lines + timestamp** is the only
  defense against "my slip changed/disappeared" disputes.
- **Never change price during the pending spinner without aborting the submit**
  — the "lights spinning, price changed, bet went through" pattern is the
  single most trust-destroying slip behavior.
- Odds-acceptance must be a **3-state preference** (accept better / ask on
  worse / never), labeled in plain words, and it must be **symmetric** — a book
  that only auto-accepts when odds move its way reads as rigged.
- Feature removals (Saved Bets) need an in-product note; silent regressions
  produce "is my account broken?" threads.

---

## CLUSTER 2 — CASH-OUT PROBLEMS
(unavailable when wanted · no reason · value shifts mid-tap · accidents · no partial)

### 2a. Cash-out withdrawn exactly when most wanted
- 🟢 FanDuel — "why won't they let me cash out wtf":
  https://www.reddit.com/r/fanduel/comments/1679lx8/why_wont_they_let_me_cash_out_wtf/
  Top comments: *"cash out is a courtesy, they don't have to offer it"*;
  *"I had a $1 bet with winning $140. cash out option at $90 was the highest it
  gave me… it never offered it again"*; *"they'll disable the cash out option
  once 2 out of 4 legs have hit"*; *"FanDuel doesn't seem to be offering cash
  outs as much as they used to."* Pattern: cash-out quietly disappears as the
  ticket's win-probability rises — precisely when its value peaks.
- 🟢 Betfair — suspended for an hour mid-match:
  https://www.reddit.com/r/SoccerBetting/comments/1692c8j/betfair_refusing_to_let_me_cash_out/
  *"cash out would be £40+ yet its been suspended for the past hr"*; commenter:
  *"Usually when it's unavailable for a whole game it means that something is
  broken."* Another user saw an offer appear briefly then suspend on a goal,
  with support unable to act.
- 🟢 DraftKings — suspensions feel arbitrary:
  https://www.reddit.com/r/DraftKingsDiscussion/comments/19bupce/cash_out_suspensions/
  *"Does anyone know why parlays with 4-5 legs that have hit would be suspended?
  … it seems kind of arbitrary."* Even users who know cash-out is discretionary
  still cite the **absence of any stated reason** as the insult.

### 2b. Cash-out fails during outages while betting still works
- 🟢 bet365 — live bets invisible during a "malfunction":
  https://www.reddit.com/r/sportsbook/comments/nnvb7j/bet365_not_showingallowing_live_bets_to_be_cashed/
  *"This is the second time that bet365 had a 'malfunction' where live bets are
  not shown… hence they cannot be cashed out early or cancelled"*;
  *"They still allow people to bet… but you can't even see if your bet went
  through."* Comments report blank "My Bets" screens — the book kept accepting
  new stakes while existing positions were invisible. Asymmetry again: the
  money-in rail never breaks, the money-out rail does.
- 🟢 bet365 — cash-out feature revoked per-account:
  https://www.reddit.com/r/bet365/comments/1bphroe/any_experience_on_having_the_cash_out_feature/
  User reports the cash-out option removed entirely; terms permit revocation on
  suspected abuse, and the user suspects the feature is priced with margin
  anyway — i.e., bettors believe "cash-out exists only while you lose."

### 2c. Value whiplash & suspension racing
- 🟢 r/SoccerBetting — VAR suspension race:
  https://www.reddit.com/r/SoccerBetting/comments/cyf5zk/var_is_killing_me_in_the_betting/
  One bettor: *"i saw on another betting app the goal being reviewed so i
  quickly cashed out, then on my app with this bet it got suspended and goal
  was chopped off, i had already cashed out though."* Users exploit cross-app
  latency gaps — meaning suspension speed itself is a feature sharp users game.

### 2d. Accidental taps / missing partial cash-out
- `UNKNOWN` — a FanDuel "accidentally cashed out" thread (192mskp) was
  discovered but had no usable Wayback snapshot and the `/save/` request timed
  out; treat accidental-tap and partial-cash-out complaints as unverified in
  this pass (file 26 covers the mechanism expectation).

### Design implication
- **Suspension reasons beat suspension silence**: "Cash-out paused — VAR review
  in progress" defuses "they don't want me to win" better than a grey button.
- Show **cash-out availability history** on the ticket; users track "it vanished
  after leg 2 hit" — make the state machine legible rather than vibes.
- If cash-out is per-account revocable, **say so on the ticket** ("cash-out not
  offered on this market") instead of silently hiding the button.
- Cash-out confirm needs an **undo window or press-and-hold**, not a hair
  trigger (accidental-tap reports exist but unverified this pass — cheap
  insurance either way).
- Partial cash-out (slider) is the honest differentiator bettors name-check on
  bet365 — see Cluster 7.

---

## CLUSTER 3 — SUSPENSION & LIVE-STATE ISSUES
- 🟢 The 7-second in-play delay:
  https://www.reddit.com/r/sportsbetting/comments/tizc51/help_getting_around_7_second_delay_on_live_bets/
  *"there is a 7 second delay when placing live bets"* — user believes the book
  deliberately waits so odds can move against the submission; asks for
  workarounds, finds none.
- 🟢 BWIN quietly raised its delay:
  https://www.reddit.com/r/sportsbook/comments/tjbnbn/in_play_bet_delay/
  *"Previously… it wasn't that long. Now I'm @ 10 sec. delay on any in play
  bets."* — delay was increased silently; user had to crowdsource whether other
  books did the same because the book never told him.
- 🟢 VAR suspensions:
  https://www.reddit.com/r/SoccerBetting/comments/cyf5zk/var_is_killing_me_in_the_betting/
  *"a goal is scored and the screen stays suspended you waiting for the
  disallowed"*; *"you can't celebrate a goal till the match has restarted now"*;
  *"It's insane how fucking arbitrary it is."* Suspension during review is
  correct behavior — but an unlabeled grey market reads as malfunction.
- 🟢 Pinnacle live betting panned in a detailed user comparison:
  https://www.reddit.com/r/sportsbook/comments/lbrd37/pinnacle_review/
  *"Live betting is awful, no scores are displayed and are often locked up"*
  plus *"Site is very slow and unresponsive at times"* — a sharp-priced book
  still loses users when live state is unreadable.
- 🟢 Betfair hour-long suspension (Cluster 2) doubles as live-state evidence:
  a market can sit suspended far longer than users expect, with no ETA.

### Design implication
- Live markets need a **named state** ("Suspended — possible goal under
  review", "Suspended — market re-pricing"), not just greyed buttons.
- Show the **submission delay honestly** (countdown or "bet queued ~5s") with
  the rule applied; unexplained 7–10s holds read as the book shopping for a
  better price.
- In-play score/clock must be **in the bet context** — Pinnacle gets called out
  specifically for locking markets with no score visible.
- When a delay changes (BWIN 10s), it's a product change users will hunt down
  anyway — publish it.

---

## CLUSTER 4 — NAVIGATION, DISCOVERABILITY & PROMO CLUTTER
- 🟢 "Why is the DraftKings app so bad?" — conflicting verdicts:
  https://www.reddit.com/r/sportsbook/comments/1cl6nsp/why_is_the_draft_kings_app_so_bad/
  *"the app itself is fine to use but something about it makes it bad."*
  Complaints: extra SGP entry button forces users to **rebuild selections**
  instead of upgrading a built slip; counterpoints praise DK layout/dark theme
  and call FanDuel *"the best sportsbook app in terms of UI and responsiveness."*
  Net: subjective — but the "rebuild your slip for SGP" friction is concrete.
- 🟢 "Worst sportsbook apps" consensus thread:
  https://www.reddit.com/r/sportsbook/comments/14a34kg/is_there_a_consensus_of_worst_sports_book_apps/
  Attributed examples only: one app called *"slow laggy shit"*; one user calls
  FanDuel *"so slow it almost doesn't function"* (contradicted by others);
  BetRivers panned for UI; bet365 called a favorite *"but so many bugs they
  refuse to fix."* Same product, opposite verdicts — usability is contextual.
- 🟢 Sportsbet odds spam in the AFL app (adjacent ecosystem):
  https://www.reddit.com/r/AFL/comments/hg21a5/anyone_else_frustrated_with_being_spammed_with/
  *"Anyone else frustrated with being spammed with Sportsbet odds in the app?"*;
  *"the ugly arse sportsbet logo popping up nine times"*; the opt-out is buried
  under an "18+ settings" toggle and **still leaks** ("turned that off but still
  get them on some of the screens"). Same thread shows the flip side: *"I
  actually like seeing the odds. It's good info"* and *"I'd prefer the odds be
  converted to implied win probability % so it doesn't double as a gambling
  advertisement."* — odds-as-content is welcome; odds-as-ad is predatory.
- 🟢 FanDuel Saved-Bets regression (Cluster 1) is also a discoverability data
  point: bettors **use save-for-later/watchlist behavior** and notice within a
  day when it vanishes.
- `UNKNOWN` — fuzzy-search/player-prop-burial threads were surfaced in search
  but no fresh thread was opened this pass; prop-hunt complaints stand on file
  26's citations.

### Design implication
- Slip should **upgrade in place** (add legs → same-game parlay) rather than
  forcing a rebuild through a separate SGP door.
- **Odds can be content or ads** — the difference users name is branding/
  repetition and an honest kill-switch. One clean global toggle that actually
  works; implied-probability display is a literal user suggestion.
- Promo modules need a governance rule (cap per screen); "logo nine times"
  is the quotable failure mode.
- Save-for-later is a real, noticed behavior — a watchlist/favorites rail is
  cheap and beloved when present, loudly missed when removed.

---

## CLUSTER 5 — PERFORMANCE & CRASHES AT PEAK EVENTS
- 🟢 FanDuel crash at tip-off:
  https://www.reddit.com/r/fanduel/comments/1cxn1m0/app_crashed_right_before_tipoff/
  *"2nd time this month right before tip off they took my money… it's not
  letting me place any bets."* Comments: *"my money is gone"*; *"showing $0 for
  mine but I just placed a bet"*; support queue *"12,378th in line."* Peak-load
  failures hit at the exact moment intent is highest, and the queue length
  itself becomes the screenshot.
- 🟢 DraftKings chronic lag:
  https://www.reddit.com/r/DraftKingsDiscussion/comments/10jtd03/app_so_laggy_draftkings_app_has_always_been_so/
  *"draftkings app has always been so laggy on my phone"* — post-level evidence
  only (no comments in capture), but matches the "slow laggy" chorus in the
  worst-apps thread.
- 🟢 DraftKings — live bet + balance vanish mid-event:
  https://www.reddit.com/r/DraftKingsDiscussion/comments/ytqlff/live_betting_not_showing_up_in_bets_but_they_took/
  *"The money was taken from my account… placed the bet, then both the money
  and bet disappeared."* Replies: receipts were the only evidence; users
  couldn't re-bet during a major event while funds were in limbo.
- 🟢 bet365 Champions League outage (Cluster 2) — blank "My Bets" during the
  peak fixture is the same failure class: degrade exactly at max concurrency.
- `UNKNOWN` — Stake server-lag threads (1clmd70, 197naru, 1e6q7l8) exist in
  search results but had no Wayback snapshots; `/save/` timed out. Crypto-book
  peak-lag evidence remains unverified this pass.

### Design implication
- **Balance is a ledger, not a cache**: a debited stake with no visible bet is
  the worst possible state — every submission needs a durable pending record
  the user can see ("Bet #1234 placing… 0:03") even if the market feed dies.
- Crash recovery = **reconciliation on relaunch**: restore slip, show pending
  bets first, reconcile balance to server truth with an explicit note.
- Peak-event readiness is a feature to demo: the entry that visibly survives
  "tip-off load" (queued submissions, graceful suspension, honest status)
  answers the most-quoted failure mode.
- Support-queue visibility ("you're #N") is better than silence but the real
  fix is self-serve bet-status lookup.

---

## CLUSTER 6 — EMPTY / ERROR / LOADING / GEO DEAD ENDS
- 🟢 FanDuel geolocation false-negative:
  https://www.reddit.com/r/fanduel/comments/11a0imy/location_verifiation_problem/
  *"Fanduel can't verify my location at home, but it can verify my location at
  work, both same states."* Comments: Wi-Fi vs cellular, VPN false-positives,
  reinstall/permission resets — the check is a black box that fails with no
  actionable hint.
- 🟢 FanDuel — stake debited, no bet shown:
  https://www.reddit.com/r/fanduel/comments/zmpd0d/cant_find_active_bets_but_money_was_taken_as_if/
  Title: *"Can't find active bets, but money was taken as if they went through.
  what's going on?"* (capture thin; title-level + context verified).
- 🟢 bet365 — settled ≠ credited, no settlement timestamp:
  https://www.reddit.com/r/sportsbook/comments/ukrwe7/bet365_warning_if_your_bet_slips_remain_unsettled/
  *"do not assume your settled bet means your account will be credited"* —
  history shows placement time but not settlement/credit time, so users can't
  reconcile when funds actually landed.
- 🟢 Stake — "unknown error" dead end (Cluster 1): rejection screens that say
  nothing and support as the only unlock.
- 🟢 Roobet (Cluster 1): *"support seems to not care"* — support black hole is
  part of the error experience, not a separate one.

### Design implication
- **Every dead end gets a next action**: geolocation fail → list the actual
  cause candidates (VPN detected, Wi-Fi AP location, permission state) with
  per-item checks, not "location unavailable."
- Bet history needs **three timestamps** (placed / settled / credited) — the
  settled-not-credited limbo is where trust dies.
- Errors carry **codes + human text**: "Error 4F2 — stake above your limit
  ($250 max)" beats "unknown error."
- Pending/debited state must be **findable without support** — a "being
  processed" lane in My Bets.

---

## CLUSTER 7 — WHAT BETTORS PRAISE (borrow honestly)
- 🟢 bet365 overall:
  https://www.reddit.com/r/sportsbook/comments/at056z/thoughts_on_bet365/
  *"definitely my favourite"*; *"far superior"*; *"fast cash outs (2-3 days via
  CC & almost instant to idebit)"*; breadth of pre-match/live markets. Same
  thread carries the counterweight: bugs and account restrictions.
- 🟢 bet365 Edit Bet (mixed but instructive):
  https://www.reddit.com/r/SoccerBetting/comments/5ufuzd/you_can_now_edit_your_bets_after_you_placed_them/
  Feature: *"add, swap or remove selections on unsettled straight accumulators
  both pre-match and In-Play."* Mechanism exposed by a user: *"it's not really
  an edit… basically just like cashing out and then putting your cash out back
  on"* — and another user confirms it saved them after a selection mistake.
  Borrow: **post-placement leg edits**; the honest mechanism (reprice via
  cash-out) is fine if shown.
- 🟢 Pinnacle — honest-pricing praise, UX panned:
  https://www.reddit.com/r/sportsbook/comments/lbrd37/pinnacle_review/
  Praised: *"they don't limit you if you keep winning"* + lowest margins —
  *"best sportsbook for professional players"* per the thread. Panned: no
  cash-out ("you feel obligated to lock in"), awful live betting, slow site,
  3x rollover, one free withdrawal/month. bet365 praised in same comparison:
  cash-out value *"actually increases"* and can exceed stake pre-event;
  *"once a bet hits — the money is released — unlike Pinnacle which waits till
  the end of the game"*; site *"more responsive and easier to navigate."*
- 🟢 FanDuel speed + DK layout:
  https://www.reddit.com/r/sportsbook/comments/1cl6nsp/ — FD = *"best sportsbook
  app in terms of UI and responsiveness"*; DK = *"everything is laid out nicely
  and easy to find"* + promo love. Speed and findability are the two
  repeatable praise axes.
- 🟢 Stake withdrawal speed (crypto):
  https://www.reddit.com/r/onlinegambling/comments/w8vnzk/crypto_sites_with_fastest_withdrawals/
  *"wtd $$ is nearly instant, which is a huge plus vs. many other sites that
  take multiple days."* Instant withdrawal is Stake's single most-cited
  praise point.
- 🟢 Odds-as-information (AFL thread): non-bettors like seeing odds for market
  signal — a clean "probability view" serves even users who never stake.

### Design implication
- The borrowable winners: **fast/instant withdrawals** (the #1 crypto praise),
  **partial+full cash-out that can exceed stake**, **Edit-Bet-style leg
  editing**, **favorites/watchlists**, **settle-on-leg-hit crediting**.
- "Don't limit winners" is a positioning/asset claim — if Housebets can't
  honestly claim it, don't borrow the line; bettors audit this claim hard.
- Praise clusters around **speed and clarity**, not visual flash — bet365 is
  called visually dated and still the favorite.

---

## CLUSTER 8 — CRYPTO-BOOK EXPECTATIONS (USDT · speed · anonymity)
- 🟢 Fast withdrawals are THE crypto-book benchmark:
  https://www.reddit.com/r/onlinegambling/comments/w8vnzk/crypto_sites_with_fastest_withdrawals/
  OP asks for *"fastest withdrawals in crypto"*; Stake recommended because
  *"wtd $$ is nearly instant, which is a huge plus vs. many other sites that
  take multiple days."*
- 🟢 KYC/anonymity is a live tension, not a settled norm:
  same thread — *"FYI for U.S players — avoid Stake. They're taking the
  verification process serious now."* Counter: *"I know a few US players that
  have recently created accounts and have dep/wtd without any issues… they
  usually don't ask for any additional verification until you hit Plat. III."*
  And the anonymity-first position: *"why bother with workarounds when you can…
  play at other casinos… without having you do KYC verification."* Bettors
  weigh: light-verification vs. termination risk — *"you're always going to
  run the risk of violating their policy and getting your account terminated."*
- 🟢 Cloudbet — withdrawal backlog opacity:
  https://www.reddit.com/r/sportsbook/comments/8njzr3/cloudbet_withdrawals_delays/
  *"I have one withdrawal for .33 BTC pending for 54 hours now. Support keeps
  saying they have a backlog and are processing withdrawals manually but I
  don't see anything posted on any forums online or on their twitter."*
  The crypto-native gripe isn't the delay — it's a **manual queue with no
  public status**.
- 🟢 Stake slip opacity (Cluster 1) and 🟢 Roobet asymmetric odds acceptance
  (Cluster 1) both recur on crypto books — crypto books inherit every fiat-book
  slip sin, minus the excuse of payment-rail complexity.
- `UNKNOWN` — USDT-specific complaints, Shuffle product UX (its subs are
  promo-shell communities), and Sportsbet.io direct threads were not verified
  this pass. Where file 26 cites Sportsbet.io accept-odds bugs, keep that
  sourcing; don't silently upgrade.

### Design implication
- Crypto bettors benchmark on **withdrawal latency** — a visible
  withdrawal-status tracker (queued → processing → txid) turns the most common
  crypto complaint into a feature. Cloudbet's sin was an invisible manual
  queue, not the 54h itself.
- **Say the KYC policy plainly and early**: "no KYC until X threshold" or
  "KYC required" — bettors choose on this axis and resent discovering it at
  withdrawal time. Ambiguity reads as a trap.
- USDT/stable balances should display **fiat-equivalent + token amounts**; the
  audience thinks in both units. (Design-grounded inference from the
  withdrawal-latency/verification evidence; no direct USDT UX thread opened —
  flag as inference, not quote-backed.)
- Crypto books get **zero slack** on slip honesty — the Roobet asymmetric-
  acceptance thread shows crypto bettors screen-record and litigate publicly.

---

## DERIVED ASK PROPOSALS (design-ready, evidence-mapped)

1. **Persistent slip with restore banner** — selections survive refresh/nav/
   app-switch; per-leg revalidation on return. *(1a, plus file-26 mechanism)*
2. **Locked-odds receipt** — every placed bet gets ID + timestamp + locked
   price/line, immutable and shareable. *(1a, 1b, 5, 6)*
3. **No repricing during the pending spinner** — abort-and-ask if price moves;
   show old→new diff before resubmit. *(Bovada spinner, Roobet asymmetry)*
4. **3-state odds-acceptance** — accept-better / ask-on-worse / never, in plain
   words, applied symmetrically. *(Roobet, FanDuel O/U dispute, SoccerBetting)*
5. **On-slip stake limits** — min/max rendered on the slip before submit fails;
   errors name the violated limit. *(Stake limit thread)*
6. **Named suspension states** — "Suspended — VAR review", "Suspended —
   re-pricing" on both markets and cash-out. *(VAR thread, Betfair, DK)*
7. **Cash-out availability ledger** — per-ticket history of when cash-out was
   offered/paused + current reason; partial cash-out slider if offered at all.
   *(FanDuel "2 of 4 legs" pattern, bet365 revocation)*
8. **Press-and-hold / 3s-undo cash-out** — guards accidental taps (mechanism
   per file 26; direct thread unverified — marked UNKNOWN).
9. **Honest live-bet queue** — visible countdown + the acceptance rule during
   in-play delay; publish the delay number. *(7s/10s delay threads)*
10. **Durable pending-bet lane** — debited-but-unconfirmed bets visible in My
    Bets as "placing/processing," never balance-debited + invisible. *(DK/FanDuel
    money-taken threads, bet365 blank My Bets)*
11. **Three-timestamp bet history** — placed / settled / credited. *(bet365
    unsettled-warning thread)*
12. **Crash reconciliation on relaunch** — restore slip, surface pending bets,
    reconcile balance with an explicit "what happened" note. *(tip-off crash
    thread)*
13. **Geolocation diagnostics panel** — cause checklist (VPN/Wi-Fi/permission)
    with per-item test + retry, not a dead wall. *(FanDuel home-vs-work thread)*
14. **In-place slip upgrade to SGP** — add legs without rebuilding through a
    separate door. *(DK app thread)*
15. **Promo governance cap** — max promo surfaces per screen; one working
    global "reduce promos/odds-ads" toggle. *(AFL Sportsbet spam thread)*
16. **Implied-probability display option** — odds rendered as % for the
    "odds as information" audience. *(AFL thread user suggestion)*
17. **Favorites/watchlist + saved slips** — save-for-later is noticed within a
    day when removed; never regress silently. *(FanDuel Saved Bets thread)*
18. **Withdrawal-status tracker** — queued → processing → txid/broadcast with
    public status page for backlogs. *(Cloudbet 54h, Stake instant-wtd praise)*
19. **Plain-language KYC schedule** — declare verification thresholds upfront
    (before first deposit), never first revealed at withdrawal. *(crypto KYC
    tension thread)*
20. **Edit-Bet-style leg editing** — post-placement add/swap/remove on
    unsettled multis, mechanism shown honestly (reprice at current offer).
    *(bet365 Edit Bet thread)*
21. **Settle-and-credit on leg hit** — show per-leg crediting rather than
    end-of-event lump settlement where rails allow. *(Pinnacle-vs-bet365
    comparison)*
22. **Self-serve bet-status lookup** — bet-ID search resolving to state +
    ledger entries, defusing support queues at peak. *(12,378-in-line thread)*

---

## VERIFICATION FAILURES / OPEN ITEMS (do not silently promote)
- Duplicate-bet-from-retap: sourced only to file 26 (Matchbook) — `UNKNOWN` here.
- Accidental cash-out taps: thread found, no snapshot — `UNKNOWN`.
- Partial cash-out demand as *pain* (vs. bet365 praise): `UNKNOWN` this pass.
- Stake peak-lag threads: discovered, unarchived — `UNKNOWN`.
- Shuffle product UX: subreddits are promo shells — `UNKNOWN`, do not cite.
- USDT-specific UX threads: `UNKNOWN` — cluster 8's USDT implications are
  marked as inference.
- Bovada/FanDuel "changed my bet" claims: presented as *user perception*,
  not book-misconduct findings.
