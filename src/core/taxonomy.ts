/**
 * OFFICIAL PRODUCT TAXONOMY — DNA CONSULTING SaaS
 *
 * Strict Hierarchy:
 * Page → Module → Feature / Tool
 *
 * Definitions:
 * - Page: The highest-level application area representing a major functional or business domain.
 * - Module: A functional grouping within a Page organizing related capabilities.
 * - Feature: A system capability or functional workflow provided within a Module.
 * - Tool: A specific instrument used to perform an activity, analysis, calculation, assessment, or produce an output.
 *
 * Feature and Tool are parallel elements under a Module (a Tool is not a child of a Feature).
 */

import { CATEGORIES } from "@/frameworkData";

export type ProductNodeType = "page" | "module" | "feature" | "tool";

export interface TaxonomyItem {
  readonly id: string;
  readonly name: string;
  readonly type: "feature" | "tool";
  readonly route: string;
  readonly description?: string;
  readonly badge?: string;
  readonly iconName?: string;
}

export interface TaxonomyModule {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly pageId: string;
  readonly features: readonly TaxonomyItem[];
  readonly tools: readonly TaxonomyItem[];
}

export interface TaxonomyPage {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly route: string;
  readonly badge?: string;
  readonly modules: readonly TaxonomyModule[];
}

/**
 * Master Product Taxonomy Registry
 * Defines all 10 Master Pages and their structured Modules, Features, and Tools.
 */
