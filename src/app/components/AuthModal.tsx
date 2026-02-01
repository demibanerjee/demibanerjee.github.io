import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (uid: string) => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUid = uid.trim();
    if (!cleanUid) {
        setError('Please enter the UID');
        return;
    }

    setVerifying(true);
    setError('');

    try {
      await api.verifyUid(cleanUid);
      // If we get here without error, it's valid
      onSuccess(cleanUid);
      setUid('');
    } catch (err) {
      setError('Invalid UID. Access denied.');
    } finally {
      setVerifying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-4">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Admin Access</h3>
            <p className="text-sm text-slate-500 text-center mt-2">
              Enter your unique ID to verify you are the owner.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={uid}
              onChange={e => {
                setUid(e.target.value);
                setError('');
              }}
              placeholder="Enter UID..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              autoFocus
              disabled={verifying}
            />
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                disabled={verifying}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={verifying}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {verifying ? <Loader2 className="animate-spin" size={18} /> : 'Verify'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
