# Storyboard — Bet Slip & My Bets page (20 pts, singles only)

Frames 390 + 1440 + every state. Element cards: ELEMENTS/slip.md. THE money page — P2 absolute.

## §1 Structure
```
[1] Tabs: Bet slip (N) | My bets (N) | Chat — one surface [P5]
[2] SELECTION CARDS ×N (scrollable)
    crest | Arsenal    ✕
          Match result · @1.80
          vs Brighton · Premier League
    [moved: 1.80 → 2.05 ▲ Accept / Remove]   ← per-leg consent [P2]
[3] Stake bar: "Stake (USDT)" input 10.00 | quick chips 1/10/50/100
[4] Summary: Returns 23.00 | stake×odds breakdown per leg
[5] [      Place bet      ] pale-cyan CTA | Session line below
```
Desktop: this lives in the right rail AND as /betslip page content (same component, two widths). Phone: sheet + /betslip page.

## §2 The placement choreography (the signature money beat)
```
tap Place → CTA enters "Placing…" (locked, 600ms max honest pending)
  → success: card flips to RECEIPT
     ┌─────────────────────────┐
     │ ✓ Bet placed  #HB-0042  │
     │ Arsenal @2.05 · 10.00   │
     │ Returns 23.00            │
     │ View in My bets →        │ ← ticket moves, receipt stays
     └─────────────────────────┘
  → moved odds mid-flight: reject + show new price + consent gate
  → suspension mid-flight: reject + reason, NO debit
  → offline: "Couldn't place — you're offline. No money moved."
```
One tap = one bet; CTA inert while pending (B07 verified pattern). Pending → receipt or explicit rejection, never limbo [P2 — the Stake dead-delay antipattern killed].

## §3 My Bets tab
```
Open (N) — live tickets:
  #HB-0041 | Arsenal v Brighton | Match result · Arsenal @1.90
  stake 10.00 → returns 19.00 | 🔴 LIVE 23' | score 0-0
  Cash out 8.40 ⌄ [Confirm cash out 8.40]  ← two-step + changed-value reconfirm
Settled (N) — receipts:
  won +6.55 / lost −10.00 / void stake returned "match abandoned at 63'"
  net column +42.55 honest math
```
Cash-out suspended → control present, disabled, reason + "updated 8s ago" [B09 — kills the #1 rage pattern from T10].
Same-again: live/open fixtures enabled; finished → disabled "match ended" + migrate old IDs [B10].
Void/lost styling as loud as won — honest losses (A13e).

## §4 States
- Empty slip: Hubie cameo + "Tap any odds cell to start a ticket" + live-link [X05]
- Empty My bets: "No bets yet — your tickets land here after placing"
- Moved odds: per-leg old→new + Accept; global pref: Ask / Accept higher / Accept all [X06, P2]
- Suspended market: leg locked amber band + "Suspended — goal under review" [X09]
- Above balance: inline "Not enough balance" + top-up link, no debit [B08]
- Session line always: "Session N min · Net ±X · Take a break" [P2 charter]

## §5 Interactions
- ✕ removes leg (undo toast); Clear all
- Stake input: malformed → safe reject inline; 6-decimals normalize display 2dp [B08]
- Quick chips SET stake (not add) — predictable [P2]
- Cash-out: press → inline confirm showing live value; value drifts → reconfirm required
- Take a break: durations → persistent store block + clear return time [B11]

## §6 Failure modes
- Placement while suspended → store-level reject, UI explains (no silent drop)
- Break active → CTA disabled everywhere + reason "You're on a break until 14:32"
- Ticket settles mid-session → receipt flips, balance morphs once, My bets badge counts
- Double-tap/tab-hide mid-placement → ≤1 debit (B07 pattern)
