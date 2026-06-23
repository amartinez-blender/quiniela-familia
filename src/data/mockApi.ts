import type { ApiGame, ApiPayload } from "../types/api";
import type { GroupLetter, StandingRow } from "../types/quiniela";
import { getPreferredTeamName, normalizeTeamName } from "../logic/normalize";

// Fotografía real de worldcup26.ir al 22 de junio de 2026.
// Solo se usa si la API en vivo no está disponible.
type SnapshotTeam = [name: string, points: number, gf: number, ga: number, played: number, won: number, drawn: number, lost: number];
const SNAPSHOT: Record<GroupLetter, SnapshotTeam[]> = {
  A: [["Mexico", 6, 3, 0, 2, 2, 0, 0], ["South Korea", 3, 2, 2, 2, 1, 0, 1], ["Czech Republic", 1, 2, 3, 2, 0, 1, 1], ["South Africa", 1, 1, 3, 2, 0, 1, 1]],
  B: [["Canada", 4, 7, 1, 2, 1, 1, 0], ["Switzerland", 4, 5, 2, 2, 1, 1, 0], ["Bosnia and Herzegovina", 1, 2, 5, 2, 0, 1, 1], ["Qatar", 1, 1, 7, 2, 0, 1, 1]],
  C: [["Brazil", 4, 4, 1, 2, 1, 1, 0], ["Morocco", 4, 2, 1, 2, 1, 1, 0], ["Scotland", 3, 1, 1, 2, 1, 0, 1], ["Haiti", 0, 0, 4, 2, 0, 0, 2]],
  D: [["United States", 6, 6, 1, 2, 2, 0, 0], ["Australia", 3, 2, 2, 2, 1, 0, 1], ["Paraguay", 3, 2, 4, 2, 1, 0, 1], ["Turkey", 0, 0, 3, 2, 0, 0, 2]],
  E: [["Germany", 6, 9, 2, 2, 2, 0, 0], ["Ivory Coast", 3, 2, 2, 2, 1, 0, 1], ["Ecuador", 1, 0, 1, 2, 0, 1, 1], ["Curaçao", 1, 1, 7, 2, 0, 1, 1]],
  F: [["Netherlands", 4, 7, 3, 2, 1, 1, 0], ["Japan", 4, 6, 2, 2, 1, 1, 0], ["Sweden", 3, 6, 6, 2, 1, 0, 1], ["Tunisia", 0, 1, 9, 2, 0, 0, 2]],
  G: [["Egypt", 4, 4, 2, 2, 1, 1, 0], ["Iran", 2, 2, 2, 2, 0, 2, 0], ["Belgium", 2, 1, 1, 2, 0, 2, 0], ["New Zealand", 1, 3, 5, 2, 0, 1, 1]],
  H: [["Spain", 4, 4, 0, 2, 1, 1, 0], ["Uruguay", 2, 3, 3, 2, 0, 2, 0], ["Cape Verde", 2, 2, 2, 2, 0, 2, 0], ["Saudi Arabia", 1, 1, 5, 2, 0, 1, 1]],
  I: [["France", 6, 6, 1, 2, 2, 0, 0], ["Norway", 6, 7, 3, 2, 2, 0, 0], ["Senegal", 0, 3, 6, 2, 0, 0, 2], ["Iraq", 0, 1, 7, 2, 0, 0, 2]],
  J: [["Argentina", 6, 5, 0, 2, 2, 0, 0], ["Austria", 3, 3, 3, 2, 1, 0, 1], ["Jordan", 0, 1, 3, 1, 0, 0, 1], ["Algeria", 0, 0, 3, 1, 0, 0, 1]],
  K: [["Colombia", 3, 3, 1, 1, 1, 0, 0], ["Portugal", 1, 1, 1, 1, 0, 1, 0], ["Democratic Republic of the Congo", 1, 1, 1, 1, 0, 1, 0], ["Uzbekistan", 0, 1, 3, 1, 0, 0, 1]],
  L: [["England", 3, 4, 2, 1, 1, 0, 0], ["Ghana", 3, 1, 0, 1, 1, 0, 0], ["Panama", 0, 0, 1, 1, 0, 0, 1], ["Croatia", 0, 2, 4, 1, 0, 0, 1]],
};

export const MOCK_STANDINGS: StandingRow[] = Object.entries(SNAPSHOT).flatMap(([group, teams]) =>
  teams.map(([teamName, points, goalsFor, goalsAgainst, played, won, drawn, lost], index) => ({
    group: group as GroupLetter, teamName: getPreferredTeamName(teamName), teamKey: normalizeTeamName(teamName), position: index + 1,
    played, won, drawn, lost, points, goalsFor, goalsAgainst, goalDifference: goalsFor - goalsAgainst,
    qualified: false, qualificationType: "pending", provisional: true, sourceOrder: index,
  })),
);

export const MOCK_GAMES: ApiGame[] = [
  { id: "41", date: "2026-06-22T17:00:00", group: "I", homeTeam: "Francia", awayTeam: "Irak", homeScore: 3, awayScore: 0, status: "finished" },
  { id: "42", date: "2026-06-22T20:00:00", group: "I", homeTeam: "Noruega", awayTeam: "Senegal", homeScore: 3, awayScore: 2, status: "finished" },
  { id: "43", date: "2026-06-22T12:00:00", group: "J", homeTeam: "Argentina", awayTeam: "Austria", homeScore: 2, awayScore: 0, status: "finished" },
  { id: "44", date: "2026-06-22T20:00:00", group: "J", homeTeam: "Jordan", awayTeam: "Algeria", status: "scheduled" },
  { id: "45", date: "2026-06-23T12:00:00", group: "K", homeTeam: "Portugal", awayTeam: "Uzbekistán", status: "scheduled" },
  { id: "48", date: "2026-06-23T16:00:00", group: "L", homeTeam: "Inglaterra", awayTeam: "Ghana", status: "scheduled" },
];

export const MOCK_API: ApiPayload = { standings: MOCK_STANDINGS, games: MOCK_GAMES };
