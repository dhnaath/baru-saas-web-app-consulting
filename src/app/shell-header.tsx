import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";

type ShellHeaderCtxValue = {
  setHasAppHeader: (has: boolean) => void;
};

const ShellHeaderCtx = createContext<ShellHeaderCtxValue | null>(null);

export const ShellHeaderProvider = ShellHeaderCtx.Provider;

/**
 * ShellHeader — Portals interactive actions, view switchers, tabs, and toolbars
 * directly into the main application header (in AppShell), completely removing
 * any duplicate headers or toolbars from the app body.
 */
export function ShellHeader({ children }: { children: ReactNode }) {
  const ctx = useContext(ShellHeaderCtx);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    ctx?.setHasAppHeader(true);

    const checkTarget = () => {
      const target = document.getElementById("app-header-actions-portal");
      if (target) {
        setPortalTarget(target);
      }
    };

    checkTarget();
    const timer = setTimeout(checkTarget, 50);

    return () => {
      clearTimeout(timer);
      ctx?.setHasAppHeader(false);
    };
  }, [ctx]);

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className="flex items-center justify-end gap-1.5 shrink-0 shell-header-portal-actions h-full overflow-visible">
      {children}
    </div>,
    portalTarget
  );
}

export interface HeaderNavPillItem<T extends string | number = string> {
  id: T;
  label: string;
  count?: number | string;
  title?: string;
}

/**
 * HeaderNavPills — Cursor-following segmented capsule bar inside ShellHeader
 * using Framer Motion shared layout animation (layoutId="nav-pill") with spring physics.
 */
