import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { ShareButtons } from "@/components/case-study/share-buttons";
import { ButtonLink } from "@/components/ui/button-link";
import { absoluteUrl } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { getContentRepository } from "@/lib/content-repository";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const repository = await getContentRepository();
  const projects = await repository.getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const repository = await getContentRepository();
  const project = await repository.getProjectBySlug(slug);
  const siteProfile = await repository.getSiteProfile();

  if (!project) {
    return buildMetadata({
      title: "Case study not found",
      description: "The requested case study does not exist.",
      path: `/projects/${slug}`,
    }, siteProfile || undefined);
  }

  return buildMetadata({
    title: `${project.title} | Case study`,
    description: project.description,
    path: project.caseStudyUrl,
    image: project.thumbnail,
  }, siteProfile || undefined);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const repository = await getContentRepository();
  const project = await repository.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: absoluteUrl(project.thumbnail),
    url: absoluteUrl(project.caseStudyUrl),
    creator: {
      "@type": "Person",
      name: "Yatish Gurrala",
    },
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <Script id={`${project.slug}-schema`} type="application/ld+json">
        {JSON.stringify(creativeWorkSchema)}
      </Script>
      <section className="section-space">
        <div className="page-shell space-y-10">
          <Link href="/projects" className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600">
            ← Back to projects
          </Link>
          <div className="surface grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <p className="eyebrow">{project.category}</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{project.heroSummary}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="tag">{project.projectType}</span>
                <span className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-white/10">Role: {project.role}</span>
                <span className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-white/10">Duration: {project.duration}</span>
                <span className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-white/10">{project.confidentiality.label}</span>
              </div>
              {project.confidentiality.note ? (
                <p className="rounded-2xl border border-neutral-200/70 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                  {project.confidentiality.note}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <ButtonLink href={project.liveUrl} external>
                    Live product
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/contact" variant={project.liveUrl ? "secondary" : "primary"}>
                  Discuss a Project
                </ButtonLink>
              </div>
              <ShareButtons title={project.title} />
            </div>
            <div className="overflow-hidden rounded-3xl border border-neutral-200/70 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900">
              <Image
                src={project.thumbnail}
                alt={`${project.title} hero image`}
                width={1400}
                height={900}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="grid-card space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Project overview</h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{project.overview.product}</p>
              <dl className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">Who it is for</dt>
                  <dd>{project.overview.audience}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">Why it was created</dt>
                  <dd>{project.overview.purpose}</dd>
                </div>
              </dl>
            </article>
            <article className="grid-card space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Technology stack</h2>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-slate-200/70 px-3 py-2 text-sm dark:border-white/10">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="grid-card space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Problem</h2>
              <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.problem.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-neutral-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="grid-card space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Solution</h2>
              <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.solution.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-neutral-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="grid-card space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">My role</h2>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300 md:grid-cols-2">
              {project.responsibilities.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Key features</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {project.keyFeatures.map((feature) => (
                <div key={feature.title} className="grid-card">
                  <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Screenshots and visuals</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {project.screenshots.map((shot) => (
                <figure key={shot.src} className="grid-card overflow-hidden p-0">
                  <Image src={shot.src} alt={shot.alt} width={1200} height={900} className="h-auto w-full" />
                  <figcaption className="p-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    <span className="mb-2 inline-flex rounded-full border border-slate-200/70 px-3 py-1 text-xs uppercase tracking-[0.18em] dark:border-white/10">
                      {shot.type}
                    </span>
                    <div>{shot.caption}</div>
                    {shot.videoUrl ? (
                      <a className="mt-3 inline-flex text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600" href={shot.videoUrl} target="_blank" rel="noreferrer">
                        Watch video demo
                      </a>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>

          <article className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Technical architecture</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {project.architecture.map((section) => (
                <div key={section.label} className="grid-card">
                  <h3 className="text-lg font-semibold tracking-tight">{section.label}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {section.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="grid-card space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Challenges and solutions</h2>
              <div className="space-y-4">
                {project.challenges.map((item) => (
                  <div key={item.challenge} className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                    <h3 className="font-semibold">{item.challenge}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.solution}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="grid-card space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Development process</h2>
              <ol className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.developmentProcess.map((item, index) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                    <span className="font-semibold text-neutral-900 dark:text-white">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <article className="grid-card space-y-4 lg:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Results</h2>
              <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.results.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="grid-card space-y-4 lg:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Lessons learned</h2>
              <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.lessonsLearned.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="grid-card space-y-4 lg:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Next steps</h2>
              <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.nextSteps.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="surface flex flex-col gap-5 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Need a similar product?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Let&apos;s talk about the next useful version of your product.</h2>
            </div>
            <ButtonLink href="/contact">Discuss a Project</ButtonLink>
          </article>
        </div>
      </section>
    </>
  );
}
