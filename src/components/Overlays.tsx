import { useNavigate } from "@tanstack/react-router";
import { Clock, FlaskConical, Search, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEngine } from "../lib/engine";
import { COMPS, compShort, MATCHES } from "../lib/seed";
import { isMatchFollowed } from "../lib/selectors";
import { useBets } from "../lib/store/bets";
import { useOdds } from "../lib/store/odds";
import { armFailOnce, useSlip } from "../lib/store/slip";
import { type Scenario, useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import { TeamLogo } from "./primitives";

const RECENTS_KEY = "hb-search-recents";
const loadRecents = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) ?? "[]");
  } catch {
    return [];
  }
};
const saveRecent = (term: string) => {
  try {
    const list = [term, ...loadRecents().filter((t) => t !== term)].slice(0, 6);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(list));
  } catch {}
};

export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const follows = useUI((s) => s.follows);
  const [recents, setRecents] = useState<string[]>(loadRecents);
  // world matches — badges/statuses must reflect live state, not the seed
  const wMatches = useWorld((s) => s.matches);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const rank = (m: (typeof MATCHES)[number]) =>
      (isMatchFollowed(m, follows) ? 0 : 1) + (m.status === "live" ? 0 : 0.5);
    const matches = wMatches
      .filter(
        (m) =>
          !needle ||
          m.home.name.toLowerCase().includes(needle) ||
          m.away.name.toLowerCase().includes(needle) ||
          m.home.short.toLowerCase().includes(needle) ||
          m.away.short.toLowerCase().includes(needle),
      )
      .sort((a, b) => rank(a) - rank(b));
    const comps = Object.values(COMPS).filter(
      (c) =>
        !needle ||
        c.name.toLowerCase().includes(needle) ||
        c.country.toLowerCase().includes(needle),
    );
    const markets =
      needle.length > 1
        ? wMatches
            .flatMap((m) =>
              m.markets
                .filter((mk) => mk.name.toLowerCase().includes(needle))
                .map((mk) => ({ m, mk })),
            )
            .slice(0, 5)
        : [];
    // players are indexed via goalscorer market outcomes — every
    // scorer outcome carries a squad name in this seed
    const players =
      needle.length > 1
        ? wMatches
            .flatMap((m) =>
              m.markets
                .filter((mk) => mk.group === "goalscorers")
                .flatMap((mk) =>
                  mk.outcomes
                    .filter((o) => o.name.toLowerCase().includes(needle))
                    .map((o) => ({ m, mk, o })),
                ),
            )
            .filter(
              (v, i, a) => a.findIndex((x) => x.o.name === v.o.name) === i,
            )
            .slice(0, 6)
        : [];
    return {
      matches: matches.slice(0, 7),
      comps: comps.slice(0, 4),
      markets,
      players,
    };
  }, [q, follows, wMatches]);

  const go = (term: string, fn: () => void) => {
    saveRecent(term);
    setRecents(loadRecents());
    fn();
    onClose();
  };

  // flat keyboard order: comps → matches → markets → players, same as render
  const flat = useMemo(
    () => [
      ...results.comps.map((c) => ({
        key: c.id,
        act: () => go(c.name, () => nav({ to: "/football" })),
      })),
      ...results.matches.map((m) => ({
        key: m.id,
        act: () =>
          go(`${m.home.short} v ${m.away.short}`, () =>
            nav({ to: "/match/$matchId", params: { matchId: m.id } }),
          ),
      })),
      ...results.markets.map(({ m, mk }) => ({
        key: mk.id,
        act: () =>
          go(mk.name, () =>
            nav({ to: "/match/$matchId", params: { matchId: m.id } }),
          ),
      })),
      ...results.players.map(({ m, o }) => ({
        key: o.id,
        act: () =>
          go(o.name, () =>
            nav({ to: "/match/$matchId", params: { matchId: m.id } }),
          ),
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results],
  );
  const [hi, setHi] = useState(-1);
  useEffect(() => setHi(-1), [q]);
  const hl = (key: string) =>
    hi >= 0 && flat[hi]?.key === key ? " bg-surface-secondary" : "";
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) =>
        flat.length === 0
          ? -1
          : e.key === "ArrowDown"
            ? (h + 1) % flat.length
            : (h - 1 + flat.length) % flat.length,
      );
    } else if (e.key === "Enter" && hi >= 0 && flat[hi]) {
      flat[hi].act();
    } else if (e.key === "Escape") onClose();
  };

  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -16, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto mt-[12vh] w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-border-very-strong bg-surface-primary shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border-soft px-4">
          <Search size={17} className="text-text-tertiary" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={hi >= 0 ? `sr-${flat[hi]?.key}` : undefined}
            placeholder="Teams, players, competitions, markets…"
            className="h-13 w-full bg-transparent text-[15px] outline-none placeholder:text-text-tertiary"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-text-tertiary hover:text-text-primary"
          >
            <X size={16} />
          </button>
        </div>
        <div
          id="search-results"
          role="listbox"
          className="max-h-[55vh] overflow-y-auto p-2"
        >
          {!q && recents.length > 0 && (
            <div className="px-1 pb-2">
              <p className="flex items-center gap-1.5 px-2 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-text-tertiary">
                <Clock size={11} /> Recent
              </p>
              <div className="flex flex-wrap gap-1.5 px-1">
                {recents.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setQ(r)}
                    className="rounded-full border border-border-soft px-2.5 py-1 text-[12px] text-text-secondary hover:border-border-interactive hover:text-text-primary"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!q && results.matches.some((m) => isMatchFollowed(m, follows)) && (
            <p className="flex items-center gap-1.5 px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-gold-500">
              <Star size={11} className="fill-gold-500" /> Following
            </p>
          )}
          {results.comps.map((c) => (
            <button
              key={c.id}
              id={`sr-${c.id}`}
              type="button"
              onClick={() => go(c.name, () => nav({ to: "/football" }))}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] hover:bg-surface-secondary${hl(c.id)}`}
            >
              <span className="grid size-7 place-items-center rounded-md bg-secondary-a30 font-odds text-[10px] font-bold text-brand-300">
                {compShort(c.id)}
              </span>
              {c.name}
              <span className="ml-auto text-[12px] text-text-tertiary">
                {c.country}
              </span>
            </button>
          ))}
          {results.matches.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() =>
                go(`${m.home.short} v ${m.away.short}`, () =>
                  nav({ to: "/match/$matchId", params: { matchId: m.id } }),
                )
              }
              id={`sr-${m.id}`}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-surface-secondary${hl(m.id)}`}
            >
              <TeamLogo team={m.home} size={24} />
              <TeamLogo team={m.away} size={24} />
              <span className="text-[14px]">
                {m.home.name} <span className="text-text-tertiary">v</span>{" "}
                {m.away.name}
              </span>
              {isMatchFollowed(m, follows) && (
                <Star size={12} className="fill-gold-500 text-gold-500" />
              )}
              {m.status === "live" && (
                <span className="ml-auto rounded bg-error-500/15 px-1.5 py-0.5 font-odds text-[10px] font-bold text-error-300">
                  LIVE
                </span>
              )}
            </button>
          ))}
          {results.markets.map(({ m, mk }) => (
            <button
              key={mk.id}
              type="button"
              onClick={() =>
                go(mk.name, () =>
                  nav({ to: "/match/$matchId", params: { matchId: m.id } }),
                )
              }
              id={`sr-${mk.id}`}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] hover:bg-surface-secondary${hl(mk.id)}`}
            >
              <span className="text-text-tertiary">Market</span>
              {mk.name}
              <span className="ml-auto text-[11px] text-text-tertiary">
                {m.home.short} v {m.away.short}
              </span>
            </button>
          ))}
          {results.players.map(({ m, mk, o }) => (
            <button
              key={o.id}
              type="button"
              onClick={() =>
                go(o.name, () =>
                  nav({ to: "/match/$matchId", params: { matchId: m.id } }),
                )
              }
              id={`sr-${o.id}`}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] hover:bg-surface-secondary${hl(o.id)}`}
            >
              <span className="grid size-6 place-items-center rounded-full bg-secondary-a30 font-odds text-[9px] font-bold text-brand-300">
                {o.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="flex flex-col">
                <span className="text-[13px] font-medium">{o.name}</span>
                <span className="text-[10.5px] text-text-tertiary">
                  {mk.name} · {m.home.short} v {m.away.short}
                </span>
              </span>
            </button>
          ))}
          {q &&
            !results.matches.length &&
            !results.comps.length &&
            !results.markets.length &&
            !results.players.length && (
              <p className="px-3 py-8 text-center text-[13px] text-text-tertiary">
                No matches for “{q}” — sample data covers the listed fixtures.
              </p>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const SCEN: { key: Scenario; label: string; hint: string }[] = [
  { key: "clean", label: "Reset", hint: "Clear slip + resume markets" },
  {
    key: "prefilled",
    label: "Pre-filled slip",
    hint: "3 selections, stakes set",
  },
  {
    key: "odds-change",
    label: "Odds change",
    hint: "Slip prices move → accept",
  },
  {
    key: "suspend-market",
    label: "Suspend market",
    hint: "Total goals locks 15s",
  },
  {
    key: "suspended",
    label: "Suspended pick",
    hint: "Pick in slip gets locked",
  },
  { key: "place-ok", label: "Place → success", hint: "Placed state + My bets" },
  { key: "place-fail", label: "Place → fail", hint: "Placement rejected" },
  {
    key: "goal",
    label: "Goal flash",
    hint: "BHA equalise · lock → reprice",
  },
  {
    key: "cashout-susp",
    label: "Cash-out susp.",
    hint: "Open bet cash-out locks",
  },
  {
    key: "mixed",
    label: "Mixed slip",
    hint: "Active + moved + suspended",
  },
  {
    key: "empty-live",
    label: "Nothing live",
    hint: "Starting-soon empty state",
  },
  {
    key: "ft",
    label: "Full time",
    hint: "ARS-BHA ends · bets settle",
  },
  {
    key: "offline",
    label: "Go offline",
    hint: "Odds freeze · placement fails",
  },
];

export function ScenarioDock() {
  const { scenarioOpen, setScenarioOpen, scenario, setScenario, toast } =
    useUI();
  const slip = useSlip();
  const world = useWorld();
  const bets = useBets();

  const run = (s: Scenario) => {
    setScenario(s);
    const pickSome = () => {
      ["ars-bha", "juv-rom", "new-eve"].forEach((id) => {
        const mt = world.matches.find((x) => x.id === id);
        const oc = mt?.markets.find((m) => m.key === "h2h")?.outcomes[0];
        if (oc) slip.toggle(oc.id);
      });
      slip.selections.forEach((x, i) => {
        slip.setStake(x.outcomeId, ["10", "25", "5"][i] ?? "10");
      });
    };
    // the offline freeze is honest — scenarios that mutate the board
    // can't fire while it holds (placement scenarios still run: they
    // demonstrate the real network failure)
    if (
      useUI.getState().offline &&
      [
        "odds-change",
        "suspend-market",
        "suspended",
        "mixed",
        "empty-live",
        "ft",
      ].includes(s)
    ) {
      toast("Board frozen · reconnect first", "info");
      return;
    }
    switch (s) {
      case "clean":
        slip.clear();
        world.setLiveEmpty(false);
        useUI.getState().setOffline(false);
        // restore seed truth: open markets reopen, seed-suspended and
        // finished-match markets stay exactly as they should
        world.matches.forEach((mt) => {
          if (mt.status === "finished") return;
          const seedMt = MATCHES.find((x) => x.id === mt.id);
          mt.markets.forEach((mk) => {
            const seedMk = seedMt?.markets.find((x) => x.id === mk.id);
            const want = seedMk?.status === "suspended" ? "suspended" : "open";
            if (mk.status !== want) world.setMarketStatus(mt.id, mk.id, want);
          });
        });
        toast("Reset · clean state", "success");
        break;
      case "prefilled":
        slip.clear();
        pickSome();
        toast("Slip pre-filled · 3 singles", "info");
        break;
      case "odds-change": {
        slip.clear();
        pickSome();
        setTimeout(() => {
          const ids = useSlip
            .getState()
            .selections.slice(0, 2)
            .map((x) => x.outcomeId);
          ids.forEach((id, i) => {
            const cur = useSlip
              .getState()
              .selections.find((x) => x.outcomeId === id)!;
            const np = +(cur.livePrice + (i === 0 ? 0.25 : -0.18)).toFixed(2);
            // move the board price too — the slip and the cell must agree
            useOdds
              .getState()
              .applyChange(id, np, np > cur.livePrice ? "up" : "down");
            useSlip.getState().onOddsChange(id, np);
            useBets.getState().tickCashout(id, np);
          });
        }, 400);
        toast("Odds moved on 2 selections · accept to place", "info");
        break;
      }
      case "suspend-market":
        // M-07: `Total goals` locks on a dangerous attack — reason chip
        // + dimmed last price, then an honest reopen
        world.setMarketStatus(
          "ars-bha",
          "ars-bha-tg25",
          "suspended",
          "dangerous attack",
        );
        slip.onMarketSuspended("ars-bha-tg25");
        bets.suspendCashout("ars-bha");
        setTimeout(() => {
          // never resurrect a finished match
          if (
            useWorld.getState().matches.find((m) => m.id === "ars-bha")
              ?.status !== "live"
          )
            return;
          world.setMarketStatus("ars-bha", "ars-bha-tg25", "open");
          slip.onMarketResumed("ars-bha-tg25");
          bets.resumeCashout("ars-bha");
        }, 15_000);
        toast("Total goals 2.5 suspended for 15s", "info");
        break;
      case "suspended": {
        slip.clear();
        pickSome();
        const first = useSlip.getState().selections[0];
        if (first) {
          world.setMarketStatus(
            first.matchId,
            first.marketId,
            "suspended",
            "dangerous attack",
          );
          slip.onMarketSuspended(first.marketId);
        }
        toast("A selection in the slip was suspended", "info");
        break;
      }
      case "place-ok":
        if (!useSlip.getState().selections.length) pickSome();
        useSlip.getState().acceptAll();
        setTimeout(() => slip.place(), 350);
        toast("Placing bet…", "info");
        break;
      case "place-fail":
        armFailOnce();
        if (!useSlip.getState().selections.length) pickSome();
        useSlip.getState().acceptAll();
        setTimeout(() => slip.place(), 350);
        toast("Next placement will fail (demo)", "info");
        break;
      case "goal": {
        if (useUI.getState().offline) {
          toast("Board frozen · goal can't land while offline", "info");
          break;
        }
        const gm =
          world.matches.find(
            (m) => m.id === "ars-bha" && m.status === "live",
          ) ?? world.matches.find((m) => m.status === "live");
        if (!gm) {
          toast("No live match to score in", "info");
          break;
        }
        // M-08 deterministic trigger: on the flagship, Brighton equalise
        // at 54' → 1–1 → score roll → edge flash → score-derived markets
        // lock same-frame → canonical reprice. The engine owns the whole
        // arc; the dock just pushes the feed event.
        const flagship = gm.id === "ars-bha";
        if (flagship) world.setMinute(gm.id, 54);
        const sc: [number, number] = [gm.score.home, gm.score.away + 1];
        useEngine.getState().pushEvent({
          kind: "goal",
          at: 0,
          matchId: gm.id,
          scorer: flagship ? "S. Whitfield" : undefined,
          newScore: sc,
        });
        toast(
          `GOAL · ${gm.away.short} ${sc[0]}-${sc[1]} (flash + suspension cascade)`,
          "success",
        );
        break;
      }
      case "cashout-susp":
        bets.suspendCashout("juv-rom");
        setTimeout(() => useBets.getState().resumeCashout("juv-rom"), 15_000);
        toast("Cash out suspended on open bets", "info");
        break;
      case "mixed": {
        slip.clear();
        pickSome();
        setTimeout(() => {
          const sels = useSlip.getState().selections;
          if (sels[0]) {
            const np = +(sels[0].livePrice + 0.22).toFixed(2);
            useOdds.getState().applyChange(sels[0].outcomeId, np, "up");
            useSlip.getState().onOddsChange(sels[0].outcomeId, np);
            useBets.getState().tickCashout(sels[0].outcomeId, np);
          }
          const last = sels[sels.length - 1];
          if (last) {
            world.setMarketStatus(
              last.matchId,
              last.marketId,
              "suspended",
              "dangerous attack",
            );
            useSlip.getState().onMarketSuspended(last.marketId);
          }
        }, 400);
        toast("Mixed slip · moved, suspended and live picks together", "info");
        break;
      }
      case "empty-live":
        world.setLiveEmpty(true);
        toast("Live list emptied · 'Starting soon' takes over", "info");
        break;
      case "ft": {
        // walk a live match to full time so settlement is demoable on demand:
        // jump to stoppage time, then let the normal advance path whistle,
        // close every market and grade all open bets.
        const ft =
          world.matches.find(
            (m) => m.id === "ars-bha" && m.status === "live",
          ) ?? world.matches.find((m) => m.status === "live");
        if (!ft) {
          toast("No live match to finish", "info");
          break;
        }
        world.setMinute(ft.id, 92);
        toast(
          `${ft.home.short} v ${ft.away.short} → 90'+ · full time lands in a moment`,
          "info",
        );
        setTimeout(() => {
          useWorld.getState().advance(ft.id);
          setTimeout(() => useWorld.getState().advance(ft.id), 900);
        }, 1_200);
        break;
      }
      case "offline":
        useUI.getState().setOffline(!useUI.getState().offline);
        toast(
          useUI.getState().offline
            ? "Connection lost · odds frozen, placement will fail"
            : "Back online · prices resumed",
          useUI.getState().offline ? "error" : "success",
        );
        break;
    }
  };

  return (
    <>
      <AnimatePresence>
        {scenarioOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="fixed bottom-20 right-3 z-[70] w-72 rounded-2xl border border-border-very-strong bg-surface-primary/97 p-2 shadow-2xl backdrop-blur-md lg:bottom-4 lg:right-[calc(var(--panel-w)+12px)]"
          >
            <div className="mb-1 flex items-center justify-between px-2 pt-1">
              <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-brand-300">
                <FlaskConical size={13} /> State tourer
              </p>
              <button
                type="button"
                onClick={() => setScenarioOpen(false)}
                className="rounded p-1 text-text-tertiary hover:text-text-primary"
              >
                <X size={13} />
              </button>
            </div>
            <p className="px-2 pb-2 text-[11px] leading-snug text-text-tertiary">
              One-click demo of every scored state. Sample data only.
            </p>
            <div className="grid grid-cols-2 gap-1">
              {SCEN.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => run(x.key)}
                  title={x.hint}
                  className={`rounded-lg px-2 py-2 text-left text-[11.5px] font-medium transition-colors ${scenario === x.key ? "bg-secondary-a30 text-brand-200" : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"}`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setScenarioOpen(!scenarioOpen)}
        aria-label="Demo states"
        className="fixed left-1.5 top-1/2 z-[70] hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-border-very-strong bg-surface-secondary/80 text-text-tertiary shadow-lg backdrop-blur-sm transition-colors hover:border-border-interactive hover:text-brand-300 lg:bottom-4 lg:left-auto lg:right-[calc(var(--panel-w)+14px)] lg:top-auto lg:grid lg:translate-y-0"
      >
        <FlaskConical size={17} />
      </button>
    </>
  );
}

export function Toaster() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismissToast);
  return (
    <div
      className="pointer-events-none fixed left-1/2 top-[calc(var(--shell-header-h)+10px)] z-[80] flex w-[min(360px,92vw)] -translate-x-1/2 flex-col items-center gap-2"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label={`Dismiss · ${t.msg}`}
            initial={{ y: -14, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-[13px] font-medium shadow-xl backdrop-blur-md ${
              t.kind === "success"
                ? "border-success-500/40 bg-success-a15 text-success-400"
                : t.kind === "error"
                  ? "border-error-400/40 bg-error-a15 text-error-300"
                  : "border-border-very-strong bg-surface-secondary/95 text-text-primary"
            }`}
          >
            <span className="flex-1">{t.msg}</span>
            <X size={12} className="shrink-0 opacity-60" aria-hidden />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
