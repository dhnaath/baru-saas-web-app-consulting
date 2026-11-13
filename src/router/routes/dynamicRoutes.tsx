import React, { Suspense } from "react";
import {
  createRoute,
  useNavigate,
  useRouterState,
  type AnyRoute,
} from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { navKonsultan, type NavItem } from "@/config/nav";
import { STANDALONE_APPS } from "@/features/standalone/standaloneAppsData";
import { ArrowLeft } from "lucide-react";
import { RouteLoadingFallback } from "@/components/RouteLoadingFallback";
import { lazyNamed } from "../lazyRoute";

// Lazy-loaded standalone and framework fallbacks
const LazyStandaloneAppView = lazyNamed(
  () => import("@/features/standalone/StandaloneAppView"),
  "StandaloneAppView",
  "Memuat Modul Standalone..."
);

const LazyValueTreatedPage = lazyNamed(
  () => import("@/features/value-treated/ValueTreatedPage"),
  "ValueTreatedPage",
  "Memuat Applied Value Framework..."
);

const LazyNationalIndicesDashboard = lazyNamed(
  () => import("@/routes/national-indices"),
  "NationalIndicesDashboard",
  "Memuat Indeks Pembangunan Nasional..."
);

const LazyFrameworkByNameView = lazyNamed(
  () => import("@/features/nonWhiteApps/NonWhiteAppRenderer"),
  "FrameworkByNameView",
  "Memuat Framework..."
);

// Lazy PEH bundle dispatcher
const LazyPehDynamicView = React.lazy(async () => {
  const m = await import("@/peh/PehAppRenderer");
  const pehMap: Record<string, React.ComponentType> = {
    "/peh/habits": m.PehHabitsView,
    "/peh/journal": m.PehJournalView,
    "/peh/goals": m.PehGoalsView,
    "/peh/reading": m.PehReadingView,
    "/peh/fitness": m.PehFitnessView,
    "/peh/sleep": m.PehSleepView,
    "/peh/vault": m.PehVaultView,
    "/peh/documents": m.PehDocumentsView,
    "/peh/subscriptions": m.PehSubscriptionsView,
    "/peh/budget": m.PehBudgetView,
    "/peh/insurance": m.PehInsuranceView,
    "/peh/chores": m.PehChoresView,
    "/peh/maintenance": m.PehMaintenanceView,
    "/peh/pantry": m.PehPantryView,
    "/peh/plants": m.PehPlantsView,
    "/peh/vehicles": m.PehVehiclesView,
    "/peh/family-tree": m.PehFamilyTreeView,
    "/peh/family-health": m.PehFamilyHealthView,
    "/peh/family-recipes": m.PehFamilyRecipesView,
    "/peh/traditions": m.PehTraditionsView,
    "/peh/family-budget": m.PehFamilyBudgetView,
    "/peh/pet-care": m.PehPetCareView,
    "/peh/workflows": m.PehWorkflowsView,
    "/peh/vendors": m.PehVendorsView,
    "/peh/incidents": m.PehIncidentsView,
    "/peh/procurement": m.PehProcurementView,
    "/peh/compliance": m.PehComplianceView,
    "/peh/assets": m.PehAssetsView,
    "/peh/ip-licenses": m.PehIpLicensesView,
    "/peh/cap-table": m.PehCapTableView,
    "/peh/investments": m.PehInvestmentsView,
    "/peh/real-estate": m.PehRealEstateView,
    "/peh/contacts": m.PehContactsView,
    "/peh/milestones": m.PehMilestonesView,
    "/peh/gifts": m.PehGiftsView,
    "/peh/introductions": m.PehIntroductionsView,
    "/peh/mentorship": m.PehMentorshipView,
    "/peh/knowledge": m.PehKnowledgeView,
    "/peh/meetings": m.PehMeetingsView,
    "/peh/projects": m.PehProjectsView,
    "/peh/tasks": m.PehTasksView,
    "/peh/time-audit": m.PehTimeAuditView,
    "/peh/civic": m.PehCivicView,
    "/peh/volunteering": m.PehVolunteeringView,
    "/peh/charity": m.PehCharityView,
    "/peh/community-events": m.PehCommunityEventsView,
    "/peh/advocacy": m.PehAdvocacyView,
    "/peh/global-overview": m.PehGlobalOverviewView,
    "/peh/innovations-hub": m.PehInnovationsHubView,
    "/peh/ecosystem-comparison": m.PehEcosystemComparisonView,
  };
  return {
    default: ({ path }: { path: string }) => {
      const Comp = pehMap[path];
      return Comp ? (
        <m.PEHLayout>
          <Comp />
        </m.PEHLayout>
      ) : null;
    },
  };
});

