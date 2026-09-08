import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Linkedin, Github, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const palettes = [
  { name: 'violet', hue: 268 },
  { name: 'magenta', hue: 318 },
  { name: 'coral', hue: 8 },
  { name: 'amber', hue: 38 },
  { name: 'emerald', hue: 148 },
  { name: 'teal', hue: 184 },
  { name: 'indigo', hue: 232 },
  { name: 'orchid', hue: 286 },
];

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    const phaseMs = 10 * 60 * 1000;
    let lastPhase = -1;

    const applyPhase = () => {
      const phase = Math.floor(Date.now() / phaseMs);
      if (phase === lastPhase) return;
      lastPhase = phase;
      const idx = ((phase * 5) % palettes.length + palettes.length) % palettes.length;
      const palette = palettes[idx];
      document.documentElement.style.setProperty('--accent-h', String(palette.hue));
      document.documentElement.dataset.chromaticPhase = palette.name;
      (window as any).__demiChromaticHue = palette.hue;
    };

    applyPhase();
    const timer = window.setInterval(applyPhase, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Lab Notes', path: '/lab-notes' },
    { name: 'Time + Art', path: '/time-art' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900">
              Debasmita Banerjee
            </NavLink>

            <div className="hidden md:flex space-x-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-all px-3 py-1.5 rounded-full',
                      isActive
                        ? 'text-white accent-gradient accent-shadow'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-500 hover:text-slate-900"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
            <div className="px-3 py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2 rounded-lg text-base font-medium',
                      isActive ? 'text-white accent-gradient' : 'text-slate-600 hover:bg-slate-50'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow relative">
        <Outlet />
      </main>

      <footer className="relative bg-slate-950 text-slate-300 py-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p>College of Optics and Photonics</p>
            <p>University of Central Florida</p>
            <p>Orlando, FL</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com/in/demibanerjee/" target="_blank" rel="noreferrer" className="bg-slate-900 p-2 rounded-full hover:bg-slate-700 transition-colors"><Linkedin size={20} /></a>
              <a href="https://github.com/demibanerjee" target="_blank" rel="noreferrer" className="bg-slate-900 p-2 rounded-full hover:bg-slate-700 transition-colors"><Github size={20} /></a>
              <a href="mailto:debasmita.banerjee@ucf.edu" className="bg-slate-900 p-2 rounded-full hover:bg-slate-700 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Explore</h3>
            <div className="space-y-2 text-sm">
              <NavLink to="/research" className="block hover:text-white">Research + CV</NavLink>
              <NavLink to="/lab-notes" className="block hover:text-white">Lab Notes</NavLink>
              <NavLink to="/time-art" className="block hover:text-white">Time + Art</NavLink>
            </div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Debasmita Banerjee. Light, matter, notes & art.
        </div>
      </footer>
    </div>
  );
};
