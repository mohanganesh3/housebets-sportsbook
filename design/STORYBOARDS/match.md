# Storyboard — Match page (20 pts — THE tie-break screen)

Frames 390 + 1440 + all live states. Element cards: ELEMENTS/match.md. This is where #1 vs #2 is decided: live state choreography + market depth, done calmly.

## §1 Anatomy
```
[1] Match header (persistent, sticky):
    ◂ Premier League · Matchday 12        ★ follow match
    [crest] Arsenal  1 – 0  [crest] Brighton
    🔴 LIVE · 67'   clock live | venue line
[2] Market-context strip (THE differentiator):
    Match result: 1.30 | X 5.25 | 2 9.00   ← sticky mini-board, always visible while scrolling markets
[3] Market tabs: Popular | All | Goals | Corners | Cards | Specials
[4] Market boards (grouped, hairline-separated):
    ▸ Match result  1X2 cells
    ▸ Both teams to score  Yes/No cells
    ▸ Total goals O/U lines (2.5 etc)
    ▸ Correct score grid (contextual cell grid)
    ▸ Cards/corners specials …
    each group: ▸ header + count, expand-collapse (keyboard-able)
[5] Ticket lives right (desk) / bottom (phone) — never leaves
```

## §2 The live choreography (signature beats)
**Goal beat** (the screen's big moment):
```
goal → 400ms: scoreboard digits roll, scorer side flashes team colour
  → all market cells lock simultaneously, amber band: "Suspended — reviewing after goal" 
  → 1.2s: bands lift bottom-up (domino, 80ms stagger), markets reprice with direction
  → ticket leg (if this match): moved-odds band if price changed
Whole beat ≤2.5s. RM: instant lock, instant price, no cascade. [P3: dramatic but honest, no fake suspense]
```
**Suspension beat** (VAR/red card/injury): same lock, reason chip specific: "Suspended — VAR review", persists until world store clears. [T10: unexplained suspension = trust killer; we always say why]

**Clock**: real minute, stoppage +N badge; FT → grey full-time state, boards swap to settled, ticket settles (B01).

## §3 States
- Pre-match: countdown "Starts in 42:16", boards open, no live chrome
- Live: everything above
- Suspended-all (world store): full-board lock, reason, countdown honest pause
- HT: "Half-time" status, boards mostly open, clock stopped
- FT: boards → settled view (winning cells marked), ticket settled link
- Deep-linkable: /match/$id every state [B12]

## §4 Market design (depth without overwhelm)
- "Popular" = default tab: 4-6 boards a real bettor checks (result, BTTS, O/U 2.5, anytime scorer-lite→first goalscorer, double chance, draw no bet)
- "All" = everything grouped; collapsed by default after first 3
- Cell density: 3-col 1X2, 2-col Yes/No, grid correct-score — same odds cell component, different layouts
- Market names PLAIN: "Both teams to score" not "BTTS" (A17e) — abbreviations only when universal (O/U w/ glossary dot)
- Long-tail (cards/corners): honest sample data, consistent odds cell

## §5 Interactions
- Tap price → pick flies to ticket (S2), cell marks selected ✓
- Tap selected → removes
- Follow ★ → match appears in Following + toast
- Market group ▸ → expand smooth, keyboard Enter/Space, aria-expanded
- Scroll: market-context strip stays pinned — the 1X2 is one thumb-tap away ALWAYS (nobody does this: you scroll into cards/corners and lose the headline)
- Swipe (phone, PENDING-T4): between tabs? — risky near horizontal markets; decide after T4 reach map

## §6 Elevation vs wireframe
1. Market-context strip — the headline price never scrolls away
2. Goal cascade with reasons — choreographed truth, not a flash
3. Popular/All split — depth served at two speeds
4. Sticky match header — crests+score never leave frame
5. Live clock with stoppage notation — honest time, not a spinner

## §7 Failure modes
- Feed gap (world store stale >Xs): "Prices paused — reconnecting" honesty band, cells last-known but dimmed+unplaceable
- Match suspended entirely → whole-board lock + reason + ticket legs flagged
- Deep-link to settled match → FT view, boards read-only, Same-again disabled w/ reason (B10)
- Ticket leg suspended mid-edit → leg flagged in ticket, CTA gate (E-SL-06)
