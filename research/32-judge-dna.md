# research/32-judge-dna.md — The Judge: Ismael Bashagha's Housebets archive

Source (read in full 9 Nov): https://ismaelbashagha.com/archive/housebets/
Role: Founding Head of Design, Aug 2025 – Sept 2026. Left Oct 2026 — the contest
doubles as a hiring/direction funnel (see 28-verifications).

## How he works (method, in his own structure)

1. **Audit-first, system-second.** "I started by auditing the product as a system
   rather than a collection of pages. Six pages had six different approaches to
   spacing. Three sliders used three different interaction models." → he judges
   *consistency across surfaces*, not hero moments. Inconsistency is his #1 tell.
2. **Numbers name their source.** Every metric tile cites where it came from
   (PostHog event name, git query, Linear range). "The defensible design claim is
   the conversion rate, not the raw volume." → honest copy with provenance; he
   will distrust any unverifiable flourish.
3. **Failure paths are first-class.** "A further 379 used the decline path — it
   needed to exist." The bonus flow shipped *four terminal failure screens*.
   → empty/error/declined states are designed, not edge-cased.
4. **Edge-case teardown is obsessive.** Verbatim: "the hold tears down on keyup,
   blur, tab-hide, modal open and a rejected bet alike, because a keyup swallowed
   by a focus change would otherwise leave the loop firing with no key held."
   → equivalent for us: placement state must tear down on blur/tab-hide/modal;
   a tap swallowed mid-gesture must not leave the slip firing.
5. **Sequencing discipline.** "Bets chain on settle, never on a bare interval, so
   the engine is never asked to post a bet it is still resolving." → our engine
   tick + placement must serialize the same way (already do: placing flag).
6. **Motion is small and earned.** "a soft glow for under three seconds, no
   confetti spam. Small enough to survive a hundred rounds, big enough to feel
   like something happened." → our ≤400ms money-path cap + restrained glow is
   exactly his taste; anything louder loses him.
7. **Mobile is the product.** "56% of players are on mobile." His quality
   workstream names: bottom sheets, **iOS sheet cropping**, bottom-nav
   positioning, full-page chat, pinch-zoom, and "game loading from white flash
   to skeleton to branded splash." → skeletons + sheet behavior at 390px are
   personally his fixes; he'll check them first.
8. **AI-built is not a minus — generic is.** He merged 205 PRs built with
   agentic AI (Claude Code + Next.js); the team shrank 5→1 engineers. What he
   polices is pattern-consistency, not provenance. → craft signals (custom
   glyphs, crests, honest data) matter more than hand-coding claims.
9. **Friction named honestly.** "the honest cost of the multi-minute scan and
   the send-to-prove step" — he prints funnel drop-off in public. → our copy
   should name costs ("prices may move before confirmation") rather than hide.
10. **Global by default.** 20 locales incl. Arabic RTL, 156 countries. → at
    minimum: no en-only assumptions baked into layout that would embarrass an
    RTL or long-locale pass.

## The workstream ledger (what he's personally shipped — our checklist mirror)

- Design system: full surface audit → 45 shared components.
- Mobile & platform quality: mobile game layouts, pinch-zoom, bottom sheets,
  full-page chat, **bottom-nav positioning, iOS sheet cropping, skeleton →
  branded splash** (no white flash).
- House games: settle-chained bets, hold-to-burst, drag-to-paint with correct
  pointer capture, provably-fair modal, payout hero.
- Social: avatar system, reply-quote, message bumping, user info modal w/
  large-number handling, tipping flow.
- Signup: email-first, equal-prominence options, explicit 18+ consent,
  validation naming the missing condition.

## What this predicts about his scoring

| He will reward | He will punish |
|---|---|
| One component = one behavior everywhere | Same pattern built twice differently |
| Suspension/decline/empty states with art | Happy-path-only demos |
| Blur/tab-hide/modal teardown | Gestures that leak state |
| Honest labeled prices + sources | Unlabeled numbers, vanity metrics |
| Sub-3s restrained glow moments | Confetti, gratuitous motion |
| 390px sheet/skeleton/nav correctness | Desktop-first with mobile bolt-on |
| Named friction ("may suspend") | Hidden costs |
| Sample data that behaves like a book | Duplicated lines, fake winners |

## Derived tasks → 10-master-asks

- Placement teardown matrix: verify cancel on blur, visibilitychange,
  sheet-close and route-change mid-"placing".
- Four terminal slip states designed (rejected, suspended-mid-place, offline,
  insufficient funds) — mirrors his four failure screens.
- Skeleton → branded splash on first paint (his named fix).
- iOS sheet cropping check + bottom-nav positioning audit at 390/430.
- Every metric/number in UI copy gets an implied source or is removed.
- One-behavior-one-component sweep: sport pills, empty states, buttons.
