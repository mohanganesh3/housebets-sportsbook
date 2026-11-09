# Element Cards — Bet Slip / My Bets (v1)

20-pt surface. Every money element, every state. Motion per research/55 registry. † = contrast verify at token lock.

## E-SL-01 Ticket tabs (Bet slip N | My bets N | Chat)
WHERE: ticket top, segmented; badges count live tickets
WHY: P5 one living ticket; A22 pattern (Follow N ↔ My bets N same grammar)
SIZE: h-36 segmented r-2 tab-bg
A11Y: roving tabindex, aria-selected; badge = real store count

## E-SL-02 Selection card (default)
WHERE: stack, hairline-separated — NO card boxes (slop audit)
SHOWS: crest-24 | name bold 13 | market·odds 12 text-2† | fixture+comp 12 text-2† | ✕ 44px
MOTION: leg enters 200ms slide-up (only on add, never re-render churn)
PLAYER: "what exactly am I buying" — market PLAIN ("Match result · Arsenal")
FAILURE: market jargon → plain-language map required (A17e)
A11Y: full card labelled "Remove Arsenal, match result, at 1.80"

## E-SL-03 Moved-odds consent (per leg)
STATE: price moved since pick → inline band inside leg:
  `1.80 → 2.05 ▲  [Accept] [Remove]`
WHY: P2 core; B07; rivals reorder/reprice silently — we show leg identity + delta + explicit consent
COLOUR: up=success tint, down=error tint (NOT full fills); moved leg can't place until resolved
MOTION: band slides in 150ms; whole-value roll on the number (T8: per-digit rejected — reads wrong on 2.10→3.40)
A11Y: role=alert per changed leg "Arsenal price changed from 1.80 to 2.05, accept or remove"

## E-SL-04 Stake input
WHERE: full-width h-44; "Stake (USDT)" label above input right-aligned num
INPUT: 1|10|50|100 chips SET value (predictable, never add); input numeric, 2dp display, ₮ prefix asset
VALIDATION inline (B08 all arms): empty→placeholder only; 0→"Enter a stake above 0"; malformed→"Check that amount"; >balance→"Not enough balance" + Top up; 6-dec→display normalizes
MOTION: fail shake 150ms once (registry #13)
A11Y: label bound; error aria-describedby; never clears user input

## E-SL-05 Returns summary
WHERE: below stake; "Returns" left, value right num bold; potential line per leg shown small
WHY: P1; stake×odds math visible per leg (no hidden combined math — singles only)
MOTION: number morph 200ms on stake/odds change; RM=instant

## E-SL-06 Place bet CTA
WHERE: full-width h-48 pale-cyan cta-fill/cta-text bottom of ticket
STATES: default → "Placing…" (locked, progress arc ≤600ms) → receipt or rejection
PENDING RULE: inert to all input incl. keyboard; timeout → honest "Taking longer than expected…" never silent
SUSPENDED/BREAK: disabled + inline reason ("You're on a break until 14:32" / "1 selection suspended — resolve or remove")
A11Y: aria-busy pending; state announced

## E-SL-07 Receipt (placed)
WHERE: replaces leg stack, sticky until dismissed
SHOWS: ✓ "Bet placed" + #HB-xxxx + recap legs + returns + "View in My bets →" link
MOTION: soft glow ≤3s (judge's verbatim), once; RM=static check
PLAYER: "it worked, here's my proof" — kills duplicate-tap anxiety (T10)
FAILURE: ticket must EXIST in My bets before glow fires (consistency)

## E-SL-08 Open ticket row (My bets)
SHOWS: #HB ref | fixture | market·pick @locked odds | stake→returns | LIVE badge+score+clock when live
CASH OUT: value right → press expands inline `[Confirm cash out 8.40]`
  - value drifts during confirm → reconfirm shows new value (B09)
  - suspended → control stays, disabled, reason + "updated 8s ago"
A11Y: status text, no live regions (A13d — live=polite label only)

## E-SL-09 Settled row
SHOWS: receipt + outcome: won +6.55 (success) | lost −10.00 (text-2†, NOT greyed-past-readability) | void "stake returned · match abandoned at 63'" (warn accent)
WHY: honest losses + honest voids — same visual weight, different colour
NET column header: +42.55 running honest math

## E-SL-10 Same-again
WHERE: settled row trailing action
STATES: enabled (open/live fixture) → re-adds legs + toast "1 selection re-added · stake 10.00"; disabled+reason (finished) "Match ended"
MIGRATION: legacy IDs → current outcome IDs (B10 verified)

## E-SL-11 Empty states
Slip: Hubie cameo + "Tap any odds cell to start a ticket" + › Live now (functional next step, X05)
My bets: "No bets yet — your tickets land here after placing" + › Live now

## E-SL-12 Odds-change preference
WHERE: ticket footer link "Odds changes: Ask ⌄" → sheet: Ask first (default) / Accept higher / Accept all + one-line honest explanation each ("'Accept all' may place at a lower price than you saw")
WHY: P2 consent; rivals bury this in settings

## E-SL-13 Session/break controls
Footer line + Take a break → sheet: durations (15m/1h/24h/7d) → persistent block; ending early → one-tap "End break" with confirm; banner shows return time (B11)

## E-SL-14 Offline honesty
Ticket shows warn strip "Offline — can't place" (store-level guard); pending actions cancel visibly (B03)

Cards: 14 elements. Challenge agent pending pre-D-build. Evidence pending.
