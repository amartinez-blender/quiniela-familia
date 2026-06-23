import type { StandingRow } from "../types/quiniela";
import { GroupStandings } from "./GroupStandings";

export function GroupPredictionCard({ group, standings }: { group: string; standings: StandingRow[]; scores?: unknown }) {
  return <article className="glass-card overflow-hidden">
    <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white font-black text-ink">{group}</span><div><h3 className="font-display font-bold">Grupo {group}</h3><p className="text-[9px] uppercase tracking-[.13em] text-slate-500">Tabla real · en progreso</p></div></div>
    <div className="p-5"><GroupStandings rows={standings}/></div>
  </article>;
}
