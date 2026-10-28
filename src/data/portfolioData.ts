import { Project, Skill, ExperienceItem, ProfileData, PublishingGuideItem } from '../types';

export const DEFAULT_PROFILE: ProfileData = {
  name: "Alex Morgan",
  title: "Full-Stack Software Engineer & Product Designer",
  shortBio: "I design and build fast, resilient web applications and accessible digital products with modern technologies.",
  fullBio: [
    "I am a passionate software engineer with over 5 years of experience delivering robust web and mobile experiences. My work bridges the gap between clean, scalable backend architecture and intuitive, thoughtful frontend design.",
    "I believe in simplicity, web performance, and building digital tools that respect user time and privacy. Whether architecting cloud services, fine-tuning CSS transitions, or optimizing render cycles, I focus on craftsmanship that produces measurable results.",
    "When I'm not writing code, you can find me exploring open-source communities, testing free dev tooling, mentoring early-career developers, or cycling through city parks."
  ],
  location: "San Francisco, CA & Remote Worldwide",
  email: "alex.morgan.portfolio@example.com",
  phone: "+1 (555) 234-5678",
  availability: "Open to new projects & roles",
  avatarUrl: "/src/assets/images/hero_avatar_1793169959977.jpg",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    dribbble: "https://dribbble.com",
    youtube: "https://youtube.com"
  }
};

export const WORKSPACE_IMAGE = "/src/assets/images/hero_workspace_1793169961084.jpg";

