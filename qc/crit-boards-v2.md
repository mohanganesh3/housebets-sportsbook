# crit-boards-v2 — challenge pass: SHELL + BOARDS spec

Scope: `design/STORYBOARDS/{shell,boards,states-audit}.md` + `design/ELEMENTS/boards.md`
vs binding law (PRINCIPLES/TOKENS/MOTION/COPY/DECISIONS/MENTAL-MAP), INVENTORY W-ids,
research 70/71, and peer specs (slip-page, match) for shared objects.
Findings tagged **[B]**locker / **[M]**ajor / **[m]**inor. Line refs given.

---

## (a) Wireframe parity — per page

**Shared shell:** phone top bar logo+Log In/Register ✓ (SH-02/SH-04 parity variants); bottom bar
`Menu·Sports·Casino·Chat·Support` — wireframe's truncated `Su…` promo avatar → `Support`,
justified (U-45, SH-04:119). Desk top bar: all 8 slots present incl. `≡`, prize ticker+crown,
search, panel toggle (SH-01). 72px icon rail + peers Casino ✓.

**W1 Home:** every element present — search (board section), sport nav, favourites ×-chips,
your-matches table+cards, live card anatomy, card peek 24px, featured ‹ ›, `Match result`
column header, in-row gold ★, upcoming tail. Additions (live strip, starting soon, top comps)
= brief's own asks. Deviations justified.

