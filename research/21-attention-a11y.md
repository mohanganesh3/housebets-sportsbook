# B11 — Attention/perception/a11y + color psychology (wave B)

Sources: NN/g eye-tracking canon, Hoober thumb-zone (n=1,333), Labrecque & Milne
2012, WCAG 2.2, Material dark-theme spec, Wickens HMI color limits + direct code
audit. (web_search down — canonical knowledge; code findings HIGH confidence.)

## Attention zones → shell decisions

- F-pattern: ~79% scan; left stem carries identity (logo+rail correct); league
  headers get layer-cake fixation → **headers must carry name + count**.
- ~80% viewing time left half (LTR) → right third = ideal persistent-but-quiet
  utility (slip rail correct; keep it chrome-utility, never promo-like — banner
  blindness kills right-rail promo energy).
- Z-pattern terminus = top-right → money action (balance/deposit) sits where
  eyes end — currently correct but balance hidden on mobile = fix.
- Peripheral motion = luminance change detected pre-attentively → flashes work
  BECAUSE periphery catches them; cap ≤4 concurrent or it reports noise.
- First fixations: logo → nav → first content row; in-play strip outranks hero art
  → hero auto-rotate fights it (and violates WCAG 2.2.2 — needs pause).

## Thumb zones (Hoober)

49% one-handed (right thumb dominant) · 36% cradled · 15% two-handed.
Easy zone = bottom-center arc; primary action there (slip bar correct).
Targets ≥44px ergonomic floor — FAILS: compact OddsCell 40px, FollowStar 28px,
remove-X 24px, chips 24px, carousel arrows 28px. WCAG 2.5.8 floor 24px passes;
44px is the craft bar — pad hit areas without changing visuals.

## Color psychology by segment

- Labrecque & Milne: cyan sits on blue's trust axis but reads technical/novel —
  the "trading terminal, not bank" register. Unclaimed in crypto books.
- 18–35 crypto cohort: dark+saturated neon = native vernacular; tolerates higher
  saturation. Judges/older: keep text ≥450 weight, never <11px, no pure-white-on-
  black halation — mitigations already mostly in.
- Green▲/red▼: Western/crypto convention (keep); China inversion = footnote only.
- Gold vs amber COLLISION found: "Your follows" uses `fill-warning-400` (amber)
  while FollowStar uses `fill-gold-500` — unify to gold (same concept, two hues
  dilutes the code).
- Hue budget: cyan accent + green + red + amber + gold + USDT-teal ≈ ceiling
  (Wickens ~5-7 codes). Adding ANY new hue tips over.

## Dark-theme craft

- Near-black brand-tinted `#041015` correct (pure #000 = halation + no headroom).
- Elevation via lightness ladder ✓; shadows only for floating layers ✓.
- **FAIL: `text-tertiary #6b8894` on `#0e202a` ≈ 4.4:1 < AA 4.5** — used on every
  caption/timestamp → bump to ~`#7f99a4`.
- Skeleton shimmer off-palette `#14303c` → harmonize.
- Hairlines > shadows > zebra on dark (alternating bands fight the ladder).

## Numerals/typography

- Verify Oxanium actually has `tnum` feature — if absent the declaration no-ops
  (digits near-uniform by design so jitter likely minimal; test 1.11 vs 8.88).
- Bet refs are the ONE place 0/O ambiguity costs money → generate IDs without
  0/O/1/I chars (Oxanium has no slashed-zero).
- Oxanium ≥13px rule; `text-[Npx]` px units block OS text-scaling → rem tokens.

## Accessibility = visible craft

- **FAIL: cyan focus ring on selected cyan-fill cell ≈ 1:1** — focus invisible on
  the most-pressed control → dual ring (cyan + dark offset).
- Hero auto-rotate: needs pause control + focus/touch pause + PRM (2.2.2).
- aria-live strategy: NOT on ticking odds (spam) — YES on scoreboard score
  (role=status), SUSPENDED pill, slip failure (role=alert), Toaster aria-atomic.
- skip-to-content link missing; sport pills are Links inside role=tablist
  (semantic mismatch); market tabs claim role=tab without roving pattern.
- Balance hidden `sm:` at 390px violates "money facts always visible".
- CVD: slip changed-price is color-only → add ▲▼ there too.
- Selected-cell fill-flip caveat: on-brand (real site does it) but triggers the
  focus-ring bug — fix ring when we flip.

## Derived task highlights (§R.B11)

Hero pause control + PRM; dual focus ring; tertiary contrast fix; hit-area
expansion (44px); panel-w 344→360; aria-live strategy; ▲▼ in slip changed-price;
gold unification; mobile balance chip; counts on league headers; skip link; role
hygiene; rem migration; tnum verification; bet-ref charset; left-edge active
strip; RG microcopy footer; ≤4 flash cap; neon-budget audit; suspended-cell
3-channel honesty; CTA-hue fidelity decision (pale-cyan per B8); hairline
separators sanity.
