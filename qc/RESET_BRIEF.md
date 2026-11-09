# RESET BRIEF — verbatim source

Captured `2026-11-09 23:11 IST` (real `date`). Source: Mohan's RESET message in this chat, received 22:40:53 IST 2026-11-09. Immutable — statuses live in `qc/ASKS.md`.

---

RESET — Housebets Sportsbook Design (contest3). From Mohan. Read every line before you touch anything.

0. The verdict, and the new mindset

The current build is REJECTED. It looks like a generic, five-minute, AI-fingerprinted, vibe-coded sportsbook: dark background, cyan accent, uniform rounded cards, default icons, pill rows, the same layout every AI tool produces. A judge who has already seen 130 other entries will scroll past it. Correct settlement maths does not save a screen that looks like a template.

From this message on you stop working like a fast coder and start working like three senior people at once:

A senior product designer who has shipped a real sportsbook, and who defends every pixel in critique.

A behavioural psychologist who knows why a bettor's eye, thumb and trust go where they go.

A QC lead at a real app company, who rejects anything that deviates even slightly from the spec.

The order of work is now fixed: UNDERSTAND → RESEARCH → PLAN (storyboard and tokens) → BUILD → QC → REVIEW LOOP. You do not change visual code until the storyboard and the token spec for that screen exist in the repo. You did the opposite before: you went straight to your own plan and your own goal. That stops now.

Do not summarise this prompt. Do not skim it. Every sentence below is an instruction. Where an instruction is open-ended, it contains many instructions; you must find them (section 2 shows you how) and do all of them.

1. Do these first (the next 60 minutes)

Protect what is correct. The money and settlement fixes already deployed (full-time settlement, void bets return the stake, offline mode honesty, Deposit button, scenario controls, keyboard search) are the baseline. Commit any uncommitted work, run tsc, biome and build, deploy, and tag that commit `baseline-correctness`. No redesign may break any of them; each one gets a regression check in qc/QC.md.

Create qc/ASKS.md. Copy section 2 of this prompt into it, word for word, then add your own sub-asks under each item (at least 5 more per item from your research), and the "things Mohan missed" from section 3. Give every line a status: MET / PARTIAL / NOT MET, plus evidence (file path, screenshot path, commit hash or URL). At the start every line is NOT MET unless you can prove otherwise with evidence created after this message.

Create qc/RESET_LOG.md. Log every phase start and end with the real clock time from `date` on this Mac. Never type a time from memory.

Post in chat: the count of asks and sub-asks in qc/ASKS.md, and the phase plan from section 10 with your real start time.

2. Mohan's asks, expanded (every line is a requirement)

Source: Mohan's original brief to you (the text that starts with the contest URL), plus his later messages in this chat. Each numbered ask is a quote or close paraphrase. The lettered lines under it are the concrete checks it implies. A line is only MET with evidence.

A1. "Go through that thing in detail from the start. Take every screenshot and understand what they are expecting in detail."

a. Read the whole contest page top to bottom again today: hero, scorecard, minimum bar, page specs, out of scope, what to deliver, the submission form, the confirmations, News, prize ladder. Save the text to research/00-contest-brief.md with today's real fetch time. b. Save every image on the page (the 6 wireframes: Sports home, Live, Football, Match page, Bet slip, My bets) at full resolution to research/wireframes/, if not already there, and check they match the live page. c. For each wireframe, write an element inventory: every box, label, count, button, tab, state and order, top to bottom, left to right. File: research/wireframes/INVENTORY.md. d. For each wireframe element, note what the brief expects it to do when tapped. e. Note that wireframes 5 and 6 are ONE page in our entry ("Bet slip and My bets share one page"). f. Note the scorecard weights and design effort in proportion: Sports home 15, Live 10, Football 10, Match page 20, Bet slip + My bets 20, Feels like Housebets 15, Every state (suspended, changed, failed) 10. g. Note the tie rule: higher Match page score wins, then Feels like Housebets. So the Match page and the Housebets feel get the most care. h. Note "The sportsbook we'd ship tomorrow wins": production realism beats concept art. i. Note "Ranked by Housebets Team", and that the judge is Ismael Bashagha, Founding Head of Design. Re-read his case study (https://ismaelbashagha.com/archive/housebets/) and update research/32-judge-dna.md. j. Note the competition size (131 entered on 9 Nov evening) and that up to 3 submissions a day are allowed and the best one counts. k. List every out-of-scope item and grep the build for each: multis, accumulators, bet builder, boosts, free bets, promos, outrights, specials, stats widgets, match trackers, AI search. Zero hits allowed in the UI. l. List every deliverable as a test: all 5 pages linked; works at 390 and 1440; phone bet slip is a bar at the bottom; clickable; front end only; public link with no login; sample data only. m. List every form field (link, 5 pages ticked, big idea 80–800 characters, tools used) and every confirmation box, and make the build true to each confirmation. n. Use the starter files (site shell: top bar, left nav, side panel; brand pack). If you still cannot get them, write exactly why in research/00-contest-brief.md and how you matched the live Housebets site instead.

