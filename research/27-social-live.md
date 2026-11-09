# research/27-social-live.md — Live Social Mining: Sportsbook UX Sentiment & Feature Wishes

**Round-2 live pass.** Sources pulled live via web search across X/Twitter coverage, Reddit aggregations, YouTube review transcripts, TikTok discover pages, App Store reviews, Covers/SBR/BMR forums, Stake community, bitcointalk, and UX industry commentary. Every finding: paraphrase → source → implied FEATURE/FIX.

---

## 1. X/Twitter — outage & cash-out rage (the emotional core)

| # | Finding (paraphrased) | Source | Implied FEATURE/FIX |
|---|---|---|---|
| X1 | When FanDuel went down during Sunday NFL (Nov 2025), a user posted he'd "opened and closed the app 600 times" trying to cash out — 30K+ views. The rage wasn't downtime per se; it was **being locked out of a decision on live money** with no state visibility. | vegasslotsonline.com/news/2025/11/03 | **Judge-visible state:** a degraded-mode banner + read-only My Bets that still shows cash-out value and status instead of a dead spinner. |
| X2 | "Wagers will settle" but what about cash outs?!?!" — bettors distinguish *bet settlement* from *cash-out availability*; treating them as one system is a trust failure. | Same (Christopher Minaya tweet) | Cash-out status as its own explicit state on the bet card: `Available $X` / `Suspended` / `Unavailable`, never just a missing button. |
| X3 | Outage during Eagles-Commanders (Jan 2025): "The app will start working just in time for you to suspend cashing out" / "shady as hell" / class-action threats. Bettors read downtime at cash-out-relevant moments as **malice**, not infra failure. | nj.com | Transparency pattern: timestamped status messages inside the app ("Markets suspended 2:14 PM — feed issue"). Absence of communication = assumed scam. |
| X4 | "Scamduel" nickname emerged specifically because users *could* place bets but couldn't see My Bets / cash out — asymmetric availability feels rigged. | vegasslotsonline | If bet placement works, bet management must work. Demo-able: place bet → market suspends → bet card still shows state honestly. |
| X5 | PrizePicks freeze mid-game (Jan 2026): users restarting phones 5-7x thinking it's their device; "$8,000 hit and can't pull it out"; "takes your money instantly but makes you wait days." | piunikaweb.com | Error copy that says it's *our* side, not yours ("We're having issues — your bets are safe"). Vague errors make users blame themselves then rage harder. |
| X6 | DraftKings March Madness outage → competitors (PointsBet/Fanatics) instantly weaponized it with $10 free bet for a screenshot of the down app. | next.io | Your downtime is a competitor's ad campaign. Speed-of-recovery and in-app status are brand features. |
| X7 | ESPN BET voided a whole 5-leg SGP because one leg pushed (viral @CalculatorGrant post). FD recalculates; ESPN BET voided only *winning* tickets. Bettors memorized which book does which. | nypost / actionnetwork | Leg-level result states: `won / lost / push / void` shown per leg with regrade math visible. Push/void handling is a *visible* product decision. |
| X8 | DraftKings "Ghost Leg" turned one-leg-miss parlays into wins — "over 30 million 3+ leg parlays were lost by just one leg" in 2024 NFL season. Massive resonance. | covers.com | The single most emotionally-charged betting state: **missed by one leg**. Show leg tracker live; a "so close" state is a designed moment, not an afterthought. |

---

## 2. Reddit / forums — the blunt verdicts

