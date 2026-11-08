# B1 — UX canon I: usability/perception books → component rules (wave B)

Sources: Krug *Don't Make Me Think*, Norman *DOET*, Cooper *About Face*, Yablonski
*Laws of UX*, Weinschenk *100 Things*, Lidwell *Universal Principles*, Dannaway
*Practical UI*, *Refactoring UI*, Tufte *VDQI* + *Envisioning Information*, Saffer
*Microinteractions*, Wroblewski *Mobile First*. (web_search down — canonical recall.)

## The rules that decide our build

**Navigation/shell**
- Krug trunk test → active sport+league highlighted; page header matches clicked label
- Jakob → left tree / center events / right slip rail (desktop), bottom bar (mobile)
- Miller 7±2 (modern ~4 chunks) → cap visible nav items + market tabs, group the rest
- Lidwell serial position → Live + top-traffic sports first in the rail
- Wroblewski "one eyeball, one thumb" → ≤5 bottom-nav items, sticky slip pill above

**Lists/cards**
- Krug: design for scanning — one scannable structure per row (teams | time | odds)
- Tufte small multiples → identical row geometry everywhere so eyes compare prices, not layouts
- Refactoring UI: hierarchy via weight+muted color, not size; borders last resort on dark
- Tufte 1+1=3 → every separator added invents a visual element that must earn its place
- Von Restorff → max ONE special element per card; Highlighting dies past ~10% coverage
- Practical UI: 8pt spacing + ~6-step type scale as tokens, not ad-hoc

**Buttons/CTAs**
- Norman affordance/signifier → suspended must LOOK dead (muted+lock), not fail-on-tap
- One filled-accent CTA per view (Place bet); secondary ghost; destructive de-emphasized
- Hick → ≤3 primary market buttons/row; everything else behind "+N"
- Cooper excise → tap-add is instant+reversible; friction only at the money-commit step
- Fitts → generous hit areas; primary CTA adjacent to stake field, in thumb zone

**Forms**
- Postel → stake parses "5"/"$5"/"5.00"; search takes aliases+typos
- Practical UI: label above input (placeholder≠label); inline validation; never clear on error
- Saffer "don't start from zero"/"bring data forward" → live payout while typing, last stake remembered
- Specific human errors: "Minimum stake 1.00 USDT" never "Error 412"

**Odds grids**
- Tufte data-ink → zero decorative chrome in odds areas; hairlines only where grouping fails
- Tufte: show DATA variation, not design variation → only real deltas may move/color
- Right-aligned tabular numerals in fixed-width cells → ticks never shift geometry
- Natural mapping → 1/X/2 order; "O 2.5 · 1.90" shows line AND price
- ≤5 data groups/row; grouped accordions with counts on collapsed headers
- Doherty <400ms → flashes paint fast; 300–500ms flash band; ≤4 simultaneous flashes (peripheral detection = attention, must not become noise)

**Feedback/states**
- Saffer Trigger→Rules→Feedback→Loops spec per microinteraction; signature = odds-flash + add-to-slip
- Norman: assume errors → removable legs, editable stakes, undo over confirm
- Suspended renders muted+lock+"Suspended" in-place — never removed, never silently dead
- Empty states are CTAs (empty slip → browse live), never dead panels
- Zeigarnik → open bets are open loops; My Bets live tracker is high-value real estate

**Mobile**
- Transient posture → slip + scroll survive interruption/relaunch
- 44pt targets, center-tap accuracy; thumb-easy zone = bottom-center
- No hover on mobile → affordance must be visual; clipped content = scrollable cue

## Derived task highlights (§R.B1)

Nav cap + "you are here" system; 8pt/6-step tokens; borderless-elevation cards;
tabular fixed-width cells; 1/X/2 natural mapping; labeled accordions w/ counts;
≤3 cells/row + "+N"; one primary CTA rule; signature flash spec (300–500ms, real
deltas, ≤4 concurrent); optimistic add + undo; Postel stake input; specific errors;
skeletons not spinners; empty→CTA states; mobile thumb audit; pending-bets tracker;
dark palette HSL one-accent no-pure-black; excise sweep.

Confidence: solid on canon; thin spots flagged (100 MORE Things not attributed;
Gutenberg→CTA is inference). Re-verify lawsofux.com + nngroup.com when search returns.
