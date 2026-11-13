# FEATURE INVENTORY & APPLICATION CATALOG
**Aplikasi**: DNA Consulting SaaS  
**Audit Baseline**: November 2026  
**Cakupan**: Seluruh Modul, Halaman, Sub-Aplikasi, dan Dataset Aktif

---

## 1. Ringkasan Ekosistem Aplikasi

DNA Consulting SaaS menggabungkan ratusan instrumen kerja profesional ke dalam arsitektur terpadu. Berdasarkan taksonomi resmi (`src/core/taxonomy.ts`), navigasi (`src/config/nav.ts`), serta registri aplikasi (`src/features/standalone/standaloneAppsData.ts`), inventaris aplikasi dikelompokkan ke dalam **7 lapis subsistem utama**:

1. **Master Workspaces** (10 Laman Terpadu pada Beranda Launcher)
2. **SaaS Inti Konsultasi** (Praktik Konsultasi, Portofolio Proyek, Dokumen, dan Kolaborasi)
3. **100 Tools Mini-MBA & Operasional Bisnis**
4. **Subsistem PEH (Personal Executive Health — 49 Modul)**
5. **Subsistem Life OS (19 Modul Terpadu)**
6. **Subsistem Wira Utility (29 Tampilan Utilitas Personal)**
7. **Dataset Strategis & Indeks Pasar (100 Framework, 100 Komoditas, 10 Indeks Nasional)**

---

## 2. Master Workspaces (10 Laman Launcher Utama)

Didefinisikan dalam `LAUNCHER_TABS` pada `src/routes/index.tsx` dan `PRODUCT_TAXONOMY` pada `src/core/taxonomy.ts`:

| No | ID Workspace | Nama Laman / Domain | Jumlah Modul & Fitur | Deskripsi Fungsional |
|---|---|---|---|---|
| 1 | `financial` | **Financial Planning & Wealth Management** | 25 Modul • 80 Fitur • 10 Tools | Perencanaan kekayaan 5 tahapan: Surety (5), Flow (5), Build (5), Grow (5), Legacy (5). Meliputi kuadran aset, arus kas, dan spektrum kekayaan. |
| 2 | `mode_business` | **Business Administration & Operations Management** | 33 Modul • 100+ Fitur | Pusat administrasi bisnis firma dan klien, operasional harian, manajemen kepatuhan, serta integrasi 100 Tools Mini-MBA. |
| 3 | `mode_employment` | **Productivity Workspace & Workflow Systems** | 9 Modul • 33 Fitur • 6 Tools | Perencanaan kerja, manajemen alur kerja (workflow), alokasi sumber daya, koordinasi tim, tata kelola, dan kepemilikan deliverable. |
| 4 | `mode_creative` | **Creative Workspace & Media Production** | 6 Modul • 18 Fitur • 6 Tools | Studio desain, penerbitan konten, manajemen media audio/visual, aset kreatif, dan presentasi interaktif. |
| 5 | `mode_research` | **Research Foundations & Reference Frameworks** | 6 Modul • 20 Fitur • 12 Tools | Fondasi riset konsultasi, repositori literatur, kerangka analisis metodologis, dan pengujian hipotesis bisnis. |
| 6 | `mode_sharia` | **Islamic Principles & Sharia Values** | 16 Modul • 49 Fitur • 8 Tools | Kepatuhan muamalah syariah: instrumen sosial (3), komersial (5), proteksi/takaful (1), simpanan (1), kalkulator zakat & waris (3), investasi syariah (1), dan audit kepatuhan (2). |
| 7 | `mode_personal` | **Personal Life Management** | 5 Modul • 18 Fitur • 5 Tools | Pengembangan diri konsultan, refleksi harian, pemantauan kesehatan eksekutif, dan utilitas personal. |
| 8 | `mode_family` | **Family Records & Household Planning** | 6 Modul • 19 Fitur • 6 Tools | Manajemen silsilah keluarga, log kesehatan keluarga, anggaran rumah tangga, pemeliharaan hunian, dan log armada kendaraan. |
| 9 | `mode_public_affairs` | **Public Affairs & Relations** | 6 Modul • 18 Fitur • 6 Tools | Urusan publik, hubungan pemangku kepentingan (stakeholder), kebijakan sipil, analisis regulasi, dan manajemen krisis komunikasi. |
| 10 | `mode_networks` | **Contact Directory & Social Networks** | 6 Modul • 18 Fitur • 6 Tools | Direktori kontak eksekutif, jejaring relasi industri, pemetaan jejaring sosial, dan kartu perkenalan profesional. |

