import type { Dispatch, SetStateAction } from "react";

export const SPECIES = ["Human", "Animal", "Robot", "Alien"];
export const GENDER = ["Male", "Female", "Genderless", "Unknown"];
export const STATUS = ["Alive", "Dead", "Unknown"];

export const DIMENSION = [
  "Dimension C-137",
  "Dimension 5-126",
  "Replacement Dimension",
  "Testicle Monster Dimension",
  "Post-Apocalyptic Dimension",
  "Cronenberg Dimension",
  "Fantasy Dimension",
  "Unknoun",
];
export const TYPE = [
  "Planet",
  "Space station",
  "Dimension",
  "Dream",
  "Fantasy town",
  "Resort",
  "TV",
  "Microverse",
  "Cluster",
];

type FilterOption = {
  name: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: string[];
};

type CharactersFiltersParams = {
  species: string;
  setSpecies: Dispatch<SetStateAction<string>>;
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

type LocationsFiltersParams = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  dimension: string;
  setDimension: Dispatch<SetStateAction<string>>;
};

export function getCharactersFilters({
  species,
  setSpecies,
  gender,
  setGender,
  status,
  setStatus,
}: CharactersFiltersParams): FilterOption[] {
  return [
    {
      name: "Species",
      value: species,
      onChange: setSpecies,
      options: SPECIES,
    },
    {
      name: "Gender",
      value: gender,
      onChange: setGender,
      options: GENDER,
    },
    {
      name: "Status",
      value: status,
      onChange: setStatus,
      options: STATUS,
    },
  ];
}

export function getLocationsFilters({
  type,
  setType,
  dimension,
  setDimension,
}: LocationsFiltersParams): FilterOption[] {
  return [
    {
      name: "Type",
      value: type,
      onChange: setType,
      options: TYPE,
    },
    {
      name: "Dimension",
      value: dimension,
      onChange: setDimension,
      options: DIMENSION,
    },
  ];
}
