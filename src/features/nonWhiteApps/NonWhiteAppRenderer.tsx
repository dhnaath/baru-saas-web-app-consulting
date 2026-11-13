import React, { useEffect, useState } from "react";
import { useNavigate, useRouterState, Navigate } from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { ShellSections } from "@/app/shell-sections";

// Syariah imports
import IslamicContracts from "@/features/syariah/components/IslamicContracts";
import ProhibitedTransactions from "@/features/syariah/components/ProhibitedTransactions";
import IslamicInsurance from "@/features/syariah/components/IslamicInsurance";
import { StandaloneZakatApp } from "@/features/zakat/components/ZakatStandaloneViews";

// Value Treated & Finance imports
import { StandaloneTaxApp } from "@/features/tax/components/TaxStandaloneViews";
import { StandaloneInvestmentApp } from "@/features/investment/components/InvestmentStandaloneViews";
import ValuationApp from "@/features/valuation/App";
import { CommodityDashboard } from "@/routes/commodity-dashboard";
import IncotermsApp from "@/features/incoterms/App";
import WaterApp from "@/features/water/App";

// Matrices imports
import { AssetMatrix } from "@/features/matriks/asset-matrix";
import { EarningMatrix } from "@/features/matriks/earning-matrix";
import { LiabilityMatrix } from "@/features/matriks/liability-matrix";
import { ExpenseMatrix } from "@/features/matriks/expense-matrix";
import { FinancialHealthMatrix } from "@/features/matriks/financial-health-matrix";
import { SWOTMatrix } from "@/features/matriks/swot-matrix";
import { TOWSMatrix } from "@/features/matriks/tows-matrix";
import { FrameworkView } from "@/features/matriks/framework-view";

// Spectrum stages imports
import { GrowView } from "@/features/finance/views/GrowView";
import { FlowView } from "@/features/finance/views/FlowView";
import { BuildView } from "@/features/finance/views/BuildView";
import { LegacyView } from "@/features/finance/views/LegacyView";
import { SuretyView } from "@/features/finance/views/SuretyView";

// Society imports
import { DevelopmentView } from "@/features/society/stages/DevelopmentView";
import { ImprovementView } from "@/features/society/stages/ImprovementView";
import { RelianceView } from "@/features/society/stages/RelianceView";
import { SufficientView } from "@/features/society/stages/SufficientView";
import { InteractView } from "@/features/society/mutual/InteractView";
import { InterdependenceView } from "@/features/society/mutual/InterdependenceView";
import { InterestView } from "@/features/society/mutual/InterestView";
import { IntersectView } from "@/features/society/mutual/IntersectView";
import { InsiderView } from "@/features/society/overview/InsiderView";
import { OutwardView } from "@/features/society/overview/OutwardView";

// Wira / Personal views imports
import { BudgetView } from "@/features/wira/components/views/BudgetView";
import { CodeView } from "@/features/wira/components/views/CodeView";
import { ContactsView } from "@/features/wira/components/views/ContactsView";
import { CoursesView } from "@/features/wira/components/views/CoursesView";
import { DesignView } from "@/features/wira/components/views/DesignView";
import { ExamsView } from "@/features/wira/components/views/ExamsView";
import { FlashcardsView } from "@/features/wira/components/views/FlashcardsView";
import { GamesView } from "@/features/wira/components/views/GamesView";
import { HealthView } from "@/features/wira/components/views/HealthView";
import { IdeasView } from "@/features/wira/components/views/IdeasView";
import { InventoryView } from "@/features/wira/components/views/InventoryView";
import { JournalView } from "@/features/wira/components/views/JournalView";
import { KalkulatorUmumView } from "@/features/wira/components/views/KalkulatorUmumView";
import { LanguagesView } from "@/features/wira/components/views/LanguagesView";
import { MoviesView } from "@/features/wira/components/views/MoviesView";
import { MusicView } from "@/features/wira/components/views/MusicView";
import { PasswordsView } from "@/features/wira/components/views/PasswordsView";
import { PhotographyView } from "@/features/wira/components/views/PhotographyView";
import { PodcastsView } from "@/features/wira/components/views/PodcastsView";
import { ProjectsView } from "@/features/wira/components/views/ProjectsView";
import { ReadingListView } from "@/features/wira/components/views/ReadingListView";
import { RecipesView } from "@/features/wira/components/views/RecipesView";
import { ShoppingListView } from "@/features/wira/components/views/ShoppingListView";
import { SubscriptionsView } from "@/features/wira/components/views/SubscriptionsView";
import { TripsView } from "@/features/wira/components/views/TripsView";
import { WeatherView } from "@/features/wira/components/views/WeatherView";
import { WorkoutsView } from "@/features/wira/components/views/WorkoutsView";
import { WritingView } from "@/features/wira/components/views/WritingView";

