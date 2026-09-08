import React, { useEffect, useRef, useState } from 'react';

type Mode = 'field' | 'polarization' | 'nonlinear';

type Wave = { x: number; y: number; r: number; life: number };

export const OpticsHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>('field');
  const modeRef = useRef<Mode>('field');

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    let mouseX = 0;
    let mouseY = 0;
    let down = false;
    let hold = false;
    let holdTimer: number | undefined;
    let energy = 0;
    let nonlinearCharge = 0;
    let polAngle = 0;
    let polEllipticity = 0.2;
    const waves: Wave[] = [];
    const particles: Array<{x:number;y:number;vx:number;vy:number;life:number;size:number;hue:number}> = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(460, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!mouseX && !mouseY) {
        mouseX = width / 2;
        mouseY = height / 2;
      }
    };

    const localPoint = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const spawnTrail = (vx: number, vy: number, hue: number) => {
      const count = Math.min(5, Math.floor(Math.hypot(vx, vy) / 9));
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 0.2 + Math.random() * 1.4;
        particles.push({
          x: mouseX + (Math.random() - .5) * 14,
          y: mouseY + (Math.random() - .5) * 14,
          vx: -vx * .022 + Math.cos(a) * s,
          vy: -vy * .022 + Math.sin(a) * s,
          life: .45 + Math.random() * .55,
          size: .6 + Math.random() * 1.6,
          hue: (hue + Math.random() * 60 - 30 + 360) % 360,
        });
      }
      if (particles.length > 260) particles.splice(0, particles.length - 260);
    };

    const onMove = (e: PointerEvent) => {
      const p = localPoint(e);
      const vx = p.x - mouseX;
      const vy = p.y - mouseY;
      mouseX = p.x;
      mouseY = p.y;
      const speed = Math.hypot(vx, vy);
      energy = Math.min(1.8, energy * .78 + speed * .035);

      if (modeRef.current === 'polarization') {
        polAngle = Math.atan2(mouseY - height / 2, mouseX - width / 2);
        if (down) {
          polEllipticity = Math.max(.06, Math.min(1, .06 + Math.abs(mouseY - height / 2) / (height * .46)));
        }
      }

      if (speed > 7) spawnTrail(vx, vy, (Date.now() * .02) % 360);
    };

    const onDown = (e: PointerEvent) => {
      const p = localPoint(e);
      mouseX = p.x;
      mouseY = p.y;
      down = true;
      hold = false;
      holdTimer = window.setTimeout(() => {
        if (down) hold = true;
      }, 320);
    };

    const onUp = (e: PointerEvent) => {
      const p = localPoint(e);
      window.clearTimeout(holdTimer);
      if (modeRef.current === 'field' && !hold) {
        waves.push({ x: p.x, y: p.y, r: 0, life: 1 });
        if (waves.length > 7) waves.shift();
      }
      if (modeRef.current === 'nonlinear' && nonlinearCharge > .42) {
        waves.push({ x: p.x, y: p.y, r: 0, life: Math.min(1.3, nonlinearCharge) });
      }
      down = false;
      hold = false;
      nonlinearCharge *= .15;
    };

    const drawGlow = (x: number, y: number, r: number, hue: number, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `hsla(${hue},100%,96%,${alpha})`);
      g.addColorStop(.13, `hsla(${hue},100%,72%,${alpha * .8})`);
      g.addColorStop(.45, `hsla(${hue},90%,54%,${alpha * .25})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawField = (time: number, hue: number) => {
      const grid = 42;
      const cols = Math.ceil(width / grid);
      const rows = Math.ceil(height / grid);
      const split = hold ? Math.min(105, width * .09) : 0;
      const s1 = { x: mouseX - split, y: mouseY };
      const s2 = { x: mouseX + split, y: mouseY };

      for (let gy = 0; gy <= rows; gy++) {
        for (let gx = 0; gx <= cols; gx++) {
          const px = gx * grid;
          const py = gy * grid;
          const dx = px - mouseX;
          const dy = py - mouseY;
          const dist = Math.hypot(dx, dy);
          let angle = Math.sin(dist * .01 - time) * Math.PI + Math.atan2(dy, dx);
          let length = 14 + Math.sin(dist * .02 + time * 2) * 9;
          let excitation = Math.max(0, (430 - dist) / 430);
          let waveGlow = 0;

          for (const q of waves) {
            const dd = Math.hypot(px - q.x, py - q.y);
            const front = Math.abs(dd - q.r);
            if (front < 48) {
              const a = (1 - front / 48) * q.life;
              angle += Math.sin((dd - q.r) * .11) * a;
              waveGlow = Math.max(waveGlow, a);
            }
          }

          if (hold) {
            const d1 = Math.hypot(px - s1.x, py - s1.y);
            const d2 = Math.hypot(px - s2.x, py - s2.y);
            const interference = (Math.cos((d1 - d2) * .072) + 1) * .5;
            const near = Math.max(0, 1 - Math.min(d1, d2) / 620);
            angle += Math.sin((d1 - d2) * .055) * .8 * near;
            length += 15 * interference * near;
            excitation = Math.max(excitation, near * (.18 + .82 * interference));
          }

          const spatialHue = (hue + (gx / Math.max(cols, 1)) * 58 + (gy / Math.max(rows, 1)) * 58) % 360;
          const alpha = Math.min(1, .18 + excitation * .68 + waveGlow * .55);
          const lw = .8 + excitation * 2.2 + waveGlow * 1.4;
          ctx.strokeStyle = `hsla(${excitation > .05 ? hue : spatialHue},88%,${56 + excitation * 18}%,${alpha})`;
          ctx.lineWidth = lw;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(angle) * length, py + Math.sin(angle) * length);
          ctx.stroke();
        }
      }

      if (hold) {
        drawGlow(s1.x, s1.y, 125, hue, .74);
        drawGlow(s2.x, s2.y, 125, (hue + 32) % 360, .74);
      } else {
        drawGlow(mouseX, mouseY, 155 + energy * 12, hue, .82);
      }
    };

    const drawPolarization = (time: number, hue: number) => {
      const grid = 58;
      const cols = Math.ceil(width / grid);
      const rows = Math.ceil(height / grid);

      for (let gy = 0; gy <= rows; gy++) {
        for (let gx = 0; gx <= cols; gx++) {
          const px = gx * grid;
          const py = gy * grid;
          const dist = Math.hypot(px - mouseX, py - mouseY);
          const near = Math.max(0, 1 - dist / 560);
          const rot = polAngle + Math.sin((px + py) * .004 + time * 1.5) * .18;
          const a = 7 + near * 10;
          const b = a * (.08 + .82 * Math.max(.05, Math.min(1, polEllipticity * (.72 + .28 * near))));
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(rot);
          ctx.strokeStyle = `hsla(${(hue + near * 48) % 360},92%,72%,${.12 + near * .72})`;
          ctx.lineWidth = .7 + near * 1.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, a, b, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }
      drawGlow(mouseX, mouseY, 168, hue, .68);
    };

    const drawNonlinear = (time: number, hue: number) => {
      if (down) nonlinearCharge = Math.min(1.35, nonlinearCharge + .012 + energy * .0015);
      else nonlinearCharge *= .988;

      const harmonicHue = (hue + 145) % 360;
      const grid = 42;
      const cols = Math.ceil(width / grid);
      const rows = Math.ceil(height / grid);

      for (let gy = 0; gy <= rows; gy++) {
        for (let gx = 0; gx <= cols; gx++) {
          const px = gx * grid;
          const py = gy * grid;
          const dist = Math.hypot(px - mouseX, py - mouseY);
          const near = Math.max(0, 1 - dist / 500);
          const conversion = Math.max(0, Math.min(1, ((nonlinearCharge - .42) / .93) * near * 1.2));
          const angle = Math.atan2(py - mouseY, px - mouseX) + Math.sin(dist * .013 - time * 1.4) * 1.2;
          const length = 12 + near * 14 + conversion * 16;
          const localHue = (hue + conversion * 145) % 360;

          ctx.strokeStyle = `hsla(${localHue},95%,${56 + conversion * 18}%,${.16 + near * .46 + conversion * .35})`;
          ctx.lineWidth = .8 + near * 1.5 + conversion * 1.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(angle) * length, py + Math.sin(angle) * length);
          ctx.stroke();
        }
      }

      drawGlow(mouseX, mouseY, 160 + nonlinearCharge * 35, hue, .74);
      if (nonlinearCharge > .42) {
        const conv = Math.min(1, (nonlinearCharge - .42) / .93);
        drawGlow(mouseX, mouseY, 112 + conv * 52, harmonicHue, .18 + conv * .48);
      }
    };

    const draw = () => {
      const now = Date.now();
      const time = now * .0005;
      const hue = (now * .02) % 360;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5,5,15,.235)';
      ctx.fillRect(0, 0, width, height);

      if (modeRef.current === 'field') drawField(time, hue);
      else if (modeRef.current === 'polarization') drawPolarization(time, hue);
      else drawNonlinear(time, hue);

      ctx.globalCompositeOperation = 'screen';
      for (let i = waves.length - 1; i >= 0; i--) {
        const q = waves[i];
        q.r += 4.1;
        q.life *= .986;
        ctx.strokeStyle = `hsla(${hue},100%,74%,${q.life * .44})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.stroke();
        if (q.life < .04 || q.r > Math.hypot(width, height)) waves.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= .992;
        p.vy *= .992;
        p.life *= .975;
        ctx.fillStyle = `hsla(${p.hue},100%,76%,${p.life * .72})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life < .025) particles.splice(i, 1);
      }
      ctx.globalCompositeOperation = 'source-over';

      energy *= .96;
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      window.clearTimeout(holdTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const hints: Record<Mode, string> = {
    field: 'move · bend light   |   click · launch a wave   |   hold · interfere',
    polarization: 'move · rotate axis   |   hold + drag · change ellipticity',
    nonlinear: 'move · pump   |   hold · build intensity   |   release · convert',
  };

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1 p-1.5 rounded-full bg-slate-950/45 border border-white/10 backdrop-blur-md">
        {(['field', 'polarization', 'nonlinear'] as Mode[]).map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-[0.12em] font-bold transition-all ${
              mode === item ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-slate-400 bg-slate-950/30 border border-white/5 rounded-full px-3 py-2 backdrop-blur-md whitespace-nowrap pointer-events-none">
        {hints[mode]}
      </div>
    </>
  );
};
