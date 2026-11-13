import React from "react";
import { Loader2 } from "lucide-react";

export interface RouteLoadingFallbackProps {
  message?: string;
  subtitle?: string;
}

export function RouteLoadingFallback({
  message = "Memuat modul...",
  subtitle = "Menyiapkan antarmuka dan data",
}: RouteLoadingFallbackProps) {
  return (
    <div className="min-h-[55vh] w-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 shadow-xs">
        <Loader2 className="size-6 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-foreground tracking-tight">{message}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">{subtitle}</p>
      )}
    </div>
  );
}

export default RouteLoadingFallback;
