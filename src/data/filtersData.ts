export const SPECIES = ['Human', 'Animal', 'Robot', 'Alien'];
export const GENDER = ['Male', 'Female', 'Genderless', 'Unknoun'];
export const STATUS = ['Alive', 'Dead', 'Unknoun'];

export const DIMENSION = [
  'Dimension C-137',
  'Dimension 5-126',
  'Replacement Dimension',
  'Testicle Monster Dimension',
  'Post-Apocalyptic Dimension',
  'Cronenberg Dimension',
  'Fantasy Dimension',
  'Unknoun',
];
export const TYPE = [
  'Planet',
  'Space station',
  'Dimension',
  'Dream',
  'Fantasy town',
  'Resort',
  'TV',
  'Microverse',
  'Cluster',
];

export function getCharactersFilters({
  species,
  setSpecies,
  gender,
  setGender,
  status,
  setStatus,
}) {
  return [
    {
      name: 'Species',
      value: species,
      onChange: setSpecies,
      options: SPECIES,
    },
    {
      name: 'Gender',
      value: gender,
      onChange: setGender,
      options: GENDER,
    },
    {
      name: 'Status',
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
}) {
  return [
    {
      name: 'Type',
      value: type,
      onChange: setType,
      options: TYPE,
    },
    {
      name: 'Dimension',
      value: dimension,
      onChange: setDimension,
      options: DIMENSION,
    },
  ];
}
