import React from "react";
import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
  Outlet,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

import { getCurrentSession } from "@/core/session";
import { resolveAccess } from "@/core/routeAccess";
import { RouteErrorBoundary, RouteNotFound } from "./router/errorBoundary";
import { lazyComponent } from "./router/lazyRoute";
import { createStandaloneRoutes } from "./router/routes/standaloneRoutes";
import { createDomainHubRoutes } from "./router/routes/domainHubRoutes";
import { createAdvisoryRoutes } from "./router/routes/advisoryRoutes";
import { createAnalyticsRoutes } from "./router/routes/analyticsRoutes";
import { createWiraRoutes } from "./router/routes/wiraRoutes";
import { createDynamicRoutes } from "./router/routes/dynamicRoutes";

const Launcher = lazyComponent(
  () => import("@/routes/index"),
  "Memuat All in One Workspace Launcher..."
);

// 1. Root route definition with session/access guard and error handling
export const rootRoute = createRootRoute({
  beforeLoad: ({ location }) => {
    const decision = resolveAccess(getCurrentSession(), location.pathname);
    const currentPath = location.pathname.replace(/\/+$/, "") || "/";
    if (!decision.allow && decision.redirectTo !== currentPath) {
      throw redirect({ to: decision.redirectTo });
    }
  },
  component: () => <Outlet />,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: RouteNotFound,
});

// 2. Index / Launcher Route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Launcher,
});

// 3. Assemble modular route trees
const routeTree = rootRoute.addChildren([
  indexRoute,
  ...createStandaloneRoutes(rootRoute),
  ...createDomainHubRoutes(rootRoute),
  ...createAdvisoryRoutes(rootRoute),
  ...createAnalyticsRoutes(rootRoute),
  ...createWiraRoutes(rootRoute),
  ...createDynamicRoutes(rootRoute),
]);

// 4. Router Factory
export function getRouter(queryClient?: QueryClient) {
  return createRouter({
    routeTree,
    context: {
      queryClient: queryClient ?? (null as any),
    },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultErrorComponent: RouteErrorBoundary,
    defaultNotFoundComponent: RouteNotFound,
  });
}

export type AppRouter = ReturnType<typeof getRouter>;

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter;
  }
}
