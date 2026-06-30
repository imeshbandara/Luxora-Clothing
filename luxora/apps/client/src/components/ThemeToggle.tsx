"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1c2541] transition-all duration-200 cursor-pointer text-gray-600 dark:text-slate-300 hover:scale-110"
      aria-label="Toggle Theme"
    >
      {currentTheme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700" />
      )}
    </button>
  );
}
