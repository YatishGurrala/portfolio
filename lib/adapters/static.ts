
import { projects, getProjectBySlug as getStaticProjectBySlug } from "@/data/projects";
import { experiences } from "@/data/experience";
import { services } from "@/data/services";
import { articles } from "@/data/articles";
import { siteConfig } from "@/data/site";
import { socialLinks, contactFormConfig } from "@/data/socialLinks";
import { skillCategories } from "@/data/skills";
import { Project, WorkExperience, Service, Article, SocialLink, ContactFormConfig, SkillCategory } from "@/data/types";

export const getPublishedProjects = async (): Promise<Project[]> => {
  return [...projects];
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return projects.filter((p) => p.featured);
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  return getStaticProjectBySlug(slug) || null;
};

export const getPublishedExperiences = async (): Promise<WorkExperience[]> => {
  return [...experiences];
};

export const getPublishedServices = async (): Promise<Service[]> => {
  return [...services];
};

export const getPublishedArticles = async (): Promise<Article[]> => {
  return [...articles];
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  // Static articles doesn't have slug, but let's derive it or match title slugified
  return articles.find((a) => a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug) || null;
};

export const getSiteProfile = async () => {
  return { ...siteConfig };
};

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  return socialLinks.filter((link) => link.href.trim().length > 0);
};

export const getContactConfig = async (): Promise<ContactFormConfig | null> => {
  return { ...contactFormConfig };
};

export const getSkillCategories = async (): Promise<SkillCategory[]> => {
  return [...skillCategories];
};
