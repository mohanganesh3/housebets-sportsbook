# 70 — User Problems taxonomy (verbatim-sourced, wave C)

Real human feedback mined for the 5-page build: **Sports home, Live in-play,
Football league page, Match page, Bet slip + My bets.**

**Method & honesty.** Sources were opened with a web fetcher + search index.
- ✅ **Fetched directly** (quotes verified on-page): App Store review pages
  (bet365 AU, Paddy Power GB), justuseapp DraftKings, smartcustomer DraftKings,
  bitcointalk threads (Sportsbet.io, Shuffle, crypto-books WC26), knowyourbookie
  Shuffle, dimesvault, parlaytools, cryptodaily RG comparison.
- ⚠️ **Blocked / degraded** (403 / login / binary): trustpilot.com (all paths),
  pissedconsumer (returned binary), stakecommunity.com, reddit (all mirrors 403),
  boards.ie, askgamblers, sportbotai, footballbettingblog, casinosincanada,
  rg.org, betting.net, tipstercompetition, betbuzzfeed, newusabettingsites.
  For these, quotes come from the search index's capture of the same URL —
  marked **(via index)** and treated with lower confidence. Reddit itself =
  **UNKNOWN**: every fetch attempt returned 403; Reddit sentiment appears only
  via secondary aggregators.
- Signal: **repeated** = same theme across ≥2 independent sources/apps;
  **some** = multiple reports, one app/source; **one-off** = single report.

---

## 1. Bet slip — odds movement, stake input, dead submits

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Live odds move during confirm → bet rejected in a loop | "odds in livebetting change so often that it is almost impossible to get a bet placed. I takes me 5 tries often, or even more." | https://bitcointalk.org/index.php?topic=1458034.6680 | Sportsbet.io (crypto) | repeated | Slip, Live |
| "Accept all odds changes" toggle doesn't work / is confusing | "I have this turned on in my account and it still does not accept odds changes. Am I the only one having problems with this?" | https://bitcointalk.org/index.php?topic=1458034.6680 | Sportsbet.io | repeated (3+ posters confirm) | Slip |
| Line moved twice mid-submit → rejected | "the line changed twice as I was attempting to finalize my bet, and it was rejected as a result" (went through 3rd try) | https://dimesvault.com/blogs/strategy/why-does-my-live-bet-keep-getting-rejected | FanDuel | repeated | Slip, Live |
| Default setting forces manual confirm of every change | "The system by default requires the player to acknowledge all odds changes" — BetMGM rules; theScore: declined changes mean "your bet(s) will remain unplaced in your betslip" | https://dimesvault.com/blogs/strategy/why-does-my-live-bet-keep-getting-rejected | BetMGM, theScore | repeated | Slip |
| Fat-finger stake, no undo — X button *submitted* $1,008 | "Instead of hitting 3 0, I accidentally hit the +100 above the 3, and the 8 instead of the 0. Realizing this wasn't right I went to delete the number but when I tried hitting the X, it entered the bet anyway. The ticket was for $1,008." | https://justuseapp.com/en/app/1375031369/draftkings-sportsbook-casino/reviews | DraftKings | some | Slip |
| Slip hangs on "processing", odds gone by retry | "once placing a bet the processing wheel doesn't move and is stuck! Not only does this mean I have to logout and back on again constantly, but I then miss good odds" | https://apps.apple.com/au/app/bet365-sports-betting/id519684662?see-all=reviews | bet365 | repeated | Slip |
| Bet limit invisible until you try to stake | "There is no indication of a limit until you put bet in. Have also found that when trying to put in wager, application will crash and when you go back in, odds have changed." | https://pregame.com/pregame-forums/f/sportsbooks/1730620/draftkings-online (via index — fetch not attempted, snippet from search) | DraftKings | some | Slip |
| Slip wiped exactly when user wanted to act | "the moment I opened the app to cash out, SportyBet suddenly wiped my entire bet slip from the screen and kept showing: 'Sorry, something went wrong. Try again later.'" | https://ca.trustpilot.com/review/sportybet.com (via index — fetch 403) | SportyBet | one-off (extreme) | Slip, Live |
| Slip won't load at the cash-out moment | "Missed a solid cashout window because the slip wouldn't load in time." | https://stakecommunity.com/topic/213971-the-website-is-lagging/ (via index — fetch 403) | Stake | some | Slip, Live |
| Pending ≠ placed: users don't know if bet exists | "pressing 'Place bet' is a request, not necessarily confirmation… The accepted betting acknowledgement—not a screenshot of the earlier odds—is the record of the wager" | https://parlaytools.com/articles/live-betting-market-suspended-bet-slip/ | all books | repeated | Slip, My bets |

