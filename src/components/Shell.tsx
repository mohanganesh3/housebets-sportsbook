import { Dialog } from "@base-ui/react/dialog";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronUp,
  House,
  MessageCircle,
  RadioTower,
  ReceiptText,
  Search,
  Star,
  Ticket,
  Trophy,
  Volleyball,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import { BetSlipBody } from "./BetSlip";
import { HousebetsLogo } from "./HousebetsLogo";
import { MyBetsBody } from "./MyBets";

export function Logo() {
  return (
    <Link to="/" className="flex items-center" aria-label="Housebets home">
      <HousebetsLogo height={21} />
    </Link>
  );
}

export function TopBar({ onSearch }: { onSearch: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[var(--shell-header-h)] items-center gap-3 border-b border-border-soft bg-bg-primary/95 px-3 backdrop-blur-md lg:px-5">
      <Logo />
      {/* centered prize widget — Housebets chrome signature */}
      <Link
        to="/"
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-gold-500/25 bg-[#1a1505]/60 px-3.5 py-1.5 lg:flex"
        aria-label="Weekly race leaderboard"
      >
        <Trophy size={13} className="text-gold-500" />
        <span className="text-[12px] font-semibold text-base-75">
          Weekly race
        </span>
        <span className="tnum font-odds text-[12px] font-bold text-gold-500">
          $50,000
        </span>
      </Link>
      <button
        type="button"
        onClick={onSearch}
        className="mx-auto flex h-10 w-full max-w-md items-center gap-2.5 rounded-xl border border-border-strong bg-surface-secondary px-3.5 text-[14px] text-text-tertiary transition-colors hover:border-border-very-strong hover:text-text-secondary lg:mx-0 lg:ml-10 lg:max-w-[300px] xl:max-w-xs"
      >
        <Search size={16} />
        <span className="truncate">Search teams, players, competitions…</span>
        <kbd className="ml-auto hidden rounded-md border border-border-very-strong px-1.5 py-0.5 font-sans text-[10px] text-text-tertiary md:block">
          ⌘K
        </kbd>
      </button>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-xl border border-border-strong bg-surface-secondary px-3 py-2 sm:flex">
          <span className="grid size-5 place-items-center rounded-full bg-usdt text-[10px] font-bold text-white">
            T
          </span>
          <span className="tnum font-odds text-[14px] font-semibold">
            1,250.00
          </span>
          <span className="rounded bg-secondary-a30 px-1 text-[9px] font-bold uppercase text-secondary-25">
            Demo
          </span>
        </div>
        <button
          type="button"
          className="btn-primary flex h-10 items-center gap-2 rounded-xl px-4 text-[14px] font-bold"
        >
          <Wallet size={16} className="sm:hidden" />
          <span className="hidden sm:inline">Deposit</span>
        </button>
      </div>
    </header>
  );
}

const RAIL: {
  to: "/" | "/live" | "/football" | "/following";
  icon: typeof House;
  label: string;
  badge?: boolean;
}[] = [
  { to: "/", icon: House, label: "Home" },
  { to: "/live", icon: RadioTower, label: "Live", badge: true },
  { to: "/football", icon: Volleyball, label: "Football" },
  { to: "/following", icon: Star, label: "Following" },
];

export function LeftRail() {
  const loc = useLocation();
  const liveCount = useWorld(
    (s) => s.matches.filter((m) => m.status === "live").length,
  );
  const followCount = useUI((s) => s.follows.size);
  return (
    <nav
      className="fixed bottom-0 left-0 top-[var(--shell-header-h)] z-30 hidden w-[var(--shell-rail-w)] flex-col items-center gap-1 border-r border-border-soft bg-bg-primary py-3 lg:flex"
      aria-label="Sports"
    >
      {RAIL.map(({ to, icon: Icon, label, badge }) => {
        const active = loc.pathname === to;
        const n = to === "/following" ? followCount : liveCount;
        return (
          <Link
            key={to}
            to={to}
            title={label}
            className={`relative grid size-11 place-items-center rounded-xl transition-colors ${active ? "bg-secondary-a20 text-brand-300" : "text-text-tertiary hover:bg-surface-secondary hover:text-text-secondary"}`}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            <span className="sr-only">{label}</span>
            {badge && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-error-500 px-1 font-odds text-[9px] font-bold text-white">
                {n}
              </span>
            )}
            {to === "/following" && followCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-warning-400 px-1 font-odds text-[9px] font-bold text-text-inverse">
                {followCount}
              </span>
            )}
          </Link>
        );
      })}
      <div className="mt-auto flex flex-col items-center gap-1">
        <Link
          to="/bets"
          title="My bets"
          className={`relative grid size-11 place-items-center rounded-xl transition-colors ${loc.pathname === "/bets" ? "bg-secondary-a20 text-brand-300" : "text-text-tertiary hover:bg-surface-secondary"}`}
        >
          <ReceiptText size={20} />
          <span className="sr-only">My bets</span>
        </Link>
      </div>
    </nav>
  );
}

