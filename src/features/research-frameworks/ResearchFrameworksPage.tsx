import React, { useState, useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  MBACard,
  buildModuleCategoryGroups,
  type ModuleComponentCategory,
} from "@/components/common/MBACard";
import { MovedCardsGridItems } from "@/components/common/MovedCardsGridItems";
import {
  LauncherPageProvider,
  adjustCategoryTabsCount,
  syncLauncherPageBadge,
  useCardPageMover,
  useCurrentLauncherPage,
} from "@/hooks/useCardPageMover";
import { usePinnedCards, sortCardsWithPinned } from "@/hooks/usePinnedCards";
import {
  GraduationCap,
  Layers,
  Building,
  Compass,
  BookOpen,
  Book,
  Search,
  FileCheck,
} from "lucide-react";

export type ResearchCategory = "all" | "frameworks" | "reference" | "research";

export interface ResearchSubMenu {
  id: string;
  label: string;
  to: string;
  componentCategory: ModuleComponentCategory;
}

export interface ResearchAppItem {
  id: string;
  name: string;
  category: "frameworks" | "reference" | "research";
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: ResearchSubMenu[];
}

export const RESEARCH_APPS: ResearchAppItem[] = [
  {
    id: "mba-frameworks",
    name: "Business Frameworks",
    category: "frameworks",
    categoryLabel: "Frameworks",
    shortDesc:
      "Katalog lengkap model strategi keputusan eksekutif: BCG Matrix, Porter 5 Forces, SWOT/TOWS, PESTEL, Ansoff, hingga Value Chain.",
    to: "/100-framework",
    icon: Layers,
    badge: "100 Frameworks",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Frameworks",
    subMenus: [
      { id: "all-frameworks", label: "Framework Library", to: "/100-framework", componentCategory: "Templates" },
      { id: "bcg-matrix", label: "BCG Matrix", to: "/bcg", componentCategory: "Analytics" },
      { id: "porter-forces", label: "Porter's Five Forces", to: "/porter", componentCategory: "Analytics" },
      { id: "pestel-analysis", label: "PESTEL Analysis", to: "/pestel", componentCategory: "Analytics" },
    ],
  },
  {
    id: "business-valuation-mappi",
    name: "Business Valuation",
    category: "frameworks",
    categoryLabel: "Frameworks",
    shortDesc:
      "Instrumen valuasi perusahaan terstandar MAPPI: Discounted Cash Flow (DCF), Multiples (PBV, PER, EV/EBITDA), dan Asset-Based Approach.",
    to: "/valuasi",
    icon: Building,
    badge: "MAPPI Valuation",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Frameworks",
    subMenus: [
      { id: "valuasi-dcf", label: "DCF Valuation", to: "/valuasi", componentCategory: "Tools" },
      { id: "valuasi-multiples", label: "Market Multiples", to: "/valuasi", componentCategory: "Analytics" },
      { id: "valuasi-asset", label: "Asset-Based Valuation", to: "/valuasi", componentCategory: "Tools" },
    ],
  },
  {
    id: "research-intelligence",
    name: "Research Intelligence",
    category: "research",
    categoryLabel: "Research",
    shortDesc:
      "Sentra riset komparatif, pengumpulan kliping web clipper, pangkalan referensi industri, dan sintesis catatan riset lapangan.",
    to: "/research-manager",
    icon: Compass,
    badge: "Research Hub",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Research",
    subMenus: [
      { id: "research-manager", label: "Research Workspace", to: "/research-manager", componentCategory: "Features" },
      { id: "web-clipper", label: "Web Clipper", to: "/web-clipper", componentCategory: "Tools" },
      { id: "research-notes", label: "Research Notes", to: "/notes", componentCategory: "Records" },
    ],
  },
  {
    id: "kurasi-pengetahuan",
    name: "Business Knowledge",
    category: "reference",
    categoryLabel: "Reference",
    shortDesc:
      "Modul kurasi pengetahuan bisnis 10 chapter: Ekonomi, Statistik, Manajemen, Komunikasi, Logistik, Akuntansi, Asuransi, dan Investasi.",
    to: "/kurasi",
    icon: BookOpen,
    badge: "10 Chapter",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Reference",
    subMenus: [
      { id: "chapter-1-ekonomi", label: "Economics", to: "/kurasi/ekonomi", componentCategory: "Guides" },
      { id: "chapter-2-statistik", label: "Statistics", to: "/kurasi/statistik", componentCategory: "Analytics" },
      { id: "chapter-3-manajemen", label: "Management", to: "/kurasi/manajemen", componentCategory: "Guides" },
      { id: "chapter-4-komunikasi", label: "Communication", to: "/kurasi/komunikasi", componentCategory: "Guides" },
    ],
  },
  {
    id: "wiki-corporate-knowledge",
    name: "Knowledge Base",
    category: "reference",
    categoryLabel: "Reference",
    shortDesc:
      "Repositori Standard Operating Procedure (SOP), dokumentasi pangkalan pengetahuan korporat, dan rujukan klausul Incoterms logistik global.",
    to: "/wiki",
    icon: FileCheck,
    badge: "Knowledge Base",
    accentGradient: "from-amber-500 to-rose-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Reference",
    subMenus: [
      { id: "wiki-engine", label: "SOP Library", to: "/wiki", componentCategory: "Templates" },
      { id: "knowledge-base", label: "Knowledge Repository", to: "/knowledge-base", componentCategory: "Records" },
      { id: "incoterms", label: "Incoterms Guide", to: "/incoterms", componentCategory: "Guides" },
    ],
  },
  {
    id: "reading-library",
    name: "Reading Library",
    category: "research",
    categoryLabel: "Research",
    shortDesc:
      "Daftar bacaan terarah literatur ilmiah, buku teks bisnis, jurnal manajemen, serta pengarsipan ringkasan intisari bab bacaan.",
    to: "/reading",
    icon: Book,
    badge: "Library",
    accentGradient: "from-indigo-500 to-sky-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Research",
    subMenus: [
      { id: "reading-list", label: "Reading List", to: "/reading", componentCategory: "Workflows" },
      { id: "reading-notes", label: "Book Notes", to: "/notes", componentCategory: "Records" },
      { id: "bookmarks", label: "Bookmarks", to: "/bookmarks", componentCategory: "Records" },
    ],
  },
];

