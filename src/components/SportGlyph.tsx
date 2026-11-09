import type { ReactNode } from "react";

export type GlyphComponent = (props: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) => ReactNode;

// Housebets sport glyphs — drawn for this prototype, one stroke weight.
// Lucide has no correct ball glyphs (Volleyball-for-soccer was a slop tell),
// so these are hand-composed at Lucide's 24px/2px grammar.

function G({
  size,
  strokeWidth = 2,
  className,
  children,
  label,
}: {
  size: number;
  strokeWidth?: number;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

function SoccerBall({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 8.8 L15.04 11.01 L13.88 14.59 L10.12 14.59 L8.96 11.01 Z" />
      <path d="M12 8.8 V2.5" />
      <path d="M15.04 11.01 L21.03 9.06" />
      <path d="M13.88 14.59 L17.58 19.69" />
      <path d="M10.12 14.59 L6.42 19.69" />
      <path d="M8.96 11.01 L2.97 9.06" />
    </G>
  );
}

function TennisBall({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 2.5 C7 6 7 18 12 21.5" />
      <path d="M12 2.5 C17 6 17 18 12 21.5" />
    </G>
  );
}

function Basketball({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 2.5 C7.5 6.5 7.5 17.5 12 21.5" />
      <path d="M12 2.5 C16.5 6.5 16.5 17.5 12 21.5" />
      <path d="M2.5 12 H21.5" />
    </G>
  );
}

function GamepadGlyph({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <path d="M7 7.5 H17 a4.5 4.5 0 0 1 4.4 5.4 l-.8 3.4 a2.6 2.6 0 0 1 -4.5 1.2 L14.5 16 H9.5 L7.9 17.5 a2.6 2.6 0 0 1 -4.5 -1.2 l-.8 -3.4 A4.5 4.5 0 0 1 7 7.5 Z" />
      <path d="M8 10.5 V13.5" />
      <path d="M6.5 12 H9.5" />
      <circle cx="16.25" cy="11.25" r="0.4" fill="currentColor" />
      <circle cx="18" cy="13" r="0.4" fill="currentColor" />
    </G>
  );
}

function Baseball({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      {/* two opposed seams with stitch ticks — baseball, not tennis */}
      <path d="M6.2 4.4 C9.8 7.4 9.8 16.6 6.2 19.6" />
      <path d="M17.8 4.4 C14.2 7.4 14.2 16.6 17.8 19.6" />
      <path d="M8.4 7.5 L10.2 8.4" />
      <path d="M8.4 12 L10.2 12" />
      <path d="M8.4 16.5 L10.2 15.6" />
      <path d="M15.6 7.5 L13.8 8.4" />
      <path d="M15.6 12 L13.8 12" />
      <path d="M15.6 16.5 L13.8 15.6" />
    </G>
  );
}

function AmericanFootball({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <path d="M20.4 3.6 C21.9 5.1 22.4 7.6 21.6 10.9 C20.4 15.7 15.7 20.4 10.9 21.6 C7.6 22.4 5.1 21.9 3.6 20.4 C2.1 18.9 1.6 16.4 2.4 13.1 C3.6 8.3 8.3 3.6 13.1 2.4 C16.4 1.6 18.9 2.1 20.4 3.6 Z" />
      {/* lace stripe */}
      <path d="M8.9 15.1 L15.1 8.9" />
      <path d="M10.4 13.9 L11.9 15.4" />
      <path d="M11.9 12.4 L13.4 13.9" />
      <path d="M13.4 10.9 L14.9 12.4" />
    </G>
  );
}

function CricketBatBall({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <rect
        x="12.2"
        y="2.4"
        width="4.6"
        height="13.4"
        rx="2.3"
        transform="rotate(35 14.5 9)"
      />
      <circle cx="6" cy="18" r="3.2" />
    </G>
  );
}

function HockeyStickPuck({
  size = 24,
  strokeWidth,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <G size={size} strokeWidth={strokeWidth} className={className}>
      <path d="M6 3.5 L12.5 12.5 H20" />
      <path d="M20 12.5 V15.5 H11.4" />
      <rect x="3.5" y="17" width="6.4" height="3.4" rx="1.7" />
    </G>
  );
}

export const SPORT_GLYPHS = {
  soccer: SoccerBall,
  tennis: TennisBall,
  basketball: Basketball,
  baseball: Baseball,
  americanFootball: AmericanFootball,
  esports: GamepadGlyph,
  cricket: CricketBatBall,
  hockey: HockeyStickPuck,
} as const;

export type SportGlyphKey = keyof typeof SPORT_GLYPHS;

export function SportGlyph({
  sport,
  size = 24,
  strokeWidth,
  className,
}: {
  sport: SportGlyphKey;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = SPORT_GLYPHS[sport];
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}
