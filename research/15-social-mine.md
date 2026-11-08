# B5 — Social sentiment: Twitter/X + YouTube + TikTok (wave B)

Sources: repo-verified research + established social-sentiment patterns.
(web_search down 11/11 — genre-level, no fabricated posts; flagged for re-verification.)

## What social says (genre-level)

- Cash-out suspended at the wanted moment = THE most viral sportsbook rage genre
  (bet365/FanDuel/Paddy Power storms weekly during big matches); unexplained CO
  suspension breeds "rigged" suspicion; unexplained value drops feed it too.
- Stake's 5–20s live delay is its most-hated mechanic; visible countdown converts it.
- bet365 "ugly but reliable" meme — yellow-on-green cells dated but the SwiftUI card
  rework praised for preserving state. Stake's 2024 "slicker but removed options"
  backlash centered on removed accept-higher + non-clearing picks → **restyles that
  remove control read as hostile** (direct lesson for our v2 rebuild).
- Shuffle praised: glossy black+purple, persistent ▲▼ direction arrows on prices,
  "+222 markets" count chips; criticized: promo carousel in first viewport.
- Premium reads in crypto-sports discourse: biased-dark (not black), ONE accent,
  tabular numerals, real crests, micro-motion tied to state, icon discipline.
  "No crypto book owns a signature odds-cell look" — the most-repeated element is
  the biggest brand carrier.
- Webview/container-app feel = silent killer (Degree 53 ~54/100 for UK leaders).
- Slip-screenshot culture on Twitter = free distribution → shareable receipt.

## Confirmed-in-code findings (agent audited our build)

- **Sticky selections on "Keep betting"** — `BetSlip.tsx:308-313` resetStatus() only;
  legs persist (the exact Stake complaint). Fix: clear() on placed.
- Suspended CO row shows lock but NO reason — `MyBets.tsx:67-71`.
- Ask/Higher/Any already shipped — the feature Stake users rioted to restore.

## Derived task highlights (§R.B5)

Fix sticky selections; partial CO slider; CO suspension reason; CO value ▲▼ +
"was X"; six CO states incl. cashed-out badge; visible confirm countdown; duplicate-
submit hardening; remove-suspended quick action; keyboard-vs-CTA mobile check;
shareable receipt; direct-to-market search; My markets pinning; sibling carousel;
45+2′ clock; "Live at the House" ticker (real data only); suspension-reason
vocabulary (VAR/red card/attack); persistent post-move chevrons (Shuffle cue);
signature odds-cell ownership; first-viewport promo check; follow-countdown pills;
cashed-out + net P/L; numeric-jitter sweep; directional empties.

Confidence: MEDIUM for social-specific layer (genre patterns, training data);
HIGH for repo-verified + code-audited items. Re-run live searches for B5 verification
when search recovers.
