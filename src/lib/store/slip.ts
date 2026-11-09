import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { outcomeById } from "../seed";
import type { SlipSelection, SlipStatus } from "../types";
import { useBets } from "./bets";
import { useOdds } from "./odds";
import { useUI } from "./ui";
import { useWorld } from "./world";

export type FailReason = "suspended" | "odds-moved" | "funds";

export interface PlacedReceipt {
  bets: { id: string; pick: string; odds: number; acceptedFrom?: number }[];
  stake: number;
  payout: number;
  placedAt: number;
}

const num = (s: string) => parseFloat(s) || 0;
const hashOf = (s: string) => {
  let h = 7;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h.toString(36);
};

/** Content key for a submission — identical leg content mints the same
 *  key within one submission nonce (D-19: a retried request dedupes). */
const contentKey = (sels: SlipSelection[], nonce: number) =>
  `sub-${nonce}-${hashOf(
    sels
      .map((x) => `${x.outcomeId}:${x.stake}:${x.livePrice.toFixed(2)}`)
      .join("|"),
  )}`;

interface SlipState {
  selections: SlipSelection[];
  status: SlipStatus;
  failReason: FailReason | null;
  mobileOpen: boolean;
  lastReceipt: PlacedReceipt | null;
  /** D-19 reconcile: null = nothing in doubt; false = checking the
   *  ledger; true = confirmed NOT in My bets → safe to offer retry. */
  reconciled: boolean | null;
  /** The idempotency key of the in-flight/lost submission — reconcile
   *  checks the ledger for THIS key, never a recomputed guess. */
  pendingKey: string | null;
  submitNonce: number;
  /** E-15: cleared legs stash — Undo restores stakes exactly. */
  cleared: SlipSelection[] | null;
  undoClear: () => void;
  dropUndo: () => void;
  acceptAll: () => void;
  accept: (outcomeId: string) => void;
  toggle: (outcomeId: string) => void;
  remove: (outcomeId: string) => void;
  setStake: (outcomeId: string, stake: string) => void;
  clear: () => void;
  place: () => void;
  /** Reconcile a lost-response placement against the ledger, then
   *  surface the retry affordance only if provably not placed. */
  reconcile: () => void;
  resetStatus: () => void;
  setMobileOpen: (v: boolean) => void;
  onOddsChange: (outcomeId: string, newPrice: number) => void;
  onMarketSuspended: (marketId: string) => void;
  onMarketResumed: (marketId: string) => void;
}

// consent-mode resolution for one price move (D-03/E-06/E-07):
//  "higher" Better prices only — better auto-accepts+announces, worse asks
//  "any"    Any change         — every move auto-accepts+announces
//  "ask"    Ask every time     — every move asks
const resolveMove = (
  x: SlipSelection,
  np: number,
): Pick<SlipSelection, "status" | "priceAtPick" | "moved"> => {
  const pref = useUI.getState().oddsPref;
  const better = np > x.priceAtPick;
  if (np === x.priceAtPick)
    return { status: "active", priceAtPick: x.priceAtPick, moved: undefined };
  if (pref === "any" || (pref === "higher" && better))
    return {
      status: "active",
      priceAtPick: np,
      moved: { from: x.priceAtPick, to: np, kind: better ? "better" : "worse" },
    };
  return { status: "changed", priceAtPick: x.priceAtPick, moved: undefined };
};