## 2. Suspended markets — mystery locks, dead buttons

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Selections locked for no visible reason while rivals stay open | "I find that other betting sites still maintain the selections, while Paddy Power suddenly disables the bets. No particularly obvious reason as the match is progressing fine." | https://www.boards.ie/discussion/2057901454/ (via index — fetch 403) | Paddy Power | some | Match, Live |
| Bet stuck "suspended because something is happening" when nothing is | "There has been times my bet has been stuck on suspended because 'something is happening' even when there's 20 minutes to go, there nothing going on" | https://apps.apple.com/gb/app/paddy-power-sports-betting/id382030091?see-all=reviews | Paddy Power | some | Live, My bets |
| Locks at exactly high-stakes moments (penalties, timeouts) | Stake "often locks odds unexpectedly during high-stakes moments such as penalty kicks or timeouts, which can disrupt a bettor's timing" | https://www.ainvest.com/news/spartans-outperforms-stake-betano-live-sports-betting-reliability-multi-sport-consistency-2507/ (via index) | Stake | some | Live, Match |
| Books can suspend for literally no stated reason | DraftKings "reserves the right to suspend and/or remove any markets at any time, in its sole and absolute discretion, for any reason or no reason" | https://parlaytools.com/articles/live-betting-market-suspended-bet-slip/ | DraftKings | repeated (rules-level) | Live, Match |
| Suspended ⇒ bet impossible AND cash-out gone | "While a market is suspended, 'wagers cannot be placed and cashout may not be available' (Caesars)" | https://parlaytools.com/articles/live-betting-market-suspended-bet-slip/ | Caesars/all | repeated | Live, Slip |
| Suspended market still *shows* odds → looks bettable | "A suspended market may still display odds while refusing new tickets." | https://bettimes.io/news/in-play-betting-delays-market-suspensions (via index) | generic | some | Match, Live |

