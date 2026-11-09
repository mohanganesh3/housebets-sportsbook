import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useBets } from "../lib/store/bets";
import { useUI } from "../lib/store/ui";
import { HouseGlyph, SESSION_START } from "./BetSlip";

/* ==================================================================
   board-ui — shared board controls (D2+D4, STORYBOARDS/boards.md).
   Content search bar · filter chips · ▾ dropdowns · segmented tabs ·
   empty module · session line · page sub-head. Tokens only.
   ================================================================== */

/* ── Content search bar (W1-01/W2-02/W3-02) — a button in field's
   clothing; focusing it opens the SH-06 palette via the shell's own
   "/" keyboard contract, so there's one palette object everywhere ── */
export function ContentSearchBar() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }))
      }
      aria-label="Search teams, players or leagues"
      className="flex h-11 w-full items-center gap-2.5 rounded-hb-md border border-c-hairline bg-c-surface-1 px-3 text-left font-hb-ui text-hb-body text-c-text-3 transition-colors duration-(--dur-feedback) hover:bg-c-surface-2"
    >
      <Search size={15} aria-hidden="true" className="shrink-0" />
      <span className="truncate">Search teams, players or leagues</span>
    </button>
  );
}

/* ── Page sub-head — ‹ back + title block (LV-01/FB-01) ──────────── */
export function BoardHeader({
  backTo = "/",
  title,
  meta,
  children,
}: {
  backTo?: "/" | "/live" | "/football";
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="flex items-center gap-2">
      <Link
        to={backTo}
        aria-label="Back"
        className="grid size-11 shrink-0 place-items-center rounded-hb-md text-c-text-2 transition-colors hover:bg-c-surface-2 hover:text-c-text"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </Link>
      <div className="min-w-0 flex-1">
        <h1 className="flex min-w-0 items-center gap-2 font-hb-ui text-hb-title font-bold text-c-text">
          {title}
        </h1>
        {meta && (
          <p className="truncate font-hb-ui text-hb-label text-c-text-2">
            {meta}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}

/* ── Session line — canon invariant 2: identical string on panel,
   sheet and live sub-head; tap opens the RG sheet (E-SHL-06) ─────── */
export function BoardSessionLine({ className = "" }: { className?: string }) {
  const net = useBets((s) =>
    s.bets.reduce((a, b) => {
      if (b.result === "won" || b.result === "cashedout")
        return a + b.returns - b.stake;
      if (b.result === "lost") return a - b.stake;
      return a;
    }, 0),
  );
  const mins = Math.max(1, Math.floor((Date.now() - SESSION_START) / 60_000));
  const setRgOpen = useUI((s) => s.setRgOpen);
  return (
    <button
      type="button"
      onClick={() => setRgOpen(true)}
      aria-label={`Session ${mins} minutes · net ${net >= 0 ? "plus" : "minus"} ${Math.abs(net).toFixed(2)} USDT · safer gambling`}
      className={`shrink-0 rounded-hb-sm font-hb-ui text-hb-micro text-c-text-2 ${className}`}
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

/* ── Filter chip — one pill grammar everywhere (E-BRD-03/06): active
   = cta fill + cta-fg; idle = s2 + t1; zero-count = t2, never hidden ─ */
export function FilterChip({
  label,
  count,
  active,
  disabled,
  onClick,
  children,
}: {
  label: ReactNode;
  count?: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className={`hb-seg flex h-9 shrink-0 items-center gap-1.5 rounded-hb-pill px-3.5 font-hb-ui text-hb-label font-semibold ${
        active
          ? "bg-c-cta text-c-cta-fg"
          : disabled
            ? "bg-c-surface-2 text-c-text-2 opacity-70"
            : "bg-c-surface-2 text-c-text hover:bg-c-surface-3"
      }`}
    >
      {children}
      {label}
      {count != null && (
        <span
          dir="ltr"
          className={`font-hb-num text-hb-micro tabular-nums ${
            active ? "text-c-cta-fg" : "text-c-text-2"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ── Board dropdown — ▾ popover (desk) used for market select, comp
   single-select and checklist; popover grammar: s2 + hairline + r-md,
   no shadow (elevation law); Esc/outside closes, focus returns ────── */
export function BoardMenu({
  label,
  button,
  children,
  align = "end",
  disabled,
}: {
  label: string;
  button: ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "start" | "end";
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    btnRef.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-hb-pill border border-c-hairline bg-c-surface-1 px-3 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2 disabled:opacity-50"
      >
        {button}
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`text-c-text-2 transition-transform duration-(--dur-feedback) ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className={`hb-pop-in absolute top-[calc(100%+var(--s-2))] z-40 min-w-44 rounded-hb-md border border-c-hairline bg-c-surface-2 p-1 ${
            align === "end" ? "end-0" : "start-0"
          }`}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
}

/* ── Menu option rows inside BoardMenu ────────────────────────────── */
export function MenuOption({
  active,
  count,
  onClick,
  children,
  disabled,
}: {
  active?: boolean;
  count?: number;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-hb-sm px-2.5 py-2 text-left font-hb-ui text-hb-body-sec transition-colors duration-(--dur-feedback) ${
        active
          ? "bg-c-surface-3 font-semibold text-c-text"
          : "text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
      } disabled:opacity-50`}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {count != null && (
        <span
          dir="ltr"
          className="font-hb-num text-hb-micro tabular-nums text-c-text-2"
        >
          {count}
        </span>
      )}
      <span
        aria-hidden="true"
        className={`grid size-4 place-items-center rounded-full border font-hb-num text-hb-micro leading-none ${
          active ? "border-c-cta bg-c-cta text-c-cta-fg" : "border-c-hairline"
        }`}
      >
        {active ? "✓" : ""}
      </span>
    </button>
  );
}

/* ── Checklist option — FB-04 competition checklist (multi-select) ── */
export function CheckOption({
  checked,
  count,
  onClick,
  children,
}: {
  checked: boolean;
  count?: number;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-hb-sm px-2.5 py-2 text-left font-hb-ui text-hb-body-sec transition-colors duration-(--dur-feedback) ${
        checked
          ? "font-semibold text-c-text"
          : "text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
      }`}
    >
      <span
        aria-hidden="true"
        className={`grid size-4 shrink-0 place-items-center rounded-hb-xs border font-hb-num text-hb-micro leading-none ${
          checked ? "border-c-cta bg-c-cta text-c-cta-fg" : "border-c-hairline"
        }`}
      >
        {checked ? "✓" : ""}
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {count != null && (
        <span
          dir="ltr"
          className="font-hb-num text-hb-micro tabular-nums text-c-text-2"
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ── Segmented tabs — one control grammar; active = cta fill ──────── */
export function SegmentedTabs({
  label,
  tabs,
  value,
  onChange,
}: {
  label: string;
  tabs: { key: string; label: ReactNode; count?: number }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex rounded-hb-pill border border-c-hairline bg-c-surface-1 p-0.5"
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={value === t.key}
          onClick={() => value !== t.key && onChange(t.key)}
          className={`hb-seg flex h-8 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-hb-pill px-3 font-hb-ui text-hb-label font-semibold ${
            value === t.key
              ? "bg-c-cta text-c-cta-fg"
              : "text-c-text-2 hover:text-c-text"
          }`}
        >
          {t.label}
          {t.count != null && (
            <span
              dir="ltr"
              className={`font-hb-num text-hb-micro tabular-nums ${
                value === t.key ? "text-c-cta-fg" : "text-c-text-2"
              }`}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ── Empty module — E-BRD-09: s1 region, left-aligned, type-led, ONE
   next step; house-glyph cameo on phone only (panel owns it on desk) ─ */
export function EmptyModule({
  title,
  line,
  action,
  role = "status",
}: {
  title: ReactNode;
  line?: ReactNode;
  action?: ReactNode;
  role?: "status" | "region";
}) {
  return (
    <div
      role={role}
      className="hb-empty-in flex max-w-[30rem] flex-col items-start gap-2 rounded-hb-md bg-c-surface-1 p-6"
    >
      <HouseGlyph size={24} className="text-c-text-3 opacity-40 lg:hidden" />
      <h2 className="font-hb-ui text-hb-h1 font-semibold text-c-text">
        {title}
      </h2>
      {line && <p className="font-hb-ui text-hb-body text-c-text-2">{line}</p>}
      {action}
    </div>
  );
}

/* ── Section head — name · count on the left, link/control on the
   right; counts attached to every header (U-28) ───────────────────── */
export function SectionHead({
  title,
  count,
  countSuffix,
  aside,
}: {
  title: ReactNode;
  count?: number;
  countSuffix?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-2 px-1">
      <h2 className="min-w-0 flex-1 truncate font-hb-ui text-hb-h1 font-semibold text-c-text">
        {title}
        {count != null && (
          <span className="font-hb-num font-normal text-c-text-2">
            {" "}
            · {count}
            {countSuffix}
          </span>
        )}
      </h2>
      {aside}
    </div>
  );
}

/* ── Text link — the `View all ›` idiom: neon text, never a fill ──── */
export function TextLink({
  to,
  children,
  onClick,
  className = "",
}: {
  to?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `flex min-h-11 shrink-0 items-center gap-0.5 rounded-hb-sm px-2 font-hb-ui text-hb-label font-semibold text-c-neon ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className="rtl:-scale-x-100">
        ›
      </span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ── Break banner — SH-11 board module: betting off, prices read-only,
   cash out still works. Neutral, no alarm (C-20) ──────────────────── */
export function BreakBanner() {
  const until = useUI((s) => s.breakUntil);
  if (!(until > Date.now())) return null;
  const back = new Date(until).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <p className="rounded-hb-md bg-c-surface-1 px-4 py-3 font-hb-ui text-hb-body-sec text-c-text-2">
      On a break · back {back}. Betting is off until then. Prices are read-only.
      Cash out still works.
    </p>
  );
}