export const useSlip = create<SlipState>()(
  subscribeWithSelector((set, get) => ({
    selections: [],
    status: "idle",
    failReason: null,
    mobileOpen: false,
    lastReceipt: null,
    reconciled: null,
    pendingKey: null,
    submitNonce: 1,
    cleared: null,
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
      const liveMt = useWorld
        .getState()
        .matches.find((m) => m.id === found.match.id);
      const liveMk = liveMt?.markets.find((mk) => mk.id === found.market.id);
      const liveOc = liveMk?.outcomes.find((o) => o.id === outcomeId);
      if (
        liveMt?.status === "finished" ||
        liveMk?.status === "suspended" ||
        liveOc?.status === "suspended" ||
        found.outcome.status === "suspended" ||
        found.market.status === "suspended"
      )
        return;
      if (s.status === "placed" || s.status === "failed")
        set({ status: "idle", reconciled: null });
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
    clear: () =>
      set((s) => ({ cleared: s.selections, selections: [], status: "idle" })),
    undoClear: () =>
      set((s) => ({ selections: s.cleared ?? [], cleared: null })),
    dropUndo: () => set({ cleared: null }),
    accept: (outcomeId) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.outcomeId === outcomeId && x.status === "changed"
            ? {
                ...x,
                status: "active",
                priceAtPick: x.livePrice,
                moved: {
                  from: x.priceAtPick,
                  to: x.livePrice,
                  kind: x.livePrice > x.priceAtPick ? "better" : "worse",
                },
              }
            : x,
        ),
      })),
    acceptAll: () =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.status === "changed"
            ? {
                ...x,
                status: "active",
                priceAtPick: x.livePrice,
                moved: {
                  from: x.priceAtPick,
                  to: x.livePrice,
                  kind: x.livePrice > x.priceAtPick ? "better" : "worse",
                },
              }
            : x,
        ),
      })),
    place: () => {
      const s = get();
      if (!s.selections.length) return;
      if (s.status === "placing" || s.status === "unconfirmed") return;
      const ui = useUI.getState();
      // defensive gates — the CTA renders the same reasons disabled;
      // a keyboard/scripted call must not slip past them
      if (ui.offline || ui.breakUntil > Date.now()) return;
      // suspended legs never submit — they stay parked in the ticket
      // and are excluded from totals (frame 5: each leg self-arms)
      const legs = s.selections.filter((x) => x.status !== "suspended");
      if (!legs.length) return;
      // apply the consent mode at tap-time: covered moves auto-accept,
      // uncovered ones keep their per-leg ask (never answered silently)
      const pref = ui.oddsPref;
      set((st) => ({
        selections: st.selections.map((x) =>
          x.status === "changed" &&
          (pref === "any" || (pref === "higher" && x.livePrice > x.priceAtPick))
            ? {
                ...x,
                status: "active",
                priceAtPick: x.livePrice,
                moved: {
                  from: x.priceAtPick,
                  to: x.livePrice,
                  kind: x.livePrice > x.priceAtPick ? "better" : "worse",
                },
              }
            : x,
        ),
      }));
      const cur0 = get();
      const staked = cur0.selections.filter(
        (x) => x.status === "active" && num(x.stake) > 0,
      );
      if (!staked.length || cur0.selections.some((x) => x.status === "changed"))
        return;
      const inBets = useBets
        .getState()
        .bets.filter((b) => b.result === "open")
        .reduce((a, b) => a + b.stake, 0);
      const available = Math.max(0, ui.balance - inBets);
      const totalStake = staked.reduce((a, x) => a + num(x.stake), 0);
      // funds rejection is provable before the request — a confirmed
      // no-debit, never the ambiguous path
      if (totalStake > available) {
        set({ status: "failed", failReason: "funds", pendingKey: null });
        return;
      }
      // snapshot prices at click — a mid-flight move can still reject
      const pricesAtPlace = new Map(
        staked.map((x) => [x.outcomeId, x.livePrice] as const),
      );
      const idemKey = contentKey(staked, get().submitNonce);
      const liveSel = staked.some((x) => {
        const mt = useWorld.getState().matches.find((m) => m.id === x.matchId);
        return mt?.status === "live";
      });
      // honest pending ≤3s: live bets carry the disclosed in-play delay,
      // pre-match confirms fast (E-13b — indeterminate, never a fake bar)
      const delay = liveSel
        ? 2_300 + Math.random() * 600
        : 650 + Math.random() * 350;
      const fail = consumeFailFlag();
      const sheetWasOpen = get().mobileOpen;
      set({ status: "placing", failReason: null, pendingKey: idemKey });
      setTimeout(() => {
        const cur = get();
        if (cur.status !== "placing") return;
        const finish = () =>
          set({
            selections: cur.selections.filter(
              (x) => !staked.some((p) => p.outcomeId === x.outcomeId),
            ),
          });
        const loseResponse = () => {
          // D-19 lost response: no bet is minted, but the request may
          // have LANDED — hold the idem key, reconcile before any retry
          set({
            status: "unconfirmed",
            failReason: null,
            reconciled: false,
          });
          setTimeout(() => get().reconcile(), 900);
        };
        const done = (made: ReturnType<typeof useBets.getState>["bets"]) => {
          const receipt: PlacedReceipt = {
            bets: made.map((b) => {
              const sel = staked.find((x) => x.outcomeId === b.outcomeId);
              return {
                id: b.id,
                pick: b.pick,
                odds: b.odds,
                acceptedFrom:
                  sel && sel.priceAtPick !== b.odds
                    ? sel.priceAtPick
                    : undefined,
              };
            }),
            stake: totalStake,
            payout: made.reduce((a, b) => a + b.returns, 0),
            placedAt: Date.now(),
          };
          finish();
          set({
            status: "placed",
            lastReceipt: receipt,
            reconciled: null,
            pendingKey: null,
            submitNonce: get().submitNonce + 1,
          });
          // teardown honesty: the bet lands server-side regardless — a
          // toast fired into a hidden tab is never seen, so queue it
          const note = `Bet placed ${receipt.bets.map((b) => b.id).join(", ")}`;
          if (document.hidden) {
            const onVis = () => {
              if (!document.hidden) {
                useUI
                  .getState()
                  .toast(`${note} while you were away`, "success");
                document.removeEventListener("visibilitychange", onVis);
              }
            };
            document.addEventListener("visibilitychange", onVis);
          } else if (sheetWasOpen && !get().mobileOpen) {
            useUI.getState().toast(note, "success");
          }
        };
        // idempotent resubmit: the key already minted → return its
        // receipt, never a second bet (D-19 FAIL on E-14)
        const existing = useBets
          .getState()
          .bets.filter((b) => b.idemKey === idemKey);
        if (existing.length) {
          done(existing);
          return;
        }
        // offline mid-flight = the response is lost, not the request
        if (useUI.getState().offline || fail) {
          loseResponse();
          return;
        }
        if (staked.some((x) => x.status === "suspended")) {
          set({ status: "failed", failReason: "suspended", pendingKey: null });
          return;
        }
        const drifted = staked.filter(
          (x) => x.livePrice !== pricesAtPlace.get(x.outcomeId),
        );
        if (drifted.length > 0) {
          const covered = drifted.every(
            (x) =>
              pref === "any" ||
              (pref === "higher" &&
                x.livePrice > (pricesAtPlace.get(x.outcomeId) ?? 0)),
          );
          if (!covered) {
            // confirmed rejection — the server said no before debit;
            // the untouched claim is honest ONLY here
            set((st) => ({
              status: "failed",
              failReason: "odds-moved",
              pendingKey: null,
              selections: st.selections.map((x) =>
                drifted.some((d) => d.outcomeId === x.outcomeId) &&
                x.status !== "suspended"
                  ? { ...x, status: "changed" }
                  : x,
              ),
            }));
            return;
          }
        }
        // no debit() call: `balance` is the TOTAL wallet (canon 240 =
        // 180 + 60 riding). The stake transfers available→in-bets the
        // moment the bet lands in the ledger — debiting as well would
        // count it twice (displayed = billed, invariant 1).
        done(useBets.getState().addBets(staked, idemKey));
      }, delay);
    },
    reconcile: () => {
      const s = get();
      if (s.status !== "unconfirmed") return;
      // check the ledger for the key of the lost submission — the truth
      // lives in My bets, never in a guess (D-19)
      const key = s.pendingKey;
      const landed =
        key != null && useBets.getState().bets.some((b) => b.idemKey === key);
      if (landed) {
        const made = useBets.getState().bets.filter((b) => b.idemKey === key);
        const staked = s.selections.filter(
          (x) => x.status !== "suspended" && num(x.stake) > 0,
        );
        set({
          status: "placed",
          reconciled: null,
          lastReceipt: {
            bets: made.map((b) => ({ id: b.id, pick: b.pick, odds: b.odds })),
            stake: made.reduce((a, b) => a + b.stake, 0),
            payout: made.reduce((a, b) => a + b.returns, 0),
            placedAt: made[0]?.placedAt ?? Date.now(),
          },
          pendingKey: null,
          selections: s.selections.filter(
            (x) => !staked.some((p) => p.outcomeId === x.outcomeId),
          ),
        });
        return;
      }
      // ledger says it never landed — NOW a retry is safe (D-19)
      set({ reconciled: true });
    },
    resetStatus: () =>
      set({
        status: "idle",
        failReason: null,
        reconciled: null,
        pendingKey: null,
      }),
    onOddsChange: (outcomeId, newPrice) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.outcomeId === outcomeId
            ? x.status === "suspended"
              ? { ...x, livePrice: newPrice }
              : { ...x, livePrice: newPrice, ...resolveMove(x, newPrice) }
            : x,
        ),
      })),
    onMarketSuspended: (marketId) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.marketId === marketId
            ? { ...x, status: "suspended", moved: undefined }
            : x,
        ),
      })),
    onMarketResumed: (marketId) =>
      set((s) => ({
        selections: s.selections.map((x) =>
          x.marketId === marketId && x.status === "suspended"
            ? x.livePrice !== x.priceAtPick
              ? {
                  ...x,
                  ...resolveMove({ ...x, status: "active" }, x.livePrice),
                }
              : { ...x, status: "active" }
            : x,
        ),
      })),
  })),
);

let failOnce = false;
export const armFailOnce = () => {
  failOnce = true;
};
function consumeFailFlag() {
  const v = failOnce;
  failOnce = false;
  return v;
}
