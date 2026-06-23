import { Check, Clock3 } from "lucide-react";
import type { StandingRow } from "../types/quiniela";
import { TeamBadge } from "./TeamBadge";

export function GroupStandings({ rows }: { rows: StandingRow[] }) {
  if (!rows.length) return <p className="py-8 text-center text-sm text-slate-500">Sin standings disponibles</p>;
  return <div>
    <div className="grid grid-cols-[28px_1fr_28px_28px_28px_32px] gap-2 border-b border-white/5 pb-2 text-center text-[9px] font-bold uppercase text-slate-600"><span>#</span><span className="text-left">Equipo</span><span>PJ</span><span>DG</span><span>PTS</span><span>Q</span></div>
    <div className="divide-y divide-white/5">{rows.map((row) => <div key={row.teamKey} className="grid grid-cols-[28px_1fr_28px_28px_28px_32px] items-center gap-2 py-2.5 text-center text-xs"><span className="font-display font-bold text-slate-500">{row.position}</span><span className="flex min-w-0 items-center gap-2 text-left font-medium"><TeamBadge name={row.teamName} size="sm"/><span className="truncate">{row.teamName}</span></span><span className="text-slate-500">{row.played ?? "—"}</span><span className={row.goalDifference >= 0 ? "text-slate-300" : "text-red-300"}>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</span><b>{row.points}</b><span className={`mx-auto grid h-5 w-5 place-items-center rounded-full ${row.qualified ? "bg-pitch/15 text-pitch" : row.qualificationType === "pending" ? "bg-winner/10 text-winner" : "text-slate-700"}`}>{row.qualified ? <Check size={11}/> : row.qualificationType === "pending" ? <Clock3 size={10}/> : "—"}</span></div>)}</div>
  </div>;
}