---

## 3. SaaS Inti Konsultasi (Domain Repositories & Ecosystem Modules)

Modul-modul ini membentuk inti operasional firma konsultasi dan telah terintegrasi dengan lapisan repositori `src/core/repos/*` atau store namespaced `ws-main:*`:

### 3.1 Manajemen Klien & Relasi
- **Klien Workspace** (`src/features/klien/HalamanKlien.tsx`): Pengelolaan profil perusahaan klien, status kontrak, nilai fee, dan portofolio proyek terkait.
- **People Manager** (`src/features/people-manager/`): Direktori PIC eksekutif klien, konsultan internal, dan rekanan mitra kerja.
- **Interaction Manager** (`src/features/interaction-manager/`): Log percakapan, panggilan telepon, negosiasi, dan notula interaksi dengan klien.
- **Komunitas Warga** (`src/features/komunitas/`): Direktori jejaring komunitas alumni dan ekosistem rekanan profesional.

### 3.2 Eksekusi Proyek & Deliverables
- **Project Manager** (`src/features/project-manager/`): Manajemen proyek multi-klien dengan tampilan daftar, Gantt chart, status kesehatan proyek, dan alokasi anggaran.
- **Task Manager** (`src/features/task-manager/`): Manajemen tugas berhirarki dengan pelacakan status, prioritas, dependensi, dan penugasan tim.
- **Kanban Board** (`src/features/kanban/`): Papan visual status kerja fleksibel dengan kemampuan drag-and-drop kartu tugas.
- **Timeline Manager** (`src/features/timeline/`): Jadwal kronologis proyek dan visualisasi roadmap eksekusi.
- **Milestone Manager** (`src/features/milestone-manager/`): Pelacakan titik pencapaian kritis proyek konsultasi.
- **Deliverable Manager** (`src/features/deliverable-manager/`): Inventaris draf laporan, presentasi final, dan dokumen serah terima dengan klien.
- **Approval Manager** (`src/features/approval-manager/`): Alur kerja persetujuan internal (Quality Assurance) dan eksternal (Persetujuan Klien).
- **Resource Manager** (`src/features/resource-manager/`): Alokasi jam kerja konsultan, peralatan, dan kapasitas tim.
- **Time Tracker** (`src/features/time-tracker/`): Pencatatan jam kerja penagihan (*billable hours*) dan timesheet harian per proyek.
- **Schedule Manager** (`src/features/schedule-manager/`): Penjadwalan giliran kerja, ketersediaan konsultan, dan kalender roster.
- **Workflow Manager** (`src/features/workflow-manager/`): Otomatisasi alur kerja konsultasi berbasis status dan pemicu tahapan.

