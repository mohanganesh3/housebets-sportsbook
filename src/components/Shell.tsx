import { Dialog } from "@base-ui/react/dialog";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Cherry,
  ChevronDown,
  CircleDot,
  Dices,
  FlaskConical,
  LifeBuoy,
  Menu,
  MessageCircle,
  PanelRight,
  Pause,
  Search,
  Trophy,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { isMatchFollowed } from "../lib/selectors";
import { sessionNet, useBets } from "../lib/store/bets";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import { BetSlipBody, HouseGlyph, SESSION_START } from "./BetSlip";
import { HousebetsLogo } from "./HousebetsLogo";
import { MyBetsBody } from "./MyBets";
import { type GlyphComponent, SPORT_GLYPHS } from "./SportGlyph";

/* ==================================================================
   D1 SHELL — rebuilt on the canonical tokens (STORYBOARDS/shell.md).
   Tokens only: bg-c-* / text-c-* / border-c-hairline, text-hb-*,
   font-hb-*, rounded-hb-*, --layout-*, --dur-*, standard/expo eases.
   ================================================================== */

const money = (v: number) =>
  v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const fmtClock = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function useMediaQuery(q: string) {
  const [m, setM] = useState(
    () => typeof window !== "undefined" && window.matchMedia(q).matches,
  );
  useEffect(() => {
    const mm = window.matchMedia(q);
    const fn = () => setM(mm.matches);
    mm.addEventListener("change", fn);
    return () => mm.removeEventListener("change", fn);
  }, [q]);
  return m;
}

/* ── Authored one-stroke shell glyphs (20px grid / 1.5px stroke law) ── */
function G20({
  children,
  size = 20,
  className,
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}
// cloud-slash — the offline encoding (never the suspended padlock)
export function CloudOffGlyph({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <G20 size={size} className={className}>
      <path d="M6.2 14h7.6a3.2 3.2 0 0 0 .6-6.3A4.6 4.6 0 0 0 5.4 9 2.8 2.8 0 0 0 6.2 14Z" />
      <path d="M4 3.5 16 16" />
    </G20>
  );
}

/* ── Shared hooks ─────────────────────────────────────────────────── */
const liveCountSel = (s: {
  matches: { status: string }[];
  liveEmpty: boolean;
}) => (s.liveEmpty ? 0 : s.matches.filter((m) => m.status === "live").length);

// Session line — one clock, one net ledger; identical string on panel,
// slip sheet and My bets (DATA-CANON invariant 2). Canon grammar:
// `Session {m} min · net {±} USDT` — value is the live ledger.
function useSession() {
  const net = useBets((s) => sessionNet(s.bets));
  const mins = Math.max(1, Math.floor((Date.now() - SESSION_START) / 60_000));
  return { mins, net };
}

function SessionLine() {
  const { mins, net } = useSession();
  const setRgOpen = useUI((s) => s.setRgOpen);
  return (
    <button
      type="button"
      onClick={() => setRgOpen(true)}
      aria-label={`Session ${mins} minutes · net ${net >= 0 ? "plus" : "minus"} ${Math.abs(net).toFixed(2)} USDT · safer gambling`}
      className="block w-full rounded-hb-sm text-start font-hb-ui text-hb-micro text-c-text-2"
    >
      Session {mins} min · net{" "}
      <span dir="ltr" className="font-hb-num text-c-text tabular-nums">
        {net >= 0 ? "+" : "−"}
        {Math.abs(net).toFixed(2)}
      </span>{" "}
      USDT
    </button>
  );
}

function RgStrip() {
  const setRgOpen = useUI((s) => s.setRgOpen);
  return (
    <p className="mt-1 font-hb-ui text-hb-micro text-c-text-3">
      18+ · Play responsibly ·{" "}
      <button
        type="button"
        onClick={() => setRgOpen(true)}
        className="underline decoration-dotted underline-offset-2 hover:text-c-text-2"
      >
        Take a break
      </button>
    </p>
  );
}

/* ── Sheets ───────────────────────────────────────────────────────── */
// Phone sheet — drag physics unchanged (D-14), chrome retokened.
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
  const controls = useDragControls();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-(--dur-close) data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[72dvh] flex-col overflow-hidden rounded-t-hb-lg border-t border-c-hairline bg-c-surface-1 shadow-hb-sheet transition-[transform,opacity] duration-(--dur-move) ease-standard data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full lg:hidden">
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
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-hb-pill bg-c-surface-3" />
              <div className="flex items-center justify-between px-4 py-3">
                <Dialog.Title className="font-hb-ui text-hb-h1 font-semibold text-c-text">
                  {title}
                </Dialog.Title>
                <Dialog.Close
                  className="grid size-9 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2"
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

// Responsive sheet — bottom sheet on phone, centered popover-dialog ≥lg.
// Same object both devices (MENTAL-MAP rule 4); r-lg + the one shadow
// only in its sheet incarnation (TOKENS elevation law).
function ShellSheet({
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
  const controls = useDragControls();
  const desktop = useMediaQuery("(min-width: 1024px)");
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-(--dur-close) data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed z-50 flex max-h-[82dvh] flex-col overflow-hidden border-c-hairline bg-c-surface-1 transition-[transform,opacity] duration-(--dur-move) ease-standard data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 max-lg:inset-x-0 max-lg:bottom-0 max-lg:rounded-t-hb-lg max-lg:border-t max-lg:shadow-hb-sheet max-lg:data-[ending-style]:translate-y-full max-lg:data-[starting-style]:translate-y-full lg:start-1/2 lg:top-1/2 lg:w-full lg:max-w-sm lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-hb-md lg:border lg:rtl:translate-x-1/2 lg:data-[starting-style]:-translate-y-[46%] lg:data-[ending-style]:-translate-y-[46%]">
          <motion.div
            drag={desktop ? false : "y"}
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.55 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (!desktop && info.offset.y + info.velocity.y * 0.15 > 90)
                onOpenChange(false);
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div
              onPointerDown={(e) => !desktop && controls.start(e)}
              className="touch-none select-none"
            >
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-hb-pill bg-c-surface-3 lg:hidden" />
              <div className="flex items-center justify-between px-4 py-3">
                <Dialog.Title className="font-hb-ui text-hb-h1 font-semibold text-c-text">
                  {title}
                </Dialog.Title>
                <Dialog.Close
                  className="grid size-9 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2"
                  aria-label="Close"
                >
                  <X size={18} />
                </Dialog.Close>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-[max(env(safe-area-inset-bottom),var(--s-4))]">
              {children}
            </div>
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ── Logo ─────────────────────────────────────────────────────────── */
export function Logo() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center"
      aria-label="Housebets home"
    >
      <HousebetsLogo height={21} />
    </Link>
  );
}

/* ── Top bar ──────────────────────────────────────────────────────── */
function PrizeTicker() {
  // Weekly-prize ticker — display only: no control, no tab stop,
  // aria-live off on the ticking amount (SH-01). Gold = prize only.
  const [pot, setPot] = useState(50000);
  useEffect(() => {
    const t = setInterval(
      () => setPot((p) => p + (17 + (((p / 7) % 41) | 0))),
      9000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="pointer-events-none absolute start-1/2 hidden -translate-x-1/2 items-center gap-2 rtl:translate-x-1/2 lg:flex"
      role="note"
      aria-label="Weekly prize, 50,000 US dollars"
    >
      <span aria-hidden="true" className="flex items-center gap-2">
        <Trophy size={14} className="text-c-gold" />
        <span className="font-hb-ui text-hb-label font-semibold text-c-text-2">
          Weekly Prize
        </span>
        <span
          dir="ltr"
          aria-live="off"
          className="font-hb-num text-hb-odds font-semibold text-c-gold tabular-nums"
        >
          ${money(pot)}
        </span>
      </span>
    </div>
  );
}

function BalanceWidget({
  onWallet,
}: {
  onWallet: (via: "popover" | "sheet") => void;
}) {
  const balance = useUI((s) => s.balance);
  const breakUntil = useUI((s) => s.breakUntil);
  const [, setNowTick] = useState(0);
  useEffect(() => {
    if (breakUntil <= Date.now()) return;
    const iv = setInterval(() => setNowTick((n) => n + 1), 15_000);
    return () => clearInterval(iv);
  }, [breakUntil]);
  const onBreak = breakUntil > Date.now();
  return (
    <button
      type="button"
      onClick={() =>
        onWallet(
          typeof window !== "undefined" &&
            window.matchMedia("(min-width: 1024px)").matches
            ? "popover"
            : "sheet",
        )
      }
      aria-label={
        onBreak
          ? `On a break · back ${fmtClock(breakUntil)}`
          : `Balance ${balance.toFixed(2)} USDT · open wallet`
      }
      className="flex h-9 items-center gap-1.5 rounded-hb-md border border-c-hairline bg-c-surface-1 px-3"
    >
      {onBreak ? (
        <span className="font-hb-ui text-hb-label text-c-text-2">
          On a break · back{" "}
          <span dir="ltr" className="font-hb-num tabular-nums">
            {fmtClock(breakUntil)}
          </span>
        </span>
      ) : (
        <>
          <span
            dir="ltr"
            aria-hidden="true"
            className="font-hb-num text-hb-odds font-semibold text-c-text tabular-nums lg:text-hb-odds-sm lg:font-bold"
          >
            ₮{money(balance)}
          </span>
          {/* live region: balance announced on change (E-SHL-01) */}
          <span aria-live="polite" className="sr-only">
            Balance {balance.toFixed(2)} USDT
          </span>
          <ChevronDown
            size={14}
            className="hidden text-c-text-2 lg:block"
            aria-hidden
          />
        </>
      )}
    </button>
  );
}

function DepositBody({ onDone }: { onDone: () => void }) {
  const credit = useUI((s) => s.credit);
  const toast = useUI((s) => s.toast);
  return (
    <div className="pb-2">
      <p className="font-hb-ui text-hb-body-sec text-c-text-2">
        Demo — nothing here is real. Top up the sample wallet; USDT only.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[50, 100, 250, 500, 1000, 2500].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              credit(v);
              toast(`Added ${v.toLocaleString()} USDT demo funds`, "success");
              onDone();
            }}
            className="rounded-hb-md border border-c-hairline bg-c-surface-2 py-3 font-hb-num text-hb-odds-sm font-semibold text-c-text transition-colors hover:bg-c-surface-3"
          >
            +{v >= 1000 ? `${v / 1000}k` : v}
          </button>
        ))}
      </div>
    </div>
  );
}

