# Research Tree — Housebets reset (P1)

Root question: *What would make the Housebets design team say "this is the sportsbook we'd ship tomorrow", clearly better than every other entry?*

Created: 2026-11-09 ~23:2x IST (real `date` at each status change). Statuses: PLANNED / RUNNING / DONE / THIN→child / BLOCKED.

## Node status

| Node | Track | Agent ID | Status | Output files |
|---|---|---|---|---|
| T1 | Contest brief + wireframe inventory | `56c4be17` | DONE ~23:20 (live re-fetched: 131 entries, scorecard+ties+form verbatim, 12/12 wireframe md5 match) | research/00-contest-brief.md, research/wireframes/INVENTORY.md, research/32-judge-dna.md (verify) |
| T2 | Competitor teardown ×6 | `75a64c32` | DONE ~23:25 (6 sites; fetch-blocked→official docs/forums/Wayback; 22 asks) | research/teardown/<site>.md, research/42-teardown-table.md |
| T3.01–T3.12 | Books/sources, one reader each | — | PLANNED (wave 2, as limits allow) | research/books/<source>.md → research/50-rules.md |
| T4 | Attention & reach | `7a8e39ea` | RUNNING (launched ~00:12 IST) | research/51-attention-and-reach.md |
| T5 | Gambling psych + ethics | `818aa5fe` | DONE ~23:25 (ethics charter, UKGC refs, 2 code bugs flagged) | research/52-gambling-psych.md (ethics charter) |
| T6 | Colour | `b7d3cf68` | DONE — per-token table + 24 asks; error-500 AA fail on s2/s3; error/warn/gold collapse under CVD | research/53-colour.md |
| T7 | Type & space | `2b021b1f` | RUNNING | research/54-type-and-space.md |
| T8 | Motion | `a4ea688a` | RUNNING | research/55-motion.md |
| T9 | Library frontier | — | PARTIAL-seeded | research/25b-frontier-verified-2026-11-09.md done (lead); full research/25-library-frontier.md refresh in wave 2 |
| T10a | Reddit voices | `d1e24f38` | DONE ~23:25 (42 direct cites, 22 asks) | research/voices/reddit-v4.md |
| T10b | X + app-store/Trustpilot voices | `4e5e1f3a` | DONE ~23:25 (84 direct cites, 25 asks) | research/voices/x-reviews-v4.md |
| T11 | Pro references + rival forecast | `f3b7cfe9` | RUNNING | research/40-pro-references.md, research/41-rival-forecast.md, research/57-how-pros-work.md |
| T12 | AI-fingerprint audit | `e7c6a1ae` | DONE ~23:25 (20 tells, 20 hits file:line, P0-P2) | research/30-slop-audit-v4.md |
| SYN | Synthesis | lead | PLANNED (after hard stop 08:00) | research/60-master-plan.md |

## T3 reader nodes (wave 2 queue)

T3.03 Yablonski `4816331b` RUNNING · T3.01 Krug Don't Make Me Think · T3.02 Norman DOET · T3.03 Yablonski Laws of UX · T3.04 Weinschenk 100 Things ·
T3.05 Eyal Hooked (with critique) · T3.06 Kahneman TF&S · T3.07 Cialdini Influence · T3.08 Johnson Designing w/ Mind ·
T3.09 Schoger/Wathan Refactoring UI · T3.10 NN/g scanning articles · T3.11 Baymard checkout · T3.12 Erik Kennedy articles.

## Rules

- Agents write only their listed files; ask proposals go in-file under DERIVED ASK PROPOSALS — lead merges into qc/ASKS.md.
- Thin/gappy outputs spawn child agents (new IDs logged here).
- Prior research/*.md files are reference input, not post-reset evidence.
