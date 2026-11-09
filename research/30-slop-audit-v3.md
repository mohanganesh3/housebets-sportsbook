# research/30-slop-audit-v3.md — C9 slop audit (screens + source)

Method: all 16 PNGs in qc/v2-audit/ + full source read. Round-1 pngs stale (pre round-2 fixes).

## Already killed (verified — don't re-report)
Initials-on-gradient logos → real heraldic crests (crests.ts: 5 silhouettes, field ops, charges, keylines, S/M/L tiers) · neon-cyan CTAs → pale-cyan btn-primary · labelled rail → icon-only · real wordmark, USDT chip, weekly-race pill, grain+WaveArt, tnum, Oxanium odds, green/pink tick channel, PRM.

## 🔴 Blocks-credibility
1. **Anonymous price cells** — every ≤3-outcome market renders bare numbers (`match.$matchId.tsx:98` `length>3` gate suppresses names). No real book does this. → `OddsCell` label prop; per-key maps (dc→1X/12/X2, btts→Yes/No, tg→O2.5/U2.5, ah→−1/+1, else o.name).
2. **Identical odds on every fixture** — seed hardcodes 1.85/3.60/4.40 etc. for all 13 matches. → strength map + seeded PRNG + derived markets. **[IN FLIGHT — the marketsFor rewrite]**
3. **Dead sport nav + wrong-sport icons** — Tennis/Basketball/etc pills all route to /football; `Dumbbell` for basketball, `Medal` for hockey. → trim to live sports or honest EmptyState; custom sport-glyph set (or installed-but-unused @tabler/icons-react).

## 🟡 Noticeable
4. League monograms slice(0,2) wrong: PR for Premier League, CH for UCL → explicit map {epl:PL, ucl:UCL, laliga:LAL, seriea:SA, bundes:BL, ligue1:L1, erediv:ERE, liga:LP}.
5. Mount fade-up `y:8` on static content still present (index.tsx:528, match:378, MyBets:47) — banned fingerprint from research/20. Delete.
6. Em-dash copy voice ~15 sites → `·` or split sentences.
7. Mobile topbar loses money chrome: balance `hidden sm:flex`, deposit → wallet icon, `w-full` search pushes right group off-canvas at 390px. → min-w-0 + shrink-0 + compact deposit. **[ITEM 6]**
8. Live minute invisible on mobile (`hidden sm:flex` status col) → compact `52′`/`HT` beside score.
9. Empty-state fragmentation: 4 patterns → one EmptyState, 3 art variants (house/radio/star).
10. ScenarioDock FAB overlaps content on mobile → reposition/gate.
11. Nav order differs rail vs bottombar → single shared array.
12. `★` literal in following.tsx:62 → `<Star>` component.
13. Grain/WaveArt only in hero; `id="gr"` not namespaced → shared component + useId, apply to all hero-grade surfaces.

## ⚪ Minor
14. Crest fallback still initials-disc → generic heater shield.
15. `toLocaleTimeString([])` locale-nondeterministic + wraps in w-16 → hour12:false / manual HH:MM, day chip >24h.
16. `transition-all` BetSlip:491 → scope.
17. `opacity-150` dead class, `#1a1505` off-token, fractional sizes → tokenize.
18. Chat usernames candy-rainbow → muted/deterministic hue.
19. Following badge warning-400 reads as alert → gold-500.
20. Heading semantics: home h1 mid-page; font-display inconsistent → one display h1/page.
21. Dead: SPORTS_NAV export, SkeletonRows, unused deps.
22. `Math.random()` in seed scorer prices → mulberry32. **[IN FLIGHT]**
23. Footer dead `<li>` text links → real or one line.
24. Weekly race static → tick or popover.
25. Hero control language mixed (dash dots + bordered squares) → harmonize.

## Derived tasks → checklist T1–T20 (as in report)

Stale-screenshot note: archive qc/v2-audit/r1 pngs; re-shoot home-m/d + match-* after current edits.
