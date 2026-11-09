# research/41-rival-forecast.md — What the field will ship, and how we beat it (T11)

Date: 2026-11-10 00:25 IST (real `date`). Task A3d: assume rivals are
professional UI/UX candidates using the same AI tools (v0, Cursor, Claude,
Figma AI). Forecast the most-likely archetypes, why each scores ~60–80, how we
beat each, and what a genuinely world-class entrant does — our true benchmark.

Inputs: `00-contest-brief.md` (scorecard, "the sportsbook we'd ship tomorrow
wins", ties → Match page), `32-judge-dna.md` (Bashagha's reward/punish table),
`30-slop-audit-v4.md` (F1–F17 AI fingerprint catalog), `42-teardown-table.md`,
opened references in `40-pro-references.md` (cited inline), plus
sailop.com/blog/why-every-ai-generated-website-looks-the-same ✓ (mode-collapse
mechanics + concrete defaults) opened for this file.

## The physics of the field

- **131 entries** (9 Nov, growing), judged by the Housebets product+design
  team; likely first-pass = skim. A judge triaging 130+ prototypes develops a
  **template reflex**: anything reading as "the same AI sportsbook" is
  mentally filed before it's read.
- **Everyone has the same models.** v0/Claude/Cursor produce the statistical
  centre of their training data when the prompt is under-specified — the
  documented output: Inter, `#3b82f6`-class accent or cyan-on-navy, `rounded-lg`
  on everything, `shadow-md` cards, centered hero, grid-cols-3, chip rows,
  Lucide icons, `backdrop-blur` nav, 300ms ease-in-out on everything (sailop;
  our F1–F17 catalog). So ~80% of the field converges on *one* aesthetic.
- **The differentiators are therefore not visual polish** — every serious
  rival can prompt for polish. The moats are: (a) brief fidelity (5 pages,
  both widths, slip bar on phone, all states), (b) production realism
  ("we'd ship tomorrow"), (c) states coverage (10 pts + folded into every
  other line), (d) Housebets-specific craft (15 pts), (e) Match page depth
  (20 pts + tiebreaker).
- **Rivals also get 3 submissions/day.** Assume the serious ones iterate
  publicly — v1 fast template, v2 polished, v3 (deadline day) best-of. Our
  forecast describes their *final* submission, not their first.

## Archetype × scorecard (predicted)

| Archetype | Home 15 | Live 10 | Football 10 | Match 20 | Slip+MyBets 20 | HB feel 15 | States 10 | ≈Total |
|---|---|---|---|---|---|---|---|---|
| R1 Template reskin | 8 | 5 | 5 | 10 | 10 | 4 | 3 | **~58–68** |
| R2 Awwwards clone | 11 | 5 | 5 | 9 | 8 | 8 | 2 | **~60–72** |
| R3 Feature-crammer | 9 | 6 | 6 | 13 | 11 | 5 | 4 | **~62–74** |
| R4 Wireframe copier | 9 | 6 | 6 | 12 | 12 | 6 | 4 | **~60–70** |
| R5 Behance deck | 10 | 4 | 4 | 8 | 7 | 7 | 1 | **~50–65** |
| R6 Senior product designer | 12 | 8 | 8 | 16 | 16 | 11 | 7 | **~78–88** |
| **Us (target)** | 14 | 9 | 9 | 19 | 19 | 14 | 10 | **94+** |

Scores are forecasts, not measurements — they encode the reward/punish table
from `32-judge-dna.md`: consistency across surfaces, failure-path coverage,
390px correctness, honest numbers, restrained motion, named friction.

---

## R1 — The Clean Template Reskin (≈40–50% of entries)

**What they ship:** A competent dark sportsbook generated from a UI kit /
v0+shadcn scaffold: left nav + content column + right slip rail; Inter or
Geist; cyan or green accent on near-black; `rounded-xl` cards; pill filter
rows; 1X2 odds cells that look right; a working slip with stake input.
All 5 pages exist. Phone gets a hamburger and a bottom bar. It "works."

**Tells (judge-visible in <10s):** chip walls as primary nav (F6);
icon-in-tinted-tile crests (F7/F8 — `AR` in a blue circle for Arsenal);
Lucide-everything (F9); one radius everywhere (F5); `·` separator chains
(F15); odds cells that are just colored buttons; identical empty states —
one icon + "No matches" + dead CTA (F10); odds "flash" = raw color swap.

**Why a judge scores it 60–80 (not lower):** It meets the minimum bar —
5 linked pages, 390+1440, singles-only slip, some changed/suspended state.
Nothing is broken; several things are even pleasant. On an absolute scale
it's "fine."

**Why it doesn't win:** "Feels like Housebets" ≈ 4–6/15 — it's a generic
crypto book wearing Housebets' hex codes, not Housebets' grammar. States are
one each, often bolted on (`alert("odds changed")` class). Match page is a
flat list of markets, no suspension choreography. And the killer: **it looks
like 60 other entries** — the template reflex files it as "competent AI
output," which is exactly what Mohan's rejection called out.

**How we beat it, specifically:**
- **Brand grammar, not brand colors:** Housebets tokens applied with role
  semantics (D1 Geist-style), Oxanium-class display numerals for odds,
  custom crest/wordmark art — nothing icon-library.
- **Authored first-5-seconds:** the matchday masthead (RESET_PLAN S6) —
  editorial slides with custom crest art, zero promo — no template hero
  anywhere in the field will produce that.
- **Depth they can't prompt:** the pricing engine (~96 markets/match incl.
  halves/handicaps/minute bands), Poisson-consistent prices, goal→suspend→
  reprice→reopen cascade. A reskin has static seed data that never
  *behaves* like a book.
