import Script from "next/script";

import { ButtonLink } from "@/components/ui/button-link";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { socialLinks } from "@/data/socialLinks";

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.siteUrl,
    sameAs: socialLinks.map((item) => item.href),
    knowsAbout: skillCategories.flatMap((category) => category.items),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Techbckp",
    description: "Product studio and software development agency for AI, mobile, web, and MVP delivery.",
    url: socialLinks.find((item) => item.label === "Techbckp")?.href,
    founder: siteConfig.name,
  };

  return (
    <>
      <Script id="person-schema" type="application/ld+json">
        {JSON.stringify(personSchema)}
      </Script>
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>
      <section className="section-space">
        <div className="page-shell">
          <div className="surface grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="eyebrow">Founder portfolio · Product studio · Technical case studies</p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  I build AI, mobile, and web products that turn ideas into usable software.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  I help startups, businesses, and product teams build SaaS platforms, AI tools, mobile apps, websites, MVPs, and improvement roadmaps with a product-minded, delivery-focused approach.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects">View Projects</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Discuss a Project
                </ButtonLink>
              </div>
              <ul className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                {siteConfig.heroIndicators.map((item) => (
                  <li key={item} className="rounded-full border border-slate-200/70 px-4 py-2 dark:border-white/10">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {siteConfig.roleSummary.map((item) => (
                <div key={item} className="grid-card p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Positioning</p>
                  <p className="mt-3 text-xl font-semibold tracking-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="featured-projects" className="section-space pt-0">
        <div className="page-shell space-y-10">
          <SectionHeading
            eyebrow="Featured projects"
            title="Products, SaaS experiments, agency positioning, and delivery-ready case studies"
            description="Each entry is driven by editable data so you can add future products, screenshots, and results without rebuilding the entire site."
          />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="page-shell space-y-10">
          <SectionHeading
            eyebrow="Services"
            title="Services framed around outcomes, launches, and product momentum"
            description="The focus stays on what the work unlocks for the business: a better launch path, a clearer MVP, a more maintainable application, or a more credible product presence."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services
              .filter((service) => service.category === "Core")
              .slice(0, 8)
              .map((service) => (
                <article key={service.slug} className="grid-card">
                  <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.summary}</p>
                  <p className="mt-4 text-sm font-medium text-slate-900 dark:text-slate-100">{service.businessOutcome}</p>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="page-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface p-8">
            <SectionHeading
              eyebrow="Development process"
              title="A practical path from discovery to ongoing support"
              description="Useful products come from good sequencing, not noise. The process stays simple enough to move quickly and structured enough to reduce rework."
            />
          </div>
          <ol className="grid gap-4 md:grid-cols-2">
            {siteConfig.process.map((step, index) => (
              <li key={step} className="grid-card flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Clear scope, practical execution, and a focus on usable outcomes instead of unnecessary complexity.
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="page-shell space-y-10">
          <SectionHeading
            eyebrow="Technical capabilities"
            title="Mobile, web, cloud, and product systems"
            description="Skills are grouped by capability area for clarity. There are no inflated percentages — just the tools and patterns that support the work."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <article key={category.title} className="grid-card">
                <h3 className="text-xl font-semibold tracking-tight">{category.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li key={skill} className="rounded-full border border-slate-200/70 px-3 py-2 text-sm dark:border-white/10">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="page-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface p-8 sm:p-10">
            <SectionHeading
              eyebrow="About preview"
              title="I combine software engineering, product thinking, project management, and business understanding to build practical digital products."
              description="The work sits at the intersection of delivery and decision-making: clarifying what to build, shaping architecture, implementing the product, and keeping the result usable for real businesses and teams."
            />
          </div>
          <div className="grid gap-6">
            <article className="grid-card">
              <h3 className="text-xl font-semibold tracking-tight">What I help with</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                AI-powered SaaS products, Android apps, full-stack web applications, MVPs, websites, application improvements, and technical consulting for teams that need momentum.
              </p>
            </article>
            <article className="grid-card">
              <h3 className="text-xl font-semibold tracking-tight">How this portfolio is meant to work</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                It is designed for LinkedIn, resumes, client outreach, job applications, and Techbckp conversations — with a case-study structure that can grow as more public work becomes available.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="page-shell">
          <div className="surface flex flex-col gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="eyebrow">Final call to action</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Have an idea, unfinished product, or application that needs improvement?
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Let&apos;s discuss what exists today, what needs to happen next, and how to move toward a working product, a launch-ready MVP, or a cleaner delivery plan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start a Conversation</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                Explore Case Studies
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
