import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="surface flex flex-col items-start gap-6 px-6 py-10 sm:px-10 sm:py-14">
          <p className="eyebrow">404</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">This page could not be found.</h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            The route may have changed, the case study may not exist, or the GitHub Pages deployment has not caught up yet.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Go home</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Browse projects
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
