import type { MetadataRoute } from "next";
import { getContentRepository } from "@/lib/content-repository";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const repository = await getContentRepository();
  const siteConfig = await repository.getSiteProfile();
  const siteUrl = siteConfig?.siteUrl || "http://localhost:3000";
  const cleanUrl = siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${cleanUrl}/sitemap.xml`,
  };
}
