# research/30-slop-audit-v4.md — AI-fingerprint audit, current build

Method: (A) fingerprint catalog built from live web research (design blogs,
Reddit r/webdev + r/vibecoding aggregations, X-linked design repos, two
published "anti-slop" rule packs), then (B) full source read of `src/` (all
components, routes, index.css) plus the qc/ + qc/v4/ screenshot set names.
Source is ground truth; screenshots corroborate.

Context: Mohan's verbatim rejection — *"generic, five-minute, AI-fingerprinted,
vibe-coded sportsbook: dark background, cyan accent, uniform rounded cards,
default icons, pill rows, the same layout every AI tool produces."* This file
drives the redesign. Severity is honest; do not grade on a curve.

---

## PART A — The fingerprint catalog (what judges have already seen 130×)

The meta-finding, stated identically by every source: AI UIs converge because
models output **the average of their training data**. A tell is "a default
nobody overrode." Judges don't analyze tells — they feel the sameness in ~2s.

| # | Tell | Why it fingerprints | Source |
|---|------|--------------------|--------|
| F1 | **Hue-shifting "AI" gradient** (indigo→violet→blue; also any 2-hue `bg-gradient-to-br` section fill used reflexively) | Tailwind-demo accent; "no light source produces it" | brandui.cloud/developers/anti-ai (AP-GRAD-01); uxskill.laithjunaidy.com (purple-to-blue-gradient, high) |
| F2 | **Cyan/neon accent on near-black navy** | Named explicitly: "`#0F172A` bg + `#38BDF8` cyan" = "dark mode AI slop"; forced dark-only is "~34% of AI pages, the #1 single tell" | docs.bswen.com/blog/2026-03-20-ai-generated-ui-anti-patterns; github.com/claudiusararu/unslop-ui-skill TELLS.md §2 |
| F3 | **Colored glow shadows / outer halos** on cells, buttons, bars, dots | "Light casts a shadow below, not a halo all round" — generator's way of saying 'premium' | brandui AP-GRAD-05; uxskill card-glow-purple-shadow |
| F4 | **Glassmorphism** — backdrop-blur semi-transparent panels, esp. under text | 2021 Dribbble trend generators still reach for; pulls text under contrast floor | brandui AP-GRAD-07; design.how quartz/no-glass; BSWEN "blur = premium" |
| F5 | **Uniform large radius** — same 10–16px rounding on cards, buttons, inputs, cells, toasts | "One radius applied to every piece of content" is the root-cause tell; `rounded-full` on everything = "radius decision skipped" | unslop TELLS.md root cause; brandui "Same large radius on every box"; uxskill pill-rounded-full |
| F6 | **Pill rows / chip walls** — horizontal scroll rows of rounded-full filter chips as primary nav | "Pills" is literally in the design.how slop definition; chip walls named as component tell | design.how/ai-slop-ui; brandui "Chip walls"; Mohan's rejection names "pill rows" |
| F7 | **Icon-in-tinted-tile** — glyph or monogram inside a colored rounded square/circle | "The most-generated component on earth" (h-12 w-12 rounded-lg bg-primary/10); "slop — JUST AS TRUE FOR LOGOS" | github.com/omarrns/de-slop-UI-Package; xiaohu.ai slop.md; layr.design icon containers |
| F8 | **Initials-in-circle avatars/badges** — 2-letter monograms on filled discs as identity stand-ins | Named verbatim "gradient-circle initials avatar… slop"; avatar-stack variant also flagged | xiaohu.ai slop.md; uxskill avatar-stack-overlapping |
| F9 | **Default icon library look** — same Lucide/Heroicon stroke icons for every concept | "One icon set and nothing else (Lucide) — 63% of 120 pages" | buildtolaunch.ai/p/fix-ai-slop-website-design |
| F10 | **Centered icon+title+hint empty state** and centered-everything composition | "Centered-everything and empty-space theater"; the one-icon empty state is the template's least-designed state | layr.design visual-slop §11; brandui "Everything centred"; layr interaction-slop |
| F11 | **Identical card grid / wall of same-size tiles** (incl. icon grids) | "Three equal cards… strongest layout fingerprint"; "walls of identical icon cards" | uxskill three-equal-card-grid; brandui "Walls of identical icon cards"; buildtolaunch #1 (63%) |
| F12 | **Template hero structure** — rotating carousel / featured card with dots + prev/next + big CTA | "The same layout every AI tool produces"; centered hero = "laziest hero composition" | uxskill centered-everything-hero; dev.to/leoniebuilds; samihedhli.com convergence |
| F13 | **Emoji as production UI icons** (flags, 🎮, 🌍) | "Emoji bullets and emoji headings" named rule; flag emoji also render as letters on Windows | brandui AP list; layr.design decorative icons |
| F14 | **Scroll fade-up on everything** / mount fade-y on static content | "Every section fading up as you scroll" = 51% of AI pages | buildtolaunch.ai #8; brandui "Everything fades up on scroll"; unslop motion §5 |
| F15 | **Middle-dot chains** "a · b · c · d" as separator grammar | Named lint: "a middle dot between facts wraps mid-fact" — the generator's favorite list separator | design.how quartz/no-dot-separator |
| F16 | **AI copy tics** — em-dash addiction, "·" lists, hedged disclaimers repeated per-screen, "sample data" said 8× | "Em-dash addiction: a human uses two or three per piece, max"; apology-repetition reads generated, not designed | gtmskills.com anti-ai-slop-writing; layr copy-slop §9 |
| F17 | **Tracked-caps eyebrow/kicker labels** above sections | "Uppercase eyebrow over every section — fix: none by default" | unslop TELLS.md §1; brandui "Mono or tracked caps kicker" |
| F18 | **Fabricated social proof** — fake chat/testimonial rows as decor | "Placeholder testimonials" + "avatar stack" rules; seeded fake chatter is the same reflex | brandui AP trust section |
| F19 | **The sportsbook-category uniform**: dark + neon accent + featured-match hero + bonus widget — every AI sportsbook entry lands here by default | "Cover the logos — most people cannot tell them apart" | cornersports.io/insights/why-sportsbooks-all-look-the-same |
| F20 | **Debug/demo furniture left in the product** (scenario dock, tour buttons, "State tourer") | Builder leftover = "template and builder leftovers" tell; also advertises that the thing is a demo | brandui "Template and builder leftovers" |

