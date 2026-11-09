# D6 — Integration + QC gate sweep

All five units verified as one app at c7e81634 + one integration fix.
Playwright `/tmp/d6-verify/integration.mjs` (Chromium): **87/87 PASS** at
1440/390/360/430px. Dev server `localhost:5231`; deterministic state via
dev-only `window.__hb`.

## Gates

| Gate | Result |
|---|---|
| `npx tsc -b` | PASS · exit 0 |
| `npx biome check .` | PASS · 38 files, 0 errors |
| `npm run build` | PASS · 465ms · 20 routes + 404.html (15 match ids) |
| `npm run check:contrast` | PASS · 32/32 pairs |
| `npm run check:tokens` | PASS · 0 new; 98 known-legacy (not gated) |

## Integration (a–j) — all PASS

- **a** 2 legs on /football → desk panel; survive nav →/ →/live. 390 pill `●1 Arsenal @1.30` persists on both.
- **b** /match/ars-bha → `Arsenal · Match result · 1.30` · stake 10 → receipt `ref HB-90210 · 1.30 accepted` → Open (4) → 240 = 170 + 70; ₮240.00 top bar.
- **c** worse move → per-leg ask + `Odds changed — answer above` → `Moved … — accepted`; suspended leg lock+`dangerous attack`, `place()` gated.
- **d** HB-48213 `Cash out 22.40 USDT` on row → cashedout, 240→242.40 net; Settled note; Open 3→2. HB-48215 `paused — dangerous attack`.
- **e** dock "Go offline" → banner, inert cells (`aria-disabled`, tap adds nothing), clock held 55' ≥31s, `Frozen` captions, `Offline — can't place`; mid-flight loss → `Can't confirm` → reconcile `safe to place` → retry mints 1 bet, no debit.
- **f** Session line → Safer gambling → break: `On a break · back HH:MM` replaces CTA on desk panel + 390 sheet; `place()` store-gated; persists reload.
- **g** dev + prod bundle: / /live /football /bets /match/ars-bha /following → HTTP 200; `/nope` → branded 404 both.
- **h** scrollWidth = clientWidth @360 + @430, all 5 routes.
- **i** skip link first; cells+panel in DOM focus order (next Tab after board → aside); 0 ringless stops; Esc closes sheet.
- **j** `Bet placed…` via `aria-live=polite`; suspension via `role=status` chip + leg `aria-label="…suspended — dangerous attack"`.

## B01–B12 recheck — all PASS

- B01 FT grades by score (48213 won, 240→256 once, CO dead); suspended-market bet settles by score not void. B02 void `12.00 USDT returned`. B03 see (e). B04 deposit opens, Esc closes. B05 dock 12 states + clean reset. B06 `/`→type→Enter→/match/ars-bha. B07 dblclick→1 bet; idemKey dedupe. B08 99999→`funds` fail/no debit; `abc` never submits. B09 moved quote re-asks; single credit. B10 off-book same-again disabled w/ reason. B11 breakUntil blocks `place()` in store. B12 all links 200; net −12.00 identical panel/sheet//bets.

## Bug found + fixed (1)

- **Scrim swallowed the board at exactly 1440px** — `SidePanel` scrim `hidden lg:block desk:hidden`: custom `--breakpoint-desk` emits before `lg`, so at 1440 `lg:block` won → full-board scrim z-30 intercepted every board click behind the docked panel. Missed earlier: D3 drove stores, D24 `dispatchEvent` skips hit-testing. Fix `lg:max-desk:block` (one range rule) — `src/components/Shell.tsx:1159` (+5/−2). Re-verified 1280 scrim on, 1440/1920 cells clickable.

## Remaining risks

- `vite preview` can't serve the GH_PAGES build locally (base not stripped → asset 404s). Not a product bug — 7/7 asset refs resolve on disk for the deploy path; prod bundle verified via root-base build :5234.
- Slip-leg suspension announce rides the leg `aria-label`; board chip is the dedicated live node.

Shots: `qc/shots/d6-integration/` (24). No commits made.
