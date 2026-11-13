import React, { useState, useMemo, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  STANDALONE_MBA_APPS,
  ToolsFlipCard,
  getToolsGradient,
} from "@/features/launcher/Tools100Section";
import { MBACard } from "@/components/common/MBACard";
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
  Truck,
  Package,
  Briefcase,
  MessagesSquare,
  Clock,
  Receipt,
  LineChart,
  Search,
  Shield,
  Store,
  FileCheck,
  Award,
  UserCheck,
  Grid2X2,
} from "lucide-react";

export type BizOpsCategory =
  | "all"
  | "operations"
  | "customers"
  | "administration"
  | "strategy"
  | "organization";

const LEGACY_BIZ_OPS_CATEGORY_MAP: Record<string, BizOpsCategory> = {
  supply: "operations",
  commercial: "customers",
  "back-office": "administration",
  innovation: "strategy",
  governance: "organization",
};

export function normalizeBizOpsCategory(raw?: string | null): BizOpsCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "operations" ||
    key === "customers" ||
    key === "administration" ||
    key === "strategy" ||
    key === "organization"
  ) {
    return key;
  }
  return LEGACY_BIZ_OPS_CATEGORY_MAP[key] ?? "all";
}

export interface BizOpsSubMenu {
  id: string;
  label: string;
  to: string;
}

export type ModuleComponentCategory =
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

export interface BizOpsComponentGroup {
  category: ModuleComponentCategory;
  items: BizOpsSubMenu[];
}

export interface BizOpsAppItem {
  id: string;
  name: string;
  category: Exclude<BizOpsCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  features: BizOpsSubMenu[];
  tools: BizOpsSubMenu[];
  componentGroups: BizOpsComponentGroup[];
  subMenus: BizOpsSubMenu[];
}

