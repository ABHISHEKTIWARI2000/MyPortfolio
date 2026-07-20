export const siteConfig = {
  // Personal Info
  name: "Abhishek Kumar Tiwari",
  shortName: "Abhishek",
  title: "M.Tech CSE @ IIT Guwahati",
  tagline: "Software Engineer · Researcher · Problem Solver",
  bio: "An IIT Guwahati M.Tech graduate with strong Computer Science fundamentals, proven research experience, hands-on systems implementation, and a consistent passion for solving challenging engineering problems.",
  bioExtended:
    "I thrive at the intersection of systems thinking, rigorous research, and practical implementation. From designing novel IoT authentication protocols to building real-time network simulators, I approach every challenge with engineering discipline and intellectual curiosity.",
  aiReady:
    "Equally comfortable taking on AI work — actively building fluency in Generative AI, Agentic AI, LLMs, and ML tooling on top of a rigorous CS foundation. A fast learner who ships.",
  recruiterSignals: [
    "CS Fundamentals",
    "Research Mindset",
    "Systems Thinking",
    "AI-Ready",
    "Problem Solver",
    "Fast Learner",
  ],
  currentStatus: "Seeking Software Engineering roles (2026)",
  rollNo: "244101067",

  // Contact
  email: "abhishektiwari02000@gmail.com",
  emailAlt: "abhishekkt@iitg.ac.in",
  phone: "+91-8299193528",
  whatsapp: "918299193528",

  // Social Links
  github: "https://github.com/abhishektiwari2000",
  linkedin: "https://linkedin.com/in/abhishek-k-tiwari",
  leetcode: "https://leetcode.com/abhishektiwari2000",
  geeksforgeeks: "https://geeksforgeeks.org/user/abhishektiwari2000",
  googleScholar: "",
  orcid: "",
  researchgate: "",
  twitter: "",

  // Assets
  profilePhoto: "/images/20260712_135525.jpg.jpeg",
  coverPhoto: "/images/20260411_132206.jpg.jpeg",
  resume: "/CV_(1).pdf",
  portfolioUrl: "https://abhishektiwari.dev",

  // SEO
  seo: {
    title: "Abhishek Kumar Tiwari | M.Tech CSE IIT Guwahati | Software Engineer",
    description:
      "Portfolio of Abhishek Kumar Tiwari — M.Tech Computer Science, IIT Guwahati. Researcher, Teaching Assistant, IoT Security, Systems Programming. GATE AIR-1219.",
    keywords:
      "Abhishek Kumar Tiwari, IIT Guwahati, M.Tech CSE, Software Engineer, IoT Security, LiDRA, GATE 2024, Teaching Assistant",
    ogImage: "/images/20260712_135525.jpg.jpeg",
    canonicalUrl: "https://abhishektiwari.dev",
    twitterHandle: "@abhishektiwari",
    author: "Abhishek Kumar Tiwari",
  },

  // Education
  education: [
    {
      degree: "M.Tech in Computer Science and Engineering",
      institution: "Indian Institute of Technology, Guwahati",
      shortName: "IIT Guwahati",
      cgpa: "7.56",
      period: "2024 – 2026",
      type: "postgrad",
      location: "Guwahati, Assam",
      highlights: [
        "Specialization in Systems & Security",
        "Teaching Assistant — 3 courses",
        "M.Tech Thesis on IoT Authentication",
        "Published research paper (Under Review)",
      ],
      logo: "🎓",
    },
    {
      degree: "B.Tech in Electrical & Electronics Engineering",
      institution: "ABES Engineering College, Ghaziabad",
      shortName: "ABES Engineering",
      cgpa: "7.94",
      period: "2019 – 2023",
      type: "undergrad",
      location: "Ghaziabad, UP",
      highlights: [
        "Strong foundation in Electronics & CS",
        "Transitioned to CS with GATE 2024",
      ],
      logo: "🏛️",
    },
    {
      degree: "Senior Secondary (XII)",
      institution: "UP Board",
      shortName: "UP Board",
      cgpa: "72.20%",
      period: "2018",
      type: "school",
      location: "Uttar Pradesh",
      highlights: [],
      logo: "📚",
    },
    {
      degree: "Secondary (X)",
      institution: "CBSE Board",
      shortName: "CBSE",
      cgpa: "8.20",
      period: "2016",
      type: "school",
      location: "",
      highlights: [],
      logo: "📖",
    },
  ],

  // Experience
  experience: [
    {
      role: "Teaching Assistant",
      organization: "Dept. of CSE, IIT Guwahati",
      period: "Jan 2024 – Jul 2026",
      type: "Academic",
      courses: [
        {
          code: "CS343/344",
          name: "Operating Systems",
          description: "Lab sessions, evaluation, and student mentoring",
        },
        {
          code: "CS101",
          name: "Introduction to Programming",
          description: "Hands-on programming labs and doubt sessions",
        },
        {
          code: "CS578",
          name: "Internet of Things",
          description: "Delivered lectures and designed assignments",
        },
      ],
      highlights: [
        "Assisted in teaching, lab conduction, and evaluation across 3 major courses",
        "Received positive feedback from 80+ students for clarity in lab sessions",
        "Conducted OS and Programming lab sessions hands-on",
        "Delivered standalone lectures for IoT course",
        "Bridged gap between theory and practice for junior students",
      ],
      impact: "80+ students",
      tags: ["Teaching", "Mentoring", "Operating Systems", "IoT", "Programming"],
    },
  ],

  // Research / Thesis
  research: {
    title: "Lightweight and Adaptive Mutual Authentication for IoT Applications (LiDRA)",
    type: "M.Tech Thesis",
    supervisor: "Dr. Manas Khatua",
    supervisorTitle: "Associate Professor, Dept. of CSE, IIT Guwahati",
    period: "Jul 2025 – Jul 2026",
    problem:
      "Existing IoT authentication protocols suffer complete restarts upon verification failure in multihop networks, causing massive computational and communication overhead — a critical bottleneck in resource-constrained environments.",
    contribution:
      "Proposed LiDRA, the first recovery-enabled authentication framework for multihop IoT networks. Designed a novel recovery mechanism and integrated AA-PUF to resist ML modeling attacks.",
    innovations: [
      "First recovery-enabled authentication framework for multihop IoT",
      "AA-PUF integration to thwart ML modeling attacks",
      "Formal verification using ProVerif under Dolev-Yao model",
      "Validated on COOJA with 100-node simulation",
      "Implemented on real hardware: Raspberry Pi 4",
    ],
    metrics: [
      { label: "Computational Overhead Reduction", value: "50.4%", icon: "cpu" },
      { label: "Communication Overhead Reduction", value: "70.5%", icon: "network" },
      { label: "ML Attack Accuracy (AA-PUF)", value: ">97% → <32%", icon: "shield" },
      { label: "Security Properties Verified", value: "14", icon: "check" },
      { label: "COOJA Simulation Nodes", value: "100", icon: "server" },
      { label: "CPU Time Reduction (RPi 4)", value: "97.2%", icon: "zap" },
    ],
    tools: ["ProVerif", "COOJA Simulator", "Raspberry Pi 4", "C/C++", "Python"],
    tags: ["IoT Security", "Authentication", "PUF", "Formal Verification", "Embedded Systems"],
  },

  // Projects
  projects: [
    {
      id: "lidra",
      title: "LiDRA: IoT Authentication Framework",
      subtitle: "M.Tech Thesis Project",
      period: "Jul 2025 – Jul 2026",
      description:
        "Designed and implemented the first recovery-enabled mutual authentication framework for multihop IoT networks, eliminating full protocol restarts upon failure.",
      tech: ["C/C++", "Python", "ProVerif", "COOJA", "Raspberry Pi 4", "AA-PUF"],
      metrics: ["50.4% lower compute overhead", "70.5% less communication", "97.2% CPU reduction on RPi 4", "14 properties formally verified"],
      github: "https://github.com/abhishektiwari2000",
      demo: "",
      featured: true,
      category: "Research",
      tags: ["IoT", "Security", "Embedded", "Formal Verification"],
    },
    {
      id: "smart-room",
      title: "Smart Humidity-Controlled Room Automation",
      subtitle: "Self Project",
      period: "Aug 2025 – Nov 2025",
      description:
        "Cloud-connected smart room system using NodeMCU, DHT11, and PIR sensors. Automated fan/buzzer control based on humidity thresholds and motion detection.",
      tech: ["ESP8266", "NodeMCU", "DHT11", "PIR Sensor", "Arduino IoT Cloud", "C++"],
      metrics: ["Real-time cloud monitoring", "Automated energy optimization", "Remote control capability"],
      github: "https://github.com/abhishektiwari2000",
      demo: "",
      featured: true,
      category: "IoT",
      tags: ["IoT", "Embedded", "Arduino", "Cloud"],
    },
    {
      id: "video-streaming",
      title: "Video Streaming Simulation (TCP/UDP)",
      subtitle: "Course Project — CS 558: Systems Lab",
      period: "Jan 2025 – Apr 2025",
      description:
        "Multi-threaded video streaming simulator in C using socket programming. Analyzed throughput, latency, and packet loss across resolutions with FCFS and Round-Robin scheduling.",
      tech: ["C", "Socket Programming", "TCP", "UDP", "POSIX Threads", "Linux"],
      metrics: ["30% lower latency with Round-Robin", "Multi-resolution analysis", "Concurrent client handling"],
      github: "https://github.com/abhishektiwari2000",
      demo: "",
      featured: true,
      category: "Systems",
      tags: ["Systems", "Networking", "C", "Multithreading"],
    },
    {
      id: "stammer-detection",
      title: "Gender-Specific Stammer Detection",
      subtitle: "Course Project — CS 566: Speech Processing",
      period: "Nov 2024 – Dec 2024",
      description:
        "Speech processing system detecting and classifying stammering across male/female voices using Vector Quantization (LBG) and Hidden Markov Models.",
      tech: ["Python", "HMM", "LBG Algorithm", "Baum-Welch", "Viterbi", "Signal Processing"],
      metrics: ["90% classification accuracy", "6 stammering classes", "Gender-specific detection"],
      github: "https://github.com/abhishektiwari2000",
      demo: "",
      featured: false,
      category: "ML/AI",
      tags: ["Speech Processing", "HMM", "Machine Learning", "Python"],
    },
  ],

  // Publication
  publication: {
    title: "LiDRA: Lightweight Distributed Recovery-Enabled Authentication for Multihop IoT Networks",
    authors: ["Abhishek Kumar Tiwari", "S. Das", "M. Khatua"],
    status: "Under Review",
    venue: "",
    year: "2026",
    abstract:
      "Proposes LiDRA, a novel lightweight authentication framework for multihop IoT that enables recovery from verification failures without full protocol restarts, significantly reducing overhead while maintaining formal security guarantees.",
    doi: "",
    arxiv: "",
    tags: ["IoT Security", "Authentication Protocol", "PUF", "Network Security"],
  },

  // Technical Skills
  skills: {
    programmingLanguages: [
      { name: "C/C++", level: 90, primary: true },
      { name: "Python", level: 75, primary: true },
      { name: "SQL", level: 60, primary: false },
    ],
    systemsTools: [
      { name: "Git", level: 85 },
      { name: "Linux/POSIX", level: 80 },
      { name: "Socket Programming", level: 80 },
      { name: "COOJA Simulator", level: 85 },
      { name: "ProVerif", level: 75 },
      { name: "PowerBI", level: 55 },
    ],
    iot: [
      { name: "Arduino / ESP8266", level: 80 },
      { name: "Raspberry Pi 4", level: 80 },
      { name: "Arduino IoT Cloud", level: 70 },
      { name: "NodeMCU", level: 75 },
      { name: "DHT11 / PIR Sensors", level: 75 },
    ],
    coreCS: [
      "Operating Systems",
      "Computer Networks",
      "Data Structures & Algorithms",
      "Design & Analysis of Algorithms",
      "Computer Architecture",
    ],
    languages: [
      { name: "English", level: "Professional" },
      { name: "Hindi", level: "Native" },
    ],
  },

  // Courses
  courses: [
    "Design and Analysis of Algorithms",
    "Computer Systems Lab",
    "Speech Processing",
    "Introduction to Internet of Things",
    "Operating System",
    "Computer Network",
    "Internet of Things (CS578)",
  ],

  // Problem Solving
  problemSolving: {
    totalSolved: 250,
    breakdown: { easy: 90, medium: 120, hard: 40 },
    primaryLanguage: "C++",
    topics: [
      "Arrays", "Strings", "Linked Lists", "Stacks", "Queues",
      "Trees", "BST", "Graphs", "BFS", "DFS",
      "Dynamic Programming", "Greedy", "Binary Search",
      "Sliding Window", "Recursion", "Backtracking",
      "Heaps", "Hashing", "Bit Manipulation",
      "Tries", "Segment Trees", "SQL",
    ],
    platforms: {
      leetcode: "https://leetcode.com/abhishektiwari2000",
      geeksforgeeks: "https://geeksforgeeks.org/user/abhishektiwari2000",
    },
  },

  // Currently Learning
  currentlyLearning: [
    { topic: "Generative AI", description: "Understanding modern generative models and architectures", icon: "brain" },
    { topic: "Agentic AI", description: "Exploring agent-based systems and autonomous workflows", icon: "bot" },
    { topic: "Python for AI Development", description: "Deepening Python skills for ML/AI pipelines", icon: "code" },
    { topic: "Machine Learning Fundamentals", description: "Core ML algorithms, optimization, and model evaluation", icon: "trending-up" },
    { topic: "Neural Networks", description: "Feedforward networks, backpropagation, and architectures", icon: "layers" },
    { topic: "LLM Fundamentals", description: "Transformer architecture, attention mechanisms, tokenization", icon: "message-square" },
    { topic: "Prompt Engineering", description: "Systematic prompting strategies for effective LLM interactions", icon: "terminal" },
    { topic: "AI Tooling", description: "LangChain, HuggingFace, and modern AI development ecosystem", icon: "wrench" },
  ],

  // Achievements
  achievements: [
    {
      title: "GATE 2024 — AIR 1219",
      subtitle: "Computer Science & Engineering",
      detail: "out of 1,23,967 candidates",
      year: "2024",
      icon: "award",
      color: "blue",
    },
    {
      title: "GATE 2024 — AIR 997",
      subtitle: "Data Analytics (DA)",
      detail: "out of 39,210 candidates",
      year: "2024",
      icon: "award",
      color: "teal",
    },
    {
      title: "Research Publication",
      subtitle: "Under Review",
      detail: "LiDRA — IoT Authentication Framework",
      year: "2026",
      icon: "file-text",
      color: "green",
    },
    {
      title: "IIT Guwahati Selection",
      subtitle: "M.Tech CSE",
      detail: "Admitted via GATE 2024 merit",
      year: "2024",
      icon: "graduation-cap",
      color: "amber",
    },
    {
      title: "AI-Ready Engineer",
      subtitle: "Modern AI Stack",
      detail: "Generative AI, Agentic AI, LLMs, ML Tooling",
      year: "2026",
      icon: "sparkles",
      color: "blue",
    },
  ],

  // Leadership
  leadership: [
    {
      role: "Mentor",
      organization: "Saathi Club, IIT Guwahati",
      period: "Aug 2025 – Jul 2026",
      description:
        "Organized events focused on mental well-being of students. Provided peer mentoring and created a supportive campus community.",
      tags: ["Mentoring", "Student Well-being", "Leadership", "Community"],
    },
  ],

  // Trust Badges (Hero)
  trustBadges: [
    { label: "IIT Guwahati", icon: "graduation-cap" },
    { label: "M.Tech CSE", icon: "cpu" },
    { label: "Teaching Assistant", icon: "users" },
    { label: "Researcher", icon: "flask" },
    { label: "Publication", icon: "file-text" },
    { label: "GATE Qualified", icon: "award" },
    { label: "AI-Ready", icon: "sparkles" },
  ],

  // Analytics placeholder
  analytics: {
    googleAnalyticsId: "",
    clarityId: "",
  },
};
