# 71 — Housebets brand DNA v2 (verified forensics)

Fresh fetch round, 2026-11-09. Live housebets.com is Cloudflare-gated (403 on
curl + webfetch, "Just a moment…" challenge) — same as prior round. Ground truth
used instead: repo captures `contest-page-snapshot.yml` (full 2026 a11y DOM),
`shadow-dom-info.json` (BETBY widget dump), `research/brand/*.svg|woff2`,
Wayback raw HTML+CSS (2025-11-08, pre-rebuild Vite build; 2026-05-01 still
Vite → Next.js rebuild shipped later in 2026), betby.com (curl 200),
ismaelbashagha.com (full site fetched).

Source tags: [DOM26]=contest-page-snapshot.yml · [WID]=shadow-dom-info.json ·
[WB25]=Wayback 2025-11-08 raw · [PRIOR]=03-brand-system live capture 2026-11-09
(not re-fetchable today; consistent with all corroborating evidence) ·
[OWN]=repo build files.

## Verified tokens

**Fonts**
- [WID] BETBY widget declares `fonts: ["figtree"]` — the embed uses Figtree only. VERIFIED.
- [WB25 CSS] Old build shipped `Roobert` (brand face, `!important`), `Oxanium`,
  `Nebulica`, `Inter`, `Montserrat`, `Ubuntu`. Oxanium predates the rebuild. VERIFIED.
- [PRIOR] New build (Next.js/Tailwind v4): **Figtree** variable (UI),
  **Red Hat Display** 700 (headings), **Oxanium** 600/700 (techno numerals).
  Status: VERIFIED-via-prior-capture; woff2 self-hosted files exist in
  `research/brand/` and are already wired in `src/index.css` [OWN].
- Note: `desktop_logo.png` raster + `housebets-logo.svg` wordmark exist locally.

**Logo**
- `research/brand/housebets-logo.svg` VERIFIED: 116×18, lowercase "housebets"
  wordmark — cyan "h" glyph `fill="#02F7FD"` + white letters. (Token scale calls
  the cyan `#02f8f8`; logo path is `#02F7FD` — same signature cyan family.)

**Colour**
- [WB25 CSS, 963 KB] Legacy palette ancestors, by frequency: `#08333c`×166,
  `#002026`×82, `#4fe2ff`×74, `#26ba50`×49, `#081519`×46, `#00ffff`×35,
  `#051215`×32, `#117f81`×24, `#03f6fc`×16, `#FFD205`×14. → the
  deep-teal + pure-cyan + green + gold DNA predates the rebuild; the rebuild
  *systematized* it. VERIFIED.