- **Signature states:** suspension reason tags, accept-odds-change per leg,
  confirmation countdown — features that can't be generated from a kit
  because they need a state model, not a layout.

## R2 — The Over-Animated Awwwards Clone (≈10–15%)

**What they ship:** A cinematic sportsbook: WebGL/Three.js or heavy GSAP
hero, scroll-driven reveals, kinetic typography, gradient meshes, custom
cursor, page-transition wipes, video/motion backgrounds, maybe a 3D trophy
or particle football. Gorgeous screenshots; it will get shared on X.
Built by a genuinely skilled designer who treats the brief as a canvas.

**Tells:** First paint = loading animation; scroll-jacked sections; hero
occupies a viewport before any odds; motion on money paths (slip slides,
odds whoosh); "featured" carousel with parallax; 8-second match-page intro.
Often broken or sluggish at 390; reduced-motion unhandled; keyboard nav
lost inside animated scroll containers.

**Why a judge scores it 60–80:** It *wins the first 5 seconds* on Home —
the 15-pt home line rewards presence. Creativity reads as effort. BUT the
brief's test is "the sportsbook we'd ship tomorrow": a page you can't ship
to a crypto casino's real mobile audience (INP/jank/battery), with
suspended/changed/failed states that are 90% absent (animation budget went
to the hero), scores like a marketing site. Awwwards' own jury gives
usability 30% and even winners average ~7.2 there (Moto Finance, opened) —
product judges weight states+flows far higher.
Bashagha's punish list hits it on three lines: gratuitous motion, hidden
costs, desktop-first.

**How we beat it, specifically:**
- **Restraint as the flex:** motion budget spent on *information* — price
  rolls that carry direction meaning, goal cascade that explains suspension,
  <3s prestige receipt. The judge sees craft *in the data*, the one place
  the Awwwards clone is empty.
- **60fps honesty:** measurable INP/perf at 390 mid-tier profile; theirs
  will hitch on scroll-in effects (edoardo.fyi documented even Apple's
  jank — we make smoothness a checked claim, they make it an aesthetic).
- **Every state designed:** they will not demo a suspended market, a failed
  bet, and a changed-odds acceptance *in sequence*. That's 10 pts plus the
  Match-page multiplier where ties break.
- **Phone slip physics:** a tuned drag-to-dismiss sheet (velocity-gated,
  FotMob-bracket-class) — a *felt* detail vs their *seen* detail.

## R3 — The Feature-Crammed Dashboard (≈10%)

**What they ship:** The "everything" sportsbook: multis/bet-builder toggle,
boosted odds ribbon, stats widgets, a mini match tracker, standings tables,
live commentary feed, promo carousel, AI search bar, watchlist, chat —
a Bloomberg terminal for betting. Often the most impressive *surface area*
in the field; typically by someone from fintech/dashboard background.

**Tells:** Scope creep visible at a glance — tracker pitch graphics,
accordion stats, sparkline-everything, 12-column desktop density, tabs on
tabs. Out-of-scope features shipped proudly ("AI search" as a selling
point in their big-idea note).

