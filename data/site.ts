import { NavigationItem } from "@/data/types";

const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
const rawVercelProdUrl = (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || "").trim();
const defaultFallback = "http://localhost:3000";

let selectedUrl = rawSiteUrl || rawVercelProdUrl || defaultFallback;
selectedUrl = selectedUrl.replace(/\/$/, "");

if (!/^https?:\/\//i.test(selectedUrl)) {
  const isLocal = /localhost|^127\.|^10\.|^192\.168\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./i.test(selectedUrl);
  selectedUrl = `${isLocal ? "http" : "https"}://${selectedUrl}`;
}

const siteUrl = selectedUrl;

export const siteConfig = {
  name: "Yatish Gurrala",
  shortName: "Yatish",
  siteName: "Yatish Gurrala Portfolio",
  title: "Founder at ResumeLoopAI · Senior Mobile & Full-Stack Product Developer · AI-Assisted Engineering · Android, Kotlin, Next.js & SaaS",
  description:
    "Portfolio and case-study website for Yatish Gurrala — Founder at ResumeLoopAI and Senior Mobile & Full-Stack Product Developer. Experienced in Android, Kotlin, Next.js, and SaaS product engineering.",
  siteUrl,
  discussProjectLabel: "Discuss a Project",
  viewWorkLabel: "View My Work",
  roleSummary: [
    "Founder & Full-Stack Developer",
    "Senior Mobile Product Developer",
    "AI-Assisted Engineer",
    "Next.js & SaaS Builder",
  ],
  heroIndicators: [
    "Android, Kotlin & Compose",
    "Next.js, React & SaaS",
    "End-to-end lifecycle delivery",
    "Founder of ResumeLoopAI",
  ],
  process: [
    "Discovery",
    "Product planning",
    "UI and architecture",
    "Development",
    "Testing",
    "Deployment",
    "Ongoing support",
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/projects#case-studies" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavigationItem[],
};

export function absoluteUrl(path = "") {
  const baseUrl = new URL(siteConfig.siteUrl);
  const cleanPath = path.replace(/^\/+/, "").replace(/\/{2,}/g, "/");
  const existingPath = baseUrl.pathname.replace(/\/$/, "");
  baseUrl.pathname = existingPath + (cleanPath ? `/${cleanPath}` : "");
  return baseUrl.toString();
}