- [WB25 CSS] `#c4f4f1` / `#82e0e0` NOT present in legacy CSS → the **pale-cyan
  primary CTA is a new-design-system artifact** (the judge's own token).
  VERIFIED negative.
- [PRIOR] Semantic set: bg `#041015`, surfaces `#0b1920/#0e202a/#0d2a38`,
  borders `#0d2531→#113a4c`, text `#f9f9fb/#8f96a8`, accent `#02f8f8`,
  `interactive-primary-bg: #c4f4f1` hover `#82e0e0` pressed `#02f8f8b3`,
  success `#47d496`, error `#f41f50/#fa2e5d`, warning `#e17823`, gold `#daa520`,
  positive `#26ba50`. VERIFIED-via-prior-capture; all present in `src/index.css` [OWN].

**Radii / spacing / motion**
- [WB25 CSS] `border-radius:8px` ×158 dominant; `50%`×44 (pills); 4/6/12/24px
  tail. VERIFIED. New build's rounded-md(6)/cards(~12)/pills consistent [PRIOR].
- [PRIOR] `--shell-header-height:60px` (contest), bottom-bar 67px, left rail 72px.
- [WB25 CSS] Transitions generic `.3s/.5s` — no motion language in old build.

## Copy voice samples (verbatim)

New-build voice [DOM26, contest + chrome]:
"The sportsbook we'd ship tomorrow wins." · "Your prototype should be at least
this good." · "Our wireframes. Match them, then beat them." · "Design it. A
clickable prototype: 5 pages, singles only." · "What makes it Housebets? 80 to
800 characters." · "Ties: the higher Match page score wins, then Feels like
Housebets." · "Every state: suspended, changed, failed" · "Tick all five. Your
prototype must have every one." · "Takes about 2 min once you start." ·
"Feels like Housebets" · "Sign in with your Housebets account to enter." ·
"Start your entry" · "Prize ladder" · "Send every idea" · "We use cookies to
enhance your experience and analyse product usage." · "My bet slip takes
singles only. No multis, boosts or free bets."

BETBY widget voice [WID, verbatim text dump]:
"Back online" · "29′ 1st half" · "43′ 3rd quarter" · "Second break" · "Break" ·
"Winner (incl. overtime)" · "Winner (incl. overtime and penalties)" · "1x2" ·
"draw" · "Popular Live Upcoming Predictions" · "Today, 03:30" · "Nov 21, 01:15".

Old-build voice [WB25]:
"Welcome to," + "Simple sign-up, instant withdrawals and exclusive perks" ·
"There is no data" (Live Wins empty state) · "Housebets strives to be the
global pinnacle in online gaming and betting, leveraging state-of-the-art
blockchain technologies. Our patrons are always our top priority. Trust,
honesty, and fairness underline our core principles." · "Hamess" (BETBY typo).

Voice rules confirmed: sentence case, terse declaratives, dry confidence
("at least this good"), numerals not words, no exclamation marks, no emojis.
The old "patrons/pinnacle" formality is DEAD — do not imitate it.

## Hubie & art direction

- **Hubie: UNVERIFIED / NOT FOUND.** Zero hits for "hubie|mascot" in the 892 KB
  Wayback homepage HTML, the 963 KB legacy CSS, the 2026 DOM snapshot, or the
  widget dump. If a mascot exists it's not on public surfaces captured. → The
  "h" house glyph (logo mark) is the only verified brand character; treat it as
  the mascot proxy. One cameo max.
- Art direction [WB25]: hero = logo wordmark + one-line value prop, game tiles
  as primary visual content, `/img/sport/N.svg` sport icons (monoline SVGs),
  `Live Wins` social-proof module. New build [DOM26]: ticker prize widget IS
  the art in the chrome (Weekly $50,000.00 / Monthly $100,000.00).

## Motion observed

- New build motion spec: UNKNOWN (Cloudflare). [WID] 96 style blocks in widget
  but no keyframes surfaced in the text dump.
- [WB25] Legacy = generic .3–.5s transitions, swiper library. No signature.
- Judge's stated bar (verbatim, archive): "a soft glow for under three seconds,
  no confetti spam. Small enough to survive a hundred rounds, big enough to
  feel like something happened." → motion = semantic + restrained.

## Judge taste profile (Bashagha's own words — all VERIFIED today)

- Role: Founding Head of Design, Aug 2025 – Sept 2026; now Principal PD at
  Revae via Sumer Studios. CV: Amazon Senior UX (Accessibility Bar Raiser,
  year-long certification), Deloitte lead, MEng Mech Eng 1st class,
  Shillington design. He is a certified a11y reviewer — a11y defects are his
  home turf.
- "I started by auditing the product as a system rather than a collection of
  pages. Six pages had six different approaches to spacing. Three sliders used
  three different interaction models."
- "The goal wasn't to document what already existed. It was to work out what
  should become reusable, then rebuild those patterns properly." → 13 rebuilds,
  45 components in `packages/ui`, 20 locales incl. RTL, named: Badge, Link,
  Footer, RewardsSlider, UserInfoModal, HomepageBanner, CasinoTile, SportsTile,
  GamePlayingPage, AccountDropdown, SignInFlow, RewardsDropdown, HeaderNav,
  Tooltip.
- "the honest cost of the multi-minute scan and the send-to-prove step" /
  "the defensible design claim is the conversion rate, not the raw volume" —
  every metric tile cites source (PostHog event, git query, Linear range).
- "Bets chain on settle, never on a bare interval, so the engine is never asked
  to post a bet it is still resolving." + teardown on "keyup, blur, tab-hide,
  modal open and a rejected bet alike."
- "A further 379 used the decline path — it needed to exist." (four terminal
  failure screens shipped).
- "56% of players are on mobile" — his named fixes: bottom sheets, iOS sheet
  cropping, bottom-nav positioning, "white flash to skeleton to branded splash".
- AI stance: "the design team became front-end engineers", 205 PRs merged
  himself; Revae note: "Every part built hands-on with agentic AI… The brand
  foundations by hand." → AI-built fine; *generic* is the sin. Tools listed:
  Claude Code, Codex, Figma MCP, PostHog.
- His own portfolio tells the aesthetic: numbered chapters, "Outcome in three
  figures", metric tiles with provenance captions — restrained, systematic,
  numbers-forward. Mirror that in the entry's presentation.

## BETBY platform vs Housebets layer

VERIFIED: betby.com = B2B "The Ultimate Sports Betting Solution / Sportsbook
Platform" with customization + iframe delivery [curl 200 today]. Housebets
evidence: `/sports?bt-path=*` proxy URLs ("bt-" = BETBY), shadow-DOM custom
element, `sc-*` styled-components, Figtree-only, 96 style blocks [WID+WB25].

- Platform-standard (don't imitate — replace): tabs Popular/Live/Upcoming/
  **Predictions**; `1x2`/`draw`; verbose `Winner (incl. overtime and
  penalties)`; `Go to All Markets`; `ODDS FORMAT: European` toggle; sidebar
  `Home/Upcoming Events/Bet Live/My Bets`; `Hamess` typo; flat single-weight
  Figtree; promo modules (Hot Combos/Top Outrights).
- Housebets-authored (keep/match): shell chrome (prize ticker, Casino↔Sports
  rail, pale-cyan Register), 6-col footer w/ Intercom deep-links, contest
  voice, token system, house glyph, quick-stake chips 1/10/50/100 (50 lit).
- Keep-worthy BETBY phonetics: `29′ 1st half`, `Second break`, `Back online`.

## The Housebets grammar (12 rules)

1. **Cyan hierarchy is inverted vs every rival:** `#02f8f8` = text/icons/
   borders/glow ONLY; primary CTA = `#c4f4f1` fill + `#041015` text. Filling
   buttons with neon cyan = instant Stake-clone tell.
2. **Surfaces are deep-water teal, not black:** `#041015 → #0b1920 → #0e202a →
   #0d2a38 → #113a4c`. Depth comes from layered teal + hairlines, not shadows.
3. **Three-font voice:** Figtree UI / Red Hat Display headings / Oxanium 600–700
   for every numeral on a betting surface (odds, scores, clocks, prize pools).
4. **Chrome identity = the ticking prize widget** centered in the top bar;
   `Register` pale-cyan pill is the only primary button in chrome.
5. **Radius 8-dominant**, pills for segments/selected states, ~12 cards,
   hairline borders (`#0d2531`-class) — never drop shadows.
6. **Voice:** sentence case, terse declaratives, dry confidence, numerals not
   words, zero exclamation marks, zero emojis in UI copy.
7. **Colour semantics are sacred:** gold = follows/prizes/big wins only;
   red-pink = live/error; amber = suspended/warning; green = positive/settled.
8. **States are named plainly and designed fully:** "Suspended" band,
   "Back online", decline/failure screens exist and look intentional.
9. **Sports and Casino are peers** in one icon rail; chat + support are
   chrome-level (phone tab bar: Menu | Sports | Casino | Chat | Support).
10. **Native > embed:** replace BETBY idioms — `Match result` not `1x2`,
    `1 X 2` labels, concise market names, `+N ›` not `Go to All Markets`,
    decimal-only, no Predictions tab, no promo interstitials.
11. **Motion is small and earned:** ≤400ms UI transitions, ≤3s glow moments,
    zero confetti. Every animation must mean a state change.
12. **Every number has provenance** (the judge's own tiles cite PostHog/git/
    Linear). Honest friction named in copy ("prices may move"). House glyph +
    "The house is patient." = native seal.

## Derived tasks

1. Sweep every primary CTA (Place bet, Accept, Deposit, View match) →
   `#c4f4f1` fill + `#041015` text; demote neon `#02f8f8` to text/border/glow.
2. Audit all numerals on betting surfaces → Oxanium 600/700 (odds, scores,
   clocks, prize pools, returns); keep Figtree for prose/labels.
3. Odds cells: surface-secondary fill + hairline; price cyan; selected =
   pale-cyan fill + dark text + ✓ (not neon fill).
4. Suspended: full-width amber `🔒 Suspended` band on list rows; per-cell
   locks only on match page.
5. Market tabs: `Popular … All markets N` — All last, count attached.
6. Phone slip bar = cyan pill showing the pick (`❶ Arsenal @ 1.30 ⌃`), never
   a bare count badge.
7. Football page: breadcrumb pills `‹ | Soccer ▾ | "5 competitions · 6 live"`;
   `≡ Market: Match result ▾` rebinder on row odds; `All competitions ▾`.
8. Follow affordance `☆ → ★` gold; remove gold from any error/promo usage.
9. My bets: `N open · M settled` header, Open/Settled segmented, time filters
   (All time/Today/7d/30d/Custom), expandable rows, `●52' 1–0` live chips.
10. Copy sweep: kill exclamation marks, caps toasts, golf idioms; sentence
    case everywhere; numerals not words.
11. Design four terminal slip states: rejected, suspended-mid-place, offline,
    insufficient funds — each with real art, not a toast.
12. Placement teardown matrix: cancel placing on blur, visibilitychange,
    sheet-close, route-change; no leaked gesture state.
13. First paint: skeleton → branded splash (his named fix); no white flash.
14. 390px pass: iOS sheet cropping check, bottom-nav positioning, slip bar
    sits above tab bar with safe-area.
15. Provenance sweep: every stat in UI copy implies a source or is deleted.
16. Honest-friction lines: "prices may move before confirmation", delay
    disclaimer, suspension reasons named.
17. Keep top-bar Leaderboard prize widget (Weekly $50,000.00 / Monthly
    $100,000.00) — ticking prize pool is their chrome signature.
18. House glyph cameo (≤1) + "The house is patient." placement; no invented
    mascot — Hubie is UNVERIFIED.
19. RTL/long-locale guard: no truncation-dependent layouts, no en-only widths.
20. Quick-stake chips 1/10/50/100 USDT with 50 pre-highlighted.
