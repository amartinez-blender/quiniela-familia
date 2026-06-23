import type { StandingRow } from "../types/quiniela";

export type QualifierResult = { standings: StandingRow[]; thirds: StandingRow[]; criteriaIncomplete: boolean };

export function getQualifiers(input: StandingRow[]): QualifierResult {
  const standings: StandingRow[] = input.map((row) => ({ ...row, qualified: false, qualificationType: row.provisional ? "pending" : "not_qualified" }));
  standings.forEach((row) => {
    if (row.position <= 2) {
      row.qualified = true;
      row.qualificationType = row.provisional ? "pending" : "group_top_2";
    }
  });

  const thirds = standings.filter((row) => row.position === 3).sort((a, b) =>
    b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor || (a.sourceOrder ?? 0) - (b.sourceOrder ?? 0));
  const criteriaIncomplete = thirds.some((row) => row.played === undefined || row.goalDifference === undefined || row.goalsFor === undefined);
  thirds.forEach((row, index) => {
    const target = standings.find((standing) => standing.group === row.group && standing.teamKey === row.teamKey)!;
    target.qualified = index < 8;
    target.qualificationType = target.provisional ? "pending" : index < 8 ? "best_third" : "not_qualified";
    row.qualified = target.qualified;
    row.qualificationType = target.qualificationType;
  });
  return { standings, thirds, criteriaIncomplete };
}
