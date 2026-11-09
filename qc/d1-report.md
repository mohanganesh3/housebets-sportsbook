# D1 — App shell
Four-zone map on canonical tokens: bar / 72px rail / board / 360px ticket
(desk) · compact bar + sticky sport row + 67px six-slot nav + pill (phone).
Ticket internals untouched for D3.
## Touched
Shell.tsx rewrite — TopBar (logo · gold `Weekly Prize · $50,000.00`
display-only ticker · ₮ balance (polite live region)→desk popover /
phone wallet sheet · `Add funds` sole CTA (hidden on break) · search
field ⌘K ≥1440 / glyph <1440 · panel toggle · avatar menu · Log In/
Register pre-resolve); LeftRail (zones · neon 3px edge + s3 tile ·
live badge+pulse · Chat/Support/break); SportRow (44px roving tablist
+ edge fades); SidePanel (`Bet slip·n | My bets·n | Chat | ✕` + pinned
session line → RG sheet); BottomBar 6 slots; SlipPill canon payloads;
sheets; OfflineBanner. __root.tsx — skip → #board · DOM=focus order ·
rail/panel margins · connectivity→flag (2s)+`Back online` toast ·
`/`+⌘K · 600ms demo auth. ui.ts — panel/rail/signedIn/rg/support/
oddsAnim (+DOM flag); balance 240. bets.ts — HB-48213/214/215
(20@1.80 CO22.40 · 20@2.10 CO17.10 · 20@4.20 CO suspended).
SportGlyph +2 · SESSION_START exported · tokens/shell/index.css —
layout vars, desk bp, focus ring + on-CTA pair, skip, live pulse,
band/pill enters, indicator, fades, RM · match.css `*/` fix.

## Shots (qc/shots/d1-shell/)
1440-shell · 1440-live (rail active+badge) · 1440-panel-bets (tabs·3) ·
1024-overlay · 768-drawer / 768-board · 390/430-phone · 390-pill-picks
(`●1 Arsenal @1.44` cta) · 390-slip-sheet · 1440-offline · 1440-rtl.
## Gates
tsc · biome · build · check:tokens 0 new — all green. main=72→1080@1440;
@1024 rail-margin only + scrim. inert collapsed chrome · Esc→focus
return · aria-current · identical session line panel+sheet · pill hides
w/o payload · band docks under bar · reconnect toast · RTL mirrors.

## Deviations / leftovers
- Pill `●n` = item count (`●3` for 3 canon opens; spec `●1` predates
  the ledger) — grammar kept, count honest.
- `Bet slip` count omitted at 0. Legacy in-board sport nav duplicates
  `Sports` landmark — D2 demotes. `oddsAnim` flag set; consumers D2.
  Session net ≠ canon −12.00 (settled seed legacy; opens canon).
  Lucide stand-ins for art pass: Video/CircleDot/Cherry/Dices/Menu/
  MessageCircle/LifeBuoy/Pause. Chat read-only (honest toast).