function WalletSheetBody({ onDeposit }: { onDeposit: () => void }) {
  const balance = useUI((s) => s.balance);
  const inBets = useBets((s) =>
    s.bets.filter((b) => b.result === "open").reduce((a, b) => a + b.stake, 0),
  );
  const available = Math.max(0, balance - inBets);
  const breakUntil = useUI((s) => s.breakUntil);
  const endBreak = useUI((s) => s.endBreak);
  const onBreak = breakUntil > Date.now();
  const [confirmEnd, setConfirmEnd] = useState(false);
  return (
    <div className="pb-2">
      {onBreak ? (
        <>
          <p className="font-hb-ui text-hb-body-sec text-c-text-2">
            On a break · back {fmtClock(breakUntil)}. Betting is off until then.
            Prices are read-only. Cash out still works.
          </p>
          {confirmEnd ? (
            <button
              type="button"
              onClick={() => {
                endBreak();
                setConfirmEnd(false);
              }}
              data-on-cta
              className="mt-4 w-full rounded-hb-md bg-c-cta py-2.5 font-hb-ui text-hb-label font-semibold text-c-cta-fg"
            >
              Confirm — end the break
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmEnd(true)}
              className="mt-4 w-full rounded-hb-md border border-c-hairline bg-c-surface-2 py-2.5 font-hb-ui text-hb-label font-semibold text-c-text"
            >
              End break early?
            </button>
          )}
        </>
      ) : (
        <>
          <p className="font-hb-ui text-hb-body-sec text-c-text-2">
            Available{" "}
            <span dir="ltr" className="font-hb-num text-c-text tabular-nums">
              {money(available)}
            </span>{" "}
            · In open bets{" "}
            <span dir="ltr" className="font-hb-num text-c-text tabular-nums">
              {money(inBets)}
            </span>{" "}
            USDT
          </p>
          <button
            type="button"
            onClick={onDeposit}
            data-on-cta
            className="mt-4 w-full rounded-hb-md bg-c-cta py-2.5 font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors hover:bg-c-cta-hi"
          >
            Add funds
          </button>
        </>
      )}
    </div>
  );
}

