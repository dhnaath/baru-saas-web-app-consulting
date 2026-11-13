import { AppDock } from "./shell/app-dock";
import { ShellSidebarProvider } from "./shell-sidebar";
import { ShellHeaderProvider } from "./shell-header";
import {
  ShellSectionsProvider,
  type ShellSection,
} from "./shell-sections";
import {
  WindowPositionLeftIcon,
  WindowPositionRightIcon,
} from "@/components/icons/WindowPositionIcons";
import { useState, useEffect, useMemo, useRef, useCallback, useLayoutEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  CheckCircle2,
  Settings,
  Star,
  Home,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { CommandPalette } from "@/app/CommandPalette";
import { QuickCaptureModal } from "@/app/QuickCaptureModal";
import { ShortcutModal } from "@/app/ShortcutModal";
import { TerminalModal } from "@/app/TerminalModal";
import { RecentModal } from "@/app/RecentModal";
import { TaskbarModal } from "@/app/TaskbarModal";
import { useRecentApps } from "@/hooks/useRecentApps";
import { recordActiveApp } from "@/utils/launcherCategoryMapper";
import { SettingsModal } from "./wira-settings";
import { TopPanelControlHub } from "./shell/TopPanelControlHub";
import { useMenuSettings } from "@/hooks/useMenuSettings";
import { useFavorites } from "@/hooks/useFavorites";
import { HeaderNavControls } from "./HeaderNavControls";
import { HeaderExtraControls } from "./HeaderExtraControls";
import { useCustomNav } from "@/hooks/useCustomNav";
import { navKonsultan, navAllSidebar, type NavItem, type NavGroup as NavGroupType } from "@/config/nav";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { useProgressiveBlurSetting } from "@/hooks/useProgressiveBlurSetting";
import { useDockStore } from "@/hooks/useDockState";
import { useLiquidGlassSetting } from "@/hooks/useLiquidGlassSetting";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getAppMetaByRoute } from "@/utils/appLookup";
import { getRaw, setRaw, removeRaw } from "../core/rawStorage";
import { 
  AppModeId, 
  ModeItem, 
  APP_MODES, 
  SUPER_CATEGORIES, 
  CATEGORY_META 
} from "./shell/appModesData";
import { ShellLeftSidebar } from "./shell/ShellLeftSidebar";
import { ShellRightDrawer } from "./shell/ShellRightDrawer";

// Re-export mode and category items for backward compatibility
export type { AppModeId, ModeItem };
export { APP_MODES, SUPER_CATEGORIES };

