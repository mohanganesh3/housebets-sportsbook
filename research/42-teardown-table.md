# 42 — Competitor teardown comparison table + derived asks

Date: 2026-11-09 (real `date`). Scope: public pages only — no login, no money,
no real accounts. Per-site detail: `research/teardown/{stake,shuffle,bet365,
fanduel,draftkings,housebets}.md`. Fetch status: **Shuffle 200 · Stake/bet365/
FanDuel/DraftKings hard-blocked · Housebets 403** (covered by repo captures +
Wayback 2025-11-08). Cells marked `?` = UNKNOWN (never fabricated).

## Feature × site matrix

| Feature (row) | Stake | Shuffle | bet365 | FanDuel | DraftKings | Housebets live (BETBY embed) | **Ours: how we beat it** |
|---|---|---|---|---|---|---|---|
| Home first viewport | League list + coupon, no promo carousel — restraint is identity | Promo carousel (~10 banners) owns the fold, tabs under it | Racing panel + Join banner; boosts; promos "largest in study" carousel | Popular bets + scrolling promos across top; SGP card + Parlay Hub | Brand tabs → book tabs → promo banners → featured games | BETBY `Popular/Live/Upcoming/Predictions` + sport chips + league cards | **Live-now strip + Your matches first, zero promo above sport.** Banner-blindness respected; every pixel of the fold is bettable content or personalization — instantly "ours" vs Shuffle/DK/FD |
| Home ordering & density | Tree → top sports → active & upcoming → A–Z; medium density | Tabs `Featured·Upcoming·Bet Live N·All Sports` + Trending cards w/ `+N` chips | Left menu 4-way split (Top Events/Popular/Freq Visited/Full List) = over-granular | Popular/Live/Upcoming tabs; live games pinned top | Popular leagues left; trending centre; filters everywhere | League-grouped 1x2 cards, flat hierarchy | Follows first → Live now → Starting soon → Top competitions → sports grid. `Live & Upcoming` segmented like their own wireframe; density medium-high, no dead hero |
| Live page | Live Events tab; per-row stream/stats/builder icons | Bet Live ~100 events; split-screen stream + pop-out | Deepest in-play book; virtual field anim; stream if funded | Live Now section; per-game Track Live expands in place | Live tab: league-grouped, period+score in place | `Bet Live` nav + live rows `29′ 1st half` | League-grouped live feed, filter chips sport+competition, `45+2′`-class honest clocks, goal-flash row state, and the **best empty→starting-soon handoff** of any entrant |
| League page | `Live & Upcoming · Outrights · All Soccer` | Via All Sports tree | Popular section + full list; coupons | League pages w/ tabs | League tabs incl. division jump-links | `?bt-path=/soccer-1` league view | Football page = their wireframe signatures kept: breadcrumb pills, `≡ Market:` selector rebinding row odds, `All competitions ▾`, follow stars on league+team |
| Match page | All markets + `Bet Builder` tab | Deep markets, SGM builder, "original bets" | Tabs `Popular·Asian Lines·Goals·Half·Corners·Shots`; ~212 mkts | Scoreboard → Track Live/Stats overlays → `SGP·Points·Threes·Rebs·Asts` | Tabs: game lines·props·halves·player props·SGP | `Go to All Markets` drill-down (unseen) | Scoreboard (score, clock, period) → sticky market tabs `Popular N … All markets N` (count on every tab, All last — their own wireframe order) → collapsible `+N ›` long tail. Tiebreaker surface: reason-tagged suspensions cascade visibly |
| Bet slip placement | Right rail; phone = `Bet Slip` bottom-bar tab | Right rail (desktop); persistent across casino↔sports | Right rail + promos; app icon top-right | Right rail; app = Fast Bet sheet on first selection | Right rail **scroll-following** | BETBY right column; no shell slip tab on phone | Right rail (1440) + **floating slip bar showing the pick** (390, their wireframe: `❶ Arsenal @ 1.30 ⌃`) → drag-to-dismiss sheet w/ slip/bets/chat tabs. Slip survives route changes |
| Slip behaviour | Single/Multi tabs; empty = msg + dead CTA; picks don't clear post-parlay (hated) | Quick-assembling, positions visible | Edit Bet (add/swap/remove unsettled); receipt + ref | "No surprises" rule; dual Wager/To Win inputs; trash per leg | "Shopping cart" model; **editable quick-stake presets**; drops selections at load (hated) | Quick chips 1/10/50/100 (50 hi) in their widget | Singles-only per brief; **selections never silently drop** (regression guard); per-leg `Accept 2.40` + `Accept all`; live return math; receipt w/ `HB-###` refs + struck old price; empty = popular picks, not a dead end |
| Odds-change display | On-slip change; cell tick subtle | **Persistent ▲▼ arrows on cells** (signature worth stealing) | Green-up/red-down flash on real deltas; struck-old→new in slip | Green ▲ / red ▼ on cells | Green ▲/red ▼; grey fade on lock | ? (no moving cell captured) | Direction-aware roll (old exits up, new enters up on drift) + colour + caret; **caret persists muted ~9 s** so "what just moved" is scannable — Shuffle's arrows, done semantically |
| Odds-change acceptance | 3-way (any/higher/none); removed "higher only" (hated); default = pop-up | ? (standard reprice) | Per-leg accept-or-remove in slip; global `Allow odds & line changes` toggle in Preferences | One binary `Always accept odds movement` on the slip | Rule: odds vary pre-acceptance; toggle location undocumented | ? | **3-mode preference + per-leg accept in-slip**, `Odds changed` leg state blocks Place bet until resolved. Beats FD's binary (no "better only" path) and DK's hidden gear — visible, honest, demo-able |
| Suspension / locked | Freeze on key moments; aggressive mid-rally (tennis complaints); no reason | Pauses on key moments, more on low tiers | **Symbol replaces odds, same frame, instant** — gold standard | Brief pause during repricing; CO suspends too | Lines grey/fade; CO suspends too | ? (BETBY greys; not captured) | **Same-frame dead state + reason tag** `SUSPENDED · Goal/VAR/Break` — nobody shows *why*; row-level amber band on lists (their wireframe), per-cell locks on match page; reopen = repriced ticks |
| Live score + clock | Score+clock per row; stream icons | Score + LIVE chip + stat icons in cards | Game clock in markup; virtual field; 600k streams | Scoreboard w/ fouls/TOs, swipe quarters; Track Live court | Period+score update in place | `29′ 1st half · 43′ 3rd quarter · Second break` | Clock formats per sport (`45+2′`, `3rd quarter`, `Set 2`) + score roll-in animation + goal flash; **no fake trackers** (out of scope) — honesty reads as craft |
| Market tabs count | Fixture: Bet Builder + market list | `+N` count chips on cards (`+222`) | 6 soccer tabs + ~212 mkts; NBA 6 tabs | SGP + 4-5 prop tabs + X+ collapsibles | ~5 tabs per game page | 4 book-home tabs | `Popular·Goals·Halves·Handicaps·Goalscorers·Corners & cards·All markets` = 6+1, **count on each**, ≤7 visible + edge-fade scroll, `mine` tab when pinned — bet365 depth, scannable |
| Cash-out placement | My Bets only; no icon on rows (gap) | On the open bet; claims price-you-accept | **In-slip + on bet; full/partial slider/auto target** — richest | My Bets → green CO button → confirm; gray CO flag on slip pre-placement | Button beside bet in slip/My Bets; incl. parlays | ? (not captured) | CO value **on the open-bet card in My bets**, ticking live; confirm sheet repeats the number; `Cash out suspended` state w/ lock+reason — the six-state matrix, not one binary button |
| Cash-out states | Unavail: suspended/SGM/props-live/no coverage | ? | Available/partial/auto/suspended | Suspends around pitching changes etc.; Bonus-bet net-only | Broad availability incl. SGP; early CO on line moves | ? | All six states designed: available · value-changed · suspended(reason) · unavailable(reason) · partial-done · cashed — each with copy explaining *why*; nobody else shows reasons |
| My bets | Top tab; open + CO offers + settled; public All Bets feed | First-class nav item; internals ? | Bottom tab; mini score modules; Unsettled/Settled + bet refs | Bottom tab; active/settled; cards mirror slip; live trackers on bets | Top tab; cards + sort/filter; live/upcoming/settled | Sidebar item; internals login-gated | `N open · M settled` + Open/Settled segmented + time filters + `All sports ▾` (their widget's own table pattern, upgraded); live score chips `●52′ 1–0` + ticking CO on each open card |
| Search | Header bar; teams/comps | Top-left of hub; "fastest way" | Header icon; fast team/comp results; favourites surfaced | Team-picker search in DS | Exists; player/team pages keep users in-app | Shell `Search` button (site-level) | **⌘K/pill search: teams · players · competitions · markets** w/ recents + follows ranked first + direct-to-`+N` market landing — deeper than any competitor's team-only search, per the brief |
| Empty states | Thin; slip = msg + dead CTA | ? (spinner `Loading` seen) | ? | States in their DS language | ? | `Back online` toast only | **Every empty has a direction**: empty slip → popular picks; empty live → next kickoffs w/ countdown pills; empty following → how to follow; empty search → suggestions; offline → `Back online`-class toast |
| Loading states | ? | Spinner-class `Loading` (seen live) | Fast rep; slip "processing" hang = top complaint | 200–500 ms documented motion | ? | ? | **Skeletons reusing real row markup** + one shared shimmer (1.4 s, staggered 60 ms, aria-busy); pending bet = "Placing in Xs" copy, never a dead spinner |
| Acceptance-delay honesty | 5–20 s dead delay = most-hated thing | Sub-second refresh claimed | Short delay, no countdown | Brief pause, no countdown | Delay; no countdown | ? | **Visible countdown on Place bet during live delay** ("Confirming… 4s") — turns the industry's most-hated dead wait into proof of fairness; nobody does this in a sportsbook |
| Promo/clutter level | LOW (restraint = identity) | **VERY HIGH** (carousel = fold) | MED-HIGH (largest promos + carousel) | **HIGH** (promos scroll top; rewards huge; 4 nav bars) | MED (carousel + scattered offers; 4-bar stack) | MED (Leaderboard ticker in chrome; Hot Combos/Outrights in feed) | **Zero promo modules in first viewport** — brief bans promos anyway, so restraint is free differentiation; Leaderboard ticker kept in shell chrome where it belongs |
| Signature/identity | Terminal-clean navy; bet-% indicator | Black+violet; ▲▼ arrows; count chips | Yellow-on-green cells; dense-plain | Blue DFS-bred; Fast Bet; SGP | Black+neon-green; pill cells | Cyan on near-black; prize ticker | Housebets tokens verbatim + **Oxanium odds** + pale-cyan `#c4f4f1` primary fills (their Register colour) + semantic motion — "feels like Housebets" is scored 15 pts |

## What bettors already know — conventions we MUST keep

From the six columns above: right-rail slip + phone bar→sheet · two-line odds
cell · `time|clock → teams → score → 1X2 → +N` row order · league-grouped
lists · green▲/red▼ on real deltas only · dead same-frame suspension ·
accept-or-remove on repriced legs · open/settled + CO on the bet card ·
quick-stake chips · live return math · `Live & Upcoming`-style segmenting ·
`+N` market counts. Violating any of these reads broken, not original.

## Where every competitor is beatable (cross-site gaps)

1. **Suspension reasons** — no site tells you *why* a market locked.
2. **Acceptance-delay countdown** — dead waits everywhere (Stake worst at 5–20 s).
3. **Empty/error states with direction** — universally lazy.
4. **Odds-accept middle path** — FD binary; DK undocumented; Stake removed
   "higher only"; only bet365 has full control but buried in Preferences.
5. **CO state honesty** — everyone shows a button that vanishes or dies;
   nobody explains (suspended · why · when it returns).
6. **Cash-out discoverability** — Stake has no on-row CO affordance at all.
7. **First-viewport promo-free** — only Stake restrains; it wins no craft
   points for it (nothing else designed either).
8. **Personalization ordering** — follows/favourites never reorder content
   (bet365 can't reorder home; FD "forceful" generic).

## DERIVED ASK PROPOSALS (for qc/ASKS.md — NOT written there; await owner)

Proposed as new R-B9 tasks (wave C). Each cites teardown evidence.

1. **Suspension reason vocabulary**: `SUSPENDED · Goal|VAR|Penalty|Break|Review`
   tags on row + cell, same frame — verify all five render at 390/1440.
   (beats every column; wireframe-consistent)
2. **Acceptance-delay countdown**: Place bet → `Confirming… Ns` ring/progress
   for live selections; cancel still possible mid-count; pre-match confirms
   instantly. Verify never exceeds ~6 s.
3. **Odds-accept 3-mode control**: slip settings `Accept: Any / Higher only /
   Always ask`, default Always ask; changed leg = struck old + `Accept 2.40`
   per leg + `Accept all`; Place disabled until resolved.
4. **Selection-never-drop guard**: slip selections persist across route
   changes, refresh (sessionStorage), and post-placement clears; regression
   test — DK/Stake's exact failure modes.
5. **Quick-stake chips = their own widget's 1/10/50/100 USDT, 50 pre-selected**;
   long-press/right-click chip → set custom preset (DK's one good idea,
   Housebets-flavoured).
6. **Empty-state suite**: empty slip → 3 popular picks; empty Live →
   `Next kickoffs` + countdown pills; empty Following → follow explainer +
   quick-follow suggestions; empty search → recent + trending; each w/ one
   primary CTA.
7. **Skeletons = real markup**: MatchRow/MarketGroup skeletons reuse row DOM +
   shared shimmer 1.4 s L→R, 60 ms stagger, `aria-busy`, off under
   reduced-motion — kill any spinner on coupon surfaces.
8. **Persistent direction carets**: post-flash muted ▲/▼ ~9 s on cells
   (Shuffle pattern, semantically extended); cell-level last-move tooltips
   `was 2.60 → 2.75` where cheap.
9. **Market tab counts + order**: `Popular N` first … `All markets N` LAST
   (wireframe verbatim); ≤7 tabs visible + edge-fade; `mine` tab appears only
   when pinned markets exist; count updates live.
10. **CO six-state card spec**: open-bet card shows ticking value; states
    `available/value-changed/suspended+reason/unavailable+reason/cashed`;
    confirm sheet restates amount; button copy = `Cash out · ₮14.32`.
11. **CO affordance on rows/cards**: open bets surfaced on the match page of
    the event (FD "My Action" pattern, scoped: `Your bet · CO ₮14.32` chip
    under scoreboard) — Stake shows nothing, free win.
12. **Payout-preview slip bar**: phone floating bar shows `pick · odds ·
    potential return` (FD mini-bar preview pattern) not just a count —
    their wireframe already shows the pick; extend it.
13. **Receipt as object**: placed bet → receipt card w/ `HB-###` ref, struck
    old→accepted price, CO ticker when live; `View in My bets` deep-link.
14. **Promo-free fold audit**: first viewport at 390 + 1440 contains zero
    non-betting promotional content; Leaderboard ticker stays in shell
    chrome only. Screenshot proof per page.
15. **Follows-first personalization**: followed teams/competitions surface as
    `Your matches · N` card on home + ranked first in search + `mine` tab on
    match page — the investment loop nobody ships.
16. **Search depth**: ⌘K palette returns teams·players·competitions·**markets**
    w/ type icons, recents, follows ranked first, `+N ›` deep-link to market
    group; keyboard-only completable.
17. **Live honesty pack**: `45+2′` stoppage format, `HT/ET/Break` states,
    goal → row flash + score roll + suspension cascade in one frame —
    verify no layout jump when countdown→LIVE flips.
18. **Accept-odds friction copy**: changed-leg copy = `2.60 → 2.75 · better
    price` / `· worse price` (direction honest, not just "odds changed") —
    nobody tells the bettor which way it moved for *them*.
19. **No-bet-slip-orphan on phone**: bottom bar keeps slip pill visible with
    count+pick at all scroll depths (DK scroll-follow concept, wireframe-faithful).
20. **My bets parity w/ widget, upgraded**: `N open · M settled`, segmented
    Open/Settled, time filters, `All sports ▾`, expandable rows w/ live-score
    chips — matches their own table spec (R18) while adding live CO values.
21. **Suspension cascade choreography**: goal event → score roll + row flash +
    affected markets lock w/ reason + reopen repriced — single deterministic
    sequence the judge can trigger twice and see the same honest timing.
22. **Trust microcopy pass**: settlement tooltip on market names (`Settles on
    90′ + stoppage`), suspension reasons, `Accepted at live odds` receipt
    line, `Back online` reconnect toast — Kalshi-style trust copy no
    sportsbook ships.

## Reuse ledger — what came from existing repo research

- research/06: industry convention table, slip conventions, CO six-state
  matrix, anti-patterns (Stake delay, DK slip-drop, promo-fold) — **sourced**
- research/17: per-book signatures (Betfair delay bar, Pinnacle max-stake,
  Kalshi rules block, theScore follow loop) — flagged M/H confidence there;
  Stake "no promo carousel" and Shuffle "persistent arrows" corroborated today
- research/29: motion semantics (honest flash, residue carets, skeleton spec,
  ≤200 ms transitions) — partially [obs]/[inf]; no new contradictions found
- research/16: review-mine complaints — corroborated: FD "forceful" + show-more
  pain (godfreygu users), DK busy/drops, Stake freeze/delay, Shuffle promo fold
- **Inference flags inherited**: Stake cell-tick visuals (UNKNOWN), Shuffle
  accept-changes UI (UNKNOWN), DK auto-accept control (UNDOCUMENTED), bet365
  green=shorten wording (one review, MEDIUM) — all marked UNKNOWN in teardowns.
