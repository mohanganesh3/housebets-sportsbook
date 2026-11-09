# REJECTION-CHECKLIST — run before ANY design ships

QC runs this on every screen diff. ANY box failing = the diff is rejected, no severity scale.

## AI-fingerprint sweep (from T12 slop audit, our own file:line hits)
- [ ] no pill row where a segmented/rail/row pattern belongs
- [ ] no uniform card grid for repeated data — hairline lists or authored tiles
- [ ] no initials-in-disc crests, no emoji flags
- [ ] no hero card with floating CTAs over a gradient
- [ ] neon budget: ≤1 glow element per viewport; pale-cyan fill = money/commit only
- [ ] icon+label pairs, never icon-only (except the frozen 5 chips where chips exist)
- [ ] no skeleton that doesn't match final geometry
- [ ] no motion that decorates rather than informs (registry-allowed effects only)

## Familiarity sweep
- [ ] 1X2 order, live badge position, slip location, tab labels match convention
- [ ] any bettor from another book needs ≤2 taps to place a single

## Money-truth sweep
- [ ] every price change visible (glyph+colour+motion)
- [ ] placement has pending→receipt/rejection, never limbo
- [ ] suspension shows reason at lock moment, in-frame
- [ ] cash-out shows value + confirm + reason-when-suspended + age
- [ ] losses/voids styled with same weight as wins
- [ ] no auto-accept defaults

## Craft sweep
- [ ] every number tabular lining; every row on the 4pt grid
- [ ] type uses hb-* tokens only — no `text-[Npx]`, nothing below hb-micro (11px floor), no `line-height: normal`
- [ ] contrast: text-2† measured ≥4.5 on actual surface (not assumed)
- [ ] all touch targets ≥44px incl. icon buttons and ✕
- [ ] motion: registry duration/easing, PRM twin exists, interruptible
- [ ] focus visible on every interactive element; keyboard order = visual order
- [ ] empty/loading/error/suspended all exist and are authored
- [ ] copy: plain language, zero jargon; errors say what/money-safe/what-next
- [ ] works at 360/390/430/1440; iPhone+Pixel; Chrome+Safari
- [ ] reduced-motion build visually identical in function

## Scope sweep
- [ ] zero banned features (multiples, accumulators, real-money, auth)
- [ ] sample data only; no real player data misuse
