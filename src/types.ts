export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'all' | 'fullstack' | 'web' | 'mobile' | 'design';
  image: string;
  fallbackGradient: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics: string;
  keyFeatures: string[];
  year: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'tools';
  level: number; // 1-100
  experience: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
  youtube: string;
}

export interface ProfileData {
  name: string;
  title: string;
  shortBio: string;
  fullBio: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  avatarUrl: string;
  socialLinks: SocialLinks;
}

export interface PublishingGuideItem {
  id: string;
  title: string;
  provider: string;
  freeTierSummary: string;
  badge: string;
  bestFor: string;
  steps: string[];
  commandSample?: string;
  configNotes?: string;
  pros: string[];
}
