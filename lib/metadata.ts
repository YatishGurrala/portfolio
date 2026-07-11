import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/data/site";

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildMetadata({ title, description, path = "/", image = "/og/default.svg" }: MetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
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
      siteName: siteConfig.siteName,
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
