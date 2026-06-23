import { describe, expect, it } from "vitest";
import { getQualifiers } from "./qualifiers";
import type { GroupLetter, StandingRow } from "../types/quiniela";

const row = (group: GroupLetter, position: number, points: number): StandingRow => ({
  group, teamName: `${group}${position}`, teamKey: `${group}${position}`, position, points,
  goalsFor: 6 - position, goalsAgainst: position, goalDifference: 6 - position * 2,
  qualified: false, played: 3, provisional: false,
});

describe("getQualifiers", () => {
  it("clasifica top 2 de cada grupo y los ocho mejores terceros", () => {
    const groups = "ABCDEFGHIJKL".split("") as GroupLetter[];
    const input = groups.flatMap((group, index) => [row(group, 1, 7), row(group, 2, 5), row(group, 3, 12 - index), row(group, 4, 0)]);
    const result = getQualifiers(input);
    expect(result.standings.filter((standing) => standing.qualificationType === "group_top_2")).toHaveLength(24);
    expect(result.thirds.filter((standing) => standing.qualified)).toHaveLength(8);
    expect(result.thirds[0].points).toBeGreaterThanOrEqual(result.thirds[8].points);
  });
});
