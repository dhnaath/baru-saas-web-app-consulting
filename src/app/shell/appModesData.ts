import type { LucideIcon } from "lucide-react";
import {
  Coins,
  ShieldCheck,
  Wallet,
  Building,
  TrendingUp,
  BookOpen,
  Briefcase,
  DollarSign,
  Receipt,
  ShoppingCart,
  Landmark,
  Store,
  Grid2X2,
  Truck,
  Package,
  MessagesSquare,
  Clock,
  LineChart,
  Target,
  CheckCircle2,
  FolderKanban,
  CheckSquare,
  ShieldAlert,
  LayoutGrid,
  Palette,
  Film,
  PenTool,
  Sparkles,
  Layers,
  Activity,
  Camera,
  Code,
  GraduationCap,
  Compass,
  NotebookText,
  Scale,
  HeartHandshake,
  Users,
  FileCheck,
  Heart,
  Flame,
  Dumbbell,
  HeartPulse,
  Key,
  Home,
  GitFork,
  Utensils,
  Car,
  CalendarDays,
  Star,
  Workflow,
  Eye,
  Lightbulb,
  Plane,
  Building2,
  Timer,
  FileCode2,
  Settings,
  User,
  Wrench,
  LayoutDashboard,
} from "lucide-react";
import {
  BIZ_OPS_SUMMARY_DESC,
  BIZ_OPS_TOTAL_BADGE,
} from "@/features/business-operations/BusinessOperationsCustomersPage";
import {
  FIN_SUMMARY_DESC,
  FIN_TOTAL_MODULES,
} from "@/features/launcher/FinancialWealthSection";
import {
  WORK_SUMMARY_DESC,
  WORK_TOTAL_MODULES,
} from "@/features/work-productivity/WorkProductivityPage";
import {
  CREATIVE_SUMMARY_DESC,
  CREATIVE_TOTAL_MODULES,
} from "@/features/creative-workspace/CreativeWorkspaceMediaPage";
import {
  RESEARCH_SUMMARY_DESC,
  RESEARCH_TOTAL_MODULES,
} from "@/features/research-frameworks/ResearchFrameworksPage";
import {
  SHARIA_SUMMARY_DESC,
  SHARIA_TOTAL_MODULES,
} from "@/features/syariah/IslamicPrinciplesShariaValuesPage";
import {
  PERSONAL_SUMMARY_DESC,
  PERSONAL_TOTAL_MODULES,
} from "@/features/personal-life/PersonalLifePage";
import {
  FAMILY_SUMMARY_DESC,
  FAMILY_TOTAL_MODULES,
} from "@/features/family-records/FamilyRecordsHouseholdPage";
import {
  PUBLIC_AFFAIRS_SUMMARY_DESC,
  PUBLIC_AFFAIRS_TOTAL_MODULES,
} from "@/features/public-affairs/PublicRelationsPolicyAffairsPage";
import {
  SOCIAL_SUMMARY_DESC,
  SOCIAL_TOTAL_MODULES,
} from "@/features/social-networks/ContactDirectoryNetworksPage";
import { Shield, Award, UserCheck } from "lucide-react";

export type AppModeId =
  | "financial"
  | "business"
  | "employment"
  | "creative"
  | "research"
  | "sharia"
  | "personal"
  | "family"
  | "public_affairs"
  | "networks"
  | "phase_side";

export interface ModeItem {
  id: AppModeId;
  label: string;
  badge: string;
  desc: string;
  icon: LucideIcon;
  badgeClass: string;
  links: { to: string; label: string; icon: LucideIcon }[];
}