Big-name corroboration for the whole framing: shadcn-default kit + Inter +
indigo = "the uniform" (styles.gallery/blog/why-ai-built-sites-look-the-same,
2.5% top concrete cause on Reddit data via
github.com/iamneilroberts/claude-skills unslop-ui SKILL.md — 3,033 comments
mined); "the first three [shadcn look, AI purple, gradients] account for most
of the 'this looks AI' reaction."

---

## PART B — Audit of the current build

First, what's already **not** slop (do not redesign these — they're our moat):
- Real heraldic crest system (`lib/crests.ts` 5 silhouettes, field ops, charges,
  S/M/L tiers; `Crest.tsx`) — kills the initials-disc tell at team level.
- Hand-drawn sport glyphs at Lucide grammar (`SportGlyph.tsx`) + HouseGlyph +
  Housebets wordmark + Hubie cameo — icon-set identity is ours.
- Brand-true tokens verbatim from housebets.com, `Figtree/Oxanium/Red Hat
  Display` self-hosted, `tnum` channel, pale-cyan `#c4f4f1` CTA (not neon fill).
- Tick up/down flash channel, sheet physics, honest scenario/terminal states.
- No Inter, no purple, no gradient text, no mesh/aurora, no icon-feature-card
  marketing grid, no testimonials, no logo marquee. Clean on those rules.

Now the hits. Format: **tell | where it lives | why it reads AI | replacement
direction (Housebets-rooted)**. Priority = template-feel killed per effort.

### 🔴 P0 — the "five-minute vibe-code" layer (what Mohan named, verbatim)

**H1. Uniform `rounded-xl` card-box architecture — the whole app is rounded
rectangles on navy** | `MatchRow.tsx:195` LeagueSection card, `:60-61` row,
`index.tsx:295` FeaturedCard, `match.$matchId.tsx:66` MarketCard, `:285`
scoreboard, `BetSlip.tsx:90` SlipItem, `MyBets.tsx:127` BetCard, `bets.tsx:39`
page card, `Shell.tsx` sheets/modals/toasts — `--radius-card:12px` +
`rounded-xl` is the default unit of ~every container (F5+F11). | One radius +
one "bordered surface" recipe applied to every kind of content is the literal
root-cause tell (unslop: "one card recipe… applied to every piece of content").
Rows inside cards inside a centered 860px column reads as generated feed, not
a priced board. | **Make the coupon a list, not a card stack.** Housebets is a
dense league book: league sections become hairline-separated open regions
(header row + `border-y` rule, no enclosing card), match rows sit directly on
`bg-primary` with `border-b` separators — the terminal-density read from
synthesis-v3 §2. Reserve real card chrome for exactly two objects: the hero
and the bet slip. Radius scale gets a job: 6px data cells, 8px buttons, 12px
hero/slip only.

