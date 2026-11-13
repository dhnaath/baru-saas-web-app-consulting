/**
 * Alat Bantu Akses Mentah Ber-Namespace Workspace (`src/core/rawStorage.ts` — Konsolidasi Primitif)
 *
 * Menyediakan fungsi pengganti mekanis untuk `localStorage.getItem`, `localStorage.setItem`,
 * dan `localStorage.removeItem` pada store berbasis React Hook (`useState` + `useEffect`)
 * yang melakukan `JSON.parse` / `JSON.stringify` sendiri.
 *
 * Aturan perilaku terpadu bersama `createWorkspaceStorage()` di `src/core/persistStorage.ts`:
 * 1. Kunci tujuan dihitung dengan `resolveLegacyKeyTarget(key)` bila terdaftar di `LEGACY_KEY_MAP`,
 *    selain itu memakai `key` apa adanya.
 * 2. `LOCKED_WORKSPACE_ID` dikunci SEKALI saat modul ini dimuat (bukan dibaca ulang tiap panggilan)
 *    agar state memori dari workspace awal tidak pernah bocor ke kunci workspace lain saat sesi
 *    beralih di tengah runtime.
 * 3. `getRaw(key)`: membaca `${LOCKED_WORKSPACE_ID}:<tujuan>` lebih dulu; bila kosong (pada
 *    workspace default `"ws-main"`), fallback membaca kunci LAMA `key`; bila kosong, mengembalikan
 *    `null`. Tidak pernah menulis apa pun saat membaca.
 * 4. `setRaw(key, value)`: menulis HANYA ke kunci baru `${LOCKED_WORKSPACE_ID}:<tujuan>`.
 *    Apabila `workspaceId` sesi aktif berbeda dari `LOCKED_WORKSPACE_ID`, penulisan dibatalkan
 *    (`no-op`) dan `console.warn` dicetak pada mode `DEV`.
 * 5. `removeRaw(key)`: menghapus HANYA kunci baru `${LOCKED_WORKSPACE_ID}:<tujuan>`; kunci lama
 *    tidak pernah dihapus.
 * 6. Semua akses `window.localStorage` dibungkus `try/catch` dan tidak pernah melempar keluar.
 */

import {
  executeWorkspaceRead,
  executeWorkspaceRemove,
  executeWorkspaceWrite,
  resolveSessionWorkspaceId,
} from "./storageHelpers";

/**
 * Dikunci SEKALI pada waktu evaluasi modul ini dimuat.
 */
const LOCKED_WORKSPACE_ID: string = resolveSessionWorkspaceId();

/**
 * Membaca string mentah dari `${LOCKED_WORKSPACE_ID}:<tujuan>`, atau fallback ke kunci lama `key`
 * (khusus workspace default `"ws-main"`) tanpa pernah menulis ke `localStorage`.
 */
export function getRaw(key: string): string | null {
  return executeWorkspaceRead(key, LOCKED_WORKSPACE_ID);
}

/**
 * Menulis string mentah HANYA ke kunci baru `${LOCKED_WORKSPACE_ID}:<tujuan>`.
 * Melakukan `no-op` (disertai `console.warn` di mode `DEV`) bila `workspaceId` sesi aktif
 * berbeda dari `LOCKED_WORKSPACE_ID`.
 */
export function setRaw(key: string, value: string): void {
  executeWorkspaceWrite(key, value, LOCKED_WORKSPACE_ID, "rawStorage");
}

/**
 * Menghapus HANYA kunci baru `${LOCKED_WORKSPACE_ID}:<tujuan>` tanpa pernah menyentuh kunci lama.
 */
export function removeRaw(key: string): void {
  executeWorkspaceRemove(key, LOCKED_WORKSPACE_ID);
}
