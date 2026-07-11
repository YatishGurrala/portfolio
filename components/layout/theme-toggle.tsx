"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "portfolio-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return storedTheme ?? (preferredDark ? "dark" : "light");
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-lg transition-colors hover:bg-white dark:border-white/10 dark:bg-slate-950/70 dark:hover:bg-slate-900"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