export const RESEARCH_CATEGORY_TABS: {
  id: ResearchCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: RESEARCH_APPS.length },
  { id: "frameworks", label: "Frameworks", count: RESEARCH_APPS.filter((a) => a.category === "frameworks").length },
  { id: "reference", label: "Reference", count: RESEARCH_APPS.filter((a) => a.category === "reference").length },
  { id: "research", label: "Research", count: RESEARCH_APPS.filter((a) => a.category === "research").length },
];

export const RESEARCH_TOTAL_MODULES = RESEARCH_APPS.length;
export const RESEARCH_TOOLS_COUNT = RESEARCH_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const RESEARCH_FEATURES_COUNT = RESEARCH_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const RESEARCH_TOTAL_BADGE = `${RESEARCH_TOTAL_MODULES} Modul • ${RESEARCH_FEATURES_COUNT} Features • ${RESEARCH_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_research", RESEARCH_TOTAL_BADGE);
export const RESEARCH_SUMMARY_DESC = RESEARCH_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export function ResearchFrameworksPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<ResearchCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_research") || "mode_research";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const list = RESEARCH_APPS.filter((app) => {
      const matchCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.subMenus.some((sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCategory && matchSearch;
    });
    return sortCardsWithPinned(list, (app) => app.to || app.name, pinnedList);
  }, [selectedCategory, searchQuery, pinnedList]);

  return (
    <LauncherPageProvider pageId={pageId}>
    <div className="w-full flex-1 flex flex-col font-sans pb-16">
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(RESEARCH_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as any)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Research Foundations and Reference Frameworks</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
          {filteredApps.map((app) => (
            <MBACard
              key={app.id}
              title={app.name}
              to={app.to}
              icon={app.icon}
              badge={app.badgeText}
              shortDesc={app.shortDesc}
              accentGradient={app.accentGradient}
              categoryGroups={buildModuleCategoryGroups(app.subMenus, app.to)}
              features={app.subMenus.map((sub) => ({
                title: sub.label,
                to: sub.to || app.to,
              }))}
              isFav={isFavorite(app.to)}
              toggleFavorite={toggleFavorite}
            />
          ))}
          {selectedCategory === "all" && (
            <MovedCardsGridItems pageId={pageId} searchQuery={searchQuery} />
          )}
        </div>

        {filteredApps.length === 0 &&
          (selectedCategory !== "all" || getCardsMovedIntoPage(pageId).length === 0) && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-border p-8 bg-card/40">
            <Search className="size-8 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-foreground">
              Tidak ada modul riset ditemukan
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-semibold transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
    </LauncherPageProvider>
  );
}
