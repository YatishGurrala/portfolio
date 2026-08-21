import Link from "next/link";

import { siteConfig } from "@/data/site";

import { ButtonLink } from "@/components/ui/button-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-[color:var(--background)]/90 backdrop-blur dark:border-white/10">
      <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">{siteConfig.name}</span>
            <span className="text-sm text-slate-600 dark:text-slate-300">AI Product Engineer · Founder of Techbckp</span>
          </Link>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav aria-label="Primary" className="overflow-x-auto">
            <ul className="flex min-w-max items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link className="inline-flex rounded-full px-3 py-2 transition-colors hover:bg-neutral-200/70 dark:hover:bg-white/10" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <ButtonLink href="/contact">{siteConfig.discussProjectLabel}</ButtonLink>
        </div>
      </div>
    </header>
  );
}
