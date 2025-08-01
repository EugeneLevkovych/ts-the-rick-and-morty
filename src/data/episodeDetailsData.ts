export const getEpisodeDetails = character => [
  ['Episode', character.name || 'Unknown'],
  ['Date', character.air_date || 'Unknown'],
];
