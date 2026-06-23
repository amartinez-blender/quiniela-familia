import { CalendarClock, CheckCircle2 } from "lucide-react";
import type { ApiGame } from "../types/api";
import { TeamBadge } from "./TeamBadge";

function MatchCard({ game }: { game: ApiGame }) {
  const date = new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(game.date));
  return <article className="glass-card min-w-[280px] flex-1 p-4"><div className="mb-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[.13em] text-slate-500"><span>{game.group ? `Grupo ${game.group}` : "Mundial 2026"}</span><span>{date}</span></div><div className="space-y-3"><div className="flex items-center gap-3"><TeamBadge name={game.homeTeam}/><span className="flex-1 text-sm font-semibold">{game.homeTeam}</span><b className="font-display text-lg">{game.homeScore ?? "—"}</b></div><div className="flex items-center gap-3"><TeamBadge name={game.awayTeam}/><span className="flex-1 text-sm font-semibold">{game.awayTeam}</span><b className="font-display text-lg">{game.awayScore ?? "—"}</b></div></div><div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3 text-[9px] font-bold uppercase tracking-[.12em] text-slate-500">{game.status === "finished" ? <CheckCircle2 size={11} className="text-pitch"/> : <CalendarClock size={11} className="text-electric"/>}{game.status === "finished" ? "Finalizado" : game.status === "live" ? "En vivo" : "Programado"}</div></article>;
}

export function MatchTicker({ games }: { games: ApiGame[] }) {
  const finished = games.filter((game) => game.status === "finished").sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3);
  const upcoming = games.filter((game) => game.status !== "finished").sort((a, b) => +new Date(a.date) - +new Date(b.date)).slice(0, 3);
  return <section id="partidos" className="section-wrap scroll-mt-20"><div className="section-heading"><div><span className="section-kicker">El balón no para</span><h2>Partidos</h2></div><p>Últimos resultados y lo que viene.</p></div><div className="grid gap-8 xl:grid-cols-2"><div><h3 className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-slate-500">Últimos partidos</h3><div className="flex gap-3 overflow-x-auto pb-2">{finished.length ? finished.map((game) => <MatchCard key={game.id} game={game}/>) : <p className="empty-state">Sin partidos terminados</p>}</div></div><div><h3 className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-slate-500">Próximos partidos</h3><div className="flex gap-3 overflow-x-auto pb-2">{upcoming.length ? upcoming.map((game) => <MatchCard key={game.id} game={game}/>) : <p className="empty-state">Sin próximos partidos</p>}</div></div></div></section>;
}
