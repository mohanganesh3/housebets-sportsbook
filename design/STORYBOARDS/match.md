# Storyboard — Match page (FLAGSHIP · 20 pts + tiebreak #1)

Fixture: **Arsenal 1–0 Brighton & Hove Albion · Premier League · LIVE 52'**, played through to FT.
Route: `/match/ars-bha`. Widths: **390 + 1440** per frame.

Thesis (research/75-synthesis-v5.md): "The instrument" — pinned minimal header, six-plus market
groups, authored price typography, causality made visible (goal → lock → reprice).

Law cited per frame: P1–P6 (PRINCIPLES.md) · D-xx (DECISIONS.md) · S1–S8 (MOTION.md) ·
hb/s/r tokens (TOKENS.md) · COPY.md strings · MM rules (MENTAL-MAP.md) · W4-xx wireframe IDs
(INVENTORY.md) · ASKS rows (U-, T42-, P51-, C-, T7-, R-YAB-, X-). Element refs = E-M-xx in
design/ELEMENTS/match.md.

## Page anatomy (scroll top)

```
390                                          1440 (12-col content | 360px ticket panel)
─────────────────────────────────────        ────────────────────────────────────────────
<  ARS - BHA ⌄                       [head]   <  Soccer ⌄ | England ⌄ | Premier League ⌄ | ARS - BHA ⌄
┌─ scoreboard card (surface-1) ──────────┐    ┌─ scoreboard ─────────────────────────────────┐
│ <            PREMIER LEAGUE        ☆   │    │              PREMIER LEAGUE              ☆   │
│ [crest48] Arsenal   1 – 0   Brighton…  │    │ [crest48] Arsenal ★Following  1–0  BHA ☆Follow│
│      ★ Following   ● LIVE 52'  ☆Follow │    │                    ● LIVE 52'                 │
└────────────────────────────────────────┘    └─────────────────────────────────────────────┘
[Your bet] Arsenal @1.80 · Cash out 14.32 ›   (same strip, under scoreboard, when bet open)
⌕ Search markets or players                  ⌕ Search markets or players
Popular 10 · Goalscorers 9 · Goals 11 ▸…     Popular 10 · Goalscorers 9 · Goals 11 · Players 11 ·
                                             Halves 8 · Handicaps 5 · Corners & cards 14 ·
                                             Minutes 10 · All markets 78
Match result ⌃                              Match result ⌃
[Arsenal 1.30·77%][Draw 4.60·22%][BHA 11.00·9%]   [Arsenal … 1.30][Draw … 4.60][Brighton… 11.00]
Double chance ⌃ · Total goals ⌃ · +N          Double chance ⌃ · Total goals ⌃ · +N more markets
┌──────────────────────────┐                 (ticket lives in right panel — MM rule 1)
│ 1 · Arsenal @ 1.30    ⌃  │  slip pill
└──────────────────────────┘
```

Attention map (research/51 §3.4): 1st scoreboard · 2nd sticky tab bar · 3rd default-group first
market grid. Must-not-steal applied: tabs never outrank scoreboard; ≤4 concurrent flashes;
slip-open scrim freezes background ticks (S8/P51-11). Primary action: first 1X2 cell — slip open:
Place bet (51 §cross-page rule). Money actions inside left-80% band at 1440 (P51-20) — the right
panel holds the ticket but never a page-level confirmation (MM rule 1).

Wireframe deltas (A2.b/c): "Specials 7" tab DROPPED — brief out-of-scope bans specials (A1.k);
total becomes `All markets 78` not 85 (honest recount, not wireframe-matching fiction). Scoreboard
`<`/`›` edge steppers kept as prev/next fixture in competition (W4-02 note "prev match?"). Everything
else from W4-01…24 exists at both widths.

---

## M-01 — Arrival (route enter from a match row)