| # | Finding | Source | Implied FEATURE/FIX |
|---|---|---|---|
| R1 | "Is it just me or are most betting apps terrible to use?" — top replies: apps "designed in 2010," slow menus, live bets that **fail to submit at the worst moment**. One user noted small sweeps apps have better UX than billion-dollar books. | sportbotai.com/blog/best-betting-app-reddit | Bar for "premium" is embarrassingly low: fast submit + honest failures beats feature count. |
| R2 | FanDuel gets "best app" consensus for clean UX; Caesars got a dedicated "app sucks" thread (UX, inaccurate live betting); DraftKings knocked for parlay-promo spam. | sportbotai fanduel-vs-draftkings | Clean + fast wins the public vote; promo density reads as cheap. |
| R3 | r/sportsbook complaint flair analysis: only ~11% are app/technical failures, and complaint posts get buried — subreddit systematically **under-represents UX pain**. Winners' slips dominate the top 100. | sportsbooks.ag/reddit | Don't mistake social silence for satisfaction; also: winning slips ARE the social content → share-card design matters. |
| R4 | Stake community on new sportsbook UI: "takes more time to place bet," "doesn't clear teams from previous slips," misses "accept only higher odds" toggle. Even beloved apps get roasted for adding friction to place-bet path. | stakecommunity.com/topic/150061 | Slip must auto-clear after placement (or explicit setting); "accept odds changes: none/higher/any" is a power-user expectation. |
| R5 | Covers users after scoreboard redesign: "Too much scrolling! Bring back 2 vertical rows, 10+ games at a glance," "site is becoming unusable," "clear downgrade — searching for a replacement." Also: "hoping a dark mode is in the works." | covers.com/forum (thread 103864169) | Density is a feature. Pros want 10+ games glanceable. Dark mode is asked for by name. |
| R6 | Covers grading glitches: "my picks are always graded way late or not at all," picks "pending then disappeared." | covers.com/forum 103887098 | Pending/grading states must be explicit and persistent — a bet that vanishes is worse than a bet that lost. |
| R7 | BMR/SBR nostalgia: users still mourn "SBR odds classic" — real-time lines, custom book ordering, click odds → full line history. New layouts killed trust. | bookmakersreview.com/forum/threads/56544 | Line movement/history is a pro feature: tap an odd → see where it's been. Cheap to render, high credibility. |
| R8 | Caesars internal case study: search was "such a poor experience that we intentionally hid it" — no typeahead, no abbreviations, results not bettable. ~15% used it, most dropped off. | kylemitchell.co/work/caesars-sportsbook-search | Search = power-user shortcut: typeahead, typo tolerance, abbreviations ("LAL"), live context, and bet directly from results. |
| R9 | BetAngel forum on bet365 redesign: "stopped you from starring matches… could no longer create your own watchlist/favourites," forced dark mode with no toggle. | forum.betangel.com t=21817 | Favorites/watchlists are sacred — removing them churns power users. Themes need a *toggle*, not a mandate. |

---

## 3. YouTube / professional reviews — what reviewers praise & attack (UI level only)