export function SidePanel() {
  const { panelTab, setPanelTab } = useUI();
  const count = useSlip((s) => s.selections.length);
  const liveCount = useSlip(
    (s) =>
      s.selections.filter(
        (x) => x.status === "changed" || x.status === "suspended",
      ).length,
  );
  return (
    <aside
      className="fixed bottom-0 right-0 top-[var(--shell-header-h)] z-30 hidden w-[var(--panel-w)] flex-col border-l border-border-soft bg-surface-primary lg:flex"
      aria-label="Bet slip panel"
    >
      <div
        className="flex gap-1 border-b border-border-soft p-2"
        role="tablist"
        aria-label="Panel"
      >
        {(
          [
            ["slip", Ticket, "Bet slip"],
            ["bets", ReceiptText, "My bets"],
            ["chat", MessageCircle, "Chat"],
          ] as const
        ).map(([k, Icon, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={panelTab === k}
            onClick={() => setPanelTab(k)}
            className={`relative flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-[13px] font-semibold transition-colors ${panelTab === k ? "bg-secondary-a20 text-brand-300" : "text-text-tertiary hover:text-text-secondary"}`}
          >
            <Icon size={15} />
            {label}
            {k === "slip" && count > 0 && (
              <motion.span
                key={count}
                className="badge-pop grid min-w-4.5 place-items-center rounded-full bg-brand-500 px-1 font-odds text-[10px] font-bold text-text-inverse"
              >
                {count}
              </motion.span>
            )}
            {k === "slip" && liveCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-warning-400" />
            )}
          </button>
        ))}
      </div>
      {panelTab === "slip" && <BetSlipBody />}
      {panelTab === "bets" && <MyBetsBody />}
      {panelTab === "chat" && <ChatBody />}
    </aside>
  );
}

const CHAT_SEED: { who: string; when: string; text: string }[] = [
  { who: "Rico", when: "2m", text: "that Arsenal press is suffocating today" },
  { who: "Amara", when: "2m", text: "2-0 already, havertz was due" },
  { who: "Dele", when: "4m", text: "anyone tracking the Newcastle game?" },
  { who: "Mags", when: "4m", text: "over 2.5 looking good there" },
  {
    who: "Rico",
    when: "6m",
    text: "Brighton can't string two passes together",
  },
  { who: "Kofi", when: "8m", text: "gg to whoever caught the 2.20 on arsenal" },
];

function ChatBody() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border-soft px-3 py-2">
        <p className="text-[11px] text-text-tertiary">
          Community · sample conversation — messages are illustrative
        </p>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {CHAT_SEED.map((c, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="flex items-baseline gap-1.5 text-[11px]">
              <span
                className={`font-semibold ${i % 3 === 0 ? "text-brand-300" : i % 3 === 1 ? "text-gold-500" : "text-success-400"}`}
              >
                {c.who}
              </span>
              <span className="text-[10px] text-text-disabled">{c.when}</span>
            </span>
            <p className="text-[12.5px] leading-snug text-text-secondary">
              {c.text}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-border-soft p-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface-secondary px-3 py-2">
          <input
            placeholder="Join the conversation"
            aria-label="Chat message"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-text-disabled"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                useUI
                  .getState()
                  .toast("Chat is read-only in this demo", "info");
            }}
          />
          <MessageCircle size={15} className="shrink-0 text-text-tertiary" />
        </div>
      </div>
    </div>
  );
}

