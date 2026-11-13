/**
 * SINGLE SOURCE OF TRUTH — WORKSPACE PAGES TAXONOMY
 *
 * Defines the 10 Master Workspaces + Phase Side pages, their modules,
 * and individual features/tools for the sidebar pillars navigation and launcher.
 * Extracted from SidebarPillarsMenu.tsx in Fase 3 refactoring.
 */

import {
  Coins,
  Store,
  Briefcase,
  Palette,
  GraduationCap,
  Scale,
  Heart,
  Home,
  Landmark,
  Users,
  ShieldCheck,
  Wallet,
  Building,
  TrendingUp,
  BookOpen,
  DollarSign,
  Receipt,
  ShoppingCart,
  Grid2X2,
  Package,
  MessagesSquare,
  Clock,
  LineChart,
  Target,
  CheckCircle2,
  FolderKanban,
  ShieldAlert,
  LayoutGrid,
  Film,
  PenTool,
  Activity,
  Camera,
  Code,
  Compass,
  NotebookText,
  HeartHandshake,
  FileCheck,
  Flame,
  Dumbbell,
  Key,
  GitFork,
  Utensils,
  Car,
  CalendarDays,
  Star,
  CheckSquare,
  HeartPulse,
  Banknote,
  Network,
  Lightbulb,
  PieChart,
  Layers,
  Gift,
  Calculator,
  Sparkles,
  Workflow,
  Eye,
  Shield,
  Book,
  type LucideIcon,
} from "lucide-react";
import { STANDALONE_FINANCIAL_APPS } from "@/features/launcher/FinancialWealthSection";
import {
  BIZ_OPS_SUMMARY_DESC,
  BIZ_OPS_TOTAL_BADGE,
} from "@/features/business-operations/BusinessOperationsCustomersPage";

export type WorkspaceFeatureCategory =
  | "Features"
  | "Tools"
  | "Dashboards"
  | "Workflows"
  | "Automations"
  | "Templates"
  | "Analytics"
  | "Records"
  | "Settings"
  | "Guides";

export interface WorkspaceFeatureItem {
  title: string;
  to: string;
  icon: LucideIcon;
  desc?: string;
  componentCategory?: WorkspaceFeatureCategory;
}

export interface WorkspaceModuleItem {
  id: string;
  title: string;
  to: string;
  icon: LucideIcon;
  desc?: string;
  badge?: string;
  categoryLabel?: string;
  features?: WorkspaceFeatureItem[];
}

export interface WorkspacePageDef {
  id: string;
  modeId: string;
  label: string;
  badge: string;
  desc: string;
  icon: LucideIcon;
  modules: WorkspaceModuleItem[];
}

// 1. Modul Persis dari Launcher Financial Wealth Management (25 Modul Terstruktur)
const FINANCIAL_MODULES: WorkspaceModuleItem[] = STANDALONE_FINANCIAL_APPS.map((app) => ({
  id: app.id,
  title: app.title,
  to: app.to,
  icon: app.icon,
  desc: app.subtitle,
  categoryLabel: app.categoryLabel,
  features: app.features?.map((f) => ({
    title: f.title,
    to: f.to,
    icon: f.icon,
    desc: f.desc,
    componentCategory: f.componentCategory,
  })) || [],
}));

const FINANCIAL_ITEM_COUNT = FINANCIAL_MODULES.reduce(
  (acc, m) => acc + (m.features?.length || 0),
  0
);