## 3. Cash-out — the #1 betrayal surface

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| CO button offered, then freezes/does nothing when tapped | "I was offered a payout today of $3400 to cash out on my multi try'd doing it and the app kept freezing every time I pressed on cash out it would make a clicking sound… but not actually doing it" | https://apps.apple.com/au/app/bet365-sports-betting/id519684662?see-all=reviews | bet365 | repeated | My bets |
| CO errors out for the whole match | "For the whole game there was an issue with the cash out due to an 'error'. The bet ended up losing, but I got no option for a cash out… Basically I got shafted" | https://apps.apple.com/gb/app/paddy-power-sports-betting/id382030091?see-all=reviews | Paddy Power | some | My bets |
| CO disappears exactly when valuable | "Seems like if theres ever a time you could cash out your bet, for some reason something will happen and it wont allow you to. From what I've read from other reviews this isnt an isolated incident." | https://apps.apple.com/gb/app/paddy-power-sports-betting/id382030091?see-all=reviews | Paddy Power | repeated | My bets |
| CO never offered on an almost-won parlay | "Today I had 12 of 15 parley not once offered cash out feature." | https://www.smartcustomer.com/reviews/draftkings.com | DraftKings | repeated (≈65% of CO complaints are parlays per index aggregation) | My bets |
| Offer vanishes / re-prices after suspension | "the £50 offer you had a moment ago is gone, and when the market reopens the new figure could be £30 or £80, depending on what happened. You can't lock the old one in." | https://tipstercompetition.com/article/what-happens-when-betting-market-suspends-complete-guide (via index — fetch failed) | generic | repeated | My bets, Live |
| Token CO offer after long unavailability | "cashout was still 'Unavailable' until the match got to 91 minutes, and then SportyBet offered me ₦7 to 0 cashout on a ticket that was almost fully won." | https://ca.trustpilot.com/review/sportybet.com (via index) | SportyBet | one-off (extreme) | My bets |
| Sitewide outage kills CO at the worst moment | UCL outage: "punters unable to access the firm's cash out feature" for ~30 min while scores changed | https://www.footballbettingblog.co.uk/2025/01/fury-as-bet365-outage-leaves-punters-unable-to-cash-out-their-champions-league-bets/ (via index — fetch failed) | bet365 | some (event) | Live, My bets |
| CO eligibility not marked anywhere; no partial CO | Improvement areas named: "indicating which betting markets have cash-out functions and implementing partial cash-out functionality" | https://betbuzzfeed.com/en/unable-to-withdraw-funds-reasons-preventing-cashout-at-draftkings-and-fanduel/ (via index) | DraftKings | repeated | Match, My bets |
| Request rejected if odds move mid-processing | "Your request to Cash Out is not guaranteed to be accepted and may be unsuccessful if, for example, the market suspends or the odds move before your request has been processed." | https://www.fanduel.com/fanduel-sportsbook-house-rules-wy (via index) | FanDuel | repeated (rules) | My bets |

## 4. Live in-play — speed, lag, stale prices

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| ~20s acceptance delay makes live bets pointless | "every time I try to place a bet on any live sport it takes around 18 to 20 seconds for my bet to be accepted. The odds, momentum and context of bet can change in ONE second, imagine in 20 seconds." | https://stakecommunity.com/topic/111253-absurd-delay-in-sports-live-betting-20-seconds-to-bet-be-accepted/ (via index — fetch 403) | Stake | repeated | Live, Slip |
| Users abandon live betting over change-loop | "sometimes it makes me upset bet in live betting match. so now I prefer to make a bet on a pre-live match." | https://bitcointalk.org/index.php?topic=1458034.6680 | Sportsbet.io | some | Live |
| Submission far slower than rival = real money lost | "this app takes 6-8 times longer to submit a bet than FanDuel. This, obviously, occurs at the expense of the bettor." | https://justuseapp.com/en/app/1375031369/draftkings-sportsbook-casino/reviews | DraftKings | some | Live, Slip |
| Scores/odds stale vs real game | "They will delay your cash out feature and also change keep the same odds posted even though the scores have changed." | https://www.smartcustomer.com/reviews/draftkings.com | DraftKings | some | Live, Match |
| Live line sits on screen after game state moved | "You'll occasionally see a line stay on the screen for two or three seconds after the underlying game state has changed… a real gap that experienced live bettors notice quickly." | https://propsbot.ai/espn-bet-review/ (via index) | ESPN Bet | some | Live, Match |
| Stake UI lag worse than rivals | "Stake is fine too, but their UI lag is worse and vig is far higher in comparison." | https://bitcointalk.org/index.php?topic=5582203.0 | Stake | some | Live |
| Live bet tracking broken; users screenshot bets | "I can never track any of my live events always an error loading, asking to refresh, etc. I literally have to take a screen shot of my bets so I can follow along live." | https://www.trustpilot.com/review/draftkings.com (via index — fetch 403) | DraftKings | some | My bets, Live |
| Crypto lag traded against KYC fear | "live odds can definitely lag during high-traffic matches. for world cup betting i'd probably take that lag over dealing with unexpected document checks" | https://bitcointalk.org/index.php?topic=5582203.0 | sportbet.one/crypto | some | Live |

