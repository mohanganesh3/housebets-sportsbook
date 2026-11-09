# Data Canon — the ONE source of truth for sample numbers

Created post-crit (3 files contradicted each other — boards B1). Every spec/storyboard/card cites
THIS table; any new number is added here first. Rule: the number you see = the number billed.

## Account
- Balance total: **240.00 USDT** = 180.00 available + **60.00 in open bets**
- Session: **47 min** · net **−12.00 USDT**
- Break state (when active): **back 22:40**

## Bets (refs unique — never reuse)
- Open: **HB-48213** · Arsenal match result @ **1.80** · stake **20.00** · potential return **36.00** ·
  live cash-out quote **22.40** (ticks ±; a changed quote requires reconfirm)
- Open: **HB-48214** · Atlético–Sevilla BTTS Yes @ **2.10** · stake **20.00** · potential return **42.00** ·
  CO quote **17.10** (enumerates the in-bets ledger: 20+20+20 = 60.00)
- Open: **HB-48215** · Newcastle–Villa draw @ **4.20** · stake **20.00** · potential return **84.00** ·
  CO suspended (market suspended — dangerous attack; shows the paused-not-dead state)
- Placed receipt (demo flow): **HB-90210** · Arsenal @ **1.30** accepted · stake 10.00 · return 13.00
- Settled examples: HB-091 won +36.00 · HB-068 lost −10.00 · HB-104 void — abandoned 63' · 12.00 returned

## Fixtures
- Flagship: **Arsenal v Brighton — 1–0, 52' LIVE** (second half, PL)
  1X2 = **1.30 / 4.80 / 11.00** → overround 1/1.30+1/4.80+1/11.00 = **106.85%** (in 103–107% band; replaces 4.60 which broke the band)
- Law: every fixture's prices must price a real book in the 103–107% band — check arithmetic before adding; the match critic verified 4.80 resolves it.
- Market counts: match page groups sum to **78** ("All markets 78" — verified: 85 wireframe markets minus out-of-scope Specials group 7). Counts are arithmetic, not vibes.

## Pill payload (single spelling, used everywhere)
- With picks: `●{n} {pick} @{odds}` — e.g. `●1 Arsenal @1.30` (no stake presumed, no payout)
- No picks, open bet exists: `●{n} {team} · {score} · {min} · CO {quote}` — `●1 Arsenal · 1–0 · 52' · CO 22.40`
- NEVER a `Pays X` string before a stake exists (match-crit F4).

## One encoding (suspended/offline grammar — same on every surface)
- Suspended: padlock glyph + `Suspended — {reason}` chip (amber tint bg, dark fg) + last price at 60%
- Offline: `You're offline — prices are frozen, not live` + cloud-slash glyph (banner, not chip)
- Changed: amber edge + `moved {old} → {new}` — never the suspended padlock

## Consistency invariants (assert in tests)
1. Sum of balance parts = total shown in top bar, panel, and deposit sheet.
2. Session line identical in panel, slip sheet, and My bets header.
3. A bet ref identifies exactly one bet with one stake/odds/return.
4. CO quote identical wherever the same open bet renders.
5. Break end-time identical in pill, slip lock, and RG sheet.
