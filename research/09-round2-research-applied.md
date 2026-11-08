# Round 2 — Research Applied (8-agent synthesis → shipped changes)

Seven research threads reported; each produced concrete shipped changes. This file is the
audit trail: what was found, what it changed, and where.

## Agent findings → shipped changes

### Crest system (agent: forensic crest grammar)
- **Found:** recognition = color pairing + field division + one signature charge +
  monogram — not layout. Flat fills, no gradients (can't be embroidered; read "AI").
  Detail tiers S/M/L (14px strips to silhouette+primary). Silhouette variety is the
  biggest recognition vector. FM-style "initials-on-shape" is the pattern to escape.
- **Shipped:** `src/lib/crests.ts` grammar — 5 silhouette paths (heater, continental,
  roundel, ellipse, octagon), 11 field ops (paly, perPale, perFess, sash, chief,
  pale, cross, canton…), 18 hand-drawn charge paths (cannon, gull, trident,
  cockerel-on-ball, lozenge field…), per-team spec table for all 25 teams keyed to
  real club identity (Arsenal red+cannon+navy chief; Madrid white+purple sash+gold
  crown; Juve perPale B/W + J + 3 stars; Barça composite canton+stripes+ball).
  `Crest.tsx` renders with useId clipPaths, S/M/L detail tiers, stars, EST years,
  keylines. All `TeamLogo` call sites (17) unchanged — initials-gradient discs deleted.

### Anti-slop / AI-fingerprint (agent: fingerprint forensics)
- **Found:** 67% of Show-HN sites carry fingerprints; the tell is *unchosen defaults
  arriving together*. Kills: indigo→violet, Inter-everything, uniform radius,
  card-soup, fade-up-everything, initials-in-gradient-disc avatars, colored glows,
  grain-free flat fields, generic copy. Antidotes: biased neutrals, one accent,
  radius hierarchy, tabular numerals, semantic motion, grain, domain-bespoke icons.
- **Shipped/verified:** surfaces already teal-biased (`#0B1920` family — Housebets'
  own base); cyan = the one accent spent only on interactive/brand; green/red =
  semantic tick only; gold/amber = follows + suspension + prizes only; Oxanium for
  every numeral (signature texture); crests replace generic avatar discs; `Grain`
  (feTurbulence) on the hero; radius hierarchy (10px cells / 12-16px cards / full
  pills); motion is semantic (odds direction, suspend cascade, badge pop) — no
  decorative fades; 1/X/2 labels on every compact cell so no bare price floats.

### Bettor research — Reddit + reviews (2 agents)
- **Found:** persistent slip = #1 conversion lever (Quacca 38→63%); quick-stake
  chips → two-tap placement; "accept higher only" removal caused Stake riots;
  favorites/followed-teams is the top feature wish (Hard Rock "For You", theScore
  auto-surface, bet365 can't even reorder homepage); named failure states; receipt
  anatomy; bettors trust states not badges; clutter complaints = personalization
  complaints.
- **Shipped:**
  - `/following` route — the "For You" hub: live-first followed matches, upcoming
    with kickoff times ("the reminder" the user described), team chips, league
    chips, counts. Follows persist in localStorage. Rail + mobile nav items with
    gold count badges. "Your follows" strip on Home when follows exist. Team
    FollowStars on the match scoreboard.
  - Slip: quick-stake chips (5/10/25/MAX) per leg → two-tap placement; **odds
    moves preference** segmented control (Ask / Higher only / Any) — the exact
    3-mode industry standard (DK/Sportradar) Stake users rioted to restore;
    suspended legs now **disable the CTA honestly** ("1 suspended — remove it or
    wait for markets") instead of the old lying copy that promised skipping but
    failed everything; placed receipt lists every leg with `HB-###` bet refs +
    payout; failure copy segmented by cause (suspended-mid-place / network /
    odds-moved), always closes "nothing was placed / balance unchanged";
    "Confirming at live odds…" pending copy for live bets (~2.4s, honest
    acceptance delay) vs fast pre-match confirm; house-glyph empty state —
    "The house is patient."

### Elite mechanics (agent: in-play mechanics spec)
- **Found:** goal → suspend-ALL → reprice → reopen is the trader sequence;
  cash-out locks in lockstep with market suspension (~80% of CO-unavailable);
  suspension reasons are a differentiator no book shows; honest CTA bug.
- **Shipped:** engine goal event now: score+flash → 600ms → all open markets
  suspend ("Goal" reason) → 8s → h2h repriced toward scoring side (home shortens
  ~28%, draw lengthens ~15%, other ~40%) → markets reopen; `suspendCashout`/
  `resumeCashout` wired into every market suspend/resume. `SUSPENDED · Goal`
  reason pills on market headers. GOAL banner with scorer name + minute under
  the scoreboard (7s). UKGC-style disclaimer: "Live scores may be delayed —
  markets can suspend at any time."

### Housebets DNA (agent: brand + company forensics)
- **Found:** base `#0B1920` (we match); gold `#FEB705` reserved for
  rewards/follows/prizes — never nav CTAs (we comply: gold = follows, warnings,
  stars only); white/pale-cyan CTAs; "the house" semantic family; Hubie mascot
  one-cameo rule; Oxanium-numerals signature; honesty-as-brand ("how we make
  money", RTP-on-hover transparency); restrained celebration (one-second glow,
  no confetti); segmented counts everywhere; aquatic "wave" promo language;
  roofline house glyph as motif system. Sportsbook is a BETBY white-label the
  contest exists to replace — native feel is the bar. Sports bets don't earn
  rakeback — do NOT graft Keys/rakeback UI onto the sportsbook (complied).
- **Shipped:** real extracted logo verbatim (`HousebetsLogo`); wave-motif
  `WaveArt` + roofline notch in the hero; `Grain`; house glyph on the empty
  slip with "the house is patient"; gold strictly for follows/suspension/prize
  affordances; market counts as chips (`+14 ›`, `14 markets`); "Match of the
  day" label; "Payout" (house-pays voice) instead of "Returns" on the slip.

## Still open (next passes)
- Sibling-event swipe carousel on match page; market-type favoriting ("My
  markets" pinned first); partial cash-out slider; custom sport glyphs to
  replace remaining lucide defaults; hero promo-art variants (illustrated
  campaign families); 45+2′ stoppage clock format; per-leg parlay status if
  multiples are ever added; deeper empty/skeleton state differentiation;
  live-bet ticker ("Live at the House" feed); code-splitting already partial
  (routes split) — main chunk still >500k (non-blocking).