const BIZ_ADMIN_MODULES: WorkspaceModuleItem[] = [
      // 1. Operations (3)
      {
        id: "biz-procurement",
        title: "Procurement Management",
        to: "/peh/vendors",
        icon: Building,
        categoryLabel: "Operations",
        desc: "Pengelolaan direktori vendor dan proses purchase orders",
        features: [
          { title: "Vendor Directory", to: "/peh/vendors", icon: Building, componentCategory: "Records" },
          { title: "Purchase Orders", to: "/peh/procurement", icon: DollarSign, componentCategory: "Workflows" },
        ],
      },
      {
        id: "biz-inventory",
        title: "Inventory Management",
        to: "/katalog-produk",
        icon: Package,
        categoryLabel: "Operations",
        desc: "Katalog produk, pengendalian stok, pelacakan batch, dan logistik rantai dingin",
        features: [
          { title: "Product Catalog", to: "/katalog-produk", icon: Package, componentCategory: "Records" },
          { title: "Inventory", to: "/inventory", icon: Package, componentCategory: "Features" },
          { title: "Batch Track", to: "/lainnya?app=batch-track", icon: ShieldCheck, componentCategory: "Tools" },
          { title: "Cold Chain", to: "/lainnya?app=cold-chain", icon: Clock, componentCategory: "Dashboards" },
        ],
      },
      {
        id: "biz-quality",
        title: "Quality Management",
        to: "/lainnya?app=quality-check",
        icon: ShieldCheck,
        categoryLabel: "Operations",
        desc: "Pemeriksaan mutu, pencatatan insiden, meja tiket, keselamatan kerja, dan panduan SOP",
        features: [
          { title: "Quality Check", to: "/lainnya?app=quality-check", icon: ShieldCheck, componentCategory: "Tools" },
          { title: "Ticket Desk", to: "/lainnya?app=ticket-desk", icon: Workflow, componentCategory: "Workflows" },
          { title: "Incident Log", to: "/lainnya?app=incident-log", icon: ShieldAlert, componentCategory: "Records" },
          { title: "Standard Operating Procedures", to: "/lainnya?app=sop", icon: BookOpen, componentCategory: "Guides" },
          { title: "Keselamatan Kerja", to: "/peh/compliance", icon: ShieldCheck, desc: "Pemantauan keselamatan dan kesehatan kerja.", componentCategory: "Features" },
        ],
      },
      // 2. Customers (2)
      {
        id: "biz-client",
        title: "Client Management",
        to: "/klien",
        icon: Briefcase,
        categoryLabel: "Customers",
        desc: "Pengelolaan akun klien, relasi partner usaha, prospek, dan kontak CRM",
        features: [
          { title: "Client Directory", to: "/klien", icon: Briefcase, componentCategory: "Records" },
          { title: "Klien dan Partner", to: "/klien", icon: Users, desc: "Relasi klien dan mitra usaha untuk pengelolaan kerja sama bisnis.", componentCategory: "Records" },
          { title: "Contact Management", to: "/contacts", icon: Users, componentCategory: "Features" },
        ],
      },
      {
        id: "biz-customer",
        title: "Customer Service Management",
        to: "/portal",
        icon: MessagesSquare,
        categoryLabel: "Customers",
        desc: "Portal kolaborasi klien, pesan, histori interaksi, umpan balik, antrean layanan, reservasi, buku tamu, loyalitas, keanggotaan, pesanan, dan tarif layanan",
        features: [
          { title: "Client Portal", to: "/portal", icon: MessagesSquare, componentCategory: "Features" },
          { title: "Client Messaging", to: "/portal/pesan", icon: MessagesSquare, componentCategory: "Features" },
          { title: "Interaction Log", to: "/interaction-manager", icon: BookOpen, componentCategory: "Records" },
          { title: "Client Feedback", to: "/lainnya?app=feedback-loop", icon: LineChart, componentCategory: "Analytics" },
          { title: "Queue Management", to: "/lainnya?app=queue-line", icon: Clock, componentCategory: "Workflows" },
          { title: "Appointment Booking", to: "/lainnya?app=book-slot", icon: CalendarDays, componentCategory: "Workflows" },
          { title: "Visitor Records", to: "/lainnya?app=visitor-log", icon: Users, componentCategory: "Records" },
          { title: "Loyalty Program", to: "/lainnya?app=loyalty-point", icon: Star, componentCategory: "Features" },
          { title: "Membership Management", to: "/lainnya?app=membership-card", icon: Key, componentCategory: "Features" },
          { title: "Client Orders", to: "/lainnya?app=client-orders", icon: ShoppingCart, componentCategory: "Records" },
          { title: "Service Rates", to: "/lainnya?app=services-ratecard", icon: Receipt, componentCategory: "Templates" },
        ],
      },
      // 3. Administration (3)
      {
        id: "biz-expenses",
        title: "Business Resource Management",
        to: "/expense-tracker",
        icon: Receipt,
        categoryLabel: "Administration",
        desc: "Pencatatan pengeluaran operasional, langganan berkala, alokasi sumber daya, dan pengelolaan aset bisnis",
        features: [
          { title: "Expense Tracker", to: "/expense-tracker", icon: Receipt, componentCategory: "Tools" },
          { title: "Subscription Manager", to: "/subscription-manager", icon: Clock, componentCategory: "Automations" },
          { title: "Asset Manager", to: "/asset-manager", icon: Building, componentCategory: "Records" },
          { title: "Resource Manager", to: "/resource-manager", icon: Layers, componentCategory: "Features" },
        ],
      },
      {
        id: "biz-documents",
        title: "Document Management",
        to: "/lainnya?app=mailroom",
        icon: FileCheck,
        categoryLabel: "Administration",
        desc: "Administrasi korespondensi, template dokumen kerja, format baku, dan formulir digital",
        features: [
          { title: "Correspondence Log", to: "/lainnya?app=mailroom", icon: FileCheck, componentCategory: "Records" },
          { title: "Document Templates", to: "/lainnya?app=templates", icon: BookOpen, componentCategory: "Templates" },
          { title: "Template Manager", to: "/template-manager", icon: Layers, componentCategory: "Templates" },
          { title: "Forms", to: "/forms", icon: CheckSquare, componentCategory: "Tools" },
        ],
      },
      {
        id: "biz-analytics",
        title: "Business Intelligence",
        to: "/statistics",
        icon: LineChart,
        categoryLabel: "Administration",
        desc: "Statistik kinerja operasional, pencarian terpadu, matriks hak akses, dan laporan kustom",
        features: [
          { title: "Statistics", to: "/statistics", icon: LineChart, componentCategory: "Dashboards" },
          { title: "Search Manager", to: "/search-manager", icon: Eye, componentCategory: "Tools" },
          { title: "Access Directory", to: "/lainnya?app=access-matrix", icon: Key, componentCategory: "Settings" },
          { title: "Custom Reports", to: "/lainnya?app=custom-reports", icon: NotebookText, componentCategory: "Analytics" },
        ],
      },
      // 4. Strategy (2)
      {
        id: "biz-performance",
        title: "Performance Management",
        to: "/goal-manager",
        icon: Target,
        categoryLabel: "Strategy",
        desc: "Pengelolaan sasaran OKR/KPI dan evaluasi kinerja berkala",
        features: [
          { title: "Goal Manager", to: "/goal-manager", icon: Target, componentCategory: "Features" },
          { title: "Performance Review", to: "/lainnya?app=retro", icon: CheckCircle2, componentCategory: "Workflows" },
        ],
      },
      {
        id: "biz-framework",
        title: "Strategic Frameworks",
        to: "/100-framework",
        icon: Grid2X2,
        categoryLabel: "Strategy",
        desc: "Kerangka 8 Pilar Strategis dan kumpulan lengkap 100 MBA Tools",
        features: [
          { title: "100 MBA Tools", to: "/100-framework", icon: Grid2X2, componentCategory: "Tools" },
          { title: "Valuasi Bisnis MAPPI", to: "/valuasi", icon: Landmark, componentCategory: "Tools" },
          { title: "DCF Calculator", to: "/valuasi?tab=dcf", icon: Calculator, componentCategory: "Tools" },
        ],
      },
      // 5. Organization (2)
      {
        id: "biz-workforce",
        title: "Workforce Management",
        to: "/lainnya?app=time-clock",
        icon: Clock,
        categoryLabel: "Organization",
        desc: "Pencatatan kehadiran, serah terima pekerjaan, pelatihan SDM, dan kapasitas beban kerja",
        features: [
          { title: "Time Clock", to: "/lainnya?app=time-clock", icon: Clock, componentCategory: "Tools" },
          { title: "Workload Planning", to: "/lainnya?app=workload", icon: Activity, componentCategory: "Workflows" },
          { title: "Handover Notes", to: "/lainnya?app=handover-notes", icon: BookOpen, componentCategory: "Records" },
          { title: "Training Track", to: "/lainnya?app=training-track", icon: GraduationCap, componentCategory: "Guides" },
        ],
      },
      {
        id: "biz-governance",
        title: "Corporate Governance",
        to: "/peh/compliance",
        icon: ShieldCheck,
        categoryLabel: "Organization",
        desc: "Pemantauan kepatuhan regulasi, struktur pemegang saham, lisensi HKI, dan pajak usaha",
        features: [
          { title: "Kepatuhan Regulasi", to: "/peh/compliance", icon: ShieldCheck, componentCategory: "Settings" },
          { title: "Shareholder Structure", to: "/peh/cap-table", icon: LayoutGrid, componentCategory: "Records" },
          { title: "Intellectual Property", to: "/peh/ip-licenses", icon: Lightbulb, componentCategory: "Records" },
          { title: "VAT and Other Taxes", to: "/pajak?app=ppn", icon: Receipt, desc: "Referensi dan pengelolaan pajak pertambahan nilai serta pajak usaha lainnya.", componentCategory: "Tools" },
        ],
      },
];

function buildCategoryDesc(
  modules: WorkspaceModuleItem[],
  categories: string[]
): string {
  const parts = [`Semua (${modules.length})`];
  for (const cat of categories) {
    const count = modules.filter((m) => m.categoryLabel === cat).length;
    parts.push(`${cat} (${count})`);
  }
  return parts.join(" · ");
}

