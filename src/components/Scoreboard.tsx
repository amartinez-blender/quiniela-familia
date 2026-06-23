import { CheckCircle2, Crown } from "lucide-react";
import type { LeaderboardRow } from "../types/quiniela";

export function Scoreboard({ rows }: { rows: LeaderboardRow[] }) {
  return <section id="ranking" className="section-wrap scroll-mt-20">
    <div className="section-heading"><div><span className="section-kicker">Así van hoy</span><h2>Ranking familiar</h2></div><p>Un punto equivale a una selección en zona de clasificación.</p></div>
    <div className="glass-card overflow-hidden">
      <div className="hidden grid-cols-[70px_1fr_160px_100px] border-b border-white/5 px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-slate-500 sm:grid"><span>Lugar</span><span>Participante</span><span>Selecciones</span><span>Puntos</span></div>
      <div className="divide-y divide-white/5">{rows.map((row, index) => <div key={row.participant} className={`relative grid grid-cols-[44px_1fr_auto] items-center gap-3 px-4 py-4 sm:grid-cols-[70px_1fr_160px_100px] sm:px-6 ${index === 0 ? "leader-row" : ""}`}>
        <span className={`font-display text-lg font-bold ${row.rank === 1 ? "text-winner" : "text-slate-500"}`}>{row.tied ? "=" : "#"}{row.rank}</span>
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/5 font-display text-sm font-bold">{row.participant.slice(0, 2).toUpperCase()}</span><p className="flex items-center gap-2 font-semibold">{row.participant}{index === 0 && <Crown size={14} className="text-winner"/>}</p></div>
        <span className="hidden items-center gap-2 text-sm text-slate-400 sm:flex"><CheckCircle2 size={14} className="text-pitch"/>{row.qualifiedHits} clasificadas</span>
        <strong className="font-display text-2xl text-pitch">{row.points}<span className="ml-1 text-[9px] uppercase text-slate-500">pts</span></strong>
      </div>)}</div>
    </div>
  </section>;
}
