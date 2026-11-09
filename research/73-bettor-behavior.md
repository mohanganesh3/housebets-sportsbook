# 73 — Bettor behavior evidence layer (live-sourced; extends, does not repeat, 52)

Research agent output for the Housebets contest entry. Scope: what published
research says about how bettors actually behave and perceive in-play interfaces.
Files 13 and 52 already cover: Schüll's zone, near-miss/LDW, illusion of control,
variable-ratio, sunk cost, hot-hand, UKGC RTS 13/LCCP, GamCare/GambleAware tools,
dark-pattern taxonomies, Auer & Griffiths feedback studies, López-Gonzalez &
Griffiths cash-out theory. This file fills the gaps: time pressure, odds
movement/salience, odds-format comprehension, market suspension, cash-out usage
data, trust signals, reality-check effectiveness (with honest nulls), sports-
specific loss chasing, mobile ergonomics, information density — plus the BIT
design frameworks. Mechanisms already mapped in 52 are cited back as `[52]` and
not re-argued.

**Resolved flag:** file 52's "UNVERIFIED — cash-out availability ↑ stakes up to
35%, Psychol. Sci. 2024" is now CONFIRMED: Bennett, Ludvig, Walasek et al. (2024),
*Psychological Science* — two experiments, N=240, bets 34.8% larger
(within-subjects) / 23.6% (between-subjects) when cash-out was available.
https://wrap.warwick.ac.uk/id/eprint/186229/7/bennett-et-al-2024-people-place-larger-bets-when-risky-choices-provide-a-postbet-option-to-cash-out.pdf

Access notes: gamblingcommission.gov.uk refuses webfetch (UKGC items = search
excerpts of official pages, verbatim claims only). ScienceDirect and Wiley block
fetches (abstract-level citations). BIT's audit PDF is binary; findings taken
from BIT's own HTML pages summarizing it. Items named but unread = UNKNOWN.

---

## Findings