**Why a judge scores it 60–80:** Density demos well on a desktop screenshot
and Match-page depth can genuinely impress for 30 seconds. But: **every
out-of-scope item is a brief violation the judge can check in seconds**
(multis, accumulators, bet builder, boosts, free bets, promos, outrights,
specials, stats widgets, match trackers, AI search — verbatim banned). The
submission form forces them to *check a box* confirming singles-only. Depth
in banned features doesn't score; it documents not reading the brief.
Meanwhile in-scope states (suspended, changed, failed) get out-shouted by
their own chrome.

**How we beat it, specifically:**
- **Depth inside scope:** our market count comes from the engine (96/match)
  not from feature spam; `Popular N … All markets N` with counts = depth
  that's demo-able in their own wireframe's language.
- **Compliance as design signal:** zero grep-hits on the banned list is a
  submission-note line ("every out-of-scope item absent — verified"), which
  reads as pro discipline next to their checkbox lie.
- **Attention math:** on their page, 8 elements compete for the eye; on
  ours, the decision chain score → markets → slip reads in one pass
  (attention budget per screen, A11c).
- **Their tracker is a liability:** stats widgets are banned AND our
  honest-clocks/no-fake-tracker stance is a named principle — judge sees
  restraint as craft, not absence.

## R4 — The Faithful Wireframe Copier (≈15–20%)

**What they ship:** The six wireframes rebuilt 1:1 — sometimes pixel-
faithful, including the wireframes' own weaknesses (their `Pays 0.00`
pre-stake pill, the clipped last tab chip, `A…` truncations). Reads
instantly "on-brief" because it *is* the brief. Usually clean, often in
the starter shell, occasionally with light brand polish.

**Tells:** Layouts match the wireframes suspiciously exactly; same element
order with no added depth; states shown exactly as wireframed and no more;
empty Live = wireframe's suggestion and nothing more; the phone slip bar
textually identical.

**Why a judge scores it 60–80:** "Your prototype should be at least this
good. Our wireframes. Match them, then beat them." Matching is done —
beating isn't. It proves execution capacity, not design judgment. A judge
comparing it to the wireframes they themselves drew sees a tribute act:
no decisions to evaluate means no taste to reward. It also inherits every
wireframe flaw, which the judge knows intimately because they authored
them.

**How we beat it, specifically:**
- **Parity + interrogated deltas:** our parity map (A2) keeps every
  wireframe element *and* writes what we improved and why — the judge sees
  their own wireframe respected, then extended: `+N` collapse for the
  market long tail, suspension reasons on their own amber band, slip that
  never drops selections (their wireframe implies persistence, we prove it).
- **Fix the wireframe's own leaks:** we can name (in the tour) where the
  wireframe underspecifies — pre-stake payout, truncated names, last-tab
  clipping — and show the resolution. That reads as senior review, not
  copying.
- **Depth where they stopped:** wireframes show ~10 markets; ours show 96
  with the collapse affordance the wireframe itself hints at (`+N`).

## R5 — The Behance/Dribbble Case-Study Deck (≈10%)

**What they ship:** A beautiful *presentation*: Figma-exported screens or
a video walkthrough, perfect fake data, one state per screen, casino-
sportsbook hybrid visuals (our A2 reference is the genre), sometimes
literally a Behance link or a screen-recorded Figma prototype instead of
a deployed URL. Where it is deployed, it's a happy-path shell.

**Tells:** No hover/focus/pressed states; placeholder-perfect content
(Arsenal 1.90, Chelsea 2.40 — numbers chosen for symmetry); no phone slip
bar; empty Live → blank; "bet placed" always succeeds; submission link
goes to a portfolio piece, not a public no-login URL.

**Why a judge scores it 50–65:** Fails deliverables at the door if the
link isn't a working prototype ("A clickable prototype… Share a public
link that opens without a login"). If it is deployed: states line ≈ 1–3/10,
phone experience thin, "we'd ship tomorrow" fails on contact. Polish is
real but it's *portfolio polish* — judged against product criteria it
evaporates.

**How we beat it, specifically:**
- **We are the artifact they imitate:** their deck describes a product;
  ours *is* one — engine-driven odds, serialized placement, teardown-
  tested sheet states. Judge can poke everything their screens only
  depict.
