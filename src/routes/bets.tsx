import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BetSlipBody } from "../components/BetSlip";
import { MyBetsBody } from "../components/MyBets";

export const Route = createFileRoute("/bets")({ component: BetsPage });

// The ticket page — same two bodies as the panel/sheet (one ticket,
// every surface). W6 keeps the slip reachable behind a tab here.
function BetsPage() {
  const [tab, setTab] = useState<"slip" | "bets">("bets");
  return (
    <div className="mx-auto max-w-[860px] px-3 pt-4 lg:px-4">
      <div
        className="mb-3 flex gap-1 rounded-hb-md border border-c-hairline bg-c-surface-2 p-1 lg:hidden"
        role="tablist"
        aria-label="Ticket"
      >
        {(
          [
            ["slip", "Bet slip"],
            ["bets", "My bets"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`flex h-10 flex-1 items-center justify-center rounded-hb-sm font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
              tab === k
                ? "bg-c-surface-3 text-c-text"
                : "text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="rounded-hb-md border border-c-hairline bg-c-surface-1 lg:border-0 lg:bg-transparent">
        {/* ≥lg the slip lives in the side panel — the page is My bets */}
        <div className="lg:hidden">{tab === "slip" && <BetSlipBody />}</div>
        <div className={tab === "bets" ? "" : "max-lg:hidden"}>
          <MyBetsBody full />
        </div>
      </div>
      <p className="py-6 text-center font-hb-ui text-hb-micro text-c-text-3">
        Demo bets in USDT-labelled sample units · singles only ·
        settled/cash-out states shown
      </p>
    </div>
  );
}
