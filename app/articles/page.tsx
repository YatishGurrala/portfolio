import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Articles | LinkedIn posts and technical writing placeholders",
  description:
    "A structured place to publish LinkedIn articles, technical posts, and product notes as public writing becomes available.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <section className="section-space">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow="Articles"
          title="A place for LinkedIn articles, technical writing, and product notes"
          description="The initial entries are clearly marked placeholders so you can swap them with real articles, technical posts, or founder updates later."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="grid-card flex h-full flex-col gap-5">
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
                <Image src={article.coverImage} alt={`${article.title} cover image`} width={1200} height={900} className="h-auto w-full" />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="tag">{article.platform}</span>
                  <span>{article.publishedAt}</span>
                  {article.placeholder ? <span>Editable placeholder</span> : null}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">{article.title}</h2>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{article.description}</p>
                <ul className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {article.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-white/10">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <a className="button-secondary mt-auto" href={article.externalUrl} target="_blank" rel="noreferrer">
                Visit article
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
