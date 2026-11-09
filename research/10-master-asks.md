# Master Ask Tree — source of truth (living checklist)

Every ask from the user's briefs, parsed line-by-line, expanded into the
execution tree. Mirrors the approved megaplan. Nothing is "done" unless
verified. Wave-B research threads append their derived tasks into §R.

Status: ✅ done · ◐ partial/re-audit · ⬜ open · ⏸ deferred (reason required)

## STANDING RULES (apply at all times)

- SR1 Before claiming any item done, re-read this list for regressions.
- SR2 Before every placement: what does the user expect here? what do they
  want next? why is this pixel here?
- SR3 Judge lens + bettor lens + operator lens on every decision.
- SR4 Frontend/UX thinking only — no backend thinking.
- SR5 Personal account (mohanganesh3) only. Never company identity.
- SR6 Recheck standard: every button/animation/interaction verified 10–20×
  across sessions; anything below bar → rejected → reworked.
- SR7 Storyboard before build — no pixel without a storyboard rationale.
- SR8 web_search was down during wave B — all threads compiled from canon +
  codebase audit + repo corpus; flagged items re-verify when search recovers.

## PHASE 0 — Prompt parsed

- 0.1 ✅ This file (committed checklist).
- 0.2 ✅ Prior parse `08-second-brief-asks.md` superseded by this tree.
- 0.3 ✅ Standing rules codified.

## PHASE 1 — Contest intelligence ✅

- 1.1–1.5 ✅ Captured, wireframes inventoried, scorecard mapped, brand kit
  reconstructed, scope locked.

## PHASE 2 — Research wave A ✅ (docs 03–09)

## PHASE 3 — Research wave B

| Thread | Status | Doc | Output |
|---|---|---|---|
| B1 UX canon I | ✅ | `11-ux-canon-1.md` | rule table + 25 tasks |
| B2 UX canon II | ✅ | `12-ux-canon-2.md` | ethics matrix + 24 tasks |
| B3 Gambling psych/RG | ✅ | `13-gambling-psych.md` | exploit/avoid matrix + 25 tasks |
| B4 Reddit mine | ✅ | `14-reddit-mine.md` | complaint clusters + 25 tasks |
| B5 Social mine | ✅ | `15-social-mine.md` | genre findings + 23 tasks |
| B6 Review mine | ✅ | `16-review-mine.md` | per-app digest + 24 tasks |
| B7 Competitor bench | ✅ | `17-competitor-deep.md` | 13-book matrix + 25 tasks |
| B8 Housebets DNA 2 | ✅ | `18-housebets-dna-2.md` | real-anatomy diff + 24 tasks |
| B9 Slop audit v2 | ⏳ running | `19-slop-audit-v2.md` | fingerprint hit-list |
| B10 Motion spec | ✅ | `20-motion-benchmark.md` | motion tokens + 23 tasks |
| B11 Attention/a11y | ✅ | `21-attention-a11y.md` | perception spec + 22 tasks |
| B12 Favorites deep | ✅ | `22-favorites-deep.md` | favorites v2 + 24 tasks |

## PHASE 4 — Synthesis

- 4.1 ⬜ `23-synthesis-v2.md` ranked insight→change map
- 4.2 ⬜ Design system spec v2
- 4.3 ⬜ Storyboards v2
- 4.4 ⬜ This file updated with sequenced tasks

## PHASE 7 — Visual rebuild v2

W1–W12 ⬜ (see plan; tasks now concretized by §R)

## PHASE 8 — Feature backlog

F1–F8 ⬜ + F9–F16 appended from §R below.

## PHASE 9 — QC · PHASE 10 — Deploy (unchanged)

---

## §R — Wave-B derived task master list (deduplicated across threads)

*Multi-thread convergence marked •n — convergence = validated priority.*
*P0 = integrity/judge-trap bugs · P1 = scored/fidelity surface · P2 = differentiator · P3 = polish*

