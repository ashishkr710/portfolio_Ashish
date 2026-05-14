// ===== Type Definitions for Portfolio =====

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  type: 'education' | 'work' | 'achievement';
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