export const BIZ_OPS_APPS: BizOpsAppItem[] = [
  // ============================================================================
  // 1. Operations (3 Apps)
  // ============================================================================
  {
    id: "vendors-and-procurement",
    name: "Procurement Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Direktori penyedia jasa dan mitra kerja serta persetujuan pengadaan purchase orders (PO).",
    to: "/peh/vendors",
    icon: Truck,
    badge: "Operations",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Operations",
    features: [
      { id: "vendor-directory", label: "Vendor Directory", to: "/peh/vendors" },
    ],
    tools: [
      { id: "procurement", label: "Purchase Orders", to: "/peh/procurement" },
    ],
    componentGroups: [
      {
        category: "Workflows",
        items: [
          { id: "procurement", label: "Purchase Orders", to: "/peh/procurement" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "vendor-directory", label: "Vendor Directory", to: "/peh/vendors" },
        ],
      },
    ],
    subMenus: [
      { id: "vendor-directory", label: "Vendor Directory", to: "/peh/vendors" },
      { id: "procurement", label: "Purchase Orders", to: "/peh/procurement" },
    ],
  },
  {
    id: "products-and-stock",
    name: "Inventory Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Katalog penawaran produk terstruktur, pengendalian inventaris stok pergudangan, pelacakan lot batch, dan pemantauan rantai dingin (cold chain).",
    to: "/katalog-produk",
    icon: Package,
    badge: "Operations",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Operations",
    features: [
      { id: "product-catalog", label: "Product Catalog", to: "/katalog-produk" },
      { id: "inventory", label: "Inventory", to: "/inventory" },
    ],
    tools: [
      { id: "batch-track", label: "Batch Track", to: "/lainnya?app=batch-track" },
      { id: "cold-chain", label: "Cold Chain", to: "/lainnya?app=cold-chain" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "inventory", label: "Inventory", to: "/inventory" },
        ],
      },
      {
        category: "Tools",
        items: [
          { id: "batch-track", label: "Batch Track", to: "/lainnya?app=batch-track" },
        ],
      },
      {
        category: "Dashboards",
        items: [
          { id: "cold-chain", label: "Cold Chain", to: "/lainnya?app=cold-chain" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "product-catalog", label: "Product Catalog", to: "/katalog-produk" },
        ],
      },
    ],
    subMenus: [
      { id: "product-catalog", label: "Product Catalog", to: "/katalog-produk" },
      { id: "inventory", label: "Inventory", to: "/inventory" },
      { id: "batch-track", label: "Batch Track", to: "/lainnya?app=batch-track" },
      { id: "cold-chain", label: "Cold Chain", to: "/lainnya?app=cold-chain" },
    ],
  },
  {
    id: "quality-and-incidents",
    name: "Quality Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pemeriksaan kendali mutu operasional, pencatatan insiden lapangan, meja tiket penanganan masalah, keselamatan kerja, dan dokumentasi SOP prosedur baku.",
    to: "/lainnya?app=quality-check",
    icon: Shield,
    badge: "Operations",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Operations",
    features: [
      { id: "sop", label: "Standard Operating Procedures", to: "/lainnya?app=sop" },
      { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log" },
      { id: "keselamatan-kerja", label: "Keselamatan Kerja", to: "/peh/compliance" },
    ],
    tools: [
      { id: "quality-check", label: "Quality Check", to: "/lainnya?app=quality-check" },
      { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "keselamatan-kerja", label: "Keselamatan Kerja", to: "/peh/compliance" },
        ],
      },
      {
        category: "Tools",
        items: [
          { id: "quality-check", label: "Quality Check", to: "/lainnya?app=quality-check" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log" },
        ],
      },
      {
        category: "Guides",
        items: [
          { id: "sop", label: "Standard Operating Procedures", to: "/lainnya?app=sop" },
        ],
      },
    ],
    subMenus: [
      { id: "quality-check", label: "Quality Check", to: "/lainnya?app=quality-check" },
      { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log" },
      { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk" },
      { id: "sop", label: "Standard Operating Procedures", to: "/lainnya?app=sop" },
      { id: "keselamatan-kerja", label: "Keselamatan Kerja", to: "/peh/compliance" },
    ],
  },

  // ============================================================================
  // 2. Customers (2 Apps)
  // ============================================================================
  {
    id: "client-records",
    name: "Client Management",
    category: "customers",
    categoryLabel: "Customers",
    shortDesc:
      "Direktori profil klien korporasi, relasi klien dan mitra usaha (partner), serta pengelolaan kontak relasi (CRM).",
    to: "/klien",
    icon: Briefcase,
    badge: "Customers",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Customers",
    features: [
      { id: "clients-directory", label: "Client Directory", to: "/klien" },
      { id: "klien-dan-partner", label: "Klien dan Partner", to: "/klien" },
    ],
    tools: [
      { id: "contacts-crm", label: "Contact Management", to: "/contacts" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "contacts-crm", label: "Contact Management", to: "/contacts" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "clients-directory", label: "Client Directory", to: "/klien" },
          { id: "klien-dan-partner", label: "Klien dan Partner", to: "/klien" },
        ],
      },
    ],
    subMenus: [
      { id: "clients-directory", label: "Client Directory", to: "/klien" },
      { id: "klien-dan-partner", label: "Klien dan Partner", to: "/klien" },
      { id: "contacts-crm", label: "Contact Management", to: "/contacts" },
    ],
  },
  {
    id: "customer-service-management",
    name: "Customer Service Management",
    category: "customers",
    categoryLabel: "Customers",
    shortDesc:
      "Portal kolaborasi dan pesan klien, histori interaksi dan umpan balik kepuasan, pengaturan antrean layanan, reservasi konsultasi, buku tamu, loyalitas, keanggotaan, pesanan klien, dan tarif layanan.",
    to: "/portal",
    icon: MessagesSquare,
    badge: "Customers",
    accentGradient: "from-violet-500 to-purple-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Customers",
    features: [
      { id: "collab-portal", label: "Client Portal", to: "/portal" },
      { id: "client-messages", label: "Client Messaging", to: "/portal/pesan" },
      { id: "visitor-log", label: "Visitor Records", to: "/lainnya?app=visitor-log" },
      { id: "loyalty-point", label: "Loyalty Program", to: "/lainnya?app=loyalty-point" },
      { id: "membership-card", label: "Membership Management", to: "/lainnya?app=membership-card" },
      { id: "client-orders", label: "Client Orders", to: "/lainnya?app=client-orders" },
    ],
    tools: [
      { id: "interaction-manager", label: "Interaction Log", to: "/interaction-manager" },
      { id: "feedback-loop", label: "Client Feedback", to: "/lainnya?app=feedback-loop" },
      { id: "queue-line", label: "Queue Management", to: "/lainnya?app=queue-line" },
      { id: "book-slot", label: "Appointment Booking", to: "/lainnya?app=book-slot" },
      { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "collab-portal", label: "Client Portal", to: "/portal" },
          { id: "client-messages", label: "Client Messaging", to: "/portal/pesan" },
          { id: "loyalty-point", label: "Loyalty Program", to: "/lainnya?app=loyalty-point" },
          { id: "membership-card", label: "Membership Management", to: "/lainnya?app=membership-card" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "queue-line", label: "Queue Management", to: "/lainnya?app=queue-line" },
          { id: "book-slot", label: "Appointment Booking", to: "/lainnya?app=book-slot" },
        ],
      },
      {
        category: "Templates",
        items: [
          { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard" },
        ],
      },
      {
        category: "Analytics",
        items: [
          { id: "feedback-loop", label: "Client Feedback", to: "/lainnya?app=feedback-loop" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "interaction-manager", label: "Interaction Log", to: "/interaction-manager" },
          { id: "visitor-log", label: "Visitor Records", to: "/lainnya?app=visitor-log" },
          { id: "client-orders", label: "Client Orders", to: "/lainnya?app=client-orders" },
        ],
      },
    ],
    subMenus: [
      { id: "collab-portal", label: "Client Portal", to: "/portal" },
      { id: "client-messages", label: "Client Messaging", to: "/portal/pesan" },
      { id: "interaction-manager", label: "Interaction Log", to: "/interaction-manager" },
      { id: "feedback-loop", label: "Client Feedback", to: "/lainnya?app=feedback-loop" },
      { id: "queue-line", label: "Queue Management", to: "/lainnya?app=queue-line" },
      { id: "book-slot", label: "Appointment Booking", to: "/lainnya?app=book-slot" },
      { id: "visitor-log", label: "Visitor Records", to: "/lainnya?app=visitor-log" },
      { id: "loyalty-point", label: "Loyalty Program", to: "/lainnya?app=loyalty-point" },
      { id: "membership-card", label: "Membership Management", to: "/lainnya?app=membership-card" },
      { id: "client-orders", label: "Client Orders", to: "/lainnya?app=client-orders" },
      { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard" },
    ],
  },

  // ============================================================================
  // 3. Administration (3 Apps)
  // ============================================================================
  {
    id: "spending-and-assets",
    name: "Business Resource Management",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Pelacakan pos pengeluaran operasional usaha, pemantauan langganan layanan berkala, alokasi kapasitas sumber daya, serta inventarisasi aset fasilitas kantor.",
    to: "/expense-tracker",
    icon: Receipt,
    badge: "Administration",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Administration",
    features: [
      { id: "asset-manager", label: "Asset Manager", to: "/asset-manager" },
      { id: "resource-manager", label: "Resource Manager", to: "/resource-manager" },
    ],
    tools: [
      { id: "expense-tracker", label: "Expense Tracker", to: "/expense-tracker" },
      { id: "subscription-manager", label: "Subscription Manager", to: "/subscription-manager" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "resource-manager", label: "Resource Manager", to: "/resource-manager" },
        ],
      },
      {
        category: "Tools",
        items: [
          { id: "expense-tracker", label: "Expense Tracker", to: "/expense-tracker" },
        ],
      },
      {
        category: "Automations",
        items: [
          { id: "subscription-manager", label: "Subscription Manager", to: "/subscription-manager" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "asset-manager", label: "Asset Manager", to: "/asset-manager" },
        ],
      },
    ],
    subMenus: [
      { id: "expense-tracker", label: "Expense Tracker", to: "/expense-tracker" },
      { id: "subscription-manager", label: "Subscription Manager", to: "/subscription-manager" },
      { id: "asset-manager", label: "Asset Manager", to: "/asset-manager" },
      { id: "resource-manager", label: "Resource Manager", to: "/resource-manager" },
    ],
  },
  {
    id: "documents-and-correspondence",
    name: "Document Management",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Buku agenda surat-menyurat korporat, pustaka template dokumen kerja, manajemen format baku, dan formulir administrasi digital.",
    to: "/lainnya?app=mailroom",
    icon: FileCheck,
    badge: "Administration",
    accentGradient: "from-sky-500 to-teal-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Administration",
    features: [
      { id: "letter-log", label: "Correspondence Log", to: "/lainnya?app=mailroom" },
      { id: "template-dokumen-kerja", label: "Document Templates", to: "/lainnya?app=templates" },
    ],
    tools: [
      { id: "template-manager", label: "Template Manager", to: "/template-manager" },
      { id: "forms", label: "Forms", to: "/forms" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "forms", label: "Forms", to: "/forms" },
        ],
      },
      {
        category: "Templates",
        items: [
          { id: "template-dokumen-kerja", label: "Document Templates", to: "/lainnya?app=templates" },
          { id: "template-manager", label: "Template Manager", to: "/template-manager" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "letter-log", label: "Correspondence Log", to: "/lainnya?app=mailroom" },
        ],
      },
    ],
    subMenus: [
      { id: "letter-log", label: "Correspondence Log", to: "/lainnya?app=mailroom" },
      { id: "template-dokumen-kerja", label: "Document Templates", to: "/lainnya?app=templates" },
      { id: "template-manager", label: "Template Manager", to: "/template-manager" },
      { id: "forms", label: "Forms", to: "/forms" },
    ],
  },
  {
    id: "data-and-access",
    name: "Business Intelligence",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Pusat statistik kinerja operasional, pencarian arsip terpadu, direktori matriks hak akses pengguna, dan penyusunan laporan kustom.",
    to: "/statistics",
    icon: LineChart,
    badge: "Administration",
    accentGradient: "from-indigo-500 to-sky-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Administration",
    features: [
      { id: "access-directory", label: "Access Directory", to: "/lainnya?app=access-matrix" },
      { id: "custom-reports", label: "Custom Reports", to: "/lainnya?app=custom-reports" },
    ],
    tools: [
      { id: "statistics", label: "Statistics", to: "/statistics" },
      { id: "search-manager", label: "Search Manager", to: "/search-manager" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "search-manager", label: "Search Manager", to: "/search-manager" },
        ],
      },
      {
        category: "Dashboards",
        items: [
          { id: "statistics", label: "Statistics", to: "/statistics" },
        ],
      },
      {
        category: "Analytics",
        items: [
          { id: "custom-reports", label: "Custom Reports", to: "/lainnya?app=custom-reports" },
        ],
      },
      {
        category: "Settings",
        items: [
          { id: "access-directory", label: "Access Directory", to: "/lainnya?app=access-matrix" },
        ],
      },
    ],
    subMenus: [
      { id: "statistics", label: "Statistics", to: "/statistics" },
      { id: "search-manager", label: "Search Manager", to: "/search-manager" },
      { id: "access-directory", label: "Access Directory", to: "/lainnya?app=access-matrix" },
      { id: "custom-reports", label: "Custom Reports", to: "/lainnya?app=custom-reports" },
    ],
  },

  // ============================================================================
  // 4. Strategy (2 Apps)
  // ============================================================================
  {
    id: "goals-and-performance",
    name: "Performance Management",
    category: "strategy",
    categoryLabel: "Strategy",
    shortDesc:
      "Penyelarasan sasaran strategis perusahaan (OKR/KPI) dan evaluasi berkala melalui sesi tinjauan kinerja serta retrospektif tim.",
    to: "/goal-manager",
    icon: Award,
    badge: "Strategy",
    accentGradient: "from-yellow-500 to-amber-600",
    accentBorder: "border-yellow-500/30 hover:border-yellow-500/60",
    badgeBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    badgeText: "Strategy",
    features: [
      { id: "goal-manager", label: "Goal Manager", to: "/goal-manager" },
    ],
    tools: [
      { id: "review-retrospective", label: "Performance Review", to: "/lainnya?app=retro" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "goal-manager", label: "Goal Manager", to: "/goal-manager" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "review-retrospective", label: "Performance Review", to: "/lainnya?app=retro" },
        ],
      },
    ],
    subMenus: [
      { id: "goal-manager", label: "Goal Manager", to: "/goal-manager" },
      { id: "review-retrospective", label: "Performance Review", to: "/lainnya?app=retro" },
    ],
  },
  {
    id: "strategic-frameworks",
    name: "Strategic Frameworks",
    category: "strategy",
    categoryLabel: "Strategy",
    shortDesc:
      "Kerangka 8 Pilar Strategis, kumpulan lengkap 100 MBA Tools, serta perangkat valuasi bisnis terpadu.",
    to: "/100-framework",
    icon: Grid2X2,
    badge: "Strategy",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Strategy",
    features: [],
    tools: [
      { id: "mba-tools-100", label: "100 MBA Tools", to: "/100-framework" },
      { id: "valuasi-mappi", label: "Valuasi Bisnis MAPPI", to: "/valuasi" },
      { id: "dcf-calculator", label: "DCF Calculator", to: "/valuasi?tab=dcf" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "mba-tools-100", label: "100 MBA Tools", to: "/100-framework" },
          { id: "valuasi-mappi", label: "Valuasi Bisnis MAPPI", to: "/valuasi" },
          { id: "dcf-calculator", label: "DCF Calculator", to: "/valuasi?tab=dcf" },
        ],
      },
    ],
    subMenus: [
      { id: "mba-tools-100", label: "100 MBA Tools", to: "/100-framework" },
      { id: "valuasi-mappi", label: "Valuasi Bisnis MAPPI", to: "/valuasi" },
      { id: "dcf-calculator", label: "DCF Calculator", to: "/valuasi?tab=dcf" },
    ],
  },

  // ============================================================================
  // 5. Organization (2 Apps)
  // ============================================================================
  {
    id: "people-and-attendance",
    name: "Workforce Management",
    category: "organization",
    categoryLabel: "Organization",
    shortDesc:
      "Pencatatan kehadiran jam kerja tim, serah terima tugas pergantian shift, pelacakan pelatihan SDM, dan pemantauan kapasitas beban kerja.",
    to: "/lainnya?app=time-clock",
    icon: UserCheck,
    badge: "Organization",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Organization",
    features: [
      { id: "handover-notes", label: "Handover Notes", to: "/lainnya?app=handover-notes" },
      { id: "training-track", label: "Training Track", to: "/lainnya?app=training-track" },
    ],
    tools: [
      { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock" },
      { id: "workload-capacity", label: "Workload Planning", to: "/lainnya?app=workload" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "workload-capacity", label: "Workload Planning", to: "/lainnya?app=workload" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "handover-notes", label: "Handover Notes", to: "/lainnya?app=handover-notes" },
        ],
      },
      {
        category: "Guides",
        items: [
          { id: "training-track", label: "Training Track", to: "/lainnya?app=training-track" },
        ],
      },
    ],
    subMenus: [
      { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock" },
      { id: "handover-notes", label: "Handover Notes", to: "/lainnya?app=handover-notes" },
      { id: "training-track", label: "Training Track", to: "/lainnya?app=training-track" },
      { id: "workload-capacity", label: "Workload Planning", to: "/lainnya?app=workload" },
    ],
  },
  {
    id: "compliance-and-governance-records",
    name: "Corporate Governance",
    category: "organization",
    categoryLabel: "Organization",
    shortDesc:
      "Pemantauan kepatuhan regulasi hukum, administrasi struktur saham pemegang saham (cap table), pencatatan hak cipta lisensi IP, serta pengelolaan PPN dan pajak usaha.",
    to: "/peh/compliance",
    icon: Shield,
    badge: "Organization",
    accentGradient: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Organization",
    features: [
      { id: "cap-table", label: "Shareholder Structure", to: "/peh/cap-table" },
      { id: "ip-licenses", label: "Intellectual Property", to: "/peh/ip-licenses" },
    ],
    tools: [
      { id: "kepatuhan-regulasi", label: "Kepatuhan Regulasi", to: "/peh/compliance" },
      { id: "vat-and-other-taxes", label: "VAT and Other Taxes", to: "/pajak?app=ppn" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "vat-and-other-taxes", label: "VAT and Other Taxes", to: "/pajak?app=ppn" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "cap-table", label: "Shareholder Structure", to: "/peh/cap-table" },
          { id: "ip-licenses", label: "Intellectual Property", to: "/peh/ip-licenses" },
        ],
      },
      {
        category: "Settings",
        items: [
          { id: "kepatuhan-regulasi", label: "Kepatuhan Regulasi", to: "/peh/compliance" },
        ],
      },
    ],
    subMenus: [
      { id: "kepatuhan-regulasi", label: "Kepatuhan Regulasi", to: "/peh/compliance" },
      { id: "cap-table", label: "Shareholder Structure", to: "/peh/cap-table" },
      { id: "ip-licenses", label: "Intellectual Property", to: "/peh/ip-licenses" },
      { id: "vat-and-other-taxes", label: "VAT and Other Taxes", to: "/pajak?app=ppn" },
    ],
  },
];

