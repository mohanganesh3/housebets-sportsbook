# Storyboard — Sports home (15 pts, first impression)

Frames 390 + 1440. Element cards: ELEMENTS/home.md. First-5-seconds spec in §0.

## §0 The first 5 seconds (A15b)
Judge lands → sees: an illustrated matchday masthead (custom crowd art, not a promo banner), the Housebets wordmark, a live board already breathing. One line of copy: "The season starts here." **Not** a card grid, not a hero carousel of offers. The silhouette alone must not read "sportsbook template" [P4, A15].

## §1 Structure (both widths, same order — P5)

```
[1] Matchday masthead — featured fixture slideshow (CSS scroll-snap),
    illustrated art per fixture, kinetic team type. NO promo copy.
[2] Sport nav — Home active | Live•6 | Football | … (icon rail on desk /
    chip row or grid on phone — per T1 inventory W1)
[3] Search entry — pill input "Teams, players, competitions, markets… ⌘K"
[4] Favourites chips — ★ Premier League × · team crests · × remove (W1-0x)
[5] Your matches · N — followed fixtures first: status | crests+names |
    score/time | 3 odds cells | +N ›  (headed "Match result")
[6] Live now — league-grouped live rows w/ clock + score + 1X2 + +N
[7] Starting soon — upcoming rows w/ real countdown "Starts in 04:12"
[8] Top competitions — tile grid: crest + name + follow star
```

Desktop 1440: masthead + sport nav full-bleed; [5] and [6] in a 2-col band (matches+slip rail right); competitions grid uses remaining width — every band has a job [A23].
Phone 390: same stack, one column; slip bar floats above tab bar when a pick exists.

## §2 States

- **Empty favourites** → authored state: Hubie cameo + "Follow a competition to pin it here" + star demo [X05, P3]
- **No follows yet** → Your matches card hides, Live now leads (never an empty band)
- **Loading** → skeleton rows matching final geometry exactly [X04]
- **All sections** → header: label + count + › link (market counts upfront, A37a)

## §3 Interactions

- Masthead slide tap → that match page; auto-advance OFF (calm rule P3), manual controls only
- Favourite chip tap → competition page; × removes + toast undo [P2]
- Row tap → match page; odds cell tap → pick to slip (S2 flight) [P1]
- Star on any row/comp header → follow + gold, counts update live [A22]
- Search pill → ⌘K palette (S3 shell)

## §4 Elevation vs wireframe (A2)
1. Masthead = illustrated fixtures slideshow — template-killer #1
2. Favourites chips + Your matches = personal board from tap one (nobody ships personalization in prototypes)
3. Countdown on Starting soon = real time, honest
4. Counts on every section header — scannability = speed
5. Zero promo anywhere — the fold belongs to sport (T10 complaint #4)

## §5 Failure modes
- Featured fixture goes FT → masthead swaps to next featured, no hole
- No live matches → Live now collapses to honest line + Starting soon leads
- Very long competition names → ellipsis + full in follow sheet
