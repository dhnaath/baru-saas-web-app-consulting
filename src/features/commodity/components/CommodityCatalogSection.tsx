import React from 'react';
import { 
  TrendingUp, TrendingDown, ShieldAlert, CalendarClock, 
  Building2, Search, ArrowUpDown, X, ExternalLink, ArrowUpRight, ArrowRight, Package 
} from 'lucide-react';
import { Panel, Pill, Kosong } from '@/app/ui-bits';
import { cn } from '@/lib/utils';
import { 
  CommodityItem, 
  UpdateCadence, 
  PricingType, 
  COMMODITY_DATA 
} from '@/commodityData';
import { CATEGORY_META, CATEGORY_GRADIENTS } from '../data/commodityLinks';

export interface CommodityCatalogSectionProps {
  activeNavigatorTab: string;
  filteredData: CommodityItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCadence: UpdateCadence | 'Semua';
  onSelectCadence: (c: UpdateCadence | 'Semua') => void;
  selectedSource: string;
  onSelectSource: (s: string) => void;
  selectedPricingType: PricingType | 'Semua';
  onSelectPricingType: (p: PricingType | 'Semua') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: 'table' | 'cards';
  sortBy: 'id' | 'nama' | 'harga' | 'cadence';
  sortDirection: 'asc' | 'desc';
  onResetSort: () => void;
  onResetAllFilters: () => void;
  onSelectItem: (item: CommodityItem) => void;
  groupedCategories: { category: string; items: CommodityItem[] }[];
}