// Lainnya workspace
import { LainnyaWorkspace } from "@/features/standalone/LainnyaWorkspace";
import { HalamanKlien } from "@/features/klien/HalamanKlien";
import { HalamanCatatan } from "@/features/klien/HalamanCatatan";

// 1. Sharia Views
export function ShariaIndicesView() {
  return <Navigate to="/100-komoditas" replace />;
}

export function ShariaDashboardView() {
  return <Navigate to="/100-komoditas" replace />;
}

export function ShariaAkadView() {
  const routerState = useRouterState();
  const search = (routerState.location.search || {}) as Record<string, any>;
  const appParam = typeof search.app === "string" ? search.app : undefined;
  const navigate = useNavigate();

  return (
    <AppShell title="Akad Syariah & Muamalah" subtitle="Referensi akad-akad syariah dan modul aplikasi standalone transaksi bisnis">
      <div className="w-full">
        <IslamicContracts
          initialAkad={appParam as any}
          onNavigateAkad={(newAkad) => {
            navigate({
              to: "/syariah/akad",
              search: newAkad ? { app: newAkad } : {},
            } as any);
          }}
        />
      </div>
    </AppShell>
  );
}

export function ShariaTerlarangView() {
  const routerState = useRouterState();
  const search = (routerState.location.search || {}) as Record<string, any>;
  const appParam = typeof search.app === "string" ? search.app : undefined;
  const navigate = useNavigate();

  return (
    <AppShell title="Transaksi Terlarang" subtitle="Daftar larangan utama dalam muamalah dan modul aplikasi standalone">
      <div className="w-full">
        <ProhibitedTransactions
          initialProhibited={appParam as any}
          onNavigateProhibited={(newItem) => {
            navigate({
              to: "/syariah/terlarang",
              search: newItem ? { app: newItem } : {},
            } as any);
          }}
        />
      </div>
    </AppShell>
  );
}

export function ShariaAsuransiView() {
  return (
    <AppShell title="Asuransi Syariah (Takaful)" subtitle="Prinsip tolong-menolong (ta'awun) dan proteksi bebas riba-gharar">
      <div className="w-full">
        <IslamicInsurance />
      </div>
    </AppShell>
  );
}

export function ZakatAppView() {
  const routerState = useRouterState();
  const search = (routerState.location.search || {}) as Record<string, any>;
  const zakatParam = (typeof search.app === "string" ? search.app : "penghasilan") as any;
  const navigate = useNavigate();

  return (
    <AppShell title="Zakat, Infaq & Sedekah" subtitle="Kalkulator zakat penghasilan, zakat maal, dan zakat fitrah sesuai nishab">
      <div className="w-full">
        <StandaloneZakatApp
          zakatId={zakatParam}
          onNavigateZakat={(newId) => {
            navigate({
              to: "/zakat",
              search: { app: newId },
            } as any);
          }}
        />
      </div>
    </AppShell>
  );
}

// 2. Tax & Investment Views
export function TaxAppView() {
  const routerState = useRouterState();
  const search = (routerState.location.search || {}) as Record<string, any>;
  const taxParam = (typeof search.app === "string" ? search.app : "pph21") as any;
  const navigate = useNavigate();

  return (
    <AppShell title="Kalkulator & Manajemen Pajak" subtitle="PPh 21 TER, Saham-Dividen, Properti BPHTB, dan PPN">
      <div className="w-full">
        <StandaloneTaxApp
          appId={taxParam}
          onNavigateApp={(newId) => {
            navigate({
              to: "/pajak",
              search: { app: newId },
            } as any);
          }}
        />
      </div>
    </AppShell>
  );
}

