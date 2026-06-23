import { MOCK_API } from "../data/mockApi";
import { normalizeStandings } from "../logic/standings";
import { getPreferredTeamName } from "../logic/normalize";
import type { ApiGame, WorldCupData } from "../types/api";
import type { GroupLetter } from "../types/quiniela";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://worldcup26.ir").replace(/\/$/, "");
const TOKEN = import.meta.env.VITE_API_TOKEN;
const CACHE_KEY = "quiniela-familia-api-cache-v3";
const CACHE_TTL = 60_000;

type AnyRecord = Record<string, unknown>;
const read = (obj: AnyRecord, keys: string[]) => keys.map((key) => obj[key]).find((value) => value !== undefined);

function normalizeGames(input: unknown): ApiGame[] {
  const source = Array.isArray(input) ? input : ((input as AnyRecord)?.data ?? (input as AnyRecord)?.games ?? []);
  if (!Array.isArray(source)) return [];
  return source.map((item, index) => {
    const row = item as AnyRecord;
    const home = (row.home_team ?? row.homeTeam ?? row.home) as AnyRecord | string;
    const away = (row.away_team ?? row.awayTeam ?? row.away) as AnyRecord | string;
    const statusValue = String(read(row, ["status", "state", "match_status", "time_elapsed", "finished"]) ?? "scheduled").toLowerCase();
    const status = /finish|complete|ended|ft|true/.test(statusValue) ? "finished" : /live|playing|in_progress/.test(statusValue) ? "live" : "scheduled";
    const groupRaw = String(read(row, ["group", "group_name"]) ?? "").replace(/^Group\s+/i, "").toUpperCase();
    const rawDate = String(read(row, ["date", "datetime", "start_time", "local_date"]) ?? new Date().toISOString());
    const apiDate = rawDate.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}:\d{2})$/);
    const date = apiDate ? `${apiDate[3]}-${apiDate[1]}-${apiDate[2]}T${apiDate[4]}:00` : rawDate;
    return {
      id: String(read(row, ["id", "match_id"]) ?? index),
      date,
      group: /^[A-L]$/.test(groupRaw) ? groupRaw as GroupLetter : undefined,
      homeTeam: getPreferredTeamName(String(row.home_team_name_en ?? (typeof home === "string" ? home : home?.name ?? home?.team_name) ?? "Local")),
      awayTeam: getPreferredTeamName(String(row.away_team_name_en ?? (typeof away === "string" ? away : away?.name ?? away?.team_name) ?? "Visitante")),
      homeScore: Number(read(row, ["home_score", "homeScore", "home_team_score"])),
      awayScore: Number(read(row, ["away_score", "awayScore", "away_team_score"])),
      status,
    } as ApiGame;
  }).map((game) => ({ ...game, homeScore: Number.isFinite(game.homeScore) ? game.homeScore : undefined, awayScore: Number.isFinite(game.awayScore) ? game.awayScore : undefined }));
}

function joinGroupsAndTeams(groupsPayload: unknown, teamsPayload: unknown): unknown {
  const groups = (groupsPayload as AnyRecord)?.groups;
  const teams = (teamsPayload as AnyRecord)?.teams;
  if (!Array.isArray(groups) || !Array.isArray(teams)) return groupsPayload;
  const names = new Map(teams.map((team) => {
    const item = team as AnyRecord;
    return [String(item.id ?? item._id), String(item.name_en ?? item.name ?? "")];
  }));
  return groups.map((group) => {
    const item = group as AnyRecord;
    return {
      ...item,
      teams: Array.isArray(item.teams) ? item.teams.map((team) => {
        const row = team as AnyRecord;
        return { ...row, teamName: getPreferredTeamName(names.get(String(row.team_id)) ?? String(row.team_id)) };
      }) : [],
    };
  });
}

async function request(path: string): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}

export async function fetchWorldCupData(force = false): Promise<WorldCupData> {
  if (import.meta.env.VITE_DEMO_MODE === "true") return { ...MOCK_API, source: "fallback", updatedAt: new Date().toISOString(), message: "Modo demo activo" };
  if (!force) {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null") as WorldCupData | null;
      if (cached && Date.now() - new Date(cached.updatedAt).getTime() < CACHE_TTL) return cached;
    } catch { /* caché inválido, se renueva */ }
  }
  try {
    const [groups, teams, games] = await Promise.all([request("/get/groups"), request("/get/teams"), request("/get/games")]);
    const standings = normalizeStandings(joinGroupsAndTeams(groups, teams));
    if (!standings.length) throw new Error("La API no devolvió standings");
    const result: WorldCupData = { standings, games: normalizeGames(games), source: "live", updatedAt: new Date().toISOString() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem("quiniela-familia-last-update", result.updatedAt);
    return result;
  } catch (error) {
    const result: WorldCupData = { ...MOCK_API, source: "fallback", updatedAt: new Date().toISOString(), message: error instanceof Error ? error.message : "Error de conexión" };
    localStorage.setItem("quiniela-familia-last-update", result.updatedAt);
    return result;
  }
}