| # | Finding | Source | Implied FEATURE/FIX |
|---|---|---|---|
| Y1 | bet365 walkthrough praise: "very nice, clean layout," sports listed up top, **dedicated live-betting button at bottom nav** because "live odds move fast" — speed of entry into in-play is the feature. | youtube.com/watch?v=y8mTOmi3PMs | Persistent one-tap Live/In-Play entry in bottom nav; live section sorted by "about to move." |
| Y2 | bet365 reviews split hard: "antiquated," "mostly text-based," "borderline ugly, drab grey + tired green" — **but** "quick responses… constant odds updates… freely tap any wager to instantly add to slip." Function forgives ugly; ugly never blocks fast. | bettingusa.com review | Speed and zero-friction tap-to-slip is the floor; polish layered on top is the differentiator. Both matter, ranked: fast > pretty. |
| Y3 | Uneditable landing content annoys: bet365 greets everyone with horse racing — "not everyone wants to bet on horse racing… it would be a nice touch if you could edit this." | sportsmole.co.uk bet365 app review | Personalized/editable home: let users pin their sports; default home ≠ promo board. |
| Y4 | Krok Odds Australia scored apps on **"promotional restraint"** as a named UX dimension: Sportsbet home = "promotional assault — carousels, pop-ups, banner ads"; bet365 praised for "clean interface with minimal promotional obstruction," cash-out "fewer suspensions, faster offer calculations, partial cash out well implemented." | krokodds.com.au | Promo restraint = premium. Marketing must never overlay markets. Partial cash-out slider is expected. |
| Y5 | SGP builder head-to-head test: Fanatics won via **"filter by player" + quick parlay** (cut scrolling massively); DK praised for "Dynamic Odds" (shows price as you add legs) but "odds lock up often"; FD praised for SGP-eligible props filtered by default. Betslip called "messy" on Fanatics. | bettingapps.com SGP builder test | In builder: player-first filtering, only-SGP-eligible props shown, live running payout, leg add/remove without leaving builder. |
| Y6 | FD's SGP builder described (critically, but with awe) as "genuinely beautiful to use… adding legs feels satisfying… makes the parlay feel like a creation you've made." | betting-forum.com thread 48141 | Proof bettors *feel* builder polish. The "satisfying leg-add" micro-interaction is a moat. |
| Y7 | EKG pro testing: DK #1 app ("exceptional UX"), BetMGM "long struggled with speed — slow responsiveness meaningfully impacts testers' perception of overall product," Fanatics climbing on app quality. | ekgline.substack.com | Perceived speed IS perceived quality. Every 100ms on slip = "cheap." |
| Y8 | ESPN BET: App-store mining (173K reviews) — 847 mention "fast interface," 612 "clean design," 234 "no lag like DraftKings." But registration timed at **13m43s** vs BetMGM 3m00s (TESTA) — app-switching verification kills it. | topendsports + testa.io | Signup without app-switching; every external handoff (email code → browser) bleeds users. Demo-able: progressive verification. |
| Y9 | Revpanda/WSF Odds interview going viral in industry: "If your sportsbook interface still looks like an Excel spreadsheet, you're losing your audience to TikTok" — choice paralysis from thousands of fragmented markets; call for Netflix-style personalization. | youtube.com/watch?v=BHbnBjLcgEw | Judges will reward: algorithmic/personalized home surfacing "your 3 markets" over the giant wall of odds. |
| Y10 | Prediction-market UX analyses (widely shared): Kalshi's yes/no + price-as-probability beats -110/+240 literacy test; **sell button same size as buy, same screen, all match long**; sportsbook cash-out "sits two taps into history, reads like an escape hatch you're discouraged from using." | clefdev.com, next.io, idesy.agency | Steal: implied-probability display option, cash-out as a *primary* control on the open bet card, live price sparkline on positions. |

---

## 4. TikTok — reaction culture around betting apps

| # | Finding | Source | Implied FEATURE/FIX |
|---|---|---|---|
| T1 | Dominant betting-app meme format: **"missed my parlay by one leg"** — huge genre, reaction-face videos; "me at least once a week." The single most-shared betting emotion on the platform. | tiktok.com/discover/when-i-just-missed-my-parlay-by-one-leg | Design the one-leg-miss moment deliberately: distinct visual state, commiserate copy, leg-level result cards that screenshot well. |
| T2 | Outage content trends: "#FanDuelDown" reaction videos, "Anyone else's FanDuel not working?????" — community checks app status via TikTok comments, not status pages. | tiktok.com/discover/fanduel-service-unavailable | In-app status that travels: a screen users can screenshot and post that explains the state. |
| T3 | Winning-slip screen recordings are content: users film My Bets → bet status "Won" → payout, under "vibrant blue ambient lighting." The app IS the set. | snapchat/tiktok how-to-use-draftkings topic | A share-worthy bet receipt/win card (share image + link, optional hide-stake) converts organic flexing into acquisition — bet365 Bet Share, Unibet BetShare, FD Community Feed, "65% of users placed exact bets from shared links." |
| T4 | TikTok vernacular around books: "#fanduelsucks," "THIS IS GARBAGE," "Scamduel" — rage content outperforms praise ~10:1; praise content is "hit a parlay" flexing where the *slip card* is the star. | tiktok discover pages | Your UI shows up in content only at extremes: make the win card beautiful and the error state honest. |
| T5 | Industry consensus: sportsbooks now "mimic Instagram/Twitter — infinite scrolls for live betting, swipe gestures, trending notifications, personalized curation"; Gen Z expects group betting, social features, leaderboards. | gamblinginsider.com | Feed-based discovery (trending bets, community feed), swipe interactions, social proof modules = native language of the demo audience. |

