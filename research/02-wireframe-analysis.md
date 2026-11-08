# Minimum-bar wireframe analysis (all 12 captured in `research/wireframes/`)

"Match them, then beat them." — this is the inventory we must match + the gaps we exploit.

## Shell anatomy (all wireframes)
- **Top bar (desktop ~72–80px)**: menu-toggle, Housebets logo (wordmark + wave), centered prize widget (Weekly Prize $50,000), rewards crown icon, search icon, side-panel toggle icon, Log In (dark pill), Register (light-cyan pill)
- **Left icon rail (desktop ~72px)**: vertical icon stack; active section gets a cyan left-edge bar + lit icon. Bottom of rail: support icon
- **Phone**: no rail → **bottom tab bar (67px)**: Menu | Sports(active) | Casino | Chat | Support(palm FAB)
- Content max-width ~1280px, padded

## Page 1 — Sports home (desktop)
- Search pill "Search teams, players or leagues" — full width, top of content
- Sport nav pills: **Home** (active) | **Live 13** (red live dot) | Soccer | Tennis | Basketball | Baseball | American Football | Esports
- **Favourites**: removable chips (★ Premier League ×, Arsenal ×)
- **Your matches · 3 matches**: card table; header "Match result"; rows = [status col: LIVE badge+52' or time+date] [crests+teams] [score] [3 odds cells name-over-price] [+115 › markets link]; one cell shows gold ★ (followed team's match)
- **Featured matches**: horizontal snap-scroll cards (league + status top row; crests+names+score; 3 odds cells)
- Upcoming events rows below
- **Phone variant**: sport nav = segmented icon-grid card (icon+label cells); "Your matches" becomes swipeable CARDS (status row: LIVE | 52' · Premi… | ☆ | +115 ›), Featured carousel with ‹ › arrows in header

## Page 2 — Live
- "‹ Live now" header (back chevron + title)
- Search bar
- Sport filter pills WITH COUNTS: All 13 | Soccer 6 | Tennis 3 | Basketball 1 | Baseball 1 | American Football 1 | Esports 1
- League group cards: "Premier League · 3 matches ★(gold=followed)" ... "View all ›"; each shows 3 live rows
- **SUSPENDED shown here**: whole odds area replaced by single cell with 🔒 "Suspended" in amber (Newcastle/Everton, Atletico/Sevilla)
- Clock formats seen: `52'`, `HT`, `58'`, `37'`, `49'`

## Page 3 — Football (labeled "Soccer" in UI)
- Breadcrumb pills: ‹ | **Soccer ▾** | "5 competitions · 6 live"
- Right controls: **Market selector** "≡ Market: Match result ▾" (changes which market the rows display!) + "All competitions ▾"
- Segmented: **Live & Upcoming 6** | All Soccer
- League groups identical to Live page (PL ★10, UCL 4, LaLiga 4, Serie A, Bundesliga)
- Mixed rows: live rows (LIVE badge+min) and scheduled rows (time + "Tue, Oct 20")
- Suspended row inside PL group

## Page 4 — Match page (ARS–BHA)
- Breadcrumb pills row: ‹ | Soccer ▾ | England ▾ | Premier League ▾ | **ARS – BHA ▾**
- **Scoreboard card**: centered "PREMIER LEAGUE" caption; left crest + "Arsenal" name; right "Brighton & Hove Albion" + crest; center boxed score `1 – 0`; under it "● LIVE 52'" (pink); ★ "Following" chip under Arsenal (left team is followed); "☆ Follow" text button right; ☆ icon top-right (follow match)
- Search bar variant: "Search markets or players"
- **Market group tabs**: Popular 10 | Goalscorers 9 | Goals 11 | Players 11 | Halves 8 | Handicaps 5 | Corners & cards 14 | Minutes 10 | Specials 7 | All markets 85 — pill tabs w/ counts, horizontal scroll
- **Market accordions**: "Match result" expanded (3 cells horizontal: name-left, price-right); "Double chance" (1.03/1.18/3.30); "Total goals" (Over 2.5 = 2.73 / Under 2.5 = 1.44)
- Phone: same, breadcrumb collapses to single "ARS – BHA ▾" pill; scoreboard stacks (crest-above-name both sides); cells become stacked name-over-price

## Page 5 — Bet slip + My bets (ONE page)
- **Desktop**: right **side panel ~330–360px** slides in; content compresses. Panel tabs: **Bet slip ❶ | My bets ❶ | Chat | ✕**
- Selection card in slip: "Arsenal | 1.30 | ×" / "Match result · Arsenal v Brigh… | 1–0 · 52'" (live context inline!) / stake input "$ 0.00" / "Returns —"
- Footer: "Total stake $0.00 ₮ | Payout $0.00 ₮" + full-width "Place bet" (disabled)
- "Singles · 1 selection | Clear all" header row
- **My bets full page** also exists: ‹ My bets | "1 open · 7 settled"; segmented Open(1)/Settled(7); filters All time|Today|Last 7 days|Last 30 days|Custom + "All sports ▾"; table: Placed | Bet | Odds | Stake | Returns | Result | ⌄ (expandable rows). Row shows live badge "●52' 1–0" in green/red chips
- **Phone**: two wireframes — **Slip bar**: cyan pill floating above tab bar "❶ Arsenal @ 1.30 | ⌃"; **Sheet open**: ~55% bottom sheet over dimmed match page, same tab bar (Bet slip/My bets/Chat/✕)

## What the wireframes LACK (= where we win)
- No motion spec: odds ticks, suspension transitions, sheet physics, add-to-slip flight
- Selected state shown (cyan fill + ✓) but no pressed/hover/focus nuance
- No odds-changed accept flow drawn (required by text, not drawn!)
- No failed-bet state drawn · no cash-out UI drawn (only mentioned) · no partial cash-out
- No skeletons/loading · no empty states drawn (Live empty → "Starting soon" mentioned only)
- No search results UX · no keyboard/shortcut affordances
- Icons are generic; no sport-icon system · team crests = real badges (we'll generate deterministic monogram crests)
- Right side panel only appears with slip open — no persistent ambient column
- No demo affordances for judges to trigger states
- Plain row hover; no press physics; no layout continuity between pages
- My bets table = static; no live ticking open-bet value, no cash-out button drawn

## Data model implied by wireframes + live widget
- Match: league{country flag+name}, home/away{name, crest}, score{h,a}, status{scheduled|live|suspended}, clock{min|HT|period}, marketCount(+N), followed flags (team/competition/match)
- Market group: name + count (Popular 10…All markets 85); markets accordioned
- Outcome cell: {name, price, state: idle|selected|suspended, dir: up|down}
- Bet: placed{date,time}, selection, match, live{min,score}, odds, stake, returns, result{open|won|lost|void}, cashout{value, state}
