export type Pick = { team: string; qualified: boolean };

export function scorePicks(picks: Pick[], qualifiedTeams: string[]) {
  const qualified = new Set(qualifiedTeams);
  return picks.reduce((total, pick) => total + Number(pick.qualified === qualified.has(pick.team)), 0);
}

