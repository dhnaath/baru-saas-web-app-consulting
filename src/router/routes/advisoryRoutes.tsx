import React, { useState } from "react";
import {
  createRoute,
  useParams,
  useNavigate,
  Link,
  type AnyRoute,
} from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { ShellSections } from "@/app/shell-sections";
import { getFramework } from "@/frameworkData";
import { useFavorites } from "@/hooks/useFavorites";
import { lazyComponent, lazyNamed } from "../lazyRoute";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Grid2X2,
  Layers,
  Sparkles,
} from "lucide-react";

// Lazy-loaded advisory applications
const CreditApp = lazyComponent(() => import("@/features/credit/App"), "Memuat Kredit & Utang...");
const CuratedApp = lazyComponent(() => import("@/features/curated/App"), "Memuat Kurasi Pengetahuan Bisnis...");
const Tools100Section = lazyNamed(() => import("@/features/launcher/Tools100Section"), "Tools100Section", "Memuat 100 Tools Mini MBA...");
const FrameworkByNameView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "FrameworkByNameView", "Memuat Framework...");

function KreditView() {
  return (
    <AppShell title="Kredit & Utang" subtitle="Manajemen utang dan kartu kredit">
      <div className="w-full max-w-[1720px] mx-auto p-4 md:p-6 -mt-4">
        <CreditApp />
      </div>
    </AppShell>
  );
}

function KurasiView() {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug || "";
  const slugChapterMap: Record<string, number> = {
    ekonomi: 1,
    statistik: 2,
    manajemen: 3,
    komunikasi: 4,
    logistik: 5,
    bisnis: 6,
    administrasi: 7,
    akuntansi: 8,
    asuransi: 9,
    investasi: 10,
  };
  const chapterId = (slug && slugChapterMap[slug.toLowerCase()]) || 1;

  return (
    <AppShell
      title="Kurasi Pengetahuan Bisnis"
      subtitle={`Chapter ${chapterId} — Panduan & Framework Kurasi`}
    >
      <div className="w-full max-w-[1720px] mx-auto p-4 md:p-6">
        <CuratedApp initialChapterId={chapterId} />
      </div>
    </AppShell>
  );
}

