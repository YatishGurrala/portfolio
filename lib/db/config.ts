

// Validate variables and fail clearly when DB mode is used without credentials
export const getDatabaseUrls = () => {
  const isDatabaseMode = process.env.PORTFOLIO_CONTENT_SOURCE === "database";

  // Use POSTGRES_URL_NON_POOLING or DATABASE_URL_UNPOOLED for migrations (direct connection)
  const migrationUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

  // Use POSTGRES_URL or DATABASE_URL for runtime queries
  const runtimeUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;



  if (isDatabaseMode || process.env.NODE_ENV === "test") {
    if (!runtimeUrl) {
      throw new Error(
        "Database connection error: DATABASE_URL or POSTGRES_URL is missing. " +
        "Please ensure environment variables are pulled from Vercel."
      );
    }
    if (!migrationUrl) {
      throw new Error(
        "Database migration connection error: POSTGRES_URL_NON_POOLING or DATABASE_URL_UNPOOLED is missing."
      );
    }
  }

  return {
    runtimeUrl: runtimeUrl || "",
    migrationUrl: migrationUrl || "",
  };
};
