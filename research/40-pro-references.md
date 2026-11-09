# research/40-pro-references.md — Pro references actually opened (T11)

Date: 2026-11-10 00:20 IST (real `date`). Task A3a/b: ≥15 references of top-tier
sportsbook / fintech / design-system work, **each actually opened**, with:
what it does well · what it does badly · what we take · what we refuse.

Method: `webfetch` first; Playwright MCP where webfetch was blocked (Behance,
humaninvariant). 21 references opened (19 webfetch + 2 Playwright + 1 partial
paywall). Blocked/UNKNOWN registry at the bottom — nothing cited there was
evaluated; it is listed so nobody mistakes it for evidence.

Companion files: rivals forecast → `41-rival-forecast.md`; team rituals →
`57-how-pros-work.md`. Competitor-site teardowns (Stake, bet365, FanDuel,
DraftKings, Shuffle, Housebets live) belong to T2/`42-teardown-table.md` and are
deliberately not duplicated here.

---

## A. Sportsbook/betting portfolio work (what rivals will emulate)

### A1. MoPlay — The Case Study (Behance, studio team)
- **Opened:** https://www.behance.net/gallery/92512877/MoPlay-The-Case-Study (Playwright; webfetch 403)
- **What it is:** Real product-design-team case study for the MoPlay betting app
  (iOS/Android/Web). Description (verified on page): team "involved in almost
  every aspect of the project life cycle, from initial requirements gathering,
  throughout research, UX, UI, dev handover and final QA." 128 appreciations,
  2.7K views, tools: Photoshop/AE/Illustrator/Sketch.
- **Does well:** Shows a *whole product lifecycle*, not screens — research→UX→UI→
  handover→QA. That arc is exactly what "senior portfolio piece" means to a
  design lead judge. Multi-platform coverage (iOS+Android+Web) signals systems
  thinking, not one-shot mockups.
- **Does badly:** Presentation is image-only (all content baked into gallery
  images); no live prototype, no readable spec. 2020-era visual language. For
  judging *decisions* you get their narrative, not evidence.
- **Take:** Present our entry's *process* (parity map → tokens → states → QC
  loop), not only pixels. One-line role statement per page, like theirs.
- **Refuse:** Image-deck deliverable. Ours is a clickable prototype with real
  states; a Behance-style deck would fail the submission form itself.

### A2. "Sportsbook — UX/UI Case Study" (Behance, Vahe Karapetyan, Jul 2025)
- **Opened:** https://www.behance.net/gallery/231052755/Sportsbook-UXUI-Case-Study (Playwright; webfetch 403)
- **What it is:** Single-designer Figma-only sportsbook case study, tagged
  `sports casino gambling Slots betting sportsbook stakewings ux UI/UX` —
  i.e. a Stake-style crypto-casino skin. 165 appreciations, product-design field.
- **Does well:** Current (2025) example of what the median *serious* entrant
  produces: full Figma walkthrough, branded deck, casino-adjacent visual energy.
- **Does badly:** Figma images only — no states matrix, no engineering logic,
  slots/casino tags show category confusion with a *sportsbook brief*. Alt tags
  reveal the work is one image file per section — craft lives in the render,
  not the decisions. (Image contents UNKNOWN — not visually verifiable here.)
- **Take:** This is the reference class we must *clearly exceed in kind*, not
  degree — same category, better polish won't register. Judges will have seen
  100+ of these decks; only system + states + ship-readiness reads different.
- **Refuse:** Casino/slots visual energy bleeding into a sportsbook; single-file
  Figma-as-deliverable; case-study chrome that outshines the product.

### A3. Attempted, blocked (Behance gallery cluster)
| URL | Status |
|---|---|
| behance.net/gallery/181530867/Bet365-Redesign | 403 webfetch; not re-tried — UNKNOWN |
| behance.net/gallery/119943987/UXUI-Design-for-Mobile-Betting-App | 403 — UNKNOWN |
| behance.net/gallery/224566283/BetKick-Social-Betting-Experience-UIUX-Case-Study | 403 — UNKNOWN |
| dribbble.com (sportsbook search) | Not opened (JS/Cloudflare) — UNKNOWN |

Search-result snippets alone suggest the same pattern as A2: Figma decks,
social-betting features, redesign concepts — i.e. *portfolio theatre*, not
shippable product. Treat as directionally-true, not verified.

---

## B. Live-score clarity (Apple Sports / FotMob / Sofascore)