**W2 Live:** header pill, sport chips w/ counts (all 7 desk), flag→authored-crest headers
(SA4-04, token law — justified), suspended band + `+N ›` alive, all 5 groups, `All competitions ▾`
added for the brief's sport+competition filter (beyond-wireframe, correct). `Scores may be
delayed` honesty line = bonus.

**W3 Football:** `‹`+`Soccer ⌄`+`≡` filter, segmented tabs, meta line, `Market: Match result ▾`
rebinder (W3-20), `All competitions ▾`, five league groups, `View/Show/All N ›` label variants,
header+row ★. Counts internally consistent (25 fixtures, 6 live ✓).

**Parity gaps:**
- **[m]** In-content search bar not drawn in LV-02/FB-02 frames (W2-02/W3-02 exist on phone
  live+football). E-BRD-07 says "content search bar on boards" covers it, but the frame
  sketches omit it and SH-09's board focus order never lands on it. Draw it or write the
  top-bar-⌕-only substitution into DECISIONS.
- **[m]** Desk odds-cell layout unresolvable: grammar says label-over-price stacked
  (E-BRD-01/boards.md:17) but wireframe desk = wide buttons label-left/odds-right (W1-25,
  derived ask 12), and the LV-01/FB-01 ASCII draws bare prices `1.30 | 4.60` — no labels,
  no implied% though grammar mandates implied% beside EVERY price. Pick one anatomy per width
  and redraw the ASCII to match.
- **[m]** Crown → `Leaderboard` (SH-01:44) links to a page outside the 5-page scope — a dead
  control in the shipped prototype (violates SH-01's own "never a dead control"). Retarget
  (popover/panel tab) or cut.
- **[m]** `⚽`/`🏆`/`❶` emoji-shorthand in ASCII sketches vs TOKENS icon law (authored glyphs
  only) — fine as shorthand but will leak into builds; annotate.
- **[m]** `HM-01` Favourites `⚽ Arsenal` — same.

## (b) Token / principle deviations

- **[M]** Sample-data law (P6) broken three ways across specs — see (g).
- **[M]** Overround law broken by own fixtures: P6 demands 103–107%. Computed: ARS-BHA
  1.30/4.60/11.00 = **107.8%**; LIV-MUN 1.65/4.00/4.33 = **108.7%**; MCI-TOT 1.50/4.50/5.25 =
  **107.9%**; RMA-BAY = 107.0% boundary. Reprice 3 fixtures or widen the band.
- **[M]** House-glyph cameo budget (≤1/view, U-32/TOKENS) can be triple-broken: SH-01 empty
  ticket panel (cameo 1) + E-BRD-09 empty module `house-glyph 40%` (cameo 2) + SH-06 empty
  search (cameo 3) co-render on one desk view (e.g. nothing-live + empty ticket + open palette).
  Rule needs a per-view arbiter, not per-element.
- **[M]** Two elements each claim "the one allowed shadow": search palette (SH-06:140,
  E-BRD-07) and slip pill (E-02, "the one allowed 8/24 shadow"). TOKENS grants exactly one
  8/24 shadow "for sheets". Assign owner. Related: palette takes `r-lg` though TOKENS says
  `r-lg = sheets only`.
- **[m]** Live-badge dot pulse "counts toward ≤4-motion budget" (E-BRD-08) — 13 live rows ×
  independent pulses + ticker + ticks breaches P3 in spirit on LV-01. Define badges as one
  synchronized ambient class or cap concurrent pulses.
- **[m]** `Odds animation: Flash` avatar-menu item (SH-01:49) implies a second tick language
  vs canonical S1 NumberFlow — unexplained; make it the RM/preference twin or cut.
- **[m]** Competition naming drifts: `England PL` (HM-01) / `Premier League` (LV-01) /
  `England Premier League` (FB-01) — one canonical string.
- **[m]** HM-01 ASCII: `YOUR MATCHES · 3` draws 2 rows; Napoli-Milan appears in both
  Starting soon (`04:12`) and Upcoming events (`17:00`) — duplicated fixture.
- **[m]** Neutral: quick-stake chips ship WITHOUT the 50-pre-highlight that brand task 20
  describes — E-11 documents the ethical refusal; acceptable, keep it logged in DECISIONS.

## (c) States-audit map verification

Table = **16 rows** (prompt said 17). Every in-scope frame resolves:

| Claimed | Exists? |
|---|---|
| SH-01…SH-11 | all 11 present in shell.md ✓ |
| HM-01…05, LV-01…05, FB-01…05 | all present in boards.md ✓ |
| E-BRD-01…10, E-SHL-01…06 | all present in ELEMENTS/boards.md ✓ |
| LV-03/HM-03/FB-04/SH-06 empty set | ✓ all drawn |
| SLIP-nn suspended-leg / changed-leg / pending / failure | **IDs resolve nowhere** — slip-page.md uses §1–§17 numbers (§5, §4, §6, §8). States exist; the ID contract doesn't. |
| MB-nn settled/void rows | **IDs resolve nowhere** — covered by slip-page §9+§13 |
| MP-nn match page | **IDs resolve nowhere** — match.md uses M-01…M-14 |

- **[M]** Audit's "owner files pending / pending not waived" note is stale: peer files are
  authored. Either adopt real IDs (`slip §5`, `M-07`) or rename peer frames to SLIP-*/MB-*/MP-*.
- **[M]** Audit over-claims vs the owner frames: `cancel-able` pending contradicts
  ELEMENTS/slip E-13b "interruptible by nothing (commit in flight)"; `report this bet` doesn't
  exist (slip has `Query this settlement` on settled only); `Remove suspended · keep the rest`
  isn't in slip §5 (only `Remove`); "three timestamps" — only `placed` is shown; "bet365
  tri-icon grey circle/strikethrough" — implemented as `↺ void` neutral pill.
- **[m]** "Suspended (selection)" row cites SH-07 "frozen leg variant" — conflates
  offline-frozen with market-suspended; they're different channels (frozen is already covered
  under Offline row).
- **[m]** "LV-01 initial" loading cite is vague (generic variant covers it).

Scored coverage verdict: **every scored state IS proved somewhere** (suspended×2, changed,
failed, void, settled, empty, loading, offline, break×2, pending, selected, restored, RTL,
zero-count). The failure is referential, not coverage.

## (d) Mental-map consistency

- **[M]** Rule 2 broken as specced: "Live is always one tap from anywhere (rail + phone nav)" —
  but the phone bottom nav has NO Live entry (Menu·Sports·Casino·Chat·Support) and the sport
  row "yields to page header" on deeper pages (SH-04:114). From match page/sheet, Live = 2
  taps. Shell.md:31 even claims a "bottom nav path" that doesn't exist. Decide: Live in bottom
  nav (breaks 5-slot parity) or scope the rule honestly ("board surfaces").
- **[m]** 768–1024 contract gap: no sport row, no bottom nav, rail in `≡` drawer → Live is
  2 taps at exactly the tablet band.
- Ticket zone, rail, board, folded-map rule 4: **unbroken** everywhere else. Search breadcrumbs
  satisfy rule 5. RTL mirror rules correct (numerals LTR, no positional-only cues).

## (e) A11y + keyboard + focus order

- **[M]** Contrast math (mine, culori to confirm — see h2): **`--c-live` on s1 ≈4.2:1, on s2
  ≈3.5:1** — the `LIVE` word fails AA-text everywhere it sits; **`--c-text-3` on s2 ≈2.6:1** —
  and implied% (P1's signature number) is specced hb-micro **t3 on s2 cells** → ~2.6:1;
  **`--c-suspend` on s1 ≈4.46:1** — the scored suspension band sits exactly on s1, a hair
  under the 4.5 target; **`--c-down` on s2 ≈2.8:1** — tick glyph below even 3:1 non-text.
  These four pairs are the spec's biggest hidden defect.
- **[m]** Phone focus order (SH-09) has no skip-link (desk has one); prize "ticker" is a tab
  stop though never defined as a control; selected odds cell lacks an `aria-pressed`/selected
  announcement rule; ticking prize amount has no aria-live policy (should be off/batched).
- **[m]** Suspended band: `+N ›` navigable is correct, but whether the dimmed cells "behind"
  the band are pointer-inert is unspecified — spec it (should be inert).
- **[m]** LV-02 claims chips/first-odds-row "inside lower-2/3 reach band" — false as drawn;
  filter chips sit under the page header (top edge). Fix claim or placement (P5).
- Good: roving tablist on sport pills, suspended band `aria-live` non-focusable, combobox
  palette + Esc→trigger, non-modal sheet + focus return, dual-tone focus ring on cta, RM twins
  throughout, `role=timer` countdowns with once-announced flip.

## (f) Density / rhythm

- No nested cards; hairline coupon grammar consistent; one row atom across three pages ✓.
- **[m]** Two stacked horizontal-scroll surfaces on 390 home (live-strip cards + hero
  swipe-snap) — gesture sameness + carousel-fatigue back-to-back. Differentiate (compact list
  for strip, or vertically offset rhythms).
- **[m]** Pause control spec'd on a carousel that never auto-advances (HM-02, E-BRD-04) —
  dead affordance; drop it.
- **[m]** Live and Football pages risk template sameness (same grouped tables) — differentiated
  by filters vs tabs+market rebind; acceptable but the judge-facing difference should be stated.
- **[m]** Pale-cyan stack on one phone viewport: active sport pill + selected cells + hero CTA
  + slip pill = 4 acting fills; grammar holds but attention dilutes — watch in QC shots.

## (g) Cross-spec contradictions vs slip/match specs

- **[B]** Sample data disagree — the demo's single wallet has two states:
  shell/SH-01+E-SHL-01: `₮250.00 · Available 230.00 · In open bets 20.00` (internally
  consistent, matches the 20.00 open bet). slip-page+E-18/E-19: `Balance 240.00 · in bets
  60.00` — and it's internally wrong too (one open bet staked 20.00 ⇒ in-bets ≠ 60; available
  would be 180). Pick one ledger; 250/230/20 is the correct one.
- **[B]** Session line: `Net −24.00 USDT` (SH-01, LV-01) vs `net −12.00 USDT` (slip-page ×3,
  E-18). Value AND case differ — unify to sentence-case `net` + one figure.
- **[M]** Slip pill payload: FOUR spellings — SH-04 `❶ Arsenal @ 1.30 → ₮26.00 ⌃`;
  states-audit `❶…→ ₮26.00`; match M-09 `1 · Arsenal @ 1.30 · Pays 26.00`; slip E-02/§17
  `1 · Arsenal @ 1.30 · 52'` (minute, no return). Resolve one pill grammar (return-preview vs
  live-minute) + one chevron glyph.
