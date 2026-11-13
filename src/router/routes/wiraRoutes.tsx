import React from "react";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { lazyComponent, lazyNamed } from "../lazyRoute";

const WiraView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "WiraView", "Memuat Wira...");
const KlienWorkspaceView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "KlienWorkspaceView", "Memuat Ruang Kerja Klien...");
const CatatanView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "CatatanView", "Memuat Catatan...");
const LainnyaView = lazyNamed(() => import("@/features/nonWhiteApps/NonWhiteAppRenderer"), "LainnyaView", "Memuat Modul Lainnya...");
const ProductApp = lazyComponent(() => import("@/features/product/App"), "Memuat Katalog Produk...");

const WIRA_KEYS = [
  "budget",
  "code",
  "contacts",
  "courses",
  "design",
  "exams",
  "flashcards",
  "games",
  "health",
  "ideas",
  "inventory",
  "journal",
  "kalkulator",
  "languages",
  "movies",
  "music",
  "passwords",
  "photography",
  "podcasts",
  "proyek-personal",
  "reading",
  "recipes",
  "shopping",
  "subscriptions",
  "trips",
  "weather",
  "workouts",
  "writing",
] as const;

export function createWiraRoutes(parentRoute: AnyRoute) {
  const wiraRouteList = WIRA_KEYS.map((key) =>
    createRoute({
      getParentRoute: () => parentRoute,
      path: `/${key}`,
      component: () => <WiraView type={key} />,
    })
  );

  return [
    ...wiraRouteList,
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/katalog-produk",
      component: () => (
        <AppShell title="Katalog Produk" subtitle="Pelacak Masa Pakai & Nilai Aset">
          <div className="w-full -mt-6">
            <ProductApp />
          </div>
        </AppShell>
      ),
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/product-catalog",
      component: () => (
        <AppShell title="Product Catalog" subtitle="Pelacak Masa Pakai & Nilai Aset">
          <div className="w-full -mt-6">
            <ProductApp />
          </div>
        </AppShell>
      ),
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/klien",
      component: KlienWorkspaceView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/catatan",
      component: CatatanView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/lainnya",
      component: LainnyaView,
    }),
  ];
}
