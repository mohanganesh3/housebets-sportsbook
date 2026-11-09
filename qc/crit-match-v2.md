# Challenge pass — Match page spec (20 pts + tiebreak)
Files under review: design/STORYBOARDS/match.md · design/ELEMENTS/match.md
Law checked against: PRINCIPLES · TOKENS · MOTION (S1–S8) · COPY · DECISIONS · MENTAL-MAP ·
qc/ASKS.md (spot-verified ids) · wireframes desk-match/phone-match (opened, not just INVENTORY) ·
design/ELEMENTS/slip.md (shared-element agreement) · research 70/71/72.
Contrast values measured (WCAG formula), not assumed — Mejba law.

## VERDICT

**SHIP-SHAPED with one blocker.** The spec is authored, not generated: failure modes are
exhaustive, citations resolve (T42-08/09/21, P51-11/16/20, P55-04/22, C-11/13, X07, U-45/56 —
all real ASKS rows), wireframe deltas are declared, EVIDENCE honestly pending. But the "pending
T6" contrast deferral is now settled arithmetic — and it fails on the signature element, for a
judge who is a certified a11y reviewer. Fix BLOCKER + 9 FIX before build; NITs at leisure.

## FINDINGS

### BLOCKER

**B1 — text-3 + amber + live assignments fail the spec's own ≥4.5:1 target (measured).**
- `ELEMENTS/match.md` E-M-08 ANATOMY+COLOUR (~L394, L402): implied % set at `hb-micro 11/14
  text-3` on surface-2 → **#5F7E84 on #0b414d = 2.56:1**. The P1 moat ("price is the product,
  implied % beside every price") is illegible — and C-13 itself says the 2.05–5.09 band "is not
  for state info". Same text-3-on-surface assignment repeats for tab counts (E-M-06), settle
  note (E-M-07), `PREMIER LEAGUE` (E-M-01), `Your bet` label (E-M-12), search placeholder.
  → Fix: promote all *informative* muted text to text-2 (measured 5.36 ✓); re-tier text-3 to
  genuinely-disabled/decorative only, or introduce a 4.5-passing dim step.
- E-M-09 COLOUR (~L506): suspended chip `--c-suspend #E17823` text on surface-2 → **3.68:1 FAIL**
  (spec itself guessed "may need darkening" — confirmed). Slip.md E-08's variant (white
  `--c-text` on amber fill) → **2.90:1 FAIL**. → Fix: chip = surface-2 fill + amber hairline +
  amber 🔒 glyph (3.68 ≥3:1 as non-text) + `--c-text` words. Keeps triple-channel, passes AA.
