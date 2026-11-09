# BOOK — Jon Yablonski, *Laws of UX* (lawsofux.com canonical web edition)

**Thread:** T3.03 · research agent book digest → sportsbook rules
**Source read:** https://lawsofux.com/ — the free canonical web version. Each law
has its own page (definition, takeaways, origins, examples). Fetched live via
`webfetch` **2026-11-10 00:05–00:14 IST** (Nov 9 ~18:40 UTC). HTTP 200 on all 31
pages; no auth, no paywall — the site is legitimately free (it is the book's
companion/canonical edition).

**Live vs summarized labeling:**
- **[LIVE]** = read from lawsofux.com this session; quotes are verbatim from the
  fetched page (URL given per law).
- **[INFER]** = our application to a sportsbook — the site never mentions
  betting; every "sportsbook" mapping below is our inference, flagged as such.
- Nothing below is recalled-from-memory: all 30 laws on the current site were
  opened and read live. (The site added new entries vs the 2020 print book —
  e.g. Choice Overload, Cognitive Bias, Flow, Mental Model, Working Memory,
  Paradox of the Active User — all included.)

**Product context for mappings:** our entry = Housebets shell (top bar, left
icon rail ~70px desk, right side panel ~330px) + 5 pages (Sports home, Live,
Football, Match page, Bet slip + My bets as ONE page). Phone = 390px, bottom
slip bar → sheet tabs `Bet slip N | My bets N | Chat`. Odds chips tri-state
(default / selected cyan+✓ / suspended amber `🔒` bar). Singles only, decimal
odds, USDT. Scorecard: Match 20 · Slip+MyBets 20 · Home 15 · Feels-like 15 ·
Live 10 · Football 10 · States 10.

---

## REQUIRED SET (12)

### 1. Fitts's Law — [LIVE]
URL: https://lawsofux.com/fittss-law/
**What it says (verbatim):** "The time to acquire a target is a function of the
distance to and size of the target." Takeaways: touch targets large enough to
select accurately; ample spacing between targets; place targets where they're
easily acquired. Origin: Paul Fitts, 1954 — speed-accuracy trade-off; fast moves
to small targets = error.
**Where in a sportsbook [INFER]:**
- *Odds cells* are the most-tapped targets in the whole product and sit in dense
  grids — a mis-tap on the wrong price is a *money* error, not a nuisance. Cells
  must be ≥44px phone / ≥40px desk with real gaps, not hairline-separated.
- *Bet slip*: the `Place bet` button belongs at the bottom of the slip sheet,
  full-width, adjacent to the stake field the user just edited — distance ≈ 0.
- *Phone slip bar*: lives in the thumb-easy zone (bottom-center, above tab bar)
  and must be a tall, wide target (~56px), not a floating mini-pill.
- *Cash-out* inside an open bet card needs the same target budget as Place bet —
  it's a money action, often under time pressure.
- *`✕` remove / `×` unfavourite chips*: small by design but need invisible
  padding to reach ≥32px effective target — they're next to price cells where a
  fat-finger is catastrophic (removing a leg vs adding one).
- *Adjacent risk*: `Place bet` must never sit within thumb-slip distance of
  `Clear all` — Fitts's corollary is that errors happen on nearby wrong targets.
**Rule we apply:** Money-touch targets ≥44×44px phone with ≥8px gaps; Place bet /
cash-out full-width bottom-anchored; small destructive icons padded to ≥32px.

### 2. Hick's Law — [LIVE]
URL: https://lawsofux.com/hicks-law/
**What it says (verbatim):** "The time it takes to make a decision increases
with the number and complexity of choices." Takeaways: minimize choices when
response time is critical; break complex tasks into smaller steps; highlight
recommended options; "Be careful not to simplify to the point of abstraction."
**Where in a sportsbook [INFER]:**
- *Market tabs*: a live match has 85+ markets. The desk wireframe shows 10 tabs
  (`Popular 10 · Goalscorers 9 · Goals 11 · Players 11 · Halves 8 · Handicaps 5
  · Corners & cards 14 · Minutes 10 · Specials 7 · All markets 85`) — `Popular`
  first IS the "highlight recommended option" takeaway; it collapses the 85-way
  decision into a 10-way one.
- *Odds rows*: `1 X 2` = 3 choices, decidable in <1s. Rows offering Match result
  + Double chance + BTTS on one line would be a 9-way decision — keep 3 cells
  per row, push the rest behind `+N >`.
- *Bet slip stake*: quick chips `5/10/25/50` reduce a free-entry decision to a
  4-way pick + custom — classic Hick.
- *Live page filters*: sport chips `All 13 · Soccer 6 · Tennis 3` = ≤7 choices;
  competition filtering goes behind a dropdown because N would be 20+.
- *Accept-odds segmented control*: `Ask / Higher only / Any` = exactly 3 —
  don't add a fourth mode.
- *Empty states*: one CTA each, not a menu ("Browse live" OR "Find a match").
**Rule we apply:** Any time-critical decision surface caps at 3–7 visible
choices; recommended/default option pre-sorted first; complexity behind
progressive disclosure (`+N`, accordions, dropdowns) — never removed, per
Tesler.

