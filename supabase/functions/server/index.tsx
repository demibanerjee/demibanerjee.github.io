import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { z } from "npm:zod";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-96b5a187/health", (c) => {
  return c.json({ status: "ok" });
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
