import "server-only";
import { IContentRepository, validateContentSource } from "./repository-types";
import * as staticAdapter from "./adapters/static";

const source = validateContentSource(process.env.PORTFOLIO_CONTENT_SOURCE);
let repoPromise: Promise<IContentRepository> | null = null;

async function resolveRepository(): Promise<IContentRepository> {
  if (source === "database") {
    const dbAdapter = await import("./adapters/db");
    return dbAdapter;
  }
  return staticAdapter;
}

export function getContentRepository(): Promise<IContentRepository> {
  if (!repoPromise) {
    repoPromise = resolveRepository();
  }
  return repoPromise;
}