export function HeaderNavPills<T extends string | number = string>({
  items,
  activeId,
  onSelect,
}: {
  items: readonly HeaderNavPillItem<T>[];
  activeId: string | number;
  onSelect: (id: T) => void;
}) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const groupId = useId();
  const pillBg =
    "bg-primary shadow-[0_1px_4px_hsl(var(--primary)/0.35)] dark:shadow-[0_1px_5px_hsl(var(--primary)/0.45)]";

  const hasActiveItem = items.some((item) => String(item.id) === String(activeId));
  const effectiveActiveId = hasActiveItem ? activeId : (items[0]?.id ?? activeId);

  // Auto-minimize: setelah 10 detik idle tanpa interaksi kursor, ciutkan menjadi hanya kategori terpilih
  const IDLE_TIMEOUT_MS = 10000;
  const [isMinimized, setIsMinimized] = useState(false);
  const isHoveringRef = useRef(false);

  // Mode "terkunci terbuka": tombol manual (ikon maximize) menghentikan auto-minimize
  // sampai tombol diklik lagi. Pilihan disimpan agar tetap berlaku setelah reload.
  const PINNED_STORAGE_KEY = "aio_header_pills_pinned";
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return typeof window !== "undefined" && window.localStorage.getItem(PINNED_STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const isPinnedRef = useRef(isPinned);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    if (isHoveringRef.current || isPinnedRef.current) {
      return;
    }

    idleTimerRef.current = setTimeout(() => {
      if (!isHoveringRef.current && !isPinnedRef.current) {
        setIsMinimized(true);
      }
    }, IDLE_TIMEOUT_MS);
  }, []);

  // Jalankan timer saat mount
  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetIdleTimer]);

  // Saat kategori aktif berubah, reset timer dan sinkronkan dengan sidebar
  useEffect(() => {
    resetIdleTimer();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aio_header_category_changed", { detail: String(effectiveActiveId) })
      );
    }
  }, [activeId, effectiveActiveId, resetIdleTimer]);

  // Dukungan sinkronisasi jika kategori dipilih dari sidebar
  useEffect(() => {
    const handleSelectCategory = (e: any) => {
      const targetId = e.detail;
      if (targetId) {
        const found = items.find(
          (it) =>
            String(it.id).toLowerCase() === String(targetId).toLowerCase() ||
            it.label.toLowerCase() === String(targetId).toLowerCase()
        );
        if (found) {
          onSelect(found.id);
        } else if (String(targetId).toLowerCase() === "all" || String(targetId).toLowerCase() === "semua") {
          const allItem = items.find(
            (it) => String(it.id).toLowerCase() === "all" || it.label.toLowerCase() === "semua"
          );
          if (allItem) onSelect(allItem.id);
        }
      }
    };
    window.addEventListener("aio_select_header_category", handleSelectCategory);
    return () => window.removeEventListener("aio_select_header_category", handleSelectCategory);
  }, [items, onSelect]);

  // Saat kursor masuk ke area kategori bar, segera expand kembali
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setIsMinimized(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  // Saat kursor meninggalkan area kategori bar, mulai hitung mundur 10 detik
  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setHoveredNav(null);
    resetIdleTimer();
  };

  // Tombol manual: klik untuk membuka & mengunci bar, klik lagi untuk menciutkan & melanjutkan auto-minimize
  const handleTogglePinned = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isPinnedRef.current;
    isPinnedRef.current = next;
    setIsPinned(next);
    try {
      window.localStorage.setItem(PINNED_STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* storage tidak tersedia — abaikan */
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    setIsMinimized(!next);
  };

  // Fisika pegas identik dengan animasi dock yang super mulus
  const springTransition = {
    type: "spring" as const,
    stiffness: 350,
    damping: 26,
    mass: 0.8,
  };

  const activeIdx = items.findIndex((item) => String(item.id) === String(effectiveActiveId));

  return (
    <LayoutGroup id={`header-nav-${groupId}`}>
      <motion.div
        data-nav-pill-group="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        layout
        transition={springTransition}
        className="relative inline-flex items-center justify-end h-[46px] rounded-full liquid-glass-header-pill bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs p-1 overflow-x-auto overflow-y-visible no-scrollbar scrollbar-none max-w-full"
      >
        <AnimatePresence initial={false}>
          {items.map((item, idx) => {
            const itemKey = String(item.id);
            const isActive = String(effectiveActiveId) === itemKey;
            const isEdgeItem = idx === 0 || idx === items.length - 1;
            const isToLeftOfActive = activeIdx !== -1 && idx < activeIdx;

            // Jika sedang minimized dan item ini bukan item yang dipilih, sembunyikan dengan animasi exit bersih
            if (isMinimized && !isActive && items.length > 1) {
              return null;
            }

            const isHighlighted =
              hoveredNav === itemKey || (hoveredNav === null && isActive);

            return (
              <motion.button
                key={itemKey}
                type="button"
                layout
                data-nav-pill-btn="true"
                data-pill-highlighted={isHighlighted ? "true" : undefined}
                data-nav-selected={isActive ? "true" : undefined}
                initial={{
                  width: 0,
                  opacity: 0,
                  scale: 0.9,
                  x: 20,
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginRight: 0,
                }}
                animate={{
                  width: "auto",
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  paddingLeft: 13,
                  paddingRight: 13,
                  marginRight: isMinimized || idx === items.length - 1 ? 0 : 3,
                }}
                exit={{
                  width: 0,
                  minWidth: 0,
                  maxWidth: 0,
                  opacity: 0,
                  scale: 0.9,
                  x: isToLeftOfActive ? 16 : 32,
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginRight: 0,
                  transition: {
                    duration: 0.28,
                    ease: [0.32, 0.72, 0, 1],
                  },
                }}
                transition={springTransition}
                onClick={() => {
                  if (isMinimized) {
                    setIsMinimized(false);
                    resetIdleTimer();
                  } else {
                    onSelect(item.id);
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("aio_header_category_changed", { detail: String(item.id) })
                      );
                    }
                    resetIdleTimer();
                  }
                }}
                onMouseEnter={() => {
                  if (!isMinimized) setHoveredNav(itemKey);
                }}
                title={
                  item.title ??
                  (item.count !== undefined
                    ? `${item.label} (${item.count})`
                    : item.label)
                }
                className={`relative h-[38px] rounded-full text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-1.5 select-none shrink-0 ${
                  isActive ? "z-20" : "z-0"
                } ${
                  isHighlighted
                    ? "text-primary-foreground font-bold"
                    : isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground font-semibold"
                }`}
              >
                {isHighlighted ? (
                  <motion.div
                    layoutId="nav-pill"
                    data-nav-pill-indicator="true"
                    className={`absolute inset-0 rounded-full z-0 pointer-events-none overflow-hidden ${pillBg}`}
                    style={{ borderRadius: 19 }}
                    transition={
                      isEdgeItem
                        ? { type: "spring", bounce: 0.02, duration: 0.36 }
                        : { type: "spring", bounce: 0.1, duration: 0.38 }
                    }
                  />
                ) : null}
                <span className="relative z-10 whitespace-nowrap leading-normal py-0.5">{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`relative z-10 text-[12px] whitespace-nowrap leading-normal py-0.5 transition-colors ${
                      isHighlighted
                        ? "text-primary-foreground/90 font-bold"
                        : isActive
                        ? "text-foreground/80 font-semibold"
                        : "text-muted-foreground/75 font-medium"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {items.length > 1 && (
          <button
            type="button"
            onClick={handleTogglePinned}
            aria-pressed={isPinned}
            aria-label={isPinned ? "Ciutkan bar kategori" : "Buka dan kunci bar kategori"}
            title={isPinned ? "Ciutkan (aktifkan auto-minimize)" : "Buka & kunci (hentikan auto-minimize)"}
            className={`relative z-10 ml-1 h-[38px] w-[34px] shrink-0 inline-flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              isPinned
                ? "text-primary bg-primary/10 hover:bg-primary/15"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            {isPinned ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        )}
      </motion.div>
    </LayoutGroup>
  );
}