export function InvestmentAppView() {
  const routerState = useRouterState();
  const search = (routerState.location.search || {}) as Record<string, any>;
  const invParam = (typeof search.app === "string" ? search.app : "bunga-majemuk") as any;
  const navigate = useNavigate();

  return (
    <AppShell title="Analisis & Kalkulator Investasi" subtitle="Simulasi bunga majemuk, CAGR, ROI, dan proyeksi kekayaan">
      <div className="w-full">
        <StandaloneInvestmentApp
          appId={invParam}
          onNavigateApp={(newId) => {
            navigate({
              to: "/investasi",
              search: { app: newId },
            } as any);
          }}
        />
      </div>
    </AppShell>
  );
}

// 3. Valuation & Commodity Views
export function ValuationView() {
  return (
    <AppShell title="Valuasi MAPPI" subtitle="Penilaian & Analisis Standar Properti dan Bisnis">
      <div className="w-full">
        <ValuationApp />
      </div>
    </AppShell>
  );
}

export function CommodityView() {
  return <CommodityDashboard />;
}

export function IncotermsView() {
  return (
    <AppShell title="Panduan Incoterms 2020" subtitle="Standar aturan perdagangan internasional ICC">
      <div className="w-full">
        <IncotermsApp />
      </div>
    </AppShell>
  );
}

export function WaterView() {
  return (
    <AppShell title="Water Tracker" subtitle="Pencatatan hidrasi harian dan kesehatan tubuh">
      <div className="w-full">
        <WaterApp />
      </div>
    </AppShell>
  );
}

// 4. Matrix Views
export function MatrixAssetView() {
  return (
    <AppShell title="Kuadran Aset" subtitle="Pemetaan aset likuid, investasi, properti, dan bisnis">
      <div className="w-full">
        <AssetMatrix />
      </div>
    </AppShell>
  );
}

export function MatrixEarningView() {
  return (
    <AppShell title="Kuadran Pendapatan" subtitle="Analisis sumber pemasukan aktif, portofolio, dan pasif">
      <div className="w-full">
        <EarningMatrix />
      </div>
    </AppShell>
  );
}

export function MatrixLiabilityView() {
  return (
    <AppShell title="Kuadran Liabilitas" subtitle="Struktur utang jangka pendek, jangka panjang, dan beban cicilan">
      <div className="w-full">
        <LiabilityMatrix />
      </div>
    </AppShell>
  );
}

export function MatrixExpenseView() {
  return (
    <AppShell title="Kuadran Pengeluaran" subtitle="Manajemen biaya tetap, biaya variabel, dan alokasi konsumsi">
      <div className="w-full">
        <ExpenseMatrix />
      </div>
    </AppShell>
  );
}

export function MatrixFinancialHealthView() {
  return (
    <AppShell title="Financial Health Matrix" subtitle="Skor kesehatan finansial, rasio likuiditas, dan solvabilitas">
      <div className="w-full">
        <FinancialHealthMatrix />
      </div>
    </AppShell>
  );
}

export function MatrixSwotView() {
  return (
    <AppShell title="SWOT Matrix" subtitle="Analisis Strengths, Weaknesses, Opportunities, Threats">
      <div className="w-full">
        <SWOTMatrix />
      </div>
    </AppShell>
  );
}

export function MatrixTowsView() {
  return (
    <AppShell title="TOWS Matrix" subtitle="Strategi SO, WO, ST, WT">
      <div className="w-full">
        <TOWSMatrix />
      </div>
    </AppShell>
  );
}

const SPECTRUM_SUB_ROUTE_MAP: Record<
  "grow" | "flow" | "build" | "legacy" | "surety",
  Record<string, Record<string, string>>
> = {
  surety: {
    cat_kepatuhan: { audit: "legal", regulasi: "legal" },
    cat_publik: { bpjs: "general_ins" },
    cat_asuransi: { kesehatan: "insurance", jiwa: "term_life" },
    cat_dana: { darurat: "emergency_fund" },
    cat_proteksi: { vault: "protection" },
  },
  flow: {
    cat_liabilitas: { rasio: "cat_liabilitas" },
    cat_otomatisasi: { autodebet: "savings" },
  },
  build: {
    cat_modal: { skill: "human_capital", karier: "human_capital" },
    cat_pembukuan: { neraca: "reports", jurnal: "reports" },
  },
  grow: {
    cat_profil: { toleransi: "risk_profile" },
    cat_rebalance: { deviasi: "rebalance", jadwal: "rebalance" },
  },
  legacy: {
    cat_pembelajaran: { literasi: "literacy_hub", filosofi: "literacy_hub" },
    cat_tatakelola: { struktur: "governance" },
    cat_likuidasi: { pelunasan: "liquidation" },
    cat_transfer: { suksesi: "succession" },
  },
};

