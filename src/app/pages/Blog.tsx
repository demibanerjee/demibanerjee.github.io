import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Plus, X, Sparkles } from 'lucide-react';
import { BlogPost } from '@/data/mockData';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from '@/app/components/AuthModal';
import { toast } from 'sonner';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [verifiedUid, setVerifiedUid] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', excerpt: '', content: '', readTime: '5 min read' });

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
      const data = await api.getPosts();
      setPosts(data.length > 0 ? data : []);
    } catch (error) {
      console.error('Failed to load posts', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt || !verifiedUid) return;
    try {
      const post = {
        ...newPost,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        source: 'Demi',
      };
      await api.createPost(post, verifiedUid);
      setIsAdding(false);
      setNewPost({ title: '', excerpt: '', content: '', readTime: '5 min read' });
      await loadPosts();
      toast.success('Lab note published');
    } catch (error: any) {
      console.error('Failed to create post', error);
      if (error.message.includes('Unauthorized')) {
        toast.error('Invalid UID. Access denied.');
        setVerifiedUid(null);
      } else toast.error('Failed to publish post');
    }
  };

  return (
    <div className="dynamic-surface min-h-screen">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />

      <section className="dynamic-dark text-white py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="accent-light-text text-xs font-extrabold uppercase tracking-[.18em] mb-3">Lab Notes</div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.02]">Thinking in public, without pretending every thought is finished.</h1>
              <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">
                Notes from experiments, papers, derivations and things I am learning. Some are written directly by me; agent-assisted drafts remain grounded in work I actually did and follow my publishing rules.
              </p>
            </div>
            <button onClick={handleAddClick} className="shrink-0 w-11 h-11 rounded-full dynamic-chip flex items-center justify-center" title="Write a new note">
              {isAdding ? <X size={19} /> : <Plus size={19} />}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            {isAdding && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 mb-8 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-5"><Sparkles size={17} className="accent-text" /><h3 className="font-bold">Write a new lab note</h3></div>
                <div className="space-y-4">
                  <input type="text" value={newPost.title} onChange={(e)=>setNewPost({...newPost,title:e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5" placeholder="Title" />
                  <textarea value={newPost.excerpt} onChange={(e)=>setNewPost({...newPost,excerpt:e.target.value})} rows={2} className="w-full rounded-lg border border-slate-300 p-2.5" placeholder="Brief summary" />
                  <textarea value={newPost.content} onChange={(e)=>setNewPost({...newPost,content:e.target.value})} rows={8} className="w-full rounded-lg border border-slate-300 p-2.5" placeholder="Full note" />
                  <div className="flex justify-end"><button type="submit" className="px-5 py-2.5 rounded-full text-white font-bold text-sm accent-gradient">Publish</button></div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading notes…</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500">No lab notes published yet.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map((post) => {
                const source = (post as any).source || 'Demi';
                const agent = source.toLowerCase().includes('agent');
                return (
                  <article key={post.id} className="dynamic-card bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold uppercase tracking-[.12em] px-2.5 py-1 rounded-full ${agent ? 'bg-purple-50 text-purple-700' : 'dynamic-chip'}`}>
                          {agent ? 'Agent-assisted' : 'Demi'}
                        </span>
                        <time className="text-xs text-slate-400">{post.date}</time>
                      </div>
                      <span className="flex items-center text-xs text-slate-400"><Clock size={13} className="mr-1" />{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                      <Link to={`/lab-notes/${post.id}`} className="hover:text-slate-600 transition-colors">{post.title}</Link>
                    </h2>
                    <p className="text-slate-600 mt-3 leading-relaxed">{post.excerpt}</p>
                    <Link to={`/lab-notes/${post.id}`} className="inline-flex items-center mt-5 accent-text font-bold text-sm">Read note <ArrowRight size={15} className="ml-2" /></Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
