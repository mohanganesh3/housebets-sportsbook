// Heraldic crest grammar — fictional-but-premium club badges.
// Grammar: silhouette → field ops (painter's algorithm) → charge → monogram → honors.
// Flat fills only, integer coords, viewBox 64×64, detail tiers S/M/L by render size.

export type Shape =
  | "heater"
  | "continental"
  | "roundel"
  | "ellipse"
  | "octagon";

export type FieldOp =
  | { t: "fill"; c: string }
  | { t: "perPale"; left: string; right: string }
  | { t: "perFess"; top: string; bottom: string }
  | { t: "paly"; colors: [string, string]; n?: number }
  | {
      t: "palyIn";
      y0: number;
      y1: number;
      colors: [string, string];
      n?: number;
    }
  | { t: "paly3"; colors: [string, string, string] }
  | { t: "rect"; x: number; y: number; w: number; h: number; c: string }
  | {
      t: "cross";
      x: number;
      y: number;
      w: number;
      h: number;
      c: string;
      bw?: number;
    }
  | { t: "sash"; c: string; w?: number }
  | { t: "chief"; c: string; h?: number }
  | { t: "pale"; c: string; w?: number };

export type ChargeKey =
  | "cannon"
  | "gull"
  | "birdStand"
  | "cockerelBall"
  | "lion"
  | "castle"
  | "tower"
  | "latticeTower"
  | "ship"
  | "trident"
  | "wolf"
  | "bear"
  | "star"
  | "ball"
  | "fleur"
  | "lozengeField";

export interface CrestSpec {
  shape: Shape;
  field: FieldOp[];
  charge?: ChargeKey;
  chargeColor?: string;
  chargeY?: number;
  chargeScale?: number;
  top?: "crown" | "eagle";
  stars?: number;
  starColor?: string;
  mono?: string;
  monoColor?: string;
  monoY?: number;
  monoSize?: number;
  year?: number;
  keyline: string;
  primary: "mono" | "charge";
}

// ── Silhouette paths (64×64 viewBox, ~x10-54, y4-62) ──
export const SHAPES: Record<Shape, string> = {
  heater: "M32 6 L54 12 V30 C54 46 45 56 32 61 C19 56 10 46 10 30 V12 Z",
  continental:
    "M32 5 C44 5 54 10 54 24 C54 44 44 55 32 61 C20 55 10 44 10 24 C10 10 20 5 32 5 Z",
  roundel: "M32 4 A28 28 0 1 0 32 60 A28 28 0 1 0 32 4 Z",
  ellipse:
    "M32 6 C46 6 56 18 56 32 C56 46 46 58 32 58 C18 58 8 46 8 32 C8 18 18 6 32 6 Z",
  octagon: "M22 5 L42 5 L57 20 L57 44 L42 59 L22 59 L7 44 L7 20 Z",
};