**Trigger:** tap a live match row on Home/Live/Football (`+78 ›` or any cell).
**390:** shared-element transition crest+names+score from card → scoreboard (P55-11; D-07 same-doc
View Transition, feature-detected; odds grid excluded). 200–260ms --ease-out-expo. First paint:
scoreboard + search + tabs + Popular group, first two accordions expanded.
**1440:** same morph into the wider scoreboard; right panel already mounted (persistent zone, MM).
**Copy:** `PREMIER LEAGUE` · `● LIVE 52'` · `Search markets or players` (W4-06 verbatim) ·
tab labels with counts · `Match result` / `Double chance` / `Total goals`.
**Elements:** E-M-01, 02, 03, 04, 05, 06, 07, 11, 13.
**Motion:** D-07/P55-11 route morph; zero odds flashes on first paint (P52-22 honest-feed, P55-04 —
flashes only on genuine deltas, never on mount). Skeleton only if data late: exact row geometry,
opacity shimmer ≤2 loops (U-42, U-57, X04).
**Why:** Familiar skeleton players know (R-YAB-04); authored detail lands in the price typography
and state honesty (75 moats 2–3). **Beats wireframe:** real transition + guaranteed no-flash first
paint + honest counts that sum to 78.

## M-02 — Scrolled: pinned minimal scoreboard

**Trigger:** scroll past scoreboard height.
**Both widths:** card collapses to pinned strip 44px: `[crest16] ARS 1–0 BHA` · `● 52'` · `☆` —
crests+score+minute only (D-05, U-38, FotMob pattern 72-canon rule 9). Tab bar pins directly
beneath; combined sticky chrome = strip + tabs, 1px hairline border-b, `scroll-padding-top` = its
height (Salaja sticky rule, 72). Depth lives in tabs, never in the header.
**Copy (SR):** "Arsenal 1, Brighton & Hove Albion 0, 52 minutes, live" — full names kept for SR
even when visually abbreviated (X02).
**Motion:** collapse = height+opacity 200ms --ease-out-expo; expands on scroll-up; interruptible
(newest scroll wins); RM: instant cut. Strip content never re-animates on ticks — clock/score
update in place.
**Why:** the score must stay glanceable while hunting 78 markets — that's the page's job (P1, P5).
**Beats wireframe:** wireframe loses all match context on scroll; we keep score+clock+follow in
84px of chrome vs their 0.

## M-03 — Market search active

**Trigger:** focus `⌕ Search markets or players` (`/` shortcut; 44px field, E-M-05).
**Both:** inline filter — market names and outcome labels match live; only hit accordions
auto-expand; tab counts re-sum (`Goals 3 of 11`); `All markets 78` stays as unfiltered escape
(T42-16). Player queries hit Goalscorers markets (fictional roster, X07).
**Copy:** results label `N markets match "{q}"` · empty `No markets match "{q}"` + `Clear search`
(new strings N4 — sentence case, ≤3 words).
**Motion:** zero animation while typing (U-43 frequent-action rule); expansions instant.
**Why:** 78 markets need a narrowing ladder — curate → filter → search (R-YAB-14); ≤2 taps to any
market (U-16, P5).
**Beats wireframe:** wireframe draws the box but no behaviour; ours filters, re-counts, deep-links.

## M-04 — Sticky group tabs with counts

**Trigger:** default state + horizontal scroll on overflow.
**390:** ~4.5 tabs visible, edge-fade both directions; **1440:** all nine visible.
**Order:** `Popular 10 · Goalscorers 9 · Goals 11 · Players 11 · Halves 8 · Handicaps 5 ·
Corners & cards 14 · Minutes 10 · All markets 78` — Popular first, All markets LAST (T42-09,
U-28, R-YAB-16 edges rule; wireframe order preserved minus banned Specials).
**Active tab:** --c-cta pill + --c-cta-fg text — the ONE selected-language reused site-wide
(D-01, SA4-18, R-YAB-08). Selected tab scrolls to center-x (P51-09).
**Copy:** label + count, counts live-update as markets open/suspend/close (count is tnum Oxanium,
T7-03).
**Motion:** none on tab switch — content cross-fades 150ms opacity only (repeat action, U-43);
RM identical. State in URL `?group=goals` (U-45, 72 rule 22).
**Why:** counts upfront = M4/A37.S3 ask + scanning aid before opening a group (U-17, R-YAB-05
chunk-before-count; P51-09 linear menu ordered by frequency).
**Beats wireframe:** live counts, URL state, scroll-into-view, one honest total.

## M-05 — 1X2 market row (the task terminus)

