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

---

## Wave-2 derived asks (appended 2026-11-10)

Merged verbatim from wave-1/wave-2 research "derived ask proposals" sections. Nothing above this line was modified, deleted, or reordered. Original proposal IDs kept where the source defines them (P51-, P52-, C-, T7-, R-YAB-); sources that used bare numbered lists got synthesized traceable IDs (T42- = 42-teardown-table, P55- = 55-motion, RV4- = voices/reddit-v4, XV4- = voices/x-reviews-v4, SA4- = 30-slop-audit-v4). No exact duplicates found; near-duplicates kept and annotated "near-dup of …" inside Status. Owner/Phase unassigned pending adjudication.

| ID | Source file | Ask (verbatim, don't paraphrase) | Owner | Phase | Status |
|---|---|---|---|---|---|
| P51-01 | research/51-attention-and-reach.md | HeroSpotlight must pass a banner-blindness audit: identical surface/border/radius system as match cards, real teams + real market + real odds + one CTA, no bespoke campaign skin; verify via 390 blur test (qc/blur/) that it reads as content not ad — [§1.5, §5 rules 1–4]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-02 | research/51-attention-and-reach.md | Remove hero auto-rotation (peripheral hijack + ad-signal + WCAG 2.2.2); if any carousel remains: manual only, pause control, PRM — [§1.9, §1.5]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-03 | research/51-attention-and-reach.md | Odds-cell visible height 40→≥44 px at 390 on all row types; ≥8 px inter-cell spacing; cell layout identical between selected/unselected so the target doesn't shift mid-tap — [§1.7, §4]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-04 | research/51-attention-and-reach.md | Pad hit areas to ≥24 px AA floor (craft target 40–44 px) on FollowStar, remove-×, chip-×, carousel arrows, sheet tab strip — without changing visible glyph size — [§1.7, WCAG 2.5.8/2.5.5, §2 table]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-05 | research/51-attention-and-reach.md | Sheet tab strip (slip/bets/chat) h-8→≥40 px and kept visually subordinate to Place bet (no inverse fill that out-contrasts the CTA) — [§2, §3.5]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-06 | research/51-attention-and-reach.md | Destructive distance rule codified: Clear/×/Remove-suspended ≥48 px vertical + ≥24 px horizontal from Place bet, lower contrast, never double-tap-adjacent — [§4]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-07 | research/51-attention-and-reach.md | Floating slip pill must never occlude tappable content: enforce scroll padding-bottom so the last league row clears the pill at 390 — [§2, Hoober scroll-to-center]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-08 | research/51-attention-and-reach.md | Every scroll page gets ≥50 dvh bottom padding so the last section can reach the center accuracy band — [§1.6, §2]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-09 | research/51-attention-and-reach.md | Market tabs: selected tab scrollIntoView(center-x); edge fade both directions; visible tabs ≈5–7; order = frequency (All/main default first; "My markets" first only when count>0) — [§1.7 linear menus, §4]. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-09 |
| P51-10 | research/51-attention-and-reach.md | Match page default group = group containing main markets (not "all"); each market section ≤3 outcomes/row where the market allows — [§4 Hick]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-11 | research/51-attention-and-reach.md | Flash budget codified: ≤4 concurrent odds flashes in viewport; when slip sheet is open, freeze ALL background odds flashes behind the scrim — [§1.9, §3.4/3.5]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-12 | research/51-attention-and-reach.md | Motion class mapping: odds ticks/scores/clock = fade-in-place; position-shift slide reserved for genuinely attention-required events (slip pill entry, errors); nothing animates at >1 event/sec in periphery — [§1.9 animacy]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-13 | research/51-attention-and-reach.md | Desktop right rail locked to utility-chrome treatment (tabs, dense rows, muted surfaces); no glow/gradient/promo styling anywhere in the rail incl. empty states — [§1.3, §1.5 right-rail + hot potato]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-14 | research/51-attention-and-reach.md | Home ordering: "In play now" rail within first viewport at 390; HouseFeed/FollowingStrip kept below odds-row salience; sport icon-grid kept quiet/uniform so eyes pass through to hero — [§3.1]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-15 | research/51-attention-and-reach.md | League headers carry `name + live/count` and lead with the competition name (bypassing pattern); one consistent header style site-wide to keep layer-cake scan efficient — [§1.1, §1.2]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-16 | research/51-attention-and-reach.md | Session/RG/limits cues that must be seen get a contrasting block-color chip inside content flow (slip footer, live header) — never greyed footer microcopy — [§1.10 Lole]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-17 | research/51-attention-and-reach.md | Per-page attention maps (§3) verified with blur tests at 390+1440 in qc/blur/: fail if most-salient element isn't the intended 1st fixation — [§3, ledger A11.b]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-18 | research/51-attention-and-reach.md | Match-row internals keep strict left alignment and constant column geometry (no zigzag alternation); crests same column every row — [§1.1 F-stem, §1.4 zigzag study]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-19 | research/51-attention-and-reach.md | One-primary-action audit per view state incl. slip-open (backdrop mutes page primaries) — [§3 cross-page rule]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-20 | research/51-attention-and-reach.md | At 1440: all money actions inside the left-80% attention band; right rail never holds a money-critical *confirmation* without it being the loudest element inside the panel — [§1.3]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P51-21 | research/51-attention-and-reach.md | "Pays X.XX" and price-changed prompts use information-scent salience (position adjacent to CTA + contrast chip), not decorative loudness — the Census 86% lesson — [§5 rule 6]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-01 | research/52-gambling-psych.md | Slip footer carries a persistent one-line session readout (`Session 47 min · Net −24.00`) on every bet-slip state — pairs time AND money per [E10/E18]; verify at 390 and 1440. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-02 | research/52-gambling-psych.md | "Safer gambling" entry reachable ≤2 taps from slip, live page, and top-bar; opens limits sheet with four complete rungs (deposit/loss limits, reality-check interval, time-out ladder 24h/1w/1m, self-exclusion) per [E12/E13]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-03 | research/52-gambling-psych.md | Reality-check toast: real interval trigger, shows elapsed time + net position + session spend, requires acknowledgement to dismiss (RTS 13B pattern [E12]); triggerable from the scenario dock for judging. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-04 | research/52-gambling-psych.md | Fix the LDW integrity bugs before polish: lost bets must not show "Returned 43.50" (`MyBets.tsx:47-55`); sub-stake cash-outs get a distinct neutral `cashedout` result with `net +/−`, not green `won` (`bets.ts:84`) — [Dixon E7 / UKGC E11]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-05 | research/52-gambling-psych.md | Settled-lost copy audit: outcome + reason + net delta only; ban proximity-to-win vocabulary list (§6) across all strings — [E1/E6]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-06 | research/52-gambling-psych.md | No post-loss promoted action: after a settle-loss, the next screen offers no suggested bet, no re-bet CTA, no deposit prompt — [E3/E13/E16]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-07 | research/52-gambling-psych.md | Every odds cell shows implied probability on long-press/info (2.50 = 40%) or as slip footnote — informs the chance/skill boundary — [E2/R3]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-08 | research/52-gambling-psych.md | Cash-out presented as neutral live quote: same visual weight as other actions, honest `est. live value` label, lockstep suspension + reason when unavailable, never pulsing urgency — [E15]. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-10 |
| P52-09 | research/52-gambling-psych.md | Confirm window keeps honest latency: "Placing bet…" + visible ~2s countdown; no fake progress, no premature success — trust beat, per judge-dna sequencing discipline. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-02 |
| P52-10 | research/52-gambling-psych.md | Win celebration capped: soft accent glow ≤3s, receipt + HB-### ref, no confetti/streak fanfare — [judge-dna §6 / Schüll zone refusal]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-11 | research/52-gambling-psych.md | Streak surfaces show record only: form (W/D/L) and My bets history carry zero momentum narration or "hot" badges — [E4/E5]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-12 | research/52-gambling-psych.md | Quick-stake chips anchored modest (5/10/25), MAX demoted and guarded; no default stake pre-fill above the minimum chip — [R2/E16 high-defaults]. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-05 |
| P52-13 | research/52-gambling-psych.md | All countdowns on screen must map to a real event (kickoff, price suspension, reality-check interval); add a code rule: no countdown component accepts a marketing prop — [R2/E16]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-14 | research/52-gambling-psych.md | Currency is real USDT everywhere incl. mobile balance pill; grep for "points/credits/coins" = 0 hits — [E16/R1]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-15 | research/52-gambling-psych.md | No autoplay/queue-bet semantics anywhere in flows: each bet is individually committed; cash-out likewise a discrete decision — [E11]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-16 | research/52-gambling-psych.md | Deposit flow never opens from a loss/settle trigger and carries no urgency styling; withdrawal/cash-out paths equal-or-lower friction than deposit in all demoed states — [R2 sludge-asymmetry / reverse-withdrawal spirit, E11]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-17 | research/52-gambling-psych.md | 18+ marker + safer-gambling link present on first viewport and on receipt screens — trust signal the judge can clock in 5s — [E13]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-18 | research/52-gambling-psych.md | "Insufficient funds" state designed as honest stop (balance, shortfall, calm actions: adjust stake / deposit / close) — not an upsell moment — [E16]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-19 | research/52-gambling-psych.md | Insufficient-funds + suspension + failed-bet + reality-check states all demoable from the scenario dock so the judge can trigger RG surfaces on demand — craft signal per judge-dna (failure paths are first-class). | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-20 | research/52-gambling-psych.md | Copy pass names real costs where they exist ("prices may move before confirmation", "cash-out value is estimated") — honest-friction copy per judge-dna §9. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-21 | research/52-gambling-psych.md | Session line also appears on Live/Match money surfaces (not only slip) so time+net stays in view at the highest-frequency screens — in-play is the highest-risk surface [E12 req5/E15]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-22 | research/52-gambling-psych.md | Live-feed motion budget: odds flashes on real deltas only, batched >2/s, never on first paint; nothing stochastic invented by chrome — variable schedule stays honest [E8]. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P52-23 | research/52-gambling-psych.md | Empty states honest ("Nothing live right now") + real next-kickoff countdown; never fabricated fixtures or filler urgency to keep the loop alive — exit cues per Schüll refusal. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-06 |
| P52-24 | research/52-gambling-psych.md | Submission/form copy states the stance in one line for the judge: "designed to inform every decision and make none for the player" + cites the RG surface set — converts ethics from compliance into the entry's differentiator. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-01 | research/53-colour.md | **No colour-only state anywhere.** Every money/status distinction carries colour + ≥1 of glyph/label/fill-style; verify under deuteranopia+protanopia simulated screenshots committed to qc/ (Machado sim shows error/warning/gold all collapse to one olive family — hue can never be the separator). | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-02 | research/53-colour.md | **Odds direction = green▲ / red▼ + signed price text on every cell** (Shuffle convention verified in-repo; bet365 flashes confirm), Western/crypto order kept; never inverted. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-03 | research/53-colour.md | **Three-channel separation for the olive-collapse trio:** error = ✕/word (+optional 0.3s shake); suspended = 🔒 + "Suspended" word + disabled; follow = ☆→★ shape. The three may never rely on hue to differ from each other. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-04 | research/53-colour.md | **error-500 text ban ≥s2:** #f41f50 fails AA small text on surface-secondary (4.10) and tertiary (3.67) → for red text use tick-down-text #ff4d75 (5.22/4.68) or error-300 ≤s2; error-500 allowed as fill (≥3:1, 1.4.11) with dark text or glyph only. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-05 | research/53-colour.md | **LIVE badge:** if a red pill with white "LIVE" is used, fill must be error-600 #cc1b44 (white = 5.24) not error-500/400 (3.87/3.56 fail); current dot+error-300-clock treatment passes (4.87 on s2) — keep or fix, don't regress. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-06 | research/53-colour.md | **Success-500 may carry small money text** (8.84 on s2, AAA-capable) but still ships ▲/+/word — hue is ornament, not message. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-07 | research/53-colour.md | **USDT teal never means "money" alone** — always ₮ glyph or "USDT" label; on surface-tertiary (4.60) keep to ≥12px bold or bump to a lighter step. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-08 | research/53-colour.md | **Gold = follow/premium only.** Banned for warnings, errors, money deltas, cash-out, promo fills. Scarcity is the mechanism (overuse kills the signal; also under CVD gold ≈ amber). | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-09 | research/53-colour.md | **Amber = suspended/caution only,** always with 🔒+word; never follows/wins/boosts. (Continues B11's gold-vs-amber unification.) | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-10 | research/53-colour.md | **Neon-cyan budget ≤ ~5% of pixels/screen**; cyan banned for status semantics so the green/red motion channel stays unpolluted; banned as body text and as fill under white text (1.4:1). | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-11 | research/53-colour.md | **Selected-cell fill-flip keeps dark text + ✓** (Housebets convention) and the focus ring becomes dual-tone (cyan ring + dark offset) — current ring-on-cyan is 1.04:1, invisible on the most-pressed control. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-12 | research/53-colour.md | **AAA on money facts:** price, stake, return, balance, cash-out, P/L use text-primary (≥15.9:1) or a passing semantic (success ≥7:1). Where hue carries the money label (win/loss amounts), floor = 4.5:1 + word/sign channel; document the reasoned exception. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-13 | research/53-colour.md | **Suspended ≠ disabled:** suspended cells keep warning-amber + 🔒 + word, never disabled-grey; text-disabled/#464b59 reserved for genuinely inactive controls (2.05–5.09 bands are not for state info). | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-14 | research/53-colour.md | **Contrast audit artefact:** a script measuring every text/surface pair used in components; committed output to qc/; every text pair ≥4.5:1, money facts ≥7:1, non-text state affordances ≥3:1. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-15 | research/53-colour.md | **APCA/Bridge-PCA cross-check** on the top ~10 pairs (bg, odds cell, CTA, slip, LIVE badge, suspended) as dark-mode sanity — reported as Lc only; WCAG 2.x numbers remain the compliance claim. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-16 | research/53-colour.md | **CVD regression shots:** each of the 5 pages + slip-open through deuteranopia AND protanopia filters before freeze; legs: up/down, selected, suspended, win/loss, live all legible by non-colour channel. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-17 | research/53-colour.md | **Chromostereopsis guard:** saturated red never flush-adjacent to saturated cyan (≥1px neutral hairline or different emphasis); no saturated blue for fine detail/motion (S-cone sparsity); our green-leaning cyan is the already-correct mitigation. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-18 | research/53-colour.md | **RTL audit:** positional/horizontal cues never carry meaning (grid and rails mirror under dir=rtl); ▲▼/🔒/★ are direction-agnostic — verify Arabic locale screenshots; Latin digits for odds (Oxanium) intentional. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-19 | research/53-colour.md | **Locale note in submission copy:** green-up/red-down kept as the global crypto/trading convention; Mainland-China red-up documented as a known inversion we deliberately don't ship; glyphs+words carry meaning for any market. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-20 | research/53-colour.md | **RG/safer-gambling surfaces stay neutral:** session clock, limits, 18+ use text-secondary on surfaces — no red alarmism, no gold reward framing; the channel is the words. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-21 | research/53-colour.md | **positive-500 resolution:** delete the unused #26ba50 token or assign it one documented role (e.g., P/L delta on My bets) — two role-ambiguous greens collapse to the same CVD grey and dilute the code. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-22 | research/53-colour.md | **Hue budget freeze:** no new hues; every new semantic maps onto the existing scale (Wickens ~5–7 code ceiling; cyan+green+red+amber+gold+USDT already at it). | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-23 | research/53-colour.md | **Skeleton harmonise:** shimmer mid-stop #14303c stays within the surface ladder (it does — 0e202a/14303c/0e202a); keep and document as decorative-only. | unassigned | wave-2 | PROPOSED — pending adjudication |
| C-24 | research/53-colour.md | **Age-respectful floor:** no text <11px, ≥450 weight on data rows, no pure-white-on-black (halation) — judges and older tail see violet-blue-green worst; depth stays a lightness ladder, never a hue ladder. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T7-02 |
| T7-01 | research/54-type-and-space.md | Define `hb-*` type scale tokens (11 steps, §6) in index.css; no component uses raw `text-[Npx]` outside the scale. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-02 | research/54-type-and-space.md | Delete/upgrade all `text-[8px]`, `text-[9px]`, `text-[10px]` usage — floor is 11px ancillary, 12px informational (Apple 11pt / Android 12sp). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-03 | research/54-type-and-space.md | Every numeric surface that ticks or compares renders tabular: Oxanium family or `.tnum` — odds, scores, clocks, stakes, returns, dates, "+N". | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-04 | research/54-type-and-space.md | Verify at runtime that `font-variant-numeric: tabular-nums` actually changes Figtree advance widths (DevTools audit — features verified present in file, render test pending). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-05 | research/54-type-and-space.md | No `line-height: normal` anywhere — every step carries explicit lh (3 fonts have 1.0/1.2/1.32em boxes). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-06 | research/54-type-and-space.md | Adopt spacing tokens `s1…s16` (§7); component code uses tokens, not bare px. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-07 | research/54-type-and-space.md | Odds cells ≥44px tall @390, ≥36px @1440; document touch-vs-pointer split in the component comment. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P51-03 |
| T7-08 | research/54-type-and-space.md | Match rows land at 52–56px @390 / 44–48px @1440; league headers sticky at 32–36px. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-09 | research/54-type-and-space.md | @390: league-grouped list shows 1X2 + "+N" only; extra markets behind the match page (essential-columns pattern). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-10 | research/54-type-and-space.md | Team-name cells truncate with ellipsis at a fixed budget — never shrink below `hb-body` to fit. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-11 | research/54-type-and-space.md | Price-change flashes animate color/background only — digit width must not move (tnum property + Oxanium verify). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-12 | research/54-type-and-space.md | De-emphasis uses color/weight (text-secondary/tertiary + 400→600), never a smaller-than-scale size. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-13 | research/54-type-and-space.md | Weight vocabulary limited to Figtree 400/500/600, Oxanium 600/700, RHD 700; no <400 weights anywhere (Apple + RUI). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-14 | research/54-type-and-space.md | Display steps (`hb-display`/`hb-title`) rationed to one per view; data pages may use zero. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-15 | research/54-type-and-space.md | All line-heights land on 4px multiples so stacked rows hold the baseline grid. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-16 | research/54-type-and-space.md | Numbers right-aligned (or decimal-aligned) inside market columns; headers align to their data. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-17 | research/54-type-and-space.md | Clock/score glyphs (′, :, +, −) live inside the same tabular run — no proportional punctuation splitting a timer. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-18 | research/54-type-and-space.md | Add a `.tnum` coverage audit to QC: grep tsx for digits rendered without tnum/Oxanium in odds contexts. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-19 | research/54-type-and-space.md | Squint-test: at 390 blurred, price column must remain the second thing the eye lands on after team names (attention budget). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-20 | research/54-type-and-space.md | Desktop adds market columns before adding whitespace — density stays consistent across breakpoints (LogRocket rule). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-21 | research/54-type-and-space.md | Keep `.tnum` applied inside `--font-odds` stacks even though Oxanium is natively tabular — protects the Figtree fallback path. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T7-22 | research/54-type-and-space.md | unicode-range digit-swap recipe documented in the code comment for `.tnum` as the fallback plan for any future font without `tnum`. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-01 | research/55-motion.md | Port odds flash from `background-color`/`box-shadow` keyframes to a compositor-only `::after` opacity overlay; add rAF-batched feed→flash path. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-02 | research/55-motion.md | Expire flash-state dict entries ~1.2s so flashes never fire on remount. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-03 | research/55-motion.md | Direction-aware odds roll: whole-value roll, `ease-enter` ~380ms, behind `odds-roll` flag + user "Odds animation" setting (Action Network pattern); PRM → instant swap. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-04 | research/55-motion.md | Honest-flash audit: prove flashes never fire on mount/re-render — genuine deltas only (regulatory dark-pattern line, vp0). | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P52-22 |
| P55-05 | research/55-motion.md | Suspension same-frame integrity test: every cell locks in the render the feed says suspended; assert no stagger, no transition delay. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-21 |
| P55-06 | research/55-motion.md | Goal cascade timing audit: score-flash→roll→banner→mass-suspend chain completes <3s end-to-end; new events supersede mid-cascade. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-21 |
| P55-07 | research/55-motion.md | Win-receipt glow spec: single soft glow <3s, zero confetti/particles; loss receipt static; placed receipt = check-draw ≤400ms + copyable ref. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P52-10 |
| P55-08 | research/55-motion.md | Sheet physics: `drag="y"` 1:1, release velocity into spring 360/34, momentum snap (pos + v×200ms), rubber-band 0.55, flick 0.5px/ms, keyboard ArrowUp/Down instant snaps. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-09 | research/55-motion.md | Placement teardown matrix (judge verbatim): "placing" state cancels on blur, visibilitychange, sheet-close, route-change, rejected bet — test each. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-10 | research/55-motion.md | `MotionConfig reducedMotion="user"` at root; verify every Motion/JS animation honors it (Playwright under `reduce`). | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-11 | research/55-motion.md | Shared-element VT: event-card→match hero/title morph (`view-transition-name`), unique-name rule (one per pair — Chrome docs); remove name on return nav; odds grid excluded. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-12 | research/55-motion.md | Direction-aware route slides ≤300ms for forward/back nav typing. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-13 | research/55-motion.md | Live-dot + ticker pause when offscreen via IntersectionObserver; ticker pause-on-hover/focus control (WCAG 2.2.2). | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-14 | research/55-motion.md | Skeleton = real row markup + `is-loading`; opacity-only swap 150–200ms; `aria-busy` + `role="status"`. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-07 |
| P55-15 | research/55-motion.md | Interruption test suite: new-tick-supersedes-tick; sheet cancel mid-gesture; nav-during-morph; retarget preserves velocity (springs only). | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-16 | research/55-motion.md | Replace `<details>` accordions with controlled 0↔auto height 280ms. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-17 | research/55-motion.md | Remove any `layout`/`layoutId` on OddsCell; FLIP only for chip→slip and in-list reorders. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-18 | research/55-motion.md | LCP guard: zero `opacity:0`-initial on above-fold content; all `view()` reveals behind `@supports` + `no-preference` + non-money-path only. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-19 | research/55-motion.md | Motion token codification: durations {0/100-150/200-300/350-1200/≤3000} + easings {enter/exit/move/flash} + springs {sheet 360/34, micro 500/30, badge 600/18} into `src/lib/motion.ts`; refactor literal ms values in index.css to vars (audit the ~14 keyframes present). | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-20 | research/55-motion.md | Overshoot audit: only `badge-pop` may overshoot (600/18 or the 0.22s keyframe with 1.18 peak); strip 1.56-style cubic-bezier overshoot anywhere else. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-21 | research/55-motion.md | Settings: "Odds animation" toggle (off/flash/roll tri-state) + persist. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P55-03 |
| P55-22 | research/55-motion.md | Screen-reader parity: engine events (suspend, goal, price, receipt) announced once via live region — not per animated frame/digit. | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-23 | research/55-motion.md | No mount-fades/no staggers lint rule for money-path components (self-rejection feed into qc/BUGS.md). | unassigned | wave-2 | PROPOSED — pending adjudication |
| P55-24 | research/55-motion.md | Hero `hero-cine` once-per-session guard; disable under repeat nav; confirm never blocks LCP. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-01 | research/books/yablonski.md | Odds cells and all money-touch targets ≥44×44px on phone / ≥40px on desk with ≥8px gaps; `✕`-type controls padded to ≥32px — every odds grid on home/live/football/match + slip. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P51-03 |
| R-YAB-02 | research/books/yablonski.md | `Place bet` and cash-out CTAs full-width, bottom-anchored, adjacent to the control just edited (stake field / expander) — bet slip sheet, desk right panel, My bets open-bet cards. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-03 | research/books/yablonski.md | Cap any decision surface at 3–7 visible choices with the recommended option first — `Popular` tab first among market tabs, ≤3 odds cells per row, sport chips ≤7, accept-odds segmented = 3 modes. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-04 | research/books/yablonski.md | Keep every learned sportsbook convention (1X2 L→R order, right-rail slip desk / bottom bar phone, padlock = suspended, green/red = up/down, `+N` markets) — global layout; innovate only in polish and state honesty. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-05 | research/books/yablonski.md | Chunk before counting: labeled groups (league cards, market accordions, slip legs) replace item caps — Live page, Match page, bet slip. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-06 | research/books/yablonski.md | The system owns all arithmetic and translation — live `stake × odds = return`, `2.10 → 2.30` diffs, implied-% hints, plain-English market labels under jargon — bet slip, match markets. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-07 | research/books/yablonski.md | Design two peaks and three endings: goal-flash peak (score pulse + synced odds tick) and place-bet peak (`Placing…`→check-draw); receipt ending (bet ref + My bets deep-link), failure ending (reason + recovery), settle ending (Won/Lost + result reason) — match page, slip confirm, My bets. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-08 | research/books/yablonski.md | Exactly one isolated (high-salience) element per view, dual-coded icon+color — selected cell cyan+✓ in grids, `Place bet` in slip, `🔒 Suspended` bar in market rows; accent color never used for non-actionable chrome. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-09 | research/books/yablonski.md | Ship the polish, then audit the ugly paths it may hide — deliberate QC pass on failed bet, suspended leg, empty Open tab, offline-ish states. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-10 | research/books/yablonski.md | Parse inputs liberally, emit canonically — stake accepts `5`/`$5`/`5.00`, search takes aliases+typos; everything displays decimal 2dp + `USDT`; errors state boundaries (`Min stake 1.00 USDT`), never codes — stake input, global + market search. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-11 | research/books/yablonski.md | Sub-400ms paint on every tap (press-in 80ms, chip-flight 300–350ms, sheet 250ms); skeleton shimmer on odds, never spinners; the only sanctioned delay is `Placing…` 600–900ms — global motion spec, slip confirm. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-12 | research/books/yablonski.md | Countdowns only to real events — `Kicks off in 04:12`, `LIVE` flip at 0, HT resume; zero manufactured progress toward betting — home Starting soon, Live empty state, match rows. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P52-13 |
| R-YAB-13 | research/books/yablonski.md | Unresolved stays visible until the user closes it — persistent slip bar with live count across pages, `My bets ①` badge, suspended leg remains in slip w/ chip + `Remove suspended · keep the rest` — slip shell, My bets. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-19 |
| R-YAB-14 | research/books/yablonski.md | Never surface the whole market space — curate (`Popular`/`Featured`) → filter (sport/competition chips+dropdowns) → search (`Search markets or players`) as the declared narrowing ladder — match page, home, live. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-15 | research/books/yablonski.md | Extraneous load = zero in odds/money areas: `tabular-nums`, right-aligned prices, stable cell geometry, no decorative chrome inside data regions — all odds grids, slip totals, My bets table. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T7-03 |
| R-YAB-16 | research/books/yablonski.md | Edges get the memorable slots — `Home` first / My bets last in nav, `Popular` first / `All markets 85` last in tabs, `Open` leftmost in My bets segmented tabs — shell nav, market tabs, My bets. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-09 |
| R-YAB-17 | research/books/yablonski.md | Every real change gets one deliberate attention cue and cues never compete — ≤4 concurrent flashes, simultaneous score+odds pulse for causality, suspended = system-styled (never promo-styled) — live odds engine, match page. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P51-11 |
| R-YAB-18 | research/books/yablonski.md | Treat the slip as a cart — add (tap odds) → line items (legs) → quantity (stake) → checkout (Place bet) → order confirmation (receipt + ref) → order history (My bets) — bet slip + My bets page, vocabulary included. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-19 | research/books/yablonski.md | One boundary = one meaning; state changes redraw inside it — `Suspended` bar replaces only the odds row while `+N >` stays navigable; price sits *inside* its selection's cell, never floating between selections — match cards, league tables, market accordions. | unassigned | wave-2 | PROPOSED — pending adjudication |
| R-YAB-20 | research/books/yablonski.md | In-context help only, zero front-loaded instruction — `implied 47.6%` under prices, plain-English sub-labels under jargon markets, `Min stake` under the input before any error — match markets, slip. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P52-07 |
| R-YAB-21 | research/books/yablonski.md | UI remembers, user recognizes — persisted slip, shown old+new price, remembered stake, breadcrumbs, ✓-marked selections; nothing relies on the 20–30s working-memory fade — slip persistence, odds-changed, navigation. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-04 |
| R-YAB-22 | research/books/yablonski.md | Feed no biases — facts (form, score, price) not narratives ("due", "hot"); honest anchors only (real old price, quick chips); implied-% to counter probability misjudgment — all content surfaces (see psych playbook). | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P52-11 |
| T42-01 | research/42-teardown-table.md | **Suspension reason vocabulary**: `SUSPENDED · Goal\|VAR\|Penalty\|Break\|Review` tags on row + cell, same frame — verify all five render at 390/1440. (beats every column; wireframe-consistent) | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-02 | research/42-teardown-table.md | **Acceptance-delay countdown**: Place bet → `Confirming… Ns` ring/progress for live selections; cancel still possible mid-count; pre-match confirms instantly. Verify never exceeds ~6 s. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-03 | research/42-teardown-table.md | **Odds-accept 3-mode control**: slip settings `Accept: Any / Higher only / Always ask`, default Always ask; changed leg = struck old + `Accept 2.40` per leg + `Accept all`; Place disabled until resolved. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-04 | research/42-teardown-table.md | **Selection-never-drop guard**: slip selections persist across route changes, refresh (sessionStorage), and post-placement clears; regression test — DK/Stake's exact failure modes. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-05 | research/42-teardown-table.md | **Quick-stake chips = their own widget's 1/10/50/100 USDT, 50 pre-selected**; long-press/right-click chip → set custom preset (DK's one good idea, Housebets-flavoured). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-06 | research/42-teardown-table.md | **Empty-state suite**: empty slip → 3 popular picks; empty Live → `Next kickoffs` + countdown pills; empty Following → follow explainer + quick-follow suggestions; empty search → recent + trending; each w/ one primary CTA. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-07 | research/42-teardown-table.md | **Skeletons = real markup**: MatchRow/MarketGroup skeletons reuse row DOM + shared shimmer 1.4 s L→R, 60 ms stagger, `aria-busy`, off under reduced-motion — kill any spinner on coupon surfaces. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-08 | research/42-teardown-table.md | **Persistent direction carets**: post-flash muted ▲/▼ ~9 s on cells (Shuffle pattern, semantically extended); cell-level last-move tooltips `was 2.60 → 2.75` where cheap. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-09 | research/42-teardown-table.md | **Market tab counts + order**: `Popular N` first … `All markets N` LAST (wireframe verbatim); ≤7 tabs visible + edge-fade; `mine` tab appears only when pinned markets exist; count updates live. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-10 | research/42-teardown-table.md | **CO six-state card spec**: open-bet card shows ticking value; states `available/value-changed/suspended+reason/unavailable+reason/cashed`; confirm sheet restates amount; button copy = `Cash out · ₮14.32`. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-11 | research/42-teardown-table.md | **CO affordance on rows/cards**: open bets surfaced on the match page of the event (FD "My Action" pattern, scoped: `Your bet · CO ₮14.32` chip under scoreboard) — Stake shows nothing, free win. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-12 | research/42-teardown-table.md | **Payout-preview slip bar**: phone floating bar shows `pick · odds · potential return` (FD mini-bar preview pattern) not just a count — their wireframe already shows the pick; extend it. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-13 | research/42-teardown-table.md | **Receipt as object**: placed bet → receipt card w/ `HB-###` ref, struck old→accepted price, CO ticker when live; `View in My bets` deep-link. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-14 | research/42-teardown-table.md | **Promo-free fold audit**: first viewport at 390 + 1440 contains zero non-betting promotional content; Leaderboard ticker stays in shell chrome only. Screenshot proof per page. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-15 | research/42-teardown-table.md | **Follows-first personalization**: followed teams/competitions surface as `Your matches · N` card on home + ranked first in search + `mine` tab on match page — the investment loop nobody ships. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-16 | research/42-teardown-table.md | **Search depth**: ⌘K palette returns teams·players·competitions·**markets** w/ type icons, recents, follows ranked first, `+N ›` deep-link to market group; keyboard-only completable. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-17 | research/42-teardown-table.md | **Live honesty pack**: `45+2′` stoppage format, `HT/ET/Break` states, goal → row flash + score roll + suspension cascade in one frame — verify no layout jump when countdown→LIVE flips. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-18 | research/42-teardown-table.md | **Accept-odds friction copy**: changed-leg copy = `2.60 → 2.75 · better price` / `· worse price` (direction honest, not just "odds changed") — nobody tells the bettor which way it moved for *them*. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-19 | research/42-teardown-table.md | **No-bet-slip-orphan on phone**: bottom bar keeps slip pill visible with count+pick at all scroll depths (DK scroll-follow concept, wireframe-faithful). | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-20 | research/42-teardown-table.md | **My bets parity w/ widget, upgraded**: `N open · M settled`, segmented Open/Settled, time filters, `All sports ▾`, expandable rows w/ live-score chips — matches their own table spec (R18) while adding live CO values. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-21 | research/42-teardown-table.md | **Suspension cascade choreography**: goal event → score roll + row flash + affected markets lock w/ reason + reopen repriced — single deterministic sequence the judge can trigger twice and see the same honest timing. | unassigned | wave-2 | PROPOSED — pending adjudication |
| T42-22 | research/42-teardown-table.md | **Trust microcopy pass**: settlement tooltip on market names (`Settles on 90′ + stoppage`), suspension reasons, `Accepted at live odds` receipt line, `Back online` reconnect toast — Kalshi-style trust copy no sportsbook ships. | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-01 | research/voices/reddit-v4.md | **Persistent slip with restore banner** — selections survive refresh/nav/app-switch; per-leg revalidation on return. *(1a, plus file-26 mechanism)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-04 |
| RV4-02 | research/voices/reddit-v4.md | **Locked-odds receipt** — every placed bet gets ID + timestamp + locked price/line, immutable and shareable. *(1a, 1b, 5, 6)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-13 |
| RV4-03 | research/voices/reddit-v4.md | **No repricing during the pending spinner** — abort-and-ask if price moves; show old→new diff before resubmit. *(Bovada spinner, Roobet asymmetry)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-04 | research/voices/reddit-v4.md | **3-state odds-acceptance** — accept-better / ask-on-worse / never, in plain words, applied symmetrically. *(Roobet, FanDuel O/U dispute, SoccerBetting)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-03 |
| RV4-05 | research/voices/reddit-v4.md | **On-slip stake limits** — min/max rendered on the slip before submit fails; errors name the violated limit. *(Stake limit thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-06 | research/voices/reddit-v4.md | **Named suspension states** — "Suspended — VAR review", "Suspended — re-pricing" on both markets and cash-out. *(VAR thread, Betfair, DK)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-01 |
| RV4-07 | research/voices/reddit-v4.md | **Cash-out availability ledger** — per-ticket history of when cash-out was offered/paused + current reason; partial cash-out slider if offered at all. *(FanDuel "2 of 4 legs" pattern, bet365 revocation)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-10 |
| RV4-08 | research/voices/reddit-v4.md | **Press-and-hold / 3s-undo cash-out** — guards accidental taps (mechanism per file 26; direct thread unverified — marked UNKNOWN). | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-09 | research/voices/reddit-v4.md | **Honest live-bet queue** — visible countdown + the acceptance rule during in-play delay; publish the delay number. *(7s/10s delay threads)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-02 |
| RV4-10 | research/voices/reddit-v4.md | **Durable pending-bet lane** — debited-but-unconfirmed bets visible in My Bets as "placing/processing," never balance-debited + invisible. *(DK/FanDuel money-taken threads, bet365 blank My Bets)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-11 | research/voices/reddit-v4.md | **Three-timestamp bet history** — placed / settled / credited. *(bet365 unsettled-warning thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-12 | research/voices/reddit-v4.md | **Crash reconciliation on relaunch** — restore slip, surface pending bets, reconcile balance with an explicit "what happened" note. *(tip-off crash thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-13 | research/voices/reddit-v4.md | **Geolocation diagnostics panel** — cause checklist (VPN/Wi-Fi/permission) with per-item test + retry, not a dead wall. *(FanDuel home-vs-work thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-14 | research/voices/reddit-v4.md | **In-place slip upgrade to SGP** — add legs without rebuilding through a separate door. *(DK app thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-15 | research/voices/reddit-v4.md | **Promo governance cap** — max promo surfaces per screen; one working global "reduce promos/odds-ads" toggle. *(AFL Sportsbet spam thread)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-14 |
| RV4-16 | research/voices/reddit-v4.md | **Implied-probability display option** — odds rendered as % for the "odds as information" audience. *(AFL thread user suggestion)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P52-07 |
| RV4-17 | research/voices/reddit-v4.md | **Favorites/watchlist + saved slips** — save-for-later is noticed within a day when removed; never regress silently. *(FanDuel Saved Bets thread)* | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-15 |
| RV4-18 | research/voices/reddit-v4.md | **Withdrawal-status tracker** — queued → processing → txid/broadcast with public status page for backlogs. *(Cloudbet 54h, Stake instant-wtd praise)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-19 | research/voices/reddit-v4.md | **Plain-language KYC schedule** — declare verification thresholds upfront (before first deposit), never first revealed at withdrawal. *(crypto KYC tension thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-20 | research/voices/reddit-v4.md | **Edit-Bet-style leg editing** — post-placement add/swap/remove on unsettled multis, mechanism shown honestly (reprice at current offer). *(bet365 Edit Bet thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-21 | research/voices/reddit-v4.md | **Settle-and-credit on leg hit** — show per-leg crediting rather than end-of-event lump settlement where rails allow. *(Pinnacle-vs-bet365 comparison)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| RV4-22 | research/voices/reddit-v4.md | **Self-serve bet-status lookup** — bet-ID search resolving to state + ledger entries, defusing support queues at peak. *(12,378-in-line thread)* | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-01 | research/voices/x-reviews-v4.md | **Cash-out honesty card on every open bet** — state chip cycling `Available $X → Suspended (reason) → Unavailable`, live value tick + "updated Xs ago", never a silently missing button. (#1 complaint, 14 sources) — extends R.B5/B6. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-10 |
| XV4-02 | research/voices/x-reviews-v4.md | **Suspension-reason vocabulary** — Goal/VAR/Penalty/Red card/Feed issue + "usually returns after play resumes" + optional "notify me when it reopens". Users read unexplained suspension as theft across 6 apps. ★notify toggle new. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-01 |
| XV4-03 | research/voices/x-reviews-v4.md | **Degraded-mode read-only My Bets** — when "markets down" demo state triggers, open bets stay visible with last-known CO value + timestamped status line ("Markets suspended 2:14 PM — feed issue"). Direct counter to the Scamduel asymmetry: if placement works, management must work. (VSO FanDuel, freelanews SportyBet) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-04 | research/voices/x-reviews-v4.md | **Honest error copy that owns the fault** — "We're having issues — your bets are safe" vs users restarting phones 5–7× thinking it's their device. (PrizePicks genre + FD/DK) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-05 | research/voices/x-reviews-v4.md | **Slip persistence contract** — selections survive refresh/app-kill/app-switch with a "restored selections" banner + per-leg price revalidation flag; clear ONLY on placement or explicit clear. (Stake refresh-kills-slip; Caesars 5s-switch-kills-slip; Betway inverse) | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-04 |
| XV4-06 | research/voices/x-reviews-v4.md | **Never silent repricing** — odds that move between tap and accept surface old→new with payout delta and Accept/Decline; receipt shows locked-vs-current. (Caesars +6800→+5400, Stake 2.00→1.95 post-acceptance, DK freeze-wagers) | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of RV4-03 |
| XV4-07 | research/voices/x-reviews-v4.md | **Idempotent Place Bet** — debounce + pending state that blocks double-submit; ambiguous submits reconcile to a visible "checking if your bet was placed…" state. NEVER show "rejected" then quietly accept (Stake €652 horror — hard rule). ★rejected-means-rejected invariant. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of RV4-10 |
| XV4-08 | research/voices/x-reviews-v4.md | **Explicit accept-odds preference in-slip** — `Never / Higher only / Any`, visible at the point of commitment, not buried in settings. (Stake removed it → riot; it's table stakes) | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-03 |
| XV4-09 | research/voices/x-reviews-v4.md | **Unexplained-combination errors banned** — when legs can't combine, say WHICH two and why, in-line on the slip ("Leg 2 conflicts with Leg 4 — correlated"). (Caesars "selections cannot be combined" no-reason; FanDuel SGP dead-ends; bestparlayodds explainer) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-10 | research/voices/x-reviews-v4.md | **Leg-level parlay tracker** — per-leg `winning/losing/push/void` live, plus designed "missed by one" end state with regrade math; push/void never silently regraded to a loss. (FD marks pushed legs as losses; ESPN BET voided whole SGP on push; DK ghost-leg resonance) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-11 | research/voices/x-reviews-v4.md | **Geo/verification as a passing ritual, not a punishment loop** — mock a smooth "Verifying location → ✓ you're in" beat; if it fails, say what to do in-place (wifi on, VPN off) not "contact support". Users call the companion-app pattern "sketchy". (BetRivers, FD criminal-feeling, Caesars reinstall-ritual, DK critical-geo-fail) | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of RV4-13 |
| XV4-12 | research/voices/x-reviews-v4.md | **Session sanity** — biometric re-auth that returns to exact slip+scroll state; never log out mid-use; app-switch <30s must not kill session or slip. (Caesars, FD sign-outs, DK biometric-ignored) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-13 | research/voices/x-reviews-v4.md | **Peak-load state design** — skeletons + instant press feedback under load; suspended markets stay visible-locked (never vanish); countdown→LIVE flip without layout jump. Every app's worst reviews are timestamped to kickoff windows. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-17 |
| XV4-14 | research/voices/x-reviews-v4.md | **Promo governance** — ≤3 bounded slots, dismissible, never inside slip, never blocking first viewport, marketing never overlays markets. Promo *restraint* is the premium read (Krok bet365 praise; FD "cluttering up a once user-friendly experience"; NCL 93%-ads). | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-14 |
| XV4-15 | research/voices/x-reviews-v4.md | **Promo mechanics honest** — promo applies in-slip with a visible check/state; drip-fed bonuses show the schedule up front; promo-ban never unexplained. (Betfair no-indication, DK $150→$50 drip, ESPN BET instant-ban) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-16 | research/voices/x-reviews-v4.md | **Scoreboard/data integrity as a trust feature** — live scores/state must be right or visibly stale-flagged ("updated 12s ago"); a wrong score or reversed H2H is an integrity bug, not a data bug. (bet365 wrong-scores, Betfair H2H, ESPN BET win→loss regrade) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-17 | research/voices/x-reviews-v4.md | **Settled-bet truth** — bet that vanishes pre/post-settlement is worse than a lost bet; Open/Settled lists never drop records; show net P/L per period. (SportyBet booked-games, MGM history purge, DK deleted slips, Pikkit/Juice demand) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-18 | research/voices/x-reviews-v4.md | **CO value truth in motion** — show CO offer ticking live OR stop claiming "values update"; if the offer can change during confirm, say "price held for Ns" or re-offer. (bet365 hang-then-accept-at-pence, BetMGM changed-last-second, Stake tap-vs-get delay) | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-10 |
| XV4-19 | research/voices/x-reviews-v4.md | **Personalized home surface** — favorites rail (star teams/leagues/sports), "my games first" ordering, resume-scroll-position. Two separate bet365 reviewers beg for retained favourites + remembered scroll. ★scroll-position restore is a named ask. | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-15 |
| XV4-20 | research/voices/x-reviews-v4.md | **Fast bet placement countdown shown, not hidden** — if acceptance takes N seconds show the countdown/progress honestly (Betfair's 5–12s is *liked*; Stake's opaque 18–20s is hated). Delay visibility converts an integrity problem into an understood mechanic. ★ | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-02 |
| XV4-21 | research/voices/x-reviews-v4.md | **Dark mode + density** — dark-first with light toggle; ≥10 games glanceable; compact rows. (ESPN BET no-dark-mode complaint; Covers density demand — repo) | unassigned | wave-2 | PROPOSED — pending adjudication |
| XV4-22 | research/voices/x-reviews-v4.md | **Share-worthy bet receipt** — post-placement receipt card (legs, locked odds, payout) that screenshots cleanly, share-image + hide-stake toggle. Slip-screenshots ARE the social content (Slip-culture; "65% placed exact bets from shared links" — repo). | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of T42-13 |
| XV4-23 | research/voices/x-reviews-v4.md | **Support escape hatch inside money flows** — a failed bet/CO state carries a "report this bet" action with the bet-ID attached; users currently screenshot + tweet because in-app paths dead-end. ★ | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of RV4-22 |
| XV4-24 | research/voices/x-reviews-v4.md | **"Checking your bet" reconciliation on relaunch** — after kill/crash, first screen reconciles open bets before accepting new ones ("last action: placed ✓" vs "didn't go through — retry"). (Duplicate-submit + did-it-place ambiguity cluster) ★ | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of RV4-12 |
| XV4-25 | research/voices/x-reviews-v4.md | **Review-prompt timing** — trigger rating prompts after wins/settlements, never after a suspension or failed cash-out; the current crop of 1★ storms is partly self-inflicted timing. ★(cheap craft detail) | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-01 | research/30-slop-audit-v4.md | **Re-materialize the coupon**: league sections and match rows become hairline-separated list regions on `bg-primary` (border-b rows, no enclosing card, no Reveal). Card chrome survives only on hero + slip container. `[H1, P0]` — the single biggest template-feel kill. | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-02 | research/30-slop-audit-v4.md | **One control grammar**: replace all pill rows (sport nav, comp rail, market groups, live filters, breadcrumbs) with ONE segmented-tab component in Housebets' `interactive-tab-bg` square-shouldered style; breadcrumbs → text path. `[H2, P0]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-03 | research/30-slop-audit-v4.md | **Kill every icon chip + initials disc**: league marks via extended crest grammar; mobile sport grid → glyph+label list rows; USDT → drawn ₮ glyph; player initials → number/role chips. `[H3, P0]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-04 | research/30-slop-audit-v4.md | **Delete flag emoji** (`countryFlag`, 🎮, 🌍 fallbacks) — league badge carries the cue; SVG flag tiles only if a country column survives. `[H4, P0]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-05 | research/30-slop-audit-v4.md | **Halo audit**: remove all `0 0 Npx #cyan/pink` glows; keep one halo (armed Place-bet); convert tick/suspend signals to inset edges; crest drop-shadow → flat. `[H5, P0]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-06 | research/30-slop-audit-v4.md | **Retire the carousel**: single illustrated "Match of the day" hero — crowd scene built from the wave/roofline/grain grammar, static, editorial left block + price column; no dots/arrows/autoplay. `[H6, P0]` | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of P51-02 |
| SA4-07 | research/30-slop-audit-v4.md | **Enforce the neon budget**: `#02f8f8` confined to accents/odds/live states; labels/meta to `base-75`/`text-secondary`; pale-cyan owns all primary actions. Cover-the-logo test must read Housebets. `[H7, P0→P1]` | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of C-10 |
| SA4-08 | research/30-slop-audit-v4.md | **De-dot the copy**: footer spec line → two sentences; status/meta `a · b · c` chains → flex-spaced items; `·` survives only inside `pick @ price` inline pairs. `[H8, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-09 | research/30-slop-audit-v4.md | **Delete Reveal from list chrome**; motion budget stays on sheet physics, ticks, score roll, goal pulse. `[H9, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-10 | research/30-slop-audit-v4.md | **One disclaimer, one place**: footer line + "Demo" on the balance chip; strip the ~15 inline disclaimers; ScenarioDock panel loses its subtitle. `[H10, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-11 | research/30-slop-audit-v4.md | **Eyebrow diet**: drop kicker labels that restate section H2s (Following/FollowingStrip/HouseFeed); keep functional table headers + league context. `[H11, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-12 | research/30-slop-audit-v4.md | **Solid floats**: slip bar, toasts, ScenarioDock, sticky tab bar → full-alpha surfaces; blur reserved for modal scrims only. `[H12, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-13 | research/30-slop-audit-v4.md | **Hide the State tourer FAB**: trigger via `?states` param + Menu-sheet row + ⌘K command; delete the floating button. `[H13, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-14 | research/30-slop-audit-v4.md | **Chat → House feed**: replace seeded chat with the real engine event feed (goals/suspensions/reopens already emitted) — proof over props. `[H14, P1]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-15 | research/30-slop-audit-v4.md | **Finish the em-dash pass**: ~9 visible strings remain → `·` in true pairs or split sentences. `[H16/F16, P2]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-16 | research/30-slop-audit-v4.md | **Competition name via `compById`** everywhere (hero, FeaturedCard) — kill the epl/ucl hardcode. `[H16, P2]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-17 | research/30-slop-audit-v4.md | **Delete dead CSS** `.skeleton` + `@keyframes shimmer`. `[H17, P2]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-18 | research/30-slop-audit-v4.md | **Unify tab recipes**: SidePanel / SlipSheet / bets page / market tabs → one component, one selected language. `[H18, P2]` | unassigned | wave-2 | PROPOSED — pending adjudication · near-dup of SA4-02 |
| SA4-19 | research/30-slop-audit-v4.md | **Compress the footer** to nav-row + disclaimer + RG line; drop the 3-col corporate shape. `[H19, P2]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-20 | research/30-slop-audit-v4.md | **Designed page titles**: each route gets a quiet title zone (sport/league name + date context), removing the "content just starts" read. `[H20, P2]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-21 | research/30-slop-audit-v4.md | **Blind-test gate**: fresh-context subagent compares our 6 screens vs 3 AI-sportsbook screens; pass = ours not picked as the template. Re-run after items 1–7 land. `[reset A5d, verification]` | unassigned | wave-2 | PROPOSED — pending adjudication |
| SA4-22 | research/30-slop-audit-v4.md | **Radius/elevation token spec**: codify the new scale (6 cell / 8 control / 12 hero+slip / full only true pills) into index.css tokens before rebuild — the reset process requires tokens before pixels. `[process, P0-blocker]` | unassigned | wave-2 | PROPOSED — pending adjudication |

**Rows appended: 228** (P51-01…21 = 21 · P52-01…24 = 24 · C-01…24 = 24 · T7-01…22 = 22 · P55-01…24 = 24 · R-YAB-01…22 = 22 · T42-01…22 = 22 · RV4-01…22 = 22 · XV4-01…25 = 25 · SA4-01…22 = 22). Exact duplicates removed: 0.
