import React, { useState, useMemo, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  Coins, Search, ExternalLink, ArrowRight, 
  ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_COMMODITIES, INDICES_DATA, IndexKey } from '@/features/syariah/lib/data';
import { Commodity } from '@/features/syariah/types';
import { LOGAM_MULIA_DIRECT_LINKS, QUOTE_COMMODITY_DIRECT_LINKS } from '../data/commodityLinks';

export interface SpotQuotesSectionProps {
  activeNavigatorTab: string;
}

const TIME_RANGE_OPTIONS: { id: '1D' | '1W' | '1M' | '1Y'; label: string; desc: string }[] = [
  { id: '1D', label: '1H', desc: '1 Hari' },
  { id: '1W', label: '1M', desc: '1 Minggu' },
  { id: '1M', label: '1B', desc: '1 Bulan' },
  { id: '1Y', label: '1T', desc: '1 Tahun' },
];

export function SpotQuotesSection({ activeNavigatorTab }: SpotQuotesSectionProps) {
  const [quoteCommodities, setQuoteCommodities] = useState<Commodity[]>([]);
  const [quoteCurrency, setQuoteCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [weightUnit, setWeightUnit] = useState<'GRAM' | 'OZ'>('GRAM');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [exchangeRate] = useState<number>(15850);
  const [logamMuliaLinkCategory, setLogamMuliaLinkCategory] = useState<'all' | 'Portal Resmi' | 'Aplikasi Terkait'>('all');

  const filteredLogamMuliaLinks = useMemo(() => {
    if (logamMuliaLinkCategory === 'all') return LOGAM_MULIA_DIRECT_LINKS;
    return LOGAM_MULIA_DIRECT_LINKS.filter((item) => item.category === logamMuliaLinkCategory);
  }, [logamMuliaLinkCategory]);

  const [selectedStockIndex, setSelectedStockIndex] = useState<IndexKey>('JII');
  const [stockSearchQuery, setStockSearchQuery] = useState('');

  const currentStockIndexData = useMemo(() => {
    return INDICES_DATA[selectedStockIndex] || INDICES_DATA['JII'];
  }, [selectedStockIndex]);

  const filteredStockCompanies = useMemo(() => {
    const q = stockSearchQuery.toLowerCase().trim();
    if (!q) return currentStockIndexData.companies;
    return currentStockIndexData.companies.filter(
      (c) =>
        c.ticker.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q),
    );
  }, [currentStockIndexData, stockSearchQuery]);

  useEffect(() => {
    const fetchLiveQuotes = () => {
      setQuoteCommodities(
        MOCK_COMMODITIES.map((c) => {
          const noise = 1 + (Math.random() * 0.01 - 0.005);
          return {
            ...c,
            currentPrice: c.currentPrice * noise,
          };
        }),
      );
    };

    fetchLiveQuotes();
    const interval = setInterval(fetchLiveQuotes, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatQuoteCurrency = (val: number, isIndex: boolean = false, curr: 'IDR' | 'USD' = 'IDR') => {
    if (isIndex) {
      return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: curr === 'USD' ? 2 : 0,
      maximumFractionDigits: curr === 'USD' ? 2 : 0,
    }).format(val);
  };

  const getCommodityChange = (item: Commodity, range: '1D' | '1W' | '1M' | '1Y') => {
    if (range === '1D') {
      return {
        percent: item.changePercent24h,
        label: '1 Hari',
      };
    }
    if (range === '1W') {
      const history = item.history;
      if (history && history.length >= 8) {
        const pastPrice = history[history.length - 8].price;
        const pct = pastPrice ? ((item.currentPrice - pastPrice) / pastPrice) * 100 : item.changePercent24h * 2.8;
        return {
          percent: pct,
          label: '1 Minggu',
        };
      }
      return {
        percent: item.changePercent24h * 2.8,
        label: '1 Minggu',
      };
    }
    if (range === '1M') {
      const history = item.history;
      if (history && history.length > 0) {
        const pastPrice = history[0].price;
        const pct = pastPrice ? ((item.currentPrice - pastPrice) / pastPrice) * 100 : item.changePercent24h * 4.6;
        return {
          percent: pct,
          label: '1 Bulan',
        };
      }
      return {
        percent: item.changePercent24h * 4.6,
        label: '1 Bulan',
      };
    }
    // 1Y (1 Tahun)
    const history = item.history;
    if (history && history.length > 0) {
      const pastPrice = history[0].price * 0.85;
      const pct = pastPrice ? ((item.currentPrice - pastPrice) / pastPrice) * 100 : item.changePercent24h * 12.5;
      return {
        percent: pct,
        label: '1 Tahun',
      };
    }
    return {
      percent: item.changePercent24h * 12.5,
      label: '1 Tahun',
    };
  };

  const renderCommodityQuoteCard = (item: Commodity) => {
    const changeInfo = getCommodityChange(item, selectedTimeRange);
    const isUp = changeInfo.percent >= 0;
    const TROY_OUNCE_TO_GRAM = 31.1034768;

    let displayPrice = item.currentPrice;
    const displaySymbol = item.symbol;
    let displayWeightInfo = '';

    if (!item.isIndex) {
      if (quoteCurrency === 'IDR') {
        displayPrice = item.currentPrice * exchangeRate;
      }
      if (weightUnit === 'GRAM') {
        displayPrice = displayPrice / TROY_OUNCE_TO_GRAM;
        if (quoteCurrency === 'IDR') {
          displayWeightInfo = '• 1 g';
        }
      }
    }

    const links = QUOTE_COMMODITY_DIRECT_LINKS[item.id] || {
      externalUrl: 'https://www.tradingview.com/markets/commodities/prices/',
      externalLabel: 'Market Data',
      internalPath: '/100-komoditas',
      internalLabel: 'Komoditas',
    };

    return (
      <div
        key={item.id}
        className="bg-card p-4 sm:p-5 rounded-2xl shadow-2xs border border-border/70 flex flex-col justify-between min-h-[162px] transition-all hover:shadow-md hover:border-border group"
      >
        <div className="flex justify-between items-start w-full">
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">{item.name}</h4>
            <span className="text-xs text-muted-foreground font-medium mt-0.5 block truncate max-w-[150px]">
              {displaySymbol} {displayWeightInfo}
            </span>
          </div>
          <div
            className={cn(
              'p-1.5 rounded-lg shrink-0',
              isUp ? 'bg-primary/10 text-primary' : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
            )}
          >
            {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          </div>
        </div>

        <div className="my-2.5">
          <div className="text-base sm:text-lg font-bold text-foreground">
            {formatQuoteCurrency(displayPrice, item.isIndex, item.isIndex ? 'USD' : quoteCurrency)}
          </div>
          <div
            className={cn(
              'text-[11px] font-semibold flex items-center mt-0.5',
              isUp ? 'text-primary' : 'text-rose-600 dark:text-rose-400',
            )}
          >
            {isUp ? '+' : ''}
            {changeInfo.percent.toFixed(2)}%
            <span className="text-muted-foreground ml-1.5 font-medium">{changeInfo.label}</span>
          </div>
        </div>

        {/* Direct Link Action Footer */}
        <div className="pt-2.5 border-t border-border/60 flex items-center justify-between gap-2 mt-auto text-xs">
          {links.internalPath ? (
            <Link
              to={links.internalPath as any}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors truncate max-w-[120px]"
              title={`Buka Aplikasi Terkait: ${links.internalLabel}`}
            >
              <span>{links.internalLabel}</span>
              <ArrowRight size={10} />
            </Link>
          ) : (
            <span className="text-[10px] text-muted-foreground font-mono">Spot Acuan</span>
          )}

          <a
            href={links.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-[11px] font-semibold transition-colors shrink-0 ml-auto"
            title={`Direct Link Portal Resmi: ${links.externalLabel}`}
          >
            <span>{links.externalLabel}</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    );
  };

  const isVisible = 
    activeNavigatorTab === 'logam_mulia' ||
    activeNavigatorTab === 'indeks_global' ||
    activeNavigatorTab === 'saham_syariah' ||
    activeNavigatorTab === 'spot_realtime' ||
    activeNavigatorTab === 'both';

  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      {activeNavigatorTab === 'both' && (
        <div className="flex items-center gap-2 pt-4 border-t border-border/60">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Coins className="size-4" />
          </span>
          <h3 className="text-base font-bold text-foreground">
            Bagian 2: Kutipan Pasar Real-Time (Logam Mulia, Indeks Global & BEI Syariah)
          </h3>
        </div>
      )}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-500">
                <Coins className="size-4" />
              </span>
              <h3 className="text-lg font-bold text-foreground">
                {activeNavigatorTab === 'logam_mulia'
                  ? 'Kutipan Logam Mulia & Komoditas Fisik'
                  : activeNavigatorTab === 'indeks_global'
                  ? 'Pantauan Indeks Pasar Global'
                  : activeNavigatorTab === 'saham_syariah'
                  ? 'Daftar Saham Indeks Syariah (BEI / IDX)'
                  : 'Kutipan Harga Pasar Real-Time'}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeNavigatorTab === 'logam_mulia'
                ? 'Pantauan pergerakan spot Emas Antam, Spot Gold, Silver & Crude Oil internasional.'
                : activeNavigatorTab === 'indeks_global'
                ? 'Benchmark pasar modal global: S&P 500, Nasdaq, Dow Jones, FTSE 100 & Nikkei 225.'
                : activeNavigatorTab === 'saham_syariah'
                ? 'Konstituen saham syariah unggulan BEI dalam indeks JII, JII70, dan ISSI.'
                : 'Pantauan pergerakan spot Logam Mulia, Indeks Pasar Global, dan Saham Syariah BEI.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-muted/60 p-1 rounded-xl border border-border/60 shadow-2xs">
            {/* Rentang Waktu (1 Hari, 1 Minggu, 1 Bulan, 1 Tahun) */}
            <div className="flex items-center gap-1 p-1 bg-background rounded-lg shadow-2xs">
              {TIME_RANGE_OPTIONS.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setSelectedTimeRange(range.id)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer",
                    selectedTimeRange === range.id
                      ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  title={`Rentang Waktu: ${range.label} (${range.desc})`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-border hidden sm:block"></div>

            <div className="flex items-center gap-1 p-1 bg-background rounded-lg shadow-2xs">
              <button
                type="button"
                onClick={() => setQuoteCurrency("IDR")}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  quoteCurrency === "IDR"
                    ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                IDR
              </button>
              <button
                type="button"
                onClick={() => setQuoteCurrency("USD")}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  quoteCurrency === "USD"
                    ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                USD
              </button>
            </div>
            <div className="w-px h-5 bg-border"></div>
            <div className="flex items-center gap-1 p-1 bg-background rounded-lg shadow-2xs">
              <button
                type="button"
                onClick={() => setWeightUnit("GRAM")}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  weightUnit === "GRAM"
                    ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                GRAM
              </button>
              <button
                type="button"
                onClick={() => setWeightUnit("OZ")}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  weightUnit === "OZ"
                    ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                OZ
              </button>
            </div>
          </div>
        </div>

        {/* 1. KATEGORI: LOGAM MULIA */}
        {(activeNavigatorTab === 'logam_mulia' || activeNavigatorTab === 'spot_realtime' || activeNavigatorTab === 'both') && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <span>Logam Mulia & Cadangan Fisik</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-600 dark:text-amber-400 font-bold">
                  Physical Commodities & Precious Metals
                </span>
              </h3>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <Coins size={14} className="text-amber-500" />
                <span>Pusat Intelijen Terpadu & 12 Direct Link</span>
              </div>
            </div>

            {/* Kotak-Kotak Harga Spot Fisik (Dinar, Dirham, Emas Antam, Perak) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
              {quoteCommodities.filter((item) => !item.isIndex).map(renderCommodityQuoteCard)}
            </div>

            {/* SUITE DIRECT LINKS: PORTAL RESMI & APLIKASI TERKAIT LOGAM MULIA (12 ITEMS) */}
            <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <ExternalLink size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      Pusat Direct Link: Portal Resmi & Aplikasi Terkait Logam Mulia
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Seluruh tautan langsung portal cetak fisik Antam, Pegadaian, bursa berjangka LBMA/ICDX, dan modul aplikasi syariah internal terpadu di satu tempat.
                    </p>
                  </div>
                </div>

                {/* Filter Kategori Direct Link */}
                <div className="flex items-center gap-1.5 p-1 bg-background/80 rounded-xl border border-border/60 shrink-0">
                  <button
                    type="button"
                    onClick={() => setLogamMuliaLinkCategory('all')}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                      logamMuliaLinkCategory === 'all'
                        ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Semua ({LOGAM_MULIA_DIRECT_LINKS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogamMuliaLinkCategory('Portal Resmi')}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                      logamMuliaLinkCategory === 'Portal Resmi'
                        ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Portal Resmi (7)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogamMuliaLinkCategory('Aplikasi Terkait')}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                      logamMuliaLinkCategory === 'Aplikasi Terkait'
                        ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Aplikasi Terkait (5)
                  </button>
                </div>
              </div>

              {/* Grid 12 Direct Link Cards (MBA Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredLogamMuliaLinks.map((item) => {
                  const IconComp = item.icon;
                  const isExt = item.isExternal;

                  const CardContent = (
                    <div className="p-3.5 rounded-xl border border-border/80 bg-card hover:bg-card/90 hover:border-amber-500/50 hover:shadow-sm transition-all flex flex-col justify-between h-full group">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className={cn("size-7 rounded-lg flex items-center justify-center shrink-0", item.bgLight, item.color)}>
                            <IconComp size={15} />
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full",
                            isExt ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          )}>
                            {item.badge}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                        <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[140px]">
                          {isExt ? new URL(item.url).hostname : item.url}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:underline">
                          <span>Buka</span>
                          {isExt ? <ExternalLink size={11} /> : <ArrowRight size={11} />}
                        </span>
                      </div>
                    </div>
                  );

                  return isExt ? (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    <Link
                      key={item.id}
                      to={item.url as any}
                      className="block cursor-pointer"
                    >
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. KATEGORI: INDEKS GLOBAL */}
        {(activeNavigatorTab === 'indeks_global' || activeNavigatorTab === 'spot_realtime' || activeNavigatorTab === 'both') && (
          <div className={activeNavigatorTab === 'indeks_global' ? '' : 'pt-4 border-t border-border/40'}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span>Indeks Global</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                  Market Indices & Benchmarks
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {quoteCommodities.filter((item) => item.isIndex).map(renderCommodityQuoteCard)}
            </div>
          </div>
        )}

        {/* 3. KATEGORI: DAFTAR SAHAM INDEKS SYARIAH (JII / JII70 / ISSI) */}
        {(activeNavigatorTab === 'saham_syariah' || activeNavigatorTab === 'spot_realtime' || activeNavigatorTab === 'both') && (
          <div className={activeNavigatorTab === 'saham_syariah' ? 'space-y-3' : 'pt-5 border-t border-border/40 space-y-3'}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span>Saham Indeks Syariah (BEI / IDX)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  Konstituen Saham Syariah Terpilih
                </span>
              </h3>

              {/* Category tabs: JII, JII70, ISSI */}
              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/60">
                {(Object.keys(INDICES_DATA) as IndexKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedStockIndex(key)}
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                      selectedStockIndex === key
                        ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{currentStockIndexData.description}</p>

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={`Cari kode, nama emiten, atau sektor ${selectedStockIndex}...`}
                  value={stockSearchQuery}
                  onChange={(e) => setStockSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <span className="text-[11px] text-muted-foreground">
                Menampilkan <strong>{filteredStockCompanies.length}</strong> konstituen {selectedStockIndex}
              </span>
            </div>

            <div className="overflow-x-auto max-h-[300px] border border-border/60 rounded-xl bg-background/50">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-muted/90 backdrop-blur-xs z-10 border-b border-border/60">
                  <tr>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Kode</th>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Nama Perusahaan</th>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Sektor</th>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground text-right">Direct Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredStockCompanies.length > 0 ? (
                    filteredStockCompanies.map((c) => (
                      <tr key={c.ticker} className="hover:bg-muted/40 transition-colors">
                        <td className="py-2 px-3.5 font-mono font-bold text-primary">{c.ticker}</td>
                        <td className="py-2 px-3.5 font-medium text-foreground">{c.name}</td>
                        <td className="py-2 px-3.5 text-muted-foreground">
                          <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-foreground/80">
                            {c.sector}
                          </span>
                        </td>
                        <td className="py-2 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://www.google.com/finance/quote/${c.ticker}:IDX`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-[10px] font-semibold transition-colors shrink-0"
                              title={`Buka Google Finance ${c.ticker}`}
                            >
                              <span>Finance</span>
                              <ExternalLink size={9} />
                            </a>
                            <a
                              href={`https://www.idx.co.id/id/perusahaan-tercatat/profil-perusahaan-tercatat/?kodeEmiten=${c.ticker}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-[10px] font-semibold transition-colors shrink-0"
                              title={`Buka Profil Emiten BEI ${c.ticker}`}
                            >
                              <span>IDX</span>
                              <ExternalLink size={9} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-muted-foreground">
                        Tidak ada saham ditemukan untuk pencarian "{stockSearchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-muted-foreground italic text-right">
              {selectedStockIndex === "JII"
                ? "* Daftar 30 konstituen JII adalah data evaluasi berkala BEI"
                : "* Menampilkan emiten syariah unggulan konstituen BEI"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
