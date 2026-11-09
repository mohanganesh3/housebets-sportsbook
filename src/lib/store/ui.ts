import { create } from "zustand";

export type Scenario =
  | "clean"
  | "odds-change"
  | "suspended"
  | "suspend-market"
  | "place-ok"
  | "place-fail"
  | "goal"
  | "cashout-susp"
  | "prefilled"
  | "mixed"
  | "empty-live"
  | "offline";

interface UIState {
  panelTab: "slip" | "bets" | "chat";
  scenario: Scenario;
  scenarioOpen: boolean;
  setPanelTab: (t: UIState["panelTab"]) => void;
  setScenario: (s: Scenario) => void;
  setScenarioOpen: (v: boolean) => void;
  follows: Set<string>;
  toggleFollow: (id: string) => void;
  reminds: Set<string>;
  toggleRemind: (id: string) => void;
  favMarkets: Set<string>;
  toggleFavMarket: (key: string) => void;
  oddsPref: "ask" | "higher" | "any";
  setOddsPref: (p: "ask" | "higher" | "any") => void;
  setBalance: (v: number) => void;
  toasts: { id: number; msg: string; kind: "info" | "success" | "error" }[];
  toast: (msg: string, kind?: "info" | "success" | "error") => void;
  dismissToast: (id: number) => void;
  balance: number;
  debit: (v: number) => void;
  credit: (v: number) => void;
  offline: boolean;
  setOffline: (v: boolean) => void;
}

const loadFollows = (): Set<string> => {
  try {
    const raw = localStorage.getItem("hb-follows");
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {}
  return new Set(["epl", "ars", "rma", "int"]);
};
const saveFollows = (f: Set<string>) => {
  try {
    localStorage.setItem("hb-follows", JSON.stringify([...f]));
  } catch {}
};
const loadReminds = (): Set<string> => {
  try {
    const raw = localStorage.getItem("hb-reminds");
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {}
  return new Set();
};
const saveReminds = (f: Set<string>) => {
  try {
    localStorage.setItem("hb-reminds", JSON.stringify([...f]));
  } catch {}
};
const loadFavMarkets = (): Set<string> => {
  try {
    const raw = localStorage.getItem("hb-favmarkets");
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {}
  return new Set();
};

let tid = 0;
export const useUI = create<UIState>()((set, get) => ({
  panelTab: "slip",
  scenario: "clean",
  scenarioOpen: false,
  setPanelTab: (t) => set({ panelTab: t }),
  setScenario: (s) => set({ scenario: s }),
  setScenarioOpen: (v) => set({ scenarioOpen: v }),
  follows:
    typeof window !== "undefined"
      ? loadFollows()
      : new Set(["epl", "ars", "rma", "int"]),
  toggleFollow: (id) => {
    const f = new Set(get().follows);
    if (f.has(id)) {
      f.delete(id);
      get().toast("Removed from favourites", "info");
    } else {
      f.add(id);
      get().toast("Added to favourites", "success");
    }
    saveFollows(f);
    set({ follows: f });
  },
  reminds: typeof window !== "undefined" ? loadReminds() : new Set(),
  toggleRemind: (id) => {
    const f = new Set(get().reminds);
    if (f.has(id)) {
      f.delete(id);
      get().toast("Kickoff reminder removed", "info");
    } else {
      f.add(id);
      get().toast("Reminder set · we'll flag kickoff", "success");
    }
    saveReminds(f);
    set({ reminds: f });
  },
  favMarkets:
    typeof window !== "undefined" ? loadFavMarkets() : new Set<string>(),
  toggleFavMarket: (key) => {
    const f = new Set(get().favMarkets);
    if (f.has(key)) {
      f.delete(key);
      get().toast("Removed from My markets", "info");
    } else {
      f.add(key);
      get().toast("Pinned to My markets", "success");
    }
    try {
      localStorage.setItem("hb-favmarkets", JSON.stringify([...f]));
    } catch {}
    set({ favMarkets: f });
  },
  oddsPref:
    typeof window !== "undefined" &&
    ["ask", "higher", "any"].includes(
      localStorage.getItem("hb-odds-pref") ?? "",
    )
      ? (localStorage.getItem("hb-odds-pref") as "ask" | "higher" | "any")
      : "ask",
  setOddsPref: (p) => {
    try {
      localStorage.setItem("hb-odds-pref", p);
    } catch {}
    set({ oddsPref: p });
  },
  // a stored 0.00 must read back as 0.00 — `|| 1250` revived it
  balance:
    typeof window !== "undefined" && localStorage.getItem("hb-balance") !== null
      ? Number(localStorage.getItem("hb-balance"))
      : 1250,
  setBalance: (v) => {
    const balance = +v.toFixed(2);
    try {
      localStorage.setItem("hb-balance", String(balance));
    } catch {}
    set({ balance });
  },
  debit: (v) =>
    set((s) => {
      const balance = +(s.balance - v).toFixed(2);
      try {
        localStorage.setItem("hb-balance", String(balance));
      } catch {}
      return { balance };
    }),
  credit: (v) =>
    set((s) => {
      const balance = +(s.balance + v).toFixed(2);
      try {
        localStorage.setItem("hb-balance", String(balance));
      } catch {}
      return { balance };
    }),
  offline: false,
  setOffline: (v) => set({ offline: v }),
  toasts: [],
  toast: (msg, kind = "info") => {
    const id = ++tid;
    set((s) => ({ toasts: [...s.toasts, { id, msg, kind }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      2800,
    );
  },
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