export function CommodityCatalogSection({
  activeNavigatorTab,
  filteredData,
  selectedCategory,
  onSelectCategory,
  selectedCadence,
  onSelectCadence,
  selectedSource,
  onSelectSource,
  selectedPricingType,
  onSelectPricingType,
  searchQuery,
  onSearchChange,
  viewMode,
  sortBy,
  sortDirection,
  onResetSort,
  onResetAllFilters,
  onSelectItem,
  groupedCategories,
}: CommodityCatalogSectionProps) {
  const isVisible =
    activeNavigatorTab !== 'national_indices' &&
    activeNavigatorTab !== 'indeks_harga_makro' &&
    activeNavigatorTab !== 'logam_mulia' &&
    activeNavigatorTab !== 'indeks_global' &&
    activeNavigatorTab !== 'saham_syariah' &&
    activeNavigatorTab !== 'spot_realtime';

  if (!isVisible) return null;

  const formatPrice = (harga: number, currency: 'IDR' | 'USD', satuan: string) => {
    if (currency === 'USD') {
      return (
        <span className="tabular-nums">
          <span className="font-semibold text-foreground">${harga.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className="text-muted-foreground text-xs ml-1 font-normal">/ {satuan}</span>
        </span>
      );
    }
    return (
      <span className="tabular-nums">
        <span className="font-semibold text-foreground">Rp {harga.toLocaleString('id-ID')}</span>
        <span className="text-muted-foreground text-xs ml-1 font-normal">/ {satuan}</span>
      </span>
    );
  };

  const renderCommodityCard = (item: CommodityItem) => {
    const tagColor = 
      item.jenisBatas === 'Subsidi' ? 'prospek' : 
      item.jenisBatas === 'HET Pemerintah' ? 'berjalan' : 
      item.jenisBatas === 'Spot Global' ? 'aktif' : 'todo';

    const meta = CATEGORY_META[item.kategori] || {
      icon: Package,
      color: 'text-primary',
      bgLight: 'bg-primary/10',
      desc: 'Kelompok komoditas'
    };
    const ItemIcon = meta.icon;
    const gradientClass = CATEGORY_GRADIENTS[item.kategori] || 'from-indigo-500 to-indigo-700';

    return (
      <div 
        key={item.id}
        onClick={() => onSelectItem(item)}
        className="w-full h-full rounded-2xl border border-border bg-card p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between gap-3 group relative cursor-pointer min-w-0"
      >
        <div className="flex flex-col flex-1">
          {/* Header Kartu: Icon Bulat Bergradien + Judul & Status Pill */}
          <div className="flex items-start justify-between gap-3 shrink-0 mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={cn(
                  "size-11 rounded-full flex items-center justify-center text-white shadow-xs shrink-0 transition-transform group-hover:scale-105",
                  `bg-linear-to-br ${gradientClass}`
                )}
              >
                <ItemIcon className="size-5 opacity-95 drop-shadow-xs" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                  {item.nama}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
                  <span className="font-mono font-semibold px-1.5 py-0.2 rounded bg-muted/80 text-muted-foreground text-[10px]">
                    #{item.id.toString().padStart(3, '0')}
                  </span>
                  <span>•</span>
                  <span className="truncate">{item.kategori}</span>
                </div>
              </div>
            </div>

            <Pill value={tagColor} label={item.jenisBatas} />
          </div>

          {/* Kotak Harga Terkini */}
          <div className="bg-muted/40 dark:bg-muted/20 p-3 rounded-xl border border-border/50 mb-3 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                Harga Acuan Terkini
              </div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {formatPrice(item.hargaTerbaru, item.mataUang, item.satuan)}
              </div>
            </div>
            {item.perubahan24h !== 0 && (
              <div
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 shrink-0",
                  item.perubahan24h > 0
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                )}
              >
                {item.perubahan24h > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{Math.abs(item.perubahan24h)}%</span>
              </div>
            )}
          </div>

          {/* Deskripsi Spesifikasi Singkat */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {item.deskripsiSpesifikasi}
          </p>

          {/* Grid Mini Pills */}
          <div className="grid grid-cols-2 gap-1.5 w-full mt-auto pt-1">
            <div
              className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all border border-border/40 hover:border-primary/30 truncate"
              title={`Sumber Resmi: ${item.sumberData}`}
            >
              <Building2 size={12} className="text-primary shrink-0" />
              <span className="truncate">{item.sumberData.split('/')[0].split('&')[0].trim()}</span>
            </div>
            <div
              className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all border border-border/40 hover:border-primary/30 truncate"
              title={`Ritme Pembaruan: ${item.updateCadence}`}
            >
              <CalendarClock size={12} className="text-primary shrink-0" />
              <span className="truncate">{item.updateCadence}</span>
            </div>
            <div
              className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all border border-border/40 hover:border-primary/30 truncate"
              title={`Status Regulasi: ${item.statusRegulasi}`}
            >
              <ShieldAlert size={12} className="text-amber-500 shrink-0" />
              <span className="truncate">{item.statusRegulasi.split('(')[0].trim()}</span>
            </div>
            <div
              className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all border border-border/40 hover:border-primary/30 truncate"
              title={`Satuan Ukur: ${item.satuan}`}
            >
              <Package size={12} className="text-primary shrink-0" />
              <span className="truncate">Per {item.satuan}</span>
            </div>
          </div>
        </div>

        {/* Footer Aksi / Navigasi Cepat */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs mt-2">
          <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[120px]">
            {item.tanggalUpdate || 'Update Terkini'}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {item.linkSumber && (
              <a
                href={item.linkSumber}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-[11px] font-semibold transition-colors"
                title={`Direct Link Sumber Resmi: ${item.sumberData}`}
              >
                <span>Direct Link</span>
                <ExternalLink size={10} />
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(item);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground text-[11px] font-semibold transition-all cursor-pointer"
            >
              <span>Rincian</span>
              <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {activeNavigatorTab === 'both' && (
        <div className="flex items-center gap-2 pt-4 border-t border-border/60">
          <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="size-4" />
          </span>
          <h3 className="text-base font-bold text-foreground">
            Bagian 3: Katalog 100 Komoditas Unggulan Nasional
          </h3>
        </div>
      )}

      {/* Status Strip & Indikator Filter Aktif Komoditas */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            Menampilkan <strong className="text-foreground font-bold">{filteredData.length}</strong> dari {COMMODITY_DATA.length} komoditas acuan nasional
          </span>

          {/* Chips Filter Aktif */}
          {selectedPricingType !== 'Semua' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ShieldAlert size={11} />
              <span>Regulasi: {selectedPricingType}</span>
              <button 
                type="button" 
                onClick={() => onSelectPricingType('Semua')}
                className="hover:opacity-80 p-0.5 rounded-full cursor-pointer"
                title="Hapus filter regulasi"
              >
                <X size={10} />
              </button>
            </span>
          )}

          {selectedCadence !== 'Semua' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              <CalendarClock size={11} />
              <span>Ritme: {selectedCadence}</span>
              <button 
                type="button" 
                onClick={() => onSelectCadence('Semua')}
                className="hover:opacity-80 p-0.5 rounded-full cursor-pointer"
                title="Hapus filter ritme"
              >
                <X size={10} />
              </button>
            </span>
          )}

          {selectedSource !== 'Semua' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Building2 size={11} />
              <span>Sumber: {selectedSource}</span>
              <button 
                type="button" 
                onClick={() => onSelectSource('Semua')}
                className="hover:opacity-80 p-0.5 rounded-full cursor-pointer"
                title="Hapus filter sumber"
              >
                <X size={10} />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              <Search size={11} />
              <span>Cari: &ldquo;{searchQuery}&rdquo;</span>
              <button 
                type="button" 
                onClick={() => onSearchChange('')}
                className="hover:opacity-80 p-0.5 rounded-full cursor-pointer"
                title="Hapus filter pencarian"
              >
                <X size={10} />
              </button>
            </span>
          )}

          {sortBy !== 'id' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <ArrowUpDown size={11} />
              <span>Urut: {sortBy === 'nama' ? 'Nama' : sortBy === 'harga' ? 'Harga' : 'Ritme'} ({sortDirection.toUpperCase()})</span>
              <button 
                type="button" 
                onClick={onResetSort}
                className="hover:opacity-80 p-0.5 rounded-full cursor-pointer"
                title="Kembalikan urutan default"
              >
                <X size={10} />
              </button>
            </span>
          )}
        </div>

        {(searchQuery || selectedCadence !== 'Semua' || selectedPricingType !== 'Semua' || selectedSource !== 'Semua' || sortBy !== 'id') && (
          <button
            type="button"
            onClick={onResetAllFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span>Reset Semua Filter</span>
            <X size={12} />
          </button>
        )}
      </div>

      {/* Area Daftar Komoditas */}
      {filteredData.length === 0 ? (
        <Panel className="py-12">
          <Kosong pesan="Tidak ada komoditas yang sesuai filter pencarian." />
          <div className="flex justify-center mt-4">
            <button
              onClick={onResetAllFilters}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-semibold hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              Reset Seluruh Filter
            </button>
          </div>
        </Panel>
      ) : viewMode === 'table' ? (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground">
                  <th className="py-3 px-4 font-semibold w-14 text-center">ID</th>
                  <th className="py-3 px-4 font-semibold">Komoditas & Kategori</th>
                  <th className="py-3 px-4 font-semibold">Harga Terkini</th>
                  <th className="py-3 px-4 font-semibold">Regulasi & Batas</th>
                  <th className="py-3 px-4 font-semibold">Sumber Resmi</th>
                  <th className="py-3 px-4 font-semibold text-right">Rincian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {filteredData.map((item) => {
                  const tagColor = 
                    item.jenisBatas === 'Subsidi' ? 'prospek' : 
                    item.jenisBatas === 'HET Pemerintah' ? 'berjalan' : 
                    item.jenisBatas === 'Spot Global' ? 'aktif' : 'todo';
                    
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className="hover:bg-muted/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center font-mono text-xs text-muted-foreground">
                        #{item.id.toString().padStart(3, '0')}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.nama}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.kategori}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {formatPrice(item.hargaTerbaru, item.mataUang, item.satuan)}
                        {item.perubahan24h !== 0 && (
                          <div className={`text-xs mt-0.5 flex items-center gap-1 ${
                            item.perubahan24h > 0 ? 'text-rose-500' : 'text-emerald-500'
                          }`}>
                            {item.perubahan24h > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            <span>{Math.abs(item.perubahan24h)}%</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <Pill value={tagColor} label={item.jenisBatas} />
                        <div className="text-xs text-muted-foreground truncate max-w-[240px] mt-1" title={item.statusRegulasi}>
                          {item.statusRegulasi}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-foreground font-medium truncate max-w-[170px]">
                          {item.sumberData}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          Update: {item.updateCadence}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.linkSumber && (
                            <a
                              href={item.linkSumber}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2 py-1 text-xs font-semibold rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-colors inline-flex items-center gap-1"
                              title={`Direct Link Sumber Resmi: ${item.sumberData}`}
                            >
                              <span>Link</span>
                              <ExternalLink size={10} />
                            </a>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectItem(item);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            Lihat
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Bentuk Gaya Kotak-Kotak Masing-Masing Kategori */
        <div className="space-y-6">
          {groupedCategories.map(({ category, items }) => {
            const meta = CATEGORY_META[category] || {
              icon: Package,
              color: 'text-primary',
              bgLight: 'bg-primary/10',
              desc: 'Kelompok komoditas'
            };
            const IconComp = meta.icon;

            return (
              <div
                key={category}
                className="rounded-2xl border border-border bg-card py-4 sm:py-5 px-3 sm:px-4 md:px-4.5 shadow-2xs space-y-4"
              >
                {/* Header Kotak Kategori */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", meta.bgLight, meta.color)}>
                      <IconComp size={20} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-foreground">
                          {category}
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {items.length} Komoditas
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {meta.desc}
                      </p>
                    </div>
                  </div>

                  {selectedCategory === 'Semua' ? (
                    <button
                      type="button"
                      onClick={() => onSelectCategory(category)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-background hover:bg-muted border border-border text-foreground transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
                      title={`Fokus hanya pada kategori ${category}`}
                    >
                      <span>Fokus Kategori</span>
                      <ArrowUpRight size={13} className="text-muted-foreground" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectCategory('Semua')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <span>Lihat Semua Kategori</span>
                    </button>
                  )}
                </div>

                {/* Grid Kotak-Kotak Kartu Komoditas dalam Kategori */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                  {items.map((item) => renderCommodityCard(item))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