const MBA_PILLARS_BY_CATEGORY: Record<
  Exclude<BizOpsCategory, "all">,
  readonly string[]
> = {
  operations: ["Operations"],
  customers: ["Commercial"],
  administration: ["Finance", "Analytics"],
  strategy: ["Strategy", "Innovation"],
  organization: ["Organization", "Governance"],
};

const countCategoryModules = (cat: Exclude<BizOpsCategory, "all">): number => {
  const opsCount = BIZ_OPS_APPS.filter((a) => a.category === cat).length;
  const pillars = MBA_PILLARS_BY_CATEGORY[cat];
  const mbaCount = STANDALONE_MBA_APPS.filter((a) =>
    pillars.includes(a.pillar)
  ).length;
  return opsCount + mbaCount;
};

export const BIZ_OPS_CATEGORY_TABS: {
  id: BizOpsCategory;
  label: string;
  title?: string;
  count: number;
}[] = [
  {
    id: "all",
    label: "Semua",
    count: BIZ_OPS_APPS.length + STANDALONE_MBA_APPS.length,
  },
  {
    id: "operations",
    label: "Operations",
    title: "Operations",
    count: countCategoryModules("operations"),
  },
  {
    id: "customers",
    label: "Customers",
    title: "Customers",
    count: countCategoryModules("customers"),
  },
  {
    id: "administration",
    label: "Administration",
    title: "Administration",
    count: countCategoryModules("administration"),
  },
  {
    id: "strategy",
    label: "Strategy",
    title: "Strategy",
    count: countCategoryModules("strategy"),
  },
  {
    id: "organization",
    label: "Organization",
    title: "Organization",
    count: countCategoryModules("organization"),
  },
];

