# ARCHITECTURE MAP — DNA CONSULTING SaaS
**Aplikasi**: DNA Consulting SaaS  
**Versi Arsitektur**: Baseline Audit — Monorepo SPA Multi-Tenant  
**Framework**: React 19 • Vite • TanStack Router • Zustand • React Query • Tailwind CSS v4

---

## 1. Diagram Arsitektur Tingkat Tinggi (High-Level Architecture)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PRESENTATION LAYER                                   │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌────────────────────────────┐  │
│  │   AppShell (Layout)   │  │  SidebarPillarsMenu   │  │   App Dock & Top Controls  │  │
│  └───────────┬───────────┘  └───────────┬───────────┘  └─────────────┬──────────────┘  │
│              │                          │                            │                 │
│  ┌───────────▼──────────────────────────▼────────────────────────────▼──────────────┐  │
│  │   Overlays / Modals: CommandPalette, QuickCapture, Taskbar, Terminal, Recent     │  │
│  └──────────────────────────────────────┬───────────────────────────────────────────┘  │
└─────────────────────────────────────────┼──────────────────────────────────────────────┘
                                          │
┌─────────────────────────────────────────▼──────────────────────────────────────────────┐
│                                ROUTING & ACCESS GUARD LAYER                            │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │  rootRoute (TanStack Router)                                                     │  │
│  │  beforeLoad: resolveAccess(getCurrentSession(), location.pathname)               │  │
│  └──────┬──────────────────────┬──────────────────────┬──────────────────────┬──────┘  │
│         │                      │                      │                      │         │
│  ┌──────▼──────┐        ┌──────▼──────┐        ┌──────▼──────┐        ┌──────▼──────┐  │
│  │  Area "hub" │        │Area"partner"│        │Area "portal"│        │ Dynamic "$" │  │
│  │  (Konsultan)│        │   (Mitra)   │        │   (Klien)   │        │(PEH/Life/App│  │
│  │  197 Routes │        │ Placeholder │        │ Placeholder │        │  520 Apps)  │  │
│  └──────┬──────┘        └─────────────┘        └─────────────┘        └──────┬──────┘  │
└─────────┼────────────────────────────────────────────────────────────────────┼─────────┘
          │                                                                    │