function AccountMenu({ onClose }: { onClose: () => void }) {
  const oddsAnim = useUI((s) => s.oddsAnim);
  const setOddsAnim = useUI((s) => s.setOddsAnim);
  const setRgOpen = useUI((s) => s.setRgOpen);
  const setSignedIn = useUI((s) => s.setSignedIn);
  const item =
    "flex w-full items-center justify-between rounded-hb-md px-3 py-2.5 text-start font-hb-ui text-hb-body-sec text-c-text hover:bg-c-surface-2";
  return (
    <div className="flex flex-col gap-0.5 p-1.5">
      <button
        type="button"
        className={item}
        onClick={() => {
          setRgOpen(true);
          onClose();
        }}
      >
        Safer gambling
      </button>
      <div className={`${item} cursor-default hover:bg-transparent`}>
        <span>Odds animation</span>
        <fieldset className="flex gap-1 border-0 p-0">
          <legend className="sr-only">Odds animation</legend>
          {(["flash", "instant"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={oddsAnim === p}
              onClick={() => setOddsAnim(p)}
              className={`rounded-hb-pill px-2 py-1 font-hb-ui text-hb-micro font-semibold ${
                oddsAnim === p
                  ? "bg-c-surface-3 text-c-text"
                  : "text-c-text-2 hover:text-c-text"
              }`}
            >
              {p === "flash" ? "Flash" : "Instant"}
            </button>
          ))}
        </fieldset>
      </div>
      <button
        type="button"
        className={item}
        onClick={() => {
          setSignedIn(false);
          onClose();
        }}
      >
        Sign out (demo)
      </button>
    </div>
  );
}

// Hand-rolled popover — disclosure button, Esc closes, focus returns to
// the trigger (Salaja dialog law). Used by balance widget + avatar menu.
function Popover({
  trigger,
  label,
  children,
  width = "w-60",
}: {
  trigger: (open: boolean) => ReactNode;
  label: string;
  children: (close: () => void) => ReactNode;
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const zoneRef = useRef<HTMLSpanElement>(null);
  const returnFocus = () => zoneRef.current?.querySelector("button")?.focus();
  const close = () => {
    setOpen(false);
    returnFocus();
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <span className="relative">
      {/* trigger sits inside the toggle zone — its click bubbles up */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: trigger is a real button inside; zone only forwards the tap */}
      <span
        ref={zoneRef}
        className="inline-flex"
        onClick={() => setOpen((v) => !v)}
      >
        {trigger(open)}
      </span>
      {open && (
        <>
          <button
            type="button"
            aria-label="Dismiss"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={close}
          />
          <span
            role="dialog"
            aria-label={label}
            className={`absolute end-0 top-full z-50 mt-2 ${width} rounded-hb-md border border-c-hairline bg-c-surface-1 p-3`}
          >
            {children(close)}
          </span>
        </>
      )}
    </span>
  );
}

export function TopBar({ onSearch }: { onSearch: () => void }) {
  const signedIn = useUI((s) => s.signedIn);
  const setSignedIn = useUI((s) => s.setSignedIn);
  const panelOpen = useUI((s) => s.panelOpen);
  const setPanelOpen = useUI((s) => s.setPanelOpen);
  const railOpen = useUI((s) => s.railOpen);
  const setRailOpen = useUI((s) => s.setRailOpen);
  const breakUntil = useUI((s) => s.breakUntil);
  const onBreak = breakUntil > Date.now();
  const [sheet, setSheet] = useState<"wallet" | "deposit" | null>(null);
  // "Add funds (demo)" inside the stake error asks for the deposit sheet
  // cross-component — the flag routes through the store (D3 wiring)
  const depositOpen = useUI((s) => s.depositOpen);
  const setDepositOpen = useUI((s) => s.setDepositOpen);
  useEffect(() => {
    if (!depositOpen) return;
    setSheet("deposit");
    setDepositOpen(false);
  }, [depositOpen, setDepositOpen]);
  const balance = useUI((s) => s.balance);
  const inBets = useBets((s) =>
    s.bets.filter((b) => b.result === "open").reduce((a, b) => a + b.stake, 0),
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--layout-header)] items-center gap-2 border-b border-c-hairline bg-c-bg px-3 lg:gap-3 lg:px-4">
      {/* rail toggle — ≡ drawer at 768–1023, collapse→0 ≥1024 (SH-03) */}
      <button
        type="button"
        onClick={() => setRailOpen(!railOpen)}
        aria-expanded={railOpen}
        aria-label="Sport rail"
        className="hidden size-9 shrink-0 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2 hover:text-c-text md:grid"
      >
        <Menu size={20} />
      </button>
      <Logo />
      <PrizeTicker />
      {/* search field ≥1440 (breakpoint contract: field + ⌘K) */}
      <button
        type="button"
        onClick={onSearch}
        className="ml-6 hidden h-9 w-full max-w-64 items-center gap-2 rounded-hb-md border border-c-hairline bg-c-surface-2 px-3 font-hb-ui text-hb-body-sec text-c-text-3 transition-colors hover:border-c-surface-3 hover:text-c-text-2 desk:flex"
      >
        <Search size={15} aria-hidden />
        <span className="truncate">Search teams, players or leagues</span>
        <kbd className="ml-auto rounded-hb-sm border border-c-hairline px-1.5 py-0.5 font-hb-ui text-hb-micro text-c-text-3">
          ⌘K
        </kbd>
      </button>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {signedIn ? (
          <>
            {/* balance → popover ≥1024 / wallet sheet <1024 */}
            <span className="lg:hidden">
              <BalanceWidget onWallet={() => setSheet("wallet")} />
            </span>
            <span className="hidden lg:inline-flex">
              <Popover
                label="Wallet"
                trigger={() => <BalanceWidget onWallet={() => {}} />}
              >
                {() => (
                  <p className="font-hb-ui text-hb-body-sec text-c-text-2">
                    Available{" "}
                    <span
                      dir="ltr"
                      className="font-hb-num text-c-text tabular-nums"
                    >
                      {money(Math.max(0, balance - inBets))}
                    </span>{" "}
                    · In open bets{" "}
                    <span
                      dir="ltr"
                      className="font-hb-num text-c-text tabular-nums"
                    >
                      {money(inBets)}
                    </span>{" "}
                    USDT
                  </p>
                )}
              </Popover>
            </span>
            {/* Add funds — the ONLY primary CTA in chrome; hidden on break */}
            {!onBreak && (
              <button
                type="button"
                onClick={() => setSheet("deposit")}
                data-on-cta
                className="hidden h-10 min-w-24 shrink-0 items-center justify-center rounded-hb-md bg-c-cta px-4 font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors hover:bg-c-cta-hi active:bg-c-cta-lo lg:flex"
              >
                Add funds
              </button>
            )}
            {/* search glyph <1440 (contract: glyph → palette) */}
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search teams, players or leagues"
              className="grid size-9 shrink-0 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2 hover:text-c-text desk:hidden"
            >
              <Search size={18} />
            </button>
            {/* panel toggle — highlighted while open */}
            <button
              type="button"
              onClick={() => setPanelOpen(!panelOpen)}
              aria-pressed={panelOpen}
              aria-label="Ticket panel"
              className={`hidden size-9 shrink-0 place-items-center rounded-hb-md lg:grid ${
                panelOpen
                  ? "bg-c-surface-3 text-c-neon"
                  : "text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
              }`}
            >
              <PanelRight size={18} />
            </button>
            {/* avatar — account menu */}
            <Popover
              label="Account"
              width="w-64"
              trigger={(open) => (
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-expanded={open}
                  className="grid size-9 shrink-0 place-items-center rounded-hb-pill border border-c-hairline bg-c-surface-2 font-hb-ui text-hb-micro font-bold text-c-text"
                >
                  HB
                </button>
              )}
            >
              {(close) => <AccountMenu onClose={close} />}
            </Popover>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search teams, players or leagues"
              className="grid size-9 shrink-0 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2 hover:text-c-text desk:hidden"
            >
              <Search size={18} />
            </button>
            {/* SH-02 logged-out cluster — wireframe parity */}
            <button
              type="button"
              onClick={() => setSignedIn(true)}
              className="h-9 rounded-hb-pill border border-c-hairline bg-c-surface-2 px-4 font-hb-ui text-hb-label font-semibold text-c-text hover:bg-c-surface-3"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setSignedIn(true)}
              data-on-cta
              className="h-9 rounded-hb-md bg-c-cta px-4 font-hb-ui text-hb-label font-semibold text-c-cta-fg hover:bg-c-cta-hi"
            >
              Register
            </button>
          </>
        )}
      </div>
      <PhoneSheet
        open={sheet === "wallet"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Wallet"
      >
        <div className="px-4 pb-4">
          <WalletSheetBody onDeposit={() => setSheet("deposit")} />
        </div>
      </PhoneSheet>
      <ShellSheet
        open={sheet === "deposit"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Add funds"
      >
        <DepositBody onDone={() => setSheet(null)} />
      </ShellSheet>
    </header>
  );
}

