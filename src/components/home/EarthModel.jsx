import React, { useEffect, useRef } from 'react';

/* ───────────────────────────────────────────────────────────────
   The real <model-viewer> .glb earth is kept exactly as-is.
   A transparent canvas on top draws colourful great-circle arcs in
   TRUE 3D: every frame we read model-viewer's live camera and project
   through the SAME camera, so arcs ride the globe and hide behind it.

   Each destination is marked with a gentle glowing PIN (no labels).
   Tap a pin → the globe glides to face that location using
   model-viewer's built-in smooth camera interpolation.
   Auto-rotate + drag still work; zero extra dependencies.
   ─────────────────────────────────────────────────────────────── */

const HUB = [22, 79]; // India — the diaspora origin
const TARGETS = [
  { ll: [-18, 178], c: [252, 211, 77], c2: [251, 146, 60] }, // Fiji — amber
  { ll: [-20, 57], c: [94, 234, 212], c2: [34, 211, 238] },  // Mauritius — cyan
  { ll: [10, -61], c: [253, 164, 175], c2: [244, 63, 94] },  // Trinidad — rose
  { ll: [5, -58], c: [196, 181, 253], c2: [139, 92, 246] },  // Guyana — violet
  { ll: [-29, 24], c: [246, 194, 90], c2: [245, 158, 11] },  // South Africa — gold
];
const HUB_COLOR = [246, 205, 120];

const SEG = 64;
const BULGE = 0.32;     // how high arcs rise above the surface
const SURFACE = 1.02;   // arc anchor radius vs. earth radius

function llToVec(lat, lng) {
  const phi = (lat * Math.PI) / 180;
  const lam = (lng * Math.PI) / 180;
  const cp = Math.cos(phi);
  return [cp * Math.cos(lam), Math.sin(phi), cp * Math.sin(lam)];
}

