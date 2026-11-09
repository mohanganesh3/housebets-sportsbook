# MENTAL-MAP — one model, all surfaces

The player's map of the product must be identical in their head on phone and desktop:

```
 WHERE AM I        THE SPORT              MY STUFF
 (top / left)      (centre)               (right / bottom)

 top-bar / rail    content column          ticket + chat
 live badge, logo  scoreboard, boards      slip, my bets, session
```

## The five verbs (every screen serves these, in order)
1. **Scan** — is my match on? what moved? (boards, badges, countdowns)
2. **Read** — what are the prices? (odds cells, always tabular)
3. **Pick** — tap a price, it flies to the ticket (the product's one magic trick)
4. **Commit** — stake → place → receipt (the money beat, P2 territory)
5. **Watch** — my tickets vs the live match (My bets + match page live states)

## Spatial invariants (never break)
- Ticket is ALWAYS the same object: right rail on desktop, bottom bar→sheet on phone, /betslip page = same component wider. A pick made on phone geometry survives a resize to desktop.
- Live state ALWAYS reads the same: pink LIVE chip + clock + score, same order, every surface.
- A price cell looks identical in every context: match row, match page board, slip leg, my-bets recap. One component, four homes.
- "My" things group: Following·My bets·ticket — the right/bottom third of every layout.

## Familiar vs MORE (per surface)

| Surface | Familiar (law, don't reinvent) | MORE (where we beat everyone) |
|---|---|---|
| Shell | icon rail, centered prize, bottom bar labels | search with world-state results; session line in ticket |
| Boards | league headers, team rows, 1X2 cells, +N› | countdowns real; moved-price persistence; no promo |
| Odds cell | 3-up, selected=cyan+dark, checkmark | direction chip persists through rerender; roll |
| Slip | right rail / bottom sheet | per-leg consent; receipt proof; break-respecting CTA |
| My bets | Open/Settled tabs | cash-out reason+age; honest void/loss styling |
| Match | tabs over markets, scoreboard top | goal cascade choreography; market-context strip |
| Live | status-first list, red live | board dimming while editing ticket; lock bands |
| Footer/RG | links | session+net+break ONE glance line |

Rule: MORE never adds chrome to the familiar path — it lives inside the familiar shape (A13b).
