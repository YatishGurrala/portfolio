import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and } from "drizzle-orm";
import { IContentRepository } from "../repository-types";
import { getDatabaseUrls } from "../db/config";
import * as schema from "../db/schema";
import { Project, WorkExperience, Service, Article, SocialLink, ContactFormConfig, SkillCategory } from "@/data/types";

// Lazy connection initialization
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (!dbInstance) {
    const { runtimeUrl } = getDatabaseUrls();
    const client = neon(runtimeUrl);
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
}

export const getPublishedProjects = async (): Promise<Project[]> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.publicationStatus, "published"))
    .orderBy(schema.projects.displayOrder);

  return rows.map((r) => ({
    title: r.title,
    slug: r.slug,
    shortDescription: r.shortDescription,
    description: r.description,
    category: r.category as Project["category"],
    tags: r.tags,
    thumbnail: r.thumbnail,
    featured: r.featured,
    liveUrl: r.liveUrl || undefined,
    repositoryUrl: r.repositoryUrl || undefined,
    caseStudyUrl: `/projects/${r.slug}`,
    confidentiality: {
      status: r.confidentialityStatus as "public" | "limited",
      label: r.confidentialityLabel,
      note: r.confidentialityNote || undefined,
    },
    role: r.role,
    duration: r.duration,
    projectType: r.projectType,
    heroSummary: r.heroSummary,
    overview: {
      product: r.overviewProduct,
      audience: r.overviewAudience,
      purpose: r.overviewPurpose,
    },
    problem: r.problem,
    solution: r.solution,
    responsibilities: r.responsibilities,
    keyFeatures: r.keyFeatures,
    screenshots: r.screenshots as Project["screenshots"],
    architecture: r.architecture,
    challenges: r.challenges,
    developmentProcess: r.developmentProcess,
    results: r.results,
    lessonsLearned: r.lessonsLearned,
    nextSteps: r.nextSteps,
  }));
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.projects)
    .where(
      and(
        eq(schema.projects.publicationStatus, "published"),
        eq(schema.projects.featured, true)
      )
    )
    .orderBy(schema.projects.displayOrder);

  return rows.map((r) => ({
    title: r.title,
    slug: r.slug,
    shortDescription: r.shortDescription,
    description: r.description,
    category: r.category as Project["category"],
    tags: r.tags,
    thumbnail: r.thumbnail,
    featured: r.featured,
    liveUrl: r.liveUrl || undefined,
    repositoryUrl: r.repositoryUrl || undefined,
    caseStudyUrl: `/projects/${r.slug}`,
    confidentiality: {
      status: r.confidentialityStatus as "public" | "limited",
      label: r.confidentialityLabel,
      note: r.confidentialityNote || undefined,
    },
    role: r.role,
    duration: r.duration,
    projectType: r.projectType,
    heroSummary: r.heroSummary,
    overview: {
      product: r.overviewProduct,
      audience: r.overviewAudience,
      purpose: r.overviewPurpose,
    },
    problem: r.problem,
    solution: r.solution,
    responsibilities: r.responsibilities,
    keyFeatures: r.keyFeatures,
    screenshots: r.screenshots as Project["screenshots"],
    architecture: r.architecture,
    challenges: r.challenges,
    developmentProcess: r.developmentProcess,
    results: r.results,
    lessonsLearned: r.lessonsLearned,
    nextSteps: r.nextSteps,
  }));
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.projects)
    .where(
      and(
        eq(schema.projects.slug, slug),
        eq(schema.projects.publicationStatus, "published")
      )
    )
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  const r = rows[0];
  return {
    title: r.title,
    slug: r.slug,
    shortDescription: r.shortDescription,
    description: r.description,
    category: r.category as Project["category"],
    tags: r.tags,
    thumbnail: r.thumbnail,
    featured: r.featured,
    liveUrl: r.liveUrl || undefined,
    repositoryUrl: r.repositoryUrl || undefined,
    caseStudyUrl: `/projects/${r.slug}`,
    confidentiality: {
      status: r.confidentialityStatus as "public" | "limited",
      label: r.confidentialityLabel,
      note: r.confidentialityNote || undefined,
    },
    role: r.role,
    duration: r.duration,
    projectType: r.projectType,
    heroSummary: r.heroSummary,
    overview: {
      product: r.overviewProduct,
      audience: r.overviewAudience,
      purpose: r.overviewPurpose,
    },
    problem: r.problem,
    solution: r.solution,
    responsibilities: r.responsibilities,
    keyFeatures: r.keyFeatures,
    screenshots: r.screenshots as Project["screenshots"],
    architecture: r.architecture,
    challenges: r.challenges,
    developmentProcess: r.developmentProcess,
    results: r.results,
    lessonsLearned: r.lessonsLearned,
    nextSteps: r.nextSteps,
  };
};