function FrameworkDetailView() {
  const params = useParams({ strict: false }) as { slug?: string };
  const navigate = useNavigate();
  const slug = params.slug || "";
  const cleanName = slug ? decodeURIComponent(slug).replace(/-/g, " ") : "SWOT Analysis";
  const fw = getFramework(slug || cleanName);

  const [activeTab, setActiveTab] = useState<"teori" | "draft" | "action">("teori");
  const [worksheetData, setWorksheetData] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(`worksheet_${slug}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleFieldChange = (key: string, value: string) => {
    setWorksheetData((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(`worksheet_${slug}`, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const frameworkSections = [
    { id: "teori", label: "Teori & Konsep", active: activeTab === "teori", onSelect: () => setActiveTab("teori" as const) },
    { id: "draft", label: "Lembar Kerja", active: activeTab === "draft", onSelect: () => setActiveTab("draft" as const) },
    { id: "action", label: "Rencana Aksi", active: activeTab === "action", onSelect: () => setActiveTab("action" as const) },
  ];

  return (
    <AppShell
      title={fw ? cleanName.toUpperCase() : "Framework"}
      subtitle={fw?.layout.tipe || "Strategic Framework & Consulting Tool"}
    >
      <ShellSections sections={frameworkSections} />
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                  100 Frameworks
                </span>
                <span className="text-xs text-muted-foreground">
                  {fw?.layout.visualType || "Interactive Tool"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mt-1 capitalize">
                {cleanName}
              </h1>
            </div>
            {slug === "eisenhower-matrix" && (
              <Link
                to="/eisenhower"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
              >
                <Grid2X2 className="size-3.5" />
                <span>Buka Tool Interaktif Task</span>
                <ArrowRight className="size-3" />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("teori")}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "teori"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              Teori & Konsep
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "draft"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              Lembar Kerja (Worksheet)
            </button>
            <button
              onClick={() => setActiveTab("action")}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "action"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              Rencana Aksi
            </button>
          </div>
        </div>

        {activeTab === "teori" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-[1.25rem] p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <BookOpen className="size-4" />
                <span>Deskripsi & Dasar Teori</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {fw?.teori.deskripsi || "Informasi deskripsi sedang dimuat."}
              </p>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                  <Sparkles className="size-4" />
                  <span>Manfaat Strategis</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {fw?.teori.manfaat || "Membantu pengambilan keputusan terstruktur dan berbasis data."}
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-[1.25rem] p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Layers className="size-4" />
                <span>Komponen & Elemen Kanvas</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {fw?.layout.elemen.map((el, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-accent/40 border border-border text-xs font-medium text-foreground"
                  >
                    {el}
                  </span>
                ))}
              </div>

              {fw?.tutorial && fw.tutorial.length > 0 && (
                <div className="pt-4 border-t border-border space-y-3">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Langkah Implementasi
                  </h4>
                  <div className="space-y-2">
                    {fw.tutorial.map((tut, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <strong className="text-foreground">{tut.step}:</strong> {tut.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "draft" && (
          <div className="bg-card border border-border rounded-[1.25rem] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Lembar Kerja Interaktif
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Isi analisis Anda langsung di bawah. Data otomatis tersimpan di penyimpanan lokal peramban.
                </p>
              </div>
              <button
                onClick={() => {
                  setWorksheetData({});
                  localStorage.removeItem(`worksheet_${slug}`);
                }}
                className="text-xs text-rose-500 hover:underline cursor-pointer"
              >
                Reset Isian
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fw?.draft.map((d, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <label className="block text-sm font-semibold text-foreground">
                    {d.bagian}
                  </label>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {d.hint}
                  </p>
                  <textarea
                    rows={4}
                    value={worksheetData[d.bagian] || ""}
                    onChange={(e) => handleFieldChange(d.bagian, e.target.value)}
                    placeholder={`Tulis catatan atau temuan untuk ${d.bagian}...`}
                    className="w-full text-sm bg-card border border-border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "action" && (
          <div className="bg-card border border-border rounded-[1.25rem] p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              Rekomendasi Rencana Aksi
            </h3>
            <p className="text-xs text-muted-foreground">
              Langkah-langkah taktis yang direkomendasikan untuk menindaklanjuti hasil analisis framework ini:
            </p>
            <div className="space-y-3 pt-2">
              {fw?.actionPlan.map((act, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-background"
                >
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{act}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Tools100Page() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <AppShell
      title="100 Tools Mini MBA"
      subtitle="8 Pilar Strategis & MBA Tools: 100 Instrumen Analisis, Framework Mini MBA & Kanvas Strategis"
    >
      <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6">
        <Tools100Section
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          getGradient={() => "bg-linear-to-br from-indigo-500 to-indigo-700"}
        />
      </div>
    </AppShell>
  );
}

export function createAdvisoryRoutes(parentRoute: AnyRoute) {
  return [
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/kredit",
      component: KreditView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/kurasi",
      component: KurasiView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/kurasi/$slug",
      component: KurasiView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/framework/$slug",
      component: FrameworkDetailView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/100-tools",
      component: Tools100Page,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/mini-mba",
      component: Tools100Page,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/100-framework",
      component: () => <FrameworkByNameView name="Katalog 100 Framework" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/bcg",
      component: () => <FrameworkByNameView name="BCG Matrix" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/pestel",
      component: () => <FrameworkByNameView name="PESTEL Analysis" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/porter",
      component: () => <FrameworkByNameView name="Porter's Five Forces" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/ge-mckinsey",
      component: () => <FrameworkByNameView name="GE McKinsey Matrix" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/ansoff",
      component: () => <FrameworkByNameView name="Ansoff Matrix" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/blue-ocean",
      component: () => <FrameworkByNameView name="Blue Ocean Strategy" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/bmc",
      component: () => <FrameworkByNameView name="Business Model Canvas (BMC)" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/lean-canvas",
      component: () => <FrameworkByNameView name="Lean Canvas" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/value-proposition-canvas",
      component: () => <FrameworkByNameView name="Value Proposition Canvas" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/customer-journey-map",
      component: () => <FrameworkByNameView name="Customer Journey Map" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/empathy-map",
      component: () => <FrameworkByNameView name="Empathy Map" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/kano-model",
      component: () => <FrameworkByNameView name="Kano Model" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/marketing-mix",
      component: () => <FrameworkByNameView name="Marketing Mix (7P/4P)" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/product-life-cycle",
      component: () => <FrameworkByNameView name="Product Life Cycle" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/stp",
      component: () => <FrameworkByNameView name="STP (Segmentation, Targeting, Positioning)" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/value-chain",
      component: () => <FrameworkByNameView name="Value Chain Analysis" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/value-disciplines",
      component: () => <FrameworkByNameView name="Value Disciplines" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/vrio",
      component: () => <FrameworkByNameView name="VRIO Framework" />,
    }),
  ];
}
