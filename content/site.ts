export const site = {
  name: "Abhi Patel",
  role: "Full Stack Engineer",
  pitch:
    "Full-stack developer working across Go, TypeScript, and Python — from protocol-level servers and relational data models to applied machine learning.",
  location: "Ahmedabad, Gujarat",
  timezone: "IST (UTC+5:30)",
  availability: "Open to internships & early-career engineering roles",
  current: {
    role: "Software Engineer",
    company: "VLED Lab, IIT Ropar",
    location: "Ahmedabad, Gujarat",
  },
  links: {
    email: "mailto:abhi.patel2k5@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhi-patel-a5659a345",
    github: "https://github.com/ABHIII777",
    resume: "/resume.pdf",
  },
  proof: [
    { value: "4", label: "Full-stack & systems projects" },
    { value: "82%", label: "CNN validation accuracy" },
    { value: "2027", label: "B.S. Computer Science, expected" },
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
    role: "Software Engineer",
    company: "VLED Lab, IIT Ropar",
    location: "Ahmedabad, Gujarat",
    start: "May 2026",
    end: "Jul 2026",
    blurb:
      "Built offline, rule-based learning tools for an education-design lab — no external AI APIs required.",
    highlights: [
      "Designed an offline rule-based mentor engine covering abstraction mapping, Python code generation, prompt scoring, and misconception detection.",
      "Removed the dependency on external AI keys by keeping the entire pipeline local and deterministic.",
      "Built a story-driven 12-step lesson engine that teaches exception handling through a Panchatantra fable, ending in a drag-and-drop coding step with simulated terminal execution.",
    ],
    stack: ["Python", "Rule-Based Systems", "Code Generation", "Interactive Learning"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
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
    slug: "http-server-go",
    name: "HTTP/1.1 Server",
    tagline:
      "HTTP/1.1 server and interactive CLI client built from scratch in Go, without net/http.",
    stack: ["Go", "TCP", "bufio", "CLI"],
    role: "Solo developer",
    period: "Self-directed",
    problem:
      "Using net/http hides the parts of HTTP that matter most: how requests are framed, when connections close, and where a header can be injected.",
    approach: [
      "Implemented a goroutine-per-connection server with bufio-based request parsing and no net/http dependency.",
      "Added Content-Length framing with a 1 MiB cap, plus 30s read and 5s write deadlines.",
      "Built a CLI client that constructs raw requests, guards against header injection, and enforces connection timeouts.",
    ],
    outcome:
      "A working request/response path that demonstrates framing, connection lifecycle, and protocol semantics end to end.",
  },
  {
    slug: "synapse",
    name: "Synapse",
    tagline:
      "Full-stack social platform with authentication, media uploads, and interactive feeds.",
    stack: [
      "Next.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Tailwind CSS",
      "JWT",
      "Zod",
      "Supabase Storage",
    ],
    role: "Full-stack developer",
    period: "Self-directed",
    problem:
      "Social products look simple until auth, media, relationships, and feed state all have to agree with each other.",
    approach: [
      "Built authentication and protected API routes with JWT, bcrypt, and Zod validation.",
      "Modelled users, posts, likes, comments, reposts, bookmarks, and follow relationships in PostgreSQL with Drizzle ORM.",
      "Added image uploads through Supabase Storage and wired the social feed UI in Next.js and Tailwind CSS.",
    ],
    outcome:
      "A complete platform covering sign-up, posting, media, and the social interactions expected from a modern feed.",
  },
  {
    slug: "typewithme",
    name: "TypeWithMe",
    tagline:
      "Typing practice built around real code snippets instead of generic text.",
    stack: ["Next.js", "PostgreSQL", "TypeScript"],
    role: "Solo developer",
    period: "Self-directed",
    problem:
      "Generic typing tests train you on prose, not the syntax and indentation you actually type as a programmer.",
    approach: [
      "Built the app on Next.js with PostgreSQL-backed content for multiple programming languages.",
      "Tracked WPM, accuracy, and errors in real time as the user types.",
      "Structured snippets for beginner progression and tuned the interface for smooth, responsive practice.",
    ],
    outcome:
      "A focused practice tool that measures the thing developers actually do: typing code accurately.",
  },
  {
    slug: "musicon",
    name: "Musicon",
    tagline:
      "Deep-learning genre classifier that listens to raw audio.",
    stack: ["Python", "TensorFlow", "CNN", "Mel Spectrograms"],
    role: "ML developer",
    period: "Self-directed",
    problem:
      "Genre is a song-level label, but models usually see short clips — so the pipeline has to bridge the two.",
    approach: [
      "Segmented tracks into 5-second chunks and converted each into 128-band Mel spectrograms.",
      "Trained a 4-block CNN with batch normalization, global average pooling, and dropout, using balanced class weights, early stopping, and learning-rate scheduling.",
      "Added noise injection, time stretching, and silence filtering, then aggregated chunk predictions with majority voting.",
    ],
    outcome:
      "82% validation accuracy, producing a song-level genre and confidence score from the aggregated predictions.",
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
    title: "Full-Stack Web Development",
    description:
      "End-to-end web apps with Next.js, PostgreSQL, and typed API layers — authentication, media, and social features included.",
    deliverables: [
      "Social platforms & interactive feeds",
      "JWT auth & Zod validation",
      "Relational schemas with Drizzle ORM",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "svc-2",
    title: "Backend & Protocol Engineering",
    description:
      "Servers and clients built close to the metal, with an emphasis on framing, connection lifecycle, and clear failure modes.",
    deliverables: [
      "HTTP/1.1 server & CLI client in Go",
      "Goroutine-per-connection concurrency",
      "Timeouts, size limits & header-injection guards",
    ],
    tech: ["Go", "TCP", "bufio", "Node.js"],
  },
  {
    id: "svc-3",
    title: "Applied Machine Learning",
    description:
      "Audio and data pipelines that turn raw input into a useful prediction, with attention to class imbalance and overfitting.",
    deliverables: [
      "Mel-spectrogram feature pipelines",
      "CNN training & evaluation",
      "Augmentation and inference aggregation",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "CNNs"],
  },
  {
    id: "svc-4",
    title: "Learning Tools & Interfaces",
    description:
      "Rule-based mentoring and interactive lessons that run offline, without relying on external AI keys.",
    deliverables: [
      "Rule-based mentor engines",
      "Multi-step lesson design",
      "Simulated terminal interactions",
    ],
    tech: ["Python", "Rule-Based Systems", "React"],
  },
];

export type SkillGroup = {
  category: string;
  note: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    note: "The three I reach for most, depending on the layer.",
    skills: ["Go", "TypeScript", "Python"],
  },
  {
    category: "Frontend",
    note: "Interfaces that stay responsive and readable.",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    category: "Backend & Data",
    note: "APIs, auth, and relational models.",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Drizzle ORM",
      "JWT",
      "Zod",
      "Supabase Storage",
    ],
  },
  {
    category: "ML & Tooling",
    note: "Training models and shipping the code around them.",
    skills: [
      "TensorFlow",
      "PyTorch",
      "CNN Training",
      "Mel Spectrograms",
      "Git / GitHub",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  id?: string;
};

export const certifications: Certification[] = [];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Adani University",
    year: "Expected 2027",
    notes:
      "CGPA 7.73 / 10 · Coursework: Data Structures & Algorithms, Reinforcement Learning & Deep Learning (Python), Database Management Systems (PostgreSQL)",
  },
];

export const journeyTimeline = [
  {
    year: "2023 – 2027",
    title: "Computer Science Foundations",
    location: "Adani University",
    blurb:
      "Coursework in data structures and algorithms, database management systems with PostgreSQL, and reinforcement learning and deep learning in Python.",
  },
  {
    year: "2025 – 2026",
    title: "Full-Stack & Systems Projects",
    location: "Independent",
    blurb:
      "Built Synapse and TypeWithMe on Next.js and PostgreSQL, an HTTP/1.1 server in Go, and an audio genre classifier in Python.",
  },
  {
    year: "May – Jul 2026",
    title: "Software Engineer",
    location: "VLED Lab, IIT Ropar",
    blurb:
      "Designed offline rule-based mentoring tools and a 12-step interactive lesson engine for teaching exception handling.",
  },
];
