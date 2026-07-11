import Image from "next/image";
import Link from "next/link";

import { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="grid-card flex h-full flex-col gap-5">
      <div className="overflow-hidden rounded-2xl border border-white/60 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
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
        <Link className="button-primary" href={project.caseStudyUrl}>
          View Case Study
        </Link>
        {project.liveUrl ? (
          <a className="button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Product
          </a>
        ) : null}
        {project.repositoryUrl ? (
          <a className="button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer">
            Repository
          </a>
        ) : null}
      </div>
    </article>
  );
}