const SPECTRUM_CHILD_TO_PARENT: Record<
  "grow" | "flow" | "build" | "legacy" | "surety",
  Record<string, string>
> = {
  surety: {
    legal: "cat_kepatuhan",
    doc_vault: "cat_kepatuhan",
    general_ins: "cat_publik",
    claims: "cat_publik",
    vehicle_property: "cat_publik",
    insurance: "cat_asuransi",
    ci: "cat_asuransi",
    calc_insurance: "cat_asuransi",
    insurance_gap: "cat_asuransi",
    unit_link: "cat_asuransi",
    term_life: "cat_asuransi",
    endowment: "cat_asuransi",
    health_risk: "cat_asuransi",
    health: "cat_asuransi",
    emergency_fund: "cat_dana",
    retirement: "cat_dana",
    sinking_fund: "cat_dana",
    protection: "cat_proteksi",
    security: "cat_proteksi",
    beneficiary: "cat_proteksi",
  },
  flow: {
    liability: "cat_liabilitas",
    snowball: "cat_liabilitas",
    monthly_burden: "cat_liabilitas",
    emi_calculator: "cat_liabilitas",
    bill_reminders: "cat_liabilitas",
    transactions: "cat_pengeluaran",
    cashflow: "cat_pengeluaran",
    cashflow_forecast: "cat_pengeluaran",
    budget: "cat_pengeluaran",
    expense_cat: "cat_pengeluaran",
    split_bill: "cat_pengeluaran",
    liquidity: "cat_kredit",
    bank_sync: "cat_kredit",
    tax: "cat_pajak",
    emergency: "cat_pajak",
    tax_harvesting: "cat_pajak",
    savings: "cat_otomatisasi",
  },
  build: {
    human_capital: "cat_modal",
    business_val: "cat_jaringan",
    cap_table: "cat_jaringan",
    portfolio_rec: "cat_portofolio",
    mortgage: "cat_portofolio",
    child_edu: "cat_portofolio",
    net_worth: "cat_kekayaan",
    assets: "cat_kekayaan",
    financial_health: "cat_kekayaan",
    demographic_benchmark: "cat_kekayaan",
    reports: "cat_pembukuan",
  },
  grow: {
    risk_profile: "cat_profil",
    robo_advisor: "cat_profil",
    alloc_visual: "cat_alokasi",
    stock_monitor: "cat_alokasi",
    mutual_fund: "cat_alokasi",
    bonds_sbn: "cat_alokasi",
    gold: "cat_alokasi",
    deposito: "cat_alokasi",
    property: "cat_alokasi",
    p2p: "cat_alokasi",
    crypto: "cat_alokasi",
    forex: "cat_alokasi",
    trading_journal: "cat_efektif",
    dividend_cal: "cat_efektif",
    compounding_dca: "cat_bunga",
    rebalance: "cat_rebalance",
  },
  legacy: {
    literacy_hub: "cat_pembelajaran",
    kids_allowance: "cat_pembelajaran",
    governance: "cat_tatakelola",
    family_charter: "cat_tatakelola",
    trust_fund: "cat_tatakelola",
    family_foundation: "cat_tatakelola",
    philanthropy: "cat_amal",
    donation_hist: "cat_amal",
    liquidation: "cat_likuidasi",
    valuables: "cat_likuidasi",
    succession: "cat_transfer",
    digital_will: "cat_transfer",
    estate_tax: "cat_transfer",
    heir_map: "cat_transfer",
    digital_inheritance: "cat_transfer",
    advisor_guide: "cat_transfer",
  },
};

function resolveSpectrumTab(
  stage: "grow" | "flow" | "build" | "legacy" | "surety",
  rawTab: unknown,
  rawSub: unknown,
  defaultTab: string
): string {
  const baseTab = typeof rawTab === "string" && rawTab.trim() ? rawTab.trim() : defaultTab;
  const subKey = typeof rawSub === "string" && rawSub.trim() ? rawSub.trim().toLowerCase() : "";

  if (stage === "flow" && baseTab === "cat_arus_kas") {
    return "transactions";
  }

  if (subKey) {
    const mapped = SPECTRUM_SUB_ROUTE_MAP[stage]?.[baseTab]?.[subKey];
    if (mapped) return mapped;
  }

  return baseTab;
}