### 3.3 Dokumen, Pengetahuan & Riset Konsultasi
- **Documents Manager** (`src/features/documents/`): Repositori dokumen kerja firma, kontrak kerja, proposal, dan draf laporan klien.
- **Asset Manager** (`src/features/asset-manager/`): Manajemen aset digital, file desain, template presentasi, dan media pendukung.
- **Catatan Pengetahuan / Knowledge Base** (`src/features/knowledge-base/`): Basis pengetahuan internal, pedoman praktik terbaik, dan artikel metodologi.
- **Wiki Workspace** (`src/features/wiki/`): Ensiklopedia SOP internal dan standar operasional prosedur konsultan.
- **Notes Manager** (`src/features/notes/`): Editor catatan cepat, notula rapat, dan risalah pemikiran strategis.
- **Research Manager** (`src/features/research-manager/`): Analisis studi kasus, pengujian data sekunder, dan sintesis temuan riset.
- **Template Manager** (`src/features/template-manager/`): Template dokumen baku, perjanjian kerahasiaan (NDA), dan formulir survei.
- **Forms Manager** (`src/features/forms/`): Pembuat kuesioner wawancara klien dan formulir pengumpulan data terstruktur.
- **Web Clipper & Bookmark** (`src/features/web-clipper/`, `src/features/bookmark-manager/`): Pengarsipan referensi online, kliping artikel, dan tautan riset.

### 3.4 Keuangan Korporat, Valuasi, Pajak & Strategi
- **Valuasi Bisnis & MAPPI** (`src/features/valuation/`): Modul perhitungan valuasi perusahaan menggunakan pendekatan pasar, aset, dan pendapatan sesuai standar MAPPI.
- **Katalog Produk & Aset** (`src/features/product/`): Pelacak masa pakai aset modal, nilai sisa, dan penyusutan aset klien.
- **Expense Tracker** (`src/features/expense-tracker/`): Pencatatan biaya operasional proyek, klaim konsultan, dan pengeluaran firma.
- **Subscription Manager** (`src/features/subscription-manager/`): Pelacak biaya langganan perangkat lunak dan layanan data pihak ketiga.
- **Tax & Incoterms** (`src/features/incoterms/`): Panduan syarat perdagangan internasional dan kalkulasi pajak bisnis.
- **Matriks Strategis** (`src/features/matriks/`): Matriks SWOT, TOWS, Kuadran Aset, Kuadran Pendapatan, dan Matriks Kesehatan Finansial.
- **Statistik & Analitik** (`src/features/statistics/`): Dashboard agregat performa proyek, efisiensi konsultan, dan analitik bisnis.

### 3.5 Kolaborasi & Komunikasi
- **Collaboration Workspace** (`src/features/collaboration/`): Manajemen anggota tim, penetapan peran kolaboratif, dan perpesanan proyek.
- **Meeting Manager** (`src/features/meeting-manager/`): Penjadwalan rapat formal dengan klien, agenda, dan pencatatan notula.
- **Calendar** (`src/features/calendar/`): Kalender master kegiatan proyek, tenggat waktu deliverable, dan agenda konsultan.
- **Notification Center** (`src/features/notification-center/`): Pusat notifikasi pembaruan tugas, persetujuan tertunda, dan pengingat jadwal.
- **Search Manager** (`src/features/search-manager/`): Mesin pencarian global lintas dokumen, klien, tugas, dan catatan.
- **Reminder Manager** (`src/features/reminder-manager/`): Pengingat tenggat waktu personal dan jadwal tindak lanjut klien.

---

## 4. Subsistem PEH (Personal Executive Health — 49 Views)

Berada di `src/peh/`, diakses melalui rute dinamis `/peh/*`, didukung oleh `PEHContext.tsx`:

| Kategori | Daftar Modul PEH | Rute |
|---|---|---|
| **Kesehatan Fisik & Mental** | Habits, Journal, Fitness, Sleep, Family Health, Pet Care | `/peh/habits`, `/peh/journal`, `/peh/fitness`, `/peh/sleep`, `/peh/family-health`, `/peh/pet-care` |
| **Pengembangan Pribadi** | Goals, Reading, Knowledge, Mentorship, Milestones | `/peh/goals`, `/peh/reading`, `/peh/knowledge`, `/peh/mentorship`, `/peh/milestones` |
| **Keuangan Pribadi & Aset** | Budget, Insurance, Vault, Documents, Subscriptions, Cap Table, Investments, Real Estate, Family Budget | `/peh/budget`, `/peh/insurance`, `/peh/vault`, `/peh/documents`, `/peh/subscriptions`, `/peh/cap-table`, `/peh/investments`, `/peh/real-estate`, `/peh/family-budget` |
| **Rumah Tangga & Keluarga** | Chores, Maintenance, Pantry, Plants, Vehicles, Family Tree, Family Recipes, Traditions, Gifts | `/peh/chores`, `/peh/maintenance`, `/peh/pantry`, `/peh/plants`, `/peh/vehicles`, `/peh/family-tree`, `/peh/family-recipes`, `/peh/traditions`, `/peh/gifts` |
| **Operasional & Kepatuhan Eksekutif** | Workflows, Vendors, Incidents, Procurement, Compliance, Assets, IP & Licenses, Contacts, Introductions | `/peh/workflows`, `/peh/vendors`, `/peh/incidents`, `/peh/procurement`, `/peh/compliance`, `/peh/assets`, `/peh/ip-licenses`, `/peh/contacts`, `/peh/introductions` |
| **Produktivitas Eksekutif** | Meetings, Projects, Tasks, Time Audit | `/peh/meetings`, `/peh/projects`, `/peh/tasks`, `/peh/time-audit` |
| **Sosial, Komunitas & Kebijakan** | Civic, Volunteering, Charity, Community Events, Advocacy | `/peh/civic`, `/peh/volunteering`, `/peh/charity`, `/peh/community-events`, `/peh/advocacy` |
| **Inovasi & Ekosistem Global** | Global Overview, Innovations Hub, Ecosystem Comparison | `/peh/global-overview`, `/peh/innovations-hub`, `/peh/ecosystem-comparison` |

---

## 5. Subsistem Life OS (19 Views)

Berada di `src/life-os/`, diakses melalui rute `/life/*`, didukung oleh `LifeOSContext.tsx` dan `initialData.ts`:

1. **Life Planner** (`/life/life-planner`): Perencanaan target hidup jangka panjang dan tahunan.
2. **Finance OS** (`/life/finance-os`): Sistem pelacak kekayaan dan arus kas pribadi komprehensif.
3. **Simple Finance** (`/life/simple-finance`): Antarmuka pencatatan pemasukan dan pengeluaran sederhana.
4. **Budget Tracker** (`/life/budget-tracker`): Alokasi pos anggaran bulanan.
5. **Weight Tracker** (`/life/weight-tracker`): Log berat badan dan progres komposisi tubuh.
6. **Doctor Consultation** (`/life/doctor-consultation`): Rekam konsultasi dokter dan jadwal resep.
7. **Household Tracker** (`/life/household-tracker`): Inventaris peralatan rumah tangga dan perbaikan.
8. **Wishlist** (`/life/wishlist`): Daftar keinginan belanja dengan skala prioritas tabungan.
9. **Grocery List** (`/life/grocery-list`): Daftar belanja dapur berkala.
10. **Movie Tracker** (`/life/movie-tracker`): Katalog film dan ulasan tontonan pribadi.
11. **Recipe Book** (`/life/recipe-book`): Buku resep masakan keluarga.
12. **Certificate Tracker** (`/life/certificate-tracker`): Arsip sertifikasi profesional dan masa berlaku lisensi.
13. **Travel Backpack** (`/life/travel-backpack`): Rencana perjalanan, daftar bawaan (packing list), dan tiket.
14. **Notes** (`/life/notes`): Buku catatan pribadi terpisah dari catatan firma.
15. **Journal** (`/life/journal`): Jurnal refleksi harian dan rasa syukur (*gratitude log*).
16. **Habits** (`/life/habits`): Pelacak pembentukan kebiasaan harian (*habit streaks*).
17. **Contacts** (`/life/contacts`): Buku kontak rekan pribadi dan keluarga.
18. **Subscriptions** (`/life/subscriptions`): Pelacak langganan streaming dan utilitas rumah tangga.
19. **Assets** (`/life/assets`): Catatan kepemilikan aset pribadi (properti, kendaraan, logam mulia).

