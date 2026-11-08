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