### B1. Lickability — "Our Apple Sports design critique"
- **Opened:** https://lickability.com/blog/apple-sports/ ✓
- **Does well:** A working studio publishing its *internal crit* — exactly how
  pros review work (see 57). Concrete findings: nav-bar that stretches on
  over-scroll; vibrancy (not stock) segmented control for Yesterday/Today/
  Upcoming; **score numerals use variable-font width axes** (bold + compact);
  dense data grid that survives Dynamic Type (+30% type, columns stay aligned,
  headers wrap instead of truncating); jersey-cloth texture warped by a Metal
  shader under shifting gradients.
- **Does badly:** Nothing material — it's a surface critique of one app, not a
  UX study of betting.
- **Take:** (a) *Density without shrinkage*: enlarge type → columns hold, headers
  wrap — directly applicable to our market/standings tables. (b) Condensed-bold
  display numerals for scores — supports Oxanium/width-axis odds treatment.
  (c) "Design for current-version + 1": use near-future platform features
  (View Transitions, scroll-driven CSS) where they add, not where they show off.
- **Refuse:** Decorative motion backgrounds on money paths (their jersey-cloth
  is ambient atmosphere, not data — keep equivalents off the slip).

### B2. Daily Design Challenge — Apple Sports breakdown (#64)
- **Opened:** https://dailydesignchallenge.com/breakdowns/apple-sports/ ✓
- **Does well:** (a) No onboarding — welcome sheet then straight onto real games;
  value before setup. (b) Scores organized Yesterday/Today/Upcoming — the mental
  model fans already hold. (c) **Losers' scores dimmed below winners'** — "drives
  your eyes in the correct orientation." (d) Handles 3-letter and 20-letter team
  names without breaking the grid — "trivial until you try to do them."
- **Does badly:** Noted wasted space when few teams followed; can't go back
  beyond yesterday — completeness gaps fans notice.
- **Take:** Winner/loser typographic weighting is a zero-cost hierarchy trick for
  our settled bets + results; long-name resilience is a QC case for our rows
  (their `A…` truncation failure on phone is exactly what loop-rival-pass1
  flagged in *our* build). Get the player to a real game in ≤1 tap.
- **Refuse:** Shallow history; sparse personalization that reads as emptiness.

### B3. Dr. Drang (leancrew) — "A tardy assessment of the Apple Sports app"
- **Opened:** https://leancrew.com/all-this/2024/04/a-tardy-assessment-of-the-apple-sports-app/ ✓
- **Does well (as a reference):** The best *negative* review — a power user
  tearing into the details everyone else missed: starters/bench box-score tables
  share one header but the columns **aren't aligned** ("this design cheats the
  reader"); swiping makes the misalignment worse; thin box-score stats; missing
  standings columns. Root cause diagnosed: two separate tables formatted
  independently — "at least five lines of code saved."
- **Does badly:** Opinionated blogger, single-platform, one data point — but the
  specific defects are checkable facts, not taste.
