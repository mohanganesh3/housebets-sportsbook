# T5 — Gambling psychology + design ethics (live-sourced, supersedes 13)

Research agent T5, Housebets sportsbook contest entry. Date of research: session of
52-* (post-31/32 wave). Prior file `research/13-gambling-psych.md` was compiled when
web_search was down and flagged its citations for verification. This file re-verifies
every claim against opened sources, corrects what was wrong, and supersedes it.
`qc/ASKS.md` was **not** edited — proposals are listed at the end only.

**Design thesis (repeated throughout): inform the decision, never make it.** Every
mechanism below can either (a) arm the player with better information at the moment
of decision, or (b) quietly steer the decision for them. We only ever do (a). A
Founding-Head-of-Design judge who audited his own product as a system
(`research/32-judge-dna.md`) will grade RG surfaces as *craft*, not compliance
theatre — so each mechanism ends in a buildable, testable surface, not a slogan.

---

## Source-access log — what was actually read vs summarized

**READ IN FULL / SUBSTANTIAL PART (webfetch opened, text extracted):**

- [R1] MIT News, 4 Sep 2012 — "Understanding gambling addiction" (Schüll interview).
  https://news.mit.edu/2012/understanding-gambling-addiction-0904
- [R2] McGarrigle, Smith, Griffiths, Torrance, Quigley & Dymond (2026), "Dark
  patterns in online gambling: A scoping review and classification of deceptive
  design practices", *J Behavioral Addictions* 15(1):99–114.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC13132400/ (abstract + intro read; tables
  truncated by fetch — findings taken from abstract list only)
- [R3] Newall, Russell & Hing (2021), "Structural characteristics of fixed-odds
  sports betting products", *J Behavioral Addictions* 10(3):371–380.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC8997226/ (abstract + intro read)
- [R4] TheWhyWeProject concept explainer, "The Machine Zone" (secondary synthesis of
  Schüll + Hsu 2013 review + Alter + Dixon).
  https://www.thewhyweproject.com/concepts/the-machine-zone
- [R5] De Gruyter / Princeton UP book page for *Addiction by Design* — publisher
  description + full chapter TOC.
  https://www.degruyterbrill.com/document/doi/10.1515/9781400834655/html

**READ AS EXCERPT (web_search returned abstract/full-text excerpts of the real
source; quote-level claims below only use what the excerpt contained):**