---

## 6. Subsistem Wira Personal Utility (29 Views)

Berada di `src/features/wira/components/views/`, didaftarkan melalui rute mandiri pada `src/router/routes/wiraRoutes.tsx`:

| No | Tampilan Wira | Rute | Deskripsi Fungsional |
|---|---|---|---|
| 1 | `BudgetView` | `/budget` | Kalkulator pos anggaran personal. |
| 2 | `CodeView` | `/code` | Playground kode & repositori cuplikan kode pemrograman. |
| 3 | `ContactsView` | `/contacts` | Buku kontak dan jaringan personal. |
| 4 | `CoursesView` | `/courses` | Pelacak silabus kursus online dan materi belajar. |
| 5 | `DesignView` | `/design` | Moodboard dan palet warna desain visual. |
| 6 | `ExamsView` | `/exams` | Jadwal ujian kompetensi dan simulasi tryout. |
| 7 | `FlashcardsView` | `/flashcards` | Kartu latihan hafalan interaktif (*spaced repetition*). |
| 8 | `GamesView` | `/games` | Koleksi mini game hiburan dan asah otak santai. |
| 9 | `HealthView` | `/health` | Pelacak parameter kesehatan harian dan tanda vital. |
| 10 | `IdeasView` | `/ideas` | Wadah curah gagasan (*brainstorming*) dan pemikiran mentah. |
| 11 | `InventoryView` | `/inventory` | Inventaris perlengkapan dan barang pribadi. |
| 12 | `JournalView` | `/journal` | Jurnal catatan harian Wira. |
| 13 | `KalkulatorUmumView` | `/kalkulator` | Rangkaian kalkulator utilitas multifungsi (keuangan, sains, konversi). |
| 14 | `LanguagesView` | `/languages` | Pelacak kosa kata dan pembelajaran bahasa asing. |
| 15 | `MoviesView` | `/movies` | Koleksi film favorit dan daftar tontonan. |
| 16 | `MusicView` | `/music` | Playlist musik kerja dan album referensi. |
| 17 | `PasswordsView` | `/passwords` | Brankas penyimpan kata sandi lokal (`wira_passwords_vault_v2`). |
| 18 | `PhotographyView` | `/photography` | Galeri portofolio foto dan log pengaturan kamera. |
| 19 | `PodcastsView` | `/podcasts` | Daftar episode podcast dan catatan penting. |
| 20 | `ProjectsView` | `/proyek-personal` | Proyek hobi dan eksperimen di luar pekerjaan kantor. |
| 21 | `ReadingListView` | `/reading` | Daftar antrean buku bacaan dan ulasan buku. |
| 22 | `RecipesView` | `/recipes` | Resep kuliner dan langkah-langkah memasak. |
| 23 | `ShoppingListView` | `/shopping` | Daftar belanja kebutuhan personal. |
| 24 | `SubscriptionsView` | `/subscriptions` | Pelacak pengeluaran langganan digital. |
| 25 | `TripsView` | `/trips` | Rencana liburan dan catatan perjalanan. |
| 26 | `WeatherView` | `/weather` | Prakiraan cuaca dan suhu lokal. |
| 27 | `WorkoutsView` | `/workouts` | Jadwal latihan gym, kardio, dan log beban. |
| 28 | `WritingView` | `/writing` | Editor naskah tulisan, esai, dan draf artikel. |
| 29 | `ProductCatalogView` | `/katalog-produk`, `/product-catalog` | Katalog produk dan umur pakai aset. |

---

## 7. Standalone Apps Registry (520 Aplikasi Mandiri)

