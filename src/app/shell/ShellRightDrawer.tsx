import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Settings,
  Star,
  Wallet,
  Pocket,
  ShoppingBag,
  Vault,
  Luggage,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { WindowPositionRightIcon } from "@/components/icons/WindowPositionIcons";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";

export interface FavItem {
  to: string;
  label: string;
  icon?: LucideIcon;
  color?: string;
}

export interface ShellRightDrawerProps {
  isRightOpen: boolean;
  setIsRightOpen: (open: boolean) => void;
  rightSidebarTab: "control" | "favorites";
  setRightSidebarTab: (tab: "control" | "favorites") => void;
  favorites: string[];
  favItems: FavItem[];
  pathname: string;
  fullPath: string;
  toggleFavorite: (route: string) => void;
  blurConfig: { enabled: boolean; tint: boolean };
}

const CONTROL_APPS = [
  {
    to: "/wallet",
    title: "Wallet",
    subtitle: "Dompet kas, komparasi harga & nota belanja",
    badge: "Dompet",
    icon: Wallet,
    accentColor: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  },
  {
    to: "/pocket",
    title: "Pocket",
    subtitle: "Kartu akses, voucher, tiket & slip saku",
    badge: "Saku",
    icon: Pocket,
    accentColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    to: "/pouch",
    title: "Pouch",
    subtitle: "Organizer dokumen esensial & kit bepergian",
    badge: "Travel",
    icon: ShoppingBag,
    accentColor: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
  },
  {
    to: "/vault",
    title: "Vault",
    subtitle: "Brankas digital & identitas resmi terenkripsi",
    badge: "Kredensial",
    icon: Vault,
    accentColor: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
  },
  {
    to: "/trunk",
    title: "Trunk",
    subtitle: "Gudang perkakas & inventaris rumah tangga",
    badge: "Gudang",
    icon: Luggage,
    accentColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
];

export function ShellRightDrawer({
  isRightOpen,
  setIsRightOpen,
  rightSidebarTab,
  setRightSidebarTab,
  favorites,
  favItems,
  pathname,
  fullPath,
  toggleFavorite,
  blurConfig,
}: ShellRightDrawerProps) {
  return (
    <aside
      id="sidenavRight"
      className={`fixed inset-y-0 right-0 z-50 flex w-[400px] max-w-[85vw] flex-col liquid-glass-sidebar-right transition-transform duration-300 ease-in-out ${
        isRightOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Right Sidebar Spacer: Tombol close / toggle kanan yang sejajar dengan header */}
      <div className="w-full h-[60px] sidebar-top-glass shrink-0 flex items-center justify-end px-3 border-b border-white/20 dark:border-white/10">
        <button
          type="button"
          className="size-9 rounded-full aspect-square text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
          onClick={() => setIsRightOpen(false)}
          title="Sembunyikan Control Center"
          aria-label="Tutup sidebar kanan"
        >
          <WindowPositionRightIcon size={24} />
        </button>
      </div>

      {/* Right Sidebar Tab Switcher: Ribbon Tab diturunkan sejajar di bawah garis header */}
      <div className="sidebar-tab-switcher-bar flex items-end w-full h-10 bg-white/10 dark:bg-white/5 shrink-0 gap-0 relative z-20">
        <button
          type="button"
          onClick={() => setRightSidebarTab("control")}
          className={`relative flex-1 h-10 flex items-center justify-center gap-2 px-3 text-xs transition-all cursor-pointer rounded-tl-none rounded-tr-xl -mb-px ${
            rightSidebarTab === "control"
              ? "sidebar-tab-active-glass !border-b-0"
              : "sidebar-tab-inactive-glass"
          }`}
        >
          <Settings className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Control</span>
        </button>
        <button
          type="button"
          onClick={() => setRightSidebarTab("favorites")}
          className={`relative flex-1 h-10 flex items-center justify-center gap-2 px-3 text-xs transition-all cursor-pointer rounded-tl-xl rounded-tr-none -mb-px ${
            rightSidebarTab === "favorites"
              ? "sidebar-tab-active-glass !border-b-0"
              : "sidebar-tab-inactive-glass"
          }`}
        >
          <Star
            className={`h-3.5 w-3.5 shrink-0 ${
              rightSidebarTab === "favorites" ? "text-amber-500 fill-amber-500" : "text-white/80"
            }`}
          />
          <span className="truncate">Favorit</span>
          {favorites.length > 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-none shrink-0 ${
                rightSidebarTab === "favorites"
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 py-4 sm:px-5 sidebar-menu-body-glass">
        {rightSidebarTab === "favorites" ? (
          favItems.length > 0 ? (
            <div className="flex flex-col gap-1.5 w-full">
              {favItems.map((item) => {
                const FavIcon = item.icon || Star;
                const isActive = pathname === item.to || fullPath === item.to;
                const toPath = item.to.split("?")[0];
                const toSearch = item.to.includes("?")
                  ? Object.fromEntries(new URLSearchParams(item.to.split("?")[1]))
                  : undefined;
                return (
                  <div
                    key={item.to}
                    className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all border backdrop-blur-md ${
                      isActive
                        ? "bg-white/25 dark:bg-white/10 border-primary/40 text-primary shadow-2xs font-semibold"
                        : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10"
                    }`}
                  >
                    <Link
                      to={toPath as any}
                      search={toSearch as any}
                      onClick={() => setIsRightOpen(false)}
                      className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                    >
                      <div
                        className={`grid h-7 w-7 place-items-center rounded-lg shrink-0 ${
                          isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-white/15 dark:bg-white/10 text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        <FavIcon className={`h-4 w-4 ${!isActive && item.color ? item.color : ""}`} />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item.to)}
                      className="p-1 rounded-lg text-amber-500 hover:bg-amber-500/15 transition-colors cursor-pointer shrink-0"
                      title="Hapus dari Favorit"
                    >
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null
        ) : (
          <nav className="flex flex-col gap-2.5 items-start w-full">
            <div className="grid grid-cols-1 gap-2 w-full">
              {CONTROL_APPS.map((item) => {
                const ItemIcon = item.icon;
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to as any}
                    onClick={() => setIsRightOpen(false)}
                    className={`group flex items-center justify-between rounded-xl p-2.5 transition-all border backdrop-blur-md cursor-pointer ${
                      isActive
                        ? "bg-white/25 dark:bg-white/10 border-primary/40 text-primary shadow-xs font-semibold ring-1 ring-primary/30"
                        : "bg-white/10 dark:bg-white/5 border-white/15 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-lg shrink-0 border ${item.accentColor} transition-transform group-hover:scale-105`}
                      >
                        <ItemIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs truncate text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-muted/70 text-muted-foreground">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {blurConfig.enabled && (
          <div className="sticky bottom-0 inset-x-0 -mx-4 -mb-4 sm:-mx-5 sm:-mb-4 h-8 pointer-events-none z-20">
            <ProgressiveBlur
              direction="bottom"
              height={32}
              blurLevels={[0.5, 1, 2, 4, 8]}
              tint={
                blurConfig.tint
                  ? "linear-gradient(to bottom, transparent 0%, hsl(var(--card) / 0.8) 100%)"
                  : false
              }
            />
          </div>
        )}
      </div>
    </aside>
  );
}
