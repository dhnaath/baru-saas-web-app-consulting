import React from 'react';
import {
  Layers,
  Coins,
  Wheat,
  ShoppingBag,
  Flame,
  Trees,
  Package,
  HeartPulse,
  Briefcase,
  Droplets,
  HardHat,
  Scale,
  Building2,
  TrendingUp,
  BarChart3,
  Sparkles,
  Shield,
  Vault,
  Award,
  Wallet,
} from 'lucide-react';

export interface CategoryMeta {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgLight: string;
  desc: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  'Semua': {
    icon: Layers,
    color: 'text-primary',
    bgLight: 'bg-primary/10',
    desc: 'Seluruh 100 komoditas acuan nasional lintas sektor'
  },
  'Pasar Keuangan & Global': {
    icon: Coins,
    color: 'text-amber-500',
    bgLight: 'bg-amber-500/10',
    desc: 'Spot emas, perak, crude oil & bursa komoditas internasional'
  },
  'Pangan Pokok Lokal': {
    icon: Wheat,
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-500/10',
    desc: 'Beras premium, beras medium, jagung pipil, cabai & bawang'
  },
  'Sembako & HET Kemendag': {
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgLight: 'bg-blue-500/10',
    desc: 'Minyakita, minyak goreng kemasan, gula konsumsi, daging sapi & telur'
  },
  'Energi & Bahan Bakar': {
    icon: Flame,
    color: 'text-rose-500',
    bgLight: 'bg-rose-500/10',
    desc: 'Pertalite, Solar subsidi, LPG 3kg, Pertamax, Dex & avtur'
  },
  'Pertanian & Properti Rakyat': {
    icon: Trees,
    color: 'text-lime-600 dark:text-lime-400',
    bgLight: 'bg-lime-500/10',
    desc: 'CPO, karet alam, kopi robusta, kakao, cengkeh & pupuk subsidi'
  },
  'IHK, Sandang & Material Bangunan': {
    icon: Package,
    color: 'text-zinc-500 dark:text-zinc-400',
    bgLight: 'bg-zinc-500/10',
    desc: 'Semen, besi beton SNI, aspal, kayu lapis, keramik & bahan bangunan'
  },
  'Kesehatan & Obat Generik': {
    icon: HeartPulse,
    color: 'text-red-500',
    bgLight: 'bg-red-500/10',
    desc: 'Paracetamol, Amoxicillin, vitamin, obat esensial & plafon e-Katalog'
  },
  'Konsumen & Otomotif': {
    icon: Briefcase,
    color: 'text-purple-500',
    bgLight: 'bg-purple-500/10',
    desc: 'Pakan unggas, garam konsumsi, sabun cuci, ban motor & suku cadang'
  },
  'Fasilitas Utilitas Publik': {
    icon: Droplets,
    color: 'text-cyan-500',
    bgLight: 'bg-cyan-500/10',
    desc: 'Tarif listrik PLN, air PDAM, gas bumi PGN & tarif tol Trans Jawa'
  },
  'Tenaga Kerja & Jasa Konstruksi': {
    icon: HardHat,
    color: 'text-orange-500',
    bgLight: 'bg-orange-500/10',
    desc: 'Standar upah tukang, mandor & indeks biaya konstruksi KemenPUPR'
  }
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  'Pasar Keuangan & Global': 'from-amber-500 to-orange-600',
  'Pangan Pokok Lokal': 'from-emerald-500 to-teal-700',
  'Sembako & HET Kemendag': 'from-blue-500 to-cyan-600',
  'Energi & Bahan Bakar': 'from-rose-500 to-pink-600',
  'Pertanian & Properti Rakyat': 'from-lime-600 to-emerald-700',
  'IHK, Sandang & Material Bangunan': 'from-zinc-500 to-slate-700',
  'Kesehatan & Obat Generik': 'from-red-500 to-rose-600',
  'Konsumen & Otomotif': 'from-purple-500 to-violet-700',
  'Fasilitas Utilitas Publik': 'from-cyan-500 to-blue-700',
  'Tenaga Kerja & Jasa Konstruksi': 'from-orange-500 to-amber-700',
};

