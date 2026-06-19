import nagarsetuImage from '../assets/nagar_ai.png';
import janadeshImage from '../assets/69c6aa2d-36ed-4bed-9770-6c6d887def6a.png';

export const PROJECTS = [
  {
    id: "nagarsetu",
    title: "NagarSetu",
    tagline: "AI-Powered Municipal Services Platform",
    statusBadge: "AI Powered",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    image: nagarsetuImage,
    description: "A smart municipal grievance management platform connecting Citizens, Contractors, and Administrators through an AI-powered workflow. Features automated complaint categorization, intelligent prioritization, real-time analytics dashboards, and streamlined issue resolution.",
    problem: "Citizens face slow, bureaucratic municipal grievance processes with zero transparency, while city administrators struggle to classify, prioritize, and assign hundreds of daily complaints manually.",
    architecture: "NagarSetu implements a scalable 3-role authentication dashboard (Citizen, Contractor, and Admin) backed by a central Node.js/Express server and Supabase PostgreSQL. Gemini AI dynamically parses description text to classify complaints, score severity, and predict appropriate resolution workflows. Chart.js visualizes analytics for municipal triaging.",
    highlights: [
      "3-role authentication system",
      "AI complaint scoring & categorization",
      "Real-time analytics dashboards",
      "Secure OTP authentication",
      "Realtime update notification hooks",
      "Complaint resolution analytics"
    ],
    timeline: "March 2026 - May 2026",
    role: "AI Integration and Backend",
    technologies: [
      { name: "React" },
      { name: "Vite" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "Supabase" },
      { name: "PostgreSQL" },
      { name: "Gemini AI" },
      { name: "Chart.js" },
      { name: "Tailwind CSS" }
    ],
    githubLink: "https://github.com/ujjwalmishraCSE27/Nagarsetu",
    liveLink: "https://nagarsetuaiweb.netlify.app/"
  },
  {
    id: "janadesh",
    title: "JanaDesh",
    tagline: "Online Voting Platform",
    statusBadge: "Production Ready",
    badgeStyle: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    image: janadeshImage,
    description: "A secure online election platform enabling transparent digital voting with role-based administration, real-time election monitoring, and responsive user experiences.",
    problem: "Ensuring high voter turnout and transparent election verification is difficult in remote systems. Administrators require cryptographic assurance, robust authentication, and instant result aggregation without data leaks.",
    architecture: "JanaDesh is built on a responsive React frontend managed by Redux Toolkit for clean local state tracking. A pythonic Flask REST API handles authentication and cryptographically aggregates cast votes. Restrictive authorization shields administrative configuration panels from voter access, and lightweight websocket listeners push live vote counts to dashboards.",
    highlights: [
      "Digital voting system",
      "Secure role-based authentication",
      "Real-time election aggregation updates",
      "Fully responsive modern UI",
      "Redux Toolkit state management"
    ],
    timeline: "Dec 2025 - Jan 2026",
    role: "API development and UI",
    technologies: [
      { name: "React" },
      { name: "Redux" },
      { name: "Tailwind CSS" },
      { name: "Flask" },
      { name: "Python" },
      { name: "REST APIs" }
    ],
    githubLink: "https://github.com/ujjwalmishraCSE27/janadesh_project"
  }
];
