# Visual Perception & Design-System Spec (research agent report)

**Brand:** neon cyan `#02F8F8` on near-black navy `#041015` · surfaces `#0B1920`/`#0E202A` · semantics green `#47D496`, red `#F41F50`, amber `#E17823`, gold `#DAA520`
**Audience:** 18–35 male-skewed esports/crypto bettor (UK GC: 67% male, 25–34 largest; Kambi FY24: 18–43 = 87% of esports handle) + casino generalists. Screen = trading terminal: optimize peripheral odds-change detection, ≤1s scan-to-tap, zero state ambiguity.

## 1. Color

- **Why palette works:** cyan/teal on dark navy = tech + night + trust + esports (LED/broadcast vernacular); ~14:1 contrast on near-black so brand color can carry text. Crypto casinos converged on it. Dark+neon skews young-male — matches demo; generalists fine since legibility drives usability.
- **Coverage budget:** attention = local saturation contrast. Neon accent ≤5–8% of visible pixels (neon on near-black pulls ~2× a light-theme accent); >10% = wallpaper. One saturated hue per perceptual group (cyan XOR semantic color in a cell, never both). Glow ≤3 elements/viewport. Drop text weight one step on dark. Never long passages in cyan or pure white.
- **Elevation = lightness not shadows:** `bg #041015 → surface.1 #0B1920 → surface.2 #0E202A → surface.3 #142B36` (≈ 4%/7%/11% white overlay).

| Token | Value | Usage | Contrast (bg / surf.2) |
|---|---|---|---|
| brand.primary | `#02F8F8` | logo, active nav, CTA text/icon, static odds, selected-chip border. Text/line only — no fills >60px² | 14.5 / 12.5 |
| text.primary | `#EEF7F9` | teams, market names, static scores | 17.7 / 15.3 |
| text.secondary | `#8FA8B3` | league labels, timestamps, sub-labels | 7.7 / 6.7 |
| text.tertiary | `#6B8894` | captions — floor for readable text | 5.1 / 4.4 |
| tick.up | `#47D496` | odds-up flash ≤1.5s only | 10.2 / 8.8 |
| tick.down | `#F41F50` | odds-down flash; icons/large only | 4.7 / 4.1 |
| tick.down.text | `#FF4D75` | red text variant on surfaces | 6.0 / 5.2 |
| live | `#F41F50` | LIVE dot/icon, urgent chrome | icon/large only |
| warn | `#E17823` | suspended, closed, limit warnings | 6.3 / 5.5 |
| vip | `#DAA520` | VIP, prizes, boosts | 8.6 / 7.5 |
| border.hairline | `#1E3944` | separators, card edges | structural |
| border.strong | `#3A6B7A` | interactive edges, focus-adjacent | 3.4 (1.4.11 ✓) |

- **Cyan-vs-green conflict resolved (industry standard):** resting odds = brand cyan; up/down meaning lives in MOTION only (flash cell bg/edge green/red 200–400ms, decay to cyan 800–1200ms). Slip/PnL contexts keep persistent semantic color (win green/loss red). Suspended = amber wash + padlock + "SUSPENDED" (3 channels; dimming alone reads as loading).
- **CVD (~8% of males = core demo):** never color-only meaning — pair ▲▼ glyphs; green/red differ 2.5× luminance (survives deuteranopia as light-vs-dark); gold vs amber collide — pair VIP w/ crown glyph; optional reduced-color mode (blue up / orange down).

## 2. Typography

- Figtree = UI body (rounded humanist, x-height holds at 11–13px). Oxanium = odds/scores/clocks ONLY if `tnum` verified, else Figtree tabular. Red Hat Display = display/hero. **Tabular lining figures non-negotiable** for updating numbers (jitter = false motion).
- Numerals beat names in cells (odds 15–16px/650 cyan; label 11px/500 secondary). Scores beat team names.

