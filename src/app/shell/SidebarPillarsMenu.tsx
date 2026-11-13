import React, { useState, useMemo, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronRight,
  Search,
  X,
  MoreHorizontal,
  CheckCircle2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { getRaw, setRaw } from "@/core/rawStorage";
import { getLastLauncherPage } from "@/utils/launcherCategoryMapper";
import {
  WORKSPACE_PAGES,
  type WorkspacePageDef,
  type WorkspaceModuleItem,
  type WorkspaceFeatureItem,
} from "@/config/workspacePages";

export {
  WORKSPACE_PAGES,
  type WorkspacePageDef,
  type WorkspaceModuleItem,
  type WorkspaceFeatureItem,
};

interface SidebarPillarsMenuProps {
  isCompact?: boolean;
  onNavigate?: () => void;
  activeMode?: string;
}

const WORKSPACE_THEMES: Record<
  string,
  { bg: string; text: string; border: string; glow: string; badge: string }
> = {
  financial: {
    bg: "bg-emerald-500/15 dark:bg-emerald-500/25",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    glow: "hover:border-emerald-500/50",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  mode_business: {
    bg: "bg-amber-500/15 dark:bg-amber-500/25",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
    glow: "hover:border-amber-500/50",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  mode_employment: {
    bg: "bg-blue-500/15 dark:bg-blue-500/25",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    glow: "hover:border-blue-500/50",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  mode_creative: {
    bg: "bg-pink-500/15 dark:bg-pink-500/25",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500/30",
    glow: "hover:border-pink-500/50",
    badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  },
  mode_research: {
    bg: "bg-indigo-500/15 dark:bg-indigo-500/25",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/30",
    glow: "hover:border-indigo-500/50",
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  mode_sharia: {
    bg: "bg-teal-500/15 dark:bg-teal-500/25",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-500/30",
    glow: "hover:border-teal-500/50",
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  },
  mode_personal: {
    bg: "bg-rose-500/15 dark:bg-rose-500/25",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/30",
    glow: "hover:border-rose-500/50",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  mode_family: {
    bg: "bg-sky-500/15 dark:bg-sky-500/25",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-500/30",
    glow: "hover:border-sky-500/50",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  mode_public_affairs: {
    bg: "bg-purple-500/15 dark:bg-purple-500/25",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
    glow: "hover:border-purple-500/50",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  mode_networks: {
    bg: "bg-violet-500/15 dark:bg-violet-500/25",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/30",
    glow: "hover:border-violet-500/50",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  mode_phase_side: {
    bg: "bg-indigo-500/15 dark:bg-indigo-500/25",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/30",
    glow: "hover:border-indigo-500/50",
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
};

export function getModuleCategory(mod: WorkspaceModuleItem, wsId?: string): string {
  if (mod.categoryLabel) return mod.categoryLabel;

  // mode_networks: "Direktori (2) | Relasi (2) | Jaringan (2)"
  if (wsId === "mode_networks" || mod.id.startsWith("net-")) {
    if (mod.id === "net-people" || mod.id === "net-vault") return "Direktori";
    if (mod.id === "net-relations" || mod.id === "net-groups") return "Relasi";
    if (mod.id === "net-mentorship" || mod.id === "net-gifts") return "Jaringan";
  }

  // mode_business: "Operations", "Customers", "Administration", "Strategy", "Organization"
  if (wsId === "mode_business" || mod.id.startsWith("biz-")) {
    if (["biz-procurement", "biz-inventory", "biz-quality"].includes(mod.id)) return "Operations";
    if (["biz-client", "biz-customer", "biz-service"].includes(mod.id)) return "Customers";
    if (["biz-expenses", "biz-documents", "biz-analytics"].includes(mod.id)) return "Administration";
    if (["biz-performance", "biz-framework"].includes(mod.id)) return "Strategy";
    if (["biz-workforce", "biz-governance"].includes(mod.id)) return "Organization";
  }

  // mode_employment: "Planning", "Workflow", "Resources", "Coordination", "Governance", "Ownership"
  if (wsId === "mode_employment" || mod.id.startsWith("emp-")) {
    if (mod.id === "emp-milestones") return "Planning";
    if (["emp-workflows", "emp-projects"].includes(mod.id)) return "Workflow";
    if (["emp-vendors", "emp-procurement"].includes(mod.id)) return "Resources";
    if (mod.id === "emp-meetings") return "Coordination";
    if (["emp-incidents", "emp-compliance"].includes(mod.id)) return "Governance";
    if (mod.id === "emp-captable") return "Ownership";
  }

  // mode_creative: "Design", "Publishing", "Production", "Interactive"
  if (wsId === "mode_creative" || mod.id.startsWith("cr-")) {
    if (["cr-design"].includes(mod.id)) return "Design";
    if (["cr-writing"].includes(mod.id)) return "Publishing";
    if (["cr-movies", "cr-podcasts", "cr-photo"].includes(mod.id)) return "Production";
    if (["cr-games"].includes(mod.id)) return "Interactive";
  }

  // mode_research: "Frameworks", "Reference", "Research"
  if (wsId === "mode_research" || mod.id.startsWith("res-")) {
    if (["res-frameworks", "res-valuation"].includes(mod.id)) return "Frameworks";
    if (["res-kurasi", "res-wiki"].includes(mod.id)) return "Reference";
    if (["res-manager", "res-courses"].includes(mod.id)) return "Research";
  }

  // mode_sharia: "Sosial", "Komersial", "Proteksi", "Simpanan", "Zakat", "Investasi", "Kepatuhan"
  if (wsId === "mode_sharia" || mod.id.startsWith("sh-") || mod.id.startsWith("sha-")) {
    if (["sh-tabarru", "sh-qardh", "sh-wakaf"].includes(mod.id)) return "Sosial";
    if (["sh-mudharabah", "sh-musyarakah", "sh-murabahah", "sh-ijarah"].includes(mod.id)) return "Komersial";
    if (["sh-takaful"].includes(mod.id)) return "Proteksi";
    if (["sh-wadiah"].includes(mod.id)) return "Simpanan";
    if (["sh-zakat-maal", "sh-zakat-profesi"].includes(mod.id)) return "Zakat";
    if (["sh-saham"].includes(mod.id)) return "Investasi";
    if (["sh-audit-riba"].includes(mod.id)) return "Kepatuhan";
  }

  // mode_personal: "Pengembangan", "Refleksi", "Kesehatan", "Utilitas"
  if (wsId === "mode_personal" || mod.id.startsWith("per-")) {
    if (["per-habits"].includes(mod.id)) return "Pengembangan";
    if (["per-journal"].includes(mod.id)) return "Refleksi";
    if (["per-health-fit", "per-health-rec", "per-health", "per-fitness"].includes(mod.id)) return "Kesehatan";
    if (["per-tools", "per-utilities"].includes(mod.id)) return "Utilitas";
  }

  // mode_family: "Keluarga", "Rumah Tangga", "Kendaraan"
  if (wsId === "mode_family" || mod.id.startsWith("fam-")) {
    if (["fam-tree", "fam-safety", "fam-vault"].includes(mod.id)) return "Keluarga";
    if (["fam-budget", "fam-chores", "fam-pantry", "fam-home"].includes(mod.id)) return "Rumah Tangga";
    if (["fam-vehicles"].includes(mod.id)) return "Kendaraan";
  }

  // mode_public_affairs: "Community", "Public Services", "Policy", "Media"
  if (wsId === "mode_public_affairs" || mod.id.startsWith("pub-")) {
    if (["pub-community", "pub-calendar"].includes(mod.id)) return "Community";
    if (["pub-services"].includes(mod.id)) return "Public Services";
    if (["pub-advocacy", "pub-philanthropy"].includes(mod.id)) return "Policy";
    if (["pub-media"].includes(mod.id)) return "Media";
  }

  return "Modul";
}

function findWorkspaceForRoute(pathname: string): WorkspacePageDef | undefined {
  if (!pathname || pathname === "/") return undefined;

  // 1. Direct path & feature match
  for (const page of WORKSPACE_PAGES) {
    for (const mod of page.modules) {
      const modPath = mod.to.split("?")[0];
      if (modPath === pathname) return page;
      if (mod.features) {
        for (const feat of mod.features) {
          const featPath = feat.to.split("?")[0];
          if (featPath === pathname) return page;
        }
      }
    }
  }

  // 2. Route segment keyword fallback
  const p = pathname.toLowerCase();
  if (
    p.includes("financial") ||
    p.includes("wealth") ||
    p.includes("budget") ||
    p.includes("investment") ||
    p.includes("cashflow") ||
    p.includes("fire") ||
    p.includes("audit") ||
    p.includes("succession") ||
    p.includes("property")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "financial");
  }
  if (
    p.includes("business") ||
    p.includes("procurement") ||
    p.includes("inventory") ||
    p.includes("quality") ||
    p.includes("klien") ||
    p.includes("portal") ||
    p.includes("expense") ||
    p.includes("asset") ||
    p.includes("statistic") ||
    p.includes("100-framework") ||
    p.includes("valuasi") ||
    p.includes("pos") ||
    p.includes("toko") ||
    p.includes("katalog")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_business");
  }
  if (
    p.includes("project") ||
    p.includes("task") ||
    p.includes("kanban") ||
    p.includes("milestone") ||
    p.includes("work") ||
    p.includes("team") ||
    p.includes("time") ||
    p.includes("leave") ||
    p.includes("sprint") ||
    p.includes("employment")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_employment");
  }
  if (
    p.includes("creative") ||
    p.includes("studio") ||
    p.includes("canvas") ||
    p.includes("asset") ||
    p.includes("media") ||
    p.includes("photo") ||
    p.includes("video") ||
    p.includes("design") ||
    p.includes("audio")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_creative");
  }
  if (
    p.includes("research") ||
    p.includes("academic") ||
    p.includes("paper") ||
    p.includes("framework") ||
    p.includes("study") ||
    p.includes("thesis")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_research");
  }
  if (
    p.includes("sharia") ||
    p.includes("syariah") ||
    p.includes("zakat") ||
    p.includes("infaq") ||
    p.includes("wakaf") ||
    p.includes("sedekah") ||
    p.includes("halal") ||
    p.includes("hijrah") ||
    p.includes("faraidh")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_sharia");
  }
  if (
    p.includes("personal") ||
    p.includes("habit") ||
    p.includes("journal") ||
    p.includes("health") ||
    p.includes("mood") ||
    p.includes("diary")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_personal");
  }
  if (
    p.includes("family") ||
    p.includes("household") ||
    p.includes("vehicle") ||
    p.includes("child") ||
    p.includes("parent") ||
    p.includes("home")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_family");
  }
  if (
    p.includes("public") ||
    p.includes("civic") ||
    p.includes("policy") ||
    p.includes("government") ||
    p.includes("community")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_public_affairs");
  }
  if (
    p.includes("network") ||
    p.includes("contact") ||
    p.includes("social") ||
    p.includes("directory") ||
    p.includes("people") ||
    p.includes("relation")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_networks");
  }
  if (
    p.includes("reliance") ||
    p.includes("sufficient") ||
    p.includes("improvement") ||
    p.includes("development") ||
    p.includes("interact") ||
    p.includes("interest") ||
    p.includes("intersect") ||
    p.includes("interdependence") ||
    p.includes("insider") ||
    p.includes("insight") ||
    p.includes("outward") ||
    p.includes("outlook")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_phase_side");
  }

  return undefined;
}

function getActiveLauncherWorkspaceId(): string {
  try {
    const rawMode = getRaw("aio_active_mode") || getRaw("client_os_active_mode");
    if (rawMode) {
      const match = WORKSPACE_PAGES.find(
        (w) => w.id === rawMode || w.modeId === rawMode
      );
      if (match) return match.id;
    }
    const lastPageIdx = getLastLauncherPage(WORKSPACE_PAGES.length);
    if (WORKSPACE_PAGES[lastPageIdx]) {
      return WORKSPACE_PAGES[lastPageIdx].id;
    }
  } catch {}
  return "financial";
}

export function SidebarPillarsMenu({
  isCompact = false,
  onNavigate,
  activeMode,
}: SidebarPillarsMenuProps) {
  const location = useRouterState({ select: (s) => s.location });
  const pathname = location.pathname;

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => {
    if (activeMode) {
      const match = WORKSPACE_PAGES.find(
        (w) => w.id === activeMode || w.modeId === activeMode
      );
      if (match) return match.id;
    }
    const fromRoute = findWorkspaceForRoute(pathname);
    if (fromRoute) return fromRoute.id;
    return getActiveLauncherWorkspaceId();
  });

  // Sinkronisasi otomatis dengan route saat ini
  useEffect(() => {
    if (pathname && pathname !== "/") {
      const fromRoute = findWorkspaceForRoute(pathname);
      if (fromRoute) {
        setActiveWorkspaceId(fromRoute.id);
        return;
      }
    }
    setActiveWorkspaceId(getActiveLauncherWorkspaceId());
  }, [pathname]);

  // Sinkronisasi saat prop activeMode dari app-shell berubah
  useEffect(() => {
    if (activeMode) {
      const match = WORKSPACE_PAGES.find(
        (w) => w.id === activeMode || w.modeId === activeMode
      );
      if (match) {
        setActiveWorkspaceId(match.id);
      }
    }
  }, [activeMode]);

  // Sinkronisasi saat user menggeser/memilih tab pada launcher
  useEffect(() => {
    const handleLauncherPageChange = (e: any) => {
      const targetId = e.detail?.id || e.detail;
      if (typeof targetId === "string") {
        const found = WORKSPACE_PAGES.find(
          (w) => w.id === targetId || w.modeId === targetId
        );
        if (found) {
          setActiveWorkspaceId(found.id);
        }
      }
    };

    const handleModeChanged = () => {
      if (pathname === "/") {
        setActiveWorkspaceId(getActiveLauncherWorkspaceId());
      }
    };

    window.addEventListener("aio_launcher_page_changed", handleLauncherPageChange);
    window.addEventListener("aio_launcher_mode_changed", handleLauncherPageChange);
    window.addEventListener("aio_active_workspace_changed", handleLauncherPageChange);
    window.addEventListener("aio_mode_changed", handleModeChanged);

    return () => {
      window.removeEventListener("aio_launcher_page_changed", handleLauncherPageChange);
      window.removeEventListener("aio_launcher_mode_changed", handleLauncherPageChange);
      window.removeEventListener("aio_active_workspace_changed", handleLauncherPageChange);
      window.removeEventListener("aio_mode_changed", handleModeChanged);
    };
  }, [pathname]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  // Reset kategori terpilih jika workspace/laman berganti
  useEffect(() => {
    setSelectedCategory("all");
    setOpenCategories({});
  }, [activeWorkspaceId]);

  // Sinkronisasi dengan Kategori Bar Kanan Atas (HeaderNavPills di Header Utama)
  useEffect(() => {
    const handleHeaderCategoryChanged = (e: any) => {
      const catId = e.detail;
      if (typeof catId === "string") {
        setSelectedCategory(catId.toLowerCase());
      }
    };

    window.addEventListener("aio_header_category_changed", handleHeaderCategoryChanged);
    return () => {
      window.removeEventListener("aio_header_category_changed", handleHeaderCategoryChanged);
    };
  }, []);

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: prev[catName] === undefined ? false : !prev[catName],
    }));
    // Beri tahu bar kategori kanan atas saat kotak kategori dipilih
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aio_select_header_category", { detail: catName })
      );
    }
  };

  const activeWorkspace = useMemo(() => {
    return (
      WORKSPACE_PAGES.find((ws) => ws.id === activeWorkspaceId) ||
      WORKSPACE_PAGES[0]
    );
  }, [activeWorkspaceId]);

  // Kelompokkan modul di dalam workspace aktif sesuai kategori
  const categoriesData = useMemo(() => {
    const map: Record<string, WorkspaceModuleItem[]> = {};
    for (const mod of activeWorkspace.modules) {
      const cat = getModuleCategory(mod, activeWorkspace.id);
      if (!map[cat]) map[cat] = [];
      map[cat].push(mod);
    }

    const list = Object.entries(map).map(([name, mods]) => ({
      name,
      count: mods.length,
      modules: mods,
    }));

    return {
      allCount: activeWorkspace.modules.length,
      categoryList: list,
      categoryMap: map,
    };
  }, [activeWorkspace]);

  const [searchQuery, setSearchQuery] = useState("");
  const [openModuleFeatures, setOpenModuleFeatures] = useState<Record<string, boolean>>({});

  const toggleModuleFeatures = (modId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenModuleFeatures((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleOpenLauncherTab = (pageId: string, modeId: string) => {
    if (typeof window !== "undefined") {
      try {
        setRaw("aio_active_mode", modeId);
        setRaw("client_os_active_mode", modeId);
        window.dispatchEvent(
          new CustomEvent("aio_navigate_launcher_page", { detail: pageId })
        );
        window.dispatchEvent(new Event("aio_mode_changed"));
      } catch {}
    }
    if (onNavigate) {
      onNavigate();
    }
  };

  const q = searchQuery.toLowerCase().trim();

  // Mode ringkas 75px
  if (isCompact) {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        {WORKSPACE_PAGES.map((page) => {
          const PageIcon = page.icon;
          const theme = WORKSPACE_THEMES[page.id] || WORKSPACE_THEMES.financial;
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => handleOpenLauncherTab(page.id, page.modeId)}
              className={`size-11 rounded-xl ${theme.bg} ${theme.border} border flex items-center justify-center ${theme.text} shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs`}
              title={`${page.label}: ${page.desc} (${page.badge})`}
              aria-label={page.label}
            >
              <PageIcon size={18} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full pb-4">
      {/* Keterangan Laman Aktif (Rata Tengah Full Sidebar, tanpa icon dan label tambahan) */}
      {!q && (
        <div className="w-full text-center px-1 py-0.5">
          <span className="text-xs font-normal text-foreground text-center truncate block">
            {activeWorkspace.label}
          </span>
        </div>
      )}

      {/* Kotak Pencarian / Search Box */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-2 size-5 text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer rounded-full hover:bg-muted transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Kotak-kotak Terpisah Menyesuaikan Kategori dari Bar Kanan Atas (Dipisahkan per kategori) */}
      <div className="space-y-2.5">
        {categoriesData.categoryList
          .filter((cat) => {
            if (q) return true;
            if (!selectedCategory || selectedCategory === "all" || selectedCategory === "semua") {
              return true;
            }
            const cleanStr = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, "");
            const sel = cleanStr(selectedCategory);
            const c = cleanStr(cat.name);
            return c.includes(sel) || sel.includes(c);
          })
          .map((cat) => {
            const isCatOpen = q ? true : (openCategories[cat.name] ?? true);

            const visibleModules = q
              ? cat.modules.filter(
                  (m) =>
                    m.title.toLowerCase().includes(q) ||
                    (m.desc && m.desc.toLowerCase().includes(q)) ||
                    (m.features &&
                      m.features.some(
                        (f) =>
                          f.title.toLowerCase().includes(q) ||
                          (f.desc && f.desc.toLowerCase().includes(q))
                      ))
                )
              : cat.modules;

            if (visibleModules.length === 0) return null;

            return (
              <div
                key={cat.name}
                className="rounded-2xl border border-border/80 bg-card shadow-xs overflow-hidden transition-all"
              >
                {/* Header Kotak Kategori */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleCategory(cat.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCategory(cat.name);
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-muted/50 transition-colors cursor-pointer group select-none"
                >
                  <div className="flex items-center min-w-0 flex-1 pr-2">
                    <span className="text-xs font-normal text-foreground group-hover:text-primary transition-colors truncate">
                      {cat.name}
                    </span>
                  </div>

                  <div className="flex items-center shrink-0">
                    <span className="size-6 rounded-md flex items-center justify-center text-muted-foreground group-hover:text-foreground hover:bg-accent transition-colors">
                      <MoreHorizontal
                        size={14}
                        className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
                      />
                    </span>
                  </div>
                </div>

                {/* Daftar Modul di dalam Kotak Kategori ini (Jarak simetris 10px / p-2.5) */}
                {isCatOpen && (
                  <div className="p-2.5 bg-muted/20 dark:bg-muted/10">
                    <div className="space-y-2.5">
                      {visibleModules.map((mod) => {
                        const ModIcon = mod.icon || CheckCircle2;
                        const pathOnly = mod.to.split("?")[0];
                        const searchParams = mod.to.includes("?")
                          ? Object.fromEntries(new URLSearchParams(mod.to.split("?")[1]))
                          : undefined;
                        const isSubOpen = q ? true : !!openModuleFeatures[mod.id];
                        const hasFeatures = mod.features && mod.features.length > 0;

                        return (
                          <div
                            key={mod.id}
                            className="rounded-xl bg-background border border-border/70 shadow-2xs overflow-hidden transition-all"
                          >
                            {/* Baris Utama Modul: Padding 10px atas & bawah (py-2.5), 10px kiri & kanan (px-2.5) */}
                            <div className="flex items-center justify-between gap-1 px-2.5 py-2.5 hover:bg-muted/40 transition-colors text-foreground group/item">
                              <Link
                                to={pathOnly as any}
                                search={searchParams as any}
                                onClick={onNavigate}
                                className="flex items-center gap-2 min-w-0 flex-1 outline-none text-left"
                                title={mod.desc || mod.title}
                              >
                                <ModIcon size={13} className="text-muted-foreground group-hover/item:text-foreground shrink-0 transition-transform" />
                                <span className="text-xs font-normal group-hover/item:text-foreground transition-colors truncate">
                                  {mod.title}
                                </span>
                              </Link>

                              {/* Tombol dropdown chevron untuk membuka sub-fitur modul */}
                              {hasFeatures && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleModuleFeatures(mod.id, e)}
                                  className="size-6 rounded-md flex items-center justify-center shrink-0 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                  title={isSubOpen ? "Tutup daftar fitur" : "Buka daftar fitur"}
                                  aria-label="Tampilkan fitur modul"
                                >
                                  <ChevronRight
                                    size={13}
                                    className={`shrink-0 transition-transform duration-200 text-muted-foreground group-hover/item:text-foreground hover:text-foreground ${
                                      isSubOpen ? "rotate-90 text-foreground" : ""
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            {/* Daftar Sub-Fitur Modul (Menyatu tanpa garis divider, padding seimbang 10px) */}
                            {isSubOpen && hasFeatures && (
                              <div className="px-2.5 pb-2.5 pt-1 space-y-1 bg-muted/20 dark:bg-muted/10 animate-in fade-in duration-150">
                                {mod.features!.map((feat, fIdx) => {
                                  const FeatIcon = feat.icon || CheckCircle2;
                                  const fPath = feat.to.split("?")[0];
                                  const fSearch = feat.to.includes("?")
                                    ? Object.fromEntries(new URLSearchParams(feat.to.split("?")[1]))
                                    : undefined;

                                  return (
                                    <Link
                                      key={fIdx}
                                      to={fPath as any}
                                      search={fSearch as any}
                                      onClick={onNavigate}
                                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-normal text-muted-foreground hover:text-primary hover:bg-background transition-colors group/feat"
                                      title={feat.desc || feat.title}
                                    >
                                      <FeatIcon size={12} className="shrink-0 text-muted-foreground group-hover/feat:text-primary transition-colors" />
                                      <span className="truncate">{feat.title}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
