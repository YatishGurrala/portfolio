/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";

(process.env as any).NODE_ENV = "test";

// Mock 'server-only' for Node CJS runtime during testing
const serverOnlyPath = require.resolve("server-only");
require.cache[serverOnlyPath] = {
  id: serverOnlyPath,
  filename: serverOnlyPath,
  loaded: true,
  exports: {},
  parent: null,
  children: []
} as any;

// Helper to load env from .env.local dynamically
const envLocalPath = path.resolve("./.env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.substring(0, idx).trim();
        const value = trimmed.substring(idx + 1).trim().replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

// Helper to isolate process.env changes safely without string conversion gotchas
async function runWithEnv(env: Record<string, string | undefined>, fn: () => void | Promise<void>) {
  const originalEnv = { ...process.env };
  try {
    for (const key in env) {
      if (env[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = env[key] as string;
      }
    }

    // Clear module cache so modules re-initialize with new env variables
    try {
      delete require.cache[require.resolve("./content-repository")];
    } catch (_) {}
    try {
      delete require.cache[require.resolve("./adapters/db")];
    } catch (_) {}

    return await fn();
  } finally {
    // Clear keys added
    for (const key in process.env) {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    }
    // Restore original values
    for (const key in originalEnv) {
      process.env[key] = originalEnv[key] as string;
    }
    // Clean up cache to prevent leaking test environment state
    try {
      delete require.cache[require.resolve("./content-repository")];
    } catch (_) {}
    try {
      delete require.cache[require.resolve("./adapters/db")];
    } catch (_) {}
  }
}

test("Yatish Gurrala Portfolio - Content Repository Test Suite", async (suite) => {

  // ==========================================
  // SECTION 1: Config & Lazy Loading Tests
  // ==========================================

  await suite.test("1. Static mode works when no database variables exist", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "static",
        DATABASE_URL: undefined,
        NEON_DATABASE_URL: undefined,
        POSTGRES_URL: undefined,
        POSTGRES_URL_NON_POOLING: undefined,
        DATABASE_URL_UNPOOLED: undefined,
      },
      async () => {
        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();
        assert.ok(repository, "Repository should resolve in static mode without DB env variables.");

        const siteProfile = await repository.getSiteProfile();
        assert.equal(siteProfile?.name, "Yatish Gurrala");
      }
    );
  });

  await suite.test("2. Static mode does not evaluate or load the database adapter", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "static",
      },
      async () => {
        // Eagerly delete cache to trace if require gets hit
        try {
          delete require.cache[require.resolve("./adapters/db")];
        } catch (_) {}

        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();
        await repository.getSiteProfile();

        let isDbLoaded = false;
        try {
          isDbLoaded = !!require.cache[require.resolve("./adapters/db")];
        } catch (_) {}
        assert.strictEqual(isDbLoaded, false, "Database adapter should not be loaded in static mode.");
      }
    );
  });

  await suite.test("3. Missing PORTFOLIO_CONTENT_SOURCE defaults to static", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: undefined,
      },
      async () => {
        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();
        const siteProfile = await repository.getSiteProfile();
        assert.equal(siteProfile?.name, "Yatish Gurrala", "Default source should be static.");
      }
    );
  });

  await suite.test("4. Invalid source values throw a clear error", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "invalid_source_value",
      },
      async () => {
        assert.throws(
          () => {
            require("./content-repository");
          },
          /Invalid PORTFOLIO_CONTENT_SOURCE: "invalid_source_value"/,
          "Should throw an error for unsupported source configurations."
        );
      }
    );
  });

  await suite.test("5. Explicit database mode without variables fails clearly", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "database",
        DATABASE_URL: undefined,
        NEON_DATABASE_URL: undefined,
        POSTGRES_URL: undefined,
        POSTGRES_URL_NON_POOLING: undefined,
        DATABASE_URL_UNPOOLED: undefined,
      },
      async () => {
        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();

        await assert.rejects(
          async () => {
            await repository.getSiteProfile();
          },
          /Database connection error: DATABASE_URL or POSTGRES_URL is missing/,
          "Should return not-configured error in database mode without variables."
        );
      }
    );
  });

  // ==========================================
  // SECTION 2: Data & Static Parity Tests
  // ==========================================

  await suite.test("6. Static repository project count matches the existing source", async () => {
    await runWithEnv({ PORTFOLIO_CONTENT_SOURCE: "static" }, async () => {
      const { getContentRepository } = require("./content-repository");
      const repository = await getContentRepository();
      const { projects } = await import("../data/projects");
      const repoProjects = await repository.getPublishedProjects();
      assert.strictEqual(repoProjects.length, projects.length, "Project list size should match static data.");
    });
  });

  await suite.test("7. Featured project selection matches existing behavior", async () => {
    await runWithEnv({ PORTFOLIO_CONTENT_SOURCE: "static" }, async () => {
      const { getContentRepository } = require("./content-repository");
      const repository = await getContentRepository();
      const { featuredProjects } = await import("../data/projects");
      const repoFeatured = await repository.getFeaturedProjects();
      assert.strictEqual(repoFeatured.length, featuredProjects.length, "Featured projects count should match.");
      assert.deepEqual(
        repoFeatured.map((p: any) => p.slug),
        featuredProjects.map((p: any) => p.slug),
        "Featured project slug lists must align exactly."
      );
    });
  });

  await suite.test("8. Every existing project slug resolves correctly", async () => {
    await runWithEnv({ PORTFOLIO_CONTENT_SOURCE: "static" }, async () => {
      const { getContentRepository } = require("./content-repository");
      const repository = await getContentRepository();
      const { projects } = await import("../data/projects");
      for (const project of projects) {
        const resolved = await repository.getProjectBySlug(project.slug);
        assert.ok(resolved, `Project slug "${project.slug}" must resolve.`);
        assert.strictEqual(resolved.title, project.title, "Resolved project title must match.");
      }
    });
  });

  await suite.test("9. Unknown project slugs return null", async () => {
    await runWithEnv({ PORTFOLIO_CONTENT_SOURCE: "static" }, async () => {
      const { getContentRepository } = require("./content-repository");
      const repository = await getContentRepository();
      const resolved = await repository.getProjectBySlug("non-existent-project-slug");
      assert.strictEqual(resolved, null, "Resolving an unknown slug must return null.");
    });
  });

  await suite.test("10. Existing work experience, services, profile, and configs preserve parity", async () => {
    await runWithEnv({ PORTFOLIO_CONTENT_SOURCE: "static" }, async () => {
      const { getContentRepository } = require("./content-repository");
      const repository = await getContentRepository();

      const { experiences } = await import("../data/experience");
      const { services } = await import("../data/services");
      const { siteConfig } = await import("../data/site");
      const { socialLinks, contactFormConfig } = await import("../data/socialLinks");
      const { skillCategories } = await import("../data/skills");

      const repoExperiences = await repository.getPublishedExperiences();
      const repoServices = await repository.getPublishedServices();
      const repoProfile = await repository.getSiteProfile();
      const repoSocials = await repository.getSocialLinks();
      const repoContact = await repository.getContactConfig();
      const repoSkills = await repository.getSkillCategories();

      assert.strictEqual(repoExperiences.length, experiences.length, "Experiences count should match.");
      assert.strictEqual(repoServices.length, services.length, "Services count should match.");
      assert.strictEqual(repoSkills.length, skillCategories.length, "Skill categories count should match.");
      assert.strictEqual(repoProfile?.name, siteConfig.name, "Site profile name should match.");
      const activeStaticSocials = socialLinks.filter((s) => s.href.length > 0);
      assert.strictEqual(repoSocials.length, activeStaticSocials.length, "Active social links count should match.");
      assert.strictEqual(repoContact?.formspreeEndpoint, contactFormConfig.formspreeEndpoint, "Contact config endpoint should match.");
    });
  });

  await suite.test("11. Client Components do not import server-only repository modules", async () => {
    const clientComponentPath = path.resolve("./components/projects/projects-explorer.tsx");
    const code = fs.readFileSync(clientComponentPath, "utf-8");

    assert.ok(!code.includes("content-repository"), "Client Component must not import content repository.");
    assert.ok(!code.includes("adapters/static"), "Client Component must not import static adapter.");
    assert.ok(!code.includes("adapters/db"), "Client Component must not import db adapter.");
  });

  // ==========================================
  // SECTION 3: Database & Static Parity Tests
  // ==========================================

  const { runtimeUrl } = require("./db/config").getDatabaseUrls();
  if (!runtimeUrl) {
    console.log("Skipping Database Parity tests: DATABASE_URL not present.");
    return;
  }

  // Define parity helper running in database source environment
  const runDbParityTest = (fn: (dbRepo: any, staticRepo: any) => Promise<void>) => {
    return runWithEnv({ PORTFOLIO_CONTENT_SOURCE: "database" }, async () => {
      const { getContentRepository } = require("./content-repository");
      const dbRepo = await getContentRepository();
      const staticRepo = require("./adapters/static");
      await fn(dbRepo, staticRepo);
    });
  };

  await suite.test("12. Site profile parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const dbProfile = await dbRepo.getSiteProfile();
      const staticProfile = await staticRepo.getSiteProfile();

      assert.ok(dbProfile);
      assert.ok(staticProfile);
      assert.strictEqual(dbProfile.name, staticProfile.name);
      assert.strictEqual(dbProfile.title, staticProfile.title);
      assert.strictEqual(dbProfile.description, staticProfile.description);
      assert.deepEqual(dbProfile.roleSummary, staticProfile.roleSummary);
      assert.deepEqual(dbProfile.heroIndicators, staticProfile.heroIndicators);
      assert.deepEqual(dbProfile.process, staticProfile.process);
    });
  });

  await suite.test("13. Skills parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const dbSkills = await dbRepo.getSkillCategories();
      const staticSkills = await staticRepo.getSkillCategories();
      assert.deepEqual(dbSkills, staticSkills);
    });
  });

  await suite.test("14. Social links parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const dbSocials = await dbRepo.getSocialLinks();
      const staticSocials = await staticRepo.getSocialLinks();
      assert.deepEqual(dbSocials, staticSocials);
    });
  });

  await suite.test("15. Project list size and featured parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const dbProjects = await dbRepo.getPublishedProjects();
      const staticProjects = await staticRepo.getPublishedProjects();
      assert.strictEqual(dbProjects.length, staticProjects.length);

      const dbFeatured = await dbRepo.getFeaturedProjects();
      const staticFeatured = await staticRepo.getFeaturedProjects();
      assert.deepEqual(
        dbFeatured.map((p: any) => p.slug),
        staticFeatured.map((p: any) => p.slug)
      );
    });
  });

  await suite.test("16. Project details and slugs parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const staticProjects = await staticRepo.getPublishedProjects();
      for (const staticProj of staticProjects) {
        const dbProj = await dbRepo.getProjectBySlug(staticProj.slug);
        assert.ok(dbProj);
        assert.strictEqual(dbProj.title, staticProj.title);
        assert.strictEqual(dbProj.shortDescription, staticProj.shortDescription);
        assert.strictEqual(dbProj.duration, staticProj.duration);
        assert.strictEqual(dbProj.role, staticProj.role);
        assert.deepEqual(dbProj.tags, staticProj.tags);
        assert.deepEqual(dbProj.problem, staticProj.problem);
        assert.deepEqual(dbProj.solution, staticProj.solution);
      }
    });
  });

  await suite.test("17. Work experience parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const dbExp = await dbRepo.getPublishedExperiences();
      const staticExp = await staticRepo.getPublishedExperiences();
      assert.strictEqual(dbExp.length, staticExp.length);
      for (let i = 0; i < staticExp.length; i++) {
        assert.strictEqual(dbExp[i].organization, staticExp[i].organization);
        assert.strictEqual(dbExp[i].role, staticExp[i].role);
        assert.strictEqual(dbExp[i].startDate, staticExp[i].startDate);
        assert.strictEqual(dbExp[i].endDate, staticExp[i].endDate);
        assert.deepEqual(dbExp[i].highlights, staticExp[i].highlights);
        assert.deepEqual(dbExp[i].technologies, staticExp[i].technologies);
        assert.deepEqual(dbExp[i].relatedProjectSlugs, staticExp[i].relatedProjectSlugs);
      }
    });
  });

  await suite.test("18. Services parity", async () => {
    await runDbParityTest(async (dbRepo, staticRepo) => {
      const dbServices = await dbRepo.getPublishedServices();
      const staticServices = await staticRepo.getPublishedServices();
      assert.deepEqual(dbServices, staticServices);
    });
  });

  await suite.test("19. Empty articles state parity", async () => {
    await runDbParityTest(async (dbRepo) => {
      const dbArticles = await dbRepo.getPublishedArticles();
      assert.strictEqual(dbArticles.length, 0);
    });
  });

  await suite.test("20. Security - Draft and archived projects are filtered out", async () => {
    await runDbParityTest(async (dbRepo) => {
      const { neon } = require("@neondatabase/serverless");
      const { drizzle } = require("drizzle-orm/neon-http");
      const schema = require("./db/schema");

      const client = neon(runtimeUrl);
      const db = drizzle(client, { schema });

      // Insert a draft project
      const draftSlug = "test-draft-project";
      await db.insert(schema.projects).values({
        slug: draftSlug,
        title: "Test Draft",
        shortDescription: "Draft desc",
        description: "Full desc",
        category: "AI and SaaS",
        tags: [],
        thumbnail: "/img.svg",
        featured: false,
        confidentialityStatus: "public",
        confidentialityLabel: "Public project details",
        role: "Dev",
        duration: "1 month",
        projectType: "SaaS",
        heroSummary: "Hero",
        overviewProduct: "P",
        overviewAudience: "A",
        overviewPurpose: "Purp",
        problem: [],
        solution: [],
        responsibilities: [],
        keyFeatures: [],
        screenshots: [],
        architecture: [],
        challenges: [],
        developmentProcess: [],
        results: [],
        lessonsLearned: [],
        nextSteps: [],
        projectStatus: "development",
        publicationStatus: "draft",
        displayOrder: 99,
        durationLabelOverride: "Override",
      }).onConflictDoNothing();

      // Verify it is excluded
      const published = await dbRepo.getPublishedProjects();
      const found = published.find((p: any) => p.slug === draftSlug);
      assert.strictEqual(found, undefined, "Draft project must not be included in published list.");

      const resolved = await dbRepo.getProjectBySlug(draftSlug);
      assert.strictEqual(resolved, null, "Resolving draft project slug must return null.");

      // Clean up
      await db.delete(schema.projects).where(eq(schema.projects.slug, draftSlug));
    });
  });
});
