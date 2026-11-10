// Zones, pays (codes ISO numériques world-atlas) et ports desservis.

export const HQ = { name: 'Dubai, UAE', coords: [55.27, 25.2] };

export const REGIONS = [
  {
    id: 'east-africa',
    countries: ['404', '834', '706', '262'], // Kenya, Tanzanie, Somalie, Djibouti
    center: [42, 2],
  },
  {
    id: 'gulf',
    countries: ['784', '512', '634', '048'], // EAU, Oman, Qatar, Bahreïn
    center: [54, 23],
  },
  {
    id: 'red-sea',
    countries: ['682', '729', '887'], // Arabie saoudite, Soudan, Yémen
    center: [41, 18],
  },
  {
    id: 'indian-ocean',
    countries: ['450', '690', '480', '174'], // Madagascar, Seychelles, Maurice, Comores
    center: [50, -14],
    // Petites îles absentes du fond de carte : on les marque par un point.
    islands: [[55.45, -4.62], [57.55, -20.25], [43.33, -11.7]],
  },
];

// Ports principaux. À compléter pour chaque port :
//   address: ['Ligne 1', 'Ligne 2', ...]   phone: '+253 ...'   email: '...'
// Tout ce qui est rempli s'affiche automatiquement dans la section « Ports ».
export const PORTS = [
  { id: 'djibouti', city: { en: 'Djibouti', fr: 'Djibouti', ar: 'جيبوتي' }, region: 'east-africa', coords: [43.14, 11.6], address: [], phone: '', email: '' },
  { id: 'mombasa', city: { en: 'Mombasa', fr: 'Mombasa', ar: 'مومباسا' }, region: 'east-africa', coords: [39.66, -4.06], address: [], phone: '', email: '' },
  { id: 'dar', city: { en: 'Dar es Salaam', fr: 'Dar es Salaam', ar: 'دار السلام' }, region: 'east-africa', coords: [39.29, -6.82], address: [], phone: '', email: '' },
  { id: 'mogadishu', city: { en: 'Mogadishu', fr: 'Mogadiscio', ar: 'مقديشو' }, region: 'east-africa', coords: [45.34, 2.03], address: [], phone: '', email: '' },
  { id: 'berbera', city: { en: 'Berbera', fr: 'Berbera', ar: 'بربرة' }, region: 'east-africa', coords: [45.01, 10.44], address: [], phone: '', email: '' },
  { id: 'jeddah', city: { en: 'Jeddah', fr: 'Djeddah', ar: 'جدة' }, region: 'red-sea', coords: [39.15, 21.47], address: [], phone: '', email: '' },
  { id: 'port-sudan', city: { en: 'Port Sudan', fr: 'Port-Soudan', ar: 'بورتسودان' }, region: 'red-sea', coords: [37.22, 19.61], address: [], phone: '', email: '' },
  { id: 'aden', city: { en: 'Aden', fr: 'Aden', ar: 'عدن' }, region: 'red-sea', coords: [44.98, 12.8], address: [], phone: '', email: '' },
];