### §R.A — INTEGRITY & BUGS (fix first — several are real shipped bugs)

- [ ] R.A1 P0•4 — **Sticky selections on "Keep betting"**: `BetSlip.tsx:308` resetStatus only; clear() selections on placed (B4/B5/B6 + Stake riot precedent).
- [ ] R.A2 P0•3 — **LDW bug**: lost bets show "Returned {potential}" `MyBets.tsx:47-55` → `Returned 0.00` + `Net −stake` (B3 table B1).
- [ ] R.A3 P0•3 — **`cashedout` result type**: `bets.ts:84` marks cash-outs `won` + green → distinct result, neutral color, `net +/−` (B3/B2/B6).
- [ ] R.A4 P0•3 — **CO confirm sheet + honesty**: one-tap money action → confirm w/ amount; below-stake shows `Cash out X · stake Y` neutral never green+ (B2/B6/B7).
- [ ] R.A5 P0•3 — **Suspension reason propagation**: `world.suspReasons` exists → slip leg `Selection suspended · {reason}` + CO lock `Cash out suspended · {reason}` (B3/B5/B7).
- [ ] R.A6 P0•2 — **Fake-claim copy sweep**: `MyBets.tsx:114` claims "Cash-out values update with live odds" — either wire ticking CO value (preferred, bet365 pattern) or kill the claim. Audit all copy for claims the demo can't keep (B6/B2).
- [ ] R.A7 P0•2 — **EmptyState icon bug**: all empties render Lock → icon prop (Clock/Star/House) (`primitives.tsx:176-179`, B2 task 11).
- [ ] R.A8 P0•2 — **Football favs-tab predicate**: `football.tsx:24` omits team-follows; `Shell.tsx:84` hardcoded liveCount=6 → shared selector + real counts (B12).
- [ ] R.A9 P0•2 — **Returns/Payout swap** to wireframe: per-leg `Returns`, footer `Payout ₮` (B8).
- [ ] R.A10 P0•2 — **Remove/replace MAX chip**: hardcodes 50 + "go big" label → plain ascending chips; wireframe convention = 1/10/50/100 w/ 50 highlighted (B2/B8).
- [ ] R.A11 P0•1 — **Engine scheduled→live transition**: kickoff event kind + countdowns that actually flip LIVE + reminder toast (B12).
- [ ] R.A12 P0•1 — **Duplicate-submit visual hardening**: CTA disables instantly on tap, not post-async (B6).

### §R.B — "FEELS LIKE HOUSEBETS" FIDELITY (15 pts + tiebreaker — B8's verbatim diff)

