# REFACTORING ROADMAP — DNA CONSULTING SaaS
**Aplikasi**: DNA Consulting SaaS  
**Penyusun**: Audit & Architecture Engine  
**Tanggal**: November 2026  
**Status**: Draf Rencana Strategis — Menunggu Tinjauan Pengguna Sebelum Tahap 1 Dimulai

---

## 1. Prinsip & Batasan Wajib (Non-Negotiable Guardrails)

Sesuai instruksi dan batas aman arsitektur, seluruh proses refactoring bertahap wajib mematuhi ketentuan:

1. **Audit First & No Code Mutation**: Tidak ada perubahan kode aplikasi sebelum rencana audit disetujui.
2. **Preservasi 100% Fitur & Data**: Tidak boleh menghapus, mengganti, atau mengurangi fitur, aplikasi, tools, formula, maupun dataset yang sudah ada.
3. **Zero New Features**: Tidak menambahkan fitur baru di luar pembersihan struktur dan performa.
4. **Strict Frontend-Only**: Tetap murni aplikasi frontend client-side; tidak menambahkan server backend, proxy API, maupun database server.
5. **Zero Visual & UI Shift**: Tidak mengubah desain antarmuka, tata letak, palet warna, maupun identitas visual.
6. **Verifikasi Faktual**: Membedakan fakta yang telah teruji, temuan potensial, dan hal yang belum diverifikasi.
7. **Persetujuan Bertahap**: Jangan melangkah ke fase berikutnya sebelum fase aktif selesai, teruji bersih (`tsc` dan `build`), dan disetujui.

---

## 2. Klasifikasi Temuan Audit Berdasarkan Tingkat Kepastian

### A. Fakta yang Sudah Diverifikasi (Verified Facts)
- **Status Kompilasi**: TypeScript lulus 100% (`tsc --noEmit` exit 0).
- **Status Build**: `vite build` berhasil dalam 6.42 detik menghasilkan output di `dist/`.
- **Ukuran Bundle**: Menghasilkan 1 file JavaScript utama sebesar **8.969,50 kB (8,97 MB)** tanpa code splitting.
- **Circular Dependencies**: Terdapat **5 siklus dependensi aktif** antara `src/frameworkData.ts` dan file-file di `src/data/frameworks*.ts`.
- **Duplikasi Library**: Terdapat pemuatan bersama `"framer-motion": "^14.9.0"` (81 file impor) dan `"motion": "^12.23.24"` (5 file impor).
- **Overhead Root Context**: `App.tsx` memuat `PEHProvider` (2.361 baris) dan `LifeOSProvider` (1.265 baris) secara global untuk seluruh halaman.
- **Duplikasi Taksonomi**: Array data `WORKSPACE_PAGES` sepanjang ~960 baris tertanam langsung di dalam komponen UI `SidebarPillarsMenu.tsx`.

### B. Temuan Potensial (Potential Risks)
- **Latensi Muat Pertama (First Contentful Paint)**: Bundle JS 8,97 MB berpotensi menyebabkan waktu inisialisasi browser lambat pada perangkat seluler atau koneksi terbatas.
- **Resiko Re-render Tidak Perlu**: State perubahan kecil pada `PEHContext` atau `LifeOSContext` dapat memicu re-render pada pohon komponen tingkat atas jika tidak di-memoize secara ketat.
- **Desinkronisasi Taksonomi**: Jika ada nama modul yang diperbarui di `src/core/taxonomy.ts` namun belum diubah di `SidebarPillarsMenu.tsx` atau `src/config/nav.ts`, tampilan navigasi akan berbeda dari data resmi.

### C. Hal yang Belum Dapat Diverifikasi (Unverified Items)
- **Konsistensi Data Pengguna Lama**: Isi riil `localStorage` pada browser pengguna lama yang mungkin masih memiliki skema pra-Batch 3A (hanya dapat diverifikasi melalui pengujian runtime pengguna).
- **Performa Browser Rendah**: Dampak render DOM besar pada 520 standalone apps saat dijalankan pada perangkat dengan RAM terbatas.

---

## 3. Matriks Prioritas: Dampak vs Kompleksitas (Impact/Effort Matrix)

```text
       TINGGI │  [FASE 1] Circular Deps       [FASE 4] Code Splitting (8.97MB)
              │  [FASE 2] Animasi Lib         [FASE 5] Context Tree Scoping
       DAMPAK │
              │  [FASE 3] Taksonomi Source    [FASE 6] Dekomposisi File Raksasa
       RENDAH │  [FASE 7] Storage Harmonize
              └─────────────────────────────────────────────────────────────
                                 RENDAH                    TINGGI
                                        KOMPLEKSITAS / RISIKO
```

