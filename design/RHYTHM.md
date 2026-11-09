# RHYTHM — the pacing map of a session

A betting session has a pulse. The design conducts it — never flat-loud, never silent.

## Attention budget per screen (max simultaneous "live" signals)
| screen | budget | what counts |
|---|---|---|
| Home | 3 | one live score flash · one countdown · one slip bump |
| Live | 4 (R-YAB-17 cap) | score rolls + move edges only — no banners |
| Match | 5 | cascade counts as ONE beat |
| Slip open | 1 | the ticket gets attention; board dims 40% |
| My bets | 2 | live ticket pulse + settle glow |

## The three tempi
1. **Ambient** (always): clocks tick, counts live — silent, no motion
2. **Signal** (per event): odds move, score change, lock — 150–250ms, interruptible
3. **Moment** (rare): goal cascade, receipt glow, FT settle — ≤2.5s, once

## The quiet rules
- Two Signal beats within 300ms on the same element merge — never queue flashes
- Nothing ambient may occupy a Moment's timing window (glow waits for cascade)
- The only sanctioned delay in the product: `Placing…` 600–900ms (R-YAB-11) — everything else is as fast as physics allows
- Motion density cap: >3 signals/sec product-wide = render as batched "3 markets moved" (prevents Christmas-tree boards on big matchdays)
- Loss moments are silent — no decrement animations, no colour drama; money leaves quietly, arrives briefly
