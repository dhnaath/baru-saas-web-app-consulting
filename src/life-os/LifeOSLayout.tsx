import React, { useContext } from "react";
import { LifeOSContext, LifeOSProvider } from "./context/LifeOSContext";

export interface LifeOSLayoutProps {
  children: React.ReactNode;
}

/**
 * Isolated layout provider for Life OS.
 * Reuses existing LifeOSContext if an ancestor already provides it;
 * otherwise mounts a scoped LifeOSProvider that persists to localStorage.
 */
export function LifeOSLayout({ children }: LifeOSLayoutProps) {
  const existingContext = useContext(LifeOSContext);
  if (existingContext) {
    return <>{children}</>;
  }
  return <LifeOSProvider>{children}</LifeOSProvider>;
}

export default LifeOSLayout;
