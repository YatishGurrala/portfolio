import { defineConfig } from "drizzle-kit";

// Read migration connection URL directly from environment variables to avoid server-only imports
const migrationUrl = 
  process.env.POSTGRES_URL_NON_POOLING || 
  process.env.DATABASE_URL_UNPOOLED || 
  process.env.DATABASE_URL ||
  "";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: migrationUrl,
  },
});
