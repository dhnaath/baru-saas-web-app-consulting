import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  MoreHorizontal,
  PanelBottom,
  Pin,
  RotateCcw,
  X,
  Palette,
} from "lucide-react";
import {
  LAUNCHER_PAGE_OPTIONS,
  getLauncherPageOption,
  useCardPageMover,
  type MovedCardCategoryGroupSnapshot,
  type MovedCardFeatureSnapshot,
} from "@/hooks/useCardPageMover";
import {
  useCardIconColor,
  CARD_COLOR_PRESETS,
  resolveIconBg,
} from "@/hooks/useCardIconColor";
import { usePinnedCards } from "@/hooks/usePinnedCards";

export interface CardMoveMenuData {
  cardKey: string;
  originPageId: string;
  currentPageId: string;
  to: string;
  badge?: string;
  shortDesc?: string;
  gradient?: string;
  accentGradient?: string;
  icon?: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  features?: MovedCardFeatureSnapshot[];
  tools?: MovedCardFeatureSnapshot[];
  categoryGroups?: MovedCardCategoryGroupSnapshot[];
}

/**
 * MoveArrowsIcon — 4-way move arrows icon matching user uploaded specification (/public/assets/aistudio/image_c6a20cb9.png).
 * 4 completely detached, individual arrows with wide central spacing (302px) and spacious diagonal gaps.
 * None of the arrows touch or connect to each other.
 */
export function MoveArrowsIcon({ className = "size-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 1200"
      fill="currentColor"
      className={className}
      {...props}
    >
      {/* 1. Panah Atas (Up) — terpisah sendiri */}
      <path d="M600,98 L775,273 L723,325 L636,238 V449 H564 V238 L477,325 L425,273 Z" />
      {/* 2. Panah Kanan (Right) — terpisah sendiri */}
      <path d="M1102,600 L927,775 L875,723 L962,636 H751 V564 H962 L875,477 L927,425 Z" />
      {/* 3. Panah Bawah (Down) — terpisah sendiri */}
      <path d="M600,1102 L425,927 L477,875 L564,962 V751 H636 V962 L723,875 L775,927 Z" />
      {/* 4. Panah Kiri (Left) — terpisah sendiri */}
      <path d="M98,600 L273,425 L325,477 L238,564 H449 V636 H238 L325,723 L273,775 Z" />
    </svg>
  );
}

export interface CardMoreMenuProps {
  title: string;
  isFav: boolean;
  onToggleFavorite: () => void;
  moveData?: CardMoveMenuData;
  to?: string;
  icon?: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  defaultGradient?: string;
}