export const PROJECTS: Project[] = [
  {
    id: "project-ronny-music",
    title: "Ronny Music Platform",
    subtitle: "Mobile-friendly music streaming & independent artist promotion",
    description: "A complete zero-cost music streaming web app with HTML5 & Web Audio playback, artist upload portal, voluntary tips, and promotion marketplace.",
    longDescription: "Engineered a full-featured music streaming and independent artist promotion application created by Ronny. Built with React 19, TypeScript, and modern dark-mode aesthetics with purple and green accents. Features seamless HTML5 audio playback, custom audio synthesis for zero-cost royalty-free streaming, local storage persistence, and an integrated admin console for track moderation and promotional campaigns.",
    category: "fullstack",
    image: "/src/assets/images/album_neon_echoes_1793189389347.jpg",
    fallbackGradient: "from-purple-900/60 to-slate-900",
    tags: ["React 19", "Web Audio API", "HTML5 Audio", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://ronny-music-demo.example.com",
    githubUrl: "https://github.com/example/ronny-music",
    featured: true,
    metrics: "100% Free Stack · Zero Paid APIs · Web Audio & HTML5",
    keyFeatures: [
      "Custom Web Audio synthesis engine + HTML5 audio file reader for uploaded tracks",
      "Artist submission portal with strict copyright and licensing verification",
      "Artist promotion packages with transparent pricing ($15, $35, $75)",
      "Admin moderation console for track approvals and copyright reports"
    ],
    year: "2026"
  },
  {
    id: "project-pulse",
    title: "Pulse Analytics Platform",
    subtitle: "High-throughput telemetry dashboard & insights hub",
    description: "A real-time data analytics workspace providing sub-second query visualizations, retention heatmaps, and customizable KPI boards.",
    longDescription: "Engineered a high-performance web dashboard capable of streaming live metrics for over 50,000 daily active users. Built with React, TypeScript, and Tailwind CSS, featuring virtualized data tables, responsive charts, and dark-mode optimization that reduced load times by 48%.",
    category: "fullstack",
    image: "/src/assets/images/project_analytics_1793169961424.jpg",
    fallbackGradient: "from-teal-900/60 to-slate-900",
    tags: ["React", "TypeScript", "Tailwind CSS", "Data Visualization", "REST APIs"],
    liveUrl: "https://pulse-analytics-demo.example.com",
    githubUrl: "https://github.com/example/pulse-analytics",
    featured: true,
    metrics: "+48% faster query rendering · 50k+ daily queries",
    keyFeatures: [
      "Sub-second interactive chart filtering without layout recalculations",
      "Keyboard shortcut palette for instant report downloads",
      "Touch-optimized controls for mobile and tablet inspection",
      "Local caching for zero-flicker reloads"
    ],
    year: "2026"
  },
  {
    id: "project-mindset",
    title: "Mindset Mobile Companion",
    subtitle: "Habit tracking & mindful routine builder",
    description: "A native-feeling mobile web app helping people build consistent daily habits through micro-routines, reflection prompts, and offline sync.",
    longDescription: "Designed and developed an intuitive mobile-first application focused on daily micro-habits. Prioritized smooth touch ergonomics, offline PWA storage, and zero unnecessary notification distractions. Tested thoroughly across modern Android Chrome and desktop viewports.",
    category: "mobile",
    image: "/src/assets/images/project_mobile_1793169961140.jpg",
    fallbackGradient: "from-sky-900/60 to-slate-900",
    tags: ["Mobile PWA", "React", "Touch Gestures", "Offline Storage", "Accessibility"],
    liveUrl: "https://mindset-companion.example.com",
    githubUrl: "https://github.com/example/mindset-mobile",
    featured: true,
    metrics: "4.9/5 satisfaction · 100% offline capability",
    keyFeatures: [
      "Ergonomic one-handed thumb navigation zone",
      "IndexedDB offline persistence with background sync",
      "Micro-vibration haptic cues on completion",
      "Zero third-party trackers or telemetry clutter"
    ],
    year: "2025"
  },
  {
    id: "project-essence",
    title: "Essence Design System & Shop",
    subtitle: "Minimalist e-commerce storefront & reusable UI kit",
    description: "An editorial e-commerce catalog featuring architectural furniture and homeware with lightning-fast page transitions and accessible checkout flow.",
    longDescription: "Crafted a distinctive, uncluttered shopping experience highlighting product photography and typographic poise. Developed as both a modular React component library and a full-featured storefront with instant cart calculation and WCAG AA compliance.",
    category: "design",
    image: "/src/assets/images/project_commerce_1793169961718.jpg",
    fallbackGradient: "from-amber-900/40 to-slate-900",
    tags: ["Design System", "Next-Gen CSS", "Component Library", "WCAG AA"],
    liveUrl: "https://essence-store.example.com",
    githubUrl: "https://github.com/example/essence-design-system",
    featured: true,
    metrics: "100/100 Lighthouse performance · 0.4s FCP",
    keyFeatures: [
      "Strict typographic hierarchy without visual pill noise",
      "Accessible modal gallery with zoom and keyboard navigation",
      "Lightweight bundle under 35kb gzipped",
      "Harmonious 60-30-10 color distribution"
    ],
    year: "2025"
  },
  {
    id: "project-cloudhub",
    title: "CloudHub Developer CLI & Portal",
    subtitle: "Developer productivity tools and resource orchestrator",
    description: "An open-source developer dashboard for managing microservice environments, staging secrets, and preview deployments with zero friction.",
    longDescription: "Created an all-in-one developer portal combining a browser-based inspector with a lightweight terminal helper. Built entirely with free and open technologies, enabling engineering teams to deploy and test branches on free hosting providers.",
    category: "web",
    image: "/src/assets/images/hero_workspace_1793169961084.jpg",
    fallbackGradient: "from-purple-900/50 to-slate-900",
    tags: ["Node.js", "TypeScript", "Developer Tools", "CLI", "Docker"],
    liveUrl: "https://cloudhub-portal.example.com",
    githubUrl: "https://github.com/example/cloudhub-cli",
    featured: false,
    metrics: "2.4k GitHub Stars · 15k monthly installs",
    keyFeatures: [
      "Zero-config local environment booting",
      "Integrated free hosting deploy triggers",
      "Encrypted client-side secret generation",
      "Comprehensive terminal output streaming"
    ],
    year: "2024"
  }
];

export const SKILLS: Skill[] = [
  { name: "React 19 & Next.js", category: "frontend", level: 95, experience: "5+ years", description: "Component lifecycle, custom hooks, Server Components, and responsive state." },
  { name: "TypeScript", category: "frontend", level: 92, experience: "5 years", description: "Strict typing, generics, schema validation, and type-safe API contracts." },
  { name: "Tailwind CSS & Modern CSS", category: "frontend", level: 96, experience: "4+ years", description: "Utility-first design, fluid typography, dark mode, and zero-pill UI." },
  { name: "Node.js & Express", category: "backend", level: 88, experience: "4 years", description: "RESTful APIs, middleware architecture, streaming responses, and auth." },
  { name: "PostgreSQL & Supabase", category: "backend", level: 85, experience: "3+ years", description: "Relational database design, indexes, migrations, and Drizzle/Prisma ORMs." },
  { name: "Mobile Web & PWA", category: "frontend", level: 90, experience: "4 years", description: "Touch gestures, offline service workers, web app manifests, and Android tuning." },
  { name: "Git, GitHub & CI/CD", category: "tools", level: 92, experience: "5+ years", description: "Branching workflows, GitHub Actions pipelines, semantic releases, and PR reviews." },
  { name: "Vite, Rollup & Tooling", category: "tools", level: 90, experience: "3+ years", description: "Modern build setups, bundle optimization, tree shaking, and dev tooling." },
  { name: "Figma & UI Prototyping", category: "tools", level: 86, experience: "4 years", description: "Wireframing, interactive prototypes, design tokens, and developer handoff." },
  { name: "Vercel & Free Cloud CDNs", category: "cloud", level: 92, experience: "4 years", description: "Edge routing, environment secrets, previews, and free tier optimizations." }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 — Present",
    role: "Senior Frontend & Web Applications Engineer",
    company: "Apex Digital Labs",
    location: "San Francisco, CA / Remote",
    description: "Leading the core frontend architecture for high-traffic web applications, standardizing accessible component design, and coaching 6 junior/mid engineers.",
    achievements: [
      "Boosted mobile Core Web Vitals to 98+ score across all major product funnels",
      "Migrated monolithic frontend into lightweight Vite-powered micro-frontends",
      "Instituted automated accessibility (a11y) testing reducing audits defects by 65%"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "GraphQL"]
  },
  {
    id: "exp-2",
    period: "2021 — 2023",
    role: "Full-Stack Web Developer",
    company: "Hyperion Interactive",
    location: "Austin, TX",
    description: "Built and shipped consumer-facing SaaS tools, internal analytics consoles, and responsive customer portals for early-stage tech startups.",
    achievements: [
      "Engineered real-time collaboration canvas with WebSocket syncing",
      "Cut bundle sizes by 40% through lazy-loaded modules and modern bundle splitting",
      "Integrated zero-cost deployment pipelines saving team $1,200/month on infrastructure"
    ],
    technologies: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind"]
  },
  {
    id: "exp-3",
    period: "2019 — 2021",
    role: "Junior Web Developer & UI Designer",
    company: "Studio Craft",
    location: "Seattle, WA",
    description: "Designed responsive websites, created marketing landing pages, and converted Figma mockups into pixel-perfect code.",
    achievements: [
      "Delivered 18 custom client portfolio and commerce websites on time and on budget",
      "Created reusable HTML/CSS UI boilerplate adopted company-wide",
      "Won agency Best Design Innovation award for mobile navigation interaction"
    ],
    technologies: ["JavaScript", "HTML5", "CSS3 / Sass", "Figma", "WordPress"]
  }
];

