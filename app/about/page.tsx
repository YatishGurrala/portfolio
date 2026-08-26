import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { getContentRepository } from "@/lib/content-repository";

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
    body: "Through products like CiteGPT, ResumeLoopAI, and Techbckp, I am building a portfolio that reflects both execution and product ownership, not only implementation tasks.",
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

function formatWorkDate(dateStr?: string, current?: boolean) {
  if (current) return "Present";
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIdx = parseInt(month, 10) - 1;
  return `${monthNames[monthIdx] || ""} ${year}`;
}

export default async function AboutPage() {
  const repository = await getContentRepository();
  const siteConfig = await repository.getSiteProfile();
  const experiences = await repository.getPublishedExperiences();
  const skillCategories = await repository.getSkillCategories();

  if (!siteConfig) {
    return null;
  }

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

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <article className="surface p-8 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight">Core Competencies</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {experienceAreas.map((item) => (
                  <li key={item} className="rounded-full border border-slate-200/70 px-3.5 py-1.5 text-sm dark:border-white/10">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface p-8 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight">Focus Areas</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                My current focus spans AI product ideas, SaaS workflows, Android product delivery, web applications, and Techbckp service-led execution.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {siteConfig.roleSummary.map((item) => (
                  <span key={item} className="tag text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <article className="surface p-8 sm:p-10 space-y-8">
            <h2 className="text-3xl font-semibold tracking-tight">Work Experience</h2>
            <div className="relative border-l border-slate-200 pl-6 dark:border-white/10 space-y-8">
              {experiences.map((exp) => (
                <div key={exp.organization} className="relative space-y-3">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
                    <span className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {exp.role} <span className="font-normal text-slate-500">at</span> {exp.organization}
                    </h3>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {formatWorkDate(exp.startDate)} — {formatWorkDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.employmentType && (
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{exp.employmentType}</p>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{exp.summary}</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1.5 pl-2">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-slate-100 bg-slate-50/50 px-3 py-1 text-xs dark:border-white/5 dark:bg-slate-900/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

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
      </div>
    </section>
  );
}
