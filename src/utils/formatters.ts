/**
 * Utility functions for currency, dates, and localized formatting.
 * Shared across consulting modules, financial tools, and UI components.
 */

export const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

export const rupiahRingkas = (n: number) => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} jt`;
  return rupiah(n);
};

export const tanggal = (d: string | null) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export const tanggalPendek = (d: string | null) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      })
    : "—";

export const waktuRelatif = (d: string) => {
  const diff = Date.now() - new Date(d).getTime();
  const hari = Math.floor(diff / 86400000);
  if (hari <= 0) return "hari ini";
  if (hari === 1) return "kemarin";
  if (hari < 30) return `${hari} hari lalu`;
  return tanggal(d);
};

export const statusTugas: Record<string, string> = {
  todo: "Belum mulai",
  berjalan: "Dikerjakan",
  review: "Review",
  selesai: "Selesai",
};

export const statusProyek: Record<string, string> = {
  perencanaan: "Perencanaan",
  berjalan: "Berjalan",
  tertahan: "Tertahan",
  selesai: "Selesai",
};

export const sisaHari = (d: string | null) => {
  if (!d) return null;
  const target = new Date(d + "T23:59:59");
  return Math.ceil((target.getTime() - Date.now()) / 86400000);
};

export const jamMenit = (d: string) =>
  new Date(d).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const tanggalJam = (d: string) => `${tanggal(d)} · ${jamMenit(d)}`;

export const hariPendek = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", { weekday: "short" });
