import React, { useState, useMemo } from 'react';
import { 
  Search, Download, TrendingUp, 
  ShieldAlert, Database, X, 
  Building2, CheckCircle2, Table as TableIcon, LayoutGrid,
  CalendarClock, Layers, ChevronDown, ArrowUpDown
} from 'lucide-react';
import { AppShell } from '@/app/app-shell';
import { ShellHeader } from '@/app/shell-header';
import { cn } from '@/lib/utils';
import { 
  COMMODITY_DATA, 
  COMMODITY_SOURCES, 
  UPDATE_CADENCES, 
  PRICING_TYPES,
  CommodityItem,
  UpdateCadence,
  PricingType
} from '../commodityData';
import { NationalIndicesSection } from '@/features/launcher/NationalIndicesSection';
import { NATIONAL_INDICES_DATA } from '@/data/nationalIndicesData';
import { 
  MACRO_PRICE_INDICES_DATA, 
  MacroPriceIndexItem 
} from '@/data/priceIndicesData';
import {
  CATEGORY_META,
  CATEGORY_GRADIENTS,
  NAVIGATOR_CARDS,
  LOGAM_MULIA_DIRECT_LINKS,
  QUOTE_COMMODITY_DIRECT_LINKS,
  MACRO_INDEX_DIRECT_LINKS,
  DirectLinkItem,
} from '@/features/commodity/data/commodityLinks';
import { MacroPriceIndicesSection } from '@/features/commodity/components/MacroPriceIndicesSection';
import { SpotQuotesSection } from '@/features/commodity/components/SpotQuotesSection';
import { CommodityCatalogSection } from '@/features/commodity/components/CommodityCatalogSection';
import { 
  CommodityDetailModal, 
  MacroIndexDetailModal, 
  JsonSchemaModal 
} from '@/features/commodity/components/CommodityModals';

// Re-export items for backward compatibility
export type { DirectLinkItem };
export { 
  CATEGORY_META, 
  CATEGORY_GRADIENTS, 
  NAVIGATOR_CARDS, 
  LOGAM_MULIA_DIRECT_LINKS, 
  QUOTE_COMMODITY_DIRECT_LINKS, 
  MACRO_INDEX_DIRECT_LINKS,
  COMMODITY_DATA,
  COMMODITY_SOURCES,
  UPDATE_CADENCES,
  PRICING_TYPES
};
export type { CommodityItem, UpdateCadence, PricingType };