const EMPLOYMENT_MODULES: WorkspaceModuleItem[] = [
      {
        id: "emp-milestones",
        title: "Goals & Milestones",
        to: "/peh/milestones",
        icon: Target,
        categoryLabel: "Planning",
        desc: "Target capaian kuartalan dan milestone prioritas tim",
        features: [
          { title: "Active Milestones", to: "/peh/milestones", icon: Target },
          { title: "Target Roadmap", to: "/goal-manager", icon: TrendingUp },
        ],
      },
      {
        id: "emp-workflows",
        title: "Workflow & Delivery Pipeline",
        to: "/peh/workflows",
        icon: CheckCircle2,
        categoryLabel: "Workflow",
        desc: "Siklus alur kerja kanban dan penugasan deliverables",
        features: [
          { title: "Kanban Pipeline", to: "/peh/workflows", icon: CheckCircle2 },
          { title: "Delivery Tasks", to: "/task-manager", icon: CheckSquare },
        ],
      },
      {
        id: "emp-projects",
        title: "Content Production Pipeline",
        to: "/peh/projects",
        icon: FolderKanban,
        categoryLabel: "Workflow",
        desc: "Manajemen proyek editorial dan jadwal publikasi karya",
        features: [
          { title: "Production Projects", to: "/peh/projects", icon: FolderKanban },
          { title: "Publishing Calendar", to: "/schedule-manager", icon: CalendarDays },
        ],
      },
      {
        id: "emp-vendors",
        title: "Vendor & Service Management",
        to: "/peh/vendors",
        icon: Building,
        categoryLabel: "Resources",
        desc: "Daftar vendor eksternal, SLA kerja sama, dan review kinerja",
        features: [
          { title: "Vendor Directory", to: "/peh/vendors", icon: Building },
          { title: "SLA Evaluation", to: "/resource-manager", icon: ShieldCheck },
        ],
      },
      {
        id: "emp-procurement",
        title: "Procurement & Purchase Orders",
        to: "/peh/procurement",
        icon: DollarSign,
        categoryLabel: "Resources",
        desc: "Persetujuan anggaran pengadaan dan pesanan pembelian",
        features: [
          { title: "Purchase Orders", to: "/peh/procurement", icon: DollarSign },
          { title: "Approval Requests", to: "/approval-manager", icon: ShieldCheck },
        ],
      },
      {
        id: "emp-meetings",
        title: "Meetings & Decision Log",
        to: "/peh/meetings",
        icon: CheckSquare,
        categoryLabel: "Coordination",
        desc: "Notula rapat, action item terukur, dan log keputusan organisasi",
        features: [
          { title: "Meeting Minutes", to: "/peh/meetings", icon: CheckSquare },
          { title: "Decision Registry", to: "/decision-log", icon: BookOpen },
        ],
      },
      {
        id: "emp-incidents",
        title: "Issues & Incident Management",
        to: "/peh/incidents",
        icon: ShieldAlert,
        categoryLabel: "Governance",
        desc: "Mitigasi kendala operasional dan eskalasi penanganan insiden",
        features: [
          { title: "Issue Log", to: "/peh/incidents", icon: ShieldAlert },
          { title: "Risk Mitigation", to: "/risk-management", icon: ShieldCheck },
        ],
      },
      {
        id: "emp-compliance",
        title: "Compliance & Regulatory Audit",
        to: "/peh/compliance",
        icon: ShieldCheck,
        categoryLabel: "Governance",
        desc: "Pemeriksaan kepatuhan SOP dan audit kepatuhan legalitas",
        features: [
          { title: "Compliance Check", to: "/peh/compliance", icon: ShieldCheck },
          { title: "Audit Trail", to: "/audit-log", icon: FileCheck },
        ],
      },
      {
        id: "emp-captable",
        title: "Equity & Cap Table",
        to: "/peh/cap-table",
        icon: LayoutGrid,
        categoryLabel: "Ownership",
        desc: "Struktur kepemilikan saham, vesting pendiri, dan modal",
        features: [
          { title: "Cap Table Matrix", to: "/peh/cap-table", icon: LayoutGrid },
          { title: "Shareholders", to: "/shareholder-registry", icon: Users },
    ],
  },
];

const CREATIVE_MODULES: WorkspaceModuleItem[] = [
  {
    id: "cr-design",
    title: "Design Management",
    to: "/design",
    icon: Palette,
    categoryLabel: "Design",
    desc: "Manajemen aset grafis, brand identity, dan visual asset",
    features: [
      { title: "Brand Assets", to: "/design", icon: Palette },
      { title: "Design Guidelines", to: "/design?tab=guidelines", icon: BookOpen },
    ],
  },
  {
    id: "cr-writing",
    title: "Writing and Publishing",
    to: "/writing",
    icon: PenTool,
    categoryLabel: "Publishing",
    desc: "Penyusunan naskah, artikel, dan penerbitan editorial",
    features: [
      { title: "Manuscript Editor", to: "/writing", icon: PenTool },
      { title: "Editorial Pipeline", to: "/writing?tab=pipeline", icon: BookOpen },
    ],
  },
  {
    id: "cr-movies",
    title: "Video Production",
    to: "/movies",
    icon: Film,
    categoryLabel: "Production",
    desc: "Storyboard, jadwal syuting, dan workflow pascaproduksi video",
    features: [
      { title: "Video Projects", to: "/movies", icon: Film },
      { title: "Storyboards", to: "/movies?tab=storyboard", icon: Layers },
    ],
  },
  {
    id: "cr-podcasts",
    title: "Audio Production",
    to: "/podcasts",
    icon: Activity,
    categoryLabel: "Production",
    desc: "Produksi siniar audio, mixing track, dan rilis episode",
    features: [
      { title: "Podcast Episodes", to: "/podcasts", icon: Activity },
      { title: "Audio Assets", to: "/podcasts?tab=audio", icon: SparklesIcon() },
    ],
  },
  {
    id: "cr-photo",
    title: "Photography and Media",
    to: "/photography",
    icon: Camera,
    categoryLabel: "Production",
    desc: "Katalog foto, pemotretan produk, dan kurasi visual portofolio",
    features: [
      { title: "Photo Shoots", to: "/photography", icon: Camera },
      { title: "Media Library", to: "/photography?tab=library", icon: FolderKanban },
    ],
  },
  {
    id: "cr-games",
    title: "Interactive Media",
    to: "/games",
    icon: Code,
    categoryLabel: "Interactive",
    desc: "Pengembangan media interaktif, game ringan, dan game logic",
    features: [
      { title: "Interactive Canvas", to: "/games", icon: Code },
      { title: "Game Engine Assets", to: "/games?tab=assets", icon: Layers },
    ],
  },
];