### 3. Jakob's Law — [LIVE]
URL: https://lawsofux.com/jakobs-law/
**What it says (verbatim):** "Users spend most of their time on other sites.
This means that users prefer your site to work the same way as all the other
sites they already know." Takeaways: expectations transfer between similar
products; leverage existing mental models so users do tasks, not learn; when
changing things, let users keep a familiar version for a while.
**Where in a sportsbook [INFER]:** This is THE law for us — every judge and
every user arrives with bet365/Stake/FanDuel/DraftKings muscle memory:
- *Conventions we must keep*: 1X2 ordered home/draw/away L→R; decimal odds;
  odds-as-button cells that highlight when selected; slip in right rail (desk)
  / bottom bar (phone); padlock = suspended; green/red = price up/down;
  `+N` = more markets; Open/Settled segmented tabs in My bets.
- *Where we may innovate*: polish, state honesty, motion quality, Housebets
  brand voice — NEVER a novel bet-placement gesture or a re-ordered 1X2.
- *Shell*: Housebets' own casino shell (left icon rail, top bar, right panel)
  is the mental model our judges already have — mirror it rather than invent a
  new chrome. "Feels like Housebets" (15 pts) is literally Jakob scored.
- *Migration clause*: N/A for a prototype, but the principle "minimize
  discord" → our odds-flash/selection choreography should use transitions
  bettors already read (price-cell fill, not confetti).
**Rule we apply:** Conventional anatomy on every shared pattern (list rows, slip
rail, cell states); differentiation lives in craft, never in re-mapping learned
gestures.

### 4. Miller's Law — [LIVE]
URL: https://lawsofux.com/millers-law/
**What it says (verbatim):** "The average person can only keep 7 (plus or minus
2) items in their working memory." Takeaways: **don't use the magic seven to
justify unnecessary design limits**; organize content into chunks; capacity
varies by prior knowledge and context.
**Where in a sportsbook [INFER]:**
- *The caveat matters most*: Yablonski explicitly warns against lazy "7 items
  max" caps — the working rule is *chunking*, not counting. Sports nav can hold
  ~8 sports because each is one familiar chunk (icon+name), not because 8 < 9.
- *Bottom tab bar*: `Menu · Sports · Casino · Chat · avatar` = 5 items, each a
  single known chunk.
