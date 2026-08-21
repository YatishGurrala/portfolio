import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services | AI SaaS, mobile, web, MVP, and consulting support",
  description:
    "Explore AI and SaaS development, Android app delivery, web product engineering, MVP development, modernization, and technical consulting services.",
  path: "/services",
});

const sections = [
  {
    title: "AI and SaaS Development",
    description: "AI integrations, RAG applications, SaaS dashboards, subscription systems, API integrations, AI chatbots, and internal AI tools.",
    slugs: ["ai-saas-development"],
  },
  {
    title: "Mobile App Development",
    description: "Native Android development, Kotlin, Jetpack Compose, app improvements, API integration, Firebase, payments, and release support.",
    slugs: ["mobile-app-development"],
  },
  {
    title: "Web Development",
    description: "SaaS applications, business websites, admin dashboards, landing pages, e-commerce, performance improvements, and responsive frontend work.",
    slugs: ["web-application-development", "website-ecommerce-development"],
  },
  {
    title: "MVP and Product Development",
    description: "Idea validation, requirements planning, product roadmaps, prototype development, MVP delivery, launch preparation, and improvement guidance.",
    slugs: ["mvp-development", "product-engineering", "application-modernization", "technical-consulting"],
  },
];

export default function ServicesPage() {
  const coreServices = services.filter((service) => service.category === "Core");
  const engagementModels = services.filter((service) => service.category === "Engagement");

  return (
    <section className="section-space">
      <div className="page-shell space-y-12">
        <SectionHeading
          eyebrow="Services"
          title="Build, improve, launch, and clarify products with a delivery-focused partner"
          description="These service offers are written for founders, startups, and businesses that need practical software execution — from MVPs and AI tools to Android delivery, websites, and modernization work."
        />

        <div className="grid gap-6">
          {sections.map((section) => (
            <article key={section.title} className="surface p-8 sm:p-10">
              <h2 className="text-3xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{section.description}</p>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {coreServices
                  .filter((service) => section.slugs.includes(service.slug))
                  .map((service) => (
                    <div key={service.slug} className="grid-card">
                      <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.summary}</p>
                      <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">{service.businessOutcome}</p>
                      <ul className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable} className="rounded-full border border-slate-200/70 px-3 py-2 dark:border-white/10">
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>

        <article className="surface p-8 sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Engagement models</p>
              <h2 className="text-3xl font-semibold tracking-tight">Flexible ways to work together</h2>
            </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Pricing is intentionally left editable for now. Replace each placeholder once you decide how you want to package offers publicly.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {engagementModels.map((service) => (
              <div key={service.slug} className="grid-card">
                <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.summary}</p>
                <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">{service.businessOutcome}</p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>• {deliverable}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="surface flex flex-col gap-5 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Ready to discuss scope?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Let&apos;s map the next useful milestone.</h2>
          </div>
          <ButtonLink href="/contact">Discuss a Project</ButtonLink>
        </article>
      </div>
    </section>
  );
}