- [ ] R.B1 P1•2 — **Primary CTA repaint**: `#c4f4f1` fill + `#041015` text (hover `#82e0e0`) on Place bet/Accept/View match/etc. Neon cyan → text/icon/border/glow only. HIGHEST-LEVERAGE brand fix (B8/B11).
- [ ] R.B2 P1•1 — **TopBar → real anatomy**: menu-toggle, logo, **centered Leaderboard prize widget** ($50k/$100k), Rewards crown, Search+Chat icons, panel toggle, `Log In` dark + `Register` pale-cyan.
- [ ] R.B3 P1•1 — **LeftRail → icon-only 72px**: 3px cyan left-edge active bar, no bg pill, tooltips, support pinned bottom.
- [ ] R.B4 P1•1 — **Phone tab bar → real**: `Menu | Sports(active) | Casino | Chat | Support` palm-FAB style.
- [ ] R.B5 P1•2 — **Real footer**: 6-column groups + license line + GCB/GR/18+ + ©2026 (inert links) — nobody else will have it.
- [ ] R.B6 P1•1 — **Chat tab → canned community chat**: ~8 messages, crypto aliases, timestamps, level chips, quiet input; delete dead-end copy.
- [ ] R.B7 P1•2 — **Suspended list-row band**: whole odds area → full-width amber `🔒 Suspended` (wireframe) on list pages; per-cell locks stay match-page-only (B8 + states card).
- [ ] R.B8 P1•1 — **Market tabs order**: Popular first … `All markets · N` last, counts on all.
- [ ] R.B9 P1•1 — **Phone slip pill shows the pick**: `❶ Arsenal @ 1.30 ⌃` (wireframe), plus payout preview extension `· Pays 13.00` (B7 FanDuel).
- [ ] R.B10 P1•1 — **Home wireframe additions**: content search pill, Favourites removable chips (`★ Premier League ×`), "Your matches · N" headed `Match result` + `+N ›`, `Home` first pill, icon-grid sport nav on phone.
- [ ] R.B11 P1•1 — **Football wireframe signatures**: breadcrumb pills + `"5 competitions · 6 live"`; **`≡ Market: Match result ▾` selector that rebinds row odds**; `All competitions ▾`; segmented `Live & Upcoming n | All Soccer`.
- [ ] R.B12 P1•1 — **Match breadcrumb → ▾ pills** ending `ARS – BHA ▾`; `★ Following` chip + `☆ Follow` text button per wireframe.
- [ ] R.B13 P1•1 — **My bets → wireframe table**: `N open · M settled`, segmented tabs, time filters + `All sports ▾`, columns `Placed|Bet|Odds|Stake|Returns|Result|⌄` expandable w/ live chips.
- [ ] R.B14 P1•1 — **Voice pass**: sentence case, terse, NO exclamation, no emoji; fix "teeing up", chat dead-end, caps toasts; label audit vs verbatim list.
- [ ] R.B15 P1•1 — **Stake chips → 1/10/50/100** (50 highlighted).
- [ ] R.B16 P2•1 — Hubie one-cameo via house-glyph (mascot form unknown — house glyph is safe proxy).
- [ ] R.B17 P2•1 — Wave/roofline motif systemization ≤0.12 opacity; one motif family.
- [ ] R.B18 P1•1 — Banned-word sweep: boost/bonus/free bet/combo/parlay/multi nowhere.
- [ ] R.B19 P1•1 — Sport-nav pills verbatim: `Home | Live n(red dot) | Soccer | Tennis | Basketball | Baseball | American Football | Esports`; icon-grid on phone.
- [ ] R.B20 P1•1 — Selected-cell fill-flip decision: all 13 books do solid fill+inverted text vs our spec's border+glow → **switch to pale-cyan fill + dark text** (Jakob + real-site) and fix focus ring contrast in same pass (B7/B8/B11).

### §R.C — SLIP & PLACEMENT (20 pts)

