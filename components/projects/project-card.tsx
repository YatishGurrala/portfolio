import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="grid-card flex h-full flex-col gap-4 !p-5">
      <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-xl border border-neutral-200/70 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900">
        <Image
          src={project.thumbnail}
          alt={`${project.title} project thumbnail`}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="tag !px-2.5 !py-0.5">{project.category}</span>
          <span>{project.confidentiality.label}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.shortDescription}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-slate-200/70 px-2.5 py-0.5 dark:border-white/10">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
        <ButtonLink href={project.caseStudyUrl}>View Case Study</ButtonLink>
        {project.liveUrl ? (
          <ButtonLink href={project.liveUrl} external variant="secondary">
            Live Product
          </ButtonLink>
        ) : null}
        {project.repositoryUrl ? (
          <ButtonLink href={project.repositoryUrl} external variant="secondary">
            Repository
          </ButtonLink>
        ) : null}
      </div>
    </article>
  );
}