// Lazy LifeOS bundle dispatcher
const LazyLifeDynamicView = React.lazy(async () => {
  const m = await import("@/life-os/LifeOSAppRenderer");
  const lifeMap: Record<string, React.ComponentType> = {
    "/life/life-planner": m.LifeOSPlannerView,
    "/life/finance-os": m.LifeOSFinanceView,
    "/life/simple-finance": m.LifeOSSimpleFinanceView,
    "/life/budget-tracker": m.LifeOSBudgetView,
    "/life/weight-tracker": m.LifeOSWeightView,
    "/life/doctor-consultation": m.LifeOSDoctorView,
    "/life/household-tracker": m.LifeOSHouseholdView,
    "/life/wishlist": m.LifeOSWishlistView,
    "/life/grocery-list": m.LifeOSGroceryView,
    "/life/movie-tracker": m.LifeOSMovieView,
    "/life/recipe-book": m.LifeOSRecipeView,
    "/life/certificate-tracker": m.LifeOSCertificateView,
    "/life/travel-backpack": m.LifeOSTravelView,
    "/life/notes": m.LifeOSNotesView,
    "/life/journal": m.LifeOSJournalView,
    "/life/habits": m.LifeOSHabitsView,
    "/life/contacts": m.LifeOSContactsView,
    "/life/subscriptions": m.LifeOSSubscriptionsView,
    "/life/assets": m.LifeOSAssetsView,
  };
  return {
    default: ({ path }: { path: string }) => {
      const Comp = lifeMap[path];
      return Comp ? (
        <m.LifeOSLayout>
          <Comp />
        </m.LifeOSLayout>
      ) : null;
    },
  };
});

// Lazy NonWhite apps dispatcher
const LazyNonWhiteDynamicView = React.lazy(async () => {
  const m = await import("@/features/nonWhiteApps/NonWhiteAppRenderer");
  return {
    default: ({ pathname }: { pathname: string }) => {
      if (pathname === "/syariah/indeks") return <m.CommodityView />;
      if (pathname === "/syariah/akad") return <m.ShariaAkadView />;
      if (pathname === "/syariah/terlarang") return <m.ShariaTerlarangView />;
      if (pathname === "/syariah/asuransi") return <m.ShariaAsuransiView />;
      if (pathname === "/syariah") return <m.CommodityView />;
      if (pathname === "/zakat") return <m.ZakatAppView />;
      if (pathname === "/pajak") return <m.TaxAppView />;
      if (pathname === "/investasi") return <m.InvestmentAppView />;
      if (pathname === "/valuasi") return <m.ValuationView />;
      if (pathname === "/100-komoditas" || pathname === "/commodity-dashboard") return <m.CommodityView />;
      if (pathname === "/incoterms") return <m.IncotermsView />;
      if (pathname === "/water") return <m.WaterView />;
      if (pathname === "/asset") return <m.MatrixAssetView />;
      if (pathname === "/earning") return <m.MatrixEarningView />;
      if (pathname === "/liability") return <m.MatrixLiabilityView />;
      if (pathname === "/expense") return <m.MatrixExpenseView />;
      if (pathname === "/financial-health") return <m.MatrixFinancialHealthView />;
      if (pathname === "/swot") return <m.MatrixSwotView />;
      if (pathname === "/tows") return <m.MatrixTowsView />;
      if (pathname === "/grow") return <m.SpectrumStageView stage="grow" />;
      if (pathname === "/flow") return <m.SpectrumStageView stage="flow" />;
      if (pathname === "/build") return <m.SpectrumStageView stage="build" />;
      if (pathname === "/legacy") return <m.SpectrumStageView stage="legacy" />;
      if (pathname === "/surety") return <m.SpectrumStageView stage="surety" />;
      if (pathname === "/development") return <m.SocietyView type="development" />;
      if (pathname === "/improvement") return <m.SocietyView type="improvement" />;
      if (pathname === "/reliance") return <m.SocietyView type="reliance" />;
      if (pathname === "/sufficient") return <m.SocietyView type="sufficient" />;
      if (pathname === "/interact") return <m.SocietyView type="interact" />;
      if (pathname === "/interdependence") return <m.SocietyView type="interdependence" />;
      if (pathname === "/interest") return <m.SocietyView type="interest" />;
      if (pathname === "/intersect") return <m.SocietyView type="intersect" />;
      if (pathname === "/insider") return <m.SocietyView type="insider" />;
      if (pathname === "/insight") return <m.SocietyView type="insight" />;
      if (pathname === "/outward") return <m.SocietyView type="outward" />;
      if (pathname === "/outlook") return <m.SocietyView type="outlook" />;
      if (pathname === "/klien") return <m.KlienWorkspaceView />;
      if (pathname === "/catatan") return <m.CatatanView />;
      if (pathname === "/lainnya") return <m.LainnyaView />;

      const wiraKeys = [
        "budget", "code", "contacts", "courses", "design", "exams",
        "flashcards", "games", "health", "ideas", "inventory", "journal",
        "kalkulator", "languages", "movies", "music", "passwords", "photography",
        "podcasts", "proyek-personal", "reading", "recipes", "shopping",
        "subscriptions", "trips", "weather", "workouts", "writing"
      ];
      const matchedWira = wiraKeys.find((k) => pathname === "/" + k);
      if (matchedWira) {
        return <m.WiraView type={matchedWira} />;
      }

      return null;
    },
  };
});