## 5. Settlement & grading — disputes, voids, reversals

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Wrong grading vs official stats (shots on target) | "I saw they graded it as a loss. I went and checked five different reputable soccer stat sites, which all showed that i should have won… The screenshots i attached clearly show 2 shots on target, they claim there was 1." | https://www.smartcustomer.com/reviews/draftkings.com | DraftKings | repeated | My bets |
| Same class of dispute at Stake (MLS stat feed) | "the statistics provider used by Stake does not count this goal; consequently, while I placed a bet on '2 shots on target,' the Stake platform only registers one. However, if you check the OFFICIAL MLS WEBSITE" | https://www.askgamblers.com/sports-betting/sportsbook-reviews/stake-sportsbook/complaints (via index — fetch failed) | Stake | repeated | My bets |
| Settled win reversed next day, money clawed back | "I had a bet settle as a win and I was given the winnings. The next day I realized this app had gone back and actually taken the money away." | https://justuseapp.com/en/app/1375031369/draftkings-sportsbook-casino/reviews | DraftKings | repeated | My bets |
| Multi settled early; legs voided → payout recomputed | "Sportsbook settled my bet early instead of allowing the remaining selections to be completed… the remaining two legs were simply voided… I received only $6.84 in winnings on a $28 stake" | https://www.trustpilot.com/review/stake.com (via index — fetch 403) | Stake | some | My bets, Slip |
| Void flagged only when bet is winning | "the bet on the Clippers' victory suddenly received the status of a refund… the bet was cancelled exactly when his team was confidently leading the game" (odds-provider "error window") | https://casinosincanada.com/content/stake-at-the-center-of-a-scandal-bettors-claim-illegal-cancellation-of-winning-bets/ (via index — fetch failed) | Stake | some | My bets |
| Voided *after* settle+verification, no evidence given | "Voiding settled winning bets after weeks of delay and extensive verification seriously damages that trust. At the end of the day, OP risked his own money, placed legitimate wagers, and won, Shuffle.com voided the bets and withheld his rightful winnings." | https://bitcointalk.org/index.php?topic=5579655.80 | Shuffle | repeated (crypto-wide theme) | My bets |
| Settled "won" bet never paid, then voided days later | "If bet25.com believed there was an odds error, they should have voided the bet instantly, not after 3 days. The bet was fully accepted, processed, and even shown as settled and paid." | https://bitcointalk.org/index.php?topic=5567079.0 (via index) | bet25 | some | My bets |
| Slow settlement vs competitors | "fails to settle bets within a normal time frame (approximate 4-5 times longer than FanDuel)" | https://justuseapp.com/en/app/1375031369/draftkings-sportsbook-casino/reviews | DraftKings | some | My bets |

## 6. My bets / bet history

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Bet literally vanished from every list; history won't load | "it literally dissapeared from my account, its not under settled bets nor unsettled bets and when i try to load bet history the page can not load" | https://bet365.pissedconsumer.com/review.html (via index — fetch returned binary) | bet365 | some | My bets |
| History split/lost after app upgrade; CO button gone on old bets | "Bets that were placed before we started our upgrade have been moved to a separate tab… The Cash Out button is not available on these older bets" | https://support.skybet.com/app/answers/detail/skybet-faqs (via index) | Sky Bet | some | My bets |
| Getting full history/P&L requires spreadsheets or email | Only one book made export easy; Caesars "must email you the statement" for net P&L | https://www.daily25.com/how-hard-can-it-be-to-get-your-bet-history-from-a-bookmaker-introducing-smartbet/ (via index) | multi | some | My bets |

