export interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  client: string;
  year: string;
  role: string;
  image: string;
  heroVideo?: string;
  isVideo: boolean;
  // Detail page content
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  challenges: string[];
  tools: string[];
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "motion-design-showcase",
    category: "Motion Design",
    title: "Across Protocol US",
    shortDescription: "A captivating motion design project featuring dynamic animations and visual storytelling.",
    client: "Web3 Protocol Company",
    year: "2025",
    role: "Motion Designer & Animator",
    image: "/assets/Motion_Design.jpeg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/across-protocol-motion-design.mp4",
    isVideo: true,
    overview: "This project involved creating a series of motion graphics for a leading creative agency's brand campaign. The goal was to bring their static brand identity to life through dynamic, engaging animations that would resonate with their target audience across digital platforms.",
    problem: "The client's existing brand materials were purely static, limiting their ability to engage audiences on social media and video platforms. They needed a way to communicate their brand values through motion without losing their established visual identity.",
    solution: "I developed a comprehensive motion design system that extended their brand guidelines into the realm of animation. This included defining timing curves, transition styles, and animated logo treatments that maintained brand consistency while adding dynamic energy.",
    results: [],
    challenges: [],
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&h=800&fit=crop"
    ]
  },
  {
    id: "2",
    slug: "film-editing-masterpiece",
    category: "Film Editing",
    title: "Agyaat Aadarsh",
    shortDescription: "A powerful documentary edit that brings compelling stories to life through masterful pacing.",
    client: "Independent Filmmaker",
    year: "2024",
    role: "Lead Film Editor",
    image: "/assets/agyaat-khat.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/agyaat-aadarsh-film-editing.mp4",
    isVideo: true,
    overview: "This documentary project required careful editing to weave together interviews, archival footage, and original cinematography into a cohesive narrative. The film explores themes of resilience and human connection.",
    problem: "The raw footage included over 100 hours of material with multiple storylines that needed to be consolidated into a 90-minute feature. The challenge was finding the emotional through-line that would keep audiences engaged.",
    solution: "I implemented a paper edit process followed by iterative rough cuts, working closely with the director to identify the most compelling moments. The final edit uses a non-linear structure that mirrors the subject's journey.",
    results: [],
    challenges: [],
    tools: ["Premiere Pro", "Audition"],
    gallery: [
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop"
    ]
  },
  {
    id: "3",
    slug: "creative-direction-vision",
    category: "Video Editing",
    title: "VFX AI",
    shortDescription: "Leading the creative vision for a brand's complete visual transformation.",
    client: "Tech Startup",
    year: "2024",
    role: "Creative Director",
    image: "/assets/vfx-ai.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/vfx-ai-creative-direction.mp4",
    isVideo: true,
    overview: "As Creative Director, I led the complete visual rebrand of an emerging tech startup, establishing their visual language across all touchpoints from digital products to marketing campaigns.",
    problem: "The startup had grown rapidly but lacked a cohesive visual identity. Different teams were creating inconsistent materials, diluting brand recognition and confusing potential customers.",
    solution: "I developed a comprehensive brand system including visual guidelines, motion principles, and a component library. I also established creative workflows and trained the internal team on maintaining brand consistency.",
    results: [],
    challenges: [],
    tools: ["Figma", "After Effects", "Figma"],
    gallery: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop"
    ]
  },
  {
    id: "4",
    slug: "short-form-reels",
    category: "Short Form",
    title: "Short Form Reels",
    shortDescription: "High-impact short-form video content designed for social media platforms with engaging storytelling and dynamic visuals.",
    client: "Various Brands",
    year: "2024",
    role: "Creator & Editor",
    image: "/assets/short-form-reels.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/short-form-reels.mp4",
    isVideo: true,
    overview: "A collection of short-form video reels optimized for Instagram, TikTok, and YouTube Shorts. Each piece combines creative storytelling with dynamic editing to maximize engagement and reach.",
    problem: "Brands struggle to capture attention in the short-form content space where viewers scroll quickly and attention spans are limited.",
    solution: "I create punchy, visually compelling short-form reels that hook viewers within the first second while maintaining brand consistency and delivering clear messaging.",
    results: [],
    challenges: [],
    tools: ["Premiere Pro", "After Effects"],
    gallery: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop"
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getOtherProjects = (currentSlug: string): Project[] => {
  return projects.filter(p => p.slug !== currentSlug);
};
