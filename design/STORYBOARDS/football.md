# Storyboard — Football page (10 pts)

Frames 390 + 1440. Element cards: ELEMENTS/football.md. The discovery screen — browse depth, pre-match.

## §1 Structure
```
[1] Header: "Football" | view toggle: Today | Upcoming | Competitions
[2] Competition rail (top, authored tiles): crest + name + ★follow
    — the brand's showcase: Premier League, La Liga, Serie A…
[3] Time sections: Today · Tomorrow · Sat 15 Nov… (date headers, countdown)
[4] League groups → fixture rows:
    14:30 | [crest] Arsenal v Brighton | [1.80][3.60][4.20] +24›
    — pre-match rows show kickoff time (not clock); live rows inline with live grammar
[5] Followed competitions float to top (your football, sorted your way)
```

## §2 Behaviours
- Competition tile ★ → follows comp: its matches lift to Your matches on home + its section gold-rims here
- Date sections sticky within scroll — you always know which day you're browsing
- Mixed live+upcoming inside a league: live rows first, live grammar (score+clock), then upcoming
- Row → match page; cells → pick to ticket (same atom)
- Competitions view → grid of all comps w/ match counts + follow + table teaser? (scope check: standings out of scope unless wireframe shows — INVENTORY W3 says comps grid only ✓)

## §3 States
- Empty day section → skipped entirely (never show an empty date)
- No favourites → competition rail shows all comps equally, Your-matches hint copy once
- Followed league empty today → section still shows if it has upcoming matches

## §4 Elevation vs wireframe
1. Date-sectioned discovery — bettors think in matchdays, books show flat lists
2. Followed-first sorting — personalization as layout, not a settings page
3. Kickoff times human-format ("Today 14:30", "Sat 15 Nov") with real countdown on the day
4. Competition tiles = authored crests (our asset pipeline), not lettered squares

## §5 Failure modes
- Fixture postponed → honest "Postponed" status line, not vanished
- Comp with no fixtures → tile hides from rail (counts honest)
- Very long league list → collapse groups, "Show all N leagues ›"