## 7. Navigation & information density

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Redesign made nav worse; laggy sub-menus | "It is so hard to navigate and is full of bugs… the lag time time on page refresh of sub menus is ridiculous. DId you actually consult any of your users before going ahead with this?" | https://apps.apple.com/au/app/bet365-sports-betting/id519684662?see-all=reviews | bet365 | repeated | All |
| Too many clicks to the market; spinner-heavy | "It takes too many clicks to reach the market you want. You often get spinning circles as it often is very slow." | https://forum.betangel.com/viewtopic.php?t=24108 (via index) | Betdaq | some | All |
| Losing your place when browsing away and back | "if you go to a particular race on the app then browse elsewhere when you come back to the pp page instead of getting straight into it you have to go through all the rigmarole to get back into the same page" | https://apps.apple.com/gb/app/paddy-power-sports-betting/id382030091?see-all=reviews | Paddy Power | some | All |
| Phantom logged-out state blocks the bet | "it tells me to log in first to do the bet and although I was logged in I have to log myself out and then log back in before it will accept my bet" | https://apps.apple.com/gb/app/paddy-power-sports-betting/id382030091?see-all=reviews | Paddy Power | some | Slip |
| Big-name apps feel a decade old | Apps that feel like they were "designed in 2010," slow menus, clunky navigation, and live bets that fail to submit at the worst moment (r/sportsbetting aggregation) | https://www.sportbotai.com/blog/best-betting-app-reddit (via index — fetch failed) | multi | repeated | All |
| Builder bricks after long composition | "constantly derps out and won't let you add legs after youve spent 10 minutes assembling a parlay. declines bets often" | https://rg.org/sportsbooks/review/pointsbet/pointsbet-user-reviews (via index) | PointsBet | some | Slip |
| Density overwhelms newcomers | "there is a lot to digest on the FanDuel app. There are a lot of buttons that may be distracting to new bettors" | https://www.si.com/betting/reviews/fanduel (via index) | FanDuel | some | Sports home |
| 7,000+ markets with no search = click fatigue | "the sheer volume of clicking to find our games, coupled with the lack of a searchbar and a slow-loading website" | https://www.offshoresportsbooks.com/jazz-sports/ (via index) | Jazz | some | League, Match |
| Search mixes real teams with e-sims | "El buscador mezcló el partido real con un encuentro de eFútbol de equipos similares" (search mixed the real match with a similar-name eFootball game) | https://rpp.pe/apuestas-deportivas/publirreportaje/stake-apuestas-deportivas-mercados-nuestra-opinion-peru-noticia-1716039 (via index) | Stake | some | Sports home |

## 8. Trust — hidden limits, KYC ambush, balance & RG

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Deposit instant, withdrawal "internal review" | "Depositing money was remarkably easy. Discovering whether DraftKings will actually give it back has been an entirely different experience." | https://www.smartcustomer.com/reviews/draftkings.com | DraftKings | repeated | Bet slip (wallet) |
| Deposit taken, then verification locks everything | "the app shoved a 'make a deposit' screen in my face… a pop-up demanded extra ID verification. Suddenly my cash was in limbo: no bets, no way to withdraw, and no 'cancel' button." | https://www.smartcustomer.com/reviews/draftkings.com | DraftKings | repeated | Slip |
| Winner stake-limits appear without warning | "a maximum stake below $1 on some selections and below $10 on non-1X2 markets at major matches" after a held $268 withdrawal | https://knowyourbookie.com/shuffle/ | Shuffle | repeated (crypto) | Slip |
| Post-win KYC escalation | "Suddenly my account banned and require KYC until higher level not only require document ID but also have submit proof address until bank book" | https://bitcointalk.org/index.php?topic=5582203.0 | Stake | repeated (crypto) | Slip |
| Balance doesn't refresh without gymnastics | "The refresh of Balance application is also non existent or not working and it takes forever your $ balance to refresh or update." | https://apps.apple.com/au/app/bet365-sports-betting/id519684662?see-all=reviews | bet365 | repeated | All (header) |
| Balance stale until you navigate home | "Your balance doesn't automatically update, you have to go to the home screen and then it updates." | https://forum.betangel.com/viewtopic.php?t=24108 (via index) | Betdaq | some | All |
| RG/limit tools buried deep in menus | "Reviewers note that limit tools hide deep in the menus" (BC.Game); Shuffle "requests go through support, which adds a step compared with in-account toggles" | https://cryptodaily.co.uk/2026/11/responsible-betting-tools-at-wallet-first-sportsbooks-15-crypto-books-compared-on-limits-cool-offs-and-self-exclusion | crypto books | repeated | All |
| Regulator had to *mandate* limit visibility | "Operators cannot bury the option or make it harder to find than other account settings" (UKGC deposit-limit rule) | https://www.gamblersbet.com/blog/uk-gambling-commission-gives-sportsbooks-until-september-to-add-deposit-limits (via index) | regulated books | repeated | All |
| Odds value quietly worse than rivals | "another bookmaker offered total odds of 14.42, while Stake offered only 12.03. This is not a one-off case — it happens regularly." | https://www.trustpilot.com/review/stake.com (via index) | Stake | some | League, Match |

