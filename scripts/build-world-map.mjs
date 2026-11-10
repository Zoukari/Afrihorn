// Génère public/world-dark.svg (fond de carte de la section Ports).
// Usage : node scripts/build-world-map.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';

const topo = JSON.parse(readFileSync(new URL('../node_modules/world-atlas/countries-110m.json', import.meta.url)));
const W = 2000, H = 1000;
const proj = geoEquirectangular().fitExtent([[0, 0], [W, H]], { type: 'Sphere' });
const path = geoPath(proj);
const round = (d) => d.replace(/(\d+\.\d{1})\d+/g, '$1');
const land = feature(topo, topo.objects.land);
const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><path d="${round(path(land))}" fill="#1B2A35"/><path d="${round(path(borders))}" fill="none" stroke="#0D1922" stroke-width="1.2"/></svg>`;
writeFileSync(new URL('../public/world-dark.svg', import.meta.url), svg);
console.log('world-dark.svg', (svg.length / 1024).toFixed(0), 'KB');
