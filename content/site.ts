export const site = {
  name: "Abhi Patel",
  role: "Full Stack Engineer & Creative Developer",
  pitch:
    "Building robust production distributed systems and precision-crafted spatial user interfaces.",
  location: "India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to full-time engineering roles & select contracts",
  current: {
    role: "Senior Full Stack Engineer",
    company: "Tech Systems",
    location: "Remote / India",
  },
  links: {
    email: "mailto:abhi@example.com",
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/",
    resume: "/resume.pdf",
  },
  proof: [
    { value: "4+ yrs", label: "Production Engineering" },
    { value: "100K+", label: "Monthly Active Users" },
    { value: "<80ms", label: "P95 Edge API Latency" },
  ],
} as const;

export type Job = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  blurb: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Job[] = [
  {
    id: "exp-1",
    role: "Senior Full Stack Engineer",
    company: "Tech Systems",
    location: "Remote",
    start: "2023",
    end: "Present",
    blurb:
      "Architecting distributed microservices, edge routing layers, and responsive web applications for enterprise clients.",
    highlights: [
      "Engineered real-time collaboration pipeline reducing sync latency by 45%",
      "Scaled cloud architecture supporting 100K+ concurrent monthly active users",
      "Mentored junior engineers and led front-end performance initiative",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "exp-2",
    role: "Software Engineer",
    company: "Digital Studio",
    location: "Remote",
    start: "2021",
    end: "2023",
    blurb:
      "Built client-facing web platforms, design systems, and data-dense dashboards with high frame-rate interactive graphics.",
    highlights: [
      "Authored unified component library used across 12 distinct product portals",
      "Implemented WebGL and canvas-based spatial visualisations",
      "Decreased bundle sizes by 38% via targeted code-splitting and asset optimization",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Three.js", "GraphQL"],
  },
  {
    id: "exp-3",
    role: "Frontend Engineer",
    company: "Labs Inc.",
    location: "India",
    start: "2020",
    end: "2021",
    blurb:
      "Developed high-traffic marketing sites, interactive prototypes, and internal tooling with accessible design standards.",
    highlights: [
      "Delivered WCAG 2.1 AA compliant design system overhaul",
      "Achieved 98+ Lighthouse scores across all key conversion flows",
    ],
    stack: ["React", "JavaScript", "CSS/SCSS", "REST APIs"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  poster: string;
  live?: string;
  source?: string;
  role: string;
  period: string;
  problem: string;
  approach: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "spatial-studio",
    name: "The Room",
    tagline: "Low-poly isometric 3D workspace with time-of-day dynamic lighting & scroll docking.",
    stack: ["Three.js", "React Three Fiber", "Next.js", "Tailwind CSS"],
    poster: "/room-poster.png",
    live: "/studio",
    source: "https://github.com/",
    role: "Lead Creative Developer & Architect",
    period: "2024",
    problem:
      "Traditional developer portfolios either rely on generic templates or heavy, unoptimized 3D scenes that lag on mobile devices and drain laptop batteries.",
    approach: [
      "Engineered an orthographic low-poly scene using pure code primitives and zero heavy GLTF assets.",
      "Implemented demand-driven rendering (`frameloop='demand'`) so the GPU stays dormant when idle.",
      "Built dual daylight/night lighting rigs smoothly interpolated via `THREE.MathUtils.damp`.",
    ],
    outcome:
      "A 60 FPS interactive hero experience with zero idle battery impact and instant fallback to a lightweight static poster.",
  },
  {
    slug: "edge-pulse",
    name: "EdgePulse",
    tagline: "Distributed telemetry and observability pipeline for edge serverless functions.",
    stack: ["TypeScript", "Go", "ClickHouse", "Next.js", "Apache Kafka"],
    poster: "/posters/edgepulse.png",
    live: "https://example.com",
    source: "https://github.com/",
    role: "Backend & Systems Engineer",
    period: "2023 - 2024",
    problem:
      "Serverless edge functions generate vast telemetry streams that overwhelm central databases, leading to delayed incident response.",
    approach: [
      "Streamed high-volume metrics into a vectorized ClickHouse cluster through partitioned Kafka queues.",
      "Constructed sub-second aggregate visualization dashboards in Next.js with optimistic streaming updates.",
      "Designed automatic alert policies with anomaly detection heuristics.",
    ],
    outcome:
      "Reduced p95 query latency from 3.2s to 120ms while cutting cloud telemetry ingest spend by 52%.",
  },
  {
    slug: "synapse-flow",
    name: "Synapse Flow",
    tagline: "Node-based canvas interface for visualising and orchestrating LLM execution graphs.",
    stack: ["React", "TypeScript", "WebSockets", "Python", "FastAPI"],
    poster: "/posters/synapse.png",
    live: "https://example.com",
    source: "https://github.com/",
    role: "Full Stack Engineer",
    period: "2023",
    problem:
      "Debugging multi-agent LLM reasoning chains is opaque and difficult to visualize across sequential and parallel execution branches.",
    approach: [
      "Developed custom infinite canvas rendering engine with minimap and spatial node snapping.",
      "Created bi-directional WebSocket streaming protocol for real-time token and tool execution inspection.",
      "Integrated step-through execution replay and state checkpointing.",
    ],
    outcome:
      "Adopted by 15+ internal AI research teams, shortening multi-agent workflow debugging cycles by 60%.",
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tech: string[];
};

export const services: Service[] = [
  {
    id: "svc-1",
    title: "Full-Stack Web Engineering",
    description:
      "End-to-end production web applications with Next.js, TypeScript, relational databases, and edge caching.",
    deliverables: ["Scalable SaaS applications", "Design systems & component libraries", "Type-safe API architectures"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "svc-2",
    title: "Spatial & Creative Web Experiences",
    description:
      "Interactive 3D visuals, custom shaders, and GPU-efficient canvas graphics that differentiate modern brand experiences.",
    deliverables: ["Three.js / WebGL scenes", "Custom physics & procedural graphics", "60 FPS mobile-optimized animations"],
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Motion"],
  },
  {
    id: "svc-3",
    title: "Distributed Systems & Telemetry",
    description:
      "High-throughput event pipelines, message streaming, sub-second analytical queries, and resilient microservices.",
    deliverables: ["Kafka / event-driven architectures", "ClickHouse / Redis telemetry stores", "Microservice decoupling"],
    tech: ["Go", "Node.js", "Kafka", "ClickHouse", "Docker"],
  },
  {
    id: "svc-4",
    title: "Performance & Architecture Auditing",
    description:
      "Sub-100ms P95 latency optimizations, Core Web Vitals remediation, and zero-layout-shift front-end overhauls.",
    deliverables: ["100/100 Lighthouse audits", "Bundle size reductions (>40%)", "WCAG 2.1 AA accessibility compliance"],
    tech: ["Performance Profiling", "Edge Functions", "SEO Architecture", "Web Vitals"],
  },
];

export type SkillGroup = {
  category: string;
  note: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend & Creative",
    note: "Interface architecture, motion, and the details that make products feel alive.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Three.js / WebGL",
      "React Three Fiber",
      "Tailwind CSS",
      "Motion",
      "Design Systems",
      "Web Performance",
      "Accessibility (WCAG)",
    ],
  },
  {
    category: "Backend & Architecture",
    note: "APIs, data models, and systems that stay calm under load.",
    skills: [
      "Node.js",
      "Go",
      "PostgreSQL",
      "Redis",
      "REST & GraphQL",
      "Microservices",
      "Edge Computing",
      "Message Queues",
    ],
  },
  {
    category: "DevOps & Infrastructure",
    note: "Build pipelines, observability, and shipping without drama.",
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Vercel",
      "AWS / Cloudflare",
      "Monitoring & Telemetry",
    ],
  },
  {
    category: "Workflow & Craft",
    note: "How the work gets made: review, documentation, and delivery.",
    skills: [
      "Git / GitHub Flow",
      "System Architecture",
      "Technical Writing",
      "Code Review",
      "Agile Delivery",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  id?: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2023",
  },
  {
    name: "Meta Certified Front-End Developer",
    issuer: "Meta",
    year: "2022",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "University Institute of Technology",
    year: "2017 – 2021",
    notes: "Focus on Distributed Systems, Algorithms, and Human-Computer Interaction",
  },
];

export const journeyTimeline = [
  {
    year: "2017 – 2021",
    title: "Foundations & Computer Science",
    location: "Engineering Campus",
    blurb:
      "Deep dive into data structures, operating systems, compiler design, and networking. Built my first 3D graphics demos with OpenGL and C++.",
  },
  {
    year: "2020 – 2021",
    title: "First Production Systems",
    location: "Labs Inc.",
    blurb:
      "Shipped mission-critical frontend portals, introduced automated end-to-end tests, and established accessible UI standards.",
  },
  {
    year: "2021 – 2023",
    title: "Creative Development & Scale",
    location: "Digital Studio",
    blurb:
      "Pioneered WebGL product visualizers and scalable micro-frontends serving enterprise clients worldwide.",
  },
  {
    year: "2023 – Present",
    title: "Distributed Cloud Architecture",
    location: "Tech Systems",
    blurb:
      "Engineering resilient streaming pipelines, event-driven microservices, and leading frontend architectural modernization.",
  },
];