export function CardMoreMenu({
  title,
  isFav,
  onToggleFavorite,
  moveData,
  to,
  icon,
  defaultGradient,
}: CardMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [pageQuery, setPageQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const cardTo = to || moveData?.to;
  const CardIcon = icon || moveData?.icon;
  const cardDefaultGradient = defaultGradient || moveData?.gradient || "bg-linear-to-br from-primary to-indigo-700";
  const { customColor, hasCustomColor, setColor, resetColor } = useCardIconColor(title, cardTo);

  const [customHexInput, setCustomHexInput] = useState(() =>
    customColor && !customColor.startsWith("bg-") ? customColor : "#6366f1"
  );

  // Sync customHexInput when customColor changes
  useEffect(() => {
    if (customColor && !customColor.startsWith("bg-")) {
      setCustomHexInput(customColor);
    }
  }, [customColor]);

  const {
    moveCardToPage,
    restoreCardToOrigin,
    getMovedRecord,
  } = useCardPageMover();

  const existingMoved = moveData ? getMovedRecord(moveData.cardKey) : undefined;
  const trueOriginPageId = existingMoved?.originPageId || moveData?.originPageId;
  const currentPageId = existingMoved?.targetPageId || moveData?.currentPageId;
  const isMovedFromOrigin = Boolean(
    existingMoved && existingMoved.targetPageId !== existingMoved.originPageId
  );
  const originPageMeta = getLauncherPageOption(trueOriginPageId);
  const effectivePageId = currentPageId || "global";
  const { isPinned, togglePin } = usePinnedCards(effectivePageId);
  const cardId = cardTo || title;
  const isCardPinned = isPinned(cardId, effectivePageId);

  const [popupPos, setPopupPos] = useState<{
    top?: number;
    bottom?: number;
    right: number;
    maxHeight: number;
  } | null>(null);

  const updatePopupPosition = (expectedHeight = 380) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const right = Math.max(12, Math.min(window.innerWidth - 460, window.innerWidth - rect.right));
      const spaceBelow = window.innerHeight - rect.bottom - 16;
      const spaceAbove = rect.top - 16;

      // If more space below or space below is at least 320px, anchor below the button
      if (spaceBelow >= 320 || spaceBelow >= spaceAbove) {
        const maxHeight = Math.max(200, Math.min(expectedHeight, spaceBelow));
        setPopupPos({
          top: rect.bottom + 6,
          right,
          maxHeight,
        });
      } else {
        // Otherwise anchor above the button so it flips upwards and never gets cropped
        const maxHeight = Math.max(200, Math.min(expectedHeight, spaceAbove));
        setPopupPos({
          bottom: window.innerHeight - rect.top + 6,
          right,
          maxHeight,
        });
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isMoveModalOpen) return;
    updatePopupPosition();
    const handleResize = () => updatePopupPosition();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMoveModalOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoveModalOpen]);

  useEffect(() => {
    if (!isColorModalOpen) return;
    updatePopupPosition();
    const handleResize = () => updatePopupPosition();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsColorModalOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isColorModalOpen]);

  const filteredPages = LAUNCHER_PAGE_OPTIONS.filter((p) => {
    if (!pageQuery.trim()) return true;
    const q = pageQuery.toLowerCase().trim();
    return (
      p.label.toLowerCase().includes(q) ||
      p.shortLabel.toLowerCase().includes(q) ||
      p.badge.toLowerCase().includes(q) ||
      `hal ${p.pageNumber}`.includes(q) ||
      `page ${p.pageNumber}`.includes(q)
    );
  });

  const handleSelectTargetPage = (targetPageId: string, openAfterMove = false) => {
    if (!moveData) return;
    moveCardToPage(
      {
        cardKey: moveData.cardKey,
        originPageId: trueOriginPageId || moveData.originPageId,
        title,
        to: moveData.to,
        badge: moveData.badge,
        shortDesc: moveData.shortDesc,
        gradient: moveData.gradient,
        accentGradient: moveData.accentGradient,
        icon: moveData.icon,
        features: moveData.features,
      },
      targetPageId,
      openAfterMove
    );
    setIsMoveModalOpen(false);
    setPageQuery("");
  };

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className={`p-1.5 rounded-xl border transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center ${
          isOpen
            ? "border-border bg-muted text-foreground shadow-2xs"
            : "border-border/60 hover:border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground"
        }`}
        title="Opsi lainnya"
        aria-label={`Opsi untuk ${title}`}
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="size-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1.5 z-40 min-w-[208px] rounded-xl border border-border bg-popover text-popover-foreground p-1 shadow-lg animate-in fade-in zoom-in-95 duration-150 space-y-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Tambah / Hapus dari Dock */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isFav
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-foreground hover:bg-muted"
            }`}
            title={
              isFav
                ? "Hapus dari Dock"
                : "Tambah ke Dock (Maksimal 5)"
            }
          >
            <PanelBottom
              className={`size-3.5 shrink-0 transition-transform ${
                isFav ? "text-primary scale-105" : "text-muted-foreground"
              }`}
            />
            <span className="whitespace-nowrap">
              {isFav ? "Hapus dari Dock" : "Tambah ke Dock"}
            </span>
          </button>

          {/* 2. Pin Kartu di Bagian Atas Halaman */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              togglePin(cardId, effectivePageId);
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isCardPinned
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-foreground hover:bg-muted"
            }`}
            title={
              isCardPinned
                ? "Lepas pin kartu dari bagian atas halaman"
                : "Pin kartu di bagian atas halaman (urutan pertama, maks 5)"
            }
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <Pin
                className={`size-3.5 shrink-0 transition-transform ${
                  isCardPinned
                    ? "text-primary fill-primary rotate-45"
                    : "text-muted-foreground"
                }`}
              />
              <span className="whitespace-nowrap">
                {isCardPinned ? "Lepas Pin dari Atas" : "Pin Kartu di Atas"}
              </span>
            </span>
            {isCardPinned && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-semibold bg-primary text-primary-foreground">
                Pinned
              </span>
            )}
          </button>

          {/* 3. Ganti Warna Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
              setIsColorModalOpen(true);
            }}
            className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer group/color"
            title="Ganti warna dan gradien icon kartu ini"
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <Palette className="size-3.5 shrink-0 text-muted-foreground group-hover/color:text-primary transition-colors" />
              <span className="whitespace-nowrap">Ganti Warna Icon</span>
            </span>
            {hasCustomColor && (
              <span className="size-2 rounded-full bg-primary shrink-0" title="Warna telah dikustomisasi" />
            )}
          </button>

          {/* 3. Pindahkan Kotak ke Page Laman */}
          {moveData && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMoveModalOpen(true);
                }}
                className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer group/move"
                title="Pindahkan kotak menu ini ke page laman lain"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <MoveArrowsIcon className="size-3.5 shrink-0 text-muted-foreground group-hover/move:text-primary transition-colors" />
                  <span className="whitespace-nowrap">Pindahkan ke Laman</span>
                </span>
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/70 group-hover/move:translate-x-0.5 transition-transform" />
              </button>

              {isMovedFromOrigin && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    restoreCardToOrigin(moveData.cardKey, title);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
                  title={`Kembalikan ke ${originPageMeta?.label || "Page Asal"}`}
                >
                  <RotateCcw className="size-3.5 shrink-0" />
                  <span className="whitespace-nowrap truncate">
                    Kembalikan ke {originPageMeta?.shortLabel || "Page Asal"}
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Pop-up Pemilihan Page Tujuan: Floating card anchored langsung di depan menu kartu */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isMoveModalOpen && moveData && (
              <div
                className="fixed inset-0 z-[120] pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMoveModalOpen(false);
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Click-outside backdrop transparan tanpa menggelapkan layar */}
                <div className="absolute inset-0 bg-transparent" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="fixed z-10 w-[450px] max-w-[calc(100vw-24px)] rounded-3xl border border-border bg-popover text-popover-foreground shadow-2xl p-2.5 flex flex-col overflow-hidden"
                  style={{
                    top: popupPos?.top !== undefined ? `${popupPos.top}px` : undefined,
                    bottom: popupPos?.bottom !== undefined ? `${popupPos.bottom}px` : undefined,
                    right: popupPos ? `${popupPos.right}px` : "24px",
                    maxHeight: popupPos ? `${popupPos.maxHeight}px` : "360px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Daftar 13 Page Laman */}
                  <div className="p-1 overflow-y-auto space-y-1.5 flex-1">
                {filteredPages.map((page) => {
                  const isCurrent = page.id === currentPageId;

                  return (
                    <div
                      key={page.id}
                      className={`w-full rounded-2xl border transition-all flex items-center justify-between gap-2.5 py-2 px-3 ${
                        isCurrent
                          ? "border-primary/40 bg-primary/8"
                          : "border-border/60 bg-background/60 hover:border-primary/35 hover:bg-muted/50"
                      }`}
                    >
                      <button
                        type="button"
                        disabled={isCurrent}
                        onClick={() => handleSelectTargetPage(page.id, false)}
                        className={`flex items-center min-w-0 flex-1 text-left px-2 py-1 ${
                          isCurrent ? "cursor-default" : "cursor-pointer"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-foreground truncate">
                              {page.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-muted-foreground truncate">
                              {page.badge}
                            </span>
                          </div>
                        </div>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isCurrent ? (
                          <span
                            className="size-8.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs"
                            title="Laman saat ini (Aktif)"
                            aria-label="Laman saat ini (Aktif)"
                          >
                            <Check className="size-4 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSelectTargetPage(page.id, false);
                            }}
                            className="size-8.5 rounded-xl border border-border/80 bg-background/80 hover:bg-primary/10 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center justify-center shrink-0"
                            title={`Pindahkan ke ${page.label}`}
                            aria-label={`Pindahkan ke ${page.label}`}
                          >
                            <MoveArrowsIcon className="size-4.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredPages.length === 0 && (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    Tidak ada page laman ditemukan.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}

      {/* Pop-up Ganti Warna Icon Kartu: Floating card anchored langsung di depan menu kartu */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isColorModalOpen && (
              <div
                className="fixed inset-0 z-[130] pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColorModalOpen(false);
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Click-outside backdrop transparan tanpa menggelapkan layar */}
                <div className="absolute inset-0 bg-transparent" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="fixed z-10 w-[385px] max-w-[calc(100vw-24px)] rounded-3xl border border-border bg-popover text-popover-foreground shadow-2xl p-2.5 flex flex-col overflow-hidden"
                  style={{
                    top: popupPos?.top !== undefined ? `${popupPos.top}px` : undefined,
                    bottom: popupPos?.bottom !== undefined ? `${popupPos.bottom}px` : undefined,
                    right: popupPos ? `${popupPos.right}px` : "24px",
                    maxHeight: popupPos ? `${popupPos.maxHeight}px` : "420px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40 rounded-2xl">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Palette className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      Ganti Warna Icon
                    </h3>
                    <p className="text-[11px] text-muted-foreground truncate">
                      Kustomisasi icon kartu &ldquo;{title}&rdquo;
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsColorModalOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  title="Tutup"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Body Modal */}
              <div className="p-5 overflow-y-auto space-y-5 no-scrollbar">
                {/* 1. Preview Icon Kartu */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted/40 border border-border/60 gap-2.5">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
                      resolveIconBg(customColor, cardDefaultGradient).className
                    }`}
                    style={resolveIconBg(customColor, cardDefaultGradient).style}
                  >
                    {CardIcon ? (
                      <CardIcon className="h-8 w-8 drop-shadow-sm opacity-95" strokeWidth={1.75} />
                    ) : (
                      <Palette className="h-8 w-8 drop-shadow-sm opacity-95" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-foreground truncate max-w-[280px]">
                      {title}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {hasCustomColor ? (
                        <span className="text-primary font-medium inline-flex items-center gap-1">
                          <Check className="size-3" /> Warna Kustom Diterapkan
                        </span>
                      ) : (
                        "Warna Bawaan (Default Sistem)"
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Palet Gradien & Warna Pilihan */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">
                      Pilihan Gradien & Warna Cepat
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {CARD_COLOR_PRESETS.length} Pilihan
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {CARD_COLOR_PRESETS.map((preset) => {
                      const isSelected = customColor === preset.value;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setColor(preset.value);
                          }}
                          className={`relative flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer group ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-xs ring-2 ring-primary/30"
                              : "border-border/60 hover:border-border hover:bg-muted/50"
                          }`}
                          title={preset.name}
                        >
                          <div
                            className="size-8 rounded-full shadow-xs flex items-center justify-center text-white transition-transform group-hover:scale-105 shrink-0"
                            style={{ background: preset.previewBg }}
                          >
                            {isSelected && <Check className="size-4 stroke-[2.5] drop-shadow-sm" />}
                          </div>
                          <span className="text-[10px] text-center font-medium text-foreground mt-1.5 truncate max-w-full leading-tight">
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Pemilih Warna Kustom Sendiri (Color Picker & Hex) */}
                <div className="pt-2 border-t border-border">
                  <span className="text-xs font-semibold text-foreground block mb-2">
                    Warna Kustom Sendiri (Hex Picker)
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="color"
                        value={customHexInput.startsWith("#") ? customHexInput : "#6366f1"}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomHexInput(val);
                          setColor(val);
                        }}
                        className="size-9 rounded-lg border border-border cursor-pointer p-0.5 bg-card"
                        title="Klik untuk memilih warna"
                      />
                    </div>
                    <input
                      type="text"
                      value={customHexInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomHexInput(val);
                        if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
                          setColor(val);
                        }
                      }}
                      placeholder="#6366F1"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (/^#([0-9A-F]{3}){1,2}$/i.test(customHexInput)) {
                          setColor(customHexInput);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium cursor-pointer transition-colors"
                    >
                      Terapkan
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
                <button
                  type="button"
                  onClick={() => {
                    resetColor();
                  }}
                  disabled={!hasCustomColor}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    hasCustomColor
                      ? "text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 cursor-pointer"
                      : "text-muted-foreground/50 cursor-not-allowed"
                  }`}
                  title="Kembalikan ke warna bawaan sistem"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Reset ke Bawaan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsColorModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
