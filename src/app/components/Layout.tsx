import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Linkedin, Github, Mail, Trophy, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Humble Brag', path: '/achievements' },
    { name: 'CV', path: '/cv' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900">
                 Debasmita <span className="text-blue-600">Banerjee</span>
              </NavLink>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-blue-600 px-2 py-1 rounded-md",
                      isActive ? "text-blue-600 bg-blue-50" : "text-slate-600"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-slate-500 hover:text-slate-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg absolute w-full z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">College of Optics and Photonics</p>
            <p className="mb-2">University of Central Florida</p>
            <p>Orlando, FL 32816</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:student@ucf.edu" className="bg-slate-800 p-2 rounded-full hover:bg-red-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                <li><NavLink to="/cv" className="hover:text-blue-400">Curriculum Vitae</NavLink></li>
                <li><NavLink to="/achievements" className="hover:text-blue-400">Awards & Publications</NavLink></li>
                <li><NavLink to="/research" className="hover:text-blue-400">Research Objectives</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Debasmita Banerjee. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
