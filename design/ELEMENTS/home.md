# Element Cards — Home-specific (v1; shared board atoms in boards.md)

## E-HM-01 Matchday masthead frame
WHERE: page top, full-bleed h≈200 desk / ~160 phone; NOT a promo slot
SHOWS: featured fixture — crest pair + names (kinetic hb-display type) + comp + kickoff/LIVE
ART: Night Floodlights SVG per ILLUSTRATION-BRIEF (cyan light, navy field, grain ≤4%)
MOTION: ambient light sweep ≤8s loop pausable (M12); NO auto-advance; ‹ › dots manual
WHY: the silhouette-killer — illustrated fixtures, zero offers [P3/P4]
FAILURE: must read as CONTENT not banner (T4 §3.1: hero wins fixation #1 by position — the fight is making it not look like an ad: no glow frame, no button-y CTA, editorial composition)
A11Y: region labelled "Featured match"; controls buttoned; change announces politely

## E-HM-02 Favourites chips row
WHERE: under search; ★comp/team crest + name + ×
EMPTY: whole band omitted (never an empty band)
× → removes + undo toast (P2 — reversible)
ORDER: user's follows first; overflow › "Show all"

## E-HM-03 Your matches section
WHERE: above Live now when count>0 — personalization leads
ROW: match-row atom (boards E-BD-02) w/ live or upcoming status
SOURCE: followed comps + teams + explicitly followed fixtures
FAILURE: zero follows → hide band + empty-state hint once (not a dead section)

## E-HM-04 Starting soon countdown
Row atom w/ 🕐 status col: "Today 14:30" / "Starts in 42:16" ticking silently
<60s → "Starting now" → flips LIVE on world event (honest handoff, no fake suspense)

## E-HM-05 Top competitions grid
TILE: crest-40 + name + "N matches" + ★corner; authored tile (optional pitch-geometry bg)
GRID: 4-col desk / 2-col phone; tap → football page anchored to comp
WHY: comps are how bettors think (layer-cake headers carry scanning, T4)

## E-HM-06 No-live honest fallback
All boards quiet → "Nothing live right now" + Starting soon preview rows + › Football
WHY: dead fold = dead product; honest line + real next step [X05]
