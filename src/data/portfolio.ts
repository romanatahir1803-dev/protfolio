export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  highlight?: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  category: "AI/ML" | "Full Stack" | "Automation";
  year: string;
  gradient: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isPlaceholder?: boolean;
  bullets: string[];
  tags: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
  honors?: string[];
}

export interface StatItem {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
  description: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "ROMANA TAHIR",
    title: "AI/ML ENGINEER · MERN STACK · AI AUTOMATION",
    shortBio: "AI/ML Engineer, MERN Stack Developer, and AI Automation Engineer building intelligent systems, autonomous workflows, and modern web applications.",
    location: "Karachi, Pakistan",
    email: "romanatahir1803@gmail.com",
    phone: "+92 319 6697205",
    linkedin: "https://linkedin.com/in/romana-tahir",
    linkedinHandle: "linkedin.com/in/romana-tahir",
    github: "https://github.com/romanatahir",
    statusPill: "OPEN TO WORK",
    cvPath: "/Romana_Tahir_CV.pdf",
    chips: [
      "Merit Scholar",
      "Published Researcher",
      "IEEE WIE Member",
      "Remote-ready",
    ],
    orbitingChips: ["MERN", "AI/ML", "n8n", "RAG", "Python"],
  },

  about: {
    sectionNumber: "01",
    label: "01 ── WHO I AM",
    heading: "PASSIONATE ABOUT SCALABLE AI & CUTTING-EDGE WEB ARCHITECTURES",
    paragraphs: [
      "Final-year Software Engineering undergraduate (CGPA 3.77) specializing in MERN Stack, Artificial Intelligence, Machine Learning, and AI Automation. Experienced in building custom datasets, training and evaluating ML models (computer vision & NLP), building LLM-based RAG chatbots, and deploying AI-driven workflows using n8n, Make (Integromat), and Claude.",
      "Published researcher (ICISCT 2026) with strong Data Structures & Algorithms fundamentals and remote international team experience. Driven by creating seamless bridges between deep machine intelligence and fluid, human-centric user experiences."
    ],
  },

  skills: {
    sectionNumber: "02",
    label: "02 ── TECHNICAL SKILLS",
    heading: "CORE EXPERTISE & TECHNOLOGIES",
    subtitle: "A comprehensive toolkit across Artificial Intelligence, Full-Stack Web Development, and Autonomous Workflows.",
    categories: [
      {
        category: "MERN Stack",
        iconName: "Globe",
        skills: [
          "MongoDB",
          "Express.js",
          "React",
          "Node.js",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "REST APIs",
          "Tailwind CSS",
          "HTML",
          "CSS",
        ],
      },
      {
        category: "AI / ML",
        iconName: "BrainCircuit",
        skills: [
          "Model Training & Evaluation",
          "Computer Vision",
          "NLP",
          "Multimodal AI",
          "Recommendation Systems",
          "LLM Applications",
          "RAG",
          "Embeddings & Vector Databases",
          "Dataset Creation & Annotation",
          "Data Preprocessing & Augmentation",
          "Feature Engineering",
          "Hyperparameter Tuning",
        ],
      },
      {
        category: "AI Automation",
        iconName: "Workflow",
        skills: [
          "n8n",
          "Make (Integromat)",
          "Claude",
          "Prompt Engineering",
          "AI-Driven Workflow Automation",
          "API Integration",
        ],
      },
      {
        category: "ML Libraries & Tools",
        iconName: "Cpu",
        skills: [
          "TensorFlow",
          "PyTorch",
          "OpenCV",
          "scikit-learn",
          "Pandas",
          "NumPy",
          "ChromaDB",
          "FastAPI",
          "Jupyter Notebook",
          "Google Colab",
          "Git & GitHub",
        ],
      },
      {
        category: "Languages & Core",
        iconName: "Code2",
        skills: [
          "Python",
          "Java",
          "TypeScript",
          "JavaScript",
          "SQL",
          "Data Structures & Algorithms",
          "Software Design",
          "Agile",
        ],
      },
      {
        category: "Databases & CMS",
        iconName: "Database",
        skills: ["MongoDB", "MySQL", "WordPress"],
      },
    ] as SkillCategory[],
  },

  experience: {
    sectionNumber: "03",
    label: "03 ── EXPERIENCE",
    heading: "WORK & INTERNSHIP TIMELINE",
    items: [
      {
        id: "exp-1",
        role: "AI Engineer Intern",
        company: "Ronin",
        location: "Remote",
        period: "Jul 2026 – Sep 2026",
        bullets: [
          "Designed and developed an AI chatbot from scratch that answers Islamic-topic questions with source-cited responses from the Quran, Hadith (Bukhari & Muslim), and Tafsir Ibn Kathir.",
          "Built a Retrieval-Augmented Generation (RAG) pipeline using ChromaDB and multilingual embeddings, including data collection, cleaning, and indexing of the source texts.",
          "Improved retrieval accuracy by refining data preprocessing and query handling; exposed the chatbot through a FastAPI backend.",
        ],
        tags: ["RAG", "ChromaDB", "FastAPI", "Multilingual Embeddings", "NLP", "Python"],
      },
      {
        id: "exp-2",
        role: "Software Development Intern",
        company: "Fonlutions",
        location: "Netherlands-based, Remote",
        period: "Mar 2026 – Jun 2026",
        bullets: [
          "Developed and shipped web application features alongside AI-driven automation workflows.",
          "Collaborated with an international engineering team to design, build, and deploy scalable solutions powered by n8n and Make (Integromat).",
          "Applied Agile practices in a global remote environment, adopting next-generation AI automation tools to streamline delivery.",
        ],
        tags: ["n8n", "Make", "Full Stack", "Agile", "Remote Collaboration", "APIs"],
      },
      {
        id: "exp-3",
        role: "Intern",
        company: "10Pearls",
        location: "Karachi, Pakistan / Remote",
        period: "[START DATE – END DATE]",
        isPlaceholder: true, // Marked editable placeholder
        bullets: [
          "[Bullet 1: what I built — e.g. Contributed to enterprise software development lifecycle and feature implementations]",
          "[Bullet 2: tools/technologies used — e.g. Utilized MERN stack, automated testing pipelines, and modern agile tooling]",
          "[Bullet 3: result or impact — e.g. Boosted sprint velocity and delivered high-quality modular components]",
        ],
        tags: ["[ROLE TITLE]", "Enterprise Dev", "Agile", "Software Engineering"],
      },
    ] as Experience[],
  },

  projects: {
    sectionNumber: "04",
    label: "04 ── PROJECTS",
    heading: "FEATURED INNOVATIONS & RESEARCH",
    items: [
      {
        id: "recipe-ai",
        title: "Multimodal & Bilingual AI Recipe Recommendation System",
        subtitle: "Published at ICISCT 2026",
        description: "End-to-end image recognition + NLP system that recommends authentic recipes in both Urdu and English. Features custom dataset curation, ingredient detection computer vision model, cross-language recipe matching, and intelligent recommendation pipeline.",
        highlight: "Published Research (ICISCT 2026)",
        tags: ["Computer Vision", "NLP", "Multimodal AI", "Urdu/English", "Python", "TensorFlow", "Research"],
        github: "https://github.com/romanatahir",
        demo: "#",
        featured: true,
        category: "AI/ML",
        year: "2026",
        gradient: "from-amber-500/30 via-orange-600/20 to-neutral-900/60",
      },
      {
        id: "life-link",
        title: "Life Link — Blood & Organ Donation Web App",
        subtitle: "Top Exhibition Project @ SSUET",
        description: "Full-Stack Blood & Organ Donation Web Platform integrating emergency matching, donor notification, and automated verification workflows. Selected as a top exhibition project at Sir Syed University.",
        highlight: "Top Exhibition Award @ SSUET",
        tags: ["MongoDB", "Express.js", "React", "Node.js", "AI Automation", "MERN"],
        github: "https://github.com/romanatahir",
        demo: "#",
        featured: true,
        category: "Full Stack",
        year: "2025",
        gradient: "from-red-600/30 via-amber-600/20 to-neutral-900/60",
      },
      {
        id: "blood-buddy",
        title: "Blood Buddy — Desktop Application",
        subtitle: "Top Exhibition Project @ SSUET",
        description: "High-efficiency Data Structures & Algorithms and relational MySQL database platform to optimize blood bank inventory and live emergency donor tracking.",
        highlight: "Top Exhibition Award @ SSUET",
        tags: ["Java", "MySQL", "DSA", "Full Stack Architecture"],
        github: "https://github.com/romanatahir",
        demo: "#",
        featured: false,
        category: "Full Stack",
        year: "2024",
        gradient: "from-amber-600/30 via-yellow-700/20 to-neutral-900/60",
      },
      {
        id: "islamic-rag",
        title: "Islamic Q&A RAG Chatbot",
        subtitle: "Ronin Production RAG System",
        description: "ChromaDB vector database and multilingual embeddings pipeline indexing authentic Islamic sources (Quran, Hadith Bukhari & Muslim, Tafsir Ibn Kathir) with precise source citations and FastAPI backend.",
        highlight: "Source-Cited AI Retrieval",
        tags: ["RAG", "ChromaDB", "FastAPI", "Multilingual Embeddings", "Python", "LLMs"],
        github: "https://github.com/romanatahir",
        demo: "#",
        featured: true,
        category: "AI/ML",
        year: "2026",
        gradient: "from-emerald-600/30 via-amber-600/20 to-neutral-900/60",
      },
      {
        id: "ai-automation-pipeline",
        title: "Autonomous AI Workflow & CRM Engine",
        subtitle: "Enterprise n8n & Claude Pipeline",
        description: "Autonomous end-to-end multi-agent workflow integrating n8n, Make (Integromat), Claude, and webhook APIs for automated lead scoring, sentiment analysis, and intelligent routing.",
        highlight: "Autonomous AI Orchestration",
        tags: ["n8n", "Make", "Claude", "Webhooks", "AI Automation", "APIs"],
        github: "https://github.com/romanatahir",
        demo: "#",
        featured: true,
        category: "Automation",
        year: "2026",
        gradient: "from-purple-600/30 via-amber-600/20 to-neutral-900/60",
      },
      {
        id: "canvas-coffee",
        title: "Canvas & Coffee by Romana",
        subtitle: "Artisan Responsive Web Experience",
        description: "Modern, dynamic responsive website featuring elegant fluid typography, custom aesthetic styling, smooth animations, and optimized Node.js / TypeScript backend services.",
        highlight: "Modern UI/UX & High Performance",
        tags: ["TypeScript", "HTML5", "CSS3", "Node.js", "Interactive UI"],
        github: "https://github.com/romanatahir",
        demo: "#",
        featured: false,
        category: "Full Stack",
        year: "2024",
        gradient: "from-amber-700/30 via-orange-800/20 to-neutral-900/60",
      },
    ] as Project[],
  },

  education: {
    sectionNumber: "05",
    label: "05 ── EDUCATION",
    heading: "ACADEMIC FOUNDATION & TRAINING",
    items: [
      {
        degree: "B.Sc. Software Engineering",
        institution: "Sir Syed University of Engineering and Technology (SSUET)",
        location: "Karachi, Pakistan",
        period: "2023 – 2027",
        details: "CGPA 3.77 · University Merit Scholarship recipient every semester. Active member and contributor at IEEE Women in Engineering (WIE) Society.",
        honors: [
          "CGPA 3.77 / 4.00",
          "Merit Scholarship (All Semesters)",
          "IEEE WIE Active Member",
        ],
      },
      {
        degree: "Intermediate in Pre-Engineering",
        institution: "Government Girls College for Women, Nazimabad",
        location: "Karachi, Pakistan",
        period: "2022 – 2023",
        details: "Strong foundations in Advanced Mathematics, Physics, and Analytical Problem Solving.",
        honors: ["A Grade / First Division"],
      },
      {
        degree: "Course: Web and App Development",
        institution: "Saylani Mass IT Training Program (SMIT)",
        location: "Karachi, Pakistan",
        period: "2024",
        details: "Comprehensive hands-on training in full-stack web technologies, modern JavaScript ecosystems, and application deployment.",
        honors: ["2nd Place Hackathon Winner"],
      },
    ] as Education[],
  },

  numbers: {
    sectionNumber: "06",
    label: "06 ── BY THE NUMBERS",
    heading: "MEASURABLE IMPACT & EXCELLENCE",
    stats: [
      {
        value: 3.77,
        decimals: 2,
        suffix: "",
        prefix: "",
        label: "CGPA",
        description: "Consistent academic distinction at SSUET",
      },
      {
        value: 3,
        suffix: "",
        label: "Internships",
        description: "AI, Full Stack & Automation across international teams",
      },
      {
        value: 1,
        suffix: "",
        label: "Research Paper",
        description: "Published and presented at ICISCT 2026",
      },
      {
        value: 2,
        suffix: "",
        label: "Top Exhibition Projects",
        description: "Selected at Sir Syed University showcases",
      },
      {
        value: 2,
        suffix: "nd",
        label: "Place Hackathon",
        description: "Recognized among top builders at SMIT",
      },
    ] as StatItem[],
  },

  achievements: {
    sectionNumber: "07",
    label: "07 ── ACHIEVEMENTS",
    heading: "HONORS, RECOGNITIONS & MILESTONES",
    items: [
      {
        title: "International Research Publication",
        event: "ICISCT 2026 Conference",
        year: "2026",
        description: "Co-authored and presented research on 'Multimodal & Bilingual AI Recipe Recommendation System', introducing novel dataset and cross-language ingredient mapping.",
        icon: "FileText",
      },
      {
        title: "University Merit Scholarship",
        event: "Sir Syed University of Engineering and Technology",
        year: "2023 – Present",
        description: "Awarded continuous Merit Scholarship every single semester in recognition of outstanding academic performance (CGPA 3.77).",
        icon: "Award",
      },
      {
        title: "2nd Position in Hackathon",
        event: "Saylani Mass IT Training (SMIT)",
        year: "2024",
        description: "Secured runner-up award competing against dozens of developer teams for developing a high-impact web solution under time constraints.",
        icon: "Trophy",
      },
      {
        title: "Double Top Exhibition Project Selection",
        event: "SSUET Tech Project Showcase",
        year: "2024 & 2025",
        description: "Both 'Life Link' (Full Stack Web App) and 'Blood Buddy' (Java Desktop App) were spotlighted among the university's best final showcase projects.",
        icon: "Sparkles",
      },
    ] as Achievement[],
  },

  contact: {
    sectionNumber: "08",
    label: "08 ── CONTACT",
    heading: "LET'S WORK TOGETHER",
    subtitle: "Have a project in mind, an opportunity to collaborate, or want to discuss AI, RAG architectures, and web development? Let's connect.",
    email: "romanatahir1803@gmail.com",
    phone: "+92 319 6697205",
    linkedin: "https://linkedin.com/in/romana-tahir",
    github: "https://github.com/romanatahir",
    location: "Karachi, Pakistan",
  },
};
