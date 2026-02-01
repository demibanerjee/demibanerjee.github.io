import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PenTool, Lightbulb, Trophy } from 'lucide-react';
import { OpticsHeroCanvas } from '@/app/components/OpticsHeroCanvas';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <OpticsHeroCanvas />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="pointer-events-auto cursor-default"
          >
             <motion.h1 
               whileHover={{ 
                 scale: 1.05,
                 textShadow: "0 0 8px rgb(255, 255, 255), 0 0 20px rgb(100, 200, 255)",
                 filter: "brightness(1.2)"
               }}
               className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-blue-500 drop-shadow-lg transition-all duration-300"
             >
              LIGHT & MATTER<br/>INTERACTION
            </motion.h1>
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
            <Link to="/research" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]">
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
                    src="https://images.unsplash.com/photo-1633381182794-01b10764b431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5OTIzNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
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
                  Hello! I'm <strong>Debasmita Banerjee</strong>, a PhD student at the <a href="#" className="text-blue-600 hover:underline">College of Optics and Photonics (CREOL)</a> at the University of Central Florida.
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
