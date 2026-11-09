import { useId } from "react";
import {
  CHARGES,
  CRESTS,
  type CrestSpec,
  type FieldOp,
  SHAPES,
} from "../lib/crests";
import type { Team } from "../lib/types";

function FieldOps({ ops }: { ops: FieldOp[] }) {
  return (
    <>
      {ops.map((op, i) => {
        const k = `f${i}`;
        switch (op.t) {
          case "fill":
            return (
              <rect key={k} x="0" y="0" width="64" height="64" fill={op.c} />
            );
          case "perPale":
            return (
              <g key={k}>
                <rect x="0" y="0" width="32" height="64" fill={op.left} />
                <rect x="32" y="0" width="32" height="64" fill={op.right} />
              </g>
            );
          case "perFess":
            return (
              <g key={k}>
                <rect x="0" y="0" width="64" height="32" fill={op.top} />
                <rect x="0" y="32" width="64" height="32" fill={op.bottom} />
              </g>
            );
          case "paly":
          case "palyIn":
          case "paly3": {
            const y0 = op.t === "palyIn" ? op.y0 : 0;
            const y1 = op.t === "palyIn" ? op.y1 : 64;
            const h = y1 - y0;
            if (op.t === "paly3") {
              const w = 64 / 3;
              return (
                <g key={k}>
                  {op.colors.map((c, j) => (
                    <rect
                      key={j}
                      x={j * w}
                      y={y0}
                      width={w + (j === 2 ? 1 : 0)}
                      height={h}
                      fill={c}
                    />
                  ))}
                </g>
              );
            }
            const n = op.n ?? 5;
            const w = 64 / n;
            return (
              <g key={k}>
                {Array.from({ length: n }, (_, j) => (
                  <rect
                    key={j}
                    x={j * w}
                    y={y0}
                    width={w + 0.5}
                    height={h}
                    fill={op.colors[j % 2]}
                  />
                ))}
              </g>
            );
          }
          case "rect":
            return (
              <rect
                key={k}
                x={op.x}
                y={op.y}
                width={op.w}
                height={op.h}
                fill={op.c}
              />
            );
          case "cross": {
            const bw = op.bw ?? 6;
            return (
              <g key={k}>
                <rect
                  x={op.x + op.w / 2 - bw / 2}
                  y={op.y}
                  width={bw}
                  height={op.h}
                  fill={op.c}
                />
                <rect
                  x={op.x}
                  y={op.y + op.h * 0.38}
                  width={op.w}
                  height={bw}
                  fill={op.c}
                />
              </g>
            );
          }
          case "sash": {
            const w = op.w ?? 10;
            return (
              <rect
                key={k}
                x="8"
                y="28"
                width="70"
                height={w}
                fill={op.c}
                transform="rotate(-28 32 32)"
              />
            );
          }
          case "chief": {
            const h = op.h ?? 16;
            return (
              <rect key={k} x="0" y="0" width="64" height={h} fill={op.c} />
            );
          }
          case "pale": {
            const w = op.w ?? 14;
            return (
              <rect
                key={k}
                x={32 - w / 2}
                y="0"
                width={w}
                height="64"
                fill={op.c}
              />
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

function Charge({ spec, tier }: { spec: CrestSpec; tier: "S" | "M" | "L" }) {
  if (!spec.charge) return null;
  const scale = (spec.chargeScale ?? 1) * (tier === "S" ? 1.15 : 0.95);
  const cy = spec.chargeY ?? (spec.mono ? 38 : 33);
  return (
    <g transform={`translate(32 ${cy}) scale(${scale})`}>
      <path d={CHARGES[spec.charge]} fill={spec.chargeColor ?? "#FFFFFF"} />
    </g>
  );
}

export function TeamCrest({ team, size = 28 }: { team: Team; size?: number }) {
  const clipId = useId();
  const spec = CRESTS[team.id];
  const tier = size < 20 ? "S" : size < 36 ? "M" : "L";

  if (!spec) {
    // fallback: generic heater shield in the team hue — never a flat disc
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="shrink-0"
        aria-hidden
      >
        <path
          d="M12 1.6 L21 5.4 V13.4 C21 18.4 17.1 22 12 23.6 C6.9 22 3 18.4 3 13.4 V5.4 Z"
          fill={`hsl(${team.hue} 55% 30%)`}
          stroke={`hsl(${team.hue} 60% 55%)`}
          strokeWidth="1"
        />
        <text
          x="12"
          y="15.2"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="rgba(255,255,255,0.92)"
          fontFamily="inherit"
        >
          {team.short.slice(0, 2)}
        </text>
      </svg>
    );
  }

  const showMono = spec.mono && (tier !== "S" || spec.primary === "mono");
  const showCharge = spec.charge && (tier !== "S" || spec.primary === "charge");
  const showStars = spec.stars && tier !== "S";
  const showYear = spec.year && tier === "L";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
      className="shrink-0"
      style={{ filter: "drop-shadow(0 1px 1.5px rgba(0,0,0,0.5))" }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHAPES[spec.shape]} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <FieldOps ops={spec.field} />
        {showCharge && <Charge spec={spec} tier={tier} />}
        {spec.top === "crown" && tier !== "S" && (
          <path
            d="M24 12 L28 6 L32 11 L36 6 L40 12 L40 15 L24 15 Z"
            fill="#FEBE10"
          />
        )}
        {spec.top === "eagle" && tier !== "S" && (
          <path
            d="M32 5 L36 9 L42 6 L39 11 L32 14 L25 11 L22 6 L28 9 Z"
            fill="#E8BC41"
          />
        )}
        {showStars && (
          <g fill={spec.starColor ?? "#F1BE48"}>
            {Array.from({ length: spec.stars ?? 0 }, (_, i) => {
              const cx = 32 + (i - ((spec.stars ?? 1) - 1) / 2) * 7;
              return (
                <path
                  key={i}
                  d={`M${cx} 8 L${cx + 1} 11 L${cx + 4} 11 L${cx + 1.6} 12.8 L${cx + 2.5} 15.5 L${cx} 13.6 L${cx - 2.5} 15.5 L${cx - 1.6} 12.8 L${cx - 4} 11 L${cx - 1} 11 Z`}
                />
              );
            })}
          </g>
        )}
        {showMono && (
          <text
            x={spec.mono === "J" ? 42 : 32}
            y={spec.monoY ?? 34}
            textAnchor="middle"
            fontFamily="Oxanium, sans-serif"
            fontWeight="700"
            fontSize={
              tier === "S" ? (spec.monoSize ?? 11) * 1.2 : (spec.monoSize ?? 11)
            }
            fill={spec.monoColor ?? "#FFFFFF"}
            style={{
              paintOrder: "stroke",
              stroke:
                spec.monoColor === "#FFFFFF" || !spec.monoColor
                  ? "#00000055"
                  : "#ffffff66",
              strokeWidth: 0.8,
            }}
          >
            {spec.mono}
          </text>
        )}
        {showYear && (
          <text
            x="32"
            y="57"
            textAnchor="middle"
            fontFamily="Figtree, sans-serif"
            fontWeight="600"
            fontSize="4.5"
            fill={spec.keyline}
            opacity="0.9"
          >
            EST {spec.year}
          </text>
        )}
      </g>
      <path
        d={SHAPES[spec.shape]}
        fill="none"
        stroke={spec.keyline}
        strokeWidth="1.6"
        opacity="0.85"
      />
    </svg>
  );
}
