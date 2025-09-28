"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 items-center rounded-md border border-black/10 dark:border-white/20 px-3 text-xs hover:bg-black/5 dark:hover:bg-white/10"
    >
      {isDark ? "Dark" : "Light"}
    </button>
  );
}


