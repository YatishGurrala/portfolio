import { NavigationItem } from "@/data/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://YatishGurrala.github.io/portfolio";

export const siteConfig = {
  name: "Yatish Gurrala",
  shortName: "Yatish",
  siteName: "Yatish Gurrala Portfolio",
  title: "AI Product Engineer · Mobile & Web Developer · SaaS Founder",
  description:
    "Portfolio and case-study website for Yatish Gurrala — AI Product Engineer, Mobile and Web Developer, SaaS Founder, and founder of Techbckp.",
  siteUrl,
  discussProjectLabel: "Discuss a Project",
  viewWorkLabel: "View My Work",
  roleSummary: [
    "AI Product Engineer",
    "Digital Product Developer",
    "Mobile and Web Developer",
    "SaaS Founder",
    "Founder of Techbckp",
  ],
  heroIndicators: [
    "Android development experience",
    "SaaS and AI product development",
    "End-to-end product delivery",
    "Founder of Techbckp",
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
  return new URL(path, siteConfig.siteUrl.endsWith("/") ? siteConfig.siteUrl : `${siteConfig.siteUrl}/`).toString();
}
