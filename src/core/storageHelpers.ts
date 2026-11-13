import { getCurrentSession } from "./session";
import {
  DEFAULT_WORKSPACE_ID,
  buildStorageKey,
  getSafeLocalStorage,
  resolveLegacyKeyTarget,
} from "./storage";

/**
 * Shared storage helpers and execution primitives for workspace-scoped storage adaptors
 * (consolidates common primitives between persistStorage and rawStorage).
 */

export { getSafeLocalStorage };

export function resolveSessionWorkspaceId(): string {
  try {
    const ws = getCurrentSession()?.workspaceId?.trim();
    return ws && ws.length > 0 ? ws : DEFAULT_WORKSPACE_ID;
  } catch {
    return DEFAULT_WORKSPACE_ID;
  }
}

export function resolveLockedPhysicalKey(
  keyOrName: string,
  lockedWorkspaceId: string,
): string {
  const targetKey = resolveLegacyKeyTarget(keyOrName) ?? keyOrName;
  return buildStorageKey(targetKey, lockedWorkspaceId);
}

/**
 * Membaca string mentah dari `${lockedWorkspaceId}:<tujuan>`, atau fallback ke kunci lama `keyOrName`
 * (khusus workspace default "ws-main") tanpa pernah menulis ke storage saat membaca.
 */
export function executeWorkspaceRead(
  keyOrName: string,
  lockedWorkspaceId: string,
): string | null {
  try {
    const storage = getSafeLocalStorage();
    if (!storage) return null;

    const physicalKey = resolveLockedPhysicalKey(keyOrName, lockedWorkspaceId);

    // 1 & 2. Baca kunci ber-namespace workspace terlebih dahulu (mis. ws-main:wiki.data_v1)
    const workspaceValue = storage.getItem(physicalKey);
    if (workspaceValue !== null) {
      return workspaceValue;
    }

    // 3. Fallback ke kunci lama keyOrName tanpa menulis apa pun saat membaca
    //    (dibatasi ke DEFAULT_WORKSPACE_ID agar data lama tidak bocor ke workspace lain)
    if (lockedWorkspaceId === DEFAULT_WORKSPACE_ID) {
      const legacyValue = storage.getItem(keyOrName);
      if (legacyValue !== null) {
        return legacyValue;
      }
    }

    // 4. Kembalikan null bila keduanya belum ada
    return null;
  } catch {
    return null;
  }
}

/**
 * Menulis string mentah HANYA ke kunci baru `${lockedWorkspaceId}:<tujuan>`.
 * Melakukan no-op (disertai console.warn di mode DEV) bila workspaceId sesi aktif
 * berbeda dari lockedWorkspaceId.
 */
export function executeWorkspaceWrite(
  keyOrName: string,
  value: string,
  lockedWorkspaceId: string,
  callerTag: string = "storage",
): void {
  try {
    const storage = getSafeLocalStorage();
    if (!storage) return;

    // Bandingkan workspaceId terkunci dengan getCurrentSession()?.workspaceId.
    // Bila sesi aktif memuat workspaceId eksplisit yang berbeda dari lockedWorkspaceId,
    // batalkan penulisan (no-op) agar state workspace lama tidak bocor lintas-tenant.
    const currentSessionWorkspaceId =
      getCurrentSession()?.workspaceId?.trim();
    if (
      currentSessionWorkspaceId &&
      currentSessionWorkspaceId !== lockedWorkspaceId
    ) {
      if (
        import.meta.env?.DEV ||
        (typeof process !== "undefined" &&
          (process.env?.NODE_ENV === "development" || process.env?.NODE_ENV === "test"))
      ) {
        const entityLabel = callerTag === "rawStorage" ? "modul" : "store";
        console.warn(
          `[${callerTag}] Penulisan "${keyOrName}" dibatalkan (no-op): ${entityLabel} terkunci ke workspace "${lockedWorkspaceId}", sedangkan sesi saat ini berada di "${currentSessionWorkspaceId}". Pergantian workspace saat runtime harus dilakukan lewat muat ulang halaman penuh.`,
        );
      }
      return;
    }

    const physicalKey = resolveLockedPhysicalKey(keyOrName, lockedWorkspaceId);
    // Tulis HANYA ke kunci baru ber-prefix workspace terkunci; kunci lama tidak pernah disentuh
    storage.setItem(physicalKey, value);
  } catch {
    // Tangkap semua error storage (mis. QuotaExceededError / SecurityError) tanpa melempar keluar
  }
}

/**
 * Menghapus HANYA kunci baru `${lockedWorkspaceId}:<tujuan>` tanpa pernah menyentuh kunci lama.
 */
export function executeWorkspaceRemove(
  keyOrName: string,
  lockedWorkspaceId: string,
): void {
  try {
    const storage = getSafeLocalStorage();
    if (!storage) return;

    const physicalKey = resolveLockedPhysicalKey(keyOrName, lockedWorkspaceId);
    // Hapus HANYA kunci baru ber-prefix workspace terkunci; kunci lama tidak pernah dihapus
    storage.removeItem(physicalKey);
  } catch {
    // Jangan pernah melempar error keluar
  }
}