export function AppShell({
  title,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const location = useRouterState({ select: (s) => s.location });
  const pathname = location.pathname;
  const fullPath = pathname + (location.searchStr || "");
  const rawNav = navKonsultan;
  const { enabledMenus: _enabledMenus } = useMenuSettings();
  const { findItemById: _findItemById, findItemByPath: _findItemByPath } = useCustomNav();
  const { config: blurConfig, blurLevels } = useProgressiveBlurSetting();
  const isDockMinimized = useDockStore((s) => s.isMinimized);
  useLiquidGlassSetting();
  useThemeColor();

  // CONTEXT RESOLUTION — determine active nav category for header pill
  const contextMatch: { item: NavItem; group: NavGroupType } | null = (() => {
    const sidebarAll: { item: NavItem; group: NavGroupType }[] = [];
    navAllSidebar.forEach((g) => g.items.forEach((item) => sidebarAll.push({ item, group: g })));
    const sMatch = (
      sidebarAll.find((x) => x.item.to === fullPath) ||
      sidebarAll.find((x) => x.item.to === pathname) ||
      sidebarAll.find((x) => x.item.to !== "/" && x.item.to.split("?")[0] === pathname) ||
      sidebarAll.find((x) => {
        const base = x.item.to.split("?")[0];
        return base !== "/" && pathname.startsWith(base);
      }) ||
      null
    );
    if (sMatch) return sMatch;

    const all: { item: NavItem; group: NavGroupType }[] = [];
    rawNav.forEach((g) => g.items.forEach((item) => all.push({ item, group: g })));
    return (
      all.find((x) => x.item.to === fullPath) ||
      all.find((x) => x.item.to === pathname) ||
      all.find((x) => x.item.to !== "/" && x.item.to.split("?")[0] === pathname) ||
      all.find((x) => {
        const base = x.item.to.split("?")[0];
        return base !== "/" && pathname.startsWith(base);
      }) ||
      null
    );
  })();

  const contextCategory =
    pathname === "/" ? null : contextMatch?.group.title || contextMatch?.group.sectionCategory || contextMatch?.group.parentCategory || null;
  const ContextCategoryIcon = contextCategory
    ? CATEGORY_META[contextCategory]?.icon
    : null;

  const isHome = pathname === "/" || pathname === "/home";
  const [hasAppSidebar, setHasAppSidebar] = useState(false);
  const [sidebarView, setSidebarView] = useState<"navigation" | "menu">("navigation");
  useEffect(() => {
    setSidebarView("navigation");
    if (pathname && pathname !== "/" && pathname !== "/home") {
      recordActiveApp(pathname);
    }
  }, [pathname]);

  const [rightSidebarTab, setRightSidebarTab] = useState<"control" | "favorites">("control");

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isLeftSidebar75, setIsLeftSidebar75] = useState<boolean>(() => {
    try {
      const v = getRaw("aio_left_sidebar_75");
      if (v !== null) return v === "true";
      return getRaw("aio_left_sidebar_100") === "true";
    } catch {
      return false;
    }
  });

  // Listen to open-left-sidebar custom events
  useEffect(() => {
    const handleOpenLeft = (e: any) => {
      setIsLeftOpen(true);
      if (!isLeftSidebar75) {
        setIsRightOpen(false);
      }
      if (e?.detail?.tab) {
        setSidebarView(e.detail.tab);
      }
    };
    window.addEventListener("open-left-sidebar", handleOpenLeft);
    return () => window.removeEventListener("open-left-sidebar", handleOpenLeft);
  }, [isLeftSidebar75]);

  const shellSidebarCtx = useMemo(() => ({ setHasAppSidebar }), []);

  // Whether the currently-open app registered its own header via <ShellHeader>.
  const [hasAppHeader, setHasAppHeader] = useState(false);
  const shellHeaderCtx = useMemo(() => ({ setHasAppHeader }), []);

  // Sections published by the open app via useShellSections().
  const sectionsRef = useRef<ShellSection[]>([]);
  const [, setSectionsVersion] = useState(0);
  const bumpSections = useCallback(() => setSectionsVersion((v) => v + 1), []);
  const shellSectionsCtx = useMemo(
    () => ({ sectionsRef, bump: bumpSections }),
    [bumpSections],
  );

  // Measure the contextual header so scrollable content starts exactly below it.
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(60);
  const [isTopPanelOpen, setIsTopPanelOpen] = useState(false);
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let rafId: number | null = null;
    const update = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!headerRef.current) return;
        const h = headerRef.current.offsetHeight || 60;
        setHeaderHeight((prev) => (prev !== h ? h : prev));
      });
    };
    const initialH = el.offsetHeight || 60;
    setHeaderHeight((prev) => (prev !== initialH ? initialH : prev));

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(el);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, [hasAppHeader, pathname, isTopPanelOpen]);

  const [currentMode, setCurrentMode] = useState<AppModeId>(() => {
    try {
      const saved = getRaw("client_os_active_mode") || getRaw("aio_active_mode");
      if (saved && APP_MODES.some((m) => m.id === saved)) {
        return saved as AppModeId;
      }
    } catch {}
    return "financial";
  });

  useEffect(() => {
    const handleLauncherModeChanged = (e: any) => {
      const modeId = e.detail;
      if (modeId && APP_MODES.some((m) => m.id === modeId)) {
        setCurrentMode(modeId as AppModeId);
      }
    };
    window.addEventListener("aio_launcher_mode_changed", handleLauncherModeChanged);
    return () => window.removeEventListener("aio_launcher_mode_changed", handleLauncherModeChanged);
  }, []);

  // Sync active workspace mode with route opened
  useEffect(() => {
    if (!pathname || pathname === "/") return;
    if (pathname.includes("financial")) setCurrentMode("financial");
    else if (pathname.includes("business")) setCurrentMode("business");
    else if (pathname.includes("productivity") || pathname.includes("employment")) setCurrentMode("employment");
    else if (pathname.includes("creative")) setCurrentMode("creative");
    else if (pathname.includes("research")) setCurrentMode("research");
    else if (pathname.includes("sharia") || pathname.includes("syariah")) setCurrentMode("sharia");
    else if (pathname.includes("personal")) setCurrentMode("personal");
    else if (pathname.includes("family")) setCurrentMode("family");
    else if (pathname.includes("public")) setCurrentMode("public_affairs");
    else if (pathname.includes("network") || pathname.includes("social") || pathname.includes("contact")) setCurrentMode("networks");
  }, [pathname]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleLeftSidebar75 = () => {
    setIsLeftSidebar75((prev) => {
      const next = !prev;
      try {
        setRaw("aio_left_sidebar_75", String(next));
      } catch {}
      return next;
    });
  };

  const closeLeftSidebar = useCallback(() => {
    setIsLeftOpen(false);
    if (isLeftSidebar75) {
      setIsLeftSidebar75(false);
      try {
        setRaw("aio_left_sidebar_75", "false");
        removeRaw("aio_left_sidebar_100");
      } catch {}
    }
  }, [isLeftSidebar75]);

  const [activeSettingsTab, setActiveSettingsTab] = useState("general");
  const { favorites, toggleFavorite } = useFavorites();

  const favItems = favorites.map((route) => {
    const meta = getAppMetaByRoute(route);
    return {
      to: route,
      label: meta.label,
      icon: meta.icon as LucideIcon,
      color: meta.iconColor,
      gradient: meta.accentGradient,
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sidebarContainer = document.querySelector(
        "#sidenavLeft .overflow-y-auto",
      ) as HTMLElement | null;
      const activeElement = sidebarContainer?.querySelector(
        '[data-status="active"]',
      ) as HTMLElement | null;
      if (sidebarContainer && activeElement) {
        const containerRect = sidebarContainer.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        const scrollTop =
          sidebarContainer.scrollTop +
          (activeRect.top - containerRect.top) -
          containerRect.height / 2 +
          activeRect.height / 2;
        sidebarContainer.scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  const { addRecentApp } = useRecentApps();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [_isExpandOpen, setIsExpandOpen] = useState(false);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-record visited navigation into Recent
  useEffect(() => {
    if (!pathname) return;
    const allNavFlat = navKonsultan.flatMap((g) => g.items);
    const match = allNavFlat.find(
      (i) => i.to === pathname || i.to.split("?")[0] === pathname
    );
    if (match) {
      addRecentApp({ to: match.to, label: match.label });
    } else if (pathname === "/") {
      addRecentApp({ to: "/", label: "Launcher Modul", category: "Navigasi" });
    } else if (pathname === "/home") {
      addRecentApp({ to: "/home", label: "Beranda Eksekutif", category: "Navigasi" });
    }
  }, [pathname, addRecentApp]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K, +, Esc) & custom dock events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isInput = tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (!isInput && e.key === "+") {
        e.preventDefault();
        setIsQuickCaptureOpen(true);
        setIsShortcutOpen(false);
        setIsTerminalOpen(false);
        setIsExpandOpen(false);
        setIsRecentOpen(false);
        setIsTaskbarOpen(false);
      } else if (e.key === "Escape") {
        setIsQuickCaptureOpen(false);
        setIsShortcutOpen(false);
        setIsTerminalOpen(false);
        setIsExpandOpen(false);
        setIsRecentOpen(false);
        setIsTaskbarOpen(false);
      }
    };

    const handleOpenQuickCapture = () => {
      setIsQuickCaptureOpen(true);
      setIsShortcutOpen(false);
      setIsTerminalOpen(false);
      setIsExpandOpen(false);
      setIsRecentOpen(false);
      setIsTaskbarOpen(false);
    };

    const handleOpenShortcut = () => {
      setIsShortcutOpen(true);
      setIsQuickCaptureOpen(false);
      setIsTerminalOpen(false);
      setIsExpandOpen(false);
      setIsRecentOpen(false);
      setIsTaskbarOpen(false);
    };

    const handleOpenTerminal = () => {
      setIsTerminalOpen(true);
      setIsQuickCaptureOpen(false);
      setIsShortcutOpen(false);
      setIsExpandOpen(false);
      setIsRecentOpen(false);
      setIsTaskbarOpen(false);
    };

    const handleOpenExpand = () => {
      setIsExpandOpen(true);
      setIsQuickCaptureOpen(false);
      setIsShortcutOpen(false);
      setIsTerminalOpen(false);
      setIsRecentOpen(false);
      setIsTaskbarOpen(false);
    };

    const handleOpenRecent = () => {
      setIsRecentOpen((prev) => !prev);
      setIsTaskbarOpen(false);
      setIsQuickCaptureOpen(false);
      setIsShortcutOpen(false);
      setIsTerminalOpen(false);
      setIsExpandOpen(false);
    };

    const handleOpenTaskbar = () => {
      setIsTaskbarOpen((prev) => !prev);
      setIsRecentOpen(false);
      setIsQuickCaptureOpen(false);
      setIsShortcutOpen(false);
      setIsTerminalOpen(false);
      setIsExpandOpen(false);
    };

    const handleOpenSearch = () => {
      setIsCommandPaletteOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("aio_open_quick_capture", handleOpenQuickCapture);
    window.addEventListener("aio_open_shortcut", handleOpenShortcut);
    window.addEventListener("aio_open_terminal", handleOpenTerminal);
    window.addEventListener("aio_open_expand", handleOpenExpand);
    window.addEventListener("aio_open_recent", handleOpenRecent);
    window.addEventListener("aio_open_taskbar", handleOpenTaskbar);
    window.addEventListener("aio_open_search", handleOpenSearch);

    const handleToast = (e: any) => {
      if (e?.detail) {
        setToastMessage(e.detail);
        setTimeout(() => setToastMessage(null), 3200);
      }
    };
    window.addEventListener("aio_toast", handleToast);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("aio_open_quick_capture", handleOpenQuickCapture);
      window.removeEventListener("aio_open_shortcut", handleOpenShortcut);
      window.removeEventListener("aio_open_terminal", handleOpenTerminal);
      window.removeEventListener("aio_open_expand", handleOpenExpand);
      window.removeEventListener("aio_open_recent", handleOpenRecent);
      window.removeEventListener("aio_open_taskbar", handleOpenTaskbar);
      window.removeEventListener("aio_open_search", handleOpenSearch);
      window.removeEventListener("aio_toast", handleToast);
    };
  }, []);

  const handleOpenSettings = (tab = "general") => {
    setActiveSettingsTab(tab);
    setIsSettingsOpen(true);
  };

  return (
    <ShellSidebarProvider value={shellSidebarCtx}>
    <ShellHeaderProvider value={shellHeaderCtx}>
    <ShellSectionsProvider value={shellSectionsCtx}>
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab={activeSettingsTab}
      />

      {/* Sidenav Kiri */}
      <ShellLeftSidebar
        isLeftOpen={isLeftOpen}
        isLeftSidebar75={isLeftSidebar75}
        closeLeftSidebar={closeLeftSidebar}
        toggleLeftSidebar75={toggleLeftSidebar75}
        sidebarView={sidebarView}
        setSidebarView={setSidebarView}
        hasAppSidebar={hasAppSidebar}
        pathname={pathname}
        setIsLeftOpen={setIsLeftOpen}
        currentMode={currentMode}
        blurConfig={blurConfig}
      />

      {/* Sidenav Kanan (Control Center) */}
      <ShellRightDrawer
        isRightOpen={isRightOpen}
        setIsRightOpen={setIsRightOpen}
        rightSidebarTab={rightSidebarTab}
        setRightSidebarTab={setRightSidebarTab}
        favorites={favorites}
        favItems={favItems}
        pathname={pathname}
        fullPath={fullPath}
        toggleFavorite={toggleFavorite}
        blurConfig={blurConfig}
      />

      <main
        id="mainContent"
        className={`relative flex flex-1 flex-col overflow-hidden transition-[margin,width] duration-300 ease-in-out ${
          isLeftOpen && isLeftSidebar75
            ? "ml-[75px] w-[calc(100%-75px)]"
            : "ml-0 w-full"
        }`}
      >
        {(isTopPanelOpen || isRightOpen || (isLeftOpen && !isLeftSidebar75)) && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs cursor-default transition-opacity"
            onClick={() => {
              setIsTopPanelOpen(false);
              setIsRightOpen(false);
              if (!isLeftSidebar75) {
                setIsLeftOpen(false);
              }
            }}
          />
        )}
        <header ref={headerRef as any} className={`absolute top-0 inset-x-0 ${isTopPanelOpen ? "z-50" : "z-20"} pointer-events-none transition-all duration-300`}>
          {/* Panel Bar Atas (Gear Setting): Full Panel Atas Kotak Full */}
          {isTopPanelOpen && (
            <div className="pointer-events-auto w-full">
              <div
                id="top-panel-container"
                className="w-full flex flex-col bg-primary border-b border-white/20 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              >
                {/* Top Bar Header Panel Atas */}
                <div className="w-full h-[60px] sidebar-top-glass shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-white/20 dark:border-white/10 text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-xl bg-white/15 text-white flex items-center justify-center shadow-xs">
                      <Settings size={18} className="shrink-0" />
                    </div>
                    <span className="font-bold text-sm tracking-wide text-white">
                      Panel Pengaturan & Preferensi Sistem
                    </span>
                  </div>
                  <button
                    type="button"
                    className="size-9 rounded-full aspect-square text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
                    onClick={() => setIsTopPanelOpen(false)}
                    title="Tutup Panel Pengaturan Atas"
                    aria-label="Tutup panel atas"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Konten TopPanelControlHub */}
                <div className="max-h-[80vh] overflow-y-auto no-scrollbar scrollbar-none">
                  <TopPanelControlHub
                    onClose={() => setIsTopPanelOpen(false)}
                    onOpenSettings={handleOpenSettings}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-5 pointer-events-none">
            {/* Bagian Kiri Header: 2 Floating Pills */}
            <div className="flex items-center gap-2">
              {/* Pill 1: Nav Toggle (Sidebar Kiri) & Home */}
              <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full liquid-glass-header-pill">
                <button
                  type="button"
                  className={`group relative z-10 size-9 rounded-full aspect-square shrink-0 transition-colors flex items-center justify-center cursor-pointer ${
                    isLeftOpen
                      ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => {
                    if (isLeftOpen) {
                      setIsLeftOpen(false);
                    } else {
                      setIsLeftOpen(true);
                      if (!isLeftSidebar75) {
                        setIsRightOpen(false);
                      }
                    }
                  }}
                  title={isLeftOpen ? "Sembunyikan Navigasi" : "Tampilkan Navigasi"}
                  aria-label="Toggle sidebar kiri"
                >
                  <WindowPositionLeftIcon
                    size={24}
                    data-anim={isLeftOpen ? "true" : undefined}
                    className="header-anim-panel-left transition-transform duration-300"
                  />
                </button>

                <Link
                  to="/"
                  className="group relative z-10 size-9 rounded-full aspect-square shrink-0 transition-colors flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent"
                  title="Beranda (Home)"
                  aria-label="Beranda"
                >
                  <Home size={20} className="shrink-0 header-anim-home transition-transform duration-200" />
                </Link>
              </div>

              {/* Pill 2: Panah Kiri, Refresh & Panah Kanan */}
              <div className="pointer-events-auto flex items-center p-1 rounded-full liquid-glass-header-pill">
                <HeaderNavControls />
              </div>
            </div>

            {/* Bagian Kanan Header: 3 Floating Pills */}
            <div className="flex items-center gap-2 min-w-0">
              {/* Pill Shape Wadah Utama tempat elemen aksi, modul, & portal disiapkan */}
              <div
                className={`pointer-events-auto h-[46px] min-h-[46px] w-auto max-w-[calc(100vw-130px)] md:max-w-none rounded-full shrink-0 transition-all duration-300 ease-out flex items-center justify-end ${
                  hasAppHeader
                    ? "p-0 bg-transparent border-transparent shadow-none overflow-visible"
                    : "liquid-glass-header-pill bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs p-1 gap-1.5 overflow-visible"
                }`}
              >
                {!actions && !hasAppHeader && !isHome && (
                  <div className="relative z-10 flex items-center gap-1.5 px-3 text-xs font-medium text-foreground truncate max-w-[200px] sm:max-w-[280px] shrink-0">
                    {ContextCategoryIcon && <ContextCategoryIcon size={14} className="shrink-0 text-primary" />}
                    <span className="truncate font-semibold">{title || contextMatch?.item.label || "Modul Aktif"}</span>
                  </div>
                )}
                {actions && (
                  <div className="relative z-10 flex items-center gap-1.5 shrink-0">
                    {actions}
                  </div>
                )}
                <div
                  id="app-header-actions-portal"
                  className="relative z-10 flex items-center justify-end gap-1.5 min-w-0 empty:hidden w-auto shrink-0 overflow-visible no-scrollbar h-full py-0"
                />
              </div>

              {/* Pill 2: Info, Sortir & Gear Setting (di sebelah kiri Bintang) */}
              <div className="pointer-events-auto flex items-center p-1 rounded-full liquid-glass-header-pill shrink-0">
                <HeaderExtraControls
                  isTopPanelOpen={isTopPanelOpen}
                  onToggleTopPanel={() => setIsTopPanelOpen((prev) => !prev)}
                  onOpenInfo={() => setIsShortcutOpen(true)}
                />
              </div>

              {/* Pill 3: Bintang (Placeholder) & Sidebar Kanan (Control Center) */}
              <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full liquid-glass-header-pill shrink-0">
                <button
                  type="button"
                  className="group relative z-10 size-9 rounded-full aspect-square shrink-0 transition-colors flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent"
                  title="Bintang"
                  aria-label="Bintang"
                >
                  <Star
                    size={20}
                    className="shrink-0 header-anim-star transition-transform duration-200"
                  />
                </button>

                <button
                  type="button"
                  className={`group relative z-10 size-9 rounded-full aspect-square shrink-0 transition-colors flex items-center justify-center cursor-pointer ${
                    isRightOpen
                      ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => {
                    if (isRightOpen) {
                      setIsRightOpen(false);
                    } else {
                      setIsRightOpen(true);
                      if (!isLeftSidebar75) {
                        setIsLeftOpen(false);
                      }
                    }
                  }}
                  title={isRightOpen ? "Sembunyikan Control Center" : "Tampilkan Control Center (Sidebar Kanan)"}
                  aria-label="Toggle sidebar kanan"
                >
                  <WindowPositionRightIcon
                    size={24}
                    data-anim={isRightOpen ? "true" : undefined}
                    className="header-anim-panel-right transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Progressive Blur (Top & Bottom Viewport Transitions) */}
        {blurConfig.enabled && (
          <>
            <ProgressiveBlur
              direction="top"
              height={96}
              blurLevels={blurLevels}
              tint={blurConfig.tint ? `linear-gradient(to top, transparent 0%, hsl(var(--background) / 0.82) 100%)` : false}
              className="fixed top-0 right-0 z-15 pointer-events-none transition-[left] duration-300 ease-in-out"
              style={{
                left: isLeftOpen && isLeftSidebar75 ? "75px" : "0px",
              }}
            />

            <ProgressiveBlur
              direction="bottom"
              height={isDockMinimized ? 56 : 116}
              blurLevels={blurLevels}
              tint={blurConfig.tint ? `linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.88) 100%)` : false}
              className="fixed bottom-0 right-0 z-15 pointer-events-none transition-[left,height] duration-300 ease-in-out"
              style={{
                left: isLeftOpen && isLeftSidebar75 ? "75px" : "0px",
              }}
            />
          </>
        )}

        <div
          className={`flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar relative ${
            pathname === "/" ? "px-4 pb-[68px] sm:px-6 sm:pb-[68px]" : "px-3 sm:px-6 pb-[80px]"
          }`}
          style={{ paddingTop: headerHeight }}
        >
          {children}
        </div>
        <AppDock
          sidebarShift={isLeftOpen && isLeftSidebar75}
          onSearch={() => setIsCommandPaletteOpen(true)}
          onQuickCapture={() => {
            setIsQuickCaptureOpen((prev) => !prev);
            setIsShortcutOpen(false);
            setIsTerminalOpen(false);
            setIsExpandOpen(false);
            setIsRecentOpen(false);
            setIsTaskbarOpen(false);
          }}
          onShortcut={() => {
            setIsShortcutOpen((prev) => !prev);
            setIsQuickCaptureOpen(false);
            setIsTerminalOpen(false);
            setIsExpandOpen(false);
            setIsRecentOpen(false);
            setIsTaskbarOpen(false);
          }}
          onTerminal={() => {
            setIsTerminalOpen((prev) => !prev);
            setIsQuickCaptureOpen(false);
            setIsShortcutOpen(false);
            setIsExpandOpen(false);
            setIsRecentOpen(false);
            setIsTaskbarOpen(false);
          }}
          onExpand={() => {
            setIsExpandOpen(true);
            setIsQuickCaptureOpen(false);
            setIsShortcutOpen(false);
            setIsTerminalOpen(false);
            setIsRecentOpen(false);
            setIsTaskbarOpen(false);
          }}
          onRecent={() => {
            setIsRecentOpen((prev) => !prev);
            setIsTaskbarOpen(false);
            setIsQuickCaptureOpen(false);
            setIsShortcutOpen(false);
            setIsTerminalOpen(false);
            setIsExpandOpen(false);
          }}
          onTaskbar={() => {
            setIsTaskbarOpen((prev) => !prev);
            setIsRecentOpen(false);
            setIsQuickCaptureOpen(false);
            setIsShortcutOpen(false);
            setIsTerminalOpen(false);
            setIsExpandOpen(false);
          }}
          isQuickCaptureOpen={isQuickCaptureOpen}
          isShortcutOpen={isShortcutOpen}
          isTerminalOpen={isTerminalOpen}
          isExpandOpen={_isExpandOpen}
          isRecentOpen={isRecentOpen}
          isTaskbarOpen={isTaskbarOpen}
        />

        {/* Global Modals */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
        <QuickCaptureModal
          isOpen={isQuickCaptureOpen}
          onClose={() => setIsQuickCaptureOpen(false)}
          onSuccess={(msg) => {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(null), 3000);
          }}
        />
        <ShortcutModal
          isOpen={isShortcutOpen}
          onClose={() => setIsShortcutOpen(false)}
          onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
        />
        <TerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />
        <RecentModal
          isOpen={isRecentOpen}
          onClose={() => setIsRecentOpen(false)}
        />
        <TaskbarModal
          isOpen={isTaskbarOpen}
          onClose={() => setIsTaskbarOpen(false)}
        />

        {/* Notification Toast */}
        {toastMessage && (
          <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 bg-foreground text-background text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
    </ShellSectionsProvider>
    </ShellHeaderProvider>
    </ShellSidebarProvider>
  );
}