- *Market tabs*: 10 tabs is over 7±2 but fine *because* they're chunks of a
  known taxonomy — the real load test is whether a tab's NAME is one chunk
  (`Corners & cards` is; `Combined match specials` isn't).
- *Bet slip card anatomy*: pick / market / match / odds / state = 5 fields max
  before the eye needs a separator — more than that and the card needs
  chunking into header-line + sub-line.
- *My bets row*: Placed·Bet·Odds·Stake·Returns·Result = 6 columns — at the
  edge; expansion moves detail (cash out, bet ref) behind the row, not into it.
- *Working memory in the wild*: the user holding "I want Arsenal + Over 2.5"
  must not also have to remember their stake, the old price, and the deadline —
  persist all three in the UI (see Working Memory law).
**Rule we apply:** Chunk first (named groups, icon+label units), count second;
any surface exceeding ~5–7 *unfamiliar* units gets grouped, not truncated.

### 5. Tesler's Law — [LIVE]
URL: https://lawsofux.com/teslers-law/
**What it says (verbatim):** "For any system there is a certain amount of
complexity which cannot be reduced." Takeaways: the core complexity must be
assumed by either the system or the user; lift the burden during design/dev;
don't design for an idealized rational user; make guidance accessible in
context.
**Where in a sportsbook [INFER]:** A bookmaker's product is *irreducibly*
complex — 85 markets, moving prices, suspensions, stake math, settlement
states. Tesler says who eats that complexity:
- *System-side (we absorb)*: returns math (`stake × odds = return` live-computed
  per keystroke), implied probability, odds-diff display (`2.10 → 2.30`
  strike-through + direction color), market taxonomy into 10 tabs, clock/phase
  formatting, settlement messaging.
- *User-side (we must not force)*: never make the bettor compute payout,
  diff prices mentally, know what "AH -0.75" means without a plain-English
  label, or remember which legs are suspended — the slip computes and surfaces
  all of it.
- *Non-rational user clause*: "people don't always behave rationally" is doubly
  true in-play under time pressure — that's why suspended cells render
  dead-LOOKING (lock + dim) instead of failing on tap, and why changed prices
  require explicit accept rather than silent repricing.
- *Contextual guidance*: tooltips/plain labels next to the complexity
  (`implied 47.6%`, `Min stake 1.00 USDT`) — the law's "guidance in context"
  takeaway.
**Rule we apply:** The interface owns arithmetic, taxonomy, and state
explanation; the user owns only pick + stake + accept. If a user ever does
mental math, we shipped the complexity to the wrong side.

### 6. Peak-End Rule — [LIVE]
URL: https://lawsofux.com/peak-end-rule/
**What it says (verbatim):** "People judge an experience largely based on how
they felt at its peak and at its end, rather than the total sum or average of
every moment." Takeaways: design the most intense points and the final moments;
find where the product is most valuable/delightful; **negative experiences are
recalled more vividly than positive ones**.
**Where in a sportsbook [INFER]:** Betting is a session of emotional peaks by
construction — the design question is which peaks we own:
- *Positive peak = goal*: score pulse + amber flash + simultaneous odds tick on
  the match page is the designed peak moment (scorecard's biggest page).
- *Positive end = bet receipt*: the `Placing… → check-draw → receipt with bet
  ref + View in My bets` flow is the designed ending of the core loop. A
  prototype whose ending is an alert() loses the rule.
- *Negative peaks we must engineer down*: odds changed at confirm (amber card +
  explicit `Accept 2.30`, not silent), bet failed (reason + recovery CTA, not a
  dead modal), suspended selection in slip (`Remove suspended · keep the
  rest` — an actionable ending, not a brick wall). The law warns these negative
  moments dominate memory → every failure state is a peak-end problem, which is
  literally the 10-pt states scorecard.
- *Session end*: My bets settled rows give closure with reason (`Lost —
  conceded 90'+2`), not bare red — the END of a bet's lifecycle is a designed
  moment too.
- *Judges' session*: their peak = the live match page demo; their end = the
  place-bet receipt. Sequence demo states so both land.
**Rule we apply:** Budget motion/polish where emotion peaks (goal flash) and
where journeys end (receipt, settle, fail-recovery); never let a dead panel be
the last thing a flow shows.

### 7. Von Restorff Effect — [LIVE]
URL: https://lawsofux.com/von-restorff-effect/
**What it says (verbatim):** "When multiple similar objects are present, the one
that differs from the rest is most likely to be remembered." Takeaways: make
key info/actions visually distinctive; **use restraint — competing emphasis can
get salient items mistaken for ads**; don't rely on color alone (color-vision
deficiency); consider motion sensitivity.
**Where in a sportsbook [INFER]:**
- *Exactly ONE isolated element per view*: on odds grids that's the selected
  cell (cyan+✓); on the slip it's `Place bet`; in a market list it's the
  suspended `🔒` bar. Two "special" things = none special.
- *The anti-ad caveat is a betting trap*: promo-bright styling is what every
  sportsbook overuses (boosted-odds confetti colors). Our scope bans boosts/
  promos anyway — keep accent reserved for actionable state, so a mint element
  always means "tappable/mine," never "advertisement."
- *Dual coding per the a11y takeaway*: suspended = lock icon + dim + label (not
  just orange); odds up/down = ▲▼ + color (not just red/green); selected = ✓ +
  fill. Color-only salience fails ~8% of male users.
- *Motion as isolation*: flashes isolate changed cells — but ≤ ~4 concurrent or
  the whole grid becomes the "different" thing and isolation dies.
- *LIVE pill*: red dot + count in nav is the one persistent isolated chrome
  element; everything else earns isolation temporarily.
**Rule we apply:** One accent color = one semantic (actionable/mine); max one
emphasized element per region; every state change dual-coded icon+color.

### 8. Aesthetic-Usability Effect — [LIVE]
URL: https://lawsofux.com/aesthetic-usability-effect/
**What it says (verbatim):** "Users often perceive aesthetically pleasing design
as design that's more usable." Takeaways: aesthetics create positive response →
belief it works better; people tolerate minor usability issues in beautiful
products; **visually pleasing design can mask real usability problems in
testing**.
**Where in a sportsbook [INFER]:**
- *For the judges*: "the sportsbook we'd ship tomorrow" is judged on perceived
  shippability — a coherent Housebets-branded surface (Figtree, dark scale,
  one accent) reads as more functional than a wireframe-equal but plain build.
  This is the "Feels like Housebets" 15 pts.
- *For bettors*: trust IS the product — a real-money interface that looks
  thrown together reads as "my money isn't safe here." Polish = perceived
  solvency.
- *The masking warning cuts both ways*: a gorgeous prototype can hide dead
  states. Our QC must test the ugly paths (failed bet, suspended leg, empty
  My bets) specifically because aesthetic tolerance will let them slide in a
  casual pass.
- *Don't cash the tolerance*: the law buys forgiveness for minor issues, not a
  license for them — a pretty bet slip that silently reprices is still a fail.
**Rule we apply:** Ship the polish (it buys real usability credit with judges),
then deliberately audit every unhappy path the polish may have hidden.

### 9. Postel's Law — [LIVE]
URL: https://lawsofux.com/postels-law/
**What it says (verbatim):** "Be liberal in what you accept, and conservative in
what you send." Takeaways: tolerate varied user actions/inputs; anticipate
anything in input/access/capability; accept variable input and translate it —
define boundaries and give clear feedback.
**Where in a sportsbook [INFER]:**
- *Stake input*: accept `5`, `5.00`, `$5`, ` 5 ` — parse liberally, display
  conservatively (`5.00 USDT`). Reject only true violations (below min, above
  balance) with specific reasons, never `Error 412`.
- *Search*: "teams, players, competitions, markets" — take aliases (`man u` →
  Manchester United), typos (Arsnal→Arsenal), fragments (`ars br` → match).
  Liberal in = fuzzy match; conservative out = grouped, labeled results.
- *Taps*: a tap anywhere on an odds cell's padding should still hit the cell;
  a tap near `✕` shouldn't nuke the leg — generous hit areas, conservative
  destructive zones.
- *Conservative send*: what the UI emits is normalized — one odds format
  (decimal, 2dp), one money format (`10.00 USDT`), one state vocabulary
  (`Suspended`, `Changed`, `Placed`, `Failed`) — even if inputs arrive messy.
- *Keyboard/a11y*: ⌘K, Escape closes sheet, focus returns — liberal input
  modality counts too.
**Rule we apply:** Normalize every input silently when meaning is clear; emit
exactly one canonical format; errors state the boundary (`Minimum stake 1.00
USDT`) not the failure.

### 10. Doherty Threshold — [LIVE]
URL: https://lawsofux.com/doherty-threshold/
**What it says (verbatim):** "Productivity soars when a computer and its users
interact at a pace (<400ms) that ensures that neither has to wait on the
other." Takeaways: feedback within 400ms; use perceived performance; animation
engages during background processing; progress bars make waits tolerable;
**purposeful delay can increase perceived value/trust**.
**Where in a sportsbook [INFER]:**
- *Sub-400ms contract*: odds-cell press-in (~80ms), add-to-slip chip flight
  (300–350ms), sheet open (250ms), tab switch (instant) — every tap paints
  feedback inside the threshold or the live book feels broken.
- *Skeletons not spinners*: odds grids must never spinner — shimmer rows under
  400ms then paint; a spinning odds board reads as "prices are stale."
- *The productive-delay clause is our `Placing…` beat*: a bet confirm that
  returned instantly would feel fake — the ~600–900ms pending state (then
  check-draw + receipt) is the sanctioned use of delay to build trust. It also
  gives the engine room to demo "market suspended while confirming."
- *Live feed cadence*: flashes paint immediately on delta (attention), but the
  *batch* discipline (>2/s get grouped) keeps the page inside a rhythm the eye
  can track — Doherty is about neither side waiting, including the human.
- *Perceived performance on navigation*: keep the slip sheet mounted (open in
  ≤250ms); prefetch match pages on row hover/focus.
**Rule we apply:** <100ms press feedback, <400ms every interaction paint; one
deliberate delay only — `Placing…` 600–900ms; odds grids shimmer, never spin.

### 11. Goal-Gradient Effect — [LIVE]
URL: https://lawsofux.com/goal-gradient-effect/
**What it says (verbatim):** "The tendency to approach a goal increases with
proximity to the goal." Takeaways: users speed up near completion; artificial
progress motivates; give clear progress indication.
**Where in a sportsbook [INFER]:**
- *"Starting soon" countdowns*: `Kicks off in 04:12` converts waiting into a
  closing gap — the classic goal-gradient lever, and the brief's mandated
  empty-Live fallback ("Nothing live: show Starting soon").
- *Slip completion progress*: `Singles · 1 selection` → stake entered →
  `Place bet` enables — each step visibly closer to done. The enabled CTA IS
  the goal proximity signal.
- *My bets open position*: an open bet with live score/minute is a goal in
  progress — surfacing `52' · 1–0 · winning` keeps effort/attention on it
  (cash-out interest rises near full time, which is when the option earns
  its prominence).
- *ETHICS FLAG*: the same lever drives last-minute in-play betting and
  "you're one leg away" mechanics in multis. We use it only for *time to
  events* (real deadlines) — never fabricated progress ("87% of bettors…"),
  never to accelerate staking. Kickoff is a real clock; that's honest urgency.
- *Onboarding*: N/A (prototype, no signup flow).
**Rule we apply:** Real countdowns to real events everywhere the user waits
(kickoff, HT-end, settle); zero manufactured progress bars toward betting.

### 12. Zeigarnik Effect — [LIVE]
URL: https://lawsofux.com/zeigarnik-effect/
**What it says (verbatim):** "People remember uncompleted or interrupted tasks
better than completed tasks." Takeaways: signifiers of additional content;
artificial progress; clear progress indication.
**Where in a sportsbook [INFER]:** This is the strongest silent engine in the
product — an open bet is literally an unfinished task the user can't forget:
- *My bets `Open` tab*: open bets persist as live loops — live score, ticking
  cash-out value, minutes. That's why the wireframe gives Open its own
  segmented tab + count, and why the slip panel badges `My bets ①` next to
  `Bet slip ①`: the open loop calls.
- *The unfinished slip*: a filled-but-unplaced slip is a Zeigarnik loop too —
  the bottom bar keeps `1 · Arsenal @ 1.30` visible across every page until
  resolved (placed or cleared). Persist it through navigation; never silently
  drop it (interruption = the effect's trigger).
- *Suspended selection in slip*: unresolved → stays in the slip with a state
  chip until the user resolves it (remove/wait) — correct Zeigarnik handling
  is *closure on the user's terms*, not auto-removal.
- *Half-empty states*: `You have no open bets` after placing is a closed loop
  — fine; but an empty Open tab should then offer the next loop honestly
  (`Browse live`) not a fake one.
- *Notification-shaped residue*: badge counts on sheet tabs (`①`) exploit the
  same incompleteness signal — keep counts true, never inflated.
**Rule we apply:** Unresolved things stay visibly unresolved (persistent slip
bar, open-bet badges, suspended chips) until the user closes them; we never
auto-close a user's open loop.

---

## ADDITIONAL LAWS — all read [LIVE], mapped to the product

### 13. Choice Overload — [LIVE]
URL: https://lawsofux.com/choice-overload/
**Says:** too many options overwhelm and hurt decision-making; fix by
prioritizing what's shown (featured), and providing tools to narrow choices
(search, filters), plus side-by-side comparison when comparison is the task.
**Sportsbook [INFER]:** The 85-market match page is the canonical overload
surface — mitigations map 1:1 to the site's own advice: `Popular` tab =
featured subset; market tabs + accordions = narrowing tools; market search =
explicit narrow-down. Home curates `Featured`/`Your matches` rather than
dumping all events. Identical row anatomy = the side-by-side comparison the
law prescribes for comparable items. **Rule:** never show the full market
space at once; curate→filter→search is the declared escape ladder.

### 14. Chunking — [LIVE]
URL: https://lawsofux.com/chunking/
**Says:** break information into meaningful groups so users can scan and
process; grouping reveals underlying relationships (closely related to
Miller's Law).
**Sportsbook [INFER]:** League-card grouping on Live (`Premier League` card →
its matches), market accordions on Match, slip card split into
pick-line/price-line/context-line, bet-ref formatting (`HB-2F4K`), and
`+115` markets-count as a single chunk replacing a number nobody should
read as digits. **Rule:** every dense surface is grouped by *meaningful*
units (league, market type, bet leg) with labeled headers — the headers do
the chunking, whitespace alone doesn't.

### 15. Cognitive Load — [LIVE]
URL: https://lawsofux.com/cognitive-load/
**Says:** tasks become hard when incoming info exceeds capacity; distinguish
intrinsic load (the task itself) from extraneous load (design that costs
processing but adds nothing).
**Sportsbook [INFER]:** Odds grids are maximum intrinsic load already — so
extraneous load goes to zero: no decorative chrome in data areas, one accent
color, `tabular-nums` so ticking prices don't reflow, stable cell geometry.
Intrinsic load gets assisted: stake→return auto-math, `2.10→2.30` diffs
pre-computed, `1 X 2` in the learned order. **Rule:** in odds/money areas,
anything the eye must process that isn't data or state is a bug.

### 16. Serial Position Effect — [LIVE]
URL: https://lawsofux.com/serial-position-effect/
**Says:** first and last items in a series are remembered best; put key
actions at the edges, least important in the middle.
**Sportsbook [INFER]:** Nav order: `Home` first / highest-traffic sports up
front; market tabs: `Popular` first, `All markets` last (the total is a
recency-anchored landmark); slip actions: primary `Place bet` last in the
read order (bottom), `Clear all` mid-card but de-emphasized; My bets:
`Open` tab left/first (primacy = the money that matters now). **Rule:**
first slot = highest-frequency destination, last slot = the action/total;
bury the middle.

### 17. Selective Attention — [LIVE]
URL: https://lawsofux.com/selective-attention/
**Says:** people filter to goal-relevant stimuli; named sub-phenomena —
*banner blindness* (ad-looking things get ignored) and *change blindness*
(real changes missed without strong cues / when changes compete).
**Sportsbook [INFER]:** Bettors scanning for "my team" literally don't see
the rest — so state changes must fight the filter: odds flashes + ▲▼ +
simultaneous score pulse are the strong cues against change blindness; ≤~4
concurrent flashes because *competing changes divert each other* (verbatim
mechanism). The `Suspended` amber bar must look like a system state, never
like a promo banner (banner blindness would hide a critical money-state).
Empty-state CTAs styled as UI, not as ad-cards. **Rule:** every real change
gets a deliberate attention cue; no two cue-classes compete in the same
frame; nothing money-relevant may wear promo styling.

### 18. Pareto Principle — [LIVE]
URL: https://lawsofux.com/pareto-principle/
**Says:** ~80% of effects come from ~20% of causes; focus effort where the
largest benefit lives.
**Sportsbook [INFER]:** Design-effort allocation follows the scorecard
itself: Match page + Slip/My bets = 40% of points on 2 of 5 pages → they get
the deepest state coverage and motion craft. Within data: `Popular` market
tab serves the ~80% of picks (match result, totals, BTTS); `Live` +
`Favourites` serve most sessions. **Rule:** optimize the 20% of surfaces
carrying 80% of judging/betting weight — depth on Match + slip beats breadth
anywhere else.

### 19. Paradox of the Active User — [LIVE]
URL: https://lawsofux.com/paradox-of-the-active-user/
**Says:** users never read manuals — they start immediately and hit errors;
make guidance accessible *in context*, for whatever path they take.
**Sportsbook [INFER]:** Nobody reads "how to bet" — so: first-tap add-to-slip
works with zero explanation (the learned pattern), but context help sits one
touch away: `implied 47.6%` under prices, plain-English market labels under
jargon (`Asian Handicap -0.75` → "Brighton +0.75 starts ahead"), inline
`Min stake` text under the input rather than an error after submit. No
onboarding tour, no manual, no first-run modal — prototype users judge
instantly. **Rule:** zero front-loaded instruction; every hard concept
carries its explanation adjacent to itself.

### 20. Mental Model — [LIVE]
URL: https://lawsofux.com/mental-model/
**Says:** people carry a compressed model of how a system works and apply it
to similar systems; matching it removes learning; e-commerce succeeds via
consistent conventions (cards, cart, checkout) — the cited example maps 1:1
to a bet slip.
**Sportsbook [INFER]:** The bet slip IS a cart in users' heads — odds cell =
add-to-cart, slip = cart, stake = quantity, `Place bet` = checkout, receipt =
order confirmation, My bets = order history, cash out = return/refund. Every
departure from the cart metaphor is cognitive tax; every borrowed convention
is free comprehension. Also: `1 X 2`, green/red deltas, padlock-suspended —
all parts of the existing model. **Rule:** treat the slip as a cart/checkout
flow in structure and vocabulary; audit any pattern that has no mental-model
anchor.

### 21. Law of Common Region — [LIVE]
URL: https://lawsofux.com/law-of-common-region/
**Says:** elements inside a shared boundary (border or background) are
perceived as a group.
**Sportsbook [INFER]:** League cards on Live/Football, market-group cards in
accordions, each slip selection card, the scoreboard card, the phone slip
sheet itself (bounded area above scrim) — boundaries tell users "these odds
belong to this league/market/bet" faster than labels do. Corollary: a stray
element inside a card inherits the card's meaning — the `Suspended` bar
inside a league card must visually replace only the odds row, not swallow
the `+N >` link that still navigates. **Rule:** one boundary = one meaning;
state changes redraw inside the boundary without breaking it.

### 22. Law of Proximity — [LIVE]
URL: https://lawsofux.com/law-of-proximity/
**Says:** nearby objects are perceived as related; proximity communicates
shared function faster than labels.
**Sportsbook [INFER]:** An odds cell must be closer to its selection than to
the neighboring selection — in a `1 X 2` row the price sits *inside* the
cell with its label, not floating in a shared column where misreading 1↔X
misplaces money. Stake input hugs its quick-chips; `Returns` hugs the math it
summarizes; the `✕` remove hugs its own leg only. On match rows, `+115 >`
groups with the odds, `☆` with the fixture. **Rule:** spacing is the
primary grouping signal — check every odds cell that its price is
unambiguously *inside* its selection's hitbox.

### 23. Law of Similarity — [LIVE]
URL: https://lawsofux.com/law-of-similarity/
**Says:** similar-looking elements are perceived as one group with shared
meaning; differentiate interactive from static.
**Sportsbook [INFER]:** All tappable odds cells share one visual grammar
(fill, radius, tabular price) across home/live/football/match — one learned
"this is a price button" signature; all suspended bars share one amber+lock
grammar; all disabled/dead things share one muted grammar. Danger case:
selected (cyan) vs live-count badges vs LIVE pills must not collide in hue
or they'll read as the same class. **Rule:** identical function → identical
styling globally; three grammars only — tappable, mine/selected, dead.

### 24. Law of Uniform Connectedness — [LIVE]
URL: https://lawsofux.com/law-of-uniform-connectedness/
**Says:** visually *connected* elements read as more related than unconnected
ones (stronger than proximity alone — lines, frames, arrows).
**Sportsbook [INFER]:** In the slip, connecting each selection card to its
stake+returns block (shared card frame) declares the relationship; the old→
new odds pair `2.10 → 2.30` uses a literal arrow connector — the law's
tangible-reference example — which is why it reads instantly. Score↔odds
flash synchrony is temporal connectedness: simultaneous flash binds cause
(goal) to effect (price move). **Rule:** where proximity is ambiguous
(dense grids), bind related elements in one container or with an explicit
connector — never rely on whitespace alone at money.

### 25. Law of Prägnanz — [LIVE]
URL: https://lawsofux.com/law-of-pr%C3%A4gnanz/
**Says:** ambiguous/complex images get perceived as the simplest possible
form — least-effort interpretation wins.
**Sportsbook [INFER]:** Users will compress our visuals whether we plan it
or not: a 3-cell odds row reads as one "match result" figure, not three
buttons — so the row must be a single clean figure (aligned cells, one
height). Complex states get reduced by the eye: a half-suspended market must
still read as one card (the eye merges it) — don't let a suspended cell
break grid rhythm or the whole market looks broken. Crest-less teams still
parse as fixtures if the row figure is stable. **Rule:** build each row/card
as one simple perceptual figure; if squinting at it doesn't resolve cleanly,
the design is fighting the eye.

### 26. Occam's Razor — [LIVE]
URL: https://lawsofux.com/occams-razor/
**Says:** prefer the option with fewest assumptions; best way to reduce
complexity is avoid it; remove elements until function is compromised;
"consider completion only when no additional items can be removed."
**Sportsbook [INFER]:** The scope discipline itself is Occam — no multis,
boosts, trackers, AI search. Applied inside: every grid ornament, extra
badge, and separator must justify existence; the empty state is one line +
one CTA, not an illustration with a paragraph; a market accordion shows
name + cells + chevron, nothing else. Design review = deletion review.
**Rule:** for each element ask "does removing this break the bet?" — if no,
it goes.

### 27. Flow — [LIVE]
URL: https://lawsofux.com/flow/
**Says:** full immersion happens when task difficulty matches skill; design
for it via clear feedback on every action and removing unnecessary friction.
**Sportsbook [INFER]:** The bettor's loop (scan → tap → stake → place →
track) should run without page transitions — persistent slip rail, no full
reloads, every tap acknowledged. **ETHICS FLAG:** Schüll's "machine zone"
(see `13-gambling-psych.md`, `52-gambling-psych.md`) is literally flow
applied to gambling — the dark use is removing *all* friction including the
moments that protect users. We keep speed in the *reading* loop and keep the
protective frictions in the *money* loop: explicit odds-change accept,
suspended-blocking, stake confirmation on the CTA. **Rule:** flow for
navigation and feedback; deliberate friction exactly where money commits or
price truth changed.

### 28. Working Memory — [LIVE]
URL: https://lawsofux.com/working-memory/
**Says:** working memory holds ~4–7 chunks, each fading in 20–30s; brains
recognize better than they recall; **put the burden of memory on the
system** — carry info across screens, mark what's been seen.
**Sportsbook [INFER]:** The slip carries state across every screen (the bar
persists — user never recalls "what did I add?"); odds-changed shows both
prices (`2.10 → 2.30`) so no recall of the old price is needed; breadcrumbs
(`Soccer ⌄ England ⌄ Premier League ⌄ ARS-BHA`) are recognition anchors;
last stake remembered; visited/selected cells stay marked (cyan+✓) instead
of expecting recall. The 20–30s fade is why a suspended-market interruption
must leave a visible residue in the slip, not a silent removal. **Rule:**
the UI remembers everything the user would have to — selections, old prices,
stake, location; recognition cues (badges, ✓, breadcrumbs) everywhere.

### 29. Cognitive Bias — [LIVE]
URL: https://lawsofux.com/cognitive-bias/
**Says:** systematic errors in judgment from mental shortcuts (heuristics);
they speed decisions but skew them — named example: confirmation bias.
(Tversky & Kahneman, 1972.)
**Sportsbook [INFER]:** Betting is a bias arena — our job is to not *feed*
the biases with the UI: no "form says they're due" narratives (gambler's
fallacy), no hot-streak badges after wins (hot-hand), anchors only in honest
places (quick-stake chips, strike-through old price as a *true* anchor).
Implied-probability labels (`2.00 ≈ 50%`) counter probability misjudgment.
**Rule:** display facts and prices, not narratives; every persuasion-shaped
element gets audited for which bias it would feed (see
`04-psychology-playbook.md` anti-patterns).

### 30. Parkinson's Law — [LIVE]
URL: https://lawsofux.com/parkinsons-law/
**Says:** tasks inflate to fill available time; limit task time to
expectation; autofill/remembered inputs cut duration.
**Sportsbook [INFER]:** Place-a-bet should take seconds, not minutes —
remembered stake, quick chips, prefilled slip, one-tap add. The in-play
urgency case: when a market reopens briefly, the slip must be already armed
(stake in memory) or the window closes while the user types. **Rule:**
target ≤5s from first odds tap to `Place bet` armed for a returning user;
pre-fill everything legitimately prefilled.

---

## What the site explicitly flagged as "closely related" (web of the canon)
(fetched live from cross-reference lines on each page)

Peak-End ↔ Cognitive Bias · Choice Overload ↔ Hick · Chunking/Working
Memory/Cognitive Load ↔ Miller · Selective Attention ↔ Von Restorff ·
Mental Model ↔ Jakob. Useful when tracing which single rule a component
violates.

## Conflicts/tensions inside the canon (resolve, don't pick sides)
- Hick/Choice Overload (fewer choices) vs. Tesler (complexity is conserved) →
  resolve with *progressive disclosure*: all 85 markets exist, surfaced 10 at
  a time. Never delete capability, only defer visibility.
- Doherty (<400ms everything) vs. Flow/ethics (friction protects) → speed on
  information, friction on money-commit.
- Von Restorff (stand out) vs. Selective Attention/banner blindness (stand-out
  gets ignored if it looks like an ad) → salience reserved for *state*, never
  promo.
- Aesthetic-Usability (beauty earns tolerance) vs. its own warning (beauty
  hides flaws) → polish the product, audit the ugly paths harder.

---

## APPLY TO OUR SPORTSBOOK

R-YAB-01: Odds cells and all money-touch targets ≥44×44px on phone / ≥40px on
desk with ≥8px gaps; `✕`-type controls padded to ≥32px — every odds grid on
home/live/football/match + slip.

R-YAB-02: `Place bet` and cash-out CTAs full-width, bottom-anchored, adjacent
to the control just edited (stake field / expander) — bet slip sheet, desk
right panel, My bets open-bet cards.

R-YAB-03: Cap any decision surface at 3–7 visible choices with the recommended
option first — `Popular` tab first among market tabs, ≤3 odds cells per row,
sport chips ≤7, accept-odds segmented = 3 modes.

R-YAB-04: Keep every learned sportsbook convention (1X2 L→R order, right-rail
slip desk / bottom bar phone, padlock = suspended, green/red = up/down, `+N`
markets) — global layout; innovate only in polish and state honesty.

R-YAB-05: Chunk before counting: labeled groups (league cards, market
accordions, slip legs) replace item caps — Live page, Match page, bet slip.

R-YAB-06: The system owns all arithmetic and translation — live
`stake × odds = return`, `2.10 → 2.30` diffs, implied-% hints, plain-English
market labels under jargon — bet slip, match markets.

R-YAB-07: Design two peaks and three endings: goal-flash peak (score pulse +
synced odds tick) and place-bet peak (`Placing…`→check-draw); receipt ending
(bet ref + My bets deep-link), failure ending (reason + recovery), settle
ending (Won/Lost + result reason) — match page, slip confirm, My bets.

R-YAB-08: Exactly one isolated (high-salience) element per view, dual-coded
icon+color — selected cell cyan+✓ in grids, `Place bet` in slip, `🔒 Suspended`
bar in market rows; accent color never used for non-actionable chrome.

R-YAB-09: Ship the polish, then audit the ugly paths it may hide — deliberate
QC pass on failed bet, suspended leg, empty Open tab, offline-ish states.

R-YAB-10: Parse inputs liberally, emit canonically — stake accepts `5`/`$5`/
`5.00`, search takes aliases+typos; everything displays decimal 2dp + `USDT`;
errors state boundaries (`Min stake 1.00 USDT`), never codes — stake input,
global + market search.

R-YAB-11: Sub-400ms paint on every tap (press-in 80ms, chip-flight 300–350ms,
sheet 250ms); skeleton shimmer on odds, never spinners; the only sanctioned
delay is `Placing…` 600–900ms — global motion spec, slip confirm.

R-YAB-12: Countdowns only to real events — `Kicks off in 04:12`, `LIVE` flip
at 0, HT resume; zero manufactured progress toward betting — home Starting
soon, Live empty state, match rows.

R-YAB-13: Unresolved stays visible until the user closes it — persistent
slip bar with live count across pages, `My bets ①` badge, suspended leg
remains in slip w/ chip + `Remove suspended · keep the rest` — slip shell,
My bets.

R-YAB-14: Never surface the whole market space — curate (`Popular`/`Featured`)
→ filter (sport/competition chips+dropdowns) → search (`Search markets or
players`) as the declared narrowing ladder — match page, home, live.

R-YAB-15: Extraneous load = zero in odds/money areas: `tabular-nums`,
right-aligned prices, stable cell geometry, no decorative chrome inside data
regions — all odds grids, slip totals, My bets table.

R-YAB-16: Edges get the memorable slots — `Home` first / My bets last in nav,
`Popular` first / `All markets 85` last in tabs, `Open` leftmost in My bets
segmented tabs — shell nav, market tabs, My bets.

R-YAB-17: Every real change gets one deliberate attention cue and cues never
compete — ≤4 concurrent flashes, simultaneous score+odds pulse for
causality, suspended = system-styled (never promo-styled) — live odds engine,
match page.

R-YAB-18: Treat the slip as a cart — add (tap odds) → line items (legs) →
quantity (stake) → checkout (Place bet) → order confirmation (receipt + ref)
→ order history (My bets) — bet slip + My bets page, vocabulary included.

R-YAB-19: One boundary = one meaning; state changes redraw inside it —
`Suspended` bar replaces only the odds row while `+N >` stays navigable;
price sits *inside* its selection's cell, never floating between selections —
match cards, league tables, market accordions.

R-YAB-20: In-context help only, zero front-loaded instruction — `implied
47.6%` under prices, plain-English sub-labels under jargon markets, `Min
stake` under the input before any error — match markets, slip.

R-YAB-21: UI remembers, user recognizes — persisted slip, shown old+new
price, remembered stake, breadcrumbs, ✓-marked selections; nothing relies on
the 20–30s working-memory fade — slip persistence, odds-changed, navigation.

R-YAB-22: Feed no biases — facts (form, score, price) not narratives ("due",
"hot"); honest anchors only (real old price, quick chips); implied-% to
counter probability misjudgment — all content surfaces (see psych playbook).

---

**Coverage note:** 30/30 laws on lawsofux.com (as of fetch) read live and
mapped. Not read (not on the site): the 2020 print book's extra essays beyond
per-law pages; Yablonski's blog articles linked under Further Reading were not
fetched — only the canonical law pages. Cross-checks to `04-psychology-
playbook.md` items 17–21 show consistent application (Fitts/Hick/Miller/
Jakob/Tesler already applied) — this file deepens each with the live text.
