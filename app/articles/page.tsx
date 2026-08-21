import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Articles | LinkedIn posts and technical writing",
  description:
    "A structured place to publish LinkedIn articles, technical posts, and product notes.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <section className="section-space">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow="Articles"
          title="A place for LinkedIn articles, technical writing, and product notes"
          description="Insights on product engineering, startup strategy, Kotlin/Android, and building Next.js SaaS products."
        />
        {articles.length === 0 ? (
          <div className="surface p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="text-4xl">✍️</div>
            <h2 className="text-2xl font-semibold tracking-tight">Writing Coming Soon</h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              I am currently focusing on building and launching ResumeLoopAI and CiteGPT. Technical articles, product engineering notes, and founder updates will be published here soon.
            </p>
            <div className="pt-2">
              <ButtonLink href="https://www.linkedin.com/in/yatish-g/" external variant="secondary">
                Connect on LinkedIn
              </ButtonLink>
            </div>
          </div>
        ) : (
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
                <ButtonLink href={article.externalUrl} external variant="secondary">
                  Visit article
                </ButtonLink>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
