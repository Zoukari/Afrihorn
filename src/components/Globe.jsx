import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate } from 'd3-geo';
import { feature } from 'topojson-client';
import { REGIONS, PORTS, HQ } from '../data/geo';

const C = {
  sphere: '#132330',
  grid: 'rgba(126,144,156,0.16)',
  land: '#2A3E4D',
  border: 'rgba(13,25,34,0.9)',
  zone: 'rgba(232,23,93,0.32)',
  active: '#E8175D',
  rim: 'rgba(126,144,156,0.45)',
};

const toRotation = ([lon, lat]) => [-lon, -lat * 0.7, 0];

/**
 * Globe orthographique sur canvas. `active` = id de région à centrer.
 */
export function Globe({ active, label }) {
  const canvasRef = useRef(null);
  const state = useRef({ rotation: toRotation([20, 25]), countries: null, size: 0, anim: null, drag: null });
  const activeRef = useRef(active);

  // Dessin
  const draw = useRef(() => {});
  draw.current = () => {
    const cv = canvasRef.current;
    const s = state.current;
    if (!cv || !s.size) return;
    const ctx = cv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const r = s.size / 2 - 2;
    const proj = geoOrthographic().scale(r).translate([s.size / 2, s.size / 2]).rotate(s.rotation).clipAngle(90);
    const path = geoPath(proj, ctx);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, s.size, s.size);

    ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = C.sphere; ctx.fill();
    ctx.beginPath(); path(geoGraticule10()); ctx.strokeStyle = C.grid; ctx.lineWidth = 0.6; ctx.stroke();

    const activeRegion = REGIONS.find((g) => g.id === activeRef.current);
    if (s.countries) {
      for (const f of s.countries) {
        ctx.beginPath(); path(f);
        const inActive = activeRegion?.countries.includes(f.id);
        const inZone = !inActive && REGIONS.some((g) => g.countries.includes(f.id));
        ctx.fillStyle = inActive ? C.active : inZone ? C.zone : C.land;
        ctx.fill();
        ctx.strokeStyle = C.border; ctx.lineWidth = 0.5; ctx.stroke();
      }
    }

    // Îles (points) de la région océan Indien
    for (const g of REGIONS) {
      for (const p of g.islands || []) {
        const xy = visible(proj, p);
        if (!xy) continue;
        ctx.beginPath(); ctx.arc(xy[0], xy[1], 3, 0, Math.PI * 2);
        ctx.fillStyle = g.id === activeRef.current ? C.active : C.zone; ctx.fill();
      }
    }

    // Ports
    ctx.font = '600 12px "Barlow Condensed", sans-serif';
    for (const p of PORTS) {
      const xy = visible(proj, p.coords);
      if (!xy) continue;
      const on = p.region === activeRef.current;
      ctx.beginPath(); ctx.arc(xy[0], xy[1], on ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      if (on) { ctx.lineWidth = 1.5; ctx.strokeStyle = C.active; ctx.stroke(); }
    }

    // Siège
    const hq = visible(proj, HQ.coords);
    if (hq) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(hq[0] - 5, hq[1] - 5, 10, 10);
      ctx.strokeStyle = C.active; ctx.lineWidth = 2; ctx.strokeRect(hq[0] - 5, hq[1] - 5, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.fillText('AFRIHORN HQ', hq[0] + 10, hq[1] + 4);
    }

    ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = C.rim; ctx.lineWidth = 1; ctx.stroke();
  };

  // Animation vers une rotation
  const flyTo = (target, ms = 1100) => {
    const s = state.current;
    cancelAnimationFrame(s.anim);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { s.rotation = target; draw.current(); return; }
    const from = s.rotation;
    const interp = geoInterpolate([-from[0], -from[1]], [-target[0], -target[1]]);
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const [lon, lat] = interp(e);
      s.rotation = [-lon, -lat, 0];
      draw.current();
      if (k < 1) s.anim = requestAnimationFrame(step);
    };
    s.anim = requestAnimationFrame(step);
  };

  // Taille + chargement du fond de carte
  useEffect(() => {
    const cv = canvasRef.current;
    const s = state.current;
    const resize = () => {
      const size = cv.parentElement.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      s.size = size;
      cv.width = size * dpr; cv.height = size * dpr;
      cv.style.width = `${size}px`; cv.style.height = `${size}px`;
      draw.current();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv.parentElement);

    let alive = true;
    import('world-atlas/countries-110m.json').then((mod) => {
      if (!alive) return;
      const topo = mod.default || mod;
      s.countries = feature(topo, topo.objects.countries).features;
      draw.current();
    });

    // Moment d'entrée : le globe tourne jusqu'à la zone active à la première apparition.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const g = REGIONS.find((x) => x.id === activeRef.current);
        if (g) flyTo(toRotation(g.center), 1800);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(cv);

    return () => { alive = false; ro.disconnect(); io.disconnect(); cancelAnimationFrame(s.anim); };
  }, []);

  // Changement de région
  useEffect(() => {
    if (activeRef.current === active) return;
    activeRef.current = active;
    const g = REGIONS.find((x) => x.id === active);
    if (g) flyTo(toRotation(g.center));
  }, [active]);

  // Rotation à la souris / au doigt
  const onPointerDown = (e) => {
    const s = state.current;
    cancelAnimationFrame(s.anim);
    s.drag = { x: e.clientX, y: e.clientY, rot: s.rotation };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const s = state.current;
    if (!s.drag) return;
    const k = 180 / s.size;
    const [l, p] = s.drag.rot;
    s.rotation = [l + (e.clientX - s.drag.x) * k, Math.max(-60, Math.min(60, p - (e.clientY - s.drag.y) * k)), 0];
    draw.current();
  };
  const onPointerUp = () => { state.current.drag = null; };

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      style={{ display: 'block', touchAction: 'pan-y', cursor: 'grab' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}

function visible(proj, coords) {
  const [l, p] = proj.rotate();
  const lon = (coords[0] + l) * (Math.PI / 180);
  const lat = coords[1] * (Math.PI / 180);
  const p0 = -p * (Math.PI / 180);
  // cos de la distance angulaire au centre de la vue
  const cosc = Math.sin(p0) * Math.sin(lat) + Math.cos(p0) * Math.cos(lat) * Math.cos(lon);
  return cosc > 0 ? proj(coords) : null;
}