---

## 5. App-store reviews — recurring UX wishes (high-signal, verbatim-adjacent)

| # | Finding | Source | Implied FEATURE/FIX |
|---|---|---|---|
| A1 | Sportsbet redesign backlash: "too much hipster minimalist… white background, lots of bold black fonts, can't see sections easily… circle sport icons truncate ('Multibuil…')." **Praise kept:** "love how you can see cash out amount on the pending bets section without going into the bet" + "love that you can choose a favourite sport by starring it — would be great if favourites were on the opening page." | apps.apple.com Sportsbet reviews | Cash-out value on the bet list row (no drill-in). Star-to-favorite → favorites pinned to home. Readability > minimalism. |
| A2 | PlayNow reviews: "logs out too quickly even while you're using the app," "should be facial recognition login," "if a game is paused for betting it would be nice to see it's paused — not just have it disappear." | apps.apple.com PlayNow | Biometric re-auth + long sessions. **Suspended = visible locked state, never silent disappearance.** |
| A3 | Geolocation failures = instant churn to offshore: "Location detection is awful… I'm in MB and it says it can't confirm — guess I'll use an offshore site." | PlayNow, OLG Proline, BetMGM onclarity | For a prototype: mock the geo-check as a smooth "Verifying your location → You're in ✓" beat — it's a trust ritual, show it passing gracefully. |
| A4 | Betway: "what REALLLLY lets the app down is how slow it is, and it just freezes… when you open again your selections are still in the slip." (Persistence praised inside a complaint.) Also: "forced back to bet365 which was smooth and fast." | apps.apple.com Betway | Slip persistence across app kill/reopen is expected — and a differentiator when it works. |
| A5 | Paddy Power: cash-out stuck on "suspended because something is happening" with 20 min left, nothing happening; user "got shafted." | apps.apple.com Paddy Power | Suspended-state copy must say *what* happened or when it might return — unexplained suspension reads as theft. |
| A6 | Circa Sports: "hilarious how non-user friendly… no SGP… withdrawal via shady Play+/VIP preferred only." | apps.apple.com Circa | Feature-checklist optics matter in reviews: SGP presence is table stakes in 2026 perception. |
| A7 | Matchbook: app freezes when backgrounded; **submission delay → user taps again → accidental duplicate bets** — "the kind of flaw big mainstream apps have engineered out." | footballgroundguide matchbook review | Idempotent place-bet button: debounce + pending state that disables re-tap. Classic demo-able edge case. |
| A8 | Pikkit (tracker) reviews: users want manual bet entry, sort open bets by start time/sport, sort history by profit not just count. | appsupports.co Pikkit | My Bets: sorting/filtering (time, sport, status, stake) is a real wish, not a power-user nice-to-have. |

---

## 6. Crypto-native vs regulated — aesthetic perception

| Dimension | Crypto-native (Stake, Shuffle, Rollbit, Duelbits, Housebets) | Regulated (DK, FD, bet365, BetMGM) |
|---|---|---|
| Baseline look | **Dark theme default**, minimal chrome, 2D/flat graphics, "borderline iconic… stripped-back" (Stake). Shuffle: "genuinely modern, uncluttered, fast — one of the smoothest mobile browser experiences." | Light/data-dense default (DK dark-green, FD blue/white); bet365 "drab grey + tired green, borderline ugly" but forgiven for speed. |
| Emotional read | "Feels futuristic," "casino-native," hype/streetwear-adjacent (Bolla case: StockX/Supreme codes). Chat rain, leaderboards, live public bet feeds = community energy. | "Feels like a bank app crossed with a spreadsheet." FD praised for "consumer-app calm"; DK for density power users like. |
| Trust signal | Polish-as-proof: clean UI = "these people have their act together" (Housebets design led to +30% signups, 90% session-2 retention). Weak on regulation reassurance. | Trust via brand/licensing, but UI often "designed in 2010" per Reddit — credibility despite look, not because of it. |
| Friction norm | Slip pops out right side, hideable; quick-bet toggles; QR wallet deposits; 1/10/50/100 quick stakes + MAX. | Slip = separate sheet; stake typed on system keyboard; deposit via card rails + verification gauntlet. |
| Promo surface | Neon promo banners top of dashboard (Shuffle) — present but bounded. | "Promotional assault" — carousels, pop-ups, banners gate markets. Reads cheap per Krok Odds scoring. |
| The gap to exploit | Crypto books win *feel*, lose *depth of markets/features* (weaker SGP, fewer live markets, spotty cash-out). | Regulated win features, lose feel. |