// ── Charge glyphs (original single-path silhouettes, ~30×30 box at cy≈0) ──
export const CHARGES: Record<ChargeKey, string> = {
  cannon:
    "M4 4 L20 -1 L21 2 L22 1 L24 2 L23 5 L25 6 L24 8 L7 11 L5 9 L4 10 L3 8 Z M11 10 L13 10 L12 14 L10 14 Z M-2 6 L1 5 L2 7 L0 8 Z",
  gull: "M-10 -2 C-6 -6 -2 -7 2 -6 L8 -10 L7 -5 L12 -4 L8 -1 C10 4 7 9 2 10 C-4 11 -9 7 -10 2 Z M8 -1 L12 0 L8 1 Z",
  birdStand:
    "M0 -10 C4 -10 7 -7 7 -3 C7 1 5 4 3 6 L4 10 L1 10 L0 7 C-3 5 -5 1 -4 -3 C-3 -7 -2 -10 0 -10 Z M-4 -3 L-8 -2 L-4 0 Z M3 -8 L5 -9 L4 -6 Z",
  cockerelBall:
    "M-2 -12 C1 -12 4 -9 4 -5 C4 -2 3 0 1 2 L2 5 L5 5 A6 6 0 1 1 -7 5 L-4 5 L-3 2 C-5 0 -6 -2 -6 -5 C-6 -9 -4 -12 -2 -12 Z",
  lion: "M-4 -11 C0 -13 6 -11 8 -6 C10 -2 9 3 6 6 L7 11 L3 11 L2 8 L-2 8 L-3 11 L-7 11 L-6 5 C-9 2 -10 -3 -8 -7 Z M4 -6 L6 -7 L5 -4 Z M-8 -7 L-11 -9 L-9 -5 Z",
  castle:
    "M-8 -2 L-8 10 L8 10 L8 -2 L5 -2 L5 0 L2 0 L2 -2 L-2 -2 L-2 0 L-5 0 L-5 -2 Z M-8 -2 L-6 -6 L-4 -2 Z M-2 -6 L0 -10 L2 -6 L2 -2 L-2 -2 Z M4 -6 L6 -2 L4 -2 Z M-2 5 L2 5 L2 10 L-2 10 Z",
  tower:
    "M-5 -10 L-4 -8 L4 -8 L5 -10 L7 -8 L6 10 L-6 10 L-7 -8 Z M-3 -4 L-1 -4 L-1 -1 L-3 -1 Z M1 -4 L3 -4 L3 -1 L1 -1 Z M-1 3 L1 3 L1 10 L-1 10 Z",
  latticeTower:
    "M-4 -11 L4 -11 L3 -6 L-3 -6 Z M-3 -4 L3 -4 L4 -1 L-4 -1 Z M-5 1 L5 1 L6 5 L-6 5 Z M-7 7 L7 7 L9 11 L-9 11 Z M-2 -6 L2 -6 L2 -4 L-2 -4 Z M-3 -1 L3 -1 L3 1 L-3 1 Z",
  ship: "M-10 2 C-8 6 -4 8 0 8 C4 8 8 6 10 2 Z M-2 2 L-2 -10 L0 -10 L0 -8 L6 -4 L0 -4 L0 2 Z M-4 -8 L-4 -6 L-6 -6 L-6 -8 Z",
  trident:
    "M-1 -12 L1 -12 L1 8 C1 10 -1 10 -1 8 Z M-8 -8 L-6 -8 L-6 -2 C-6 0 -4 0 -4 -2 L-4 -5 L-2 -5 L-2 -1 C-2 3 -8 3 -8 -2 Z M6 -8 L8 -8 L8 -2 C8 3 2 3 2 -1 L2 -5 L4 -5 L4 -2 C4 0 6 0 6 -2 Z M-9 -8 L-7 -12 L-5 -8 Z M5 -8 L7 -12 L9 -8 Z",
  wolf: "M-6 -8 C-2 -11 4 -11 7 -7 L10 -4 L8 -2 L9 2 C9 6 6 9 2 9 L-2 9 L-4 11 L-8 11 L-6 7 C-8 4 -9 -2 -6 -8 Z M2 -5 L4 -5 L4 -3 L2 -3 Z M-2 -1 L2 0 L-2 2 Z",
  bear: "M-7 -6 C-7 -10 -3 -12 1 -12 L6 -10 L9 -6 L8 -2 L9 2 L7 8 L3 8 L3 5 L-1 5 L-2 8 L-6 8 L-6 3 C-8 0 -9 -3 -7 -6 Z M-8 -10 L-6 -12 L-4 -10 Z M8 -8 L10 -10 L10 -7 Z",
  star: "M0 -12 L3 -4 L11 -4 L5 1 L7 9 L0 5 L-7 9 L-5 1 L-11 -4 L-3 -4 Z",
  ball: "M0 -11 A11 11 0 1 0 0 11 A11 11 0 1 0 0 -11 Z M0 -4 L4 -1 L2.5 4 L-2.5 4 L-4 -1 Z M0 -4 L0 -11 M4 -1 L10 -3 M2.5 4 L6 9 M-2.5 4 L-6 9 M-4 -1 L-10 -3",
  fleur:
    "M0 -12 C2 -9 3 -6 2 -3 L5 -3 C4 -6 5 -9 8 -10 C8 -6 7 -3 5 -1 L7 1 L4 1 C4 3 3 5 2 6 L3 8 L-3 8 L-2 6 C-3 5 -4 3 -4 1 L-7 1 L-5 -1 C-7 -3 -8 -6 -8 -10 C-5 -9 -4 -6 -5 -3 L-2 -3 C-3 -6 -2 -9 0 -12 Z M-5 10 L5 10 L5 12 L-5 12 Z",
  lozengeField: "M0 -12 L12 0 L0 12 L-12 0 Z",
};