export interface NavigatorCardItem {
  id: string;
  label: string;
  badge: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgLight: string;
  borderActive: string;
  ringActive: string;
}

export interface DirectLinkItem {
  id: string;
  title: string;
  category: 'Portal Resmi' | 'Aplikasi Terkait';
  url: string;
  isExternal: boolean;
  desc: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgLight: string;
}

export const LOGAM_MULIA_DIRECT_LINKS: DirectLinkItem[] = [
  {
    id: 'antam-logammulia',
    title: 'Antam Logam Mulia (UBPP Official)',
    category: 'Portal Resmi',
    url: 'https://www.logammulia.com/id',
    isExternal: true,
    desc: 'Katalog resmi pecahan emas batangan Antam, update harga buyback harian, dan butik LM se-Indonesia.',
    badge: 'Produsen Resmi BUMN',
    icon: Coins,
    color: 'text-amber-500',
    bgLight: 'bg-amber-500/10',
  },
  {
    id: 'pegadaian-emas',
    title: 'Pegadaian Tabungan Emas',
    category: 'Portal Resmi',
    url: 'https://www.pegadaian.co.id/produk/tabungan-emas',
    isExternal: true,
    desc: 'Investasi dan titipan emas batangan terjamin pemerintah, cetak fisik pecahan 1g hingga 100g.',
    badge: 'BUMN Pembiayaan & Emas',
    icon: Building2,
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-500/10',
  },
  {
    id: 'lbma-spot',
    title: 'LBMA Precious Metals (London)',
    category: 'Portal Resmi',
    url: 'https://www.lbma.org.uk/prices-and-data/precious-metal-prices',
    isExternal: true,
    desc: 'London Bullion Market Association: patokan harga spot emas (XAU) dan perak (XAG) acuan dunia.',
    badge: 'Benchmark Global',
    icon: Scale,
    color: 'text-blue-500',
    bgLight: 'bg-blue-500/10',
  },
  {
    id: 'icdx-komoditi',
    title: 'ICDX Pasar Fisik Emas',
    category: 'Portal Resmi',
    url: 'https://www.icdx.co.id',
    isExternal: true,
    desc: 'Bursa komoditi berjangka Indonesia untuk transaksi perdagangan emas fisik & digital terdaftar Bappebti.',
    badge: 'Bursa Komoditi RI',
    icon: TrendingUp,
    color: 'text-indigo-500',
    bgLight: 'bg-indigo-500/10',
  },
  {
    id: 'tradingview-xau',
    title: 'TradingView XAU/USD (Spot Gold)',
    category: 'Portal Resmi',
    url: 'https://www.tradingview.com/symbols/XAUUSD/',
    isExternal: true,
    desc: 'Grafik candlestick live pergerakan harga emas dunia terhadap USD real-time 24 jam interaktif.',
    badge: 'Spot Emas Live',
    icon: BarChart3,
    color: 'text-amber-500',
    bgLight: 'bg-amber-500/10',
  },
  {
    id: 'tradingview-xag',
    title: 'TradingView XAG/USD (Spot Silver)',
    category: 'Portal Resmi',
    url: 'https://www.tradingview.com/symbols/XAGUSD/',
    isExternal: true,
    desc: 'Grafik teknikal live spot perak murni internasional terhadap USD dengan indikator teknikal lengkap.',
    badge: 'Spot Perak Live',
    icon: Sparkles,
    color: 'text-zinc-500',
    bgLight: 'bg-zinc-500/10',
  },
  {
    id: 'bappebti-ri',
    title: 'Bappebti Kemendag RI',
    category: 'Portal Resmi',
    url: 'https://bappebti.go.id',
    isExternal: true,
    desc: 'Badan Pengawas Perdagangan Berjangka Komoditi: regulasi resmi bursa fisik emas dan aset digital nasional.',
    badge: 'Regulator Pemerintah',
    icon: Shield,
    color: 'text-rose-500',
    bgLight: 'bg-rose-500/10',
  },
  {
    id: 'liquid-reserves-app',
    title: 'Cadangan Dana & Kas Likuid (Liquid Reserves)',
    category: 'Aplikasi Terkait',
    url: '/liquid-reserves',
    isExternal: false,
    desc: 'Modul alokasi cadangan likuiditas darurat, pemeliharaan simpanan emas fisik, dan kas siap pakai.',
    badge: 'Aplikasi Internal',
    icon: Vault,
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-500/10',
  },
  {
    id: 'syariah-wadiah-app',
    title: 'Akad Wadiah Emas & Dinar (Penitipan Amanah)',
    category: 'Aplikasi Terkait',
    url: '/syariah/akad?app=wadiah',
    isExternal: false,
    desc: 'Protokol penitipan syariah murni aset dinar, dirham, dan batangan emas (Amanah/Dhamanah) bebas riba.',
    badge: 'Akad Muamalah',
    icon: Shield,
    color: 'text-violet-500',
    bgLight: 'bg-violet-500/10',
  },
  {
    id: 'zakat-maal-app',
    title: 'Kalkulator Zakat Maal & Nisab Emas',
    category: 'Aplikasi Terkait',
    url: '/zakat?app=maal',
    isExternal: false,
    desc: 'Perhitungan presisi zakat 2.5% simpanan batangan emas dan perak yang mencapai nisab 85g haul 1 tahun.',
    badge: 'Kalkulator Zakat',
    icon: Award,
    color: 'text-rose-500',
    bgLight: 'bg-rose-500/10',
  },
  {
    id: 'investasi-app',
    title: 'Portofolio Investasi & Multi-Aset',
    category: 'Aplikasi Terkait',
    url: '/investasi',
    isExternal: false,
    desc: 'Konsolidasi portofolio kepemilikan aset riil fisik, surat berharga, dan diversifikasi kekayaan.',
    badge: 'Portofolio Aset',
    icon: Briefcase,
    color: 'text-blue-500',
    bgLight: 'bg-blue-500/10',
  },
  {
    id: 'multi-wallet-app',
    title: 'Kas, Dompet & Multi-Wallet',
    category: 'Aplikasi Terkait',
    url: '/flow?tab=cat_kredit',
    isExternal: false,
    desc: 'Buku kas harian multi-wallet, saldo rekening fisik perbankan, dan pengawasan utang piutang.',
    badge: 'Buku Kas & Saldo',
    icon: Wallet,
    color: 'text-cyan-500',
    bgLight: 'bg-cyan-500/10',
  },
];

