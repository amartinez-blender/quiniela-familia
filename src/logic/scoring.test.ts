import { describe, expect, it } from "vitest";
import { PREDICTIONS } from "../data/predictions";
import { calculateScores, SCORING_RULES } from "./scoring";
import type { StandingRow } from "../types/quiniela";

const standing = (teamName: string, teamKey: string, position: number, qualified: boolean): StandingRow => ({
  group: "A", teamName, teamKey, position, points: 7 - position, goalsFor: 5, goalsAgainst: 1,
  goalDifference: 4, qualified, qualificationType: qualified ? (position < 3 ? "group_top_2" : "best_third") : "not_qualified", played: 3, provisional: false,
});

describe("calculateScores", () => {
  it("suma un punto por cada selección clasificada", () => {
    const standings = [standing("México", "mexico", 1, true), standing("Corea del Sur", "south_korea", 2, true), standing("Chequia", "czechia", 3, true)];
    const result = calculateScores({ predictions: PREDICTIONS, standings });
    const pedro = result.groupScores.find((score) => score.group === "A" && score.participant === "Pedro")!;
    expect(pedro.points).toBe(SCORING_RULES.qualifiedTeam * 3);
    expect(pedro.qualifiedHits).toBe(3);
    expect(pedro.perfectGroup).toBe(false);
    expect(result.leaderboard[0].points).toBeGreaterThan(0);
  });
});
