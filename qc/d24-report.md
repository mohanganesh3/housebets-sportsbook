# D2+D4 — Boards: Home (`/`), Live (`/live`), Football (`/football`)

## Files
- `src/components/MatchRow.tsx` — rebuilt as THE shared coupon grammar (one component, desk row `<lg` fold → phone coupon): clock column + crest/name lines (end-ellipsis, per-team ★) + `OddsCell` × N + amber `Suspended — {reason}` chip + `●n` open-bet mark + arithmetic-true `+{markets.length} ›`. Exports `LeagueGroup` (sticky head: comp mark + name · count + ★ + market label + `View all N ›`), `LeagueSection` alias (following.tsx unchanged), `groupByComp` (PL→followed→seed order), `CountdownChip` (role=timer: `<1h` `Kicks off in MM:SS`, `<24h` `Kicks off in HH:MM`, `≥24h` `Tomorrow HH:MM`/`Day, Mon DD · HH:MM`, 24h clock), `SuspChip`, `BetMark`, `RowRegion`, `BoardSkeleton` (exact geometry, `hb-sk` opacity-only ≤2 loops).
- `src/components/board-ui.tsx` — `ContentSearchBar` (field-styled button → opens SH-06 palette via the shell's own `/` key contract), `BoardHeader` (`‹` + title + meta), `BoardSessionLine` (canon string, opens RG), `FilterChip`, `BoardMenu`/`MenuOption`/`CheckOption` (popover: s2+hairline, Esc/outside close, focus return), `SegmentedTabs`, `EmptyModule` (type-led, phone-only house-glyph cameo), `SectionHead`, `TextLink`, `BreakBanner` (SH-11).
- `src/components/Hero.tsx` — `HeroSlider`: snap CSS only, ≤5 slides (live-first), desk ‹ › + `n / N` + button-dots (IO-driven), no autoplay/pause; slide = s1+hairline card: comp label + status CHIP (c-live fill) or countdown, crests 48 + hb-title names + hb-score, 1X2 `OddsCell`s + `View match ›`.
- `src/styles/board.css` — coupon hairlines (`hb-coupon`/`hb-row`), `.hb-grouphead` sticky (under bar+sportrow phone, bar desk), `hb-sk`, `hb-hero-rail/slide` snap, `hb-susp-band`, `hb-seg`, `hb-empty-in`, `hb-pop-in` — all vars, RM twins.
- `src/lib/scrollMemory.ts` — `useScrollMemory(path)`: sessionStorage `hb-scroll<path>` (chosen over a store field — survives reload, no new mutation); rAF-throttled saves; restore retries ~1s until document is tall enough (StrictMode cleanup-write bug found+fixed: unmount flush was overwriting the saved offset with 0).
- `src/routes/index.tsx` — HM-01..05: search → favourites chips (`★ x ×` / HM-03 empty + suggestion chips) → **LIVE strip before hero (D-16)** → slideshow → `Your matches` (follows, live-first, no finished) → `Starting soon` (countdowns, <24h) → `Top competitions` (5 canonical tiles, true live counts) → `Upcoming` groups.
- `src/routes/live.tsx` — LV-01..05: `‹ Live now · n in play` + delay note + session line; chips `All|Soccer|Tennis|Basketball|Baseball|Am. Football|Esports` w/ true counts (0 = `aria-disabled`, never hidden); comp single-select `▾`; LV-05 breadcrumb `Live › Soccer › {comp} · n` ×; LV-03 `Nothing in play right now — starting soon below` + filtered kickoff list + `View all starting soon ›`; `?sport=&comp=` in URL.
- `src/routes/football.tsx` — FB-01..05: `‹ Soccer ▾` (sport menu, non-soccer disabled at 0) + `5 competitions · n live`; desk `Market: Match result ▾`, phone `≡` (market+comp); `Live & Upcoming n | All Soccer n` segmented + `All competitions ▾` checklist; exactly five groups (epl/ucl/laliga/seriea/bundes, canonical order, stars on heads+teams); market rebind h2h/btts/tg25 same-geometry cells; FB-04 `No competitions selected` + `Select at least one ›` + `Reset filter`; `?market=&comp=&tab=` in URL.
- `src/lib/seed.ts` + `src/lib/store/world.ts` — `SEED_SUSP_REASONS` (`new-eve-h2h` dangerous attack, `atm-sev-h2h` re-pricing) fed into `suspReasons` init — every suspended surface names a reason (canon vocabulary); no action/mutation changes.

## Frames
HM-01..05 ✓ (strip-first order, snap hero, follows, countdowns, true counts) · LV-01..05 ✓ (counts, groups, susp reasons, LV-03 empty, URL) · FB-01..05 ✓ (5 groups, rebind, checklist, tabs, stars) · S4 cascade ✓ (pushEvent goal → locks → `1–1` → 1.44/4.00/8.00 on row) · skeleton=pendingComponent (real load moment only) · offline `Frozen` captions + break banner wired.

## Deviations
- `Live & Upcoming` window = 48h (24h empties UCL — five-group law kept; `All Soccer` = full scheduled+live book per spec "scheduled+live only").
- Desk `≡`/market menus are popovers (spec sheet grammar kept phone-simple); scroll restore documented above; SportRow persists on /live|/football phone (D1 shell, no-touch).
- Sub-hour countdown shows `MM:SS` (same NN:NN shape, honest granularity for imminent kickoffs).

## Evidence — `qc/shots/d24-boards/` (14)
390: home-top · home-sections · coupon · live · live-susp · live-empty · football · football-btts. 1440: home · live · football · football-btts · countdown · cascade.
Tour `qc/d24-tour.mjs`: **27/27 pass** — order, counts, susp reasons, LV-03 copy+list, 5 groups, rebind+URL, deselect-all, scroll restore (900px round-trip), desk anatomy, session line, cascade susp+`1–1`+reprice.

## Gates
`vite build` ✓ · `biome check src/` 37 files ✓ · `check:tokens` 0 new literals ✓ · `check:contrast` 32/32 ✓ · `tsc -b`: clean except `src/components/MyBets.tsx:243` — D3-owned uncommitted WIP (`"partial"` union gap), untouched per no-touch rule.