---

## 4. Rincian Fase Refactoring Bertahap

### FASE 0: Audit Menyeluruh & Verifikasi Baseline
- **Status**: **SELESAI (Turn Ini)**.
- **Capaian**:
  - Pemindaian 496 file sumber di `src/`.
  - Verifikasi kesehatan build dan TypeScript (0 error).
  - Pemetaan 201 rute dan 63 fitur SaaS, 49 modul PEH, 19 modul Life OS, 29 tampilan Wira, dan 520 aplikasi mandiri.
  - Penerbitan 4 dokumen audit resmi (`REPOSITORY_AUDIT.md`, `FEATURE_INVENTORY.md`, `ARCHITECTURE_MAP.md`, `REFACTORING_ROADMAP.md`).

---

### FASE 1: Resolusi Circular Dependencies & Pembersihan Tipe
- **Prioritas**: **P1 (Tinggi)** | **Kompleksitas**: Sangat Rendah | **Risiko**: Sangat Rendah
- **Tujuan**: Mengeliminasi 5 siklus dependensi antara `src/frameworkData.ts` dan dataset framework di `src/data/`.
- **Rencana Tindakan**:
  1. Buat file antarmuka tipe murni di `src/data/types/framework.ts` yang mengekspor `interface FrameworkContent`.
  2. Perbarui `src/data/frameworksDecisionProduct.ts`, `frameworksInnovationQuality.ts`, `frameworksOperations.ts`, `frameworksSalesTechPR.ts`, dan `frameworksSustainabilityHR.ts` agar mengimpor dari file tipe tersebut:
     `import type { FrameworkContent } from "@/data/types/framework";`
  3. Perbarui `src/frameworkData.ts` untuk mere-ekspor tipe tersebut tanpa membuat siklus impor kembali.
- **Kriteria Keberhasilan**:
  - Script deteksi siklus DFS melaporkan: `Cycles found: 0`.
  - `tsc --noEmit` dan `vite build` tetap lulus 100%.

---

### FASE 2: Konsolidasi Library Animasi
- **Prioritas**: **P1 (Tinggi)** | **Kompleksitas**: Rendah | **Risiko**: Sangat Rendah
- **Tujuan**: Menghilangkan dependensi ganda animasi dan menyatukan seluruh impor ke satu standar.
- **Rencana Tindakan**:
  1. Identifikasi 5 file yang mengimpor dari `"motion"`:
     - Teliti padanan impor di `"framer-motion"` (mis. `motion`, `AnimatePresence`).
     - Alihkan 5 file tersebut ke `"framer-motion"`.
  2. Hapus paket `"motion"` dari `package.json` tanpa mengganggu 81 file lain yang sudah stabil menggunakan `"framer-motion"`.
- **Kriteria Keberhasilan**:
  - Hanya ada 1 paket animasi di `package.json`.
  - Tidak ada visual glitch atau animasi yang berhenti berfungsi.
  - `npm run build` berhasil tanpa error.

---

### FASE 3: Single Source of Truth Metadata Taksonomi
- **Prioritas**: **P2 (Sedang)** | **Kompleksitas**: Rendah | **Risiko**: Rendah
- **Tujuan**: Menghilangkan duplikasi array `WORKSPACE_PAGES` (~960 baris) dari dalam komponen UI `SidebarPillarsMenu.tsx`.
- **Rencana Tindakan**:
  1. Ekstrak data statis `WORKSPACE_PAGES` dari `src/app/shell/SidebarPillarsMenu.tsx` ke file data tersendiri di `src/config/workspacePages.ts` atau selaraskan langsung dengan generator berbasis `PRODUCT_TAXONOMY` (`src/core/taxonomy.ts`).
  2. `SidebarPillarsMenu.tsx` hanya berfokus pada render UI navigasi, interaksi klik, dan status rute aktif (mengurangi ukuran file dari 1.821 baris menjadi < 800 baris).
- **Kriteria Keberhasilan**:
  - Tampilan dan perilaku menu pilar di sidebar tetap 100% identik.
  - File UI menjadi ramping dan mudah dirawat.

---

