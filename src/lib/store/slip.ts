import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { outcomeById } from "../seed";
import type { SlipSelection, SlipStatus } from "../types";
import { useBets } from "./bets";
import { useUI } from "./ui";
import { useWorld } from "./world";

export type FailReason = "suspended" | "odds-moved" | "network";

interface SlipState {
  selections: SlipSelection[];
  status: SlipStatus;
  failReason: FailReason | null;
  mobileOpen: boolean;
  acceptAll: () => void;
  accept: (outcomeId: string) => void;
  toggle: (outcomeId: string) => void;
  remove: (outcomeId: string) => void;
  setStake: (outcomeId: string, stake: string) => void;
  clear: () => void;
  place: () => void;
  resetStatus: () => void;
  setMobileOpen: (v: boolean) => void;
  onOddsChange: (outcomeId: string, newPrice: number) => void;
  onMarketSuspended: (marketId: string) => void;
  onMarketResumed: (marketId: string) => void;
}

export const useSlip = create<SlipState>()(
  subscribeWithSelector((set, get) => ({
    selections: [],
    status: "idle",
    failReason: null,
    mobileOpen: false,
    setMobileOpen: (v) => set({ mobileOpen: v }),
    toggle: (outcomeId) => {
      const s = get();
      if (s.selections.some((x) => x.outcomeId === outcomeId)) {
        set({
          selections: s.selections.filter((x) => x.outcomeId !== outcomeId),
        });
        return;
      }
      const found = outcomeById(outcomeId);
      if (
        !found ||
        found.outcome.status === "suspended" ||
        found.market.status === "suspended"
      )
        return;
      if (s.status === "placed" || s.status === "failed")
        set({ status: "idle" });
      set((st) => ({
        selections: [
          ...st.selections,
          {
            outcomeId,
            matchId: found.match.id,
            marketId: found.market.id,
            marketName: found.market.name,
            pick: found.outcome.name,
            priceAtPick: found.outcome.price,
            livePrice: found.outcome.price,
            status: "active",
            stake: "",
          },
        ],
      }));
    },
    remove: (outcomeId) =>
      set((s) => ({
        selections: s.selections.filter((x) => x.outcomeId !== outcomeId),
      })),
    setStake: (outcomeId, stake) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.outcomeId === outcomeId ? { ...x, stake } : x,
        ),
      })),
    clear: () => set({ selections: [], status: "idle" }),
    accept: (outcomeId) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.outcomeId === outcomeId && x.status === "changed"
            ? { ...x, status: "active", priceAtPick: x.livePrice }
            : x,
        ),
      })),
    acceptAll: () =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.status === "changed"
            ? { ...x, status: "active", priceAtPick: x.livePrice }
            : x,
        ),
      })),
    place: () => {
      const s = get();
      if (!s.selections.length || s.status === "placing") return;
      if (s.selections.some((x) => x.status === "suspended")) return; // honest block — CTA explains
      // acceptance preference: auto-accept qualifying price moves (industry 3-mode)
      const pref = useUI.getState().oddsPref;
      if (pref !== "ask") {
        set((st) => ({
          selections: st.selections.map((x) =>
            x.status === "changed" &&
            (pref === "any" || x.livePrice > x.priceAtPick)
              ? { ...x, status: "active", priceAtPick: x.livePrice }
              : x,
          ),
        }));
      }
      if (get().selections.some((x) => x.status === "changed")) return; // must accept first
      set({ status: "placing", failReason: null });
      const liveSel = get().selections.some((x) => {
        const mt = useWorld.getState().matches.find((m) => m.id === x.matchId);
        return mt?.status === "live";
      });
      // live bets carry a visible acceptance delay; pre-match confirms fast
      const delay = liveSel
        ? 2_400 + Math.random() * 600
        : 650 + Math.random() * 350;
      const fail = useDemoFailOnce();
      setTimeout(() => {
        const cur = get();
        if (cur.status !== "placing") return;
        if (cur.selections.some((x) => x.status === "suspended")) {
          set({ status: "failed", failReason: "suspended" });
          return;
        }
        if (fail) {
          set({ status: "failed", failReason: "network" });
          return;
        }
        useBets.getState().addBets(cur.selections);
        set({ status: "placed" });
      }, delay);
    },
    resetStatus: () => set({ status: "idle" }),
    onOddsChange: (outcomeId, newPrice) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.outcomeId === outcomeId
            ? {
                ...x,
                livePrice: newPrice,
                status: x.status === "suspended" ? "suspended" : "changed",
              }
            : x,
        ),
      })),
    onMarketSuspended: (marketId) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.marketId === marketId ? { ...x, status: "suspended" } : x,
        ),
      })),
    onMarketResumed: (marketId) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.marketId === marketId && x.status === "suspended"
            ? {
                ...x,
                status: x.livePrice !== x.priceAtPick ? "changed" : "active",
              }
            : x,
        ),
      })),
  })),
);

let failOnce = false;
export const armFailOnce = () => {
  failOnce = true;
};
function useDemoFailOnce() {
  const v = failOnce;
  failOnce = false;
  return v;
}
