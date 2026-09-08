import React, { useEffect, useRef } from 'react';

export const TimeArt = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!parent || !ctx) return;

    let w = 0, h = 0, dpr = 1, raf = 0;
    let mx = .52, my = .48;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = Math.max(300, r.width);
      h = Math.max(360, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    };

    const draw = (t: number) => {
      ctx.fillStyle = 'rgba(4,6,18,.13)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';

      const s1 = { x: w * (.31 + .07 * Math.sin(t * .00019)), y: h * (.48 + .08 * Math.cos(t * .00013)) };
      const s2 = { x: w * (.70 + .06 * Math.cos(t * .00017)), y: h * (.52 + .07 * Math.sin(t * .00015)) };
      const baseHue = (window as any).__demiChromaticHue ?? 220;
      const step = 9;

      for (let py = 0; py < h; py += step) {
        for (let px = 0; px < w; px += step) {
          const d1 = Math.hypot(px - s1.x, py - s1.y);
          const d2 = Math.hypot(px - s2.x, py - s2.y);
          const phase = (d1 - d2) * .095 + t * .0012 + (mx - .5) * 2.5;
          const I = (Math.cos(phase) + 1) * .5;
          const pol = .5 + .5 * Math.sin((px / w) * 5 + (py / h) * 3 + t * .00055 + (my - .5) * 3);
          const hue = (baseHue + 120 * I + 42 * pol + t * .003) % 360;
          const alpha = .025 + .18 * Math.pow(I, 4);
          ctx.fillStyle = `hsla(${hue},95%,68%,${alpha})`;
          const rr = .7 + 2.7 * Math.pow(I, 3);
          ctx.beginPath(); ctx.arc(px, py, rr, 0, Math.PI * 2); ctx.fill();
        }
      }

      for (let k = 0; k < 8; k++) {
        const r = 34 + k * 28 + 8 * Math.sin(t * .001 + k);
        ctx.strokeStyle = `hsla(${(baseHue + k * 18 + t * .004) % 360},95%,70%,${.055 + k * .004})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(w * .5, h * .5, r * 1.9, r * .7, Math.sin(t * .00012) * .5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    canvas.addEventListener('pointermove', move);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      canvas.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const sample = [18,52,30,78,42,65,36,56,24,82,48,15,69,33,27,61,44,20,72,51,22,47,31,66,38,55,28];

  return (
    <div className="dynamic-surface min-h-screen">
      <section className="dynamic-dark text-white py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="accent-light-text text-xs font-extrabold uppercase tracking-[.18em] mb-3">Time + Art</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight max-w-4xl leading-[1.02]">A record of time, turned back into light.</h1>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">
            A playful view of reclaimable discretionary screen time, paired with an evolving optics-inspired generative art practice.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 dynamic-card">
              <div className="flex items-end justify-between mb-5">
                <div><div className="accent-text text-xs font-extrabold uppercase tracking-[.14em]">Time reclaim calendar</div><h2 className="text-2xl font-black mt-1">September 2026</h2></div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">sample data</span>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="text-center text-[10px] font-bold text-slate-400">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                <div />
                {sample.map((v,i)=>(
                  <div key={i} className="reclaim-day aspect-square rounded-lg border border-slate-200 flex items-end justify-center pb-1 text-[9px] font-bold text-slate-700" style={{'--v': v/90} as React.CSSProperties}>{v}m</div>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-5">The live version will only count clearly discretionary time. Work, research and necessary phone use are not treated as “waste.” Raw iPhone Screen Time still needs the separate Screen Time bridge.</p>
            </div>

            <div className="rounded-2xl p-7 text-white dynamic-dark accent-shadow">
              <div className="accent-light-text text-xs font-extrabold uppercase tracking-[.14em]">Today · preview</div>
              <div className="text-6xl font-black tracking-tighter mt-2">47 min</div>
              <p className="text-sm text-slate-400 leading-relaxed mt-3">Potentially reclaimable discretionary time. The point is not guilt; it is seeing what else could fit into the same space.</p>
              <div className="space-y-2 mt-6">
                {['≈ 15–20 pages of a technical book','≈ one short swim / walk / mobility session','≈ one uninterrupted sketch or reading block','≈ or simply 47 extra minutes of rest'].map((x)=><div key={x} className="border border-white/10 bg-white/5 rounded-xl px-4 py-3 text-sm text-slate-300">{x}</div>)}
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 grid lg:grid-cols-[1.25fr_.75fr] min-h-[440px]">
            <div className="relative min-h-[440px]"><canvas ref={canvasRef} className="absolute inset-0 w-full h-full" /></div>
            <div className="p-8 md:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-800">
              <div className="accent-light-text text-xs font-extrabold uppercase tracking-[.16em]">Optics Art Studio</div>
              <h2 className="text-white text-3xl font-black tracking-tight mt-3">Interference Garden No. 01</h2>
              <p className="text-sm text-slate-400 leading-relaxed mt-4">A generative abstract built from two-source interference, phase drift and a slowly rotating polarization bias. Future pieces will be rooted in real optical motifs rather than generic AI decoration.</p>
              <div className="mt-5"><span className="dynamic-chip text-[10px] font-extrabold uppercase tracking-[.12em] px-3 py-1.5 rounded-full">interference · phase · polarization</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
