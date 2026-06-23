import type { GroupLetter, StandingRow } from "./quiniela";

export type ApiGame = {
  id: string;
  date: string;
  group?: GroupLetter;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "finished" | "scheduled" | "live";
};

export type ApiPayload = { standings: StandingRow[]; games: ApiGame[] };
export type DataSource = "live" | "fallback" | "error";
export type WorldCupData = ApiPayload & { source: DataSource; updatedAt: string; message?: string };