// ── Per-team assignments (echo real identity, never copy the badge) ──
export const CRESTS: Record<string, CrestSpec> = {
  ars: {
    shape: "heater",
    field: [
      { t: "fill", c: "#EF0107" },
      { t: "chief", c: "#063672", h: 14 },
    ],
    charge: "cannon",
    chargeColor: "#FFFFFF",
    chargeY: 34,
    mono: "AFC",
    monoColor: "#FFFFFF",
    monoY: 11,
    monoSize: 7,
    year: 1886,
    keyline: "#9C824A",
    primary: "charge",
  },
  bha: {
    shape: "roundel",
    field: [{ t: "fill", c: "#0057B8" }],
    charge: "gull",
    chargeColor: "#FFFFFF",
    year: 1901,
    keyline: "#FFCD00",
    primary: "charge",
  },
  avl: {
    shape: "heater",
    field: [{ t: "fill", c: "#670E36" }],
    charge: "lion",
    chargeColor: "#FEE505",
    mono: "AVFC",
    monoColor: "#95BFE5",
    monoY: 15,
    monoSize: 6,
    stars: 1,
    starColor: "#FEE505",
    year: 1874,
    keyline: "#95BFE5",
    primary: "charge",
  },
  ful: {
    shape: "heater",
    field: [{ t: "fill", c: "#FFFFFF" }],
    mono: "FFC",
    monoColor: "#111111",
    monoY: 36,
    monoSize: 13,
    year: 1879,
    keyline: "#111111",
    primary: "mono",
  },
  new: {
    shape: "heater",
    field: [{ t: "paly", colors: ["#111111", "#FFFFFF"], n: 5 }],
    charge: "castle",
    chargeColor: "#C9A227",
    year: 1892,
    keyline: "#C9A227",
    primary: "charge",
  },
  eve: {
    shape: "continental",
    field: [{ t: "fill", c: "#003399" }],
    charge: "tower",
    chargeColor: "#FFFFFF",
    year: 1878,
    keyline: "#FFFFFF",
    primary: "charge",
  },
  liv: {
    shape: "continental",
    field: [{ t: "fill", c: "#C8102E" }],
    charge: "birdStand",
    chargeColor: "#FFFFFF",
    year: 1892,
    keyline: "#F1BE48",
    primary: "charge",
  },
  mun: {
    shape: "heater",
    field: [{ t: "fill", c: "#DA291C" }],
    charge: "trident",
    chargeColor: "#FBE122",
    year: 1878,
    keyline: "#FBE122",
    primary: "charge",
  },
  mci: {
    shape: "roundel",
    field: [{ t: "fill", c: "#FFFFFF" }],
    charge: "ship",
    chargeColor: "#1C2C5B",
    year: 1894,
    keyline: "#6CABDD",
    primary: "charge",
  },
  tot: {
    shape: "heater",
    field: [{ t: "fill", c: "#FFFFFF" }],
    charge: "cockerelBall",
    chargeColor: "#132257",
    year: 1882,
    keyline: "#132257",
    primary: "charge",
  },
  int: {
    shape: "roundel",
    field: [{ t: "fill", c: "#0B0B0B" }],
    mono: "IM",
    monoColor: "#FFFFFF",
    monoY: 37,
    monoSize: 15,
    stars: 2,
    starColor: "#0068A8",
    year: 1908,
    keyline: "#0068A8",
    primary: "mono",
  },
  rma: {
    shape: "roundel",
    field: [
      { t: "fill", c: "#FFFFFF" },
      { t: "sash", c: "#6C2E91", w: 9 },
    ],
    mono: "RM",
    monoColor: "#6C2E91",
    monoY: 30,
    monoSize: 9,
    top: "crown",
    year: 1902,
    keyline: "#FEBE10",
    primary: "mono",
  },
  bay: {
    shape: "roundel",
    field: [{ t: "fill", c: "#FFFFFF" }],
    charge: "lozengeField",
    chargeColor: "#0066B2",
    chargeScale: 0.85,
    stars: 3,
    starColor: "#DC052D",
    year: 1900,
    keyline: "#DC052D",
    primary: "charge",
  },
  bar: {
    shape: "continental",
    field: [
      { t: "fill", c: "#004D98" },
      { t: "palyIn", y0: 30, y1: 62, colors: ["#A50044", "#004D98"], n: 5 },
      { t: "rect", x: 12, y: 8, w: 20, h: 22, c: "#FFFFFF" },
      { t: "cross", x: 12, y: 8, w: 20, h: 22, c: "#DB0030", bw: 5 },
      { t: "rect", x: 32, y: 8, w: 20, h: 22, c: "#FFED02" },
      { t: "palyIn", y0: 8, y1: 30, colors: ["#DB0030", "#FFED02"], n: 4 },
    ],
    charge: "ball",
    chargeColor: "#EDBB00",
    chargeY: 44,
    chargeScale: 0.55,
    year: 1899,
    keyline: "#EDBB00",
    primary: "charge",
  },
  psg: {
    shape: "roundel",
    field: [
      { t: "fill", c: "#004170" },
      { t: "pale", c: "#FFFFFF", w: 15 },
    ],
    charge: "latticeTower",
    chargeColor: "#DA291C",
    chargeScale: 0.9,
    year: 1970,
    keyline: "#DA291C",
    primary: "charge",
  },
  atm: {
    shape: "heater",
    field: [
      { t: "fill", c: "#FFFFFF" },
      { t: "palyIn", y0: 22, y1: 62, colors: ["#CB3524", "#FFFFFF"], n: 5 },
    ],
    charge: "bear",
    chargeColor: "#272E61",
    chargeY: 15,
    chargeScale: 0.5,
    year: 1903,
    keyline: "#272E61",
    primary: "charge",
  },
  sev: {
    shape: "continental",
    field: [
      { t: "fill", c: "#FFFFFF" },
      { t: "sash", c: "#D00027", w: 11 },
    ],
    mono: "SFC",
    monoColor: "#B08D2C",
    monoY: 30,
    monoSize: 8,
    year: 1890,
    keyline: "#D00027",
    primary: "mono",
  },
  juv: {
    shape: "heater",
    field: [{ t: "perPale", left: "#0B0B0B", right: "#FFFFFF" }],
    mono: "J",
    monoColor: "#0B0B0B",
    monoY: 38,
    monoSize: 22,
    stars: 3,
    starColor: "#F1BE48",
    year: 1897,
    keyline: "#F1BE48",
    primary: "mono",
  },
  rom: {
    shape: "roundel",
    field: [{ t: "fill", c: "#8E1F2F" }],
    charge: "wolf",
    chargeColor: "#F0BC42",
    chargeY: 40,
    chargeScale: 0.8,
    mono: "ASR",
    monoColor: "#F0BC42",
    monoY: 22,
    monoSize: 9,
    year: 1927,
    keyline: "#F0BC42",
    primary: "charge",
  },
  lev: {
    shape: "roundel",
    field: [{ t: "fill", c: "#FFFFFF" }],
    charge: "lion",
    chargeColor: "#E32219",
    chargeY: 30,
    mono: "B04",
    monoColor: "#111111",
    monoY: 48,
    monoSize: 8,
    year: 1904,
    keyline: "#E32219",
    primary: "charge",
  },
  s04: {
    shape: "octagon",
    field: [{ t: "fill", c: "#004D9D" }],
    mono: "S04",
    monoColor: "#FFFFFF",
    monoY: 38,
    monoSize: 15,
    year: 1904,
    keyline: "#FFFFFF",
    primary: "mono",
  },
  nap: {
    shape: "roundel",
    field: [{ t: "fill", c: "#12A0D7" }],
    mono: "N",
    monoColor: "#FFFFFF",
    monoY: 40,
    monoSize: 24,
    year: 1926,
    keyline: "#FFFFFF",
    primary: "mono",
  },
  mil: {
    shape: "ellipse",
    field: [
      { t: "fill", c: "#0B0B0B" },
      { t: "rect", x: 8, y: 6, w: 24, h: 52, c: "#FFFFFF" },
      { t: "cross", x: 8, y: 6, w: 24, h: 52, c: "#FB090B", bw: 6 },
      { t: "palyIn", y0: 6, y1: 58, colors: ["#0B0B0B", "#FB090B"], n: 4 },
    ],
    mono: "ACM",
    monoColor: "#FFFFFF",
    monoY: 15,
    monoSize: 7,
    stars: 1,
    starColor: "#F1BE48",
    year: 1899,
    keyline: "#FB090B",
    primary: "mono",
  },
  benf: {
    shape: "heater",
    field: [{ t: "paly3", colors: ["#E83034", "#FFFFFF", "#E83034"] }],
    mono: "SLB",
    monoColor: "#E83034",
    monoY: 36,
    monoSize: 8,
    top: "eagle",
    year: 1904,
    keyline: "#E8BC41",
    primary: "mono",
  },
  est: {
    shape: "heater",
    field: [{ t: "paly3", colors: ["#DF362A", "#FFFFFF", "#3F9153"] }],
    charge: "star",
    chargeColor: "#FEC059",
    chargeScale: 0.7,
    year: 1932,
    keyline: "#FEC059",
    primary: "charge",
  },
};

// Juve J needs two-tone — handled in renderer via monoSplit flag on perPale.