┌─────────▼────────────────────────────────────────────────────────────────────▼─────────┐
│                                 STATE & DOMAIN LOGIC LAYER                             │
│  ┌───────────────────────────┐  ┌──────────────────────────┐  ┌─────────────────────┐  │
│  │ Domain Repositories       │  │ Zustand Stores (Persist) │  │ Global Subsystems   │  │
│  │ (src/core/repos/*)        │  │ (21 Modul Fitur)         │  │ Contexts:           │  │
│  │ clients, projects, tasks, │  │ approvals, deliverables, │  │ - PEHContext (2.3k) │  │
│  │ deliverables, documents   │  │ assets, meetings, etc.   │  │ - LifeOSContext(1.2k│  │
│  │ + can() / scopeFor() RBAC │  └───────────┬──────────────┘  │ - PenyediaProfil    │  │
│  └─────────────┬─────────────┘              │                 └──────────┬──────────┘  │
│                │                            │                            │             │
│  ┌─────────────▼─────────────┐              │                            │             │
│  │ React Query (lib/data.ts) │              │                            │             │
│  │ queryClient.clear()       │              │                            │             │
│  └─────────────┬─────────────┘              │                            │             │
└────────────────┼────────────────────────────┼────────────────────────────┼─────────────┘
                 │                            │                            │
┌────────────────▼────────────────────────────▼────────────────────────────▼─────────────┐
│                             MULTI-TENANT STORAGE ABSTRACTION LAYER                     │
│  ┌───────────────────────────────┐  ┌───────────────────────────────────────────────┐  │
│  │ createWorkspaceStorage()      │  │ rawStorage (getRaw / setRaw / removeRaw)      │  │
│  │ (src/core/persistStorage.ts)  │  │ (src/core/rawStorage.ts)                      │  │
│  └──────────────┬────────────────┘  └───────────────────────┬───────────────────────┘  │
│                 │                                           │                          │
│                 └─────────────────────┬─────────────────────┘                          │
│                                       ▼                                                │
│              ┌─────────────────────────────────────────────────┐                       │
│              │  Core Storage Namespace: "ws-main:<target>"     │                       │
│              │  Lazy Read-Fallback ke Kunci Legacy             │                       │
│              │  One-Pass Bootstrap: reconcileBulkSnapshots()   │                       │
│              └────────────────────────┬────────────────────────┘                       │
└───────────────────────────────────────┼────────────────────────────────────────────────┘
                                        │
                         ┌──────────────▼──────────────┐
                         │   Browser localStorage      │
                         └─────────────────────────────┘
```

---

## 2. Lapisan Presentasi (Presentation Layer)

### 2.1 Cangkang Aplikasi (`src/app/app-shell.tsx`)
- **Tanggung Jawab**: Komponen pembungkus halaman utama yang mengatur sidebar ganda (*dual sidebar*), area konten utama, responsivitas drawer mobile, dan integrasi preferensi tampilan.
- **Sub-Komponen Terintegrasi**:
  - `SidebarPillarsMenu.tsx` (1.821 baris): Navigasi hierarkis berdasarkan 10 pilar/master workspace.
  - `app-dock.tsx`: Dock mengambang bergaya macOS di bagian bawah layar untuk akses cepat ke aplikasi favorit dan switcher.
  - `TopPanelControlHub.tsx`: Panel kontrol atas untuk pemilihan wilayah (*country/city/timezone*), status sinkronisasi, dan konfigurasi tema.
  - `HeaderNavControls.tsx`: Tombol navigasi riwayat (*back/forward*), pencarian cepat, dan breadcrumb.

### 2.2 Sistem Dialog & Modal Global
- **CommandPalette (`src/app/CommandPalette.tsx`)**: Palet perintah instan (shortcut `Cmd+K` / `Ctrl+K`) untuk navigasi langsung ke ratusan modul.
- **QuickCaptureModal (`src/app/QuickCaptureModal.tsx`)**: Dialog pencatatan cepat untuk tugas, catatan, kebiasaan, dan transaksi.
- **TaskbarModal (`src/app/TaskbarModal.tsx`)**: Pengalih jendela aktif (*workspace switcher*) dan daftar tugas mikro harian.
- **RecentModal (`src/app/RecentModal.tsx`)**: Riwayat aplikasi yang baru dibuka oleh pengguna.
- **TerminalModal (`src/app/TerminalModal.tsx`)**: Emulator konsol internal untuk inspeksi status workspace.

---

## 3. Lapisan Routing & Penjaga Akses (Routing & Access Guard)

### 3.1 Peta Area Aplikasi Berbasis Peran
Aplikasi dibagi secara konseptual ke dalam tiga area:

| Area ID | Rute Utama | Peran Diizinkan | Perilaku Pengalihan (`resolveAccess`) |
|---|---|---|---|
| **`hub`** | `/` (dan seluruh 197 rute konsultasi) | `konsultan` (admin bawaan) | Jika diakses oleh `mitra` dialihkan ke `/partner`; jika diakses oleh `klien` dialihkan ke `/portal`. |
| **`partner`** | `/partner`, `/partner/*` | `mitra` | Jika diakses oleh `konsultan` atau `klien`, dialihkan ke area default masing-masing. |
| **`portal`** | `/portal`, `/portal/*` | `klien` | Jika diakses oleh non-klien, dialihkan ke area default masing-masing. |
| **`akses-ditolak`** | `/akses-ditolak` | Siapa saja | Menangani kegagalan sesi tanpa perulangan redirect (*infinite loop prevention*). |

### 3.2 Struktur Pembagian Rute Modular (`src/router/routes/`)
Pendaftaran rute dipisah menjadi 6 file pembantu yang dipanggil oleh `src/router.tsx`:
1. **`standaloneRoutes.tsx`** (74 rute): Modul-modul fitur SaaS terstandarisasi (`/database`, `/wiki`, `/meeting-manager`, `/deliverable-manager`, `/approval-manager`, dll.) beserta alias rute pendeknya.
2. **`domainHubRoutes.tsx`** (25 rute): Halaman hub master workspace (`/financial-planning`, `/business-operations`, `/creative-workspace`, dll.).
3. **`advisoryRoutes.tsx`** (25 rute): Modul konsultasi strategis dan template analisis bisnis.
4. **`analyticsRoutes.tsx`** (39 rute): Halaman Market Price Monitor (`/100-komoditas`), Indeks Pembangunan (`/10-indeks`), dan matriks analitik.
5. **`wiraRoutes.tsx`** (33 rute): 28 rute dinamis utilitas Wira (`/budget`, `/code`, `/workouts`, dll.) ditambah rute katalog produk, klien, catatan, dan lainnya.
6. **`dynamicRoutes.tsx`** (4 rute): Rute area `/partner`, `/portal`, `/akses-ditolak`, dan rute tangkap-semua (`$`) yang merender 49 tampilan PEH, 19 tampilan Life OS, serta 520 aplikasi mandiri.

---

## 4. Lapisan State & Logika Domain

### 4.1 Manajemen Sesi Multi-Peran (`src/core/session.tsx`)
- Menyediakan konteks global `SessionContext` yang bersifat **fail-closed**.
- Memuat sesi aktif secara sinkron sebelum render router dimulai.
- Menyediakan fungsi `getCurrentSession()` untuk pembacaan sinkron di luar siklus render React (misalnya di adapter React Query dan pengawal rute).
- Menyediakan preset peran pengembang (*Dev Role Switcher*) untuk simulasi peran `konsultan`, `mitra`, dan `klien`.

### 4.2 Matriks Izin RBAC & Penyaringan Data (`src/core/permissions.ts`)
- **`can(session, action, resource, target)`**: Memvalidasi hak aksi (`read`, `write`, `delete`, `share`, `approve`) pada 12 entitas domain (`client`, `project`, `task`, `deliverable`, `document`, `note`, `approval`, `meeting`, `finance`, `settings`, `collaboration`, `personal_tools`).
- **`scopeFor(session, resource)`**: Menghasilkan fungsi predikat penyaring koleksi data agar mitra hanya melihat proyek/tugas yang ditugaskan, dan klien hanya melihat dokumen/deliverable miliknya.

### 4.3 Repositori Domain (`src/core/repos/*`) & React Query Adapter
- Entitas domain dikelola oleh repositori mandiri:
  - `clientsRepo.ts`, `projectsRepo.ts`, `tasksRepo.ts`, `deliverablesRepo.ts`, `documentsRepo.ts`, `notesRepo.ts`, `meetingsRepo.ts`, `messagesRepo.ts`.
- `src/lib/data.ts` bertindak sebagai jembatan yang menghubungkan komponen UI dengan repositori melalui React Query (`queryOptions`).
- **Pembersihan Cache Otomatis**: Saat peran atau sesi berpindah, `SessionProvider` memicu `queryClient.clear()` agar memori cache tidak bocor antar-peran.

---

## 5. Lapisan Penyimpanan & Abstraksi Multi-Tenant

### 5.1 Alur Baca & Tulis Penyimpanan (*Lazy Read-Fallback*)

```text
[ Komponen UI / Store Zustand / Hook ]
                   │
                   ▼
     Operasi Baca: getItem / getRaw
                   │
                   ▼
    Apakah kunci "ws-main:<target>" ada di localStorage?
       ├── YA  ──> Kembalikan data baru terisolasi
       └── TIDAK ─> Apakah workspace == "ws-main"?
                     ├── YA  ──> Baca kunci legacy (tanpa menulis)
                     └── TIDAK ─> Kembalikan nilai default / null
```

```text
[ Komponen UI / Store Zustand / Hook ]
                   │
                   ▼
     Operasi Tulis: setItem / setRaw
                   │
                   ▼
    Apakah workspaceId sesi saat ini == lockedWorkspaceId?
       ├── YA  ──> Tulis HANYA ke "ws-main:<target>"
       │           (Kunci legacy TIDAK PERNAH ditimpa)
       └── TIDAK ─> Batalkan penulisan (No-Op) + DEV Warning
                   (Cegah kebocoran antar-tenant)
```

### 5.2 Event Bus Antar-Modul
Karena modul-modul hook dan Zustand terpisah, sinkronisasi reaktif dilakukan melalui browser event bus:
- `window.dispatchEvent(new Event("aio_data_updated"))`: Memicu pembaruan instan pada modul-modul pendamping yang berbagi data tugas (`tasks.manager_v1`).
- `window.dispatchEvent(new Event("storage"))`: Mendukung sinkronisasi antar tab/jendela browser.

---

## 6. Batasan Arsitektur Saat Ini & Garis Pemisah (Boundaries)

1. **Frontend-Only Multi-Tenant Simulation**:
   - Seluruh isolasi tenant dan enkapsulasi RBAC berada di sisi klien (`localStorage` dan JavaScript memory).
   - Sistem siap dihubungkan ke backend API atau database server di masa depan tanpa mengubah antarmuka repositori domain.
2. **Isolasi Subsistem Mandiri**:
   - **Ecosystem Core**: Mengikuti standar workspace-isolated `ws-main:*`.
   - **PEH & Life OS**: Beroperasi sebagai subsistem independen dengan context state sendiri.
   - **Wira Utility**: Beroperasi sebagai kumpulan modul utilitas personal bebas dependensi konsultasi.
   - **Standalone Apps**: Komponen kalkulator murni yang membaca data statis formula.
