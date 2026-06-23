import { PARTICIPANTS } from "../data/predictions";
import { normalizeTeamName } from "./normalize";
import type { GroupLetter, LeaderboardRow, ParticipantGroupScore, ParticipantName, ParticipantTotal, StandingRow } from "../types/quiniela";

export const SCORING_RULES = {
  qualifiedTeam: 1,
} as const;

type Rules = typeof SCORING_RULES;
type PredictionMap = Record<GroupLetter, Partial<Record<ParticipantName, readonly string[]>>>;

export function calculateScores({ predictions, standings, scoringRules = SCORING_RULES }: {
  predictions: PredictionMap; standings: StandingRow[]; scoringRules?: Rules;
}): { leaderboard: LeaderboardRow[]; groupScores: ParticipantGroupScore[]; participantScores: Record<ParticipantName, ParticipantTotal> } {
  const participantScores = Object.fromEntries(PARTICIPANTS.map((participant) => [participant, {
    participant, points: 0, exactHits: 0, qualifiedHits: 0, perfectGroups: 0, groupsPlayed: 0,
  }])) as Record<ParticipantName, ParticipantTotal>;
  const groupScores: ParticipantGroupScore[] = [];

  Object.entries(predictions).forEach(([group, entries]) => {
    const actualRows = standings.filter((row) => row.group === group);
    PARTICIPANTS.forEach((participant) => {
      const picks = entries[participant];
      if (!picks?.length) return;
      const provisional = actualRows.length === 0 || actualRows.some((row) => row.provisional || row.qualificationType === "pending");
      const details: ParticipantGroupScore["details"] = picks.map((predictedTeam, index) => {
        const actual = actualRows.find((row) => row.teamKey === normalizeTeamName(predictedTeam));
        if (!actual) return { predictedTeam, predictedPosition: index + 1, points: 0, status: "pending" as const };
        if (actual.qualified) return { predictedTeam, predictedPosition: index + 1, actualPosition: actual.position, qualified: true, points: scoringRules.qualifiedTeam, status: "qualified_wrong_position" as const };
        return { predictedTeam, predictedPosition: index + 1, actualPosition: actual.position, qualified: false, points: 0, status: "pending" as const };
      });
      const perfectGroup = false;
      const points = details.reduce((sum, detail) => sum + detail.points, 0);
      const exactHits = 0;
      const qualifiedHits = details.filter((detail) => detail.qualified).length;
      groupScores.push({ participant, group: group as GroupLetter, points, exactHits, qualifiedHits, perfectGroup, provisional, details });
      const total = participantScores[participant];
      total.points += points; total.exactHits += exactHits; total.qualifiedHits += qualifiedHits;
      total.perfectGroups += perfectGroup ? 1 : 0; total.groupsPlayed += 1;
    });
  });

  const sorted = Object.values(participantScores).sort((a, b) => b.points - a.points || a.participant.localeCompare(b.participant, "es"));
  const leaderboard: LeaderboardRow[] = sorted.map((row, index) => {
    const previous = sorted[index - 1];
    const tied = !!previous && previous.points === row.points;
    const firstSame = sorted.findIndex((candidate) => candidate.points === row.points);
    return { ...row, rank: firstSame + 1, tied: tied || sorted.some((candidate, i) => i > index && candidate.points === row.points) };
  });
  return { leaderboard, groupScores, participantScores };
}
