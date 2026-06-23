export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;
export type GroupLetter = (typeof GROUPS)[number];

export type ParticipantName = "Pedro" | "Francisco" | "Juan Pablo" | "Alex" | "Maryfer" | "Mary";

export type Prediction = { participant: ParticipantName; group: GroupLetter; teams: string[] };

export type QualificationType = "group_top_2" | "best_third" | "not_qualified" | "pending";

export type StandingRow = {
  group: GroupLetter;
  teamName: string;
  teamKey: string;
  position: number;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  qualified: boolean;
  qualificationType?: QualificationType;
  tieUnresolved?: boolean;
  provisional?: boolean;
  sourceOrder?: number;
};

export type ScoreDetailStatus = "exact" | "qualified_wrong_position" | "top3_not_qualified" | "miss" | "pending";

export type ParticipantGroupScore = {
  participant: ParticipantName;
  group: GroupLetter;
  points: number;
  exactHits: number;
  qualifiedHits: number;
  perfectGroup: boolean;
  provisional: boolean;
  details: Array<{
    predictedTeam: string;
    predictedPosition: number;
    actualPosition?: number;
    qualified?: boolean;
    points: number;
    status: ScoreDetailStatus;
  }>;
};

export type ParticipantTotal = {
  participant: ParticipantName;
  points: number;
  exactHits: number;
  qualifiedHits: number;
  perfectGroups: number;
  groupsPlayed: number;
};

export type LeaderboardRow = ParticipantTotal & { rank: number; tied: boolean };
