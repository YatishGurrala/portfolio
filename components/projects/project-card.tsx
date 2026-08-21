import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="grid-card flex h-full flex-col gap-5">
      <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900">
        <Image
          src={project.thumbnail}
          alt={`${project.title} project thumbnail`}
          width={1200}
          height={720}
          className="h-auto w-full"
        />
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="tag">{project.category}</span>
          <span>{project.confidentiality.label}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.shortDescription}</p>
        </div>
        <ul className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-white/10">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap gap-3 pt-2">
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
