import { pgTable, uuid, text, boolean, integer, jsonb, timestamp, date, unique, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// 1. Site Profiles Table (Singleton pattern)
export const siteProfiles = pgTable(
  "site_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: text("key").unique().notNull().default("singleton"),
    name: text("name").notNull(),
    shortName: text("short_name").notNull(),
    siteName: text("site_name").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    discussProjectLabel: text("discuss_project_label").notNull(),
    viewWorkLabel: text("view_work_label").notNull(),
    roleSummary: jsonb("role_summary").$type<string[]>().notNull(),
    heroIndicators: jsonb("hero_indicators").$type<string[]>().notNull(),
    process: jsonb("process").$type<string[]>().notNull(),
    navigation: jsonb("navigation").$type<{ label: string; href: string }[]>().notNull(),
    skills: jsonb("skills").$type<{ title: string; items: string[] }[]>().notNull(),
    biography: text("biography"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  }
);

// 2. Social Links Table
export const socialLinks = pgTable(
  "social_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    platformKey: text("platform_key").unique().notNull(),
    label: text("label").notNull(),
    href: text("href").notNull(),
    note: text("note"),
    enabled: boolean("enabled").notNull().default(false),
    displayOrder: integer("display_order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  }
);

// 3. Contact Configuration Table (Singleton pattern)
export const contactConfig = pgTable(
  "contact_config",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: text("key").unique().notNull().default("singleton"),
    formEnabled: boolean("form_enabled").notNull().default(false),
    formEndpoint: text("form_endpoint"),
    emailEnabled: boolean("email_enabled").notNull().default(false),
    emailLink: text("email_link"),
    bookingEnabled: boolean("booking_enabled").notNull().default(false),
    bookingLink: text("booking_link"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  () => [
    check("form_endpoint_check", sql`NOT form_enabled OR form_endpoint IS NOT NULL`),
    check("email_link_check", sql`NOT email_enabled OR email_link IS NOT NULL`),
    check("booking_link_check", sql`NOT booking_enabled OR booking_link IS NOT NULL`),
  ]
);

// 4. Services Table
export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    businessOutcome: text("business_outcome").notNull(),
    deliverables: jsonb("deliverables").$type<string[]>().notNull(),
    category: text("category").notNull(),
    featured: boolean("featured").notNull().default(false),
    displayOrder: integer("display_order").notNull(),
    publicationStatus: text("publication_status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  () => [
    check("services_pub_status_check", sql`publication_status IN ('draft', 'published', 'archived')`),
  ]
);

// 5. Work Experiences Table
export const workExperiences = pgTable(
  "work_experiences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    stableKey: text("stable_key").unique().notNull(),
    organization: text("organization").notNull(),
    role: text("role").notNull(),
    employmentType: text("employment_type"),
    startDate: text("start_date").notNull(), // YYYY-MM
    endDate: text("end_date"), // YYYY-MM
    current: boolean("current").notNull().default(false),
    location: text("location"),
    summary: text("summary").notNull(),
    highlights: jsonb("highlights").$type<string[]>().notNull(),
    technologies: jsonb("technologies").$type<string[]>().notNull(),
    confidentialitySafeName: text("confidentiality_safe_name"),
    featured: boolean("featured").notNull().default(false),
    displayOrder: integer("display_order").notNull(),
    publicationStatus: text("publication_status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  () => [
    check("exp_pub_status_check", sql`publication_status IN ('draft', 'published', 'archived')`),
  ]
);

// 6. Projects Table
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    title: text("title").notNull(),
    shortDescription: text("short_description").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull(),
    tags: jsonb("tags").$type<string[]>().notNull(),
    thumbnail: text("thumbnail").notNull(),
    featured: boolean("featured").notNull().default(false),
    liveUrl: text("live_url"),
    repositoryUrl: text("repository_url"),
    confidentialityStatus: text("confidentiality_status").notNull(),
    confidentialityLabel: text("confidentiality_label").notNull(),
    confidentialityNote: text("confidentiality_note"),
    role: text("role").notNull(),
    duration: text("duration").notNull(),
    projectType: text("project_type").notNull(),
    heroSummary: text("hero_summary").notNull(),
    overviewProduct: text("overview_product").notNull(),
    overviewAudience: text("overview_audience").notNull(),
    overviewPurpose: text("overview_purpose").notNull(),
    problem: jsonb("problem").$type<string[]>().notNull(),
    solution: jsonb("solution").$type<string[]>().notNull(),
    responsibilities: jsonb("responsibilities").$type<string[]>().notNull(),
    keyFeatures: jsonb("key_features").$type<{ title: string; description: string }[]>().notNull(),
    screenshots: jsonb("screenshots").$type<{ src: string; alt: string; caption: string; type: string; videoUrl?: string }[]>().notNull(),
    architecture: jsonb("architecture").$type<{ label: string; items: string[] }[]>().notNull(),
    challenges: jsonb("challenges").$type<{ challenge: string; solution: string }[]>().notNull(),
    developmentProcess: jsonb("development_process").$type<string[]>().notNull(),
    results: jsonb("results").$type<string[]>().notNull(),
    lessonsLearned: jsonb("lessons_learned").$type<string[]>().notNull(),
    nextSteps: jsonb("next_steps").$type<string[]>().notNull(),
    projectStatus: text("project_status").notNull().default("live"),
    publicationStatus: text("publication_status").notNull().default("draft"),
    displayOrder: integer("display_order").notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    durationLabelOverride: text("duration_label_override"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  () => [
    check("proj_pub_status_check", sql`publication_status IN ('draft', 'published', 'archived')`),
    check("proj_lifecycle_status_check", sql`project_status IN ('development', 'launch_preparation', 'live', 'paused', 'archived')`),
    check("proj_date_or_override_check", sql`start_date IS NOT NULL OR duration_label_override IS NOT NULL`),
  ]
);

// 7. Work Experience Projects (Many-to-Many Join Table)
export const workExperienceProjects = pgTable(
  "work_experience_projects",
  {
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => workExperiences.id, { onDelete: "cascade" }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
  },
  (table) => [
    unique("work_experience_project_pk").on(table.experienceId, table.projectId),
  ]
);

// 8. Articles Table
export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    articleType: text("article_type").notNull(), // 'internal' | 'external'
    title: text("title").notNull(),
    description: text("description").notNull(),
    platform: text("platform").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    coverImage: text("cover_image"),
    externalUrl: text("external_url"),
    markdownContent: text("markdown_content"),
    tags: jsonb("tags").$type<string[]>().notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    publicationStatus: text("publication_status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  () => [
    check("art_pub_status_check", sql`publication_status IN ('draft', 'published', 'archived')`),
    check("art_type_check", sql`article_type IN ('internal', 'external')`),
    check("art_internal_content_check", sql`publication_status != 'published' OR article_type != 'internal' OR markdown_content IS NOT NULL`),
    check("art_external_url_check", sql`publication_status != 'published' OR article_type != 'external' OR external_url IS NOT NULL`),
  ]
);
