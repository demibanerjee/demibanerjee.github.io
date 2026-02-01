import React, { useState, useEffect } from 'react';
import { Trophy, Star, BookOpen, Medal, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  date: string;
  category: 'Award' | 'Publication' | 'Talk' | 'Grant';
  description: string;
}

export const HumbleBrag = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<Achievement>>({
    title: '', date: new Date().getFullYear().toString(), category: 'Award', description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getAchievements();
      setItems(data.length > 0 ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;
    try {
      await api.createAchievement(newItem);
      setIsAdding(false);
      setNewItem({ title: '', date: new Date().getFullYear().toString(), category: 'Award', description: '' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600"
          >
            <Trophy size={32} />
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Humble Brag</h1>
          <p className="text-xl text-slate-600">
             A collection of recognitions, publications, and milestones in my academic journey.
          </p>
          <div className="mt-6 flex justify-center">
            <button 
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors text-sm font-medium"
            >
                {isAdding ? <X size={16} /> : <Plus size={16} />} 
                {isAdding ? "Close" : "Add New Achievement"}
            </button>
          </div>
        </div>

        <AnimatePresence>
            {isAdding && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAdd}
                    className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8 overflow-hidden"
                >
                    <h3 className="font-bold mb-4">Add Achievement</h3>
                    <div className="grid gap-4">
                        <input 
                            placeholder="Title (e.g., Best Paper Award)" 
                            value={newItem.title} 
                            onChange={e => setNewItem({...newItem, title: e.target.value})}
                            className="w-full border p-2 rounded"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                placeholder="Date (e.g., 2024)" 
                                value={newItem.date} 
                                onChange={e => setNewItem({...newItem, date: e.target.value})}
                                className="w-full border p-2 rounded"
                            />
                            <select 
                                value={newItem.category} 
                                onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                                className="w-full border p-2 rounded"
                            >
                                <option value="Award">Award</option>
                                <option value="Publication">Publication</option>
                                <option value="Talk">Talk</option>
                                <option value="Grant">Grant</option>
                            </select>
                        </div>
                        <textarea 
                            placeholder="Description" 
                            value={newItem.description} 
                            onChange={e => setNewItem({...newItem, description: e.target.value})}
                            className="w-full border p-2 rounded"
                            rows={3}
                        />
                        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Item</button>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>

        {loading ? (
            <div className="text-center text-slate-400 py-10">Loading accolades...</div>
        ) : items.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-slate-500 mb-4">No data found.</p>
                <button 
                  onClick={async () => { await api.seed(); loadData(); }}
                  className="px-4 py-2 bg-slate-200 rounded text-slate-700 text-sm"
                >
                    Seed Sample Data
                </button>
            </div>
        ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 space-y-12">
                {items.sort((a,b) => b.date.localeCompare(a.date)).map((item, idx) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8 md:pl-0"
                    >
                        <div className="md:flex items-center justify-between group">
                            <div className="hidden md:block w-[120px] text-right pr-8 text-slate-400 font-mono text-lg font-bold group-hover:text-blue-600 transition-colors">
                                {item.date}
                            </div>
                            
                            {/* Dot */}
                            <div className="absolute left-[-9px] top-1 md:left-auto md:right-auto md:top-auto w-4 h-4 rounded-full bg-white border-4 border-slate-300 group-hover:border-blue-500 transition-colors z-10 md:-translate-x-[2px]" style={{ left: 'calc(0% - 9px)' }}></div>
                            <div className="md:hidden absolute left-0 top-0 text-sm text-slate-400 font-bold mb-1 -mt-6">
                                {item.date}
                            </div>

                            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all relative">
                                <div className="absolute -left-2 top-6 w-2 h-4 bg-white hidden md:block" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                                    <span className={cn(
                                        "text-xs font-bold uppercase px-2 py-1 rounded-full",
                                        item.category === 'Award' && "bg-yellow-100 text-yellow-700",
                                        item.category === 'Publication' && "bg-blue-100 text-blue-700",
                                        item.category === 'Grant' && "bg-green-100 text-green-700",
                                        item.category === 'Talk' && "bg-purple-100 text-purple-700",
                                    )}>
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-slate-600">{item.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}

      </div>
    </div>
  );
};