### FASE 4: Route-Level Code Splitting (Optimasi Bundle 8,97 MB)
- **Prioritas**: **P2 (Sedang)** | **Kompleksitas**: Sedang | **Risiko**: Sedang
- **Tujuan**: Memecah bundle monolitik 8,97 MB menjadi chunk modular yang dimuat secara tunda (*on-demand lazy loading*).
- **Rencana Tindakan**:
  1. Terapkan pemuatan tunda bertahap pada TanStack Router:
     - **Tahap 4A**: Sub-rute PEH (`src/router/routes/dynamicRoutes.tsx` — 49 modul PEH menggunakan `React.lazy()`).
     - **Tahap 4B**: Sub-rute Life OS (`src/router/routes/dynamicRoutes.tsx` — 19 modul Life OS menggunakan `React.lazy()`).
     - **Tahap 4C**: Sub-rute Wira (`src/router/routes/wiraRoutes.tsx` — 28 modul utilitas).
     - **Tahap 4D**: Rute berat terisolasi seperti `commodity-dashboard.tsx` dan `standaloneRoutes.tsx`.
  2. Tambahkan *Suspense fallback* yang elegan (spinner/skeleton netral) saat chunk sedang diunduh.
- **Kriteria Keberhasilan**:
  - Ukuran file JavaScript entri awal (`index-*.js`) berkurang drastis dari **8,97 MB menjadi < 1,5 MB**.
  - Setiap modul fitur hanya diunduh saat pengguna membuka halamannya.

---

### FASE 5: Pengisolasian Pohon Global Context
- **Prioritas**: **P2 (Sedang)** | **Kompleksitas**: Sedang | **Risiko**: Sedang
- **Tujuan**: Mengeluarkan `PEHProvider` (2.361 baris) dan `LifeOSProvider` (1.265 baris) dari root global `App.tsx`.
- **Rencana Tindakan**:
  1. Pindahkan pembungkus `PEHProvider` ke layout pembungkus khusus rute `/peh/*`.
  2. Pindahkan pembungkus `LifeOSProvider` ke layout pembungkus khusus rute `/life/*`.
  3. Root `App.tsx` hanya mempertahankan `SessionProvider`, `QueryClientProvider`, dan `RouterProvider`.
- **Kriteria Keberhasilan**:
  - Inisialisasi awal halaman utama (`/`) tidak lagi memproses ribuan baris state PEH dan Life OS.
  - Modul PEH dan Life OS tetap berjalan sempurna saat diakses melalui rutenya.

---

### FASE 6: Modularisasi File Raksasa (>1.500 Baris)
- **Prioritas**: **P3 (Rendah)** | **Kompleksitas**: Sedang | **Risiko**: Rendah
- **Tujuan**: Memecah komponen monolitik menjadi sub-komponen terstruktur tanpa mengubah antarmuka visual.
- **Target File**:
  1. `src/routes/commodity-dashboard.tsx` (3.054 baris): Pisahkan sub-komponen grafik SVG tren harga, tabel komoditas, dan filter kategori ke folder `src/features/commodity/components/`.
  2. `src/app/app-shell.tsx` (1.607 baris): Pisahkan drawer mobile, panel resize, dan status bar.
  3. `src/commodityData.ts` & `src/frameworkData.ts`: Pindahkan dari root `src/` ke dalam folder `src/data/` dan perbarui jalur impor.
- **Kriteria Keberhasilan**:
  - Tidak ada file tunggal dengan ukuran melebihi 1.200 baris kode.
  - Seluruh fungsionalitas dan formula perhitungan tetap terjaga.

---

### FASE 7: Harmonisasi Storage Primitives
- **Prioritas**: **P3 (Rendah)** | **Kompleksitas**: Rendah | **Risiko**: Rendah
- **Tujuan**: Mengatasi utang teknis Batch 3C dengan menyatukan duplikasi aturan fallback baca dan validasi tenant antara `src/core/persistStorage.ts` dan `src/core/rawStorage.ts`.
- **Rencana Tindakan**:
  1. Buat fungsi primitif bersama `executeWorkspaceRead()` dan `executeWorkspaceWrite()` di `src/core/storageHelpers.ts`.
  2. Gunakan fungsi tersebut baik di `createWorkspaceStorage()` maupun `getRaw`/`setRaw`.
- **Kriteria Keberhasilan**:
  - Penghapusan 100+ baris kode boilerplate yang duplikat.
  - Perilaku penyimpanan tetap 100% kompatibel ke belakang (*backward-compatible*).

---

## 5. Ringkasan Eksekusi & Langkah Selanjutnya

| Tahapan | Status | Tindakan Berikutnya |
|---|---|---|
| **Audit Awal & Dokumentasi** | **SELESAI** | Diserahkan untuk ditinjau oleh pengguna. |
| **Persetujuan Rencana** | **MENUNGGU TINJAUAN** | Menunggu konfirmasi pengguna mengenai prioritas roadmap. |
| **Eksekusi Fase 1** | **TERKUNCI** | Dilarang memulai sebelum pengguna menyetujui roadmap ini. |
