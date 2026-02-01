import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./db.tsx";
import { z } from "npm:zod";

const app = new Hono();
const ADMIN_UID = "f1da5e4f-5b39-4b35-b94b-a22b7c6cabbb"; // Updated secure UID

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "x-admin-uid"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware to check UID for POST requests
const checkAuth = async (c: any, next: any) => {
  if (c.req.method === 'POST') {
    // Skip auth for seed, health, verify, or if specifically excluded
    if (c.req.path.includes('/seed') || c.req.path.includes('/health') || c.req.path.includes('/verify')) {
      return await next();
    }

    const uid = c.req.header('x-admin-uid');
    // Compare trimmed UID to avoid whitespace issues
    if (!uid || uid.trim() !== ADMIN_UID) {
      return c.json({ error: "Unauthorized: Invalid UID" }, 401);
    }
  }
  await next();
};

app.use('/make-server-96b5a187/*', checkAuth);


// Health check endpoint
app.get("/make-server-96b5a187/health", (c) => {
  return c.json({ status: "ok" });
});

// Verify UID endpoint
app.post("/make-server-96b5a187/verify", async (c) => {
  try {
    const body = await c.req.json();
    const uid = body.uid;
    
    if (!uid || uid.trim() !== ADMIN_UID) {
      return c.json({ valid: false }, 401);
    }
    
    return c.json({ valid: true });
  } catch (error) {
    return c.json({ error: "Verification failed" }, 500);
  }
});

// --- BLOG ROUTES ---

app.get("/make-server-96b5a187/blog", async (c) => {
  try {
    const posts = await kv.getByPrefix("blog:");
    return c.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

app.get("/make-server-96b5a187/blog/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const post = await kv.get(`blog:${id}`);
    if (!post) return c.json({ error: "Post not found" }, 404);
    return c.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return c.json({ error: "Failed to fetch post" }, 500);
  }
});

app.post("/make-server-96b5a187/blog", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const post = { ...body, id };
    
    await kv.set(`blog:${id}`, post);
    return c.json(post, 201);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

// --- RESEARCH ROUTES ---

app.get("/make-server-96b5a187/research", async (c) => {
  try {
    const papers = await kv.getByPrefix("research:");
    return c.json(papers);
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return c.json({ error: "Failed to fetch papers" }, 500);
  }
});

app.post("/make-server-96b5a187/research", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const paper = { ...body, id };
    
    await kv.set(`research:${id}`, paper);
    return c.json(paper, 201);
  } catch (error) {
    console.error("Error creating research paper:", error);
    return c.json({ error: "Failed to create paper" }, 500);
  }
});

// --- PORTFOLIO ROUTES ---

app.get("/make-server-96b5a187/portfolio", async (c) => {
  try {
    const items = await kv.getByPrefix("portfolio:");
    return c.json(items);
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return c.json({ error: "Failed to fetch portfolio" }, 500);
  }
});

app.post("/make-server-96b5a187/portfolio", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const item = { ...body, id };
    
    await kv.set(`portfolio:${id}`, item);
    return c.json(item, 201);
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return c.json({ error: "Failed to create portfolio item" }, 500);
  }
});

// --- ACHIEVEMENTS ROUTES (HUMBLE BRAG) ---

app.get("/make-server-96b5a187/achievements", async (c) => {
  try {
    const items = await kv.getByPrefix("achievement:");
    return c.json(items);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return c.json({ error: "Failed to fetch achievements" }, 500);
  }
});

app.post("/make-server-96b5a187/achievements", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const item = { ...body, id };
    
    await kv.set(`achievement:${id}`, item);
    return c.json(item, 201);
  } catch (error) {
    console.error("Error creating achievement:", error);
    return c.json({ error: "Failed to create achievement" }, 500);
  }
});

