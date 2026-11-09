# STORYBOARDS — Shell

The desk every page sits in. Law: MENTAL-MAP.md (rail/board/ticket zones), TOKENS.md, MOTION.md,
COPY.md, DECISIONS.md. Parity anchors: research/wireframes/INVENTORY.md "SHARED SHELL ELEMENTS"
(top bar, 72px rail, phone Menu·Sports·Casino·Chat·Support bar). Improvement register per frame
cites U-rows (qc/ASKS.md §Wave-U) and principles (P1–P6).

Frame IDs: `SH-nn`. Element cards: `design/ELEMENTS/boards.md` (icon rail item, bottom nav item,
balance widget, deposit button, search palette, offline banner, session line).
All sample numbers from `design/DATA-CANON.md` (D-17) — no other source.
Glyphs in ASCII sketches (`●`, `★`, `🔒`, `⌕`, `▾`, crest marks, trophy) are SHORTHAND for the
authored 20px/1.5px glyph set — never emoji in the build (TOKENS icon law).

---

## Zone map (all frames, both widths)

```
1440  ┌────────────────────────────────────────────────────────────────────┐
      │ TOP BAR 60px: logo · prize ticker · search ⌘K · balance · deposit    │
      ├────┬──────────────────────────────────────────────────┬─────────────┤
      │RAIL│ BOARD (12-col, max 1312)                          │ TICKET 360  │
      │72px│                                                  │ panel       │
      └────┴──────────────────────────────────────────────────┴─────────────┘
 390  ┌────────────────────────┐
      │ TOP BAR 60px            │
      │ SPORT ROW (boards only) │
      │ BOARD                   │
      │ slip pill (floats)      │
      │ Menu Sports Live Casino │ 67px +safe
      │        Chat Support     │
      └────────────────────────┘
```

The ticket never shares the board's space; Live is one tap from anywhere — rail on desk,
sport row on boards, bottom-nav `Live` slot on all phone surfaces (D-20).
Ticket zone = same object on both devices (MENTAL-MAP rules 1–4).

---

## SH-01 — Desktop 1440 · signed-in shell (default demo state)

**Top bar, L→R (60px, --c-bg, hairline bottom border --c-surface-1):**

| Slot | Content | Spec |
|---|---|---|
| Rail toggle | `≡` 20px glyph | collapses rail to 0 on <1024; always visible ≥1024 |
| Logo | `housebets` wordmark + cyan h-glyph (verified SVG) | links to `/` home; never a dead control |
| Prize ticker (center) | `Weekly Prize · $50,000.00` + trophy glyph | DISPLAY ONLY — not a control, not a tab stop; `aria-live=off` on the ticking amount (SR gets `Weekly prize, 50,000 US dollars` once). Amount ticks via S1 digit morph. Crown/Leaderboard control REMOVED (out of the 5-page scope — crit (a)). Housebets chrome signature kept (U-32). Gold = `--c-gold`, prize surfaces ONLY (71-brand rule 7) |
| Search field | `⌕ Search teams, players or leagues   ⌘K` | focus opens palette (SH-06); collapses to glyph button <1024 |
| Balance widget | `₮ 240.00 ▾` | Oxanium hb-odds; ▾ opens wallet popover: `Available 180.00 · In open bets 60.00`; auto-refreshes on settle/place/deposit — never requires navigation (U-19) |
| Deposit | `Add funds` | `--c-cta` fill, `--c-cta-fg` text, r-md — pale-cyan does the acting (U-25, D-01); the ONLY primary button in chrome (71-brand rule 4) |
| Panel toggle | panel glyph | switches 360px ticket; highlighted while open (W5-20 parity) |
| Avatar | initials glyph button | account menu: `Safer gambling`, `Odds animation: Flash / Instant` (user-facing RM twin — P55-21), `Sign out (demo)` |

**Left rail (72px, --c-bg, hairline right border):**

| Zone | Items (20px custom glyphs, 1.5px stroke) |
|---|---|
| Products | `Home` (house glyph) · `Live 13` (video glyph + live-count badge + pulse dot) |
| Sports | Soccer · Tennis · Basketball · Baseball · American Football · Esports |
| Casino peers | Roulette · Slots (71-brand rule 9: Sports and Casino are peers) |
| Bottom-anchored | Chat · Support · `Take a break` (RG rung, text-3 glyph — reachable, never loud, MENTAL-MAP footer layer) |

