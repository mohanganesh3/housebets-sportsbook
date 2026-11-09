import { useEffect, useRef } from "react";

/* ==================================================================
   useScrollMemory — per-page scroll restoration (SH-10/U-20).
   sessionStorage keyed by pathname: chosen over a store field because
   it survives full reloads for free and needs no new store mutation.
   Save: rAF-throttled scroll listener + unmount flush.
   Restore: deferred to rAF so it lands after the root shell's own
   mount-time scrollTo(0,0) — child effects run before the parent's,
   so effect-order alone would lose the race; rAF runs pre-paint
   after all effects.
   ================================================================== */

const KEY = (path: string) => `hb-scroll${path}`;

export function useScrollMemory(pathname: string) {
  const pending = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    try {
      const raw = sessionStorage.getItem(KEY(pathname));
      const y = raw ? Number(raw) : 0;
      if (y > 0) {
        /* retry across frames until the page is tall enough to honour
           the offset — on cold loads the effect's first rAF can fire
           while content is still mounting (document too short, the
           scroll clamps to 0). ~1s budget, instant writes only. */
        let tries = 0;
        const restore = () => {
          const maxY =
            document.documentElement.scrollHeight - window.innerHeight;
          if (maxY >= y) {
            window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
            return;
          }
          if (++tries < 60) raf = requestAnimationFrame(restore);
        };
        raf = requestAnimationFrame(restore);
      }
    } catch {}
    const onScroll = () => {
      if (pending.current != null) return;
      pending.current = requestAnimationFrame(() => {
        pending.current = null;
        try {
          sessionStorage.setItem(KEY(pathname), String(window.scrollY));
        } catch {}
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (pending.current != null) cancelAnimationFrame(pending.current);
      /* no unmount-write: on a fresh mount StrictMode's effect cycle
         runs cleanup while scrollY is still 0 and would overwrite the
         saved offset before the restore reads it. The scroll listener
         already persists every move, so nothing is lost. */
    };
  }, [pathname]);
}