**Prototype takeaway:** the winning aesthetic = crypto-native shell (dark, minimal, spacious, motion-rich) carrying regulated-book features (SGP builder, cash-out states, favorites, alerts). Judges compare you to Stake/Kalshi/Robinhood, not to bet365.

---

## 7. Motion & animation — do bettors notice? **Yes, specifically:**

- **Odds flashes are noticed and configurable.** Action Network ships a settings toggle for its green/red odds-change flash — users expect to control it. Green = shortened, red = drifted is the industry language. *(actionnetworkhq.zendesk.com)*
- **Change blindness is real:** a live A/B experiment replaced the green/red flash with a **direction-aware roll** — old number rolls out up/down encoding direction, color rides along *only during motion then settles*. Rationale: "when everything flashes, the signal drowns and users tune it out." *(awsomee.com/cases/rolling-the-odds)*
- **Honesty rules for motion:** flash only on genuine feed deltas — "flashing on re-renders or for excitement is the dark pattern." Use tabular numerals so changing odds don't reflow the layout; redundant cues (glyph + color + transition), never color alone; honor `prefers-reduced-motion`. *(vp0.com journal; igaming-design-patterns.md)*
- **Suspended = loud:** "a suspended market remains visible, clearly locked, unavailable for selection… stale odds accepting taps is the integrity moment." *(vp0.com)*
- **Celebration is expected and budgeted:** Sky Bet research flagged "no sense of celebration when a bet had been won" as a defect; TAB's workshop: 7/8 users said a boost animation "would add excitement"; FanDuel's design language: "bet placed, cash out, win — each moment gets energy **in proportion to what's at stake**, and the rules say when the app stays quiet." ESPN Fantasy: confetti reserved for wins only, to keep it rare. *(neilthomas.myportfolio.com; sammarchant.com TAB; humbleteam.com; mattbonini.com)*
- **The slip add-confirm moment:** three things must fire on tap — button state change, slip counter update, short confirm animation/toast — or users double-tap and lose trust. *(spinlab.studio/bet-slip-ux)*
- **Betslip-as-bottom-sheet** that "elegantly rises from the bottom" keeping context is the praised mobile pattern; modal isolation at moment of commitment tested well (SBK). *(sgx.studio; matthewallen.design)*
- **60fps under live load** is a brag point design studios lead with ("layouts that don't jitter while odds do their little disco"). *(studioubique.com)*

---

## 8. Feature wishes mined (deduped, ranked by mention frequency)