export const PRODUCT_TAXONOMY: readonly TaxonomyPage[] = Object.freeze([
  // 1. FINANCIAL PLANNING & WEALTH MANAGEMENT
  {
    id: "financial-planning",
    name: "Financial Planning and Wealth Management",
    description: "Perencanaan keuangan terpadu, 5 tahapan kekayaan, kuadran aset, dan valuasi bisnis.",
    route: "/financial-planning",
    badge: "5 Tahapan",
    modules: [
      {
        id: "fin-strategic-valuation",
        name: "Strategic Valuation & Frameworks",
        description: "Metodologi penilaian aset dan pemantauan valuasi bisnis.",
        pageId: "financial-planning",
        features: [
          { id: "fw-catalog", name: "Katalog Framework Valuasi", type: "feature", route: "/100-framework" },
        ],
        tools: [
          { id: "fw-100", name: "100 Framework", type: "tool", route: "/100-framework" },
          { id: "valuasi-mappi", name: "Valuasi MAPPI", type: "tool", route: "/valuasi" },
        ],
      },
      {
        id: "fin-commodity-indices",
        name: "Commodity & National Indices",
        description: "Pemantauan harga komoditas dan indikator pembangunan nasional.",
        pageId: "financial-planning",
        features: [
          { id: "market-monitor", name: "Market Price Monitor", type: "feature", route: "/100-komoditas" },
        ],
        tools: [
          { id: "national-indices", name: "10 Indeks Pembangunan", type: "tool", route: "/10-indeks" },
        ],
      },
      {
        id: "fin-assets-earning",
        name: "Assets & Earning Quadrants",
        description: "Alokasi modal, instrumen likuiditas, dan optimalisasi kuadran pendapatan.",
        pageId: "financial-planning",
        features: [
          { id: "kuadran-aset", name: "Kuadran Aset", type: "feature", route: "/asset" },
          { id: "kuadran-pendapatan", name: "Kuadran Pendapatan", type: "feature", route: "/earning" },
          { id: "kesehatan-finansial", name: "Kesehatan Finansial", type: "feature", route: "/financial-health" },
        ],
        tools: [
          { id: "bunga-majemuk", name: "Kalkulator Bunga Majemuk", type: "tool", route: "/investasi?app=bunga-majemuk" },
          { id: "roi-calc", name: "Return on Investment (ROI)", type: "tool", route: "/investasi?app=roi" },
        ],
      },
      {
        id: "fin-liabilities-expense",
        name: "Liabilities & Expense Control",
        description: "Pengendalian beban utang, kewajiban pajak, dan efisiensi pengeluaran.",
        pageId: "financial-planning",
        features: [
          { id: "kuadran-liabilitas", name: "Kuadran Liabilitas", type: "feature", route: "/liability" },
          { id: "kuadran-pengeluaran", name: "Kuadran Pengeluaran", type: "feature", route: "/expense" },
          { id: "kredit-utang", name: "Kredit & Utang", type: "feature", route: "/kredit" },
          { id: "langganan-tagihan", name: "Subscriptions", type: "feature", route: "/subscriptions" },
        ],
        tools: [
          { id: "pph21-tool", name: "PPh 21 Personal", type: "tool", route: "/pajak?app=pph21" },
          { id: "pajak-saham", name: "Pajak Saham & Dividen", type: "tool", route: "/pajak?app=saham" },
          { id: "pajak-properti", name: "Pajak Properti", type: "tool", route: "/pajak?app=properti" },
        ],
      },
      {
        id: "fin-wealth-spectrum",
        name: "Wealth Spectrum 5 Tahapan",
        description: "Progression model kekayaan: Surety, Flow, Build, Grow, Legacy.",
        pageId: "financial-planning",
        features: [
          { id: "stage-surety", name: "Tahap 1: Surety", type: "feature", route: "/surety" },
          { id: "stage-flow", name: "Tahap 2: Flow", type: "feature", route: "/flow" },
          { id: "stage-build", name: "Tahap 3: Build", type: "feature", route: "/build" },
          { id: "stage-grow", name: "Tahap 4: Grow", type: "feature", route: "/grow" },
          { id: "stage-legacy", name: "Tahap 5: Legacy", type: "feature", route: "/legacy" },
        ],
        tools: [
          { id: "risk-profile-tool", name: "Profil Risiko & Alokasi", type: "tool", route: "/grow?tab=cat_profil" },
          { id: "rebalance-tool", name: "Rebalancing Periodik", type: "tool", route: "/grow?tab=cat_rebalance" },
        ],
      },
    ],
  },

  // 2. BUSINESS ADMINISTRATION AND OPERATIONS MANAGEMENT
  {
    id: "business-operations",
    name: "Business Administration and Operations Management",
    description: "Operasional bisnis, pengadaan, logistik, katalog produk, dan 100 Strategic Frameworks.",
    route: "/business-operations",
    badge: `${12 + CATEGORIES.length} Modul`,
    modules: [
      {
        id: "biz-strategic-management",
        name: "Strategic Frameworks",
        description: "Analisis lingkungan bisnis makro, 8 Pilar Strategis, 100 MBA Tools, dan strategi posisi bersaing.",
        pageId: "business-operations",
        features: [
          { id: "strategic-planning", name: "Strategic Planning", type: "feature", route: "/business-operations" },
        ],
        tools: [
          { id: "swot-tool", name: "SWOT Analysis", type: "tool", route: "/swot" },
          { id: "tows-tool", name: "TOWS Matrix", type: "tool", route: "/tows" },
          { id: "pestel-tool", name: "PESTEL Analysis", type: "tool", route: "/pestel" },
          { id: "porter-tool", name: "Porter's Five Forces", type: "tool", route: "/porter" },
          { id: "vrio-tool", name: "VRIO Framework", type: "tool", route: "/vrio" },
          { id: "value-chain-tool", name: "Value Chain Analysis", type: "tool", route: "/value-chain" },
          { id: "bcg-tool", name: "BCG Matrix", type: "tool", route: "/bcg" },
          { id: "ansoff-tool", name: "Ansoff Matrix", type: "tool", route: "/ansoff" },
          { id: "blue-ocean-tool", name: "Blue Ocean Strategy (ERRC)", type: "tool", route: "/blue-ocean" },
          { id: "value-disciplines-tool", name: "Value Disciplines Model", type: "tool", route: "/value-disciplines" },
        ],
      },
      {
        id: "biz-models-propositions",
        name: "Business Model dan Value Proposition",
        description: "Desain model bisnis dan validasi proposisi nilai pelanggan.",
        pageId: "business-operations",
        features: [
          { id: "business-modeling", name: "Business Modeling", type: "feature", route: "/bmc" },
        ],
        tools: [
          { id: "bmc-tool", name: "Business Model Canvas (BMC)", type: "tool", route: "/bmc" },
          { id: "lean-canvas-tool", name: "Lean Canvas", type: "tool", route: "/lean-canvas" },
          { id: "vpc-tool", name: "Value Proposition Canvas", type: "tool", route: "/value-proposition-canvas" },
          { id: "empathy-map-tool", name: "Empathy Map", type: "tool", route: "/empathy-map" },
        ],
      },
      {
        id: "biz-procurement-supply",
        name: "Procurement Management",
        description: "Manajemen vendor, pesanan pembelian, dan inventaris barang.",
        pageId: "business-operations",
        features: [
          { id: "procurement-system", name: "Procurement Management", type: "feature", route: "/peh/vendors" },
          { id: "inventory-system", name: "Inventory Management", type: "feature", route: "/katalog-produk" },
          { id: "client-system", name: "Client Management", type: "feature", route: "/klien" },
          { id: "customer-service-system", name: "Customer Service Management", type: "feature", route: "/portal" },
          { id: "resource-system", name: "Business Resource Management", type: "feature", route: "/expense-tracker" },
          { id: "document-system", name: "Document Management", type: "feature", route: "/lainnya?app=mailroom" },
          { id: "bi-system", name: "Business Intelligence", type: "feature", route: "/statistics" },
          { id: "performance-system", name: "Performance Management", type: "feature", route: "/goal-manager" },
          { id: "workforce-system", name: "Workforce Management", type: "feature", route: "/lainnya?app=time-clock" },
          { id: "governance-system", name: "Corporate Governance", type: "feature", route: "/peh/compliance" },
        ],
        tools: [
          { id: "incoterms-tool", name: "Incoterms Navigator", type: "tool", route: "/incoterms" },
          { id: "sipoc-tool", name: "SIPOC Diagram", type: "tool", route: "/framework/sipoc-diagram" },
          { id: "ppn-calc", name: "VAT and Other Taxes", type: "tool", route: "/pajak?app=ppn" },
        ],
      },
    ],
  },

  // 3. PRODUCTIVITY WORKSPACE & WORKFLOW SYSTEMS
  {
    id: "work-productivity",
    name: "Productivity Workspace and Workflow Systems",
    description: "Sistem eksekusi tugas, jadwal kalender, manajemen proyek, dan otomasi alur kerja.",
    route: "/work-productivity",
    badge: "9 Modul",
    modules: [
      {
        id: "prod-task-execution",
        name: "Task & Time Execution",
        description: "Manajemen tugas harian, sprint kanban, dan alokasi waktu fokus.",
        pageId: "work-productivity",
        features: [
          { id: "task-manager-app", name: "Task Manager", type: "feature", route: "/task-manager" },
          { id: "calendar-app", name: "Calendar", type: "feature", route: "/kalender" },
          { id: "kanban-app", name: "Kanban Board", type: "feature", route: "/kanban" },
          { id: "timeline-app", name: "Timeline Manager", type: "feature", route: "/timeline" },
          { id: "planner-app", name: "Planner", type: "feature", route: "/planner" },
        ],
        tools: [
          { id: "pomodoro-tool", name: "Focus Timer (Pomodoro)", type: "tool", route: "/pomodoro" },
          { id: "eisenhower-tool", name: "Eisenhower Matrix", type: "tool", route: "/eisenhower" },
          { id: "countdown-tool", name: "Countdown", type: "tool", route: "/countdown" },
        ],
      },
      {
        id: "prod-delivery-governance",
        name: "Project Governance & Delivery",
        description: "Pengendalian deliverable formal, milestone, dan alur persetujuan SLA.",
        pageId: "work-productivity",
        features: [
          { id: "project-manager-app", name: "Project Manager", type: "feature", route: "/proyek" },
          { id: "deliverable-manager-app", name: "Deliverable Manager", type: "feature", route: "/deliverable-manager" },
          { id: "workflow-manager-app", name: "Workflow Manager", type: "feature", route: "/workflow-manager" },
          { id: "approval-manager-app", name: "Approval Manager", type: "feature", route: "/approval-manager" },
          { id: "meeting-manager-app", name: "Meeting Manager", type: "feature", route: "/meeting-manager" },
        ],
        tools: [
          { id: "goal-manager-tool", name: "Goal Manager", type: "tool", route: "/goal-manager" },
          { id: "milestone-tool", name: "Milestone & Roadmap", type: "tool", route: "/milestone-manager" },
          { id: "time-tracker-tool", name: "Time Tracker", type: "tool", route: "/time-tracker" },
        ],
      },
    ],
  },

  // 4. CREATIVE WORKSPACE & MEDIA PRODUCTION
  {
    id: "creative-workspace",
    name: "Creative Workspace and Media Production",
    description: "Studio perancangan, repositori kode, dokumentasi kreatif, dan produksi media.",
    route: "/creative-workspace",
    badge: "6 Modul",
    modules: [
      {
        id: "creative-studio",
        name: "Creative Studio & Publishing",
        description: "Laboratorium ide, kanvas visual, dan repositori naskah/kode.",
        pageId: "creative-workspace",
        features: [
          { id: "ideas-feature", name: "Ideas and Concepts", type: "feature", route: "/ideas" },
          { id: "writing-feature", name: "Writing and Documentation", type: "feature", route: "/writing" },
        ],
        tools: [
          { id: "canvas-tool", name: "Whiteboard & Canvas", type: "tool", route: "/lainnya?app=canvas" },
          { id: "code-snippets-tool", name: "Code Snippet Repository", type: "tool", route: "/peh/code-snippet" },
        ],
      },
    ],
  },

  // 5. RESEARCH FOUNDATIONS & REFERENCE FRAMEWORKS
  {
    id: "research-frameworks",
    name: "Research Foundations and Reference Frameworks",
    description: "Pustaka referensi akademik, riset pasar, dan metodologi pengambilan keputusan.",
    route: "/research-frameworks",
    badge: "6 Modul",
    modules: [
      {
        id: "research-library",
        name: "Knowledge Engineering & Research",
        description: "Koleksi bukti riset, basis pengetahuan terverifikasi, dan kliping referensi.",
        pageId: "research-frameworks",
        features: [
          { id: "research-manager-app", name: "Research Manager", type: "feature", route: "/research-manager" },
          { id: "knowledge-base-app", name: "Knowledge Library", type: "feature", route: "/knowledge-base" },
          { id: "wiki-engine-app", name: "Wiki Knowledge Engine", type: "feature", route: "/wiki" },
        ],
        tools: [
          { id: "web-clipper-tool", name: "Web Clipper", type: "tool", route: "/web-clipper" },
          { id: "decision-tree-tool", name: "Decision Tree Analysis", type: "tool", route: "/framework/decision-tree-analysis" },
          { id: "ahp-tool", name: "AHP Process", type: "tool", route: "/framework/analytical-hierarchy-process-ahp" },
        ],
      },
    ],
  },

  // 6. ISLAMIC PRINCIPLES & SHARIA VALUES
  {
    id: "sharia-values",
    name: "Islamic Principles and Sharia Values",
    description: "Kepatuhan syariah, akad muamalah komersial dan sosial, serta kalkulator zakat.",
    route: "/sharia-values",
    badge: "16 Modul",
    modules: [
      {
        id: "sharia-contracts",
        name: "Akad Muamalah",
        description: "Struktur akad komersial dan sosial dalam transaksi syariah.",
        pageId: "sharia-values",
        features: [
          { id: "akad-mudharabah", name: "Mudharabah", type: "feature", route: "/syariah/akad?app=mudharabah" },
          { id: "akad-musyarakah", name: "Musyarakah", type: "feature", route: "/syariah/akad?app=musyarakah" },
          { id: "akad-murabahah", name: "Murabahah", type: "feature", route: "/syariah/akad?app=murabahah" },
          { id: "akad-ijarah", name: "Ijarah", type: "feature", route: "/syariah/akad?app=ijarah" },
        ],
        tools: [
          { id: "tabarru-tool", name: "Tabarru' Assessment", type: "tool", route: "/syariah/akad?app=tabarru" },
          { id: "takaful-tool", name: "Takaful", type: "tool", route: "/syariah/akad?app=takaful" },
          { id: "qardh-tool", name: "Qardh al-Hasan", type: "tool", route: "/syariah/akad?app=qardh" },
        ],
      },
      {
        id: "sharia-compliance",
        name: "Sharia Compliance & Zakat",
        description: "Audit kepatuhan transaksi terlarang dan kalkulasi kewajiban zakat.",
        pageId: "sharia-values",
        features: [
          { id: "zakat-app", name: "Zakat Management", type: "feature", route: "/zakat" },
        ],
        tools: [
          { id: "zakat-penghasilan-tool", name: "Zakat Penghasilan", type: "tool", route: "/zakat?app=penghasilan" },
          { id: "zakat-maal-tool", name: "Zakat Maal", type: "tool", route: "/zakat?app=maal" },
          { id: "riba-screening-tool", name: "Riba Screening", type: "tool", route: "/syariah/terlarang?app=riba" },
        ],
      },
    ],
  },

  // 7. PERSONAL LIFE MANAGEMENT
  {
    id: "personal-life",
    name: "Personal Life Management",
    description: "Pengembangan diri, refleksi harian, kebugaran, dan manajemen kesehatan eksekutif.",
    route: "/personal-life",
    badge: "5 Modul",
    modules: [
      {
        id: "personal-habits-growth",
        name: "Habits & Reflection",
        description: "Pelacakan rutinitas, jurnal pribadi, dan target hidup.",
        pageId: "personal-life",
        features: [
          { id: "habit-tracker-app", name: "Habit & Rutinitas", type: "feature", route: "/habit-tracker" },
          { id: "journal-app", name: "Jurnal & Mood", type: "feature", route: "/journal" },
          { id: "personal-vault-app", name: "Personal Vault", type: "feature", route: "/vault" },
        ],
        tools: [
          { id: "life-planner-tool", name: "Life Planner", type: "tool", route: "/life/life-planner" },
        ],
      },
    ],
  },

  // 8. FAMILY RECORDS & HOUSEHOLD PLANNING
  {
    id: "family-records",
    name: "Family Records and Household Planning",
    description: "Pencatatan silsilah keluarga, logistik hunian, armada, dan rekam medis keluarga.",
    route: "/family-records",
    badge: "6 Modul",
    modules: [
      {
        id: "family-household-ops",
        name: "Household & Family Ops",
        description: "Inventaris hunian, resep dapur, dan agenda keluarga.",
        pageId: "family-records",
        features: [
          { id: "family-tree-app", name: "Silsilah Keluarga", type: "feature", route: "/lainnya?app=family-tree" },
          { id: "family-health-app", name: "Rekam Kesehatan Domestik", type: "feature", route: "/peh/family-health" },
        ],
        tools: [
          { id: "family-budget-tool", name: "Kas & Anggaran Keluarga", type: "tool", route: "/peh/family-budget" },
          { id: "pet-care-tool", name: "Pet Care Tracker", type: "tool", route: "/peh/pet-care" },
        ],
      },
    ],
  },

  // 9. PUBLIC AFFAIRS & RELATIONS
  {
    id: "public-affairs",
    name: "Public Affairs and Relations",
    description: "Keterlibatan sipil, advokasi warga RT/RW, dan hubungan pemangku kepentingan publik.",
    route: "/public-affairs",
    badge: "6 Modul",
    modules: [
      {
        id: "public-civic-agenda",
        name: "Civic & Community Engagement",
        description: "Agenda warga dan panduan layanan administrasi publik.",
        pageId: "public-affairs",
        features: [
          { id: "civic-agenda-app", name: "Civic Agenda & Board", type: "feature", route: "/lainnya?app=civic-calendar" },
        ],
        tools: [
          { id: "advocacy-tool", name: "Aspirasi & Fasum Warga", type: "tool", route: "/peh/advocacy" },
        ],
      },
    ],
  },

  // 10. CONTACT DIRECTORY & SOCIAL NETWORKS
  {
    id: "social-networks",
    name: "Contact Directory and Social Networks",
    description: "Buku alamat jejaring relasi, bimbingan mentorship, dan kalender silaturahmi.",
    route: "/social-networks",
    badge: "6 Modul",
    modules: [
      {
        id: "social-relationship-mgmt",
        name: "Relationship & Network Directory",
        description: "Jejaring silaturahmi, direktori kontak profesional, dan catatan mentorship.",
        pageId: "social-networks",
        features: [
          { id: "contacts-directory", name: "Jejaring & Relasi (CRM)", type: "feature", route: "/peh/contacts" },
          { id: "mentorship-network", name: "Mentor & Bimbingan", type: "feature", route: "/peh/mentorship" },
        ],
        tools: [
          { id: "gifts-tracker-tool", name: "Inspirasi Hadiah & Budi", type: "tool", route: "/peh/gifts" },
        ],
      },
    ],
  },
]);

