# B2 — UX canon II: decision/persuasion books (wave B)

Sources: Eyal *Hooked* (ethical subset), Kahneman *TF&S*, Ariely *Predictably
Irrational*, Thaler/Sunstein *Nudge* (incl. Final Ed. "sludge"), Anderson *Seductive
Interaction Design*, Walter *Designing for Emotion*, peak-end literature,
Iyengar/Scheibehenne choice research. (web_search down — canonical recall, flagged.)

## Highest-leverage rules → sportsbook surface

- **[Nudge] defaults are implicit recommendations** → three defaults define our
  consent posture: `oddsPref:"ask"` (NEVER "any" — pre-ticked auto-accept is an
  industry dark pattern), filters default "All", stake defaults empty. Guard in code.
- **[Ariely] arbitrary coherence — the chip set IS the nudge** → 5/10/25 anchors
  modest; a `MAX` chip labeled that way injects "go big" urgency. **Replace MAX with
  plain ascending values** or drop it.
- **[Kahneman] loss aversion ~2:1** → show balance AT the moment of stake entry +
  "balance after bet"; never hide balance (that's the dark version).
- **[Kahneman] framing: disambiguate money labels** → `Returns 21.00` + sub
  `Profit +11.00 (incl. 10.00 stake)` — payout/profit ambiguity is a real-book trick
  we must kill.
- **[Kahneman] denominator neglect / WYSIATI** → implied-probability mapping on
  odds: `2.00 ≈ 50% implied` (Nudge "understand mappings").
- **[Kahneman] reference dependence on cash-out** → below-stake CO labeled green
  "+7.50" is a loss disguised as a win → `Cash out 7.50 · stake 10.00`, neutral.
- **[Nudge] "expect error"** → unusual-stake guard (e.g. >25% balance → confirm
  sheet) — flagship responsible-design signal for a casino judging panel.
- **[Peak-end] three designed peaks budget** → goal-flash, place-confirm check-draw,
  follow-star pop. Delight degrades to noise if ubiquitous. Failures end on
  RECOVERY (reason + "nothing was placed" + retry) — recovery is the remembered end.
- **[Hooked] investment phase** → follows/favorites = stored value; the cleanest
  ethical retention loop. Post-bet one-time "Follow Arsenal?" offer; never gated.
- **[Hooked ethics] never** → streaks/volume goals on betting, fake tickers
  ("User*** won 2,400!" — availability-heuristic exploit; F5 ticker ships only with
  REAL session data or not at all), "we miss you" churn-bait, loss→re-engagement.
- **[Sludge audit] exit symmetry** → remove leg / clear slip / unfollow / dismiss
  banner = one tap, no confirm, no confirm-shaming copy ("No thanks, I hate winning"
  is banned vocabulary).
- **[Anderson/Walter] persona** → "The House" voice: confident, patient, precise —
  "The house is patient" is the reference line. Ban exclamation marks on money
  events; no confetti on money events.
- **[Anderson] SDT critique** → no achievement mechanics on wager volume; mastery =
  market literacy (counts, implied probability).
- **[Iyengar→Scheibehenne]** categorization beats raw option-reduction for the 85+
  market problem (mean choice-overload effect is small; grouping is the lever).

## Derived task highlights (§R.B2 in master checklist)

Remove MAX chip; Returns+Profit disambiguation; implied-probability hover;
unusual-stake guard; session line; CO confirm + honesty; settled net P/L; post-bet
follow offer; receipt records auto-accepted consent (`2.10 → 2.30 accepted`);
EmptyState icon-prop bug (all empties render Lock); market-order honesty note;
fake-anchor ban (strike-through only for real prevPrice); tick-cadence honesty;
live-bet delay microcopy; sludge-symmetry verification; persona copy sweep;
dark-pattern audit list into SUBMISSION.md ("what we deliberately didn't build").

Confidence: book content HIGH (canonical, named experiments recalled); code
grounding HIGH (every task file:line verified); web verification FAILED — flagged
attributions to re-verify: IKEA-effect source, Scheibehenne citation, "sludge" is
Final Edition not original.