// 5. Spectrum Stages Wrapper
export function SpectrumStageView({ stage }: { stage: "grow" | "flow" | "build" | "legacy" | "surety" }) {
  const routerState = useRouterState();
  const search = (routerState.location.search || {}) as Record<string, any>;
  const navigate = useNavigate();
  const defaultTabs: Record<string, string> = {
    surety: "cat_kepatuhan",
    flow: "cat_liabilitas",
    build: "cat_modal",
    grow: "cat_profil",
    legacy: "cat_pembelajaran",
  };
  const defaultTab = defaultTabs[stage] || "";
  const [tab, setTab] = useState(() =>
    resolveSpectrumTab(stage, search.tab, search.sub, defaultTab)
  );

  useEffect(() => {
    setTab(resolveSpectrumTab(stage, search.tab, search.sub, defaultTab));
  }, [stage, search.tab, search.sub, defaultTab]);

  const handleBack = () => {
    navigate({ to: "/" } as any);
  };

  const handleSelectTab = (newTab: string) => {
    setTab(newTab);
  };

  const titles: Record<string, { title: string; subtitle: string }> = {
    grow: { title: "Tahap 4: Grow", subtitle: "Pertumbuhan & Multiplikasi Kekayaan" },
    flow: { title: "Tahap 2: Flow", subtitle: "Aliran Kas & Pengelolaan Likuiditas" },
    build: { title: "Tahap 3: Build", subtitle: "Pembentukan Portofolio & Aset Produktif" },
    legacy: { title: "Tahap 5: Legacy", subtitle: "Warisan, Tata Kelola & Kontribusi Amal" },
    surety: { title: "Tahap 1: Surety", subtitle: "Fondasi, Proteksi & Dana Darurat" },
  };

  const stageInfo = titles[stage] || { title: stage.toUpperCase(), subtitle: "Tahapan Wealth Spectrum" };

  // Per-stage category tabs (ids/labels mirror nav.ts "Wealth Spectrum" deep-links).
  const stageTabs: Record<string, { id: string; label: string }[]> = {
    surety: [
      { id: "cat_kepatuhan", label: "Kepatuhan Hukum" },
      { id: "cat_publik", label: "Perlindungan Publik" },
      { id: "cat_asuransi", label: "Asuransi Pribadi" },
      { id: "cat_dana", label: "Kecukupan Dana" },
      { id: "cat_proteksi", label: "Proteksi Aset" },
    ],
    flow: [
      { id: "cat_liabilitas", label: "Beban Liabilitas" },
      { id: "cat_pengeluaran", label: "Pemasukan-Pengeluaran" },
      { id: "cat_kredit", label: "Kas-Kredit" },
      { id: "cat_pajak", label: "Retribusi-Kontribusi" },
      { id: "cat_otomatisasi", label: "Sistem Otomatisasi" },
    ],
    build: [
      { id: "cat_modal", label: "Modal Manusia" },
      { id: "cat_jaringan", label: "Jaringan" },
      { id: "cat_portofolio", label: "Portofolio" },
      { id: "cat_kekayaan", label: "Kekayaan Bersih" },
      { id: "cat_pembukuan", label: "Pembukuan" },
    ],
    grow: [
      { id: "cat_profil", label: "Profil Risiko" },
      { id: "cat_alokasi", label: "Alokasi" },
      { id: "cat_efektif", label: "Efektif-Efisien" },
      { id: "cat_bunga", label: "Bunga Berbunga" },
      { id: "cat_rebalance", label: "Rebalancing Periodik" },
    ],
    legacy: [
      { id: "cat_pembelajaran", label: "Pembelajaran Seumur Hidup" },
      { id: "cat_tatakelola", label: "Tata Kelola yang Baik" },
      { id: "cat_amal", label: "Kontribusi Amal" },
      { id: "cat_likuidasi", label: "Likuidasi Kewajiban" },
      { id: "cat_transfer", label: "Transfer Kekayaan" },
    ],
  };
  const activeParentTab = SPECTRUM_CHILD_TO_PARENT[stage]?.[tab] || tab;
  const stageSections = (stageTabs[stage] || []).map((t) => ({
    id: t.id,
    label: t.label,
    active: activeParentTab === t.id,
    onSelect: () => handleSelectTab(t.id),
  }));

  return (
    <AppShell title={stageInfo.title} subtitle={stageInfo.subtitle}>
      <ShellSections sections={stageSections} />
      <div className="w-full -mt-4">
        {stage === "grow" && <GrowView currentTab={tab} onBack={handleBack} onSelectTab={handleSelectTab} />}
        {stage === "flow" && <FlowView currentTab={tab} onBack={handleBack} onSelectTab={handleSelectTab} onNavigate={() => {}} />}
        {stage === "build" && <BuildView currentTab={tab} onBack={handleBack} onSelectTab={handleSelectTab} />}
        {stage === "legacy" && <LegacyView currentTab={tab} onBack={handleBack} onSelectTab={handleSelectTab} />}
        {stage === "surety" && <SuretyView currentTab={tab} onBack={handleBack} onSelectTab={handleSelectTab} />}
      </div>
    </AppShell>
  );
}