| # | Finding | Source | Strength |
|---|---------|--------|----------|
| F1 | In-play decisions are heuristic, not analytic: an experimental (French-lab) study found bettors used more heuristic than analytical processes under time constraints; d'Astous & Di Gaspero also show heuristic/analytic processes mediate experience→monetary performance | d'Astous & Di Gaspero, *J Gambl Stud* 31:455–470 (2015) https://doi.org/10.1007/s10899-013-9438-x; reported as "experimental French study" in Gainsbury, Abarbanel & Blaszczynski, *Front Psychiatry* 11:574884 (2020) https://doi.org/10.3389/fpsyt.2020.574884 | MODERATE |
| F2 | Time pressure degrades risky choice: CE task — pressure ↑ risk attractiveness for gains; in loss domain it cut probability discriminability and produced "severe risk-seeking" | Young, Goodie, Hall & Wu, *OBHDP* 118(2):179–188 (2012) https://pmc.ncbi.nlm.nih.gov/articles/PMC3375992/ | MODERATE (lab, gambles not sports) |
| F3 | 7-second decisions vs 7/20s delay, N>1,700, 3 countries: time pressure increased risk aversion for gains and risk-taking for losses (amplified prospect-theory reflection effect; loss-domain effect significant in all 4 experiments). A forced delay reduced measurement noise | Kirchler, Andersson, Bonn, Johannesson, Sørensen, Stefan, Tinghög & Västfjäll, *J Risk Uncertain* 54(1):37–59 (2017) https://pmc.ncbi.nlm.nih.gov/articles/PMC5486903/ | STRONG (large N, replicated) |
| F4 | Real market consequence of info-load + time pressure: in-play Betfair mispricing ~10× higher than pre-match (avg 5.3% discrepancy between equivalent win/set markets); bettors periodically neglect the peripheral market — processing constraints bind under live information flow | Brown, *Economic Journal* 124(575):245–277 (2014) https://academic.oup.com/ej/article/124/575/245/5076975 + RES brief https://res.org.uk/mediabriefing/mispriced-bets-on-tennis-matches/ | STRONG (field data) |
| F5 | In-play bettors are a risk-elevated population: N=501 AU — 34% bet in-play, higher PGSI, severity predicting in-play use (cross-sectional). N=920 Ontario — in-play bettors: higher harms, more negative/positive urgency, more emotion dysregulation | Gainsbury, Abarbanel & Blaszczynski 2020 (above); Vieira, Coelho, Snaychuk, Parmar, Keough & Kim, *J Behav Addict* 12(2):547–556 (2023) https://pmc.ncbi.nlm.nih.gov/articles/PMC10316160/ | STRONG assoc., causality unproven |
| F6 | In-play is used to regulate emotion: urgency-traits amplify emotion-regulation motives → in-play frequency; authors suggest mandatory play breaks may interrupt impulsive episodes | "This time with feeling: In-play sports betting as a vehicle for emotion regulation", *J Behav Addict* (2023) https://pubmed.ncbi.nlm.nih.gov/37824234/ — authors not in returned text (Keough/Kim group — name UNKNOWN beyond abstract) | MODERATE (3 pooled surveys) |
| F7 | Odds-movement salience changes real behavior: adding a continually-updated cash-out quote (running P/L salience) increased the disposition effect — punters sold profitable bets earlier | Brown & Yang, *Southern Economic Journal* (2017) https://onlinelibrary.wiley.com/doi/10.1002/soej.12202 (abstract) | MODERATE (market data, one study) |
| F8 | Bettors over-react to price trends: exchange data (6,058 markets, 8.4M price points) — odds trends systematically distort implied-probability accuracy; consistent with overreaction to movement | "Improving prediction market forecasts by detecting and correcting possible over-reaction to price movements", Southampton eprint https://eprints.soton.ac.uk/421405/ — authors not in returned text (UNKNOWN) | MODERATE |
| F9 | American odds mislead: RCT N>4,000 — American-odds arm chose riskier bets significantly more; estimated 53% win chance for a 4%-implied parlay; adding implied probability reduced risky-bet selections; default odds format matters | Behavioural Insights Team + Ohio Casino Control Commission, Hallsworth & Paul (2025) https://www.bi.team/blogs/american-odds-lead-to-riskier-sports-betting/; prereg N=4,300 https://doi.org/10.17605/osf.io/78u4q | STRONG (large RCT; early report) |
| F10 | Bettors can't see the margin: experienced bettors (N=186) calibrated on odds→frequency BUT unable to consciously adjust for different bookmaker margins | Andersson & Nilsson, *J Behav Decis Making* 28(4):331–346 (2015) https://doi.org/10.1002/bdm.1851 | MODERATE |
| F11 | Odds comprehension is low & format-sensitive: N=5,311 UK — only 11% answered all objective comprehension correctly; salient £-terms "loss-volatility" framing best (+3pp correct, −7pp chose to play); industry-standard RTP *reduced* comprehension (salient RTP: 32% mistakenly believed 93% of players win); PGSI 4+ scored 2% all-correct. Recommendation: remove RTP from RTS 3; mandate natural frequencies + loss framing | BIT, "Comprehension of gambling odds" (May 2022) https://www.bi.team/wp-content/uploads/2022/05/2022-05-Comprehension-of-gambling-odds-BIT-experimental-results.pdf + blog https://www.bi.team/blogs/different-frames-fewer-games-how-betting-behaviour-is-shaped-by-the-way-odds-information-is-presented/ | STRONG |
| F12 | Cash-out usage & profile: 51.8% of in-play bettors (N=224, Ontario) used cash-out; users higher on depression/anxiety/stress, problem substance use, money motives; reasons: immediate money access, cutting losses, "felt less risky" | Sinclair, Clark, Wohl, Keough & Kim, *Addiction* (2024) https://www.sciencedirect.com/science/article/pii/S0306460324000571 (abstract; page 403) | MODERATE (cross-sectional) |
| F13 | Cash-out availability inflates stakes — up to 35%; effect driven by cash-out propensity on deteriorating odds (Ludvig: cash-out "creates a perception of increased control… encourages higher risk-taking") | Bennett, Ludvig, Walasek et al., *Psychological Science* (2024) https://wrap.warwick.ac.uk/id/eprint/186229/7/bennett-et-al-2024-people-place-larger-bets-when-risky-choices-provide-a-postbet-option-to-cash-out.pdf | STRONG (2 experiments) |
| F14 | Nuance: instant cash-out frequency *negatively* correlated with PGSI and impulsivity (dysfunctional impulsivity, urgency, sensation-seeking); cash-out may appeal most to less-impulsive bettors — harm mechanism is availability+framing, not just who clicks | Ngieng, Albertella, Hayes, Verdejo-Garcia, Walasek, Ludvig & Bennett, *Addictive Behaviors Reports* (2025) https://pmc.ncbi.nlm.nih.gov/articles/PMC12702411/ | MODERATE (N=145 lab task) |
| F15 | Higher-harm bettors use live features more: case-control 85 PGSI5+ vs 84 matched — higher group used in-play & instant cash-out more often, streamed more in-app live video, deposited more to qualify for offers; supports Parke & Parke (2019) "Online Sports Betting Loop" theory (frictionless recycling of winnings, instant deposits, cash-out, withdrawal reversal) | Farrell, Bennett & Myles, *J Behav Addict* 15(1):509–514 (2026) https://pmc.ncbi.nlm.nih.gov/articles/PMC13132358/ | MODERATE-STRONG (matched case-control) |
| F16 | Cash-out offers carry a built-in bookmaker margin — frequent users systematically get below-fair value (secondary: cited in F14's introduction) | Newall & Cortis (2019), via Ngieng et al. intro — original not opened (UNKNOWN detail beyond this) | MODERATE (secondary) |
| F17 | Reality checks/pop-ups work modestly in aggregate: meta-analysis 18 studies — g≈0.41 (cognitions), g≈0.51 (behavior), short-term, high heterogeneity | Bjørseth, Simensen, Bjørnethun, Griffiths, Erevik, Leino & Pallesen, *Front Psychiatry* 11:601800 (2021) https://pmc.ncbi.nlm.nih.gov/articles/PMC7868407/ | STRONG (meta) |
| F18 | BUT the big field result is a null: 4 behaviorally-informed pop-ups (hourly reality check, healthy-gambling attitudes, high-activity warning, fortnightly activity statement), 14,153 players, 2 operators — none changed amount bet, time, or bet count, incl. top-75th-percentile players. Cause: attention-saturated site environment swallows periodic unobtrusive info | Danish Competition & Consumer Authority for the Danish Gambling Authority (Dec 2023) https://en.kfst.dk/media/rykbo5rn/20231219-do-behaviorally-informed-pop-up-messages-curb-problematic-gambling-behavior.pdf | STRONG (field experiment) |
| F19 | Operator-data field test: after 1,000 consecutive slot plays, a pop-up led 9× more players to stop (45 vs 5 sessions of ~4,200 reaching that point) — real but small absolute effect | Auer, Malischnig & Griffiths, *J Gambling Issues* 29 (2014) https://doi.org/10.4309/jgi.2014.29.3 | STRONG (N≈400k sessions) |
| F20 | Pop-ups irritate: semi-naturalistic RCT — limited behavioral effect; self-appraisal pop-ups ↓ time spent only for sport/horse bettors; a majority of all participants were "disturbed and irritated" | Caillon, Grall-Bronnec, Saillard, Leboucher, Péré & Challet-Bouju, *Front Psychiatry* 12:711431 (2021) https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2021.711431/full | MODERATE |
| F21 | Sports-betting loss chasing is real but multidimensional: N=12,992 bwin records — chasing expresses in bet size, odds, and time-between-bets; only bet-size chasing predicted mounting losses (bivariate). N=36,331 replication: optimized thresholds on size & odds predicted loss trajectory; daily loss accumulation best predicts harm incl. self-exclusion | Edson, Louderback, Tom, McCullock & LaPlante, *Int Gambl Stud* 24(2):306–324 (2024) https://doi.org/10.1080/14459795.2023.2276741; Edson et al., *J Gambl Stud* (2025) https://link.springer.com/article/10.1007/s10899-025-10391-1 + PubMed 41547048 | STRONG (operator data) |
| F22 | The measurable chase signature is deposit-after-loss: across 5 candidate metrics on N=16,771 casino accounts, "frequent session depositing" best operationalized chasing | Auer & Griffiths, player-tracking study https://pmc.ncbi.nlm.nih.gov/articles/PMC10628006/ (2023/24) | STRONG |
| F23 | Smartphone = the harm platform: grounded theory (N=33, 18–29) — instant access anywhere/anytime → impulsive/spontaneous betting, riskier longer-odds bets, chasing losses, social-pressure betting. EMA (267 users, 1,378 sessions): sessions prioritizing anywhere-anytime, privacy, promo access → more short-term harm; only smartphone combines all three | Hing, Thorne, Russell, Newall, Lole, Rockloff, Browne, Greer & Tulloch, *Int J Ment Health Addiction* 22:1413–1432 (2024) https://link.springer.com/article/10.1007/s11469-022-00933-8; EMA https://pmc.ncbi.nlm.nih.gov/articles/PMC10786227/ | MODERATE-STRONG |
| F24 | Majority usage + grip reality: 59.6% of Australian sports bettors bet via smartphone (Hing et al. 2021, cited in F23). Observational ergonomics: 49% one-handed grip, thumbs drive ~75% of phone interactions | Hoober, UXmatters observational study N=1,333 (2013) https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php | MODERATE (industry field obs.) |
| F25 | Inducements drive impulse in-play: N=1,813 — wagering-inducement uptake predicted impulse in-play betting, strongest among problem gamblers | Hing, Russell, Lamont & Vitartas, *J Gambl Stud* (2018) https://pmc.ncbi.nlm.nih.gov/articles/PMC6035013/ | STRONG survey |
| F26 | Trust: regulatory visibility is the #1 trust driver; quick withdrawals & gambling-management tools are core expectations (69% agreed tools are offered) | UK Gambling Commission, "Exploring drivers of consumer trust in gambling" https://www.gamblingcommission.gov.uk/statistics-and-research/publication/exploring-drivers-of-consumer-trust-in-gambling (search excerpt; direct fetch blocked) | STRONG (regulator research) |
| F27 | Regulatory cues must be prominent: DCE N=195 — certification cues worked harder when users saw high peer-usage social cues and when baseline trust was low | Teichert, Graf, Swanton & Gainsbury, *Int Gambl Stud* 21(3):480–497 (2021) https://doi.org/10.1080/14459795.2021.1921011 | MODERATE (students, hypothetical) |
| F28 | Trust is assessed design-first: three-stage web-trust model — rapid heuristic judgment on design quality, then content integrity | Sillence, Briggs, Harris & Fishwick model as applied in Griffiths, "Online trust and Internet gambling" (NTU eprint) http://irep.ntu.ac.uk/id/eprint/19840/1/200216_6611%20Griffiths%20Publisher.pdf | MODERATE (conceptual) |
| F29 | Market suspension perception: NO academic study on bettor perception of suspensions found — gap honestly noted. UKGC guidance: in-play requires "fairness and openness"; operators revise prices, suspend markets, settle bets on real-time data; "accurate and timely information is vital to both operators and customers". Trade practice: unexplained suspensions frustrate more than suspension itself; communicating reason/duration reduces friction | UKGC, "In-play or in-running betting" https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/in-play-or-in-running-betting (excerpt only); Gamblitude trade glossary https://gamblitude.ai/resources/igaming-glossary/market-suspension/ (LOW) | LOW-MODERATE |
| F30 | Information density vs decision quality: larger choice sets → shallower sampling per option and "search-amplified risk" (rare events overweighted) — riskier choices with more options, not better-informed ones | "Information overload or search-amplified risk? Set size and order effects on decisions from experience", *Psychon Bull Rev* (2013) https://doi.org/10.3758/s13423-013-0422-3 — authors not in returned text (UNKNOWN) | MODERATE |

---

## Regulator/design guidance rules

Sources opened: UKGC in-play guidance (excerpt), BIT/GPRU Behavioural Risk Audit
(July 2022) + five recommendations (Nov 2022), Revealing Reality "An Integrated
Approach to Safer Gambling" (March 2021), Danish DCCA experiment (2023), UKGC
consumer-trust research. (RTS 13/LCCP rules already in `[52]` — not repeated.)

**UKGC in-play betting guidance** (search excerpt of official page):
- Fairness & openness required: prices continuously revised; markets suspended
  and bets settled on real-time data; customers rely on timely information to
  avoid competitive disadvantage → suspend visibly, give the reason, keep the
  state legible in the same frame.
- Licensees must capture patterns of play (frequency, time, money) for in-play
  specifically → the data model should already know what the player sees.

**BIT/GPRU Behavioural Risk Audit** of 10 top UK operators (Jul 2022,
https://www.bi.team/publications/using-a-behavioural-risk-audit-to-identify-harmful-design-features-on-gambling-websites/
+ https://www.bi.team/press-releases/gambling-operators-must-do-more-to-protect-the-welfare-of-their-customers/):
- Audited operators: setting a deposit limit took ~3 more actions than placing a
  bet; account closure slower than opening; minimum balances gated withdrawals;
  no receipts; no time/money summaries; defaulted stakes/quick-deposits above
  minimum; deposit-limit dropdowns opening at £10,000; scarcity/countdown/flashing
  prompts; prompt to bet again immediately after placing; one operator showed
  "Won £0.10" on a losing outcome (live LDW). Changing the limit dropdown to free
  text "almost halved" the limits users set — i.e., container defaults are bets
  the operator makes on the player's behalf.
- **Five immediate-action recommendations:** (1) one-click marketing unsubscribe,
  no auto-enrolment; (2) receipts/account-activity alerts as normal practice;
  (3) gambling-management tools easy to locate, evidence-based, minimal steps,
  no ads around them; (4) close an account as easily as open one ("immortal
  accounts" unacceptable); (5) operators test what works and share results.

**Revealing Reality — An Integrated Approach to Safer Gambling** (Mar 2021,
https://revealingreality.co.uk/wp-content/uploads/2021/03/Integrated-Safer-Gambling_Final_020321.pdf):
- Safer gambling must be "the default way to play at all times" — preventative,
  not triggered only after harm indicators fire.
- Most messages target people who don't self-identify as "problem gamblers" and
  get discounted → design controls for *everyone* in-flow, not warning-signs
  messaging after the fact.

**Danish DCCA (2023)** — periodic pop-ups alone failed at scale → ambient,
always-on session information outperforms interrupted messaging; a check that
must be dismissed still beats silent absence, but is not sufficient.

---

## Ethical use list — apply the finding to *inform* the player

1. **Implied probability next to every price** (F9, F10): bettors misread payout
   formats and can't adjust for margin — `2.50 · 40%` makes the chance part
   legible at the moment of choice.
2. **Loss-framed, natural-frequency stake context** (F11): "£s + what you could
   lose + volatility" was the only framing that improved comprehension; borrow it
   for the slip — stake in currency, potential return AND net-if-it-loses.
3. **Ambient session line, not interrupting modal** (F17–F20): meta effect is
   real but modest; field null + irritation data → persistent elapsed-time + net
   position in the decision surface (always visible, never blocking), with an
   acknowledge-to-dismiss check on real intervals as the RTS-13B complement.
4. **Cash-out as a quoted, suspending market — with its margin honest** (F12–F16):
   show `est. live value`, suspend it with the same reason-dim as the market,
   never pulse it; knowing availability itself inflates stakes means the offer
   deserves *less* visual urgency, not more.
5. **Odds movement as market fact, direction + delta, not momentum** (F7, F8):
   `2.10 → 2.30` informs; "steam" or streak narration exploits documented
   overreaction to price trends.
6. **Regulatory/RG visibility as trust architecture** (F26–F28): licence +
   safer-gambling entry visible in the same frames where money moves; players
   judge design first — visible tools are a trust signal even unused.
7. **Suspension as a transparency beat** (F29): padlock + reason + re-open state
   in-frame; unexplained suspension is the trust-destructive version.
8. **One-handed ergonomics** (F24): slip, confirm, cash-out and safer-gambling
   entry in thumb reach; ~half of real use is one-thumb.
9. **Density by progressive disclosure** (F4, F30): in-play bettors already drop
   peripheral markets under information load — rank markets, don't tile them all;
   more simultaneous options empirically produced riskier, shallower choices.
10. **Post-loss friction where the evidence shows chasing** (F21, F22): bet-size
    escalation and session-depositing are the operator-data signatures of chasing
    — so after a settle-loss: no promoted next bet, no deposit shortcut, the
    session line carries the number.

## Refuse list — mechanisms we deliberately do not exploit

1. Countdown/urgency styling on cash-out or on bet windows (F13: availability
   alone already inflates stakes ~35%; adding pressure is the exploit, not the
   feature). `[52 §4]`
2. Near-miss or proximity-to-win narration on settled losses; no "almost" copy —
   sports near-miss maps to lost-by-one-leg accumulators `[52 §1.1]`.
3. LDW-style treatment: no celebratory framing of sub-stake returns or below-
   stake cash-outs — the BIT audit caught a live "Won £0.10" on a loss in the
   wild; UKGC banned the pattern for slots `[52 E7/E11]`.
4. Momentum/luck narration of odds movement or bettor streaks (F7, F8; Xu &
   Harvey `[52 E5]`) — overreaction to price trends is documented; don't feed it.
5. Forced-pace mechanics: no turbo, autoplay, queued next-bets, or one-tap
   re-bet-after-loss (F1–F3 show time pressure itself degrades choice quality;
   F23's loop literature shows the platform harm).
6. Popularity/scarcity claims and bet-again prompts post-placement (BIT audit
   findings; F25 inducement→impulse evidence).
7. Burying RG tools or decorating them as second-class (F26–F27: visible tools
   are trust; BIT rec #3; hidden tools are a named dark pattern `[52 §4]`).
8. Suspension without reason or duration (F29) — opacity is the complained-about
   part, not the pause.
9. Default stakes/amounts above the minimum; dropdown-anchored high limits
   (BIT audit: defaults are operator bets on the player).
10. Inducements engineered into the bet flow — bonus-framed prompts at decision
    points (F25; Farrell F15: offer-triggered instant deposits skew to
    higher-harm players).

---

## Derived requirements

1. Every odds cell exposes implied probability (on-cell or slip footnote) —
   [evidence: F9, F10].
2. Bet slip shows stake, potential return, and net-if-lost in real currency —
   [evidence: F11] + `[52]`.
3. Slip footer carries persistent `Session mm min · Net ±x.xx` — ambient, not a
   modal — [evidence: F17–F20], [inference: ambient placement choice].
4. Reality-check toast on real interval, must be acknowledged to dismiss, shows
   time + net + spend — [evidence: F17 + RTS 13B `[52]`], [inference: specific
   copy].
5. Odds movement rendered as direction + delta only (`2.10 → 2.30`, glyph+colour,
   never colour alone); no trend narration — [evidence: F7, F8], [inference:
   narration ban].
6. Suspended market/bet/cash-out: dim + padlock + reason + resume-state in the
   same frame — [evidence: F29 UKGC fairness rule], [inference: padlock pattern].
7. Cash-out presented as a neutral quote (`est. live value`), same visual weight
   as other actions, no pulsing; lockstep suspension with market — [evidence:
   F12–F15], design in `[52 P52-08]`.
8. No countdown pressure on bet confirm or cash-out; only real clocks (kickoff,
   real suspension) — [evidence: F13, BIT audit], [inference].
9. After a settle-loss: no suggested next bet, no re-bet CTA, no deposit prompt;
   session line remains — [evidence: F21, F22, F25].
10. Deposit flow carries no urgency and is never triggered on loss or low-balance
    events — [evidence: F22, BIT audit asymmetric-friction finding].
11. Safer-gambling entry ≤2 taps from slip/live/top-bar; four rungs complete
    (limits, reality check, time-out ladder, self-exclusion) — [evidence: F26,
    BIT rec #3] + `[52 E12/E13]`.
12. Mobile layout: primary bet path, confirm, cash-out and safer-gambling entry
    within thumb reach; 44px targets — [evidence: F24], [inference: px value is
    platform convention, not the study].
13. Live page ranks a shortlist of markets rather than tiling everything;
    depth opens on demand — [evidence: F4, F30], [inference: specific cap].
14. Quick-stake chips anchor at the modest end (5/10/25); no default stake or
    deposit above minimum; limit-setting inputs are free-text, not dropdowns
    opening at high values — [evidence: BIT audit dropdown finding].
15. Every transaction gets a receipt/ref (HB-###); account-activity visibility
    is standard — [evidence: BIT rec #2, F26].
16. Wins celebrated quietly (receipt + ref, ≤3s glow); losses stated factually
    with net delta — no proximity vocabulary — [evidence: BIT audit live-LDW
    finding + `[52 §1.1]`], [inference: 3s].
17. Suspension copy states reason and that bets stand unless rules say otherwise;
    never styled as alarm or scarcity — [evidence: F29], [inference].
18. No marketing/promo surfaces adjacent to money decisions; inducements kept
    out of the bet flow entirely — [evidence: F25, BIT rec #1].
19. Time-out ladder 24h/1w/1m + self-exclusion reachable from the same sheet as
    limits — [evidence: `[52 E12 LCCP 3.3.4]`; Revealing Reality default-safety
    frame].
20. Internal success metric is decision quality, not session length — say so in
    submission copy — [inference from F15 loop theory + `[52]` Schüll].

---

## UNKNOWN / not accessed (name them, do not quote)

- Sinclair, Clark, Wohl, Keough & Kim 2024 (*Addiction*) — ScienceDirect 403;
  abstract-level only. · Andersen/… odds-disclosure 1997 (*JPP&M*) — DOI page
  unread; format findings used via BIT instead. · Parke & Parke (2019) loop paper
  — read only via Farrell 2026/Hing 2024 intros. · Newall & Cortis (2019)
  cash-out margin — secondary cite only. · Southampton eprint on price-trend
  overreaction (F8) and *Psychon Bull Rev* search-amplified-risk (F30) — authors
  not in returned text. · BIT audit full PDF — binary; HTML summaries used.
· UKGC pages — fetch-blocked; excerpts only.
