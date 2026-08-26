import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

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

// Helper to isolate process.env changes
function runWithEnv(env: Record<string, string | undefined>, fn: () => void | Promise<void>) {
  const originalEnv = { ...process.env };
  try {
    Object.assign(process.env, env);
    // Delete keys that are explicitly set to undefined
    for (const key in env) {
      if (env[key] === undefined) {
        delete process.env[key];
      }
    }
    return fn();
  } finally {
    process.env = originalEnv;
  }
}

test("Content Repository - Config & Lazy Loading Tests", async (t) => {
  await t.test("1. Static mode works when no database variables exist", async () => {
    // Clear connection variables to simulate empty environment
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "static",
        DATABASE_URL: undefined,
        NEON_DATABASE_URL: undefined,
        POSTGRES_URL: undefined,
      },
      async () => {
        // Clear module cache to force re-evaluation of environment variables
        const modulePath = path.resolve("./lib/content-repository.ts");
        delete require.cache[modulePath];
        delete require.cache[path.resolve("./lib/repository-types.ts")];
        delete require.cache[path.resolve("./lib/adapters/static.ts")];
        delete require.cache[path.resolve("./lib/adapters/db.ts")];

        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();
        assert.ok(repository, "Repository should resolve in static mode without DB env variables.");
        
        const siteProfile = await repository.getSiteProfile();
        assert.equal(siteProfile?.name, "Yatish Gurrala");
      }
    );
  });

  await t.test("2. Static mode does not evaluate or load the database adapter", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "static",
      },
      async () => {
        const modulePath = path.resolve("./lib/content-repository.ts");
        const dbAdapterPath = path.resolve("./lib/adapters/db.ts");
        delete require.cache[modulePath];
        delete require.cache[dbAdapterPath];

        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();
        await repository.getSiteProfile();

        const isDbLoaded = !!require.cache[dbAdapterPath];
        assert.strictEqual(isDbLoaded, false, "Database adapter should not be loaded in static mode.");
      }
    );
  });

  await t.test("3. Missing PORTFOLIO_CONTENT_SOURCE defaults to static", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: undefined,
      },
      async () => {
        const modulePath = path.resolve("./lib/content-repository.ts");
        delete require.cache[modulePath];

        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();
        const siteProfile = await repository.getSiteProfile();
        assert.equal(siteProfile?.name, "Yatish Gurrala", "Default source should be static.");
      }
    );
  });

  await t.test("4. Invalid source values throw a clear error", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "invalid_source_value",
      },
      async () => {
        const modulePath = path.resolve("./lib/content-repository.ts");
        delete require.cache[modulePath];

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

  await t.test("5. Explicit database mode returns the Phase 3B-not-configured error", async () => {
    await runWithEnv(
      {
        PORTFOLIO_CONTENT_SOURCE: "database",
      },
      async () => {
        const modulePath = path.resolve("./lib/content-repository.ts");
        delete require.cache[modulePath];

        const { getContentRepository } = require("./content-repository");
        const repository = await getContentRepository();

        await assert.rejects(
          async () => {
            await repository.getSiteProfile();
          },
          /Database content source is not configured/,
          "Should return the not-configured error in database mode."
        );
      }
    );
  });
});

test("Content Repository - Data & Static Parity Tests", async (t) => {
  // Clear env and load repository in static mode for parity tests
  const modulePath = path.resolve("./lib/content-repository.ts");
  delete require.cache[modulePath];
  process.env.PORTFOLIO_CONTENT_SOURCE = "static";
  const { getContentRepository } = require("./content-repository");
  const repository = await getContentRepository();

  await t.test("6. Static repository project count matches the existing source", async () => {
    const { projects } = await import("../data/projects");
    const repoProjects = await repository.getPublishedProjects();
    assert.strictEqual(repoProjects.length, projects.length, "Project list size should match static data size.");
  });

  await t.test("7. Featured project selection matches existing behavior", async () => {
    const { featuredProjects } = await import("../data/projects");
    const repoFeatured = await repository.getFeaturedProjects();
    assert.strictEqual(repoFeatured.length, featuredProjects.length, "Featured projects count should match.");
    assert.deepEqual(
      repoFeatured.map((p) => p.slug),
      featuredProjects.map((p) => p.slug),
      "Featured project slug lists must align exactly."
    );
  });

  await t.test("8. Every existing project slug resolves correctly", async () => {
    const { projects } = await import("../data/projects");
    for (const project of projects) {
      const resolved = await repository.getProjectBySlug(project.slug);
      assert.ok(resolved, `Project slug "${project.slug}" must resolve.`);
      assert.strictEqual(resolved.title, project.title, "Resolved project title must match.");
    }
  });

  await t.test("9. Unknown project slugs return null", async () => {
    const resolved = await repository.getProjectBySlug("non-existent-project-slug");
    assert.strictEqual(resolved, null, "Resolving an unknown slug must return null.");
  });

  await t.test("10. Existing work experience, services, profile, and configs preserve parity", async () => {
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
    assert.strictEqual(repoSocials.length, socialLinks.length, "Social links count should match.");
    assert.strictEqual(repoContact?.formspreeEndpoint, contactFormConfig.formspreeEndpoint, "Contact config endpoint should match.");
  });

  await t.test("11. Client Components do not import server-only repository modules", async () => {
    // Read the Client Component file content and inspect imports
    const clientComponentPath = path.resolve("./components/projects/projects-explorer.tsx");
    const code = fs.readFileSync(clientComponentPath, "utf-8");
    
    assert.ok(
      !code.includes("content-repository"),
      "Client Component projects-explorer.tsx must not import server-only content repository."
    );
    assert.ok(
      !code.includes("adapters/static"),
      "Client Component must not import static adapter."
    );
    assert.ok(
      !code.includes("adapters/db"),
      "Client Component must not import db adapter."
    );
  });
});
