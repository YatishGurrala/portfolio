import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { getDatabaseUrls } from "./config";
import { siteConfig } from "../../data/site";
import { skillCategories } from "../../data/skills";
import { socialLinks as staticSocialLinks, contactFormConfig as staticContact } from "../../data/socialLinks";
import { services as staticServices } from "../../data/services";
import { experiences as staticExperiences } from "../../data/experience";
import { projects as staticProjects } from "../../data/projects";

// Read migration connection URL
const { migrationUrl } = getDatabaseUrls();
if (!migrationUrl) {
  throw new Error("Migration URL is missing. Cannot seed database.");
}

const client = neon(migrationUrl);
const db = drizzle(client, { schema });

async function main() {
  console.log("Starting idempotent seed...");

  // 1. Seed Site Profile (Singleton)
  console.log("Seeding site profile...");
  await db
    .insert(schema.siteProfiles)
    .values({
      key: "singleton",
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      siteName: siteConfig.siteName,
      title: siteConfig.title,
      description: siteConfig.description,
      discussProjectLabel: siteConfig.discussProjectLabel,
      viewWorkLabel: siteConfig.viewWorkLabel,
      roleSummary: siteConfig.roleSummary,
      heroIndicators: siteConfig.heroIndicators,
      process: siteConfig.process,
      navigation: siteConfig.navigation,
      skills: skillCategories,
      biography: null,
    })
    .onConflictDoUpdate({
      target: schema.siteProfiles.key,
      set: {
        name: siteConfig.name,
        shortName: siteConfig.shortName,
        siteName: siteConfig.siteName,
        title: siteConfig.title,
        description: siteConfig.description,
        discussProjectLabel: siteConfig.discussProjectLabel,
        viewWorkLabel: siteConfig.viewWorkLabel,
        roleSummary: siteConfig.roleSummary,
        heroIndicators: siteConfig.heroIndicators,
        process: siteConfig.process,
        navigation: siteConfig.navigation,
        skills: skillCategories,
        updatedAt: new Date(),
      },
    });

  // 2. Seed Social Links
  console.log("Seeding social links...");
  for (let i = 0; i < staticSocialLinks.length; i++) {
    const link = staticSocialLinks[i];
    const platformKey = link.label.toLowerCase();
    const enabled = link.href.trim().length > 0;
    
    await db
      .insert(schema.socialLinks)
      .values({
        platformKey,
        label: link.label,
        href: link.href || "",
        note: link.note || null,
        enabled,
        displayOrder: i,
      })
      .onConflictDoUpdate({
        target: schema.socialLinks.platformKey,
        set: {
          label: link.label,
          href: link.href || "",
          note: link.note || null,
          enabled,
          displayOrder: i,
          updatedAt: new Date(),
        },
      });
  }

  // 3. Seed Contact Config (Singleton)
  console.log("Seeding contact config...");
  const formEnabled = staticContact.formspreeEndpoint.trim().length > 0;
  const emailEnabled = staticContact.emailLink.trim().length > 0;
  const bookingEnabled = staticContact.calendlyLink.trim().length > 0;

  await db
    .insert(schema.contactConfig)
    .values({
      key: "singleton",
      formEnabled,
      formEndpoint: formEnabled ? staticContact.formspreeEndpoint : null,
      emailEnabled,
      emailLink: emailEnabled ? staticContact.emailLink : null,
      bookingEnabled,
      bookingLink: bookingEnabled ? staticContact.calendlyLink : null,
    })
    .onConflictDoUpdate({
      target: schema.contactConfig.key,
      set: {
        formEnabled,
        formEndpoint: formEnabled ? staticContact.formspreeEndpoint : null,
        emailEnabled,
        emailLink: emailEnabled ? staticContact.emailLink : null,
        bookingEnabled,
        bookingLink: bookingEnabled ? staticContact.calendlyLink : null,
        updatedAt: new Date(),
      },
    });

  // 4. Seed Services
  console.log("Seeding services...");
  for (let i = 0; i < staticServices.length; i++) {
    const s = staticServices[i];
    await db
      .insert(schema.services)
      .values({
        slug: s.slug,
        title: s.title,
        summary: s.summary,
        businessOutcome: s.businessOutcome,
        deliverables: s.deliverables,
        category: s.category,
        featured: s.category === "Core",
        displayOrder: i,
        publicationStatus: "published",
      })
      .onConflictDoUpdate({
        target: schema.services.slug,
        set: {
          title: s.title,
          summary: s.summary,
          businessOutcome: s.businessOutcome,
          deliverables: s.deliverables,
          category: s.category,
          featured: s.category === "Core",
          displayOrder: i,
          publicationStatus: "published",
          updatedAt: new Date(),
        },
      });
  }

  // 5. Seed Work Experiences
  console.log("Seeding work experiences...");
  for (let i = 0; i < staticExperiences.length; i++) {
    const exp = staticExperiences[i];
    const stableKey = `${exp.organization.toLowerCase()}-${exp.role.toLowerCase()}`;
    await db
      .insert(schema.workExperiences)
      .values({
        stableKey,
        organization: exp.organization,
        role: exp.role,
        employmentType: exp.employmentType || null,
        startDate: exp.startDate,
        endDate: exp.endDate || null,
        current: exp.current,
        location: exp.location || null,
        summary: exp.summary,
        highlights: exp.highlights,
        technologies: exp.technologies,
        confidentialitySafeName: exp.confidentialitySafeName || null,
        featured: exp.featured,
        displayOrder: i,
        publicationStatus: "published",
      })
      .onConflictDoUpdate({
        target: schema.workExperiences.stableKey,
        set: {
          organization: exp.organization,
          role: exp.role,
          employmentType: exp.employmentType || null,
          startDate: exp.startDate,
          endDate: exp.endDate || null,
          current: exp.current,
          location: exp.location || null,
          summary: exp.summary,
          highlights: exp.highlights,
          technologies: exp.technologies,
          confidentialitySafeName: exp.confidentialitySafeName || null,
          featured: exp.featured,
          displayOrder: i,
          publicationStatus: "published",
          updatedAt: new Date(),
        },
      });
  }

  // 6. Seed Projects
  console.log("Seeding projects...");
  const dbProjects: Record<string, string> = {};

  for (let i = 0; i < staticProjects.length; i++) {
    const p = staticProjects[i];
    
    let projectStatus: "development" | "launch_preparation" | "live" | "paused" | "archived" = "live";
    let startDate: string | null = null;
    const endDate: string | null = null;
    let durationLabelOverride: string | null = null;

    if (p.slug === "citegpt") {
      projectStatus = "live";
      startDate = "2026-07-01";
    } else if (p.slug === "resumeloop-ai") {
      projectStatus = "live";
      startDate = "2026-01-01";
    } else if (p.slug === "calsnap-ai") {
      projectStatus = "launch_preparation";
      durationLabelOverride = "Launch preparation";
    } else if (p.slug === "techbckp") {
      projectStatus = "live";
      durationLabelOverride = "Ongoing";
    } else {
      projectStatus = "archived";
      durationLabelOverride = "Professional experience";
    }

    const inserted = await db
      .insert(schema.projects)
      .values({
        slug: p.slug,
        title: p.title,
        shortDescription: p.shortDescription,
        description: p.description,
        category: p.category,
        tags: p.tags,
        thumbnail: p.thumbnail,
        featured: p.featured,
        liveUrl: p.liveUrl || null,
        repositoryUrl: p.repositoryUrl || null,
        confidentialityStatus: p.confidentiality.status,
        confidentialityLabel: p.confidentiality.label,
        confidentialityNote: p.confidentiality.note || null,
        role: p.role,
        duration: p.duration,
        projectType: p.projectType,
        heroSummary: p.heroSummary,
        overviewProduct: p.overview.product,
        overviewAudience: p.overview.audience,
        overviewPurpose: p.overview.purpose,
        problem: p.problem,
        solution: p.solution,
        responsibilities: p.responsibilities,
        keyFeatures: p.keyFeatures,
        screenshots: p.screenshots,
        architecture: p.architecture,
        challenges: p.challenges,
        developmentProcess: p.developmentProcess,
        results: p.results,
        lessonsLearned: p.lessonsLearned,
        nextSteps: p.nextSteps,
        projectStatus,
        publicationStatus: "published",
        displayOrder: i,
        startDate,
        endDate,
        durationLabelOverride,
      })
      .onConflictDoUpdate({
        target: schema.projects.slug,
        set: {
          title: p.title,
          shortDescription: p.shortDescription,
          description: p.description,
          category: p.category,
          tags: p.tags,
          thumbnail: p.thumbnail,
          featured: p.featured,
          liveUrl: p.liveUrl || null,
          repositoryUrl: p.repositoryUrl || null,
          confidentialityStatus: p.confidentiality.status,
          confidentialityLabel: p.confidentiality.label,
          confidentialityNote: p.confidentiality.note || null,
          role: p.role,
          duration: p.duration,
          projectType: p.projectType,
          heroSummary: p.heroSummary,
          overviewProduct: p.overview.product,
          overviewAudience: p.overview.audience,
          overviewPurpose: p.overview.purpose,
          problem: p.problem,
          solution: p.solution,
          responsibilities: p.responsibilities,
          keyFeatures: p.keyFeatures,
          screenshots: p.screenshots,
          architecture: p.architecture,
          challenges: p.challenges,
          developmentProcess: p.developmentProcess,
          results: p.results,
          lessonsLearned: p.lessonsLearned,
          nextSteps: p.nextSteps,
          projectStatus,
          publicationStatus: "published",
          displayOrder: i,
          startDate,
          endDate,
          durationLabelOverride,
          updatedAt: new Date(),
        },
      })
      .returning({ id: schema.projects.id, slug: schema.projects.slug });

    dbProjects[inserted[0].slug] = inserted[0].id;
  }

  // 7. Seed Work Experience Projects (Relationships)
  console.log("Seeding work experience projects...");
  await db.delete(schema.workExperienceProjects);

  for (let i = 0; i < staticExperiences.length; i++) {
    const exp = staticExperiences[i];
    const stableKey = `${exp.organization.toLowerCase()}-${exp.role.toLowerCase()}`;
    
    const dbExp = await db.query.workExperiences.findFirst({
      where: (we, { eq }) => eq(we.stableKey, stableKey),
    });

    if (dbExp && exp.relatedProjectSlugs) {
      for (const projectSlug of exp.relatedProjectSlugs) {
        const projectId = dbProjects[projectSlug];
        if (projectId) {
          await db
            .insert(schema.workExperienceProjects)
            .values({
              experienceId: dbExp.id,
              projectId,
            })
            .onConflictDoNothing();
        }
      }
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed execution failed:", err);
    process.exit(1);
  });
