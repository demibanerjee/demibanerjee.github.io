import { projectId, publicAnonKey } from '/utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-96b5a187`;

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getPosts: () => fetchFromAPI('/blog'),
  getPost: (id: string) => fetchFromAPI(`/blog/${id}`),
  createPost: (post: any, uid: string) => fetchFromAPI('/blog', {
    method: 'POST',
    headers: { 'x-admin-uid': uid },
    body: JSON.stringify(post),
  }),
  getPapers: () => fetchFromAPI('/research'),
  createPaper: (paper: any, uid: string) => fetchFromAPI('/research', {
    method: 'POST',
    headers: { 'x-admin-uid': uid },
    body: JSON.stringify(paper),
  }),
  getPortfolio: () => fetchFromAPI('/portfolio'),
  createPortfolioItem: (item: any, uid: string) => fetchFromAPI('/portfolio', {
    method: 'POST',
    headers: { 'x-admin-uid': uid },
    body: JSON.stringify(item),
  }),
  getAchievements: () => fetchFromAPI('/achievements'),
  createAchievement: (item: any, uid: string) => fetchFromAPI('/achievements', {
    method: 'POST',
    headers: { 'x-admin-uid': uid },
    body: JSON.stringify(item),
  }),
  verifyUid: (uid: string) => fetchFromAPI('/verify', {
    method: 'POST',
    body: JSON.stringify({ uid }),
  }),
  seed: () => fetchFromAPI('/seed', { method: 'POST' }),
};
