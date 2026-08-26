import "server-only";
import { IContentRepository } from "../repository-types";
import { Project, WorkExperience, Service, Article, SocialLink, ContactFormConfig, SkillCategory } from "@/data/types";

const notConfiguredError = () => {
  throw new Error("Database content source is not configured. Complete Phase 3B before enabling database mode.");
};

export const getPublishedProjects = async (): Promise<Project[]> => {
  return notConfiguredError();
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return notConfiguredError();
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  return notConfiguredError();
};

export const getPublishedExperiences = async (): Promise<WorkExperience[]> => {
  return notConfiguredError();
};

export const getPublishedServices = async (): Promise<Service[]> => {
  return notConfiguredError();
};

export const getPublishedArticles = async (): Promise<Article[]> => {
  return notConfiguredError();
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  return notConfiguredError();
};

export const getSiteProfile = async () => {
  return notConfiguredError();
};

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  return notConfiguredError();
};

export const getContactConfig = async (): Promise<ContactFormConfig | null> => {
  return notConfiguredError();
};

export const getSkillCategories = async (): Promise<SkillCategory[]> => {
  return notConfiguredError();
};