/* ── Left rail (72px) ─────────────────────────────────────────────── */
type RailEntry = {
  key: string;
  label: string;
  icon:
    | GlyphComponent
    | ((p: { size?: number; className?: string }) => ReactNode);
  to?: "/" | "/live" | "/football";
  action?: () => void;
  badge?: number;
  live?: boolean;
};

function RailItem({ entry, active }: { entry: RailEntry; active: boolean }) {
  const { label, icon: Icon, to, action, badge, live } = entry;
  const inner = (
    <>
      <span
        className={`relative grid size-10 place-items-center rounded-hb-md transition-colors duration-(--dur-feedback) ${
          active
            ? "bg-c-surface-3 text-c-neon"
            : "text-c-text-2 group-hover:bg-c-surface-3 group-hover:text-c-text"
        }`}
      >
        <Icon size={20} strokeWidth={1.5} />
        {live && badge != null && badge > 0 && (
          <>
            <span
              dir="ltr"
              className="absolute -end-1 -top-1 grid min-w-4 place-items-center rounded-hb-pill bg-c-live px-1 font-hb-num text-hb-micro font-semibold text-c-live-fg"
            >
              {badge}
            </span>
            <span
              className="hb-live-pulse absolute -start-1 -bottom-0.5 size-1.5 rounded-hb-pill bg-c-live"
              aria-hidden
            />
          </>
        )}
      </span>
      {active && (
        <span
          className="hb-rail-ind absolute start-0 top-1/2 -translate-y-1/2 rounded-e-hb-sm bg-c-neon"
          aria-hidden
        />
      )}
    </>
  );
  const cls =
    "group relative flex h-11 w-full items-center justify-center outline-offset-0";
  if (to)
    return (
      <Link
        to={to}
        title={label}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={cls}
      >
        {inner}
      </Link>
    );
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      onClick={action}
      className={cls}
    >
      {inner}
    </button>
  );
}

