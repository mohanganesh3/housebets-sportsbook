# Crit — slip + my bets spec (pre-build challenge pass)

Spec: design/STORYBOARDS/slip-page.md + design/ELEMENTS/slip.md.
Law checked: PRINCIPLES P1–P6, TOKENS, MOTION S1–S8, COPY, DECISIONS, MENTAL-MAP, PERSONAS,
research/70, wireframes phone-slip / phone-slip-open / desk-slip / desk-mybets.
Contrast measured (sRGB): text-3/surface-3 = 2.09:1 · text-3/surface-1 = 3.10:1 ·
text-2/surface-3 = 4.38 · cta-fg/cta = 12.56. Overround on 1.30/4.60/11.00 = 107.75%.

## Verdict table

| # | Sev | Location | Problem | Required fix |
|---|---|---|---|---|
| 1 | BLOCKER | E-13b FAIL · E-16 · frames 6+8 | Offline/suspend mid-flight: request may have landed server-side, so `Your balance is untouched` can be a LIE, and `retry when back` can double-place — the worst version of the pending≠placed pain (70§1) | Idempotency key per placement + reconcile (ref/My-bets check) before any retry affordance; lost-response copy: `Can't confirm — check My bets before retrying` ★ |
| 2 | BLOCKER | E-13d · E-18 · E-33 · E-10 suffix | `--c-text-3` on dark surfaces = 2.09–3.10:1 measured: the disabled-CTA REASON (this component's entire job), the session/RG line and the in-play delay disclosure are illegible — "dim but legible" fails on its own terms for an a11y-judge | Content-bearing text → `--c-text-2` (4.38+); reserve text-3 for pure decoration; re-check at T6 |
| 3 | FIX | frame 6 · E-13b | "Thin top progress hairline, linear" over a ≤3 s timeout IS the fake determinate progress bar E-13b's own WHY bans | Indeterminate marquee or none; bounded-wait copy carries the honesty |
| 4 | FIX | E-10 · E-24 inherits | Stake numeral spec'd `hb-odds 15/20` while the same card cites "≥16 px input (iOS zoom law)" — 15 px triggers iOS focus-zoom | Input text ≥16 px (hb-h1 or 16 Oxanium); propagate to E-24 custom field |
| 5 | FIX | E-06/E-09 · frame 4 | `Any change` mode auto-accepts a WORSE move but only `better — accepted` copy/state exists — silent-on-bad-news = P2 hole in the mode that consents to it | Add `Moved 1.30 → 1.22 · worse — accepted` ★ announced state mirroring 4a |
| 6 | FIX | frame 3 · E-09 · E-33 | Mode-control placement contradicts itself: desk frame puts it BELOW the CTA, phone frame + E-09 card put it above; E-33's "directly above CTA" is false in both frames (balance/mode rows intervene) | One placement both sizes (above CTA, per E-09); fix E-33's adjacency claim or the frames |
| 7 | FIX | frames 7/9 · header data | Same ref `HB-48213` is the 1.30 receipt AND the 1.80 open bet; `in bets 60.00` contradicts `My bets 1` = one 20.00 open bet (P6 sample-data consistency) | Reconcile: in-bets 20.00 (or show 3 open bets); give the older bet its own ref |
| 8 | FIX | frame 4b · E-07 vs P3 | Amber edge-pulse ≤1 Hz on a money card — P3's own example bans "pulsing anywhere near money" | Amend P3 with an explicit awaiting-consent carve-out, or drop pulse (banner+edge already carry it) |
| 9 | FIX | E-10 · frame 16c | 6dp: field shows `10.554321` while "confirm uses 10.55" — the number seen ≠ number billed, violating E-23's own law; also collides with `paste normalized on blur` | Block >2dp at input, or visibly normalize the FIELD to 10.55 before arming CTA |
| 10 | FIX | frame 7 · E-14 | `Singles · N selection` places N bets (N refs) but the receipt shows one leg — multi-leg receipt undefined | Define aggregate receipt (`2 bets placed · total stake · refs`) or state one-placement-per-tap |
| 11 | FIX | E-03 | Non-modal `role="dialog"`: board under scrim not specified inert; entry focus unspecified — keyboard can tab the dimmed board, focus lands nowhere on open | Board `inert` while open; focus → sheet tablist on open, → pill on close |
| 12 | FIX | E-12 | Totals in `role="status"` announce on every NumberFlow tick → live-region spam (Marco's named pain, opposite of E-05's own ≥2 s throttle) | Announce on commit/blur or coalesce ≥2 s; keep visual tick silent |
| 13 | FIX | E-13d · frame 4b | Reason labels break COPY's ≤3-word control law: `Answer the odds change to place` = 6 words, `Enter a stake to place` = 5 | Amend COPY with a disabled-reason carve-out, or split: disabled `Place bet` + reason line beneath |
| 14 | FIX | E-04 | Chat tab fork left unresolved ("stub copy or ships cut") — stub = banned "coming soon" (A20.d), cut needs the A2.c written reason; also duplicates bottom-nav Chat | Decide in spec: authored stub (support/contact block) or cut with reason — not "unpriced" |
| 15 | FIX | E-08 | Literal `? No —` indecision inside a binding card + non-token `--c-suspend at surface-mix` (raw color-mix, A23.a tokens-only) | Resolve: define `--c-suspend-soft` token or `--c-suspend` fill + `--c-bg` text |
| 16 | FIX | E-23 · E-24 | Confirm-button fill unspecified; `Confirm 21.10/11.20 USDT` is each view's primary under one-primary law | Pin `--c-cta`/`--c-cta-fg` on CO confirms (see flag-3 answer) |
| 17 | FIX | edge states | `Brighton & Hove…bion` middle-truncate is garbled and deviates from the wireframe's `Brighton & Hove Al…` — reads generated | End-truncate `Brighton & Hove Al…` or proper `Brighton & H…Albion` |
| 18 | FIX | E-20 · frame 9 | `Custom` date-filter chip behavior undefined → dead-control risk on a wireframe element | Specify what Custom opens (date-range row/sheet) |
| 19 | NIT | E-02 · frames 2/17 | `▲` as pill expand chevron collides with ▲ = odds-up tick glyph (one-glyph-one-meaning, U-41); wireframe uses `^` | Use `^`/`⌃` for the chevron |
| 20 | NIT | E-12 · frames 3/9 vs COPY | Currency markers mixed: `₮` icon in totals, `USDT` in CTA/errors, Returns row drops the unit COPY requires | One convention: `20.00 USDT` text, or ₮ icon + never bare |
| 21 | NIT | E-01 · desk frame | Wireframe anchors the slip stack to panel BOTTOM; spec top-anchors + sticky footer — parity drop without the A2.c reason (palm-avatar promo slot also silently dropped) | Add written reason (top-anchor + sticky CTA reads as a dock, promo banned) |
| 22 | NIT | frames 9/11 · E-24 | `Cash out part` is an awkward noun ("Partial cash out" is the convention); phone row expander drawn as `Cash out ▾` conflates expander with the CO action — the expansion also holds the audit trail | Rename `Partial cash out`; expander = `⌄`, CO button inside expansion |
| 23 | NIT | E-04/E-14/E-13b | `Oxanium-ish`, `mono-ish`, `--c-surface-3 equivalent` — hedge words in a tokens-only spec | Pin the actual token values |
| 24 | NIT | header data vs P6 | Overround 107.75% exceeds P6's claimed 103–107% band (wireframe's numbers, but the spec asserts the band) | Relax the band or nudge a sample price |
| 25 | NIT | E-21 · E-02 · misc | `role="row"` on the stacked card without a table context; pill `role="button"` lacks `aria-haspopup="dialog"`; frame shows CO chip on open-bet pill that E-02's anatomy omits; retap-to-deselect of a selected odds cell unspecified; CO info-chip popover content unspecified; odds-ask pending while user is on the My bets tab has no tab-badge signal | One-line additions to the named cards |