- **[M]** Break-exit: SH-11 "one tap from the chip — exit as easy as entry" vs slip §14
  "deliberate 2-step in-place confirm (U-44)". Direct contradiction on the same control — log
  a decision (recommend 2-step; it still satisfies "easy exit").
- **[M]** Break `back` time: `22:40` (SH-11) vs `14:30` (slip §14/E-17) — same demo moment,
  two clocks.
- **[M]** Cash-out quote for THE SAME open bet (Arsenal @1.80, 20.00): `14.32` on match page
  M-10 vs `22.40` in slip §9. Same fixture/minute, different quotes.
- **[m]** Team-name truncation: end-truncate `Borussia Mönchenglad…` (SH-08) vs
  middle-truncate `Brighton & Hove…bion` (E-BRD-01 + slip edge) — pick one (middle wins;
  suffixes disambiguate).
- **[m]** Match-page void string `Void — match ended · stake returned` (M-11) drops the
  `{stake} USDT` amount that COPY mandates and slip §13 renders.
- Suspended treatment itself: consistent grammar (band/lock/60%-dim/reason/`+N›` alive) across
  boards → match (per-market escalation, documented) → slip leg. ✓

## (h) Flags — resolved

1. **Phone hero-vs-live-strip order → JUSTIFIED, keep.** Wireframe already parked Featured at
   position 5; inserting the live strip at 4 puts real prices inside the first 390 viewport
   (P51-14) at no depth cost to the hero, and honours the brief's own "Live now · Starting
   soon" ordering. Fix only the bookkeeping: this reorder is a structural fork that belongs in
   DECISIONS.md, not just boards.md:39–42. Related nit: (f) stacked-carousels.