A2. "Your prototype should be at least this … that was the bare minimum. You need to perform on top of that."

a. Every wireframe element exists in our screen at the same width (390 and 1440). Proof: side-by-side images in qc/wireframe-parity/. b. For each wireframe element, write what we do BETTER than the wireframe and why a player benefits. c. No wireframe element is dropped or merged without a written reason that a judge would accept. d. Every page has more depth than the wireframe where the brief allows it (market depth, states, empty states), never more scope than the brief allows.

A3. "Like in professional UI/UX experiences, candidates, and all those things."

a. Study how top professional designers present sportsbook and fintech work (Dribbble, Behance, Awwwards, case studies). Save at least 15 references you actually opened, with URLs, to research/40-pro-references.md. b. For each reference: what it does well, what it does badly, what we take, what we refuse. c. Our entry must read like a senior designer's portfolio piece: consistent system, deliberate hierarchy, no filler. d. Assume other entrants are professional UI/UX candidates using the same AI tools. Write what they will most likely ship (research/41-rival-forecast.md) and how we beat each one.

A4. "See the Stake, Shuffle, and those things also. You need to perform more than that."

a. Full teardown of Stake sports and Shuffle sports (public pages only, no login, no money): home, live, a football league, a live match page, the bet slip, my bets. Screenshots at 390 and 1440 into research/teardown/<site>/. b. Add bet365, FanDuel, DraftKings and Housebets' own live site. c. For each: bet slip placement, how odds changes are shown and accepted, how suspension looks, live score and clock treatment, market group tabs, cash-out placement and states, My bets layout, search, empty states, loading states. d. A comparison table: rows are features, columns are sites, plus a column "Ours: how we beat it". e. Note what bettors already know from these sites (familiar patterns we must keep) and what we do better. f. Do not copy any site's visuals, layout or assets. Learn patterns, invent the execution.

A5. "Must not look like A-graded stuff" (average or template work) / the site "looks 100% like a fingerprint".

a. Research AI-generated UI fingerprints (Reddit, X, design blogs): generic gradients, cyan-on-navy, glassmorphism everywhere, uniform 12px radii, Lucide icons, emoji, initials-in-circle crests, centred empty states with one icon, pill rows, "hero card" sameness. b. Run that audit on fresh screenshots of the CURRENT build. File research/30-slop-audit-v4.md listing every hit with a screenshot crop. c. Every hit gets a replacement decision rooted in Housebets' brand, not in a different trend. d. Blind test: a fresh subagent with no context is shown our screens and three AI-made sportsbook screens and asked which are AI templates. We pass only if ours is not picked.

A6. "You need to understand these generation things."

a. Understand the generation of players: who bets on crypto sportsbooks (age bands, mostly 18–34, mobile-first, crypto-native, used to Stake and Shuffle, used to TikTok-speed interfaces). Cite sources. b. Understand AI generation: everyone will generate this site with AI. Know what AI generation produces by default and steer away from those defaults (links to A5). c. Understand the current generation of frontend (A16).

A7. "Understand gambling and psychology and all those things."

a. Gambling psychology track (section 4, T5): near-miss effects, loss aversion, the illusion of control, variable rewards, time distortion, the sunk-cost effect, the hot-hand fallacy. b. For each effect: where it appears in a sportsbook, how a dark pattern exploits it, and how we design ethically (inform the decision, never make it for the player). c. Read the ethical counterweight: Natasha Dow Schüll, "Addiction by Design". Write what we refuse to do because of it. d. Responsible-gambling cues as trust signals the judge will notice: 18+, session time visible, limits reachable from the slip and the live page, a reality check, no "bet again" styled louder than "close", no countdown pressure beyond real price refresh, honest copy.

A8. "Not just UI skills, but UI/UX psychology tips … a lot of books … spend some subagents to read those books."

a. Assign subagents to the books and sources in section 4, T3. Each writes a notes file with chapter-level takeaways and an "apply to our sportsbook" list of 10–25 rules. b. Every rule ends up in research/50-rules.md with an ID (R-xxx), and every rule is cited in at least one element decision (section 7). A rule nobody uses is a wasted rule; a decision with no rule is a guess.

A9. "What button needs to be placed where."

