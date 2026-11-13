import React, { useContext } from "react";
import { PEHContext, PEHProvider } from "./context/PEHContext";

export interface PEHLayoutProps {
  children: React.ReactNode;
}

/**
 * Isolated layout provider for Personal Executive Health (PEH).
 * Reuses existing PEHContext if an ancestor already provides it;
 * otherwise mounts a scoped PEHProvider that persists to localStorage.
 */
export function PEHLayout({ children }: PEHLayoutProps) {
  const existingContext = useContext(PEHContext);
  if (existingContext) {
    return <>{children}</>;
  }
  return <PEHProvider>{children}</PEHProvider>;
}

export default PEHLayout;
