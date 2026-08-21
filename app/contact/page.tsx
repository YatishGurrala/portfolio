import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactFormConfig, socialLinks } from "@/data/socialLinks";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact | Project inquiry and collaboration options",
  description:
    "Reach out about AI SaaS, mobile apps, web applications, MVP development, consulting, and product improvement work.",
  path: "/contact",
});

const projectTypes = [
  "AI and SaaS development",
  "Mobile app development",
  "Web application development",
  "MVP development",
  "Product engineering",
  "Application modernization",
  "Technical consulting",
];

const budgetRanges = ["Under $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000+", "Let's discuss"];

export default function ContactPage() {
  const primaryButtonStyle = {
    backgroundColor: "var(--button-primary-bg)",
    color: "var(--button-primary-fg)",
    borderColor: "var(--button-primary-border)",
  };

  const hasForm = !!contactFormConfig.formspreeEndpoint;
  const hasAlternativeLinks = !!(
    contactFormConfig.emailLink ||
    contactFormConfig.calendlyLink ||
    contactFormConfig.googleFormLink
  );
  const activeSocials = socialLinks.filter((link) => !!link.href);

  return (
    <section className="section-space">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow="Contact"
          title="Start a conversation about your product, MVP, application improvement, or consulting needs"
          description="Have a project in mind or want to collaborate? Reach out through the channels below."
        />

        {!hasForm && !hasAlternativeLinks ? (
          <article className="surface p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="text-4xl">👋</div>
            <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s Connect</h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              I am open to discussing Senior Mobile Engineer, Full-Stack Product Engineer, AI Product Engineer, or Founding Engineer opportunities. Let&apos;s discuss your product roadmap, MVP development, or application modernization.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              {activeSocials.map((link) => (
                <ButtonLink
                  key={link.label}
                  href={link.href}
                  external
                  variant={link.label === "LinkedIn" ? "primary" : "secondary"}
                >
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </article>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {hasForm && (
              <article className="surface p-8 sm:p-10">
                <form action={contactFormConfig.formspreeEndpoint} method="POST" className="grid gap-5">
                  <input type="hidden" name="_subject" value="Portfolio project inquiry" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium">
                      <span>Name</span>
                      <input className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" type="text" name="name" required />
                    </label>
                    <label className="space-y-2 text-sm font-medium">
                      <span>Email</span>
                      <input className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" type="email" name="email" required />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium">
                      <span>Company</span>
                      <input className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" type="text" name="company" />
                    </label>
                    <label className="space-y-2 text-sm font-medium">
                      <span>Project type</span>
                      <select className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" name="projectType" required>
                        <option value="">Select a project type</option>
                        {projectTypes.map((projectType) => (
                          <option key={projectType} value={projectType}>
                            {projectType}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium">
                      <span>Estimated budget</span>
                      <select className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" name="budget" required>
                        <option value="">Select a budget range</option>
                        {budgetRanges.map((budgetRange) => (
                          <option key={budgetRange} value={budgetRange}>
                            {budgetRange}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-2 text-sm font-medium">
                      <span>Preferred contact method</span>
                      <select className="w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" name="preferredContactMethod" required>
                        <option value="">Select a contact method</option>
                        <option value="Email">Email</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Calendly">Calendly</option>
                        <option value="Google Form">Google Form</option>
                      </select>
                    </label>
                  </div>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Project description</span>
                    <textarea className="min-h-40 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/70" name="projectDescription" required />
                  </label>
                  {contactFormConfig.placeholderNote && (
                    <p className="rounded-2xl border border-neutral-200/70 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                      {contactFormConfig.placeholderNote}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                    style={primaryButtonStyle}
                  >
                    Send inquiry
                  </button>
                </form>
              </article>
            )}

            <div className="grid gap-6">
              {hasAlternativeLinks && (
                <article className="grid-card">
                  <h2 className="text-2xl font-semibold tracking-tight">Alternative contact routes</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {contactFormConfig.emailLink && (
                      <li>
                        <a className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600" href={contactFormConfig.emailLink}>
                          Email inquiry
                        </a>
                      </li>
                    )}
                    {contactFormConfig.calendlyLink && (
                      <li>
                        <a className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600" href={contactFormConfig.calendlyLink} target="_blank" rel="noreferrer">
                          Calendly booking
                        </a>
                      </li>
                    )}
                    {contactFormConfig.googleFormLink && (
                      <li>
                        <a className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600" href={contactFormConfig.googleFormLink} target="_blank" rel="noreferrer">
                          Google Form
                        </a>
                      </li>
                    )}
                  </ul>
                </article>
              )}
              {activeSocials.length > 0 && (
                <article className="grid-card">
                  <h2 className="text-2xl font-semibold tracking-tight">Direct links</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {activeSocials.map((link) => (
                      <li key={link.label}>
                        <a className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600" href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                        {link.note ? <p className="text-xs text-slate-500 dark:text-slate-400">{link.note}</p> : null}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
