import { CheckCircle2, Database, RefreshCw, Trophy } from "lucide-react";
import type { DataSource } from "../types/api";

const sourceCopy: Record<DataSource, { label: string; color: string }> = {
  live: { label: "Resultados en vivo", color: "bg-pitch" },
  fallback: { label: "Último corte real guardado", color: "bg-winner" },
  error: { label: "Error de conexión", color: "bg-red-500" },
};

export function Hero({ source, updatedAt, refreshing, onRefresh, leader, points }: { source: DataSource; updatedAt: string; refreshing: boolean; onRefresh: () => void; leader?: string; points?: number }) {
  const status = sourceCopy[source];
  const formatted = new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit" }).format(new Date(updatedAt));
  return <section id="inicio" className="hero-field relative pt-28">
    <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-5 pb-14 lg:grid-cols-[1.2fr_.8fr] lg:px-10 lg:pb-20">
      <div className="max-w-3xl">
        <div className="mb-6 flex flex-wrap gap-3"><span className="eyebrow"><Trophy size={13}/> Mundial 2026</span><span className="eyebrow"><span className={`h-1.5 w-1.5 rounded-full ${status.color}`}/>{status.label}</span></div>
        <h1 className="font-display text-5xl font-extrabold tracking-[-.055em] text-white sm:text-7xl lg:text-[78px]">Quiniela <span className="text-pitch">Familia</span></h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Un punto por cada selección que esté hoy en zona de clasificación. Sin posiciones exactas, sin bonos, sin cuentas raras.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3"><a href="#ranking" className="primary-button">Ver puntos ↓</a><button onClick={onRefresh} disabled={refreshing} className="secondary-button"><RefreshCw size={15} className={refreshing ? "animate-spin" : ""}/>{refreshing ? "Actualizando…" : "Actualizar resultados"}</button></div>
        <div className="mt-5 flex items-center gap-2 text-xs text-slate-500"><Database size={13}/> Última actualización: {formatted}</div>
      </div>
      <div className="glass-card p-6 sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Marcador actual</p>
        <div className="mt-5 flex items-end justify-between border-b border-white/5 pb-5"><div><p className="text-sm text-slate-400">Líder</p><p className="mt-1 font-display text-3xl font-bold">{leader ?? "—"}</p></div><p className="font-display text-5xl font-extrabold text-winner">{points ?? 0}<span className="ml-1 text-xs text-slate-500">pts</span></p></div>
        <div className="mt-5 flex items-start gap-3"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pitch/10 text-pitch"><CheckCircle2 size={14}/></span><p className="text-sm leading-6 text-slate-400"><b className="text-white">Regla simple:</b> si un equipo elegido está entre los dos primeros o entre los ocho mejores terceros, suma 1.</p></div>
      </div>
    </div>
  </section>;
}
