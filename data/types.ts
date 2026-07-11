export type ProjectCategory =
  | "AI and SaaS"
  | "Mobile Apps"
  | "Web Apps"
  | "Agency Work"
  | "Professional Experience";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  note?: string;
}

export interface ContactFormConfig {
  formspreeEndpoint: string;
  emailLink: string;
  calendlyLink: string;
  googleFormLink: string;
  placeholderNote: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  businessOutcome: string;
  deliverables: string[];
  category: "Core" | "Engagement";
}

export interface Article {
  title: string;
  description: string;
  platform: string;
  publishedAt: string;
  coverImage: string;
  externalUrl: string;
  tags: string[];
  placeholder?: boolean;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  type: "desktop" | "mobile" | "mockup" | "diagram" | "video";
  videoUrl?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ChallengeItem {
  challenge: string;
  solution: string;
}

export interface ArchitectureSection {
  label: string;
  items: string[];
}

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  liveUrl?: string;
  repositoryUrl?: string;
  caseStudyUrl: string;
  confidentiality: {
    status: "public" | "limited";
    label: string;
    note?: string;
  };
  role: string;
  duration: string;
  projectType: string;
  heroSummary: string;
  overview: {
    product: string;
    audience: string;
    purpose: string;
  };
  problem: string[];
  solution: string[];
  responsibilities: string[];
  keyFeatures: FeatureItem[];
  screenshots: Screenshot[];
  architecture: ArchitectureSection[];
  challenges: ChallengeItem[];
  developmentProcess: string[];
  results: string[];
  lessonsLearned: string[];
  nextSteps: string[];
}