export const BIZ_OPS_TOTAL_MODULES =
  BIZ_OPS_APPS.length + STANDALONE_MBA_APPS.length;
const BIZ_OPS_TOTAL_ITEMS = BIZ_OPS_APPS.reduce(
  (acc, app) => acc + app.subMenus.length,
  0
);
const MBA_TOTAL_TOOLS = STANDALONE_MBA_APPS.reduce(
  (acc, app) => acc + app.features.length,
  0
);
export const BIZ_OPS_TOTAL_BADGE = `${BIZ_OPS_TOTAL_MODULES} Modul • ${BIZ_OPS_TOTAL_ITEMS} Features • ${MBA_TOTAL_TOOLS} Tools`;
syncLauncherPageBadge("mode_business", BIZ_OPS_TOTAL_BADGE);
export const BIZ_OPS_SUMMARY_DESC = BIZ_OPS_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export const CATEGORY_SUBTITLES: Record<BizOpsCategory, string> = {
  all: "Ruang kendali terpadu yang menyatukan modul operasional bisnis bersama 8 Pilar Strategis dan 100 MBA Tools dalam satu halaman kerja.",
  operations:
    "Pengelolaan pengadaan vendor, inventaris stok pergudangan, serta kendali mutu dan insiden yang terintegrasi dengan instrumen MBA pilar Operations.",
  customers:
    "Manajemen profil klien, portal komunikasi, serta alur layanan dan loyalitas pelanggan yang diselaraskan dengan instrumen MBA pilar Commercial.",
  administration:
    "Pengendalian sumber daya dan aset, tata persuratan dokumen, serta intelijen bisnis yang diperkuat oleh instrumen MBA pilar Finance dan Analytics.",
  strategy:
    "Penyelarasan sasaran kinerja (OKR/KPI) dan evaluasi retrospektif tim yang dipadukan dengan kerangka kerja MBA pilar Strategy dan Innovation.",
  organization:
    "Pengaturan kehadiran serta kapasitas SDM dan pencatatan kepatuhan maupun struktur ekuitas yang menyatu dengan instrumen MBA pilar Organization dan Governance.",
};

export function BusinessOperationsCustomersPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<BizOpsCategory>(
    () => {
      if (typeof window !== "undefined") {
        try {
          const params = new URLSearchParams(window.location.search);
          const cat = params.get("category") || params.get("pill");
          if (cat) return normalizeBizOpsCategory(cat);
        } catch {}
      }
      return "all";
    }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_business") || "mode_business";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const activeCategory = normalizeBizOpsCategory(selectedCategory);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BIZ_OPS_APPS.filter((app) => {
      const matchCategory =
        activeCategory === "all" || app.category === activeCategory;

      const matchSearch =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.shortDesc.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.subMenus.some((sub) => sub.label.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const filteredMbaApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STANDALONE_MBA_APPS.filter((app) => {
      const matchCategory =
        activeCategory === "all" ||
        MBA_PILLARS_BY_CATEGORY[activeCategory].includes(app.pillar);

      const matchSearch =
        q === "" ||
        app.title.toLowerCase().includes(q) ||
        app.subtitle.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.pillar.toLowerCase().includes(q) ||
        app.features.some(
          (feat) =>
            feat.title.toLowerCase().includes(q) ||
            (feat.desc && feat.desc.toLowerCase().includes(q))
        );

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayCards = useMemo(() => {
    const bizOpsCards = filteredApps.map((app) => ({
      id: app.to || app.name,
      key: app.id,
      element: (
        <MBACard
          key={app.id}
          title={app.name}
          to={app.to}
          icon={app.icon}
          badge={app.badgeText}
          shortDesc={app.shortDesc}
          accentGradient={app.accentGradient}
          features={app.features.map((sub) => ({
            title: sub.label,
            to: sub.to || app.to,
          }))}
          tools={app.tools.map((sub) => ({
            title: sub.label,
            to: sub.to || app.to,
          }))}
          categoryGroups={app.componentGroups.map((group, idx) => ({
            id: idx + 1,
            categoryNumber: idx + 1,
            name: group.category,
            items: group.items.map((sub) => ({
              title: sub.label,
              to: sub.to || app.to,
            })),
          }))}
          isFav={isFavorite(app.to)}
          toggleFavorite={toggleFavorite}
        />
      ),
    }));

    const mbaCards = filteredMbaApps.map((app) => ({
      id: app.to || app.title,
      key: app.id,
      element: (
        <ToolsFlipCard
          key={app.id}
          app={app}
          isFav={isFavorite(app.to)}
          toggleFavorite={toggleFavorite}
          gradient={getToolsGradient(app.title)}
        />
      ),
    }));

    return sortCardsWithPinned(
      [...bizOpsCards, ...mbaCards],
      (c) => c.id,
      pinnedList
    );
  }, [filteredApps, filteredMbaApps, pinnedList, isFavorite, toggleFavorite]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(raf);
  }, [activeCategory, filteredApps.length, filteredMbaApps.length]);

  return (
    <LauncherPageProvider pageId={pageId}>
      <div className="w-full flex-1 flex flex-col font-sans pb-16">
        {/* Portaled ShellHeader Filter Pills (6 Single-Word Functional Axis Pills) */}
        <ShellHeader>
          <HeaderNavPills
            items={adjustCategoryTabsCount(
              BIZ_OPS_CATEGORY_TABS,
              getPageCountDelta(pageId)
            )}
            activeId={activeCategory}
            onSelect={(id) => setSelectedCategory(normalizeBizOpsCategory(id))}
          />
        </ShellHeader>

        {/* Main Page Container */}
        <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
              <span>Business Administration and Operations Management</span>
            </h1>
          </div>

          {/* Applications Grid: Unified sorted with pinned cards at the 1st position */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
            {displayCards.map((c) => c.element)}
            {activeCategory === "all" && (
              <MovedCardsGridItems pageId={pageId} searchQuery={searchQuery} />
            )}
          </div>

          {/* Empty Search Result Fallback */}
          {filteredApps.length === 0 &&
            filteredMbaApps.length === 0 &&
            (activeCategory !== "all" ||
              getCardsMovedIntoPage(pageId).length === 0) && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border bg-card/40 my-6">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
                  <Search className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Tidak ada modul ditemukan
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mt-1">
                  Tidak ada aplikasi yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori {activeCategory}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Reset Filter dan Pencarian
                </button>
              </div>
            )}
        </div>
      </div>
    </LauncherPageProvider>
  );
}

export default BusinessOperationsCustomersPage;