a. A button map for every page at 390 and 1440: every button, its position, its size, its priority (primary, secondary, tertiary). b. Thumb-zone map at 390: primary actions (odds cells, slip bar, Place bet) sit in the easy reach zone. c. Fitts's law: frequent and money actions are big and near; destructive actions are far and smaller. d. One primary action per view. Write which one it is for each screen state.

A10. "Why we need to place it there."

a. Every placement in the button map has a written reason citing a rule ID (R-xxx) or a competitor convention. b. "It looked nice" and "it is common" are not reasons on their own.

A11. "What areas eyes will be attracted to."

a. Eye-tracking research: F-pattern for lists, Z-pattern for sparse hero areas, the layer-cake pattern for scanning headings, banner blindness (players ignore anything that looks like an ad). b. For each screen, an attention map: the first, second and third thing the eye should land on, and why. Verify with a squint/blur test screenshot (qc/blur/). c. Contrast, size, colour and motion are attention budget. Only the right thing gets each one. Write the budget per screen. d. Live motion (clocks, odds flashes) is attention; make sure it does not steal attention from the slip at the wrong moment.

A12. "How everything needs to be."

a. A single written design principle set (5–7 principles) for this sportsbook, each with an example and a counter-example from our screens. b. Every screen decision traces back to a principle.

A13. "For gambling, how we need to showcase exactly."

