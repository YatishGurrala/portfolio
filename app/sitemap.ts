import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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
