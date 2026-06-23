import { CalendarDays, Medal, Sparkles, Trophy, Users } from "lucide-react";

type Player = {
  name: string;
  initials: string;
  points: number;
  hits: number;
  color: string;
};

const players: Player[] = [
  { name: "Alejandro", initials: "AM", points: 18, hits: 9, color: "#00a3ff" },
  { name: "Mariana", initials: "MR", points: 16, hits: 8, color: "#00c853" },
  { name: "Carlos", initials: "CG", points: 14, hits: 7, color: "#ffd166" },
  { name: "Sofía", initials: "SF", points: 12, hits: 6, color: "#a78bfa" },
];

const groups = [
  { name: "Grupo A", teams: [["México", 7], ["Corea del Sur", 5], ["Sudáfrica", 3], ["Repechaje UEFA", 1]] },
  { name: "Grupo B", teams: [["Canadá", 7], ["Suiza", 6], ["Catar", 2], ["Repechaje UEFA", 1]] },
  { name: "Grupo C", teams: [["Brasil", 9], ["Marruecos", 6], ["Escocia", 3], ["Haití", 0]] },
];

const matches = [
  { date: "11 JUN", home: "México", away: "Sudáfrica", time: "13:00" },
  { date: "12 JUN", home: "Canadá", away: "Suiza", time: "19:00" },
  { date: "13 JUN", home: "Brasil", away: "Marruecos", time: "16:00" },
];

export function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Inicio">
          <span className="brand-mark"><Trophy size={21} /></span>
          <span>QUINIELA <b>FAMILIA</b></span>
        </a>
        <nav>
          <a href="#ranking">Ranking</a>
          <a href="#grupos">Grupos</a>
          <a href="#partidos">Partidos</a>
        </nav>
        <span className="live"><i /> Mundial 2026</span>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> La copa también se juega en casa</span>
            <h1>Predicciones, puntos<br />y <em>gloria familiar.</em></h1>
            <p>Sigue la tabla de la quiniela, compara selecciones y descubre quién sabe de fútbol… y quién solo tuvo suerte.</p>
            <a className="primary-button" href="#ranking">Ver clasificación <span>↓</span></a>
          </div>
          <div className="hero-card">
            <span className="hero-card-label">Líder actual</span>
            <div className="leader-avatar">AM</div>
            <h2>Alejandro</h2>
            <strong>18 <small>pts</small></strong>
            <div className="hero-card-meta"><span>9 aciertos</span><span>4 participantes</span></div>
          </div>
        </section>

        <section className="stats" aria-label="Resumen">
          <div><Users /><span><b>4</b> participantes</span></div>
          <div><Medal /><span><b>60</b> puntos jugados</span></div>
          <div><CalendarDays /><span><b>3</b> próximos partidos</span></div>
        </section>

        <section className="section" id="ranking">
          <div className="section-heading"><div><span className="kicker">Tabla general</span><h2>La carrera por la copa</h2></div><span className="updated">Actualizado hoy</span></div>
          <div className="ranking-grid">
            {players.map((player, index) => (
              <article className={`player-card ${index === 0 ? "champion" : ""}`} key={player.name}>
                <span className="position">{index + 1}</span>
                <div className="avatar" style={{ background: player.color }}>{player.initials}</div>
                <div className="player-info"><h3>{player.name}</h3><p>{player.hits} selecciones acertadas</p></div>
                <strong>{player.points}<small> pts</small></strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="grupos">
          <div className="section-heading"><div><span className="kicker">Fase de grupos</span><h2>Así va el Mundial</h2></div></div>
          <div className="groups-grid">
            {groups.map((group) => (
              <article className="group-card" key={group.name}>
                <h3>{group.name}</h3>
                <div className="table-head"><span>Selección</span><span>Pts</span></div>
                {group.teams.map(([team, points], index) => (
                  <div className="team-row" key={team}>
                    <span><i className={index < 2 ? "qualified" : ""}>{index + 1}</i>{team}</span>
                    <b>{points}</b>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="partidos">
          <div className="section-heading"><div><span className="kicker">Calendario</span><h2>Próximos partidos</h2></div></div>
          <div className="matches">
            {matches.map((match) => (
              <article className="match" key={`${match.home}-${match.away}`}>
                <span className="match-date">{match.date}</span>
                <div><b>{match.home}</b><span>vs</span><b>{match.away}</b></div>
                <time>{match.time}</time>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer><span>Quiniela Familia · Mundial 2026</span><span>Hecho para competir con cariño ⚽</span></footer>
    </div>
  );
}

