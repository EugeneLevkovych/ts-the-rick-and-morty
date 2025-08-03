import type { Location } from "../types/api";

export const getLocationDetails = (resident: Location): [string, string][] => [
  ["Type", resident.type || "Unknown"],
  ["Dimension", resident.dimension || "Unknown"],
];