function buildArc(a, b) {
  let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  d = Math.max(-1, Math.min(1, d));
  const omega = Math.acos(d);
  const so = Math.sin(omega);
  const pts = new Float32Array((SEG + 1) * 3);
  for (let i = 0; i <= SEG; i++) {
    const t = i / SEG;
    let x, y, z;
    if (so < 1e-5) { x = a[0]; y = a[1]; z = a[2]; }
    else {
      const s0 = Math.sin((1 - t) * omega) / so;
      const s1 = Math.sin(t * omega) / so;
      x = a[0] * s0 + b[0] * s1;
      y = a[1] * s0 + b[1] * s1;
      z = a[2] * s0 + b[2] * s1;
    }
    const lift = SURFACE + BULGE * Math.sin(Math.PI * t);
    pts[i * 3] = x * lift; pts[i * 3 + 1] = y * lift; pts[i * 3 + 2] = z * lift;
  }
  return pts;
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const vlen = (a) => Math.hypot(a[0], a[1], a[2]);
const norm = (a) => { const l = vlen(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

export default function EarthModel() {
  const mvRef = useRef(null);
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mv = mvRef.current;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!mv || !canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // geometry
    const hubVec = llToVec(HUB[0], HUB[1]);
    const arcs = TARGETS.map((t, i) => ({
      pts: buildArc(hubVec, llToVec(t.ll[0], t.ll[1])),
      c: t.c, c2: t.c2,
      speed: 0.16 + i * 0.025,
      offset: i * 0.37,
    }));
    const nodes = [hubVec, ...TARGETS.map((t) => llToVec(t.ll[0], t.ll[1]))];
    const nodeColor = [HUB_COLOR, ...TARGETS.map((t) => t.c)];

    // canvas sizing
    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // earth radius + centre in model space
    let Re = 1, center = [0, 0, 0];
    const readModel = () => {
      try {
        const dim = mv.getDimensions();
        Re = Math.max(dim.x, dim.y, dim.z) / 2;
        const t = mv.getCameraTarget();
        center = [t.x, t.y, t.z];
      } catch (e) { /* not ready */ }
    };

    const samplePoint = (pts, t) => {
      const f = Math.max(0, Math.min(0.9999, t)) * SEG;
      const i0 = Math.floor(f), fr = f - i0, a = i0 * 3, b = (i0 + 1) * 3;
      return [pts[a] + (pts[b] - pts[a]) * fr, pts[a + 1] + (pts[b + 1] - pts[a + 1]) * fr, pts[a + 2] + (pts[b + 2] - pts[a + 2]) * fr];
    };

    // ── rotation + interaction state (no React re-renders) ──
    // We drive the camera orbit ourselves so the earth AND the pins share one
    // rotation source and always spin together.
    const SPIN = reduced ? 0 : 0.6; // rad/s — auto-rotation speed
    let hover = -1, active = -1;
    let pressed = false;            // user is touching/dragging → yield to model-viewer
    let spinPaused = false;         // paused while focusing a pin
    let resumeAt = 0;               // when to resume the auto-spin after a focus
    let tween = null;               // gentle glide to a focused pin
    const screen = nodes.map(() => ({ x: 0, y: 0, vis: false }));

    const flyTo = (idx) => {
      const v = nodes[idx];
      let toP = Math.acos(Math.max(-1, Math.min(1, v[1])));
      toP = Math.max(0.5, Math.min(Math.PI - 0.5, toP));
      const toTraw = Math.atan2(v[0], v[2]);
      let o;
      try { o = mv.getCameraOrbit(); } catch (e) { return; }
      const d = Math.atan2(Math.sin(toTraw - o.theta), Math.cos(toTraw - o.theta)); // shortest path
      tween = { fromT: o.theta, toT: o.theta + d, fromP: o.phi, toP, start: performance.now(), dur: reduced ? 1 : 1000 };
      active = idx;
      spinPaused = true;
      resumeAt = 0;
    };

    // ── pointer: hover feedback + tap-to-focus (drag stays model-viewer's) ──
    const thr = () => Math.max(16, (Math.min(w, h) * 0.36) * 0.08);
    const hitTest = (px, py) => {
      let best = -1, bd = thr();
      for (let i = 0; i < screen.length; i++) {
        const s = screen[i];
        if (!s.vis) continue;
        const d = Math.hypot(s.x - px, s.y - py);
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };
    let downX = 0, downY = 0, moved = false;
    const local = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const onDown = (e) => { const [x, y] = local(e); downX = x; downY = y; moved = false; pressed = true; };
    const onMove = (e) => {
      const [x, y] = local(e);
      if (e.buttons && Math.hypot(x - downX, y - downY) > 6) moved = true;
      hover = hitTest(x, y);
      const cur = hover >= 0 ? 'pointer' : 'grab';
      if (mv.style.cursor !== cur) mv.style.cursor = cur;
    };
    const onUp = (e) => {
      pressed = false;
      const [x, y] = local(e);
      if (!moved) { const idx = hitTest(x, y); if (idx >= 0) flyTo(idx); }
    };
    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let raf = 0, running = false, prev = performance.now();

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const time = now / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      let orbit, fov;
      try { orbit = mv.getCameraOrbit(); fov = mv.getFieldOfView(); } catch (e) { return; }
      if (!orbit || !isFinite(orbit.radius) || orbit.radius <= 0) return;
      const { theta, phi, radius } = orbit;

      // ── drive rotation: earth + pins share this one camera orbit ──
      let goalT = theta, goalP = phi, write = false;
      if (tween) {
        const tt = tween.dur <= 0 ? 1 : Math.min(1, (now - tween.start) / tween.dur);
        const e = tt < 0.5 ? 4 * tt * tt * tt : 1 - Math.pow(-2 * tt + 2, 3) / 2; // easeInOutCubic
        goalT = tween.fromT + (tween.toT - tween.fromT) * e;
        goalP = tween.fromP + (tween.toP - tween.fromP) * e;
        write = true;
        if (tt >= 1) { tween = null; resumeAt = now + (reduced ? 0 : 2600); }
      } else {
        if (spinPaused && resumeAt && now > resumeAt) { spinPaused = false; resumeAt = 0; active = -1; }
        if (!pressed && !spinPaused && !reduced) { goalT = theta + SPIN * dt; write = true; }
      }
      if (write) { try { mv.cameraOrbit = `${goalT}rad ${goalP}rad ${radius}m`; } catch (e) { /* not ready */ } }

      // camera basis (matches model-viewer's Y-up orbit)
      const P = [
        center[0] + radius * Math.sin(phi) * Math.sin(theta),
        center[1] + radius * Math.cos(phi),
        center[2] + radius * Math.sin(phi) * Math.cos(theta),
      ];
      const forward = norm(sub(center, P));
      const zAxis = [-forward[0], -forward[1], -forward[2]];
      let xAxis = cross([0, 1, 0], zAxis);
      if (vlen(xAxis) < 1e-4) xAxis = [1, 0, 0];
      xAxis = norm(xAxis);
      const yAxis = cross(zAxis, xAxis);
      const f = 1 / Math.tan(((fov * Math.PI) / 180) / 2);
      const aspect = w / h;
      const m = sub(P, center);
      const margin = Math.max(1e-3, Re * 0.012);
      const Rpx = (f * Re / radius) * (h / 2);

      const toWorld = (v) => [center[0] + v[0] * Re, center[1] + v[1] * Re, center[2] + v[2] * Re];
      const project = (W) => {
        const rel = sub(W, P);
        const vx = dot(rel, xAxis), vy = dot(rel, yAxis), vz = dot(rel, zAxis);
        const depth = -vz;
        if (depth <= 1e-4) return null;
        return { sx: ((f / aspect) * (vx / depth) * 0.5 + 0.5) * w, sy: (0.5 - f * (vy / depth) * 0.5) * h };
      };
      const occluded = (W) => {
        const dir = sub(W, P), L = vlen(dir);
        const dn = [dir[0] / L, dir[1] / L, dir[2] / L];
        const b = dot(m, dn), c = dot(m, m) - Re * Re, disc = b * b - c;
        if (disc <= 0) return false;
        const tHit = -b - Math.sqrt(disc);
        return tHit > 1e-3 && tHit < L - margin;
      };

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // ── arcs ──
      for (const arc of arcs) {
        const { c, c2 } = arc;
        ctx.lineWidth = Math.max(0.6, Rpx / 200);
        ctx.strokeStyle = `rgba(${c2[0]},${c2[1]},${c2[2]},0.32)`;
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= SEG; i++) {
          const W = toWorld([arc.pts[i * 3], arc.pts[i * 3 + 1], arc.pts[i * 3 + 2]]);
          if (occluded(W)) { pen = false; continue; }
          const p = project(W);
          if (!p) { pen = false; continue; }
          if (!pen) { ctx.moveTo(p.sx, p.sy); pen = true; } else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();

        const head = reduced ? 0.55 : (time * arc.speed + arc.offset) % 1;
        const TRAIL = 0.16, STEPS = 18;
        for (let s = 0; s < STEPS; s++) {
          const t1 = head - (s / STEPS) * TRAIL, t0 = head - ((s + 1) / STEPS) * TRAIL;
          if (t0 < 0 || t1 < 0) break;
          const Wa = toWorld(samplePoint(arc.pts, t0)), Wb = toWorld(samplePoint(arc.pts, t1));
          if (occluded(Wa) || occluded(Wb)) continue;
          const pa = project(Wa), pb = project(Wb);
          if (!pa || !pb) continue;
          const k = 1 - s / STEPS, mix = k * k;
          ctx.strokeStyle = `rgba(${Math.round(c[0] + (255 - c[0]) * mix)},${Math.round(c[1] + (255 - c[1]) * mix)},${Math.round(c[2] + (255 - c[2]) * mix)},${0.15 + k * 0.85})`;
          ctx.lineWidth = Math.max(0.6, (Rpx / 130) * (0.45 + k * 1.7));
          ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy); ctx.stroke();
        }
        const Wh = toWorld(samplePoint(arc.pts, head));
        if (!occluded(Wh)) {
          const ph = project(Wh);
          if (ph) {
            ctx.shadowColor = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
            ctx.shadowBlur = Rpx / 9;
            ctx.fillStyle = 'rgba(255,253,247,0.96)';
            ctx.beginPath(); ctx.arc(ph.sx, ph.sy, Math.max(1, Rpx / 60), 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // ── pins (gentle glow + slow breathing ripple, no labels) ──
      for (let i = 0; i < nodes.length; i++) {
        const W = toWorld(nodes[i]);
        const vis = !occluded(W);
        const p = vis ? project(W) : null;
        screen[i].vis = !!(vis && p);
        if (!p) continue;
        screen[i].x = p.sx; screen[i].y = p.sy;

        const col = nodeColor[i];
        const isHub = i === 0;
        const emph = active === i ? 1 : hover === i ? 0.55 : 0;
        const base = Math.max(1, Rpx / 110) * (isHub ? 1.25 : 1) * (1 + emph * 0.6);

        // breathing ripple
        const rs = active === i ? 0.85 : 0.42;
        const ph = (time * rs + i * 0.27) % 1;
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(1 - ph) * (0.22 + emph * 0.4)})`;
        ctx.lineWidth = Math.max(0.5, base * 0.4);
        ctx.beginPath(); ctx.arc(p.sx, p.sy, base * (1 + ph * 3.2), 0, Math.PI * 2); ctx.stroke();

        // soft halo + core
        ctx.shadowColor = `rgba(${col[0]},${col[1]},${col[2]},${0.85})`;
        ctx.shadowBlur = (Rpx / 11) * (1 + emph);
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.85)`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, base * 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,253,247,0.98)';
        ctx.beginPath(); ctx.arc(p.sx, p.sy, base, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    };

    const start = () => { readModel(); prev = performance.now(); if (!running) { running = true; raf = requestAnimationFrame(draw); } };
    // We drive rotation through the camera orbit ourselves, so disable the
    // native turntable (which spins the model without moving the camera).
    mv.removeAttribute('auto-rotate');
    mv.setAttribute('interpolation-decay', reduced ? '0' : '90');
    if (mv.loaded) start();
    else mv.addEventListener('load', start, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mv.removeEventListener('load', start);
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(212,160,23,0.18),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),transparent_42%),radial-gradient(circle_at_70%_70%,rgba(212,160,23,0.12),transparent_38%)]" />
      <model-viewer
        ref={mvRef}
        className="relative h-full w-full"
        src="/models/earth2.glb"
        alt="Interactive 3D Earth globe with Girmitiya diaspora connection pins"
        auto-rotate
        auto-rotate-delay="0"
        camera-controls
        disable-pan
        disable-zoom
        shadow-intensity="0"
        exposure="1"
        interaction-prompt="none"
        style={{ width: '100%', height: '100%' }}
      />
      {/* 3D arc + pin overlay — pointer-events-none so model-viewer keeps drag/spin */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true" />
    </div>
  );
}
