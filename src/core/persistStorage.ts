import {
  createJSONStorage,
  type PersistStorage,
  type StateStorage,
} from "zustand/middleware";

/**
 * CATATAN ARSITEKTUR PENTING (Wajib dibaca sebelum memodifikasi adaptor ini):
 *
 * 1. Urutan Evaluasi Modul vs `main.tsx`:
 *    Store Zustand (`create(persist(...))`) dieksekusi pada waktu evaluasi `import` modul ES,
 *    yang dalam graf bundel statis dapat berjalan SEBELUM badan kode `src/main.tsx` (maupun
 *    `<SessionProvider>`) sempat dieksekusi. Oleh karena itu:
 *    - Adaptor ini TIDAK BOLEH bergantung pada asumsi bahwa `migrateLegacyKeys()` sudah
 *      selesai berjalan terlebih dahulu. Saat kunci baru `ws-main:<tujuan>` belum ada di
 *      `localStorage`, `getItem(name)` langsung melakukan fallback baca ke kunci lama `name`
 *      secara mandiri tanpa menulis apa pun.
 *    - Saat `getCurrentSession()` masih bernilai `null` pada waktu hidrasi awal modul
 *      (sebelum `<SessionProvider>` terpasang), `resolveSessionWorkspaceId()` jatuh secara
 *      deterministik ke `DEFAULT_WORKSPACE_ID` (`"ws-main"`).
 *
 * 2. Workspace Terkunci Saat Store Dibuat & Pergantian Workspace Runtime:
 *    State store Zustand dimuat sekali saat aplikasi mulai. Untuk mencegah kebocoran
 *    antar-tenant (state workspace lama tertulis ke kunci workspace baru saat sesi diganti
 *    di tengah runtime):
 *    - `lockedWorkspaceId` dikunci SEKALI saat `createWorkspaceStorage()` dipanggil dan dipakai
 *      selamanya oleh `getItem`, `setItem`, dan `removeItem` milik instance adaptor tersebut.
 *    - Pada `setItem`, apabila sesi aktif memiliki `workspaceId` yang berbeda dari
 *      `lockedWorkspaceId`, penulisan dibatalkan (`no-op`) dan peringatan dicetak di mode `DEV`.
 *    - Pergantian workspace saat runtime HARUS dilakukan lewat muat ulang halaman penuh
 *      (*full page reload*).
 */

import {
  executeWorkspaceRead,
  executeWorkspaceRemove,
  executeWorkspaceWrite,
  resolveSessionWorkspaceId,
} from "./storageHelpers";

/**
 * Membangun instance `StateStorage` mentah (string-level) dengan `workspaceId` yang
 * dikunci pada waktu pembuatan adaptor.
 *
 * Menjaga format JSON `{ state, version }` tetap 100% identik dengan bawaan Zustand `persist`
 * karena serialisasi/deserialisasi objek ditangani satu kali oleh `createJSONStorage`.
 */
function createLockedWorkspaceStateStorage(
  lockedWorkspaceId: string,
): StateStorage {
  return {
    getItem: (name: string): string | null =>
      executeWorkspaceRead(name, lockedWorkspaceId),

    setItem: (name: string, value: string): void =>
      executeWorkspaceWrite(name, value, lockedWorkspaceId, "persistStorage"),

    removeItem: (name: string): void =>
      executeWorkspaceRemove(name, lockedWorkspaceId),
  };
}

/**
 * Instance bawaan yang terkunci ke workspace awal modul (`DEFAULT_WORKSPACE_ID` / sesi awal).
 */
export const workspaceStateStorage: StateStorage =
  createLockedWorkspaceStateStorage(resolveSessionWorkspaceId());

/**
 * Menghasilkan objek `PersistStorage<S>` yang kompatibel langsung dengan opsi `storage`
 * pada `persist(..., { name, storage: createWorkspaceStorage() })` milik Zustand.
 *
 * `workspaceId` ditentukan SEKALI saat fungsi ini dipanggil (saat store dibuat) dan dipakai
 * selamanya oleh seluruh operasi `getItem` / `setItem` / `removeItem` pada store tersebut.
 * Pergantian workspace saat runtime harus dilakukan lewat muat ulang halaman penuh.
 */
export function createWorkspaceStorage<S = unknown>():
  | PersistStorage<S>
  | undefined {
  const lockedWorkspaceId = resolveSessionWorkspaceId();
  const lockedStateStorage =
    createLockedWorkspaceStateStorage(lockedWorkspaceId);
  return createJSONStorage<S>(() => lockedStateStorage);
}
