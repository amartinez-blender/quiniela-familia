import { TEAM_ALIASES } from "../data/teamAliases";

const simplify = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[.'’]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");

const LOOKUP = new Map<string, string>();
Object.entries(TEAM_ALIASES).forEach(([key, aliases]) => {
  LOOKUP.set(simplify(key), key);
  aliases.forEach((alias) => LOOKUP.set(simplify(alias), key));
});

export function normalizeTeamName(name: string): string {
  const normalized = simplify(name ?? "");
  return LOOKUP.get(normalized) ?? normalized.replace(/\s/g, "_");
}

export function getPreferredTeamName(name: string): string {
  return TEAM_ALIASES[normalizeTeamName(name)]?.[0] ?? name;
}
