import React from "react";
import { Link, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw, Home, Compass, Layers, CheckSquare, Heart } from "lucide-react";

export function RouteErrorBoundary({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Terjadi kesalahan tidak terduga.";

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-card border border-destructive/20 rounded-2xl p-6 sm:p-8 shadow-lg text-center space-y-6">
        <div className="size-14 mx-auto rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertTriangle className="size-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Terjadi Kesalahan pada Halaman
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sistem mendeteksi kendala saat memuat modul ini. Data lokal Anda tetap aman.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-muted/50 border border-border text-left font-mono text-xs text-muted-foreground break-all max-h-36 overflow-y-auto">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              if (reset) {
                reset();
              } else {
                router.invalidate();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            <RefreshCw className="size-4" />
            <span>Muat Ulang Halaman</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-accent text-foreground font-medium text-sm transition-colors cursor-pointer"
          >
            <Home className="size-4" />
            <span>Ke Beranda Launcher</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RouteNotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-6">
        <div className="size-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <Compass className="size-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-muted text-muted-foreground uppercase tracking-wider">
            404 • Halaman Tidak Ditemukan
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Navigasi Belum Terdaftar
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Rute atau modul yang Anda tuju tidak tersedia atau telah dipindahkan ke navigasi terpadu.
          </p>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Rekomendasi Area Kerja
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            <Link
              to="/"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-border hover:bg-accent transition-colors group"
            >
              <div className="size-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Home className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Launcher Utama</div>
                <div className="text-xs text-muted-foreground">Beranda & Pinned Tools</div>
              </div>
            </Link>

            <Link
              to="/task-manager"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-border hover:bg-accent transition-colors group"
            >
              <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CheckSquare className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Task Manager</div>
                <div className="text-xs text-muted-foreground">Workspace Tugas & Proyek</div>
              </div>
            </Link>

            <Link
              to="/mini-mba"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-border hover:bg-accent transition-colors group"
            >
              <div className="size-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">100 MBA Tools</div>
                <div className="text-xs text-muted-foreground">Framework Konsultasi</div>
              </div>
            </Link>

            <Link
              to="/personal-life"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-border hover:bg-accent transition-colors group"
            >
              <div className="size-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Heart className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Personal Life</div>
                <div className="text-xs text-muted-foreground">Kesehatan & Habit Tracker</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            <Home className="size-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
