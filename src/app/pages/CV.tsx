import React from 'react';
import { Download, Mail, MapPin, Globe, Linkedin } from 'lucide-react';
import { cvData } from '@/data/cvData';

export const CV = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-2xl bg-white border border-slate-200 p-8 md:p-16 min-h-[1100px] relative">
        
        {/* Download Button (Fixed on mobile, absolute on desktop) */}
        <div className="absolute top-4 right-4 print:hidden">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 shadow-sm transition-colors" onClick={() => window.print()}>
            <Download size={16} /> <span className="text-sm font-semibold">Print / PDF</span>
          </button>
        </div>

        {/* Header */}
        <header className="border-b-2 border-slate-900 pb-8 mb-8">
          <h1 className="text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">{cvData.header.name}</h1>
          <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
            <a href={`mailto:${cvData.header.email}`} className="flex items-center gap-1 hover:text-red-600"><Mail size={14} /> {cvData.header.email}</a>
            <span className="flex items-center gap-1"><MapPin size={14} /> {cvData.header.location}</span>
            <span className="flex items-center gap-1"><Globe size={14} /> {cvData.header.website}</span>
            <a href={cvData.header.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-red-600"><Linkedin size={14} /> {cvData.header.linkedin}</a>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Left Column (Skills, etc) */}
            <div className="md:col-span-1 space-y-8">
                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Education</h3>
                    {cvData.education.map((edu, idx) => (
                        <div key={idx} className="mb-4">
                            <div className="font-bold text-slate-900">{edu.degree}</div>
                            <div className="text-xs text-slate-600">{edu.institution}</div>
                            <div className="text-xs text-slate-500">{edu.year}</div>
                        </div>
                    ))}
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Skills</h3>
                    <div className="space-y-3 text-sm text-slate-700">
                        {Object.entries(cvData.skills).map(([category, items]) => (
                            <div key={category}>
                                <span className="font-semibold block text-xs text-slate-500 uppercase mb-1">{category}</span>
                                <p className="leading-tight">{items.join(", ")}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                 <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Interests</h3>
                    <div className="text-sm text-slate-700 space-y-1">
                        {cvData.interests.map((interest, idx) => (
                            <p key={idx}>{interest}</p>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column (Experience, etc) */}
            <div className="md:col-span-3 space-y-8">
                
                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Research Experience</h3>
                    
                    {cvData.researchExperience.map((exp, idx) => (
                        <div key={idx} className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-slate-900 text-lg">{exp.role}</h4>
                                <span className="text-sm text-slate-500">{exp.period}</span>
                            </div>
                            <div className="text-red-800 font-medium text-sm mb-2">{exp.institution}</div>
                            <p className="text-sm text-slate-600 mb-2 italic">{exp.description}</p>
                            <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                                {exp.points.map((point, pIdx) => (
                                    <li key={pIdx}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Selected Publications</h3>
                    <div className="text-sm text-slate-700 space-y-3">
                         {cvData.publications.map((pub, idx) => (
                             <p key={idx}>
                                <span className="font-semibold">{pub.authors}</span>, "{pub.title}," 
                                <span className="italic"> {pub.journal}</span>, {pub.details}.
                             </p>
                         ))}
                    </div>
                </section>

                 <section>
                    <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">Awards</h3>
                    <div className="text-sm text-slate-700 space-y-2">
                         {cvData.awards.map((award, idx) => (
                             <div key={idx} className="flex justify-between">
                                 <span>{award.title}</span>
                                 <span className="text-slate-500">{award.year}</span>
                             </div>
                         ))}
                    </div>
                </section>

            </div>
        </div>

      </div>
    </div>
  );
};
