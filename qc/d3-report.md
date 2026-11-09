# D3 — Bet slip + My bets trust surface: verification report

Build unit D3 of the Housebets redesign. D1 owns shell chrome (panel tabs,
pill, sheets, break enforcement); D5 owns `OddsCell`. D3 filled the ticket
internals: slip leg anatomy, stake math, consent modes, idempotent placement,
the bets ledger, cash-out, break/offline surfaces, and the standalone
`/bets` page.

## Files (D3-owned changes)

| File | Lines | Owns |
|---|---|---|
| `src/components/BetSlip.tsx` | ~976 | Leg card, stakes, consent stack, CTA states, pending/receipt, break + offline bars, live region |
| `src/components/MyBets.tsx` | ~798 | Open/Settled tabs, filters, expandable rows, cash-out module (full/partial/paused/moved/done), dispute + same-again |
| `src/lib/store/slip.ts` | ~461 | Selections, consent-mode resolution, `place()` state machine, `unconfirmed` + `reconcile()`, undo-clear |
| `src/lib/store/bets.ts` | ~568 | Persisted ledger, `HB-90xxx` refs, idempotency dedupe, total-wallet credits, `sessionNet`, cash-out/settle |
| `src/lib/types.ts` | — | `SlipSelection.moved`, `SlipStatus` incl. `"unconfirmed"`, `Bet` cash-out + `idemKey` |
| `src/lib/store/ui.ts` | — | `oddsPref` default `"higher"` (D-03), `depositOpen`, break persistence, `0.00`-safe balance load |
| `src/components/Shell.tsx` | — | Pill flags (moved/susp/break/offline), deposit wiring, session line |
| `src/components/Overlays.tsx` | — | Ticket-adjacent overlay fixes |
| `src/routes/bets.tsx` | — | Standalone page retokened to canonical classes, shares D3 bodies |
| `src/main.tsx` | — | Dev-only `window.__hb` store handles for deterministic testing |

## Frame → implementation map

| Storyboard frame | Implementation | Verified |
|---|---|---|
| 0 Geography (one object, two postures) | `BetSlipBody`/`MyBetsBody` shared between desktop `aside` and 390 sheet (`Shell.tsx` ~1620); same `SessionLine` in both | shots 1440-01/390-01 |
| 1 Empty ticket | `Your ticket is empty — tap a price to start` + session line −12.00 | 1440-01 |
| 2 Tap odds adds | `toggle()` via `data-cell`; leg `role=group` aria = `pick at price, cash out offered` | 1440-02, e2e cell→leg |
| 3 Stakes + returns + implied% | 2dp-clamped input (displayed = billed), ≥16px, chips `1/10/50/100` SET semantics, `If it loses: −stake` | 1440-02/03 |
| 4 Odds changed while deciding | Worse move under `"higher"` → in-frame per-leg ask `Odds moved x→y while you were deciding` + CTA dim `Odds changed — answer above`; accepted → fact line `Moved … — accepted`; better move auto-accepts + announces; `"any"` auto-accepts all with announcement; `"ask"` asks every move (`resolveMove`, slip.ts:73) | 1440-06, pill flag 390-04 |
| 5 Suspended leg | Same-frame `This pick is suspended — {reason}`, CTA gated, remove path | 1440-07 |
| 6 Pending | Indeterminate `Confirming…` (~0.7–2.9s by pre-match/in-play), no fake spinner-of-shame copy | 1440-04 |
| 7 Receipt | `Bet placed · ref HB-90210 · 1.30 accepted · HH:MM:SS` + `View in My bets`; slip cleared | 1440-05, 390-03 |
| 8 Failure | `Can't confirm the placement — check My bets` + `Not found in My bets — safe to place again.` (unconfirmed → reconcile-before-retry, never "untouched") | 1440-09 |
| 9 My bets open tab | Honest count `Open (3)`; row = pick/match/live/odds/stake/returns + CO control on the row; expand = ref + placed context + settlement basis | 1440-11 |
| 10 CO moved → reconfirm | `Offer moved to {new} — confirm new amount` re-asks before banking | 1440-13 |
| 11 Partial cash-out | 25/50/75/custom; `You take X USDT · Y stays at odds → returns Z`; note `Cashed out X · Y riding` on the row | 1440-12 |
| 12 CO suspended | `Cash out paused — {reason}` + last quote kept | 1440-11/14 |
| 13 Settled rows | `Settled · won/lost/void` notes, void carries reason + returned stake; `Query this settlement` (demo-honest); `Same again` disabled with reason on off-book fixtures | 1440-15 |
| 14 Break active | Strip replaces CTA: `On a break · back {clock}`; legs read-only; cash-out still works; end-break behind confirm; pill flags it | 1440-10, 390-05 |
| 15 Offline ticket | `You're offline — prices are frozen, not live`; stakes read-only; CTA reason `Offline — can't place`; cloud-slash (not padlock) | 1440-08 |
| 16 Stake errors | `⚠ More than your balance ({avail} USDT) · Add funds (demo)` — shows real available, not total; `aria-label` on CTA names the cause | 1440-03 |
| 17 Phone bar→sheet | Pill shows open bets/pick count/state flags; sheet = same ticket bodies + session line | 390-01..05 |

