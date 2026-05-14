import type { Project, SkillCategory, TimelineItem, NavLink, Stat } from '../types';

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const stats: Stat[] = [
  { label: 'Years Experience', value: 1.4, suffix: '+' },
  { label: 'Projects Completed', value: 10, suffix: '+' },
  { label: 'Technologies Used', value: 15, suffix: '+' },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 90, icon: 'React' },
      { name: 'Next.js', level: 85, icon: 'Globe' },
      { name: 'TypeScript', level: 85, icon: 'FileCode' },
      { name: 'Tailwind CSS', level: 90, icon: 'Wind' },
    ],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 85, icon: 'Terminal' },
      { name: 'Spring Boot', level: 80, icon: 'Cpu' },
      { name: 'Express.js', level: 85, icon: 'Server' },
      { name: 'REST APIs', level: 90, icon: 'Globe' },
    ],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: [
      { name: 'MySQL', level: 85, icon: 'Database' },
      { name: 'MongoDB', level: 80, icon: 'Database' },
      { name: 'PostgreSQL', level: 75, icon: 'Database' },
    ],
  },
  {
    title: 'Tools & AI',
    icon: 'Cpu',
    skills: [
      { name: 'Docker', level: 75, icon: 'Zap' },
      { name: 'CI/CD (GitLab)', level: 70, icon: 'Terminal' },
      { name: 'Vapi AI', level: 80, icon: 'Zap' },
      { name: 'Git/GitHub', level: 85, icon: 'Github' },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'padel-sports',
    title: 'Padel Sports',
    tagline: 'Court Booking Application',
    description: 'A full-stack padel court booking system featuring secure APIs and real-time availability management. Developed during my tenure at smartData Enterprises Inc.',
    image: '/images/padel sport.png',
    techStack: ['Next.js', 'Node.js', 'shadcn/ui', 'MySQL', 'JWT'],
    features: [
      'Real-time court availability tracking',
      'Secure JWT-based authentication system',
      'Seamless booking workflow with MySQL backend',
      'Responsive UI designed with shadcn/ui components'
    ],
    challenges: [
      'Handling complex booking slot collisions',
      'Optimizing database queries for real-time availability'
    ],
    githubUrl: '#',
    category: 'Full Stack',
  },
  {
    id: 'ai-advisor',
    title: 'AI Advisor',
    tagline: 'Automotive Service Assistant',
    description: 'An AI-powered voice and chat assistant for car service scheduling. Integrated Vapi AI with backend systems to automate customer assistance and appointment booking.',
    image: '/images/ai visor.png',
    techStack: ['Node.js', 'Express.js', 'Vapi AI', 'AI Automation'],
    features: [
      '60% reduction in manual call handling via automation',
      'Real-time customer data fetching from incoming calls',
      'Automated car service appointment booking',
      'Voice-AI workflow integration with backend APIs'
    ],
    challenges: [
      'Managing low-latency AI voice interactions',
      'Ensuring accurate data extraction from various call qualities'
    ],
    githubUrl: '#',
    category: 'AI / Automation',
  },
  {
    id: 'project-management',
    title: 'Project Management System',
    tagline: 'Integrated Planning & Collaboration',
    description: 'A comprehensive management system combining project planning, task tracking, and reporting, built on the Model-View-Controller (MVC) architectural pattern.',
    image: '/images/poject managemanet.png',
    techStack: ['React.js', 'Spring Boot', 'MVC Pattern', 'Java'],
    features: [
      'Unified task tracking and collaboration module',
      'Structured reporting and progress analytics',
      'Modular design for easy feature expansion',
      'Seamless React frontend with Spring backend'
    ],
    challenges: [
      'Implementing a clean MVC separation in a large codebase',
      'Optimizing state management for complex project trees'
    ],
    githubUrl: 'https://github.com/ashishkr710/Integrated-Project-Management-System',
    category: 'Enterprise',
  },
  {
    id: 'hostel-bazar',
    title: 'Hostel Bazar',
    tagline: 'Campus E-Commerce Site',
    description: 'A specialized platform for buying and selling used goods within university campuses, featuring a unique unified module for buyers and sellers.',
    image: '/images/hostel bazzar.png',
    techStack: ['MySQL', 'Thymeleaf', 'Java', 'E-Commerce', 'Spring Boot'],
    features: [
      'Dual-functionality module for simultaneous buying/selling',
      'Optimized database for campus-specific listings',
      'Secure user interaction for campus trading',
      'Server-side rendering with Thymeleaf for speed'
    ],
    challenges: [
      'Building a balanced UX for a dual-role user base',
      'Managing localized campus search and filters'
    ],
    githubUrl: 'https://github.com/ashishkr710/HostelBazaar_E-Commerce',
    category: 'E-Commerce',
  },
];

export const timeline: TimelineItem[] = [
  {
    id: 'exp-freelance',
    title: 'Freelance Full Stack Developer',
    subtitle: 'Self-Employed',
    description: 'Developing custom web solutions, AI integrations, and high-performance frontend interfaces for diverse clients worldwide.',
    date: 'Jan 2026 - Present',
    type: 'work',
    icon: 'Briefcase',
  },
  {
    id: 'exp-smartdata',
    title: 'Associate Software Engineer',
    subtitle: 'smartData Enterprises Inc.',
    description: 'Engineered REST APIs with Node.js & Express (improved session retention by 25%). Developed a real-time Padel Sports booking platform with WebSockets & AWS. Integrated Vapi AI voice systems to reduce call handling by 60%.',
    date: 'Sep 2024 - Dec 2025',
    type: 'work',
    icon: 'Briefcase',
  },
  {
    id: 'edu-1',
    title: 'Computer Science Graduate',
    subtitle: 'University',
    description: 'Focused on software engineering, data structures, and algorithm design.',
    date: '2021 - 2024',
    type: 'education',
    icon: 'GraduationCap',
  },
];

export const pretext = {
  hero: {
    tagline: "Building modern scalable web experiences with AI-powered solutions.",
    description: "Crafting digital excellence through clean code and innovative design. Transforming complex challenges into elegant, high-performance web applications."
  },
  about: {
    paragraph1: "I am a dedicated Full Stack Developer with over 1.4 years of professional experience, including a significant tenure at smartData Enterprises Inc. as an Associate Software Engineer. I specialize in building high-performance web applications and intelligent AI-powered assistants that solve complex business challenges.",
    paragraph2: "My expertise spans across the MERN stack, Next.js, and Java-based backend systems. I am passionate about engineering clean, scalable code and creating premium user interfaces that deliver exceptional digital experiences. Currently, I am leveraging my skills as a freelancer to build innovative solutions for global clients."
  },
  contact: {
    title: "Let's Build Something Extraordinary",
    description: "Have a project in mind or want to explore potential collaborations? Reach out and let's start a conversation about your next big idea."
  },
  footer: {
    tagline: "Designed and built with passion by Ashish Kumar."
  }
};
