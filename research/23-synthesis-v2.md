# 23 — Synthesis v2: ranked insight→change map (wave A + wave B)

12 research threads → ~240 raw tasks → deduplicated into `10-master-asks.md` §R.
This doc is the execution order, ranked by **(judge-visible × bettor-impact) ÷ effort**
with scorecard leverage noted. Convergence across threads marked •n.

## Design decisions locked by research

1. **Selected odds cell = solid fill + inverted text** — all 13 books do fill-flip;
   our spec-05 "border+glow only" was a deliberate deviation that costs Jakob
   familiarity AND brand fidelity. → pale-cyan `#c4f4f1` fill + `#041015` text
   + optional subtle edge. Fix focus-ring contrast in same pass. (B7/B8/B11)
2. **Primary CTA = pale-cyan `#c4f4f1` + `#041015` text** (hover `#82e0e0`) —
   verbatim Housebets. Neon `#02f8f8` returns to text/icon/border/glow only. (B8)
3. **Bell + star are two affordances** — star=memory, bell=alert; bells only on
   scheduled matches. (B12)
4. **Animation = data channel**: springs for user-moved things, easings for
   data-changed things, 0ms locks, never tween money, ≤4 concurrent flashes. (B10)
5. **Honest states are the brand**: Housebets' structural DNA (provably fair,
   fairness-RNG, self-exclusion links, "how we make money") means visible
   integrity IS "feels like Housebets", not a concession. (B8/B3)
6. **"Restyles that remove control read as hostile"** (Stake-2024 lesson) —
   the v2 rebuild must never remove an affordance users had. (B5)

## Execution order

### STEP 1 — P0 integrity bugs (judge-traps; every state is 10 scored pts + trust core)
§R.A1–A12: sticky selections · LDW lost-bet display · `cashedout` result type ·
CO confirm+honesty · reason propagation · fake-claim sweep · EmptyState icons ·
football favs predicate + liveCount · Returns/Payout swap · stake chips ·
kickoff engine · instant-CTA-disable. *(12 tasks — all shipped-code bugs or
wireframe mismatches found by code audit.)*

### STEP 2 — Brand fidelity (15 pts + tiebreaker)
§R.B1–B20: pale-cyan CTAs · TopBar+prize widget · icon rail · phone tab bar ·
real footer · chat panel · suspended band · tab order · slip-pill pick · home
additions · football signatures (Market rebind selector) · breadcrumb pills ·
MyBets table · voice pass · fill-flip.

### STEP 3 — Slip & placement (20 pts)
§R.C1–C14: countdown · remove-suspended · session+limits line · Returns/Profit ·
implied-probability · unusual-stake guard · min/max+funds · live balance ·
consent receipt · follow-offer · re-flag · keyboard · persistence.

### STEP 4 — Live & markets depth (20+10 pts)
§R.D1–D13: reason vocabulary · persistent arrows · real countdowns · stoppage
clock · sibling carousel · My-markets pinning · plain names+settles tooltips ·
disclaimers · context line · favor-framing · max-stake · alt-lines · pending ghost.

### STEP 5 — Favorites v2 (user's flagship idea + top industry wish)
§R.E1–E10: Map schema · selector · bell+countdown primitives · mobile star ·
hub v2 · search v2 · home strip · match-page bell · hints.

### STEP 6 — Motion & craft + a11y
§R.F1–F9 (MotionConfig, flash→overlay, fly-to-slip, accordion, sheet drag,
skeletons, hero pause, flash cap) + §R.G1–G10 (contrast, focus ring, hit areas,
aria-live, gold unify, mobile balance, skip link, rem, panel-w, 3-channel suspend).

### STEP 7 — RG maturity + social/content
§R.H1–H6 (reality-check, safer-gambling sheet, RG scenarios, copy audit,
submission list, connectivity toast) + §R.I1–I6 (house ticker, shareable receipt,
net P/L, quick-rebet, nav pinning, sport glyphs).

### STEP 8 — QC regime + deploy (phases 9-10, unchanged)

## What the visual rebuild actually is (scoping the "from scratch" directive)

The research says: mechanics/engine/stores are sound and research-validated —
they stay. The VISUAL LAYER is what reads "100% AI": neon-flood CTAs, flat
surfaces missing the real shell anatomy (prize widget, real tab bar, real footer),
generic sport icons, missing section backgrounds, spec-05's fill-flip deviation.
So the rebuild = **tokens→CTA system→shell chrome→footer→icons→hero/art→
motion tokens→page restyles**, executed through §R.B + §R.F + §R.G task lists,
verified against B9's slop-audit hit-list when it lands.

## The storyboard rule (SR7) as applied

For every §R task touching a control, the storyboard annotation is already in
the thread docs — e.g. "pale-cyan Place bet" exists because the real Register
button is pale-cyan (B8, judge-fidelity) AND because one filled-accent CTA per
view is Practical UI (B1); "session line under Place bet" exists because
money-proximate limits are GamCare guidance (B3) AND peak-end says the last
thing seen is remembered (B2). No orphan decisions.
