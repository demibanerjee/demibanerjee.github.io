import React from 'react';
import { Download, Mail, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const CV = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-2xl bg-white border border-slate-200 p-8 md:p-16 min-h-[1100px] relative">
        
        {/* Download Button (Fixed on mobile, absolute on desktop) */}
        <div className="absolute top-4 right-4 print:hidden">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors" onClick={() => window.print()}>
            <Download size={16} /> <span className="text-sm font-semibold">Print / PDF</span>
          </button>
        </div>

        {/* Header */}
        <header className="border-b-2 border-slate-900 pb-8 mb-8">
          <h1 className="text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">Debasmita Banerjee</h1>
          <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
            <span className="flex items-center gap-1"><Mail size={14} /> student@ucf.edu</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> Orlando, FL</span>
            <span className="flex items-center gap-1"><Globe size={14} /> www.optics-phd.com</span>
            <span className="flex items-center gap-1"><Linkedin size={14} /> /in/debasmita-b</span>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Left Column (Skills, etc) */}
            <div className="md:col-span-1 space-y-8">
                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Education</h3>
                    <div className="mb-4">
                        <div className="font-bold text-slate-900">PhD, Optics</div>
                        <div className="text-xs text-slate-600">UCF CREOL</div>
                        <div className="text-xs text-slate-500">2022 - Present</div>
                    </div>
                    <div>
                        <div className="font-bold text-slate-900">BS, Physics</div>
                        <div className="text-xs text-slate-600">University Name</div>
                        <div className="text-xs text-slate-500">2018 - 2022</div>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Skills</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                        <p><span className="font-semibold block text-xs text-slate-500 uppercase">Lab</span> Laser Alignment, Fiber Splicing, Spectroscopy</p>
                        <p><span className="font-semibold block text-xs text-slate-500 uppercase">Simulation</span> Lumerical FDTD, COMSOL, MATLAB</p>
                        <p><span className="font-semibold block text-xs text-slate-500 uppercase">Programming</span> Python, C++, React (Basic)</p>
                        <p><span className="font-semibold block text-xs text-slate-500 uppercase">Art</span> Oil Painting, Blender 3D</p>
                    </div>
                </section>
                
                 <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Interests</h3>
                    <div className="text-sm text-slate-700">
                        <p>Scientific Visualization</p>
                        <p>Quantum Information</p>
                        <p>Digital Art</p>
                    </div>
                </section>
            </div>

            {/* Right Column (Experience, etc) */}
            <div className="md:col-span-3 space-y-8">
                
                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Research Experience</h3>
                    
                    <div className="mb-6">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">Graduate Research Assistant</h4>
                            <span className="text-sm text-slate-500">2022 - Present</span>
                        </div>
                        <div className="text-blue-800 font-medium text-sm mb-2">College of Optics and Photonics (CREOL)</div>
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                            <li>Design and simulation of lithium niobate nanophotonic waveguides using Lumerical FDTD.</li>
                            <li>Achieved 95% coupling efficiency in simulation by optimizing taper geometry.</li>
                            <li>Maintained Class 4 ultrafast laser systems and conducted non-linear optical measurements.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">Undergraduate Researcher</h4>
                            <span className="text-sm text-slate-500">2020 - 2022</span>
                        </div>
                        <div className="text-blue-800 font-medium text-sm mb-2">Laser Plasma Laboratory</div>
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                            <li>Assisted in the setup of a pump-probe experiment for plasma density characterization.</li>
                            <li>Developed Python scripts for automated data acquisition and analysis.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Selected Publications</h3>
                    <div className="text-sm text-slate-700 space-y-3">
                         <p>
                            <span className="font-bold">D. Banerjee</span>, J. Smith, "Optimized coupling in thin-film lithium niobate," 
                            <span className="italic"> Optics Express</span>, vol. 30, no. 12, 2024.
                         </p>
                         <p>
                            A. Researcher, <span className="font-bold">D. Banerjee</span>, "Non-linear effects in ring resonators," 
                            <span className="italic"> Proc. SPIE</span>, 2023.
                         </p>
                    </div>
                </section>

                 <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Awards</h3>
                    <div className="text-sm text-slate-700 space-y-2">
                         <div className="flex justify-between">
                             <span>SPIE Optics and Photonics Education Scholarship</span>
                             <span className="text-slate-500">2024</span>
                         </div>
                         <div className="flex justify-between">
                             <span>Dean's List (All Semesters)</span>
                             <span className="text-slate-500">2018-2022</span>
                         </div>
                    </div>
                </section>

            </div>
        </div>

      </div>
    </div>
  );
};