export const QUOTE_COMMODITY_DIRECT_LINKS: Record<string, {
  externalUrl: string;
  externalLabel: string;
  internalPath?: string;
  internalLabel?: string;
}> = {
  dinar: {
    externalUrl: 'https://www.logammulia.com/id',
    externalLabel: 'Antam Emas',
    internalPath: '/syariah/akad?app=wadiah',
    internalLabel: 'Akad Wadiah',
  },
  dirham: {
    externalUrl: 'https://www.pegadaian.co.id/produk/tabungan-emas',
    externalLabel: 'Pegadaian Emas',
    internalPath: '/liquid-reserves',
    internalLabel: 'Reserves',
  },
  gold_gram: {
    externalUrl: 'https://www.logammulia.com/id/harga-emas-hari-ini',
    externalLabel: 'Antam UBPP',
    internalPath: '/zakat?app=maal',
    internalLabel: 'Zakat Emas',
  },
  silver_gram: {
    externalUrl: 'https://www.lbma.org.uk/prices-and-data/precious-metal-prices',
    externalLabel: 'LBMA Spot',
    internalPath: '/liquid-reserves',
    internalLabel: 'Reserves',
  },
  issi: {
    externalUrl: 'https://www.idx.co.id/id/produk/indeks/indeks-syariah',
    externalLabel: 'IDX ISSI',
    internalPath: '/investasi',
    internalLabel: 'Investasi',
  },
  jii: {
    externalUrl: 'https://www.idx.co.id/id/produk/indeks/jii',
    externalLabel: 'IDX JII',
    internalPath: '/investasi',
    internalLabel: 'Investasi',
  },
  jii70: {
    externalUrl: 'https://www.idx.co.id/id/produk/indeks/jii70',
    externalLabel: 'IDX JII70',
    internalPath: '/investasi',
    internalLabel: 'Investasi',
  },
  djimi: {
    externalUrl: 'https://www.spglobal.com/spdji/en/indices/equity/dow-jones-islamic-market-index/',
    externalLabel: 'S&P DJIMI',
    internalPath: '/paper-securities',
    internalLabel: 'Securities',
  },
  msci: {
    externalUrl: 'https://www.msci.com/our-solutions/indexes/islamic-indexes',
    externalLabel: 'MSCI Islamic',
    internalPath: '/paper-securities',
    internalLabel: 'Securities',
  },
  sp500sh: {
    externalUrl: 'https://www.spglobal.com/spdji/en/indices/equity/sp-500-shariah-index/',
    externalLabel: 'S&P 500 Shariah',
    internalPath: '/paper-securities',
    internalLabel: 'Securities',
  },
  ihsg: {
    externalUrl: 'https://www.idx.co.id',
    externalLabel: 'IDX Composite',
    internalPath: '/paper-securities',
    internalLabel: 'Securities',
  },
  lq45: {
    externalUrl: 'https://www.idx.co.id/id/produk/indeks/lq45',
    externalLabel: 'IDX LQ45',
    internalPath: '/paper-securities',
    internalLabel: 'Securities',
  },
  idx30: {
    externalUrl: 'https://www.idx.co.id/id/produk/indeks/idx30',
    externalLabel: 'IDX 30',
    internalPath: '/paper-securities',
    internalLabel: 'Securities',
  },
};

