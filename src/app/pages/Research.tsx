import React, { useEffect, useState } from 'react';
import { ExternalLink, Plus, X, Radar, Newspaper, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Paper } from '@/data/mockData';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from '@/app/components/AuthModal';
import { toast } from 'sonner';

export const Research = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Reading' | 'Completed' | 'To Read'>('All');
  const [isAdding, setIsAdding] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [verifiedUid, setVerifiedUid] = useState<string | null>(null);
  const [newPaper, setNewPaper] = useState<Partial<Paper>>({
    title: '', authors: '', journal: '', year: new Date().getFullYear().toString(), status: 'To Read', notes: ''
  });

  const selectedWork = [
    {
      type: 'Journal article',
      title: 'Long-range multipartite entanglement and quantum correlations in a multi-frequency comb system',
      meta: 'S. Pontula, D. Banerjee, M. Soljačić, Y. Salamin · multimode correlations across frequency-comb sectors.',
      status: 'Accepted · 2026',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      type: 'Manuscript',
      title: 'Hybrid odd–even supermode solitons induced by competing nonlocal nonlinearities',
      meta: 'Nonlinear supermode dynamics and spatially structured states under competing interactions.',
      status: 'In progress',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      type: 'Research program',
      title: 'Programmable multimode quantum correlations across multiple frequency combs',
      meta: 'Dissipation and pump-profile engineering for programmable multimode quantum correlations.',
      status: 'Active',
      statusClass: 'bg-slate-100 text-slate-700 border-slate-200',
    },
  ];

  useEffect(() => { loadPapers(); }, []);

  const loadPapers = async () => {
    try {
      const data = await api.getPapers();
      setPapers(data.length > 0 ? data : []);
    } catch (error) {
      console.error('Failed to load papers', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    if (verifiedUid) setIsAdding(!isAdding);
    else setIsAuthOpen(true);
  };

  const handleAuthSuccess = (uid: string) => {
    setVerifiedUid(uid);
    setIsAuthOpen(false);
    setIsAdding(true);
    toast.success('Identity verified for session');
  };

  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaper.title || !verifiedUid) return;
    try {
      await api.createPaper(newPaper, verifiedUid);
      setIsAdding(false);
      setNewPaper({ title: '', authors: '', journal: '', year: new Date().getFullYear().toString(), status: 'To Read', notes: '' });
      await loadPapers();
      toast.success('Paper added successfully');
    } catch (error: any) {
      console.error('Failed to add paper', error);
      if (error.message.includes('Unauthorized')) {
        toast.error('Invalid UID. Access denied.');
        setVerifiedUid(null);
      } else toast.error('Failed to add paper');
    }
  };

  const filteredPapers = filter === 'All' ? papers : papers.filter((p) => p.status === filter);

  return (
    <div className="dynamic-surface min-h-screen">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />

      <section className="dynamic-dark text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="accent-light-text text-xs font-extrabold uppercase tracking-[.18em] mb-3">Research</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight max-w-4xl leading-[1.02]">Light at the quantum limit, across many modes.</h1>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">
            My work lives around nonlinear interactions, multimode quantum correlations, squeezing and integrated photonic systems — with experiments and theory constantly informing one another.
          </p>

          <div className="grid md:grid-cols-4 gap-3 mt-10">
            {[
              ['Multimode quantum optics','Squeezing, entanglement and correlations across synthetic frequency dimensions.'],
              ['Nonlinear interactions','χ² / χ³ processes, cascaded mixing, Kerr physics and nonlinear cavities.'],
              ['Integrated photonics','Compact platforms for controlling frequency, loss, mode structure and quantum states.'],
              ['Ultrafast experiments','Pulse characterization, pump–probe measurements and nonlinear material response.'],
            ].map(([title,text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="accent-text text-xs font-extrabold uppercase tracking-[.16em] mb-2">My work</div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">Selected papers & projects</h2>
          <p className="text-slate-500 mt-3 max-w-3xl">This layer is curated. Automated research tracking stays separate from the authoritative record of my own work.</p>

          <div className="space-y-4 mt-8">
            {selectedWork.map((work) => (
              <div key={work.title} className="dynamic-card grid md:grid-cols-[130px_1fr_auto] gap-5 items-start bg-white border border-slate-200 rounded-2xl p-6">
                <div className="accent-text text-[10px] font-extrabold uppercase tracking-[.13em]">{work.type}</div>
                <div>
                  <h3 className="font-bold text-slate-900">{work.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{work.meta}</p>
                </div>
                <span className={cn('text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap', work.statusClass)}>{work.status}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.18fr_.82fr] gap-6 mt-10">
            <div className="dynamic-card bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2"><Radar size={18} className="accent-text" /><h3 className="font-bold">Paper Radar</h3></div>
                <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-400">Research Radar</span>
              </div>
              <div className="border border-dashed border-slate-300 rounded-xl p-7 text-center bg-slate-50 text-sm text-slate-500 leading-relaxed">
                Verified high-relevance papers will appear here automatically with <strong>what changed · why it matters · relevance to my work</strong>.
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['quantum combs','squeezing','polarization','χ² / χ³','integrated photonics','ultrafast'].map((t) => <span key={t} className="dynamic-chip px-2.5 py-1 rounded-full text-[10px] font-bold">{t}</span>)}
                </div>
              </div>
            </div>

            <div className="dynamic-card bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5"><Newspaper size={18} className="accent-text" /><h3 className="font-bold">World Breakthroughs</h3></div>
              <div className="border border-dashed border-slate-300 rounded-xl p-7 text-center bg-slate-50 text-sm text-slate-500 leading-relaxed">
                A filtered science feed for unusually important advances in quantum science, photonics, nonlinear optics and adjacent technologies — not generic hype.
              </div>
            </div>
          </div>

          <div className="dynamic-card mt-10 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2"><FileText size={18} className="accent-text" /><h3 className="font-bold text-lg">Curriculum Vitae</h3></div>
              <p className="text-sm text-slate-500 mt-2 max-w-3xl">Education, research experience, publications, awards, technical skills and creative work.</p>
            </div>
            <Link to="/cv" className="inline-flex justify-center px-5 py-2.5 rounded-full text-white text-sm font-bold accent-gradient">Open full CV →</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
            <div>
              <div className="accent-text text-xs font-extrabold uppercase tracking-[.16em] mb-2">Personal paper tracker</div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Reading list</h2>
              <p className="text-sm text-slate-500 mt-2">Papers I’m reading, have finished, or want to return to.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['All','Reading','Completed','To Read'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-2 rounded-full text-xs font-bold border transition-all', filter === f ? 'text-white accent-gradient border-transparent' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50')}>{f}</button>
              ))}
              <button onClick={handleAddClick} className="w-9 h-9 rounded-full dynamic-chip flex items-center justify-center" title="Add paper">{isAdding ? <X size={16}/> : <Plus size={16}/>}</button>
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} onSubmit={handleAddPaper} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-7 grid md:grid-cols-2 gap-4 overflow-hidden">
                <input required placeholder="Title" value={newPaper.title} onChange={(e)=>setNewPaper({...newPaper,title:e.target.value})} className="border border-slate-300 rounded-lg p-2.5 bg-white" />
                <input placeholder="Authors" value={newPaper.authors} onChange={(e)=>setNewPaper({...newPaper,authors:e.target.value})} className="border border-slate-300 rounded-lg p-2.5 bg-white" />
                <input placeholder="Journal" value={newPaper.journal} onChange={(e)=>setNewPaper({...newPaper,journal:e.target.value})} className="border border-slate-300 rounded-lg p-2.5 bg-white" />
                <input placeholder="Year" value={newPaper.year} onChange={(e)=>setNewPaper({...newPaper,year:e.target.value})} className="border border-slate-300 rounded-lg p-2.5 bg-white" />
                <select value={newPaper.status} onChange={(e)=>setNewPaper({...newPaper,status:e.target.value as any})} className="border border-slate-300 rounded-lg p-2.5 bg-white">
                  <option>To Read</option><option>Reading</option><option>Completed</option>
                </select>
                <input placeholder="Notes" value={newPaper.notes} onChange={(e)=>setNewPaper({...newPaper,notes:e.target.value})} className="border border-slate-300 rounded-lg p-2.5 bg-white" />
                <div className="md:col-span-2 flex justify-end"><button type="submit" className="px-5 py-2.5 rounded-full text-white text-sm font-bold accent-gradient">Add paper</button></div>
              </motion.form>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="text-center py-14 text-slate-400">Loading papers…</div>
          ) : filteredPapers.length === 0 ? (
            <div className="text-center py-14 border border-dashed border-slate-300 rounded-2xl text-slate-400">No papers in this view yet.</div>
          ) : (
            <div className="space-y-3">
              {filteredPapers.map((paper) => (
                <div key={paper.id} className="dynamic-card bg-slate-50 border border-slate-200 rounded-2xl p-5 flex gap-4 justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[.12em] accent-text">{paper.status} · {paper.year}</div>
                    <h3 className="font-bold mt-2">{paper.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{paper.authors}</p>
                    {paper.notes && <p className="text-sm text-slate-600 mt-3">{paper.notes}</p>}
                  </div>
                  <ExternalLink size={18} className="text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
