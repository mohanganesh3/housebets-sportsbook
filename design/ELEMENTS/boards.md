# ELEMENT CARDS — Shell + Boards

Full template per card (RESET §7): WHERE / WHY / SIZE+SPACING / TYPE / COLOUR+CONTRAST /
MOTION (trigger·dur·ease·interrupt·RM) / PLAYER EXPECTATION (4 fields, A24) / FAILURE MODES /
A11Y. Every card cites ≥1 principle + U-row/research file. EVIDENCE + CHALLENGE stay pending
until the critic pass and QC runs — a card without them is a guess, not a spec.

Token shorthand: c-bg · s1/s2/s3 (surfaces) · neon (--c-brand-neon, text/icon only) · cta /
cta-fg (--c-cta #C4F4F1 / #062B31) · t1/t2/t3 (text) · up/down · susp (--c-suspend #E17823) ·
gold · live (--c-live #FF4D6D) · focus ring. Space = 4-base set; r-sm/r-md/r-lg/r-pill.
Type = hb-* scale; Oxanium = numerals only, tnum always. Contrast values marked `~` are
targets pending T6 culori measurement; floor = AA 4.5 text, AAA 7 money (A27.c, C-12).

---

## E-BRD-01 — Match row / match card (the coupon atom)

**ELEMENT/PAGE/STATE:** list row (desk) + card variant (phone) on Home live strip, Your
matches, Live groups, Football groups. States: live-ticking · HT/break · scheduled ·
suspended · price-moved(▲▼) · selected-cell · loading-skeleton · offline-frozen.

**WHERE:** board zone; rows inside s1 group regions, hairline-separated; `+N ›` far right.
390 card folds: status line → team lines → odds row.

**WHY:** P1 (price is the product) — fixed cells, tabular numerals, implied% beside price;
U-04/U-27 suspension inline w/ reason; U-39 countdown not 0–0; T7-08/09 geometry;
INVENTORY derived-ask #4 (one shared anatomy) + W1-24/25/W2-22 parity; SA4-01 hairline
coupon, no nested cards.

**SIZE/SPACING:** row 52–56px @390 / 44–48px @1440 (T7-08); clock col 56px; name col fluid,
min 12ch, ellipsis budget; score col 24px right-aligned; 3 odds cells ≥44px h @390 / ≥36px
@1440, 8px gaps (P51-03, R-YAB-01); `+N ›` 40px hit. Cell grid constant across market rebind.

**TYPE:** names hb-body t1; scores/minute/prices Oxanium — score hb-score, clock hb-clock
live=t live-color, prices hb-odds neon, implied% hb-micro t3; `+N ›` hb-label t2.

**COLOUR+CONTRAST:** row bg transparent on s1 region; hover s3 8px row-edge fill; cells s2 +
hairline; price neon-on-s2 ~4.6 AA-target; selected = cta fill + cta-fg + ✓ (C-11); suspension
band = susp hairline + susp text + 🔒 on s1 (~4.5 target on amber text — C-13: never grey).

**MOTION:** price tick → S1 digit-morph 250ms ease-out-expo + directional edge tint decay ~1s
+ ▲▼ glyph ~9s muted (T42-08); interrupt = newest tick supersedes; suspension → S3 same-frame
0ms (integrity, no animation); select → 120ms fill swap ease-standard; RM twins = instant
swap + glyph (U-56, U-33).

**PLAYER EXPECTATION:** thinks "is this price current and can I take it" · expects tap =
selection added, price honest · we show price+implied% in a stable cell, movement marked
with direction · next tap: `+N ›` match page OR second cell = another selection.

**FAILURE MODES:** flash on mount (banned — P55-04) · layout shift when countdown→LIVE
flips (fixed-width clock col) · truncated numbers (never — U-45) · name collision: middle-
truncate + full name on focus/match page · sim/real mix (search only; boards are real-only).

**A11Y:** row = group; cells = real buttons, SR label `Arsenal to win, 1.30, implied 77 percent`
(X01.S1); suspended band `aria-live` once; scores in `role=status` cadence-batched; 44px
targets; focus ring 2px neon+offset, dual-tone on cta (C-11).

**EVIDENCE:** pending (QC row + Playwright state shots).
**CHALLENGE:** pending.

---

## E-BRD-02 — League/competition group header (+ count + ★)

**ELEMENT/PAGE/STATE:** sticky header atop every group on Live/Football/Your matches.
States: followed(★ gold) · unfollowed(☆) · all-live · mixed · collapsed-filter.

**WHERE:** top of each s1 region; sticks under page header at 32–36px while its rows scroll.

**WHY:** P1 + U-28 (market/match counts upfront); P51-15 (name + count leads, layer-cake
scan); T42-15 (★ competition = follows-first surface); W2-04/W3-04 parity (`flag ● name ★
View all ›`); sticky = MENTAL-MAP orientation while scrolling (T7-08).

**SIZE/SPACING:** header h 32–36px; flag/crest mark 20px; name→count gap 8px; star hit ≥24px
visual/44px pseudo (P51-04); `View all N ›` right, 40px hit.

**TYPE:** name hb-h1 t1; `N matches` hb-label t2 (Oxanium for the numeral); link hb-label.

**COLOUR+CONTRAST:** header on s1; live dot `--c-live` + `●`; star gold/t3 (C-08 gold =
follows only); hairline bottom s2.

**MOTION:** follow toggle → ☆→★ shape-morph 150ms ease-standard (shape is the channel, not
hue — C-03); interrupt: retoggle retargets mid-flight (spring); sticky engage = none (no
shadow pop — hairline only). RM = instant star swap.

**PLAYER EXPECTATION:** thinks "which league, how many games, can I pin it" · expects star
to follow the competition and `View all` to open its full list · we show count + live dot +
link · next tap: star toggle or `›`.

**FAILURE MODES:** count lies during filter (must reflect filtered set) · header unsticks on
short groups (min 1 row) · star hit overlaps `›` (pseudo-areas never overlap — Salaja) ·
flag emoji → authored crest mark only (SA4-04).

**A11Y:** header = `h2`; star = `aria-pressed` toggle labelled `Follow Premier League`;
count inside `aria-describedby`; link = real `<a>`.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-03 — Sport nav pill + count (rail item phone-sibling)

**ELEMENT/PAGE/STATE:** phone sport-row pill + desk content nav-pill (Home nav row W1-22).
States: active · idle · live-count · disabled-0 (live page only).

**WHERE:** phone = sticky sport row under top bar (SH-04); desk = board-top nav row
(INVENTORY W1-02/W1-22 parity).

**WHY:** ≤2 taps to any market (U-16, A20.b); Live with count = bet365-praised central-live
pattern (U1 delights); pale-cyan = selected per D-01/P3; scroll-pills w/ edge fade (P51-09).

**SIZE/SPACING:** pill h 44px phone / 36px desk; pad 16px x; 8px gaps; glyph 20px; count
chip inside pill, never detached. ~5–7 visible, rest behind edge-fade scroll.

**TYPE:** name hb-label (active t1 weight 600); count hb-micro Oxanium.

**COLOUR+CONTRAST:** idle = s2 fill + t1 text; active = cta fill + cta-fg (selected-acts,
P3); Live pill: `●`+count in --c-live on s2 (word+icon, U-41); disabled-0 = t3 + no fill
change (honest zero, LV-03).

**MOTION:** select → 120ms fill swap; count change → S1 digit tick ≤150ms; scroll = native,
edge fades (no bounce); repeat-tap already-active = 0 animation (U-43). RM identical instant.

**PLAYER EXPECTATION:** thinks "switch sport / how much is live" · expects pill to filter the
world below · we show active fill + live count · next tap: another pill or a match row.

**FAILURE MODES:** count stale after filter change (recompute same render) · pill row wraps
on 360 (scrolls, never wraps — SH-05) · `Live 0` pill inviting a dead page → renders
disabled + LV-03 fallback exists anyway.

**A11Y:** tablist + roving tabindex, arrows move; `aria-current` on active; count read as
`Live, 13 in play`; pill = 44px target.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-04 — Hero slide (featured-fixture slideshow, no promos)

**ELEMENT/PAGE/STATE:** editorial card in home slideshow (D-11). States: live-fixture ·
scheduled-fixture · selected-cell · 1-of-N position.

**WHERE:** board, after live strip; desk ~2-row-tall region; phone full-bleed card.

**WHY:** M4 slideshow ask w/ zero promos (scope-banned anyway); P51-01 banner-blindness law —
identical surface/border/radius as match cards, real teams + real market + real odds + ONE
CTA so it reads as content, not ad; P51-02 no auto-rotation (peripheral hijack + WCAG 2.2.2).

**SIZE/SPACING:** crests 48px hero tier (TOKENS crests); competition label top-left, status
top-right (W1-11); 1X2 cells identical geometry to E-BRD-01; `View match` cta 44px; slide
peek 24px next card @390.

**TYPE:** competition hb-label t2; teams hb-title t1; score hb-score Oxanium; prices hb-odds;
CTA hb-label 600 cta-fg.

**COLOUR+CONTRAST:** s1 fill + s2 hairline — same as group regions (the anti-banner rule);
status = live badge component; CTA = cta fill (the only pale-cyan on the card).

**MOTION:** S6 masthead — CSS scroll-snap slides; desk ‹ › buttons + dots; phone swipe;
kinetic team-name weight shift only; NO autoplay (P51-02); pause control + `1 / 5` counter;
slide change 250–300ms ease-standard; interrupt = swipe overrides mid-transition; RM =
static slides + controls.

**PLAYER EXPECTATION:** thinks "what's the big game" · expects it to be a real fixture with
real prices, not an ad · we show crests, score/clock, odds, one CTA · next tap: price cell
(adds to slip) or `View match`.

**FAILURE MODES:** reads as ad (kill: bespoke skins, promo copy — fold audit T42-14) ·
autoplay regression (lint: no timer advances) · carousel traps focus (arrows+dots after slide
CTA in tab order) · >5 slides (cap 5; attention budget).

**A11Y:** `role=region aria-roledescription=carousel`; slide labelled `Featured match 1 of 5:
Arsenal v Brighton, live 52 minutes`; prev/next + dots 44px; WCAG 2.2.2 satisfied (manual).

**EVIDENCE:** pending (qc/blur banner-blindness shot required).
**CHALLENGE:** pending — likely attack: same-as-rows look may under-sell "hero"; defend with
P51-01 evidence.

---

## E-BRD-05 — Countdown block (Starting soon)

**ELEMENT/PAGE/STATE:** kickoff countdown chip on Starting soon rows/pills + LV-03 empty
list. States: >1h · <1h · <1min · flip-to-LIVE.

**WHERE:** home Starting soon section; LV-03; also inline on scheduled match rows as
`20:00 · Tue, Oct 20` pairing.

**WHY:** U-39 pre-match shows countdown never 0–0 (FotMob/uxsnaps via 72-canon); R-YAB-12 /
P52-13 countdowns map ONLY to real events; T42-17 flip without layout jump; A13.c honest live
indicators.

**SIZE/SPACING:** chip h 24px; pad 8px; sits in clock column width (fixed — flip can't move
layout); `Kicks off in` hb-micro + time hb-clock Oxanium.

**TYPE:** time = Oxanium hb-clock tabular (`04:12`, `18:47`, `45+2'`); label hb-micro t2.

**COLOUR+CONTRAST:** chip s2 fill + t2 text; <1min = t1 (proximity, not urgency color — P52
bans pressure styling); LIVE flip adopts live-badge tokens.

**MOTION:** digits tick 1s (linear-permitted clock rule); at 0 → `● LIVE` word+icon swap
150ms same-cell (no movement); interrupt = feed correction supersedes; RM = instant text.

**PLAYER EXPECTATION:** thinks "when does it start / did it start" · expects honest clock ·
we show real kickoff countdown then live badge · next tap: row → match page or a price.

**FAILURE MODES:** negative countdown on clock skew (clamp + re-sync) · marketing countdown
prop (code rule: component accepts kickoff only — P52-13) · layout jump at flip (fixed cell).

**A11Y:** `role=timer`, announce flip once (`Arsenal v Brighton is now live`); not
aria-live per-second.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-06 — Filter chips (sport + competition, with counts)

**ELEMENT/PAGE/STATE:** Live page sport chips `All 13 · Soccer 6 …`; `All competitions ▾`
dropdown on Live/Football. States: active · idle · composed-multi · zero-count.

**WHERE:** board-top filter row LV-01; phone scroll-row LV-02; Football secondary row FB-01.

**WHY:** brief "filter by sport and competition" (W2-03); U-28 counts upfront; R-YAB-14
curate→filter→search ladder; U-45 state in URL; A37.S3 market counts.

**SIZE/SPACING:** same pill grammar as E-BRD-03 (one control grammar — SA4-02): 36–44px h,
8px gaps, glyph+name+count.

**TYPE:** hb-label + Oxanium count hb-micro; dropdown items hb-body.

**COLOUR+CONTRAST:** active = cta/cta-fg; idle s2/t1; count t2→cta-fg when active; zero =
t3 + disabled styling (never hidden — honest totals).

**MOTION:** 120ms fill swap; dropdown = sheet on phone/popover on desk, enter 200ms
out-expo, close 140ms (faster close — P4); interrupt mid-open = close wins. RM instant.

**PLAYER EXPECTATION:** thinks "narrow this to what I follow" · expects counts to predict
what's inside · we show filtered groups + breadcrumb `Live › Soccer › PL · 3` × · next tap:
another chip, dropdown, or row.

**FAILURE MODES:** chip+dropdown disagree (single filter source) · zero-result combo shows
blank (LV-03 empty module) · counts that don't sum (audit vs group totals each render) ·
filter lost on nav (URL state — U-45).

**A11Y:** chips = `aria-pressed` toggles inside `role=group`; dropdown = listbox with counts
in option labels; composed state announced `3 matches in Premier League`.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-07 — Search palette (⌘K)

**ELEMENT/PAGE/STATE:** global palette — desk top-bar field + phone glyph; states: closed ·
open-empty (recents+follows) · typing-results · no-results · keyboard-nav.

**WHERE:** top bar (SH-01/04) + content search bar on boards focuses the same palette;
match page variant scopes to `Search markets or players` (W4-06).

**WHY:** brief "teams, players, competitions, markets" (U-16); 7,000-markets-no-search pain
(U1 §7); T42-16 depth spec (type icons, recents, follows-first, +N deep-links); sim
quarantine (U1 verbatim Stake e-football mix); Salaja instant-palette rule (no open
animation — U-43); A11 banner: palette not a promo slot.

**SIZE/SPACING:** desk palette 640px w, anchored under field, r-lg + shadow token + hairline;
phone = top sheet full-width; rows 44px; group labels 12px caps? No — sentence-case labels
hb-micro t3 (voice rule).

**TYPE:** input hb-body; row name hb-body t1 + breadcrumb hb-body-sec t2 (`Arsenal · Premier
League · Match`); type glyph 16px left.

**COLOUR+CONTRAST:** s2 panel on scrimless board; selected row s3; follows group marked gold ★.

**MOTION:** open ≤120ms fade only (frequent action); list updates instant per keystroke;
close 120ms + focus returns to trigger. RM same (already minimal).

**PLAYER EXPECTATION:** thinks "take me to X" · expects top hit = what they typed, real teams
not sims · we show grouped results with where-they-live breadcrumbs · next tap: Enter →
destination (match page / league / market group deep-link).

**FAILURE MODES:** esim mixing (labelled section only) · keyboard dead-end (Esc always
closes, Enter always goes) · empty input shows ads (never — recents+follows) · query lost on
close (state `?q=` persists).

**A11Y:** `role=combobox` + listbox, `aria-activedescendant`; results count announced;
fully keyboard-completable (X01); ⌘K + `/` shortcuts.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-SHL-01 — Balance widget

**ELEMENT/PAGE/STATE:** top-bar balance `₮ 250.00 ▾`; states: idle · tick (settle/place/
deposit) · popover open · break-mode · offline-frozen.

**WHERE:** top bar right cluster desk; phone = compact pill (SH-04).

**WHY:** U-19 always-live balance — auto-refresh, no nav-to-refresh (U1 §8 verbatim pains);
P2 never surprise money — delta is shown not swapped; available-vs-in-bets split (Iris
persona); ₮ glyph always (C-07).

**SIZE/SPACING:** pill h 36px desk / 32px phone; pad 12px; `▾` affordance 16px.

**TYPE:** amount Oxanium hb-odds desk / hb-odds-sm phone, t1; popover lines hb-body-sec.

**COLOUR+CONTRAST:** s1 fill + hairline + t1 amount; delta flash = up/down glyph + tint
(never color alone — C-01); break-mode = t2 chip `On a break · back 22:40` (C-20 neutral).

**MOTION:** value change → S1 digit morph 250ms + signed delta chip `+36.00` fading <3s;
interrupt = next delta supersedes; RM = instant value + delta line.

**PLAYER EXPECTATION:** thinks "what can I stake" · expects figure = truth, updated · we
show live total + split popover `Available 230.00 · In open bets 20.00` · next tap: deposit,
or a price cell.

**FAILURE MODES:** stale after placement (same-render debit) · silent sync drift (displayed
≠ wallet — reconciliation line SH-10) · truncation of big balances (Oxanium fixed, `1,234.56`
locale format — X02) · offline shows fake-fresh (Frozen caption).

**A11Y:** `aria-live=polite` announces `Balance 250 USDT` on change; popover = disclosure
button; money text AAA target.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-SHL-02 — Deposit button

**ELEMENT/PAGE/STATE:** top-bar `Add funds`; states: idle · press · hidden-in-break ·
disabled-offline.

**WHERE:** top bar right, last-but-one before panel toggle; phone inside wallet sheet.

**WHY:** 71-brand rule 4 — the ONLY primary CTA in chrome (pale-cyan does the acting, D-01,
U-25); wireframe `Register` mint = same slot, so parity grammar preserved; RG: deposit never
fires post-loss or in break (P52-16, U-52) — a button that knows when to disappear.

**SIZE/SPACING:** h 40px desk, min-w 96px; r-md; label pad 16px.

**TYPE:** `Add funds` hb-label 600 cta-fg (COPY.md `Add funds (demo)` → button label
`Add funds`, demo tag lives in the sheet).

**COLOUR+CONTRAST:** cta fill #C4F4F1 + cta-fg text (~11:1 estimate — T6 verifies ≥7);
hover cta→#82e0e0 (verified hover token, 71); press darker, never neon fill (banned).

**MOTION:** hover instant 0ms color (Salaja); press scale .98, 120ms; no pulse ever — calm
brand (P3). RM identical.

**PLAYER EXPECTATION:** thinks "top up" · expects wallet sheet, not a redirect maze · we
show sheet: amounts, `Demo — nothing here is real`, USDT only · next tap: amount → confirm.

**FAILURE MODES:** deposit easier than withdrawal (parity check — P52-16) · opens after a
lost settle (suppressed) · double-submit funding (disable on first tap, U-03 pattern).

**A11Y:** real button, `Add funds` label; focus ring dual-tone on cta fill (C-11).

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-SHL-03 — Icon rail item (desktop)

**ELEMENT/PAGE/STATE:** 72px rail item; states: active · idle · hover · live-count badge ·
badge-change.

**WHERE:** left rail, fixed all desk boards (SH-01).

**WHY:** MENTAL-MAP left=sports zone; W-parity icon rail (INVENTORY shared); ≤2-tap sport
switch (U-16); one custom glyph set, 1.5px stroke, 20px grid (TOKENS icon law — no stock).

**SIZE/SPACING:** item 48×48px hit inside 72px col, 8px gaps; active tile 40px r-md s3 +
3px leading indicator; Live badge = top-right count chip.

**TYPE:** glyph only (title attr for hover); badge numeral Oxanium hb-micro.

**COLOUR+CONTRAST:** idle glyph t2; hover s3 tile + t1 glyph; active neon glyph + s3 tile +
indicator (neon = accent/icon, allowed — never fill); badge `--c-live` text + `●` (U-41).

**MOTION:** hover instant; active change 120ms tile fade; count tick S1 ≤150ms; pulse dot on
Live = tint-only breathe ~2s, exempt-but-muted in S8 (calm-live). RM: static dot+count.

**PLAYER EXPECTATION:** thinks "jump to a sport / what's live" · expects icon=destination,
badge=truth · we show glyph + count · next tap: board reloads that sport ≤1 tap from anywhere.

**FAILURE MODES:** unlabeled glyphs (aria-label + title + tooltip on hover-delay) · badge
lying vs `/live` total (single source) · casino peers styled louder (uniform grammar,
71 rule 9).

**A11Y:** nav landmark; `aria-current` on active; tooltip after 400ms hover, instant for
focus; 44px hit via pseudo.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-SHL-04 — Bottom nav item (phone)

**ELEMENT/PAGE/STATE:** 67px bottom bar items `Menu · Sports · Casino · Chat · Support`;
states: active · idle · badge (Chat unread).

**WHERE:** fixed bottom + safe-area, all phone pages (SH-04).

**WHY:** wireframe parity bar (INVENTORY shared); thumb-zone primacy (P5, U-18, 75% thumb);
Sports stays active across all five pages (ask #20); labels that never truncate (fixes
`Su…` — U-45).

**SIZE/SPACING:** bar 67px + env(safe-area); 5 equal slots; glyph 20px + label; 44px+ hits.

**TYPE:** label hb-micro (≥11px floor, T7-02); active label 600.

**COLOUR+CONTRAST:** bar c-bg + hairline top; idle t2; active neon glyph+label + s3 tile
(accent grammar, not fill — D-01).

**MOTION:** tab switch 120ms cross-fade glyph/label (icon-swap rule: scale .25→1 + blur ≤4px
bridge — Salaja); repeat-tap on active = 0 animation (U-43); RM instant.

**PLAYER EXPECTATION:** thinks "where am I / home base" · expects bar always there, thumb-
reachable · we show persistent bar, slip pill floats ABOVE it (T42-19) · next tap: section.

**FAILURE MODES:** slip pill occludes bar (z-order + 8px gap spec) · active state lost on
deep pages (Sports remains current for all board pages) · safe-area clip (env() padding —
71 task 14).

**A11Y:** `nav` landmark, `aria-current`; labels never icon-only.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-08 — Live badge

**ELEMENT/PAGE/STATE:** `● LIVE` + clock unit on rows, hero, rail badge, live strip.
States: live · HT · ET · break (`Break`, `Second break`) · frozen-offline.

**WHERE:** row clock column, card header, rail Live badge, hero status slot.

**WHY:** U-41 live/frozen NEVER color alone — word+icon; C-03/C-05 channel rules; T42-17
honesty pack (`45+2'`, `HT`, `Break`); betby phonetics kept (71: `29′ 1st half`).

**SIZE/SPACING:** badge = `●` 8px + `LIVE` hb-label + space + clock hb-clock; inline, no
pill-fill needed (C-05 documents fill path only if pill used — we use dot+word on s1).

**TYPE:** `LIVE` hb-label 600 `--c-live`; clock Oxanium hb-clock same hue; `HT`/`Break`
switches to t2 (not-live-but-real state).

**COLOUR+CONTRAST:** --c-live text on s1/s2 (~4.6–4.87 measured range in C-05 — adopt, then
verify T6); frozen adds t3 `Frozen` caption, dot stops pulsing.

**MOTION:** dot = tint-only pulse ~2s (ambient life, D-12; counts toward ≤4-motion budget);
clock tick linear 1s; HT/break swaps 120ms cross-fade; RM = static dot+word.

**PLAYER EXPECTATION:** thinks "is it actually in play" · expects real minute, real state ·
we show truthful clock incl. stoppage/breaks · next tap: the row.

**FAILURE MODES:** clock ahead of real (delay honesty line in LV-01 header) · frozen state
indistinguishable (Frozen caption + stopped dot) · badge on a suspended row reads "bettable"
→ band's lock sits in the same row (E-BRD-01 state).

**A11Y:** `Live, 52 minutes` announced on row focus, not per tick; `role=status` on
score/minute changes batched.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-09 — Empty state module

**ELEMENT/PAGE/STATE:** board empty modules — Nothing-live (LV-03) · no-follows (HM-03) ·
filter-zero (FB-04) · empty search (SH-06) · empty ticket (panel). States: per context.

**WHERE:** inline in the section that owns the emptiness — never a routed dead-end page.

**WHY:** X05 empty = art + next step; P52-23 honest empty, no fabricated fixtures; scorecard's
explicit "empty → Starting soon" ask; A5.a fingerprint ban (no centred-icon cliché) — ours is
left-aligned, type-led, one action.

**SIZE/SPACING:** module = s1 region, pad 24px, max-w 480px text col; house-glyph mark 24px
at 40% — the ≤1 cameo budget (U-32).

**TYPE:** headline hb-h1 t1 + line hb-body t2 + one CTA hb-label (cta only when actionable).

**COLOUR+CONTRAST:** neutral; zero gold/red (C-20: empty ≠ alarm ≠ reward); CTA = cta fill.

**MOTION:** enter 200ms out-expo opacity+2px-y; content swap mutates only changed words
(Family copy rule — 72-canon #8); RM instant.

**PLAYER EXPECTATION:** thinks "is it broken or just empty" · expects honest answer + a door ·
we show what happened + one next step (`Nothing in play right now — starting soon below` +
countdown pills / `★ any team pins it here` + suggestions) · next tap: the offered step.

**FAILURE MODES:** empty that lies (counts must be real) · two CTAs competing (exactly one
primary) · icon-only void with no words · skeleton looping forever past ~10s → convert to
error module (X06).

**A11Y:** `role=status`; headline is a heading level that fits the section.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-BRD-10 — Skeleton row

**ELEMENT/PAGE/STATE:** loading stand-in for match rows/group headers/hero. States:
pre-300ms (nothing) · shimmering ≤2 loops · resolved-swap · timeout→error.

**WHERE:** anywhere real rows will land; geometry is pixel-exact to E-BRD-01.

**WHY:** X04 skeleton = final layout, no CLS; U-42/U-57 optimistic-first, hold off 150–300ms,
opacity-only shimmer; T42-07 real-markup `is-loading`; P55-14 aria-busy+role=status;
A17 perf = first paint honesty.

**SIZE/SPACING:** identical to final row (52–56/44–48px); shimmer blocks = crest disc 20px,
name bars (60%/40%), cell blocks — drawn inside the real DOM nodes.

**TYPE:** none (blocks); `Loading matches` SR-only text.

**COLOUR+CONTRAST:** blocks s2 on s1; shimmer mid-stop inside surface ladder (C-23: it is —
documented decorative-only).

**MOTION:** shimmer = opacity 1→.55→1, 1.4s, ≤2 loops then hold static (U-57); swap to real =
150ms opacity cross-fade; RM = no shimmer, static blocks → instant content (U-42).

**PLAYER EXPECTATION:** thinks "it's coming" · expects page shape stable · we show the exact
skeleton of what arrives · next tap: wait — nothing tappable yet (honest: no fake affordances).

**FAILURE MODES:** shimmer on fast loads (delay gate) · spinner regression on money surfaces
(banned — T42-07) · skeleton geometry drift after row changes (shared component) · infinite
loop masking an outage (timeout → error module + retry).

**A11Y:** `aria-busy=true` on region; `role=status` "Loading"; no focusable skeleton children.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-SHL-05 — Offline toast (+ reconnect)

**ELEMENT/PAGE/STATE:** persistent toast while offline → `Back online` transient on
reconnect. States: offline-sticky · reconnect-3s · dismissed-never (offline can't dismiss).

**WHERE:** phone: above bottom nav/slip pill; desk: bottom-right, above panel edge.

**WHY:** SH-07 spec; XV4-04 own-the-fault calm copy (`You're offline — prices are frozen, not
live`); U-41 frozen = word+icon; P6 designed offline (Paddy Power white-screen is the pain);
betby `Back online` phonetic kept.

**SIZE/SPACING:** h 48px, side insets 16px, r-md, pad 16px; icon 20px wifi-off.

**TYPE:** hb-body-sec t1 on s2; `Back online` = up-glyph + t1.

**COLOUR+CONTRAST:** neutral s2 + hairline — never error red (it isn't the user's fault);
`Back online` `--c-up` glyph+word.

**MOTION:** enter 200ms out-expo rise-8px; sticky (no auto-dismiss offline); reconnect toast
3s then close 140ms; interrupt = reconnect supersedes offline toast in place. RM same.

**PLAYER EXPECTATION:** thinks "did I lose my bet / is it me" · expects an answer · we show
frozen-not-broken + what still works (ticket kept, prices marked frozen) · next tap: nothing
required; on return, revalidation banners.

**FAILURE MODES:** toast covers odds (docked, not floating over cells) · offline bet attempt
silently queued (banned — Place shows `Prices frozen` disabled reason, U-04-style honesty) ·
flapping on bad networks (debounce ≥2s both directions).

**A11Y:** `role=status`, announced once; not a dialog — never steals focus (P4 exit respect).

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

## E-SHL-06 — Session line (ambient reality check)

**ELEMENT/PAGE/STATE:** one-line session readout `Session 47 min · Net −24.00 USDT`;
states: neutral · positive net · tapped→RG sheet · reality-check due (ack-required variant).

**WHERE:** ticket panel footer (always), Live page sub-head (P52-21), slip sheet footer —
money surfaces, not a greyed footer (P51-16).

**WHY:** U-49 ambient session line + acknowledged reality check; P52-01 persistent time+net
pairing; A7.d RG-as-trust-signal judge-visible; P51-16 contrasting chip placement; C-20
neutral channel (words carry it, not red).

**SIZE/SPACING:** line h 24px; hb-micro t2 on s1 strip; tap opens RG sheet (4 rungs — U-53).

**TYPE:** hb-micro; numerals Oxanium; sign always explicit `−24.00`/`+36.00`.

**COLOUR+CONTRAST:** t2 words; net value t1 (never green/red — P/L hue ban, C-20/C-21);
reality-check due = t1 text `You've been here 2h — take a break?` + `I'm good`/`Take a break`
buttons, ack-required (P52-03).

**MOTION:** value update S1-style digit swap ≤150ms on the minute boundary; reality-check
appears as a block in flow (not modal — P4); RM instant.

**PLAYER EXPECTATION:** thinks "how long / how much am I in" · expects honesty · we show
elapsed + net in one glance · next tap: the line → limits/cool-off/break/self-exclusion rungs.

**FAILURE MODES:** net resets on nav (session-scoped store) · reality-check blocks a pending
bet (ack sheet waits for safe moment, never interrupts a placement — but can't be dismissed
unread) · micro-size burial (hb-micro is 11px floor — P51-16 wants visible, it rides content
flow).

**A11Y:** `role=timer` + `aria-live=polite` hourly; net labelled `Net this session, minus 24
USDT`; RG sheet = focus-trapped dialog returning focus.

**EVIDENCE:** pending. **CHALLENGE:** pending.

---

### Card index coverage check

| Card | Frames proving it |
|---|---|
| E-BRD-01 match row | HM-01/02/05, LV-01/02/04, FB-01/02/03 |
| E-BRD-02 group header | LV-01, FB-01, HM-01 |
| E-BRD-03 sport pill | HM-01/02, LV-01/02, SH-04 |
| E-BRD-04 hero slide | HM-01/02/04 |
| E-BRD-05 countdown | HM-01, LV-03 |
| E-BRD-06 filter chips | LV-01/02/05, FB-01/04 |
| E-BRD-07 search palette | SH-06 |
| E-SHL-01 balance | SH-01/04/07/11 |
| E-SHL-02 deposit | SH-01/02/04/11 |
| E-SHL-03 rail item | SH-01/03/08 |
| E-SHL-04 bottom nav | SH-04/05 |
| E-BRD-08 live badge | all live rows/hero |
| E-BRD-09 empty module | LV-03, HM-03, FB-04, SH-06 |
| E-BRD-10 skeleton | HM-04, boards loading |
| E-SHL-05 offline toast | SH-07 |
| E-SHL-06 session line | SH-01, LV-01, SH-11 |