export const getPublishedExperiences = async (): Promise<WorkExperience[]> => {
  const db = getDb();
  const rows = await db
    .select({
      exp: schema.workExperiences,
      projSlug: schema.projects.slug,
    })
    .from(schema.workExperiences)
    .where(eq(schema.workExperiences.publicationStatus, "published"))
    .leftJoin(schema.workExperienceProjects, eq(schema.workExperiences.id, schema.workExperienceProjects.experienceId))
    .leftJoin(schema.projects, eq(schema.workExperienceProjects.projectId, schema.projects.id))
    .orderBy(schema.workExperiences.displayOrder);

  // Group join results by experience stableKey
  const map: Record<string, WorkExperience & { displayOrder: number }> = {};
  for (const row of rows) {
    const { exp, projSlug } = row;
    if (!map[exp.stableKey]) {
      map[exp.stableKey] = {
        organization: exp.organization,
        role: exp.role,
        employmentType: exp.employmentType || undefined,
        startDate: exp.startDate,
        endDate: exp.endDate || undefined,
        current: exp.current,
        location: exp.location || undefined,
        summary: exp.summary,
        highlights: exp.highlights,
        technologies: exp.technologies,
        confidentialitySafeName: exp.confidentialitySafeName || undefined,
        featured: exp.featured,
        relatedProjectSlugs: [],
        displayOrder: exp.displayOrder,
      };
    }
    if (projSlug) {
      map[exp.stableKey].relatedProjectSlugs?.push(projSlug);
    }
  }

  return Object.values(map)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((exp) => ({
      organization: exp.organization,
      role: exp.role,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      location: exp.location,
      summary: exp.summary,
      highlights: exp.highlights,
      technologies: exp.technologies,
      confidentialitySafeName: exp.confidentialitySafeName,
      featured: exp.featured,
      relatedProjectSlugs: exp.relatedProjectSlugs?.length ? exp.relatedProjectSlugs : undefined,
    }));
};

export const getPublishedServices = async (): Promise<Service[]> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.services)
    .where(eq(schema.services.publicationStatus, "published"))
    .orderBy(schema.services.displayOrder);

  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    businessOutcome: r.businessOutcome,
    deliverables: r.deliverables,
    category: r.category as Service["category"],
  }));
};

export const getPublishedArticles = async (): Promise<Article[]> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.articles)
    .where(eq(schema.articles.publicationStatus, "published"));

  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    platform: r.platform,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : "",
    coverImage: r.coverImage || "",
    externalUrl: r.externalUrl || "",
    tags: r.tags,
  }));
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.articles)
    .where(
      and(
        eq(schema.articles.slug, slug),
        eq(schema.articles.publicationStatus, "published")
      )
    )
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  const r = rows[0];
  return {
    title: r.title,
    description: r.description,
    platform: r.platform,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : "",
    coverImage: r.coverImage || "",
    externalUrl: r.externalUrl || "",
    tags: r.tags,
  };
};

export const getSiteProfile = async (): Promise<SiteProfile | null> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.siteProfiles)
    .where(eq(schema.siteProfiles.key, "singleton"))
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  const r = rows[0];
  return {
    name: r.name,
    shortName: r.shortName,
    siteName: r.siteName,
    title: r.title,
    description: r.description,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000",
    discussProjectLabel: r.discussProjectLabel,
    viewWorkLabel: r.viewWorkLabel,
    roleSummary: r.roleSummary,
    heroIndicators: r.heroIndicators,
    process: r.process,
    navigation: r.navigation,
  };
};

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.socialLinks)
    .where(eq(schema.socialLinks.enabled, true))
    .orderBy(schema.socialLinks.displayOrder);

  return rows.map((r) => ({
    label: r.label,
    href: r.href,
    ...(r.note ? { note: r.note } : {}),
  }));
};

export const getContactConfig = async (): Promise<ContactFormConfig | null> => {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.contactConfig)
    .where(eq(schema.contactConfig.key, "singleton"))
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  const r = rows[0];
  return {
    formspreeEndpoint: r.formEndpoint || "",
    emailLink: r.emailLink || "",
    calendlyLink: r.bookingLink || "",
    googleFormLink: "",
    placeholderNote: "",
  };
};

export const getSkillCategories = async (): Promise<SkillCategory[]> => {
  const db = getDb();
  const rows = await db
    .select({
      skills: schema.siteProfiles.skills,
    })
    .from(schema.siteProfiles)
    .where(eq(schema.siteProfiles.key, "singleton"))
    .limit(1);

  if (rows.length === 0) {
    return [];
  }

  return rows[0].skills;
};

// Implement unified repository factory adapter
export const dbRepository: IContentRepository = {
  getPublishedProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getPublishedExperiences,
  getPublishedServices,
  getPublishedArticles,
  getArticleBySlug,
  getSiteProfile,
  getSocialLinks,
  getContactConfig,
  getSkillCategories,
};
export default dbRepository;

interface SiteProfile {
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
}
