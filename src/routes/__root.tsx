import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ScenarioDock, SearchPalette, Toaster } from "../components/Overlays";
import {
  BottomBar,
  LeftRail,
  SidePanel,
  SlipSheet,
  TopBar,
} from "../components/Shell";
import { useEngine } from "../lib/engine";

export const Route = createRootRoute({
  component: Root,
});

function Footer() {
  return (
    <footer className="mt-10 border-t border-border-soft px-4 py-8 text-[12px] text-text-tertiary lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-text-secondary">
            Sportsbook
          </p>
          <ul className="space-y-1.5">
            <li>Live</li>
            <li>Football</li>
            <li>Following</li>
            <li>My bets</li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-text-secondary">
            Support
          </p>
          <ul className="space-y-1.5">
            <li>Bet settlement rules</li>
            <li>Responsible gambling</li>
            <li>Contact support</li>
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
          Prototype — sample data only, no real money, no real odds. Built for
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
    <div className="min-h-dvh">
      <TopBar onSearch={() => setSearchOpen(true)} />
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
  );
}
