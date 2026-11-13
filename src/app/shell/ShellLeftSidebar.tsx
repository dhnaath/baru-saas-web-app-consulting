import React from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  MessagesSquare,
  Heart,
  Layers,
  Workflow,
  Eye,
  Lightbulb,
  Compass,
  Navigation,
  Menu,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";
import { WindowPositionLeftIcon } from "@/components/icons/WindowPositionIcons";
import { SidebarPillarsMenu } from "./SidebarPillarsMenu";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";

export interface ShellLeftSidebarProps {
  isLeftOpen: boolean;
  isLeftSidebar75: boolean;
  closeLeftSidebar: () => void;
  toggleLeftSidebar75: () => void;
  sidebarView: "navigation" | "menu";
  setSidebarView: (view: "navigation" | "menu") => void;
  hasAppSidebar: boolean;
  pathname: string;
  setIsLeftOpen: (open: boolean) => void;
  currentMode: string;
  blurConfig: { enabled: boolean; tint: boolean };
}

export function ShellLeftSidebar({
  isLeftOpen,
  isLeftSidebar75,
  closeLeftSidebar,
  toggleLeftSidebar75,
  sidebarView,
  setSidebarView,
  hasAppSidebar,
  pathname,
  setIsLeftOpen,
  currentMode,
  blurConfig,
}: ShellLeftSidebarProps) {
  return (
    <aside
      id="sidenavLeft"
      className={`fixed inset-y-0 left-0 z-50 flex ${
        isLeftSidebar75
          ? "w-[75px] bg-primary border-r border-white/20 shadow-xl"
          : "w-[400px] liquid-glass-sidebar-left"
      } max-w-[85vw] shrink-0 flex-col transition-all duration-300 ease-in-out ${
        isLeftOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Spacer atas: Tombol close / toggle kiri yang sejajar dengan header + 3 dots traffic controls & 3 dots action */}
      <div
        className={`w-full h-[60px] sidebar-top-glass shrink-0 flex items-center px-3 ${
          isLeftSidebar75
            ? "justify-center px-1 !border-b-0 !border-none !shadow-none"
            : "justify-between border-b border-white/20 dark:border-white/10"
        }`}
      >
        {!isLeftSidebar75 ? (
          <>
            <button
              type="button"
              className="size-9 rounded-full aspect-square text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              onClick={closeLeftSidebar}
              title="Sembunyikan Navigasi"
              aria-label="Tutup sidebar kiri"
            >
              <WindowPositionLeftIcon size={24} />
            </button>

            {/* 3 Dots: Klik langsung minimize / switch ke mode ringkas 75px */}
            <button
              type="button"
              onClick={toggleLeftSidebar75}
              className="size-9 rounded-full aspect-square text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              title="Mode Ringkas 75px (Minimize)"
              aria-label="Mode ringkas 75px"
            >
              <MoreVertical size={20} className="shrink-0" />
            </button>
          </>
        ) : (
          /* Mode Ringkas 75px: Hanya 3 Dots untuk mengembalikan ke 400px */
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={toggleLeftSidebar75}
              className="size-9 rounded-full aspect-square text-white/80 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              title="Perluas ke Lebar Penuh (400px)"
              aria-label="Perluas ke 400px"
            >
              <MoreHorizontal size={20} className="shrink-0" />
            </button>
          </div>
        )}
      </div>

      {/* View switcher: Ribbon Tab - hanya muncul di mode full view (tidak muncul saat minimize) */}
      {!isLeftSidebar75 && (
        <div className="sidebar-tab-switcher-bar flex items-end w-full h-10 bg-white/10 dark:bg-white/5 shrink-0 gap-0 relative z-20">
          {/* Bilah Tab 1: Navigation */}
          <button
            type="button"
            onClick={() => setSidebarView("navigation")}
            className={`relative flex-1 h-10 flex items-center justify-center gap-2 px-2 text-xs transition-all cursor-pointer rounded-tl-none rounded-tr-xl -mb-px ${
              sidebarView === "navigation"
                ? "sidebar-tab-active-glass !border-b-0"
                : "sidebar-tab-inactive-glass"
            }`}
            title="Navigation"
          >
            <Navigation className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Navigation</span>
          </button>

          {/* Bilah Tab 2: Menu */}
          <button
            type="button"
            onClick={() => setSidebarView("menu")}
            className={`relative flex-1 h-10 flex items-center justify-center gap-2 px-2 text-xs transition-all cursor-pointer rounded-tl-xl rounded-tr-none -mb-px ${
              sidebarView === "menu"
                ? "sidebar-tab-active-glass !border-b-0"
                : "sidebar-tab-inactive-glass"
            }`}
            title="Menu"
          >
            <Menu className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Menu</span>
            {hasAppSidebar && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white text-primary font-bold shrink-0 shadow-2xs">
                Fitur
              </span>
            )}
          </button>
        </div>
      )}

      <div
        className={`flex-1 min-h-0 overflow-y-auto no-scrollbar px-3 ${
          isLeftSidebar75 ? "pt-1 pb-4 !border-t-0 !border-none !shadow-none" : "pt-5 pb-4"
        } sidebar-menu-body-glass`}
      >
        {/* Slot untuk konten sidebar milik app (target portal ShellSidebar) */}
        <div
          id="shellSidebarSlot"
          className={hasAppSidebar ? "block mb-4" : "hidden"}
        />

        {sidebarView === "navigation" ? (
          <div className="flex flex-col gap-3">
            {!isLeftSidebar75 ? (
              <div className="flex flex-col gap-3">
                {/* 1. Self-Shaping */}
                <div className="rounded-xl border border-white/15 dark:border-white/10 bg-white/10 dark:bg-white/5 p-2 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 px-1 mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="size-3" /> 1. Self-Shaping (Fase Diri)
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { to: "/reliance", label: "Reliance", icon: ShieldCheck },
                      { to: "/sufficient", label: "Sufficient", icon: CheckCircle2 },
                      { to: "/improvement", label: "Improvement", icon: TrendingUp },
                      { to: "/development", label: "Development", icon: Sparkles },
                    ].map((item) => {
                      const isActive = pathname === item.to;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => {
                            if (window.innerWidth < 1024) setIsLeftOpen(false);
                          }}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] transition-all border ${
                            isActive
                              ? "bg-primary text-white font-semibold border-primary shadow-xs"
                              : "hover:bg-white/15 dark:hover:bg-white/10 border-transparent text-foreground"
                          }`}
                        >
                          <Icon className="size-3 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Mutual-Mapping */}
                <div className="rounded-xl border border-white/15 dark:border-white/10 bg-white/10 dark:bg-white/5 p-2 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 px-1 mb-0.5 flex items-center gap-1">
                    <Workflow className="size-3" /> 2. Mutual-Mapping (Fase Timbal Balik)
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { to: "/interact", label: "Interact", icon: MessagesSquare },
                      { to: "/interest", label: "Interest", icon: Heart },
                      { to: "/intersect", label: "Intersect", icon: Layers },
                      { to: "/interdependence", label: "Interdependence", icon: Workflow },
                    ].map((item) => {
                      const isActive = pathname === item.to;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => {
                            if (window.innerWidth < 1024) setIsLeftOpen(false);
                          }}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] transition-all border ${
                            isActive
                              ? "bg-primary text-white font-semibold border-primary shadow-xs"
                              : "hover:bg-white/15 dark:hover:bg-white/10 border-transparent text-foreground"
                          }`}
                        >
                          <Icon className="size-3 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Organization-Optimizing */}
                <div className="rounded-xl border border-white/15 dark:border-white/10 bg-white/10 dark:bg-white/5 p-2 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 px-1 mb-0.5 flex items-center gap-1">
                    <Eye className="size-3" /> 3. Organization-Optimizing (Fase Organisasi)
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { to: "/insider", label: "Insider", icon: Eye },
                      { to: "/insight", label: "Insight", icon: Lightbulb },
                      { to: "/outward", label: "Outward", icon: Compass },
                      { to: "/outlook", label: "Outlook", icon: TrendingUp },
                    ].map((item) => {
                      const isActive = pathname === item.to;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => {
                            if (window.innerWidth < 1024) setIsLeftOpen(false);
                          }}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] transition-all border ${
                            isActive
                              ? "bg-primary text-white font-semibold border-primary shadow-xs"
                              : "hover:bg-white/15 dark:hover:bg-white/10 border-transparent text-foreground"
                          }`}
                        >
                          <Icon className="size-3 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Mode Ringkas 75px: 12 ikon modul Phase */
              <div className="flex flex-col gap-1.5 items-center">
                {[
                  { to: "/reliance", label: "Reliance", icon: ShieldCheck },
                  { to: "/sufficient", label: "Sufficient", icon: CheckCircle2 },
                  { to: "/improvement", label: "Improvement", icon: TrendingUp },
                  { to: "/development", label: "Development", icon: Sparkles },
                  { to: "/interact", label: "Interact", icon: MessagesSquare },
                  { to: "/interest", label: "Interest", icon: Heart },
                  { to: "/intersect", label: "Intersect", icon: Layers },
                  { to: "/interdependence", label: "Interdependence", icon: Workflow },
                  { to: "/insider", label: "Insider", icon: Eye },
                  { to: "/insight", label: "Insight", icon: Lightbulb },
                  { to: "/outward", label: "Outward", icon: Compass },
                  { to: "/outlook", label: "Outlook", icon: TrendingUp },
                ].map((item) => {
                  const isActive = pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      title={item.label}
                      className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                        isActive
                          ? "bg-white text-primary border-white font-bold shadow-md ring-2 ring-white/40"
                          : "bg-white/10 hover:bg-white/20 border-white/20 text-white/90 hover:text-white"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <SidebarPillarsMenu
            isCompact={isLeftSidebar75}
            activeMode={currentMode}
            onNavigate={() => {
              if (!isLeftSidebar75 && typeof window !== "undefined" && window.innerWidth < 1024) {
                setIsLeftOpen(false);
              }
            }}
          />
        )}

        {blurConfig.enabled && !isLeftSidebar75 && (
          <div className="sticky bottom-0 inset-x-0 -mx-3 -mb-4 h-8 pointer-events-none z-20">
            <ProgressiveBlur
              direction="bottom"
              height={32}
              blurLevels={[0.5, 1, 2, 4, 8]}
              tint={blurConfig.tint ? "linear-gradient(to bottom, transparent 0%, hsl(var(--card) / 0.8) 100%)" : false}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
