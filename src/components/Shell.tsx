import { Dialog } from "@base-ui/react/dialog";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronUp,
  Dices,
  FlaskConical,
  House,
  LifeBuoy,
  Menu,
  MessageCircle,
  RadioTower,
  ReceiptText,
  Search,
  Star,
  Ticket,
  Trophy,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { isMatchFollowed } from "../lib/selectors";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import { BetSlipBody } from "./BetSlip";
import { HousebetsLogo } from "./HousebetsLogo";
import { MyBetsBody } from "./MyBets";
import { type GlyphComponent, SPORT_GLYPHS } from "./SportGlyph";

export function Logo() {
  return (
    <Link to="/" className="flex items-center" aria-label="Housebets home">
      <HousebetsLogo height={21} />
    </Link>
  );
}

export function TopBar({ onSearch }: { onSearch: () => void }) {
  // Weekly-race pot ticks gently upward — live-venue feel, honest sample data
  const balance = useUI((s) => s.balance);
  const [pot, setPot] = useState(50000);
  const [modal, setModal] = useState<"deposit" | "race" | null>(null);
  useEffect(() => {
    const t = setInterval(
      () => setPot((p) => p + (17 + (((p / 7) % 41) | 0))),
      9000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[var(--shell-header-h)] items-center gap-3 border-b border-border-soft bg-bg-primary/95 px-3 backdrop-blur-md lg:px-5">
      <Logo />
      {/* centered prize widget — Housebets chrome signature */}
      <button
        type="button"
        onClick={() => setModal("race")}
        aria-label={`Weekly race · pot $${pot.toLocaleString()} · demo`}
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-gold-500/25 bg-[#1a1505]/60 px-3.5 py-1.5 transition-colors hover:border-gold-500/50 lg:flex"
      >
        <Trophy size={13} className="text-gold-500" />
        <span className="text-[12px] font-semibold text-base-75">
          Weekly race
        </span>
        <span className="tnum font-odds text-[12px] font-bold text-gold-500">
          ${pot.toLocaleString()}
        </span>
      </button>
      {/* Search: icon on phone (space is for money chrome), pill on desktop */}
      <button
        type="button"
        onClick={onSearch}
        aria-label="Search teams, players, competitions"
        className="ml-auto grid size-10 shrink-0 place-items-center rounded-xl border border-border-strong bg-surface-secondary text-text-tertiary transition-colors hover:text-text-secondary lg:hidden"
      >
        <Search size={17} />
      </button>
      <button
        type="button"
        onClick={onSearch}
        className="mx-auto hidden h-10 w-full max-w-md items-center gap-2.5 rounded-xl border border-border-strong bg-surface-secondary px-3.5 text-[14px] text-text-tertiary transition-colors hover:border-border-very-strong hover:text-text-secondary lg:mx-0 lg:ml-10 lg:flex lg:max-w-[300px] xl:max-w-xs"
      >
        <Search size={16} />
        <span className="truncate">Search teams, players, competitions…</span>
        <kbd className="ml-auto hidden rounded-md border border-border-very-strong px-1.5 py-0.5 font-sans text-[10px] text-text-tertiary md:block">
          ⌘K
        </kbd>
      </button>
      <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-auto">
        <div className="flex items-center gap-1.5 rounded-xl border border-border-strong bg-surface-secondary px-2 py-2 sm:gap-2 sm:px-3">
          <span className="grid size-5 place-items-center rounded-full bg-usdt text-[10px] font-bold text-white">
            T
          </span>
          <span className="tnum font-odds text-[13px] font-semibold sm:text-[14px]">
            {balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="rounded bg-secondary-a30 px-1 text-[9px] font-bold uppercase text-secondary-25">
            Demo
          </span>
        </div>
        <button
          type="button"
          onClick={() => setModal("deposit")}
          className="btn-primary flex h-10 shrink-0 items-center gap-2 rounded-xl px-2.5 text-[14px] font-bold sm:px-4"
          aria-label="Deposit demo funds"
        >
          <Wallet size={16} className="sm:hidden" />
          <span className="hidden sm:inline">Deposit</span>
        </button>
      </div>
      {modal && <ChromeModal kind={modal} onClose={() => setModal(null)} />}
    </header>
  );
}

function ChromeModal({
  kind,
  onClose,
}: {
  kind: "deposit" | "race";
  onClose: () => void;
}) {
  const credit = useUI((s) => s.credit);
  const toast = useUI((s) => s.toast);
  const pot = 50000 + Math.floor((Date.now() / 60000) % 500);
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
        aria-label={kind === "deposit" ? "Deposit demo funds" : "Weekly race"}
        className="relative w-full max-w-sm rounded-2xl border border-border-soft bg-surface-primary p-5 shadow-2xl"
      >
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-[16px] font-bold">
            {kind === "deposit" ? "Deposit" : "Weekly race"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-lg text-text-tertiary hover:bg-surface-secondary"
          >
            <X size={16} />
          </button>
        </div>
        {kind === "deposit" ? (
          <>
            <p className="mb-4 text-[12.5px] leading-relaxed text-text-tertiary">
              Demo wallet · no real money moves. Top up the sample balance to
              keep testing stakes and settlement.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 250, 500, 1000, 2500].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    credit(v);
                    toast(
                      `Deposited ${v.toLocaleString()} USDT demo funds`,
                      "success",
                    );
                    onClose();
                  }}
                  className="rounded-xl border border-brand-a30 bg-secondary-a15 py-3 font-odds text-[14px] font-bold text-brand-300 transition-colors hover:bg-secondary-a30"
                >
                  +{v >= 1000 ? `${v / 1000}k` : v}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-3 text-[12.5px] leading-relaxed text-text-secondary">
            <p>
              The weekly race pays out a share of{" "}
              <span className="tnum font-odds font-bold text-gold-500">
                ${pot.toLocaleString()}
              </span>{" "}
              to the top wagering accounts each Friday.
            </p>
            <p className="text-text-tertiary">
              Demo widget · standings and payouts are sample data, not a real
              promotion.
            </p>
            <div className="rounded-xl border border-border-soft bg-surface-secondary p-3">
              {[
                ["1.", "K. Mercer", "1,240 pts"],
                ["2.", "D. Osei", "1,180 pts"],
                ["3.", "You (demo)", "1,015 pts"],
              ].map(([r, n, p]) => (
                <div key={r} className="flex justify-between py-1 text-[12px]">
                  <span className="text-text-tertiary">{r}</span>
                  <span className="font-semibold">{n}</span>
                  <span className="tnum font-odds text-gold-500">{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

const RAIL: {
  to: "/" | "/live" | "/football" | "/following";
  icon: GlyphComponent;
  label: string;
  badge?: boolean;
}[] = [
  { to: "/", icon: House, label: "Home" },
  { to: "/live", icon: RadioTower, label: "Live", badge: true },
  { to: "/football", icon: SPORT_GLYPHS.soccer, label: "Football" },
  { to: "/following", icon: Star, label: "Following" },
];

export function LeftRail() {
  const loc = useLocation();
  // badge tracks the real live feed — honors the empty-live scenario
  const liveCount = useWorld((s) =>
    s.liveEmpty ? 0 : s.matches.filter((m) => m.status === "live").length,
  );
  // badge previews the Following page: matches covered by any starred
  // entity (match, team, or competition)
  const follows = useUI((s) => s.follows);
  const followCount = useWorld(
    (s) => s.matches.filter((m) => isMatchFollowed(m, follows)).length,
  );
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
            aria-current={active ? "page" : undefined}
            className={`relative grid size-11 place-items-center rounded-xl transition-colors ${active ? "bg-secondary-a20 text-brand-300" : "text-text-tertiary hover:bg-surface-secondary hover:text-text-secondary"}`}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            <span className="sr-only">{label}</span>
            {badge && n > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-error-500 px-1 font-odds text-[9px] font-bold text-white">
                {n}
              </span>
            )}
            {to === "/following" && followCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-gold-500 px-1 font-odds text-[9px] font-bold text-text-inverse">
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
          aria-current={loc.pathname === "/bets" ? "page" : undefined}
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
              <span className="font-semibold text-text-secondary">{c.who}</span>
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

function PhoneSheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  // iOS-sheet physics: drag follows finger 1:1 from the handle zone, rubber-band
  // past the top, momentum-projected dismiss, spring snap-back otherwise.
  const controls = useDragControls();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[72dvh] flex-col overflow-hidden rounded-t-3xl border-t border-border-very-strong bg-surface-primary shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full lg:hidden">
          <motion.div
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.55 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y + info.velocity.y * 0.15 > 90)
                onOpenChange(false);
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div
              onPointerDown={(e) => controls.start(e)}
              className="touch-none select-none"
            >
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-border-very-strong" />
              <div className="flex items-center justify-between px-4 py-3">
                <Dialog.Title className="text-[15px] font-bold">
                  {title}
                </Dialog.Title>
                <Dialog.Close
                  className="grid size-8 place-items-center rounded-lg text-text-tertiary hover:bg-surface-secondary"
                  aria-label="Close"
                >
                  <X size={18} />
                </Dialog.Close>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
              {children}
            </div>
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function BottomBar({ onSearch }: { onSearch: () => void }) {
  const loc = useLocation();
  const count = useSlip((s) => s.selections.length);
  const setOpen = useSlip((s) => s.setMobileOpen);
  const sel = useSlip((s) => s.selections);
  const [sheet, setSheet] = useState<
    "menu" | "casino" | "chat" | "support" | null
  >(null);
  const follows = useUI((s) => s.follows);
  const followCount = useWorld(
    (s) => s.matches.filter((m) => isMatchFollowed(m, follows)).length,
  );
  const setScenarioOpen = useUI((s) => s.setScenarioOpen);
  const liveCount = useWorld((s) =>
    s.liveEmpty ? 0 : s.matches.filter((m) => m.status === "live").length,
  );
  const total = sel.reduce(
    (a, s) => a + (parseFloat(s.stake) || 0) * s.livePrice,
    0,
  );
  const sportsActive =
    loc.pathname === "/" ||
    loc.pathname.startsWith("/match") ||
    loc.pathname === "/football" ||
    loc.pathname === "/live";
  const MENU: {
    to: "/" | "/live" | "/football" | "/following" | "/bets";
    label: string;
    badge?: number;
  }[] = [
    { to: "/", label: "Home" },
    { to: "/live", label: "Live now", badge: liveCount },
    { to: "/football", label: "Football" },
    { to: "/following", label: "Following", badge: followCount },
    { to: "/bets", label: "My bets & slip" },
  ];
  return (
    <>
      {/* Floating slip bar — wireframe: cyan pill above tab bar */}
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
            <span className="min-w-0 truncate text-[13px] font-semibold">
              {count === 1
                ? `${sel[0].pick} @ ${sel[0].livePrice.toFixed(2)}`
                : "Bet slip"}
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[13px] text-text-secondary">
              <span className="tnum font-odds font-semibold text-brand-400">
                {total > 0 ? `Pays ${total.toFixed(2)}` : "Set a stake"}
              </span>
              <ChevronUp size={16} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      {/* Housebets phone shell: Menu | Sports | Casino | Chat | Support FAB */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex h-[calc(var(--shell-bottombar-h)+env(safe-area-inset-bottom))] items-stretch border-t border-border-soft bg-bg-primary/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        aria-label="Main"
      >
        <button
          type="button"
          onClick={() => setSheet("menu")}
          className="flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium text-text-tertiary"
        >
          <Menu size={21} /> Menu
        </button>
        <Link
          to="/"
          aria-current={sportsActive ? "page" : undefined}
          className={`relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium ${sportsActive ? "text-brand-400" : "text-text-tertiary"}`}
        >
          <SPORT_GLYPHS.soccer
            size={21}
            strokeWidth={sportsActive ? 2.2 : 1.8}
          />
          Sports
          {sportsActive && (
            <motion.span
              layoutId="tabbar"
              className="absolute -top-px h-0.5 w-10 rounded-full bg-brand-500"
            />
          )}
        </Link>
        <button
          type="button"
          onClick={() => setSheet("casino")}
          className="flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium text-text-tertiary"
        >
          <Dices size={21} /> Casino
        </button>
        <button
          type="button"
          onClick={() => setSheet("chat")}
          className="flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium text-text-tertiary"
        >
          <MessageCircle size={21} /> Chat
        </button>
        {/* Support as raised palm FAB — wireframe signature */}
        <button
          type="button"
          onClick={() => setSheet("support")}
          aria-label="Support"
          className="relative -top-3 mx-1 grid size-12 shrink-0 place-items-center rounded-full border border-brand-a30 bg-surface-secondary text-brand-300 shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
        >
          <LifeBuoy size={22} />
        </button>
      </nav>

      <PhoneSheet
        open={sheet === "menu"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Menu"
      >
        <nav className="flex flex-col gap-1 px-3 pb-6">
          {MENU.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              onClick={() => setSheet(null)}
              className="flex items-center justify-between rounded-xl border border-border-soft bg-surface-secondary px-4 py-3 text-[14px] font-semibold text-text-primary transition-colors hover:border-border-very-strong"
            >
              {it.label}
              {it.badge != null && it.badge > 0 && (
                <span className="tnum rounded-full bg-error-500/15 px-2 py-0.5 font-odds text-[11px] font-bold text-error-300">
                  {it.badge}
                </span>
              )}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setSheet(null);
              onSearch();
            }}
            className="flex items-center justify-between rounded-xl border border-border-soft bg-surface-secondary px-4 py-3 text-[14px] font-semibold text-text-primary"
          >
            Search <Search size={15} className="text-text-tertiary" />
          </button>
          <button
            type="button"
            onClick={() => {
              setSheet(null);
              setScenarioOpen(true);
            }}
            className="flex items-center justify-between rounded-xl border border-brand-a30 bg-secondary-a20 px-4 py-3 text-[14px] font-semibold text-brand-300"
          >
            Demo states <FlaskConical size={15} />
          </button>
        </nav>
      </PhoneSheet>

      <PhoneSheet
        open={sheet === "casino"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Casino"
      >
        <div className="px-5 pb-8 pt-2 text-center">
          <p className="text-[14px] font-semibold text-text-primary">
            Casino isn't part of this prototype
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-tertiary">
            This contest entry covers the sportsbook only — same shell, sports
            content. The tab stays here because that's where it lives on
            Housebets.
          </p>
          <Link
            to="/"
            onClick={() => setSheet(null)}
            className="btn-primary mt-4 inline-flex h-10 items-center rounded-xl px-5 text-[13px] font-bold"
          >
            Back to sports
          </Link>
        </div>
      </PhoneSheet>

      <PhoneSheet
        open={sheet === "chat"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Chat"
      >
        <div className="flex h-[52dvh] flex-col">
          <ChatBody />
        </div>
      </PhoneSheet>

      <PhoneSheet
        open={sheet === "support"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Support"
      >
        <div className="space-y-3 px-5 pb-8 pt-1 text-[12.5px] leading-relaxed text-text-secondary">
          <p>
            This is a design prototype — there's no live support desk. Every
            control in the demo is real, though: tap odds to build a slip, watch
            prices tick, and use the{" "}
            <span className="font-semibold text-text-primary">
              State tourer
            </span>{" "}
            in the Menu sheet to jump straight to suspended, odds-changed,
            cash-out and offline states.
          </p>
          <p className="text-text-tertiary">
            Sample data only · no real money · singles only.
          </p>
        </div>
      </PhoneSheet>
    </>
  );
}

export function SlipSheet() {
  const open = useSlip((s) => s.mobileOpen);
  const setOpen = useSlip((s) => s.setMobileOpen);
  const count = useSlip((s) => s.selections.length);
  // one tab state for sheet and desktop panel — receipt "View my bets",
  // badge taps and panel pills all move together
  const tab = useUI((s) => s.panelTab);
  const setTab = useUI((s) => s.setPanelTab);
  const controls = useDragControls();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[82dvh] flex-col overflow-hidden rounded-t-3xl border-t border-border-very-strong bg-surface-primary shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full lg:hidden">
          <motion.div
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.55 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y + info.velocity.y * 0.15 > 90) setOpen(false);
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div
              onPointerDown={(e) => controls.start(e)}
              className="touch-none select-none"
            >
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-border-very-strong" />
              <div className="flex items-center justify-between px-4 py-3">
                <Dialog.Title className="text-[15px] font-bold">
                  {tab === "slip"
                    ? "Bet slip"
                    : tab === "bets"
                      ? "My bets"
                      : "Chat"}
                </Dialog.Title>
                <Dialog.Close
                  className="grid size-8 place-items-center rounded-lg text-text-tertiary hover:bg-surface-secondary"
                  aria-label="Close"
                >
                  <X size={18} />
                </Dialog.Close>
              </div>
            </div>
            {/* wireframe's sheet tab strip — slip / bets / chat without closing */}
            <div
              className="mx-3 mb-2 flex gap-1 rounded-xl border border-border-soft bg-surface-secondary p-1"
              role="tablist"
              aria-label="Slip sheet"
            >
              {(
                [
                  ["slip", `Bet slip ${count || ""}`],
                  ["bets", "My bets"],
                  ["chat", "Chat"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => setTab(k)}
                  className={`flex h-8 flex-1 items-center justify-center rounded-lg text-[12.5px] font-semibold transition-colors ${tab === k ? "bg-interactive-primary text-text-inverse" : "text-text-tertiary hover:text-text-secondary"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
              {tab === "slip" && <BetSlipBody />}
              {tab === "bets" && <MyBetsBody />}
              {tab === "chat" && (
                <div className="flex h-[52dvh] flex-col">
                  <ChatBody />
                </div>
              )}
            </div>
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
