# Storyboard — THE TRUST SURFACE: Bet slip + My bets (one shared page · scorecard 20 + states 10)

Binding inputs read and obeyed: PRINCIPLES P1–P6 · TOKENS · MOTION S1–S8 · COPY · DECISIONS
D-01..D-15 · MENTAL-MAP · research/70 (pain: odds-change rejection loop, CO betrayal, mystery
suspension, fat-finger stakes) · research/73 (F9–F16, F24, F29, BIT audit) · wireframes
phone-slip / phone-slip-open / desk-slip / desk-mybets (W5-01..W5-22, W6-01..W6-05).
Every string in a frame is from COPY.md; strings marked ★ are new, written to its voice rules
(sentence case, ≤3-word labels, factual money, no exclamation). Card refs E-xx resolve in
design/ELEMENTS/slip.md. **All numbers from design/DATA-CANON.md (single source):** balance
240.00 = 180.00 available + 60.00 in bets · session 47 min net −12.00 · open bet HB-48213 @1.80
stake 20 return 36 CO 22.40 · placed receipt HB-90210 @1.30 stake 10 return 13 · 1X2
1.30/4.80/11.00 (106.85%) · break back 22:40 · match ARS–BHA 1–0, 52'.

---

## 0 — Geography (the one object, two postures — MENTAL-MAP rule 1 & 4)

```
390 px — THE TICKET IS A PILL THAT OPENS UPWARD        1440 px — THE TICKET IS A PINNED PANEL
┌──────────────────────────────┐                     ┌──────────────────────────────────────────────────────────┐
│ Housebets          balance ▤ │                     │ ≡ Housebets   🏆 Weekly Prize      🔍 ▤ Log In [Register]│
│──────────────────────────────│                     ├──┬───────────────────────────────────────────┬───────────┤
│                              │                     │▮ │  BOARD (12-col, ≤1312, 24 gutters)        │ TICKET    │
│            BOARD             │                     │r │                                           │ 360 px    │
│        (markets, match)      │                     │a │   [Arsenal 1.30✓] [Draw 4.80] [BHA 11.00] │───────────│
│                              │                     │i │                                           │ Bet slip 1│
│                              │                     │l │                                           │ My bets 1 │
│                              │                     │  │                                           │         ✕ │
│──────────────────────────────│                     │72│                                           │───────────│
│ ▓▓ SLIP PILL — see below ▓▓ │                     │px│                                           │ legs /    │
│──────────────────────────────│                     │  │                                           │ totals /  │
│ Menu Sports Casino Chat      │ 67 px               │  │                                           │ CTA       │
└──────────────────────────────┘                     └──┴───────────────────────────────────────────┴───────────┘
Pill floats 8 px above the 67 px bar, 12 px side insets. Panel is persistent — the ticket NEVER
shares space with the board (MENTAL-MAP rule 1). Same object: pick → pill/panel → receipt → My bets.
```