export function LeftRail() {
  const loc = useLocation();
  const railOpen = useUI((s) => s.railOpen);
  const setRailOpen = useUI((s) => s.setRailOpen);
  const toast = useUI((s) => s.toast);
  const setPanelTab = useUI((s) => s.setPanelTab);
  const setPanelOpen = useUI((s) => s.setPanelOpen);
  const setRgOpen = useUI((s) => s.setRgOpen);
  const setSupportOpen = useUI((s) => s.setSupportOpen);
  const liveCount = useWorld(liveCountSel);
  const matches = useWorld((s) => s.matches);
  const hasSport = (sport: string) => matches.some((m) => m.sport === sport);

  const unrouted = (label: string, sport: string) => () =>
    hasSport(sport)
      ? toast(`${label} fixtures run on the home board`, "info")
      : toast(`${label} isn't in this demo's seed`, "info");
  const casino = (label: string) => () =>
    toast(`${label} isn't part of this prototype — sportsbook only`, "info");
  const openChat = () => {
    setPanelTab("chat");
    setPanelOpen(true);
    useSlip.getState().setMobileOpen(true);
    setRailOpen(false);
  };

  const zones: { label: string; items: RailEntry[] }[] = [
    {
      label: "Products",
      items: [
        { key: "home", label: "Home", icon: HouseGlyph, to: "/" },
        {
          key: "live",
          label: `Live${liveCount ? `, ${liveCount} in play` : ""}`,
          icon: Video,
          to: "/live",
          badge: liveCount,
          live: true,
        },
      ],
    },
    {
      label: "Sports",
      items: [
        {
          key: "soccer",
          label: "Soccer",
          icon: SPORT_GLYPHS.soccer,
          to: "/football",
        },
        {
          key: "tennis",
          label: "Tennis",
          icon: SPORT_GLYPHS.tennis,
          action: unrouted("Tennis", "tennis"),
        },
        {
          key: "basketball",
          label: "Basketball",
          icon: SPORT_GLYPHS.basketball,
          action: unrouted("Basketball", "basketball"),
        },
        {
          key: "baseball",
          label: "Baseball",
          icon: SPORT_GLYPHS.baseball,
          action: unrouted("Baseball", "baseball"),
        },
        {
          key: "amfb",
          label: "American Football",
          icon: SPORT_GLYPHS.americanFootball,
          action: unrouted("American Football", "american-football"),
        },
        {
          key: "esports",
          label: "Esports",
          icon: SPORT_GLYPHS.esports,
          action: unrouted("Esports", "esports"),
        },
      ],
    },
    {
      label: "Casino",
      items: [
        {
          key: "roulette",
          label: "Roulette",
          icon: CircleDot,
          action: casino("Roulette"),
        },
        {
          key: "slots",
          label: "Slots",
          icon: Cherry,
          action: casino("Slots"),
        },
      ],
    },
  ];

  return (
    <>
      {/* scrim under the drawer at 768–1023 (contract: ≡ drawer) */}
      {railOpen && (
        <button
          type="button"
          aria-label="Close sport rail"
          tabIndex={-1}
          onClick={() => setRailOpen(false)}
          className="fixed inset-0 top-[var(--layout-header)] z-30 hidden bg-black/50 md:block lg:hidden"
        />
      )}
      <nav
        aria-label="Sports"
        // inert while collapsed — translated-off controls must not be
        // focus stops; visibility stays so the slide still animates
        inert={!railOpen}
        className={`fixed bottom-0 start-0 top-[var(--layout-header)] z-40 hidden w-[var(--layout-rail)] flex-col items-center gap-1 overflow-y-auto border-e border-c-hairline bg-c-bg py-3 transition-transform duration-(--dur-enter) ease-standard md:flex ${
          railOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        {zones.map((zone, zi) => (
          <div
            key={zone.label}
            className={`flex w-full flex-col items-center gap-1 ${
              zi > 0 ? "mt-2 border-t border-c-hairline pt-2" : ""
            }`}
          >
            {zone.items.map((it) => (
              <RailItem
                key={it.key}
                entry={it}
                active={it.to != null && loc.pathname === it.to}
              />
            ))}
          </div>
        ))}
        {/* footer rungs — reachable, never loud (MENTAL-MAP footer layer) */}
        <div className="mt-auto flex w-full flex-col items-center gap-1 border-t border-c-hairline pt-2">
          <RailItem
            entry={{
              key: "chat",
              label: "Chat",
              icon: MessageCircle,
              action: openChat,
            }}
            active={false}
          />
          <RailItem
            entry={{
              key: "support",
              label: "Support",
              icon: LifeBuoy,
              action: () => {
                setSupportOpen(true);
                setRailOpen(false);
              },
            }}
            active={false}
          />
          <RailItem
            entry={{
              key: "break",
              label: "Take a break",
              icon: Pause,
              action: () => {
                setRgOpen(true);
                setRailOpen(false);
              },
            }}
            active={false}
          />
        </div>
      </nav>
    </>
  );
}

/* ── Sport row (phone, sticky, board-level chrome) ────────────────── */
export const BOARD_PATHS = ["/", "/live", "/football", "/following"];
export function SportRow() {
  const loc = useLocation();
  const toast = useUI((s) => s.toast);
  const liveCount = useWorld(liveCountSel);
  const matches = useWorld((s) => s.matches);
  const pillsRef = useRef<(HTMLElement | null)[]>([]);
  const [roving, setRoving] = useState(0);
  if (!BOARD_PATHS.includes(loc.pathname)) return null;

  const pills: {
    key: string;
    label: string;
    to?: "/" | "/live" | "/football";
    sport?: string;
    live?: boolean;
  }[] = [
    { key: "home", label: "Home", to: "/" },
    { key: "live", label: "Live", to: "/live", live: true },
    { key: "soccer", label: "Soccer", to: "/football", sport: "soccer" },
    { key: "tennis", label: "Tennis", sport: "tennis" },
    { key: "basketball", label: "Basketball", sport: "basketball" },
    { key: "baseball", label: "Baseball", sport: "baseball" },
    { key: "amfb", label: "Am. Football", sport: "american-football" },
    { key: "esports", label: "Esports", sport: "esports" },
  ];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (roving + dir + pills.length) % pills.length;
    setRoving(next);
    pillsRef.current[next]?.focus();
  };
  return (
    <div className="sticky top-[var(--layout-header)] z-30 border-b border-c-hairline bg-c-bg lg:hidden">
      <div
        role="tablist"
        aria-label="Sports"
        onKeyDown={onKey}
        className="hb-edge-fade no-scrollbar flex h-[var(--layout-sportrow)] items-stretch gap-1 overflow-x-auto px-3"
      >
        {pills.map((p, i) => {
          const active = loc.pathname === p.to;
          const cls = `flex h-11 shrink-0 items-center gap-1.5 self-center rounded-hb-pill px-3 font-hb-ui text-hb-label font-semibold ${
            active ? "bg-c-cta text-c-cta-fg" : "bg-c-surface-2 text-c-text"
          }`;
          const inner = p.live ? (
            <>
              <span
                className={`hb-live-pulse size-1.5 rounded-hb-pill ${active ? "bg-c-cta-fg" : "bg-c-live"}`}
                aria-hidden
              />
              Live
              <span
                dir="ltr"
                className={`grid min-w-4 place-items-center rounded-hb-pill px-1 font-hb-num text-hb-micro font-semibold ${
                  active ? "bg-c-cta-fg text-c-cta" : "bg-c-live text-c-live-fg"
                }`}
              >
                {liveCount}
              </span>
            </>
          ) : (
            p.label
          );
          const tabProps = {
            role: "tab" as const,
            "aria-selected": active,
            "aria-current": active ? ("page" as const) : undefined,
            tabIndex: i === roving ? 0 : -1,
            ref: (el: HTMLElement | null) => {
              pillsRef.current[i] = el;
            },
          };
          return p.to ? (
            <Link key={p.key} to={p.to} {...tabProps} className={cls}>
              {inner}
            </Link>
          ) : (
            <button
              key={p.key}
              type="button"
              {...tabProps}
              onClick={() =>
                matches.some((m) => m.sport === p.sport)
                  ? toast(`${p.label} fixtures run on the home board`, "info")
                  : toast(`${p.label} isn't in this demo's seed`, "info")
              }
              className={cls}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Right ticket panel (360px) ───────────────────────────────────── */
export function SidePanel() {
  const panelOpen = useUI((s) => s.panelOpen);
  const setPanelOpen = useUI((s) => s.setPanelOpen);
  const panelTab = useUI((s) => s.panelTab);
  const setPanelTab = useUI((s) => s.setPanelTab);
  const slipCount = useSlip((s) => s.selections.length);
  const openCount = useBets(
    (s) => s.bets.filter((b) => b.result === "open").length,
  );
  const tabs: { key: "slip" | "bets" | "chat"; label: string; n: number }[] = [
    { key: "slip", label: "Bet slip", n: slipCount },
    { key: "bets", label: "My bets", n: openCount },
    { key: "chat", label: "Chat", n: 0 },
  ];
  return (
    <>
      {/* scrim — panel is an overlay sheet at 1024–1439 (SH-03).
          lg:max-desk: is ONE range rule — plain `lg:block desk:hidden`
          loses at exactly 1440 because the custom `desk` breakpoint
          sorts before `lg` in the emitted sheet (cascade, not intent) */}
      {panelOpen && (
        <button
          type="button"
          aria-label="Close ticket panel"
          tabIndex={-1}
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 top-[var(--layout-header)] z-30 hidden bg-black/50 lg:max-desk:block"
        />
      )}
      <aside
        aria-label="Ticket"
        inert={!panelOpen}
        className={`fixed bottom-0 end-0 top-[var(--layout-header)] z-40 hidden w-[var(--layout-panel)] max-w-full flex-col border-s border-c-hairline bg-c-surface-1 transition-transform duration-(--dur-enter) ease-standard lg:flex ${
          panelOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div
          role="tablist"
          aria-label="Ticket"
          className="flex items-center gap-1 border-b border-c-hairline p-2"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={panelTab === t.key}
              onClick={() => setPanelTab(t.key)}
              className={`flex h-9 flex-1 items-center justify-center gap-1 rounded-hb-md font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
                panelTab === t.key
                  ? "bg-c-surface-3 text-c-text"
                  : "text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
              }`}
            >
              {t.label}
              {t.n > 0 && (
                <span
                  dir="ltr"
                  className={`font-hb-num text-hb-micro tabular-nums ${
                    panelTab === t.key ? "text-c-text" : "text-c-text-2"
                  }`}
                >
                  ·{t.n}
                </span>
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            aria-label="Close ticket panel"
            className="grid size-9 shrink-0 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {panelTab === "slip" && <BetSlipBody />}
          {panelTab === "bets" && <MyBetsBody />}
          {panelTab === "chat" && <ChatBody />}
        </div>
        {/* pinned footer — session line over the RG strip (SH-01) */}
        <div className="border-t border-c-hairline px-3 py-2">
          <SessionLine />
          <RgStrip />
        </div>
      </aside>
    </>
  );
}

/* ── Chat (unchanged internals — D3 restyles) ─────────────────────── */
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
      <div className="border-b border-c-hairline px-3 py-2">
        <p className="font-hb-ui text-hb-micro text-c-text-3">
          Community · sample conversation — messages are illustrative
        </p>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {CHAT_SEED.map((c, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="flex items-baseline gap-1.5 font-hb-ui text-hb-micro">
              <span className="font-semibold text-c-text-2">{c.who}</span>
              <span className="text-c-text-3">{c.when}</span>
            </span>
            <p className="font-hb-ui text-hb-body-sec leading-snug text-c-text-2">
              {c.text}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-c-hairline p-2.5">
        <div className="flex items-center gap-2 rounded-hb-md border border-c-hairline bg-c-surface-2 px-3 py-2">
          <input
            placeholder="Join the conversation"
            aria-label="Chat message"
            className="w-full bg-transparent font-hb-ui text-hb-body-sec text-c-text outline-none placeholder:text-c-text-3"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                useUI
                  .getState()
                  .toast("Chat is read-only in this demo", "info");
            }}
          />
          <button
            type="button"
            aria-label="Send message"
            onClick={() =>
              useUI.getState().toast("Chat is read-only in this demo", "info")
            }
            className="shrink-0 rounded-hb-sm p-1 text-c-text-2 transition-colors hover:bg-c-surface-3 hover:text-c-text"
          >
            <MessageCircle size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Bottom nav (phone, 6 slots incl. Live — D-20) ────────────────── */
export function BottomBar({ onSearch }: { onSearch: () => void }) {
  const loc = useLocation();
  const liveCount = useWorld(liveCountSel);
  const setSupportOpen = useUI((s) => s.setSupportOpen);
  const setScenarioOpen = useUI((s) => s.setScenarioOpen);
  const setPanelTab = useUI((s) => s.setPanelTab);
  const setMobileOpen = useSlip((s) => s.setMobileOpen);
  const [sheet, setSheet] = useState<"menu" | "casino" | null>(null);
  const follows = useUI((s) => s.follows);
  const followCount = useWorld(
    (s) => s.matches.filter((m) => isMatchFollowed(m, follows)).length,
  );
  const boardActive =
    loc.pathname === "/" ||
    loc.pathname.startsWith("/match") ||
    loc.pathname === "/football" ||
    loc.pathname === "/following";
  const liveActive = loc.pathname === "/live";
  const MENU_ITEMS: {
    to: "/" | "/live" | "/football" | "/following" | "/bets";
    label: string;
    badge?: number;
  }[] = [
    { to: "/", label: "Home" },
    { to: "/live", label: "Live", badge: liveCount },
    { to: "/football", label: "Football" },
    { to: "/following", label: "Following", badge: followCount },
    { to: "/bets", label: "My bets" },
  ];

  const slotCls = (active: boolean) =>
    `relative flex flex-1 flex-col items-center justify-center gap-0.5 font-hb-ui text-hb-micro ${
      active ? "font-semibold text-c-neon" : "font-medium text-c-text-2"
    }`;
  const tileCls = (active: boolean) =>
    `relative grid size-7 place-items-center rounded-hb-md ${
      active ? "bg-c-surface-3" : ""
    }`;

  return (
    <>
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 flex h-[calc(var(--layout-bottombar)+env(safe-area-inset-bottom))] items-stretch border-t border-c-hairline bg-c-bg pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <button
          type="button"
          onClick={() => setSheet("menu")}
          className={slotCls(false)}
        >
          <span className={tileCls(false)}>
            <Menu size={20} strokeWidth={1.5} />
          </span>
          Menu
        </button>
        <Link
          to="/"
          aria-current={boardActive ? "page" : undefined}
          className={slotCls(boardActive && !liveActive)}
        >
          <span className={tileCls(boardActive && !liveActive)}>
            <SPORT_GLYPHS.soccer size={20} strokeWidth={1.5} />
          </span>
          Sports
        </Link>
        <Link
          to="/live"
          aria-current={liveActive ? "page" : undefined}
          aria-label={`Live${liveCount ? `, ${liveCount} in play` : ""}`}
          className={slotCls(liveActive)}
        >
          <span className={tileCls(liveActive)}>
            <Video size={20} strokeWidth={1.5} />
            {liveCount > 0 && (
              <span
                dir="ltr"
                className="absolute -end-1.5 -top-1 grid min-w-4 place-items-center rounded-hb-pill bg-c-live px-1 font-hb-num text-hb-micro font-semibold text-c-live-fg"
              >
                {liveCount}
              </span>
            )}
          </span>
          Live
        </Link>
        <button
          type="button"
          onClick={() => setSheet("casino")}
          className={slotCls(false)}
        >
          <span className={tileCls(false)}>
            <Dices size={20} strokeWidth={1.5} />
          </span>
          Casino
        </button>
        <button
          type="button"
          onClick={() => {
            setPanelTab("chat");
            setMobileOpen(true);
          }}
          className={slotCls(false)}
        >
          <span className={tileCls(false)}>
            <MessageCircle size={20} strokeWidth={1.5} />
          </span>
          Chat
        </button>
        <button
          type="button"
          onClick={() => setSupportOpen(true)}
          className={slotCls(false)}
        >
          <span className={tileCls(false)}>
            <LifeBuoy size={20} strokeWidth={1.5} />
          </span>
          Support
        </button>
      </nav>

      <PhoneSheet
        open={sheet === "menu"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Menu"
      >
        <nav className="flex flex-col gap-1 px-3 pb-6">
          {MENU_ITEMS.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              onClick={() => setSheet(null)}
              className="flex items-center justify-between rounded-hb-md border border-c-hairline bg-c-surface-2 px-4 py-3 font-hb-ui text-hb-body font-semibold text-c-text transition-colors hover:bg-c-surface-3"
            >
              {it.label}
              {it.badge != null && it.badge > 0 && (
                <span
                  dir="ltr"
                  className="rounded-hb-pill bg-c-live px-2 py-0.5 font-hb-num text-hb-micro font-semibold text-c-live-fg"
                >
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
            className="flex items-center justify-between rounded-hb-md border border-c-hairline bg-c-surface-2 px-4 py-3 font-hb-ui text-hb-body font-semibold text-c-text"
          >
            Search <Search size={15} className="text-c-text-2" />
          </button>
          <button
            type="button"
            onClick={() => {
              setSheet(null);
              setScenarioOpen(true);
            }}
            className="flex items-center justify-between rounded-hb-md border border-c-hairline bg-c-surface-2 px-4 py-3 font-hb-ui text-hb-body font-semibold text-c-text"
          >
            Demo states <FlaskConical size={15} className="text-c-text-2" />
          </button>
        </nav>
      </PhoneSheet>

      <PhoneSheet
        open={sheet === "casino"}
        onOpenChange={(v) => !v && setSheet(null)}
        title="Casino"
      >
        <div className="px-5 pb-8 pt-2">
          <p className="font-hb-ui text-hb-h1 font-semibold text-c-text">
            Casino isn't part of this prototype
          </p>
          <p className="mt-1.5 font-hb-ui text-hb-body-sec leading-relaxed text-c-text-2">
            This contest entry covers the sportsbook only — same shell, sports
            content. The slot stays because that's where it lives on Housebets.
          </p>
          <Link
            to="/"
            onClick={() => setSheet(null)}
            data-on-cta
            className="mt-4 inline-flex h-10 items-center rounded-hb-md bg-c-cta px-5 font-hb-ui text-hb-label font-semibold text-c-cta-fg"
          >
            Back to sports
          </Link>
        </div>
      </PhoneSheet>
    </>
  );
}

/* ── Floating slip pill — canon payloads only (DATA-CANON pill law) ── */
export function SlipPill() {
  const sels = useSlip((s) => s.selections);
  // select the stable array, filter outside — a filtered selector returns
  // a fresh reference per snapshot and breaks useSyncExternalStore
  const bets = useBets((s) => s.bets);
  const openBets = bets.filter((b) => b.result === "open");
  const setMobileOpen = useSlip((s) => s.setMobileOpen);
  const setPanelTab = useUI((s) => s.setPanelTab);
  const offline = useUI((s) => s.offline);
  const breakUntil = useUI((s) => s.breakUntil);
  const mt = useWorld((s) =>
    openBets.length
      ? s.matches.find((m) => m.id === openBets[0].matchId)
      : undefined,
  );

  const hasPicks = sels.length > 0;
  const openBet = openBets[0];
  // pill shows only when something exists — canon always has ≥1 open bet
  const show = hasPicks || Boolean(openBet);
  // the pill is a state surface, not just a count (U-04): moved legs
  // flag amber, suspended legs flag the lock, offline/break name it
  const changed = sels.some((x) => x.status === "changed");
  const susp = sels.some((x) => x.status === "suspended");
  const onBreak = breakUntil > Date.now();
  const payload = hasPicks
    ? `●${sels.length} ${sels[0].pick} @${sels[0].livePrice.toFixed(2)}`
    : openBet && mt
      ? `●${openBets.length} ${openBet.pick} · ${mt.score.home}–${mt.score.away} · ${
          mt.status === "live" && mt.minute != null
            ? `${mt.minute}'`
            : (mt.period ?? "—")
        } · CO ${openBet.cashout?.value.toFixed(2) ?? "—"}`
      : "";
  const flag = onBreak
    ? `On a break · back ${fmtClock(breakUntil)}`
    : offline
      ? "Offline — frozen"
      : susp
        ? "Suspended pick"
        : changed
          ? "Odds moved"
          : null;
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ y: 24, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] },
          }}
          exit={{
            y: 24,
            opacity: 0,
            transition: { duration: 0.16, ease: [0.77, 0, 0.175, 1] },
          }}
          onClick={() => {
            setPanelTab(hasPicks ? "slip" : "bets");
            setMobileOpen(true);
          }}
          data-on-cta={hasPicks || undefined}
          aria-label={
            hasPicks
              ? `Bet slip · ${sels.length} selection${sels.length > 1 ? "s" : ""}${flag ? ` · ${flag}` : ""}`
              : "Open bets"
          }
          className={`fixed inset-x-4 bottom-[calc(var(--layout-bottombar)+env(safe-area-inset-bottom)+var(--s-2))] z-40 flex h-12 items-center gap-2 rounded-hb-pill border px-4 lg:hidden ${
            flag && hasPicks
              ? "border-c-suspend bg-c-surface-1 text-c-text"
              : hasPicks
                ? "border-c-hairline bg-c-cta text-c-cta-fg"
                : "border-c-hairline bg-c-surface-1 text-c-text"
          }`}
        >
          <span
            className={`hb-live-pulse size-1.5 shrink-0 rounded-hb-pill ${
              flag ? "bg-c-suspend" : hasPicks ? "bg-c-cta-fg" : "bg-c-live"
            }`}
            aria-hidden
          />
          <span
            dir="ltr"
            className="truncate font-hb-num text-hb-odds-sm font-semibold tabular-nums"
          >
            {payload}
          </span>
          {flag && (
            <span className="ms-auto shrink-0 rounded-hb-sm bg-c-suspend px-1.5 py-0.5 font-hb-ui text-hb-micro font-semibold text-c-suspend-fg">
              {flag}
            </span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Slip sheet (phone ticket = same object, collapsed) ───────────── */
export function SlipSheet() {
  const open = useSlip((s) => s.mobileOpen);
  const setOpen = useSlip((s) => s.setMobileOpen);
  const count = useSlip((s) => s.selections.length);
  const openCount = useBets(
    (s) => s.bets.filter((b) => b.result === "open").length,
  );
  const tab = useUI((s) => s.panelTab);
  const setTab = useUI((s) => s.setPanelTab);
  const controls = useDragControls();
  const tabs: { key: "slip" | "bets" | "chat"; label: string; n: number }[] = [
    { key: "slip", label: "Bet slip", n: count },
    { key: "bets", label: "My bets", n: openCount },
    { key: "chat", label: "Chat", n: 0 },
  ];
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-(--dur-close) data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[82dvh] flex-col overflow-hidden rounded-t-hb-lg border-t border-c-hairline bg-c-surface-1 shadow-hb-sheet transition-[transform,opacity] duration-(--dur-move) ease-standard data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full lg:hidden">
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
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-hb-pill bg-c-surface-3" />
              <div className="flex items-center justify-between px-4 py-3">
                <Dialog.Title className="font-hb-ui text-hb-h1 font-semibold text-c-text">
                  Ticket
                </Dialog.Title>
                <Dialog.Close
                  className="grid size-9 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2"
                  aria-label="Close"
                >
                  <X size={18} />
                </Dialog.Close>
              </div>
            </div>
            {/* same tab grammar as the desk panel */}
            <div
              className="mx-3 mb-2 flex gap-1 rounded-hb-md border border-c-hairline bg-c-surface-2 p-1"
              role="tablist"
              aria-label="Ticket"
            >
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex h-8 flex-1 items-center justify-center gap-1 rounded-hb-sm font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
                    tab === t.key
                      ? "bg-c-surface-3 text-c-text"
                      : "text-c-text-2 hover:text-c-text"
                  }`}
                >
                  {t.label}
                  {t.n > 0 && (
                    <span
                      dir="ltr"
                      className="font-hb-num text-hb-micro tabular-nums"
                    >
                      ·{t.n}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)]">
              {tab === "slip" && <BetSlipBody />}
              {tab === "bets" && <MyBetsBody />}
              {tab === "chat" && (
                <div className="flex h-[52dvh] flex-col">
                  <ChatBody />
                </div>
              )}
            </div>
            {/* session line rides the sheet too (canon invariant 2) */}
            <div className="border-t border-c-hairline px-3 py-2 pb-[max(env(safe-area-inset-bottom),var(--s-2))]">
              <SessionLine />
              <RgStrip />
            </div>
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ── Global sheets: safer gambling + support (open via store flags) ── */
function RgBody() {
  const { mins, net } = useSession();
  const breakUntil = useUI((s) => s.breakUntil);
  const takeBreak = useUI((s) => s.takeBreak);
  const endBreak = useUI((s) => s.endBreak);
  const onBreak = breakUntil > Date.now();
  const [confirmEnd, setConfirmEnd] = useState(false);
  return (
    <div className="pb-2">
      <p className="font-hb-ui text-hb-body-sec text-c-text-2">
        Session {mins} min · net{" "}
        <span dir="ltr" className="font-hb-num text-c-text tabular-nums">
          {net >= 0 ? "+" : "−"}
          {Math.abs(net).toFixed(2)}
        </span>{" "}
        USDT
      </p>
      {onBreak ? (
        <>
          <p className="mt-3 font-hb-ui text-hb-body-sec text-c-text-2">
            On a break · back {fmtClock(breakUntil)}. Betting is off until then.
            Prices are read-only. Cash out still works.
          </p>
          {confirmEnd ? (
            <button
              type="button"
              onClick={() => {
                endBreak();
                setConfirmEnd(false);
              }}
              data-on-cta
              className="mt-4 w-full rounded-hb-md bg-c-cta py-2.5 font-hb-ui text-hb-label font-semibold text-c-cta-fg"
            >
              Confirm — end the break
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmEnd(true)}
              className="mt-4 w-full rounded-hb-md border border-c-hairline bg-c-surface-2 py-2.5 font-hb-ui text-hb-label font-semibold text-c-text"
            >
              End break early?
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => takeBreak(10)}
          className="mt-4 w-full rounded-hb-md border border-c-hairline bg-c-surface-2 py-2.5 font-hb-ui text-hb-label font-semibold text-c-text hover:bg-c-surface-3"
        >
          Take a 10-minute break
        </button>
      )}
      <p className="mt-4 font-hb-ui text-hb-micro text-c-text-3">
        18+ · Play responsibly · Take a break
      </p>
    </div>
  );
}

const SUPPORT_COPY = [
  "This is a design prototype — there's no live support desk. Every control in the demo is real, though: tap odds to build a slip, watch prices tick, and use the Demo states tour to jump straight to suspended, odds-changed, cash-out and offline states.",
  "Sample data only · no real money · singles only.",
];

export function GlobalSheets() {
  const rgOpen = useUI((s) => s.rgOpen);
  const setRgOpen = useUI((s) => s.setRgOpen);
  const supportOpen = useUI((s) => s.supportOpen);
  const setSupportOpen = useUI((s) => s.setSupportOpen);
  return (
    <>
      <ShellSheet open={rgOpen} onOpenChange={setRgOpen} title="Safer gambling">
        <RgBody />
      </ShellSheet>
      <ShellSheet
        open={supportOpen}
        onOpenChange={setSupportOpen}
        title="Support"
      >
        <div className="space-y-3 pb-2 font-hb-ui text-hb-body-sec leading-relaxed text-c-text-2">
          {SUPPORT_COPY.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </ShellSheet>
    </>
  );
}

/* ── Offline banner — canon grammar (cloud-slash, never padlock) ──── */
export function OfflineBanner({ underRow }: { underRow: boolean }) {
  const offline = useUI((s) => s.offline);
  if (!offline) return null;
  return (
    <div
      role="status"
      className={`hb-band-in sticky z-30 flex h-12 items-center justify-center gap-2 border-b border-c-hairline bg-c-surface-2 px-4 font-hb-ui text-hb-body-sec text-c-text ${
        underRow
          ? "top-[calc(var(--layout-header)+var(--layout-sportrow))] lg:top-[var(--layout-header)]"
          : "top-[var(--layout-header)]"
      }`}
    >
      <CloudOffGlyph size={18} className="shrink-0 text-c-text-2" />
      <span>You&apos;re offline — prices are frozen, not live</span>
    </div>
  );
}
