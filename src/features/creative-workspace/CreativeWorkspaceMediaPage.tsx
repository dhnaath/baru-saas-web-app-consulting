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
  Palette,
  Film,
  PenTool,
  Radio,
  Camera,
  Gamepad2,
  Search,
} from "lucide-react";

export type CreativeCategory = "all" | "design" | "publishing" | "production" | "interactive";

export interface CreativeSubMenu {
  id: string;
  label: string;
  to: string;
  componentCategory: ModuleComponentCategory;
}

export interface CreativeAppItem {
  id: string;
  name: string;
  category: "design" | "publishing" | "production" | "interactive";
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: CreativeSubMenu[];
}

export const CREATIVE_APPS: CreativeAppItem[] = [
  {
    id: "design-studio",
    name: "Design Management",
    category: "design",
    categoryLabel: "Design",
    shortDesc:
      "Kanvas perancangan grafis visual, inkubasi papan ide kreatif, serta repositori palet warna, tipografi, dan aset branding.",
    to: "/design",
    icon: Palette,
    badge: "Design Management",
    accentGradient: "from-pink-500 to-rose-600",
    accentBorder: "border-pink-500/30 hover:border-pink-500/60",
    badgeBg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
    badgeText: "Design",
    subMenus: [
      { id: "design-canvas", label: "Design Workspace", to: "/design", componentCategory: "Features" },
      { id: "ideas-board", label: "Creative Ideas", to: "/ideas", componentCategory: "Tools" },
      { id: "brand-assets", label: "Brand Asset Library", to: "/lainnya?app=design-assets", componentCategory: "Records" },
      { id: "moodboards", label: "Visual Moodboards", to: "/ideas", componentCategory: "Templates" },
    ],
  },
  {
    id: "film-video-production",
    name: "Video Production",
    category: "production",
    categoryLabel: "Production",
    shortDesc:
      "Manajemen pra-produksi video, naskah skenario, storyboard sinematik, dan kurasi katalog film referensi.",
    to: "/movies",
    icon: Film,
    badge: "Video Production",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Production",
    subMenus: [
      { id: "film-catalog", label: "Film Library", to: "/movies", componentCategory: "Records" },
      { id: "video-projects", label: "Video Projects", to: "/lainnya?app=film-video", componentCategory: "Workflows" },
      { id: "storyboard-notes", label: "Storyboards", to: "/notes", componentCategory: "Templates" },
    ],
  },
  {
    id: "writing-editorial",
    name: "Writing and Publishing",
    category: "publishing",
    categoryLabel: "Publishing",
    shortDesc:
      "Editor penulisan esai, artikel publikasi editorial bebas distraksi, dan draft naskah konten digital second brain.",
    to: "/writing",
    icon: PenTool,
    badge: "Writing & Publishing",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Publishing",
    subMenus: [
      { id: "writing-editor", label: "Writing Workspace", to: "/writing", componentCategory: "Features" },
      { id: "quick-notes", label: "Quick Notes", to: "/catatan", componentCategory: "Tools" },
      { id: "editorial-drafts", label: "Editorial Drafts", to: "/documents", componentCategory: "Workflows" },
    ],
  },
  {
    id: "audio-podcast-studio",
    name: "Audio Production",
    category: "production",
    categoryLabel: "Production",
    shortDesc:
      "Perencanaan episode podcast, produksi rekaman audio & wawancara, serta manajemen trek musik pengiring.",
    to: "/podcasts",
    icon: Radio,
    badge: "Audio Production",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Production",
    subMenus: [
      { id: "podcast-episodes", label: "Podcast Episodes", to: "/podcasts", componentCategory: "Workflows" },
      { id: "music-library", label: "Music Library", to: "/music", componentCategory: "Records" },
      { id: "audio-scripts", label: "Voice Scripts", to: "/notes", componentCategory: "Templates" },
    ],
  },
  {
    id: "photography-gallery",
    name: "Photography and Media",
    category: "production",
    categoryLabel: "Production",
    shortDesc:
      "Manajemen album fotografi, kurasi visual moodboard, dan katalog arsip resolusi tinggi untuk kebutuhan produksi.",
    to: "/photography",
    icon: Camera,
    badge: "Photography & Media",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Production",
    subMenus: [
      { id: "photo-gallery", label: "Photo Gallery", to: "/photography", componentCategory: "Records" },
      { id: "shot-lists", label: "Shot Lists", to: "/notes", componentCategory: "Guides" },
    ],
  },
  {
    id: "games-interactive",
    name: "Interactive Media",
    category: "interactive",
    categoryLabel: "Interactive",
    shortDesc:
      "Simulasi logika interaktif, konsep mekanika permainan gamifikasi, dan repositori aset media interaktif.",
    to: "/games",
    icon: Gamepad2,
    badge: "Interactive Media",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Interactive",
    subMenus: [
      { id: "interactive-games", label: "Interactive Games", to: "/games", componentCategory: "Features" },
      { id: "game-mechanics", label: "Game Mechanics", to: "/notes", componentCategory: "Guides" },
      { id: "interactive-sims", label: "Simulation Hub", to: "/peh/innovations-hub", componentCategory: "Tools" },
    ],
  },
];

export const CREATIVE_CATEGORY_TABS: {
  id: CreativeCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: CREATIVE_APPS.length },
  { id: "design", label: "Design", count: CREATIVE_APPS.filter((a) => a.category === "design").length },
  { id: "publishing", label: "Publishing", count: CREATIVE_APPS.filter((a) => a.category === "publishing").length },
  { id: "production", label: "Production", count: CREATIVE_APPS.filter((a) => a.category === "production").length },
  { id: "interactive", label: "Interactive", count: CREATIVE_APPS.filter((a) => a.category === "interactive").length },
];

export const CREATIVE_TOTAL_MODULES = CREATIVE_APPS.length;
export const CREATIVE_TOOLS_COUNT = CREATIVE_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const CREATIVE_FEATURES_COUNT = CREATIVE_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const CREATIVE_TOTAL_BADGE = `${CREATIVE_TOTAL_MODULES} Modul • ${CREATIVE_FEATURES_COUNT} Features • ${CREATIVE_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_creative", CREATIVE_TOTAL_BADGE);
export const CREATIVE_SUMMARY_DESC = CREATIVE_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export function CreativeWorkspaceMediaPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<CreativeCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_creative") || "mode_creative";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const list = CREATIVE_APPS.filter((app) => {
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
          items={adjustCategoryTabsCount(CREATIVE_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as any)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Creative Workspace and Media Production</span>
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
              features={app.subMenus.map((sub) => ({
                title: sub.label,
                to: sub.to || app.to,
              }))}
              categoryGroups={buildModuleCategoryGroups(app.subMenus, app.to)}
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
              Tidak ada modul kreatif ditemukan
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