**H2. Pill rows as the nav grammar** | `index.tsx:33-52` PILLS + `:528-567`
pill row, `football.tsx:118-144` comp rail, `:152-191` segmented+favs pills,
`match.$matchId.tsx:227-280` breadcrumb pills, `:475-549` market-group pills,
`live.tsx:42-75` filter pills, `index.tsx:380-407` fav chips,
`Overlays.tsx:215-226` recent chips — 51 `rounded-full` sites (F6). | Eight
different horizontal pill strips in one product; "pill rows" is in the
rejection itself and in the design.how slop definition. | One control grammar:
**square-shouldered segmented tabs** (Housebets' own `interactive-tab-bg`
#09667d26 segmented containers, research/03 §38) for sport/market/bet
filters; breadcrumbs become a plain `Home / Football / Arsenal v Brighton`
text path, no bordered pills (real books do this); fav chips keep
`rounded-full` ONLY as removable tokens (the one legitimate pill); league rail
→ typographic list with crest-adjacent league marks.

**H3. Icon chips + initials discs everywhere** | `MatchRow.tsx:206-208`
league monogram `rounded-md bg-secondary-a30` tile; `index.tsx:490-526`
mobile 4×2 **icon-in-bordered-tile sport grid**; `Overlays.tsx:242-244`
comp monogram tile, `:310-316` **player initials circle**;
`Shell.tsx:93-95` + `BetSlip.tsx:63-68` USDT "T"-in-green-circle;
`LiveBadge` dot (F7+F8+F11). | Icon-in-tinted-square + initials-in-circle are
two of the most quoted tells; the mobile sport grid is a literal "wall of
identical icon cards." | League identity → drawn league-badge marks (extend
the crest grammar to competitions — FA-lion/UCL-starball-echo abstractions,
not "PL" text tiles); sport grid → sport-glyph + name list rows (density, not
tiles); player results → shirt-number chip or position tag; USDT → real
Tether ₮-glyph path (draw it once in assets), not a letter on a disc.

**H4. Emoji flags in league headers** | `seed.ts:1340-1352` `countryFlag` →
🇬🇧🇪🇺🇪🇸… `MatchRow.tsx:203-205` renders raw emoji (F13). | Emoji-as-UI-icon is a
named tell AND flag emoji degrade to "GB"/"EU" letters on Windows — a broken
tell, the worst kind. | Kill the flag column entirely (competition badge from
H3 does the work) or draw 3px-ratio flag tiles as SVG if a country cue is
kept. `🎮`/🌍 fallbacks die with it.

**H5. Glow-halo shadow language** | `primitives.tsx:151` selected cell
`0_0_14px_#c4f4f133`; `Shell.tsx:528` slip-bar `0_0_20px_#02f8f822`;
`BetSlip.tsx:527` Place-bet `0_0_20px_#c4f4f12e`; `primitives.tsx:32`
live-dot `0_0_6px_#f41f50`; index.css suspend/flash `0 0 12-16px` halos;
`Crest.tsx:207` drop-shadow (F3). | Centered saturated glow = the
"generator premium" signature. We're the cyan-on-navy suspect already; halos
confirm the read. | Light from above, shadow below: replace outer glows with
`0 1px 0` top-inset hairlines + small `0_4px_12px_rgba(0,0,0,.4)` drops. Keep
exactly ONE halo budget: the placed-bet CTA while `ready`. Tick/suspend
communication stays but as **inset edge** (already have inset ring variant —
use it), not bloom.

**H6. Template hero: auto-rotating featured carousel** | `index.tsx:131-289`
HeroSpotlight — interval slideshow, dot controls `:239-251`, prev/next/pause
buttons, `AnimatePresence` x-slide, gradient card `:161` (F12+F19). | A
slideshow with dots is "the layout every AI tool produces"; the cornersports
sportsbook-uniform tell is precisely *featured match + dark + accent*. |
Replace the carousel with **one editorial "Match of the day" panel**: the
brand fact is the illustrated-crowd hero — compose the wave/roofline motif +
grain INTO a full-bleed illustrated crowd scene (SVG, our grammar) behind one
match, score + 1X2 + kickoff, no rotation, no dots. Rotation → a static
"house picks" rail if 4 matches need featuring. The hero must look
commissioned, not cycled.

