import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/data/site";
import { getContentRepository } from "@/lib/content-repository";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repository = await getContentRepository();
  const projects = await repository.getPublishedProjects();
  const staticRoutes = ["", "/projects", "/services", "/about", "/articles", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(project.caseStudyUrl),
      lastModified: new Date(),
    })),
  ];
}