Didaftarkan dalam array `STANDALONE_APPS` di `src/features/standalone/standaloneAppsData.ts`:
- **Jumlah Total Entri**: 520 entri aplikasi mandiri dengan ID, judul, deskripsi, ikon, kategori, dan formula kerja.
- **Mekanisme Pemuatan**: Dirender secara dinamis oleh `StandaloneAppView` (`src/features/standalone/StandaloneAppView.tsx`) melalui parameter `?app=<id>` atau rute dinamis `$`.
- **Kategori**: Meliputi instrumen perencanaan finansial, kalkulator bisnis spesifik, simulasi operasional, model valuasi mikro, dan alat bantu keputusan.

---

## 8. Dataset Statis & Indeks Pasar

1. **100 Strategic Frameworks** (`src/frameworkData.ts` & `src/data/frameworks*.ts`):
   - Decision & Product Frameworks (20 model: Decision Tree, Eisenhower, Kano, BCG, dll.)
   - Innovation, Quality & Organization Frameworks (20 model: Lean, Six Sigma, Design Thinking, OKR, dll.)
   - Operations & Finance Frameworks (20 model: DuPont, DCF, Kaizen, TOC, dll.)
   - Sales, Tech & PR Frameworks (20 model: SPIN Selling, BANT, Diffusion of Innovations, dll.)
   - Sustainability, ESG & HR Frameworks (20 model: GRI, TCFD, 9-Box Grid, dll.)
2. **100 Market Price Commodities** (`src/commodityData.ts`):
   - Data harga historis, tren fluktuasi, dan kategori komoditas pertanian, perkebunan, pertambangan, energi, dan logam mulia.
3. **10 Indeks Pembangunan Nasional** (`src/data/nationalIndicesData.ts`):
   - Indeks Pembangunan Manusia (IPM), Pertumbuhan Ekonomi, Kemiskinan, Gini Ratio, Pengangguran, Daya Beli, dll.
4. **Indeks Harga Regional** (`src/data/priceIndicesData.ts`):
   - Indeks harga konsumen (IHK), inflasi bulanan/tahunan, dan disparitas harga antar-wilayah di Indonesia.

---

## 9. Matriks Penanganan State & Penyimpanan per Fitur

| Pola State & Storage | Modul yang Menggunakan | Mekanisme Storage | Status Tenant Namespace |
|---|---|---|---|
| **Zustand `persist` (21 Modul)** | Approvals, Deliverables, Interactions, Assets, Meetings, Milestones, Notifications, People, Resources, Schedules, Templates, Time Tracker, Workflows, Bookmarks, Collaboration, Expenses, Forms, Goals, Search, Statistics, Subscriptions | `createWorkspaceStorage()` di `persistStorage.ts` | **Terisolasi** (`ws-main:<kunci>`), terkunci saat inisialisasi modul. |
| **Hook Manual + `rawStorage` (18 Modul)** | Habits, Reminders, Database, Wiki, Task Manager (v2), Project Manager, Calendar, Eisenhower, Focus Timer, Kanban, Planner, Timeline, Notes, Countdown, Documents, Knowledge Base, Research Manager, Web Clipper | `getRaw` / `setRaw` di `rawStorage.ts` | **Terisolasi** (`ws-main:<kunci>`), read fallback lazy ke legacy. |
| **Domain Repositories (React Query)** | Klien, Proyek Konsultasi, Catatan Konsultasi, Dokumen Bersama, Deliverables, Rapat | `src/core/repos/*` via `src/lib/data.ts` | **Terisolasi** (`ws-main:<resource>.*`), divalidasi izin `can(session, ...)`. |
| **Global React Context (2 Subsistem)** | Seluruh 49 tampilan PEH (`PEHContext`), Seluruh 19 tampilan Life OS (`LifeOSContext`) | `localStorage` manual internal (`peh_pfs_workspace_v2`, `life_planner_os_v1_*`) | **Legacy/Pribadi** (Belum dipindah ke namespace `ws-main:*`). |
| **Komponen Bebas State / Prop Murni** | 100 Strategic Frameworks, 520 Standalone Apps, Komoditas Dashboard | State lokal komponen / `useState` | Memori browser & data statis. |
