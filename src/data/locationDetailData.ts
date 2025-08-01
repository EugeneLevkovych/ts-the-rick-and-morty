export const getLocationDetails = resident => [
  ['Type', resident.type || 'Unknown'],
  ['Dimension', resident.dimension || 'Unknown'],
];