### 🟠 P1 — the texture that confirms the verdict on inspection

**H7. Cyan-on-navy reading as "AI dark mode"** | brand-300/400/500 text and
fills on `#041015`/`#0b1920` throughout (F2). | BSWEN names this exact pair
(cyan `#38BDF8` on `#0F172A`) as AI slop; forced-dark is the #1 single tell.
**Defensible in our case** — it's Housebets' literal palette — but the current
spread of neon `#02f8f8` + cyan text beyond functional uses keeps us inside
the fingerprint. | Enforce the brand rule harder: neon `#02f8f8` ONLY on live
interactive/odds accents (it's `text-accent`, not text); body/labels shift to
`base-75 #d6dbe4`/`text-secondary`; pale `#c4f4f1` carries all primary
actions. The cover-the-logo test should read "Housebets," not "neon dark
dashboard."

**H8. Middle-dot chains as list grammar** | ~50+ visible `·` joins:
`Shell.tsx:376` chat header, `index.tsx:423` "Live at the House · real feed",
`:622` footer line "Prototype · sample data only · no real money · decimal
odds · singles only" (five facts, four dots), `BetSlip.tsx:394,588`, toasts
throughout (F15). | Quartz lints it by name; it's our single most repeated
typographic tic — every meta-line is the same dot string. | Give facts real
seats: footer line → 2 short sentences or a 3-column spec row; status/meta
lines → spaced flex items; keep `·` only inside true inline pairs
(`Pick @ price`).

**H9. Scroll-reveal + mount fade reflex** | `primitives.tsx:253-288` Reveal /
`reveal-rise` wraps EVERY LeagueSection (`MatchRow.tsx:194`);
`match.$matchId.tsx:556-563` market cards `initial y:10` on group switch;
`MyBets.tsx:125` BetCard `y:6` mount (F14). | "Everything fades up" is the
51%-of-pages tell; dense lists that animate-in on first scroll make the whole
app feel mounted-by-template. League lists should exist — they don't arrive.
| Delete Reveal from list chrome entirely (data renders, period). Keep
motion where it means something: sheet physics, tick flashes, score roll,
goal pulse. If a first-paint entrance is wanted, restrict to the hero only,
once.

**H10. Repetitive demo-disclaimer copy** | ~15 visible "sample data /
demo / prototype / no real money" strings across Shell (×7: chat header,
race modal, support sheet, casino sheet, deposit modal, aria-labels),
index.tsx:622, live.tsx:104, bets.tsx:49, __root.tsx:277-281, ChatBody
header, HouseFeed (F16). | One disclaimer is honest; a disclaimer per
surface is apology-speak that advertises "generated demo." Real products say
it once, in the footer. | Single canonical line in footer + ONE badge on the
balance chip (keep "Demo" there — it's the money-relevant place). Strip all
inline disclaimers elsewhere; rename "State tourer" to something in-world
("Demo states") and drop its subtitle line.

**H11. Tracked-caps eyebrow kickers** | `index.tsx:183` "PREMIER LEAGUE"
tracked caps in hero, `:304` FeaturedCard, `:365` "MATCH / MATCH RESULT"
header, `:422` "LIVE AT THE HOUSE", `following.tsx:70-118` four eyebrow
headers, `MyBets.tsx:440` thead caps (F17). | The kicker-above-heading is a
named tell; ours stacks an eyebrow AND an icon AND a count on most sections.
| Keep table headers (functional) and live-sport context labels; drop
eyebrows that restate what the H2 already says ("Live now · N" under
"Following" is redundant voice).

**H12. Glass reflex beyond chrome** | 14 `backdrop-blur` sites: topbar,
bottombar, slip bar `Shell.tsx:528`, ScenarioDock `:628`, toasts `:691`,
offline banner `__root.tsx:55`, search overlay `Overlays.tsx:173`, sticky tab
bar `match.$matchId.tsx:475` (F4). | Blur on chrome is defensible; blur as
the default material for every floating layer is the reflex. Sticky tab bar
+ slip bar carry CONTENT — that's the glass-on-text violation. | Solid
surfaces for content-bearing floats (slip bar, toasts, dock, tabs →
`surface-*` full-alpha). Keep blur only on true scrims/backdrops where it
protects legibility of the layer below, and even there prefer
`bg-black/60` alone.

**H13. ScenarioDock as visible builder furniture** | `Overlays.tsx:620-669`
— floating FlaskConical FAB mid-left-edge phone / floating right of panel on
desktop, "State tourer" panel (F20). | A dev-tools widget docked on the
product is a "builder leftover" tell; it also breaks the fourth wall for
judges mid-flow. | Keep the function (it's scored states) but demote the
furniture: entry via `?states` URL flag + a quiet "Demo states" row inside
the Menu sheet (already exists — `:635-644`) + ⌘K command. Remove the
persistent FAB entirely, or make it a far corner 24px dot with no icon.

### ⚪ P2 — smaller confirmations of the read

**H14. Fake chat content** | `Shell.tsx:358-419` six seeded chat lines
("Rico… that Arsenal press is suffocating") (F18). | Fabricated social proof;
also unreadable-as-real because it's labeled sample and read-only → pure
decor. | Either make it the honest "House feed" (real engine events already
exist — goals/suspensions with timestamps, `HouseFeed` does this!) or keep
but drop to a collapsed tab default. Prefer the feed: it's proof, not props.

**H15. Tracking/status-dot decoration** | `live-dot` pulse at
`primitives.tsx:32`, `following.tsx:91` `animate-pulse` dot (design.how
no-decorative-motion names animate-ping/pulse reflex). | A LIVE indicator is
domain-legitimate — borderline. Keep the live dot (it's information), but the
Following-page pulse is decoration → static.

**H16. Duplicate team branding redundancy** | `index.tsx:184-187`,
`FeaturedCard:305`, `match:289` hardcoded `competitionId === "epl" ?
"Premier League" : "Champions League"` strings instead of `compById`. | Not
a slop tell per se — but the two-league hardcode is how AI stubs look;
featured slides break silently for la-liga/serie-a fixtures. | Route through
`compById(...).name` — one line, kills a "hardcoded for the demo" smell.

**H17. Dead `.skeleton` CSS + shimmer keyframe shipped** | `index.css:271-274,
354-363` — zero `skeleton` references in tsx. | Dead template furniture in
the token file; SkeletonRows component was already removed. | Delete the
class + keyframe.

**H18. Segmented/tab visual noise** | three different tab recipes in one
shell: SidePanel top tabs (`Shell.tsx:320-350`), sheet segmented strip
(`:756-778`), bets page tabs (`bets.tsx:17-38`), market pills (`match:512`)
— four shapes for one concept. | Four answers to "selected tab" reads as
un-designed rather than four design decisions. | One tab component, one
selected language (the H2 segmented grammar), parameterized for
sheet/panel/page.

**H19. Footer** | `__root.tsx:200-286` — three-column "Sportsbook / Support /
Play responsibly" template footer. | It's the "template section order"
shape; ours at least has real links. Low impact. | Keep content, compress to
a two-line honest footer: nav row + disclaimer row + RG line. The 3-col
corporate footnote shape adds length without information on a 860px column.

**H20. Heading hierarchy whispers "generated"** | home h1 is `sr-only`
(`index.tsx:488`); visual top of page is a nav grid; `/bets` H1 is "Bet slip
& My bets" with a receipt icon. | AI builds routinely bury or skip the H1;
here the page has no designed title at all — the content just starts. | Give
each page a designed title zone (even a quiet one — sport name + date +
context line), not a marketing headline. Home can lead with "Football" +
date context the way real books do.

### Cross-cutting count for the record

| Tell | Status in build |
|---|---|
| Inter/system font, purple/indigo, gradient text, mesh/aurora, logo marquee, icon-feature-cards, testimonials, count-ups | **Absent — verified clean** |
| Hue-shifting gradient | Absent; but `bg-gradient-to-br/v` surface gradients on hero/scoreboard/cards (index:161,295; match:285) are tonal same-hue — keep but flatten to tokens |
| Rounded-full pills | **51 sites — P0** |
| `rounded-xl` containers | dominant radius — P0 |
| `backdrop-blur` | 14 sites — P1 |
| Outer glow shadows | 7+ sites — P0 |
| `·` separators | ~50 strings — P1 |
| Em-dashes in user copy | ~9 visible strings (Overlays:331, Shell:376,658,689, MyBets:207, BetSlip:386, root:81,104,109,119) — finish the v3 job |
| Emoji in UI | flag set + 🎮/🌍 — P0 |
| Initials discs | players + USDT + league monograms — P0 |
| Reveal-on-scroll | all league sections — P1 |
| Demo-disclaimer strings | ~15 sites — P1 |

---

## DERIVED ASK PROPOSALS (ranked, P0 first)

1. **Re-materialize the coupon**: league sections and match rows become
   hairline-separated list regions on `bg-primary` (border-b rows, no
   enclosing card, no Reveal). Card chrome survives only on hero + slip
   container. `[H1, P0]` — the single biggest template-feel kill.
2. **One control grammar**: replace all pill rows (sport nav, comp rail,
   market groups, live filters, breadcrumbs) with ONE segmented-tab component
   in Housebets' `interactive-tab-bg` square-shouldered style; breadcrumbs →
   text path. `[H2, P0]`
3. **Kill every icon chip + initials disc**: league marks via extended crest
   grammar; mobile sport grid → glyph+label list rows; USDT → drawn ₮ glyph;
   player initials → number/role chips. `[H3, P0]`
4. **Delete flag emoji** (`countryFlag`, 🎮, 🌍 fallbacks) — league badge
   carries the cue; SVG flag tiles only if a country column survives. `[H4, P0]`
5. **Halo audit**: remove all `0 0 Npx #cyan/pink` glows; keep one halo (armed
   Place-bet); convert tick/suspend signals to inset edges; crest drop-shadow
   → flat. `[H5, P0]`
6. **Retire the carousel**: single illustrated "Match of the day" hero —
   crowd scene built from the wave/roofline/grain grammar, static, editorial
   left block + price column; no dots/arrows/autoplay. `[H6, P0]`
7. **Enforce the neon budget**: `#02f8f8` confined to accents/odds/live
   states; labels/meta to `base-75`/`text-secondary`; pale-cyan owns all
   primary actions. Cover-the-logo test must read Housebets. `[H7, P0→P1]`
8. **De-dot the copy**: footer spec line → two sentences; status/meta `a · b
   · c` chains → flex-spaced items; `·` survives only inside `pick @ price`
   inline pairs. `[H8, P1]`
9. **Delete Reveal from list chrome**; motion budget stays on sheet physics,
   ticks, score roll, goal pulse. `[H9, P1]`
10. **One disclaimer, one place**: footer line + "Demo" on the balance chip;
    strip the ~15 inline disclaimers; ScenarioDock panel loses its subtitle.
    `[H10, P1]`
11. **Eyebrow diet**: drop kicker labels that restate section H2s
    (Following/FollowingStrip/HouseFeed); keep functional table headers +
    league context. `[H11, P1]`
12. **Solid floats**: slip bar, toasts, ScenarioDock, sticky tab bar → full-
    alpha surfaces; blur reserved for modal scrims only. `[H12, P1]`
13. **Hide the State tourer FAB**: trigger via `?states` param + Menu-sheet
    row + ⌘K command; delete the floating button. `[H13, P1]`
14. **Chat → House feed**: replace seeded chat with the real engine event
    feed (goals/suspensions/reopens already emitted) — proof over props.
    `[H14, P1]`
15. **Finish the em-dash pass**: ~9 visible strings remain → `·` in true
    pairs or split sentences. `[H16/F16, P2]`
16. **Competition name via `compById`** everywhere (hero, FeaturedCard) —
    kill the epl/ucl hardcode. `[H16, P2]`
17. **Delete dead CSS** `.skeleton` + `@keyframes shimmer`. `[H17, P2]`
18. **Unify tab recipes**: SidePanel / SlipSheet / bets page / market tabs →
    one component, one selected language. `[H18, P2]`
19. **Compress the footer** to nav-row + disclaimer + RG line; drop the 3-col
    corporate shape. `[H19, P2]`
20. **Designed page titles**: each route gets a quiet title zone (sport/league
    name + date context), removing the "content just starts" read. `[H20, P2]`
21. **Blind-test gate**: fresh-context subagent compares our 6 screens vs 3
    AI-sportsbook screens; pass = ours not picked as the template. Re-run
    after items 1–7 land. `[reset A5d, verification]`
22. **Radius/elevation token spec**: codify the new scale (6 cell / 8 control /
    12 hero+slip / full only true pills) into index.css tokens before rebuild —
    the reset process requires tokens before pixels. `[process, P0-blocker]`

*Non-negotiables preserved regardless of redesign:* settlement/FT/void/
offline/funds correctness, sheet physics, tick channel, crest grammar, brand
tokens/fonts, pale-cyan CTA, tnum. Those are the anti-slop assets, not the
problem.