// --- SEED ROUTE ---
app.post("/make-server-96b5a187/seed", async (c) => {
  try {
    const mockPosts = [
      {
        id: "1",
        title: "The Future of Photonics in Quantum Computing",
        excerpt: "Exploring how optical interconnects could solve the bottleneck in quantum information processing.",
        content: "Full content would go here...",
        date: "Oct 12, 2025",
        readTime: "5 min read"
      },
      {
        id: "2",
        title: "A Week in the Optics Lab: Laser Calibration Woes",
        excerpt: "Why is it that the moment you need the laser to be stable, the HVAC kicks in?",
        content: "Full content would go here...",
        date: "Sep 28, 2025",
        readTime: "3 min read"
      },
      {
        id: "3",
        title: "Understanding Non-linear Optics for Beginners",
        excerpt: "Breaking down second-harmonic generation without the heavy math.",
        content: "Full content would go here...",
        date: "Aug 15, 2025",
        readTime: "8 min read"
      }
    ];

    const mockPapers = [
      {
        id: "1",
        title: "Metasurface holograms for visible light",
        authors: "Zheng et al.",
        journal: "Nature Nanotechnology",
        year: "2015",
        status: "Reading",
        notes: "Interesting approach to phase modulation."
      },
      {
        id: "2",
        title: "Orbital angular momentum mode division multiplexing",
        authors: "Wang et al.",
        journal: "Nature Photonics",
        year: "2012",
        status: "Completed",
        notes: "Key reference for my current experiment."
      },
      {
        id: "3",
        title: "Integrated Lithium Niobate Photonics",
        authors: "Zhu et al.",
        journal: "Advances in Optics and Photonics",
        year: "2021",
        status: "To Read"
      }
    ];

    const mockPortfolio = [
      {
        id: "1",
        type: "painting",
        title: "Diffraction Patterns in Oil",
        description: "Oil on canvas, 24x36. Inspired by Young's double slit experiment.",
        imageUrl: "https://images.unsplash.com/photo-1758522276630-8ebdf55d7619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGFydCUyMHN0dWRpbyUyMHBhbGV0dGUlMjBjYW52YXN8ZW58MXx8fHwxNzY5OTIyNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        id: "2",
        type: "animation",
        title: "Wave Propagation Simulation",
        description: "Procedural animation of electromagnetic waves created in Blender.",
        imageUrl: "https://images.unsplash.com/photo-1650817285887-3ed0f100ea63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGxpZ2h0JTIwd2F2ZXMlMjBpbnRlcmZlcmVuY2UlMjBwYXR0ZXJufGVufDF8fHx8MTc2OTkyMjY1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      },
      {
        id: "3",
        type: "painting",
        title: "The Laser's Edge",
        description: "Acrylic pouring technique mimicking laser speckle.",
        imageUrl: "https://images.unsplash.com/photo-1648006916633-c03d320b3808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpY3MlMjBsYWIlMjBsYXNlciUyMHBoeXNpY3MlMjBleHBlcmltZW50fGVufDF8fHx8MTc2OTkyMjY1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      }
    ];

    const mockAchievements = [
      {
        id: "1",
        title: "SPIE Optics and Photonics Education Scholarship",
        date: "2024",
        category: "Award",
        description: "Awarded for potential long-term contribution to the field of optics and photonics."
      },
      {
        id: "2",
        title: "Best Student Paper Award",
        date: "2023",
        category: "Award",
        description: "Presented at the Frontiers in Optics conference for work on non-linear waveguides."
      },
      {
        id: "3",
        title: "Demonstration of 99% Efficiency in Coupling",
        date: "2025",
        category: "Publication",
        description: "Published in Optics Express. Detailed analysis of tapered fiber coupling."
      }
    ];

    for (const post of mockPosts) {
      await kv.set(`blog:${post.id}`, post);
    }
    for (const paper of mockPapers) {
      await kv.set(`research:${paper.id}`, paper);
    }
    for (const item of mockPortfolio) {
      await kv.set(`portfolio:${item.id}`, item);
    }
    for (const item of mockAchievements) {
      await kv.set(`achievement:${item.id}`, item);
    }

    return c.json({ message: "Seeded successfully" });
  } catch (error) {
    console.error("Error seeding data:", error);
    return c.json({ error: "Failed to seed data" }, 500);
  }
});

Deno.serve(app.fetch);
