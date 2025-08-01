export const getCharacterDetails = character => [
  ['Gender', character.gender],
  ['Status', character.status],
  ['Species', character.species],
  ['Origin', character.origin?.name || 'Unknown'],
  ['Type', character.type || 'Unknown'],
  ['Location', character.location?.name || 'Unknown'],
];
