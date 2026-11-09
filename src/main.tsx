import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  defaultViewTransition: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// dev-only QC handle — lets Playwright drive store transitions (FT,
// offline, settlement) without waiting on the compressed demo clock
if (import.meta.env.DEV) {
  const { useWorld } = await import("./lib/store/world");
  const { useBets } = await import("./lib/store/bets");
  const { useSlip } = await import("./lib/store/slip");
  const { useUI } = await import("./lib/store/ui");
  const { useOdds } = await import("./lib/store/odds");
  const { useEngine } = await import("./lib/engine");
  (window as unknown as Record<string, unknown>).__hb = {
    useWorld,
    useBets,
    useSlip,
    useUI,
    useOdds,
    useEngine,
  };
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