- [ ] R.C1 P1•5 — **Visible acceptance countdown**: `Confirming at live odds… ~2s` determinate bar/ring + staged labels (B4/B5/B6/B7/B10 — the industry's most-hated dead delay converted to a feature).
- [ ] R.C2 P1•3 — **Suspended-leg "Remove" quick action** beside disabled CTA (B4/B5).
- [ ] R.C3 P1•3 — **Session line + net position + "Set limits"** in slip footer (B3/B4/B7 — RG maturity judges score).
- [ ] R.C4 P1•3 — **Returns+Profit disambiguation**: `Returns 21.00` + `Profit +11.00 (incl. 10.00 stake)`; slip math line `10.00 × 2.60 = 26.00 ≈ 38%` (B2/B7).
- [ ] R.C5 P1•2 — **Implied-probability affordance**: `2.00 ≈ 50%` on cell hover/long-press (B2/B3/B7).
- [ ] R.C6 P1•2 — **Unusual-stake guard**: confirm sheet when stake >25% balance (B2 "expect error").
- [ ] R.C7 P1•2 — **Min/max pre-entry hints** + insufficient-funds inline state (B3/B4/B6).
- [ ] R.C8 P1•2 — **Live balance model**: decrement on place + count anim + mobile-visible chip (B3/B11).
- [ ] R.C9 P2•2 — **Receipt records consent**: `2.10 → 2.30 accepted` lines when pref auto-accepted; share/copyable ref (B2/B6).
- [ ] R.C10 P2•1 — **Post-bet "Follow Arsenal?"** one-time offer in receipt (B2 Hooked-investment).
- [ ] R.C11 P2•1 — **Odds-moved re-flag**: on failReason odds-moved, leg shows amber+accept (B6).
- [ ] R.C12 P2•1 — **Keyboard-over-CTA** verify at 390; scrollIntoView on focus (B5/B6).
- [ ] R.C13 P3•1 — sessionStorage slip persistence (survives refresh; DK-slip-drop complaint) (B6).
- [ ] R.C14 P3•1 — "Lock it in" bettor-voice confirm microcopy option (B4 vocab).

### §R.D — LIVE & MARKETS (Match 20 + Live 10)

- [ ] R.D1 P1•4 — **Suspension-reason vocabulary** beyond Goal: VAR check, penalty awarded, red card, dangerous attack, injury break (B4/B5/B6/B7 — the differentiator nobody has).
- [ ] R.D2 P1•3 — **Persistent last-move arrows** ▲▼ stay on cells post-move (Shuffle signature, glanceability) (B5/B7).
- [ ] R.D3 P1•3 — **Real kickoff countdowns** `Starts in 04:12` → LIVE flip, no layout jump; goal-gradient <15min accent (B3/B6/B7/B12).
- [ ] R.D4 P1•3 — **45+2′ stoppage clock** format (B5/B6/B7).
- [ ] R.D5 P1•2 — **Sibling-match carousel** on match page (F1; bet365 iOS praised).
- [ ] R.D6 P1•2 — **"My markets" market-type pinning** (F2; nobody does it — "the book that remembers I only bet totals").
- [ ] R.D7 P1•2 — **Plain-language market names + "settles" rule tooltips** (Kalshi steal; jargon-wall fix) (B6/B7).
- [ ] R.D8 P2•2 — **Delay disclaimers** wherever live scores drive money decisions (live page header, CO rows) (B3/B4).
- [ ] R.D9 P2•2 — **Featured context line** ("Arsenal unbeaten in 9") on hero/featured (B7/B8 theScore-lite).
- [ ] R.D10 P2•1 — **"Price moved in your favor"** positive framing when drift up (B4).
- [ ] R.D11 P2•1 — **Max-stake transparency** "Max 500 USDT" on leg (Pinnacle steal) (B7).
- [ ] R.D12 P2•1 — **Alt-line discoverability** — ensure long-tail markets sit under labeled groups not hidden (B4/B6).
- [ ] R.D13 P3•1 — **Optimistic pending-bet ghost** in My bets during placing (B10).

### §R.E — FAVORITES V2 (B12 full spec)

- [ ] R.E1 P1 — **follows Map schema + reminders store** (`{kind,via?}`, hb-reminders, self-purge).
- [ ] R.E2 P1 — **shared isFollowed selector** rewiring hub/football/home (fixes predicate bug).
- [ ] R.E3 P1 — **RemindBell + CountdownChip primitives**; shared 1s ticker; <15min accent; LIVE flip.
- [ ] R.E4 P1 — **Mobile row star un-hidden** (`MatchRow.tsx:72`); mobile Following-tab gold badge.
- [ ] R.E5 P1 — **Hub v2**: live→upcoming(w/ countdowns)→chips→reminders strip; provenance captions; finished-prune; quick-pick empty state.
- [ ] R.E6 P1 — **Search v2** (F8): empty→follows+recent; ★ boost; direct-to-market; row stars.
- [ ] R.E7 P2 — **Home strip**: countdowns+bells+via captions; above-fold 390.
- [ ] R.E8 P2 — **Match page**: bell when scheduled + ticking countdown under kickoff.
- [ ] R.E9 P2 — one-time dismissible hint + primer toast (teach star+bell once).
- [ ] R.E10 P3 — title-countdown option; toast throttle 3/session.

### §R.F — MOTION & CRAFT (B10/B11)

- [ ] R.F1 P1 — **`<MotionConfig reducedMotion="user">`** wrap + `motion.ts` tokens; refactor ~65 literals.
- [ ] R.F2 P1 — **Flash→compositor overlay** (opacity ::after, kills per-frame paint in cascades); expire `flashes` ~1.2s; remove `layout` on OddsCell.
- [ ] R.F3 P1 — **Fly-to-slip** ghost 450ms arc → badge-pop (PRM: skip).
- [ ] R.F4 P1 — **Animated accordion** (replace `<details>`; height 0↔auto 280ms).
- [ ] R.F5 P1 — **Sheet drag-dismiss** + toast TTL 4s + static-check PRM on success-draw.
- [ ] R.F6 P2 — **Skeleton→content wiring** (dead `SkeletonRows`; opacity-only crossfade); optimistic pending ghost.
- [ ] R.F7 P1 — **Hero pause control + PRM off** (WCAG 2.2.2) + remove lone mount-fade `index.tsx:406`.
- [ ] R.F8 P1 — **≤4 concurrent flashes** cap in odds store (peripheral-noise rule).
- [ ] R.F9 P3 — route-transition decision documented (instant, deliberate).

### §R.G — PERCEPTION/A11Y (B11 concrete fails)

- [ ] R.G1 P1 — **`text-tertiary` contrast** `#6b8894`→`#7f99a4` (4.4→5.2:1); skeleton `#14303c`→palette.
- [ ] R.G2 P1 — **Dual focus ring** (cyan+dark offset) — invisible on cyan-selected cells today.
- [ ] R.G3 P1 — **Hit areas ≥44px**: OddsCell min-h-11, FollowStar 40px hit, remove-X 32, chips 28+, arrows 40 (padding, no visual change).
- [ ] R.G4 P1 — **aria-live strategy**: scoreboard `role=status`, SUSPENDED pill, slip-fail `role=alert`, Toaster atomic; odds ticking NOT live.
- [ ] R.G5 P1 — **Gold unification** `fill-warning-400`→`fill-gold-500` on follows; ▲▼ added to slip changed-price (CVD).
- [ ] R.G6 P1 — **Balance on mobile top bar** (money facts visible — RG+quality).
- [ ] R.G7 P1 — **Skip link + role hygiene** (pills aren't tablist; market tabs get roving or aria-current).
- [ ] R.G8 P2 — **rem migration** for text scaling; tnum verification on Oxanium (1.11 vs 8.88 jitter test); bet-ref charset avoids 0/O/1/I.
- [ ] R.G9 P2 — **panel-w 344→360** (spec band); left-edge active strip on rail (B11).
- [ ] R.G10 P2 — **Suspension 3-channel honesty**: aria-disabled + desaturate + SUSPENDED micro-label on cells.

### §R.H — RG MATURITY (B3 — casino-operator signals)

- [ ] R.H1 P1 — **Reality-check toast** (session timer + ScenarioDock trigger so judges can fire it).
- [ ] R.H2 P1 — **Safer-gambling sheet**: rail/footer entry ≤2 taps; Deposit/Loss/Time-out/Self-exclusion rows (demo).
- [ ] R.H3 P1 — **RG scenario states in demo dock** (judge-reachable: reality check, insufficient funds, limits).
- [ ] R.H4 P2 — **Copy audit**: ban "almost/so close/hurry/don't miss/cash out now"; settle notes factual.
- [ ] R.H5 P2 — **SUBMISSION.md dark-pattern list** ("what we deliberately didn't build": auto-accept, stake-inflation, fake urgency, sludge, LDW).
- [ ] R.H6 P3 — "Back online" connectivity toast (BETBY honest-infra steal).

### §R.I — CONTENT & SOCIAL (differentiators)

- [ ] R.I1 P2•2 — **"Live at the House" bet ticker** — REAL session data only (B2 fake-ticker ban + B7 BetRivers precedent).
- [ ] R.I2 P2 — **Shareable receipt** (copy ref / share card) — Twitter slip-culture.
- [ ] R.I3 P2 — **Net P/L + record in My Bets header** (`+34.50 · 6W-4L`) — spreadsheet-exodus fix.
- [ ] R.I4 P2 — **Quick-rebet** two-step (F7): "Bet it again" → slip pre-filled → explicit confirm — NEVER one-tap from a loss.
- [ ] R.I5 P3 — **"My sports" nav pinning/reorder** (bet365 can't reorder — personalization wedge).
- [ ] R.I6 P3 — **Sport-glyph custom icon set** replacing generic Lucide sports icons (W4 + B7).

### §R.J — NEW WORKSTREAMS FROM §R (added to Phases 7-8)

- F9 ⬜ Reminder/notification system (bell+countdown+toast+unseen-dot) — R.E3
- F10 ⬜ Live balance + insufficient-funds model — R.C8/C7
- F11 ⬜ Safer-gambling sheet + reality-check — R.H1/H2
- F12 ⬜ Community chat panel (canned) — R.B6
- F13 ⬜ Real footer — R.B5
- F14 ⬜ Prize widget in TopBar — R.B2
- F15 ⬜ "Live at the House" ticker — R.I1
- F16 ⬜ Wireframe-fidelity pass (Market selector, segmented controls, breadcrumb pills, MyBets table, suspended band) — R.B7–B13

### Verification queue (web_search was down — re-run when it recovers)

- V1 Stake/FanDuel/bet365 current UX specifics (per-app MEDIUM items in 16/17).
- V2 Trustpilot/Reddit verbatim quotes on Housebets + BETBY complaints (submission gold).
- V3 Hubie mascot actual appearance.
- V4 Law-citation spot-checks (lawsofux.com, nngroup.com, Scheibehenne, sludge=Final Ed.).
- V5 BetRivers CO label, Hard Rock Flex Parlay anatomy, ESPN BET accent/product names.
- V6 Oxanium `tnum` feature presence (font inspection).

---

## STATUS — implementation rounds 1–3 (2026-11-09, commits ff00fe68 → da59d1c5)

**DONE — verified at runtime + deployed:**
- §R.A (all 12) — sticky selections, LDW, cashedout type, CO confirm, reason propagation, ticking CO values, EmptyState icons, shared follow predicate + liveCount, Returns/Payout swap, chip row, kickoff flip, instant CTA disable.
- §R.B: B1 (pale-cyan CTAs), B2/B14 (prize widget), B3 (icon rail), B5 (real footer), B6 (canned chat), B8 (All-markets-last), B15 (chips), B20 (fill-flip adopted).
- §R.C: C2 (remove-suspended), C3◐ (session+net line + take-a-break toast; limits sheet still open), C4◐ (payout/profit/balance-after), C1◐ (progress bar; staged labels open), C5◐ (implied-% title attr).
- §R.D: D1 (reason vocab), D2 (9s arrows), D3 (kickoff transitions), D4 (stoppage 45+N′), D8 (tab counts), D7◐ (h2h settlement title).
- §R.E: E2–E4 (bell reminders + countdowns + mobile star), E6–E11 (badges, search ranking/recents/quick-picks/persistence/kickoff), E5◐ hub.
- §R.F: F1 (MotionConfig), F2 (flash expiry).
- §R.H: session line, take-a-break, CO honesty, no near-miss/dark patterns — mostly covered; H1/H2 (limits sheet, reality check) still open.
- §R.I: I1 (honest feed), I3 (net line), I4 (quick-rebet w/ reconfirm), I2◐ (copy-ref button).

**STILL OPEN — next pass:**
- §R.B: B7 (full suspended band on list rows), B9 (pill shows the pick), B10–B13 (wireframe signatures: fav chips, market selector rebind, breadcrumb pills, MyBets column table), B11 (football "Market:" selector), B16–B19.
- §R.C: C1 staged labels, C3 Set-limits sheet (F11), C6–C9.
- §R.D: D5 sibling CAROUSEL (list exists), D6 My-markets pinning (F2).
- §R.F: F3 fly-to-slip, F4 accordion, F5 skeleton wiring.
- §R.G: deeper a11y sweep (focus visibility audit, hit-area audit).
- §R.H: H1 reality-check interval, H6 connectivity toast.
- §R.J: F10 insufficient-funds, F16 wireframe pass.
- Verification queue V1–V6 (web_search still down session-wide).

Deployed: https://mohanganesh3.github.io/housebets-sportsbook/ (gh-pages 3c02a80a).

---

## V3 ROLLUP — megaplan v3 (2026-11-09, plan-de247ee8bfb7121a)

User verdict: still reads generic/AI. v3 treats **visual art direction + cinematic craft as the flagship gap**. `web_search` confirmed restored → verification queue + re-mines run LIVE.

**Frozen defaults (0.2):** motion stack = CSS scroll-driven `scroll()/view()` (Baseline as of FF159, Oct-27-26) + GSAP ScrollTrigger+ScrollSmoother (now free) + Lenis; Motion stays for component springs; **no WebGL**; View Transitions for route morphs where React 19.3 `<ViewTransition>`/TanStack Router allow. Cinema placement: hero, reveals, transitions, score moments, sheet physics — **odds cells, live states, slip mechanics stay conventional**. Perf budget: ≤~200KB gzip incremental route JS; every cinematic element has a `prefers-reduced-motion` twin + Lenis kill-switch.

### PHASE C1 — Research wave C (live)

| Thread | Status | Doc | Scope |
|---|---|---|---|
| C1 cinematic canon | ⬜ | `24-cinematic-canon.md` | X-post genre teardown; technique→sportsbook fit |
| C2 library frontier | ⬜ | `25-library-frontier.md` | per-lib usage recipe for OUR components |
| C3 apply-map | ⬜ | into `31-synthesis-v3.md` | technique×surface allowed/conditional/forbidden |
| C4 Reddit live | ⬜ | `26-reddit-live.md` | 4–5 sub-mines, real quotes |
| C5 social live | ⬜ | `27-social-live.md` | X/YouTube/TikTok |
| C6 V1–V6 verify | ⬜ | `28-verifications.md` | see queue above |
| C7 competitor motion | ⬜ | `29-competitor-motion.md` | tick feels, slip physics, skeletons, loading |
| C8 Housebets r3 | ⬜ | append `18-` | motion timings, Hubie, BETBY divergences |
| C9 slop audit v3 | ⬜ | `30-slop-audit-v3.md` | on current screenshots |

Each thread MUST emit 10–25 derived tasks appended to §R.C* below.

### PHASE C2 — Synthesis v3
- C2.1 ⬜ `31-synthesis-v3.md` ranked merge
- C2.2 ⬜ Design spec v3 + **cinematic motion charter**
- C2.3 ⬜ Storyboards v3 (button-by-button, 390+1440)

### PHASE C3 — Build batches
- **B1 backlog pass 2** ⬜: R.B7 band, B9 pill, B10–13 wireframe signatures, C3/F11 limits sheet, D5 carousel, D6 My-markets, F3 fly-to-slip, F5/F6 skeletons, B18 banned sweep
- **B2 cinematic layer** ⬜: hero scroll shots, mask reveals, Lenis/ScrollSmoother, view() reveals, route morphs, goal-moment choreography, grain/vignette, sheet physics
- **B3 art direction v3** ⬜: crests v2, per-section SVG backgrounds, motif tokens, empty/error art, anti-slop sweep vs C9

### PHASE C4 — QC · PHASE C5 — Deploy (per v3 plan)

### Trim order
Cinematic extras → art variants; NEVER scorecard states, QC, or synthesis.