**Trigger:** none — default expanded `Match result` accordion under Popular.
**390:** three cells, label-over-price chips ≥44px h, ≥8px gaps (P51-03, T7-07, R-YAB-01):
`Arsenal 1.30 · 77%` · `Draw 4.60 · 22%` · `Brighton 11.00 · 9%`.
**1440:** three wide rows label-left / price+implied right (W4-24), ≥36px h.
**Why:** P1 — the price is the product: Oxanium tabular, implied probability beside every price
(U-47, U4-F9/F10 RCT evidence), 1X2 L→R home-draw-away convention kept (R-YAB-04). ≤3
outcomes/row (P51-10, R-YAB-03 Hick).
**Open challenge:** wireframe prices 1.30/4.60/11.00 = 107.7% overround, breaching the P6/X07
103–107% band. Proposal: Draw 4.60→4.80 (106.84%) keeps both team prices wireframe-true — flagged
to data owner; EVIDENCE pending either way.
**Beats wireframe:** implied % on every price (nobody ships this), ≥44px targets, fixed geometry.

## M-06 — Tick up / tick down moment

**Trigger:** feed reprices Draw 4.60 → 4.80 (market still open).
**Both:** S1 — digits morph in place 250ms --ease-out-expo (NumberFlow trend=0), ▼ glyph appears,
--c-down tint overlay decays ~1s linear; muted ▼ persists ~9s, cell tooltip `was 4.60 → 4.80`
where cheap (T42-08). Direction triple-coded: glyph + tint + signed movement — never colour alone
(A13.c, C-01, C-02).
**Constraints:** ≤4 concurrent flashes in viewport (P51-11, R-YAB-17); while slip holds a pending
stake, ticks mute to tint-only (S8); a new tick supersedes the running one — never queues
(P4, U-56). RM: instant swap + glyph + tint.
**Copy:** none new — movement is the message (U-50 delta-fact, never momentum bait).
**Beats wireframe:** wireframe is static; the "Odds moving" scorecard line lives here — with the
`was →` trail no rival shows.

## M-07 — SUSPENDED market (dangerous attack)

**Trigger:** feed suspends `Total goals` — dangerous attack near Brighton's box.
**Both:** S3 — same frame, 0ms: accordion stays open; all three cells dim to 60%, padlock glyph
locks the price column; amber reason chip `Suspended — dangerous attack` appears in the accordion
header (D-04, U-04, U-27). Last prices stay visible — honest, not dead (P2, P6). `+N`/tab counts
unaffected; market still navigable (W2-26 pattern).
**Copy:** `Suspended — dangerous attack` (COPY suspended pattern; vocabulary: `goal scored` /
`VAR check` / `penalty` / `dangerous attack` / `break` / `feed issue` — T42-01, XV4-02, A13.S3).
If a slip leg is on this market: `This pick is suspended — dangerous attack` (COPY verbatim).
**Motion:** integrity = no animation on the lock (S3). Reopen: 150ms un-dim then repriced ticks
(74 vocab). RM identical.
**Why:** mystery suspensions are U1's #2 complaint cluster ("locks for no obvious reason",
"bet stuck on suspended"); the reason chip + visible last price is the direct answer, and the
amber+🔒+word triple channel survives CVD (C-09, C-13).
**Beats wireframe:** wireframe suspends whole cards; we suspend per-market with a named reason —
nobody else shows *why* (42-teardown "ours" column).

## M-08 — Goal cascade (S4, the signature sequence)

**Trigger:** Brighton equalise, 54'. Deterministic three-beat arc ≤2.5s total (T42-21, P55-06).

- **Beat 1 (t=0–300ms):** score digit rolls NumberFlow +1, 300ms; event line types in under the
  score: `Goal — Brighton & Hove Albion 54'` (N1). Scoreboard `1 – 1`.
- **Beat 2 (t≈300–700ms):** scoreboard edge flash — 2px ring ::after opacity pulse 400ms, --c-live;
  simultaneously (same frame) every goal-linked market locks: Match result, Next goal, Total goals,
  Correct score, Goalscorers — `Suspended — goal scored` chips, cells dim.