const RESEARCH_MODULES: WorkspaceModuleItem[] = [
  {
    id: "res-frameworks",
    title: "Business Frameworks",
    to: "/100-framework",
    icon: Layers,
    categoryLabel: "Frameworks",
    desc: "Katalog lengkap model strategi keputusan eksekutif: BCG Matrix, Porter 5 Forces, SWOT/TOWS, PESTEL, hingga Value Chain",
    features: [
      { title: "Framework Library", to: "/100-framework", icon: Layers },
      { title: "BCG Matrix", to: "/bcg", icon: PieChart },
      { title: "Porter's Five Forces", to: "/porter", icon: ShieldAlert },
      { title: "PESTEL Analysis", to: "/pestel", icon: Compass },
    ],
  },
  {
    id: "res-valuation",
    title: "Business Valuation",
    to: "/valuasi",
    icon: Building,
    categoryLabel: "Frameworks",
    desc: "Instrumen valuasi perusahaan terstandar MAPPI: Discounted Cash Flow (DCF), Multiples, dan Asset-Based Approach",
    features: [
      { title: "DCF Valuation", to: "/valuasi", icon: Calculator },
      { title: "Market Multiples", to: "/valuasi", icon: LineChart },
      { title: "Asset-Based Valuation", to: "/valuasi", icon: Building },
    ],
  },
  {
    id: "res-manager",
    title: "Research Intelligence",
    to: "/research-manager",
    icon: Compass,
    categoryLabel: "Research",
    desc: "Sentra riset komparatif, pengumpulan kliping web clipper, pangkalan referensi industri, dan catatan riset",
    features: [
      { title: "Research Workspace", to: "/research-manager", icon: Compass },
      { title: "Web Clipper", to: "/web-clipper", icon: BookmarkIcon() },
      { title: "Research Notes", to: "/notes", icon: NotebookText },
    ],
  },
  {
    id: "res-kurasi",
    title: "Business Knowledge",
    to: "/kurasi",
    icon: BookOpen,
    categoryLabel: "Reference",
    desc: "Modul kurasi pengetahuan bisnis 10 chapter: Ekonomi, Statistik, Manajemen, Komunikasi, Logistik, Akuntansi, Asuransi, Investasi",
    features: [
      { title: "Economics", to: "/kurasi/ekonomi", icon: Coins },
      { title: "Statistics", to: "/kurasi/statistik", icon: LineChart },
      { title: "Management", to: "/kurasi/manajemen", icon: Briefcase },
      { title: "Communication", to: "/kurasi/komunikasi", icon: MessagesSquare },
    ],
  },
  {
    id: "res-wiki",
    title: "Knowledge Base",
    to: "/wiki",
    icon: FileCheck,
    categoryLabel: "Reference",
    desc: "Repositori Standard Operating Procedure (SOP), dokumentasi pangkalan pengetahuan korporat, dan rujukan Incoterms",
    features: [
      { title: "SOP Library", to: "/wiki", icon: BookOpen },
      { title: "Knowledge Repository", to: "/knowledge-base", icon: NotebookText },
      { title: "Incoterms Guide", to: "/incoterms", icon: Compass },
    ],
  },
  {
    id: "res-reading",
    title: "Reading Library",
    to: "/reading",
    icon: Book,
    categoryLabel: "Research",
    desc: "Daftar bacaan terarah literatur ilmiah, buku teks bisnis, jurnal manajemen, dan ringkasan bacaan",
    features: [
      { title: "Reading List", to: "/reading", icon: Book },
      { title: "Book Notes", to: "/notes", icon: NotebookText },
      { title: "Bookmarks", to: "/bookmarks", icon: BookmarkIcon() },
    ],
  },
];