Active item: `--c-brand-neon` glyph + `--c-surface-3` 40px r-md tile + 3px leading-edge
indicator bar. Count badge on Live = chip, #FF4D6D bg + #14060A fg numeral, Oxanium hb-micro
(post-crit badge pair — word+icon+chip, never color alone, U-41; E-SHL-03/E-BRD-08 mount).

**Right panel (360px, --c-surface-1, hairline left border):**
Tabs: `Bet slip ① | My bets ① | Chat` + collapse `⟩`. Default content (empty slip):
house-glyph cameo + `Your ticket is empty — tap a price to start` +
`Min stake 1.00 USDT · Singles only`. Panel footer pinned: **session line**
`Session 47 min · net −12.00 USDT` (hb-micro text-2, tap → safer-gambling sheet — U-49, P52-01)
over `18+ · Play responsibly · Take a break` (COPY.md).

*Cameo arbiter (crit b): the ≤1-per-view glyph budget is resolved per VIEW, not per element —
priority: empty ticket panel > board empty module > search palette. When two candidates
co-render, the loser renders type-only, no glyph (E-BRD-09, SH-06 obey this).*

**Improvements over wireframe (A2.b):** balance always live (their bar is logged-out only);
session/RG line in-chrome not buried (P51-16); Live carries a count badge in rail (wireframe
has no count); ticket is the slip, not a promo slot.

**Motion:** panel slides 240ms ease-standard in / 160ms out (MOTION sheet physics); ticker
tick = S1 ≤260ms tint+digit morph; everything else static. Motions in viewport: ≤2.

**Attention map (A11):** 1) LIVE badge + first price column · 2) prize ticker gold · 3) pale-cyan
Deposit. Ticker is chrome — it may not out-salience board odds (P51-20).

---

## SH-02 — Desktop 1440 · logged-out shell (wireframe parity)

Identical frame as SH-01 except right cluster = `Log In` (surface-2 pill, text) +
`Register` (--c-cta fill) — verbatim parity with W1/W2/W3 desk top bars (INVENTORY §SHARED).
Our entry ships signed-in (SH-01) so balance/deposit/ticket states are demonstrable; this
variant exists for the first-load frame before demo auth resolves and for the state-tour.
Reason logged-out isn't default: the scored states (place bet, changed, failed) need a wallet.

---

## SH-03 — Desktop 1024 · tablet fold

Rail collapses under a `≡` toggle (icons-only drawer over content, scrim). Right panel becomes
an overlay sheet on the right edge + scrim (MOTION: scrim optional ≤1024 → we take it).
Board grid re-flows 12-col→8-col; prize ticker stays centered; search collapses to glyph.
No element is deleted — the map folds, per MENTAL-MAP rule 4.

---

## SH-04 — Phone 390 · top bar + sport row + bottom nav (home-level boards)

**Top bar (60px):** `housebets` logo left. Right cluster: `₮ 240.00` balance pill (surface-1,
hb-odds-sm Oxanium, tap → wallet sheet with `Available 180.00 · In open bets 60.00` +
`Add funds` CTA — deposit ≤2 taps, U-19) + `⌕` search glyph + avatar dot.
Signed-out parity variant: `Log In` + `Register` mint pill (W1-12).