function PartnerAreaPlaceholder() {
  return (
    <AppShell title="Ruang Kerja Mitra" subtitle="Akses Khusus Mitra DNA Consulting">
      <div className="w-full max-w-4xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-xs text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Ruang Kerja Mitra</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Halaman ruang kerja mitra belum diaktifkan pada tahap ini. Hubungi administrator untuk informasi akses kemitraan.
        </p>
      </div>
    </AppShell>
  );
}

function PortalAreaPlaceholder() {
  return (
    <AppShell title="Portal Klien" subtitle="Pusat Kolaborasi Klien & Proyek">
      <div className="w-full max-w-4xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-xs text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Portal Klien</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Halaman portal klien belum diaktifkan pada tahap ini. Hubungi konsultan pembimbing Anda untuk deliverables proyek.
        </p>
      </div>
    </AppShell>
  );
}

function AksesDitolakPlaceholder() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-destructive/20 rounded-2xl p-6 shadow-sm text-center space-y-4">
        <h1 className="text-xl font-bold text-destructive">Akses Ditolak</h1>
        <p className="text-muted-foreground text-sm">
          Sesi Anda tidak valid atau tidak memiliki izin untuk mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}

function DynamicAppView() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const pathname = routerState.location.pathname.replace(/\/$/, "");
  const search = (routerState.location.search || {}) as Record<string, any>;
  const currentAppParam = typeof search?.app === "string" ? search.app : "";

  // 1. PEH routes
  if (pathname.startsWith("/peh/")) {
    return (
      <Suspense fallback={<RouteLoadingFallback message="Memuat modul PEH..." />}>
        <LazyPehDynamicView path={pathname} />
      </Suspense>
    );
  }

  // 2. LifeOS routes
  if (pathname.startsWith("/life/")) {
    return (
      <Suspense fallback={<RouteLoadingFallback message="Memuat Life OS..." />}>
        <LazyLifeDynamicView path={pathname} />
      </Suspense>
    );
  }

  // 3. Value Treated & Finance
  if (pathname === "/value-treated" || pathname === "/applied-value") {
    return <LazyValueTreatedPage />;
  }
  if (pathname === "/10-indeks" || pathname === "/indeks-pembangunan") {
    return <LazyNationalIndicesDashboard />;
  }

  // 4. Framework Views
  const frameworkMap: Record<string, string> = {
    "/bcg": "BCG Matrix",
    "/pestel": "PESTEL Analysis",
    "/porter": "Porter's Five Forces",
    "/ge-mckinsey": "GE McKinsey Matrix",
    "/ansoff": "Ansoff Matrix",
    "/blue-ocean": "Blue Ocean Strategy",
    "/bmc": "Business Model Canvas (BMC)",
    "/lean-canvas": "Lean Canvas",
    "/value-proposition-canvas": "Value Proposition Canvas",
    "/customer-journey-map": "Customer Journey Map",
    "/empathy-map": "Empathy Map",
    "/kano-model": "Kano Model",
    "/marketing-mix": "Marketing Mix (7P/4P)",
    "/product-life-cycle": "Product Life Cycle",
    "/stp": "STP (Segmentation, Targeting, Positioning)",
    "/value-chain": "Value Chain Analysis",
    "/value-disciplines": "Value Disciplines",
    "/vrio": "VRIO Framework",
    "/100-framework": "Katalog 100 Framework",
  };
  if (frameworkMap[pathname]) {
    return <LazyFrameworkByNameView name={frameworkMap[pathname]} />;
  }

  // 5. Standalone app requested via query or path
  const effectiveAppKey = currentAppParam || (pathname.startsWith("/") ? pathname.slice(1) : pathname);
  if (effectiveAppKey && STANDALONE_APPS[effectiveAppKey]) {
    const standaloneConfig = STANDALONE_APPS[effectiveAppKey];
    return (
      <AppShell title={standaloneConfig.title} subtitle={standaloneConfig.subtitle}>
        <div className="w-full">
          <LazyStandaloneAppView appId={effectiveAppKey} />
        </div>
      </AppShell>
    );
  }

  // 6. Non-white apps fallback (Syariah, Quadrants, Society, Wira, Klien, Catatan, Lainnya)
  const isNonWhiteCandidate =
    pathname.startsWith("/syariah") ||
    pathname === "/zakat" ||
    pathname === "/pajak" ||
    pathname === "/investasi" ||
    pathname === "/valuasi" ||
    pathname === "/100-komoditas" ||
    pathname === "/commodity-dashboard" ||
    pathname === "/incoterms" ||
    pathname === "/water" ||
    pathname === "/asset" ||
    pathname === "/earning" ||
    pathname === "/liability" ||
    pathname === "/expense" ||
    pathname === "/financial-health" ||
    pathname === "/swot" ||
    pathname === "/tows" ||
    ["/grow", "/flow", "/build", "/legacy", "/surety"].includes(pathname) ||
    [
      "/development", "/improvement", "/reliance", "/sufficient",
      "/interact", "/interdependence", "/interest", "/intersect",
      "/insider", "/insight", "/outward", "/outlook"
    ].includes(pathname) ||
    pathname === "/klien" ||
    pathname === "/catatan" ||
    pathname === "/lainnya" ||
    [
      "/budget", "/code", "/contacts", "/courses", "/design", "/exams",
      "/flashcards", "/games", "/health", "/ideas", "/inventory", "/journal",
      "/kalkulator", "/languages", "/movies", "/music", "/passwords", "/photography",
      "/podcasts", "/proyek-personal", "/reading", "/recipes", "/shopping",
      "/subscriptions", "/trips", "/weather", "/workouts", "/writing"
    ].includes(pathname);

  if (isNonWhiteCandidate) {
    return (
      <Suspense fallback={<RouteLoadingFallback message="Memuat modul..." />}>
        <LazyNonWhiteDynamicView pathname={pathname} />
      </Suspense>
    );
  }

  // 7. Fallback: search nav for matching metadata
  let matchedItem: NavItem | undefined;
  let matchedGroupTitle = "Workspace";
  for (const group of navKonsultan) {
    for (const item of group.items) {
      if (item.to === pathname || (currentAppParam && item.to.includes(currentAppParam))) {
        matchedItem = item;
        matchedGroupTitle = group.title;
        break;
      }
    }
    if (matchedItem) break;
  }

  const title = matchedItem?.label || currentAppParam || pathname.replace("/", "").replace(/-/g, " ");

  return (
    <AppShell title={title} subtitle={matchedGroupTitle + " — All in One Workspace"}>
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border rounded-[1.25rem] p-4 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/" })}
              className="p-2.5 rounded-xl border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Kembali ke Launcher"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                {matchedGroupTitle}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground capitalize mt-1">
                {title}
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/" })}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
          >
            Beranda Launcher
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export function createDynamicRoutes(parentRoute: AnyRoute) {
  return [
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/partner",
      component: PartnerAreaPlaceholder,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/portal",
      component: PortalAreaPlaceholder,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/akses-ditolak",
      component: AksesDitolakPlaceholder,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "$",
      component: DynamicAppView,
    }),
  ];
}