- **The boring deliverables, done:** public URL no-login, 390+1440
  verified, five pages linked, phone slip = bottom bar. Each is a form
  field; each is free points they left.
- **States as content:** our ScenarioDock-style tour demonstrates every
  scored state on demand — the thing a deck can never show.

## R6 — The Senior Product Designer (≈3–7%; the real threat)

**What they ship:** A real product designer using AI as scaffolding, not
autopilot. Recognizable by: a written system (tokens, type scale, spacing
law) visible in the output; consistent one-component-one-behavior;
designed states (suspended with lock icon, odds-changed with accept flow);
mobile-first that isn't desktop-shrunk; some signature idea (a follow
model, a match-page organization, a slip interaction); honest sample data
that behaves plausibly; a literate big-idea note that names a point of
view. Likely 2–4 such entries exist in a 131-field; maybe 1 is great.

**Why a judge scores it 78–88:** It clears every bar above. What caps it:
state coverage is usually *representative* not *exhaustive* (one suspended
state, not the reason-tagged cascade; placed/failed happy paths); brand
reads "nice dark sportsbook" not "Housebets" (no Oxanium odds, no
pale-cyan fills, no shell-consistent chrome); match page depth stops at
~20 markets; no engineering realism (static JSON that never misbehaves);
small papercuts (focus order, clipped chips, one inconsistent radius);
motion either absent or tasteful-but-generic.

**How we beat it, specifically:**
- **Depth moat:** the pricing engine + suspension cascade + serialized
  placement is *systems* depth no prompt produces — their data sits still
  under scrutiny; ours behaves like a book (duplicate-line checks, book
  margin sanity, reason-tagged locks).
- **State exhaustiveness:** the six-state cash-out matrix, three odds-
  acceptance modes, four terminal slip states (rejected/suspended/offline/
  insufficient), countdown on live placement — a matrix, not examples.
- **Judge-tuned craft:** skeleton→branded splash, sheet-crop behavior at
  390, blur/tab-hide teardown, sub-3s quiet glow — each maps to a *named
  workstream in Bashagha's own case study*; we're literally building to
  the judge's published taste.
- **Process legibility:** parity map, token spec, motion spec with
  triggers/interruption rules, QC register, honest submission — the
  difference between "a good prototype" and "evidence this person runs a
  design process," which is what a Head-of-Design judge is trained to
  reward.
- **The tiebreaker surface:** Match page is where ties break — we
  concentrate signature moments there (cascade, count-tabs, mine-tab,
  market collapse) rather than spreading evenly.

---

## The world-class entrant — our true benchmark

Not an archetype; the ceiling we compete against. Synthesized from the
strongest opened work (Wednesday Studio, Evan Tang, Geist, Linear, Airbnb,
Apple Sports/FotMob analyses) + `32-judge-dna.md`:

1. **One sentence, everywhere.** They write the big idea before pixels and
   every page expresses it — the judge can state their thesis back unprompted.
   (RESET_PLAN provisional: "an authored Housebets matchday desk…")
2. **Questions before pixels.** They open by asking what the player/judge
   should feel and know in 5 seconds (Wednesday Studio's literal method),
   and design backwards from that answer, not forwards from a kit.
3. **A system, not screens.** Tokens with jobs; one encoding learned once
   and reused on every surface (FotMob ratings); principles named like
   Airbnb's (two about consistency, two about character). Inconsistency is
   the #1 senior tell (Bashagha's audit-first habit).
4. **States are the demo.** They lead the judge through suspended→repriced→
   reopened, changed→accepted, placed→failed→settled, empty→next-kickoff —
   because "failure paths are first-class" is senior instinct, and it's
   literally 10 pts + threaded through every other line.
5. **Numbers that mean something.** Odds behave like a book (margins,
   correlations, suspensions with causes); returns compute exactly; nothing
   displays a number it won't honor (Human Invariant's honesty critique).
6. **Mobile is the product.** 390 is designed *for* (thumb zones, sheet
   physics, no clipped chips) — 56% of players per the judge's own metric.
7. **Motion informs or is removed.** Every animated element answers
   "does this help decide?" — flash=change, cascade=cause, glow≤3s=done.
   Reduced-motion twins exist.
8. **Familiar + authored.** Keeps every convention bettors know (1X2 rows,
   right rail, bottom bar) so nothing reads broken, and signs it with craft
   a template can't mint (crests, type, cadence, copy voice).
