# Element cards — Match page (flagship)

Template per qc/ASKS.md A23.d/A24.a: every field filled, EVIDENCE and CHALLENGE stay **pending**
until the second-agent pass. Notation: `s4…s64` = spacing scale (4px base) · `r-sm/r-md/r-lg/r-pill`
· `hb-*` = type steps (TOKENS) · `--c-*` colors · `--dur-*/--ease-*` motion · citations:
P1–P6, D-xx, S1–S8, W4-xx (wireframes), U-/T42-/P51-/C-/T7-/R-YAB-/X- (qc/ASKS.md), 51/72/74 =
research files. Player-expectation fields per A24: **Before / Expects / We show / Next**.

Depth order: E-M-08 (odds cell) is the signature card — fullest spec.

---

## E-M-01 — Scoreboard header (pinned minimal)

**ELEMENT** scoreboard header · **PAGE** /match/ars-bha · **STATES** expanded / pinned-collapsed /
goal-flash / FT / offline-frozen.

**WHERE** — top of content column, both widths. 390: full-bleed card below `ARS - BHA ⌄` header;
1440: full content-column width below breadcrumb. Collapses to 44px pinned strip on scroll;
market tabs pin beneath it.

**WHY THERE** — D-05 + U-38: pinned minimal header (crests+score+minute), depth in tabs — the
FotMob pattern (72-canon rule 9) chosen over hero card + stats banner. Scoreboard is the page's
reason → first fixation (51 §3.4). It wears the ONE card treatment allowed outside the slip
(SA4-01 hairline-list rule: card chrome survives on hero + slip; this header is the page's hero).
Pinned strip preserves match context while hunting 78 markets (P1, P5).

**SIZE/SPACING** — expanded: padding s16 sides / s12 top / s16 bottom; teams row s16 between
name blocks and score; pinned strip h44, side padding s12. Score digits in fixed-width boxes
(wireframe `1 – 0` boxed chips): each score box 44×44 @390 / 40×40 @1440, gap s8.

**TYPE** — competition `PREMIER LEAGUE`: hb-micro 11/14, caps, tracked, text-3. Team names:
hb-title 20/24 Figtree 600, wrap ≤2 lines then ellipsis. Score: hb-score 22/26 Oxanium 700 tabular.
Pinned strip: `ARS`/`BHA` hb-label 12/16 600 + score hb-odds 15/20 Oxanium.

**COLOUR+contrast** — surface-1 card on --c-bg, 1px surface-2 hairline all round (border drawn
once — Geist rule); names --c-text (≥7:1 target, pending T6); competition text-3 (≥4.5 pending);
score --c-text on surface-2 score-boxes. Pinned strip = surface-1 + hairline-b.

**BORDER/RADIUS/ELEVATION** — r-md, hairline borders, zero shadow (elevation-by-hairline law;
crest shadows banned SA4-05).

**MOTION** — collapse: height+opacity 200ms --ease-out-expo, interruptible by scroll direction;
expand mirrors on scroll-up (closes faster than opens not applicable — same axis symmetric);
goal-flash: see E-M-10; score roll: NumberFlow +1 300ms (S4); clock ticks in place (no motion);
RM: collapse = instant cut, score/flash = instant + event line.

**PLAYER EXPECTATION**
- **Before:** user sees the match they tapped — crests, names, current score, honest clock.
- **Expects:** scoreboard stays put / reappears when scrolled back; score is truth.
- **We show:** collapse to minimal pinned strip when scrolling for markets; full card on return.
- **Next:** eye goes to tab bar (2nd fixation) or to `Your bet` strip when present.

**FAILURE MODES** — long names: wrap ≤2 lines then end-ellipsis, score column fixed (M-13); feed
stale: `Live data may be delayed` micro-note on clock affordance (U-15); offline: whole card
freezes, no amber (that's our failure, not the market's — M-14); unknown competition label:
falls back to country+league string, never blank; pinned strip while goal cascade runs: strip
edge flashes instead of full card.

**A11Y** — header region labelled; SR order: competition → home → score → away → status → follows.
Pinned strip keeps full-name SR text (X02). Score changes announced once via live region (P55-22).
Stars keyboard-reachable (E-M-04).

**EVIDENCE** — pending (blur test @390 first-fixation = scoreboard, P51-17; pinned-strip shot).
**CHALLENGE** — pending.

---

## E-M-02 — Crest treatment

**ELEMENT** authored club crests · **PAGE** match (shared system) · **STATES** 48 hero / 24 chip /
16 disc / unknown-team fallback.

**WHERE** — hero tier (48px) flanking the score in scoreboard; disc tier (16px) in pinned strip
and `Your bet` strip; chip tier (24px) where a market names a team (e.g., "To score first —
Arsenal" rows) — never inside odds cells (label text suffices; crest-in-cell = noise, one-boundary
rule R-YAB-19).

**WHY THERE** — D-10 + A37.S1: authored silhouette system, 3 detail tiers (TOKENS iconography);
initials-in-disc and emoji crests are AI fingerprints (SA4-03) and are greppable-banned. Crests
carry identity at glance speed (P1: chrome serves content — here chrome IS content).

**SIZE/SPACING** — 48/24/16px tiers only; s8 gap crest↔name (vertical stack @390 per W4-03:
crest above name; horizontal @1440 per W4-21).

**TYPE** — n/a (artwork); adjacent names inherit card type.

**COLOUR+contrast** — authored fills on transparent; no disc behind crest; flat (SA4-05: crest
drop-shadow → flat). Non-text decoration — no contrast claim needed; silhouette must read at 16px
(one shape, ≤3 tones — tier rule).

**BORDER/RADIUS/ELEVATION** — none; crest art has its own outline grammar, never a card.

**MOTION** — static always. Crest never animates, even during goal cascade (motion = score/edge/
locks only — ≤4 budget, R-YAB-17). Route transition: crest may carry the shared-element morph
(P55-11) — the only exception. RM: n/a.

**PLAYER EXPECTATION**
- **Before:** recognises the fixture by crest before reading names (F-stem, 51 §1.4).
- **Expects:** real-looking club marks (wireframe uses real crests; sample-data rule forbids).
- **We show:** stylised authored crests in the club's own grammar (INVENTORY note 25: stylized,
  not real marks).
