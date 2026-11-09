# research/57-how-pros-work.md — How real design teams run crits, storyboards, tokens, design-QA (T11)

Date: 2026-11-10 00:30 IST (real `date`). Task A3/A30–A33: mine public writing
from Figma, Airbnb, Linear, Stripe, Vercel, NN/g, GOV.UK, IDEO/d.school and
agency case studies for how professionals *work* — then convert it into our
critique-ritual checklist for the solo-human + subagents team running this
contest.

All sources below were **opened** (method noted). Blocked/snippet-level items
are flagged UNKNOWN rather than cited as read.

---

## 1. Design critiques — canonical formats

### 1.1 Figma — "How to run a design critique" (Noah Levin, VP Design)
**Opened:** https://www.figma.com/blog/design-critiques-at-figma/ ✓

- **Why crits exist (their four goals):** unblock problems & generate ideas ·
  elevate quality · encourage consistency · share context. Explicitly **NOT**:
  making product decisions or setting roadmap — crits stay a safe space for
  exploration.
- **Philosophy:** "critiques should be motivating, not intimidating; helpful,
  not discouraging." They literally **critiqued the critique** — collected
  failure modes (overcrowded rooms, shallow feedback, "+1" groupthink, too-nice
  people, unactionable feedback) in a file, and keep a `#design-crit-crit`
  channel to keep iterating the ritual itself.
- **The six methods:**
  1. *Standard* — presenter shares context (why the project matters, goals,
     "the feedback I am looking for / NOT looking for"), then clarifying
     questions (~2–5m), then feedback via **Round-the-Room** (everyone ≤2min,
     can pass — inclusive) or **Popcorn** (freeform — faster, risks loud-voice
     bias; combat by calling on silent members). Presenter doesn't defend;
     thanks and moves. Observers join the Figma file in Observation Mode.
  2. *Jams & workshops* — Crazy 8s sketching, prompted FigJam frames with
     questions; divergent early-stage.
  3. *Pair design* — groups of ≤3 for deep/context-heavy problems; ad hoc
     "anyone free to pair?"; copilot assignment for lead designers.
  4. *Silent critiques* — everyone reviews the doc silently and comments
     digitally; multiple threads at once → higher feedback volume; ideal for
     remote; requires the doc to carry its own context.
  5. *Paper print-outs* — work on walls, sticky notes, for wide idea sets;
     gets people out of pixel-fixation.
  6. *FYI critiques* — share-outs where feedback is welcome but not requested.
- **Cadence (from the companion process article, opened ✓
  figma.com/blog/inside-figma-the-product-design-teams-process/):**
  crits twice weekly — Wed 9:30 and Fri 2:00 PT — two topics × ~30min each;
  attendance optional (drop-ins give async feedback); Monday 30-min warmup
  (weekend update → highlights → **crit scheduling** → announcements); Monday
  team meeting *cancelled if no topics*; monthly/quarterly rituals incl.
  show-and-tell and retros.

### 1.2 NN/g — "Design Critiques" (Sarah Gibbons)
**Opened:** https://www.nngroup.com/articles/design-critiques/ ✓

- **Definition:** analyzing whether a design meets its objectives — *not*
  judging it. Two species: **standalone critiques** (improve a work) vs
  **design reviews** (heuristic/approval gate at end of process). We need both,
  at different moments.
- **Three themes of effective crits:** (1) clear scope — what can/should be
  critiqued, set before the meeting; (2) agreed design objectives — no shared
  problem definition = baseless subjective feedback; (3) conversation not
  command — directives kill the loop.
