import { normalizeTeamName } from "./normalize";
import type { GroupLetter, StandingRow } from "../types/quiniela";

type UnknownRecord = Record<string, unknown>;
const n = (value: unknown, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const s = (value: unknown, fallback = "") => typeof value === "string" ? value : fallback;

export function normalizeStandings(input: unknown): StandingRow[] {
  const rawGroups = Array.isArray(input) ? input : ((input as UnknownRecord)?.data ?? (input as UnknownRecord)?.groups ?? []);
  if (!Array.isArray(rawGroups)) return [];
  const rows: StandingRow[] = [];

  rawGroups.forEach((item, outerIndex) => {
    const record = item as UnknownRecord;
    const groupName = s(record.group_name ?? record.group ?? record.name ?? record.letter).replace(/^Group\s+/i, "").toUpperCase() as GroupLetter;
    const nested = record.teams ?? record.standings ?? record.table;
    const candidates = Array.isArray(nested) ? nested : [record];
    candidates.forEach((candidate, innerIndex) => {
      const row = candidate as UnknownRecord;
      const group = (groupName || s(row.group).replace(/^Group\s+/i, "").toUpperCase()) as GroupLetter;
      if (!/^[A-L]$/.test(group)) return;
      const teamObj = (row.team ?? {}) as UnknownRecord;
      const teamName = s(row.teamName ?? row.team_name ?? row.name ?? teamObj.name);
      if (!teamName) return;
      const goalsFor = n(row.goalsFor ?? row.goals_for ?? row.gf ?? row.goals_scored);
      const goalsAgainst = n(row.goalsAgainst ?? row.goals_against ?? row.ga ?? row.goals_conceded);
      const played = n(row.played ?? row.games_played ?? row.mp);
      rows.push({
        group, teamName, teamKey: normalizeTeamName(teamName), position: n(row.position ?? row.rank, 0),
        played, won: n(row.won ?? row.w), drawn: n(row.drawn ?? row.d), lost: n(row.lost ?? row.l),
        points: n(row.points ?? row.pts), goalsFor, goalsAgainst,
        goalDifference: n(row.goalDifference ?? row.goal_difference ?? row.gd, goalsFor - goalsAgainst),
        qualified: false, qualificationType: played < 3 ? "pending" : "not_qualified", provisional: played < 3,
        sourceOrder: outerIndex * 10 + innerIndex,
      });
    });
  });

  return rankStandings(rows);
}

export function rankStandings(rows: StandingRow[]): StandingRow[] {
  const groups = new Map<GroupLetter, StandingRow[]>();
  rows.forEach((row) => groups.set(row.group, [...(groups.get(row.group) ?? []), { ...row }]));
  const ranked: StandingRow[] = [];
  groups.forEach((groupRows) => {
    const hasApiPositions = groupRows.every((row) => row.position > 0);
    const sorted = [...groupRows].sort((a, b) => hasApiPositions
      ? a.position - b.position
      : b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor || (a.sourceOrder ?? 0) - (b.sourceOrder ?? 0));
    sorted.forEach((row, index) => {
      const previous = sorted[index - 1];
      const tieUnresolved = !!previous && previous.points === row.points && previous.goalDifference === row.goalDifference && previous.goalsFor === row.goalsFor;
      ranked.push({ ...row, position: hasApiPositions ? row.position : index + 1, tieUnresolved });
    });
  });
  return ranked;
}
