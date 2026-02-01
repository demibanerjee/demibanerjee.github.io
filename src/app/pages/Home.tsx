import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Lightbulb, Trophy } from 'lucide-react';
import { OpticsHeroCanvas } from '@/app/components/OpticsHeroCanvas';
import { motion } from 'framer-motion';
import profileImg from "figma:asset/3deb8636b2bb91c9376b149c9730cdaae902dd4b.png";

export const Home = () => {
  // Ref for the specific text element we want to glow
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      // Calculate current hue to match the canvas (speed = 0.02 deg/ms)
      const hue = (now * 0.02) % 360;
      if (titleRef.current) {
        titleRef.current.style.setProperty('--current-hue', hue.toString());
      }
      requestAnimationFrame(update);
    };
    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // We calculate coordinates relative to the TEXT element itself
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables on the element
    titleRef.current.style.setProperty('--mouse-x', `${x}px`);
    titleRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white group"
      >
        <OpticsHeroCanvas />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="pointer-events-auto cursor-default flex justify-center"
          >
             {/* 
                Single Layer Approach with Multi-Background:
                1. Top Background: Radial Gradient at mouse position (Color -> Transparent)
                2. Bottom Background: Linear Gradient (White -> Blue)
                
                The Top Background (glow) sits ON TOP of the Base Background.
                Since it fades to transparent, the Base Background shows through elsewhere.
             */}
             <h1 
               ref={titleRef}
               onMouseMove={handleMouseMove}
               className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent select-none pb-2"
               style={{
                 '--mouse-x': '-9999px', // Start off-screen
                 '--mouse-y': '-9999px',
                 '--current-hue': '0',
                 backgroundImage: `
                   radial-gradient(
                     circle 150px at var(--mouse-x) var(--mouse-y), 
                     hsla(var(--current-hue), 100%, 60%, 1) 0%, 
                     hsla(var(--current-hue), 100%, 60%, 0) 100%
                   ),
                   linear-gradient(to bottom right, #ffffff, #93c5fd)
                 `,
                 // Ensure background doesn't repeat so the radial gradient stays at the mouse
                 backgroundRepeat: 'no-repeat',
                 // Use the standard property and webkit prefix for compatibility
                 WebkitBackgroundClip: 'text',
                 backgroundClip: 'text',
                 // Fallback color if gradients fail
                 color: 'transparent' 
               } as React.CSSProperties}
             >
              LIGHT & MATTER<br/>INTERACTION
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 font-light max-w-3xl mx-auto pointer-events-none"
          >
            Hi I am Demi, this is my personal website exploring the light and matter interaction at the Quantum limit.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4 pointer-events-auto"
          >
            <Link to="/research" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] text-white">
              Explore Research
            </Link>
            <Link to="/portfolio" className="px-8 py-3 bg-transparent border border-white/30 hover:bg-white/10 rounded-full font-semibold transition-all backdrop-blur-sm">
              Creative Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 border-2 border-blue-200 rounded-full transform translate-x-4 translate-y-4"></div>
                  <img 
                    src={profileImg}
                    alt="Debasmita Banerjee" 
                    className="w-full h-full object-cover rounded-full shadow-2xl relative z-10"
                  />
               </div>
            </div>
            <div className="w-full md:w-2/3">
              <h4 className="text-blue-600 font-bold uppercase tracking-wide mb-2">About Me</h4>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Physicist. Artist. Learner.</h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Hello! I'm <strong className="text-black">Debasmita Banerjee</strong>, a PhD student at the <a href="#" className="text-blue-600 hover:underline">College of Optics and Photonics (CREOL)</a> at the University of Central Florida.
                </p>
                <p>
                  My research lies at the intersection of non-linear optics and integrated photonics. I spend my days (and often nights) aligning lasers, simulating waveguides, and trying to understand the fundamental behavior of light at the nanoscale.
                </p>
                <p>
                   Beyond the lab, I am passionate about visualizing science. I believe that the complex equations we solve describe a universe of stunning beauty, and I try to capture that through my paintings and digital animations.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                  <Link to="/cv" className="text-slate-900 font-semibold border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 transition-colors">
                      View Curriculum Vitae
                  </Link>
                  <Link to="/achievements" className="text-slate-900 font-semibold border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 transition-colors">
                      See Awards & Honors
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Explore My World</h2>
            <p className="text-slate-500 mt-2">Research, Art, and everything in between.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/research" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Research</h3>
              <p className="text-sm text-slate-500">Current objectives and reading list.</p>
            </Link>
            
            <Link to="/portfolio" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <PenTool size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Portfolio</h3>
              <p className="text-sm text-slate-500">Paintings and simulations.</p>
            </Link>

            <Link to="/achievements" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-4 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                <Trophy size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Humble Brag</h3>
              <p className="text-sm text-slate-500">Awards and publications.</p>
            </Link>

             <Link to="/blog" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Blog</h3>
              <p className="text-sm text-slate-500">Notes from the lab.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
