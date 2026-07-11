import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Yatish Gurrala Portfolio | AI Product Engineer, Mobile & Web Developer",
  description:
    "Data-driven portfolio and case-study website for Yatish Gurrala, covering AI SaaS, mobile apps, web products, Techbckp services, and contact options.",
  path: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const themeScript = `(() => {
  const key = "portfolio-theme";
  const stored = localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