9. **Process is visible.** Their submission reads like a senior wrote it:
   principles, rejected alternatives, honest limitations, tools named —
   Behance-deck polish with product-doc substance.
10. **They iterate in public.** Uses the 3-submissions/day allowance: an
    early strong entry in the pool, final polished entry at deadline —
    de-risking the "one build, one shot" failure mode.

**Sober assessment vs us:** items 1–10 are all achievable and most are
already specified in the reset plan; the binding constraints are (a)
executing state-coverage breadth without bleeding quality (the rival-pass1
audit found our 82 — papercuts, not concept, are the risk), and (b)
allocating the most signature craft to the Match page + Housebets-feel
lines where scoring and ties concentrate.

## Counter-positioning summary — the only moats that matter

| Moat | Why rivals can't copy it cheaply |
|---|---|
| Engine-behaving data (96 markets, margins, cascades) | Requires a pricing/state model, not a prompt |
| State matrix (6 CO states, 3 odds-accept modes, 4 terminal slips) | Coverage is work, not style |
| Housebets grammar (tokens, Oxanium, crests, shell) | Requires studying their brand, not a kit |
| Signature restraint (authored masthead, honest clocks, quiet glow) | Requires taste + refusal, inverse of generation |
| Judge-tuned details (sheet physics, skeleton→splash, teardowns) | Requires reading the judge's own case study |
| Visible process (parity map, specs, QC register, honest note) | Requires having run a process |

---

## DERIVED ASK PROPOSALS (for qc/ASKS.md — NOT written there; await owner)

1. **Template-reflex test:** fresh subagent shown our 5 pages + 3
   AI-generated sportsbook screenshots blind — must not pick ours as the
   AI template (A5d formalized; R1 counter).
2. **First-5-seconds script:** for each page, write the exact 5-second
   first impression a judge gets and verify it contains ≥1 authored,
   non-template element. (R1/R2 counter; A15b)
3. **Match-page concentration rule:** ≥2 signature moments must live on
   the Match page (cascade + count-tabs/mine) — the tiebreaker surface
   gets the most craft, not an even spread. (R6 counter)
4. **State-matrix completion gate:** enumerate every scored state —
   suspended(reason×5), odds-changed(accept/decline/all), placed, failed×4,
   cashed/suspended-CO, empty×4 — each rendered at 390 AND 1440. (R2/R5)
5. **Behavior-proof demo path:** a fixed 60-second judge tour where odds
   actually move, a market suspends for a stated reason, and a bet
   places/fails — data must *behave*, not sit. (R1/R6)
6. **Scope-compliance grep:** automated check that multis/boosts/builder/
   tracker/AI-search/promo/outrights/specials strings never appear in the
   UI; run before every submission. (R3)
7. **Housebets-grammar audit:** screenshot diff of our palette/type vs the
   brand pack — pale-cyan fills, Oxanium numerals, shell chrome; any
   "generic dark book" screen flagged. (R1/R6)
8. **Phone-slip physics QC:** velocity-gated drag-to-dismiss on the slip
   sheet; teardown on blur/route-change/modal; logged rechecks at 390. (R2/R6)
9. **Honest-numbers lint:** no displayed number that isn't computed —
   returns, book margin, cash-out value, `+N` counts all live-calculated.
   (Human Invariant honesty; R4/R5)
10. **Process-legibility pack:** ensure parity map, token spec, motion
    spec, QC register exist and are linked from SUBMISSION.md — the
    evidence trail a Head-of-Design scores. (R6)
11. **Anti-Awwwards lint:** no WebGL/scroll-jack/custom cursor/parallax on
    any route; motion budget report per page. (R2)
12. **Wireframe-delta doc:** per wireframe element, one line "improved X
    because Y" — the copier-beating artifact, also feeds the tour. (R4)
13. **Early-entry strategy:** schedule a v2-quality public submission ≥48h
    before deadline, then a final entry — de-risk deploy/link failures and
    bank a strong entry in the judged pool. (benchmark #10)
14. **Papercut hunt ritual:** per-build themed defect pass (names-clipping,
    chip overflow, focus order, radius consistency) logged in QC — the
    R6-vs-us margin is papercuts. (Quality Wednesdays; R6)
15. **Submission-note senior grammar:** big-idea field states principle +
    rejected alternatives + honest limitation in 80–800 chars; named tools
    incl. AI. (benchmark #9; form requirement)