- [E1] Clark, Lawrence, Astley-Jones & Gray (2009), "Gambling near-misses enhance
  motivation to gamble and recruit win-related brain circuitry", *Neuron* 61(3):
  481–490. https://www.cell.com/neuron/fulltext/S0896-6273%2809%2900037-3
  (+ KCL record https://kclpure.kcl.ac.uk/portal/en/publications/gambling-near-misses-enhance-motivation-to-gamble-and-recruit-win/,
  PMC fig https://ncbi.nlm.nih.gov/pmc/articles/PMC2658737/figure/fig3/)
- [E2] Langer (1975), "The illusion of control", *JPSP* 32(2):311–328.
  https://doi.org/10.1037/0022-3514.32.2.311 + full-text PDF excerpt
  https://nuovoeutile.it/wp-content/uploads/2014/10/Langer1975_IllusionofControl.pdf
- [E3] Arkes & Blumer (1985), "The psychology of sunk cost", *Organizational
  Behavior and Human Decision Processes* 35(1):124–140.
  https://doi.org/10.1016/0749-5978(85)90049-4 + PDF excerpt
  https://cognition.aau.at/bg/BA/Arkes%20%26%20Blumer%201985.pdf
- [E4] Gilovich, Vallone & Tversky (1985), "The hot hand in basketball",
  *Cognitive Psychology* 17:295–314.
  https://doi.org/10.1016/0010-0285(85)90010-6 + PDF excerpt
  https://labs.la.utexas.edu/gilden/files/2016/04/Gilo.Vallone.Tversky.pdf
- [E5] Xu & Harvey (2014), "Carry on winning: The gamblers' fallacy creates hot
  hand effects in online gambling", *Cognition* 131(2).
  https://doi.org/10.1016/j.cognition.2014.01.002 (+ New Yorker
  https://www.newyorker.com/tech/annals-of-technology/how-gamblers-get-hot and HBR
  https://hbr.org/2014/05/how-the-lucky-get-luckier summaries)
- [E6] Kassinove & Schare (2001), "Effects of the 'near miss' and the 'big win' on
  persistence at slot machine gambling", *Psychology of Addictive Behaviors* 15(2):
  155. https://doi.org/10.1037//0893-164x.15.2.155 + GREO synopsis
  https://www.greo.ca/Modules/EvidenceCentre/Details/effects-of-the-near-miss-and-the-big-win-on-persistence-at-slot-machine-gambl
  + methodological critique in Pytinen et al. review
  https://pmc.ncbi.nlm.nih.gov/articles/PMC7214505/
- [E7] Dixon, Harrigan, Sandhu, Collins & Fugelsang (2010), "Losses disguised as
  wins in modern multi-line video slot machines", *Addiction* 105.
  https://onlinelibrary.wiley.com/doi/10.1111/j.1360-0443.2010.03050.x + Dixon
  et al. 2014 follow-up on sound via Waterloo News
  https://uwaterloo.ca/news/news/music-gamblers-ears and
  https://uwaterloo.ca/news/what-does-winning-sound-you + PMC review
  https://pmc.ncbi.nlm.nih.gov/articles/PMC4225056/
- [E8] Skinner on variable-ratio: B.F. Skinner Foundation, *Cumulative Record*
  ch.10 quote ("the heart of all gambling devices… very high rate of activity…
  slight net reinforcement", p.138). https://www.bfskinner.org/cumulative-record-chapter-10-the-experimental-analysis-of-behavior-quote-13/
  + random-ratio correction: narrative review
  https://www.tandfonline.com/doi/full/10.1080/19012276.2019.1616320 and
  https://doi.org/10.5210/bsi.v7i2.311
- [E9] Kahneman & Tversky (1979), "Prospect Theory: An Analysis of Decision under
  Risk", *Econometrica* 47:263–291. MIT-hosted PDF excerpt
  https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Behavioral_Decision_Theory/Kahneman_Tversky_1979_Prospect_theory.pdf
  + loss-aversion formalization/critique: Sage review
  https://journals.sagepub.com/doi/full/10.1177/0963721418806510 and Gal & Rucker
  https://yeldad.net.technion.ac.il/files/2023/09/Y2019.pdf
- [E10] Noseworthy & Finlay (2009), ambient casino sound and elapsed-time
  estimation, PubMed 19582553. https://pubmed.ncbi.nlm.nih.gov/19582553/
  + Murch & Clark (2021) "Understanding the Slot Machine Zone" preprint (UBC
  Centre for Gambling Research).
  https://gamblingresearch.sites.olt.ubc.ca/files/2021/04/Murch-and-Clark-2021-Understanding-the-Slot-Machine-Zone-PREPRINT.pdf
- [E11] UK Gambling Commission, 2 Feb 2021, "package of changes which make online
  games safer by design" + Annex 1 RTS changes.
  https://www.gamblingcommission.gov.uk/news/article/gambling-commission-announces-package-of-changes-which-make-online-games
  https://www.gamblingcommission.gov.uk/consultation-response/online-games-design-and-reverse-withdrawals/ogdrw-annex-1-summary-of-changes-to-rts
  + impact assessment https://www.gamblingcommission.gov.uk/news/article/assessment-of-online-games-design-changes
- [E12] UKGC LCCP + guidance (via search excerpts; direct fetches blocked):
  SR Code 3.4.3 remote customer interaction
  https://www.gamblingcommission.gov.uk/licensees-and-businesses/lccp/condition/3-4-3-remote-customer-interaction
  guidance requirement 5 (indicators)
  https://www.gamblingcommission.gov.uk/guidance/customer-interaction-guidance-for-remote-gambling-licensees-formal-guidance/requirement-5-customer-interaction-guidance-for-remote-gambling-licensees-sr
  LCCP 3.3.4 time-out
  https://www.gamblingcommission.gov.uk/licensees-and-businesses/lccp/condition/3-3-4-remote-time-out-facility
  LCCP 3.5.4 self-exclusion ordinary code
  https://www.gamblingcommission.gov.uk/licensees-and-businesses/lccp/condition/3-5-4-remote-ordinary-code
  RTS 13 time requirements & reality checks
  https://www.gamblingcommission.gov.uk/manual/national-strategy-to-reduce-gambling-harms/rts-13-time-requirements-and-reality-checks
- [E13] GambleAware: self-directed tools report glossary
  https://www.gambleaware.org/media/vigdff4t/final-draft-the-role-of-self-directed-tools-and-strategies-in-reducing-gambling-harm-an-explore-report.pdf
  blocking/self-exclusion page https://www.gambleaware.org/tools-and-support/gambling-blocking-and-self-exclusion/
  advice page https://www.gambleaware.org/advice/for-your-gambling/advice-to-consider-if-you-re-gambling/
  + GamCare "Nine ways to keep yourself safe"
  https://my.gamcare.org.uk/resources/nine-ways-to-keep-yourself-safe-when-gambling
- [E14] Auer & Griffiths personalized-feedback studies: *Frontiers in Psychology*
  2015 (mentor tool; 1,015 vs 15,216 controls)
  https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2015.01406/full
  and 2016 (Norsk Tipping; 17,452 sampled)
  https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.01875/full
  + dissonance study (N=11,829) https://link.springer.com/article/10.1007/s11469-017-9808-1
- [E15] López-Gonzalez & Griffiths (2017), "'Cashing out' in sports betting:
  implications for problem gambling and regulation", *Gaming Law Review* 21(4):
  323–326. NTU eprint excerpt https://ntu.eprints-hosting.org/id/eprint/30779/1/PubSub8457_Griffiths.pdf
  + Killick & Griffiths (2019) "In-Play Sports Betting: a Scoping Study"
  https://doi.org/10.1007/s11469-018-9896-6
- [E16] Newall dark-nudge taxonomy: "Sludge, dark patterns and dark nudges: a
  taxonomy of online gambling platforms' deceptive design features"
  https://pmc.ncbi.nlm.nih.gov/articles/PMC12426356/ + commentary
  https://pmc.ncbi.nlm.nih.gov/articles/PMC12426343/ + ABC News practitioner list
  https://www.abc.net.au/news/2026-06-22/dark-patterns-deceptive-design-gambling-online/106789750
  + Newall (2019) "Dark nudges in gambling" https://doi.org/10.1080/16066359.2018.1474206
- [E17] Sports near-miss gap: OSF preregistration "Near Misses in Sports Betting"
  (winning 3 of 4 legs etc. — explicitly notes no prior sports-domain near-miss
  research). https://doi.org/10.17605/osf.io/fujrk
- [E18] Clock/cash-display/precommitment field study (2009), *J Gambling Issues* 23:
  players rated the **cash display** helpful, the clock and precommitment device
  not. https://doi.org/10.4309/jgi.2009.23.2

**BLOCKED / NOT READ (UNKNOWN — do not quote):**

- The Atlantic (2013), "The Machine Zone" — https://www.theatlantic.com/technology/archive/2013/07/the-machine-zone-this-is-where-you-go-when-you-just-cant-stop-looking-at-pictures-on-facebook/278185/ → HTTP 403.
- Schüll's RWJF Human Capital Blog PDF (natashadowschull.org) — fetched but binary
  PDF not extractable; content unknown beyond search snippet.
- Hsu (2013) review PDF — fetched but binary; relied on [R4]'s published summary of
  it instead.
- gamblingcommission.gov.uk pages — direct webfetch refused; all UKGC content below
  comes from search-returned excerpts of the official pages (verbatim blocks marked).
- *Addiction by Design* book text itself — paywalled; only the Princeton/De Gruyter
  description + TOC + the MIT interview + secondary summaries were read. All
  Schüll-specific claims are labelled [READ-interview] or [SUMMARIZED-review].

---

## 1 · The seven mechanisms

For each: evidence → where it lives in a sportsbook → how a dark pattern exploits
it → how we design it ethically.

### 1.1 Near-miss effect

**Evidence.** Clark et al. 2009 [E1]: near-misses were rated *less* pleasant than
full-misses but *increased* desire to continue — and only when the player had
personal control over the gamble; neurally they recruited the same ventral
putamen/anterior insula circuitry as wins. Kassinove & Schare 2001 [E6]: a 30%
near-miss frequency produced the most persistence in extinction vs 15%/45%
(inverted-U) — though a later review (PMC7214505) flags the extinction data may be
skewed, so treat "30%" as indicative, not a magic number. Sports-specific:
Newall, Russell & Hing 2021 [R3] map the near-miss characteristic onto
**accumulators/complex bets** — a bet can lose by one leg. The OSF prereg [E17]
confirms direct sports-betting near-miss research is still thin.

**In our UI.** Settled-lost bet cards in My bets ("your pick lost by one goal"),
the scoreboard when a backed selection loses late, any "you were so close" copy.

**Dark pattern.** "So close!" / "one goal away" framings on settled losses;
highlighting the legs that *almost* won; immediate re-bet suggestions styled as
redemption; marketing "near-win" bet histories.

**Ethical design.** Factual settle copy only — `Lost · 1–2 (conceded 90'+2")`,
outcome and scoreline, never proximity-to-win language. A lost bet gets *no*
suggested next action. We can *show* the record honestly in My bets (it is the
player's data) but we never narrate it as "almost".

### 1.2 Loss aversion

**Evidence.** Kahneman & Tversky 1979 [E9]: value is computed against a reference
point; the value function is steeper for losses than gains — "losses loom larger
than gains"; the convex loss region makes people risk-*seeking* to avoid a sure
loss (that's the engine of chasing). ~2:1 weighting formalized by Tversky &
Kahneman 1992 (per [E9] review); Gal & Rucker's critique notes the effect size was
initially over-interpreted — keep the claim qualitative. Loss-chasing is
GambleAware's #3 harm warning [E13] and UKGC indicator "chasing losses" is an
explicit marker of harm [E12 req 5].

**In our UI.** Cash-out offers (an open bet going badly is framed as a loss to be
stopped), the settled net P/L column, stake framing ("risk 10 to win 11"),
deposit prompts after a losing session.

**Dark pattern.** Pulsing "Cash out now — cut your losses" when the offer is below
fair value; re-deposit prompts triggered on balance low *after losses*; framing
everything as "don't lose it"; hiding net position so the reference point stays
fuzzy until it's catastrophic.

**Ethical design.** Cash out is presented as a neutral live quote with its own
suspension/lock states — same weight as every other action, never urgency-styled
(this is also López-Gonzalez & Griffiths' regulatory worry [E15]: cash out
converts betting from discontinuous to continuous and sells an illusion of
control). Net position always visible: the reference point should be the *player's
own number*, honestly shown — `Session −24.00` in the slip footer, not hidden.
Stakes framed as `Potential return`, the actual convention — never "risk X" copy.

### 1.3 Illusion of control

**Evidence.** Langer 1975 [E2]: competition, choice, familiarity, involvement —
features of *skill* situations smuggled into *chance* situations — raise
confidence beyond objective odds (six studies: cutting cards against a nervous
rival, choosing your own lottery ticket, etc.). Clark 2009 [E1] shows it
*compounds*: personal control is what makes near-misses motivating. Sports
betting is the highest-involvement gambling product [R3]: form research, market
choice, cash out — bettor involvement is a genuine structural characteristic, not
a bug. Killick & Griffiths 2019 [E15]: in-play amplifies it because the bettor
controls timing, volume and stake.

**In our UI.** The accept-odds mode (`Ask / Higher only / Any`), market
selection, stake entry, follows, cash out — every real choice we give is also a
control-signal.

**Dark pattern.** Implying interaction changes outcome probability — "stop the
spin" buttons (UKGC explicitly banned "features that give the illusion of
control" [E11]), "boost your bet" theatre, picking-ritual animations, skill
language ("beat the odds", "your call decides it").

**Ethical design.** Give *real* control over the things that are really
controllable — which market, what stake, what odds to accept, when to cash out —
and label the chance part plainly: implied probability on every odds cell (a
2.50 price is 40%, the house edge included), odds-movement shown as market fact
(`2.10 → 2.30`) not personal luck. The control we give informs the decision; we
never let UI theatre imply the player controls the result.

### 1.4 Variable-ratio rewards

**Evidence.** Skinner (via BF Skinner Foundation [E8]): variable-ratio schedules
generate "very high rate of activity… slight net reinforcement" and are the most
extinction-resistant schedule — Skinner himself used gambling as the paradigm.
Honest correction for our notes: gambling is technically a *random-ratio*
schedule (each response has constant independent probability), per the learning
review [E8] — the point stands either way. In a sportsbook the "rewards" aren't
just wins: odds ticks, price updates, score changes arrive on non-uniform
cadence — the feed itself is variable-ratio texture.

**In our UI.** Live odds ticking, the "Live now" strip updating, settlement
moments, notification-worthy events.

**Dark pattern.** Manufacturing variable reward: surprise "bonuses", randomized
boosts, streak rewards, loot-like bet receipts, artificial randomness in
interface feedback (confetti on *some* wins), push notifications engineered for
pull-to-refresh compulsion.

**Ethical design.** The only variable schedule we ship is the *real one* — actual
match events and actual price moves, flashed honestly (direction + colour +
glyph, never colour alone). Nothing stochastic is invented by the interface:
no randomized delight, no variable reward applied to UI chrome itself. Where the
real feed is high-frequency (in-play ticks), we add the brake — session info in
the same viewport — rather than strip the information.

### 1.5 Time distortion

**Evidence.** Schüll's zone is centrally a *time* disorder — "people lose track
of time and space" [R1]. Lab support: ambient casino sound environments produce
significant *underestimates* of elapsed play time; music cues partially restore
accurate estimation (Noseworthy & Finlay 2009 [E10]). Murch & Clark 2021 [E10]:
the zone is defined by diminished attention to time passing and correlates with
problem-gambling scores. Casinos remove clocks and daylight for a reason
(Friedman covering windows at sunrise — journalism-grade [E10 IFLScience],
flagged as such). Caveat worth printing: a 2009 field study found players rated
the *cash display* helpful but not the clock alone [E18] — so clocks must come
paired with money-position, not as token time furniture.

**In our UI.** Live clocks (match minute), session length, kickoff countdowns,
"open for 47 min" on bets.

**Dark pattern.** No clock anywhere; no session boundary; infinite scroll of
fixtures; making elapsed time invisible while making real-time odds urgent —
the classic asymmetry: *their* clock (price expiry) loud, *your* clock (session
length) absent.

**Ethical design.** Both clocks always on: the event clock (real, honest — no
fake countdowns) AND a session line with elapsed time + net position in the slip
footer, present at every money decision. Reality-check toast on a real interval
with session stats — the UKGC RTS 13B pattern [E12] adapted to a sportsbook.

### 1.6 Sunk-cost effect

**Evidence.** Arkes & Blumer 1985 [E3]: theatre patrons randomly paid full price
vs discounted for the same season tickets attended more plays — past,
unrecoverable spend irrationally driving future attendance; the paper notes it's
"well described by prospect theory" (losses frame) and that economics education
doesn't inoculate. In gambling this is chasing: money already lost becomes the
reason to bet more. GambleAware names it directly: "don't chase your losses…
trying to win back your losses often leads to even bigger losses" [E13]. The
scoping review [R2] notes *instant depositing* is the mechanism that feeds it —
the sunk-cost urge meets zero friction.

**In our UI.** My bets settled-history streaks, balance-after-loss moments,
deposit flow timing, "win it back" emotional windows.

**Dark pattern.** "Recover your losses" prompts; deposit CTA surfaced strongest
right after a losing settle; bet-history streaks weaponized ("you're due");
keeping loss totals invisible so chasing feels like recovery not doubling down.

**Ethical design.** Never trigger deposit prompts on loss events; the deposit
flow carries no urgency. Settled losses render plainly with net delta. If
anything, the anti-chase surface is where we *add* friction: after a settling
loss there is no promoted next bet — the session line (net position) is the only
persistent element, informing rather than goading.

### 1.7 Hot-hand fallacy (and gambler's fallacy)

**Evidence.** Gilovich, Vallone & Tversky 1985 [E4]: fans and players believe
streaks predict the next shot; the 76ers/Celtics/Cornell data showed no
sequential dependence — belief in the law of small numbers applied to random
sequences (fans estimated a 50% shooter at 61% after a make, 42% after a miss).
The sportsbook-specific twist is Xu & Harvey 2014 [E5]: 565,915 real online
sports bets — winners *did* win again (because they then chose safer odds,
believing luck would reverse) and losers lost again (riskier odds, same
fallacy): "they suffered from the gamblers' fallacy… they created their own hot
hands." The bias expresses itself in stake/risk selection, which is exactly the
lever a UI touches.

**In our UI.** Form guides (W/D/L runs), "in-form" labels, personal bet
histories, win streaks in My bets, trending markets.

**Dark pattern.** "You're on fire — bet again"; streak-celebrating UI that
implies momentum; "hot" badges on the player's own history; trending-bet
narratives ("9 of last 10 won") that imply a due continuation; risk-escalating
suggestions aimed precisely at players on losing streaks (the Xu & Harvey loser
is the most exploitable user — he picks *riskier* odds next).

**Ethical design.** Form is shown as fact (last-5 W/D/L is real data) with no
momentum narration; win streaks display as record, not prophecy. No "on fire"
microcopy anywhere. The pattern to break is the *post-loss risk escalation* —
that's why no one-tap re-bet after a loss and why suggested stakes stay at the
modest end rather than tracking the player's emotional state.

---

## 2 · Schüll, *Addiction by Design* — what we took and what we refuse

**Access note:** the book text is paywalled. Read directly: the MIT News
interview [R1], the publisher description + full TOC [R5]. Summarized via
secondary source [R4] (which itself cites Hsu's 2013 SSS review): the zone,
"asymmetric collusion", "perfect contingency", time-on-device metric. Claims
below are tagged [READ] or [SUMM].

### The machine zone [R1 READ + R4 SUMM]

- The zone is a "trancelike state" where "daily worries, social demands and even
  bodily awareness fade" — players play *to keep playing*, not to win. Mollie:
  "to stay in that machine zone where nothing else matters." [R1]
- It is *manufactured*: game speed (3–4s per play), frequent small wins (which
  can even *irritate* a zoned player by interrupting flow — "she felt irritated
  when she won… her flow was interrupted"), instant re-betting of credits,
  ergonomics, enclosed layouts, removed exit cues. [R1 + R4]
- The industry metric is **time on device** — profit is literally a function of
  uninterrupted session length; the player seeking continuity and the operator
  being paid for it are in "asymmetric collusion". [R4 SUMM]
- Scale of harm: ~1–2% prevalence of disordered gambling but those players can
  generate 30–60% of machine-gambling revenue. [R1]
- Schüll's own regulatory note: slowing machines is "wrongheaded" — it can just
  stretch the same money over longer play; the honest target is the *relationship
  to time and money*, not RPM. [R1]

### Immersion design — the four registers [R4 SUMM + R1]

1. **Temporal** — fast resolution cycles, minimal gap between action and outcome.
2. **Ergonomic/behavioural** — "perfect contingency": every player action
   instantly answered, a complete action→response alignment.
3. **Sensory** — audiovisual cocooning; celebrations tuned to sustain the loop.
4. **Architectural/spatial** — no exit cues, no windows, no clocks, no edges.

### What translates honestly — and the refusal line

Honest: fast action→feedback (tap → slip → confirm <100ms is *respect*, not
addiction); persistent slip; anticipation inside the confirm window; visible
causality (a suspended market dims and padlocks the same frame). Speed and
contingency inform the player; they stop being honest the moment they hide time
or money.

**We REFUSE, because of Schüll:**

- No engineered dissociation: we do not design for the zone. Session time and net
  position are *in the decision surface itself*, not buried in account settings —
  because the zone's mechanism is precisely making those numbers disappear.
- No play-to-extinction loops: no autoplay, no rapid-rebet chains, no
  "the next fixture is already queued" momentum surfaces. A bet ends; the next
  one is a *decision*, not a continuation.
- No small-wins drip-feed as retention mechanics: wins are settled and stated;
  we don't manufacture event frequency the player didn't ask for.
- No time-on-device as our success metric in any internal framing (relevant for
  how we *describe* the design in submission copy — we optimize for
  decision-quality surfaces, and say so).
- No credit abstraction: real USDT figures everywhere — Schüll shows abstraction
  is the zone's fuel (also on Newall's dark-pattern list [E16]: "coins or chips,
  rather than real currency").
- No frictionless loss-top-up: instant depositing at the moment of tilt is the
  documented chase mechanism [R2].

Schüll's closing design question, adapted for us: does this surface let the
player *keep track* — of time, money, and what they decided — at the moment it
matters? That is the test every RG element below must pass.

---

## 3 · Public responsible-gambling guidance — the canon we build against

### UK Gambling Commission [E11, E12 — excerpts]

**LCCP SR Code 3.4.3 (remote customer interaction, in force from 31 Oct 2023)**
— operators must run identify→act→evaluate on harm indicators including:
customer spend, patterns of spend, **time spent gambling**, gambling-behaviour
indicators (incl. chasing losses, erratic patterns, in-play's higher bet
frequency is explicitly noted as riskier), customer-led contact, use of
gambling-management tools, account indicators. → Our demo can't implement
detection, but it can *surface* the same indicators to the player: time, spend,
net position — the data model is already the regulated one.

**RTS 13 (time + reality checks)** — 13A: elapsed time/time-of-day must be
displayed where fullscreen obscures the device clock; 13B: reality check =
user-settable frequency, shows time elapsed, **must be acknowledged to dismiss**,
default offered at the *minimum* period. → Direct pattern for our session clock
+ reality-check toast.

**Oct 2021 online-slots package (RTS amendments)** — banned: autoplay; spin
cycles under 2.5s; "features that speed up play or give the illusion of control"
(turbo/quickspin/slam-stop); and "sounds or imagery which give the illusion of a
win when the return is in fact equal to, or below, a stake" (= LDW ban).
Required: net win/loss and time-played displayed during sessions. Plus a
**permanent reverse-withdrawal ban** for all remote gambling. The Commission's
own follow-up found reduced play intensity, no rise in stakes, no detected harm.
→ The sportsbook analogues: no auto/queue betting; honest settle celebration
rules (see LDW bug below); never let a withdrawal flow re-open into a bet;
net + time always visible.

**LCCP 3.3.4 (time-out)** — must offer 24h / 1 week / 1 month / customer-requested
up to 6 weeks. **LCCP 3.5.x (self-exclusion)** — positive action required, full
consequence information, encourage extending to other operators (the
multi-operator SR code → GAMSTOP). → The limits sheet needs all four rungs:
deposit/loss limits, reality check, time-out ladder, self-exclusion — even as a
demo, completeness is the signal.

### GamCare / GambleAware [E13]

- Tool glossary: deposit limits (most-used, least intrusive — "subtle reminders
  of time and money spent"), spend limits, time limits, reality checks
  (warning without lockout), self-exclusion (the crisis rung — "informal
  stepped-care": people escalate when smaller tools fail → ordering in our sheet
  should be ascending severity), blocking tools (GamBan/BetBlocker), bank blocks,
  GAMSTOP (5-minute registration, all GB licensees).
- GamCare "Nine ways": access to full account history, reality-check alerts,
  spend limits, time-out up to six weeks, self-exclusion minimum six months.
- GambleAware advice framing we can echo in copy: set the limit *in advance*,
  don't chase losses, be careful under alcohol — i.e., limits are a *pre-commitment*
  device, which is exactly where our "Set limits" entry point belongs (before the
  bet, reachable at the moment of decision).
- UKGC consumer research [E13, "exploring online staking"]: ~30% of players use
  at least one tool; most non-users still *value their presence* — RG tools are
  a trust signal even for players who never open them. For a judge, their
  presence + placement is itself graded.

### Evidence the surfaces work [E14, E18]

- Auer & Griffiths 2015: players receiving personalized feedback (mentor tool)
  spent significantly less time and money vs 15,216 matched controls.
- Auer & Griffiths 2016 (Norsk Tipping, 17,452 sampled): *all* messaging groups —
  personalized feedback, normative feedback, recommendation — reduced theoretical
  loss, amount wagered and GGR vs control.
- Cognitive-dissonance nuance (N=11,829): "how much do you think you lost?"
  feedback reduces expenditure — the informative *number itself* does work.
- Caveat for humility [E18]: cash display rated helpful; clock alone not → our
  session line pairs time AND net position deliberately, one line, both numbers.

---

## 4 · Dark patterns in gambling UI — the NOT list

Sources: McGarrigle et al. 2026 scoping review [R2], Newall taxonomy + ABC list
[E16], UKGC bans [E11]. Each row: the pattern, its evidence, our counter-pattern.

| Dark pattern | Evidence | Our counter |
|---|---|---|
| Urgency timers / countdown pressure on bets and offers | urgency-based prompts named in scoping review [R2]; ABC list [E16] | only real clocks: kickoff countdowns, real price/suspension states; no fake expiry, no "bet in the next 30s" |
| Bet-again bait after placing or losing a bet | "prompting users to bet again immediately" [E16] | post-settle screen ends in a receipt + ref; no promoted next bet |
| Loss-disguised-as-win celebration | Dixon 2010 [E7] arousal≈win; UKGC-banned for slots [E11] | sub-stake cash-outs/returns show neutral `cashedout` state + net delta; **known bug filed in 13: `MyBets.tsx:47-55` renders potential return on lost bets, `bets.ts:84` marks sub-stake cash-outs `won` — both must ship fixed** |
| Near-miss narration | Clark 2009 [E1]; Kassinove & Schare [E6] | factual settle copy; proximity vocabulary banned in copy audit |
| Asymmetric friction: deposit easy / withdrawal hard | sludge in withdrawal processes [R2, E16]; reverse withdrawals UKGC-banned [E11] | demo states cash-out and withdrawal flows with equal-or-less friction; no re-gamble bait |
| High default stakes/deposits ("suggested" amounts) | high defaults in stake/deposit/limit settings [R2, E16] | quick-stake chips anchor modestly (5/10/25); MAX chip demoted + guarded |
| Hidden/deep-buried RG tools | "hidden gambling management tools" is a named dark pattern [R2] | "Safer gambling" reachable ≤2 taps incl. from the slip and live page; limits sheet complete (deposit/loss/time-out/self-exclusion) |
| Currency abstraction (coins/credits) | [E16]; Schüll's zone fuel [R1/R4] | real USDT, live balance visible incl. mobile |
| Removed exit cues (no clock, no session edge, infinite scroll) | Schüll architecture register [R1/R4]; Noseworthy & Finlay [E10] | session clock + net position persistent; finite lists; "nothing live" honest empty state |
| Illusion-of-control features | UKGC ban list [E11]; Langer [E2] | real controls only; implied probability shown; no stop-the-result theatre |
| Autoplay / continuous play mechanics | UKGC autoplay ban + López-Gonzalez cash-out-continuous warning [E11, E15] | every bet individually committed; no queue, no auto-rebet |
| "Most popular bet" / social-proof steering | [E16] | no popularity steering on markets; top competitions ranked by schedule relevance |
| Streak notifications / momentum nudges | [E16]; Xu & Harvey mechanism [E5] | streaks shown as record only; no "on fire" copy; no post-streak upsell |
| Complex-condition inducements | [R2] | promos out of scope anyway — the whole class is absent |
| Minimum-balance withdrawal traps | [R2] | n/a in demo; no min-withdrawal copy anywhere |
| Micro-event betting density inflating frequency | [R2] citing Parke & Parke 2019, Torrance et al. | market depth per brief (real markets only); no synthetic micro-markets to pump event frequency |

---

## 5 · Verification of 13-gambling-psych.md — confirmed / corrected / superseded

- CONFIRMED: Clark 2009 near-miss [E1]; Dixon LDW [E7]; Auer & Griffiths
  personalized feedback reducing spend [E14]; Schüll machine-zone four registers
  [R1/R4]; Skinner VR persistence [E8]; Schüll's "winning interrupts flow" and
  small-frequent-wins point [R1]; Kassinove & Schare near-miss finding [E6, now
  with caveat noted].
- CORRECTED: "UKGC LCCP/RTS-14 family" is vague — precise anchors are RTS 13A/13B
  (clocks + reality checks), the Oct 2021 RTS amendments for slots (autoplay,
  <2.5s, illusion-of-control features, LDW celebrations, net/time display),
  LCCP 3.3.4 (time-outs) and 3.5.x (self-exclusion), SR 3.4.3 (customer
  interaction). [E11/E12]
- CORRECTED/SHARPENED: sportsbook near-miss and illusion-of-control now have
  sport-specific cites (Newall/Russell/Hing [R3]; Killick & Griffiths [E15];
  OSF gap note [E17]) — the prior file generalized slot evidence only.
- STILL UNVERIFIED (carried flag, do not cite externally): "cash-out availability
  ↑ stakes up to 35%, Psychol. Sci. 2024" from 04-psychology-playbook.md — not
  re-found; treat as unconfirmed.
- SUPERSEDED: this file replaces 13 for mechanism→ethics mapping; 13's
  codebase-audit findings (the `cashedout`/`MyBets.tsx`/`bets.ts` bugs) remain
  valid and are restated in §4 above.

---

## 6 · ETHICS CHARTER

Operating rule for every psychology-informed decision in this build:
**"we use X to inform / we refuse Y because Z".**

1. We use fast action→feedback to inform the player their input registered / we
   refuse zero-gap bet loops because engineered "perfect contingency" is the
   zone's core mechanism (Schüll [R1/R4]).
2. We use a persistent slip and real choices to inform the player's intent / we
   refuse any UI theatre implying interaction changes outcome odds because
   that's the illusion of control (Langer [E2]; UKGC-banned [E11]).
3. We use real, non-uniform feed cadence to inform about actual market movement /
   we refuse manufactured random rewards — surprise bonuses, variable delight —
   because invented variable-ratio texture is the addiction engine wearing the
   feed's clothes (Skinner [E8]).
4. We use the player's own numbers — elapsed time, net position, session spend —
   placed inside the decision surface to inform every money choice / we refuse
   hiding time or money behind account sub-menus because removing exit cues is
   documented immersion design (Noseworthy & Finlay [E10]; Schüll; and the
   Auer & Griffiths evidence that the numbers themselves reduce spend [E14]).
5. We use honest settle copy (result + reason + net delta) to inform the
   player's record / we refuse near-miss vocabulary, LDW styling, or
   celebration-below-stake because they reclassify losses as wins in the
   player's nervous system (Clark [E1]; Dixon [E7]; UKGC ban [E11]).
6. We use cash-out as a neutral, quoted, suspending option to inform a real
   decision / we refuse urgency-styled cash-out pressure or using it as a
   continuity engine because it converts betting from discontinuous to
   continuous and sells control (López-Gonzalez & Griffiths [E15]).
7. We use modest-anchored stake chips and an implied-probability footnote to
   inform scale / we refuse high defaults, MAX-bet nudges, or stake suggestions
   that track emotional state because dark-pattern research names high defaults
   and post-loss escalation as exploitation levers ([R2/E16]; Xu & Harvey's
   loser picks riskier odds next [E5]).
8. We use real clocks only — kickoff, suspension, session — to inform timing /
   we refuse fake expiries and countdown pressure because manufactured urgency
   is a named dark pattern ([R2/E16]) and fake clocks break the one currency
   this design trades in: believability.
9. We use limits/reality-check/time-out/self-exclusion as visible, reachable
   architecture to inform pre-commitment (the GambleAware "set it in advance"
   frame [E13]) / we refuse burying RG tools more than two taps deep or making
   them visually second-class because hidden tools are themselves a classified
   dark pattern [R2].
10. We use quiet wins — sub-3s glow, receipt, ref — to inform outcome / we
    refuse loud-win rituals (confetti, streak fanfares) because celebration is
    an amplifier on a variable-ratio loop the player didn't consent to — and
    because the judge's own stated taste is "a soft glow for under three
    seconds, no confetti spam" [judge-dna §6].
11. We use the demo's scenario dock to *show* our ethics (reality check, limits,
    suspension, insufficient funds triggerable by judges) / we refuse RG as a
    static footer link because demonstrable restraint is what separates a
    senior designer's entry from a skin.
12. We optimize for decision quality and say so in copy / we refuse
    time-on-device as a success metric — internally or in submission language —
    because Schüll shows it's the operator-side name for the zone.

**Standing copy bans** (grep-able): "so close", "almost", "nearly won",
"win it back", "you're due", "on fire", "hot streak", "don't miss out",
"limited time", "beat the odds", "risk-free", any countdown not tied to a real
event, "bet again", "rebet", "recover".

---

## 7 · DERIVED ASK PROPOSALS (for qc/ASKS.md — proposals only, file untouched)

P52-01 · Slip footer carries a persistent one-line session readout
(`Session 47 min · Net −24.00`) on every bet-slip state — pairs time AND money
per [E10/E18]; verify at 390 and 1440.

P52-02 · "Safer gambling" entry reachable ≤2 taps from slip, live page, and
top-bar; opens limits sheet with four complete rungs (deposit/loss limits,
reality-check interval, time-out ladder 24h/1w/1m, self-exclusion) per
[E12/E13].

P52-03 · Reality-check toast: real interval trigger, shows elapsed time + net
position + session spend, requires acknowledgement to dismiss (RTS 13B pattern
[E12]); triggerable from the scenario dock for judging.

P52-04 · Fix the LDW integrity bugs before polish: lost bets must not show
"Returned 43.50" (`MyBets.tsx:47-55`); sub-stake cash-outs get a distinct
neutral `cashedout` result with `net +/−`, not green `won` (`bets.ts:84`) —
[Dixon E7 / UKGC E11].

P52-05 · Settled-lost copy audit: outcome + reason + net delta only; ban
proximity-to-win vocabulary list (§6) across all strings — [E1/E6].

P52-06 · No post-loss promoted action: after a settle-loss, the next screen
offers no suggested bet, no re-bet CTA, no deposit prompt — [E3/E13/E16].

P52-07 · Every odds cell shows implied probability on long-press/info (2.50 =
40%) or as slip footnote — informs the chance/skill boundary — [E2/R3].

P52-08 · Cash-out presented as neutral live quote: same visual weight as other
actions, honest `est. live value` label, lockstep suspension + reason when
unavailable, never pulsing urgency — [E15].

P52-09 · Confirm window keeps honest latency: "Placing bet…" + visible
~2s countdown; no fake progress, no premature success — trust beat, per
judge-dna sequencing discipline.

P52-10 · Win celebration capped: soft accent glow ≤3s, receipt + HB-### ref, no
confetti/streak fanfare — [judge-dna §6 / Schüll zone refusal].

P52-11 · Streak surfaces show record only: form (W/D/L) and My bets history
carry zero momentum narration or "hot" badges — [E4/E5].

P52-12 · Quick-stake chips anchored modest (5/10/25), MAX demoted and guarded;
no default stake pre-fill above the minimum chip — [R2/E16 high-defaults].

P52-13 · All countdowns on screen must map to a real event (kickoff, price
suspension, reality-check interval); add a code rule: no countdown component
accepts a marketing prop — [R2/E16].

P52-14 · Currency is real USDT everywhere incl. mobile balance pill; grep for
"points/credits/coins" = 0 hits — [E16/R1].

P52-15 · No autoplay/queue-bet semantics anywhere in flows: each bet is
individually committed; cash-out likewise a discrete decision — [E11].

P52-16 · Deposit flow never opens from a loss/settle trigger and carries no
urgency styling; withdrawal/cash-out paths equal-or-lower friction than
deposit in all demoed states — [R2 sludge-asymmetry / reverse-withdrawal
spirit, E11].

P52-17 · 18+ marker + safer-gambling link present on first viewport and on
receipt screens — trust signal the judge can clock in 5s — [E13].

P52-18 · "Insufficient funds" state designed as honest stop (balance, shortfall,
calm actions: adjust stake / deposit / close) — not an upsell moment — [E16].

P52-19 · Insufficient-funds + suspension + failed-bet + reality-check states all
demoable from the scenario dock so the judge can trigger RG surfaces on demand —
craft signal per judge-dna (failure paths are first-class).

P52-20 · Copy pass names real costs where they exist ("prices may move before
confirmation", "cash-out value is estimated") — honest-friction copy per
judge-dna §9.

P52-21 · Session line also appears on Live/Match money surfaces (not only slip)
so time+net stays in view at the highest-frequency screens — in-play is the
highest-risk surface [E12 req5/E15].

P52-22 · Live-feed motion budget: odds flashes on real deltas only, batched
>2/s, never on first paint; nothing stochastic invented by chrome — variable
schedule stays honest [E8].

P52-23 · Empty states honest ("Nothing live right now") + real next-kickoff
countdown; never fabricated fixtures or filler urgency to keep the loop alive —
exit cues per Schüll refusal.

P52-24 · Submission/form copy states the stance in one line for the judge:
"designed to inform every decision and make none for the player" + cites the
RG surface set — converts ethics from compliance into the entry's differentiator.

---

*Confidence: HIGH on all [R] sources (read), MEDIUM-HIGH on [E] excerpts
(abstracts/verbatim blocks from official pages). UNKNOWN items listed in the
access log are not relied upon for any claim. No fabricated quotes; all quoted
lines appear in the cited source text as returned.*
