import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { Research } from '@/app/pages/Research';
import { Portfolio } from '@/app/pages/Portfolio';
import { Blog } from '@/app/pages/Blog';
import { BlogPost } from '@/app/pages/BlogPost';
import { HumbleBrag } from '@/app/pages/HumbleBrag';
import { CV } from '@/app/pages/CV';

export default function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="research" element={<Research />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="achievements" element={<HumbleBrag />} />
          <Route path="cv" element={<CV />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </Router>
  );
}