export const FREE_PUBLISHING_GUIDES: PublishingGuideItem[] = [
  {
    id: "vercel",
    provider: "Vercel",
    title: "1-Click Deploy on Vercel",
    badge: "Most Popular & Easiest",
    freeTierSummary: "100% Free Hobby Plan. Unlimited deployments, automatic free HTTPS SSL, instant global CDN, preview URLs for every pull request.",
    bestFor: "Fastest path to publish directly from your GitHub repository with zero configuration.",
    steps: [
      "Push this repository to your personal GitHub account (public or private).",
      "Go to vercel.com and sign up with your GitHub account.",
      "Click 'Add New' -> 'Project' and choose your personal website repository.",
      "Vercel automatically detects Vite and React. Click 'Deploy'.",
      "Within 30 seconds, your site is live with a free custom URL (e.g. `yourname.vercel.app`)!"
    ],
    commandSample: "# Or deploy directly via terminal using free Vercel CLI:\nnpm i -g vercel\nvercel",
    configNotes: "Zero build settings needed. Output directory is automatically set to 'dist'.",
    pros: ["Free automatic SSL certificates", "Automatic deploys on every git commit", "Custom domains supported for free (e.g., yourname.com)"]
  },
  {
    id: "github-pages",
    provider: "GitHub Pages",
    title: "Host for Free on GitHub Pages",
    badge: "100% Free & Open",
    freeTierSummary: "Completely free hosting provided by GitHub directly from your repository branch or GitHub Actions.",
    bestFor: "Developers who want everything hosted directly within GitHub without external accounts.",
    steps: [
      "Add `base: './'` to your `vite.config.ts` so asset paths resolve correctly on subpaths.",
      "Run `npm run build` in your terminal to create the static production bundle in `dist/`.",
      "Install the free helper tool: `npm install --save-dev gh-pages`",
      "Add to scripts in package.json: `\"deploy\": \"gh-pages -d dist\"`",
      "Run `npm run deploy`. In your GitHub repo settings under 'Pages', select the `gh-pages` branch. Your site is live!"
    ],
    commandSample: "npm run build\nnpx gh-pages -d dist",
    configNotes: "Make sure vite.config.ts has base: './' or base: '/<repo-name>/'.",
    pros: ["No extra login or third-party service needed", "Directly linked to your GitHub code", "Free custom domain support"]
  },
  {
    id: "netlify",
    provider: "Netlify",
    title: "Deploy on Netlify",
    badge: "Great Form Handling",
    freeTierSummary: "Free Starter Tier with 100GB monthly bandwidth, continuous git deployments, instant rollbacks, and free HTTPS.",
    bestFor: "Clean drag-and-drop deployment or continuous GitHub sync with free form forwarding.",
    steps: [
      "Run `npm run build` locally, which generates the `dist` folder.",
      "Go to app.netlify.com/drop and drag-and-drop your `dist` folder directly for instant 10-second deployment without git!",
      "Alternatively, connect your GitHub repository for automatic builds on push.",
      "Build Command: `npm run build` | Publish Directory: `dist`."
    ],
    commandSample: "# Or deploy via Netlify CLI:\nnpx netlify-cli deploy --prod --dir=dist",
    configNotes: "Add a _redirects file in public/ with `/* /index.html 200` for client routing.",
    pros: ["Drag-and-drop folder deploy with zero command line", "100GB/mo free bandwidth", "Free custom domains and SSL"]
  },
  {
    id: "cloudflare-pages",
    provider: "Cloudflare Pages",
    title: "Deploy on Cloudflare Pages",
    badge: "Fastest Global Edge",
    freeTierSummary: "Completely free tier with unlimited bandwidth, 500 builds per month, and world-class Cloudflare CDN edge speed.",
    bestFor: "Maximum loading speed globally with zero bandwidth limit anxiety.",
    steps: [
      "Create a free Cloudflare account at pages.cloudflare.com.",
      "Select 'Connect to Git' and choose your repository.",
      "Select framework preset: 'Vite', build command: `npm run build`, output: `dist`.",
      "Click 'Save and Deploy'. Your site is instantly replicated to 300+ edge data centers worldwide."
    ],
    commandSample: "# Or using Wrangler CLI:\nnpx wrangler pages deploy dist",
    configNotes: "Free unlimited traffic and DDOS protection included.",
    pros: ["Unlimited bandwidth on free tier", "Blazing fast in every country", "Free custom domain setup"]
  }
];