- **Beat 3 (t≈700ms–2.5s):** markets reopen one-by-one in list order; prices re-enter as reprice
  ticks. Encoding = odds-number direction, never bettor fortune (C-02 convention, U-50
  delta-fact): Arsenal 1.30→1.44 ▲, Draw 4.60→3.75 ▼, Brighton 11.00→7.50 ▼ — the number rose or
  fell, the glyph says which; what it means for a backer is the implied %'s job, not the glyph's.

**Interrupt:** a second event (VAR disallowal, second goal) supersedes mid-cascade — newest state
wins, nothing queues (P4, S4). RM: score updates + event line only — no roll, no flash, no cascade
motion (states still land).
**Copy:** `Goal — Brighton & Hove Albion 54'` · `Suspended — goal scored` · reopen ticks silent.
**Why:** causality made visible is the moat (75: "goal → lock → reprice" in one glance; R-YAB-07
goal-flash peak; A13.e quiet celebration — edge flash is information, not confetti). This is the
tiebreak page's hero moment: exactly one hero motion per flow (74 attention law).
**Beats wireframe:** wireframe can't show this; every rival suspends silently. One deterministic,
judge-replayable sequence.

## M-09 — Pick added (ticket updates)

**Trigger:** tap `Arsenal 1.30`.
**390:** cell flips to selected (--c-cta fill, --c-cta-fg text, ✓ — identical geometry, C-11) in
--dur-feedback; S2 flight: cell → slip-pill chip morph 280ms --ease-standard, transform-origin at
the cell — ONLY on explicit add (S2, U-46: the ONE signature move). Slip pill slides up:
`1 · Arsenal @ 1.30 · Pays 26.00` + `⌃` (payout preview, T42-12, U-29).
**1440:** same cell→panel chip morph into right-panel slip card; no pill (panel is the zone, MM).
**Copy:** pill `1 · Arsenal @ 1.30 · Pays 26.00` (N — extends U-29 pick-on-pill with return).
**Motion budget:** while stake is pending, all board motion → tint-only (S8 calm-live; P51-11
freeze behind scrim when sheet opens).
**Interrupt/RM:** tap elsewhere mid-flight → morph completes to newest state; RM: ticket count
pulses once, no flight.
**Why:** P4/MM rule 3 — the pick's journey is spatial: cell → ticket zone → receipt. The flight
teaches where the ticket lives (the mental-map lesson in motion).
**Beats wireframe:** wireframe's ✓-state exists but nothing travels; ours makes the desk's physics
legible (72-canon rule 23: one authored move).

## M-10 — Open bet visible on the match page

**Trigger:** user has an open single on this fixture (Arsenal @ 1.80, placed pre-match).
**Both:** `Your bet` strip directly under scoreboard, above search (E-M-12): left `Arsenal @ 1.80`,
right `Cash out 14.32 USDT` live-quoting (S7 NumberFlow, neutral — no pulse, U-51, P52-08) + `›`
to the ticket's My bets tab (panel tab on desk, sheet tab on phone — same object, MM rule 4).
**Suspended market:** `Cash out paused — market suspended` (COPY verbatim, U-08) — strip stays,
quote freezes visibly dimmed.
**Copy:** `Your bet` · `Cash out {value} USDT` · paused variant (COPY) · `Offer moved to {value} —
confirm new amount` on tap-after-move (COPY, U-06).
**Motion:** value ticks via S1-style digit morph; no border pulses, no countdown pressure
(P52-13, U-51). RM: instant values.
**Why:** A22.a/S2 retention-with-respect + T42-11 (FD "My Action" pattern Stake lacks — free win);
must-be-seen info sits in content flow on a real surface (P51-16), not greyed footer microcopy.
**Beats wireframe:** nothing in the wireframe connects match → open ticket; this is a named ask.

## M-11 — FT settled state