// -----------------------------------------------------------------------------
// Lookup and Query Helpers
// -----------------------------------------------------------------------------

export function getTaxonomyPage(pageId: string): TaxonomyPage | undefined {
  return PRODUCT_TAXONOMY.find((p) => p.id === pageId);
}

export function getAllModules(): readonly TaxonomyModule[] {
  return PRODUCT_TAXONOMY.flatMap((p) => p.modules);
}

export function getModuleById(moduleId: string): TaxonomyModule | undefined {
  return getAllModules().find((m) => m.id === moduleId);
}

export function getModulesForPage(pageId: string): readonly TaxonomyModule[] {
  return getTaxonomyPage(pageId)?.modules ?? [];
}

export function getToolsForModule(moduleId: string): readonly TaxonomyItem[] {
  return getModuleById(moduleId)?.tools ?? [];
}

export function getFeaturesForModule(moduleId: string): readonly TaxonomyItem[] {
  return getModuleById(moduleId)?.features ?? [];
}

/**
 * Searches the taxonomy tree for an item matching a given route or identifier.
 */
export function findTaxonomyItemByRoute(routeOrPath: string): {
  page?: TaxonomyPage;
  module?: TaxonomyModule;
  item?: TaxonomyItem;
} {
  const clean = routeOrPath.split("?")[0].replace(/\/+$/, "") || "/";
  for (const page of PRODUCT_TAXONOMY) {
    if (page.route === clean) {
      return { page };
    }
    for (const mod of page.modules) {
      const toolMatch = mod.tools.find((t) => t.route.split("?")[0] === clean);
      if (toolMatch) {
        return { page, module: mod, item: toolMatch };
      }
      const featureMatch = mod.features.find((f) => f.route.split("?")[0] === clean);
      if (featureMatch) {
        return { page, module: mod, item: featureMatch };
      }
    }
  }
  return {};
}