1. **Cash-out always visible with live value on the open bet card** — incl. partial cash-out slider + auto-cash-out threshold; suspended state explained. (X1–X5, A1, Y4, Y10)
2. **Slip that never loses work** — persists across navigation/app kill, clears *only* after placement or explicit clear, remembers last stake. (R4, A4, forum bet-slip thread)
3. **Quick stakes + custom numpad** — chips ($1/$5/$25/MAX), no system-keyboard typing. (spinlab, Housebets betslip)
4. **Favorites everything** — star teams/sports/leagues → pinned home section + alerts ("choose a favourite sport by starring… would be great on the opening page"). (A1, R9, jackcode.io, crustlab)
5. **Search that's a weapon** — typeahead, abbreviations, typos, bet from results. (R8, myminicity)
6. **Leg-level parlay tracker** — live won/lost/pending per leg, push/void shown distinctly, regrade math visible. (X7, X8, T1)
7. **Notifications that are about ME** — my team kickoff, my odds threshold hit, my cash-out value reached, my bet settled. Generic "big game tonight!" gets ignored. (crustlab, optimove, onlinedesignteacher)
8. **Dark mode** — asked for by name on Covers; crypto baseline; must be a toggle. (R5, R9, betangel, FanDuel/theScore ship it)
9. **Density + glanceability** — 10+ games at a glance, compact rows, less scrolling. (R5, Caesars case)
10. **Share the slip** — image + live link, hide-stake privacy toggle, screenshot-triggered share prompt. ("65% of users placed exact bets from shared links") (bet365 Bet Share, FD Community Feed, connoryeh.com)
11. **Live match tracker** when no stream — animated event view ("next best equivalent to watching live"). (deadspin Stake review)
12. **Line history** — tap odds → where the line has been. (R7)
13. **Empty states that route onward** — "No live events — here are today's upcoming matches," not blank screens. (tilldawn.co)
14. **Edit My Bet** — adjust legs post-placement on eligible bets; increasingly expected from BetMGM marketing. (foxsports live betting)
15. **Session sanity** — Face ID re-login, no mid-use logouts. (A2)
16. **In-play stats beside markets** — shots, shots on target, dangerous attacks — without leaving the bet screen. (A5-adjacent Betway review)
17. **SGP-leg eligibility labels** — don't make users discover which props can't combine via dead ends/grey-outs. (Proline review, betzonic)
18. **Ghost-leg / one-leg consolation states** — the emotional peak; even without the promo, the *display* of "missed by one" should be designed. (X8, T1)

---

## 9. Bettor vocabulary — microcopy dictionary (match their voice)

| Term | Use it for |
|---|---|
| **lock** | Confident picks ("tonight's lock") — use playfully, never as a guarantee claim |
| **sweat** | Live bets in progress ("sweating the over") — live bet cards, "the sweat is on" |
| **bad beat / backdoor cover** | Late-loss commiseration copy |
| **leg / legs** | Parlay components — always "leg," not "selection" in casual surfaces |
| **cash / hit** | Wins ("your parlay hit") — settlement copy |
| **chalk / dog / live dog** | Favorites/underdogs in editorial surfaces |
| **push** | Exact-landing results — distinct third state, not "void" |
| **void / no action** | Cancelled leg/bet |
| **juice / vig** | Never in UI; but "boosted odds" reads better than "reduced vig" |
| **action** | "Your action for tonight" = open bets summary |
| **degen** | Community/self-deprecating humor surfaces only |
| **tail** | Copy-bet features ("tail this bet") — share-bet cards |
| **units / 1u** | Bet tracking contexts |
| **"missed by one"** | The one-leg parlay heartbreak — the meme-native phrase |
| **"suspended"** | Expected technical word for locked markets — keep it, but pair with reason |

Tone notes: bettors say the app "sucks," is "garbage," "shady," "a scam" when it fails — praise is "clean," "smooth," "fast," "slick," "snappy," "elite." Microcopy should be **short, confident, slightly irreverent on wins, dead honest on failures** ("That bet didn't go through — the line moved. Try again at -105?").

---

## 10. What reads "premium" vs "cheap" (judge-relevant synthesis)

| Premium signals | Cheap signals |
|---|---|
| Instant slip response; optimistic UI with rollback | Spinner on every tap; multi-tap registration |
| Sparse promo surface; content earns the space | Carousel/popup assault before first bet |
| Odds move with brief directional motion, then rest | Everything flashing constantly; stale odds accepting taps |
| Suspended = explicit locked state w/ reason | Markets silently vanish; cash-out button missing |
| Live cash-out value on the bet row | Cash-out buried 2 taps deep in history |
| Dark theme done well; light option | Forced theme; low-contrast "hipster minimal" redesigns |
| Leg-by-leg live parlay tracking | A single "pending" lump until settlement |
| Personalized home (your sports, your teams) | Same horse-racing wall for everyone |
| Errors that say what happened + what to do | "Something went wrong" / silent rejection |
| Empty states that route to next action | Blank screens |
| Biometric session continuity | Logged out mid-session |
| Share-worthy win/bet card | Ugly receipt nobody screenshots |

