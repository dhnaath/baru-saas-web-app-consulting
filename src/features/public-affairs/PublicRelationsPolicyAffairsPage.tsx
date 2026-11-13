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
  Landmark,
  Building,
  Compass,
  CalendarDays,
  ShieldAlert,
  Scale,
  Globe,
  Search,
} from "lucide-react";

export type PublicAffairsCategory = "all" | "community" | "public-services" | "policy" | "media";

export interface PublicAffairsSubMenu {
  id: string;
  label: string;
  to: string;
  componentCategory: ModuleComponentCategory;
}

export interface PublicAffairsAppItem {
  id: string;
  name: string;
  category: "community" | "public-services" | "policy" | "media";
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: PublicAffairsSubMenu[];
}

export const PUBLIC_AFFAIRS_APPS: PublicAffairsAppItem[] = [
  {
    id: "komunitas-warga-rt-rw",
    name: "Community Management",
    category: "community",
    categoryLabel: "Community",
    shortDesc:
      "Manajemen rukun warga RT/RW terpadu: transparansi pencatatan iuran kas warga, publikasi pengumuman digital, dan penerbitan surat pengantar sipil.",
    to: "/komunitas-warga",
    icon: Building,
    badge: "Rukun Warga",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Community",
    subMenus: [
      { id: "warga-directory", label: "Resident Directory", to: "/komunitas-warga", componentCategory: "Records" },
      { id: "iuran-kas", label: "Community Fund", to: "/komunitas-warga", componentCategory: "Analytics" },
      { id: "surat-pengantar", label: "Civic Letters", to: "/komunitas-warga", componentCategory: "Templates" },
    ],
  },
  {
    id: "civic-services-guide",
    name: "Public Services",
    category: "public-services",
    categoryLabel: "Public Services",
    shortDesc:
      "Direktori panduan administrasi kependudukan (KTP, KK, Akta), persyaratan legal perizinan sipil, dan repositori kontak kantor dinas pelayanan publik.",
    to: "/lainnya?app=public-services-guide",
    icon: Compass,
    badge: "Civic Services",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Public Services",
    subMenus: [
      { id: "panduan-layanan", label: "Civic Services Guide", to: "/lainnya?app=public-services-guide", componentCategory: "Guides" },
      { id: "syarat-berkas", label: "Document Requirements", to: "/documents", componentCategory: "Settings" },
      { id: "kontak-instansi", label: "Public Office Directory", to: "/contacts", componentCategory: "Records" },
    ],
  },
  {
    id: "civic-calendar-agenda",
    name: "Community Events",
    category: "community",
    categoryLabel: "Community",
    shortDesc:
      "Kalender agenda gotong royong, jadwal posyandu & ronda malam siskamling, serta risalah notulen musyawarah rencana pembangunan warga.",
    to: "/lainnya?app=civic-calendar",
    icon: CalendarDays,
    badge: "Civic Agenda",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Community",
    subMenus: [
      { id: "kalender-warga", label: "Community Calendar", to: "/lainnya?app=civic-calendar", componentCategory: "Dashboards" },
      { id: "jadwal-musyawarah", label: "Meeting Schedule", to: "/calendar", componentCategory: "Workflows" },
      { id: "notulen-pertemuan", label: "Meeting Minutes", to: "/meeting-manager", componentCategory: "Records" },
    ],
  },
  {
    id: "policy-compliance-audit",
    name: "Regulatory Compliance",
    category: "policy",
    categoryLabel: "Policy",
    shortDesc:
      "Pelacakan kepatuhan terhadap regulasi perundang-undangan daerah/nasional, standar kepatuhan operasional, dan mitigasi risiko sanksi hukum.",
    to: "/peh/compliance",
    icon: Scale,
    badge: "Policy Audit",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Policy",
    subMenus: [
      { id: "compliance-tracker", label: "Compliance Tracker", to: "/peh/compliance", componentCategory: "Dashboards" },
      { id: "audit-hukum", label: "Legal Compliance Audit", to: "/surety?tab=cat_kepatuhan", componentCategory: "Analytics" },
      { id: "daftar-regulasi", label: "Regulatory Library", to: "/documents", componentCategory: "Guides" },
    ],
  },
  {
    id: "advocacy-public-affairs",
    name: "Public Advocacy",
    category: "policy",
    categoryLabel: "Policy",
    shortDesc:
      "Kanal penjaringan aspirasi konstituen, kajian usulan kebijakan publik, petisi advokasi kepentingan komunitas, dan forum dengar pendapat umum.",
    to: "/peh/advocacy",
    icon: ShieldAlert,
    badge: "Advocacy",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Policy",
    subMenus: [
      { id: "aspirasi-publik", label: "Public Feedback", to: "/peh/advocacy", componentCategory: "Features" },
      { id: "risalah-kebijakan", label: "Policy Proposals", to: "/notes", componentCategory: "Templates" },
      { id: "survei-warga", label: "Public Opinion Survey", to: "/forms", componentCategory: "Tools" },
    ],
  },
  {
    id: "public-relations-media",
    name: "Public Relations",
    category: "media",
    categoryLabel: "Media",
    shortDesc:
      "Pengelolaan siaran pers resmi, pemantauan narasi reputasi publik, saluran komunikasi stakeholder eksternal, dan mitigasi krisis komunikasi.",
    to: "/peh/global-overview",
    icon: Globe,
    badge: "Public Relations",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Media",
    subMenus: [
      { id: "siaran-pers", label: "Press Releases", to: "/peh/global-overview", componentCategory: "Workflows" },
      { id: "stakeholder-news", label: "Stakeholder Updates", to: "/notification-center", componentCategory: "Automations" },
      { id: "media-clipping", label: "Media Monitoring", to: "/web-clipper", componentCategory: "Analytics" },
    ],
  },
];

export const PUBLIC_AFFAIRS_CATEGORY_TABS: {
  id: PublicAffairsCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: PUBLIC_AFFAIRS_APPS.length },
  { id: "community", label: "Community", count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "community").length },
  { id: "public-services", label: "Public Services", count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "public-services").length },
  { id: "policy", label: "Policy", count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "policy").length },
  { id: "media", label: "Media", count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "media").length },
];

export const PUBLIC_AFFAIRS_TOTAL_MODULES = PUBLIC_AFFAIRS_APPS.length;
export const PUBLIC_AFFAIRS_TOOLS_COUNT = PUBLIC_AFFAIRS_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const PUBLIC_AFFAIRS_FEATURES_COUNT = PUBLIC_AFFAIRS_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const PUBLIC_AFFAIRS_TOTAL_BADGE = `${PUBLIC_AFFAIRS_TOTAL_MODULES} Modul • ${PUBLIC_AFFAIRS_FEATURES_COUNT} Features • ${PUBLIC_AFFAIRS_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_public_affairs", PUBLIC_AFFAIRS_TOTAL_BADGE);
export const PUBLIC_AFFAIRS_SUMMARY_DESC = PUBLIC_AFFAIRS_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export function PublicRelationsPolicyAffairsPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<PublicAffairsCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_public_affairs") || "mode_public_affairs";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const list = PUBLIC_AFFAIRS_APPS.filter((app) => {
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
          items={adjustCategoryTabsCount(PUBLIC_AFFAIRS_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as any)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Public Affairs and Relations</span>
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
              Tidak ada modul publik ditemukan
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
