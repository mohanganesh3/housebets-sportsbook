# Copy Deck v2 — one voice, every string

Voice (from U2 brand forensics): terse, sentence-case, dry confidence. Old "patrons / global
pinnacle" register is dead. No exclamation marks in product UI. Errors = what happened + your
money is safe + one action. Numbers never decorated.

## Voice rules
- Sentence case everywhere ("Place bet", not "PLACE BET" / "Place Bet").
- Verbs do the work; labels ≤3 words on controls.
- Money strings are factual: "You get 23.00 USDT if this wins." never "Win big!".
- Suspension reasons are specific: "Suspended — dangerous attack" not "Unavailable".
- Honesty phrases: "Odds changed while you were deciding", "Sample data — nothing here is real".

## Core strings (binding draft)

| Context | String |
|---|---|
| Slip CTA idle | Place bet · {stake} USDT |
| Returns row | Returns {return} USDT · implied {pct}% |
| Odds changed | Odds moved {old} → {new} while you were deciding |
| Accept better default | Accept better prices only |
| Suspended market | Suspended — {reason} |
| Suspended leg | This pick is suspended — {reason} |
| Place pending | Confirming… (≤3s honest pending, then result) |
| Place failed | Not placed — {reason}. Your balance is untouched. |
| Receipt | Bet placed · ref {id} · {odds} accepted |
| Cash-out idle | Cash out {value} USDT |
| CO changed | Offer moved to {value} — confirm new amount |
| CO unavailable | Cash out paused — {reason} |
| Void | Void — {reason} · {stake} USDT returned |
| Settled won | Settled · won {net} USDT |
| Settled lost | Settled · lost {stake} USDT |
| Nothing live | Nothing in play right now — starting soon below |
| Empty slip | Your ticket is empty — tap a price to start |
| Break active | On a break · back {time} |
| Offline | You're offline — prices are frozen, not live |
| Stake > balance | More than your balance ({balance} USDT) |
| Deposit | Add funds (demo) |
| 18+/RG strip | 18+ · Play responsibly · Take a break |

Extend per screen inside each storyboard; every new string follows the rules or gets challenged.