2. **Contrast `~` values — culori priority order** (my WCAG approximations as triage):
   ① **`--c-text-3` on s2 ≈2.6** — implied% on every odds cell (worst defect; likely needs a
   token bump or surface change). ② **`--c-live` on s1/s2 ≈4.2/3.5** — the `LIVE` word fails
   AA as spec'd. ③ **`--c-suspend` on s1 ≈4.46** — scored band at the AA edge. ④ **`--c-down`
   on s2 ≈2.8** — tick glyph under 3:1. ⑤ `--c-cta-fg`/`--c-cta` ≈12.6 — probably passes AAA;
   confirm. ⑥ `--c-up` on s2 and `--c-gold` on s1 ≈4–9 — verify last. Also remeasure
   neon-on-s2 (≈8.4 — the identity pair, fine).
3. **Session-line placement → keep both slots** (panel footer always + Live sub-head,
   P52-21-defensible); must-fix is the payload, not placement: one net figure, sentence-case
   `net`, and the phone sheet footer must carry the FULL string — the merged
   `Take a break · Session 47m` drops the net (the honesty payload) entirely.

---

## Verdict: **FIX-REQUIRED**

Architecture is sound: parity essentially complete (all deviations justified except small
doc-gaps), the desk map holds, and every scored state genuinely exists in a frame. But the spec
cannot go to build with: a two-state demo wallet, a states-audit whose peer frame-IDs resolve
nowhere, four spellings of the pill, two contradicting break-exits, a self-broken overround
law, and implied%/`LIVE`/`Suspended` text specced below measured-AA floors.

Counts: **[B] 2 · [M] 15 · [m] 20** findings.

**Five worst:**
1. Sample-data ledger contradicts itself across shell/slip (250/230/20 vs 240/60; −24 vs −12;
   22:40 vs 14:30; CO 22.40 vs 14.32) — P6 broken in the demo's core data.
2. Contrast: implied% `t3-on-s2` ≈2.6:1, `LIVE` ≈4.2:1, `Suspended` band ≈4.46:1 — three
   signature/scored surfaces likely under AA floor.
3. States-audit dangling IDs (SLIP-*/MB-*/MP-* don't exist; stale "owner files pending";
   over-claims cancel-ability, tri-icon void, `report this bet`).
4. Pill payload contradiction ×4 spellings + break-exit one-tap vs two-step contradiction.
5. Mental-map "Live = one tap from anywhere" unsupported on phone; overround band breached by
   3 fixtures (108.7% max) — both erode P6/map credibility in front of a forensic judge.
