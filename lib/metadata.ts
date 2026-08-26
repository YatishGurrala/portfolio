import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/data/site";

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

interface SiteProfile {
  siteUrl: string;
  siteName: string;
}

export function buildMetadata(
  { title, description, path = "/", image = "/og/default.svg" }: MetadataOptions,
  siteProfile?: SiteProfile
): Metadata {
  const currentSiteConfig = siteProfile || siteConfig;
  const canonical = absoluteUrl(path); // absoluteUrl handles siteConfig internally using the configured domain
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(currentSiteConfig.siteUrl),
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: currentSiteConfig.siteName,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
