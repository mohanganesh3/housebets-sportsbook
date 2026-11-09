import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { HouseGlyph } from "../components/BetSlip";
import { ScenarioDock, SearchPalette, Toaster } from "../components/Overlays";
import {
  BOARD_PATHS,
  BottomBar,
  GlobalSheets,
  LeftRail,
  OfflineBanner,
  SidePanel,
  SlipPill,
  SlipSheet,
  SportRow,
  TopBar,
} from "../components/Shell";
import { useEngine } from "../lib/engine";
import { useUI } from "../lib/store/ui";

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 pt-24 text-center">
      <HouseGlyph className="text-brand-300/70" size={44} />
      <h1 className="text-[18px] font-bold">This market doesn't exist</h1>
      <p className="text-[13px] leading-relaxed text-text-tertiary">
        The page you asked for was voided before it priced. Head back to the
        live board.
      </p>
      <Link
        to="/"
        className="btn-primary mt-1 rounded-lg px-4 py-2 text-[13px] font-bold"
      >
        Back to the action
      </Link>
    </div>
  );
}

type SupportKind = "rules" | "rg" | "contact";

const SUPPORT_COPY: Record<SupportKind, { title: string; body: ReactNode }> = {
  rules: {
    title: "Bet settlement rules",
    body: (
      <>
        <p>
          This prototype settles bets the way a real book does: at the final
          whistle every market that can be graded from the score is graded —
          match result, double chance, totals, BTTS, correct score and related
          lines. Anything that can't be proven from the score (goalscorer
          markets, for example) is <strong>voided</strong> and the stake comes
          straight back.
        </p>
        <p>
          Cash-out value tracks the live price of your selection minus the
          bookmaker margin, and locks permanently when a market suspends or the
          match ends.
        </p>
        <p className="text-text-tertiary">
          Demo only · results are simulated, no real-money rules apply.
        </p>
      </>
    ),
  },
  rg: {
    title: "Responsible gambling",
    body: (
      <>
        <p>
          Betting should be entertainment, never income. On a real book you'd
          set deposit limits, loss limits and reality checks — this demo shows
          the cues a shipped product needs.
        </p>
        <p>
          The bet slip always shows your session time, all-time net result and
          your balance after the bet — no hidden spend, ever.
        </p>
      </>
    ),
  },
  contact: {
    title: "Contact support",
    body: (
      <>
        <p>
          This is a design prototype, so there's no live support desk —
          everything on screen runs against local sample data.
        </p>
        <p>
          Feedback on the demo lives with its author; a production book would
          run 24/7 chat and email escalation here.
        </p>
      </>
    ),
  },
};

function SupportDialog({
  kind,
  onClose,
}: {
  kind: SupportKind;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const { title, body } = SUPPORT_COPY[kind];
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-sm rounded-2xl border border-border-soft bg-surface-primary p-5 shadow-2xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[16px] font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-lg text-text-tertiary hover:bg-surface-secondary"
          >
            ×
          </button>
        </div>
        <div className="space-y-3 text-[12.5px] leading-relaxed text-text-secondary">
          {body}
        </div>
        {kind === "rg" && (
          <button
            type="button"
            onClick={() => {
              useUI.getState().takeBreak(10);
              onClose();
            }}
            className="btn-primary mt-4 w-full rounded-xl py-2.5 text-[13px] font-bold"
          >
            Take a 10-minute break now
          </button>
        )}
      </motion.div>
    </div>
  );
}