export function BottomBar({ onSearch }: { onSearch: () => void }) {
  const loc = useLocation();
  const count = useSlip((s) => s.selections.length);
  const setOpen = useSlip((s) => s.setMobileOpen);
  const sel = useSlip((s) => s.selections);
  const liveCount = useWorld(
    (s) => s.matches.filter((m) => m.status === "live").length,
  );
  const followCount = useUI((s) => s.follows.size);
  const total = sel.reduce(
    (a, s) => a + (parseFloat(s.stake) || 0) * s.livePrice,
    0,
  );
  const items = [
    { to: "/", icon: House, label: "Home", badge: 0 },
    { to: "/live", icon: RadioTower, label: "Live", badge: liveCount },
    { to: "/following", icon: Star, label: "Following", badge: followCount },
    { to: "/football", icon: Volleyball, label: "Football", badge: 0 },
  ] as const;
  return (
    <>
      {/* Floating slip bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            type="button"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={() => setOpen(true)}
            className="fixed inset-x-3 bottom-[calc(var(--shell-bottombar-h)+env(safe-area-inset-bottom)+10px)] z-40 flex h-13 items-center gap-3 rounded-2xl border border-brand-a30 bg-surface-secondary/95 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_#02f8f822] backdrop-blur-md lg:hidden"
          >
            <span
              className="badge-pop grid min-w-6 place-items-center rounded-full bg-brand-500 px-1.5 font-odds text-[12px] font-bold text-text-inverse"
              key={count}
            >
              {count}
            </span>
            <span className="text-[13px] font-semibold">Bet slip</span>
            <span className="ml-auto flex items-center gap-1.5 text-[13px] text-text-secondary">
              <span className="tnum font-odds font-semibold text-brand-400">
                {total.toFixed(2)}
              </span>
              <ChevronUp size={16} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      {/* Tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex h-[calc(var(--shell-bottombar-h)+env(safe-area-inset-bottom))] items-stretch border-t border-border-soft bg-bg-primary/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        aria-label="Main"
      >
        {items.map(({ to, icon: Icon, label, badge }) => {
          const active = loc.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium ${active ? "text-brand-400" : "text-text-tertiary"}`}
            >
              <span className="relative">
                <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
                {badge != null && badge > 0 && (
                  <span
                    className={`absolute -right-2 -top-1.5 grid min-w-3.5 place-items-center rounded-full px-0.5 font-odds text-[8px] font-bold ${
                      to === "/live"
                        ? "bg-error-500 text-white"
                        : "bg-warning-400 text-text-inverse"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </span>
              {label}
              {active && (
                <motion.span
                  layoutId="tabbar"
                  className="absolute -top-px h-0.5 w-10 rounded-full bg-brand-500"
                />
              )}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onSearch}
          className="flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium text-text-tertiary"
        >
          <Search size={21} /> Search
        </button>
      </nav>
    </>
  );
}

export function SlipSheet() {
  const open = useSlip((s) => s.mobileOpen);
  const setOpen = useSlip((s) => s.setMobileOpen);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[82dvh] flex-col rounded-t-3xl border-t border-border-very-strong bg-surface-primary shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full lg:hidden">
          <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-border-very-strong" />
          <div className="flex items-center justify-between px-4 py-3">
            <Dialog.Title className="text-[15px] font-bold">
              Bet slip
            </Dialog.Title>
            <Dialog.Close
              className="grid size-8 place-items-center rounded-lg text-text-tertiary hover:bg-surface-secondary"
              aria-label="Close"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <BetSlipBody />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