- **Take:** *One header = one table contract.* Anywhere we visually join rows
  under one header (market groups, My bets columns, scoreboard stats), column
  alignment must be computed across ALL sections — a named QC check. Judges
  like Bashagha notice exactly this class of bug (his case study: "six
  different approaches to spacing").
- **Refuse:** Shipping alignment that only holds in the common case; treating
  tables as per-section layout problems.

### B4. Ayman Jaddaa — Apple Sports systems-designer case study
- **Opened:** https://aymanjaddaa.com/work/apple-sports ✓
- **Does well:** Insider articulation: principles were "speed, simplicity,
  personalization"; the shared thread across home/events was *density* —
  "surfacing scores, stats, and standings fast enough to feel glanceable while
  keeping hierarchy legible." One source of truth rendered into every surface
  (app → Live Activities → Dynamic Island → Watch → widgets → iMessage).
- **Does badly:** Portfolio page — outcomes described, not shown in depth;
  can't verify claims beyond public product.
- **Take:** The mental model "one consistent source rendered into whichever
  surface fits the moment" = our 390↔1440 parity rule: same information
  hierarchy, same mental map, only the frame changes. "Glanceable density" is
  the correct target phrase for match page + live page.
- **Refuse:** Surface-sprawl for its own sake (they have Apple's surfaces; we
  have two breakpoints — but parity discipline scales the same way).

### B5. dezzayn — FotMob UI design analysis
- **Opened:** https://dezzayn.com/apps/fotmob ✓
- **Does well (as teardown):** Distills FotMob's three signature moves:
  (a) **aggressive layering** — pinned minimal score header (crests, numbers,
  minute), everything else in swipeable tab panes (Facts/Stats/Lineup/Table/H2H)
  so each gets a full pane "instead of fighting for one screen"; (b) **never
  shrinks type to fit more** — density comes from tight vertical rhythm +
  ruthless grouping, not smaller fonts; rating chips = two-digit number in a
  colored square instead of a table column; (c) **follow-first navigation** —
  onboarding front-loads "which teams do you support", followed leagues pin
  first, league-grouped collapsible sections; momentum graph compresses 90′
  into a sub-second readable shape; one color-graded rating scale reused
  *everywhere* (lineups, stats, player pages) — "one encoding, learned once,
  reused across every surface."
- **Does badly:** Aggregator write-up, screens behind login; ratings-scale is
  theirs not ours.
- **Take:** Direct blueprint for our match page: pinned scoreboard + tab panes;
  density via rhythm not shrinkage; follows reorder content (brief asks
  "Follow a team or competition"); one visual encoding per data type reused on
  every surface (our odds-move caret + suspension lock must be ONE encoding).
- **Refuse:** Momentum/shot-map widgets (stats widgets are out of scope);
  their five-tab bottom bar (our shell is prescribed).

### B6. edoardo.fyi — reverse-engineering FotMob's bracket UI
- **Opened:** https://edoardo.fyi/blog/2026/04/bracket-view-fotmob/ ✓
- **Does well:** Craft-at-the-interaction-level: disassembled FotMob's scroll
  delegate and found a **velocity gate** (|v|>0.2 → snap by swipe direction,
  else round by projected offset) — a flick advances the bracket even when the
  midpoint wouldn't be crossed; separate thresholds for snap / selection /
  height sync instead of one scroll number driving everything. Compared against
  Sofascore (static, snaps only) and Apple Sports (hitches, micro-lags, layout
  jumps — "sad state of SwiftUI").
- **Does badly:** iOS-specific; bracket UI isn't in our scope.
- **Take:** Gesture physics is where "feels pro" lives — our drag-to-dismiss
  slip sheet needs exactly this class of tuned threshold (velocity-gated
  dismiss, staged state changes). Also: peer products' jank is documented and
  public — smoothness IS measurable differentiation.
- **Refuse:** Building bespoke components outside scope (a bracket!); trusting
  one scroll value to drive multiple UI decisions.

### B7. Pratt IXD — "Design Critique: Sofascore (iOS)"
- **Opened:** https://ixd.prattsi.org/2026/09/design-critique-sofascore-ios-app/ ✓
- **Does well (as teardown):** Norman-framework critique of a 35M-user app:
  first screen fails the conceptual model (unsorted grid of scores + ads
  interspersed); ambiguous ellipsis icon "more sports"; icon-only sport nav
  leans on cultural knowledge-in-the-head; good tap feedback (icons enlarge +
  name appears) that closes the gulf *after* the fact.
- **Does badly:** Student critique — good vocabulary, less shipping depth.
- **Take:** Label icons (or make meaning self-evident) — our sport nav and the
  `+N` market chip need text or unambiguous glyphs at first contact; ads/promos
  interleaved with content is a trust smell (our zero-promo fold aligns).
- **Refuse:** Icon-only primary navigation; unordered first-screen grids;
  feedback that only clarifies *after* the tap.

---

## C. Price-as-product (prediction markets / trading apps)

### C1. Fudge — polymarket.com design-token analysis
- **Opened:** https://fudge.design/share/polymarket.com-design ✓
- **Does well:** Reverse-engineered the live token system: canvas `#000`,
  surface `#15191D`, graded ink scale (white → `#E5E5E5` → `#BBC4CD` → `#7B8996`
  → `#586879`), border-only elevation `#242B32`, action `#0093FD`, semantic
  yes/no `#3DB468`/`#CB3131`, warning `#FF9900`. Hierarchy via *saturation, not
  size*. Cards: asymmetric padding (20px horizontal > vertical), embedded
  sparklines, hover-revealed actions. "Financial terminal reimagined for
  consumer prediction markets."
- **Does badly:** Itself notes risks: pure-black canvas + pure-white text is
  contrast-extreme; dark-only means no recalculated light mode; semantic
  green/red alone = colour-blind hazard.
- **Take:** (a) Semantic-first color: green=YES/up, red=NO/down, blue=neutral
  action — maps to our odds-move vocabulary; (b) asymmetric card padding for
  scanability; (c) sparkline-in-card for price history *within* a row —
  possible micro-detail for odds-moved markets (in scope: "odds moving").
- **Refuse:** Pure `#000`/`#FFF` extremes (Housebets palette is cyan on
  near-black but softer); terminal-aesthetic copy-paste — we must read
  Housebets, not Bloomberg.

### C2. Wednesday Studio — Polymarket homepage engagement case study
- **Opened:** https://wednesdaystudio.co/work/polymarket ✓
- **Does well (THE model of senior process writing):** Started with the
  question "what should a user feel/know immediately" → three goals (it's
  alive, something's happening now, other people are in it). Phase 1 = three
  explicit directions (layout / dynamic content / social proof) shown as
  *structured thinking, not polished design*. **The decision filter:** every
  dynamic element had to pass "does this help the user make a decision, or
  does it just stimulate?" — countdown timers and live trade tickers passed,
  *animated flying coins were removed*. State-aware layout: logged-out =
  orientation, logged-in = speed. Studied adjacent products (Medium, Airbnb,
  Netflix, Facebook) for density patterns rather than only competitors.
  Deliverable = fully interactive prototype "ready to validate before
  committing to build."
- **Does badly:** Concept phase — much of it never shipped; can't verify live.
- **Take:** Their filter is our motion/ethics filter verbatim — odds flashes,
  goal cascades, live tickers earn motion only if they inform a decision. Also:
  write the "what should the judge feel in 5 seconds" question before pixels
  (A15b). Prototype-before-build is literally our contest deliverable.
- **Refuse:** Live-trade ticker/leaderboard/sentiment badges as engagement —
  social-proof churn on money paths is stimulation, and much of it would be
  out-of-scope clutter in our brief.

### C3. Human Invariant — "Novel Interface Designs for Prediction Markets"
- **Opened:** https://www.humaninvariant.com/blog/pm-interface (Playwright; webfetch failed)
- **Does well:** Six concrete interface defects in Polymarket/Kalshi —
  (1) midpoint price displayed as probability hides spread/illiquidity
  ("platforms are incentivized to deceive users in this manner");
  (2) no news↔price context mapping; (3) identical YES/NO UI for every market
  type forces cognitive translation; (4) portfolio PnL shown at midpoint, not
  realizable value; (5) insufficient-funds → multi-screen liquidation;
  (6) chat unusable. Solutions proposed per problem (liquidity overlays,
  event-annotated charts, question-type-specific interfaces, mark-to-market
  toggle, in-context sell-to-cover, PnL-sorted comments).
- **Does badly:** Critiques market event pages only, by design; crypto-PM
  domain specifics don't all map to sportsbooks.
- **Take:** The *honesty* theme translates 1:1: our "price" is odds — show
  what the number means (decimal odds + implied probability + potential
  return), show *why* a price is unavailable (suspension reason tag), and
  never display a number we wouldn't honor (cash-out value that ticks and
  demands re-confirmation = mark-to-market honesty). Context mapping: an odds
  move should carry its cause when known (goal/red card/VAR) — nobody does
  this.
- **Refuse:** Depth-of-market/ladder UIs (out of scope); their
  question-type-interface matrix (we have fixed market types by brief).

### C4. NEXT.io — "Why prediction markets are a story of product design success"
- **Opened:** https://next.io/news/features/why-prediction-markets-product-design-success/ ✓
- **Does well:** Industry analysis: PMs won by *borrowing the visual language
  of trading* (live pricing, percentages, positions) instead of sportsbook
  conventions — mainstream users already learned trading UI from Robinhood
  et al. Key line: "great UX doesn't have to reinvent the wheel — it can take
  a wheel from another successful vehicle." Continuous-interaction loop (watch
  price → react → position) vs sportsbook's transaction-then-wait. "Your users
  compare you to everything on their phone, not just sportsbooks." Kalshi/
  Polymarket grew through the World Cup while FD/DK apps peaked in week one.
