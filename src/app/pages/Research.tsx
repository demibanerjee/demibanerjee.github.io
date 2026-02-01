import React, { useState, useEffect } from 'react';
import { Book, CheckCircle, Clock, FileText, ExternalLink, Plus, X } from 'lucide-react';
import { Paper } from '@/data/mockData';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Research = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Reading' | 'Completed' | 'To Read'>('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newPaper, setNewPaper] = useState<Partial<Paper>>({
    title: '', authors: '', journal: '', year: new Date().getFullYear().toString(), status: 'To Read', notes: ''
  });

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    try {
      const data = await api.getPapers();
      setPapers(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Failed to load papers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaper.title) return;
    try {
      await api.createPaper(newPaper);
      setIsAdding(false);
      setNewPaper({ title: '', authors: '', journal: '', year: new Date().getFullYear().toString(), status: 'To Read', notes: '' });
      loadPapers();
    } catch (error) {
      console.error("Failed to add paper", error);
    }
  };

  const filteredPapers = filter === 'All' 
    ? papers 
    : papers.filter(p => p.status === filter);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Research Objectives</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            My current focus is on developing high-efficiency photonic integrated circuits for 
            quantum computing applications. I am particularly interested in minimizing loss 
            in lithium niobate waveguides.
          </p>
        </div>

        {/* Current Projects / Objectives Grid (Static for now as requested primarily for papers/blog) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">1. Waveguide Optimization</h3>
            <p className="text-slate-600 mb-4">
              Simulating various geometries to reduce scattering loss at interfaces. 
              Using FDTD methods to model propagation.
            </p>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-3/4"></div>
            </div>
            <p className="text-sm text-slate-500 mt-2">75% Completed</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">2. Non-linear Characterization</h3>
            <p className="text-slate-600 mb-4">
              Experimental setup for measuring second harmonic generation efficiency 
              in fabricated devices.
            </p>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-1/4"></div>
            </div>
            <p className="text-sm text-slate-500 mt-2">25% Completed</p>
          </div>
        </div>

        {/* Reading List Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-slate-900">Reading List</h2>
                <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                  title="Add New Paper"
                >
                  {isAdding ? <X size={16} /> : <Plus size={16} />}
                </button>
              </div>
              <p className="text-slate-500 mt-1">Papers I'm currently processing or have finished.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
              {(['All', 'Reading', 'Completed', 'To Read'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    filter === f 
                      ? "bg-blue-100 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddPaper}
                className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="col-span-2">
                  <h3 className="text-lg font-bold mb-2">Add New Paper</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input type="text" required value={newPaper.title} onChange={e => setNewPaper({...newPaper, title: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Authors</label>
                  <input type="text" value={newPaper.authors} onChange={e => setNewPaper({...newPaper, authors: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Journal</label>
                  <input type="text" value={newPaper.journal} onChange={e => setNewPaper({...newPaper, journal: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Year</label>
                  <input type="text" value={newPaper.year} onChange={e => setNewPaper({...newPaper, year: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Status</label>
                  <select value={newPaper.status} onChange={e => setNewPaper({...newPaper, status: e.target.value as any})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm border p-2">
                    <option value="To Read">To Read</option>
                    <option value="Reading">Reading</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Notes</label>
                  <input type="text" value={newPaper.notes} onChange={e => setNewPaper({...newPaper, notes: e.target.value})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm border p-2" />
                </div>
                <div className="col-span-2 flex justify-end">
                   <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Paper</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {loading ? (
             <div className="text-center py-20 text-slate-500">Loading papers...</div>
          ) : papers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 mb-4">No papers found.</p>
              <button 
                onClick={async () => {
                  await api.seed();
                  loadPapers();
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200"
              >
                Seed Sample Data
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPapers.map((paper, idx) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                          paper.status === 'Reading' && "bg-blue-50 text-blue-700 border-blue-200",
                          paper.status === 'Completed' && "bg-green-50 text-green-700 border-green-200",
                          paper.status === 'To Read' && "bg-slate-50 text-slate-700 border-slate-200"
                        )}>
                          {paper.status}
                        </span>
                        <span className="text-sm text-slate-500">{paper.year} • {paper.journal}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{paper.title}</h3>
                      <p className="text-slate-600 text-sm mb-3">{paper.authors}</p>
                      
                      {paper.notes && (
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-amber-900">
                          <span className="font-semibold mr-1">Note:</span> {paper.notes}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex flex-col gap-2">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors p-2" title="View Link">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