- **Facilitation:** designated facilitator, **role rotates** to prevent
  domination and build junior skill; facilitator distributes scope+agenda+
  work in advance; reformulates opinionated feedback into goal-terms
  ("Yikes that layout!" → "how does this layout help the user finish their
  task quickly?"); documents publicly in a shared medium.
- **Formats:** Round robin (everyone speaks, democratic) and **Quotas**
  (each participant gives e.g. 2 things that meet needs + 1 improvement — a
  starter, then natural conversation).
- **Pitfall call-outs:** design critiques should be cross-disciplinary and
  can happen at *every iteration*, not just the end.

### 1.3 IDEO / Stanford d.school — "I like, I wish, what if"
**Status:** canonical IxDF page 403 (UNKNOWN); method corroborated by two
opened-by-search sources describing it verbatim — videogameworkshop.com
critique guides and kedronrhodes.com/3-steps-to-a-better-critique (snippet-
level; attribute as "widely documented IDEO/d.school format," not
first-party-read).
- Structure: **"I like"** — one *specific* genuine positive (protects the best
  parts from being edited out); **"I wish"** — the improvement framed as
  aspiration, not ultimatum; **"What if"** — critic proposes a direction and
  takes partial ownership of the solution. Turns critique into co-design.

### 1.4 Stripe — design reviews & sprints
**Opened:** https://www.hexa.com/blog/news/how-to-scale-design-with-malthe-sigurdsson-stripe ✓
and https://www.figma.com/customers/sprints-with-stripe/ ✓

- **Cadence (Malthe Sigurdsson, design lead):** weekly kickoff reviewing
  work-in-progress + launches; design reviews for sharing progress;
  **occasional 30-min in-depth crits on a single piece of work**; 1:1s.
- **Predictable process:** document how to work with the design team so
  cross-functional partners know what to expect; "onsite-offsites" where the
  team designs its own rituals; **yearly retrospectives** — what worked/why,
  what didn't/why → keep/start/stop list.
- **Culture of sharing:** all work uploaded to a browsable board (Wake) +
  printed on office walls — ambient visibility beats scheduled visibility.
- **Stripe×FigJam sprint:** 3-day remote sprint for Stripe Radar — each day
  opens with a warm-up (draw your coffee order → tool fluency + tone); every
  session has a FigJam section with a **prompt** ("how might we…" statements
  by user level); a "Treasure Trove" section collects links as a live
  resource; day 3 moves into Figma for collective wireframe mocks; output =
  file of concepts + behind-the-scenes context for the product org.
- **Stripe design principles (Config 2021, via search snippet — mark
  partial):** city-planner long-timescale thinking; strong foundations
  (color tables with built-in contrast ratings); rigor/quality for trust
  ("UI that is perfectly polished and works exactly as expected is critical
  to earning trust"); inspire confidence without over-simplifying.

---

## 2. Storyboarding — how pros actually use it

### Airbnb / Disney "Snow White" method
**Opened:** https://www.bringthedonuts.com/essays/building-products-at-airbnb/ ✓
(Ken Norton interviews four Airbnb employees)

- **The technique:** Chesky borrowed Disney's storyboarding; the team drew
  ~11–12 storyboards of the **guest and host journey, emphasizing magical
  moments**. Crucially: "These aren't screens, mind you. **Airbnb, the
  product, isn't our app — the product is staying at a guest's home.**" The
  frames are *moments in the real experience* (greeted by host, getting keys,
  wifi password), not UI panels.
- **"Eleven-star experience":** lead with the perfect experience unconstrained
  by scale/tech — "get a few users to really love it, then figure out how to
  scale."
- **Adjacent truth:** PMs describe Airbnb as *vision-led*, more top-down than
  folklore suggests; "Brian reviews" = exec design reviews where influence is
  prepared *ahead of the meeting*, not improvised in the room. Formerly:
  "everything had to clear a design bar… through design review" — a formal
  gate between design and ship.
- **Cautionary:** employees note launches often shipped before fully built;
  vision-outran-execution is the documented failure mode of story-first
  cultures.

### Application for us (A32/A22)
Our storyboards = **flow frames of moments, not screens**: arrive → find a
match → read markets → add to slip → place → watch live → settle/cash out.
Each frame = what the player sees, thinks, expects next (A24's question set)
+ the emotional beat (confidence moment vs anxiety moment). Code for a
screen waits on its storyboard + interrogation cards. The "magical moments"
equivalent: first odds-tap landing in the bar, the suspension cascade
resolving correctly, the receipt stamping — those are the frames where
craft concentrates.

---

## 3. Design tokens & system governance

### 3.1 Salesforce Lightning — the origin
**Status:** SLDS tokens page 404'd at fetch; core definition corroborated by
two opened sources: Shopify's polaris-tokens README quoting Salesforce UX
verbatim — *"Design tokens are the visual design atoms of the design system —
named entities that store visual design attributes… used in place of
hard-coded values to maintain a scalable and consistent visual system"* —
and Trailhead/developer.salesforce.com snippets (search-level). History:
tokens were invented at Salesforce (~2014) to make theming possible; SLDS 2
later deprecated tokens for CSS "global styling hooks." Treat specifics as
snippet-verified.

### 3.2 Shopify Polaris — semantic token anatomy
**Opened:** github.com/Shopify/polaris color-tokens.mdx (polaris-react-archive)
✓ + v12 release notes via search.

- **Structure:** `concept/specialty? → element → role → prominence → state`:
  element ∈ {`bg`, `bg-surface`, `bg-fill`, `text`, `border`, `icon`}; state
  suffixes `-hover`, `-active`, `-selected`, `-disabled`; specialty tokens
  (e.g. nav) "never used for anything other than the concept they reference."
- **Primitive vs semantic (v12):** primitives = context-free base values
  (`--p-space-100`); semantics = referenced meanings
  (`--p-space-table-cell-padding`); rule: "when no semantic token is a good
  fit, use a primitive" — never invent a vague semantic.
- **v12's four design-language directives:** assign meaning · increase
  density (while holding usability) · craft juicy interactions · make it
  predictable ("objects with similar appearance share a common behavior") —
  that last one IS the one-component-one-behavior law.

### 3.3 Vercel Geist — steps with jobs
**Opened:** vercel.com/geist + vercel.com/geist/colors.md ✓
Scale semantics: `100` default bg, `200` hover bg, `300` active bg, `400`
default border, `500` hover border, `600` active border, `700` high-contrast
bg, `800` hover HC bg, `900` secondary text/icons, `1000` primary text/icons.
Two page backgrounds max; "draw each border once"; shadows translucent;
gray vs gray-alpha decided by whether the background shows through.

### 3.4 Airbnb DLS — principles as governance
**Opened:** medium.com/airbnb-design/the-way-we-build-511b713c2c7b ✓
Four principles split by type: *unified + universal* (system-side: part of a
whole; works across devices) and *iconic + conversational* (character-side:
brand personality). Patterns must be "fundamentally simple" to survive
transmission between people (Christopher Alexander). "The biggest existential
threat to any system is neglect" → they funded a dedicated design-tools team
+ Airshots (any screen/version/language/device) + real data in design tools.
"You can't innovate on products without first innovating the way you build
them."

---

## 4. Design-QA — how pros catch drift

### 4.1 Linear — Quality Wednesdays
**Opened:** linear.app/now/quality-wednesdays ✓
- Ritual: weekly — every engineer fixes **one imperfection ≤30min** (not a
  bug — "small imperfections that degrade the overall experience"), demos it
  at Wednesday standup; logged under a `quality` label; **1,000+ fixes in
  two years.**
- Why it exists: an offsite exercise — a screen recording of three buttons
  where one darkened instantly instead of fading 150ms; **nobody could see
  the defect** → "the pursuit of quality is not an individual sport. It's
  hard to perceive subtle problems with a UI you yourself built."
- Mechanics that make it stick: quality as *habit* ("like brushing your
  teeth"), not a project; themed hunts (Preferences month, keyboard-nav
  month, mobile-month — "narrow your browser and see what didn't look
  right"); missed a week → "bring two next week"; the real win = pattern
  recognition compiles into instinct ("fewer of these papercuts ship").

### 4.2 PR-level design QA (Hypermatic/Pixelay + QA literature)
**Opened:** hypermatic.com/articles/pixelay-pull-request-design-qa-workflow
✓ (OverlayQA/rubyroid corroborating via search snippets — mark secondary)
- **Not every PR needs QA** — trigger list: new sections, responsive changes,
  component redesigns, nav/form/high-visibility flows.
- **Review package first:** staging URL + exact design frame + viewports +
  auth/content setup + *explicit note of intentional differences* — "many
  design-QA arguments are undocumented tradeoffs, not bugs."
- **Short repeatable pass, not endless polish:** layout shell → type/
  hierarchy → component states (hover/focus/empty/loading) → responsive
  behavior — highest-signal first.
- **Findings bucketed:** `block before merge` / `merge, then follow up` /
  `intentional difference` — every finding becomes a merge decision, not a
  comment pile.
- **Evidence attached:** URL + viewport + spec ref + what+why it matters —
  kills "spacing feels wrong" vagueness.
- **Systemic early-catch:** shared-component/breakpoint/token bugs are
  cheapest at PR time; **one final re-verification if the PR changed after
  review** — "small visual fixes have a habit of moving the problem."

### 4.3 Vercel — design engineering
**Opened:** vercel.com/blog/design-engineering-at-vercel ✓
- The role that deletes the handoff: designer sketches the start, design
  engineer iterates **in code** — "animations, keyboard controls and touch
  are better implemented in code" than re-mocked in Figma.
- Design-led projects own what eng backlogs deprioritize: polished
  interactions, no dropped frames, no cross-browser inconsistencies,
  accessibility.
- "Iterate to Greatness" — continuous improvement over the perfection trap.

---

## 5. Working rhythm — the meta-patterns

- **Linear Method** (opened ✓ linear.app/method): verify the problem before
  designing it ("users ask for X to fix problem Y — find the root cause");
  spec per project before building; "explore designs" issue; scope down;
  build with users; taste+beta over metrics/A-B tests (Lenny interview,
  opened ✓ partial-paywall: project teams of 1 designer+2 engineers that
  disperse; one roadmap; conviction bar "as good as it can be at this
  point").
- **Agency discovery-first** (opened ✓ awwwards PandaPay; Wednesday Studio):
  restate the brief → directions as structured thinking → decision filter
  ("does it help the user decide, or stimulate?") → interactive prototype
  "ready to validate before committing to build" — our deliverable IS this
  last artifact.
- **Portfolio-grade case method** (opened ✓ evan-tang.com/sleeper): declare
  3 principles up front; reframe problem from research insight
  ("not missing features — missing confidence"); judge every element by
  "does it reduce decision uncertainty or add noise?"; replace-don't-add;
  validate claims with tests (90% findability).
- **GOV.UK design principles** (opened ✓ gov.uk/guidance/government-design-
  principles): start with user needs · do less · design with data · do the
  hard work to make it simple · iterate then iterate again · this is for
  everyone · understand context · build services not websites · **be
  consistent, not uniform** · make things open · minimise environmental
  impact. Principles as posters, not prose — meant to be recitable.

---

## 6. OUR CRITIQUE RITUAL — the contest-team version

We are a solo human + AI subagents; the rituals translate structurally —
roles, cadence, scope, documentation — not socially. Checklist:

### Roles (rotate per pass — NN/g rotation, Figma methods)
- **Presenter:** the authoring agent / our own build — must write context
  first: goal, scorecard line served, "feedback wanted / NOT wanted."
- **Critiquers:** fresh-context subagents in persona — elite rival (argues
  2nd place), Bashagha-judge (scores the 7 lines), player personas (mobile
  commuter, experienced bettor, first-time crypto). Fresh context = the
  "other eyes" Quality Wednesdays proved necessary — you cannot see your
  own UI's 150ms bug.
- **Facilitator:** the lead — sets scope in advance, reformulates feedback
  into goal-terms, keeps critique off roadmap decisions.
- **Recorder:** files — every crit logs verdicts to qc/ (LOOP_LOG), bugs to
  qc/BUGS.md, rejections written verbatim (A33).

### Cadence
1. **Storyboard crit (pre-code):** flow frames + interrogation cards reviewed
   before any code for that screen (A32). Format = silent critique — the
   reviewer reads the artifact cold and writes findings; no verbal defense.
2. **Per-build screenshot crit:** after each deploy — full-page captures at
   390+1440, every scored state, reviewed by ≥2 personas in writing (our
   silent crit + quota: each reviewer must name ≥1 weakness or sign off
   with a reason — A24b already encodes this).
3. **Daily themed quality hunt (Quality Wednesdays → daily-deadline
   version):** one theme per pass — 390 sheets, focus states, odds-move
   semantics, copy tics, radius/rhythm consistency, empty-state direction;
   ≤30-min fixes, logged with a `quality` tag; miss → two next pass.
4. **PR-equivalent design QA (every commit touching UI):** trigger-class
   changes get the short pass — shell → type → states → breakpoints; every
   finding bucketed `block` / `follow-up` / `intentional difference`
   (documented); evidence = URL+viewport+spec+why; **re-verify after the
   fix** — fixes move problems.
5. **Consistency sweep (Bashagha/audit-first):** periodic one-component-one-
   behavior audit — same pattern built twice differently = FAIL, logged.
6. **Pre-freeze full-state crit:** the 60-second tour + every state at both
   widths, both personas sign off in writing; freeze requires consecutive
   clean passes on the SAME build (existing loop rule).

### Ground rules (all sources)
- Critique improves the work; it does not judge the worker, and it does not
  make product decisions — scope violations go to the decision log instead.
- Feedback lands as goals-language ("how does X help the player decide
  faster?"), never taste-language ("I'd make it red").
- Every positive named specifically ("I like" protects the best parts —
  quota: ≥1 like + ≥1 wish per reviewer).
- Findings travel with evidence and a merge-decision bucket; intentional
  deviations documented so nobody re-litigates them.
- **Crit the crit:** after each loop, note whether the ritual caught real
  defects or rubber-stamped — a rubber-stamp pass counts as failure
  (existing loop rule; Figma's #design-crit-crit equivalent).

### Token & spec gates
- No raw hex/px/ms in components; every value resolves to a token with a
  named role (Polaris structure; Geist steps-with-jobs).
- When no semantic token fits → use a primitive and record the gap; never
  a vague semantic.
- Same appearance ⇒ same behavior, system-wide (Polaris v12 law).
- Every motion has duration+easing+trigger+interruption rule+reduced-motion
  twin — evaluated on the real build at real viewports, never mock-only
  (Vercel design-engineering rule).
- Rejection rule stands: any deviation from spec/tokens/storyboard is a
  FAIL written in words, including ≥1 self-rejection per screen (A33).

---

## DERIVED ASK PROPOSALS (for qc/ASKS.md — NOT written there; await owner)

1. **Storyboard gate (pre-code):** no screen's code changes until its flow
   storyboard (moments, not screens) + interrogation cards are written and
   crit-reviewed. (§2, A32)
2. **Silent-crit format:** every reviewer pass returns written findings
   before any discussion; reviewer reads the artifact cold — enforces the
   doc-carries-context discipline. (§1.1 method 4)
3. **Reviewer quota rule:** each critic must produce ≥1 specific "I like"
   + ≥1 "I wish" or sign off with a written reason — protects best parts
   and forces real review. (§1.3, §1.2 quotas)
4. **Facilitator scope note:** every crit pass opens with goal + "feedback
   wanted/not wanted" + scorecard line served — in the artifact header.
   (§1.1 step 1, §1.2 scope)
5. **Daily themed quality hunt:** one theme per build pass (sheets, focus,
   odds-move, copy, radius, empties); ≤30-min fixes; `quality`-tagged log
   entries; miss → two next pass. (§4.1)
6. **PR-bucket rule:** every design-QA finding is bucketed
   block/follow-up/intentional — and intentional differences get a written
   note so they're never re-litigated. (§4.2)
7. **Post-fix re-verification:** any design-sensitive change after review
   gets one focused re-pass before merge — "fixes move problems." (§4.2)
8. **One-behavior sweep:** recurring audit — same pattern built twice
   differently = FAIL logged in qc/BUGS.md. (§3.2 v12 law, Bashagha audit)
9. **Token-role lint:** zero raw hex/px/ms in components; every token has
   element+role+state naming; primitive-with-recorded-gap when semantics
   don't fit. (§3.2, §3.3)
10. **In-code motion validation:** no motion/gesture approved from mockups —
    only from the real build at 390/1440, with reduced-motion twin checked
    in the same pass. (§4.3)
11. **Crit-scope fence:** critiques never make product decisions — scope
    violations route to a decision log; crits stay unblock/quality/
    consistency/context only. (§1.1 goals, §1.2)
12. **Wall-of-work artifact:** one qc/ folder of full-page captures
    (390+1440×all pages×all states) kept current = Stripe's printed-walls
    + Airbnb Airshots analogue; updated each build. (§1.4, §3.4)
13. **Warm-up scheduling:** crit passes planned ahead (agenda+work shared
    before the reviewer runs) — no cold "what do you think?" prompts to
    reviewers. (§1.2 facilitation, §1.1 crit scheduling)
14. **Crit-the-crit retro:** after each loop pass, one line on whether the
    ritual caught real defects or rubber-stamped; rubber-stamp = failed
    pass. (§1.1 crit-crit, loop rule)
15. **Magical-moments storyboard marks:** our flow frames each tag the
    "magical moment" they exist to deliver (odds-tap→bar, cascade→reprice,
    receipt-stamp) — craft budget concentrates on tagged frames. (§2)
16. **Fresh-eyes mandate:** no screen ships on self-review alone — ≥2
    fresh-context persona reviews (rival + judge) per build, in writing.
    (§4.1 "not an individual sport"; loop rule)

## Source status notes

- Opened & cited: figma.com crits + process, nngroup critiques, linear.app
  method + quality-wednesdays, hexa Stripe, figma.com sprints-with-stripe,
  bringthedonuts Airbnb, medium airbnb-design, github polaris tokens mdx,
  vercel.com/geist(+colors.md)+design-engineering, hypermatic PR-QA,
  gov.uk design principles, wednesdaystudio Polymarket, evan-tang Sleeper.
- Snippet-level (search-verified, page not opened): IxDF "I like I wish
  what if" (403 — corroborated via 2 secondary sources), Salesforce SLDS
  token docs (404/redirects — definition corroborated via polaris README
  quote + trailhead snippets), Stripe Config-2021 principles (via figma
  blog snippet), OverlayQA/rubyroid QA definitions.
- UNKNOWN/not opened: NN/g storyboards article, Uber storyboard case,
  Figma UI3 writeup, any paywalled Lenny content beyond Q4.