- **Does badly:** Industry-press, no screen-level detail.
- **Take:** Justifies our convention strategy: keep the 1X2/slip idioms bettors
  know AND import fintech's clarity idioms (position = open bet with live
  value, cash-out = sell at a transparent price). "Accessible without feeling
  dumbed-down" is the exact register to hit vs Betfair-style complexity.
- **Refuse:** Percentage-price rebranding of odds (brief mandates decimal odds);
  engagement-loop mechanics that become checking-incentive dark patterns.

### C5. The Product Guys — Robinhood trading-UI teardown
- **Opened:** https://productguys.arthakram.in/teardowns/robinhood-trading-ui ✓
- **Does well:** Numbered, mechanism-level teardown with a "what not to copy"
  list: salient short-range portfolio line frames daily noise as the subject;
  radical friction removal (swipe-to-trade) treated a high-consequence decision
  like a checkout; fractional shares = correct unit economics; **confetti on
  trade completion** = reward framing on a neutral event ("placing a trade is
  not an achievement, it is the assumption of risk") — removed after criticism
  + regulatory attention, "the clearest public admission in consumer fintech
  that a delight pattern was doing harm"; movers-lists exploit availability
  heuristic; suitability gates that are guessable are theatre.
- **Does badly:** App-behavior claims are time-stamped (Robinhood has changed);
  written from public behavior, not internals.
- **Take:** The friction-as-protection principle is our betting-ethics spine:
  friction on money decisions (accept-odds-change, confirm cash-out, visible
  placing delay) is *load-bearing* — removing it uniformly is the dark pattern.
  "Before you remove friction, ask what it was protecting."
- **Refuse:** Celebration-on-transaction (our win feedback is a quiet <3s glow,
  matching Bashagha's own rule — and never on the *act of betting*, only on
  settled wins); movers-list editorializing of volatile markets.

---

## D. Craft systems & how top teams work (system-level references)

### D1. Vercel Geist — design system + color semantics
- **Opened:** https://vercel.com/geist ✓ and https://vercel.com/geist/colors.md ✓
- **Does well:** The most disciplined public token semantics found: every scale
  step has a *named job* — `100` default bg, `200` hover bg, `300` active bg,
  `400` default border, `500` hover border, `600` active border, `700`
  high-contrast bg, `800` hover HC bg, `900` secondary text, `1000` primary
  text. Only two page backgrounds (Bg1 default, Bg2 sparingly). "Draw each
  border once" (no stacked alpha borders); shadows stay translucent; choose
  solid gray vs gray-alpha by *whether the background should show through*.
- **Does badly:** Vercel-monochrome aesthetic isn't portable; docs over
  products (Geist serves docs/dashboards more than consumer apps).
- **Take:** Steps-with-jobs > colors-with-names. Our token spec should assign
  every scale position a *role* (odds-up gets a step, hover a step, suspended a
  step) — this is precisely how "one component = one behavior" survives at
  token level, and it's the register Bashagha's 45-component system ran on.
- **Refuse:** Their grayscale minimalism as a look; ten scales for their own
  sake (we need ~3-4 semantic scales mapped to betting semantics).

### D2. Vercel — "Design Engineering at Vercel"
- **Opened:** https://vercel.com/blog/design-engineering-at-vercel ✓
- **Does well:** The role that deletes the handoff: designer sketches the start,
  Design Engineer iterates *in code* — "animations, keyboard controls, and
  touch are better implemented in code to save reimplementing them from
  Figma." Three workflows (collaboration / embedded / independent). Design-led
  projects own the polish engineering backlogs deprioritize (Geist font, docs
  playground, delighters). "Iterate to Greatness" — ship continuous
  improvements, avoid the perfection trap. Cares-list: delightful affordances,
  reusable primitives, page speed, cross-browser, input modes, user prefs, AT.
- **Does badly:** Marketing-flavored; little on failure modes.
- **Take:** Our Devin-based build loop *is* the design-engineering model —
  motion/gesture/sheet behavior must be evaluated in the real build at real
  viewports (as they do), not in static mocks. "Polish that backlogs deprioritize"
  = exactly the craft margin we spend on odds rolls, sheet physics, skeletons.
- **Refuse:** "Iterate to greatness" as license to ship slop and fix later —
  the contest has a deadline; their iteration happens post-launch, ours must
  land pre-freeze.

### D3. Linear — The Linear Method + Quality Wednesdays
- **Opened:** https://linear.app/method ✓ and https://linear.app/now/quality-wednesdays ✓
- **Does well:** Method: opinionated software, scope-down, "verify the problem
  actually exists" before designing, "explore designs" issue per project,
  detailed project specs before building, issues-not-stories. Quality
  Wednesdays: a *ritual* — every engineer finds+fixes one ≤30-min imperfection
  (not a bug, a papercut) weekly, presented at standup; 1,000+ fixes logged with
  a `quality` label; the origin story: a screen recording of three buttons,
  one darkening instantly instead of fading 150ms — *nobody could see it*;
  "pursuit of quality is not an individual sport… hard to perceive subtle
  problems with a UI you yourself built"; themed hunts (Preferences month,
  keyboard nav month, mobile month).