function Footer() {
  const [support, setSupport] = useState<SupportKind | null>(null);
  const SUPPORT_LABELS: [string, SupportKind][] = [
    ["Bet settlement rules", "rules"],
    ["Responsible gambling", "rg"],
    ["Contact support", "contact"],
  ];
  return (
    <footer className="mt-10 border-t border-border-soft px-4 py-8 text-[12px] text-text-tertiary lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-text-secondary">
            Sportsbook
          </p>
          <ul className="space-y-1.5">
            <li>
              <Link
                to="/live"
                className="transition-colors hover:text-text-secondary"
              >
                Live
              </Link>
            </li>
            <li>
              <Link
                to="/football"
                className="transition-colors hover:text-text-secondary"
              >
                Football
              </Link>
            </li>
            <li>
              <Link
                to="/following"
                className="transition-colors hover:text-text-secondary"
              >
                Following
              </Link>
            </li>
            <li>
              <Link
                to="/bets"
                className="transition-colors hover:text-text-secondary"
              >
                My bets
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-text-secondary">
            Support
          </p>
          <ul className="space-y-1.5">
            {SUPPORT_LABELS.map(([label, kind]) => (
              <li key={kind}>
                <button
                  type="button"
                  className="transition-colors hover:text-text-secondary"
                  onClick={() => setSupport(kind)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {support && (
              <SupportDialog kind={support} onClose={() => setSupport(null)} />
            )}
          </AnimatePresence>
        </div>
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-text-secondary">
            Play responsibly
          </p>
          <p className="leading-relaxed">
            Betting should be entertainment, never a way to make money. Set
            limits and take breaks. 18+
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-2 border-t border-border-soft pt-4">
        <p className="leading-relaxed">
          Prototype · sample data only, no real money, no real odds. Built for
          the Housebets sportsbook design contest.
        </p>
        <p className="text-text-disabled">
          © 2026 Housebets demo · Not affiliated with housebets.com
        </p>
      </div>
    </footer>
  );
}

function Root() {
  const [searchOpen, setSearchOpen] = useState(false);
  const start = useEngine((s) => s.start);
  const loc = useLocation();
  const railOpen = useUI((s) => s.railOpen);
  const panelOpen = useUI((s) => s.panelOpen);
  const isBoard = BOARD_PATHS.includes(loc.pathname);

  useEffect(() => {
    start();
  }, [start]);

  // demo auth resolves shortly after first paint — SH-02's logged-out
  // frame is the pre-resolve state, not a route
  useEffect(() => {
    const t = setTimeout(() => {
      if (!useUI.getState().signedIn) useUI.getState().setSignedIn(true);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // ⌘K / Ctrl-K toggles the palette; "/" opens it (SH-06)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
        return;
      }
      const el = e.target as HTMLElement | null;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        Boolean(el?.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  // real connectivity drives the same flag the state-tour uses —
  // debounced ≥2s both directions so bad networks don't flap (E-SHL-05)
  useEffect(() => {
    let t: number | undefined;
    const apply = (v: boolean) => {
      window.clearTimeout(t);
      t = window.setTimeout(() => useUI.getState().setOffline(v), 2000);
    };
    const off = () => apply(true);
    const on = () => apply(false);
    window.addEventListener("offline", off);
    window.addEventListener("online", on);
    return () => {
      window.removeEventListener("offline", off);
      window.removeEventListener("online", on);
      window.clearTimeout(t);
    };
  }, []);

  // reconnect = `Back online` toast (3s auto-dismiss via the toaster)
  useEffect(
    () =>
      useUI.subscribe((s, p) => {
        if (p.offline && !s.offline) s.toast("Back online", "success");
      }),
    [],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="hb-shell flex min-h-dvh flex-col">
        <a href="#board" className="hb-skip">
          Skip to board
        </a>
        <TopBar onSearch={() => setSearchOpen(true)} />
        <LeftRail />
        {/* DOM order = focus order: top bar → rail → board → panel → nav */}
        <main
          id="board"
          tabIndex={-1}
          className={`flex-1 pt-[var(--layout-header)] pb-[calc(var(--layout-bottombar)+env(safe-area-inset-bottom)+var(--s-16))] transition-[margin] duration-(--dur-enter) ease-standard lg:pb-0 ${
            railOpen ? "lg:ms-[var(--layout-rail)]" : ""
          } ${panelOpen ? "desk:me-[var(--layout-panel)]" : ""}`}
        >
          <SportRow />
          <OfflineBanner underRow={isBoard} />
          <Outlet />
          <Footer />
        </main>
        <SidePanel />
        <SlipPill />
        <BottomBar onSearch={() => setSearchOpen(true)} />
        <SlipSheet />
        <GlobalSheets />
        <AnimatePresence>
          {searchOpen && (
            <SearchPalette
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
            />
          )}
        </AnimatePresence>
        <ScenarioDock />
        <Toaster />
      </div>
    </MotionConfig>
  );
}
