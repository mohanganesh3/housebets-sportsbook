# T4 — Attention & Reach

Eye-tracking + reach research applied to our five pages (home, live, football,
match, slip+bets). Written 2026-11-10 ~00:2x IST (real `date`).

Method note: You.com namespace (`you-com-research`) returned "free tier limit
exceeded" — per the websearch rules, all research below was done with Cursor
`web_search` + `webfetch`. **Every URL cited in §1/§7 was actually opened** and
its text read; blocked pages are marked UNKNOWN. Prior agent file
`research/21-attention-a11y.md` covered some of this canon from memory
("web_search down") — this file supersedes it on attention/reach with fetched
evidence. Code references verified against `src/` at write time.

---

## 1 · Evidence summary per pattern (URLs opened)

### 1.1 F-pattern — NN/g, Pernice 2017 (opened)
`https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/`

- Mechanism: horizontal top bar → shorter second bar → vertical stem down the
  **left edge of the content area** (explicitly not the nav rail — the pattern
  describes the *content* region).
- Two rules that matter for us: **first lines** of a section get the most
  gazes; the **first few words on the left** of each line get the most
  fixations. Front-load information-bearing words.
- F-scanning appears when content lacks formatting signals AND users are
  efficient AND not fully committed — i.e., always assume it. The antidotes
  NN/g names: headings that stand out (→ layer-cake), bullets, front-loaded
  keywords. It also lists sibling patterns we must expect on our pages:
  **spotted** (hunting for digits/odds — our exact case), **marking** (finger
  scrolls while eyes anchor — common on mobile lists), **bypassing** (skipping
  repeated leading words — e.g., every league header starting with the same
  flag/competition boilerplate), **commitment** (rare, don't rely on it).
- Applied: match rows are list content → the *start* of each row (comp or
  teams, left edge) is what the stem catches. Our left-aligned
  `LeagueSection` headers + consistent row left-edge already support this;
  alternating/zigzag row internals would break it (§1.5).

### 1.2 Layer-cake pattern — NN/g, Pernice 2019 (opened)
`https://www.nngroup.com/articles/layer-cake-pattern-scanning/`

- Fixations land mostly on **headings and subheadings**; the most efficient
  scan pattern after full reading. Works only if headings (a) visually stand
  out consistently, (b) are descriptive of exactly their section, (c) **lead
  with information-bearing words**.
- Explicit NN/g warning reused below: don't make headings "so absurdly
  brighter or larger than body text that they look like promotions or ads."
- Applied: our league/competition headers are the layer-cake rows. They must
  carry *name + live/count* (bypassing-pattern caveat: don't start every
  header with the same word — "Premier League · 4 live" beats "Matches ·
  Premier League"). This is how a player finds "their" league in a long list
  at scroll speed.

### 1.3 Horizontal attention leans left — NN/g, Fessenden 2017 (opened)
`https://www.nngroup.com/articles/horizontal-attention-leans-left/`

- n>120, >130,000 fixations: **80% of viewing time on the left half, 20% on
  the right** (was 69/31 in 2010; *more* left-skewed now). SERPs: 94% left.
  Leftmost 10% (nav rail zone) got only ~6% — users have learned nav is
  ignorable until needed.
- Conventional layouts win (Jakob's law); if you put content right-of-center
  it needs extra prominence to be seen at all.
- Applied (1440): our right rail (slip/bets/chat) sits in the 20% zone —
  correct *because* it's persistent-but-quiet utility; it must never rely on
  discovery. Money-critical confirmations inside it must be loud *inside the
  panel* because the panel itself gets a fraction of ambient attention.
  Applied (390): full-width single column — the F-stem/left-edge rule is the
  dominant horizontal effect.

### 1.4 Z-pattern / Gutenberg — Vanseo Design, Bradley (opened) + NN/g zigzag study (opened)
`https://vanseodesign.com/web-design/3-design-layouts/`
`https://www.nngroup.com/articles/zigzag-page-layout/`

- Gutenberg (for homogeneous, hierarchy-free pages): primary optical area
  top-left → strong fallow top-right → weak fallow bottom-left → **terminal
  area bottom-right** ("reading gravity"). Z-pattern: TL → TR → diagonal →
  BR; for **simple designs with few elements**. Golden triangle = top of
  page is most seen.
- Bradley's caveat NN/g's own data supports: these patterns describe the
  *no-hierarchy default*. The moment a design has real hierarchy, the eye
  follows **focal points in order of visual weight** — which is why §3 maps
  *intended* fixations and an attention budget, not a canned letter shape.
- NN/g zigzag eyetracking (Flaherty 2017): alternating image/text rows made
  scanning *less* efficient; decorative images became obstacles; aligned
  layouts scanned cleanly; **informational images earned attention regardless
  of alignment** — a module earns fixation by carrying information, not by
  looking loud.
- Applied: Z/Gutenberg matter to us in one place — sparse hero compositions.
  Terminal area = bottom-right of the hero is where its CTA belongs (and
  where the Z ends). Row internals on match cards must keep constant
  left-alignment (no zigzag), and any hero artwork that isn't informational
  is an "obstacle" that also risks reading as an ad (§5).

### 1.5 Banner blindness — NN/g, Pernice 2018 (opened) + Nielsen 2007 (opened)
`https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/`
`https://www.nngroup.com/articles/fancy-formatting-looks-like-an-ad/`

- Still robust after 3 decades. Three traits make users classify something
  as an ad and skip it: **(1) ad-specific placement** (top banner, right
  rail); **(2) ad-like visual treatment** (animation, fancy formatting,
  colored background vs page, text-in-image, small rectangle); **(3)
  proximity to ads** — ads *poison adjacent content* (Gestalt proximity →
  users assume the whole region is irrelevant).
- **Hot potato**: one glance classified as "ad" → users avoid that region on
  this page, other pages, even other sites. One promo-looking module can
  permanently devalue a slot (e.g., the right rail) for the whole session.
- Mobile-specific: inline ads can't be fully avoided but get fixated *past*;
  and **faux ads** — on a 390px viewport *anything that stands out from its
  immediate surroundings* risks being read as an ad, even if consistent with
  elements offscreen. Users scrolled past genuinely useful content on
  generac.com because it looked different from surrounding content.
- Nielsen 2007: Census Bureau put the answer in big red type at top — **86%
  failed the task**; ~1/3 never even fixated it; heavy formatting read as
  promotion. Lesson: louder ≠ seen.
- Applied: full audit rules in §5. Headline implication: our hero occupies
  the top-banner *zone* (unavoidable), so it must be maximally *content-like*
  — same surface system as match cards, real odds, real teams, no auto-spin.

### 1.6 Thumb zones & grip — Hoober UXmatters 2013 (opened), UXmatters 2017 (opened), 4ourth Mobile (opened), Smashing 2016 (opened)
`https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php`
`https://www.uxmatters.com/mt/archives/2017/05/design-for-fingers-touch-and-people-part-2.php`
`https://www.4ourthmobile.com/publications/designing-for-touch`
`https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/`

- 2013 study: **1,333 street observations**. Grips: **49% one-handed · 36%
  cradled · 15% two-handed**. Of one-handed: **67% right thumb / 33% left**.
  Cradled: 72% still thumb-tap. Grip **shifts constantly mid-task** — users
  re-grip for reach instead of staying put.
- The 2013 reach charts give the classic vocabulary: **green = easy, yellow
  = stretch, red = hard/reposition**. Hoober's warning: do *not* park
  "dangerous" functions top-left assuming right-thumb users — grips change.
- 2017 correction (must-cite, most rivals will miss this): the clean
  thumb-zone arc is **wrong as a sole model**. "People prefer to touch the
  **center** of the screen" — measured touch accuracy: **7 mm center · 9 mm
  edges · 12 mm corners**. Users prefer to *view* the center too and will
  **scroll content into their preferred zone rather than reach** → pad the
  bottom of scroll pages so the last item can come to center. Fingers are
  opaque — leave room around targets so the tap hand doesn't hide state
  changes. Smashing 2016 supplies the applied vocabulary we use in §2
  (easy/stretch/hard; frequent actions in easy zone, rare ones may live in
  hard zone).

### 1.7 Fitts's law — NN/g, Budiu 2022 (opened) + Laws of UX (opened)
`https://www.nngroup.com/articles/fitts-law/`
`https://lawsofux.com/fittss-law/`

- T = a + b·log₂(2D/W). Two-component movement: fast ballistic phase (driven
  by distance) + slow correction phase (driven by *visible* target size).
- Applications, verbatim-relevant to a sportsbook:
  - Bigger targets = faster + fewer errors; icon+label beats icon alone
    (bigger effective target — supports labeled odds cells, tab icon+text).
  - Screen edges are "infinite" targets **for mouse only — for touch, edge
    targets are *slower*** (overshoot possible; Avrahami study). Don't lean
    on screen edges for touch precision.
  - Don't crowd small targets (overshoot → wrong-cell taps = wrong bet).
  - **Invisible padding doesn't prevent slowdown** — users decelerate for
    the *visible* size. So odds cells must *look* big, not just be big.
  - Keep related/next-in-sequence targets close: the CTA belongs **next to
    the last interaction** (bottom of form, not the top bar); bottom-sheet
    menus are suboptimal when opened far from their handle.
- Laws of UX takeaways align: large enough, ample spacing, easy-to-acquire
  placement.

### 1.8 Hick's law — Laws of UX (opened)
`https://lawsofux.com/hicks-law/`

- Decision time grows with number AND complexity of choices: minimize choices
  when response time is critical; break complex tasks into steps; highlight
  recommended options; don't oversimplify to abstraction.
- Applied: a live match page can carry 40+ markets — that choice set must be
  staged (group tabs, ≤3-outcome rows, progressive disclosure), not presented
  flat. In-play is the time-critical context where this bites hardest.

### 1.9 Motion & peripheral attention — NN/g Harley 2014 (opened) + Laubheimer 2020 (opened)
`https://www.nngroup.com/articles/animation-usability/`
`https://www.nngroup.com/articles/animation-purpose-ux/`

- Motion in the **periphery triggers a bottom-up, stimulus-driven attention
  shift that cannot be voluntarily suppressed** (rod-photoreceptor motion
  detection). Speed of capture scales with perceived *animacy*: position
  shift > fade. Slide-ins grab fastest; fades are the least interrupting.
- Motion at the *point of focus* aids comprehension (state change, causality,
  ≤0.1 s after the user's action reads as direct manipulation).
- **Attention hijacking via motion = named dark pattern.** Frequency matters:
  multiple simultaneous animations destroy each other's pull and the user's
  task.
- Applied: odds flashes and live clocks are *legitimate* motion (state change
  at a place the bettor is watching); a *count* of concurrent flashes or
  auto-rotating hero is *hijack*. This is the evidence base for the
  live-motion-vs-open-slip rule in §3.

### 1.10 Gambling-specific attention — Lole et al. 2019 (opened) + Farr et al. 2023 review (opened) + Kim et al. 2022 (abstract only, fetch blocked)
`https://pmc.ncbi.nlm.nih.gov/articles/PMC7044613/`
`https://link.springer.com/article/10.1007/s10899-023-10260-9`
`https://pubmed.ncbi.nlm.nih.gov/36203047/` — **UNKNOWN/blocked** (PubMed
cookie wall); abstract captured via search result, flagged accordingly.

- Lole, Li, Russell, Greer, Thorne & Hing, *J Behav Addict* 2019: 49 regular
  sports bettors + 10 non-gamblers, eye-tracked on real wagering ads.
  **Significantly fewer fixations on responsible-gambling messages than on
  wagering information (p<.001); bettors gave <15% (14.76%) of fixations to
  RG content vs 29.4% for non-gamblers.** Small, static, bottom-placed,
  low-contrast messages = effectively invisible; a **contrasting
  block-color background measurably increased fixations**.
- Farr, Broomfield & Coventry 2023 (open access, *J Gambling Studies*): 22
  studies, attentional bias to gambling cues demonstrated in 16 — problem
  gamblers orient *first eye movements* toward gambling stimuli and maintain
  gaze longer (incl. Brevers 2011 eye-gaze data).
- Kim et al. 2022 systematic review of 11 eye-tracking studies (abstract):
  gambling stimuli capture attentional bias; across 4 RG-message studies,
  **all participant groups attended less to RG messaging than to betting
  odds.**
- Design meaning: (a) on a sportsbook, odds/inducement content wins the
  attention war by default — anything we *need* seen (session time, limits,
  suspended reasons, "price changed") must be engineered for fixation
  (contrast, placement in flow, size), not appended greyly; (b) odds motion
  genuinely is the strongest attentional lever on the page — budget it.

---

## 2 · Thumb-zone map at 390px

Device model: 390×844 CSS px (iPhone 14 class, brief's required phone width).
Physical width ≈ 82 mm → **1 mm ≈ 4.76 px**. Hoober accuracy blobs
(center 7 mm / edges 9 mm / corners 12 mm) ≈ 33 / 43 / 57 px of slop the
*target must absorb* — i.e., targets at edges need to be ~1.3× center size
and corners ~1.7× to hit the same error rate. Craft floor: 44 px
(Apple/WCAG-2.5.5 AAA measure); WCAG 2.5.8 AA floor 24 px — for a money grid
we use 44 px as the bar and treat 24 px as never-touch.

Zones below are for the modal grip (one-handed right thumb, 49%·⅔r) but the
rules are written to also serve cradled/two-handed and left thumbs — per
Hoober, grips shift constantly, so zones are *priorities*, not absolutes.

```
390 px wide, 844 px tall (home indicator + safe area at bottom)

 y 0–56      HARD — header (logo, search, balance). Nav/identity only;
             nothing required per-task except glanceable balance.
 y 56–300    HARD→STRETCH — top of scroll content (sport grid, hero top,
             scoreboard top). Viewing zone more than tapping zone.
 y 300–560   EASY-VIEW + EASY-TAP (center band) — the highest-accuracy
             region for BOTH eyes and thumb. Money targets (odds cells,
             stake input) belong here *after scroll*; design lists so the
             row in play can be scrolled into this band.
 y 560–740   EASY-TAP — the classic green arc; primary persistent actions:
             floating slip bar, sheet footer CTA.
 y 740–844   EASY-TAP (chrome) — bottom tab bar; fixed, safe-area-padded.
 x edges     Stretch-ish: x<40 or x>350 loses ~1.3× accuracy; keep
             per-row X/remove icons off the far edge or pad their area.
 Corners     Worst accuracy (12 mm); nothing money-critical in corners.
```

**2017 correction applied:** the center band outranks the raw bottom arc for
*tap accuracy*; the bottom arc wins for *persistent* controls because they
are always at the same reachable place. Therefore: transient money targets
(odds cells) → scrollable into center band; persistent money chrome (slip
bar, tab bar, sheet CTA) → bottom arc. Users scroll to comfort — **every
list page needs bottom padding ≈ 50–60 dvh so the last league section can
reach the center band** (Hoober's explicit guideline).

Applied to our elements:

| Element | Zone today | Verdict / rule |
|---|---|---|
| Odds cells (`OddsCell` min-h-10 = 40 px compact, min-h-12 named) | center band after scroll | **Below craft floor.** Raise effective height to ≥44 px at 390 (visually ~44+, not invisible padding — Fitts: users decelerate for visible size). Keep ≥8 px gaps between cells (don't-crowd). |
| Floating slip bar (`h-13` = 52 px, above tab bar) | easy-tap chrome | **Correct** — keep. It must never cover the last row: enforce scroll padding so content clears it (see P51-07). Its *entry* may use position-shift slide-up — the one sanctioned attention grab (§1.9). |
| Bottom tab bar (5 items, icon+label) | easy-tap chrome | **Correct.** Icon+label also widens the effective target (Fitts). Keep current item centered under the right-thumb arc (Sports/home position already mid-bar). |
| Sticky market-group tabs (match page, top of content) | hard zone | Acceptable for *nav-class* controls — they are occasional, not per-decision. Mitigations: sticky so re-tap doesn't require scrolling to top; selected tab scrolls itself to center-x; h ≥ 40 px (currently ~36 px pill — raise). |
| Sheet actions (slip sheet, 72/82 dvh) | footer = easy; list = center | **Place bet (h-11 = 44 px, full-width footer) is correctly placed** — adjacent to stake/totals (Fitts: CTA next to last interaction) and in the thumb arc. Sheet tab strip (slip/bets/chat, h-8 = 32 px) is under floor → ≥40 px. |
| Destructive (Clear trash, per-selection ×, "Remove suspended") | top of slip / row edge | **Correct instinct** — separated from Place bet both in distance and visual weight. Rule: ≥48 px vertical and ≥24 px horizontal separation from Place bet; never two-step-adjacent to the CTA; small visual, no fill. Hoober: don't rely on "hard corner = safe" alone — distance + low salience + label do the work. |
| FollowStar (28 px), chip × (24 px), carousel arrows (28 px), per-row × (24 px) | various | Visual size may stay small; **hit area must pad to ≥24 px (AA floor) with 40–44 px as craft target** — but note Fitts: invisible padding doesn't stop user caution, so keep a visible hover/pressed affordance sized plausibly. |
| Header (logo/search/balance) | hard zone | Fine — identity + glanceable money fact only. Balance must stay visible at 390 (prior audit already flags it hidden `sm:`). |
| Desktop panel tabs (slip/bets/chat, h-9 = 36 px, right rail) | n/a (mouse) | Mouse targets can be smaller, but 36 px is thin for a money-adjacent tab → 40 px. |

One-handed left-thumb (33% of single-hand users): mirror zones; nothing in
our layout is asymmetric-critical except far-edge × icons — keep them
padded.

---

## 3 · Per-page ATTENTION MAP

Intended fixation order = what the *design* should make dominant in order of
visual weight (per §1.4, hierarchy beats canned letter-patterns). Each map
lists the intended 1st/2nd/3rd fixation, the mechanism that earns it, and
what must NOT steal attention. Squint/blur tests to be captured in
`qc/blur/` per asks ledger A11.b.

### 3.1 Home (`/`)

Intended order:
1. **HeroSpotlight — as content** (first viewport). The F top bar + golden
   triangle fall here regardless; the only question is whether it's fixated
   *as information or dismissed as a banner* (§1.5). It must carry real
   teams, real market, real odds, one CTA — informational weight earns the
   fixation it will get anyway. Mobile ordering caveat: the sport icon-grid
   renders *above* the hero at 390 — it's nav, users skip nav chrome (~6%
   fixations §1.3); keep it quiet, low-saturation, uniform so eyes pass
   *through* it to the hero.
2. **"In play now" featured rail** — first live content; the reason a
   bettor opens a sportsbook. Must sit within/near first viewport at 390.
   LIVE badge + real clock are honest attention cues.
3. **First live league header → first match row's odds cells** — layer-cake
   header scan lands here; odds cells are the task terminus (spotted
   pattern hunts digits — tabular numerals + fixed cell grid support it).

Must NOT steal:
- **Auto-rotating hero slides** — peripheral motion in the top zone =
  hijack (§1.9) *and* the strongest ad-signal (§1.5). Kill auto-advance.
- **HouseFeed / FollowingStrip glow or motion** above the odds rows'
  salience. They're utility modules; if they out-glow live odds, the page's
  information hierarchy inverts.
- Sport pills/grid must never visually outrank match content (no fill
  states competing with odds-cell selected cyan).
- Promo-styled anything: home must not teach hot-potato that "this site has
  ads" (§1.5) — one promo-looking module devalues every sibling slot.

### 3.2 Live (`/live`)

Intended order:
1. **First league header + first match row's score/clock** — the player
   arrived with intent "what's on right now"; spotted pattern scans for
   their sport/comp; live clock/minute is honest motion at the point of
   interest.
2. **Odds cells in live rows** — decision targets; the flash on a *moved*
   price is earned motion (state change at focus, §1.9).
3. **"Starting soon" header** — secondary queue; lower salience than
   anything live (its matches can't be bet in-play urgency-wise).

Must NOT steal:
- **Concurrent odds flashes** — cap visible flashes (prior audit: ≤4);
  more than that turns earned feedback into peripheral noise (§1.9:
  frequency destroys salience).
- The "Live" page title/header chrome competing with row content — it's
  chrome; keep it thin.
- Any non-live module jumping above live sections; "Starting soon" must
  not out-salience live rows (no brighter surface, no badges bigger than
  the LIVE indicator).

### 3.3 Football (`/football`)

Intended order:
1. **Tab strip (Live & upcoming / All / Favourites)** — page mode check; it
   frames everything below. Sits at top of content, so it gets a fixation
   on arrival; keep it compact so it yields instantly.
2. **First league header** — layer-cake row; carries comp name + count;
   bypassing-pattern caveat: lead with the competition name, not repeated
   boilerplate.
3. **First match row → 1X2 odds cells** — the three-cell row is the
   football default decision (Hick: 3 choices ≈ minimal RT; keep ≤3
   visible outcomes per row).

Must NOT steal:
- The gold **Favourites tab** must not out-glow the content (gold is
  reserved for follow-state meaning, not decoration — it draws eye per
  §1.9-adjacent salience rules; keep it to the tab + star glyphs).
- Upcoming matches must not outrank live ones within the merged tab —
  live rows carry the motion/badge weight.
- League-header ornamentation (flags/icons fine; big colored header bars
  no — they read as section *ads* and break layer-cake).

### 3.4 Match (`/match/:id`) — tie-break page, highest weight

Intended order:
1. **Scoreboard** (teams, score, honest clock/period) — the page's reason;
   largest type + live badge earns it. Live indicators must be real
   (minute, HT/ET) — the attention they draw must be *true*.
2. **Sticky market-group tab bar** — wayfinding for the market hunt;
   sticky so it's one glance away mid-scroll. Its job is orientation, not
   dominance: high legibility, medium salience.
3. **Default group's first market odds grid** (typically main/1X2) — the
   task terminus; cells are the largest interactive targets on the page.

Must NOT steal:
- **Market tabs must not visually dominate the scoreboard** (no oversized
  pills/glows); the sticky bar is second fixation, not first.
- Odds flashes across the *whole* page when only one market matters —
  flash budget applies here most of all (it's the page with most live
  markets).
- When the **slip sheet opens over this page**: the scrim must freeze
  background odds flashes — peripheral motion through/behind a sheet
  during stake entry is exactly the hijack §1.9 warns about; stake
  decisions need an attention-quiet modal.
- "My markets" gold tab: first in row only when count>0 (its salience is
  earned by player intent, not by us).

### 3.5 Slip + My bets (mobile: floating pill → bottom sheet; desktop: right rail)

Intended order (sheet open, phone):
1. **Totals cluster + "Pays X.XX" + Place bet** — the money answer; sits at
   sheet bottom in the easy arc, full-width 44+ px, highest contrast on
   sheet. (Fitts: CTA adjacent to last field — stake input — and to the
   number the user is deciding about.)
2. **Selection rows (pick @ price, stake input)** — verification before
   commit; each row's × is small/low-salience (destructive distance).
3. **Sheet tab strip (slip/bets/chat) + odds-pref seg + Clear** —
   navigational/config layer; present but subordinate.

Must NOT steal:
- The sheet **tab strip must not compete with Place bet** — it currently
  uses an inverse-fill selected state; it must stay visually quieter than
  the CTA (it's h-8 vs CTA h-11; keep contrast order: CTA > tabs).
- **Live odds motion behind the sheet** — scrim + flash-freeze (§3.4).
- The floating slip **pill itself**: it may slide in on first selection
  (earned grab) but must not re-animate on every odds tick — its "Pays"
  number updating is enough; a bouncing pill on every tick is Times-Square
  motion (§1.9).
- My bets tab: cash-out / status updates may use *fades*, not slides —
  position-shift is reserved for genuinely attention-required events.
- Desktop right rail: it lives in the 20%-attention zone and adjacent to
  ad-typical real estate (§1.3, §1.5) — it must look like *utility chrome*
  (tabs, dense rows, muted surfaces). Any promo-styled panel there gets
  banner-blinded **and poisons the slip itself** (hot potato).

### Cross-page rule (from A9.d): ONE primary action per view
home: first odds cell in play · live: first live odds cell · football:
first 1X2 cell · match: first main-market cell (slip-open state: Place bet
— and the backdrop suppresses all page-level primaries) · sheet: Place bet.

---

## 4 · Fitts / Hick applied

**Odds-cell sizing.** Money target. Rules: visible height ≥44 px at 390
(compact 40 px today fails the craft bar); ≥8 px between adjacent cells
(don't-crowd — a miss-tap here selects the wrong outcome on a money grid);
3-up grid gives ~110 px wide cells — fine for thumbs; the *visible* cell
must look full-size (invisible padding alone still slows users, §1.7).
Selected state flips fill — keep glyph+price position identical so the
correction-phase target doesn't move under the finger mid-decision.

**Primary CTA placement.** "Place bet" is at the sheet footer adjacent to
the totals it commits and right after the stake field — the Fitts-optimal
spot (related/next-in-sequence targets close; CTA after last input). On
desktop rail, same footer position. Never move it to a sheet header.

**Destructive-action distance.** Clear (trash, top of slip), per-row ×,
"Remove suspended": all must sit ≥48 px vertically / ≥24 px horizontally
from Place bet, at lower contrast, and never be reachable by a double-tap
rhythm that started at Place bet. Rationale is *distance + salience*, not
"Hoober's hard corner" — he explicitly warns grip shifts make corner-parking
unreliable (§1.6).

**Market-group tab overflow.** Tabs are a linear menu: Fitts says order by
frequency (most-used nearest the handle) — i.e., `All`/main-first, and "My
markets" prepended only when count>0. Horizontal overflow already uses
edge-fade mask (good — signals more without consuming height); add:
selected tab `scrollIntoView` to center-x (center band preference), keep
visible tab count ≈5–7 at 390 (Hick: don't render all groups + All as
equal choices when a default group exists). Inside a group, sections stay
≤3 outcomes per row where possible (each row ≈ log₂(4) decision units, not
a 6-outcome wall); market count per group is disclosed on the tab so the
player can size the choice before opening it.

**Dense-grid guardrail.** Hick × in-play urgency: any live view that
presents >N rows above the fold slows every decision. Mitigations already
half-built: league chunking (layer-cake), tab pre-filtering, sticky
market tabs. Add: football "liveup" tab default, and on match page the
default group = the group containing main markets, not "all".

---

## 5 · Banner-blindness audit rules

Rules for every element — applied to keep our hero, rails and modules from
reading as "ad" (all evidenced §1.5):

1. **Zone tax:** top-of-page rectangles and the right rail carry inherited
   "ad" suspicion. Content placed there must be *more* content-like than
   the same content elsewhere — same surface/border/radius ladder as
   siblings, never a bespoke "campaign" skin. → Our hero sits in the
   banner zone: it must wear the exact match-card surface system.
2. **Ad-treatment blacklist (any one trait triggers re-review):**
   auto-advancing/looping animation · colored background diverging from the
   page's elevation ladder · text embedded in imagery · small rectangle
   with "fancy" formatting inside plain content · superlative/urgency copy
   ("Don't miss", "Boosted") · drop shadows unlike siblings · stock-photo
   feel.
3. **Proximity quarantine:** never place genuine content directly beside
   anything ad-like — ads poison neighbors (Gestalt proximity). Corollary
   for us: if any module ever *does* look promo-ish (HouseFeed?), it must
   not sit adjacent to live odds or the slip — and ideally it gets
   restyled, not quarantined.
4. **Mobile faux-ad rule (390):** any element that visually stands out
   *from its immediate surroundings* is an ad-suspect — consistency with
   offscreen siblings doesn't save it because the user can't see them.
   → Blur-test home at 390: hero must be recognizably "match content," not
   "banner."
5. **Hot-potato clause:** a slot once classified as ad-space stays dead for
   the session (and may generalize). The right rail and the home top slot
   are too valuable to burn — zero promo styling, ever.
6. **Big-red-numbers lesson (Nielsen 2007):** making critical info *louder*
   doesn't make it seen if the volume reads as promotion — 86% missed it.
   Salience must come from position + information scent, not decoration.
   Applies to how we surface "Pays X.XX", limits, session info.
7. **Lole corollary (betting-specific):** information that *must* be seen
   (RG/session cues, suspended reasons, "price changed" prompts) needs the
   opposite treatment from ads — high-contrast block-color surface, real
   size, inside content flow. Greyed microcopy in a footer is proven
   invisible (<15% of fixations in bettors).

---

## 6 · DERIVED ASK PROPOSALS (for qc/ASKS.md — proposals only, file untouched)

P51-01 · HeroSpotlight must pass a banner-blindness audit: identical
surface/border/radius system as match cards, real teams + real market +
real odds + one CTA, no bespoke campaign skin; verify via 390 blur test
(qc/blur/) that it reads as content not ad — [§1.5, §5 rules 1–4].

P51-02 · Remove hero auto-rotation (peripheral hijack + ad-signal +
WCAG 2.2.2); if any carousel remains: manual only, pause control, PRM —
[§1.9, §1.5].

P51-03 · Odds-cell visible height 40→≥44 px at 390 on all row types;
≥8 px inter-cell spacing; cell layout identical between
selected/unselected so the target doesn't shift mid-tap — [§1.7, §4].

P51-04 · Pad hit areas to ≥24 px AA floor (craft target 40–44 px) on
FollowStar, remove-×, chip-×, carousel arrows, sheet tab strip — without
changing visible glyph size — [§1.7, WCAG 2.5.8/2.5.5, §2 table].

P51-05 · Sheet tab strip (slip/bets/chat) h-8→≥40 px and kept visually
subordinate to Place bet (no inverse fill that out-contrasts the CTA) —
[§2, §3.5].

P51-06 · Destructive distance rule codified: Clear/×/Remove-suspended
≥48 px vertical + ≥24 px horizontal from Place bet, lower contrast, never
double-tap-adjacent — [§4].

P51-07 · Floating slip pill must never occlude tappable content: enforce
scroll padding-bottom so the last league row clears the pill at 390 —
[§2, Hoober scroll-to-center].

P51-08 · Every scroll page gets ≥50 dvh bottom padding so the last
section can reach the center accuracy band — [§1.6, §2].

P51-09 · Market tabs: selected tab scrollIntoView(center-x); edge fade
both directions; visible tabs ≈5–7; order = frequency (All/main default
first; "My markets" first only when count>0) — [§1.7 linear menus, §4].

P51-10 · Match page default group = group containing main markets (not
"all"); each market section ≤3 outcomes/row where the market allows —
[§4 Hick].

P51-11 · Flash budget codified: ≤4 concurrent odds flashes in viewport;
when slip sheet is open, freeze ALL background odds flashes behind the
scrim — [§1.9, §3.4/3.5].

P51-12 · Motion class mapping: odds ticks/scores/clock = fade-in-place;
position-shift slide reserved for genuinely attention-required events
(slip pill entry, errors); nothing animates at >1 event/sec in periphery —
[§1.9 animacy].

P51-13 · Desktop right rail locked to utility-chrome treatment (tabs,
dense rows, muted surfaces); no glow/gradient/promo styling anywhere in
the rail incl. empty states — [§1.3, §1.5 right-rail + hot potato].

P51-14 · Home ordering: "In play now" rail within first viewport at 390;
HouseFeed/FollowingStrip kept below odds-row salience; sport icon-grid
kept quiet/uniform so eyes pass through to hero — [§3.1].

P51-15 · League headers carry `name + live/count` and lead with the
competition name (bypassing pattern); one consistent header style
site-wide to keep layer-cake scan efficient — [§1.1, §1.2].

P51-16 · Session/RG/limits cues that must be seen get a contrasting
block-color chip inside content flow (slip footer, live header) — never
greyed footer microcopy — [§1.10 Lole].

P51-17 · Per-page attention maps (§3) verified with blur tests at 390+1440
in qc/blur/: fail if most-salient element isn't the intended 1st fixation —
[§3, ledger A11.b].

P51-18 · Match-row internals keep strict left alignment and constant
column geometry (no zigzag alternation); crests same column every row —
[§1.1 F-stem, §1.4 zigzag study].

P51-19 · One-primary-action audit per view state incl. slip-open (backdrop
mutes page primaries) — [§3 cross-page rule].

P51-20 · At 1440: all money actions inside the left-80% attention band;
right rail never holds a money-critical *confirmation* without it being
the loudest element inside the panel — [§1.3].

P51-21 · "Pays X.XX" and price-changed prompts use information-scent
salience (position adjacent to CTA + contrast chip), not decorative
loudness — the Census 86% lesson — [§5 rule 6].

---

## 7 · Source log

Opened and read (all content quoted above verified):
1. `nngroup.com/articles/f-shaped-pattern-reading-web-content/` — F-pattern, antidotes, pattern list
2. `nngroup.com/articles/layer-cake-pattern-scanning/` — heading scan pattern
3. `nngroup.com/articles/horizontal-attention-leans-left/` — 80/20 split, 120+ users, 130k fixations
4. `nngroup.com/articles/banner-blindness-old-and-new-findings/` — 3 ad signals, hot potato, mobile faux ads
5. `nngroup.com/articles/fancy-formatting-looks-like-an-ad/` — Census 86% fail
6. `nngroup.com/articles/zigzag-page-layout/` — zigzag scans worse; decorative images = obstacles
7. `nngroup.com/articles/fitts-law/` — formula, edge caveat for touch, padding caveat, CTA placement
8. `nngroup.com/articles/animation-usability/` — peripheral motion, animacy, frequency
9. `nngroup.com/articles/animation-purpose-ux/` — motion roles, attention hijacking = dark pattern
10. `uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php` — n=1,333, 49/36/15, 67% right
11. `uxmatters.com/mt/archives/2017/05/design-for-fingers-touch-and-people-part-2.php` — center-tap, view-center, fingers-opaque
12. `4ourthmobile.com/publications/designing-for-touch` — 7/9/12 mm accuracy; "thumb-zone chart is wrong"; grip shifts
13. `smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/` — easy/stretch/hard applied vocabulary
14. `lawsofux.com/fittss-law/` + `lawsofux.com/hicks-law/` — takeaways
15. `vanseodesign.com/web-design/3-design-layouts/` — Gutenberg quadrants, Z-pattern, golden triangle, focal points
16. `w3.org/WAI/WCAG22/Understanding/target-size-minimum.html` — 24 px AA floor, spacing exception, 44 px (2.5.5)
17. `pmc.ncbi.nlm.nih.gov/articles/PMC7044613/` — Lole et al. 2019 betting eye-tracking
18. `link.springer.com/article/10.1007/s10899-023-10260-9` — Farr et al. 2023 systematic review (open access)

Located but NOT opened (UNKNOWN):
- `pubmed.ncbi.nlm.nih.gov/36203047/` — Kim et al. 2022 eye-tracking
  review; PubMed cookie wall blocked fetch. Abstract text captured from
  search result only; treat its numbers (11 studies, "all groups attend
  less to RG messaging") as abstract-level, not verified in full text.
- `gambleaware.org/.../improving-safer-gambling-messaging...pdf` — report
  located via search (AI eye-tracking found GambleAware logo attention
  below the 5% cut-through threshold); PDF not fetched — flagged, not
  relied on for rules.
- Original 2006 F-pattern NN/g URL (`f-shaped-pattern-reading-web-content-discovered/`)
  and `banner-blindness-old-and-new/` (404) — superseded by items 1 and 4.
