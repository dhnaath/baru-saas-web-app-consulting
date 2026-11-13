import React from 'react';
import { 
  X, ShieldAlert, ExternalLink, Copy, TrendingUp, Sparkles, Layers, Scale, Database 
} from 'lucide-react';
import { Pill } from '@/app/ui-bits';
import { CommodityItem, COMMODITY_DATA } from '@/commodityData';
import { MacroPriceIndexItem } from '@/data/priceIndicesData';

export interface CommodityDetailModalProps {
  item: CommodityItem | null;
  onClose: () => void;
  onCopyNotify: (msg: string) => void;
}

export function CommodityDetailModal({ item, onClose, onCopyNotify }: CommodityDetailModalProps) {
  if (!item) return null;

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

  const tagColor = 
    item.jenisBatas === 'Subsidi' ? 'prospek' : 
    item.jenisBatas === 'HET Pemerintah' ? 'berjalan' : 
    item.jenisBatas === 'Spot Global' ? 'aktif' : 'todo';

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-border animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border p-5 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
                #{item.id.toString().padStart(3, '0')}
              </span>
              <Pill value={tagColor} label={item.jenisBatas} />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {item.nama}
            </h2>
            <p className="text-muted-foreground text-xs mt-0.5">{item.kategori}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Nilai Acuan</div>
              <div className="text-xl font-bold text-foreground">
                {formatPrice(item.hargaTerbaru, item.mataUang, item.satuan)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Pembaruan</div>
              <div className="text-xs font-semibold text-foreground">{item.tanggalUpdate}</div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Spesifikasi Komoditas</h4>
              <p className="text-muted-foreground leading-relaxed">
                {item.deskripsiSpesifikasi}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-1">Regulasi & Ketetapan</h4>
              <div className="flex items-start gap-2 text-foreground p-2.5 rounded-lg bg-muted/40 border border-border">
                <ShieldAlert size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{item.statusRegulasi}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-muted/30 border border-border/60">
                <span className="text-muted-foreground block text-[11px] mb-0.5">Sumber Data</span>
                <span className="font-semibold text-foreground">{item.sumberData}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/30 border border-border/60">
                <span className="text-muted-foreground block text-[11px] mb-0.5">Frekuensi Update</span>
                <span className="font-semibold text-foreground">{item.updateCadence}</span>
              </div>
            </div>

            {item.linkSumber && (
              <div className="pt-1">
                <a
                  href={item.linkSumber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <ExternalLink size={14} />
                    Kunjungi Portal Resmi Sumber
                  </span>
                  <span>&rarr;</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-end gap-2">
          <button
            onClick={() => {
              const text = `${item.nama}: ${item.mataUang === 'USD' ? '$' : 'Rp '}${item.hargaTerbaru.toLocaleString()} / ${item.satuan} (${item.sumberData})`;
              navigator.clipboard.writeText(text);
              onCopyNotify("Ringkasan komoditas disalin ke clipboard!");
            }}
            className="px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Copy size={14} />
            Salin Data
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer shadow-2xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export interface MacroIndexDetailModalProps {
  item: MacroPriceIndexItem | null;
  onClose: () => void;
  onCopyNotify: (msg: string) => void;
}

export function MacroIndexDetailModal({ item, onClose, onCopyNotify }: MacroIndexDetailModalProps) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                #{item.number.toString().padStart(2, '0')}
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400">
                {item.code}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tolok ukur resmi dirilis oleh {item.sumberResmi} ({item.frekuensiRilis})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Highlight Skor Terkini */}
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-medium text-muted-foreground mb-0.5">Nilai Terkini & Tolok Ukur</div>
              <div className="text-xl font-bold text-foreground">
                {item.formatNilai}
              </div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                Basis: {item.satuan}
              </div>
            </div>
            <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
              <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                <TrendingUp size={13} />
                <span>{item.perubahanYoY}</span>
              </div>
              {item.perubahanMoM && (
                <div className="text-[11px] text-muted-foreground font-medium">
                  {item.perubahanMoM}
                </div>
              )}
            </div>
          </div>

          {/* Status & Evaluasi */}
          <div>
            <h4 className="font-bold text-foreground mb-1.5">Status & Kondisi Terkini</h4>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border">
              <Sparkles size={16} className="text-violet-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground leading-relaxed">
                {item.statusKategori}
              </span>
            </div>
          </div>

          {/* Deskripsi & Metodologi BPS / BI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/30 border border-border/70 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Layers size={13} className="text-violet-500" />
                <span>Cakupan & Definisi</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                {item.deskripsi}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/30 border border-border/70 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Scale size={13} className="text-violet-500" />
                <span>Metodologi Perhitungan</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                {item.metodologi}
              </p>
            </div>
          </div>

          {/* Tabel Subkomponen & Bobot */}
          <div>
            <h4 className="font-bold text-foreground mb-2 flex items-center justify-between">
              <span>Rincian Subkomponen & Bobot</span>
              <span className="text-[11px] font-normal text-muted-foreground">
                {item.subkomponen.length} Komponen Terdaftar
              </span>
            </h4>
            <div className="overflow-x-auto border border-border/70 rounded-xl bg-background/50">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead className="bg-muted/80 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2 px-3">Subkomponen</th>
                    <th className="py-2 px-3">Bobot</th>
                    <th className="py-2 px-3">Skor / Nilai</th>
                    <th className="py-2 px-3">Perubahan YoY</th>
                    <th className="py-2 px-3">Catatan Komoditas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {item.subkomponen.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-3 font-semibold text-foreground">{sub.name}</td>
                      <td className="py-2 px-3 font-mono text-muted-foreground">{sub.weight || '-'}</td>
                      <td className="py-2 px-3 font-bold text-foreground">{sub.score}</td>
                      <td className="py-2 px-3 font-semibold text-emerald-500">{sub.changeYoY}</td>
                      <td className="py-2 px-3 text-muted-foreground">{sub.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Riwayat Historis Periode */}
          <div>
            <h4 className="font-bold text-foreground mb-2">Riwayat Tren Periode Terakhir</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {item.historicalSeries.map((h, hIdx) => (
                <div key={hIdx} className="p-2 rounded-xl bg-muted/40 border border-border text-center">
                  <div className="text-[10px] text-muted-foreground font-mono">{h.period}</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rilis & Sumber */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/60">
              <span className="text-muted-foreground block text-[10px] mb-0.5">Sumber Data Resmi</span>
              <span className="font-semibold text-foreground text-[11px]">{item.sumberResmi}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/60">
              <span className="text-muted-foreground block text-[10px] mb-0.5">Jadwal Publikasi</span>
              <span className="font-semibold text-foreground text-[11px]">{item.jadwalRilis}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              const text = `${item.name} (${item.code}): ${item.formatNilai} | ${item.perubahanYoY} | Sumber: ${item.sumberResmi}`;
              navigator.clipboard.writeText(text);
              onCopyNotify("Ringkasan indeks makro disalin ke clipboard!");
            }}
            className="px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Copy size={14} />
            Salin Ringkasan
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer shadow-2xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export interface JsonSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyAllJson: () => void;
}

export function JsonSchemaModal({ isOpen, onClose, onCopyAllJson }: JsonSchemaModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-border flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border p-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Database size={16} className="text-primary" />
              Struktur Skema JSON (100 Komoditas)
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 bg-muted/30 text-foreground font-mono text-xs overflow-y-auto flex-1">
          <pre>{JSON.stringify(COMMODITY_DATA.slice(0, 4), null, 2)}</pre>
          <div className="text-muted-foreground text-center py-3 italic font-sans text-xs">
            ... 96 item lainnya siap diekspor dalam format JSON lengkap.
          </div>
        </div>

        <div className="p-4 border-t border-border bg-card flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            Total: 100 entitas komoditas
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopyAllJson}
              className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Copy size={14} />
              Salin Seluruh JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
