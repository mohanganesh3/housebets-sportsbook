---
name: housebets-craft
description: Mandatory taste rules for any UI, motion, copy or styling work on the Housebets sportsbook entry. Load before editing a component, token, animation, or screen; reject your own diff if it breaks a rule.
---

# Housebets Craft Rules (taste encoded for agents)

Source basis: Emil Kowalski "Agents with Taste" and "Great Animations"; Rauno Freiberg
"Invisible Details of Interaction Design"; RESET_PLAN.md. Rules marked (ours) are project
decisions and may be revised only in design/DECISIONS.md.

## 0. Gate before touching visuals
- No visual code for a screen unless its storyboard, tokens and element cards exist and passed critique.
- Values come from `src/styles/tokens.css` only. No raw hex/px/ms in components (0 and 1px hairlines excepted).
- Every technique answers: "what does the player get from this?" in one sentence, or it is removed.

## 1. The price is the product (ours)
- Odds, stakes, returns, balance, scores, clocks: tabular lining numerals, fixed-width cells, no layout
  shift on change. Decimal odds. Money in USDT with consistent precision.
- A price change shows direction three ways: glyph + color + motion. Never color alone.
- Suspended = locked in the SAME frame (0ms), with a reason label; the last price stays visible, dimmed.
- Returns are always visible beside the stake. Money never changes silently.

## 2. Motion (Kowalski, Freiberg)
- Responses are fast: usually under 300ms; feedback 100-150ms; nothing decorative over 400ms on a money path.
- Easing: entering/exiting -> ease-out; moving/morphing on screen -> ease-in-out; hover -> ease; constant motion -> linear.
- Enter from scale 0.95, never 0. Pressed buttons: scale 0.97 on :active. transform-origin at the trigger.
- Never animate keyboard-initiated actions. Pace by frequency: frequent = quiet and fast, rare = may carry personality.
- Every animation is interruptible and reversible mid-way; a new price supersedes the running tick.
- Spatial consistency: things come from somewhere and go somewhere (pick -> ticket -> My bets).
- Every effect has a reduced-motion twin that conveys the same state without movement.
- Banned on money paths: parallax, scroll-jacking/smooth-scroll libraries, WebGL, particles, confetti.

## 3. Interaction physics (Freiberg)
- Follow the finger during drags; respect release velocity; allow cancel mid-gesture.
- Hit areas at least 44x44 (extend with a pseudo-element when the visual is smaller).
- One primary action per state. Destructive actions smaller and farther than primary ones.

## 4. Anti-template (ours)
- Banned defaults: uniform rounded cards everywhere, gradient blobs, glassmorphism, initials-in-disc crests,
  default icon sets standing in for sport glyphs, centered one-icon empty states, emoji, pill rows as layout.
- Hierarchy comes from typography scale, alignment, rhythm and density, not from boxes and glows.
- Hubie appears only in empty/error moments, never as decoration.

## 5. Copy and honesty (ours)
- Short, specific, one voice. Errors say what happened, that money is safe, and the one recovery action.
- Wins: quiet glow under 3 seconds, no confetti. Losses: respectful, no "try again" bait.
- Sample data labelled honestly. No promos, boosts, free bets, accas, builders, outrights, trackers.

## 6. Self-rejection
- If a diff breaks any rule above, write the rejection in qc/BUGS.md, fix it, and re-verify before landing.