export const APP_MODES: ModeItem[] = [
  {
    id: "financial",
    label: "Financial Planning and Wealth Management",
    badge: `${FIN_TOTAL_MODULES} Modul`,
    desc: FIN_SUMMARY_DESC,
    icon: Coins,
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    links: [
      { to: "/financial-planning", label: "Financial Planning Hub", icon: Coins },
      { to: "/surety", label: "Tahap 1: Surety & Kepatuhan", icon: ShieldCheck },
      { to: "/flow", label: "Tahap 2: Flow & Cashflow", icon: Wallet },
      { to: "/build", label: "Tahap 3: Build & Portofolio", icon: Building },
      { to: "/grow", label: "Tahap 4: Grow & Wealth Asset", icon: TrendingUp },
      { to: "/legacy", label: "Tahap 5: Legacy & Suksesi", icon: BookOpen },
      { to: "/asset", label: "Kuadran Aset", icon: Briefcase },
      { to: "/earning", label: "Kuadran Pendapatan", icon: DollarSign },
      { to: "/liability", label: "Kuadran Liabilitas", icon: Receipt },
      { to: "/expense", label: "Kuadran Pengeluaran", icon: ShoppingCart },
      { to: "/valuasi", label: "Valuasi Bisnis MAPPI", icon: Landmark },
    ],
  },
  {
    id: "business",
    label: "Business Administration and Operations Management",
    badge: BIZ_OPS_TOTAL_BADGE,
    desc: BIZ_OPS_SUMMARY_DESC,
    icon: Store,
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    links: [
      { to: "/business-operations", label: "Business Administration and Operations Management", icon: Store },
      { to: "/100-framework", label: "8 Pilar Strategis dan 100 MBA Tools", icon: Grid2X2 },
      { to: "/peh/vendors", label: "Procurement Management", icon: Truck },
      { to: "/katalog-produk", label: "Inventory Management", icon: Package },
      { to: "/lainnya?app=quality-check", label: "Quality Management", icon: Shield },
      { to: "/klien", label: "Client Management", icon: Briefcase },
      { to: "/portal", label: "Customer Service Management", icon: MessagesSquare },
      { to: "/expense-tracker", label: "Business Resource Management", icon: Receipt },
      { to: "/lainnya?app=mailroom", label: "Document Management", icon: FileCheck },
      { to: "/statistics", label: "Business Intelligence", icon: LineChart },
      { to: "/goal-manager", label: "Performance Management", icon: Award },
      { to: "/100-framework", label: "Strategic Frameworks", icon: Grid2X2 },
      { to: "/lainnya?app=time-clock", label: "Workforce Management", icon: UserCheck },
      { to: "/peh/compliance", label: "Corporate Governance", icon: ShieldCheck },
    ],
  },
  {
    id: "employment",
    label: "Productivity Workspace and Workflow Systems",
    badge: `${WORK_TOTAL_MODULES} Modul`,
    desc: WORK_SUMMARY_DESC,
    icon: Briefcase,
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    links: [
      { to: "/work-productivity", label: "Productivity Workspace Hub", icon: Briefcase },
      { to: "/peh/milestones", label: "Goals & Milestones", icon: Target },
      { to: "/peh/workflows", label: "Workflow & Delivery Pipeline", icon: CheckCircle2 },
      { to: "/peh/projects", label: "Content Production Pipeline", icon: FolderKanban },
      { to: "/peh/vendors", label: "Vendor & Service Management", icon: Building },
      { to: "/peh/procurement", label: "Procurement & Purchase Orders", icon: DollarSign },
      { to: "/peh/meetings", label: "Meetings & Decision Log", icon: CheckSquare },
      { to: "/peh/incidents", label: "Issues & Incident Management", icon: ShieldAlert },
      { to: "/peh/compliance", label: "Compliance & Regulatory Audit", icon: ShieldCheck },
      { to: "/peh/cap-table", label: "Equity & Cap Table", icon: LayoutGrid },
    ],
  },
  {
    id: "creative",
    label: "Creative Workspace and Media Production",
    badge: `${CREATIVE_TOTAL_MODULES} Modul`,
    desc: CREATIVE_SUMMARY_DESC,
    icon: Palette,
    badgeClass: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    links: [
      { to: "/creative-workspace", label: "Creative Workspace Hub", icon: Palette },
      { to: "/design", label: "Design Management", icon: Palette },
      { to: "/movies", label: "Video Production", icon: Film },
      { to: "/writing", label: "Writing and Publishing", icon: PenTool },
      { to: "/podcasts", label: "Audio Production", icon: Activity },
      { to: "/photography", label: "Photography and Media", icon: Camera },
      { to: "/games", label: "Interactive Media", icon: Code },
    ],
  },
  {
    id: "research",
    label: "Research Foundations and Reference Frameworks",
    badge: `${RESEARCH_TOTAL_MODULES} Modul`,
    desc: RESEARCH_SUMMARY_DESC,
    icon: GraduationCap,
    badgeClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    links: [
      { to: "/research-frameworks", label: "Research Frameworks Hub", icon: GraduationCap },
      { to: "/100-framework", label: "Business Frameworks", icon: Grid2X2 },
      { to: "/valuasi", label: "Business Valuation", icon: Building },
      { to: "/research-manager", label: "Research Intelligence", icon: Compass },
      { to: "/kurasi", label: "Business Knowledge", icon: BookOpen },
      { to: "/wiki", label: "Knowledge Base", icon: NotebookText },
      { to: "/reading", label: "Reading Library", icon: GraduationCap },
    ],
  },
  {
    id: "sharia",
    label: "Islamic Principles and Sharia Values",
    badge: `${SHARIA_TOTAL_MODULES} Modul`,
    desc: SHARIA_SUMMARY_DESC,
    icon: Scale,
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    links: [
      { to: "/sharia-values", label: "Islamic Principles Hub", icon: Scale },
      { to: "/syariah/akad?app=tabarru", label: "Tabarru' and Hibah", icon: HeartHandshake },
      { to: "/syariah/akad?app=mudharabah", label: "Mudharabah", icon: TrendingUp },
      { to: "/syariah/akad?app=musyarakah", label: "Musharakah", icon: Users },
      { to: "/syariah/akad?app=murabahah", label: "Murabaha", icon: Receipt },
      { to: "/syariah/akad?app=ijarah", label: "Ijarah", icon: FileCheck },
      { to: "/zakat?app=maal", label: "Zakat on Wealth", icon: Coins },
      { to: "/zakat?app=profesi", label: "Income Zakat", icon: Wallet },
      { to: "/syariah/terlarang?app=riba", label: "Riba Compliance", icon: ShieldAlert },
      { to: "/100-komoditas?tab=syariah", label: "Sharia Stock Screening", icon: ShieldCheck },
    ],
  },
  {
    id: "personal",
    label: "Personal Life Management",
    badge: `${PERSONAL_TOTAL_MODULES} Modul`,
    desc: PERSONAL_SUMMARY_DESC,
    icon: Heart,
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    links: [
      { to: "/personal-life", label: "Personal Life Hub", icon: Heart },
      { to: "/habit-tracker", label: "Personal Development", icon: Flame },
      { to: "/journal", label: "Personal Journaling", icon: BookOpen },
      { to: "/health?tab=workouts", label: "Health and Fitness", icon: Dumbbell },
      { to: "/health", label: "Health Records", icon: HeartPulse },
      { to: "/passwords", label: "Personal Tools and Vault", icon: Key },
    ],
  },
  {
    id: "family",
    label: "Family Records and Household Planning",
    badge: `${FAMILY_TOTAL_MODULES} Modul`,
    desc: FAMILY_SUMMARY_DESC,
    icon: Home,
    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    links: [
      { to: "/family-records", label: "Family Records Hub", icon: Home },
      { to: "/peh/family-tree", label: "Family Heritage", icon: GitFork },
      { to: "/lainnya?app=emergency-hub", label: "Family Safety", icon: ShieldAlert },
      { to: "/peh/family-budget", label: "Household Finance", icon: Wallet },
      { to: "/peh/chores", label: "Household Management", icon: CheckSquare },
      { to: "/peh/pantry", label: "Kitchen Management", icon: Utensils },
      { to: "/peh/vehicles", label: "Vehicle Records", icon: Car },
    ],
  },
  {
    id: "public_affairs",
    label: "Public Affairs and Relations",
    badge: `${PUBLIC_AFFAIRS_TOTAL_MODULES} Modul`,
    desc: PUBLIC_AFFAIRS_SUMMARY_DESC,
    icon: Landmark,
    badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    links: [
      { to: "/public-affairs", label: "Public Affairs Hub", icon: Landmark },
      { to: "/komunitas-warga", label: "Community Management", icon: Building },
      { to: "/lainnya?app=public-services-guide", label: "Public Services", icon: Compass },
      { to: "/lainnya?app=civic-calendar", label: "Community Events", icon: CalendarDays },
      { to: "/peh/compliance", label: "Regulatory Compliance", icon: Scale },
      { to: "/peh/advocacy", label: "Public Advocacy", icon: ShieldAlert },
      { to: "/peh/global-overview", label: "Public Relations", icon: MessagesSquare },
    ],
  },
  {
    id: "networks",
    label: "Contact Directory and Social Networks",
    badge: `${SOCIAL_TOTAL_MODULES} Modul`,
    desc: SOCIAL_SUMMARY_DESC,
    icon: Users,
    badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    links: [
      { to: "/social-networks", label: "Contact Directory Hub", icon: Users },
      { to: "/people-manager", label: "People Directory", icon: Users },
      { to: "/peh/contacts", label: "Contact Directory", icon: Key },
      { to: "/interaction-manager", label: "Relationship Management", icon: MessagesSquare },
      { to: "/lainnya?app=circle-groups", label: "Groups and Communities", icon: Users },
      { to: "/peh/mentorship", label: "Professional Networking", icon: Compass },
      { to: "/lainnya?app=gift-tracker", label: "Celebrations and Gifts", icon: Star },
    ],
  },
  {
    id: "phase_side",
    label: "Phase: Mutual-Self-Organization",
    badge: "12 Modul",
    desc: "Self-Shaping (4) · Mutual-Mapping (4) · Organization-Optimizing (4)",
    icon: Compass,
    badgeClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    links: [
      { to: "/reliance", label: "Reliance (Kemandirian)", icon: ShieldCheck },
      { to: "/sufficient", label: "Sufficient (Kecukupan)", icon: CheckCircle2 },
      { to: "/improvement", label: "Improvement (Perbaikan)", icon: TrendingUp },
      { to: "/development", label: "Development (Pengembangan)", icon: Sparkles },
      { to: "/interact", label: "Interact (Interaksi Sosial)", icon: MessagesSquare },
      { to: "/interest", label: "Interest (Kepentingan Bersama)", icon: Heart },
      { to: "/intersect", label: "Intersect (Titik Temu)", icon: Layers },
      { to: "/interdependence", label: "Interdependence (Simbiosis)", icon: Workflow },
      { to: "/insider", label: "Insider (Tata Kelola Internal)", icon: Eye },
      { to: "/insight", label: "Insight (Wawasan Strategis)", icon: Lightbulb },
      { to: "/outward", label: "Outward (Dinamika Eksternal)", icon: Compass },
      { to: "/outlook", label: "Outlook (Prospek Masa Depan)", icon: TrendingUp },
    ],
  },
];

