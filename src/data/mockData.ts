
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  link?: string;
  status: "Reading" | "Completed" | "To Read";
  notes?: string;
}

export interface PortfolioItem {
  id: string;
  type: "painting" | "animation";
  title: string;
  description: string;
  imageUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
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

export const RESEARCH_PAPERS: Paper[] = [
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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
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