export function CommodityDashboardSection({ 
  defaultNavTab
}: { 
  isEmbedded?: boolean;
  defaultNavTab?: string;
}) {
  const [activeNavigatorTab, setActiveNavigatorTab] = useState<string>(() => {
    if (defaultNavTab) return defaultNavTab;
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const sec = p.get('section') || p.get('view') || p.get('tab');
      if (sec === 'indeks' || sec === '10-indeks' || sec === 'national_indices') return 'national_indices';
      if (sec === 'makro' || sec === 'indeks_harga' || sec === 'indeks_harga_makro' || sec === 'ihk') return 'indeks_harga_makro';
      if (sec === 'spot' || sec === 'realtime') return 'spot_realtime';
      if (sec === 'logam_mulia' || sec === 'emas' || sec === 'gold') return 'logam_mulia';
      if (sec === 'global' || sec === 'indeks_global') return 'indeks_global';
      if (sec === 'syariah' || sec === 'saham_syariah' || sec === 'jii' || sec === 'bei') return 'saham_syariah';
      if (sec === 'all' || sec === 'semua' || sec === 'both') return 'both';
    }
    return 'commodity_all';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedCadence, setSelectedCadence] = useState<UpdateCadence | 'Semua'>('Semua');
  const [selectedSource, setSelectedSource] = useState<string>('Semua');
  const [selectedPricingType, setSelectedPricingType] = useState<PricingType | 'Semua'>('Semua');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [sortBy, setSortBy] = useState<'id' | 'nama' | 'harga' | 'cadence'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [selectedItem, setSelectedItem] = useState<CommodityItem | null>(null);
  const [showJsonSchemaModal, setShowJsonSchemaModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [selectedMacroItem, setSelectedMacroItem] = useState<MacroPriceIndexItem | null>(null);

  const triggerNotify = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const categories = useMemo(() => {
    const list = Array.from(new Set(COMMODITY_DATA.map((item) => item.kategori)));
    return ['Semua', ...list];
  }, []);

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return COMMODITY_DATA.filter((item) => {
      if (selectedCategory !== 'Semua' && item.kategori !== selectedCategory) return false;
      if (selectedCadence !== 'Semua' && item.updateCadence !== selectedCadence) return false;
      if (selectedSource !== 'Semua' && item.sumberData !== selectedSource) return false;
      if (selectedPricingType !== 'Semua' && item.jenisBatas !== selectedPricingType) return false;
      if (q) {
        const matchName = item.nama.toLowerCase().includes(q);
        const matchSource = item.sumberData.toLowerCase().includes(q);
        const matchCat = item.kategori.toLowerCase().includes(q);
        const matchReg = item.statusRegulasi.toLowerCase().includes(q);
        const matchSpec = item.deskripsiSpesifikasi.toLowerCase().includes(q);
        return matchName || matchSource || matchCat || matchReg || matchSpec;
      }
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'id') {
        comparison = a.id - b.id;
      } else if (sortBy === 'nama') {
        comparison = a.nama.localeCompare(b.nama);
      } else if (sortBy === 'harga') {
        const priceA = a.mataUang === 'USD' ? a.hargaTerbaru * 15800 : a.hargaTerbaru;
        const priceB = b.mataUang === 'USD' ? b.hargaTerbaru * 15800 : b.hargaTerbaru;
        comparison = priceA - priceB;
      } else if (sortBy === 'cadence') {
        comparison = a.updateCadence.localeCompare(b.updateCadence);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, selectedCategory, selectedCadence, selectedSource, selectedPricingType, sortBy, sortDirection]);

  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'Semua') {
      return [{
        category: selectedCategory,
        items: filteredData,
      }];
    }

    const map = new Map<string, CommodityItem[]>();
    for (const item of filteredData) {
      const list = map.get(item.kategori) || [];
      list.push(item);
      map.set(item.kategori, list);
    }

    const groups: { category: string; items: CommodityItem[] }[] = [];
    for (const cat of categories) {
      if (cat === 'Semua') continue;
      const items = map.get(cat);
      if (items && items.length > 0) {
        groups.push({ category: cat, items });
      }
    }
    return groups;
  }, [filteredData, selectedCategory, categories]);

  const handleExportCSV = () => {
    if (activeNavigatorTab === 'national_indices') {
      const headers = [
        'No', 'Nama Indeks', 'Singkatan', 'Kategori', 'Skor Terkini',
        'Skala', 'Status Kategori', 'Tren', 'Perubahan YoY',
        'Frekuensi Rilis', 'Jadwal Rilis', 'Sumber Resmi', 'Target RPJMN'
      ];
      const rows = NATIONAL_INDICES_DATA.map((d) => [
        d.number, `"${d.nama}"`, `"${d.singkatan}"`, `"${d.kategori}"`,
        `"${d.formatNilai}"`, `"${d.skala}"`, `"${d.statusKategori}"`,
        `"${d.tren.toUpperCase()}"`, `"${d.perubahanYoY}"`,
        `"${d.frekuensiRilis}"`, `"${d.jadwalBulanRilis}"`,
        `"${d.sumberResmi}"`, `"${d.targetRPJMN}"`
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `10_Indeks_Pembangunan_Nasional_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerNotify("File CSV 10 Indeks Pembangunan berhasil diunduh!");
      return;
    }

    if (activeNavigatorTab === 'indeks_harga_makro') {
      const headers = [
        'No', 'Kode', 'Nama Indeks', 'Singkatan', 'Kategori', 'Skor Terkini',
        'Satuan', 'Tren', 'Perubahan YoY', 'Perubahan MoM',
        'Status Kategori', 'Frekuensi Rilis', 'Jadwal Rilis', 'Sumber Resmi'
      ];
      const rows = MACRO_PRICE_INDICES_DATA.map((d) => [
        d.number, `"${d.code}"`, `"${d.name}"`, `"${d.singkatan}"`, `"${d.category}"`,
        `"${d.formatNilai}"`, `"${d.satuan}"`, `"${d.tren.toUpperCase()}"`,
        `"${d.perubahanYoY}"`, `"${d.perubahanMoM || '-'}"`,
        `"${d.statusKategori}"`, `"${d.frekuensiRilis}"`, `"${d.jadwalRilis}"`,
        `"${d.sumberResmi}"`
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `8_Indeks_Harga_Makro_BPS_BI_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerNotify("File CSV 8 Indeks Harga Makro BPS & BI berhasil diunduh!");
      return;
    }

    const headers = ["ID", "Nama Komoditas", "Kategori", "Harga", "Mata Uang", "Satuan", "Jenis Batas", "Sumber Data", "Rentang Update", "Regulasi"];
    const rows = filteredData.map(i => [
      i.id,
      `"${i.nama.replace(/"/g, '""')}"`,
      `"${i.kategori.replace(/"/g, '""')}"`,
      i.hargaTerbaru,
      i.mataUang,
      `"${i.satuan.replace(/"/g, '""')}"`,
      `"${i.jenisBatas.replace(/"/g, '""')}"`,
      `"${i.sumberData.replace(/"/g, '""')}"`,
      i.updateCadence,
      `"${i.statusRegulasi.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `100_Komoditas_${selectedCategory !== 'Semua' ? selectedCategory : 'Lengkap'}_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    triggerNotify("File CSV 100 Komoditas berhasil diunduh!");
  };

  const handleNavigatorClick = (cardId: string) => {
    setActiveNavigatorTab(cardId);
    if (cardId === 'commodity_all') {
      setSelectedCategory('Semua');
    } else if (
      cardId === 'national_indices' ||
      cardId === 'indeks_harga_makro' ||
      cardId === 'logam_mulia' ||
      cardId === 'indeks_global' ||
      cardId === 'saham_syariah' ||
      cardId === 'spot_realtime' ||
      cardId === 'both'
    ) {
      // Direct section switch
    } else {
      setSelectedCategory(cardId);
    }
  };

  const isCardActive = (cardId: string) => {
    if (activeNavigatorTab === 'both') return false;
    if (cardId === activeNavigatorTab) return true;
    if (cardId === 'commodity_all') {
      return (
        activeNavigatorTab === 'commodity_all' ||
        (selectedCategory === 'Semua' &&
          activeNavigatorTab !== 'national_indices' &&
          activeNavigatorTab !== 'indeks_harga_makro' &&
          activeNavigatorTab !== 'logam_mulia' &&
          activeNavigatorTab !== 'indeks_global' &&
          activeNavigatorTab !== 'saham_syariah' &&
          activeNavigatorTab !== 'spot_realtime')
      );
    }
    return (
      (activeNavigatorTab === cardId || selectedCategory === cardId) &&
      activeNavigatorTab !== 'national_indices' &&
      activeNavigatorTab !== 'indeks_harga_makro' &&
      activeNavigatorTab !== 'logam_mulia' &&
      activeNavigatorTab !== 'indeks_global' &&
      activeNavigatorTab !== 'saham_syariah' &&
      activeNavigatorTab !== 'spot_realtime'
    );
  };

  const handleCopyJson = () => {
    if (activeNavigatorTab === 'national_indices') {
      navigator.clipboard.writeText(JSON.stringify(NATIONAL_INDICES_DATA, null, 2));
      triggerNotify("Seluruh data 10 Indeks Pembangunan disalin ke clipboard!");
      return;
    }
    if (activeNavigatorTab === 'indeks_harga_makro') {
      navigator.clipboard.writeText(JSON.stringify(MACRO_PRICE_INDICES_DATA, null, 2));
      triggerNotify("Seluruh data 8 Indeks Harga Makro disalin ke clipboard!");
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(COMMODITY_DATA, null, 2));
    triggerNotify("Seluruh data 100 Komoditas disalin ke clipboard!");
  };

  const handleResetAllFilters = () => {
    setSelectedCategory('Semua');
    setSelectedCadence('Semua');
    setSelectedSource('Semua');
    setSelectedPricingType('Semua');
    setSearchQuery('');
    setSortBy('id');
    setSortDirection('asc');
  };

  return (
    <div className="space-y-6">
      {/* Portaled ShellHeader: Clean & Seamless Toolbar di Bar Atas */}
      <ShellHeader>
        <div className="flex items-center gap-1.5 h-full py-0 shrink-0">
          {/* Selector Jenis Batas / Regulasi */}
          <div className="relative flex items-center gap-1.5 px-2.5 h-[36px] rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all text-xs shrink-0 cursor-pointer border border-black/5 dark:border-white/10">
            <ShieldAlert size={20} className="text-amber-500 shrink-0 pointer-events-none" />
            <select
              value={selectedPricingType}
              onChange={(e) => setSelectedPricingType(e.target.value as any)}
              className="bg-transparent border-0 text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-4 appearance-none py-0 leading-tight"
              title="Pilih Jenis Batas Harga / Regulasi"
            >
              <option value="Semua" className="bg-popover text-popover-foreground">Regulasi</option>
              {PRICING_TYPES.map(p => (
                <option key={p} value={p} className="bg-popover text-popover-foreground">{p}</option>
              ))}
            </select>
            <ChevronDown size={11} className="text-muted-foreground pointer-events-none absolute right-2 shrink-0" />
          </div>

          {/* Selector Ritme Pembaruan */}
          <div className="relative flex items-center gap-1.5 px-2.5 h-[36px] rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all text-xs shrink-0 cursor-pointer border border-black/5 dark:border-white/10">
            <CalendarClock size={20} className="text-primary shrink-0 pointer-events-none" />
            <select
              value={selectedCadence}
              onChange={(e) => setSelectedCadence(e.target.value as any)}
              className="bg-transparent border-0 text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-4 appearance-none py-0 leading-tight"
              title="Pilih Ritme Pembaruan Komoditas"
            >
              <option value="Semua" className="bg-popover text-popover-foreground">Ritme</option>
              {UPDATE_CADENCES.map(cadence => (
                <option key={cadence} value={cadence} className="bg-popover text-popover-foreground">
                  Ritme: {cadence}
                </option>
              ))}
            </select>
            <ChevronDown size={11} className="text-muted-foreground pointer-events-none absolute right-2 shrink-0" />
          </div>

          {/* Selector Sumber Data Resmi */}
          <div className="relative flex items-center gap-1.5 px-2.5 h-[36px] rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all text-xs shrink-0 cursor-pointer border border-black/5 dark:border-white/10 max-w-[170px]">
            <Building2 size={20} className="text-emerald-500 shrink-0 pointer-events-none" />
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-transparent border-0 text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-4 appearance-none py-0 leading-tight truncate"
              title="Pilih Sumber Data Resmi"
            >
              <option value="Semua" className="bg-popover text-popover-foreground">Sumber</option>
              {COMMODITY_SOURCES.map(source => (
                <option key={source} value={source} className="bg-popover text-popover-foreground">
                  {source}
                </option>
              ))}
            </select>
            <ChevronDown size={11} className="text-muted-foreground pointer-events-none absolute right-2 shrink-0" />
          </div>

          {/* Selector Urutan & Arah Sort */}
          <div className="relative flex items-center gap-1 pl-2.5 pr-1 h-[36px] rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all text-xs shrink-0 cursor-pointer border border-black/5 dark:border-white/10">
            <ArrowUpDown size={20} className="text-violet-500 shrink-0 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-3 appearance-none py-0 leading-tight"
              title="Pilih Kriteria Pengurutan"
            >
              <option value="id" className="bg-popover text-popover-foreground">Urut: ID</option>
              <option value="nama" className="bg-popover text-popover-foreground">Urut: Nama</option>
              <option value="harga" className="bg-popover text-popover-foreground">Urut: Harga</option>
              <option value="cadence" className="bg-popover text-popover-foreground">Urut: Ritme</option>
            </select>
            <button
              type="button"
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="commodity-header-icon-btn size-9 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-all text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
              title={sortDirection === 'asc' ? 'Urutan Naik (A-Z / Rendah ke Tinggi)' : 'Urutan Turun (Z-A / Tinggi ke Rendah)'}
            >
              <TrendingUp size={20} className={cn("shrink-0", sortDirection === 'desc' ? 'rotate-180 text-amber-500' : 'text-emerald-500')} />
            </button>
          </div>

          {/* Tombol Reset Cepat */}
          {(searchQuery || selectedCadence !== 'Semua' || selectedPricingType !== 'Semua' || selectedSource !== 'Semua' || sortBy !== 'id') && (
            <button
              type="button"
              onClick={handleResetAllFilters}
              className="inline-flex items-center gap-1 px-2.5 h-[36px] rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold shrink-0 cursor-pointer border border-rose-500/20 active:scale-95 transition-all"
              title="Reset seluruh filter dan pengurutan ke awal"
            >
              <X size={16} className="shrink-0" />
              <span>Reset</span>
            </button>
          )}

          {/* Divider pemisah halus */}
          <div className="h-4 w-px bg-border/60 shrink-0" />

          {/* Toggle View Mode: Grid Kartu vs Tabel */}
          <div className="flex items-center gap-0.5 p-0.5 bg-black/5 dark:bg-white/5 rounded-full shrink-0 border border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={cn(
                "commodity-header-icon-btn size-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95",
                viewMode === 'cards'
                  ? "bg-background dark:bg-zinc-700 text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              )}
              title="Tampilan Kartu Grid"
            >
              <LayoutGrid size={20} className="shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={cn(
                "commodity-header-icon-btn size-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95",
                viewMode === 'table'
                  ? "bg-background dark:bg-zinc-700 text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              )}
              title="Tampilan Tabel Data"
            >
              <TableIcon size={20} className="shrink-0" />
            </button>
          </div>

          {/* Divider pemisah halus */}
          <div className="h-4 w-px bg-border/60 shrink-0" />

          {/* Tombol Icon Cari */}
          {isSearchExpanded ? (
            <div className="relative flex items-center min-w-[140px] max-w-[200px] sm:max-w-[220px] animate-in fade-in zoom-in-95 duration-150 shrink-0">
              <Search size={20} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground shrink-0 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Cari komoditas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    if (!searchQuery) setIsSearchExpanded(false);
                    else setSearchQuery('');
                  }
                }}
                className="w-full pl-9 pr-7 py-1 h-[36px] text-xs bg-black/5 dark:bg-white/10 border-0 rounded-full focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchExpanded(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded-full"
                title="Tutup pencarian"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchExpanded(true)}
              className={cn(
                "commodity-header-icon-btn size-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95",
                searchQuery
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
              )}
              title={searchQuery ? `Pencarian aktif: "${searchQuery}" (klik untuk ubah)` : "Cari 100 komoditas"}
            >
              <Search size={20} className="shrink-0" />
            </button>
          )}
        </div>
      </ShellHeader>

      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-foreground text-background px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium animate-in fade-in duration-200">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Title & Description Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center justify-center gap-2.5">
          <TrendingUp className="size-7 text-emerald-500 shrink-0" />
          <span>Market Price Monitor</span>
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Pusat intelijen terpadu harga pasar spot fisik, pagu subsidi pangan & energi pemerintah, bursa efek & syariah BEI, serta 10 indikator makro-sosial dan 8 indeks harga resmi BPS & Bank Indonesia (IHK Inflasi, IHPB, NTP, NTN, IHPR, IBK, IHP, IHKE).
        </p>

        <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveNavigatorTab(activeNavigatorTab === 'both' ? 'commodity_all' : 'both')}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-2xs",
              activeNavigatorTab === 'both'
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-accent border-border text-foreground"
            )}
            title="Tampilkan 10 Indeks, Spot Real-time & 100 Komoditas sekaligus"
          >
            <LayoutGrid size={14} />
            <span>{activeNavigatorTab === 'both' ? 'Mode Terpadu Aktif' : 'Tampilkan Keduanya'}</span>
          </button>
          <button
            onClick={() => setShowJsonSchemaModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-background hover:bg-accent border border-border text-foreground transition-colors cursor-pointer shadow-2xs"
            title="Lihat Struktur Skema JSON"
          >
            <Database size={14} className="text-primary" />
            <span>Skema JSON</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer shadow-2xs"
            title="Unduh seluruh data komoditas / indeks ke format CSV"
          >
            <Download size={14} />
            <span>Unduh CSV</span>
          </button>
        </div>
      </div>

      {/* NAVIGATOR UTAMA: 100 KOMODITAS, 10 INDEKS PEMBANGUNAN & INDEKS HARGA MAKRO */}
      <div className="space-y-3 p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-primary/10 text-primary">
              <Layers className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Navigator Utama: 100 Komoditas, 10 Indeks Pembangunan & Indeks Harga Makro
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Pilih modul di bawah untuk beralih instan antara 100 Komoditas, 10 Indeks Pembangunan, 8 Indeks Harga Makro (BPS/BI), Spot Emas/BEI, atau sektor spesifik.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeNavigatorTab !== 'commodity_all' && activeNavigatorTab !== 'both' && (
              <button
                type="button"
                onClick={() => {
                  setActiveNavigatorTab('commodity_all');
                  setSelectedCategory('Semua');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <span>Reset ke 100 Komoditas</span>
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* 15 Kotak Grid Cards Navigator Rapi */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {NAVIGATOR_CARDS.map((card) => {
            const active = isCardActive(card.id);
            const IconComp = card.icon;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleNavigatorClick(card.id)}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] relative group",
                  active
                    ? cn("bg-card shadow-xs ring-2", card.borderActive, card.ringActive)
                    : "bg-card/75 border-border/80 hover:bg-card hover:border-border hover:shadow-2xs"
                )}
                title={`${card.label} - ${card.subtext}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={cn("size-7 rounded-xl flex items-center justify-center shrink-0 transition-colors", card.bgLight, card.color)}>
                    <IconComp size={15} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full tabular-nums",
                    active ? "bg-primary text-primary-foreground font-black" : "bg-muted text-muted-foreground group-hover:text-foreground"
                  )}>
                    {card.badge}
                  </span>
                </div>
                <div className="mt-2">
                  <div className={cn(
                    "text-xs font-bold truncate leading-tight transition-colors",
                    active ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>
                    {card.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground truncate font-normal mt-0.5">
                    {card.subtext}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BAGIAN 1: 10 INDEKS PEMBANGUNAN & KESEJAHTERAAN NASIONAL */}
      {(activeNavigatorTab === 'national_indices' || activeNavigatorTab === 'both') && (
        <div className="space-y-4">
          <NationalIndicesSection isEmbedded={true} hideHeaderBanner={true} />
        </div>
      )}

      {/* BAGIAN INDEKS HARGA MAKROEKONOMI & SEKTORAL RESMI (BPS & BANK INDONESIA) */}
      {(activeNavigatorTab === 'indeks_harga_makro' || activeNavigatorTab === 'both') && (
        <MacroPriceIndicesSection 
          showSectionHeader={activeNavigatorTab === 'both'}
          onSelectMacroItem={setSelectedMacroItem}
          handleExportCSV={handleExportCSV}
        />
      )}

      {/* BAGIAN 2: KUTIPAN HARGA PASAR REAL-TIME (LOGAM MULIA, INDEKS GLOBAL & BEI) */}
      <SpotQuotesSection activeNavigatorTab={activeNavigatorTab} />

      {/* BAGIAN 3: 100 KOMODITAS UNGGULAN NASIONAL */}
      <CommodityCatalogSection
        activeNavigatorTab={activeNavigatorTab}
        filteredData={filteredData}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedCadence={selectedCadence}
        onSelectCadence={setSelectedCadence}
        selectedSource={selectedSource}
        onSelectSource={setSelectedSource}
        selectedPricingType={selectedPricingType}
        onSelectPricingType={setSelectedPricingType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onResetSort={() => { setSortBy('id'); setSortDirection('asc'); }}
        onResetAllFilters={handleResetAllFilters}
        onSelectItem={setSelectedItem}
        groupedCategories={groupedCategories}
      />

      {/* Modals */}
      <CommodityDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onCopyNotify={triggerNotify} 
      />

      <MacroIndexDetailModal 
        item={selectedMacroItem} 
        onClose={() => setSelectedMacroItem(null)} 
        onCopyNotify={triggerNotify} 
      />

      <JsonSchemaModal 
        isOpen={showJsonSchemaModal} 
        onClose={() => setShowJsonSchemaModal(false)} 
        onCopyAllJson={handleCopyJson} 
      />
    </div>
  );
}

export function CommodityDashboard() {
  return (
    <AppShell 
      title="Market Price Monitor" 
      subtitle="Pusat Intelijen Pasar Spot Komoditas Fisik, HET Pemerintah, Pagu Subsidi & 10 Indikator Kesejahteraan Nasional"
    >
      <div className="w-full max-w-[1920px] mx-auto py-3 sm:py-5 px-1 sm:px-2 md:px-3 space-y-6">
        <CommodityDashboardSection />
      </div>
    </AppShell>
  );
}

export default CommodityDashboard;
