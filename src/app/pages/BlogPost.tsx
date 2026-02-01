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
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      const data = await api.getPost(postId);
      setPost(data);
    } catch (error) {
      console.error("Failed to load post", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Post not found</h2>
          <Link to="/blog" className="text-blue-600 hover:underline mt-4 block">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Blog
        </Link>
        
        <header className="mb-10">
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center"><Calendar size={16} className="mr-2" /> {post.date}</span>
            <span className="flex items-center"><Clock size={16} className="mr-2" /> {post.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
        </header>
        
        <div className="prose prose-lg prose-slate max-w-none whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
};