**Trigger:** feed ends match, 1–1.
**Both:** clock → `FULL TIME` (word, never colour alone — A13.b); scoreboard settles (follow stars
persist — follows outlive matches); every market accordion flips to settled: winning outcome cell
gets quiet ✓ + --c-up edge tint ≤3s fade (P52-10), losing outcomes dim to text-3, suspended
markets mark `Void — match ended · stake returned` (extends COPY void pattern, N14).
`Your bet` strip → `Settled · won 16.00 USDT` or `Settled · lost 20.00 USDT` (COPY verbatim) +
`View in My bets ›` deep-link (T42-13 receipt journey).
**Copy (SR):** "Full time. Arsenal 1, Brighton & Hove Albion 1."
**Motion:** clock stops (no motion); settle marks fade in opacity-only; RM identical. No post-loss
promoted action anywhere on the settled page (U-52, P52-06).
**Why:** P6 — terminal states are designed, not absent; U-54 quiet wins/factual losses; the market
grid remains as record (X05 honesty, XV4-17 never-drop).
**Beats wireframe:** wireframe has no settled world; scorecard's "every state" line is paid here.

## M-12 — Market accordion depth

**Trigger:** tap collapsed accordion / switch to `All markets 78`.
**Both:** accordion header = market name hb-h1 + optional settle note `Settles on 90′ + stoppage`
(T42-22 trust microcopy, hb-micro text-3) + chevron. Height 0↔auto 250–280ms --ease-standard,
chevron rotates 180°, content keeps open width during collapse (P55-16, Salaja). RM: instant.
Default: first two accordions open in the active group; `+N more markets` tail disclosure inside
long groups; `All markets 78` = anchored index jumping to each group (U-16 ≤2 taps).
**Why:** density via rhythm + grouping — hairline list regions, no nested cards (D-09, U-40,
SA4-01, R-YAB-19 one boundary = one meaning); chunking beats item caps (R-YAB-05).
**Copy:** group names verbatim (W4-23); per-market names sentence case.
**Beats wireframe:** wireframe shows 3 accordions; we show 78 markets across 9 groups with
URL-addressable state (?group=&open=) and honest empty groups hidden.

## M-13 — Long-team-name stress frame

**Trigger:** same page, stress fixture data (Brighton & Hove Albion = 22ch real case; test bench
"Wolverhampton Wanderers" 23ch, Arabic-locale render for X02).
**Both:** scoreboard names wrap ≤2 lines at hb-title then end-ellipsis (matches W4-03
`Brighton &\nHove…`); odds-cell/accordion labels single-line ellipsis at fixed budget — type never
shrinks below hb-body to fit (T7-10); numbers NEVER truncate (U-45, Salaja rule 21); full name in
SR label + long-press/hover expand (X03.9 edge). Score column width is fixed — names may wrap but
`1 – 0` never moves. RTL: layout mirrors, digits stay Latin Oxanium (C-18).
**Nothing clips at 360** (A23.c proof shot owed).
**Why:** i18n is an X02 row and a named edge case (X03.9); "numbers never truncate, names
middle-truncate" is Salaja canon.
**Beats wireframe:** wireframe already clips `Hove…`; we define the wrap rule + SR/full-name path.

## M-14 — Offline / frozen prices (edge state)

**Trigger:** connectivity lost mid-page.
**Both:** scoreboard + all prices freeze as-is; a single quiet band under the scoreboard:
`You're offline — prices are frozen, not live` (COPY verbatim); all odds cells inert (not
suspended — no amber, no lock: this is *our* failure, not the market's — different channel:
text-2 on surface-2, no reason chip). Reconnect → `Back online` + revalidation sweep re-ticks
changed prices (T42-22, U-15).
**Why:** every state designed (P6, X06); never fake live-ness — the honesty moat.
**Beats wireframe:** absent in wireframes; scorecard's "every state" line.

---

## Coverage map (scorecard proof)

| Scorecard line | Frames |
|---|---|
| Match page 20 pts | all |
| Odds moving | M-06, M-08c |
| Markets suspended | M-07, M-08b, M-14-inert distinct |
| Follow team/competition | M-01/02 (stars), E-M-04 |
| Search markets | M-03 |
| Open bet + cash out on page | M-10, M-11 |
| Settled state | M-11 |
| Long-name/RTL/offline stress | M-13, M-14 |
| Tiebreak depth (78 markets, counts, S4) | M-04, M-08, M-12 |

Pending QC hooks: blur test @390 first-fixation = scoreboard (P51-17); overround re-measure after
Draw price decision (X07.S1); CVD shots of tick/suspend/follow states (C-16); Playwright arc
recording of M-08 cascade (MOTION verification clause).
