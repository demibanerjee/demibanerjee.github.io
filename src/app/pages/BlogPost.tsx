import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { api } from '@/lib/api';
import { BlogPost as IBlogPost } from '@/data/mockData';

export const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadPost(id);
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setPost(await api.getPost(postId));
    } catch (error) {
      console.error('Failed to load post', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dynamic-surface"><div className="text-slate-500">Loading note…</div></div>;
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center dynamic-surface">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900">Note not found</h2>
          <Link to="/lab-notes" className="accent-text font-bold mt-4 block">Back to Lab Notes</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="dynamic-surface min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/lab-notes" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Lab Notes
        </Link>

        <header className="mb-10">
          <div className="accent-text text-xs font-extrabold uppercase tracking-[.16em] mb-5">Lab Note</div>
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center"><Calendar size={16} className="mr-2" />{post.date}</span>
            <span className="flex items-center"><Clock size={16} className="mr-2" />{post.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">{post.title}</h1>
        </header>

        <div className="bg-white border border-slate-200 rounded-2xl p-7 md:p-9 shadow-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
};
