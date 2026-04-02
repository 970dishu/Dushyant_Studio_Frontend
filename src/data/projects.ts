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
  secondaryVideo?: string;
  extraVideos?: string[];
  reelVideos?: string[];
  reelThumbnailTimes?: number[];
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
    slug: "film-editing-masterpiece",
    category: "Film Editing",
    title: "Agyaat Aadarsh",
    shortDescription: "Story-first editing work with Agyaat Aadarsh, from viral reels to strong landscape videos.",
    client: "Independent Filmmaker",
    year: "2024",
    role: "Lead Film Editor",
    image: "/assets/agyaat-khat.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/agyaat-khat.mp4",
    // TODO: Add your second video file to public/videos/ folder and update the path
    secondaryVideo: "/videos/aurat-jaat.mp4",
    isVideo: true,
    overview: "I work with Agyaat Aadarsh as an editor and director. We started with reels and later shifted to landscape storytelling, where our first big video, Agyaat Khat, reached a massive audience.",
    problem: "At times, we had story blocks, creative disagreements, and location-level production challenges. The biggest task was to keep the story powerful while still making it watchable for social platforms.",
    solution: "We handled each challenge with practical problem-solving on set and in edit sessions. Even when we disagreed, we sat down, aligned on story intent, and came back stronger with better cuts.",
    results: [
      "Agyaat Khat reached 16M views on Instagram.",
      "Aurat Jaat also performed strongly and extended audience momentum.",
      "Built a solid director-editor storytelling rhythm as a duo."
    ],
    challenges: [
      "Managing creative conflicts without compromising story quality.",
      "Balancing emotional storytelling with social media pacing.",
      "Handling real-world production issues under tight timelines."
    ],
    tools: ["Premiere Pro", "After Effects", "Davinci Resolve"],
    gallery: [
      "/assets/group-photo.jpg?w=1200&h=800&fit=crop",
      "/assets/selfie.jpg?w=1200&h=800&fit=crop"
    ]
  },
  {
    id: "2",
    slug: "motion-design-showcase",
    category: "Motion Design",
    title: "Across Protocol US",
    shortDescription: "Motion design videos that explain Across Bridge in a simple and engaging way.",
    client: "Web3 Protocol Company",
    year: "2025",
    role: "Motion Designer & Animator",
    image: "/assets/motion-design.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/across-lego.mp4",
    // TODO: Add additional video files to public/videos/ folder and update the paths
    extraVideos: [
      "/videos/across-defi.mp4",
      "/videos/across-info.mp4"
    ],
    isVideo: true,
    overview: "Across Protocol is a US-based Web3 company, and I create motion videos for their X audience. My main goal is to make bridging tokens from one chain to another easy to understand for normal users.",
    problem: "The product is useful, but the concept is technical. People were not easily understanding how the app works, so educational content needed to be clearer and more interesting.",
    solution: "I used clear storytelling, simple visual breakdowns, and meme-style Web3 moments to keep people watching. I also used a Lego-style mascot as a hook element, which worked very well for engagement and recall.",
    results: [
      "One video crossed 200K views.",
      "Multiple videos reached hundreds of thousands of people.",
      "Helped new users understand bridging in a simpler way."
    ],
    challenges: [
      "Turning technical app flow into layman-friendly storytelling.",
      "Keeping educational videos fun without losing clarity.",
      "Finding repeatable hooks that work in Web3 content."
    ],
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    gallery: [
      "/assets/motion-design.jpg?w=1200&h=800&fit=crop",
      "/assets/hey-everyone.jpg?w=1200&h=800&fit=crop"
    ]
  },
  {
    id: "3",
    slug: "creative-direction-vision",
    category: "Video Editing",
    title: "VFX AI",
    shortDescription: "SaaS AI launch motion graphics made from scratch using Figma and After Effects.",
    client: "Tech Startup",
    year: "2024",
    role: "Creative Director",
    image: "/assets/vfx-ai.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/vfx-ai.mp4",
    extraVideos: [
      "/videos/vfx-ai-intro.mp4",
      "/videos/vfx-ai-explainer.mp4"
    ],
    isVideo: true,
    overview: "This company hired us to create launch motion graphics for their AI SaaS product for editors. It was a real hands-on project where we built visuals from scratch and turned product ideas into clear video communication.",
    problem: "In the beginning, there was some confusion around what message the launch video should focus on. That made early drafts feel scattered.",
    solution: "We clarified the message, locked the visual direction, and then executed with better pacing and storytelling. Once aligned, we delivered a much stronger launch output than expected.",
    results: [
      "Delivered a polished launch video for the SaaS product.",
      "Client appreciated the final quality and direction.",
      "Improved communication flow between concept and execution."
    ],
    challenges: [
      "Early miscommunication on core launch message.",
      "Balancing technical product explanation with visual appeal.",
      "Building high-quality motion from scratch within deadlines."
    ],
    tools: ["Photoshop", "After Effects", "Illustrator"],
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
    shortDescription: "Short-form reels for creators and events, edited to hook fast and keep viewers engaged.",
    client: "Various Brands",
    year: "2024",
    role: "Creator & Editor",
    image: "/assets/short-form-reels.jpg?w=800&h=600&fit=crop",
    // TODO: Add your video file to public/videos/ folder and update the path
    heroVideo: "/videos/aman-intro.mp4",
    // Portrait reels (9:16, e.g. 720x1280)
    reelVideos: [
      "/videos/aman-intro.mp4",
      "/videos/karan-intro.mp4",
      "/videos/mini-intro.mp4",
      "/videos/aman-hook.mp4",
      "/videos/thief-hook.mp4",
      "/videos/mxm-hook.mp4"
    ],
    reelThumbnailTimes: [1.0, 6.0, 0.6, 0.4, 1.0, 1.2],
    isVideo: true,
    overview: "This section includes my short-form editing work for Instagram creators like Aman Verma (attacking_velocity), Devlearn founder Karan Goyal, and college event campaigns.",
    problem: "When I started, speed and consistency were hard. Short-form needs strong hooks, tight pacing, and clean storytelling in very little time.",
    solution: "I improved by making more reels, testing hook styles, and refining transitions, timing, and story cuts. Each project helped me level up both creative thinking and editing execution.",
    results: [
      "Delivered creator-focused reels across different niches.",
      "Built stronger hook-first editing instincts.",
      "Accelerated my learning curve in real client/event work."
    ],
    challenges: [
      "Keeping retention high in the first 1-2 seconds.",
      "Adapting edit style for different creators and audiences.",
      "Balancing speed of delivery with quality."
    ],
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
