import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { HouseGlyph } from "../components/BetSlip";
import { ScenarioDock, SearchPalette, Toaster } from "../components/Overlays";
import {
  BottomBar,
  LeftRail,
  SidePanel,
  SlipSheet,
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

function OfflineBanner() {
  const offline = useUI((s) => s.offline);
  const setOffline = useUI((s) => s.setOffline);
  return (
    <AnimatePresence>
      {offline && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="fixed inset-x-0 top-[var(--shell-header-h)] z-40 flex items-center justify-center gap-3 bg-warning-a15 px-4 py-2 text-[12.5px] font-semibold text-warning-400 backdrop-blur lg:left-[var(--shell-rail-w)] lg:right-[var(--panel-w)]"
          role="alert"
        >
          Connection lost · odds are frozen, bets can't be placed
          <button
            type="button"
            onClick={() => setOffline(false)}
            className="rounded-full border border-warning-a40 px-2.5 py-0.5 text-[11px] hover:bg-warning-a15"
          >
            Reconnect
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
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
            {[
              "Bet settlement rules",
              "Responsible gambling",
              "Contact support",
            ].map((label) => (
              <li key={label}>
                <button
                  type="button"
                  className="transition-colors hover:text-text-secondary"
                  onClick={() =>
                    useUI
                      .getState()
                      .toast(
                        `${label} isn't wired in this prototype · demo only`,
                      )
                  }
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
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

  useEffect(() => {
    start();
  }, [start]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh">
        <TopBar onSearch={() => setSearchOpen(true)} />
        <OfflineBanner />
        <LeftRail />
        <SidePanel />
        <main className="pb-[calc(var(--shell-bottombar-h)+env(safe-area-inset-bottom)+16px)] pt-[var(--shell-header-h)] lg:ml-[var(--shell-rail-w)] lg:mr-[var(--panel-w)] lg:pb-0">
          <Outlet />
          <Footer />
        </main>
        <BottomBar onSearch={() => setSearchOpen(true)} />
        <SlipSheet />
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
