import type { Episode } from "../types/api";

export const getEpisodeDetails = (character: Episode): [string, string][] => [
  ["Episode", character.name || "Unknown"],
  ["Date", character.air_date || "Unknown"],
];