## Money invariants (verified live)

- **Total-wallet model**: `balance` 240.00 stays 240.00 through placement — stake moves available→in-bets, no fake debit, no double debit.
- **Available** = balance − open stakes; the over-balance error quotes the *computed* available (211.20 after CO flows, not a stale 180).
- **Cash-out credit** = `paid − stakeRemoved` (partial: +1.20 on 11.20 paid/10 removed; full: exact net applied — verified `241.2→241.2` when quote equalled stake).
- **Partial CO** keeps an honest open remainder (`20→10`, note `10.00 riding at 1.80`).
- **Idempotency**: `pendingKey` held across a simulated lost response; `reconcile()` searches the ledger for that exact key before allowing retry; `addBets` dedupes by `idemKey`.
- **Receipts**: deterministic `HB-90xxx`, first minted = canonical `HB-90210`, sequence persisted + scanned on load.
- **Session net** = −12.00 from the seeded settled ledger, identical in panel, sheet, and `/bets`.

## Deviations / spec conflicts

1. **Table-density rows**: in the (non-canonical) dense table view the CO module still sits inside the expansion — a compact row cell can't honestly host the 3-state CO module. Card rows (the canonical open-bet row) carry the CO control on the row per E-21. Fixed mid-verify after the first run flagged it.
2. **Settled sort**: cash-outs settle `placedAt = now`, so a just-cashed bet tops Settled — spec doesn't order settled rows; chose recency.
3. **`build` vs `build:dev`**: verified `build:dev` (`tsc -b && vite build`); `npm run build` adds prerender + GH_PAGES, not needed for this surface.
4. Pre-existing worktree noise left untouched except two `biome format` fixes on `src/lib/scrollMemory.ts` + `src/routes/football.tsx` (format nits blocking `npm run check`; both were already modified/untracked before D3).

## Verification log

- `npx biome check .` → **0 errors**
- `npx tsc -b` → **exit 0**
- `npm run build:dev` → **✓ built in 464ms**
- `npm run check:tokens` → **PASS** (D3 files contribute only pre-listed known-legacy hits, e.g. `max-w-[860px]` in bets.tsx, `[--s-3]`-style allowed literals)
- `npm run check:contrast` → **32/32 pairs**
- Playwright (`/tmp/d3-verify/verify.mjs`, Chromium): **56/56 PASS** across 1440px + 390px — covers e2e cell→leg→stake→place→receipt, odds-change ask/accept, suspended leg, CO confirm/moved-reconfirm/partial/paused, lost-response→reconcile, break lock + end-break, over-balance, offline freeze, pill flags.
- Screenshots: 20 frames in `qc/shots/d3-slip/` (15×1440, 5×390).

## Environment notes

- Dev server on `localhost:5199`; verification drove state through dev-only `window.__hb` handles (deterministic odds moves/suspensions/offline instead of engine races).
- At 1440 CSS viewport the panel is overlay-posture (desk breakpoint sits at 1440 minus scrollbar width) — script closes it before board clicks, reopens for ticket assertions; first 3 `data-cell`s are desktop-only on mobile so the script targets `:visible` cells.
- No commits made.