const SHARIA_MODULES: WorkspaceModuleItem[] = [
  {
    id: "sh-tabarru",
    title: "Tabarru' and Hibah",
    to: "/syariah/akad?app=tabarru",
    icon: HeartHandshake,
    categoryLabel: "Sosial",
    desc: "Pengelolaan donasi sukarela, akad hibah keluarga, dan instrumen kebajikan non-profit",
    features: [
      { title: "Tabarru' Contract", to: "/syariah/akad?app=tabarru", icon: HeartHandshake },
      { title: "Family Hibah", to: "/syariah/akad?app=hibah", icon: Gift },
      { title: "Infaq and Sadaqah", to: "/zakat?app=infaq", icon: Coins },
      { title: "Qardh Hasan", to: "/syariah/akad?app=qardh", icon: Wallet },
    ],
  },
  {
    id: "sh-qardh",
    title: "Qardh Hasan",
    to: "/syariah/akad?app=qardh",
    icon: Coins,
    categoryLabel: "Sosial",
    desc: "Sistem pinjaman kebajikan tanpa bunga dengan transparansi pengembalian pokok dan ta'awun",
    features: [
      { title: "Qardh Ledger", to: "/syariah/akad?app=qardh", icon: BookOpen },
      { title: "Principal Repayment Schedule", to: "/syariah/akad?app=qardh", icon: CalendarDays },
      { title: "Debt Relief Terms", to: "/syariah/akad?app=qardh", icon: ShieldCheck },
    ],
  },
  {
    id: "sh-wakaf",
    title: "Waqf Management",
    to: "/syariah/akad?app=wakaf",
    icon: Building,
    categoryLabel: "Sosial",
    desc: "Tata kelola wakaf tanah, wakaf uang produktif (CWLS), pelaporan nazhir, dan distribusi imbal hasil",
    features: [
      { title: "Cash Waqf", to: "/syariah/akad?app=wakaf", icon: Coins },
      { title: "Waqf Asset Register", to: "/syariah/akad?app=wakaf", icon: Building },
      { title: "Nazhir Reporting", to: "/syariah/akad?app=wakaf", icon: LineChart },
    ],
  },
  {
    id: "sh-mudharabah",
    title: "Mudharabah",
    to: "/syariah/akad?app=mudharabah",
    icon: TrendingUp,
    categoryLabel: "Komersial",
    desc: "Kemitraan bagi hasil pemodal dan pengelola dengan nisbah transparan",
    features: [
      { title: "Profit-Sharing Calculator", to: "/syariah/akad?app=mudharabah", icon: Calculator },
      { title: "Mudharabah Contract", to: "/syariah/akad?app=mudharabah", icon: FileCheck },
      { title: "Profit and Loss Audit", to: "/syariah/akad?app=mudharabah", icon: LineChart },
    ],
  },
  {
    id: "sh-musyarakah",
    title: "Musharakah",
    to: "/syariah/akad?app=musyarakah",
    icon: Users,
    categoryLabel: "Komersial",
    desc: "Penyertaan modal bersama dan pembagian laba proporsional",
    features: [
      { title: "Diminishing Musharakah", to: "/syariah/akad?app=musyarakah", icon: Users },
      { title: "Shirkah Contracts", to: "/syariah/akad?app=musyarakah", icon: FileCheck },
      { title: "Capital and Ownership", to: "/syariah/akad?app=musyarakah", icon: PieChart },
    ],
  },
  {
    id: "sh-murabahah",
    title: "Murabaha",
    to: "/syariah/akad?app=murabahah",
    icon: Receipt,
    categoryLabel: "Komersial",
    desc: "Jual beli dengan penetapan margin keuntungan dan tenor cicilan",
    features: [
      { title: "Murabaha Margin Calculator", to: "/syariah/akad?app=murabahah", icon: Calculator },
      { title: "Installment Schedule", to: "/syariah/akad?app=murabahah", icon: Banknote },
      { title: "Asset Ownership Verification", to: "/syariah/akad?app=murabahah", icon: ShieldCheck },
    ],
  },
  {
    id: "sh-ijarah",
    title: "Ijarah",
    to: "/syariah/akad?app=ijarah",
    icon: FileCheck,
    categoryLabel: "Komersial",
    desc: "Penyewaan aset manfaat dan sewa beli kepemilikan bertahap (IMBT)",
    features: [
      { title: "Ijarah Contract", to: "/syariah/akad?app=ijarah", icon: FileCheck },
      { title: "IMBT Calculator", to: "/syariah/akad?app=ijarah", icon: Calculator },
      { title: "Asset Owner Responsibilities", to: "/syariah/akad?app=ijarah", icon: Building },
    ],
  },
  {
    id: "sh-salam-istisna",
    title: "Salam and Istisna",
    to: "/syariah/akad?app=istishna",
    icon: Package,
    categoryLabel: "Komersial",
    desc: "Akad pembiayaan pesanan manufaktur bertahap dan jual beli komoditas dengan pembayaran di muka",
    features: [
      { title: "Project Payment Milestones", to: "/syariah/akad?app=istishna", icon: Workflow },
      { title: "Salam Commodity Contract", to: "/syariah/akad?app=salam", icon: FileCheck },
      { title: "Specifications and Quality Standards", to: "/syariah/akad?app=istishna", icon: ShieldCheck },
    ],
  },
  {
    id: "sh-takaful",
    title: "Takaful",
    to: "/syariah/akad?app=takaful",
    icon: ShieldCheck,
    categoryLabel: "Proteksi",
    desc: "Proteksi tolong-menolong berbasis dana tabarru' bersama dan pembagian surplus underwriting",
    features: [
      { title: "Pool Dana Tabarru'", to: "/syariah/akad?app=takaful", icon: ShieldCheck },
      { title: "Kalkulasi Surplus Underwriting", to: "/syariah/akad?app=takaful", icon: Calculator },
      { title: "Klaim Ta'awun", to: "/syariah/akad?app=takaful", icon: Workflow },
    ],
  },
  {
    id: "sh-wadiah",
    title: "Wadiah",
    to: "/syariah/akad?app=wadiah",
    icon: Shield,
    categoryLabel: "Simpanan",
    desc: "Penyimpanan dana dan titipan murni (Wadiah Yad Dhamanah & Amanah) tanpa bunga",
    features: [
      { title: "Wadiah Yad Dhamanah", to: "/syariah/akad?app=wadiah", icon: Shield },
      { title: "Titipan Fisik & Emas", to: "/syariah/akad?app=wadiah", icon: Package },
      { title: "Buku Titipan", to: "/syariah/akad?app=wadiah", icon: BookOpen },
    ],
  },
  {
    id: "sh-zakat-maal",
    title: "Zakat on Wealth",
    to: "/zakat?app=maal",
    icon: Coins,
    categoryLabel: "Zakat",
    desc: "Kalkulator nisab emas 85 gram, haul 1 tahun hijriyah, pembersihan dividen, dan alokasi asnaf",
    features: [
      { title: "Live Tracker Nisab Emas", to: "/zakat?app=maal", icon: Coins },
      { title: "Kalender Haul 354 Hari", to: "/zakat?app=maal", icon: CalendarDays },
      { title: "Zakat Saham & Reksa Dana", to: "/zakat?app=saham", icon: LineChart },
    ],
  },
  {
    id: "sh-zakat-profesi",
    title: "Income Zakat",
    to: "/zakat?app=profesi",
    icon: Wallet,
    categoryLabel: "Zakat",
    desc: "Kalkulasi zakat 2.5% dari pendapatan bersih bulanan dan histori penyaluran",
    features: [
      { title: "Kalkulator Zakat Bulanan", to: "/zakat?app=profesi", icon: Calculator },
      { title: "Pengurang Biaya Pokok", to: "/zakat?app=profesi", icon: Receipt },
      { title: "Histori Penyaluran LAZ", to: "/zakat?app=profesi", icon: BookOpen },
    ],
  },
  {
    id: "sh-zakat-fitrah",
    title: "Zakat al-Fitr",
    to: "/zakat?app=fitrah",
    icon: Scale,
    categoryLabel: "Zakat",
    desc: "Kalkulator zakat fitrah, penghitungan utang puasa fidyah, dan penebus kaffarah",
    features: [
      { title: "Konversi Sha' Beras / Rupiah", to: "/zakat?app=fitrah", icon: Scale },
      { title: "Hitung Fidyah Harian", to: "/zakat?app=fidyah", icon: Calculator },
      { title: "Panduan Kaffarah", to: "/zakat?app=kaffarah", icon: BookOpen },
    ],
  },
  {
    id: "sh-saham",
    title: "Sharia Stock Screening",
    to: "/100-komoditas?tab=syariah",
    icon: ShieldCheck,
    categoryLabel: "Investasi",
    desc: "Verifikasi kriteria OJK: rasio utang berbasis bunga <45% dan pendapatan non-halal <10%",
    features: [
      { title: "Financial Ratio Screen (45%)", to: "/100-komoditas?tab=syariah", icon: ShieldCheck },
      { title: "Non-Halal Revenue (<10%)", to: "/100-komoditas?tab=syariah", icon: LineChart },
      { title: "Daftar Efek Syariah (DES)", to: "/100-komoditas?tab=syariah", icon: Package },
    ],
  },
  {
    id: "sh-audit-riba",
    title: "Riba Compliance",
    to: "/syariah/terlarang?app=riba",
    icon: ShieldAlert,
    categoryLabel: "Kepatuhan",
    desc: "Deteksi riba akad dan kalkulator cleansing bunga konvensional",
    features: [
      { title: "Cleansing Dana Bunga", to: "/syariah/terlarang?app=cleansing", icon: Calculator },
      { title: "Identifikasi Riba Akad", to: "/syariah/terlarang?app=riba", icon: ShieldAlert },
      { title: "Rujukan Fatwa DSN-MUI", to: "/syariah/terlarang?app=fatwa", icon: BookOpen },
    ],
  },
  {
    id: "sh-audit-gharar",
    title: "Gharar Compliance",
    to: "/syariah/terlarang?app=gharar",
    icon: Scale,
    categoryLabel: "Kepatuhan",
    desc: "Audit ketidakjelasan objek (gharar), spekulasi maysir, dan kepatuhan standar AAOIFI",
    features: [
      { title: "Cek Kejelasan Objek", to: "/syariah/terlarang?app=gharar", icon: ShieldCheck },
      { title: "Deteksi Spekulasi Maysir", to: "/syariah/terlarang?app=maysir", icon: ShieldAlert },
      { title: "Standar Syariah AAOIFI", to: "/syariah/terlarang?app=aaoifi", icon: BookOpen },
    ],
  },
];

