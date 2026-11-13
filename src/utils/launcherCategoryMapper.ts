import { getRaw, setRaw } from "@/core/rawStorage";

const LAST_LAUNCHER_PAGE_KEY = "aio_last_launcher_page";
const LAST_ACTIVE_APP_KEY = "aio_last_active_app";

export function getLastLauncherPage(totalPages?: number): number {
  const raw = getRaw(LAST_LAUNCHER_PAGE_KEY);
  if (raw === null) return 0;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  if (typeof totalPages === "number" && totalPages > 0 && parsed >= totalPages) {
    return 0;
  }
  return parsed;
}

export function setLastLauncherPage(pageIndex: number, totalPages?: number): void {
  if (!Number.isFinite(pageIndex)) return;
  let safeIndex = Math.max(0, Math.floor(pageIndex));
  if (typeof totalPages === "number" && totalPages > 0) {
    safeIndex = Math.min(safeIndex, totalPages - 1);
  }
  setRaw(LAST_LAUNCHER_PAGE_KEY, String(safeIndex));
}

export function recordActiveApp(pathname: string): void {
  if (!pathname) return;
  setRaw(LAST_ACTIVE_APP_KEY, pathname);
}