## 9. Mobile & performance

| Problem | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| White screen of death after login, unusable for months | "It will work fine for a week or two then I get the white screen of death after login and that's it it's unusable for the next couple of months" | https://apps.apple.com/gb/app/paddy-power-sports-betting/id382030091?see-all=reviews | Paddy Power | some | All |
| Location verification fails → can't bet/deposit | "Location verification fails, blocking bets, deposits and pools"; "Repeated forced logouts and biometric login ignored"; 5.8% of 2,400 reviews describe the app failing | https://quashbugs.com/release-health/draftkings (via index) | DraftKings | repeated | Slip |
| Re-login on every app switch kills line-shopping | "it does get tiresome having to log in almost every time you switch to another app while line shopping or researching bets" | https://www.si.com/betting/reviews/fanduel (via index) | FanDuel | some | All |
| Battery drain / phone heat | iPhone users "claiming that when they use the app the battery goes down extremely quickly, and the back of the phone gets hot" | https://www.sportsmole.co.uk/online/bet365/app/ (via index) | bet365 | some | Live (heavy UI) |
| One-hand reality | "75% touch the screen with one thumb only… every point where you have to shuffle the handset is a moment where a price can move under an idle thumb" | https://www.onlinedesignteacher.com/2026/08/how-to-redraw-thumb-zone-for-betting.html (via index) | generic | repeated | All |

---

## Delights — what bettors actually praise (mirror these)

