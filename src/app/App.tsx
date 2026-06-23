import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Hero } from "../components/Hero";
import { Scoreboard } from "../components/Scoreboard";
import { ParticipantCard } from "../components/ParticipantCard";
import { GroupPredictionCard } from "../components/GroupPredictionCard";
import { MatchTicker } from "../components/MatchTicker";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { TeamBadge } from "../components/TeamBadge";
import { DataContext } from "./DataContext";
import { PREDICTIONS } from "../data/predictions";
import { MOCK_API } from "../data/mockApi";
import { getQualifiers } from "../logic/qualifiers";
import { calculateScores } from "../logic/scoring";
import { fetchWorldCupData } from "../services/worldCupApi";
import { GROUPS } from "../types/quiniela";
import type { WorldCupData } from "../types/api";

export default function App() {
  const [data, setData] = useState<WorldCupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fatalError, setFatalError] = useState(false);

  const load = useCallback(async (force = false) => {
    force ? setRefreshing(true) : setLoading(true);
    try { setData(await fetchWorldCupData(force)); setFatalError(false); }
    catch { setFatalError(true); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const resolved = useMemo(() => getQualifiers(data?.standings ?? MOCK_API.standings), [data]);
  const scores = useMemo(() => calculateScores({ predictions: PREDICTIONS, standings: resolved.standings }), [resolved.standings]);
  if (loading && !data) return <LoadingState />;
  if (fatalError || !data) return <ErrorState onRetry={() => void load(true)} />;
  const leader = scores.leaderboard[0];
  const qualifyingThirds = resolved.thirds.filter((row) => row.qualified);

  return <DataContext.Provider value={{ data, refreshing, refresh: () => void load(true) }}>
    <AppShell>
      <Hero source={data.source} updatedAt={data.updatedAt} refreshing={refreshing} onRefresh={() => void load(true)} leader={leader?.participant} points={leader?.points}/>
      {data.source === "fallback" && <div className="mx-auto -mt-5 max-w-[1500px] px-5 lg:px-10"><div className="flex items-center gap-2 rounded-xl border border-winner/15 bg-winner/[.06] px-4 py-3 text-xs text-winner"><Activity size={14}/><span><b>Sin conexión en vivo.</b> Mostramos el último corte real guardado.</span></div></div>}

      <Scoreboard rows={scores.leaderboard}/>

      <section id="participantes" className="section-wrap scroll-mt-20">
        <div className="section-heading"><div><span className="section-kicker">Qué está sumando</span><h2>Selecciones por persona</h2></div><p>En verde aparecen únicamente los equipos que hoy dan un punto.</p></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{scores.leaderboard.map((total, index) => <ParticipantCard key={total.participant} total={total} index={index} scores={scores.groupScores.filter((score) => score.participant === total.participant)}/>)}</div>
      </section>

      <section id="grupos" className="section-wrap scroll-mt-20">
        <div className="section-heading"><div><span className="section-kicker">Resultados reales</span><h2>Tablas de grupo</h2></div><p>Verde significa que el equipo está hoy en zona de clasificación.</p></div>
        <div className="glass-card mb-5 p-5"><p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">Ocho mejores terceros ahora</p><div className="flex flex-wrap gap-2">{qualifyingThirds.map((row) => <span key={row.group} className="flex items-center gap-2 rounded-lg border border-pitch/15 bg-pitch/[.06] px-3 py-2 text-xs font-semibold text-pitch"><TeamBadge name={row.teamName} size="sm"/>G{row.group} · {row.teamName} · {row.points} pts</span>)}</div></div>
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">{GROUPS.map((group) => <GroupPredictionCard key={group} group={group} standings={resolved.standings.filter((row) => row.group === group)}/>)}</div>
      </section>

      <MatchTicker games={data.games}/>
    </AppShell>
  </DataContext.Provider>;
}