- **Next:** name text confirms identification.

**FAILURE MODES** — missing artwork → generic shirt-glyph silhouette, never initials (D-10);
crests identical silhouette risk → per-club unique outline audit (A37.S1); 16px illegibility →
tier system already answers (that's why tiers exist).

**A11Y** — `role="img"` + team name as label; never sole carrier of team identity (name text
always adjacent or in SR).

**EVIDENCE** — pending (asset audit vs A37.S1 zero-initials grep).
**CHALLENGE** — pending.

---

## E-M-03 — Live clock

**ELEMENT** match clock + status · **PAGE** match · **STATES** live minute / stoppage `45+2′` /
HT / ET / Break / FT / delayed-feed note / offline-frozen.

**WHERE** — centered under the score, expanded scoreboard; compact `● 52'` in pinned strip
(between score and ☆). 1440 same position (W4-21).

**WHY THERE** — honest live indicator: real minute, real period — the attention it draws must be
true (51 §3.4, A13.b). Under the score because minute qualifies the score — one glance-column:
teams→score→status (Z-flow on this card). LIVE = word+icon+colour, never colour alone (U-41,
C-03, C-05).

**SIZE/SPACING** — `● LIVE 52'` unit h20, s8 below score row; dot 8px. Pinned variant inherits
strip h44.

**TYPE** — `52′` hb-clock 12/14 Oxanium 600 tabular — `′` glyph inside the tabular run (T7-17);
`LIVE` hb-label 12/16 700 caps.

**COLOUR+contrast** — --c-live on surface-1 for LIVE word+dot+minute (C-05: use the passing step —
#ff4d75-class at ≥4.5 on s1, pending T6 measure; error-500 red banned for text). FT/HT: text-2 —
no live channel once dead.

**BORDER/RADIUS/ELEVATION** — none; it's a text unit, not a chip (wireframe shows pink text, no
pill — parity).

**MOTION** — minute increments in place, opacity cross-fade 150ms on the digit(s) that changed —
clock motion = linear/in-place only (74 vocab: constant motion linear); countdown→LIVE flip =
same-geometry swap, no layout jump (T42-17, XV4-13); RM: instant text change, no fade.

**PLAYER EXPECTATION**
- **Before:** wants "is it really live and how far in".
- **Expects:** clock advances; `45+2′` stoppage reads correctly; HT is a state not a bug.
- **We show:** exact format vocabulary above; delayed feed → affordance reveals
  `Live data may be delayed` (N12, U-15, T42-22).
- **Next:** status drives suspension expectations (goal imminent → markets may lock).

**FAILURE MODES** — feed gap: keep last minute + delayed note, never run ahead; tab hidden: on
return, jump straight to true minute (no catch-up spin — newest state wins); FT: unit swaps to
`FULL TIME`, live colour dies with it.

**A11Y** — `role="status"` polite; announced on period change only (not every minute — P55-22
announce-once rule); `45+2′` spoken as "45 plus 2".

**EVIDENCE** — pending (C-05 contrast measure; stoppage-format shot).
**CHALLENGE** — pending.

---

## E-M-04 — Follow star

**ELEMENT** follow toggles · **PAGE** match · **STATES** unfollowed ☆ / followed ★ (three scopes:
match-level, per-team ×2, plus competition-level via breadcrumb label on desk).

**WHERE** — match-level ☆ top-right of scoreboard (W4-02/W4-21); per-team pills under each team
column: `★ Following` / `☆ Follow` (W4-05/W4-21). Competition-level lives in the breadcrumb's
league level (desk) and is out of this card's scope.

**WHY THERE** — wireframe parity + A22.a/A37.S2 (follow from anywhere = the investment loop,
T42-15/XV4-19). Gold = follow/premium ONLY (C-08, 71-brand rule "colour semantics sacred");
shape channel ☆→★ carries state independent of hue (C-01, C-03). Under teams because the object
followed is the team — proximity = meaning (51 §5 Gestalt).

**SIZE/SPACING** — pill h32 @390 (hit 44 via pseudo-element, P51-04), padding s8·s12; star glyph
16px. Match star: bare glyph, hit ≥44.

**TYPE** — pill label hb-label 12/16 Figtree 600.

**COLOUR+contrast** — unfollowed: --c-text-2 label + --c-text-3 star outline, hairline surface-3
border; followed: --c-gold star + label stays text — gold is the glyph, never a fill (scarcity =
signal, C-08; gold-on-dark contrast for non-text ≥3:1 pending T6).

**BORDER/RADIUS/ELEVATION** — r-pill (true pill = the label-shape exception, TOKENS radius law);
hairline border; flat.

**MOTION** — toggle: star fills + one pop ≤150ms --dur-feedback (micro-spring allowed — badge-pop
is the ONE overshoot permitted, P55-20); label cross-fade `Follow`↔`Following` shared-letter morph
(Family rule: consequential labels morph); repeat toggles = zero animation (U-43, 72 rule 17).
RM: instant swap.

**PLAYER EXPECTATION**
- **Before:** "I want this team/match surfaced to me later."
- **Expects:** instant, obviously-toggled feedback; persists across visits.
- **We show:** gold fill + `Following` label same frame; feeds `Your matches · N` (T42-15).
- **Next:** unfollow = same tap, symmetrical states.

**FAILURE MODES** — accidental tap: it's a toggle, undo = tap again (no confirm needed —
non-destructive); sync loss: state held locally, honest last-known (no fake optimism failure —
follows can't "fail" user-visibly); colour-blind user: shape channel sufficient (C-03).

**A11Y** — `aria-pressed` toggle; label `Follow Arsenal` / `Following Arsenal — tap to unfollow`
/ `Follow this match`. Pseudo-expanded hit area doesn't overlap neighbours (Salaja rule).

**EVIDENCE** — pending (gold contrast measure; follow-persistence test).
**CHALLENGE** — pending.

---

## E-M-05 — Market search

**ELEMENT** in-page market search field + inline filter · **PAGE** match · **STATES** idle /
focused / filtering / empty-result / cleared.

**WHERE** — full-width input directly below `Your bet` strip (or scoreboard when no bet), above
the tab bar. Scrolls away — the tab bar is what stays pinned (search is a tool, not chrome;
reaching it again = scroll-to-top or `/`, both cheap).

**WHY THERE** — W4-06/W4-22 verbatim position + R-YAB-14 narrowing ladder (curate → filter →
search) + U-16 (≤2 taps to any market). Inside the page because its scope is THIS match's 78
markets — distinct from global ⌘K (scope separation prevents the Stake sim-mixing complaint, U1 §7).

**SIZE/SPACING** — h44, side padding s12, icon 20px + s8 gap; margin s12 below/above.

**TYPE** — input hb-body 14/20 Figtree; placeholder hb-body text-3 `Search markets or players`
(wireframe verbatim).

**COLOUR+contrast** — surface-2 fill, hairline surface-3 border; text --c-text; placeholder text-3
(≥4.5 pending); focus: --c-focus ring 2px offset 2 + border brightens.

**BORDER/RADIUS/ELEVATION** — r-md; flat.

**MOTION** — none on typing (U-43: typing is a frequent action = instant); accordion expansions
during filter = instant (no stagger — list stagger is first-paint only, 74); clear = instant
restore; RM identical. Focus ring fades 120ms.

**PLAYER EXPECTATION**
- **Before:** wants one market ("corners", "Saka anytime") inside 78.
- **Expects:** text search narrows in place, doesn't navigate away.
- **We show:** inline filter — matching accordions auto-expand, non-matching collapse; tab counts
  re-sum `Goals 3 of 11`; `N markets match "{q}"` label; `All markets 78` tab unaffected as the
  unfiltered escape; player names resolve to goalscorer markets (fictional roster, X07).
- **Next:** Esc/blur/`Clear search` restores full groups; tapping a result-scrolls to open
  accordion (anchor link, real `<a>` — U-45/72 rule 22).

**FAILURE MODES** — zero hits: `No markets match "{q}"` + `Clear search` (N4, honest empty);
query while suspended: results render with lock state intact (filter never fakes open markets);
paste messy input: liberal parse — aliases ("corners"→Corners & cards), typos tolerated
(R-YAB-10); mid-filter suspension: reason chips still render in results.

**A11Y** — `role="search"`, labelled input, `aria-live="polite"` on the `N markets match` count;
Esc clears; `/` shortcut documented in placeholder? No — placeholder is wireframe-law; shortcut
hint lives in keyboard help.

**EVIDENCE** — pending (filter latency INP<200ms; empty-state shot).
**CHALLENGE** — pending.

---

## E-M-06 — Market group tabs + counts + active pill

**ELEMENT** sticky group tab strip · **PAGE** match · **STATES** default / scrolled-stuck /
overflow-scroll / selected / count-live-update / suspended-group (count still true).

**WHERE** — horizontal strip between search and accordions; sticky — pins directly beneath the
collapsed scoreboard strip when scrolled (M-02). Second fixation (51 §3.4): wayfinding, medium
salience — must not outrank scoreboard (no oversized pills/glows).

**WHY THERE** — W4-07/W4-23 parity + T42-09 order law (`Popular N` first, `All markets N` LAST —
R-YAB-16 edges carry memory) + U-28/A37.S3 (counts upfront, judge's verbatim ask) + P51-09
(linear menu: order by frequency, ≤5–7 visible, edge-fade, selected scrolls to center-x). Counts
let the player size the choice before opening it (U-17 progressive density, Hick §4).

**SIZE/SPACING** — strip h44 (raised from ~36 per P51-05/09); tab padding s8·s16; gap s4 between
tabs; edge-fade mask s24 both directions; sticky chrome gets 1px border-b + scroll-padding-top
(Salaja sticky rule).

**TYPE** — tab label hb-label 12/16 Figtree 600; count same run, Oxanium tabular (T7-03: counts
are numbers = tnum), one space `Popular 10`.

**COLOUR+contrast** — strip surface-1 on --c-bg; inactive label text-2, count text-3; hover
surface-3 (instant 0ms — Salaja hover rule); ACTIVE = --c-cta pill fill + --c-cta-fg label+count
(≥7:1 pending T6) — the single selected-language reused site-wide (D-01, SA4-18, R-YAB-08:
one high-salience dual-coded element per view — and on this page that job is shared with the
selected odds cell; hierarchy kept by size: cell ≥44px content vs 32px tab pills).

**BORDER/RADIUS/ELEVATION** — tabs r-pill inside a square-edged strip; strip flat + hairline-b;
no shadow ever (elevation law).

**MOTION** — tab press: fill swaps ≤150ms --dur-feedback; selected tab scrollIntoView center-x
spring-free smooth scroll ≤300ms --ease-standard; tab CONTENT below cross-fades 150ms opacity
only (repeat action — no slide theatre, U-43); counts tick in place (digit morph exempt-from-
budget but muted under S8). Interrupt: mid-scroll new tap retargets (newest wins). RM: instant
fill + instant content.

**PLAYER EXPECTATION**
- **Before:** knows roughly which family ("goals? corners?") the market lives in.
- **Expects:** counts = truth; tapping a group shows it; Popular = the safe default.
- **We show:** wireframe order minus banned Specials; counts update live; default = Popular
  (group containing main markets — P51-10).
- **Next:** the group's accordions; `All markets 78` = the whole index, last slot.

**FAILURE MODES** — group empties mid-session (all its markets closed): tab stays with count `0`
and opens an honest empty pane — never silently vanish (P6); overflow on 360: fade signals more,
selected still centers; URL `?group=` restores on return (A20.c/U-20).

**A11Y** — `role="tablist"`, `aria-selected`, arrow-key roving; active tab's count included in
name ("Popular, 10 markets"); sticky region doesn't trap scroll.

**EVIDENCE** — pending (edge-fade + center-scroll shot; count-sum audit = 78).
**CHALLENGE** — pending.

---

## E-M-07 — Market accordion

**ELEMENT** collapsible market section · **PAGE** match · **STATES** expanded / collapsed /
suspended-open (cells dim + reason chip in header) / settled / skeleton.

**WHERE** — stacked list inside the active group; hairline-separated regions on --c-bg — NOT
nested cards (D-09, U-40, SA4-01, R-YAB-19). Header row spans content width.

**WHY THERE** — wireframe default-expanded accordions (W4-08/09/24) + chunk-before-count
(R-YAB-05: labeled groups replace item caps — 78 markets are survivable only chunked) + density
via rhythm not smaller type (D-09, FotMob 72-canon rule 11).

**SIZE/SPACING** — header h48 (hit full-width ≥44); name left, chevron 20px right, optional settle
note inline; cell grid: ≤3 outcomes/row (P51-10, R-YAB-03), gap s8, section padding s12 bottom.

**TYPE** — market name hb-h1 16/20 Figtree 600; settle note `Settles on 90′ + stoppage` hb-micro
11/14 text-3 (T42-22 trust microcopy); outcome labels hb-body-sec 13/18 inside cells.

**COLOUR+contrast** — header text --c-text on transparent bg (list region); hairline-b surface-2
separator; chevron text-3; suspended state: header gains amber reason chip (E-M-09) — accordion
itself never dims, only its cells (one boundary = one meaning, R-YAB-19).

**BORDER/RADIUS/ELEVATION** — no card, no radius on the region; the boundary IS the hairline.

**MOTION** — toggle: height 0↔auto 250–280ms --ease-standard; chevron rotates 180° same duration;
content keeps open width during collapse (Salaja); collapse = the close = faster end of range,
expand = open end (closes faster than opens law); search-filter expansions = instant; RM: instant
height jump, chevron swaps.

**PLAYER EXPECTATION**
- **Before:** sees the market name — "is this what I want?".
- **Expects:** tap opens it, prices inside are live and tappable.
- **We show:** first two accordions expanded by default in the group (wireframe behaviour);
  others collapsed with settle-note visible; `+N more markets` tail disclosure for long groups.
- **Next:** odds cells inside — the decision surface.

**FAILURE MODES** — suspend while open: cells dim+lock in header's reason chip, accordion does
NOT auto-collapse (player may be mid-decision — never move their content, P2); suspend while
collapsed: chevron-side chip shows lock count `Suspended`; accordion with zero live outcomes:
shows settled/void marks, not a blank; `<details>` banned — controlled height for motion+ARIA
(P55-16).

**A11Y** — header = `<button>` `aria-expanded`, controls region by id; Enter/Space toggles;
content region labelled by market name; settled markets still focusable for record.

**EVIDENCE** — pending (height-anim recording; zero-CLS check).
**CHALLENGE** — pending.

---

## E-M-08 — Odds cell (SIGNATURE — the atomic unit of the entire book)

**ELEMENT** odds cell (selectable price) · **PAGE** match (canonical definition; reused on every
page per A3.S3 one-component rule) · **STATES** — full matrix: default / hover / pressed /
focused / selected / tick-up / tick-down / suspended / reopened-reprice / settled-won /
settled-lost / void / offline-frozen.

**WHERE** — inside accordion grids, ≤3 per row @390 / rows label-left-price-right @1440 (W4-08,
W4-24). Largest interactive targets on the page = the primary action (51 cross-page rule); thumb
arc lower-half on phone (P5, U-18).

**WHY THERE** — P1 is the product thesis: price + implied probability in one glance (`1.30 · 77%`),
Oxanium tabular, fixed geometry (D-13, U-26, U-47; U4-F9/F10 RCT: implied-% reduces misjudged
risk). This cell is what the 20-pt page exists to serve; every other card orients it. Familiar
grammar kept exactly (1X2 L→R, chip shape, tap-to-add — R-YAB-04); craft lives in state honesty.

**SIZE/SPACING** — @390: h≥44 visible (P51-03, T7-07, R-YAB-01; AA hit ≥24px absolute floor
surpassed, 44 target); gap ≥s8 between cells — miss-taps on a money grid are selection errors,
not annoyances. @1440: h≥36 visible, hit ≥40 pointer. Price column fixed-width right-aligned or
centered per layout — identical metrics in EVERY state so the target never shifts mid-decision
(P51-03 geometry-parity rule; A17 CLS≈0; T7-11 digit width never moves). 3-up @390 ⇒ ~110px wide.

**ANATOMY** —
- 390 chip: two-line stack — label hb-body-sec 13/18 text-2 (single-line ellipsis, never shrink —
  T7-10) over `price · implied%` : hb-odds 15/20 Oxanium 600 + hb-micro 11/14 text-3.
- 1440 row: label left hb-body 14/20, price right hb-odds, implied under price hb-micro.
- Optional second line only for two-part names (`Arsenal or draw`); settle/jargon help lives on
  the accordion, not the cell (extraneous load = 0 in odds areas, R-YAB-15).

**COLOUR+contrast** (per state; all text pairs ≥4.5:1, money facts ≥7:1 per C-12 — measured
values pending T6):
- default: surface-2 fill, hairline surface-3 border, label text-2, price --c-text Oxanium,
  implied text-3.
- hover (hover:hover only): surface-3 fill — 0ms instant (Salaja).
- pressed: same fill + real :active (below).
- selected: --c-cta fill + --c-cta-fg ALL content (price, label, implied, ✓) — Housebets
  fill-flip convention (C-11, U-25, W5-01); ✓ 16px top-right inside cell; geometry identical.
- tick-up: price + ▲ glyph --c-up + green ::after tint overlay; tick-down: ▼ --c-down. Red glyph/
  text uses the AA-passing lighter step on surfaces <4.5 (C-04 — error-500 #f41f50 fails small
  text at 4.10 on s2: glyph acceptable as ≥3:1 non-text, any red TEXT uses lighter step).
- suspended: cell stays, dims to 60% opacity, padlock glyph replaces affordance-cue; last price
  remains legible through the dim (S3, D-04) — amber comes from the accordion's reason chip
  (C-13: suspended ≠ disabled-grey).
- settled: won = --c-text price + quiet ✓ + --c-up edge tint ≤3s fade then static mark; lost =
  text-3 dim; void = `Void` word hb-micro.
- focused: --c-focus 2px ring offset 2; ON selected cell = dual-tone ring (neon + --c-cta-fg
  offset) per C-11 — ring-on-cyan is invisible otherwise.
- offline: frozen default look + text-3, no amber, no lock (our failure ≠ market's).

**BORDER/RADIUS/ELEVATION** — r-md (DOMINANT radius, TOKENS); 1px hairline default, selected
keeps the hairline under the fill; zero shadow (flat, SA4-05 halo audit); ::after overlay for
tints so borders never animate.

**MOTION** — the contract (trigger / dur+curve / props / interrupt / RM):
- select/deselect: fill cross-fade ≤150ms --dur-feedback ease-out-expo; geometry zero-shift;
  tap ALSO fires S2 cell→ticket morph 280ms --ease-standard (explicit add only — never on ticks);
  interrupt: re-tap selects newest cell, flight retargets; RM: fill swap instant + ticket count
  pulse once.
- tick-up/down (S1): NumberFlow `trend=0` digit morph 250ms --ease-out-expo, cell width fixed;
  ▲/▼ glyph fades in with tint ::after, decays linearly ~1s to muted caret persisting ~9s
  (T42-08); hover/focus tooltip `was 4.60 → 4.80`; transform/opacity only (U-56); interrupt:
  new tick supersedes mid-decay — glyph/tint snap to newest (P4); RM: instant swap + glyph +
  static tint edge.
- suspend (S3): 0ms same-frame — padlock + dim 60% + market reason chip; NO lock animation
  (integrity, 74); interrupt n/a; RM identical.
- reopen (74 vocab): 150ms un-dim then normal tick on repriced values; RM: instant.
- settled: marks fade in 200ms opacity; glow budget <3s total (P52-10); RM instant.
- Exempt-but-muted: ticks don't count against ≤4-motion budget BUT degrade to tint-only while a
  stake is pending (S8, P51-11); zero flashes ever on mount/re-render (P55-04 honest-flash audit).

**PLAYER EXPECTATION**
- **Before:** reading a price as "what do I get" — implied% is the honest answer beside it.
- **Expects:** tap = pick this price; picked cell stays visibly picked; price can move but I'll
  be asked before it costs me (P2).
- **We show:** press-in 80ms visual, selected flip same frame, flight to ticket; a move shows
  ▲/▼ + tint + `was →` trail; a lock shows lock+reason+last price — never a dead button, never
  a silent swap (P2, D-04, U1 #1 pain).
- **Next:** the ticket zone (pill/panel) holding `Arsenal @ 1.30 · Pays 26.00`; cell's price
  continues to live-tick — slip holds price-at-add and asks on change (D-03, U-01).

**FAILURE MODES (exhaustive — this cell owns the "every state" scorecard line)**
- tick while selected → cell keeps selected fill; price updates live (price-at-add lives in the
  SLIP, which will ask — P2 separation of concerns).
- suspend while selected → cell locks; slip leg chips `This pick is suspended — {reason}` (COPY);
  selection is not silently dropped (R-YAB-13 unresolved stays visible).
- suspend mid-tap → same-frame lock wins; tap is inert, no pick registered (integrity > gesture).
- rapid successive ticks → newest supersedes; glyph/tint snap; never queues (U-56).
- double-tap-zoom → `touch-action: manipulation`, tap-highlight transparent, real :active
  scale 0.98 (U-43, 72 rules 15–16).
- mount/remount → never flashes (P55-04); skeleton = exact cell geometry, opacity-only, ≤2 loops
  (U-42/57).
- >4 simultaneous ticks in viewport → budgeted: newest 4 tint, rest instant-swap (P51-11);
  slip-pending → all tint-only (S8).
- CVD → glyph + word direction + fill-style; hue never sole channel (C-01/02/03).
- long-press → implied-% explainer / `was →` history where cheap (P52-07).
- odds cell inside suspended accordion stays inert-but-legible — dead-button ban (D-04).

**A11Y** — `<button>` `aria-pressed`; SR name `Arsenal to win, 1.30, implied 77 percent` (X01
format); price changes announced once via one shared live region — never per digit/frame
(P55-22); suspended → `aria-disabled` + reason text in name (`Suspended, dangerous attack`);
`aria-hidden` on ✓/▲/▼/🔒 decorative glyphs — the label carries the state (second cue = word,
not the icon alone).

**DEFEND IN CRIT (A3.S4)** — "why is the implied % always visible, not a toggle?" Because P1
declares honesty part of the price itself and F9/F10 show it corrects probability misjudgement;
hiding it behind a setting is a dark pattern of omission. hb-micro keeps it subordinate — present,
not preachy.

**EVIDENCE** — pending: geometry shots ≥44/≥36; tick recording 390+1440; CVD pair; CLS≈0 measure;
contrast table per state.
**CHALLENGE** — pending.

---

## E-M-09 — Suspension band / reason chip

**ELEMENT** market suspension treatment (two bodies, one component) · **PAGE** match · **STATES**
cell-dim+header-chip (match page) / full-width band replacing odds row (list rows on other pages
— defined here for consistency, A3.S3) / reopening / unknown-reason / notify-me (proposal).

**WHERE** — match page: amber reason chip inside the accordion header, right of market name; its
cells dim+lock (E-M-08). Row variant (W2-09): full-width outlined amber bar `🔒 Suspended` where
the odds row was — shared grammar, defined once.

**WHY THERE** — D-04 + U-04 + S3: same-frame lock + reason + last price — direct answer to U1's
mystery-suspension cluster ("locks for no obvious reason", "stuck on suspended"); XV4-02:
unexplained suspension reads as THEFT across 6 apps. Amber = suspended/caution ONLY, always
🔒+word (C-09, U-27); must-be-seen info in content flow at real size (P51-16 Lole corollary) —
never greyed microcopy, never a toast that vanishes.

**SIZE/SPACING** — chip h24, padding s4·s8, lock glyph 14px + s4 gap + label; sits in header's
right cluster left of chevron. Band variant: h44 replaces cell row, full width.

**TYPE** — chip `Suspended — dangerous attack` hb-micro 11/14 600 (em-dash per COPY pattern
`Suspended — {reason}`); band hb-body-sec.

**COLOUR+contrast** — --c-suspend #E17823 text+glyph on surface-2 chip with --c-suspend hairline
edge (amber ≥4.5 on s2 pending T6 — may need text-side darkening; measure owed); band: amber
hairline outline + amber text on transparent (wireframe style). Never grey/disabled channel
(C-13: suspended ≠ disabled).

**BORDER/RADIUS/ELEVATION** — chip r-pill (true pill exception); band r-md hairline outline; flat.

**MOTION** — appear: 0ms same-frame (S3 — integrity is instant); the CHIP fades in 120ms
--dur-feedback only because it enters from nothing — the lock itself does not animate; reopen:
150ms un-dim then repriced ticks (74); cascade context: chips land in the same frame the score
flashes (S4 beat-2). RM: identical — there is no motion to reduce on the lock.

**PLAYER EXPECTATION**
- **Before:** market was live a second ago; something happened on the pitch.
- **Expects:** either instant honesty or a dead button (industry norm).
- **We show:** lock + named reason + visible last price + "usually returns" expectation via copy
  vocabulary (`goal scored` implies repricing; `dangerous attack` implies soon).
- **Next:** wait for reopen → repriced ticks; or pick another market; slip leg (if any) shows the
  same reason (COPY `This pick is suspended — {reason}`).

**FAILURE MODES** — reason unknown: `Suspended — betting paused` honest fallback (U-04 task list —
never invent a reason); suspend during user's tap: lock wins, no pick (E-M-08); suspend during
CO confirm on this market: strip swaps to `Cash out paused — market suspended` (U-08, M-10);
resume with identical prices: still un-dim+settle, no fake tick (P55-04 honest-flash);
`★ notify me when it reopens` (XV4-02 proposal) — CHALLENGE-flagged: scope vs payoff.

**A11Y** — chip is text — announced via the market's live-region event ("Total goals suspended —
dangerous attack", once, P55-22); not interactive itself; 🔒 aria-hidden.

**EVIDENCE** — pending (amber contrast measure; vocabulary render @390/1440 for all six reasons).
**CHALLENGE** — pending (notify-toggle scope decision).

---

## E-M-10 — Goal cascade (choreography layer)

**ELEMENT** S4 event sequence — score roll → edge flash → mass lock → reprice · **PAGE** match ·
**STATES** idle / running beat 1–3 / superseded / RM-variant.

**WHERE** — originates in the scoreboard (score box edge), propagates to affected accordions;
pinned-strip equivalent = strip edge flash when collapsed. No overlay scrim — an in-page causal
choreography (information, not ceremony).

**WHY THERE** — S4 is the binding spec; T42-21 demands one deterministic judge-replayable
suspension cascade; R-YAB-07 calls for the goal-flash peak (score pulse + synced odds tick);
the synthesis moat = "causality made visible" (75). One hero motion per flow — this IS it
(74 attention law); ≤4-motion budget yields entirely to the cascade for its 2.5s.

**SIZE/SPACING** — edge flash = 2px ring hugging scoreboard card outline (inside the hairline);
event line slot h20 reserved under the score (pre-allocated — zero CLS, A17).

**TYPE** — event line `Goal — Brighton & Hove Albion 54'` hb-body-sec 13/18 Figtree 600, --c-text
(the fact, not the team colour — no red/green on events; colour channels are budgeted).

**COLOUR+contrast** — flash ring --c-live (the live channel = things happening now); event line
--c-text; locks use E-M-09 amber.

**BORDER/RADIUS/ELEVATION** — ring follows card r-md; painted as ::after opacity — no border-color
animation (transform/opacity-only money-path rule, U-56).

**MOTION** — binding (S4): beat 1 score NumberFlow +1, 300ms --ease-out-expo + event line types in;
beat 2 edge flash ::after opacity pulse 400ms (up 120 / decay 280) + same-frame locks; beat 3
reopens in list order, repriced ticks; total ≤2.5s (P55-06 audit). Interrupt: ANY newer event
(VAR, second goal, FT) supersedes mid-cascade — partial locks resolve to newest feed state, never
queue (P4, S4). RM: score + event line only — no roll, no flash, no cascade motion; locks still
land same-frame (integrity survives RM).

**PLAYER EXPECTATION**
- **Before:** watching prices when something big happens.
- **Expects:** score first, then everything makes sense.
- **We show:** exactly that causal order — you SEE the goal cause the locks cause the repricing;
  nobody else renders the chain (42-teardown "ours" column).
- **Next:** markets reopen repriced; the desk tells the truth in motion.

**FAILURE MODES** — second goal mid-cascade: beat sequence restarts from newest state (no queue);
VAR disallowal: event line corrects `Goal disallowed — VAR` + scores/locks resolve; feed sends
locks without goal: cascade skipped — locks land alone (we choreograph only what the feed says);
FT during cascade: FT supersedes, markets settle not reopen.

**A11Y** — one live-region announcement "Goal, Brighton & Hove Albion. Score 1–1. Markets
suspended — goal scored" then "markets reopened" — once each (P55-22); flash is redundant
channel (score+line carry it).

**EVIDENCE** — pending (≤2.5s timing audit recording; supersede-mid-capture Playwright shot).
**CHALLENGE** — pending.

---

## E-M-11 — Market count "+N" / "All markets N"

**ELEMENT** market-count numerals + tail link · **PAGE** match · **STATES** per-tab counts /
`+N more markets` tail disclosure / `All markets 78` index tab / zero-count group / live
re-count during suspend-open-close.

**WHERE** — on every group tab (`Popular 10`); as `+N more markets` tail link at a group's bottom
when collapsed-by-depth; `All markets 78` = final tab; on match rows elsewhere `+78 ›` links here
(INVENTORY note 6).

**WHY THERE** — "market counts upfront" is a verbatim judge ask (A37/M4, U-28); counts are
scanning aids before commitment (U-17, R-YAB-05 chunk-before-count, 51 §4: size the choice before
opening it); `All markets N` LAST is wireframe order + serial-position edge slot (T42-09,
R-YAB-16).

**SIZE/SPACING** — count = trailing run inside tab pill (one space); tail link h40 full-width
text button; `+78 ›` right-aligned cell link h≥44 on rows.

**TYPE** — counts Oxanium tabular (T7-03 — "+N" named explicitly); hb-label in tabs; tail link
hb-body-sec text-2.

**COLOUR+contrast** — inactive tab count text-3; active tab count --c-cta-fg (≥7:1 with pill);
tail link text-2 + hover text; `+N ›` brand-neon text? NO — neon reserved for accents (C-10
budget): use --c-text-2 label + --c-brand-neon only on the `›` affordance cue if needed; prefer
all text-2 (restraint audit).

**BORDER/RADIUS/ELEVATION** — none (text run); tail link hairline-t separator.

**MOTION** — count increments/decrements tick via digit morph (S1 treatment, exempt-but-muted);
link hover instant; tail expansion = accordion rule (E-M-07); RM instant.

**PLAYER EXPECTATION**
- **Before:** "how deep is this match / this group?".
- **Expects:** the number is true — counting markets inside matches it.
- **We show:** live re-counts (suspend doesn't decrement — market still exists, locked;
  settle does — count is open-markets); `All markets 78` = sum that reconciles (10+9+11+11+8+5+
  14+10 = 78, verifiable by a judge — honest arithmetic or it fails on contact).
- **Next:** the group or the index; `+78 ›` off-page rows deep-link to `?group=all`.

**FAILURE MODES** — count hits 0: tab stays, pane = honest empty (`No open markets in {group}
right now`); counts must never disagree across tabs/tail/index (single source); suspended group:
count unchanged + lock chip explains why tappable-but-locked.

**A11Y** — counts inside tab's accessible name; tail link labelled `Show N more markets in
{group}`; `+N ›` on rows = `View all 78 markets for Arsenal v Brighton`.

**EVIDENCE** — pending (count-reconciliation audit @78).
**CHALLENGE** — pending (dropped Specials makes 78≠85 — already decided, see storyboard deltas).

---

## E-M-12 — Open-ticket strip ("Your bet")

**ELEMENT** open-bet strip with live cash-out quote · **PAGE** match · **STATES** hidden (no bet)
/ quoting / value-changed / paused-suspended / cashed / settled-won / settled-lost / multiple
rollup.

**WHERE** — directly under the scoreboard, above the search field, full content width — inside
content flow (P51-16: must-be-seen info gets a real block surface, never footer microcopy). One
per page; 2+ open bets on this fixture → `Your bets 2` rollup chip → My bets filtered list.

**WHY THERE** — A22.a/A22.S2 verbatim ask ("open bets visible on the match page") + T42-11
(FD "My Action" pattern; Stake shows nothing = free win) + U-06 (CO = live quote, never a dead
button) + MM rule 4 (same ticket object phone/desk). Proximity = the bet lives where its match
lives; retention-with-respect (follow loops, not bait).

**SIZE/SPACING** — h48 @390 (one-line strip), padding s8·s12; left block pick, right block quote;
gap s12. Hit full-strip ≥44 → opens ticket.

**TYPE** — `Your bet` hb-micro 11/14 text-3 caps label; pick `Arsenal @ 1.80` hb-body-sec 13/18
600; quote `Cash out 14.32 USDT` hb-odds-sm 13/16 Oxanium tabular, --c-text (money fact ≥7:1,
C-12); settled line uses COPY verbatim.

**COLOUR+contrast** — surface-2 fill + hairline surface-3; left edge 2px --c-cta accent mark (the
"this is yours" channel — pale-cyan acts, D-01); quote text --c-text; paused = text-3 + `Cash out
paused — market suspended`; NEVER green/red on the quote (P/L colour is outcome-only — neutral
instrument, U-51, P52-08; CO eligibility badge pre-bet = U-05 flag on market, out of strip scope).

**BORDER/RADIUS/ELEVATION** — r-md, hairline, flat; no glow, no pulse (calm is the brand, P3).

**MOTION** — quote ticks = S1 digit morph (NumberFlow, muted under S8 while a NEW stake is
pending); strip enters 200ms --ease-out-expo on first bet (once — entrances never replay on
return, Salaja rule); paused→quoting: 150ms un-dim; settled: line cross-fades 200ms; RM: instant
values everywhere.

**PLAYER EXPECTATION**
- **Before:** "what's my position on this match right now?".
- **Expects:** value is current or honestly paused; tapping takes me to the ticket.
- **We show:** live quote + neutral label; on move during tap-flow: `Offer moved to {value} —
  confirm new amount` (COPY); on suspension: `Cash out paused — market suspended` (COPY).
- **Next:** desk → right panel My bets tab focused on this ticket; phone → slip sheet My bets tab
  (same object, MM rule 4).

**FAILURE MODES** — quote older than threshold: still shows + `updated Xs ago` (XV4-01/18 value
truth); feed down: `Cash out paused — feed issue` + last value dimmed, never a vanished button;
bet settles while strip visible: cross-fade to settled line, strip persists as record (XV4-17);
accidental tap: strip is navigation not action — no confirm needed, no money moves here (P2:
money-affecting action lives behind the CO confirm sheet in the ticket, not on this strip —
deliberate friction placement).

**A11Y** — one `<a>`/`role="link"` region labelled `Your bet: Arsenal at 1.80. Cash out quote
14.32 USDT. Go to ticket`; quote changes NOT live-announced (would spam — announced on focus/
demand, P55-22).

**EVIDENCE** — pending (strip shot; quote-tick recording; paused state shot).
**CHALLENGE** — pending (strip position vs search position tension — second-agent call).

---

## E-M-13 — Breadcrumb / match switcher

**ELEMENT** navigation path + level dropdowns · **PAGE** match · **STATES** desk full path /
phone compact / dropdown-open / last-level match switcher.

**WHERE** — 1440: `<` back + `Soccer ⌄ | England ⌄ | Premier League ⌄ | ARS - BHA ⌄` above the
scoreboard (W4-20). 390: `<` + `ARS - BHA ⌄` single pill (W4-01) — the match-level dropdown is
the switcher; sport/competition live one tap back.

**WHY THERE** — wireframe verbatim + MENTAL-MAP rule 5 ("search answers where X lives" — the
breadcrumb *is* the where) + XV4-19/T42-15 (switcher = follow-first return loop: jump to the
next fixture without leaving) + familiar convention (A19.b). Text path, no pill-row chrome
(SA4-02 one-control-grammar: breadcrumbs → text path).

**SIZE/SPACING** — h40 @1440; level items hb-body-sec with s4 gaps + `|` or `›` separators text-3;
chevron ⌄ 16px per level; phone pill h36 hit 44.

**TYPE** — levels hb-body-sec 13/18 Figtree 500, current level 600 --c-text; phone `ARS - BHA`
hb-body 14/20 600.

**COLOUR+contrast** — ancestors text-2, current text; separators text-3; hover text only (0ms);
dropdown menu surface-2 + hairline + r-md (menus are chrome — square-ish r-md, not pill).

**BORDER/RADIUS/ELEVATION** — path: none; phone pill: surface-2 + hairline + r-md; dropdown: the
ONE sheet-shadow allowed (8px-y 24px-blur, TOKENS elevation law).

**MOTION** — dropdown: 200ms --ease-out-expo opacity + ≥scale(0.95) from trigger edge (Salaja
enter rules); close 120–180ms --dur-close (faster); chevron rotates; repeat-open = same speed
always; RM instant. Navigation itself = route transition D-07.

**PLAYER EXPECTATION**
- **Before:** "where am I / what else is in this league?".
- **Expects:** levels climb outward; last level switches fixture.
- **We show:** four real levels (W4-20 parity), each a `<a>` + dropdown sibling list; phone
  compresses to the actionable level.
- **Next:** level = list page; match ⌄ = sibling fixtures; `<` = previous page WITH scroll+tab
  restored (A20.c, U-20).

**FAILURE MODES** — level with one member: still a link, dropdown hidden (honest — no fake
choice); very long league name: truncates at fixed budget, full name in dropdown+SR; direct
deep-link: all levels resolve (X08 200s).

**A11Y** — `nav aria-label="Breadcrumb"`, ordered list, `aria-current` on match; dropdowns =
menu pattern (arrow keys, Esc returns focus to trigger); real hrefs (72 rule 22).

**EVIDENCE** — pending (parity shot vs W4-20; restore-position test).
**CHALLENGE** — pending (does phone need league level too — currently back-tap covers it).

---

## E-M-14 — FT / settled state system

**ELEMENT** terminal match state treatment · **PAGE** match · **STATES** FT scoreboard / settled
accordions / settled `Your bet` strip / void markets / countdown-to-archival.

**WHERE** — replaces live treatments in place: clock slot → `FULL TIME`; accordions keep position
with settlement marks; strip cross-fades to settled line. Nothing moves location — record
integrity (XV4-17: never drop, never jump).

**WHY THERE** — P6 ship-shaped (terminal states designed, not absent); U-54 quiet wins + factual
losses (no LDW bait, P52-05 vocabulary ban); COPY owns the strings (`Settled · won {net} USDT` /
`Settled · lost {stake} USDT` / `Void — {reason} · {stake} USDT returned`); scorecard's "every
state" line is paid here; post-loss promoted actions BANNED (U-52, P52-06 — settled page carries
zero CTAs to bet again).

**SIZE/SPACING** — identical geometry to live state (only content changes — Family rule: a
component persisting across a transition stays visually constant).

**TYPE** — `FULL TIME` hb-label 12/16 600 caps text-2 (live colour dies with live-ness); result
marks ✓/✕ hb-body-sec; settled money hb-odds-sm Oxanium.

**COLOUR+contrast** — scoreboard mutes to text-2 hierarchy (the match is over — attention should
leave); won mark --c-up + word `won` (dual channel); lost text-3 + word; void text-2 + word;
never colour alone (C-01/C-03). Settled money facts --c-text (C-12).

**BORDER/RADIUS/ELEVATION** — unchanged from live card.

**MOTION** — live→FT: clock unit cross-fades 200ms to `FULL TIME`, live colour fades out on the
same beat; settle marks fade in opacity-only ≤200ms staggered ≤30ms/row (first-render rule —
this IS a first render of the state); no celebration loop — soft result tint once, <3s total
presence (P52-10, A13.e Bashagha rule); RM identical minus fades.

**PLAYER EXPECTATION**
- **Before:** match ended; "did I win / what's this worth now".
- **Expects:** result + my outcome, plainly.
- **We show:** `Settled · won 16.00 USDT` / `Settled · lost 20.00 USDT` + `View in My bets ›`
  (T42-13 journey: receipt → bet → match links resolve both ways); markets show ✓/✕ marks +
  `Void` where suspended at end.
- **Next:** My bets for the receipt record; or follow-next-fixture via the match switcher —
  the only "what now" we offer (respectful exit, no re-bet bait).

**FAILURE MODES** — void market: `Void — market closed · stake returned` (N14) with refund
visible in strip; re-settlement (stat correction): markets get a `Result corrected — {reason}`
change line (U-14 transparency — never a silent re-grade); revisiting an FT page: renders settled
instantly (no live ceremony, no skeleton theatre — cached state, Salaja no-replay rule);
settlement while user mid-slip on this match: leg marked `Market closed — settled` in slip,
strip already showing outcome.

**A11Y** — status announced once ("Full time, 1–1"); settled strip keeps link semantics; marks
are words+glyphs — `won`/`lost`/`void` text always present.

**EVIDENCE** — pending (FT shot; settle-record audit; void path shot).
**CHALLENGE** — pending.
