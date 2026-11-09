# ASKS — Master Requirements Ledger

Generated 2026-11-09 23:15 IST (real `date`). Schema: | ID | Check | Status | Evidence | Notes |
Statuses: MET / PARTIAL / NOT MET. Post-reset evidence only counts. IDs are stable.

**Counts: 380 atomic rows** — 124 quoted lettered checks, 190 research sub-asks, 66 process/X/post rows. MET 2 · PARTIAL 13 · NOT MET 365

---

## Section 2 — verbatim source

> 2. Mohan's asks, expanded (every line is a requirement)
> 
> Source: Mohan's original brief to you (the text that starts with the contest URL), plus his later messages in this chat. Each numbered ask is a quote or close paraphrase. The lettered lines under it are the concrete checks it implies. A line is only MET with evidence.
> 
> A1. "Go through that thing in detail from the start. Take every screenshot and understand what they are expecting in detail."
> 
> a. Read the whole contest page top to bottom again today: hero, scorecard, minimum bar, page specs, out of scope, what to deliver, the submission form, the confirmations, News, prize ladder. Save the text to research/00-contest-brief.md with today's real fetch time. b. Save every image on the page (the 6 wireframes: Sports home, Live, Football, Match page, Bet slip, My bets) at full resolution to research/wireframes/, if not already there, and check they match the live page. c. For each wireframe, write an element inventory: every box, label, count, button, tab, state and order, top to bottom, left to right. File: research/wireframes/INVENTORY.md. d. For each wireframe element, note what the brief expects it to do when tapped. e. Note that wireframes 5 and 6 are ONE page in our entry ("Bet slip and My bets share one page"). f. Note the scorecard weights and design effort in proportion: Sports home 15, Live 10, Football 10, Match page 20, Bet slip + My bets 20, Feels like Housebets 15, Every state (suspended, changed, failed) 10. g. Note the tie rule: higher Match page score wins, then Feels like Housebets. So the Match page and the Housebets feel get the most care. h. Note "The sportsbook we'd ship tomorrow wins": production realism beats concept art. i. Note "Ranked by Housebets Team", and that the judge is Ismael Bashagha, Founding Head of Design. Re-read his case study (https://ismaelbashagha.com/archive/housebets/) and update research/32-judge-dna.md. j. Note the competition size (131 entered on 9 Nov evening) and that up to 3 submissions a day are allowed and the best one counts. k. List every out-of-scope item and grep the build for each: multis, accumulators, bet builder, boosts, free bets, promos, outrights, specials, stats widgets, match trackers, AI search. Zero hits allowed in the UI. l. List every deliverable as a test: all 5 pages linked; works at 390 and 1440; phone bet slip is a bar at the bottom; clickable; front end only; public link with no login; sample data only. m. List every form field (link, 5 pages ticked, big idea 80–800 characters, tools used) and every confirmation box, and make the build true to each confirmation. n. Use the starter files (site shell: top bar, left nav, side panel; brand pack). If you still cannot get them, write exactly why in research/00-contest-brief.md and how you matched the live Housebets site instead.
> 
> A2. "Your prototype should be at least this … that was the bare minimum. You need to perform on top of that."
> 
> a. Every wireframe element exists in our screen at the same width (390 and 1440). Proof: side-by-side images in qc/wireframe-parity/. b. For each wireframe element, write what we do BETTER than the wireframe and why a player benefits. c. No wireframe element is dropped or merged without a written reason that a judge would accept. d. Every page has more depth than the wireframe where the brief allows it (market depth, states, empty states), never more scope than the brief allows.
> 
> A3. "Like in professional UI/UX experiences, candidates, and all those things."
> 
> a. Study how top professional designers present sportsbook and fintech work (Dribbble, Behance, Awwwards, case studies). Save at least 15 references you actually opened, with URLs, to research/40-pro-references.md. b. For each reference: what it does well, what it does badly, what we take, what we refuse. c. Our entry must read like a senior designer's portfolio piece: consistent system, deliberate hierarchy, no filler. d. Assume other entrants are professional UI/UX candidates using the same AI tools. Write what they will most likely ship (research/41-rival-forecast.md) and how we beat each one.
> 
> A4. "See the Stake, Shuffle, and those things also. You need to perform more than that."
> 
> a. Full teardown of Stake sports and Shuffle sports (public pages only, no login, no money): home, live, a football league, a live match page, the bet slip, my bets. Screenshots at 390 and 1440 into research/teardown/<site>/. b. Add bet365, FanDuel, DraftKings and Housebets' own live site. c. For each: bet slip placement, how odds changes are shown and accepted, how suspension looks, live score and clock treatment, market group tabs, cash-out placement and states, My bets layout, search, empty states, loading states. d. A comparison table: rows are features, columns are sites, plus a column "Ours: how we beat it". e. Note what bettors already know from these sites (familiar patterns we must keep) and what we do better. f. Do not copy any site's visuals, layout or assets. Learn patterns, invent the execution.
> 
> A5. "Must not look like A-graded stuff" (average or template work) / the site "looks 100% like a fingerprint".
> 
> a. Research AI-generated UI fingerprints (Reddit, X, design blogs): generic gradients, cyan-on-navy, glassmorphism everywhere, uniform 12px radii, Lucide icons, emoji, initials-in-circle crests, centred empty states with one icon, pill rows, "hero card" sameness. b. Run that audit on fresh screenshots of the CURRENT build. File research/30-slop-audit-v4.md listing every hit with a screenshot crop. c. Every hit gets a replacement decision rooted in Housebets' brand, not in a different trend. d. Blind test: a fresh subagent with no context is shown our screens and three AI-made sportsbook screens and asked which are AI templates. We pass only if ours is not picked.
> 
> A6. "You need to understand these generation things."
> 
> a. Understand the generation of players: who bets on crypto sportsbooks (age bands, mostly 18–34, mobile-first, crypto-native, used to Stake and Shuffle, used to TikTok-speed interfaces). Cite sources. b. Understand AI generation: everyone will generate this site with AI. Know what AI generation produces by default and steer away from those defaults (links to A5). c. Understand the current generation of frontend (A16).
> 
> A7. "Understand gambling and psychology and all those things."
> 
> a. Gambling psychology track (section 4, T5): near-miss effects, loss aversion, the illusion of control, variable rewards, time distortion, the sunk-cost effect, the hot-hand fallacy. b. For each effect: where it appears in a sportsbook, how a dark pattern exploits it, and how we design ethically (inform the decision, never make it for the player). c. Read the ethical counterweight: Natasha Dow Schüll, "Addiction by Design". Write what we refuse to do because of it. d. Responsible-gambling cues as trust signals the judge will notice: 18+, session time visible, limits reachable from the slip and the live page, a reality check, no "bet again" styled louder than "close", no countdown pressure beyond real price refresh, honest copy.
> 
> A8. "Not just UI skills, but UI/UX psychology tips … a lot of books … spend some subagents to read those books."
> 
> a. Assign subagents to the books and sources in section 4, T3. Each writes a notes file with chapter-level takeaways and an "apply to our sportsbook" list of 10–25 rules. b. Every rule ends up in research/50-rules.md with an ID (R-xxx), and every rule is cited in at least one element decision (section 7). A rule nobody uses is a wasted rule; a decision with no rule is a guess.
> 
> A9. "What button needs to be placed where."
> 
> a. A button map for every page at 390 and 1440: every button, its position, its size, its priority (primary, secondary, tertiary). b. Thumb-zone map at 390: primary actions (odds cells, slip bar, Place bet) sit in the easy reach zone. c. Fitts's law: frequent and money actions are big and near; destructive actions are far and smaller. d. One primary action per view. Write which one it is for each screen state.
> 
> A10. "Why we need to place it there."
> 
> a. Every placement in the button map has a written reason citing a rule ID (R-xxx) or a competitor convention. b. "It looked nice" and "it is common" are not reasons on their own.
> 
> A11. "What areas eyes will be attracted to."
> 
> a. Eye-tracking research: F-pattern for lists, Z-pattern for sparse hero areas, the layer-cake pattern for scanning headings, banner blindness (players ignore anything that looks like an ad). b. For each screen, an attention map: the first, second and third thing the eye should land on, and why. Verify with a squint/blur test screenshot (qc/blur/). c. Contrast, size, colour and motion are attention budget. Only the right thing gets each one. Write the budget per screen. d. Live motion (clocks, odds flashes) is attention; make sure it does not steal attention from the slip at the wrong moment.
> 
> A12. "How everything needs to be."
> 
> a. A single written design principle set (5–7 principles) for this sportsbook, each with an example and a counter-example from our screens. b. Every screen decision traces back to a principle.
> 
> A13. "For gambling, how we need to showcase exactly."
> 
> a. How odds, scores, clocks, markets, stakes and returns are showcased: tabular numerals, fixed-width odds cells, decimal odds, stakes in USDT, potential return always visible beside the stake. b. Live indicators that are honest (real minute, HT, ET), not decorative. c. Odds movement shown with direction plus colour plus glyph (never colour alone), with a short non-blocking transition. d. Suspended markets stay visible, clearly locked, with a reason (VAR check, penalty, goal). e. Wins celebrated quietly: a soft glow under three seconds, no confetti (Bashagha's own rule). Losses shown with respect, no "try again" bait.
> 
> A14. "Think from very different kinds of perspectives, because everyone will use AI … to get the $9,000 prize."
> 
> a. Write the entry from 8 perspectives: experienced Stake/Shuffle bettor, casual football fan, mobile-first player on a train, first-time crypto bettor, colour-blind player, keyboard and screen-reader user, Ismael Bashagha as judge, a Housebets engineer deciding if this can ship tomorrow. b. For each perspective: their top 5 frustrations with today's sportsbooks, and how our design answers each. c. Remember the money: 1st place is $9,000 of a $15,000 pool (2nd $4,000, 3rd $2,000). Only 1st counts for us.
> 
> A15. "We need to act so differently that when the reviewers see all the sides, ours stands aside, because they judge visually."
> 
> a. Define our "big idea" in one sentence before the redesign, and make every screen express it. It goes into the form (80–800 characters). b. A judge's first 5 seconds on each page must already look different from a template. Write what they see in those 5 seconds. c. Differentiation must come from craft, brand and psychology, not from out-of-scope features. d. Do a 10-second first-impression test with a fresh subagent per page and record what it remembers.
> 
> A16. "Study how the frontend has evolved … November 9th … pick up the latest libraries … the highest level … what library you can use so that you can control it at the highest level."
> 
> a. Research the current stack (Nov 2026) and write research/25-library-frontier.md: for each candidate, what it does, the version, its bundle cost, and EXACTLY where it would be used in our five pages, or why not. b. Candidates to evaluate at minimum: Motion for React (layout, presence, gestures, springs), the native View Transitions API and React's ViewTransition, CSS scroll-driven animations, @starting-style, container queries, :has(), Base UI and Radix primitives (accessible dialogs, sheets, tabs, popovers), Vaul or an equivalent drag-to-dismiss bottom sheet, number-flow style animated numerals for odds and returns, Tailwind v4 tokens, OKLCH colour, variable fonts. c. Rule: the smallest tool that does the job. CSS first, Motion for gestures and layout, View Transitions for route changes. No library is added for novelty. d. Prove control: every animation has a duration, an easing, a trigger, an interruption rule and a reduced-motion twin, written in the motion spec.
> 
> A17. "That doesn't mean you need to go away from the building side and try creatively … think more from the user experience perspective … rather than pushing the frontend to the highest level."
> 
> a. Every frontend technique must answer "what does the player get from this?" in one sentence, or it is removed. b. No WebGL, particles, parallax or scroll-jacking on money paths (odds, slip, cash-out). c. Performance is UX: Lighthouse mobile Perf ≥ 90 on all 5 routes, INP under 200 ms, no layout shift when odds change.
> 
> A18. "Make the site for the users, make the site for us to earn more, and make the site for the users."
> 
> a. Users first: clarity, speed, trust, control. b. Business second, through good UX: fewer taps from match to placed bet, clear market depth, follow and return loops, easy re-bet from My bets. Measure taps per flow and write them down. c. Never earn through dark patterns. List dark patterns we deliberately did not use; that list goes into the submission.
> 
> A19. "Understand what type of users use this, what they are already experienced with, how they feel familiar, but we stand out as something more."
> 
> a. Personas (section 5) with sources. b. A "familiar" list: patterns we keep because bettors expect them (right-side slip on desktop, bottom slip bar on phone, 1X2 row odds, live badge, tabs for market groups). c. A "more" list: where we exceed them, each tied to a persona pain point.
> 
> A20. "They feel the smoothness … and navigate in an easier, proper manner rather than a difficult kind of thing."
> 
> a. Every transition is under 300 ms on interaction paths, with no jank at 60 fps on a mid-range phone profile. b. Every page is reachable in 2 taps or fewer from any other page. c. Back always returns to where the player was, including scroll position and open tab. d. No dead ends, no dead buttons, no "coming soon".
> 
> A21. "They need to have a picture in their mind … after going through once from start to end."
> 
> a. Write the mental map: the one-paragraph picture a player should hold after one pass (where live is, where the slip is, where their bets are, how a match page is organised). b. Keep that structure identical on phone and desktop, so the picture transfers. c. Test: a fresh subagent does one full pass, then must draw the map from memory. Record the result in qc/mental-map-test.md.
> 
> A22. "Plan from the user's perspective and how they stay."
> 
> a. Retention moments that respect the player: follow a team or competition, live alerts for followed matches, open bets visible on the match page, cash-out on the open ticket. b. Session flow: arrive → find a match → read markets → add to slip → place → watch → settle. Storyboard every step.
> 
> A23. "Think of every box, every margin, every font size, every font colour … using the entire screen. Why it needs to be placed there."
> 
> a. A design-token spec (section 8) governs every value. No raw pixel, hex or ms value appears in components. b. At 1440, the whole width is used deliberately: no dead bands, no stretched rows. Write the column grid. c. At 390, nothing clips at 360, 390 or 430. d. Every element gets an interrogation card (section 7).
> 
> A24. "Question yourself at every placement and position: where exactly, what users think while clicking, what they expect, what we show, and where they go next."
> 
> a. The interrogation card (section 7) is filled in for every interactive element and every state. b. A second subagent challenges each card and must find one weakness or sign off with a reason.
> 
> A25. "There are many types of books … read all of them … use agents and deploy them."
> 
> a. At least 12 books or sources, each read by its own subagent (section 4, T3). b. Each notes file states which edition or source was actually read, and quotes or cites pages and sections honestly. If a full book is not accessible, say so and use the best legitimate summaries and the author's own talks or articles, labelled as such.
> 
> A26. "Don't neglect any word … every line and every word I am speaking, I ask for."
> 
> a. qc/ASKS.md covers every sentence of Mohan's brief and his later messages. A reviewer subagent checks the brief sentence by sentence against qc/ASKS.md and lists any missed sentence.
> 
> A27. "Spend a lot of time learning the psychology of colours … how colours give an impression on different ages, perspectives and users."
> 
> a. Colour track (section 4, T6): meanings of green, red, amber, gold, blue and purple in betting, money and trust contexts; differences by age band and culture (Housebets ships in 20 locales across 156 countries, including Arabic RTL). b. Red/green colour-blind safety: every state uses a second cue (glyph, label, pattern). c. Contrast: WCAG AA at minimum on all text, AAA on odds and money. d. A colour rationale for every token in the palette: what it means, where it is allowed, where it is banned. e. Housebets brand colours from the brand pack stay primary.
> 
> A28. "Understand the users first: who comes here, and who thinks from the reviewer's perspective."
> 
> a. The judge persona (research/32-judge-dna.md) is a first-class persona with the same depth as players. b. Write a 60-second judge tour that shows every scored item.
> 
> A29. "These things are open for the whole world … many, many great members."
> 
> a. Assume the best rival is a world-class senior designer. The adversarial rival judge in the loop plays that person.
> 
> A30. "They will do it in a normal vibe-coding fashion, but we need to do a real kind of thing, like how an app company does quality control."
> 
> a. A real QC process: spec → build → self-check → peer check (subagent) → QC register → regression. b. Every bug found gets a ticket line in qc/BUGS.md with severity, repro, fix commit and re-test.
> 
> A31. "Every button, every animation needs to be rechecked very many times, 10 to 20 times."
> 
> a. qc/QC.md: one row per interactive element, state and animation. At least 10 logged rechecks per row before freeze, at 390 and 1440, with date, time (real), verdict and evidence. b. Rechecks are spread across builds (not 10 ticks in one minute).
> 
> A32. "Everything must be planned before, in a storyboard way."
> 
> a. Storyboards for every screen and flow (section 9) exist before code changes for that screen.
> 
> A33. "Be bold enough to reject it if it deviates even slightly from the quality control."
> 
> a. The rejection rule (section 11): any deviation from spec, tokens or storyboard is a FAIL, not a "nit". b. You must reject your own work in writing at least once per screen when it does not meet the bar, and say what you changed.
> 
> A34. "Do it in a proper tree way … one by one … increase the subagents."
> 
> a. Research runs as a tree (section 4): root question → tracks → sub-questions → outputs. Each level spawns more subagents where the answers are thin. b. Write the tree in research/TREE.md with each node's status.
> 
> A35. "Finally we could have a great plan that no one else could have."
> 
> a. research/60-master-plan.md: the synthesis of all tracks into screen-by-screen decisions.
> 
> A36. "List all of them first … find 10 to 20 asks in each … you will get hundreds of things … do all of them … think about anything I missed … do even more. Don't be lazy."
> 
> a. qc/ASKS.md has more than 300 checkable lines when you finish Phase 1. b. Section 3 items are added, plus your own.
> 
> A37. Mohan's earlier messages in this chat (still in force)
> 
> a. M4: custom crests, not initials on gradient discs; keep the real Housebets logo; custom art, not sourced; a slideshow hero like Stake and Shuffle with no promos; Shuffle-level attractiveness with custom SVGs and section backgrounds; hand-drawn custom accents are allowed; a dedicated brand taste; buttons and the live button must not look AI-made; market counts upfront; favourites from anywhere plus a hub with counts; Reddit ×4–5 and X ×4–5 research subagents; every pixel justified; use the entire screen. b. M5 and M9: be prompt-sensitive; every line becomes to-dos; open asks spawn 10–20 to-dos. c. M6: research betting and Housebets specifically, to the world's greatest level. d. M7: personal account only; nothing on the company account or company email. e. M10: rebuild visuals from scratch; a full research wave of 10+ agents; the checklist is a committed repo file. f. M13 and M14: research the latest libraries and HOW to use them here; study the "cinematic websites" X thread deeply, and apply only what fits a sportsbook. g. Director: 1st place only; "understand how great people all over the world do." h. STEER2: the harsh 100/100 reviewer that names every minute thing, including what is missing.

---

## Section 3 — verbatim source (things Mohan missed → rows X01–X14 below)

> 3. Things Mohan did not say but a winner needs
> 
> Accessibility: keyboard paths, focus rings, screen-reader labels on every odds cell ("Arsenal to win, 1.30"), live regions for odds changes and bet results, reduced motion.
> 
> Internationalisation readiness: long team names, RTL check on the shell, number formatting.
> 
> Edge cases in Bashagha's style: double-tap Place bet, odds change while the sheet is open, suspension during cash-out confirm, tab hidden mid-placement, offline then back online, stake above balance, stake of zero, a 6-decimal stake, a very long team name.
> 
> Loading and skeleton states for every list, sized exactly like the final content (no layout shift).
> 
> Empty states with art and a next step (no live matches: show Starting soon, as the brief demands; empty slip; no open bets; no follows).
> 
> Error states with plain-language reasons and a recovery action.
> 
> Realistic data: believable fixtures, fictional player names, consistent overround (103–107%), no two fixtures with identical lines.
> 
> Deep links that return HTTP 200 on every route.
> 
> A State Tourer (judge tool) that reaches every scored state in one tap, styled as a discreet demo control, not part of the product.
> 
> Copy: short, honest, consistent tense and casing, one voice. A copy deck in design/COPY.md.
> 
> Sound and haptics: decide (likely none on web, or haptics only where supported) and write why.
> 
> The submission text: big idea counted to 80–800 characters, every tool named including Devin and any AI models.
> 
> Performance budgets per route.
> 
> A design-system page in the prototype (hidden route) showing tokens and components, which signals "shippable tomorrow" to a Head of Design who built a 45-component system.

---

## Atomic ledger

| ID | Check | Status | Evidence | Notes |
|---|---|---|---|---|
| S1.a | Protect correctness baseline: commit uncommitted work, tsc+biome+build, deploy, tag baseline-correctness | MET | tag baseline-correctness @d7113bb3; gh-pages ccf79b02; live bundle index-BQ97Bt18.js 200 @22:50 | verified post-reset 9 Nov 22:40–22:51 |
| S1.b | Every baseline fix has a regression row in qc/QC.md | PARTIAL | qc/QC.md §BASELINE-B01..B12 rows created | rows exist; runs pending |
| S1.c | Create qc/ASKS.md per spec | NOT MET | — | this file; pending coverage review + counts |
| S1.d | Create qc/RESET_LOG.md with real clock times | PARTIAL | qc/RESET_LOG.md | has real-time entries; keep appending |
| S1.e | Post in chat: asks count + phase plan with real start time | NOT MET | — | after ledger counts |
| A1.a | Re-read whole contest page today incl. News+confirmations; save to research/00-contest-brief.md w/ real fetch time | NOT MET | — |  |
| A1.b | All 6 wireframes full-res in research/wireframes/, verified vs live page | NOT MET | — |  |
| A1.c | research/wireframes/INVENTORY.md: every element, label, count, button, tab, state, order per wireframe | NOT MET | — |  |
| A1.d | Every wireframe element has an expected tap behaviour written | NOT MET | — |  |
| A1.e | Wireframes 5+6 = ONE page (Bet slip + My bets) noted | NOT MET | — |  |
| A1.f | Scorecard weights noted + effort allocated in proportion (15/10/10/20/20/15/10) | NOT MET | — |  |
| A1.g | Tie rule noted: Match page score first, then Feels like Housebets → they get most care | NOT MET | — |  |
| A1.h | "Ship tomorrow" noted: production realism over concept art | NOT MET | — |  |
| A1.i | Judge = Ismael Bashagha; case study re-read → research/32-judge-dna.md updated | NOT MET | — |  |
| A1.j | Competition size + 3/day + best-counts rules noted | NOT MET | — |  |
| A1.k | Out-of-scope list made; grep build = zero hits for each | NOT MET | — |  |
| A1.l | Every deliverable as a test: 5 linked pages, 390+1440, phone slip bar, clickable, FE only, public no login, sample data | NOT MET | — |  |
| A1.m | Every form field + confirmation box listed; build true to each | NOT MET | — |  |
| A1.n | Starter files used OR exact reason + live-site match method written in 00-contest-brief.md | NOT MET | — |  |
| A1.S1 | Scorecard + tie-break text quoted verbatim from live page (not memory) | NOT MET | — |  |
| A1.S2 | Submission form fields enumerated incl. char limits + which are required | NOT MET | — |  |
| A1.S3 | News section diffed for rule updates since last read | NOT MET | — |  |
| A1.S4 | Entry-count/date claims stored w/ observed timestamp (dated observation) | NOT MET | — |  |
| A1.S5 | Wireframe image checksums recorded so "matches live page" is provable | NOT MET | — |  |
| A1.S6 | Effort map: hours per screen proportional to weights, Match page largest | NOT MET | — |  |
| A2.a | Every wireframe element exists at same width (390+1440); side-by-side proof in qc/wireframe-parity/ | NOT MET | — |  |
| A2.b | For each element: what we do BETTER + why player benefits, written | NOT MET | — |  |
| A2.c | No element dropped/merged without judge-acceptable written reason | NOT MET | — |  |
| A2.d | More depth than wireframe where allowed; never more scope | NOT MET | — |  |
| A2.S1 | Parity checklist auto-derived from INVENTORY (one row per element) | NOT MET | — |  |
| A2.S2 | Each "better" claim phrased as measurable benefit (taps, ms, states covered) | NOT MET | — |  |
| A2.S3 | Dropped/merged register file w/ per-element rationale | NOT MET | — |  |
| A2.S4 | Depth audit vs scope ban list — zero violations | NOT MET | — |  |
| A2.S5 | Side-by-side images filed under qc/wireframe-parity/<page>/ at both widths | NOT MET | — |  |
| A3.a | ≥15 pro sportsbook/fintech references actually opened w/ URLs → research/40-pro-references.md | NOT MET | — |  |
| A3.b | Per reference: good, bad, take, refuse | NOT MET | — |  |
| A3.c | Entry reads as senior portfolio piece: consistent system, hierarchy, no filler | NOT MET | — |  |
| A3.d | Rival forecast research/41-rival-forecast.md: what pros will ship + how we beat each | NOT MET | — |  |
| A3.S1 | Every "take" from references traced to an element card or decision | NOT MET | — |  |
| A3.S2 | Rival forecast names concrete patterns (layout/motion/art), not vibes | NOT MET | — |  |
| A3.S3 | Cross-page consistency audit: same component = same spec everywhere | NOT MET | — |  |
| A3.S4 | Each signature element has a "defend in crit" written answer | NOT MET | — |  |
| A3.S5 | References span ≥3 categories (sportsbook, fintech, craft/engineering) | NOT MET | — |  |
| A4.a | Stake+Shuffle teardown all six surfaces, 390+1440 shots → research/teardown/<site>/ | NOT MET | — |  |
| A4.b | + bet365, FanDuel, DraftKings, Housebets live | NOT MET | — |  |
| A4.c | Per site: slip placement, odds-change show/accept, suspension look, score/clock, market tabs, CO placement+states, My bets, search, empty, loading | NOT MET | — |  |
| A4.d | Comparison table: features×sites + "Ours: how we beat it" | NOT MET | — |  |
| A4.e | Familiar patterns to keep vs what we beat — written | NOT MET | — |  |
| A4.f | No copying visuals/layout/assets | NOT MET | — |  |
| A4.S1 | Slip open + placed + odds-moved states captured per site or UNKNOWN | NOT MET | — |  |
| A4.S2 | Cash-out states (available/suspended/changed) evidenced per site | NOT MET | — |  |
| A4.S3 | Geoblocked/login-only states logged UNKNOWN w/ attempted URL | NOT MET | — |  |
| A4.S4 | Familiar whitelist feeds design/FAMILIAR-VS-MORE.md | NOT MET | — |  |
| A4.S5 | Beat-column items each trace to element card, not aspiration | NOT MET | — |  |
| A4.S6 | Housebets live teardown distinguishes brand site vs BETBY embed | NOT MET | — |  |
| A5.a | AI-fingerprint research: gradients, cyan-navy, glassmorphism, uniform radii, default icons, emoji, disc-crests, centered empties, pill rows, hero-card sameness | NOT MET | — |  |
| A5.b | Audit on FRESH screenshots of current build → research/30-slop-audit-v4.md w/ crops | NOT MET | — |  |
| A5.c | Every hit replaced w/ Housebets-brand-rooted decision | NOT MET | — |  |
| A5.d | Blind test: fresh agent, our screens vs 3 AI-made, must not pick ours | NOT MET | — |  |
| A5.S1 | ≥12 distinct fingerprint tells each w/ source | NOT MET | — |  |
| A5.S2 | Crops filed qc/shots/<sha>/ and linked in audit | NOT MET | — |  |
| A5.S3 | Blind-test protocol: unlabeled, randomized, fresh context, logged | NOT MET | — |  |
| A5.S4 | Blind test re-run on final build before freeze | NOT MET | — |  |
| A5.S5 | Each replacement cites brand/system reason, not another trend | NOT MET | — |  |
| A6.a | Player generation: age bands, mobile-first, crypto-native, Stake/Shuffle habits — cited | NOT MET | — |  |
| A6.b | AI-generation defaults known + steered away from | NOT MET | — |  |
| A6.c | Current frontend generation understood (A16) | NOT MET | — |  |
| A6.S1 | ≥3 independent sources for audience claims | NOT MET | — |  |
| A6.S2 | AI-default list → refusal mapping in design/DECISIONS.md | NOT MET | — |  |
| A6.S3 | Demographic claims dated; anecdotes ≠ statistics, labeled | NOT MET | — |  |
| A6.S4 | Crypto-bettor specifics: USDT mental model, speed tolerance, wallet UX | NOT MET | — |  |
| A6.S5 | "TikTok-speed" operationalized: perceived-latency targets written | NOT MET | — |  |
| A7.a | 7 effects: near-miss, loss aversion, illusion of control, variable rewards, time distortion, sunk cost, hot hand | NOT MET | — |  |
| A7.b | Per effect: where in sportsbook, dark-pattern exploit, ethical design | NOT MET | — |  |
| A7.c | Schüll "Addiction by Design" read → what we refuse | NOT MET | — |  |
| A7.d | RG cues: 18+, session time, limits reachable, reality check, no bet-again>close, honest copy | NOT MET | — |  |
| A7.S1 | Ethics charter research/52-gambling-psych.md: use/refuse per mechanism | NOT MET | — |  |
| A7.S2 | No urgency mechanic beyond real price refresh — code audit | NOT MET | — |  |
| A7.S3 | Loss/cash-out copy audited for respect, no chase-bait | NOT MET | — |  |
| A7.S4 | Session/reality-check element reachable from slip AND live | NOT MET | — |  |
| A7.S5 | Variable-reward patterns limited to real events, never manufactured | NOT MET | — |  |
| A7.S6 | 18+/RG visible without being the loudest element — hierarchy check | NOT MET | — |  |
| A8.a | Subagents per book/source T3; each notes file: chapter takeaways + 10–25 apply-rules | NOT MET | — |  |
| A8.b | Every rule in research/50-rules.md w/ R-ID cited in ≥1 element decision; orphans=0 | NOT MET | — |  |
| A8.S1 | Each notes file states edition/source actually read | NOT MET | — |  |
| A8.S2 | Rules deduped + confidence-ranked | NOT MET | — |  |
| A8.S3 | Rule-less decisions audit = zero (a decision with no rule is a guess) | NOT MET | — |  |
| A8.S4 | Apply-lists sportsbook-specific, not generic advice | NOT MET | — |  |
| A8.S5 | Contradictory rules resolved w/ chosen-side rationale | NOT MET | — |  |
| A9.a | Button map every page @390+1440: position, size, priority | NOT MET | — |  |
| A9.b | Thumb-zone map @390: odds cells, slip bar, Place bet in easy reach | NOT MET | — |  |
| A9.c | Fitts: frequent/money big+near; destructive far+small | NOT MET | — |  |
| A9.d | One primary action per view, written per state | NOT MET | — |  |
| A9.S1 | Map covers icons, chips, links, toggles — not just buttons | NOT MET | — |  |
| A9.S2 | All states per control mapped (disabled/suspended/loading) | NOT MET | — |  |
| A9.S3 | Touch targets ≥44×44 verified in browser measurement | NOT MET | — |  |
| A9.S4 | Destructive vs money distance justified w/ rule ID | NOT MET | — |  |
| A9.S5 | Primary-action conflicts per state resolved in writing | NOT MET | — |  |
| A10.a | Every placement cites R-xxx or competitor convention | NOT MET | — |  |
| A10.b | "looked nice"/"is common" alone = not a reason — audit zero | NOT MET | — |  |
| A10.S1 | WHERE field on every card cites rule/convention | NOT MET | — |  |
| A10.S2 | Phrase audit on design docs = zero hits | NOT MET | — |  |
| A10.S3 | Second-agent challenge recorded per placement | NOT MET | — |  |
| A10.S4 | Convention deviations justified w/ persona pain | NOT MET | — |  |
| A10.S5 | Placement changes after crit re-justified, not silently moved | NOT MET | — |  |
| A11.a | Eye-tracking: F, Z, layer-cake, banner blindness researched | NOT MET | — |  |
| A11.b | Per-screen attention map: 1st/2nd/3rd fixation + why; squint test qc/blur/ | NOT MET | — |  |
| A11.c | Contrast/size/colour/motion = attention budget written per screen | NOT MET | — |  |
| A11.d | Live motion must not steal attention from slip at wrong moment | NOT MET | — |  |
| A11.S1 | Blur-test images captured + verdict per screen | NOT MET | — |  |
| A11.S2 | Max simultaneous animations per screen specified + enforced | NOT MET | — |  |
| A11.S3 | Slip-open state dims board motion — implemented + tested | NOT MET | — |  |
| A11.S4 | Banner-blindness audit: nothing critical looks like an ad | NOT MET | — |  |
| A11.S5 | First-fixation intent matches scorecard priority per page | NOT MET | — |  |
| A12.a | 5–7 principles, each w/ example + counter-example from our screens | NOT MET | — |  |
| A12.b | Every screen decision traces to a principle | NOT MET | — |  |
| A12.S1 | Principles file design/PRINCIPLES.md numbered P1..Pn | NOT MET | — |  |
| A12.S2 | Principle conflicts resolved w/ precedence rules | NOT MET | — |  |
| A12.S3 | Cards cite P-IDs; unreferenced principle = dropped or justified | NOT MET | — |  |
| A12.S4 | Counter-examples are real rejected options, not strawmen | NOT MET | — |  |
| A12.S5 | Principles reviewable by outsider as coherent set | NOT MET | — |  |
| A13.a | Tabular numerals, fixed-width cells, decimal odds, USDT, return always beside stake | NOT MET | — |  |
| A13.b | Live indicators honest (real minute, HT, ET), not decorative | NOT MET | — |  |
| A13.c | Odds move = direction+colour+glyph; short non-blocking transition | NOT MET | — |  |
| A13.d | Suspended markets visible, locked, reason shown | NOT MET | — |  |
| A13.e | Wins: soft glow <3s no confetti; losses respectful no try-again | NOT MET | — |  |
| A13.S1 | Numeral audit: every money/odds/score element uses lining tabular | NOT MET | — |  |
| A13.S2 | Triple-coding verified on real tick events (recording) | NOT MET | — |  |
| A13.S3 | Suspension reason vocabulary enumerated (Goal/VAR/Penalty/Feed) | NOT MET | — |  |
| A13.S4 | Glow duration measured <3s in recording | NOT MET | — |  |
| A13.S5 | Loss/settle copy audited vs respect rules | NOT MET | — |  |
| A13.S6 | Implied-probability affordance considered w/ decision written | NOT MET | — |  |
| A14.a | 8 perspectives written incl. judge + shipping engineer | NOT MET | — |  |
| A14.b | Each: top-5 frustrations + our design answer | NOT MET | — |  |
| A14.c | Prize facts verified: $9k/$4k/$2k of $15k | NOT MET | — |  |
| A14.S1 | Frustrations sourced from T10 voices, not invented | NOT MET | — |  |
| A14.S2 | Answers trace to named elements/flows | NOT MET | — |  |
| A14.S3 | Colour-blind + SR personas have dedicated test passes | NOT MET | — |  |
| A14.S4 | Engineer persona checks "ship tomorrow" feasibility per feature | NOT MET | — |  |
| A14.S5 | Each persona has a named 60-second demo path | NOT MET | — |  |
| A15.a | One-sentence big idea defined pre-redesign; every screen expresses it; 80–800 chars | NOT MET | — |  |
| A15.b | First 5 seconds per page look non-template — written | NOT MET | — |  |
| A15.c | Differentiation from craft/brand/psychology not out-of-scope features | NOT MET | — |  |
| A15.d | 10-second first-impression test per page, recorded recall | NOT MET | — |  |
| A15.S1 | Big idea char-counted programmatically before submission | NOT MET | — |  |
| A15.S2 | Five-second spec per page written before that page is built | NOT MET | — |  |
| A15.S3 | Recall test results filed per page w/ fresh agent | NOT MET | — |  |
| A15.S4 | Differentiation mapped to evidence categories | NOT MET | — |  |
| A15.S5 | "Stands aside" test vs rival forecast patterns | NOT MET | — |  |
| A16.a | research/25-library-frontier.md: candidate, what, version, bundle cost, exact usage or why-not | PARTIAL | research/25b-frontier-verified-2026-11-09.md (registry-verified 9 Nov 23:00 IST) | frontier list verified; per-page usage + bundle pending |
| A16.b | Min candidates: Motion, ViewTransitions+React VT, scroll-driven, @starting-style, container queries, :has(), Base UI/Radix, Vaul/sheet, number-flow, Tailwind v4, OKLCH, variable fonts | PARTIAL | 25b: all evaluated; vaul 1.1.2 stale 2024-12 flagged |  |
| A16.c | Smallest-tool rule: CSS first, Motion gestures/layout, VT routes; none for novelty | NOT MET | — |  |
| A16.d | Every animation: duration, easing, trigger, interruption, RM twin in motion spec | NOT MET | — |  |
| A16.S1 | Versions+publish dates recorded; >=7-day rule enforced | NOT MET | — |  |
| A16.S2 | Bundle cost measured per adopted dep in our build | NOT MET | — |  |
| A16.S3 | Native/CSS alternative tried first per capability | NOT MET | — |  |
| A16.S4 | Feature-detects written for partial support (VT types, scroll-driven) | NOT MET | — |  |
| A16.S5 | Registry scan repeatable via script kept in repo | NOT MET | — |  |
| A17.a | Every technique answers player-benefit in 1 line or removed | NOT MET | — |  |
| A17.b | No WebGL/particles/parallax/scroll-jacking on money paths | NOT MET | — |  |
| A17.c | Lighthouse mobile Perf ≥90 all 5 routes; INP <200ms; no layout shift on odds change | NOT MET | — |  |
| A17.S1 | Benefit line exists per technique in motion/art registry | NOT MET | — |  |
| A17.S2 | Money-path element list defined; banned-tech grep on them | NOT MET | — |  |
| A17.S3 | INP measured via trace, not assumed | NOT MET | — |  |
| A17.S4 | CLS on tick measured (fixed cell widths) | NOT MET | — |  |
| A17.S5 | Bundle budget per route set + checked each build | NOT MET | — |  |
| A18.a | Users first: clarity, speed, trust, control | NOT MET | — |  |
| A18.b | Business via UX: fewer taps, market depth, follow/return loops, easy re-bet — taps measured | NOT MET | — |  |
| A18.c | Dark-pattern refusal list → submission | NOT MET | — |  |
| A18.S1 | Taps-per-flow table: browse→place, open→cashout, settled→rebet | NOT MET | — |  |
| A18.S2 | Return loop specified: follows, alerts, home "Your matches" | NOT MET | — |  |
| A18.S3 | Refusal list has ≥8 named patterns | NOT MET | — |  |
| A18.S4 | No metric darkens a decision (e.g., placement friction honest) | NOT MET | — |  |
| A18.S5 | Re-bet path is two-step, not one-tap (responsible) | NOT MET | — |  |
| A19.a | Personas w/ sources (§5) | NOT MET | — |  |
| A19.b | Familiar list: right-slip desktop, bottom bar phone, 1X2 rows, live badge, market tabs | NOT MET | — |  |
| A19.c | More list: exceeds each tied to persona pain | NOT MET | — |  |
| A19.S1 | Each familiar pattern cites ≥1 competitor evidence | NOT MET | — |  |
| A19.S2 | Each "more" tied to pain + allowed by scope | NOT MET | — |  |
| A19.S3 | Familiar conventions verified vs live teardown shots | NOT MET | — |  |
| A19.S4 | Deviations from familiar justified or reverted | NOT MET | — |  |
| A19.S5 | Persona coverage: ≥6 incl. non-default users | NOT MET | — |  |
| A20.a | Transitions <300ms interaction paths; 60fps mid-range | NOT MET | — |  |
| A20.b | Every page ≤2 taps from any other | NOT MET | — |  |
| A20.c | Back returns to same spot incl. scroll + open tab | NOT MET | — |  |
| A20.d | No dead ends/buttons/"coming soon" | NOT MET | — |  |
| A20.S1 | Transition timings recorded per effect | NOT MET | — |  |
| A20.S2 | Nav matrix 5×5 verified both widths | NOT MET | — |  |
| A20.S3 | Scroll/tab/slip restoration tested post-navigation | NOT MET | — |  |
| A20.S4 | Dead-control audit zero (grep + manual sweep) | NOT MET | — |  |
| A20.S5 | Mid-range profile defined (CPU/net throttle) for 60fps claim | NOT MET | — |  |
| A21.a | Mental-map paragraph written | NOT MET | — |  |
| A21.b | Structure identical phone/desktop | NOT MET | — |  |
| A21.c | Fresh agent draws map post-pass → qc/mental-map-test.md | NOT MET | — |  |
| A21.S1 | Map written before build; used as layout contract | NOT MET | — |  |
| A21.S2 | Parity check element-by-element across breakpoints | NOT MET | — |  |
| A21.S3 | Recall score rubric defined before test | NOT MET | — |  |
| A21.S4 | Map failures → specific layout fixes logged | NOT MET | — |  |
| A21.S5 | Second recall test post-redesign | NOT MET | — |  |
| A22.a | Retention moments that respect: follow, live alerts, open bets on match, CO | NOT MET | — |  |
| A22.b | Session flow storyboarded end-to-end | NOT MET | — |  |
| A22.S1 | Alerts honest: in-app only, labeled, no fake pushes | NOT MET | — |  |
| A22.S2 | Open-bet chip on match page specified + built | NOT MET | — |  |
| A22.S3 | Follow from anywhere (row/comp/team) + hub counts | NOT MET | — |  |
| A22.S4 | Session flow frames link to element cards | NOT MET | — |  |
| A22.S5 | Retention features never outrank RG cues visually | NOT MET | — |  |
| A23.a | Token spec governs every value; no raw px/hex/ms in components | NOT MET | — |  |
| A23.b | 1440 uses whole width deliberately; column grid written | NOT MET | — |  |
| A23.c | 390: nothing clips at 360/390/430 | NOT MET | — |  |
| A23.d | Every element has interrogation card | NOT MET | — |  |
| A23.S1 | Raw-value audit script run per build = zero | NOT MET | — |  |
| A23.S2 | Desktop grid doc: columns+purpose per band | NOT MET | — |  |
| A23.S3 | Edge-width screenshots prove no clip/overflow-x | NOT MET | — |  |
| A23.S4 | Card coverage = 100% interactive elements | NOT MET | — |  |
| A23.S5 | Token violations blocked in review, logged as FAIL | NOT MET | — |  |
| A24.a | Interrogation card per element+state complete | NOT MET | — |  |
| A24.b | Second agent challenges each card; weakness or signed reason | NOT MET | — |  |
| A24.S1 | Every template field non-empty (incl. next-tap + failure modes) | NOT MET | — |  |
| A24.S2 | Challenge resolutions recorded on card | NOT MET | — |  |
| A24.S3 | Before/expect/show/next chains validated in browser | NOT MET | — |  |
| A24.S4 | Cards updated when element changes (no stale spec) | NOT MET | — |  |
| A24.S5 | Card count ≥ element count — coverage audit | NOT MET | — |  |
| A25.a | ≥12 books/sources each own subagent | NOT MET | — |  |
| A25.b | Each states edition/source; honest quotes/pages; summaries labeled | NOT MET | — |  |
| A25.S1 | Reader list = T3.01–T3.12 all assigned w/ agent IDs | NOT MET | — |  |
| A25.S2 | Access honesty label on every source (full/excerpt/summary) | NOT MET | — |  |
| A25.S3 | Random quote verification pass vs accessible source | NOT MET | — |  |
| A25.S4 | Each notes file produces 10–25 apply rules | NOT MET | — |  |
| A25.S5 | Unread/unverifiable items marked UNKNOWN, not claimed | NOT MET | — |  |
| A26.a | ASKS.md covers every sentence of brief + later messages; reviewer checks sentence-by-sentence | NOT MET | — |  |
| A26.S1 | Coverage reviewer agent run + missed-sentence list resolved | NOT MET | — |  |
| A26.S2 | All message IDs (M4..M14, M-POST-1..3, Director, STEER) mapped | NOT MET | — |  |
| A26.S3 | Open-ended instructions expanded to ≥10 sub-checks | NOT MET | — |  |
| A26.S4 | Ledger rows have stable IDs surviving edits | NOT MET | — |  |
| A26.S5 | Reviewer disagreements adjudicated in writing | NOT MET | — |  |
| A27.a | Colour meanings by context/age/culture (20 locales, 156 countries, Arabic RTL) | NOT MET | — |  |
| A27.b | Red/green-blind safety: second cue every state | NOT MET | — |  |
| A27.c | WCAG AA all text; AAA odds+money | NOT MET | — |  |
| A27.d | Per-token rationale: meaning/allowed/banned | NOT MET | — |  |
| A27.e | Housebets brand colours stay primary | NOT MET | — |  |
| A27.S1 | Contrast table computed for every fg/bg pair (culori) | NOT MET | — |  |
| A27.S2 | Second-cue audit: glyph/label/pattern on all states | NOT MET | — |  |
| A27.S3 | RTL + longest-locale spot check w/ shots | NOT MET | — |  |
| A27.S4 | Culture/age claims cited or dropped — no pop-psych | NOT MET | — |  |
| A27.S5 | Neon/pale-cyan role split enforced in token lint | NOT MET | — |  |
| A28.a | Judge persona as first-class persona (research/32-judge-dna.md depth) | NOT MET | — |  |
| A28.b | 60-second judge tour showing every scored item | NOT MET | — |  |
| A28.S1 | Judge file updated post-reset w/ verified facts + citations | NOT MET | — |  |
| A28.S2 | Tour script timed ≤60s, covers all 7 lines | NOT MET | — |  |
| A28.S3 | Judge checklist applied in every screen critique | NOT MET | — |  |
| A28.S4 | His own rules quoted only where sourced (e.g., <3s glow) | NOT MET | — |  |
| A28.S5 | Tour verified end-to-end on deployed build | NOT MET | — |  |
| A29.a | Assume world-class senior-designer rival; adversarial loop plays them | NOT MET | — |  |
| A29.S1 | Rival brief demands named gaps+evidence; praise forbidden | NOT MET | — |  |
| A29.S2 | Rival forecast uses observable tool/entry trends | NOT MET | — |  |
| A29.S3 | Rival round output filed qc/LOOP_LOG.md per pass | NOT MET | — |  |
| A29.S4 | Second-place argument addressed point-by-point | NOT MET | — |  |
| A29.S5 | Fresh context per pass (no memory of fixes) | NOT MET | — |  |
| A30.a | QC flow: spec→build→self→peer→register→regression | NOT MET | — |  |
| A30.b | Every bug: severity, repro, fix commit, re-test in qc/BUGS.md | NOT MET | — |  |
| A30.S1 | Flow enforced per screen unit; no skipped peer check | NOT MET | — |  |
| A30.S2 | BUGS.md rows all four fields populated | NOT MET | — |  |
| A30.S3 | Regression rerun on every redesign commit | NOT MET | — |  |
| A30.S4 | Peer checks by fresh agents w/ written findings | NOT MET | — |  |
| A30.S5 | QC metrics: rows, rechecks, fails, fix-rate tracked | NOT MET | — |  |
| A31.a | ≥10 logged rechecks/row before freeze @390+1440 w/ real time+verdict+evidence | NOT MET | — |  |
| A31.b | Rechecks spread across builds | NOT MET | — |  |
| A31.S1 | Recheck ledger shows ≥3 distinct builds per row | NOT MET | — |  |
| A31.S2 | Timestamp audit: all times from `date` | NOT MET | — |  |
| A31.S3 | Recheck count per row tallied pre-freeze | NOT MET | — |  |
| A31.S4 | Evidence links verified (files exist) | NOT MET | — |  |
| A31.S5 | Failed rechecks keep row open until clean re-run | NOT MET | — |  |
| A32.a | Storyboards per screen/flow before code changes | NOT MET | — |  |
| A32.S1 | Frames incl. copy at 390+1440 for every flow | NOT MET | — |  |
| A32.S2 | Frame→card cross-links complete | NOT MET | — |  |
| A32.S3 | Storyboard-before-code enforced via commit order | NOT MET | — |  |
| A32.S4 | Storyboard-vs-build diff per screen reviewed | NOT MET | — |  |
| A32.S5 | Phone slip bar + sheet frames included | NOT MET | — |  |
| A33.a | Any deviation = FAIL not "nit"; fixed+re-run before pass | NOT MET | — |  |
| A33.b | ≥1 written self-rejection per screen w/ what changed | NOT MET | — |  |
| A33.S1 | Binary verdicts only in QC log | NOT MET | — |  |
| A33.S2 | Rejection notes filed per screen in LOOP_LOG/BUGS | NOT MET | — |  |
| A33.S3 | FAIL rows blocked from pass until re-run evidence | NOT MET | — |  |
| A33.S4 | No rubber-stamping: self-rejections are substantive | NOT MET | — |  |
| A33.S5 | Reviewers may not soften a FAIL to pass | NOT MET | — |  |
| A34.a | Research as tree: root→tracks→sub-questions→outputs; children for thin answers | NOT MET | — |  |
| A34.b | research/TREE.md w/ per-node status | NOT MET | — |  |
| A34.S1 | TREE.md has real agent IDs + statuses per node | NOT MET | — |  |
| A34.S2 | Thin-answer nodes got children (logged) | NOT MET | — |  |
| A34.S3 | Parallel agents have disjoint write paths | NOT MET | — |  |
| A34.S4 | Node outputs land in stated files | NOT MET | — |  |
| A34.S5 | Tree status updated at each checkpoint | NOT MET | — |  |
| A35.a | research/60-master-plan.md synthesizes all tracks → per-screen decisions | NOT MET | — |  |
| A35.S1 | Every screen decision cites rule/source | NOT MET | — |  |
| A35.S2 | Track contradictions resolved w/ rationale | NOT MET | — |  |
| A35.S3 | Master plan consumed by storyboards/cards | NOT MET | — |  |
| A35.S4 | No orphan research file (all feed decisions) | NOT MET | — |  |
| A35.S5 | Open gaps marked UNKNOWN w/ fallback decisions | NOT MET | — |  |
| A36.a | >300 checkable lines by Phase-1 end | NOT MET | — |  |
| A36.b | Section-3 items + own additions present | NOT MET | — |  |
| A36.S1 | Row count verified by script, printed in header | NOT MET | — |  |
| A36.S2 | ≥5 sub-asks under every A1–A37 verified | NOT MET | — |  |
| A36.S3 | Open asks expanded 10–20 where distinct | NOT MET | — |  |
| A36.S4 | No filler rows inflating count | NOT MET | — |  |
| A36.S5 | Counts reported to Mohan in chat | NOT MET | — |  |
| A37.a | M4: custom crests (not disc-initials), real logo, custom art, slideshow hero no-promos, Shuffle-level custom SVGs+section bg, hand-drawn ok, bespoke buttons+live button, market counts upfront, favourites anywhere+hub counts, Reddit×4-5+X×4-5 agents, every pixel justified, use entire screen | NOT MET | — |  |
| A37.b | M5/M9: prompt-sensitive; every line→to-dos; open asks→10-20 to-dos | NOT MET | — |  |
| A37.c | M6: research betting+Housebets to greatest level | NOT MET | — |  |
| A37.d | M7: personal account only; no company acct/email | NOT MET | — |  |
| A37.e | M10: rebuild visuals from scratch; 10+ agent research wave; checklist committed | NOT MET | — |  |
| A37.f | M13/M14: latest libraries + HOW to use; cinematic-websites X thread deeply, apply only what fits | NOT MET | — |  |
| A37.g | Director: 1st place only; understand how great people worldwide do | NOT MET | — |  |
| A37.h | STEER2: harsh 100/100 reviewer naming every minute thing incl. missing | NOT MET | — |  |
| A37.S1 | Crest system: unique silhouettes; disc-initial grep/audit = zero | NOT MET | — |  |
| A37.S2 | Favourites addable from every list context + hub w/ counts | NOT MET | — |  |
| A37.S3 | Market counts visible upfront on groups/rows per wireframes | NOT MET | — |  |
| A37.S4 | X thread located+analyzed; applied-vs-rejected table written | NOT MET | — |  |
| A37.S5 | Button/LIVE-button bespoke-styling critique pass | NOT MET | — |  |
| A37.S6 | Hero slideshow = featured fixtures only; zero promo copy audit | NOT MET | — |  |
| X01 | Accessibility: keyboard paths, focus rings, SR labels "Arsenal to win, 1.30", live regions, reduced motion | NOT MET | — |  |
| X02 | Internationalisation: long team names, RTL shell check, number formatting | NOT MET | — |  |
| X03.1 | Edge: double-tap Place bet = one bet | NOT MET | — |  |
| X03.2 | Edge: odds change while slip sheet open | NOT MET | — |  |
| X03.3 | Edge: suspension during cash-out confirm | NOT MET | — |  |
| X03.4 | Edge: tab hidden mid-placement | NOT MET | — |  |
| X03.5 | Edge: offline → back online | NOT MET | — |  |
| X03.6 | Edge: stake above balance | NOT MET | — |  |
| X03.7 | Edge: stake of zero | NOT MET | — |  |
| X03.8 | Edge: 6-decimal stake precision | NOT MET | — |  |
| X03.9 | Edge: very long team name | NOT MET | — |  |
| X04 | Skeletons per list sized exactly as final (no CLS) | NOT MET | — |  |
| X05 | Empty states w/ art + next step (no live→Starting soon; empty slip; no open bets; no follows) | NOT MET | — |  |
| X06 | Error states: plain-language reason + recovery action | NOT MET | — |  |
| X07 | Realistic data: believable fixtures, fictional players, overround 103–107%, no identical lines | NOT MET | — |  |
| X08 | Deep links 200 on every route | NOT MET | — |  |
| X09 | State Tourer: every scored state in one tap, discreet demo styling | PARTIAL | scenario dock exists (pre-reset UI; function verified post-reset) | function yes; new design pending |
| X10 | Copy deck design/COPY.md: short, honest, one tense/voice | NOT MET | — |  |
| X11 | Sound/haptics decision written (likely none; haptics where supported) | NOT MET | — |  |
| X12 | Submission text: big idea counted 80–800 chars; all tools named incl. Devin | NOT MET | — |  |
| X13 | Performance budgets per route written + enforced | NOT MET | — |  |
| X14 | Hidden design-system page showing tokens+components | NOT MET | — |  |
| X01.S1 | Odds-cell SR label format verified in live DOM | NOT MET | — |  |
| X01.S2 | Focus ring visible on every interactive (shot per screen) | NOT MET | — |  |
| X02.S1 | RTL shell stress pass w/ evidence | NOT MET | — |  |
| X04.S1 | Skeleton geometry = final geometry measured | NOT MET | — |  |
| X07.S1 | Overround measured per market ∈ 103–107% | NOT MET | — |  |
| P10.0 | Phase times logged real `date` in RESET_LOG (every start/end) | NOT MET | — |  |
| P10.1 | Safety build Tue 21:00 deployed + SUBMISSION.md + told Mohan | NOT MET | — |  |
| P10.2 | Trim order honoured if short: cinematic→art→personas; never scorecard/states/parity/QC/loop | NOT MET | — |  |
| Q11.1 | QC rows per element/state/animation; ≥10 rechecks; both widths; real times | NOT MET | — |  |
| Q11.2 | Shots per build qc/shots/<sha>/ @360/390/430+1440; iPhone+Pixel; WebKit+Chromium | NOT MET | — |  |
| Q11.3 | Gates per build: tsc/biome/build/Lighthouse(Perf≥90,A11y≥98,BP100)/keyboard/SR-slip/deep-links/scope-grep/raw-grep | NOT MET | — |  |
| Q11.4 | REJECTION RULE: any deviation FAIL; fixed+re-run; own rejections written | NOT MET | — |  |
| Q11.5 | Per-screen fresh design crit subagent → fix → log | NOT MET | — |  |
| Q11.6 | Loop: deploy→self-audit→rival+judge fresh agents; 100/100+2 consecutive clean same-build to freeze; rubber-stamp=fail | NOT MET | — |  |
| Q11.7 | Review format: /100 score w/ named lost points + every ASKS line met/partial/not + psych intent | NOT MET | — |  |
| SR1 | Honesty: real timestamps/measurements; UNKNOWN allowed; "I was wrong" then fix | NOT MET | — |  |
| SR2 | Never submit — Mohan submits | NOT MET | — |  |
| SR3 | No payments/paid assets/fonts/services; free models only | NOT MET | — |  |
| SR4 | Personal mohanganesh3 account only | NOT MET | — |  |
| SR5 | Sample data only; singles only; nothing out of scope | NOT MET | — |  |
| SR6 | No copying competitor visuals/assets | NOT MET | — |  |
| SR7 | Money/settlement checks re-run every redesign commit | NOT MET | — |  |
| SR8 | Ask Mohan only when truly blocked; decide+document otherwise | NOT MET | — |  |
| SR9 | Never idle while any ASKS line NOT MET/PARTIAL | NOT MET | — |  |
| REP1 | Chat report: ask+sub-ask counts | NOT MET | — |  |
| REP2 | Chat report: research tree + launched agents + output files | NOT MET | — |  |
| REP3 | Chat report: phase plan w/ real start times | NOT MET | — |  |
| REP4 | Chat report: one-sentence big idea (revisable post-P1) | NOT MET | — |  |
| MP1.1 | Total visual rejection honoured: no old visual decisions carry forward | PARTIAL | RESET_PLAN.md §1 "What scrap it means" |  |
| MP1.2 | Nothing about the rebuild looks "5-minute vibe-coded" | NOT MET | — |  |
| MP2.1 | Outside-world Nov-2026 bar adopted (desk-reject risk named) | PARTIAL | RESET_PLAN.md §16 |  |
| MP2.2 | Latest frontend libraries researched at highest level | PARTIAL | research/25b-frontier-verified-2026-11-09.md | seed done; full frontier file pending |
| MP2.3 | UI/UX mastery "like a magician" — stagecraft playbook | PARTIAL | RESET_PLAN.md §17 + housebets-craft skill |  |
| MP2.4 | 1st place standard, not 2nd | PARTIAL | plan standard; outcome unproven |  |
| MP3.1 | Design tailored to Housebets brand flavour throughout | PARTIAL | brand law in RESET_PLAN.md §4 + research/03 |  |
| MP3.2 | All designs+animations custom-made | NOT MET | — |  |
| MP3.3 | Apple-grade QC for a betting product | PARTIAL | QC regime specified; runs pending |  |
| MP3.4 | UX = real user problems from real human feedback (reviews/Reddit/X/forums) | PARTIAL | prior mines exist; fresh post-reset T10 pending |  |
| MP3.5 | One wholesome plan maintained | MET | ~/.devin/plans/plan-de247ee8bfb7121a.md approved 9 Nov |  |

## Coverage self-check
- A1–A37: every item has ≥5 sub-asks (S-ids).
- Section-3 bullets → X01–X14 (+ per-edge-case rows X03.1–9).
- Sections 10–13 → P10.x, Q11.x, SR1–9, REP1–4.
- Post-reset messages M-POST-1..3 → MP1.x–MP3.x.
- A reviewer subagent still must diff this vs the brief sentence-by-sentence (A26.S1).
