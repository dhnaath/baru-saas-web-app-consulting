import React, { useState, useMemo } from 'react';
import { 
  Scale, LayoutGrid, Table as TableIcon, Download, 
  TrendingUp, Search, X, Building2, ExternalLink 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  MACRO_PRICE_INDICES_DATA, 
  MacroPriceIndexItem 
} from '@/data/priceIndicesData';
import { MACRO_INDEX_DIRECT_LINKS } from '../data/commodityLinks';

export interface MacroPriceIndicesSectionProps {
  showSectionHeader?: boolean;
  onSelectMacroItem: (item: MacroPriceIndexItem) => void;
  handleExportCSV: () => void;
}

export function MacroPriceIndicesSection({
  showSectionHeader = false,
  onSelectMacroItem,
  handleExportCSV,
}: MacroPriceIndicesSectionProps) {
  const [macroCategory, setMacroCategory] = useState<string>('Semua');
  const [macroSearchQuery, setMacroSearchQuery] = useState('');
  const [macroViewMode, setMacroViewMode] = useState<'grid' | 'table'>('grid');

  const filteredMacroIndices = useMemo(() => {
    const q = macroSearchQuery.toLowerCase().trim();
    return MACRO_PRICE_INDICES_DATA.filter((item) => {
      if (macroCategory !== 'Semua' && item.category !== macroCategory) return false;
      if (q) {
        const matchName = item.name.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchDesc = item.deskripsi.toLowerCase().includes(q);
        const matchSource = item.sumberResmi.toLowerCase().includes(q);
        const matchSub = item.subkomponen.some(s => s.name.toLowerCase().includes(q));
        return matchName || matchCode || matchDesc || matchSource || matchSub;
      }
      return true;
    });
  }, [macroCategory, macroSearchQuery]);

  return (
    <div className="space-y-5">
      {showSectionHeader && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/60">
          <span className="p-1.5 rounded-lg bg-violet-500/10 text-violet-500">
            <Scale className="size-4" />
          </span>
          <h3 className="text-base font-bold text-foreground">
            Bagian: 8 Indeks Harga Makroekonomi & Sektoral Resmi (BPS & BI)
          </h3>
        </div>
      )}

      {/* Banner Intelijen Indeks Harga Makro */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-violet-500/10 text-violet-500">
                <Scale className="size-5" />
              </span>
              <h3 className="text-lg font-bold text-foreground">
                Indeks Harga Makroekonomi & Sektoral Resmi (BPS & Bank Indonesia)
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              Pantauan 8 tolok ukur resmi perubahan tingkat harga nasional: inflasi konsumen (IHK), harga produsen & grosir (IHPB/IHP), nilai tukar riil petani & nelayan (NTP/NTN), indeks properti residensial (IHPR - BI), indeks biaya konstruksi (IBK), dan komoditas ekspor.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setMacroViewMode('grid')}
                className={cn(
                  "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  macroViewMode === 'grid'
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Tampilan Grid Kartu"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setMacroViewMode('table')}
                className={cn(
                  "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  macroViewMode === 'table'
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Tampilan Tabel Rinci"
              >
                <TableIcon size={15} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 transition-colors cursor-pointer"
            >
              <Download size={13} />
              <span>CSV 8 Indeks</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Ringkasan Indeks Harga Makro */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>IHK Inflasi Nasional</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-500 font-bold">BPS</span>
              </div>
              <div className="text-2xl font-bold text-foreground">106.85</div>
              <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} />
                <span>+2.58% YoY</span>
                <span className="text-muted-foreground font-normal">(+0.28% MoM)</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground border-t border-border/40 pt-1.5">
              Dalam koridor sasaran BI 2.5% ± 1%
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>IHPB Perdagangan Besar</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">WPI</span>
              </div>
              <div className="text-2xl font-bold text-foreground">117.40</div>
              <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} />
                <span>+3.12% YoY</span>
                <span className="text-muted-foreground font-normal">(Grosir Stabil)</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground border-t border-border/40 pt-1.5">
              Pertanian & industri manufaktur lancar
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>NTP Nilai Tukar Petani</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">Riil</span>
              </div>
              <div className="text-2xl font-bold text-foreground">121.50</div>
              <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} />
                <span>+3.85% YoY</span>
                <span className="text-muted-foreground font-normal">(Surplus &gt;100)</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground border-t border-border/40 pt-1.5">
              Daya beli komoditas tani di atas biaya hidup
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>IHPR Properti Residensial</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">BI</span>
              </div>
              <div className="text-2xl font-bold text-foreground">221.80</div>
              <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} />
                <span>+1.89% YoY</span>
                <span className="text-muted-foreground font-normal">(Survei SHPR)</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground border-t border-border/40 pt-1.5">
              Tipe kecil dan menengah tumbuh konsisten
            </div>
          </div>
        </div>

        {/* Filter Kategori & Pencarian */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {[
              'Semua',
              'Inflasi & Konsumen',
              'Produsen & Grosir',
              'Daya Beli Riil',
              'Properti & Aset',
              'Konstruksi & Ekspor'
            ].map((cat) => {
              const count = cat === 'Semua' 
                ? MACRO_PRICE_INDICES_DATA.length 
                : MACRO_PRICE_INDICES_DATA.filter(i => i.category === cat).length;
              const isActive = macroCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setMacroCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-background text-muted-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari indeks (IHK, NTP, IBK, BI...)"
              value={macroSearchQuery}
              onChange={(e) => setMacroSearchQuery(e.target.value)}
              className="w-full pl-9 pr-7 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {macroSearchQuery && (
              <button
                type="button"
                onClick={() => setMacroSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Konten: Grid vs Table */}
        {macroViewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {filteredMacroIndices.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectMacroItem(item)}
                className="p-4 rounded-2xl border border-border/80 bg-card hover:border-violet-500/60 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between group h-full relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-muted-foreground px-2 py-0.5 rounded-md bg-muted">
                        #{item.number.toString().padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md bg-violet-500/10">
                        {item.code}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground truncate max-w-[120px]">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-foreground group-hover:text-violet-500 transition-colors line-clamp-2 leading-snug mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {item.deskripsi}
                  </p>

                  <div className="bg-muted/30 p-2.5 rounded-xl border border-border/70 mb-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">Skor Terkini</span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                        <TrendingUp size={11} />
                        {item.perubahanYoY}
                      </span>
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {item.formatNilai}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono truncate">
                      Basis: {item.satuan}
                    </div>
                  </div>

                  {/* Preview 2 Subkomponen */}
                  <div className="space-y-1.5 mb-3 bg-background/50 p-2 rounded-xl border border-border/50 text-[11px]">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Subkomponen Utama:</div>
                    {item.subkomponen.slice(0, 2).map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-muted-foreground gap-2">
                        <span className="truncate">{sub.name}</span>
                        <span className="font-semibold text-foreground shrink-0">{sub.changeYoY}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-border/70 flex items-center justify-between text-xs mt-auto">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] truncate mr-2">
                    <Building2 size={13} className="shrink-0 text-violet-500" />
                    <span className="truncate">{item.sumberResmi.split('(')[0].split('&')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {MACRO_INDEX_DIRECT_LINKS[item.id] && (
                      <a
                        href={MACRO_INDEX_DIRECT_LINKS[item.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted hover:bg-violet-600 hover:text-white text-foreground text-[11px] font-semibold transition-colors"
                        title={`Direct Link Portal Resmi: ${item.sumberResmi}`}
                      >
                        <span>Portal</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors shrink-0">
                      Rincian
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto border border-border/70 rounded-xl bg-background/50">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-muted/80 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-3">Kode / No</th>
                  <th className="py-2.5 px-3">Nama Indeks Harga</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3">Skor & Perubahan</th>
                  <th className="py-2.5 px-3">Status Evaluasi</th>
                  <th className="py-2.5 px-3">Sumber Resmi</th>
                  <th className="py-2.5 px-3 text-right">Aksi & Direct Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredMacroIndices.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => onSelectMacroItem(item)}
                    className="hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-violet-600 dark:text-violet-400 whitespace-nowrap">
                      #{item.number.toString().padStart(2, '0')} · {item.code}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground">{item.frekuensiRilis} · {item.jadwalRilis}</div>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="font-bold text-foreground">{item.formatNilai}</div>
                      <div className="text-[10px] text-emerald-500 font-semibold">{item.perubahanYoY}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-muted-foreground max-w-[200px]">
                      {item.statusKategori}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-muted-foreground max-w-[160px] truncate">
                      {item.sumberResmi}
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {MACRO_INDEX_DIRECT_LINKS[item.id] && (
                          <a
                            href={MACRO_INDEX_DIRECT_LINKS[item.id]}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-muted hover:bg-violet-600 hover:text-white text-foreground transition-colors inline-flex items-center gap-1"
                            title={`Direct Link Portal Resmi: ${item.sumberResmi}`}
                          >
                            <span>Portal</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectMacroItem(item);
                          }}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-600 hover:text-white transition-colors cursor-pointer"
                        >
                          Rincian
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