| Delight | Verbatim quote | Source | App | Signal | Our page |
|---|---|---|---|---|---|
| Cash out whenever you want + any stake size + watch the game | "you can cash out when ever you want. The best part is that you can bet as much as you want or as little as you want like 10 cent ect… The app also lets you watch your races and the games you bet on" | https://apps.apple.com/au/app/bet365-sports-betting/id519684662?see-all=reviews | bet365 | repeated | My bets, Live |
| Fastest in-play odds + live hub as central bottom-nav button | "Odds update faster in-play than any competitor I've used, and the live page — the central button in the bottom menu — surfaces everything currently running" | https://www.thatsagoal.com/bookmakers/bet365-review/app (via index) | bet365 | repeated | Live |
| My Bets tri-state + per-leg grading icons | "Open / Live / Settled" views; "a green tick… a red cross… a grey circle with a strikethrough" for voids | https://help.bet365.com/s/en/sports/bet-settlement (via index) | bet365 | repeated | My bets |
| Odds movement flashes red/green so you can track it | "You get a little red/green color flicker when something moves, which helps you track it. There's no awkward refresh lag" | https://www.betting.net/reviews/fanduel/ (via index — fetch failed) | FanDuel | repeated | Live, Match |
| Clear confirm step = no mystery | "The bet confirmation step was clear, so there was no mystery about what I was about to confirm." | https://www.betting.net/reviews/fanduel/ (via index) | FanDuel | some | Slip |
| Slip stays put while browsing | "Bet slip stays put while you keep browsing. Search works." | https://propsbot.ai/espn-bet-review/ (via index) | ESPN Bet | some | Slip |
| 2 taps to any market | "Getting around is easy, as you can find markets in two taps or fewer." | https://www.mlive.com/sports-betting/reviews/fanduel/ (via index) | FanDuel | repeated | All |
| Payout shows exactly what each bet type pays | "An intuitive bet slip will always reveal exactly how much money each bet type will payout based on your wager." | https://props.com/review/fanduel-sportsbook/ (via index) | FanDuel | some | Slip |
| Slip warnings for incompatible legs + odds-change controls + min-stake shown | "Los avisos cuando existen selecciones incompatibles. Las opciones del boleto para gestionar cambios de cuota. La apuesta mínima de S/1 mostrada directamente en la interfaz." | https://rpp.pe/apuestas-deportivas/publirreportaje/stake-apuestas-deportivas-mercados-nuestra-opinion-peru-noticia-1716039 (via index) | Stake | some | Slip |
| Push notifications that earn their place | "push notifications for goals, price boosts and your cash-out value are genuinely useful rather than spammy" | https://bettop.co.uk/betting-site/betting-apps/ (via index) | bet365 | some | My bets |
| Instant crypto withdrawals when no review | "Some customers describe receiving their funds within minutes" (same-wallet path) | https://knowyourbookie.com/shuffle/ | Shuffle | repeated | Slip (wallet) |
| Acca building by simple add-to-slip loop | "users just adding selections to their betslip until their wager is complete, setting the stake and confirming" | https://bettinglounge.co.uk/review/bet365/ (via index) | bet365 | repeated | Slip |
| Best-app consensus anchor | "FD probably has the best app" (Reddit aggregation) | https://www.sportbotai.com/blog/best-betting-app-reddit (via index) | FanDuel | repeated | All |
| Handles peak traffic | "platforms like stake are great for handling heavy traffic and usually have solid live odds" | https://bitcointalk.org/index.php?topic=5582203.0 | Stake | some | Live |

---

## Derived tasks — concrete design requirements for the build