// 6. Society Views
export function SocietyView({ type }: { type: string }) {
  const mapping: Record<string, { title: string; subtitle: string; component: React.ReactNode }> = {
    development: {
      title: "Tahap Pengembangan (Development)",
      subtitle: "Evolusi dan milestone perkembangan komunitas",
      component: <DevelopmentView />,
    },
    improvement: {
      title: "Tahap Perbaikan (Improvement)",
      subtitle: "Peningkatan berkelanjutan dan optimasi proses",
      component: <ImprovementView />,
    },
    reliance: {
      title: "Kemandirian (Reliance)",
      subtitle: "Kemandirian sumber daya dan sistem swadaya",
      component: <RelianceView />,
    },
    sufficient: {
      title: "Kecukupan (Sufficient)",
      subtitle: "Pemenuhan kebutuhan dasar dan ketahanan sosial",
      component: <SufficientView />,
    },
    interact: {
      title: "Interaksi Sosial",
      subtitle: "Koneksi, komunikasi, dan dinamika antar anggota",
      component: <InteractView />,
    },
    interdependence: {
      title: "Saling Ketergantungan (Interdependence)",
      subtitle: "Sinergi dan kolaborasi multipihak",
      component: <InterdependenceView />,
    },
    interest: {
      title: "Kepentingan Bersama (Interest)",
      subtitle: "Penyelarasan visi dan tujuan kolektif",
      component: <InterestView />,
    },
    intersect: {
      title: "Titik Temu (Intersect)",
      subtitle: "Pertemuan berbagai disiplin dan kelompok",
      component: <IntersectView />,
    },
    insider: {
      title: "Wawasan Internal (Insider)",
      subtitle: "Pandangan tata kelola, audit, dan kepatuhan dari dalam",
      component: <InsiderView />,
    },
    insight: {
      title: "Wawasan Strategis (Insight)",
      subtitle: "Intelijen bisnis, analisis data, dan sintesis tren mendalam",
      component: <InsiderView />,
    },
    outward: {
      title: "Perspektif Eksternal (Outward)",
      subtitle: "Dampak sosial, reputasi publik, dan hubungan luar",
      component: <OutwardView />,
    },
    outlook: {
      title: "Prospek Masa Depan (Outlook)",
      subtitle: "Proyeksi jangka panjang, skenario masa depan, dan peramalan strategis",
      component: <OutwardView />,
    },
  };

  const item = mapping[type] || {
    title: type,
    subtitle: "Modul Masyarakat & Komunitas",
    component: <div className="p-8 text-center text-muted-foreground">Modul sedang dimuat...</div>,
  };

  return (
    <AppShell title={item.title} subtitle={item.subtitle}>
      <div className="w-full">{item.component}</div>
    </AppShell>
  );
}