export const CATEGORY_META: Record<string, { icon: LucideIcon; accent: string }> = {
  // Super Categories
  "21 Kategori": { icon: LayoutGrid, accent: "text-primary" },
  "100 Framework": { icon: Grid2X2, accent: "text-purple-600 dark:text-purple-400" },
  "Keuangan & Pasar": { icon: Wallet, accent: "text-emerald-600 dark:text-emerald-400" },
  "Kesehatan & Personal": { icon: Heart, accent: "text-rose-600 dark:text-rose-400" },
  "Kreatif & Akademi": { icon: PenTool, accent: "text-pink-600 dark:text-pink-400" },
  "Knowledge & Bisnis": { icon: BookOpen, accent: "text-sky-600 dark:text-sky-400" },

  // The 21 Categories
  "Dapur dan Bahan Makanan": { icon: Utensils, accent: "text-orange-500 dark:text-orange-400" },
  "Pemeliharaan Rumah dan Utilitas": { icon: Home, accent: "text-amber-600 dark:text-amber-400" },
  "Kendaraan dan Otomotif": { icon: Car, accent: "text-blue-600 dark:text-blue-400" },
  "Perjalanan": { icon: Plane, accent: "text-teal-600 dark:text-teal-400" },
  "Keluarga dan Internal Rumah": { icon: Heart, accent: "text-pink-600 dark:text-pink-400" },
  "Relasi Jejaring dan Profesional": { icon: Users, accent: "text-indigo-600 dark:text-indigo-400" },
  "Lingkungan Komunitas Warga": { icon: Building2, accent: "text-emerald-600 dark:text-emerald-400" },
  "Sosial dan Keagamaan": { icon: HeartHandshake, accent: "text-green-600 dark:text-green-400" },
  "Keselamatan dan Darurat": { icon: ShieldAlert, accent: "text-rose-600 dark:text-rose-400" },
  "Perencanaan Alur Kerja Proyek": { icon: FolderKanban, accent: "text-purple-600 dark:text-purple-400" },
  "Pelaksanaan Tugas dan Karya": { icon: CheckSquare, accent: "text-sky-600 dark:text-sky-400" },
  "Jadwal dan Kalender": { icon: CalendarDays, accent: "text-blue-500 dark:text-blue-400" },
  "Fokus dan Kebiasaan": { icon: Timer, accent: "text-yellow-600 dark:text-yellow-400" },
  "Rapat dan Kolaborasi Tim": { icon: MessagesSquare, accent: "text-violet-600 dark:text-violet-400" },
  "Manajemen Sumber Daya Manusia": { icon: Users, accent: "text-cyan-600 dark:text-cyan-400" },
  "Dokumentasi dan Wiki": { icon: BookOpen, accent: "text-emerald-500 dark:text-emerald-400" },
  "Pengelolaan Form dan Template": { icon: FileCode2, accent: "text-indigo-500 dark:text-indigo-400" },
  "Keuangan dan Aset": { icon: Wallet, accent: "text-emerald-600 dark:text-emerald-400" },
  "Vendor dan Logistik Kantor": { icon: Truck, accent: "text-amber-500 dark:text-amber-400" },
  "Target dan Performa": { icon: Target, accent: "text-rose-500 dark:text-rose-400" },
  "Utilitas Sistem": { icon: Settings, accent: "text-slate-500 dark:text-slate-400" },

  // Legacy Domain Categories
  Finance: { icon: Wallet, accent: "text-emerald-600 dark:text-emerald-400" },
  "Phase Side": { icon: Compass, accent: "text-indigo-600 dark:text-indigo-400" },
  "100 Tools": { icon: Grid2X2, accent: "text-purple-600 dark:text-purple-400" },
  Productivity: { icon: CheckSquare, accent: "text-blue-600 dark:text-blue-400" },
  Personal: { icon: User, accent: "text-rose-600 dark:text-rose-400" },
  Society: { icon: Users, accent: "text-amber-600 dark:text-amber-400" },
  "Creative & Media": { icon: PenTool, accent: "text-pink-600 dark:text-pink-400" },
  "Academy & Tools": { icon: GraduationCap, accent: "text-sky-600 dark:text-sky-400" },
};

export const SUPER_CATEGORIES = [
  { id: "All", label: "Semua", icon: LayoutDashboard },
  { id: "Tools", label: "Tools", icon: Wrench },
  { id: "100 Framework", label: "100 Framework", icon: Grid2X2 },
  { id: "Keuangan & Pasar", label: "Keuangan & Pasar", icon: Wallet },
  { id: "Kesehatan & Personal", label: "Kesehatan & Personal", icon: Heart },
  { id: "Kreatif & Akademi", label: "Kreatif & Akademi", icon: PenTool },
  { id: "Knowledge & Bisnis", label: "Knowledge & Bisnis", icon: BookOpen },
];
