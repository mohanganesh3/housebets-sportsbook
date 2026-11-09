# STATES AUDIT — every scored state, mapped to the frame that proves it

The judge's tour index (A28.b: a 60-second tour showing every scored item). Scorecard row:
"Every state: suspended, changed, failed — 10 pts". Section-3/X-rows widen the bar to:
suspended · changed · failed · void · settled · empty · loading · offline · break — plus the
integrity states the brief names (pending, odds-moved-in-slip, frozen).

Frames referenced: `SH-nn` shell.md · `HM/LV/FB-nn` boards.md · `E-…` ELEMENTS/boards.md ·
`SLIP-nn`/`MB-nn`/`MP-nn` = peer storyboards (slip+mybets and match page — named per
RESET_PLAN §9 coverage map; owner files pending).

## Coverage map

| State | Proved in frame | What the judge sees | Asks / U-rows |
|---|---|---|---|
| **Suspended (market)** | LV-01 rows (Newcastle `🔒 Suspended — dangerous attack`; Atlético `— re-pricing`) + LV-04 cascade + FB-01 PL row | full-width amber band replaces odds row only; named reason; last context stays; `+N ›` still navigable; `+6 ›`/`+8 ›` intact (W2-09/W2-26 parity+reason) | scorecard; U-04, U-27, T42-01, XV4-02; P2 |
| **Suspended (selection in ticket)** | SLIP-nn suspended-leg (peer) + SH-07 frozen leg variant | leg stays in slip w/ reason chip `This pick is suspended — {reason}` + `Remove suspended · keep the rest`; never silently dropped | U-30, R-YAB-13, XV4-05 |
| **Changed (odds moved)** | HM-05 live-strip tick; LV-04 reopen repriced; SLIP-nn changed-leg (peer) | cell: S1 digit morph + ▲▼ glyph + direction tint ~1s, glyph ~9s; slip leg: `Odds moved 1.80 → 2.05 · better price` + Accept/Decline; default = accept better only | scorecard; U-01/02, U-33, T42-18, C-02 |
| **Failed (bet rejected)** | SLIP-nn failure terminal (peer); copy: `Not placed — {reason}. Your balance is untouched.` + retry + `report this bet` | designed terminal screen, not a toast; reason named; balance provably safe | scorecard; U-03, U-30, XV4-23, X06 |
| **Void** | MB-nn settled row (peer): `Void — {reason} · {stake} USDT returned` + leg-level void glyph (grey circle/strikethrough — bet365 tri-icon pattern) | void never silently becomes a loss; reason + refund status inline | U-13/14, X03 edge, U1 §5 pains |
| **Settled** | MB-nn settled tab (peer): `Settled · won {net}` / `Settled · lost {stake}` + result basis + dispute affordance | quiet win (≤3s soft glow, no confetti — U-54, P52-10); factual loss; three timestamps (placed/settled/credited — RV4-11) | U-13/14, A13.e |
| **Empty** | LV-03 (NOTHING-LIVE → Starting soon — the brief's named ask), HM-03 no-follows, FB-04 filter-zero, SH-06 search-empty, SH-01 panel empty-ticket | every empty has honest copy + art + ONE next step; countdown pills as content, never fabricated fixtures | X05, P52-23, T42-06, U-17 |
| **Loading** | HM-04 + boards loading variant + LV-01 initial | real-markup skeletons, exact geometry, opacity-only ≤2 loops, 150–300ms delay gate, timeout→error; no spinner on money surfaces | X04, U-42, U-57, T42-07, P55-14 |
| **Offline** | SH-07 + boards offline variant | sticky `You're offline — prices are frozen, not live`; clocks frozen + `Frozen` captions; cells inert-with-reason; `Back online` reconnect toast; legs revalidate | X03.5, U-41, XV4-04, U-20 |
| **Break (RG take-a-break)** | SH-11 + SH-01 session-line path | `On a break · back 22:40` chip replaces balance; board visible, cells inert; module offers early end; 4-rung limits sheet ≤2 taps | U-21, U-53, P52-02/03, C-20 |
| **Break (match HT/Break)** | LV-01 `LIVE HT` row + E-BRD-08 states | honest clock states `HT`, `45+2'`, `Break`, `Second break` — betby phonetics kept | T42-17, U-41 |
| **Pending (placement)** | SLIP-nn pending (peer) + SH-10 reconcile-on-relaunch | `Confirming…` ≤3s honest state w/ visible countdown, cancel-able; CTA disabled first tap (idempotent); pending bet visible, never balance-debited-invisible | U-03, T42-02, XV4-07/24 |
| **Selected (cell armed)** | any board row tap + W5-01 parity | cta fill + dark text + ✓; pick→ticket flight S2 280ms; pill updates `❶ Arsenal @ 1.30 → ₮26.00` | U-29, T42-12, C-11 |
| **Restored (session continuity)** | SH-10 | selections restored banner + per-leg revalidation; scroll/filters/tab restored; `Checking your last bet…` after kill | U-20, XV4-05/12, T42-04 |
| **RTL / long-label** | SH-08 | mirrored rail/panel/nav; Oxanium stays LTR; 24-char team name truncates w/ expand; German tab labels fit | X02, C-18, U-45 |
| **Zero-count (honest totals)** | LV-03 chips `All 0 · Soccer 0…`; FB-04 | counts tell the truth even when empty invites hiding | U-28, P52-23 |

## The 60-second judge tour (A28.b)

1. **0–8s** HM-01 1440: pale-cyan grammar, live strip inside first viewport, hero = real
   fixture not promo, session line in panel. *Reads as Housebets, not template.*
2. **8–16s** tap `Live 13` rail → LV-01: counts on every chip, suspended rows with named
   reasons, `+N ›` alive on locked rows, delay-honesty line.
3. **16–24s** trigger goal (state tourer): LV-04 cascade — score roll → flash → lock+reason →
   repriced reopen. Trigger twice: identical timing.
4. **24–32s** filter to zero live (tourer) → LV-03 `Nothing in play — starting soon` with real
   countdown pills; flip one to LIVE live.
5. **32–40s** FB-01: five leagues, market ▾ rebind to BTTS, ★ a competition + a team → see
   Favourites/Your matches update on return home.
6. **40–50s** tap a price → S2 flight → ticket: change the odds (tourer) → per-leg
   old→new consent; suspend a leg; place → `Confirming…` → receipt ref; fail once with
   `balance untouched`.
7. **50–60s** kill network → SH-07 frozen honesty → reconnect `Back online`; open session
   line → 4-rung RG sheet; mention RTL/RTL-stress + skeletons via tourer.

## Coverage honesty notes

- **Owner gaps:** `SLIP-*`, `MB-*`, `MP-*` frames are named per RESET_PLAN §9 but authored in
  their own storyboard files; this index is the contract they must satisfy. Where they don't
  yet exist, status = pending, not waived.
- **Demo reachability:** every mapped state must also be triggerable from the state-tourer
  dock (X09, P52-19) — the frame list above doubles as the dock's scenario list.
- **Both-widths rule:** each scored state needs 390 + 1440 evidence shots in qc/shots before
  the ASKS row can read MET (Q11.2).
