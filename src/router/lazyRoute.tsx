import React, { Suspense, type ComponentType, type ReactNode } from "react";
import { RouteLoadingFallback } from "@/components/RouteLoadingFallback";

/**
 * Wraps a dynamic import returning a default export into a Suspense-ready component.
 */
export function lazyComponent<P extends object = object>(
  importer: () => Promise<{ default: ComponentType<P> }>,
  fallbackMessage?: string
): React.FC<P> {
  const Lazy = React.lazy(importer);
  return function LazyWrapper(props: P) {
    return (
      <Suspense fallback={<RouteLoadingFallback message={fallbackMessage} />}>
        <Lazy {...props} />
      </Suspense>
    );
  };
}

/**
 * Wraps a dynamic import returning named exports, extracting the requested component.
 */
export function lazyNamed<M extends Record<string, any>, K extends keyof M>(
  importer: () => Promise<M>,
  exportName: K,
  fallbackMessage?: string
): React.FC<M[K] extends ComponentType<infer P> ? P : any> {
  const Lazy = React.lazy(async () => {
    const mod = await importer();
    return { default: mod[exportName] as ComponentType<any> };
  });

  return function LazyNamedWrapper(props: any) {
    return (
      <Suspense fallback={<RouteLoadingFallback message={fallbackMessage} />}>
        <Lazy {...props} />
      </Suspense>
    );
  };
}

/**
 * Helper to wrap any React element inside Suspense with standard RouteLoadingFallback
 */
export function withRouteSuspense(children: ReactNode, fallbackMessage?: string) {
  return (
    <Suspense fallback={<RouteLoadingFallback message={fallbackMessage} />}>
      {children}
    </Suspense>
  );
}
