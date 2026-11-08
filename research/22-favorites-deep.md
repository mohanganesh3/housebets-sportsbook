# B12 — Personalization/favorites deep-dive (wave B)

Sources: star/bell conventions (bet365/Stake/Sofascore/Flashscore/ESPN), Hard Rock
"For You", theScore follow-loop, Hooked investment phase, Zeigarnik, goal-gradient
+ full audit of our implementation. (web_search down; code findings HIGH.)

## The affordance language (industry-settled)

- **★ Star = memory** ("pin/bookmark for later") — correct, ours matches.
- **🔔 Bell = alert subscription** — the SEPARATE affordance we're missing
  (Sofascore/Flashscore canonical: star follows the entity, bell arms a match
  alert). Bells on live matches are meaningless — scheduled matches only.
- Hearts are social-media register — correctly absent in books.

## Bugs/gaps found in our build (verified file:line)

- `football.tsx:24` favs-tab omits team-follows while hub includes them —
  inconsistent predicate → shared `isFollowed` selector.
- `Shell.tsx:84` hardcoded `liveCount = 6` — stale-count pattern.
- `MatchRow.tsx:72` star `hidden sm:block` — flagship gesture invisible at 390px.
- No scheduled→live engine transition — countdowns hitting 0 do nothing (dead
  loop a judge WILL hit). Need `kickoff` event/scheduler + one reseeded match
  ~90-120s out or a ScenarioDock "Kickoff soon" button.
- Mobile Following tab lacks the gold count badge (rail has it).
- Search zero favorites-awareness (no boost, no ★, no empty-query follows group).
- Flat `follows: Set<string>` can't express provenance ("via Arsenal") or
  unstarring a via-match semantics → `Map<id,{kind,via?}>` schema v2.

## Hub anatomy (best-in-class ordering)

Live now → Upcoming by kickoff (with ticking countdown chips <60min + warning
accent <15min) → entity chips (management, secondary) → counts everywhere.
Finished matches must leave the hub (currently they pollute `mine`).
Provenance: directly-starred = filled star; inherited "via ★ Arsenal" caption;
unstarring a via-match shows hint, never silently unfollows the team.
Empty state upgrade: quick-pick seed chips ("Start with: Premier League ★ ·
Arsenal ★") — onboarding-picker pattern (DK/ESPN).

## Reminder model the prototype can honestly show

Bell on scheduled rows → armed = filled · hub "Reminders" strip · countdown chips
(`in 2h 58m` → `in 42:10` ticking <60min) → at kickoffAt: chip flips LIVE +
reminder toast + unseen-dot on Following nav (clears on visit) + document.title
option. Demos the entire notification value-prop without push permissions.
Engine must add `kickoff` events; reminders self-purge when match leaves scheduled.

## Integration points

- Search v2: empty query → "Your follows" + "Recent"; followed entities rank
  first with ★; mini-FollowStar per result row.
- Home FollowingStrip: countdown chips + bells + "via ★" captions; above fold 390.
- Match page: RemindBell beside FollowStar when scheduled; kickoff block gains
  ticking countdown.
- F2 "My markets": star on MarketCard headers → pinned first group — NOBODY does
  market-level pinning (differentiator: "the book that remembers I only bet totals").
- My bets bridge: gold ★ on open bets whose match is followed (optional).

## Anti-patterns

Notification spam → granular opt-ins only; permission-ask after first star, never
cold-open; never auto-follow from bets (suggest, label "because you bet them");
badge inflation via finished/inherited; toast-per-toggle → cap at 3/session;
hub duplicating home (hub owns memory+reminders); dead-end countdowns; aggressive
follow prompts → one dismissible inline hint.

## Theory (why it wins)

Follows = stored value (Hooked investment → next external trigger = kickoff
alert). Curated > algorithmic (zero resentment, self-evident provenance).
Zeigarnik: open bets + starred matches + armed reminders = three nested open
loops pulling returns. Goal-gradient countdowns. Endowment → switching cost.
Peak-end: reminder-fires-at-kickoff is a designed peak ("the app remembers").

## Derived task highlights (§R.B12)

follows Map schema + migration; reminders store + toggleReminder; shared
isFollowed selector (fixes football bug); mobile row star; RemindBell primitive;
CountdownChip primitive + shared 1s ticker; engine kickoff transition + reminder
toast + unseen-dot; reseed/Scenario "kickoff soon"; hub reorder + provenance +
finished-prune + quick-pick empty; mobile nav badge; search v2 (follows group +
recent + boost + row stars); home strip countdowns; match-page bell+countdown;
My markets pinning; one-time hint; primer toast; a11y/reduced-motion on chips;
QC additions (persist reload, countdown→LIVE+toast, via-unstar, empty→seed round
trip).
