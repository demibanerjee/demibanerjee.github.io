import React, { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Plus } from 'lucide-react';
import { PortfolioItem } from '@/data/mockData';
import { api } from '@/lib/api';
import { AuthModal } from '@/app/components/AuthModal';
import { toast } from 'sonner';

export const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [verifiedUid, setVerifiedUid] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '', description: '', type: 'painting', imageUrl: ''
  });

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const data = await api.getPortfolio();
      setItems(data.length > 0 ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    if (verifiedUid) {
      setIsAdding(!isAdding);
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleAuthSuccess = (uid: string) => {
    setVerifiedUid(uid);
    setIsAuthOpen(false);
    setIsAdding(true);
    toast.success("Identity verified for session");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.imageUrl || !verifiedUid) return;

    try {
      await api.createPortfolioItem(newItem, verifiedUid);
      setIsAdding(false);
      setNewItem({ title: '', description: '', type: 'painting', imageUrl: '' });
      loadPortfolio();
      toast.success("Artwork added successfully");
    } catch (error: any) {
      if (error.message.includes("Unauthorized")) {
         toast.error("Invalid UID. Access denied.");
         setVerifiedUid(null);
      } else {
         toast.error("Failed to add artwork");
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Creative Portfolio</h1>
          <p className="text-xl text-slate-600">
            A collection of animations and paintings exploring the aesthetics of physics.
          </p>
          <button 
            onClick={handleAddClick}
            className="absolute right-0 top-0 p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
            title="Add Artwork"
          >
            {isAdding ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>

        <AnimatePresence>
            {isAdding && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8 overflow-hidden max-w-2xl mx-auto"
              >
                <h3 className="font-bold mb-4">Add New Artwork</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input className="w-full border p-2 rounded" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select className="w-full border p-2 rounded" value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value as any})}>
                      <option value="painting">Painting</option>
                      <option value="animation">Animation</option>
                    </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1">Image URL</label>
                     <input className="w-full border p-2 rounded" value={newItem.imageUrl} onChange={e => setNewItem({...newItem, imageUrl: e.target.value})} placeholder="https://..." />
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1">Description</label>
                     <textarea className="w-full border p-2 rounded" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} rows={3} />
                  </div>
                  <button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Add Artwork</button>
                </div>
              </motion.form>
            )}
        </AnimatePresence>

        {loading ? (
             <div className="text-center py-20 text-slate-500">Loading gallery...</div>
        ) : items.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
                <p>No artworks uploaded yet.</p>
            </div>
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter="24px">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">{item.type}</span>
                    <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {/* Modal for viewing details */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
              <motion.div
                layoutId={selectedItem.id}
                className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="md:w-2/3 bg-black flex items-center justify-center">
                  <img src={selectedItem.imageUrl} alt={selectedItem.title} className="max-w-full max-h-[60vh] md:max-h-full object-contain" />
                </div>
                <div className="md:w-1/3 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded-full">
                      {selectedItem.type}
                    </span>
                    <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-900">
                      <X size={24} />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedItem.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{selectedItem.description}</p>
                  <div className="mt-auto">
                    <p className="text-xs text-slate-400">Created 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
