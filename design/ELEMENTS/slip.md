# Element cards — THE TRUST SURFACE (Bet slip + My bets, one shared page)

Template per qc/RESET_BRIEF §7. Tokens only (TOKENS.md). Copy from COPY.md; ★ = new string written
to its voice rules. U-ids cite qc/ASKS.md; W-ids cite wireframes/INVENTORY.md; S-ids cite MOTION.md;
F-ids cite research/73; pain cites research/70. Contrast targets: money/odds AAA (≥7:1), UI text AA
(≥4.5:1) — measured values pending T6 culori pass; never assumed (Mejba law, 72).

Space legend: 4·8·12·16·20·24·32·48·64 scale; radius r-sm 4 / r-md 8 / r-lg 12 (sheets) / r-pill 999.

---

## Zone 1 — the ticket container (one object, two postures)

### E-01 · Ticket panel · PAGE shared-slip · STATE: default (1440 only)
WHERE: right column, fixed 360 px, full height below top bar, docked to right edge; never overlaps
the board (MENTAL-MAP rule 1). Order: tabs → scroll body → sticky footer (CTA + RG strip).
WHY: BETBY/Housebets convention + every rival (bet365/FanDuel/DK right rail, A19.b familiar list);
P5 — persistent zone, ticket reachable blind. U-11 persistence.
SIZE: 360 px wide; body padding 16; card gaps 12; footer padding 16 16 12; header tabs 48 tall.
TYPE: zone title n/a — tabs hb-body 14/20 600.
COLOUR: bg --c-surface-1; hairline border-left 1 px --c-surface-3 on bg --c-bg.
BORDER/RADIUS/ELEV: flat panel, r-0 edges, no shadow — it is a dock, not a card (72: floating
surfaces get rings; docked panels get hairlines).
MOTION: slide-in-right 240 ms ease-standard on open (MOTION sheet law), close 160 ms — closes faster
than opens; content fades opacity-only (U-37). Interruptible, newest-state-wins. RM: instant swap.
THINKS: "my ticket lives over there" / EXPECTS: it never moves or resets / WE SHOW: same panel on
every route, state in URL (U-45) / NEXT: scan board — zero taps, it's already open.
FAIL: none (container). If content errors, zone shows retry not blank (U-23).
A11Y: `role="complementary"` `aria-label="Your ticket"`; landmark order after main.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-02 · Slip pill · PAGE shared-slip · STATES: pick / open-bet / changed / suspended / break / offline
WHERE: floating bar, 12 px side insets, 8 px above the 67 px bottom tab bar, lower-third thumb arc.
WHY: brief verbatim "a bar at the bottom" + W5-02 parity; U-29 pill shows the PICK not just count;
P5 one-thumb reach; Theo (P-C) reads his pick without opening anything. BETBY/Stake bottom-bar
convention exceeded: ours carries live state, theirs carries a count.
SIZE: full-width −24, height 52, radius r-pill, padding 0 16 0 12; chevron hit 44×44.
TYPE: pick `Arsenal @ 1.30` hb-body 14/20 600 Figtree + odds Oxanium 600 hb-odds 15/20; count badge
hb-label 12/16.
COLOUR: pick state = --c-cta fill, --c-cta-fg text (W5-02's pale bar = judge's own token, D-01);
open-bet state = --c-surface-1 fill, --c-text text (quieter — the pick asks, the bet reports);
changed = same fill + 2 px --c-suspend left edge; suspended/break/offline = --c-surface-1 + glyph.
BORDER/RADIUS/ELEV: r-pill; floating → translucent 1 px ring + the one allowed 8/24 shadow (72).
MOTION: appears 200 ms out-expo scale(0.95)→1 (U-37); pill→sheet is a container transform along
drag axis (E-03); content swaps (pick→open-bet after placement) cross-fade 150 ms. Interruptible.
RM: opacity cross-fade.
THINKS: "my pick/bet is down there" / EXPECTS: tap or drag opens it / WE SHOW: the pick's name +
price + live minute in one line; state glyphs 🔒/❄ without words hidden / NEXT: open sheet —
one tap or one flick (P4).
FAIL: sheet fails mid-drag → settles back to pill, no penalty (P4); price moves while closed →
pill edge goes amber, announced not hidden.
A11Y: `role="button"` `aria-label="Ticket: Arsenal at 1.30, 1 selection"` state words read not
hue; expanded state via aria-expanded; live-region polite on price change.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-03 · Slip sheet · PAGE shared-slip · STATES: open / dragging / settling (390 only)
WHERE: bottom-anchored overlay above scrim; snap heights differ per tab — slip ≈52 dvh, My bets
≈72 dvh (Family: chained sheets differ); never full-screen (transient surface, permanent content).
WHY: D-06 pill→drag sheet over modal/nav page; Freiberg gesture law (P4); W5-03/04 parity —
sheet occupies lower ~55%, dimmed board behind. One action per sheet (Family).
SIZE: width 100%; max 80 dvh; grip 32 hit area, visible 36×4 bar; side padding 16; content max
single column.
TYPE: grip n/a; tab labels hb-body.
COLOUR: bg --c-bg (page color, not a card — the sheet IS the page folded up, MENTAL-MAP rule 4);
scrim rgba(--c-bg, .6) tracking drag fraction.
BORDER/RADIUS/ELEV: r-lg 12 top corners only; 1 px top hairline --c-surface-3; the one sheet shadow.
MOTION: --ease-spring-sheet 380/32; translateY follows finger 1:1; flick ≥0.11 px/ms decides;
mid-drag release settles back free; scrim ∝ distance; scroll-lock only when fully open; open ≤300,
close ≤180. Interruptible every frame (newest-state-wins). RM: 150 ms fade+translate.
THINKS: "I want to check my ticket" / EXPECTS: it follows my thumb / WE SHOW: sheet rises with the
finger; release decides / NEXT: stake or review — content, zero taps.
FAIL: interrupted gesture always resolves open or closed, never between; content taller than 80 dvh
scrolls internally.
A11Y: `role="dialog"` non-modal label "Bet slip"; Esc closes; focus returns to pill (Salaja);
drag has click+keyboard twins (open via tap, close via ✕/Esc/scrim).
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-04 · Ticket tabs (Bet slip n | My bets n | Chat | ✕) · STATES: active / inactive / badge-pulse
WHERE: sheet/panel header row, order per W5-04: `Bet slip` `My bets` `Chat` + ✕ right; badges carry
counts (slip = selections, My bets = open bets).
WHY: wireframe parity W5-04/W5-20/W6 (My bets lives as tab AND page — U-23 reachability); counts
upfront (U-28). Chat kept — no wireframe element dropped (A2.c).
SIZE: tab hit ≥44×44; badges min 20×20; row height 48; gap 16.
TYPE: hb-body 14/20; active 600, inactive 400; badge hb-label 12/16 Oxanium-ish numerals.
COLOUR: active --c-text on --c-surface-3 pill; inactive --c-text-2; badge slip = --c-cta/--c-cta-fg,
My bets = --c-surface-3/--c-text (W5-04 blue+mint badges → our pale-cyan + surface).
BORDER: r-pill on active indicator; none elsewhere.
MOTION: active indicator slides 200 ms ease-standard (directional — fly, don't teleport, Family);
badge +1 pulse once on placed bet traveling home (U-36). Repeat tab visits = zero animation (U-43).
RM: cross-fade.
THINKS: "where did my bet go" → the badge answers before they ask (P-B Ana's exit trigger) /
EXPECTS: tabs switch content / WE SHOW: instant swap, badge counts / NEXT: open bet row — 1 tap.
FAIL: count desync → authoritative server state on refocus; Chat tab empty-shell banned → ships
with stub copy or ships cut (challenge flag).
A11Y: `role="tablist"` + `tab` + `tabpanel`, arrow-key roving, aria-selected; badge in tab label.
EVIDENCE: pending build. CHALLENGE: pending critic — Chat tab scope unpriced.

---

## Zone 2 — the selection leg (4 states, P6: every state exists)

### E-05 · Selection card · STATE: default/armed
WHERE: slip body, first item after `Singles · N selection` header; 1440 panel and 390 sheet —
same card, one component (A2 consistency).
WHY: P1 — price is the product: pick name + price + implied% lead the card; W5-06/07 anatomy kept
(name, odds, ✕, market+fixture+live sub-line, stake, returns) and exceeded with implied% (U-47),
CO badge (U-05), min/max (U-10).
SIZE: card padding 12; name+price row 24; sub-line 16; stake row 48; ✕ hit 44×44 pseudo-expanded.
TYPE: name hb-h1 16/20 600; price Oxanium 700 hb-odds 15/20 fixed-width cell; implied hb-odds-sm
13/16; sub-line hb-body-sec 13/18 (score+minute --c-live word+dot, never color alone, U-41).
COLOUR: card bg --c-surface-2; price --c-text; implied --c-text-2; sub-line --c-text-2 with --c-live
status; ✕ --c-text-3.
BORDER: r-md 8 (dominant, TOKENS); 1 px hairline --c-surface-3; no card-in-card (stake field is a
row, not a nested card).
MOTION: card enters via S2 flight only on explicit add; price ticks S1 (NumberFlow trend=0, 250 ms,
glyph+tint decay ~1 s); ✕ removes card 160 ms close. RM: instant.
THINKS: "that's my pick, what does it pay" / EXPECTS: price is the current truth / WE SHOW: price +
implied 77% + live score line + per-leg return / NEXT: set stake — chips below, zero taps to see.
FAIL: leg data stale → frozen-marked honestly (offline) or reason chip (suspend), never a wrong
price shown as live.
A11Y: `role="group"` `aria-label="Selection: Arsenal to win, 1.30, 77 percent implied"`; ✕
`aria-label="Remove Arsenal"`; price changes announced `aria-live="polite"` throttled ≥2 s.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-06 · Selection card · STATE: changed-better (auto-accepted)
WHERE: same slot; difference = fact line under name row + ▲ glyph + up-tint on price cell.
WHY: D-03 default accept-better-only — consent pre-given, announced as fact not asked (P2:
announced in-frame with reason + consent affordance already set). Ends the rejection loop on
good news (70§1 #1 verbatim pain).
SIZE: fact line 20 tall, hb-body-sec.
TYPE: `Moved 1.30 → 1.45 · better — accepted` ★ hb-body-sec; old price struck through in-line.
COLOUR: fact text --c-text-2; ▲ + price tint --c-up (triple-coded: glyph+word+color, U-41, Marco).
BORDER: unchanged — good news gets no alarming edge (P3 calm).
MOTION: S1 digit morph + tint decay ~1 s; fact line fades in 200 ms, persists until next event.
Newest tick supersedes. RM: instant swap + glyph.
THINKS: "price moved — did I get screwed?" / EXPECTS: to know instantly / WE SHOW: better — already
accepted, returns recalced / NEXT: place — CTA still armed, zero extra taps (the rival flow costs
one tap per move).
FAIL: two moves in flight → newest state wins, fact line shows last delta only.
A11Y: live-region: "Odds moved 1.30 to 1.45, accepted".
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-07 · Selection card · STATE: changed-worse (consent required)
WHERE: same card; amber 2 px LEFT edge + reason block inserted between name and stake rows; Accept/
Remove pair sits in the card — consent where the price lives, not a modal.
WHY: P2 + D-03 per-leg reconfirm; U-01 old→new both shown; Sportsbet.io's broken global toggle
(70§1: "still does not accept odds changes") → ours is leg-level and visible. bet365 asks the same
way in-slip (convention) — we add implied% + single-tap resolution.
SIZE: edge 2 px; block padding 8 0; buttons h44, Accept min-width 120, side-by-side gap 8.
TYPE: banner `Odds moved {old} → {new} while you were deciding` hb-body 600; `Accept 1.22` hb-body
600 on CTA-style fill; `Remove` --c-text-2.
COLOUR: edge --c-suspend (amber reserved for money-integrity, TOKENS allowed use); banner --c-text;
Accept fill --c-cta/--c-cta-fg (pale-cyan acts, D-01); Remove text-button.
BORDER: amber edge inside r-md; banner no box (edge carries the signal — no nested cards).
MOTION: edge appears 0 ms; gentle edge-pulse ≤1 Hz ONLY while awaiting, stops on sheet close or
answer (74); Accept → re-arm 150 ms; Remove → card exits 160 ms + undo affordance. Interruptible.
RM: static edge + label, no pulse.
THINKS: "it got worse — do I still want it" / EXPECTS: a real choice, not a fait accompli / WE
SHOW: old→new + implied delta + two buttons / NEXT: accept or remove — one tap, in-place.
FAIL: price moves again while awaiting → newest wins, banner re-bases to latest (no queue, U-56);
place attempted while unanswered → CTA blocker explains (E-13d).
A11Y: banner `role="alert"` once (not spammed); buttons labeled "Accept 1.22" / "Remove Arsenal".
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-08 · Selection card · STATE: suspended
WHERE: same card, 0 ms same-frame: 60% dim + padlock + reason chip; last price stays visible dimmed
(D-04 — hide/dead-button/toast all rejected).
WHY: S3 + U-04 + F29 (unexplained suspensions are the trust-destructive version); 70§2 "no obvious
reason" complaints; W2-09's `🔒 Suspended` bar convention lifted into the leg.
SIZE: dim overlay = card bounds; chip h24; lock glyph 20 px grid.
TYPE: `This pick is suspended — dangerous attack` hb-body-sec 600 on chip; last price dimmed same
type scale (never hidden — the price was real).
COLOUR: chip --c-suspend bg 15% + --c-suspend text? No — amber band per U-27: chip fill --c-suspend
at surface-mix, text --c-text on it (contrast checked ≥4.5); card fg →60% opacity equivalent.
BORDER: unchanged r-md; lock inline-left of chip.
MOTION: S3 — 0 ms, no lock animation (integrity, MOTION.md). Reopen: 150 ms un-dim + price tick +
direction glyph (U-04). RM identical.
THINKS: "why can't I bet — will it come back" / EXPECTS: reason + status / WE SHOW: named reason +
last price + Remove option, never dead / NEXT: wait or remove — Remove is 1 tap, waiting costs 0.
FAIL: suspend mid-stake-typing → input value kept, field disabled, nothing wiped (70§1 SportyBet
slip-wipe pain banned by design: slip persistence U-11).
A11Y: `aria-disabled` + status text "Suspended — dangerous attack" on card label; live-region once.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-09 · Odds-change mode control · STATES: Better only (default) / Any change / Ask every time
WHERE: slip body above CTA, one quiet line `Odds changes: Better only ▾`; opens in-place 3-option
row (no dialog-on-dialog, U-44).
WHY: U-02 3-mode preference; D-03; rival precedent = FanDuel's hidden slip gear + Sportsbet.io's
broken toggle — ours is visible, word-labeled, and actually controls behavior (P2 consent
affordance surfaced, not buried).
SIZE: line h44 hit; options as segmented row h44 each ≥88 wide.
TYPE: hb-body-sec; option labels `Better prices only` / `Any change` / `Ask every time` ★.
COLOUR: text --c-text-2, value --c-text; option select = --c-surface-3 fill.
MOTION: in-place expand 200 ms; selection = zero animation (repeat control); RM same.
THINKS: "what happens if the price moves" — answered before it does / EXPECTS: a real setting /
WE SHOW: the active mode in words + alternatives / NEXT: back to stake — one tap outside closes.
FAIL: mode change mid-await → applies to next change only, never retro-answers a pending ask.
A11Y: `aria-expanded` button + `role="radiogroup"`; state read in slip summary.
EVIDENCE: pending build. CHALLENGE: pending critic — 3rd mode adds a tap to better-moves; kept
because U-02 demands it and honesty > friction on money.

---

## Zone 3 — stake, returns, CTA, receipt

### E-10 · Stake input · STATES: empty / focused / filled / err-over / err-zero / err-6dp / disabled
WHERE: inside selection card bottom row, left = field, right = Returns readout (W5-08 parity).
WHY: U-09/U-10 fat-finger-proofing (the $1,008 X-submits bug, 70§1); FanDuel dual-input convention
→ ours pairs field with chips + limits printed upfront. Iris (P-D) needs currency clarity — USDT
suffix in-field.
SIZE: field h48 min-width 120; right-aligned numeral; padding 0 12; error line 18 below card.
TYPE: numeral Oxanium 600 hb-odds 15/20, ≥16 px input (iOS zoom law, Salaja); errors hb-body-sec.
COLOUR: field --c-surface-3 on card; focus ring --c-focus 2 px offset 2; error text --c-down +
⚠ icon (never red alone); suffix `USDT` --c-text-3.
BORDER: r-sm 4 inside r-md card; 1 px --c-surface-3 hairline, error → --c-down.
MOTION: focus ring 0 ms (Salaja hover/focus instant); error line slides 150 ms; values never
animate typing (frequent = no animation, U-43); on blur normalize formatting 150 ms fade.
RM: identical.
THINKS: "how much do I risk" / EXPECTS: limits visible before I type (kills invisible-limit pain
70§1) / WE SHOW: `Min 1.00 · max 5,000 USDT` ★ under field; typed value echoed instantly into
Returns + CTA / NEXT: confirm — CTA shows the same number (read twice = fat-finger tripwire).
FAIL: >balance → `More than your balance (240.00 USDT)` + `Add funds (demo)` + Max chip sets
240.00; zero → `Enter a stake — min 1.00 USDT` ★; >2dp → `Two decimals max` ★, value kept not
wiped; paste → accepted messy, normalized on blur; suspend → field disabled, value preserved.
A11Y: `inputmode="decimal"`, `aria-label="Stake in USDT"`, `aria-describedby` min/max + error;
error `role="alert"`; Enter submits form once.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-11 · Stake chips + Max · STATES: idle / pressed / disabled
WHERE: row under stake field: `1 · 10 · 50 · 100 · Max`, chips wrap at 360 px width.
WHY: Housebets' own widget ships 1/10/50/100 USDT quick chips (live teardown §2 — brand convention,
not borrowed); U-09 chips prevent fat-fingers; Max replaces typing-limit guesswork (70§1).
SIZE: chip h40×min-w56 (visual) with 44×44 hit via pseudo-element; gap 8; Max = same size, text.
TYPE: Oxanium 600 hb-odds-sm 13/16.
COLOUR: --c-surface-3 fill / --c-text; pressed :active scale .98 + --c-surface-2 swap; never
pre-highlighted (their widget highlights 50 — a default stake is a bet the operator makes for you,
BIT audit: container defaults are operator bets — we refuse it).
BORDER: r-pill chips? No — r-md keeps one radius thesis (72: no pill rows / encoding discipline).
MOTION: press 120 ms feedback; repeat taps zero animation (U-43); chip-adds-sum behavior: chip taps
ADD to current stake? NO — chips SET absolute value (addition = surprise machine, P2); Max sets
balance. RM: same.
THINKS: "round number, fast" / EXPECTS: tap = set / WE SHOW: field + returns + CTA update in same
frame / NEXT: place — CTA one tap below.
FAIL: chip > balance → chip disabled (chips render per-balance); Max at 0 balance → disabled +
balance line explains.
A11Y: `role="button"` `aria-label="Set stake to 50 USDT"`; Max labeled "Set stake to balance
240 USDT".
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-12 · Returns / implied / net block · STATE: computed
WHERE: slip totals, above CTA, order: Total stake ₮ → Returns·implied → If-it-loses → delay note.
WHY: W5-09 totals parity (Total stake / Payout with ₮); P1 price-is-product; F11/U-48 loss-framed
context — the only framing that improved comprehension in BIT RCT; U-47 implied beside returns.
SIZE: rows h20 each, 8 rhythm; numerals right-aligned in fixed cells.
TYPE: labels hb-body-sec; values Oxanium 600 hb-odds; ₮ icon 16.
COLOUR: labels --c-text-2; values --c-text; net-if-lost --c-text-2 (factual, not red — it's
arithmetic not alarm; red reserved for errors, U-54 factual losses).
BORDER: hairline top separator.
MOTION: values NumberFlow on change tint-only (S7 mechanism); zero animation on chip repeats.
RM: instant values.
THINKS: "what do I get, what do I risk" / EXPECTS: honest math / WE SHOW: `Returns 26.00 USDT ·
implied 77%` + `If it loses: −20.00 USDT` ★ + `In-play delay applies` ★ on live legs / NEXT: CTA.
FAIL: price moves → all values recompute in one frame, never partial arithmetic.
A11Y: totals in `role="status"` summary "Total stake 20, returns 26, implied 77 percent".
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-13a · Place CTA · STATE: idle-armed
WHERE: sticky footer bottom of slip body (390 sheet) / panel footer (1440); full width of zone,
last element before RG strip — the thumb's last stop, not first (P5 arc).
WHY: W5-10/21 parity + CTA echoes stake (fat-finger double-read, U-09); pale-cyan fill = the acting
color, neon reserved for text (P3, D-01, U-25).
SIZE: full-width, h52, margin-top 12.
TYPE: `Place bet · 20.00 USDT` hb-body 600 + Oxanium for the amount.
COLOUR: --c-cta fill, --c-cta-fg text (≥7:1 target, T6 measured).
BORDER: r-md 8; no shadow (docked, not floating).
MOTION: press :active scale .98 120 ms; enable = 200 ms fade once (never re-animates per keystroke).
RM: instant.
THINKS: "is this the real final step" / EXPECTS: one tap commits, honestly / WE SHOW: stake in the
label — the number is confirmed in two places (field + button) before money moves / NEXT: receipt.
FAIL: double-tap → disabled in the same event frame (edge §3); tap with unanswered odds-ask →
blocker state E-13d not a silent no-op.
A11Y: `aria-label="Place bet, 20 USDT, returns 26 USDT"`; submits on Enter; busy state E-13b.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-13b · Place CTA · STATE: pending (Confirming…)
WHERE: same CTA slot — busy state keeps the label slot + adds indicator, disabled instantly (U-44).
WHY: U-03 honest pending; 70§1 "processing wheel stuck" + "pending≠placed" panic → ≤3 s deadline
written into spec; S8 dims the board while money is in flight.
SIZE/TYPE/COLOUR: same geometry; label `Confirming…`, spinner glyph inline (16 px), fill darkens
to --c-surface-3 equivalent — visibly off, not pretend-live.
MOTION: indicator appears 120 ms; progress hairline on leg card, linear; ≤3 s then terminal —
result or reason, never a spinning void. Interruptible by nothing (commit in flight) — but the
UI stays honest: closing sheet doesn't cancel, result lands in My bets + pill (tab-hidden edge).
RM: identical (no motion in the wait itself).
THINKS: "did it take?" / EXPECTS: a quick, honest answer / WE SHOW: bounded wait — no fake
progress bar / NEXT: receipt or reason — zero taps either way.
FAIL: timeout → `Not placed — timed out. Your balance is untouched.` + retry; rejected on moved
price → `Place at {new}` one-tap recovery (kills the 5-tries loop).
A11Y: `aria-busy`; result announced `role="status"`.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-13c · Place CTA · STATE: failed
WHERE: reason block replaces CTA temporarily inside the slip (in-place, no toast, no dialog).
WHY: 74 "respectful" spec; COPY `Not placed — {reason}. Your balance is untouched.` — the
money-safe sentence is non-negotiable; failure = state with recovery action, not dead end (U-30).
SIZE: block padding 12; recovery button h44.
TYPE: reason hb-body 600 + recovery action hb-body.
COLOUR: --c-down text + ⚠ glyph; recovery --c-cta.
MOTION: ONE ≤4 px horizontal settle 150 ms — not a looping shake; RM = reason text only.
THINKS: "is my money gone" — the first sentence answers / EXPECTS: a fix / WE SHOW: reason +
recovery + untouched-balance guarantee / NEXT: retry or edit — one tap.
FAIL: repeat failure → same in-place pattern + persistent reason, never escalation to modal.
A11Y: `role="alert"`; focus moves to recovery action, returns to CTA on resolve.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-13d · Place CTA · STATES: disabled variants (empty / unanswered-ask / suspended / over-balance / break / offline)
WHERE: same slot; disabled with the reason INLINE — the button explains itself (never dead, U-03).
WHY: bet365 frozen-button + Paddy Power mystery-disable complaints (70§1/§2): a disabled control
with no stated reason is the trust bug. Each variant: `Enter a stake to place` ★ / `Answer the
odds change to place` ★ / `Waiting on suspended pick` ★ / `More than your balance` / `On a
break · back 14:30` / `Offline — can't place` ★.
SIZE/TYPE: same geometry, label hb-body.
COLOUR: --c-surface-3 fill, --c-text-3 label — dim but legible, never invisible; reason icon inline.
MOTION: state swap 150 ms cross-fade; re-arm 150 ms. RM: instant.
THINKS/EXPECTS/SHOW/NEXT: per variant — always "what now" answered by the label + adjacent action
(chips / accept buttons / remove / retry).
A11Y: `aria-disabled="true"` + `aria-describedby` reason; focusable-disabled (reasons must be
discoverable by keyboard, Salaja/Walters).
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-14 · Receipt card · STATE: placed
WHERE: replaces the CTA+legs via S5 container transform — the button becomes the document (D-02
ledger metaphor); persists in slip until dismissed or next pick.
WHY: U-12 receipt = truth: ref + accepted odds + timestamp (the acknowledgement IS the record of
the wager, 70§1 parlaytools); BIT audit: books ship no receipts — we ship one by default.
SIZE: card padding 16; ref row h20 mono-ish Oxanium; summary rows h20.
TYPE: `Bet placed · ref HB-48213 · 1.30 accepted` hb-body 600; recap hb-body-sec.
COLOUR: --c-surface-2 + quiet --c-up success tint behind header, fades <3 s (A13.e, U-54: quiet
wins, no confetti).
BORDER: r-md; ✓ glyph 20 px.
MOTION: S5 — CTA container-transforms to card 260 ms out-expo; ref types in char-by-char ≤400 ms;
tint decay <3 s. ONE hero move per flow (74). RM: instant card.
THINKS: "did it really take — where's the proof" / EXPECTS: a reference / WE SHOW: ref + accepted
price + timestamp + recap / NEXT: watch the bet — `View in My bets` one tap (indicator travels to
My bets tab, U-36).
FAIL: receipt dismissed → bet still in My bets (receipt is a view, not storage); duplicate submit
guard → same ref renders, never two bets.
A11Y: `role="status"` announces "Bet placed, reference HB-48213, 1.30 accepted".
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-15 · Clear all + undo · STATES: idle / confirming / undone-toast
WHERE: `Singles · N selection` header right, text button — far from CTA (Fitts: destructive far
and small, A9.c).
WHY: W5-05 parity; U-44 destructive = undo or in-place confirm, never dialog; slip-wipe is a pain
class (70§1 SportyBet) → ours is reversible.
SIZE: h44 hit, hb-body-sec --c-text-2.
MOTION: tap → in-place confirm `Clear all? [Clear] [Keep]` ★ 200 ms; cleared → ★ `Ticket cleared ·
Undo` inline for 5 s, then gone — undo restores exact prior state incl. stakes.
THINKS: "start over" / EXPECTS: a guarded wipe / WE SHOW: in-place confirm + undo / NEXT: re-add.
FAIL: undo after pick re-added → restores union, newest wins.
A11Y: `aria-label="Clear all selections"`; undo `role="status"`; keyboard: confirm inline receives
focus, Esc = Keep.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-16 · Offline banner · STATE: offline
WHERE: pins directly under tab row in sheet AND under panel tabs (same component); also full-page
My bets top. Everything below goes read-only with last-known data.
WHY: U-23 failure-proof + Theo edge (train, bad connection); COPY string; frozen ≠ dead — legs,
CO values, receipts all viewable, prices marked `frozen` ★ (never stale-as-live — P2).
SIZE: h40, full zone width, ⚠ icon 20 + text.
TYPE: `You're offline — prices are frozen, not live` hb-body-sec 600.
COLOUR: --c-suspend edge + --c-text — amber = system integrity signal, same family as suspension
(one encoding learned once: interrupted service = amber).
MOTION: enters 200 ms slide-down 8 px; exits 160 ms on reconnect + prices re-tick with direction
flash (state change is informative on return, U-04 pattern). RM: appear/disappear.
THINKS: "is this real-time" / EXPECTS: honesty / WE SHOW: frozen markers + cached data labeled
`Showing last known prices` ★ / NEXT: wait or browse — nothing breaks.
FAIL: flap-loop (on/off/on) → banner state debounced, newest wins, no animation queue.
A11Y: `role="status"`; announces once on transition.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-17 · Break lock strip · STATE: break active
WHERE: replaces CTA zone + banner under tabs; My bets stays readable, CO stays live (money-out
never blocked — logged decision, needs DECISIONS.md row at build).
WHY: U-21/U-53 RG parity — 4 rungs reachable ≤2 taps (limits/cool-off/break/self-exclusion);
Revealing Reality: controls in-flow for everyone, not warning-signs messaging; COPY `On a
break · back {time}`.
SIZE: strip h56; end-break action h44 in-place confirm (2-step deliberate, U-44).
TYPE: `On a break · back 14:30` hb-body 600; explainer hb-body-sec `Betting is off until then.
Prices are read-only. Cash out still works.` ★
COLOUR: --c-surface-2 + --c-text — deliberately NOT amber (not an error, a chosen state) and NOT
pale-cyan (no affordance-bait on a lock).
MOTION: none on the lock (integrity); end-break confirm expands 200 ms.
THINKS: (player set this earlier) "right, I'm on a break" / EXPECTS: the wall to hold / WE SHOW:
when it ends + what still works / NEXT: wait, or deliberately end — 2 taps, in-place.
FAIL: break ends mid-session → strip exits 160 ms, controls re-arm without page reload.
A11Y: `role="status"`; all disabled controls carry `aria-describedby` break reason.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-18 · Session/RG strip · STATE: ambient
WHERE: slip footer under CTA, single line; also My bets footer. Always on, never blocking.
WHY: U-49 ambient session line beats interrupt modals (F17–F20: pop-ups ≈null at scale, DCCA);
A7.d/Section-3 — 18+ + limits ≤2 taps; F26/F28 regulator-visibility = trust signal even unused.
SIZE: h32 line; links h44 hit via padding.
TYPE: `18+ · Play responsibly · Take a break` + `Session 47 min · net −12.00 USDT` ★ hb-micro
11/14 (floor).
COLOUR: --c-text-3 — present, never the loudest thing (A7.S6 hierarchy check); Take a break
--c-text-2 underline-style link.
MOTION: session value updates on minute roll, tint-only, exempt-muted under S8. RM instant.
THINKS: nothing — ambient by design / EXPECTS: the tools exist if needed / WE SHOW: time + net +
one-tap break / NEXT: back to ticket.
FAIL: net value stale after offline → `last known` marker, never wrong math.
A11Y: links real `<a>`/`button`; session line NOT in live-region (spam guard, Marco).
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-19 · Balance line · STATE: live
WHERE: slip footer directly above CTA; top bar balance is the canonical display — slip echoes
available vs in-bets split.
WHY: U-19 always-live balance; Iris needs fiat-mental-model clarity; `More than your balance`
error cites the real number inline (E-10).
SIZE: h20 row.
TYPE: `Balance 240.00 · in bets 60.00 USDT` ★ hb-body-sec, Oxanium numerals.
COLOUR: --c-text-2.
MOTION: NumberFlow on change; tint-only; suppressed under S8 while pending.
THINKS: "what can I actually stake" / EXPECTS: the real number before I type / WE SHOW: split —
available vs already riding / NEXT: stake chips below.
FAIL: refetch fails → last-known + marker, never a guessed balance.
A11Y: static text (not live-region; balance changes announced via CTA context).
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-33 · Live-delay disclosure · STATE: present on live legs
WHERE: totals block, directly above CTA (the consent moment).
WHY: U-15 live delay honestly disclosed; in-play guidance F29: timely-info fairness — the player
deserves to know the price can still move between tap and accept.
SIZE: h18 row, full zone width, 4 above CTA.
TYPE: `In-play delay applies` ★ hb-micro 11/14.
COLOUR: --c-text-3 on --c-surface-1 — quiet honesty line, not a warning (no amber: it's routine,
amber is reserved for state interruptions).
BORDER: none.
MOTION: appears once with leg, no animation. RM: n/a.
THINKS: nothing — it's ambient disclosure / EXPECTS: live betting is honest about latency / WE
SHOW: the delay exists, printed / NEXT: CTA below it.
FAIL: pre-match leg → line absent entirely (delay doesn't apply — honesty is per-context).
A11Y: part of CTA `aria-description` so it's read before activation.
EVIDENCE: pending build. CHALLENGE: pending critic — one line of honesty vs one more row of
density; kept, it prevents a class of disputes (70§5).

### E-32 · CO eligibility badge · STATE: offered / not-offered(absent→labeled)
WHERE: selection card, right of price; also pre-placement on market cells (match-page card owner)
and My bets row.
WHY: U-05 eligibility marked pre-bet (bet365/FanDuel mark it in-slip); 70§3 "never offered" +
"CO disappears" pains → eligibility is a fact shown upfront, not discovered mid-cashout.
SIZE: `CO` chip 24×16; hit expands to 44 when tappable for info.
TYPE: hb-micro 11/14 caps `CO`.
COLOUR: --c-surface-3/--c-text-2 when offered on leg; on My bets row, offered = same chip + value;
not-offered rows show no chip — absence is itself labeled in expansion (E-26).
BORDER: r-sm 4; flat, no ring.
MOTION: none (a fact, not a prompt — no pulse, U-51 spirit). RM: n/a.
THINKS: "can I get out of this later" / EXPECTS: eligibility marked before I commit / WE SHOW: CO
chip on the leg / NEXT: nothing — it's a fact, not a control.
FAIL: eligibility revoked mid-slip → chip swaps to suspended-style marker, never silently gone.
A11Y: `aria-label="Cash out offered on this pick"`.
EVIDENCE: pending build. CHALLENGE: pending critic.

---

## Zone 4 — My bets (tabs, rows, cash-out instrument)

### E-20 · Open/Settled tabs + filters · STATES: open / settled / filtered
WHERE: sheet/panel: segmented row top of My bets body. 1440 page: `< My bets · 1 open · 7 settled`
header → segmented `Open (1)|Settled (7)` → chips `All time Today Last7 Last30 Custom` + `All
sports ▾` (W6-02/03/04 exact parity).
WHY: W6 parity + U-13 open/live/settled split; every rival's My Bets convention (A19.b); counts on
tabs (U-28).
SIZE: segmented h44, each ≥120; filter chips h36 hit44; dropdown h44.
TYPE: hb-body; counts hb-label Oxanium.
COLOUR: active --c-surface-3/--c-text; inactive --c-text-2; filter active --c-surface-3.
MOTION: segmented indicator slides 200 ms directional; chip select zero animation; RM cross-fade.
THINKS: "what's riding / what happened" / EXPECTS: two clean piles / WE SHOW: counted tabs +
time/sport filters / NEXT: a row — one tap.
FAIL: filter empties → `No open bets in this range` ★ + clear-filter chip (never silent-empty U-23).
A11Y: `tablist` + roving arrows; filter `role="toolbar"` chips `aria-pressed`; dropdown native
semantics.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-21 · Bet row — open · STATES: collapsed / expanded / updating
WHERE: rows under tabs; 1440 page = table cols `Placed | Bet | Odds | Stake | Returns | Result | ⌄`
(W6-05); sheet/panel = same data as stacked card (one component, two densities — U-40 one
encoding).
WHY: W6-05 parity incl. live `●52' 1–0` badges ON the row (the open bet is a live instrument,
F7 — running value visible); expand ⌄ owns the CO module (wireframe implies it, brief demands it).
SIZE: row h64 collapsed (card 96); expand ⌄ hit 44; col widths fixed (numbers never shift, P1).
TYPE: pick hb-h1; fixture hb-body-sec; numbers Oxanium hb-odds; badges hb-label.
COLOUR: row --c-surface-1 zebra none (one fill, rhythm not stripes, U-40); live minute --c-live
word+dot; result pill `Open` --c-surface-3/--c-text.
BORDER: 1 px hairline bottom; expansion opens as row extension, not a floating card.
MOTION: expand = height-animates inner 200 ms out-expo (outer keeps open width, Salaja collapse
law); live badges tick tint-only; zero enter-animation on updates (74 rule 7).
THINKS: "how's my bet doing" / EXPECTS: score + value at a glance / WE SHOW: live badges + returns
+ result pill / NEXT: the instrument — expand once, CO is there.
FAIL: match feed drops → badges freeze + frozen marker, never stale-live.
A11Y: row `role="row"`, expand `aria-expanded`/`aria-controls`; live region throttled on score.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-22 · Cash-out module — idle quote · STATE: offered, ticking
WHERE: inside row expansion, right block; sheet card = full-width module (bet365 puts it in the
open-bet card — convention kept, execution cleaner).
WHY: U-06 live quote; S7 spec; F13/F51 — availability inflates stakes → neutral presentation, NO
pulse, NO "act now" color: the quote informs, it never pushes (U-4 ethics line).
SIZE: CO button h48 full-module-width; value right-aligned Oxanium; `updates live` micro under.
TYPE: `Cash out 22.40 USDT` hb-body 600 label + Oxanium 700 value; micro hb-micro.
COLOUR: --c-cta fill? NO — CO is secondary money action: --c-surface-3 fill + --c-text, reserving
pale-cyan for the one primary per view (A9.d); value --c-text.
BORDER: r-md; module separated by hairline from bet facts.
MOTION: S7 — value NumberFlows on quote ticks, neutral tint, no pulse; button press 120 ms → opens
confirm inline (never dialog-on-dialog, U-44/72 rule 19).
THINKS: "what's it worth now" / EXPECTS: a real number, updated / WE SHOW: ticking quote + updates
live honesty line / NEXT: take it or part it — one tap each.
FAIL: quote stalls >5 s → `updates live` swaps to ★ `quote paused — reconnecting`, never shows a
stale number as live (P2).
A11Y: `aria-label="Cash out 22.40 USDT"`; value in `aria-live="off"` (throttled announce ≥5 s via
offscreen status — Marco's spam pain).
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-23 · Cash-out — changed reconfirm · STATE: moved while confirming
WHERE: same module; value cross-fades + `new amount` chip; confirm re-arms with the NEW number.
WHY: U-06 + P2: FanDuel's own rules warn requests die if odds move mid-processing — we show the
new amount and re-ask instead of failing or (worse) executing at an unseen price; S7 spec.
SIZE: chip h20 on value; confirm h48.
TYPE: `Offer moved to 21.10 — confirm new amount` hb-body; `Confirm 21.10 USDT` on button — the
button always carries the exact number being billed (fat-finger tripwire, same law as CTA).
COLOUR: chip --c-suspend text on surface (money-change = amber family, one encoding).
MOTION: value cross-fade 200 ms + chip 200 ms; re-confirm normal press.
THINKS: "it moved — what's the new deal" / EXPECTS: re-ask, not a silent swap / WE SHOW: old→new
+ confirm carrying the new figure / NEXT: confirm or dismiss — one tap each.
FAIL: moves twice → newest value wins (no queue); suspends mid-confirm → E-25 paused in same
module, confirm never half-fires.
A11Y: `role="alert"` once on change; confirm labeled with new value.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-24 · Partial cash-out control · STATES: 25 / 50 / 75 / custom
WHERE: second module in expansion, `Cash out part ▾`; opens percentage chips + math lines inline.
WHY: U-07 partial CO (bet365's slider convention — 70§3 names missing partial CO as an
industry gap; we ship the chips version, thumb-friendlier than a slider at 390, P5).
SIZE: chips h40 ×4 + custom numeric field h40 (same rules as E-10); confirm h48.
TYPE: `25% 50% 75% Custom`; math `You take 11.20 USDT · 10.00 stays at 1.80 → returns 18.00` ★
hb-body-sec, numbers Oxanium.
COLOUR: chips --c-surface-3; selected --c-cta/--c-cta-fg (the acting fill marks the chosen part —
encoding consistent with selected odds cells).
MOTION: math recomputes with NumberFlow; chips zero-animation (repeat).
THINKS: "bank some, ride some" / EXPECTS: the split spelled out before I commit / WE SHOW: take +
stays + new returns in one line / NEXT: confirm — one tap.
FAIL: custom >100% → clamp + `Two decimals max` rule inherited; partial leaves dust <min-stake →
hint `Remaining below min — takes all` ★ auto-suggests 100%.
A11Y: `radiogroup` chips; custom `inputmode=decimal`; math line `role="status"`.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-25 · Cash-out — paused · STATE: suspended under the quote
WHERE: same module — dims 60%, lock + reason chip; last quote shown dimmed labeled `last quote`.
WHY: U-08 never a dead button + S3 shutter; 70§3 is the #1 betrayal surface (bet365 freeze, Paddy
Power vanish, SportyBet ₦7 token-offer): we name the reason + show what it was + say it resumes.
Pausing is honest; vanishing is betrayal.
SIZE/TYPE: `Cash out paused — dangerous attack` + `last quote 22.40` ★ hb-body-sec.
COLOUR: --c-suspend chip; dimmed module.
MOTION: 0 ms same-frame dim (integrity); reopen 150 ms un-dim + quote re-ticks; moved quote →
E-23 reconfirm flow, never silent reprice.
THINKS: "again? why" / EXPECTS: reason + does it come back / WE SHOW: named suspension + resume
promise + last number / NEXT: wait — zero taps, or watch the row.
FAIL: paused through settle → row resolves normally; module history line `CO was paused during
suspension` ★ on the settled row (audit trail, U-14).
A11Y: `aria-disabled` + reason text; status announced once.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-26 · CO terminal states · STATES: done / not-offered
WHERE: done = row stays in Open showing `Cashed out 22.40 USDT · 10.00 riding at 1.80` ★ (partial)
or moves to Settled `Cashed out · 22.40 USDT` ★ (full); not-offered = expansion shows `No cash
out on this bet` ★ where the module would be.
WHY: U-13 audit trail + U-08 designed-not-absent; 70§6 bets vanishing from lists → our rows never
vanish, they change state.
SIZE: same row grid / module slot — terminal text occupies the module, never collapses layout.
TYPE: hb-body-sec 13/18, numerals Oxanium hb-odds-sm.
COLOUR: --c-text-2 on --c-surface-1 — terminal facts, flat; no success tint on a cash-out (it's a
settlement, not a win — U-54).
BORDER: row hairline unchanged; module keeps r-md outline.
MOTION: state transitions cross-fade 200 ms out-expo; none on render. RM: instant.
THINKS: "it's done — where's the record" / EXPECTS: outcome + remaining position / WE SHOW:
cashed amount + what still rides / NEXT: settled tab later — zero taps needed.
FAIL: partial-then-full CO → rows merge into one audit line, never duplicates (70§6 vanish-pain).
A11Y: plain text, row label updates; `role="status"` on transition.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-27 · Settled row — won / lost · STATES: terminal
WHERE: Settled tab rows, same columns; result cell = net figure + word + glyph.
WHY: U-13 honest P/L; U-54 quiet wins/factual losses (no LDW — BIT audit named "Won £0.10" as
harm pattern, we refuse); won shows NET not gross (the player already knows their stake).
SIZE: same row grid; result `▲ won` / `▼ lost` word-pill.
TYPE: `Settled · won 16.00 USDT` / `Settled · lost 10.00 USDT` hb-body-sec.
COLOUR: won --c-up + ▲ + word (triple-coded); lost --c-text-2 — NOT red-flashy: a factual loss,
red reserved for errors (U-54; red=system-fault encoding, one thesis).
MOTION: none — terminal rows static. RM: n/a.
THINKS: "what happened" / EXPECTS: a straight answer / WE SHOW: outcome + net + expand for audit
(ref, accepted odds, basis `Settles on the official result`, `Query this settlement` ★ U-14) /
NEXT: nothing pushed — NO re-bet bait on a loss row (U-52, A18.c).
FAIL: regrade → row updates with `Result corrected` ★ marker + history, never silently swapped
(70§5 clawback pain).
A11Y: outcome in row label; expand `aria-expanded`.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-28 · Void row · STATE: returned
WHERE: Settled tab, same grid; result `↺ void`.
WHY: U-13 void reasons + refund status; 70§5 "voided only when winning" suspicion → the reason +
returned amount are ON the row, plus basis + query affordance (U-14).
SIZE: same row grid as E-27; `↺ void` result pill min-w64 h24; query link h44 target.
TYPE: `Void — match abandoned · 5.00 USDT returned` hb-body-sec (COPY string slot-filled).
COLOUR: --c-text-2 + ↺ glyph — neutral, void is neither win nor loss.
BORDER: row hairline; pill --c-surface-3 fill r-sm.
MOTION/FAIL/A11Y: as E-27 — static terminal row, regrade marker rule identical, `aria-expanded`.
THINKS: "why was it killed, where's my stake" / EXPECTS: reason + refund / WE SHOW: both on the row
/ NEXT: expand for audit or query — one tap.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-29 · Empty + error states · STATES: empty-slip / no-open / no-settled / load-failed
WHERE: empty-slip = slip body center-left aligned (NOT centered-icon cliché — A5 fingerprint
refusal); no-open/no-settled = tab body; load-failed = tab body with cached rows kept.
WHY: P6 designed states; U-23 never silent-empty; COPY empty-slip string; dry voice = words only,
no mascot art on money surface.
SIZE: block inset 16, vertical center of body; retry action h44.
TYPE: `Your ticket is empty — tap a price to start` / `No open bets — your ticket lives on the
slip tab` ★ / `No settled bets yet` ★ / `Bets didn't load — retry` ★ hb-body --c-text-2; each with
one text action.
COLOUR: --c-text-2 on --c-surface-1; action --c-text underline.
BORDER: none (flat body); retry = text button.
MOTION: none. RM: n/a.
THINKS: "is anything here / did it break" / EXPECTS: a straight answer + a way on / WE SHOW: one
sentence + one action / NEXT: slip tab or board — one tap.
FAIL: load-fail with cached rows → error line above rows, rows stay interactive-read.
A11Y: `role="status"`; retry `role="button"`.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-30 · Skeleton · STATE: loading
WHERE: ticket zone loads legs-shaped and rows-shaped shimmer — exact geometry of final content.
WHY: U-42/U-57 optimistic-first; 74: skeleton matches target layout, opacity-only 1.2 s loop,
max 2 iterations then static; CLS≈0 on money paths (74 rule 9).
SIZE: placeholder blocks = leg card 96 + row h64 geometry; full zone width.
TYPE: none (bars, not faux text).
COLOUR: --c-surface-2 blocks on --c-surface-1.
BORDER: r-md matching real cards; no shadow.
MOTION: opacity shimmer only, 1.2 s, ≤2 loops then static hold. RM: static skeleton.
THINKS: "it's loading" / EXPECTS: content lands where the shapes are / WE SHOW: shaped hold ≤300 ms
delay first (U-42) / NEXT: real content swaps in-place.
FAIL: >3 s load → skeleton swaps to E-29 load-failed, never shimmer-forever.
A11Y: `aria-busy` on zone; swap announced `role="status"`.
EVIDENCE: pending build. CHALLENGE: pending critic.

### E-34 · Travel animations (S2 flight + U-36 indicator home) · STATES: add-flight / placed-travel
WHERE: add-flight = odds cell → pill/panel landing point (layoutId morph); placed-travel = receipt
→ My bets tab badge.
WHY: U-46 ONE signature move (Family/Karri); MENTAL-MAP rule 3 — objects travel, the journey IS
the mental model; U-36 result elements go home.
SIZE/DUR: 280 ms ease-standard flight, cell→chip scale; travel = small dot morph 250 ms to tab
badge + single pulse.
TYPE: carried content keeps source type (price = Oxanium).
COLOUR: traveling object keeps its source encoding (selected-cell pale-cyan → leg card).
BORDER: morph interpolates r-md→card radius; no shadow added mid-flight.
MOTION: S2 spec; ONLY on explicit add (not on ticks — 74); newest-state-wins mid-flight; RM:
count-pulse once / instant badge.
THINKS: "it went where my ticket is" — the flight teaches the map without a tutorial (A21) /
EXPECTS: pick lands in ticket / WE SHOW: it flying there / NEXT: stake — already under the thumb.
FAIL: interrupted flight resolves to added state (no orphaned chip); rapid adds → each flight
independent, no queue collapse.
A11Y: `aria-live` "Arsenal added to ticket" (motion never sole channel, HIG).
EVIDENCE: pending build. CHALLENGE: pending critic.