- E-M-03 COLOUR (~L137): `--c-live #FF4D6D` on surface-1 → **4.22:1 FAIL** for `LIVE`/`52′`
  (12px text); spec's "≥4.5 pending T6" guess is wrong. → Fix: lighter live step for text
  (≈#FF7A94-class); dot glyph alone already passes ≥3:1.

### FIX

**F1 — FT voids suspended markets (domain error on the terminal state).**
storyboard M-11 (~L224) + E-M-14: "suspended markets mark `Void — match ended · stake
returned`". A market suspended at FT still has a result — it *settles*; void is for
abandoned/unsettleable events. A sportsbook-designer judge will catch books voiding live
markets. → Fix: suspended-at-FT → settle by final score; `Void` only on feed-declared void.
Also restore COPY's `{stake} USDT` amount in the void string.

**F2 — The hero moment reprices into a worse book than the one it flags.**
M-08 Beat 3: 1.44/3.75/7.50 = **109.44% overround** — spec flags 107.7% as a band breach, then
ships 109.4% in its signature sequence (X07.S1 measures per market). → Fix: e.g.
1.44/4.00/8.00 = 106.94% (same directions, in-band).

**F3 — Cascade lock list omits goal-derived markets.**
M-08/E-M-10 lock "Match result, Next goal, Total goals, Correct score, Goalscorers" — but
Double chance is a pure 1X2 derivative and handicaps reprice on goals too. Leaving them open
mid-cascade shows stale arb prices beside the lock. → Fix: lock set = every score-derived
market (add Double chance + goal-linked handicap lines), or state the lock rule, not a list.

**F4 — `Pays 26.00` on the slip pill presumes a stake that doesn't exist.**
M-09 (~L190): pill `1 · Arsenal @ 1.30 · Pays 26.00` — 26.00 = 20×1.30, i.e. an implicit 20
USDT default stake, contradicting slip.md E-11's refused pre-highlight ("a default stake is a
bet the operator makes for you") + P2 + diverging from slip E-02's pill anatomy (no payout) +
inventing `Pays` vocabulary (COPY = `Returns`). → Fix: pill = W5-02 verbatim
`1 · Arsenal @ 1.30 ⌃`; payout only inside the slip once a stake exists.

**F5 — Offline banner contradicts slip E-16: one component, two grammars.**
M-14 (~L266): match offline band = text-2 on surface-2, "no amber" (channel = our failure).
slip.md E-16: same COPY string rendered `--c-suspend` edge + ⚠ ("interrupted service = amber,
one encoding"). 72-signal-1 (one encoding learned once) breaks across the two highest-scrutiny
pages. → Fix: unify — recommend shared amber-edged band on both surfaces while keeping match's
correct nuance that the *cells* stay un-ambered (band = integrity channel; cells ≠ market
suspension).

**F6 — Suspended chip exists in three different grammars across specs.**
E-M-09 (amber text + amber hairline on s2) vs E-M-09's own band variant (amber outline) vs
slip E-08 (amber fill + white text). E-M-09 even claims "defined here for consistency, A3.S3".
→ Fix: one chip spec (B1's fix), imported verbatim by slip.

**F7 — Pre-bet CO eligibility badge is an orphan between specs.**
slip.md E-32 (~L449): "pre-placement on market cells (match-page card owner)". match.md E-M-12
L670: "out of strip scope" — and no E-M-xx defines it. The feature ships nowhere. → Fix: add
`CO` chip anatomy to E-M-08 (or a one-line card) or strike the claim from slip.md.

**F8 — Break state is absent from the board.**
slip E-17 defines "On a break" (betting read-only) for the ticket zone; match spec's odds
cells have no break variant — taps during a break are undefined on the flagship page.
→ Fix: add a 14th cell state — read-only + `On a break · back {time}` context (COPY exists).

**F9 — Double chance prices unspecified; wireframe's own book is 212%.**
W4-09/24 shows 1.03/1.18/3.30 → 212.14% implied sum. Spec lists the accordion but no prices;
if builders copy verbatim, the realism moat fails visibly. → Fix: spec a book consistent with
the 1X2 (~1.10/1.28/3.20) and log it as a wireframe delta like Specials.

### NIT

- M-02: "84px of chrome" — pinned strip 44 + tab strip h44 = **88**. Arithmetic slip.
- M-01 deltas/E-M-01: `<`/`›` scoreboard steppers claimed as "kept" — wireframe shows only `<`,
  phone edge only, none on desk. An addition, not a keep; declare it in deltas (it's a fair
  "beat them" move).
- E-M-03: "wireframe shows pink text, no pill — parity" is wrong for phone: wireframe renders
  `● LIVE` in a dark-red pill with `52′` beside it (desk is pill-free). Fix the parity claim.
- E-M-07: "first two accordions expanded" vs desk wireframe's **three** open (Match result,
  Double chance, Total goals). Undeclared parity delta — either match it or log it.
- M-13: cites "names middle-truncate" (U-45/72-r21) then specifies *end*-ellipsis; wireframe
  end-truncates ("Hove…"). Keep the end-ellipsis (wireframe-true) — fix the citation.
- M-11 void copy `stake returned` drops COPY's `{stake} USDT` amount.
- Odds-cell matrix: 11/13 states fully specified (color+glyph+motion+aria). Residuals:
  reopened-reprice has no SR announcement for a *single-market* reopen; offline-frozen cells
  are "inert" with no aria semantic specified (aria-disabled vs skipped — pick one); the
  selected+suspended combo's aria-pressed + aria-disabled interplay is undefined.
- M-09 pill "slides up" vs slip E-02 "scale(0.95)→1" entrance — same element, different verbs.
- Cascade × S8 interaction unspecified: goal while a stake is pending — cascade should trump
  ambient muting; say so.
- Void cell = word-only on match vs `↺` pill in slip E-28 — acceptable at cell density; note.
- COPY's em-dash patterns vs 72-rule-24 "no em dashes" — COPY is binding; log the tension.
- `+N ›` on rows: spec uses `+78` vs wireframe's `+115` (wireframe itself contradicts its own
  `All markets 85`). Internal consistency wins — noted, no change.
- "Beats wireframe" on all 14 frames reads formulaic — keep it on the three real beats
  (S4, implied %, named-reason suspensions).

## THE THREE SELF-FLAGS — RESOLVED

1. **1X2 overround 107.7% vs 103–107% band → ADOPT the fix (Draw 4.80 = 106.85%).** The band is
   the spec's own auditable law (X07.S1); the wireframe price is sample data, and in-play
   prices move anyway — one tick of parity deviation is cheap. Best version: first paint
   wireframe-true (4.60·22%), then M-06's tick lands 4.80·21% — parity at rest, compliant at
   steady state; if the audit measures first paint, document "in-play books run ≤110".
   Whichever way, the implied % labels must update (22%→21%).
2. **Bet-strip vs search order → keep strip ABOVE search, as spec'd.** It's conditional
   (exists only with an open bet on this fixture), it's the player's money (P51-16 must-be-seen
   gets a real surface, not microcopy), and it's the FD "My Action" position — tabs keep their
   2nd-fixation job. E-M-12's CHALLENGE flag resolves: no change.
3. **Session-line placement → keep it OFF the match page.** Ambient session/RG belongs to
   money surfaces (slip footer + My bets footer, E-18); the desk panel is always mounted (MM
   rule 1) so the cue is present on this page already; on phone it's ≤2 taps via
   sheet/Menu. Dependency: verify the shell spec carries a phone RG entry — outside match
   scope.

## SPECIALS DROP — VERIFIED + VERDICT

Arithmetic confirmed against the actual desk-match.webp: tab counts are
10+9+11+11+8+5+14+10+**7** = **85** (`All markets 85` in W4-23). Drop Specials 7 →
10+9+11+11+8+5+14+10 = **78** — E-M-11's sum is exactly right, verifiable by a judge.
**Dropping wins, keeping loses.** Keeping the tab either ships verbatim-banned scope
("Outrights, specials" — brief out-of-scope list) or a dishonestly-filled tab; dropping with a
declared delta + honest recount is the P6-correct path and is already documented in the
storyboard deltas. Residual: nothing shipped may say `85` or `Specials` — grep at build.

## GENERATED-VS-AUTHORED

Authored: per-frame law citations that resolve, declared wireframe deltas, exhaustive failure
modes, DEFEND-IN-CRIT rationales, honest pending EVIDENCE, interrupt/RM twins everywhere.
Residual tells: the uniform "Beats wireframe" slogan; citation density occasionally outruns
the claim (P51-20 gloss "never a page-level confirmation" slightly over-reads the source, which
permits panel confirmation if loudest in-panel — the actual shipped design is compliant
either way).

## COVERAGE vs BRIEF

Suspended ✓ (M-07, named reason — nobody ships the reason) · changed ✓ (M-06 + slip E-06/07) ·
failed = slip's page, correctly absent here · FT/settled ✓ (M-11/E-M-14, minus F1) ·
odds-changed-on-open-ticket ✓ (CO moved → reconfirm; leg-level asks live in slip) ·
offline ✓ · skeleton ✓ · long-name/RTL ✓ · cascade correctness ✓ (S4 order/interrupt match
MOTION; F2/F3 fix the content) · a11y: strong architecture, undermined only by B1.
