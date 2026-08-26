import { Project, WorkExperience, Service, Article, SocialLink, ContactFormConfig, SkillCategory } from "@/data/types";

export type ContentSource = "static" | "database";

export interface IContentRepository {
  getPublishedProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getPublishedExperiences(): Promise<WorkExperience[]>;
  getPublishedServices(): Promise<Service[]>;
  getPublishedArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
  getSiteProfile(): Promise<{
    name: string;
    shortName: string;
    siteName: string;
    title: string;
    description: string;
    siteUrl: string;
    discussProjectLabel: string;
    viewWorkLabel: string;
    roleSummary: string[];
    heroIndicators: string[];
    process: string[];
    navigation: { label: string; href: string }[];
  } | null>;
  getSocialLinks(): Promise<SocialLink[]>;
  getContactConfig(): Promise<ContactFormConfig | null>;
  getSkillCategories(): Promise<SkillCategory[]>;
}

export function validateContentSource(source: unknown): ContentSource {
  if (source === undefined || source === null || source === "") {
    return "static";
  }
  if (source === "static" || source === "database") {
    return source as ContentSource;
  }
  throw new Error(`Invalid PORTFOLIO_CONTENT_SOURCE: "${source}". Expected "static" or "database".`);
}