export const NAVIGATOR_CARDS: NavigatorCardItem[] = [
  {
    id: 'commodity_all',
    label: '100 Komoditas',
    badge: '100 Item',
    subtext: '10 Sektor Lengkap',
    icon: Layers,
    color: 'text-primary',
    bgLight: 'bg-primary/10',
    borderActive: 'border-primary',
    ringActive: 'ring-primary/20',
  },
  {
    id: 'national_indices',
    label: '10 Indeks Pembangunan',
    badge: '10 Indikator',
    subtext: 'Sosial, Ekonomi & RPJMN',
    icon: BarChart3,
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-500/10',
    borderActive: 'border-emerald-500',
    ringActive: 'ring-emerald-500/20',
  },
  {
    id: 'indeks_harga_makro',
    label: 'Indeks Harga Makro',
    badge: '8 Indeks BPS & BI',
    subtext: 'IHK Inflasi, IHPB, NTP, IHPR, IBK',
    icon: Scale,
    color: 'text-violet-500',
    bgLight: 'bg-violet-500/10',
    borderActive: 'border-violet-500',
    ringActive: 'ring-violet-500/20',
  },
  {
    id: 'logam_mulia',
    label: 'Logam Mulia',
    badge: '12 Direct Link',
    subtext: 'Antam, LBMA, Reserves, Wadiah',
    icon: Coins,
    color: 'text-amber-500',
    bgLight: 'bg-amber-500/10',
    borderActive: 'border-amber-500',
    ringActive: 'ring-amber-500/20',
  },
  {
    id: 'indeks_global',
    label: 'Indeks Global & BEI',
    badge: 'IHSG & Global Link',
    subtext: 'IHSG, LQ45, IDX30, S&P 500',
    icon: TrendingUp,
    color: 'text-blue-500',
    bgLight: 'bg-blue-500/10',
    borderActive: 'border-blue-500',
    ringActive: 'ring-blue-500/20',
  },
  {
    id: 'saham_syariah',
    label: 'Saham Syariah (BEI)',
    badge: 'IDX Direct Link',
    subtext: 'Konstituen Saham Syariah IDX',
    icon: Building2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    borderActive: 'border-emerald-500',
    ringActive: 'ring-emerald-500/20',
  },
  {
    id: 'Pangan Pokok Lokal',
    label: 'Pangan Pokok Lokal',
    badge: '10 Item',
    subtext: 'Beras, Jagung, Cabai, Bawang',
    icon: Wheat,
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-500/10',
    borderActive: 'border-emerald-500',
    ringActive: 'ring-emerald-500/20',
  },
  {
    id: 'Sembako & HET Kemendag',
    label: 'Sembako & HET Gov',
    badge: '10 Item',
    subtext: 'Minyakita, Gula, Daging, Telur',
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgLight: 'bg-blue-500/10',
    borderActive: 'border-blue-500',
    ringActive: 'ring-blue-500/20',
  },
  {
    id: 'Energi & Bahan Bakar',
    label: 'Energi & Bahan Bakar',
    badge: '10 Item',
    subtext: 'Pertalite, Solar, LPG 3kg, Dex',
    icon: Flame,
    color: 'text-rose-500',
    bgLight: 'bg-rose-500/10',
    borderActive: 'border-rose-500',
    ringActive: 'ring-rose-500/20',
  },
  {
    id: 'Pertanian & Properti Rakyat',
    label: 'Pertanian & Perkebunan',
    badge: '10 Item',
    subtext: 'CPO, Karet, Kopi, Kakao, Pupuk',
    icon: Trees,
    color: 'text-lime-600 dark:text-lime-400',
    bgLight: 'bg-lime-500/10',
    borderActive: 'border-lime-500',
    ringActive: 'ring-lime-500/20',
  },
  {
    id: 'IHK, Sandang & Material Bangunan',
    label: 'IHK & Material Bangunan',
    badge: '10 Item',
    subtext: 'Semen, Besi SNI, Keramik, Kayu',
    icon: Package,
    color: 'text-zinc-500 dark:text-zinc-400',
    bgLight: 'bg-zinc-500/10',
    borderActive: 'border-zinc-500',
    ringActive: 'ring-zinc-500/20',
  },
  {
    id: 'Kesehatan & Obat Generik',
    label: 'Kesehatan & Obat Generik',
    badge: '10 Item',
    subtext: 'Paracetamol, e-Katalog',
    icon: HeartPulse,
    color: 'text-red-500',
    bgLight: 'bg-red-500/10',
    borderActive: 'border-red-500',
    ringActive: 'ring-red-500/20',
  },
  {
    id: 'Konsumen & Otomotif',
    label: 'Konsumen & Otomotif',
    badge: '10 Item',
    subtext: 'Pakan, Garam, Ban, Sparepart',
    icon: Briefcase,
    color: 'text-purple-500',
    bgLight: 'bg-purple-500/10',
    borderActive: 'border-purple-500',
    ringActive: 'ring-purple-500/20',
  },
  {
    id: 'Fasilitas Utilitas Publik',
    label: 'Fasilitas Utilitas Publik',
    badge: '10 Item',
    subtext: 'Listrik PLN, PDAM, Gas, Tol',
    icon: Droplets,
    color: 'text-cyan-500',
    bgLight: 'bg-cyan-500/10',
    borderActive: 'border-cyan-500',
    ringActive: 'ring-cyan-500/20',
  },
  {
    id: 'Tenaga Kerja & Jasa Konstruksi',
    label: 'Tenaga Kerja & Konstruksi',
    badge: '10 Item',
    subtext: 'Upah Tukang, Mandor, IBK PUPR',
    icon: HardHat,
    color: 'text-orange-500',
    bgLight: 'bg-orange-500/10',
    borderActive: 'border-orange-500',
    ringActive: 'ring-orange-500/20',
  },
];

export const MACRO_INDEX_DIRECT_LINKS: Record<string, string> = {
  ihk: 'https://www.bps.go.id/id/statistics/subject/ihk-inflasi',
  ihpb: 'https://www.bps.go.id/id/statistics/subject/harga-perdagangan-besar',
  ntp: 'https://www.bps.go.id/id/statistics/subject/nilai-tukar-petani',
  ntn: 'https://www.bps.go.id/id/statistics/subject/nilai-tukar-nelayan',
  ihpr: 'https://www.bi.go.id/id/statistik/indikator/survei-harga-properti-residensial.aspx',
  ibk: 'https://pu.go.id',
  ihp: 'https://www.bps.go.id/id/statistics/subject/indeks-harga-produsen',
  ihke: 'https://www.bps.go.id/id/statistics/subject/indeks-harga-perdagangan-luar-negeri',
};
