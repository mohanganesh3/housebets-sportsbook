import { create } from "zustand";
import type { OddsDir } from "../types";

interface OddsState {
  overrides: Record<string, number>;
  flashes: Record<string, { dir: OddsDir; key: number }>;
  applyChange: (outcomeId: string, price: number, dir: OddsDir) => void;
  price: (outcomeId: string) => number | undefined;
}

export const useOdds = create<OddsState>()((set, get) => ({
  overrides: {},
  flashes: {},
  applyChange: (outcomeId, price, dir) =>
    set((s) => ({
      overrides: { ...s.overrides, [outcomeId]: price },
      flashes: { ...s.flashes, [outcomeId]: { dir, key: Date.now() } },
    })),
  price: (outcomeId) => get().overrides[outcomeId],
}));

// Effective price = override ?? seed price (seed read by callers)
