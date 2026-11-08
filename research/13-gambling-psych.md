# B3 — Gambling psychology + RG standards (wave B)

Sources: Schüll *Addiction by Design*, Griffiths structural-characteristics research,
Walker *The Psychology of Gambling*, Clark 2009 near-miss fMRI, Dixon LDW studies,
Kassinove & Schare, UKGC LCCP/RTS-14 family, GamCare, Germany/Australia in-play rules.
(web_search was down — compiled from canon + codebase audit; citations flagged.)

## The frame: "exploit honestly vs. avoid"

Schüll's "machine zone" is manufactured by four registers: temporal (resolution-cycle
speed), ergonomic (perfect contingency — every action instantly answered), sensory
(cocooning), architectural (no exit cues). What translates honestly to a sportsbook:
**fast action→feedback, persistent slip, anticipation in the confirm window, visible
causality.** What must not be copied: engineered dissociation, hidden elapsed
time/spend, near-miss programming, LDW celebrations, play-to-extinction.

Griffiths: in-play is structurally riskier because **event frequency** + time pressure.
Counterweight that measurably works (Auer & Griffiths): point-of-play personal
messaging — reality checks showing time + net position reduce subsequent spend.

## TABLE A — mechanisms to adapt honestly

| Mechanism | Sportsbook surface | Status |
|---|---|---|
| Tight action→feedback loop | tap cell → slip → place <100ms | shipped |
| Anticipation in confirm window | "Confirming at live odds…" delay | shipped; upgrade to visible countdown |
| Rising event frequency | live ticks, goal→reprice cascade | shipped; pair with session info as brake |
| Real control (not illusion) | follows, Ask/Higher/Any, cash-out | shipped — real choices |
| Anchoring | quick-stake chips 5/10/25 anchor modest | shipped; MAX chip = flag (see B2) |
| Endowment/commitment | persistent slip, HB-### receipts | shipped |
| Goal-gradient | kickoff countdowns | partial — need ticking `Starts in mm:ss` |
| Honest urgency | real clocks only; never fake expiries | verify |
| Suspension as trust moment | padlock + reason | shipped on match page; propagate to slip+CO |
| Variable-ratio texture | non-uniform tick cadence, real deltas only | shipped |
| Peak-end | check-draw + receipt ceremony | shipped |
| Bet refs / disputability | HB-### | shipped |

## TABLE B — mechanisms to AVOID + what we do instead

| Dark pattern | Instead |
|---|---|
| LDW — celebrating sub-stake returns (UKGC-banned for slots) | **BUG FOUND:** lost bets render "Returned 43.50" (potential!) in `MyBets.tsx:47-55`; cash-outs marked `result:"won"` green even below stake in `bets.ts:84` → new `cashedout` state, neutral color, net delta |
| Near-miss framing ("so close") | factual settle notes only; copy audit bans the vocabulary |
| Fake urgency/countdowns | real clocks only (kickoff, suspension) |
| Forced bet-loop speed | no turbo, no autoplay, no one-tap rebet-after-loss |
| Obscured suspension | padlock+dim same-frame + reason propagated to slip leg + CO lock |
| Hidden cash-out margin/pressure | value on bet card; lockstep suspension + reason; "est. live value" label |
| Balance abstraction ("credits") | real USDT, live balance model, visible on mobile too |
| Removed exit cues | session clock + net position in slip footer; "Safer gambling" entry ≤2 taps |
| Stake-inflation nudges | muted modest chips; min/max pre-entry hints; unusual-stake guard |
| Pre-ticked odds acceptance | default `Ask` — guarded as the app's most important default |
| Opaque acceptance delay | visible countdown ("Confirming… ~2s") |
| Promo-cluttered first viewport | editorial hero only, promos are out of scope anyway |
| Hidden self-exclusion | limits sheet: deposit/loss/time-out/self-exclusion demo |
| "Cashed out" shown as Won | distinct `cashedout` result, neutral cyan, `net +/−` |

## Key derived tasks (full list in `10-master-asks.md` §R.B3)

P0 integrity bugs → new `cashedout` result type; lost-bet "Returned 0.00 · Net −stake";
reason propagation to slip leg + CO lock; settled net P/L.
P1 RG surfaces → session line + net position in slip footer; "Set limits" micro-line;
reality-check toast; safer-gambling sheet; live balance; insufficient-funds state;
min/max hints; implied-probability footnote.
P2 polish → visible confirm countdown; disclaimers wherever live scores drive money
decisions; real kickoff countdowns that flip to LIVE; copy audit; RG states added to
the demo scenario dock so judges can trigger them.

Confidence: codebase findings HIGH (file:line verified); literature MEDIUM-HIGH on
core claims; exact regulation numbers flagged for re-verification before citation in
submission copy.
