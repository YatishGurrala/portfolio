import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About | Product-minded engineering across AI, Android, SaaS, and web delivery",
  description:
    "Learn about Yatish Gurrala's product-building philosophy, technical experience, founder journey, and work across Android, AI products, SaaS, full-stack apps, and startup delivery.",
  path: "/about",
});

const aboutPillars = [
  {
    title: "Professional introduction",
    body: "I build practical digital products across AI, SaaS, Android, and web — combining hands-on software delivery with product thinking and business context.",
  },
  {
    title: "Product-building philosophy",
    body: "The goal is not to add more features than necessary. The goal is to create a clearer path from idea to usable product while keeping architecture and delivery decisions responsible.",
  },
  {
    title: "Founder journey",
    body: "Through products like CiteGPT, ResumeLoop AI, and Techbckp, I am building a portfolio that reflects both execution and product ownership, not only implementation tasks.",
  },
  {
    title: "Project and product management",
    body: "I work across discovery, requirements planning, delivery sequencing, architecture discussions, implementation, testing, deployment, and ongoing refinement.",
  },
];

const experienceAreas = [
  "Android engineering",
  "AI products",
  "SaaS development",
  "Full-stack applications",
  "Product management",
  "Operations",
  "Startup development",
];

export default function AboutPage() {
  return (
    <section className="section-space">
      <div className="page-shell space-y-12">
        <SectionHeading
          eyebrow="About"
          title="A product-minded engineer who likes turning ideas into useful software"
          description="This portfolio is designed to show the overlap between engineering depth, founder execution, delivery thinking, and the ability to work across products, services, and confidential professional experience."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {aboutPillars.map((pillar) => (
            <article key={pillar.title} className="grid-card">
              <h2 className="text-2xl font-semibold tracking-tight">{pillar.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>

        <article className="surface p-8 sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight">Experience across product and delivery</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {experienceAreas.map((item) => (
              <li key={item} className="rounded-full border border-slate-200/70 px-4 py-2 text-sm dark:border-white/10">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="surface p-8 sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight">Technologies</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.title} className="grid-card">
                <h3 className="text-xl font-semibold tracking-tight">{category.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {category.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="surface p-8 sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight">Current products and agency work</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            My current focus spans AI product ideas, SaaS workflows, Android product delivery, web applications, and Techbckp service-led execution. The portfolio is structured so that public work, generalized professional experience, and future products can all live together clearly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {siteConfig.roleSummary.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
