/* ==========================================================================
   ✏️  EDIT THIS FILE ONLY — all portfolio content lives here.
   Save, refresh the browser, done. No build step.
   ========================================================================== */

window.PORTFOLIO = {
  // ---- Identity ----------------------------------------------------------
  firstName: "Hondrede",
  lastName: "Srivalli",
  initials: "HS",
  photo: "assets/me.jpg", // e.g. "assets/me.jpg" — leave empty to show initials monogram
  roles: ["Frontend Developer", "MernStack Developer", "React.js Specialist", "GenAI Builder"],
  tagline:
    "MERN Stack Developer crafting scalable, full-stack web experiences. AWS-certified, GenAI-ready, and passionate about shipping products that make a real impact.",
  location: "Vizag, India",
  timezone: "Asia/Kolkata",
  email: "srivallihondrede2401@gmail.com",
  resume: "", // put your CV at assets/resume.pdf and set this to "assets/resume.pdf" — empty hides the button
  available: true,
  availabilityText: "Available for full-time & freelance",

  socials: [
    { label: "GitHub", url: "https://github.com/srivallihondrede2401-sudo", icon: "github" },
    // { label: "LinkedIn", url: "https://linkedin.com/in/<your-id>", icon: "linkedin" },
    // { label: "X / Twitter", url: "https://x.com/<your-id>", icon: "x" },
    // { label: "WhatsApp", url: "https://wa.me/91XXXXXXXXXX", icon: "whatsapp" },
  ],

  stats: [
    { value: 3, suffix: "+", label: "Years shipping React apps", icon: "code" },
    { value: 15, suffix: "+", label: "Technical Skills", icon: "layers" },
    { value: 3, suffix: "×", label: "Certified · AWS & Anthropic", icon: "award" },
  ],

  // Floating cards beside the avatar. icon: "code" | "spark" | "cap" or any brand name (aws, react, claude…)
  heroChips: [
    { icon: "code", title: "3+ years", sub: "shipping React apps" },
    { icon: "aws", title: "3× Certified", sub: "AWS & Anthropic" },
  ],

  // Big scroll-lit statement. Wrap words in *stars* to highlight them.
  statement:
    "I turn ideas into *fast*, *accessible* products — from pixel-perfect React interfaces to scalable *MERN* backends and *GenAI* features people actually enjoy using.",

  // ---- About -------------------------------------------------------------
  about: [
    "I'm a frontend-focused software engineer with 3+ years of experience building modern, responsive and user-friendly web applications. I specialize in React, TypeScript, JavaScript and Redux, with a strong foundation in the MERN stack.",
    "I enjoy turning complex requirements into clean, intuitive interfaces — focusing on reusable components, maintainable architecture, performance and the little UI details that make a real difference. From scalable frontends to REST APIs and AI-powered features, I love building products that are both functional and delightful to use.",
    "Currently I'm a Frontend Developer at Arhasi AI, contributing to AI-driven applications and modern web experiences, while exploring Generative AI, LLMs and intelligent applications.",
    "For me, great software isn't just about how it looks — it's about how seamlessly it works.",
  ],

  config: {
    name: "srivalli",
    comment: "hey there, recruiter 👋",
    groups: [
      { name: "Hondrede Srivalli", role: "Frontend Engineer ✨", company: "Arhasi AI", location: "Vizag, India 🇮🇳" },
      { experience: "3+ years of building for the web" },
      {
        superpowers: [
          "Turning ideas into intuitive UIs",
          "React & TypeScript",
          "Pixel-perfect interfaces",
          "AI-powered experiences",
          "Reusable component architecture",
        ],
      },
      { toolkit: ["React", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "Node.js", "MongoDB"] },
      { currentlyExploring: ["Generative AI", "LLMs"] },
      { mindset: "Build thoughtfully. Ship confidently.", coffee: "Always debugging ☕" },
    ],
  },

  currently: {
    role: "Frontend Developer",
    company: "Arhasi",
    companyTagline: "AI with Integrity",
    logo: "assets/arhasi.jpg",
    mode: "Remote",
    description:
      "Building intuitive, scalable, AI-powered web experiences with React, TypeScript and Redux — turning complex workflows into clean, user-friendly interfaces. I believe great AI deserves an equally great interface, and I bring that to life through reusable components, maintainable code and creative problem-solving.",
  },
  focus: ["Design systems", "Motion & micro-interactions", "GenAI UX", "Web performance"],

  // ---- Skills --------------------------------------------------------------
  // Brand icons come from icons.js automatically by name (React, AWS, Claude,
  // Postman, VS Code…). For anything else, set icon to a https://devicon.dev class.
  // Optional per group: ic: "layout" | "server" | "spark" | "tool"
  skills: [
    {
      group: "Frontend",
      items: [
        { name: "React", icon: "devicon-react-original" },
        { name: "Next.js", icon: "devicon-nextjs-plain" },
        { name: "TypeScript", icon: "devicon-typescript-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
        { name: "Redux", icon: "devicon-redux-original" },
        { name: "HTML5", icon: "devicon-html5-plain" },
        { name: "CSS3", icon: "devicon-css3-plain" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js", icon: "devicon-nodejs-plain" },
        { name: "Express", icon: "devicon-express-original" },
        { name: "MongoDB", icon: "devicon-mongodb-plain" },
        { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      ],
    },
    {
      group: "Cloud & AI",
      items: [
        { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
        { name: "Docker", icon: "devicon-docker-plain" },
        { name: "Claude API", icon: "" }, // empty icon → letter badge
        { name: "Vercel", icon: "devicon-vercel-original" },
      ],
    },
    {
      group: "Tools",
      items: [
        { name: "Git", icon: "devicon-git-plain" },
        { name: "GitHub" },
        { name: "Postman" },
        { name: "VS Code" },
        { name: "Figma", icon: "devicon-figma-plain" },
        { name: "Vite", icon: "devicon-vitejs-plain" },
        { name: "Jest", icon: "devicon-jest-plain" },
      ],
    },
  ],

  // ---- Projects ----------------------------------------------------------
  // category drives the filter tabs · hue (0-360) tints the card · image: screenshot (else a mock UI)
  projects: [
    {
      title: "Nova — AI Chat Workspace",
      category: "GenAI",
      hue: 265,
      featured: true,
      image: "assets/projects/nova.png",
      description:
        "A streaming chat workspace for Claude: token-by-token replies, Markdown with highlighted code, searchable history, model & effort controls, bring-your-own-key and a demo mode.",
      tags: ["React", "TypeScript", "Claude API", "Vite"],
      live: "https://srivallihondrede2401-sudo.github.io/nova-ai-workspace/",
      code: "https://github.com/srivallihondrede2401-sudo/nova-ai-workspace",
    },
    {
      title: "HireFlow — Job Application Tracker",
      category: "Full-stack",
      hue: 235,
      featured: true,
      image: "assets/projects/hireflow.png",
      description:
        "MERN Kanban board for job hunting: drag-and-drop with optimistic updates, interview reminders and analytics charts. Express + MongoDB API with JWT auth and Zod validation.",
      tags: ["React", "Redux Toolkit", "Node.js", "MongoDB"],
      live: "https://srivallihondrede2401-sudo.github.io/hireflow/",
      code: "https://github.com/srivallihondrede2401-sudo/hireflow",
    },
    {
      title: "Pulse — Live Crypto Dashboard",
      category: "Frontend",
      hue: 160,
      image: "assets/projects/pulse.png",
      description:
        "Real-time market dashboard on RTK Query: polling and focus refetch, interactive price charts, sortable table with SVG sparklines, watchlist and dark/light themes.",
      tags: ["React", "TypeScript", "Redux", "Recharts"],
      live: "https://srivallihondrede2401-sudo.github.io/pulse/",
      code: "https://github.com/srivallihondrede2401-sudo/pulse",
    },
    {
      title: "ShopEase — E-commerce Storefront",
      category: "Full-stack",
      hue: 25,
      image: "assets/projects/shopease.png",
      description:
        "Modern store with infinite product catalogue, cart drawer, wishlist and a validated 3-step checkout. TanStack Query + Zustand, and an orders API that re-prices items on the server.",
      tags: ["React", "TypeScript", "Express", "MongoDB"],
      live: "https://srivallihondrede2401-sudo.github.io/shopease/",
      code: "https://github.com/srivallihondrede2401-sudo/shopease",
    },
  ],

  // ---- Experience --------------------------------------------------------
  // logo: image path · meta: small chips · current: true adds a green "Current" chip
  // Only the first 3 points show; the rest go behind a "Show N more" button.
  experience: [
    {
      role: "Frontend Developer",
      company: "Arhasi, AI with Integrity",
      logo: "assets/arhasi-ai.jpg",
      period: "Oct 2025 – Present",
      current: true,
      meta: ["Full-time", "Remote"],
      points: [
        "Building modern AI-integrated web applications using React.js and TypeScript.",
        "Developing frontend solutions that leverage generative AI capabilities and Claude AI.",
        "Collaborating in a fully remote environment on cutting-edge AI products.",
      ],
    },
    {
      role: "MERN Stack Developer",
      company: "Lyros Technologies Pvt Ltd · CMMI Level 3",
      logo: "assets/lyros.jpg",
      period: "July 2023 – Oct 2025",
      meta: ["Full-time", "Hyderabad", "On-site"],
      points: [
        "Developed and maintained web applications using MongoDB, Express.js, React.js and Node.js.",
        "Built reusable React components and responsive user interfaces using modern frontend development practices.",
        "Integrated REST APIs and implemented frontend functionality based on business requirements.",
        "Worked on authentication, authorization, form handling, validations and application state management.",
        "Developed backend APIs using Node.js and Express.js and integrated them with React applications.",
        "Worked with MongoDB for data storage and application-level data operations.",
        "Debugged application issues, improved existing features and delivered enhancements based on project requirements.",
        "Collaborated with team members throughout development, testing, deployment and maintenance.",
      ],
    },
  ],

  // ---- Education ---------------------------------------------------------
  education: [
    {
      degree: "B.Tech, Electronics and Communication Engineering",
      school: "Andhra University",
      logo: "assets/au.jpg",
      period: "2020 – 2023",
      place: "Visakhapatnam, Andhra Pradesh",
      grade: "A+",
    },
  ],

  // ---- Certifications ----------------------------------------------------
  // badge: image path. Without one, a hexagon badge is drawn from badgeTitle + level (badgeColor tints it).
  certifications: [
    {
      name: "Claude Certified Developer — Foundations",
      issuer: "Anthropic",
      level: "Foundations",
      issued: "Sep 2026",
      expires: "Sep 2027",
      badge: "assets/claude-badge.png",
      url: "https://www.credly.com/badges/894b489d-da33-41d7-af34-55a4f22d1a62",
    },
    {
      name: "AWS Certified Generative AI Developer — Professional",
      issuer: "Amazon Web Services",
      level: "Professional",
      issued: "Aug 2026",
      expires: "Aug 2029",
      badgeTitle: "Generative AI Developer",
      badgeColor: "#0e7490",
      url: "https://aws.amazon.com/verification",
    },
    {
      name: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services",
      level: "Foundational",
      issued: "Aug 2026",
      expires: "Aug 2029",
      badgeTitle: "AI Practitioner",
      badgeColor: "#334155",
      url: "https://aws.amazon.com/verification",
    },
  ],
};
