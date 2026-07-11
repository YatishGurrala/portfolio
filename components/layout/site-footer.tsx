import Link from "next/link";

import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/60 py-12 dark:border-white/10">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-xl font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            AI Product Engineer, mobile and web developer, SaaS founder, and founder of Techbckp — building products, case studies, and service-led software experiences.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Navigate</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-950 dark:hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Connect</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-slate-950 dark:hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