const PERSONAL_MODULES: WorkspaceModuleItem[] = [
  {
    id: "per-habits",
    title: "Personal Development",
    to: "/habit-tracker",
    icon: Flame,
    categoryLabel: "Pengembangan",
    desc: "Pencatatan konsistensi kebiasaan harian, perencanaan hidup, dan wishlist tabungan",
    features: [
      { title: "Habit Tracker", to: "/habit-tracker", icon: Flame },
      { title: "Life Planner", to: "/life/life-planner", icon: Target },
      { title: "Personal Projects", to: "/proyek-personal", icon: FolderKanban },
      { title: "Wishlist and Savings", to: "/life/wishlist", icon: Gift },
    ],
  },
  {
    id: "per-journal",
    title: "Personal Journaling",
    to: "/journal",
    icon: BookOpen,
    categoryLabel: "Refleksi",
    desc: "Ruang refleksi privat, catatan syukur harian, dan pemetaan emosi",
    features: [
      { title: "Daily Journal", to: "/journal", icon: BookOpen },
      { title: "Gratitude Journal", to: "/journal?tab=gratitude", icon: Heart },
      { title: "Mood Tracker", to: "/journal?tab=mood", icon: Activity },
    ],
  },
  {
    id: "per-health-fit",
    title: "Health and Fitness",
    to: "/health?tab=workouts",
    icon: Dumbbell,
    categoryLabel: "Kesehatan",
    desc: "Log aktivitas olahraga, kualitas tidur, komposisi tubuh, dan hidrasi",
    features: [
      { title: "Workout Tracker", to: "/health?tab=workouts", icon: Dumbbell },
      { title: "Sleep Tracker", to: "/health?tab=sleep", icon: Clock },
      { title: "Body Metrics", to: "/health?tab=body-metrics", icon: Activity },
      { title: "Water Tracker", to: "/health?tab=water", icon: Flame },
    ],
  },
  {
    id: "per-health-rec",
    title: "Health Records",
    to: "/health",
    icon: HeartPulse,
    categoryLabel: "Kesehatan",
    desc: "Rekam medis komprehensif, tanda vital, pengingat obat, dan log perawatan",
    features: [
      { title: "Health Overview", to: "/health", icon: HeartPulse },
      { title: "Medical Records", to: "/health?tab=medical-records", icon: FileCheck },
      { title: "Vital Signs", to: "/health?tab=vitals", icon: Activity },
      { title: "Medication Reminder", to: "/lainnya?app=med-reminder", icon: ShieldCheck },
      { title: "Skincare Tracker", to: "/health?tab=skincare", icon: SparklesIcon() },
    ],
  },
  {
    id: "per-tools",
    title: "Personal Tools and Vault",
    to: "/passwords",
    icon: Key,
    categoryLabel: "Utilitas",
    desc: "Penyimpanan kata sandi terenkripsi dan kalkulator utilitas serbaguna",
    features: [
      { title: "Passwords", to: "/passwords", icon: Key },
      { title: "Calculator and Utilities", to: "/kalkulator", icon: Calculator },
    ],
  },
];

const FAMILY_MODULES: WorkspaceModuleItem[] = [
  {
    id: "fam-tree",
    title: "Family Heritage",
    to: "/peh/family-tree",
    icon: GitFork,
    categoryLabel: "Keluarga",
    desc: "Pohon silsilah keluarga, aturan rumah tangga, dan riwayat tradisi keluarga",
    features: [
      { title: "Family Tree", to: "/peh/family-tree", icon: GitFork },
      { title: "Household Rules", to: "/lainnya?app=family-rules", icon: ShieldCheck },
      { title: "Family History", to: "/peh/traditions", icon: BookOpen },
    ],
  },
  {
    id: "fam-safety",
    title: "Family Safety",
    to: "/lainnya?app=emergency-hub",
    icon: ShieldAlert,
    categoryLabel: "Keluarga",
    desc: "Protokol keselamatan hunian darurat, rekam medis keluarga, dan kesiapsiagaan bencana",
    features: [
      { title: "Emergency Contacts", to: "/lainnya?app=emergency-hub", icon: ShieldAlert },
      { title: "Family Health Records", to: "/peh/family-health", icon: HeartPulse },
      { title: "Emergency Preparedness", to: "/lainnya?app=disaster-prep", icon: ShieldCheck },
    ],
  },
  {
    id: "fam-budget",
    title: "Household Finance",
    to: "/peh/family-budget",
    icon: Wallet,
    categoryLabel: "Keluarga",
    desc: "Perencanaan anggaran rumah tangga bersama dan evaluasi pengeluaran bulanan",
    features: [
      { title: "Family Budget", to: "/peh/family-budget", icon: Wallet },
      { title: "Expense Tracker", to: "/peh/budget", icon: Receipt },
    ],
  },
  {
    id: "fam-chores",
    title: "Household Management",
    to: "/peh/chores",
    icon: CheckSquare,
    categoryLabel: "Rumah Tangga",
    desc: "Jadwal tugas rumah tangga, pemeliharaan bangunan, tanaman, dan hewan peliharaan",
    features: [
      { title: "Household Chores", to: "/peh/chores", icon: CheckSquare },
      { title: "Home Maintenance Log", to: "/peh/maintenance", icon: Home },
      { title: "Garden Management", to: "/peh/plants", icon: Layers },
      { title: "Pet Care", to: "/peh/pet-care", icon: Heart },
    ],
  },
  {
    id: "fam-pantry",
    title: "Kitchen Management",
    to: "/peh/pantry",
    icon: Utensils,
    categoryLabel: "Rumah Tangga",
    desc: "Inventarisasi stok bahan makanan dapur, resep masakan, dan daftar belanja",
    features: [
      { title: "Pantry Inventory", to: "/peh/pantry", icon: Utensils },
      { title: "Recipe Collection", to: "/recipes", icon: BookOpen },
      { title: "Grocery List", to: "/shopping", icon: ShoppingCart },
      { title: "Family Recipes", to: "/peh/family-recipes", icon: NotebookText },
    ],
  },
  {
    id: "fam-vehicles",
    title: "Vehicle Records",
    to: "/peh/vehicles",
    icon: Car,
    categoryLabel: "Kendaraan",
    desc: "Log servis berkala kendaraan, jarak tempuh BBM, dan dokumen kendaraan",
    features: [
      { title: "Vehicle Registry", to: "/peh/vehicles", icon: Car },
      { title: "Mileage and Fuel Log", to: "/lainnya?app=mileage-fuel", icon: LineChart },
      { title: "Vehicle Maintenance Schedule", to: "/lainnya?app=service-maintenance", icon: ShieldCheck },
    ],
  },
];