// 7. Wira Personal & Productivity Views
export function WiraView({ type }: { type: string }) {
  const views: Record<string, { title: string; subtitle: string; comp: React.ReactNode }> = {
    budget: { title: "Budget & Anggaran", subtitle: "Perencanaan keuangan dan alokasi dana", comp: <BudgetView /> },
    code: { title: "Code & Dev", subtitle: "Snippet dan catatan teknis pengembangan", comp: <CodeView /> },
    contacts: { title: "Kontak & Relasi", subtitle: "Buku kontak keluarga, rekanan, dan mitra", comp: <ContactsView /> },
    courses: { title: "Kursus & Pembelajaran", subtitle: "Pelacakan kursus dan silabus belajar", comp: <CoursesView /> },
    design: { title: "Studio Desain", subtitle: "Inspirasi, moodboard, dan aset visual", comp: <DesignView /> },
    exams: { title: "Jadwal Ujian", subtitle: "Persiapan ujian, sertifikasi, dan asesmen", comp: <ExamsView /> },
    flashcards: { title: "Flashcards", subtitle: "Metode kartu memori untuk belajar cepat", comp: <FlashcardsView /> },
    games: { title: "Game & Hiburan", subtitle: "Katalog permainan dan aktivitas rekreasi", comp: <GamesView /> },
    health: { title: "Kesehatan", subtitle: "Catatan vitalitas, medis, dan gaya hidup sehat", comp: <HealthView /> },
    ideas: { title: "Bank Ide & Kreativitas", subtitle: "Catatan ide bisnis dan inovasi", comp: <IdeasView /> },
    inventory: { title: "Inventaris Barang", subtitle: "Pencatatan aset fisik dan perlengkapan", comp: <InventoryView /> },
    journal: { title: "Jurnal Harian", subtitle: "Refleksi harian, journaling, dan diary", comp: <JournalView /> },
    kalkulator: { title: "Kalkulator Umum", subtitle: "Alat hitung multifungsi", comp: <KalkulatorUmumView /> },
    languages: { title: "Belajar Bahasa", subtitle: "Kosakata dan latihan percakapan", comp: <LanguagesView /> },
    movies: { title: "Film & Serial", subtitle: "Daftar tontonan dan review film favorit", comp: <MoviesView /> },
    music: { title: "Musik & Audio", subtitle: "Playlist, instrumen, dan koleksi musik", comp: <MusicView /> },
    passwords: { title: "Pengelola Sandi", subtitle: "Penyimpanan kredensial aman", comp: <PasswordsView /> },
    photography: { title: "Fotografi", subtitle: "Galeri, lensa, dan ide pemotretan", comp: <PhotographyView /> },
    podcasts: { title: "Podcast & Audio", subtitle: "Episode dan rekaman audio pilihan", comp: <PodcastsView /> },
    "proyek-personal": { title: "Proyek Pribadi", subtitle: "Pelacakan inisiatif dan side-project", comp: <ProjectsView /> },
    reading: { title: "Daftar Bacaan (Reading List)", subtitle: "Buku, artikel, dan bacaan esensial", comp: <ReadingListView /> },
    recipes: { title: "Resep Kuliner", subtitle: "Resep masakan, bahan, dan cara pembuatan", comp: <RecipesView /> },
    shopping: { title: "Daftar Belanja", subtitle: "Item kebutuhan dapur dan rumah tangga", comp: <ShoppingListView /> },
    subscriptions: { title: "Langganan & Servis", subtitle: "Pengingat tagihan langganan rutin", comp: <SubscriptionsView /> },
    trips: { title: "Rencana Perjalanan (Trips)", subtitle: "Itinerari liburan dan tiket perjalanan", comp: <TripsView /> },
    weather: { title: "Cuaca & Iklim", subtitle: "Prakiraan cuaca dan kondisi harian", comp: <WeatherView /> },
    workouts: { title: "Latihan & Kebugaran", subtitle: "Program olahraga dan rutinitas workout", comp: <WorkoutsView /> },
    writing: { title: "Menulis & Artikel", subtitle: "Editor tulisan, naskah, dan publikasi", comp: <WritingView /> },
  };

  const item = views[type] || {
    title: type,
    subtitle: "Aplikasi Terpadu",
    comp: <div className="p-8 text-center text-muted-foreground">Modul sedang dimuat...</div>,
  };

  return (
    <AppShell title={item.title} subtitle={item.subtitle}>
      <div className="w-full">{item.comp}</div>
    </AppShell>
  );
}

// 8. Framework Dispatcher
export function FrameworkByNameView({ name }: { name: string }) {
  return <FrameworkView frameworkName={name} />;
}

// 9. Lainnya Workspace View
export function LainnyaView() {
  return <LainnyaWorkspace />;
}

export function KlienWorkspaceView() {
  return <HalamanKlien />;
}

export function CatatanView() {
  return <HalamanCatatan />;
}
