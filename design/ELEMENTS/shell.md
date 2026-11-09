# Element Cards — Shell (v1, pre-build spec)

Card fields per RESET §7. Tokens from design/TOKENS.md. All `text-2` contrast values verified at D0 token lock (PENDING-T6 cells marked †). Evidence fields fill post-build.

## E-SH-01 Top bar
ELEMENT: top-bar · STATE: default
WHERE: row 0, full width, h=60 desktop / ~56 phone; logo left, prize widget centered (desk), search+chat+balance+CTA right [P5]
WHY: P5 picture (top = where am I + money); live-site convention (B8 verbatim)
SIZE: h-60; inner padding space-4; hit targets ≥44
TYPE: logo wordmark asset; balance font-num 13 bold
COLOUR: bg surface-1; text text-1; balance text-1+usdt accent
MOTION: none (stable chrome)
PLAYER THINKS: "am I logged in / what's my balance"
EXPECTS: stable, instant
WE SHOW: balance live, DEMO badge honest
NEXT: search (1 tap) or Deposit (1 tap)
FAILURE: balance stale → derive from store, never hardcode
A11Y: banner role; balance aria-label "Demo balance 1,250 USDT"
CHALLENGE: does centered prize widget crowd phone? → phone drops widget to menu sheet (S2) ✓

## E-SH-02 Prize widget (Weekly race $50,025)
WHERE: top bar center, desktop only; phone → inside Menu sheet
WHY: brand-verbatim (B8); ambient identity, non-money
TYPE: label micro caps + value font-num 13
COLOUR: label text-2†, value text-1
MOTION: value ticks on real change only, 150ms ease-out, RM=instant
FAILURE: fake ticking → value from store only
A11Y: aria-live off (decorative cadence) — labeled text only

## E-SH-03 Search entry (pill + ⌘K)
WHERE: top bar right cluster (desk), full-width row on phone
WHY: P5; bettors search-first (T2 teardown convention)
SIZE: desk w≈280 h-36 r-3; phone full-bleed h-44
TYPE: placeholder body 13 text-2†; ⌘K chip micro
COLOUR: bg input-bg, border border-soft, focus border-accent
PLAYER THINKS: "find my team fast"
EXPECTS: instant palette, keyboard-first
WE SHOW: palette S3; results grouped, LIVE from world state
NEXT: Enter → match page (1 tap)
FAILURE: stale LIVE badge → derive from world store (fixed in baseline)
A11Y: role combobox+listbox; Esc closes; focus returns to trigger

## E-SH-04 Left icon rail (desktop)
WHERE: col 1 w=72, full height below top bar
WHY: live-site verbatim; sport-first IA [P4]
SIZE: icons 20 glyph set; badges micro; items h-44 min
COLOUR: inactive text-2†; active text-1 + accent-neon left edge bar
MOTION: active edge slides 150ms ease-out
A11Y: nav role, aria-current on active; icon+sr-label pairs (icons never alone)

## E-SH-05 Nav items (Home · Live● · Football · Following9 · My bets)
WHY: counts upfront (A37a); live badge = real count from world store
FAILURE: stale count → derive, never seed-static
A11Y: roving tabindex arrows (B-audit), labelled "Live, 6 matches"

## E-SH-06 Right panel — Bet slip | My bets | Chat tabs (desktop)
WHERE: col 3 w≈340, full height, tabs top
WHY: P4 right-rail convention; P5 "my ticket lives here"
SIZE: tabs segmented tab-bg h-36; badges micro
COLOUR: active tab surface-3 text-1; inactive text-2†
PLAYER: "my picks + my money live here, always one glance away"
NEXT: place bet ≤2 taps from any odds cell
FAILURE: count stale after settle → store-derived badge

## E-SH-07 Phone bottom bar (Menu · Sports · Casino · Chat)
WHERE: fixed bottom h=67 + safe-area env()
WHY: verbatim live convention; thumb zone (T4)
SIZE: 4 cells ≥44 touch; icons 20 + micro labels
A11Y: nav role, aria-current; labels always visible (not icon-only)

## E-SH-08 Phone slip bar
WHERE: fixed inset-x-3, bottom = bottombar-h + space-2, above tab bar
WHY: wireframe convention `❶ pick @odds ⌃` [P5]
SIZE: h-48 r-3; count badge; pick + odds font-num 13
COLOUR: surface-3 + border-strong; pick text-1; odds accent-neon
MOTION: press scale .97 80ms; count bump pulse 250ms ONCE on first selection (earned grab); sheet opens 240ms spring (interruptible). **Never re-animates on odds ticks — the Pays number updating is enough; a bouncing pill per tick is Times-Square motion (T4 §3.5)**
PLAYER: "my pick is alive, see it, open it"
FAILURE: pick lost on refresh → persist slip (X-pain #1)
A11Y: button role "Bet slip, 1 selection, Arsenal at 1.30, opens ticket"

## E-SH-09 Slip sheet (phone, from E-SH-08)
WHERE: bottom sheet, drag handle, scrim behind, ≤85% viewport
WHY: same ticket object as desk panel [P5]
MOTION: drag follows finger, velocity-aware dismiss (<threshold springs back), scrim fade 200ms, interruptible mid-drag; RM = instant open/close
FAILURE: tap-swallowed mid-gesture leaves slip firing → teardown on keyup/blur/tab-hide (judge's verbatim edge rule)
A11Y: dialog role, focus trap, Esc/scrim close, focus returns to bar

## E-SH-10 Menu sheet (phone)
WHERE: full sheet from bottom bar Menu; contains sport list + prize widget + support
NEXT: any section ≤2 taps (A20b)

## E-SH-11 Deposit button + dialog
WHERE: top bar right, pale-cyan CTA (desk); inside bar chip (phone)
COLOUR: cta-fill + cta-text (brand law — the only pale-cyan fill)
WE SHOW: dialog "Demo wallet · no real money moves" + chips +50..+2.5k → instant credit
A11Y: dialog role, Esc close (B04 ✓ verified)

## E-SH-12 Session line (in ticket)
WHERE: ticket footer, micro text: "Session 12 min · All-time net +42.55 USDT · Take a break"
WHY: P2 + ethics charter (time+cash paired — beats clock alone, T5 evidence)
COLOUR: text-2†; break link underline
FAILURE: never styled louder than Place bet (hierarchy law A7d)

## E-SH-13 Offline banner
WHERE: below top bar, full width, warn band
WHY: B03 honesty; visible system status
WE SHOW: "Offline — prices frozen. Bets can't be placed." + retry
A11Y: role=status aria-live polite

## E-SH-14 Balance chip
WHERE: top bar right (T prefix icon USDT-colour + amount + DEMO tag)
MOTION: balance change → number morph 200ms + soft success tint once (never on loss, silent decrement shown as plain text — losses respectful A13e)

## E-SH-15 Chat (icon + panel tab)
STATE: read-only demo — send affordance exists, replies "Chat is read-only in this demo" (honest, no fake conversation)

Cards complete: 15 elements × their states. Second-agent challenge: pending (A24b) — assign fresh critic before D1 build. Evidence: pending D1 shots.