const PUBLIC_AFFAIRS_MODULES: WorkspaceModuleItem[] = [
  {
    id: "pub-community",
    title: "Community Management",
    to: "/komunitas-warga",
    icon: Building,
    categoryLabel: "Community",
    desc: "Direktori warga, transparansi iuran kas RT/RW, dan surat pengantar sipil",
    features: [
      { title: "Resident Directory", to: "/komunitas-warga", icon: Building },
      { title: "Community Fund", to: "/komunitas-warga", icon: Wallet },
      { title: "Civic Letters", to: "/komunitas-warga", icon: FileCheck },
    ],
  },
  {
    id: "pub-services",
    title: "Public Services",
    to: "/lainnya?app=public-services-guide",
    icon: Compass,
    categoryLabel: "Public Services",
    desc: "Panduan administrasi kependudukan, syarat berkas, dan kontak instansi dinas",
    features: [
      { title: "Civic Services Guide", to: "/lainnya?app=public-services-guide", icon: Compass },
      { title: "Document Requirements", to: "/documents", icon: FileCheck },
      { title: "Public Office Directory", to: "/contacts", icon: Users },
    ],
  },
  {
    id: "pub-calendar",
    title: "Community Events",
    to: "/lainnya?app=civic-calendar",
    icon: CalendarDays,
    categoryLabel: "Community",
    desc: "Kalender agenda warga, jadwal musyawarah, dan notulen pertemuan",
    features: [
      { title: "Community Calendar", to: "/lainnya?app=civic-calendar", icon: CalendarDays },
      { title: "Meeting Schedule", to: "/calendar", icon: Clock },
      { title: "Meeting Minutes", to: "/meeting-manager", icon: BookOpen },
    ],
  },
  {
    id: "pub-compliance",
    title: "Regulatory Compliance",
    to: "/peh/compliance",
    icon: Scale,
    categoryLabel: "Policy",
    desc: "Pelacakan kepatuhan regulasi daerah/nasional, audit hukum, dan daftar regulasi",
    features: [
      { title: "Compliance Tracker", to: "/peh/compliance", icon: ShieldCheck },
      { title: "Legal Compliance Audit", to: "/surety?tab=cat_kepatuhan", icon: Scale },
      { title: "Regulatory Library", to: "/documents", icon: BookOpen },
    ],
  },
  {
    id: "pub-advocacy",
    title: "Public Advocacy",
    to: "/peh/advocacy",
    icon: ShieldAlert,
    categoryLabel: "Policy",
    desc: "Kanal aspirasi konstituen, risalah usulan kebijakan publik, dan survei opini",
    features: [
      { title: "Public Feedback", to: "/peh/advocacy", icon: ShieldAlert },
      { title: "Policy Proposals", to: "/notes", icon: NotebookText },
      { title: "Public Opinion Survey", to: "/forms", icon: CheckSquare },
    ],
  },
  {
    id: "pub-pr",
    title: "Public Relations",
    to: "/peh/global-overview",
    icon: MessagesSquare,
    categoryLabel: "Media",
    desc: "Pengelolaan siaran pers resmi, pemantauan media, dan komunikasi stakeholder",
    features: [
      { title: "Press Releases", to: "/peh/global-overview", icon: MessagesSquare },
      { title: "Stakeholder Updates", to: "/notification-center", icon: SparklesIcon() },
      { title: "Media Monitoring", to: "/web-clipper", icon: Compass },
    ],
  },
];

const NETWORKS_MODULES: WorkspaceModuleItem[] = [
      {
        id: "net-people",
        title: "People Directory",
        to: "/people-manager",
        icon: Users,
        categoryLabel: "Direktori",
        desc: "Identity Layer rujukan identitas tunggal: profil person, relasi keluarga, dan peran organisasi",
        features: [
          { title: "Identity Profiles", to: "/people-manager", icon: Users },
          { title: "Role Mapping", to: "/people-manager", icon: ShieldCheck },
          { title: "Organization Membership", to: "/people-manager", icon: Building },
        ],
      },
      {
        id: "net-vault",
        title: "Contact Directory",
        to: "/peh/contacts",
        icon: Key,
        categoryLabel: "Direktori",
        desc: "Buku alamat kontak profesional, sinkronisasi nomor telepon, dan kartu nama digital",
        features: [
          { title: "Contact List", to: "/peh/contacts", icon: Users },
          { title: "Strategic Partners", to: "/contacts", icon: Key },
          { title: "Address Book", to: "/klien", icon: BookOpen },
        ],
      },
      {
        id: "net-relations",
        title: "Relationship Management",
        to: "/interaction-manager",
        icon: MessagesSquare,
        categoryLabel: "Relasi",
        desc: "Histori lini masa komunikasi terpadu, log catatan penting, dan jadwal pengingat tindak lanjut",
        features: [
          { title: "Interaction Log", to: "/interaction-manager", icon: MessagesSquare },
          { title: "Follow-Up Schedule", to: "/interaction-manager", icon: Clock },
          { title: "Discussion History", to: "/meeting-manager", icon: BookOpen },
        ],
      },
      {
        id: "net-groups",
        title: "Groups and Communities",
        to: "/lainnya?app=circle-groups",
        icon: Network,
        categoryLabel: "Relasi",
        desc: "Klaster lingkaran pertemanan, grup alumni, paguyuban hobi, dan kelompok minat bersama",
        features: [
          { title: "Relationship Groups", to: "/lainnya?app=circle-groups", icon: Users },
          { title: "Alumni Communities", to: "/peh/community-events", icon: CalendarDays },
          { title: "Group Collaboration", to: "/collaboration", icon: Users },
        ],
      },
      {
        id: "net-mentorship",
        title: "Professional Networking",
        to: "/peh/mentorship",
        icon: Compass,
        categoryLabel: "Jaringan",
        desc: "Pencatatan sesi bimbingan karir/bisnis, jejak rekam perkenalan mitra, dan sinergi kemitraan",
        features: [
          { title: "Mentorship Sessions", to: "/peh/mentorship", icon: Compass },
          { title: "Professional Introductions", to: "/peh/introductions", icon: Users },
          { title: "Advisory Board", to: "/klien", icon: Briefcase },
        ],
      },
      {
        id: "net-gifts",
        title: "Celebrations and Gifts",
        to: "/lainnya?app=gift-tracker",
        icon: Star,
        categoryLabel: "Jaringan",
        desc: "Pengingat hari ulang tahun, perayaan hari jadi mitra, log riwayat bingkisan, dan ide kado",
        features: [
          { title: "Gift History", to: "/lainnya?app=gift-tracker", icon: Gift },
          { title: "Anniversary Calendar", to: "/peh/gifts", icon: CalendarDays },
          { title: "Greeting Cards", to: "/notes", icon: BookOpen },
        ],
      },
];