| Style | Spec | Use |
|---|---|---|
| score.hero | 28–32/120%/700 | scoreboard numerals |
| h1 | 24/125%/700 (Red Hat) | page titles |
| h2.section | 18–20/130%/650 | market groups |
| odds.lg | 15–16/1/650 tabular | odds cells (scan target) |
| body | 14/145%/450 | teams, markets |
| label | 12/130%/500/+0.02em | sub-labels, 1/X/2 |
| micro | 11/125%/500/+0.03em caps | tags, timestamps — never below 11px |
| slip.stake | 16/1/600 tabular | stake/return |

## 3. Per-page hierarchy & scan path

- **Sports home (Z over F skeleton):** ① logo + LIVE w/ pulse → ② search (visible box — serve search-dominant + browse users) → ③ featured strip (cap 1 hero card, no auto-rotate = banner blindness) → ④ first live row; left rail active sport = cyan 3px edge.
- **Live (layer-cake F):** sport→league headers carry sport+league+count (users scan headers only); row = `clock|league|A|B|score|[1][X][2]`; score column vertically aligned across rows (converts row→column scanning); left stem = status, right edge = action; ≤5 data groups/row.
- **Match page (visual weight):** centered scoreboard (bilateral symmetry → fixation on biggest numerals) → Popular markets strip under it (common region) → accordions collapsed; suspension = amber edge pulse 300ms AT the suspended market (local transient defeats change blindness — never repaint whole section).
- **Bet slip:** desktop right rail (LTR terminus = action zone; 360–400px, surface.3, no promo art — right-rail blindness if ad-like); mobile bottom sheet (collapsed bar bottom-center; Place Bet ≥52px full-width centered — center-of-screen = fastest/most accurate touch per Hoober correction); internals: selections → combined odds → stake → return 16px primary → CTA cyan-on-surface.3 + glow → RG microcopy. RTL: mirror everything, numerals stay LTR.

## 4. Spacing & geometry

4pt grid / 8pt rhythm; card padding ≥16 desktop ≥12 mobile; row height 56–64 touch / 44–52 dense; odds cell h≥48 (52 mobile) w≥72 r8–10; 3 equal cells + 8px gutters (similarity grouping, no shared borders → mistap prevention); radius: cards 12, cells 8–10, tags pill; ≤7 matches per mobile viewport; elevation ladder; cells = fill + hairline; selected = cyan border 1.5 + glow (not fill-flip — preserves perceived shape); focus ring 2px #02F8F8 +2px offset.

## 5. Motion & duration

Motion onset = strongest pre-attentive attribute (magnocellular/peripheral); short sharp transient beats long fade; WCAG ≤3 flashes/sec.

| Event | Treatment | Duration |
|---|---|---|
| Odds tick | edge-glow + bg tint + ▲▼, single pulse | 250–400 flash + 800–1200 decay |
| Suspend | amber edge pulse ×1 + padlock + text | 300ms, persists |
| Bet accepted | check + gold shimmer once | 400ms |
| Slip price change | numeral cross-fade + tint | 200ms |
| Sheet | translateY + scrim 60% | 250 out / 200 in |
| Accordion | height + chevron | 200ms |
| LIVE beacon | opacity pulse ≤1.15 scale | 1.2s infinite |
| Hover/press | brighten 8% | 80–100ms |

Bans: no auto-carousels, no loops >3s (except LIVE dot), no digit-rolling on odds (breaks tabular + fake noise), ≤4 simultaneous cell flashes (wholesale reprice → flash container once).

## 6. Dark-mode craft

Elevation via lightness; shadows only for floating sheet/modal; text hierarchy by luminance not hue; never pure #FFF text (halation) — `#EEF7F9` cyan-cast; no large saturated fills; 8px gaps > hairlines; scrim `rgba(2,8,11,.6)` + 8px blur.

## 7. Top 12 visual-perception wins

1. Cyan = static odds, green/red = motion only 2. 200–400ms local flash (defeats change blindness) 3. Suspension = motion+amber+padlock+text 4. Tabular everywhere numbers live 5. Numerals > names in cells 6. 3 equal cells, ≤5 data groups/row 7. Left stem=status, right edge=action 8. Centered bilateral scoreboard 9. Neon ≤5–8%, ≤3 glows 10. Common-region cards ≥12–16px padding 11. CVD-safe dual-coding + luminance gap 12. Layer-cake headers + closed accordions.
