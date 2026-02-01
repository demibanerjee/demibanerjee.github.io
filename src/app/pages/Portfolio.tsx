import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/data/mockData';

export const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Creative Portfolio</h1>
          <p className="text-xl text-slate-600">
            A collection of animations and paintings exploring the aesthetics of physics.
          </p>
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
          <Masonry gutter="24px">
            {PORTFOLIO_ITEMS.map((item) => (
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