Pill pick hierarchy: slip picks > open bets > hidden-never (sample data always has ≥1 open bet, so
the pill always exists and My bets is always 1 tap away — fixes the wireframe's unreachable-tab gap).

---

## 1 — Empty ticket

```
390 — no picks, one open bet ⇒ pill shows the open bet   1440 — panel, Bet slip tab, empty
┌──────────────────────────────┐                       │ TICKET                        │
│            BOARD             │                       │ Bet slip   My bets 1        ✕ │
│                              │                       │───────────────────────────────│
│                              │                       │                               │
│                              │                       │      Your ticket is empty —   │
│                              │                       │      tap a price to start     │
│                              │                       │                               │
│──────────────────────────────│                       │                               │
│●1 Arsenal·1–0·52'·CO 22.40 ⌃│  ← open-bet pill      │      18+ · Play responsibly · │
│──────────────────────────────│                       │      Take a break             │
│ Menu Sports Casino Chat      │                       │───────────────────────────────│
└──────────────────────────────┘                       │ Session 47 min · net −12.00 ★ │
                                                       │ Balance 240.00 · in bets 60 ★ │
```
COPY: `Your ticket is empty — tap a price to start` · `18+ · Play responsibly · Take a break`
★ `Session 47 min · net −12.00 USDT` · ★ `Balance 240.00 · 180.00 available · 60.00 in bets
USDT` (canon split; pill payload `●1 Arsenal · 1–0 · 52' · CO 22.40`, chevron `⌃` never `▲`)
EYE: 1st pale pill (390) / tab strip (1440) → 2nd empty copy → 3rd RG strip. PRIMARY: none — the
board owns the action; the ticket is honest about being empty (P6: empty is designed, not absent).
CARDS: E-02, E-04, E-29, E-18, E-19. MOTION: none (calm, ≤4 budget untouched).

## 2 — Tap odds adds (the signature move, S2/U-46)

```
390 — finger releases on Arsenal 1.30 cell              1440 — same, cursor on the wide cell
┌──────────────────────────────┐                       │ ...[Arsenal 1.30✓] becomes ──┐ │
│ [Arsenal 1.30✓]──╮           │  cell lifts, flies     │       the leg card          │ │
│                  ╲ layoutId  │  to panel in 280 ms    │─────────────────────────────│ │
│            BOARD  ╲          │  ease-standard         │ Singles · 1 selection Clear │ │
│                   ╲          │                        │─────────────────────────────│ │
│                    ▼         │                        │ ┌─────────────────────────┐ │ │
│                              │                        │ │ Arsenal          1.30 ✕ │ │ │
│                              │                        │ │ 77% implied        [CO] │ │ │
│                              │                        │ │ Match result · ARS v    │ │ │
│                              │                        │ │ BHA · 1–0 · 52'         │ │ │
│──────────────────────────────│                       │ └─────────────────────────┘ │
│▓●1 Arsenal @1.30        ⌃▓▓│  ← pale-cyan pill      │ Min 1.00 · max 5,000 USDT ★ │
│──────────────────────────────│   appears 200 ms      │ Stake  _ _ _ _   Returns —  │
│ Menu Sports Casino Chat      │                        │─────────────────────────────│
└──────────────────────────────┘                        │ 18+ · Play responsibly ·    │
                                                        │ Take a break                │
```
COPY: pill `●1 Arsenal @1.30` (DATA-CANON payload) · leg `Arsenal 1.30 · 77%` ★implied · `Match result · Arsenal v
Brighton & Hove Albion · 1–0 · 52'` · `Singles · 1 selection` · `Clear all` · ★ `Min 1.00 · max
5,000 USDT` · `Returns —` · badge `[CO]` ★ "cash out offered on this pick" (U-05, FanDuel/bet365
show it pre-bet).
MOTION: S2 layoutId flight 280 ms ease-standard, ONLY on explicit add; RM = pill count pulses once.
Cell gets ✓ selected state (W5-01/W5-22 parity).
EYE: 1st the flying chip → lands in pill/panel → 2nd stake field. PRIMARY: none yet (stake not set).
CARDS: E-34, E-02, E-05, E-32.

## 3 — Stake chips + returns + implied%

```
390 — sheet open to slip tab (~52 dvh)                 1440 — panel (SAME consent-stack order)
┌──────────────────────────────┐                       │ Singles · 1 selection  Clear all │
│ ── grip ──                   │                       │───────────────────────────────│
│ Bet slip 1   My bets 1     ✕ │                       │ Arsenal            1.30  [CO] ✕│
│──────────────────────────────│                       │ 77% implied                   │
│ Singles · 1 selection Clear  │                       │ Match result · ARS v BHA ·    │
│──────────────────────────────│                       │ 1–0 · 52'  [LIVE badge]       │
│ Arsenal              1.30  ✕ │                       │ ┌─ stake ──────────┐ Returns  │ │
│  77% implied            [CO] │                       │ │ 10.00        USDT│ 13.00    │ │
│ Match result · ARS v BHA ·   │                       │ └──────────────────┘ 77% impl.│ │
│ 1–0 · 52'   [LIVE badge]     │                       │ [1][10][50][100]      [Max]   │
│ ┌─ stake ──────┐   Returns   │                       │ Min 1.00 · max 5,000 USDT     │
│ │ 10.00    USDT│   13.00     │                       │───────────────────────────────│
│ └──────────────┘   77% imp ★ │                       │ Total stake 10.00 USDT        │
│ [1] [10] [50] [100]   [Max]  │                       │ Returns 13.00 · implied 77%   │
│ Min 1.00 · max 5,000 USDT ★  │                       │ If it loses: −10.00 USDT ★    │
│──────────────────────────────│                       │ In-play delay applies ★       │
│ Total stake  10.00 USDT      │                       │ Odds changes: Better only ▾ ★ │
│ Returns 13.00 · implied 77%  │                       │ 240.00 · 180.00 avail ·       │
│ If it loses: −10.00 USDT   ★ │                       │ 60.00 in bets ★               │
│ In-play delay applies      ★ │                       │ ┌───────────────────────────┐ │
│ Odds changes: Better only ▾★ │                       │ │  Place bet · 10.00 USDT   │ │
│ 240.00·180.00 avail·60 bets★ │                       │ └───────────────────────────┘ │
│ ┌──────────────────────────┐ │                       │ 18+ · Play responsibly ·      │
│ │   Place bet · 10.00 USDT │ │                       │ Take a break                  │
│ └──────────────────────────┘ │                       │ Session 47 min · net −12.00 ★ │
│ 18+ · Play responsibly ·     │                       └───────────────────────────────┘
│ Take a break · Session 47m ★ │   consent stack: totals → delay → MODE → balance → CTA
└──────────────────────────────┘
```
COPY: `Place bet · 10.00 USDT` · `Returns 13.00 USDT · implied 77%` · ★ `If it loses: −10.00
USDT` (F11 loss-framing, U-48) · ★ `In-play delay applies` (U-15) · ★ `Min 1.00 · max 5,000 USDT`
(U-10, kills invisible-limit pain 70§1) · chips `1 / 10 / 50 / 100 / Max` (Housebets' own widget
chips, teardown §2 — brand convention, U-09; nothing pre-highlighted) · ★ `Odds changes: Better
only` (U-02 default) · ★ `Balance 240.00 · 180.00 available · 60.00 in bets USDT` (canon split —
stake checks vs 180.00 available).
MOTION: chip press = 120–150 ms feedback, repeat-action zero animation (U-43). Returns NumberFlows
on change, tint-only (S7 mechanism). CTA enables 200 ms fade — never animate enable on repeat taps.
EYE: 1st stake field → 2nd returns+implied → 3rd CTA. PRIMARY: `Place bet · 10.00 USDT`.
S8 fires here: board ticks dim to tint-only while a stake is pending edit.
CARDS: E-05, E-10, E-11, E-12, E-09, E-13a, E-33, E-18, E-19, E-15 (Clear all).

## 4 — Odds changed while deciding (P2 — the #1 pain killed twice)

**4a · moved BETTER (1.30 → 1.45): default "Better only" auto-accepts — announced, never silent**
```
Both sizes — leg card in place:                       copy line on the leg:
┌─────────────────────────────┐                       ★ `Moved 1.30 → 1.45 · better — accepted`
│ Arsenal            1.30̶→1.45 │                       Old price strikethrough, ▲ glyph + up-tint
│ Moved 1.30→1.45 · better —  │                       decays ~1 s (S1). No consent needed — consent
│ accepted ★            [CO] ✕│                       was pre-given by the mode control. Returns
└─────────────────────────────┘                       recalcs: `Returns 14.50 · implied 69%`.
CTA stays armed — nothing blocks a better price. Returns NumberFlow 250 ms.
```

**4a′ · moved WORSE under `Any change` mode — announced, not asked, never silent (crit #5)**
```
Same card, same grammar: `Moved 1.30 → 1.22 · worse — accepted` ★ + ▼/down-tint + amber edge flash
~1 s that decays. No buttons — consent was pre-given by the mode — but the move is announced
in-frame exactly like 4a. Silent-on-bad-news is banned even when consented (P2).
```

**4b · moved WORSE (default modes): same-frame ask, CTA blocked until answered (U-01, D-03)**
```
390 sheet / 1440 panel — leg gets amber left edge, STATIC (no pulse — P3 bans pulsing near money):
┌─────────────────────────────┐
│⚠ Odds moved 1.30 → 1.22     │  amber edge + strikethrough old → new
│  while you were deciding    │
│ Arsenal            1.22  ✕  │
│  82% implied                │
│ [ Accept 1.22 ]  [ Remove ] │  ← leg-level consent, ≥44 px tall
└─────────────────────────────┘
│ ┌─────────────────────────┐ │
│ │      Place bet          │  CTA stays ≤3-word + reason line beneath:
│ └─────────────────────────┘ │  ★ `Odds changed — answer above` — never a
│  Odds changed — answer above│  dead button (U-03 spirit)
```
COPY: `Odds moved 1.30 → 1.22 while you were deciding` · ★ `Accept 1.22` · `Remove` · ★ reason
`Odds changed — answer above`.
Also on 390 pill (closed): `●1 Arsenal 1.30 → 1.22` (canon `moved` grammar) with amber left
edge — the change is announced in-frame even with the sheet closed (P2; pill is the frame); and
the My bets tab would show an amber ask-dot if the player is on that tab (E-04).
MOTION: amber edge 0 ms appear, static — NO pulse (P3 bans pulsing near money; MOTION.md's
awaiting-pulse row flagged for lead amendment). Accept → leg re-arms 150 ms; Remove → 160 ms.
EYE: 1st amber edge+banner → 2nd Accept/Remove → CTA demoted. PRIMARY: `Accept 1.22`.
CARDS: E-07, E-09, E-02(changed), E-13d. Mode control offers `Better prices only` (default) /
`Any change` / `Ask every time` ★ (U-02; the toggle that "never worked" at rivals — ours is
leg-visible and honest about which mode is on).

## 5 — Suspended leg (S3: integrity has no animation)

```
390 sheet / 1440 panel — 0 ms same-frame, no transition on the lock itself:
┌─────────────────────────────┐
│ 🔒 Suspended — dangerous    │  canon chip: --c-suspend bg
│    attack          [amber]  │  + #2A1200 dark fg; card dims
│ Arsenal          1.30̶  ✕    │  to 60%, last price stays
│  Match result · ARS v BHA · │  visible dimmed (D-04)
│  1–0 · 52'                  │
│  stake field disabled       │
│ [ Remove ]                  │
└─────────────────────────────┘
CTA: `Place bet` disabled + reason `Pick suspended — dangerous attack` ★ — or `Place bet` stays
armed if the ticket holds other live legs (each leg self-arms; suspended leg excluded from totals).
On reopen: 150 ms un-dim, price may tick + direction glyph (U-04 "flash new prices on reopen").
```
COPY: `This pick is suspended — dangerous attack` (COPY suspended-leg string; reason vocabulary:
dangerous attack / VAR check / penalty awarded / goal / coverage paused — A13.S3 enumerated).
Pill: `●1 Arsenal 🔒` (canon payload + padlock, never color alone, U-41).
MOTION: S3 — 0 ms, padlock + reason chip + 60% dim; RM identical.
EYE: 1st lock+reason → 2nd last price → CTA state explains itself. PRIMARY: `Remove` (or wait — no
pressure copy, U-52).
CARDS: E-08, E-13d, E-02.

## 6 — Pending (honest ≤3 s — kills the "is it a bet?" panic, 70§1)

```
Tap Place bet → SAME tap disables CTA (double-tap-proof, edge case §3; every submit carries an
idempotency key, D-19):
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │ ⏳ Confirming…          │ │  label keeps its slot + INDETERMINATE
│ └─────────────────────────┘ │  indicator — no determinate bar: a fake
└─────────────────────────────┘  progress bar over a ≤3 s timeout is the
Board ambient dims to tint-only (S8).    dishonesty this frame exists to kill
If the tab is hidden mid-placement: request continues; result lands in My bets + pill flips
to open-bet form — the bet is never lost to a backgrounded tab (edge case §3).
Rejected mid-pending (price moved again): `Not placed — price moved. Your balance is
untouched.` + leg re-prices + CTA offers ★ `Place at 1.22` — ONE tap to retry at the shown
price, ending the 5-tries loop (70§1 verbatim pain).
LOST RESPONSE (D-19 — offline blip/suspend mid-flight/killed tab: the request may have LANDED):
on reconnect/dismiss the state becomes ★ `Can't confirm — check My bets` — NEVER the
`untouched` claim (it can be a lie) and NEVER a blind retry (double-place risk); only a
reconciled not-placed result offers `Place at {new}`.
```
COPY: `Confirming…` · `Not placed — price moved. Your balance is untouched.` (only when the
rejection is confirmed) · ★ `Place at 1.22` · ★ `Can't confirm — check My bets`.
MOTION: CTA label→busy 120 ms; indeterminate spinner; no modal, no overlay — in-place (U-44).
RM identical (no motion in the wait itself).
EYE: 1st CTA state → 2nd leg price (still live). PRIMARY: none — wait state, exit = sheet close.
CARDS: E-13b, E-05.

## 7 — Receipt (S5: the stamp — truth, not confetti)

```
CTA container-transforms INTO the receipt card, 260 ms out-expo (one hero move per flow):
390 sheet / 1440 panel                                          pill flips to open-bet form:
┌─────────────────────────────┐                                ┌──────────────────────────┐
│ ✓ Bet placed                │                                │●1 Arsenal·1–0·52'·CO22.40⌃│
│ ref HB-90210                │                                └──────────────────────────┘
│ 1.30 accepted · 14:58:02    │
│─────────────────────────────│   quiet success tint under card,
│ Arsenal      1.30 → ret 13.00│  fades <3 s total (A13.e, Karri:
│ Stake 10.00 USDT            │   no confetti near money)
│─────────────────────────────│
│ [ View in My bets ]         │   the bet indicator TRAVELS to the
│ [ Done ]                    │   My bets tab badge (U-36, Family:
└─────────────────────────────┘   result elements go home — badge pulses +1)
COPY: `Bet placed · ref HB-90210 · 1.30 accepted` · `View in My bets` ★ · `Done` ★
Multi-leg receipts aggregate (E-14): `N bets placed` + total stake + per-leg ref lines.
```
MOTION: S5 — container transform 260 ms out-expo; ref types in; tint <3 s; RM = instant card.
EYE: 1st ref line → 2nd accepted odds → View in My bets. PRIMARY: `View in My bets`.
CARDS: E-14, E-34, E-04. U-12: receipt = ref + accepted odds + timestamp — the record of the wager.

## 8 — Failure (respect, reason, recovery — never a dead end)

```
Leg stays, CTA container settles with ONE ≤4 px horizontal shake 150 ms (74):
┌─────────────────────────────┐
│ ⚠ Not placed — balance      │
│ too low for this stake.     │
│ Your balance is untouched.  │
│ [ Edit stake ]              │
└─────────────────────────────┘   variants (reason slot {reason}):
   · `Not placed — market suspended. Your balance is untouched.` → [Wait] or [Remove]
   · `Not placed — price moved. Your balance is untouched.` → ★ `Place at 1.22`
   · LOST RESPONSE → ★ `Can't confirm — check My bets` (D-19: request may have landed —
     no untouched-claim, no blind retry; My bets holds the truth, idempotency makes the
     later confirmed-not-placed retry safe)
COPY: `Not placed — {reason}. Your balance is untouched.` — the money-safe sentence is used ONLY
when the rejection is confirmed server-side (70§1: pending≠placed panic; Ana's "one confusing
error" exit, P-B).
```
MOTION: one 150 ms settle ≤4 px (74 "respectful"); RM = reason text only. No toast — in-frame.
EYE: 1st reason line → recovery button. PRIMARY: the recovery action.
CARDS: E-13c, E-05, E-16(offline variant).

---

## 9 — My bets: open tab (the live instrument)

```
390 — sheet, My bets tab (taller snap ~72 dvh —       1440 — full page /bets (wireframe W6 parity)
      chained sheets differ, Family)                  ┌──────────────────────────────────────────┐
┌──────────────────────────────┐                      │ <  My bets      1 open · 7 settled       │
│ Bet slip   My bets 1       ✕ │                      │──────────────────────────────────────────│
│──────────────────────────────│                      │ [Open (1)]        [Settled (7)]          │
│ Open (1)      Settled (7)    │                      │ [All time][Today][Last 7][Last 30][Cust] │
│──────────────────────────────│                      │                              All sports ▾ │
│ Oct 17 14:58                 │                      │──────────────────────────────────────────│
│ Arsenal              1.80    │                      │ Placed  Bet            Odds Stake Return │
│ Arsenal v Brighton  ●52' 1–0 │                      │────────────────────────── Result ─────────│
│ Stake 20.00 · Returns 36.00  │                      │ Oct 17  Arsenal            1.80  20.00   │
│ Open                       ⌄ │                      │ 14:58   ARS v BHA ●52' 1–0       36.00   │
└──────────────────────────────│                      │                    Open                ▾│
      ▲ condensed card rows    │                      └──────────────────────────────────────────┘
      inside the 360 px panel +│   Expansion (row ⌄ expander — the CO BUTTON lives inside,
      sheet tab; same anatomy  │   not conflated with the expander — both sizes, one source):
      as the page table (U-23) │   ┌──────────────────────────────────────────────────────────┐
                               │   │ ref HB-48213 · placed 14:58 · 1.80 accepted              │
                               │   │ Settles on the official result ★                         │
                               │   │ Cash out offered ★                                       │
                               │   │ ┌─────────────────────────┐  ┌──────────────────────┐   │
                               │   │ │ Cash out 22.40 USDT     │  │ Partial cash out ▾   │   │
                               │   │ │ updates live            │  │ 25 · 50 · 75 · Custom│   │
                               │   │ └─────────────────────────┘  └──────────────────────┘   │
                               │   └──────────────────────────────────────────────────────────┘
```
COPY: `Open (1)` `Settled (7)` · `All time` `Today` `Last 7 days` `Last 30 days` `Custom` (opens
an inline From/To date-range row + `Apply` ★) · `All sports` · `Cash out 22.40 USDT` · ★
`updates live` · ★ `Partial cash out` · ★ `25 · 50 · 75 · Custom` · ★ `ref HB-48213 · placed
14:58 · 1.80 accepted` (canon open-bet ref) · ★ `Settles on the official result` (U-14) · ★
`Cash out offered` (U-05 badge pre-state).
MOTION: S7 — quote is NumberFlow ticking, neutral, NO pulse (U-51; F13 says availability alone
inflates stakes — the offer gets less urgency, not more). Rows: no enter animation on live updates.
EYE: 1st the CO value (the instrument) → 2nd score/minute → 3rd partial control. PRIMARY: `Cash out
22.40 USDT`.
CARDS: E-20, E-21, E-22, E-24, E-32.

## 10 — CO changed → reconfirm (P2 on the way out; FanDuel's own rules warn moves kill requests)

```
Quote ticks 22.40 → 21.10 WHILE the confirm sheet/hand is on it:
┌──────────────────────────────────────┐
│ Offer moved to 21.10 — confirm new   │  "new amount" chip on the value,
│ amount                               │  S7 neutral — no pulse, no urgency
│ [ Confirm 21.10 USDT ]  [ Dismiss ]  │  re-arm required (U-06): the number
└──────────────────────────────────────┘  you tapped is never the number billed
COPY: `Offer moved to 21.10 — confirm new amount` · ★ `Confirm 21.10 USDT` · `Dismiss` ★
```
MOTION: value cross-fades + chip appears 200 ms; re-confirm tap = normal press 120 ms. RM instant.
PRIMARY: `Confirm 21.10 USDT`. CARDS: E-23.

## 11 — Partial cash-out (25/50/75/custom — bet365's convention, honest math)

```
Expansion, "Partial cash out" open — chip control (bet365's convention, thumb-friendlier):
┌──────────────────────────────────────┐
│ Partial cash out                 ★   │
│ [25%] [50%] [75%] [ Custom ___ ]     │  custom = numeric field, same
│──────────────────────────────────────│  2-decimal rules as stake input
│ You take 11.20 USDT              ★   │
│ 10.00 stays at 1.80 → returns 18.00 ★│  remaining-stake math shown BEFORE
│ [ Confirm 11.20 USDT ]               │  confirm — P2 applied to partials
└──────────────────────────────────────┘
COPY: ★ `Partial cash out` · `25% 50% 75% Custom` · ★ `You take 11.20 USDT · 10.00 stays at 1.80
→ returns 18.00` · ★ `Confirm 11.20 USDT` (displayed = billed). After: row shows ★ `Cashed out
11.20 USDT · 10.00 riding at 1.80` — partial result is a state, not a vanished row (U-13).
Confirm buttons = --c-cta/--c-cta-fg here and in frame 10 (D-18: neutral quote, acting confirm).
```
MOTION: chips zero-animation (repeat action); math NumberFlows; RM identical values.
PRIMARY: `Confirm 11.20 USDT`. CARDS: E-24.

## 12 — CO suspended (paused, never dead — the #1 betrayal defused)

```
Market suspends under an open CO:               market reopens:
┌──────────────────────────────────┐           value re-ticks + direction glyph;
│ Cash out paused — dangerous      │           if it moved → frame 10 reconfirm,
│ attack                           │           never silent reprice (P2, 70§3
│ last quote 22.40 shown dimmed ★  │           "the £50 offer is gone" pain)
│ [Paused — waiting]  not tappable │           COPY: `Cash out paused — dangerous
│ The market is suspended — the    │           attack` · ★ `last quote 22.40` · ★
│ quote resumes when it reopens. ★ │           `Paused — waiting`
└──────────────────────────────────┘
```
MOTION: S3 shutter on the CO module — 0 ms dim + reason; un-dim 150 ms on reopen + tick.
PRIMARY: none — honest wait state (button explains itself, never a dead click like bet365's
freezing CO button, 70§3 verbatim).
CARDS: E-25.

## 13 — Settled rows (honest P/L — wins quiet, losses factual, U-54)

```
My bets → Settled (7): two honest terminal rows + the void row (DATA-CANON refs):
┌──────────────────────────────────────────────┐
│ Oct 16  HB-091  Arsenal  1.80  20.00  36.00  │
│         Settled · won 36.00 USDT      ▲ won  │  "won" word + up-glyph — never color
│──────────────────────────────────────────────│  alone (U-41)
│ Oct 15  HB-068  Draw     4.80  10.00   0.00  │
│         Settled · lost 10.00 USDT     ▼ lost │  flat, no re-bet bait (U-52: NO post-loss
│──────────────────────────────────────────────│  promoted action anywhere on this row)
│ Oct 14  HB-104  Brighton 11.00 12.00  12.00  │
│         Void — abandoned 63' ·               │
│         12.00 USDT returned          ↺ void  │
│         Settles on the official result ·     │
│         Query this settlement ★              │  dispute affordance (U-14; DK/Stake
└──────────────────────────────────────────────┘  wrong-grading pain 70§5)
COPY: `Settled · won 36.00 USDT` · `Settled · lost 10.00 USDT` · `Void — abandoned 63' · 12.00
USDT returned` · ★ `Query this settlement`. NO "bet again" louder than close (A7.d).
```
MOTION: none — terminal rows render static; row list staggers ≤30 ms first paint only.
PRIMARY: row expand ⌄ (audit trail: ref, accepted odds, basis). CARDS: E-27, E-28, E-21.

## 14 — Break active (RG as trust architecture, U-21/U-53)

```
On a break — the whole ticket locks, everywhere it exists (DATA-CANON time):
390 pill: `On a break · back 22:40` (surface-1, no CTA color — pale-cyan would bait).
Sheet/panel body: slip controls all disabled; My bets READABLE and cash-out still works —
a break blocks staking, never blocks reducing exposure (decision logged: money-out stays live).
┌─────────────────────────────┐
│ On a break · back 22:40     │
│ Betting is off until then.  │
│ Slip and prices are read-   │
│ only. Cash out still works.★│
│ [ End break ▾ ] → 2nd step: │  ONE 2-step pattern, pill + panel
│ `End break now? [End break] │  both use it — never a one-tap exit
│ [Stay on break]` ★          │  (U-44 in-place confirm)
└─────────────────────────────┘
COPY: `On a break · back 22:40` · ★ `Betting is off until then. Prices are read-only. Cash out
still works.` · ★ `End break now?` / `Stay on break`.
```
CARDS: E-17. EYE: the strip IS the focal point (one focal point per state, P5).

## 15 — Offline ticket (frozen honestly, Theo on the train)

```
┌──────────────────────────────┐
│ ⚠ You're offline — prices    │  banner pins under tabs, sheet + panel
│ are frozen, not live         │
│──────────────────────────────│
│ Arsenal      1.30 (frozen) ✕ │  legs keep last prices; frozen marker
│ stake fields read-only       │  = cloud-slash glyph (canon glyph)
│ ┌──────────────────────────┐ │
│ │       Place bet          │ │  CTA disabled + reason line beneath:
│ └──────────────────────────┘ │  ★ `Offline — can't place`
│ My bets: cached rows + ★     │  `Showing last known prices` —
│ `Showing last known prices`  │  never silent-empty (U-23)
└──────────────────────────────┘
Back online: banner exits 160 ms, prices tick to current + direction flash, CTA re-arms. A
placement in flight when the drop hit → D-19 reconcile on return: ★ `Can't confirm — check My
bets` (never `untouched`, never blind retry).
COPY: `You're offline — prices are frozen, not live` · ★ `Offline — can't place` · ★ `Showing
last known prices` · ★ `Can't confirm — check My bets`.
```
CARDS: E-16, E-13d, E-29.

## 16 — Stake errors (fat-finger-proof — the $1,008 X-button bug is impossible here)

```
16a above available:            16b zero/empty:                16c 6 decimals:
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│ 500.00         USDT │        │ 0.00           USDT │        │ 10.55          USDT │
│ ⚠ More than your    │        │ Enter a stake — min │        │ Two decimals max ★  │
│ balance (180.00)    │        │ 1.00 USDT       ★   │        │ — field can't hold  │
│ [Max] → sets 180.00 │        │ chips still work    │        │ more digits; pasted │
│ Add funds (demo)    │        │ CTA: `Place bet` +  │        │ 10.554321 shows as  │
└─────────────────────┘        │ reason beneath   ★  │        │ 10.55 = billed 10.55│
COPY: `More than your          └─────────────────────┘        └─────────────────────┘
balance (180.00 USDT)` ·       Guard rails (U-09): chips can't exceed available · `Max` fills
`Add funds (demo)`             180.00 available exactly · ✕ clears input, NEVER submits (the DK
(available, not the 240 total) bug by design) · CTA always echoes the stake so the confirm total
                               is read twice · DISPLAYED = BILLED (canon law): the field never
                               shows a number the bet won't be billed at.
```
CARDS: E-10(states), E-11, E-13d. Paste accepted messy then normalized on blur (Salaja default).

---

## 17 — Phone: bar → sheet sequence (the signature journey, pick visible on the pill)

```
STEP 1 pill at rest (has pick)      STEP 2 mid-drag — finger owns it    STEP 3 open (slip tab)
┌────────────────────────────┐      ┌────────────────────────────┐      ┌──────────────────────────┐
│ BOARD                      │      │ BOARD (scrim fading in     │      │ BOARD dimmed under scrim │
│                            │      │  with drag distance —      │      │──────────────────────────│
│                            │      │  opacity = drag fraction)  │      │ ── grip ──               │
│                            │      │                            │      │ Bet slip1 Mybets1    ✕ │
│                            │      │ ┌─ sheet top edge ───────┐ │      │──────────────────────────│
│────────────────────────────│      │ │ translateY = finger    │ │      │ Singles · 1 sel   Clear  │
│▓●1 Arsenal @1.30        ⌃▓│      │ │ 1:1 — the pill IS the  │ │      │ Arsenal          1.30  ✕ │
│────────────────────────────│      │ │ sheet's bottom edge    │ │      │  77% implied        [CO] │
│ Menu Sports Casino Chat    │      │ └────────────────────────┘ │      │ stake / chips / returns  │
└────────────────────────────┘      └────────────────────────────┘      │ Place bet · 10.00 USDT   │
                                                                         │──────────────────────────│
Release physics (MOTION sheet law):                                       │ Menu Sports Casino Chat  │
· velocity decides: flick ≥0.11 px/ms opens/closes (Salaja threshold)    └──────────────────────────┘
· mid-drag release below halfway settles back to pill — cancel = free (P4)
· scrim opacity tracks drag; scroll-lock only when fully open; board inert + focus → tablist
· heights differ: slip ≈52 dvh, My bets ≈72 dvh (Family: chained sheets differ)
· pill content persists INTO the sheet header — the pick never teleports
Pill states (canon payloads): pick `●1 Arsenal @1.30` pale-cyan / open-bet `●1 Arsenal · 1–0 ·
52' · CO 22.40` surface-1 / odds-moved `●1 Arsenal 1.30 → 1.22` amber edge / suspended `●1
Arsenal 🔒` / break `On a break · back 22:40` / offline `frozen` + cloud-slash. One pill, six
honest costumes — the ticket is reachable blind (P5).
TAP COUNTS: odds→sheet 2 · stake(chip)→armed CTA 1 · place→receipt 1 (A18.b flow ledger).
```
MOTION: spring 380/32; drag interruptible every frame (newest-state-wins); RM = 150 ms
fade/translate (74). CARDS: E-02, E-03, E-34.

---

## Edge states also storyboarded (must exist, P6)

- **Skeleton:** ticket zone loads exact-geometry shimmer, opacity-only, ≤2 loops then static (U-42,
  U-57). Never a spinner where legs will be.
- **No open bets:** `No open bets — your ticket lives on the slip tab` ★ + slip tab chip.
- **No settled:** `No settled bets yet` ★ (no art needed — dry voice, no centered-icon empty cliché).
- **My bets load failed:** `Bets didn't load — retry` ★ with cached rows kept visible (U-23).
- **CO not offered:** ★ `No cash out on this bet` — a designed state, not an absent button (U-08).
- **Long team name:** truncate keeping the club-name tail — `Brighton & H…Albion` (never the
  garbled `…bion`; wireframe's `Brighton & Hove Al…` end-truncate also acceptable) + full name on
  expand (U-45).
- **200% text / RTL:** numbers never truncate or shift; mirrored pill/panel (A27.a, X-edge).

## Motion budget check (S-law)
Peak viewport = sheet open + ticking CO + board ticks: CO NumberFlow + tint ticks (exempt-muted
under S8) + ≤1 enter = well under 4. Hero moves: pick→ticket flight, receipt stamp — one per flow.
