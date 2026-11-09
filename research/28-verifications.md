# research/28-verifications.md — V1–V6 verification queue (live pass)

## V1 — Current UX specifics

- **Stake live-bet delay**: VERIFIED — users report 18–20s acceptance delays on live bets (tennis highest, late-match highest); pending state exists; pre-game ~instant. Exact "Placing bet…" copy unconfirmed.
- **Stake selected-cell style**: UNVERIFIED (check decks.optimizexl.com/app/stake or Mobbin).
- **Stake session-net in sportsbook**: no evidence — casino Live Stats only.
- **FanDuel collapsed pill "Pays X.XX"**: UNVERIFIED; sheet = "small summary → full modal" per Formation docs (ours shows `Pays N.NN` — defensible).
- **bet365 cash-out**: VERIFIED — live value shown on/near the button; partial CO = slider trading CO amount vs remaining stake; auto CO exists.

## V2 — Verbatim quotes (submission-grade)

**Housebets (Trustpilot 3.1★, polarized 69%/22%):**
- "The ad claims to be KYC-free. That's a lie. They asked for verification after my first bet." — UA, Sep 22 2025
- "After the first bet, the limits were lowered to 0." — Oleksandr, Sep 18 2025
- "they lie about bonuses" — Trustpilot Aug 2026

**BETBY books (Housebets runs BETBY — their own rules page):**
- "while it was being processed the odd changed from 1.5 to 2.15. Instead of getting a warning about the odd that had changed, they simply accepted the old and smaller odd (how convenient…)" — BC.Game user, bitcointalk
- "The frozen/delayed score made the match appear competitive when it was already decided" — bitcointalk

**Shuffle (Trustpilot):** "great sports odds, amazing UI, and easy to navigate tabs" · "The interface is clean and easy to use." (caution: TP flags a guidelines breach on the page)

## V3 — Hubie: VERIFIED — a SLOTH

"Hey there, I'm Hubie, your @housebets sloth companion" — @HousebetsHubie (AI-run X persona, lazy/deadpan). Top hat recurring, hammock, surfing. Games: Hubie's Road (lane-crosser, 99% RTP), Hubie Tiki Chop. Cameo rule: sloth + top hat at rest, rare, dry voice.

## V4 — Citations

- Hick–Hyman: Hick 1952 QJEP 4(1):11–26; Hyman 1953 JEP 45(3):188–196.
- Jakob's law: Nielsen "End of Web Design" (2000), nngroup.com.
- Sludge: Sunstein "Sludge Audits" BPP (2020 online/2022 print) + *Sludge* MIT Press 2021 (US subtitle "What Stops Us…").
- Machine zone: Schüll *Addiction by Design* (Princeton 2012) — Mollie quote verified.
- Scheibehenne 2010 JCR 37(3):409–425 — mean effect ~zero, context-dependent (cite as "unreliable", not "fake").

## V5 — US books

- BetRivers CO label = **"Buy Out"** (Buy-Out Now button w/ amount).
- Hard Rock **Flex Parlay** = pays on imperfect tickets (4/5), slider trades perfect payout vs partial, 4–10 legs.
- ESPN BET: mint green + PENN Play — **rebranded to theScore Bet Dec 1 2025** (cite as historical).

## V6 — Oxanium: NO tnum/lnum

Features: ccmp, kern, mark, **pnum only** (+ slashed zero). No tabular/lining figures → our `.tnum` class can't rely on `font-variant-numeric` for Oxanium. Options: accept proportional (small jitter) or swap numerals to a tnum-capable face. **Verify jitter in build — flag for QC.**

## Spot-checks

- housebets.com CTA #c4f4f1: UNVERIFIED via text; high confidence via prior DOM token dump.
- Real-site motion: "subtle animations" per Bauman case; game pages use animated webp. Bashagha found "three sliders with three interaction models" — internal-inconsistency evidence for submission note.
- Contest mechanics: $15K total, $9K winner, closes **14 Nov 2026 18:00 UTC** (extended); Contest Labs open prizes, 325 total entries across contests, 119+ on sportsbook.
- Sportsbook is BETBY-powered (their rules page) → BETBY complaints are directly our product's baseline.
- design-leadership gap: Theo Banner left Oct 2026 — contest doubles as hiring funnel.
