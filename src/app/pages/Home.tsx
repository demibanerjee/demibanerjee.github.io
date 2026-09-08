import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OpticsHeroCanvas } from '@/app/components/OpticsHeroCanvas';
import profileImg from '@/assets/hero.png';

export const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const now = Date.now();
      titleRef.current?.style.setProperty('--current-hue', ((now * 0.02) % 360).toString());
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    titleRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    titleRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const updates = [
    {
      tag: 'Experiment',
      title: 'Pump–probe is alive.',
      text: 'The setup is working; the next phase is systematic wavelength-dependent sample measurements and extracting the physics cleanly.',
    },
    {
      tag: 'Theory',
      title: 'Connecting polarization and quadratures.',
      text: 'Building the polarization-resolved Hamiltonian through Langevin dynamics, squeezing observables and hybrid entanglement tests.',
    },
    {
      tag: 'Research',
      title: 'Long-range multimode quantum correlations.',
      text: 'Working on long-range multipartite correlations across multiple frequency-comb sectors and how to engineer them.',
    },
  ];

  const learning = [
    ['ψ', 'Photon statistics', 'Sub- and super-Poissonian light, number noise and squeezing.', 'deep dive'],
    ['X', 'Quadrature ↔ number squeezing', 'Exact operator identities versus bright-field linearization.', 'working'],
    ['S', 'Polarization squeezing', 'Stokes operators, Kerr cavities, bifurcations and hybrid variables.', 'reading'],
    ['τ', 'Ultrafast pulse retrieval', 'What GRENOUILLE/FROG reveals beyond an autocorrelation trace.', 'lab'],
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] min-h-[620px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <OpticsHeroCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(5,5,15,.15)_55%,rgba(5,5,15,.68)_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pointer-events-none">
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="flex justify-center">
            <h1
              ref={titleRef}
              onMouseMove={handleMouseMove}
              className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent select-none pb-2 pointer-events-auto"
              style={{
                '--mouse-x': '-9999px',
                '--mouse-y': '-9999px',
                '--current-hue': '0',
                backgroundImage: `
                  radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y),
                    hsla(var(--current-hue),100%,60%,1) 0%,
                    hsla(var(--current-hue),100%,60%,0) 100%),
                  linear-gradient(to bottom right,#ffffff,#cbd5e1)
                `,
                backgroundRepeat: 'no-repeat',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              } as React.CSSProperties}
            >
              LIGHT & MATTER<br />INTERACTION
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2 }} className="text-xl md:text-2xl text-slate-300 mb-8 font-light max-w-3xl mx-auto">
            Hi, I am Demi — this is my personal website exploring light and matter interaction at the quantum limit.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .4 }} className="flex justify-center gap-4 pointer-events-auto">
            <Link to="/research" className="px-8 py-3 rounded-full font-semibold text-white dynamic-primary">Explore Research</Link>
            <Link to="/time-art" className="px-8 py-3 bg-transparent border border-white/30 hover:bg-white/10 rounded-full font-semibold backdrop-blur-sm transition-all">Time + Art</Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[.8fr_1.2fr] gap-14 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute -inset-4 rounded-full opacity-30 blur-sm" style={{ background: 'conic-gradient(from 10deg,var(--accent),transparent,var(--accent),transparent,var(--accent))' }} />
              <img src={profileImg} alt="Debasmita Banerjee" className="w-full h-full object-cover rounded-full shadow-2xl relative z-10 border border-slate-200" />
            </div>
          </div>
          <div>
            <div className="accent-text text-xs font-extrabold uppercase tracking-[.16em] mb-3">A little about me</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Physicist. Artist. Lifelong learner.</h2>
            <div className="text-slate-600 text-lg leading-relaxed space-y-4">
              <p>I'm <strong className="text-slate-900">Debasmita “Demi” Banerjee</strong>, a PhD student at CREOL, the College of Optics and Photonics at the University of Central Florida.</p>
              <p>I work across nonlinear and quantum optics, multimode photonics, frequency-comb correlations and integrated photonics. I like problems where theory, experiment and visual intuition meet — and I keep finding excuses to turn light itself into art.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Nonlinear optics','Quantum optics','Integrated photonics','Ultrafast optics','Scientific art'].map((x) => <span key={x} className="dynamic-chip text-xs font-semibold px-3 py-1.5 rounded-full">{x}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 dynamic-surface border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="accent-text text-xs font-extrabold uppercase tracking-[.16em] mb-2">Latest updates</div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-7">What’s moving now</h2>
            <div className="space-y-4">
              {updates.map((u) => (
                <article key={u.title} className="dynamic-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="accent-text text-[10px] font-extrabold uppercase tracking-[.13em]">{u.tag}</div>
                  <h3 className="font-bold text-lg text-slate-900 mt-2 mb-2">{u.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{u.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="accent-text text-xs font-extrabold uppercase tracking-[.16em] mb-2">What I’m learning</div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-7">Current curiosities</h2>
            <div className="space-y-3">
              {learning.map(([icon,title,text,state]) => (
                <div key={title} className="dynamic-card bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl dynamic-chip flex items-center justify-center font-black text-lg">{icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-slate-900">{title}</div>
                    <div className="text-xs text-slate-500 mt-1">{text}</div>
                  </div>
                  <div className="accent-text text-[10px] font-extrabold uppercase tracking-wider">{state}</div>
                </div>
              ))}
            </div>
            <Link to="/lab-notes" className="inline-block mt-7 accent-text font-semibold text-sm">Follow the lab notes →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