export const MOBILE_TESTING_TIPS = [
  {
    title: "1. Android Chrome Remote Preview (Real Device)",
    description: "Run `npm run dev -- --host` in terminal. It will print your local Wi-Fi IP (e.g. `http://192.168.1.5:3000`). Connect your Android phone to the same Wi-Fi network and open that address in Chrome to test touch response, scroll smoothness, and font sizing on real hardware."
  },
  {
    title: "2. Desktop Chrome Device Mode Inspection",
    description: "Press F12 (or right-click -> Inspect) in Google Chrome or Edge. Click the 'Toggle Device Toolbar' icon (Ctrl+Shift+M / Cmd+Shift+M). Select devices like 'Pixel 7', 'Samsung Galaxy S20', or 'iPhone 14' to test mobile responsive layouts, hamburger drawers, and touch targets."
  },
  {
    title: "3. AI Studio Shared App URL",
    description: "You can copy the Shared App URL provided in AI Studio and immediately paste it into your Android phone's web browser to preview this live app anywhere on mobile data or Wi-Fi without any local server setup!"
  },
  {
    title: "4. Touch Target & Accessibility Verification",
    description: "All interactive buttons, social icons, and nav triggers in this website are built with at least 44px × 44px touch targets conforming to WCAG AA mobile criteria, preventing accidental mis-clicks on mobile touchscreens."
  }
];
