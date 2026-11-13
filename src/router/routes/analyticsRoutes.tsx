import React from "react";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { lazyNamed } from "../lazyRoute";

// Lazy-load analytics, syariah, and market views
const CommodityView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "CommodityView", "Memuat Commodity Dashboard...");
const ShariaAkadView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "ShariaAkadView", "Memuat Akad Syariah...");
const ShariaTerlarangView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "ShariaTerlarangView", "Memuat Transaksi Terlarang...");
const ShariaAsuransiView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "ShariaAsuransiView", "Memuat Asuransi Syariah...");
const ZakatAppView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "ZakatAppView", "Memuat Kalkulator Zakat...");
const TaxAppView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "TaxAppView", "Memuat Pajak...");
const InvestmentAppView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "InvestmentAppView", "Memuat Investasi...");
const ValuationView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "ValuationView", "Memuat Valuasi...");
const IncotermsView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "IncotermsView", "Memuat Incoterms...");
const WaterView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "WaterView", "Memuat Water Tracker...");
const MatrixAssetView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixAssetView", "Memuat Kuadran Aset...");
const MatrixEarningView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixEarningView", "Memuat Kuadran Pendapatan...");
const MatrixLiabilityView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixLiabilityView", "Memuat Kuadran Liabilitas...");
const MatrixExpenseView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixExpenseView", "Memuat Kuadran Pengeluaran...");
const MatrixFinancialHealthView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixFinancialHealthView", "Memuat Financial Health Matrix...");
const MatrixSwotView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixSwotView", "Memuat Matriks SWOT...");
const MatrixTowsView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "MatrixTowsView", "Memuat Matriks TOWS...");
const SpectrumStageView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "SpectrumStageView", "Memuat Tahapan Spektrum...");
const SocietyView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "SocietyView", "Memuat Society View...");
const NationalIndicesDashboard = lazyNamed(() => import("@/routes/national-indices"), "NationalIndicesDashboard", "Memuat Indeks Pembangunan Nasional...");

export function createAnalyticsRoutes(parentRoute: AnyRoute) {
  return [
    // Non-White Market & Syariah
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/indeks",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/akad",
      component: ShariaAkadView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/terlarang",
      component: ShariaTerlarangView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/asuransi",
      component: ShariaAsuransiView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/zakat",
      component: ZakatAppView,
    }),

    // Tax & Investment & Valuation
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/pajak",
      component: TaxAppView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/investasi",
      component: InvestmentAppView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/valuasi",
      component: ValuationView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/100-komoditas",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/commodity-dashboard",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/10-indeks",
      component: NationalIndicesDashboard,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/indeks-pembangunan",
      component: NationalIndicesDashboard,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/incoterms",
      component: IncotermsView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/water",
      component: WaterView,
    }),

    // Quadrants & Matrices
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/asset",
      component: MatrixAssetView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/earning",
      component: MatrixEarningView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/liability",
      component: MatrixLiabilityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/expense",
      component: MatrixExpenseView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/financial-health",
      component: MatrixFinancialHealthView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/swot",
      component: MatrixSwotView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/tows",
      component: MatrixTowsView,
    }),

    // Spectrum Stages
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/grow",
      component: () => <SpectrumStageView stage="grow" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/flow",
      component: () => <SpectrumStageView stage="flow" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/build",
      component: () => <SpectrumStageView stage="build" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/legacy",
      component: () => <SpectrumStageView stage="legacy" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/surety",
      component: () => <SpectrumStageView stage="surety" />,
    }),

    // Society Views
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/development",
      component: () => <SocietyView type="development" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/improvement",
      component: () => <SocietyView type="improvement" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/reliance",
      component: () => <SocietyView type="reliance" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/sufficient",
      component: () => <SocietyView type="sufficient" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/interact",
      component: () => <SocietyView type="interact" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/interdependence",
      component: () => <SocietyView type="interdependence" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/interest",
      component: () => <SocietyView type="interest" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/intersect",
      component: () => <SocietyView type="intersect" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/insider",
      component: () => <SocietyView type="insider" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/insight",
      component: () => <SocietyView type="insight" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/outward",
      component: () => <SocietyView type="outward" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/outlook",
      component: () => <SocietyView type="outlook" />,
    }),
  ];
}