const PHASE_SIDE_MODULES: WorkspaceModuleItem[] = [
  {
    id: "phase-self-shaping",
    title: "Self-Shaping (Fase Diri)",
    to: "/reliance",
    icon: ShieldCheck,
    categoryLabel: "Self-Shaping",
    desc: "Kemandirian, pemenuhan kecukupan, perbaikan berkelanjutan, dan pengembangan evolusi",
    features: [
      { title: "Reliance (Kemandirian)", to: "/reliance", icon: ShieldCheck },
      { title: "Sufficient (Kecukupan)", to: "/sufficient", icon: CheckCircle2 },
      { title: "Improvement (Perbaikan)", to: "/improvement", icon: TrendingUp },
      { title: "Development (Pengembangan)", to: "/development", icon: Sparkles },
    ],
  },
  {
    id: "phase-mutual-mapping",
    title: "Mutual-Mapping (Fase Timbal Balik)",
    to: "/interact",
    icon: Workflow,
    categoryLabel: "Mutual-Mapping",
    desc: "Interaksi sosial, kepentingan bersama, titik temu multidisiplin, dan simbiosis mutualisme",
    features: [
      { title: "Interact (Interaksi Sosial)", to: "/interact", icon: MessagesSquare },
      { title: "Interest (Kepentingan Bersama)", to: "/interest", icon: Heart },
      { title: "Intersect (Titik Temu)", to: "/intersect", icon: Layers },
      { title: "Interdependence (Simbiosis)", to: "/interdependence", icon: Workflow },
    ],
  },
  {
    id: "phase-organization-optimizing",
    title: "Organization-Optimizing (Fase Organisasi)",
    to: "/insider",
    icon: Eye,
    categoryLabel: "Organization-Optimizing",
    desc: "Tata kelola dan intelijen internal, wawasan strategis, pemantauan dinamika eksternal, dan prospek",
    features: [
      { title: "Insider (Tata Kelola Internal)", to: "/insider", icon: Eye },
      { title: "Insight (Wawasan Strategis)", to: "/insight", icon: Lightbulb },
      { title: "Outward (Dinamika Eksternal)", to: "/outward", icon: Compass },
      { title: "Outlook (Prospek Masa Depan)", to: "/outlook", icon: TrendingUp },
    ],
  },
];

const PHASE_SIDE_NODE_COUNT = PHASE_SIDE_MODULES.reduce(
  (acc, m) => acc + (m.features?.length || 0),
  0
);

export const WORKSPACE_PAGES: WorkspacePageDef[] = [
  {
    id: "financial",
    modeId: "financial",
    label: "Financial Planning and Wealth Management",
    badge: `${FINANCIAL_MODULES.length} Modul • ${FINANCIAL_ITEM_COUNT} Items`,
    desc: buildCategoryDesc(FINANCIAL_MODULES, ["Surety", "Flow", "Build", "Grow", "Legacy"]),
    icon: Coins,
    modules: FINANCIAL_MODULES,
  },
  {
    id: "mode_business",
    modeId: "business",
    label: "Business Administration and Operations Management",
    badge: BIZ_OPS_TOTAL_BADGE,
    desc: BIZ_OPS_SUMMARY_DESC,
    icon: Store,
    modules: BIZ_ADMIN_MODULES,
  },
  {
    id: "mode_employment",
    modeId: "employment",
    label: "Productivity Workspace and Workflow Systems",
    badge: `${EMPLOYMENT_MODULES.length} Modul`,
    desc: buildCategoryDesc(EMPLOYMENT_MODULES, ["Planning", "Workflow", "Resources", "Coordination", "Governance", "Ownership"]),
    icon: Briefcase,
    modules: EMPLOYMENT_MODULES,
  },
  {
    id: "mode_creative",
    modeId: "creative",
    label: "Creative Workspace and Media Production",
    badge: `${CREATIVE_MODULES.length} Modul`,
    desc: buildCategoryDesc(CREATIVE_MODULES, ["Design", "Publishing", "Production", "Interactive"]),
    icon: Palette,
    modules: CREATIVE_MODULES,
  },
  {
    id: "mode_research",
    modeId: "research",
    label: "Research Foundations and Reference Frameworks",
    badge: `${RESEARCH_MODULES.length} Modul`,
    desc: buildCategoryDesc(RESEARCH_MODULES, ["Frameworks", "Reference", "Research"]),
    icon: GraduationCap,
    modules: RESEARCH_MODULES,
  },
  {
    id: "mode_sharia",
    modeId: "sharia",
    label: "Islamic Principles and Sharia Values",
    badge: `${SHARIA_MODULES.length} Modul`,
    desc: buildCategoryDesc(SHARIA_MODULES, ["Sosial", "Komersial", "Proteksi", "Simpanan", "Zakat", "Investasi", "Kepatuhan"]),
    icon: Scale,
    modules: SHARIA_MODULES,
  },
  {
    id: "mode_personal",
    modeId: "personal",
    label: "Personal Life Management",
    badge: `${PERSONAL_MODULES.length} Modul`,
    desc: buildCategoryDesc(PERSONAL_MODULES, ["Pengembangan", "Refleksi", "Kesehatan", "Utilitas"]),
    icon: Heart,
    modules: PERSONAL_MODULES,
  },
  {
    id: "mode_family",
    modeId: "family",
    label: "Family Records and Household Planning",
    badge: `${FAMILY_MODULES.length} Modul`,
    desc: buildCategoryDesc(FAMILY_MODULES, ["Keluarga", "Rumah Tangga", "Kendaraan"]),
    icon: Home,
    modules: FAMILY_MODULES,
  },
  {
    id: "mode_public_affairs",
    modeId: "public_affairs",
    label: "Public Affairs and Relations",
    badge: `${PUBLIC_AFFAIRS_MODULES.length} Modul`,
    desc: buildCategoryDesc(PUBLIC_AFFAIRS_MODULES, ["Community", "Public Services", "Policy", "Media"]),
    icon: Landmark,
    modules: PUBLIC_AFFAIRS_MODULES,
  },
  {
    id: "mode_networks",
    modeId: "networks",
    label: "Contact Directory and Social Networks",
    badge: `${NETWORKS_MODULES.length} Modul`,
    desc: buildCategoryDesc(NETWORKS_MODULES, ["Direktori", "Relasi", "Jaringan"]),
    icon: Users,
    modules: NETWORKS_MODULES,
  },
  {
    id: "mode_phase_side",
    modeId: "phase_side",
    label: "Phase: Mutual-Self-Organization",
    badge: `${PHASE_SIDE_NODE_COUNT} Modul • ${PHASE_SIDE_MODULES.length} Fase`,
    desc: "Self-Shaping (4) · Mutual-Mapping (4) · Organization-Optimizing (4)",
    icon: Compass,
    modules: PHASE_SIDE_MODULES,
  },
];

// Helper icon fallback
function SparklesIcon() {
  return Sparkles;
}
function BookmarkIcon() {
  return BookOpen;
}
function AwardIcon() {
  return Star;
}
