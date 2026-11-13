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
  Briefcase,
  Target,
  Workflow,
  Layers,
  Building2,
  ShoppingBag,
  FileCheck,
  AlertOctagon,
  ShieldCheck,
  PieChart,
  Search,
} from "lucide-react";

export type WorkCategory =
  | "all"
  | "planning"
  | "workflow"
  | "resources"
  | "coordination"
  | "governance"
  | "ownership";

export interface WorkAppItem {
  id: string;
  name: string;
  category: "planning" | "workflow" | "resources" | "coordination" | "governance" | "ownership";
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: { id: string; label: string; to?: string; componentCategory: ModuleComponentCategory }[];
}

export const WORK_APPS: WorkAppItem[] = [
  // 1. Planning (1)
  {
    id: "milestones",
    name: "Goals & Milestones",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc: "Peta jalan sasaran jangka pendek & panjang dengan tahapan checkpoint terukur, bobot progres, dan integrasi task & kanban.",
    to: "/peh/milestones",
    icon: Target,
    badge: "Planning",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Planning",
    subMenus: [
      { id: "active", label: "Sasaran Aktif", to: "/peh/milestones", componentCategory: "Features" },
      { id: "milestones", label: "Tahapan Checkpoint", to: "/milestone-manager", componentCategory: "Workflows" },
      { id: "tasks", label: "Task Manager", to: "/task-manager", componentCategory: "Features" },
      { id: "kanban", label: "Kanban Board", to: "/kanban", componentCategory: "Dashboards" },
    ],
  },

  // 2. Workflow (2)
  {
    id: "workflows",
    name: "Workflow & Delivery Pipeline",
    category: "workflow",
    categoryLabel: "Workflow",
    shortDesc: "Proses bertahap (onboarding, approval, delivery) dengan pemantauan siklus, SLA waktu, timeline, dan deliverable manager.",
    to: "/peh/workflows",
    icon: Workflow,
    badge: "Workflow",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Workflow",
    subMenus: [
      { id: "pipelines", label: "Pipeline Aktif", to: "/peh/workflows", componentCategory: "Dashboards" },
      { id: "project-mgr", label: "Project Manager", to: "/proyek", componentCategory: "Features" },
      { id: "workflow-mgr", label: "Workflow Manager", to: "/workflow-manager", componentCategory: "Workflows" },
      { id: "deliverables", label: "Deliverable Manager", to: "/deliverable-manager", componentCategory: "Records" },
    ],
  },
  {
    id: "content-pipeline",
    name: "Content Production Pipeline",
    category: "workflow",
    categoryLabel: "Workflow",
    shortDesc: "Papan kanban tahapan naskah, perancangan ide kreatif, syuting, editing, matriks prioritas, dan jadwal rilis publikasi.",
    to: "/peh/projects",
    icon: Layers,
    badge: "Workflow",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Workflow",
    subMenus: [
      { id: "active", label: "Konten Berjalan", to: "/peh/projects", componentCategory: "Workflows" },
      { id: "eisenhower", label: "Eisenhower Matrix", to: "/eisenhower", componentCategory: "Tools" },
      { id: "timeline", label: "Timeline Gantt", to: "/timeline", componentCategory: "Dashboards" },
      { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock", componentCategory: "Tools" },
    ],
  },

  // 3. Resources (2)
  {
    id: "vendors",
    name: "Vendor & Service Management",
    category: "resources",
    categoryLabel: "Resources",
    shortDesc: "Direktori komprehensif mitra bisnis, rekam jejak performa vendor, daftar ratecard tarif standar, dan ketersediaan kapasitas.",
    to: "/peh/vendors",
    icon: Building2,
    badge: "Resources",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Resources",
    subMenus: [
      { id: "vendor-dir", label: "Direktori Vendor", to: "/peh/vendors", componentCategory: "Records" },
      { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard", componentCategory: "Templates" },
      { id: "resource-mgr", label: "Resource Manager", to: "/resource-manager", componentCategory: "Features" },
      { id: "people-mgr", label: "People Manager", to: "/people-manager", componentCategory: "Records" },
    ],
  },
  {
    id: "procurement",
    name: "Procurement & Purchase Orders",
    category: "resources",
    categoryLabel: "Resources",
    shortDesc: "Siklus pengadaan barang & jasa korporasi, registrasi purchase orders (PO), verifikasi anggaran, dan alur persetujuan bertingkat.",
    to: "/peh/procurement",
    icon: ShoppingBag,
    badge: "Resources",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Resources",
    subMenus: [
      { id: "po-list", label: "Purchase Orders (PO)", to: "/peh/procurement", componentCategory: "Records" },
      { id: "approval-mgr", label: "Approval Manager", to: "/approval-manager", componentCategory: "Workflows" },
      { id: "forms", label: "Form Pengadaan", to: "/forms", componentCategory: "Templates" },
    ],
  },

  // 4. Coordination (1)
  {
    id: "meetings",
    name: "Meetings & Decision Log",
    category: "coordination",
    categoryLabel: "Coordination",
    shortDesc: "Dokumentasi objektif pertemuan, poin kesepakatan final eksekutif, daftar tindakan (action items), dan penanggung jawab PIC.",
    to: "/peh/meetings",
    icon: FileCheck,
    badge: "Coordination",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Coordination",
    subMenus: [
      { id: "meeting-list", label: "Daftar Notulensi", to: "/peh/meetings", componentCategory: "Records" },
      { id: "meeting-mgr", label: "Meeting Manager", to: "/meeting-manager", componentCategory: "Features" },
      { id: "decisions", label: "Log Keputusan Final", to: "/peh/meetings", componentCategory: "Records" },
      { id: "collaboration", label: "Kolaborasi Tim", to: "/collaboration", componentCategory: "Workflows" },
    ],
  },

  // 5. Governance (2)
  {
    id: "incidents",
    name: "Issues & Incident Management",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc: "Pencatatan gangguan operasional, level urgensi & keparahan (SEV), investigasi akar masalah (RCA), dan evaluasi mitigasi.",
    to: "/peh/incidents",
    icon: AlertOctagon,
    badge: "Governance",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Governance",
    subMenus: [
      { id: "active-issues", label: "Insiden Terbuka", to: "/peh/incidents", componentCategory: "Dashboards" },
      { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk", componentCategory: "Workflows" },
      { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log", componentCategory: "Records" },
      { id: "notifications", label: "Notification Center", to: "/notification-center", componentCategory: "Automations" },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Regulatory Audit",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc: "Matriks kepatuhan hukum, audit standar ISO/K3/pajak, radar jatuh tempo izin operasional, dan skor kesiapan inspeksi eksternal.",
    to: "/peh/compliance",
    icon: ShieldCheck,
    badge: "Governance",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Governance",
    subMenus: [
      { id: "compliance-matrix", label: "Matriks Kepatuhan", to: "/peh/compliance", componentCategory: "Settings" },
      { id: "readiness-score", label: "Skor Kesiapan Audit", to: "/peh/compliance", componentCategory: "Analytics" },
      { id: "handover", label: "Handover Notes", to: "/lainnya?app=handover-notes", componentCategory: "Guides" },
    ],
  },

  // 6. Ownership (1)
  {
    id: "cap-table",
    name: "Equity & Cap Table",
    category: "ownership",
    categoryLabel: "Ownership",
    shortDesc: "Tabel kepemilikan modal saham pendiri & investor, pembagian dividen, vesting schedule ekuitas, dan simulasi putaran pendanaan.",
    to: "/peh/cap-table",
    icon: PieChart,
    badge: "Ownership",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Ownership",
    subMenus: [
      { id: "shareholders", label: "Pemegang Saham", to: "/peh/cap-table", componentCategory: "Records" },
      { id: "dilution", label: "Simulasi Dilusi", to: "/peh/cap-table", componentCategory: "Analytics" },
      { id: "valuation", label: "Valuasi Ekuitas", to: "/valuasi", componentCategory: "Tools" },
    ],
  },
];

export const CATEGORY_TABS: { id: WorkCategory; label: string; count: number }[] = [
  { id: "all", label: "Semua", count: WORK_APPS.length },
  { id: "planning", label: "Planning", count: WORK_APPS.filter((a) => a.category === "planning").length },
  { id: "workflow", label: "Workflow", count: WORK_APPS.filter((a) => a.category === "workflow").length },
  { id: "resources", label: "Resources", count: WORK_APPS.filter((a) => a.category === "resources").length },
  { id: "coordination", label: "Coordination", count: WORK_APPS.filter((a) => a.category === "coordination").length },
  { id: "governance", label: "Governance", count: WORK_APPS.filter((a) => a.category === "governance").length },
  { id: "ownership", label: "Ownership", count: WORK_APPS.filter((a) => a.category === "ownership").length },
];

export const WORK_TOTAL_MODULES = WORK_APPS.length;
export const WORK_TOOLS_COUNT = WORK_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const WORK_FEATURES_COUNT = WORK_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const WORK_TOTAL_BADGE = `${WORK_TOTAL_MODULES} Modul • ${WORK_FEATURES_COUNT} Features • ${WORK_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_employment", WORK_TOTAL_BADGE);
export const WORK_SUMMARY_DESC = CATEGORY_TABS.map((t) => `${t.label} (${t.count})`).join(" · ");

export function WorkProductivityPage({ isEmbedded = false }: { isEmbedded?: boolean } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_employment") || "mode_employment";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const list = WORK_APPS.filter((app) => {
      const matchCategory = selectedCategory === "all" || app.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      {/* Portaled ShellHeader Filter Pills (Direct Selected / Unselected Layers) */}
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as any)}
        />
      </ShellHeader>

      {/* Main Page Container */}
      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        {/* Title (Matching MBA Page Header Style) */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Productivity Workspace and Workflow Systems</span>
          </h1>
        </div>

        {/* Applications Grid */}
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

        {/* Empty Search Result Fallback */}
        {filteredApps.length === 0 &&
          (selectedCategory !== "all" || getCardsMovedIntoPage(pageId).length === 0) && (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border bg-card/40 my-6">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
              <Search className="size-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">Tidak ada modul ditemukan</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1">
              Tidak ada aplikasi yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
    </LauncherPageProvider>
  );
}
export default WorkProductivityPage;
