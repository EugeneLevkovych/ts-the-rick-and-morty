import type { Character } from "../types/api";

export const getCharacterDetails = (
  character: Character
): [string, string][] => [
  ["Gender", character.gender],
  ["Status", character.status],
  ["Species", character.species],
  ["Origin", character.origin?.name || "Unknown"],
  ["Type", character.type || "Unknown"],
  ["Location", character.location?.name || "Unknown"],
];
