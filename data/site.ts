import { NavigationItem } from "@/data/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://YatishGurrala.github.io/portfolio";

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

export function absoluteUrl(path = "/") {
  const baseUrl = new URL(siteConfig.siteUrl);
  const basePath = baseUrl.pathname.replace(/\/$/, "");
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  baseUrl.pathname = `${basePath}${normalizedPath}`.replace(/\/{2,}/g, "/");
  return baseUrl.toString();
}
