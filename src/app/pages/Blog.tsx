import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Plus, X } from 'lucide-react';
import { BlogPost } from '@/data/mockData';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', excerpt: '', content: '', readTime: '5 min read' });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.getPosts();
      // Sort by date if possible, but for now just use what we get
      setPosts(data.length > 0 ? data : []); 
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt) return;

    try {
      const post = {
        ...newPost,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      await api.createPost(post);
      setIsAdding(false);
      setNewPost({ title: '', excerpt: '', content: '', readTime: '5 min read' });
      loadPosts();
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center relative">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Lab Notes</h1>
          <p className="text-xl text-slate-600">
            Thoughts on physics, research struggles, and the occasional eureka moment.
          </p>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="absolute right-0 top-0 p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            title="Add New Post"
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
              className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8 overflow-hidden"
            >
              <h3 className="text-lg font-bold mb-4">Write New Post</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input 
                    type="text" 
                    value={newPost.title}
                    onChange={e => setNewPost({...newPost, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Excerpt</label>
                  <textarea 
                    value={newPost.excerpt}
                    onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="Brief summary..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Content</label>
                  <textarea 
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="Full content..."
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Publish Post
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 mb-4">No posts found yet.</p>
            <button 
              onClick={async () => {
                await api.seed();
                loadPosts();
              }}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200"
            >
              Seed Sample Data
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  <Link to={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700"
                >
                  Read Article <ArrowRight size={16} className="ml-2" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
