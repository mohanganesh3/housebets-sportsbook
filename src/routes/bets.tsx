import { createFileRoute } from "@tanstack/react-router";
import { ReceiptText, Ticket } from "lucide-react";
import { useState } from "react";
import { BetSlipBody } from "../components/BetSlip";
import { MyBetsBody } from "../components/MyBets";

export const Route = createFileRoute("/bets")({ component: BetsPage });

function BetsPage() {
  const [tab, setTab] = useState<"slip" | "bets">("bets");
  return (
    <div className="mx-auto max-w-[860px] px-3 pt-4 lg:px-4">
      <h1 className="mb-3 flex items-center gap-2 px-1 text-[18px] font-bold">
        <ReceiptText size={19} className="text-brand-400" /> Bet slip & My bets
      </h1>
      {/* Mobile tabs (desktop already has the side panel, but this page must stand alone) */}
      <div
        className="mb-4 flex gap-1.5 rounded-xl border border-border-soft bg-surface-primary p-1"
        role="tablist"
      >
        {(
          [
            ["slip", Ticket, "Bet slip"],
            ["bets", ReceiptText, "My bets"],
          ] as const
        ).map(([k, Icon, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-lg text-[14px] font-semibold transition-colors ${tab === k ? "bg-secondary-a20 text-brand-300" : "text-text-tertiary"}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-border-soft bg-surface-primary">
        {tab === "slip" ? (
          <BetSlipBody />
        ) : (
          <div className="pt-3">
            <MyBetsBody />
          </div>
        )}
      </div>
      <p className="py-6 text-center text-[11px] text-text-tertiary">
        Demo bets in USDT-labelled sample units · singles only ·
        settled/cash-out states shown
      </p>
    </div>
  );
}
