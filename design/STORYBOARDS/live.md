# Storyboard — Live page (10 pts)

Frames 390 + 1440. Element cards: ELEMENTS/live.md. The pressure screen — everything moving, must feel calm.

## §1 Structure
```
[1] Page header: "Live" · N matches | sport filters: All | Football●N | Tennis N…
[2] Board-status line (honesty layer): "Live prices · updated 4s ago" 
    or warn "Prices paused — reconnecting"
[3] League groups (collapsible): header crest+name+count · rows beneath
[4] Live match row (THE unit):
    [crest] Arsenal      1   🔴67'      [1.30][5.25][9.00] +12›
    [crest] Brighton     0
    score column live-rolled · clock ticking · cells with move-edges
```

## §2 Behaviours
- Rows group by league, leagues sort: most live action first
- Score change → digit roll + team colour micro-flash; affected cells lock→reprice (mini goal cascade, no full band per row — P3 calm for lists)
- Clock column: real minutes, "+N" stoppage notation
- +N markets › → match page (deep link)
- Filter chips: segmented not pills (slop rule); sport filter keeps league groups
- While ticket open/editing → board update flashes dim ~40% (P3 budget: the money being edited wins attention)

## §3 States
- No live matches → honest state: "Nothing live right now" + Starting soon preview + › Football
- Reconnecting: banner + last-known cells dimmed, unplaceable (truth > activity)
- Suspended match inside list: row's cells lock amber inline, others stay live
- HT: clock shows "HT" — honest stopped clock

## §4 Elevation vs wireframe
1. Board-status line — books never tell you their feed is stale; ours does
2. Mini goal cascades (lock→reprice in row) — live that FEELS live without noise
3. Edit-mode dimming — attention budget is a designed behaviour, not an accident
4. Counts on filters — scannability law

## §5 Failure modes
- 20+ live matches → league groups collapse after first 3 groups; filter by sport
- Row moves out of view mid-cascade → no scroll-jank; cascade completes where it is
- Filter while suspended → suspended rows still show with lock (never vanish data)