- **Does badly:** Method assumes a team; cadence is weekly not daily-deadline.
- **Take:** The ritual is portable and is the deepest answer to A30–A31:
  quality-as-habit, themed hunts, visible logs. Our equivalent: per-build themed
  QC passes (390px sheets, focus states, odds-move semantics, copy tics) each
  logged — see 57's checklist. "Nobody could see the 150ms inconsistency" is
  why fresh-eyes subagent passes exist.
- **Refuse:** Shipping known papercuts to be caught by ritual later — the
  ritual catches what slipped, it doesn't excuse creating it.

### D4. Airbnb — "The Way We Build" (Design Language System)
- **Opened:** https://medium.com/airbnb-design/the-way-we-build-511b713c2c7b ✓
- **Does well:** Foundational DLS doctrine: "you can't innovate on products
  without first innovating the way you build them." DLS = components defined
  by shared principles+patterns → rapid iteration via shared vocabulary across
  disciplines. Four product principles: **unified, universal** (is it part of a
  greater whole; works across devices) + **iconic, conversational** (character
  tied to brand). Christopher Alexander: patterns must be "fundamentally
  simple… nothing which is not simple and direct can survive the slow
  transmission." Tooling as system-defense: design-tools team, real data in
  design tools, Airshots (any screen, any version, any language, any device),
  code as a design tool to collapse spec handoffs.
