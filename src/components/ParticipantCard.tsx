import { CheckCircle2, Clock3 } from "lucide-react";
import type { ParticipantGroupScore, ParticipantTotal } from "../types/quiniela";

export function ParticipantCard({ total, scores, index }: { total: ParticipantTotal; scores: ParticipantGroupScore[]; leaderPoints?: number; index: number }) {
  const details = scores.flatMap((score) => score.details);
  const qualified = details.filter((detail) => detail.qualified);
  const pending = details.length - qualified.length;
  return <article className={`glass-card p-5 ${index === 0 ? "border-winner/20" : ""}`}>
    <div className="flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.15em] text-slate-500">#{index + 1} · {details.length} selecciones</p><h3 className="mt-1 font-display text-xl font-bold">{total.participant}</h3></div><div className="text-right"><p className="font-display text-3xl font-extrabold text-pitch">{total.points}</p><p className="text-[9px] uppercase text-slate-500">puntos</p></div></div>
    <div className="mt-5 flex items-center gap-4 text-xs"><span className="flex items-center gap-1.5 text-pitch"><CheckCircle2 size={13}/>{qualified.length} suman</span><span className="flex items-center gap-1.5 text-slate-500"><Clock3 size={13}/>{pending} pendientes</span></div>
    <div className="mt-4 flex flex-wrap gap-1.5">{qualified.map((detail) => <span key={`${detail.predictedTeam}-${detail.predictedPosition}`} className="rounded-md border border-pitch/15 bg-pitch/[.07] px-2 py-1 text-[10px] font-semibold text-pitch">✓ {detail.predictedTeam}</span>)}{!qualified.length && <span className="text-xs text-slate-500">Aún no hay selecciones sumando.</span>}</div>
  </article>;
}
