import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { outcomeById } from "../seed";
import type { SlipSelection, SlipStatus } from "../types";
import { useBets } from "./bets";
import { useOdds } from "./odds";
import { useUI } from "./ui";
import { useWorld } from "./world";

export type FailReason = "suspended" | "odds-moved" | "network" | "funds";

export interface PlacedReceipt {
  bets: { id: string; pick: string; odds: number; acceptedFrom?: number }[];
  stake: number;
  payout: number;
}

interface SlipState {
  selections: SlipSelection[];
  status: SlipStatus;
  failReason: FailReason | null;
  mobileOpen: boolean;
  lastReceipt: PlacedReceipt | null;
  placingUntil: number | null;
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
    lastReceipt: null,
    placingUntil: null,
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
      if (!found) return;
      // live suspension state lives in the world store, not the seed —
      // a market can suspend between render and click
      const liveMk = useWorld
        .getState()
        .matches.find((m) => m.id === found.match.id)
        ?.markets.find((mk) => mk.id === found.market.id);
      const liveOc = liveMk?.outcomes.find((o) => o.id === outcomeId);
      if (
        liveMk?.status === "suspended" ||
        liveOc?.status === "suspended" ||
        found.outcome.status === "suspended" ||
        found.market.status === "suspended"
      )
        return;
      if (s.status === "placed" || s.status === "failed")
        set({ status: "idle" });
      // pick the LIVE price, not the seed — the market may have repriced
      // since page load (goal cascade, ambient ticks)
      const liveNow =
        useOdds.getState().price(outcomeId) ?? found.outcome.price;
      set((st) => ({
        selections: [
          ...st.selections,
          {
            outcomeId,
            matchId: found.match.id,
            marketId: found.market.id,
            marketName: found.market.name,
            pick: found.outcome.name,
            priceAtPick: liveNow,
            livePrice: liveNow,
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
      // legs without a stake never mint a bet — drop them with a named reason
      const staked = s.selections.filter((x) => (parseFloat(x.stake) || 0) > 0);
      const dropped = s.selections.length - staked.length;
      if (dropped > 0) {
        if (staked.length === 0) {
          useUI.getState().toast("Set a stake on your selection first", "info");
          return;
        }
        set({ selections: staked });
        useUI
          .getState()
          .toast(
            `${dropped} selection${dropped > 1 ? "s" : ""} removed · no stake set`,
            "info",
          );
      }
      // simulated connection loss is terminal too
      if (useUI.getState().offline) {
        set({ status: "failed", failReason: "network" });
        return;
      }
      // insufficient funds is a terminal state, not a silent negative
      const totalStake = staked.reduce(
        (a, x) => a + (parseFloat(x.stake) || 0),
        0,
      );
      if (totalStake > useUI.getState().balance) {
        set({ status: "failed", failReason: "funds" });
        return;
      }
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
      // snapshot prices at click — a mid-flight move can still fail placement
      const pricesAtPlace = new Map(
        get().selections.map((x) => [x.outcomeId, x.livePrice] as const),
      );
      const liveSel = get().selections.some((x) => {
        const mt = useWorld.getState().matches.find((m) => m.id === x.matchId);
        return mt?.status === "live";
      });
      // live bets carry a visible acceptance delay; pre-match confirms fast
      const delay = liveSel
        ? 2_400 + Math.random() * 600
        : 650 + Math.random() * 350;
      const fail = useDemoFailOnce();
      const sheetWasOpen = get().mobileOpen;
      set({
        status: "placing",
        failReason: null,
        placingUntil: Date.now() + delay,
      });
      setTimeout(() => {
        const cur = get();
        if (cur.status !== "placing") return;
        if (cur.selections.some((x) => x.status === "suspended")) {
          set({
            status: "failed",
            failReason: "suspended",
            placingUntil: null,
          });
          return;
        }
        // odds moved while the request was in flight — honour the preference
        const drifted = cur.selections.filter(
          (x) => x.livePrice !== pricesAtPlace.get(x.outcomeId),
        );
        if (drifted.length > 0) {
          const ok =
            pref === "any" ||
            (pref === "higher" &&
              drifted.every(
                (x) => x.livePrice > (pricesAtPlace.get(x.outcomeId) ?? 0),
              ));
          if (!ok) {
            set({
              status: "failed",
              failReason: "odds-moved",
              placingUntil: null,
            });
            return;
          }
        }
        if (fail) {
          set({ status: "failed", failReason: "network", placingUntil: null });
          return;
        }
        useUI.getState().debit(totalStake);
        const made = useBets.getState().addBets(cur.selections);
        // selections clear on placement (legs never stick in the slip);
        // the receipt keeps the accepted price + ref of each leg
        const receipt: PlacedReceipt = {
          bets: made.map((b) => {
            const sel = cur.selections.find((x) => x.outcomeId === b.outcomeId);
            return {
              id: b.id,
              pick: b.pick,
              odds: b.odds,
              acceptedFrom:
                sel && sel.priceAtPick !== b.odds ? sel.priceAtPick : undefined,
            };
          }),
          stake: totalStake,
          payout: made.reduce((a, b) => a + b.returns, 0),
        };
        set({
          status: "placed",
          lastReceipt: receipt,
          selections: [],
          placingUntil: null,
        });
        // teardown honesty: if the sheet closed or the tab hid mid-flight,
        // the bet still lands — but the user hears about it
        if (document.hidden || (sheetWasOpen && !cur.mobileOpen)) {
          useUI
            .getState()
            .toast(
              `Bet placed ${receipt.bets.map((b) => b.id).join(", ")}`,
              "success",
            );
        }
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