**Sport row (directly under top bar, sticky, 44px, scrolls x with edge fades — P51-09):**
`Home` (active) · `● Live 13` · `Soccer` · `Tennis` · `Basketball` · `Baseball` · `Am. Football` ·
`Esports`. Active = `--c-cta` fill + `--c-cta-fg` text (pale-cyan = selected, D-01). Live pill:
`●` + `Live` + count chip (#FF4D6D bg + #14060A fg — badge pair); the count is a live surface,
not decoration. On deeper pages this row yields to the page header (back + switcher) — the
row is a board-level chrome, not global (W3-01 pattern).

**Bottom nav (67px + env(safe-area-inset-bottom), --c-bg, hairline top):**
`Menu · Sports · Live ●13 · Casino · Chat · Support` — 6 equal slots (65px @390, 60px @360),
20px glyph + hb-micro label. **Live is a first-class slot** — bet365's praised central
live-hub pattern; makes MENTAL-MAP "Live = 1 tap" true on phone (D-20; adds one slot vs the
wireframe's 5 — logged fork). Live slot carries a count chip (`--c-live` bg + dark fg numeral).
Active (Sports on board pages, Live on /live): `--c-brand-neon` glyph+label + `--c-surface-3`
tile. Other improvements kept: `Su…`-truncated avatar → `Support` word that never truncates
(U-45); labels hb-micro ≥11px (T7-02); 44px targets via pseudo-element.

**Floating slip pill (when ticket non-empty — T42-19, U-29):** r-pill, sits 8px above bottom
nav, 16px side insets, hairline ring only (the one shadow belongs to sheets — TOKENS).
Two payloads, one grammar (DATA-CANON):
· legs exist → `●1 Arsenal @1.30` (--c-cta fill, dark text) — pick only, NEVER a `Pays X`
  string before a stake exists;
· no legs, open bet exists → `●1 Arsenal · 1–0 · 52' · CO 22.40` (surface-1, live CO quote).
Never occludes the last row: board scroll padding-bottom = pill height + 16 (P51-07).

---

## SH-05 — Phone 360 / 430 stress

360: sport row keeps scroll (no wrap); balance pill drops `USDT` suffix → `₮240.00`, never the
digits (numbers never truncate — U-45); bottom nav labels stay (6 × 60px slots). 430: sport row
reveals +1 sport; no other change. Nothing clips at any of 360/390/430 (A23.c gate).

---

## SH-06 — Search palette (⌘K) — open / results / empty / keyboard

**Open:** desk = 640px palette anchored under top-bar field, scrimless, surface-2 + hairline +
r-md (it is a popover: TOKENS grants the ONE 8/24 shadow and r-lg to sheets only — the palette
gets neither on desk). Phone = top-anchored sheet, same object — there it IS a sheet: r-lg +
the one shadow. Input autofocused, placeholder `Teams, players, competitions, markets` (brief
verb list, U-16).
Trigger glyph `⌘K` hint inside field on desk; `/` also opens.

**Results (as-you-type, grouped, ≤7 visible per group — R-YAB-14 ladder):**

```
★ Follows            (your follows ranked first — T42-15)
  ★ Arsenal              Football · Premier League
  ★ Premier League       Football · England

Teams
  Arsenal                Football · Premier League        → /football/pl
  Brighton & Hove Albion Football · Premier League        → /football/pl

Competitions
  Premier League         Football · England · 3 live      → /football/pl

Matches
  Arsenal v Brighton     Premier League · LIVE 52'        → /match/ars-bha

Markets
  Match result           Arsenal v Brighton · Match · 1X2  ›
  Both teams to score    Arsenal v Brighton · +N › deep-link to group
```

Every row states WHERE it lives (MENTAL-MAP rule 5: `Arsenal · Premier League · Match`).
e-Sims quarantined under a labelled `Virtual / e-sim` section, never mixed with real teams
(U-16, U1 §7 verbatim pain). Recent searches above the fold when input empty.
**Empty:** `Nothing found for “{q}”` + `Try a team, league or market` + `Browse all sports ›`
— one next step (X05, X06). Type-led, NO house glyph — the cameo arbiter gives the view's one
cameo to the ticket panel (U-32, SH-01 note).
**Keyboard:** ↑↓ move, Enter go, Esc close (returns focus to trigger — Salaja dialog law);
state in URL `?q=` (U-45). Palette is instant (no animation on open beyond 120ms fade —
frequent-action rule, U-43).

---

## SH-07 — Offline → reconnect

Trigger: connectivity loss (demo: state-tour toggle / real `offline` event).
- Banner above bottom nav / bottom edge on desk: `You're offline — prices are frozen, not live`
  (COPY.md). Neutral surface-2 band + **cloud-slash glyph** + text — the offline encoding is a
  BANNER, never the suspended chip (DATA-CANON one-grammar); NOT red-error (XV4-04: own the
  fault, calm copy). Sticky until reconnect; `role="status"`.
- Board: all clocks stop at last value; live badges keep `● LIVE` + a `Frozen` caption line;
  odds cells dim to text-3, taps are swallowed with `Prices frozen` tooltip — never a silent
  dead button (P6, U-41 word+icon).
- Ticket: legs keep last price + `Prices frozen` chip; Place bet disabled with reason visible.
- Reconnect: `Back online` toast (betby phonetic, --c-up glyph, 3s auto-dismiss) → prices
  revalidate; any leg whose price moved surfaces old→new in the ticket (U-01, XV4-05).

---

## SH-08 — RTL mirror + long-label stress (X02, C-18)

`dir="rtl"`: rail flips to the RIGHT edge, panel to the LEFT, bottom nav order mirrors,
chevrons/`+N ›` flip direction. What does NOT mirror: Oxanium numerals (prices, scores,
clocks stay LTR), 1X2 semantic order (home-draw-away keeps logical order), ▲▼/🔒/★ glyphs
(direction-agnostic — C-18). No positional cue may carry meaning by itself.

Long-label stress cases rendered in this frame:
- Team: `Borussia Mönchengladbach` (24ch) → row cell middle-truncates `Borussia Mö…bach` at the
  name budget (one truncation rule everywhere — slip uses `Brighton & Hove…bion`); full name on
  hover/focus + always complete on the match page (T7-10, U-45).
- Competition: `CONCACAF Champions Cup` → header wraps name, never the count.
- Locale: German tab `Live & Bevorstehende 6` (33% longer) → segmented control grows, count
  stays attached; `Add funds` → `Guthaben aufladen` fits the CTA min-width.
- Prize ticker `$100,000.00` max-length: fixed-width cell, tabular — no layout shift.

---

## SH-09 — Focus order (keyboard tour, X01, Walters review order)

Desk 1440 — sequential Tab order:
1. `Skip to board` skip-link (visible on focus only)
2. Top bar: rail toggle → logo → **search field** → balance ▾ → **Add funds** → panel toggle →
   avatar menu. (Prize ticker is DISPLAY — never a tab stop; amount `aria-live=off`.)
3. Rail top→bottom: Home → Live 13 → sports → casino peers → Chat → Support → Take a break
4. Board: **content search bar** → sport nav pills → section controls (carousel ‹ ›) → group
   headers → rows (cells L→R → `+N ›`) → `View all ›` — DOM order, no tabindex hacks
5. Right panel: tab strip → slip content → stake field → Place bet → session line → RG strip
6. Footer dock links

Phone: skip-link → top bar → sport row → **content search bar** → board → slip pill → bottom
nav (`… → Live ●13 → …`); nav is LAST — board content outranks chrome (P1). Every interactive
shows `--c-focus` 2px ring, 2px offset (token); on pale-cyan surfaces the ring gets a dark
offset pair (C-11 — ring-on-cyan fails 1.04:1). Selected odds cell = `aria-pressed` toggle,
announced `Arsenal 1.30, selected`.

**Roving rules:** sport-nav pills = one tab stop + arrows (tablist); odds cells each focusable
(real buttons); suspended chip is NOT focusable (info region, `aria-live`) and the dimmed cells
behind it are pointer-inert — last price is visible, never tappable (crit (e)).

---

## SH-10 — Session continuity on return (U-20, XV4-12, RV4-12)

Back from a match page / app-switch / reload: board restores exact scroll + open group +
active filter (state in URL — U-45). Ticket selections restored with a quiet banner
`Selections restored — prices revalidated` + per-leg flag if moved. On relaunch after a
pending submit: `Checking your last bet…` reconciliation line → `Placed ✓ ref HB-90210` or
`Didn't go through — balance untouched. Retry` (XV4-24, RV4-12, D-19). Session never dies on
app-switch <30s; re-entry is biometric, returning to identical state (XV4-12).

---

## SH-11 — On-a-break state (U-53 rung, U-21)

Break active: balance pill → `On a break · back 22:40` chip (text-2, neutral — C-20, no
alarmism); board renders normally but every odds cell is inert + top-of-board module:
`On a break · back 22:40. Betting is off until then. Prices are read-only. Cash out still
works.` — unified with slip §14: a break blocks staking, never blocks reducing exposure.
Deposit hidden (P52-16). `End break early ▾` → **deliberate 2-step in-place confirm**
(`End break?` → `Confirm`) — U-44 destructive in-place confirm, one grammar with the slip
(crit g: the one-tap exit is REJECTED).

---

## Shell breakpoint contract

| bp | rail | panel | sport row | bottom nav | search |
|---|---|---|---|---|---|
| 1440 | 72px fixed | 360px fixed, push | — (nav in rail) | — | field, `⌘K` |
| 1024 | 72px fixed (width allows it) | overlay + scrim | — | — | glyph → palette |
| 768 | `≡` drawer | overlay + scrim | pills row appears (Live reachable ≤1 tap) | appears (Live slot) | glyph → palette |
| ≤430 | hidden (in Menu) | slip = pill→sheet | sticky pills row | 67px + safe-area | glyph → palette |
| 360 | as ≤430 | as ≤430 | as ≤430 | as ≤430 | as ≤430 |

Live = 1 tap at every width: rail badge ≥1024, pills row + nav slot ≤1024 (crit d — the old
768–1024 drawer band is closed).

No frame may exceed these mutations; the four-zone map is identical at every width.