1. **Odds-changed re-confirm.** If any slip leg's price moved since add, block
   placement and re-show the slip with old→new price per leg; never silently
   submit at a worse price. (§1 — universal #1 complaint)
2. **3-mode odds-change preference on the slip itself** (always ask / accept
   better only / accept any), persisted; default = "accept better only" so live
   bets don't die in confirm loops. Label what each mode does in plain words.
3. **Honest pending state.** Place Bet → determinate "Sending…" (with visible
   countdown if we emulate acceptance delay) → receipt OR explicit rejection
   with reason ("odds moved", "market suspended", "stake over limit"). A
   spinner with no resolution is the #1 rage pattern. Disable the button on
   first tap to prevent duplicate submissions.
4. **Suspension states with reasons.** Suspended selection = visibly locked,
   prices dimmed (not removed), and a reason chip where knowable
   ("Goal scored", "VAR check", "Timeout", "Repricing"). If we can't know, say
   "Suspended — betting paused", never a tappable dead button. Reopening flashes
   the new prices.
5. **Mark cash-out eligibility before the bet is placed** (badge on market +
   flag on slip leg), not discovered after staking.
6. **Cash-out is a live quote, not a button.** Show value ticking in My Bets;
   on tap → confirm sheet with current value; if the value moved or offer was
   withdrawn mid-request, show "Offer expired — new value: X" requiring
   re-confirmation. Never freeze into a dead click.
7. **Partial cash-out slider** (25/50/75% + custom) — the most-wished CO
   feature; show resulting remaining stake + locked return.
8. **CO-unavailable-with-reason state.** When suspended: "Cash out paused —
   market suspended" rather than a vanished or gray button with no context.
9. **Fat-finger-proof stake input.** Numeric keypad + quick chips; max-stake
   shown *before* typing ("Max: $X"); block-then-explain if stake > balance or
   > limit; confirm step totals (stake, odds, to-return) in big type. Deleting/
   clearing can never submit. Optional "confirm stakes over $N" guard.
10. **Per-selection min/max displayed on the slip** before input, not revealed
    by a post-tap rejection.
11. **Slip persistence.** Selections survive navigation, backgrounding and
    reload (sessionStorage); collapsed slip bar with leg count + combined odds
    always visible; selections verified still-valid on return with a
    revalidation sweep.
12. **One receipt = truth.** Every accepted bet gets ID, accepted odds,
    timestamp; My Bets links receipt↔bet↔match. Pending bets marked "awaiting
    confirmation", never ambiguous.
13. **My Bets tri-state** (Open / Live / Settled) with per-leg grading icons
    (tick/cross/void), cash-out value inline, settlement timestamp, and — for
    voids — the reason + stake-refund status. Settled view includes filters and
    a net P/L header; history exportable.
14. **Settlement transparency.** Settled bet shows the result basis (score,
    stat feed) + provider name; a "dispute this bet" affordance. No silent
    re-settlements: regraded bets get a visible change log.
15. **Live page latency honesty.** "Scores may be delayed" disclosure, odds
    flash green▲/red▼ on movement with direction arrows, suspension overlays
    that don't hide the last price, and fast reopen.
16. **Two-tap reachability.** Any league/match reachable in ≤2 taps from Sports
    home; persistent bottom nav (Sports / Live / My Bets / Wallet); search that
    matches teams AND markets, separating real teams from esports sims.
17. **Progressive density.** Home surfaces a small set of live/featured/
    next-up cards, not a wall of markets; league page groups markets
    (Main / Goals / Players / Corners…); market counts as scanning aids.
18. **Thumb-zone ergonomics.** Primary CTA + slip bar in lower-middle band;
    bottom-sheet markets; no critical action at top-edge on phones.
19. **Balance that's always live.** Header balance auto-refreshes on bet
    placement, settlement, deposit; split available vs in-open-bets; crypto
    books show fiat-equivalent under the crypto figure.
20. **Session continuity.** Stay logged in across app switches (biometric
    re-entry, not full re-login); browsing away and back restores exact scroll/
    market position.
21. **RG parity, not burial.** Deposit/loss limits, cool-off, self-exclusion as
    in-account toggles equally visible as the deposit button; session reality
    check; stake-entry nudge when stake >N% of balance.
22. **Limit & KYC transparency.** If the account is stake-capped, show the cap
    on the slip ("Your max on this market: $9"); verification states shown
    before deposit, not sprung after.
23. **Failure-proof My Bets.** Bet lists cached per-tab; if history fails,
    show a retryable error, never a silently empty screen (users assume the
    book ate the bet).
24. **Delight targets to copy:** red/green price flicker (FD), tri-state My
    Bets + grading icons (bet365), live hub as central nav button (bet365),
    clear confirm sheet (FD), incompatible-leg warnings (Stake), persistent
    slip-while-browsing (ESPN Bet), genuinely useful CO/goal notifications
    (bet365), instant crypto payout status visible (Shuffle happy path).

## Sources that were blocked (UNKNOWN) — what was tried

| Source | Tried | Result |
|---|---|---|
| trustpilot.com (Stake, DK, SportyBet pages) | direct webfetch, www + ca subdomains | 403 all; quotes captured via search-index text, marked (via index) |
| reddit.com / old.reddit.com (r/sportsbook, r/stake) | direct + old. mirror | 403 — Reddit sentiment only via aggregators (sportbotai, devinmehra) |
| stakecommunity.com (Stake official forum) | 2 threads direct | 403 — quotes via index |
| pissedconsumer.com/bet365 | direct | returned binary/gzip garbage — quotes via index |
| askgamblers.com | 2 pages | fetch failed — quotes via index |
| boards.ie, footballbettingblog, casinosincanada, sportbotai, rg.org, betting.net, tipstercompetition, betbuzzfeed, newusabettingsites, sportytrader | direct fetches | failed/403 — snippets via index |