---

## 11. Derived implementation tasks (20)

1. **Persistent slip bar (mobile):** collapsed bottom bar — selection count + total stake + potential return — expands to full sheet on tap; never covers markets.
2. **Tap-to-add feedback triad:** price button state change + slip counter bump + confirm micro-animation/toast on every selection add.
3. **Quick-stake row:** $1/$5/$10/$25/MAX chips + custom numeric keypad + "repeat last stake"; zero system-keyboard dependency.
4. **Direction-aware odds motion:** value rolls up (drift) / down (shorten); color only during motion, settles; tabular numerals; `prefers-reduced-motion` fallback.
5. **Odds-flash settings toggle** in bet settings (like Action Network) — shows craft awareness.
6. **Loud suspended state:** market stays visible, locked, unbettable, with reason ("Suspended — goal under review"); never silently disappears.
7. **Requote flow:** "Odds changed" state shows old vs new side-by-side with Accept/Decline + slip-level toggle "Accept odds changes: Never / Higher only / Always."
8. **Idempotent place-bet:** debounced button + pending spinner state that blocks double-submit; duplicate-bet-proof.
9. **Live cash-out on bet card:** real-time value rendered on each open-bet row (no drill-in), partial cash-out slider, `Available/Suspended` state chip.
10. **Leg-level parlay tracker:** each leg shows live `winning/losing/pending/push/void`; designed "missed by one leg" end state with regrade math.
11. **Graduated celebration system:** small pulse on bet-placed → bigger moment on cash-out → confetti on win only (rarity preserved); energy proportional to stake.
12. **Bet receipt + share card:** post-placement receipt with Share → image + link, hide-stake toggle; win card designed to screenshot well.
13. **Favorites system:** star teams/leagues/sports → pinned home rail + pre-match/odds-threshold/cash-out-value notifications.
14. **Dark-first theming:** dark default (crypto-native standard) with light toggle; token-driven.
15. **Weaponized search:** prominent search, typeahead, abbreviation/typo tolerance, live context in results, add-to-slip from results.
16. **SGP builder:** player-first filter, only eligible legs shown (eligibility labeled), running combined odds updates per leg added, add/remove without leaving builder.
17. **Personalized home:** favorites + recently-bet sports surface top; promo content capped to one bounded module.
18. **Honest degraded mode:** status banner + read-only My Bets showing last-known cash-out values during "outage" demo state; copy owns the fault.
19. **Live match tracker card:** animated possession/score state for in-play events without streams.
20. **Microcopy pass:** apply vocabulary dictionary — "leg," "sweat," "hit," "push," "no action," "missed by one"; errors state cause + next action.

**Stretch (if time):** bet-history sorting (time/sport/status), tap-odds → line movement sparkline, community/activity feed module ("trending slips"), swipe-to-add parlay discovery (Underdog-style).

---

## Coverage notes / limitations

- **X/Twitter was mined via press coverage and embedded tweets** (direct x.com and nitter mirrors are poorly indexed); quotes above are verbatim from embedded posts in the cited articles — high fidelity.
- **TikTok** doesn't expose comment-level mining via search; findings T1–T5 come from Discover page aggregations + industry analysis of betting-tok trends.
- **YouTube** findings include one full transcript (bet365 walkthrough) plus review-site aggregations of reviewer consensus; treat praise/attack splits as directional, not exhaustive.
- Forums covered: Covers, SBR-adjacent (BMR), betangel, stakecommunity, bitcointalk, activeboard. Reddit via aggregator analyses (sportbotai, gummysearch, sportsbooks.ag) since r/* threads are poorly indexed directly.
- No findings surfaced for Housebets end-user sentiment (brand too new/small) — only its design-system case study, included in §6.