- **Does badly:** 2016 — the *specific* tools are dated (Sketch); the DLS later
  calcified at Airbnb scale (documented elsewhere).
- **Take:** Write our 4-6 principles in exactly this shape: two system-side
  (consistency, works-at-both-widths) + two character-side (feels like
  Housebets, reads like a desk not a casino). "Any screen, any version, any
  device" = our qc/ screenshot discipline (390+1440, every state) — we already
  do their Airshots, manually.
- **Refuse:** Process-for-process's-sake tooling investment; a component count
  as a quality metric.

### D5. Evan Tang — Sleeper dynasty-mode case study
- **Opened:** https://www.evan-tang.com/sleeper ✓
- **Does well (the best single portfolio-case-study reference found):**
  Opens with a user-story scene (Thursday, roster locks, missing contract
  details). Three declared principles filtering every decision: "extend the
  experience, never interrupt it" · "every addition has to earn its place" ·
  "design for the competitive manager without losing the casual one." 30
  interviews → insight reframing ("the problem was never missing features —
  users couldn't make confident decisions"; every element judged by "does this
  reduce decision uncertainty, or add noise?"). Consulted *Sleeper's own
  designers* — learned the history tab was least-engaged → **replaced** it
  rather than adding. IA audit found the disconnected "Sleeper Zone" (own
  visual language = confidence leak). Usability-tested: 90% found the new tab
  unaided because it matched the mental model (player info lives on player
  page). Three directions for contract display, tested, chose the third.
- **Does badly:** Self-initiated concept project (no ship constraint);
  football-fantasy domain.
- **Take:** This IS the senior-portfolio grammar A3c demands: principles stated
  up front, insight→decision chains, replace-don't-add, validated claims
  ("90% found it"), honest tradeoffs. Apply literally: our per-screen
  "interrogation card" (A23d/A24) should read like this — decision, rejected
  alternatives, reason. And "meet the mental model" = market info lives on the
  match page, slip state lives on the slip bar/sheet — no invented zones.
- **Refuse:** Feature-add framing; unverified confidence ("users would want X"
  without the test).

### D6. Lenny's Newsletter — "How Linear builds product" (partial)
- **Opened:** https://www.lennysnewsletter.com/p/how-linear-builds-product ✓ (paywalled after ~Q4; captured intro + planning/PM/goals/team structure)
- **Does well:** Karri Saarinen (designer-CEO) on taste-driven building: no
  product-area teams (project teams form + disperse); 1 designer + 2 engineers
  per project; no A/B tests — "we validate ideas and assumptions driven by
  taste and opinions… beta test, see the feedback, iterate, until we have the
  conviction it's as good as it can be"; one roadmap; one North Star metric,
  no per-project metric goals; specs written by the project team.
- **Does badly:** Paywall truncated the piece (design-crit specifics beyond Q4
  UNKNOWN); Linear's luxury = no external judges, no deadline.
- **Take:** "Taste validated by beta feedback, not metrics" is our loop — the
  adversarial judge passes are our beta. Small fixed team-per-project maps to
  our subagent-per-track tree. Conviction bar ("as good as it can be at this
  point") = our freeze bar.
- **Refuse:** No-metrics romanticism where it hides evidence — we keep hard
  evidence (Lighthouse, QC logs, screenshot diffs) precisely because our
  judge can't be beta-tested beforehand.

---

## E. Awwwards-tier fintech (what "wow" looks like — and its limits)

### E1. Moto Finance — Awwwards Site of the Day (Sep 2026)
- **Opened:** https://www.awwwards.com/sites/moto-finance ✓
- **What it is:** Properly Studio's premium-fintech-card marketing site —
  Two-color palette (`#0B0C07`/`#E1E5E5`), Three.js+GSAP+Webflow, parallax, big
  background images. Jury score 7.3/10 (Design 7.25 · Usability 7.19 ·
  Creativity 7.56 · Content 7.31); Dev award 7.2 (a11y 7.2, responsive 7.2).
- **Does well:** Proves the scoring grammar of award judges: creativity gets
  only 20% weight; design+usability = 70%. Even the winner's *usability* score
  is the weakest-ish axis vs its creativity — award craft ≠ product usability.
- **Does badly:** It's a marketing site — zero product states, zero data
  density, scroll-driven narrative. A sportsbook built like this fails the
  brief on contact.
- **Take:** If a rival "goes Awwwards" they'll score high on first-impression
  and crater on the 30-pt states+slip+match surface. The judge weights here
  mirror ours: substance (usable, consistent) carries ~70%.
- **Refuse:** GSAP/Three.js marketing grammar on a product prototype (also
  violates our no-WebGL-on-money-paths rule).

### E2. PandaPay — Locomotive Awwwards case study
- **Opened:** https://www.awwwards.com/case-study-crafting-a-digital-experience-in-the-banking-space-for-pandapay.html ✓
- **Does well:** Agency process transparency: discovery workshops → art
  direction (progressive-image illustration system) → information architecture
  → micro-interactions → stack honesty (HTML5/Barba.js/WordPress +
  Locomotive-Scroll). "Crafty animated illustrations… to convey the fun and
  accessible factor."
- **Does badly:** Again a marketing site; smooth-scroll library (Locomotive/
  Lenis class) is precisely the scroll-hijacking we rejected in the stack plan.
  Case study shows *intent*, not edge states.
- **Take:** Their discovery-first framing is how to write our submission note:
  brief restated → direction → system → craft details → stack honesty. Agency
  case studies are 80% "why", which is what a judge's big-idea field rewards.
- **Refuse:** Scroll-jacking and page-transition theatre on any path where a
  player is managing money.

---

## F. Cross-cutting synthesis — what senior work shares

1. **Decisions are narrated, not just rendered.** Every strong reference
   (Wednesday Studio, Evan Tang, MoPlay, Geist docs, Lickability) explains
   *why* — principles, filters, rejected alternatives. Weak work shows only
   outcomes. → Our per-element interrogation cards + submission "big idea"
   carry this.
2. **Systems over screens.** Geist's steps-with-jobs, Airbnb's DLS principles,
   FotMob's one-encoding-everywhere, Sleeper's "extend never interrupt" —
   consistency is the senior signal; novelty is applied *through* the system.
3. **Honesty of numbers.** Fudge's semantic color map, Human Invariant's
   midpoint deception, Robinhood's removed confetti, Dr. Drang's misaligned
   table — money products are judged on whether displayed numbers mean what
   they say.
4. **Density via rhythm, not shrinkage.** FotMob (never shrinks type), Apple
   Sports (columns hold under +30% type), Polymarket (saturation hierarchy) —
   all solve density structurally, not by making text smaller.
5. **States are the product.** The strongest work designs suspension/failure/
   empty paths; the weakest (Awwwards marketing sites, Figma decks) has none.
   Our 10-pt states line + Bashagha's failure-path-first bias make this the
   highest-leverage axis.
6. **The filter question.** "Does it help the user decide, or just stimulate?"
   (Wednesday) + "what was the friction protecting?" (Robinhood) + "does it
   reduce decision uncertainty or add noise?" (Evan Tang) — three independent
   phrasings of the same senior filter. It is now ours.

## G. What we refuse, consolidated

- Figma-deck-as-deliverable; image-baked case studies (Behance pattern).
- Casino/slots visual energy; purple-gradient/glass/glow AI defaults (slop
  audit F1–F17 alignment).
- Celebration-on-transaction; stimulation unmoored from decisions; tickers/
  leaderboards as fake liveness.
- Scroll-jacking, WebGL/parallax marketing grammar on product surfaces.
- Icon-only navigation, unexplained numbers, midpoint-style price dishonesty,
  headers that lie about the table below them.

---

## DERIVED ASK PROPOSALS (for qc/ASKS.md — NOT written there; await owner)

1. **Winner/loser typographic weighting:** settled results dim the losing side
   (Apple Sports pattern) — verify on My bets settled cards + finished rows at
   390/1440. (B2)
2. **One-header-one-table check:** anywhere multiple row-groups share one
   header (market groups, box-score-style tables, My bets columns), column
   widths must be computed across all groups — explicit QC row. (B3)
3. **Long-name resilience suite:** render rows with 3-char, 20-char and
   double-barrel team names at 390 — no single-letter truncation (regress
   loop-rival-pass1 defect #1). (B2, B3)
4. **Dynamic-Type-analog stress:** zoom the app to 130% text at 390 — columns
   must stay aligned, headers wrap not truncate. (B1)
5. **Pinned-scoreboard + tab-pane match page:** scoreboard stays pinned and
   minimal while market panes get full vertical space — verify scroll behavior
   at 390. (B5)
6. **Density-by-rhythm rule:** no font size below the body floor anywhere on
   money paths; density comes from spacing/grouping — lint in token spec. (B5, B1)
7. **Follows-reorder rule:** followed teams/competitions pin to top of their
   groups on Home, Football and Live, with a visible follow affordance — brief
   requirement met the FotMob way. (B5)
8. **One-encoding audit:** odds-move (glyph+color+caret), suspension
   (lock+reason tag), live state (chip+clock) each render identically on every
   surface — "learned once, reused everywhere" test across 5 pages. (B5)
9. **Label-icons rule:** every icon-only nav element either gets a label or a
   first-contact text affordance; no bare ellipsis glyphs. (B7)
10. **Decision-vs-stimulation motion filter:** every animated element gets a
    one-line answer to "does this help the player decide?" in the motion spec —
    no answer = remove. (C2)
11. **Honest-price display:** odds cells optionally/secondary show implied
    probability; potential return always beside stake; cash-out ticks live and
    re-confirms on change. (C3, C1)
12. **Cause-annotated price moves:** where the engine knows the cause (goal,
    VAR, suspension reason), the odds row/market shows it — our
    "why" tag that no competitor ships. (C3, C4)
13. **Friction-as-protection statement:** the three money frictions we kept
    (odds-change acceptance, cash-out re-confirm, visible placing delay) are
    written into SUBMISSION.md as deliberate, with the Robinhood lesson cited.
    (C5)
14. **Semantic token roles:** token spec assigns each scale step a named job
    (default/hover/active/border/text) Geist-style; no unnamed color in a
    component. (D1)
15. **Design-in-code validation:** all motion/gesture/sheet behaviors are
    evaluated on the real build at 390/1440 — mock-only approval banned. (D2)
16. **Portfolio-grammar submission note:** SUBMISSION.md big-idea field +
    tour written as principles→insights→decisions (Evan Tang grammar), naming
    rejected alternatives. (D5)
17. **Replace-don't-add sweep:** every element added since wireframe parity has
    a "what it replaced or what it earns" line — nothing merely additive. (D5)
18. **Zero-promo first viewport:** no banner/carousel/promo module in the first
    viewport of any page — brief-aligned and teardown-validated. (42-table, B7)
19. **Marketing-grammar quarantine:** no scroll-jacking, parallax, custom
    cursor, GSAP-style transitions anywhere in the five pages. (E1, E2)
20. **Process artifact parity:** keep one process doc per page (parity map →
    token decisions → states → QC) so the entry reads like a lifecycle, not a
    deck. (A1, D4)

## Blocked / UNKNOWN registry

| Reference | Attempt | Status |
|---|---|---|
| Behance Bet365 Redesign | webfetch | 403 — UNKNOWN |
| Behance LineUp mobile betting app | webfetch | 403 — UNKNOWN |
| Behance BetKick case study | webfetch | 403 — UNKNOWN |
| Dribbble sportsbook search | — | Not opened (Cloudflare/JS) — UNKNOWN |
| polymarket.com live app | webfetch | Blocked — UNKNOWN (covered via Fudge capture) |
| kalshi.com live app | — | Not opened — UNKNOWN |
| Interaction Design Foundation feedback article | webfetch | 403 — UNKNOWN (method corroborated by search snippets) |
| NN/g storyboards-in-UX article | — | Not opened — UNKNOWN |
| Medium Sofascore teardown (@pmstuffbydj) | — | Not opened — UNKNOWN |
| Lenny's Linear piece beyond Q4 | webfetch | Paywall — partial (intro + Q1–4 verified) |
| Behance project image content (A1, A2) | Playwright | Images not OCR-verifiable — visual specifics UNKNOWN; metadata + descriptions verified |