## The three self-flagged weaknesses — answered

1. **Chips 1/10/50/100/Max vs 240 balance — KEEP.** They are Housebets' own widget
   denominations (judge recognition value, teardown §2); chips SET not ADD and nothing is
   pre-highlighted, so the stake-inflation dark pattern is already refused; per-balance disable
   covers >balance; `Max` = exact-fill 240. A 100 chip on a 240 balance looks pushy but it is
   THEIR chip set — respeccing to 5/25/75 buys nothing the field doesn't already do.
2. **Three consent modes vs two — KEEP 3.** research/70 derived-task #2 mandates the 3-mode
   preference persisted, and the documented pain is a two-state toggle that lies (Sportsbet.io).
   The real gap is not the count but finding #5: `Any change` needs the `worse — accepted`
   announced state. Fix that, keep the modes.
3. **CO `--c-surface-3` vs `--c-cta` — SPLIT.** Idle quote stays `--c-surface-3`: S7/F13 say a
   ticking money number must not wear act-now bait — the quote informs, it never pushes. But the
   CONFIRM buttons (E-23/E-24) are each the primary of their view and their fill is unspecified —
   pin `--c-cta` there (finding #16). Neutral quote, acting confirm: both laws satisfied.

## Verdict

**FIX-REQUIRED** — 2 BLOCKER · 16 FIX · 7 NIT.
Architecture is right (one ticket object, law-cited cards, wireframe parity mostly honored,
real a11y thought). No rethink needed — but two defects would build a dishonest or illegible
money surface, and a dozen smaller contradictions/missing states must close before D0.
