import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ThemeToggle Component (Functional)
 * ----------------------------------------
 * A button component that toggles between light and dark mode.
 *
 * Features:
 * - Remembers theme preference using localStorage
 * - Applies "dark" class to <html> root for TailwindCSS dark mode
 * - Shows Moon icon when in light mode, Sun icon when in dark mode
 */
export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Initialize theme from localStorage on mount
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  }, []);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      if (prev) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        return false;
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        return true;
      }
    });
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outline-hidden"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
