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
    throw new Error(`API error: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getPosts: () => fetchFromAPI('/blog'),
  getPost: (id: string) => fetchFromAPI(`/blog/${id}`),
  createPost: (post: any) => fetchFromAPI('/blog', {
    method: 'POST',
    body: JSON.stringify(post),
  }),
  getPapers: () => fetchFromAPI('/research'),
  createPaper: (paper: any) => fetchFromAPI('/research', {
    method: 'POST',
    body: JSON.stringify(paper),
  }),
  getAchievements: () => fetchFromAPI('/achievements'),
  createAchievement: (item: any) => fetchFromAPI('/achievements', {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  seed: () => fetchFromAPI('/seed', { method: 'POST' }),
};