a. How odds, scores, clocks, markets, stakes and returns are showcased: tabular numerals, fixed-width odds cells, decimal odds, stakes in USDT, potential return always visible beside the stake. b. Live indicators that are honest (real minute, HT, ET), not decorative. c. Odds movement shown with direction plus colour plus glyph (never colour alone), with a short non-blocking transition. d. Suspended markets stay visible, clearly locked, with a reason (VAR check, penalty, goal). e. Wins celebrated quietly: a soft glow under three seconds, no confetti (Bashagha's own rule). Losses shown with respect, no "try again" bait.

A14. "Think from very different kinds of perspectives, because everyone will use AI … to get the $9,000 prize."

a. Write the entry from 8 perspectives: experienced Stake/Shuffle bettor, casual football fan, mobile-first player on a train, first-time crypto bettor, colour-blind player, keyboard and screen-reader user, Ismael Bashagha as judge, a Housebets engineer deciding if this can ship tomorrow. b. For each perspective: their top 5 frustrations with today's sportsbooks, and how our design answers each. c. Remember the money: 1st place is $9,000 of a $15,000 pool (2nd $4,000, 3rd $2,000). Only 1st counts for us.

A15. "We need to act so differently that when the reviewers see all the sides, ours stands aside, because they judge visually."

a. Define our "big idea" in one sentence before the redesign, and make every screen express it. It goes into the form (80–800 characters). b. A judge's first 5 seconds on each page must already look different from a template. Write what they see in those 5 seconds. c. Differentiation must come from craft, brand and psychology, not from out-of-scope features. d. Do a 10-second first-impression test with a fresh subagent per page and record what it remembers.

A16. "Study how the frontend has evolved … November 9th … pick up the latest libraries … the highest level … what library you can use so that you can control it at the highest level."

a. Research the current stack (Nov 2026) and write research/25-library-frontier.md: for each candidate, what it does, the version, its bundle cost, and EXACTLY where it would be used in our five pages, or why not. b. Candidates to evaluate at minimum: Motion for React (layout, presence, gestures, springs), the native View Transitions API and React's ViewTransition, CSS scroll-driven animations, @starting-style, container queries, :has(), Base UI and Radix primitives (accessible dialogs, sheets, tabs, popovers), Vaul or an equivalent drag-to-dismiss bottom sheet, number-flow style animated numerals for odds and returns, Tailwind v4 tokens, OKLCH colour, variable fonts. c. Rule: the smallest tool that does the job. CSS first, Motion for gestures and layout, View Transitions for route changes. No library is added for novelty. d. Prove control: every animation has a duration, an easing, a trigger, an interruption rule and a reduced-motion twin, written in the motion spec.

A17. "That doesn't mean you need to go away from the building side and try creatively … think more from the user experience perspective … rather than pushing the frontend to the highest level."

a. Every frontend technique must answer "what does the player get from this?" in one sentence, or it is removed. b. No WebGL, particles, parallax or scroll-jacking on money paths (odds, slip, cash-out). c. Performance is UX: Lighthouse mobile Perf ≥ 90 on all 5 routes, INP under 200 ms, no layout shift when odds change.

A18. "Make the site for the users, make the site for us to earn more, and make the site for the users."

a. Users first: clarity, speed, trust, control. b. Business second, through good UX: fewer taps from match to placed bet, clear market depth, follow and return loops, easy re-bet from My bets. Measure taps per flow and write them down. c. Never earn through dark patterns. List dark patterns we deliberately did not use; that list goes into the submission.

A19. "Understand what type of users use this, what they are already experienced with, how they feel familiar, but we stand out as something more."

a. Personas (section 5) with sources. b. A "familiar" list: patterns we keep because bettors expect them (right-side slip on desktop, bottom slip bar on phone, 1X2 row odds, live badge, tabs for market groups). c. A "more" list: where we exceed them, each tied to a persona pain point.

A20. "They feel the smoothness … and navigate in an easier, proper manner rather than a difficult kind of thing."

a. Every transition is under 300 ms on interaction paths, with no jank at 60 fps on a mid-range phone profile. b. Every page is reachable in 2 taps or fewer from any other page. c. Back always returns to where the player was, including scroll position and open tab. d. No dead ends, no dead buttons, no "coming soon".

A21. "They need to have a picture in their mind … after going through once from start to end."

a. Write the mental map: the one-paragraph picture a player should hold after one pass (where live is, where the slip is, where their bets are, how a match page is organised). b. Keep that structure identical on phone and desktop, so the picture transfers. c. Test: a fresh subagent does one full pass, then must draw the map from memory. Record the result in qc/mental-map-test.md.

A22. "Plan from the user's perspective and how they stay."

a. Retention moments that respect the player: follow a team or competition, live alerts for followed matches, open bets visible on the match page, cash-out on the open ticket. b. Session flow: arrive → find a match → read markets → add to slip → place → watch → settle. Storyboard every step.

A23. "Think of every box, every margin, every font size, every font colour … using the entire screen. Why it needs to be placed there."

a. A design-token spec (section 8) governs every value. No raw pixel, hex or ms value appears in components. b. At 1440, the whole width is used deliberately: no dead bands, no stretched rows. Write the column grid. c. At 390, nothing clips at 360, 390 or 430. d. Every element gets an interrogation card (section 7).

A24. "Question yourself at every placement and position: where exactly, what users think while clicking, what they expect, what we show, and where they go next."

a. The interrogation card (section 7) is filled in for every interactive element and every state. b. A second subagent challenges each card and must find one weakness or sign off with a reason.

A25. "There are many types of books … read all of them … use agents and deploy them."

a. At least 12 books or sources, each read by its own subagent (section 4, T3). b. Each notes file states which edition or source was actually read, and quotes or cites pages and sections honestly. If a full book is not accessible, say so and use the best legitimate summaries and the author's own talks or articles, labelled as such.

A26. "Don't neglect any word … every line and every word I am speaking, I ask for."

a. qc/ASKS.md covers every sentence of Mohan's brief and his later messages. A reviewer subagent checks the brief sentence by sentence against qc/ASKS.md and lists any missed sentence.

A27. "Spend a lot of time learning the psychology of colours … how colours give an impression on different ages, perspectives and users."

a. Colour track (section 4, T6): meanings of green, red, amber, gold, blue and purple in betting, money and trust contexts; differences by age band and culture (Housebets ships in 20 locales across 156 countries, including Arabic RTL). b. Red/green colour-blind safety: every state uses a second cue (glyph, label, pattern). c. Contrast: WCAG AA at minimum on all text, AAA on odds and money. d. A colour rationale for every token in the palette: what it means, where it is allowed, where it is banned. e. Housebets brand colours from the brand pack stay primary.

A28. "Understand the users first: who comes here, and who thinks from the reviewer's perspective."

a. The judge persona (research/32-judge-dna.md) is a first-class persona with the same depth as players. b. Write a 60-second judge tour that shows every scored item.

A29. "These things are open for the whole world … many, many great members."

a. Assume the best rival is a world-class senior designer. The adversarial rival judge in the loop plays that person.

A30. "They will do it in a normal vibe-coding fashion, but we need to do a real kind of thing, like how an app company does quality control."

a. A real QC process: spec → build → self-check → peer check (subagent) → QC register → regression. b. Every bug found gets a ticket line in qc/BUGS.md with severity, repro, fix commit and re-test.

A31. "Every button, every animation needs to be rechecked very many times, 10 to 20 times."

a. qc/QC.md: one row per interactive element, state and animation. At least 10 logged rechecks per row before freeze, at 390 and 1440, with date, time (real), verdict and evidence. b. Rechecks are spread across builds (not 10 ticks in one minute).

A32. "Everything must be planned before, in a storyboard way."

a. Storyboards for every screen and flow (section 9) exist before code changes for that screen.

A33. "Be bold enough to reject it if it deviates even slightly from the quality control."

a. The rejection rule (section 11): any deviation from spec, tokens or storyboard is a FAIL, not a "nit". b. You must reject your own work in writing at least once per screen when it does not meet the bar, and say what you changed.

A34. "Do it in a proper tree way … one by one … increase the subagents."

a. Research runs as a tree (section 4): root question → tracks → sub-questions → outputs. Each level spawns more subagents where the answers are thin. b. Write the tree in research/TREE.md with each node's status.

A35. "Finally we could have a great plan that no one else could have."

a. research/60-master-plan.md: the synthesis of all tracks into screen-by-screen decisions.

A36. "List all of them first … find 10 to 20 asks in each … you will get hundreds of things … do all of them … think about anything I missed … do even more. Don't be lazy."

a. qc/ASKS.md has more than 300 checkable lines when you finish Phase 1. b. Section 3 items are added, plus your own.

A37. Mohan's earlier messages in this chat (still in force)

a. M4: custom crests, not initials on gradient discs; keep the real Housebets logo; custom art, not sourced; a slideshow hero like Stake and Shuffle with no promos; Shuffle-level attractiveness with custom SVGs and section backgrounds; hand-drawn custom accents are allowed; a dedicated brand taste; buttons and the live button must not look AI-made; market counts upfront; favourites from anywhere plus a hub with counts; Reddit ×4–5 and X ×4–5 research subagents; every pixel justified; use the entire screen. b. M5 and M9: be prompt-sensitive; every line becomes to-dos; open asks spawn 10–20 to-dos. c. M6: research betting and Housebets specifically, to the world's greatest level. d. M7: personal account only; nothing on the company account or company email. e. M10: rebuild visuals from scratch; a full research wave of 10+ agents; the checklist is a committed repo file. f. M13 and M14: research the latest libraries and HOW to use them here; study the "cinematic websites" X thread deeply, and apply only what fits a sportsbook. g. Director: 1st place only; "understand how great people all over the world do." h. STEER2: the harsh 100/100 reviewer that names every minute thing, including what is missing.

3. Things Mohan did not say but a winner needs

Accessibility: keyboard paths, focus rings, screen-reader labels on every odds cell ("Arsenal to win, 1.30"), live regions for odds changes and bet results, reduced motion.

Internationalisation readiness: long team names, RTL check on the shell, number formatting.

Edge cases in Bashagha's style: double-tap Place bet, odds change while the sheet is open, suspension during cash-out confirm, tab hidden mid-placement, offline then back online, stake above balance, stake of zero, a 6-decimal stake, a very long team name.

Loading and skeleton states for every list, sized exactly like the final content (no layout shift).

Empty states with art and a next step (no live matches: show Starting soon, as the brief demands; empty slip; no open bets; no follows).

Error states with plain-language reasons and a recovery action.

Realistic data: believable fixtures, fictional player names, consistent overround (103–107%), no two fixtures with identical lines.

Deep links that return HTTP 200 on every route.

A State Tourer (judge tool) that reaches every scored state in one tap, styled as a discreet demo control, not part of the product.

Copy: short, honest, consistent tense and casing, one voice. A copy deck in design/COPY.md.

Sound and haptics: decide (likely none on web, or haptics only where supported) and write why.

The submission text: big idea counted to 80–800 characters, every tool named including Devin and any AI models.

Performance budgets per route.

A design-system page in the prototype (hidden route) showing tokens and components, which signals "shippable tomorrow" to a Head of Design who built a 45-component system.

4. Research phase: a tree of parallel subagent tracks (time box: 7 hours, see section 10)

Root question: "What would make the Housebets design team say: this is the sportsbook we'd ship tomorrow, and it is clearly better than every other entry?"

Run these tracks in parallel. Each track is one subagent at first; if its first output has gaps, spawn child subagents for the gaps (the tree grows). Every claim cites a URL you actually opened, or the book and chapter. Unknowns are written UNKNOWN. Each output ends with 10–25 derived tasks appended to qc/ASKS.md.

- T1 Contest brief and wireframes → research/00-contest-brief.md, research/wireframes/INVENTORY.md, research/32-judge-dna.md. (A1, A2, A28)
- T2 Competitor teardown: Stake, Shuffle, bet365, FanDuel, DraftKings, Housebets live site; screenshots at 390 and 1440 → research/teardown/, research/42-teardown-table.md. (A4, A19)
- T3 UX psychology books, one subagent each: Steve Krug, "Don't Make Me Think"; Don Norman, "The Design of Everyday Things"; Jon Yablonski, "Laws of UX" (Fitts, Hick, Jakob, Miller, Tesler, the peak-end rule, the Von Restorff effect, the aesthetic-usability effect); Susan Weinschenk, "100 Things Every Designer Needs to Know About People"; Nir Eyal, "Hooked"; Daniel Kahneman, "Thinking, Fast and Slow"; Robert Cialdini, "Influence"; Jeff Johnson, "Designing with the Mind in Mind"; Steve Schoger and Adam Wathan, "Refactoring UI"; Nielsen Norman Group articles on eye-tracking, F-pattern and banner blindness; Baymard Institute checkout research (for the slip); Erik Kennedy's design articles. → research/books/<book>.md and research/50-rules.md. (A8, A9, A10, A11, A25)
- T4 Eye tracking and layout: F, Z and layer-cake patterns, thumb zones (Steven Hoober's mobile research), Fitts and Hick applied to odds grids → research/51-attention-and-reach.md with attention maps per page. (A9, A11, A23)
- T5 Gambling psychology and ethics: Natasha Dow Schüll, "Addiction by Design"; UK Gambling Commission and other public responsible-gambling design guidance; academic papers on near-misses, loss chasing and in-play betting; dark patterns in gambling → research/52-gambling-psych.md with an ethics charter: what we use, what we refuse, and why. (A7, A13, A18)
- T6 Colour psychology: meaning by context, age and culture; colour-blind safety; contrast; the Housebets brand palette → research/53-colour.md with a rationale for each colour token. (A27)
- T7 Typography and spacing: a type scale (for example 1.2 or 1.25 ratio), numeral style for odds (tabular, lining), line heights, a 4 px base spacing scale, a density strategy for odds grids, how Refactoring UI and top systems (Material 3, Apple HIG, Linear, Vercel Geist) choose values → research/54-type-and-space.md. (A23)
- T8 Motion: purpose of each animation, durations and easing by category (feedback 100–150 ms, transitions 200–300 ms, nothing over 400 ms on a money path), interruption rules, reduced motion, what the X "cinematic websites" thread teaches and where it fits (hero, section reveal, route morph) and where it is banned → research/55-motion.md. (A16, A17, A37f)
- T9 Latest libraries (Nov 2026), and how to use each one here → research/25-library-frontier.md. (A16)
- T10 Users and personas: Reddit ×4–5 and X ×4–5 mines of real bettor complaints and praise about Stake, Shuffle, bet365 and others → research/56-voices.md and the personas in section 5. (A6, A14, A19, A37a)
- T11 How top design teams work: storyboarding, design critique rituals, design-system tokens, QC and design-QA checklists, "design crit" formats (Figma, Linear, Airbnb, Stripe, Vercel public writing) → research/57-how-pros-work.md; turn it into our own critique and QC rituals in section 11. (A3, A30)
- T12 AI fingerprint audit of the CURRENT build → research/30-slop-audit-v4.md. (A5)

Synthesis (after all tracks): research/60-master-plan.md turns every rule into decisions per screen. Research/TREE.md shows the tree and the status of each node.

Hard rule: research has a time box. When the box ends, synthesise what exists and mark gaps as known gaps. Research must not eat the build.

5. User understanding

Write design/PERSONAS.md with at least these personas, each with goals, context, device, prior sites, top frustrations, what feels familiar, what would delight them, and what would make them leave:

The experienced crypto bettor (Stake/Shuffle regular, live betting, fast, wants depth and speed, hates slow slips and hidden odds changes).

The casual football fan (bets on big matches, needs clarity, scared of making a mistake, wants to know what they will win).

The mobile-first player (one hand, on a commute, bad connection, thumb reach, bottom bar).

The judge (Ismael Bashagha: production craft, mobile first at 56% of players, edge cases, honest copy, a real design system). Add at least two more from your research (for example a colour-blind player, a first-time crypto bettor).

Then write design/MENTAL-MAP.md: the single picture a player should hold after one full pass (left nav = sports, centre = matches and markets, right panel or bottom bar = my slip and my bets, top = balance and search), and how each page reinforces that picture.

Then write design/FAMILIAR-VS-MORE.md: two columns per page.

6. Design principles

Write design/PRINCIPLES.md with 5–7 principles (for example "the price is the product", "never surprise a player's money", "live is calm, not loud", "one primary action per moment"). Every later decision cites one.

7. The per-element interrogation template (fill it in for every element and state)

File: design/ELEMENTS/<page>.md. One card per element (box, row, odds cell, tab, button, badge, input, toast, sheet, animation) and per state.

ELEMENT: <name>                PAGE: <page>          STATE: <default / hover / pressed / focus / disabled / loading / suspended / changed / failed / success>

WHERE: <exact position at 390 and at 1440: grid column, order, distance from neighbours in tokens>

WHY THERE: <rule IDs (R-xxx), principle, competitor convention, attention map>

SIZE / SPACING: <tokens: width, height, padding, margin, gap; touch target ≥ 44×44>

TYPE: <token: size, weight, line-height, numeral style>

COLOUR: <tokens for bg, fg, border; contrast ratio measured>

BORDER / RADIUS / ELEVATION: <tokens>

MOTION: <trigger, duration, easing, interruption, reduced-motion twin>

BEFORE CLICK, THE PLAYER THINKS: <…>

THE PLAYER EXPECTS: <…>

WE SHOW: <exact feedback, copy and timing>

NEXT, THEY WANT TO GO: <…>, AND WE MAKE THAT ONE TAP BY: <…>

FAILURE MODES: <what can go wrong and what we show>

ACCESSIBILITY: <role, label, keyboard, live region>

EVIDENCE: <screenshot paths at 390 and 1440, commit>

CHALLENGE: <second subagent's critique and the resolution>

8. Design-token spec (before any visual code)

File: design/TOKENS.md, mirrored in code as one tokens file. Components may use tokens only. Grep proves it (no raw hex, px or ms in components, except 0 and 1px hairlines).

- Colour: brand, surfaces (3–4 levels), text (primary, secondary, muted), odds up, odds down, suspended, live, success, error, focus; OKLCH values, contrast ratios listed.
- Type: family (Housebets brand font from the brand pack, or the live site's font), scale, weights, line heights, tabular numerals for all numbers.
- Space: 4 px base scale.
- Radius: a deliberate small set that matches Housebets, not a default.
- Elevation and borders.
- Motion: durations, easings, springs.
- Layout: breakpoints (360, 390, 430, 768, 1024, 1440), the column grid at each, the shell sizes (top bar, left nav, side panel, phone bottom bar).
- Iconography: one custom sport-glyph set, one stroke weight.
- Art: the motif family, section backgrounds, crest system, Hubie cameo rules.

9. Storyboards (before code changes, per screen)

File: design/STORYBOARDS/<flow>.md with frame-by-frame sketches (ASCII or SVG wireframes are fine) and the copy for every frame, at 390 and 1440:

Sports home: arrive, scan Live now, Starting soon, Top competitions, sports nav, search (teams, players, competitions, markets).

Live: every match in play, filter by sport and competition, live score and clock, the nothing-live state that shows Starting soon.

Football: the five leagues, match result odds on each row, follow a team or competition.

Match page (Arsenal v Brighton, live): scoreboard, market groups (Popular, Goals, Halves, Handicaps, Goalscorers, Corners & cards), odds moving, markets suspended.

Bet slip and My bets on one page: tap odds → add → stake in USDT → potential return → odds changed (accept) → selection suspended → bet placed → bet failed; My bets open, settled, cash out (available, value changed, suspended, not available, done).

Phone slip bar at the bottom, and the sheet it opens.

Every edge case in section 3, item 3. Each frame lists the interrogation cards it uses.

10. Phases and time boxes (all IST; deadline Fri 14 Nov 23:30 IST = 18:00 UTC)

Write the real start and end time of each phase in qc/RESET_LOG.md. If the free model limit stops you, write state to disk first so you can resume exactly where you were.

- Phase 0, Mon 9 Nov now → 10 Nov 01:00: section 1 (protect the baseline, qc/ASKS.md, the log).
- Phase 1, Tue 10 Nov 01:00 → 08:00: research tree (section 4). Hard stop at 08:00, then synthesis.
- Phase 2, 08:00 → 13:00: personas, mental map, principles, tokens, storyboards, interrogation cards for the shell, home and slip first.
- Phase 3, 13:00 → 20:00: rebuild the shell, Sports home and Bet slip + My bets on the new tokens. QC rows started.
- 21:00 Tue 10 Nov: SAFETY BUILD deployed and SUBMISSION.md ready, then tell me in chat. If the redesign is not stable by 20:00, the safety build is the `baseline-correctness` build plus whatever is fully QC'd; never ship half a redesign.
- Phase 4, Wed 11 → Thu 12 Nov: rebuild Live, Football and the Match page (20 points plus the tiebreak; it gets the most time), then all states. Adversarial loop passes start Wednesday. A second submission-ready build by Thu 21:00.
- Fri 13 Nov 12:00: FEATURE FREEZE. After this, only QC rechecks, loop fixes and copy.
- Sat 14 Nov 12:00: FINAL build frozen after 2 consecutive clean passes. Tell me; I submit by 16:00. The buffer is not for new features.
- If time runs short, trim in this order: cinematic extras → art variants → secondary personas. Never cut scorecard items, states, wireframe parity, QC or the loop.

11. QC and the review loop

- QC register qc/QC.md: one row per element, state and animation; at least 10 logged rechecks each before freeze, at 390 and 1440, spread across builds, each with real time, verdict and evidence. Rows for each baseline-correctness fix.
- Screenshots: Playwright at 360, 390, 430 (iPhone 15 and Pixel 7 profiles, WebKit and Chromium) and 1440, filed per build in qc/shots/<commit>/. Recordings for every animation.
- Gates per build: tsc, biome, build, Lighthouse on all 5 routes (mobile Perf ≥ 90, A11y ≥ 98, Best practices 100), keyboard-only pass, screen-reader pass on the slip, all deep links HTTP 200, out-of-scope grep zero, raw-value grep zero.
- REJECTION RULE: any deviation from the token spec, storyboard, interrogation card, wireframe parity or this prompt is a FAIL. There is no "minor". A FAIL is fixed and re-run before the row can pass. Write your own rejections down.
- Critique ritual after each screen: a fresh subagent runs a design crit (what works, what does not, what is missing, what a senior designer would change), then you fix and log it.
- The loop (unchanged from STEER1 and STEER2): build → deploy → self-audit against the 7 scorecard lines and every line of qc/ASKS.md → two adversarial judges as separate subagents with fresh context and fresh screenshots: (a) the elite rival entrant, who argues we should place 2nd, and (b) Ismael Bashagha as judge, who scores all 7 lines with evidence. Use the harshest available reviewer model; if the one Mohan asked for (Claude Opus 5.5) is not available, say so and use the best available one. The reviewer names every minute thing, including what is missing and what more is needed. "Good" counts as a loss. Fix everything valid, log the pass in qc/LOOP_LOG.md with real times. Freeze requires 100/100 and 2 consecutive clean passes on the same build. A rubber-stamp pass counts as a failure.
- Review output format (the same for both of Mohan's contests): (a) a score out of 100 on the real scorecard with every lost point named and evidenced; (b) every line of qc/ASKS.md marked met, partial or not met, with evidence, including the psychological and persuasion intent.

12. Standing rules (unchanged)

- Honesty: real timestamps from the Mac clock and real measured numbers only. Never invent a time, score, quote, URL, test result or book content. Unknown means UNKNOWN. If something you called done is wrong, write "I was wrong about X because Y", then fix it.
- Never submit. Mohan submits.
- Never pay or buy anything. No paid plans, assets, fonts or services. Free models only.
- Personal mohanganesh3 account only; nothing on the company account or email.
- Sample data only: no real players, no real money. Singles only. Nothing out of scope.
- Do not copy another sportsbook's visuals or assets.
- Keep the money and settlement correctness already fixed. Every redesign commit re-runs those checks.
- Ask Mohan only if something truly blocks you. Otherwise decide, write down why, and keep going.
- Never go idle. When one item ends, start the next. Do not end your turn while any line in qc/ASKS.md is NOT MET or PARTIAL, unless you are stopped by the rate limit.

13. Report back in chat now

The count of lines in qc/ASKS.md (asks and sub-asks).

The research tree with the subagents you launched, and their output files.

The phase plan with real start times.

One sentence: the big idea you will design around, which you may revise after Phase 1. Then start Phase 0 immediately.

---

## Post-RESET Mohan messages (same force)

M-POST-1 (9 Nov, ~22:47 IST): "scrap all what it done it feels 5 minutes vibe coded app" — confirms total visual rejection; no carryover of old visual decisions.

M-POST-2 (9 Nov, ~22:52 IST): "please understand the standard i am expecting and make it more great than you done what you have done was worst i have ever seen please come out from those dellusion and see we are in nov 9 2026 how much great outside world was we will get desk reject but we planning for the 2st place not even 2nd research all great latest libraries in frontend very great means very great also you need to master the art od ui/ux like a magician and plan please" — bar = outside-world best of Nov 2026; desk-reject is the threat; master UI/UX "like a magician"; research the latest frontend libraries at the highest level.

M-POST-3 (9 Nov, ~23:05 IST): "not just libraries how you design very tailored to us our brand flavour all along and all custom made designs animations that too highest quality control like apple for betting kind of way and also ui ux what i mean was undertsnading users gathering user problems in betting apps like this exactly what we building seeing real human feedbacks and many more you have to think dont restrict yourself need to go all way beacuase and also keep as a wholsesome one plan finally" — design must be brand-tailored and custom-made end to end; animations at "Apple-grade" quality control for a betting product; UX means understanding real users and their real problems from real human feedback; one wholesome plan.
