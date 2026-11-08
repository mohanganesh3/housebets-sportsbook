# Everything the user asked — expanded into a working requirements tree

Each explicit ask (A) expands into implied sub-asks (B) and self-imposed standards (C).

## A1 — Study the contest page end-to-end
- A1.1 Read every word of the brief; take every screenshot ✔ (done: contest page, rules tab, all 12 wireframes, live /sports desktop+mobile)
- B1: extract scorecard weights → allocate effort by points (Match+Slip = 40/100)
- B2: extract constraints (singles only, shell, 390/1440, sample data)
- B3: find starter files; if gated, reconstruct equivalent brand kit ✔ (done)
- B4: note submission mechanics (link, 3/day, big-idea field, tools disclosure)

## A2 — Wireframes are the BARE MINIMUM; exceed them
- A2.1 "Match them, then beat them" — every wireframe feature must exist AND be improved
- B1: inventory every element in all 12 wireframes (done — `02-wireframe-analysis.md`)
- B2: identify what the wireframes LACK (motion, states, polish, information design) → that's the beat-them space
- B3: "must not look like AI-graded stuff" → no generic component-library look, no default shadows/radii, no lorem-feeling data, no dead-end interactions

## A3 — See Stake, Shuffle & co; perform MORE than them
- A3.1 Benchmark competitor sportsbooks ✔ (Shuffle screenshotted; Stake/others via research corpus — `06-competitor-benchmark.md`)
- B1: match their conventions (Jakob's law: bettors expect 3-col layout, 1X2 cells, green▲/red▼)
- B2: beat their weaknesses (dead-button bet delay, buried cash-out, promo-banner noise, dropped slip selections)
- B3: stand out to judges in <60s — the "stands aside" requirement → signature differentiators list

## A4 — Gambling + UI/UX psychology study (subagents)
- A4.1 Button placement: what goes where and WHY
- A4.2 Eye-attraction areas: fixation order, F/Z patterns, peripheral detection
- A4.3 How to present gambling elements specifically (odds, live states, slip)
- B1: apply named principles with sources (Fitts, Hick, Miller, Jakob, Tesler, peak-end, Von Restorff, Hooked, Schüll, Kahneman…) → `04-psychology-playbook.md`
- B2: micro-interaction spec with timings ✔
- B3: anti-patterns + responsible-gambling maturity signals (casino-team judges notice) ✔

## A5 — Color psychology (audience-segmented)
- A5.1 What each color signals; how impression varies by age/user type
- B1: Housebets cyan-on-dark = tech/esports/night/trust for 18–35 crypto cohort — keep, budget ≤5–8% coverage ✔ `05-visual-spec.md`
- B2: semantic channel separation (cyan=brand/static, green/red=motion only, amber=suspend, gold=prize)
- B3: CVD-safe dual-coding (▲▼ + color), WCAG contrast on near-black

## A6 — Latest frontend (Nov 2025/2026), highest control possible
- B1: Vite 8 + React 19.3 + TanStack Router + Tailwind v4 + Base UI + Motion + Zustand (per `07-stack.md`)
- B2: tech serves UX, not the reverse — choose tools for control of every pixel/interaction
- B3: self-hosted brand fonts; seeded deterministic demo engine; `?scenario=` hooks to demo states

## A7 — User-first thinking
- A7.1 Who are the users? (18–35 crypto/esports bettor + casino generalist + JUDGES as meta-user)
- A7.2 Familiar-but-better: instant usability via conventions, then smoothness/polish
- A7.3 Mental map: one pass start→end must leave a clear picture (consistent geometry, predictable locations, peak-end moments)
- A7.4 Question EVERY placement: for each element — what does the user think/expect/want-next when clicking?

## A8 — Differentiation strategy
- A8.1 Everyone vibe-codes this → we do real product QC
- B1: state coverage as a designed showcase (suspended/changed/failed = 10 pts + trust core)
- B2: motion semantics (direction-aware odds ticks), signature odds cell, slip-as-hero
- B3: the "big idea" answer must be draftable into 80–800 chars

## A9 — Quality control regime
- A9.1 Storyboard everything before building
- A9.2 Recheck every button/animation 10–20×; reject any deviation from spec
- B1: QC checklist artifact (`QC.md`) — verify each state, each breakpoint, each motion
- B2: 390px AND 1440px verification passes, a11y + reduced-motion pass, performance pass

## A10 — Process
- A10.1 Tree-shaped work plan, one-by-one, subagents at scale ✔ (4 research agents run)
- A10.2 Don't summarize away detail — every line of the brief matters
- A10.3 Put in maximum effort; this is a $9k prize against ~119 entries

## Self-imposed additions (things the user didn't say but the ask implies)
- C1: deterministic sample data that looks real (real club names ok per wireframes; fictional player names)
- C2: demo-mode hooks so judges can SEE every scored state within seconds
- C3: a "why this feels like Housebets" rationale embedded in the entry note
- C4: deploy pipeline decided early (Vercel static SPA + redirects)
- C5: iterate — we get 3 submissions/day; ship v1 early, refine after
