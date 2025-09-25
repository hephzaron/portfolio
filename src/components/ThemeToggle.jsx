import { Component } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ThemeToggle Component (Class-based)
 * ----------------------------------------
 * A button component that toggles between light and dark mode.
 *
 * Features:
 * - Remembers theme preference using localStorage
 * - Applies "dark" class to <html> root for TailwindCSS dark mode
 * - Shows Moon icon when in light mode, Sun icon when in dark mode
 *
 * Methods:
 * - componentDidMount(): Initializes theme from localStorage
 * - toggleTheme(): Switches theme between light and dark
 */
class ThemeToggleBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false, // Default theme
    };
  }

  /**
   * Lifecycle method: Runs after component mounts.
   * Loads stored theme preference from localStorage and applies it.
   */
  componentDidMount() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      this.setState({ isDarkMode: true });
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      this.setState({ isDarkMode: false });
    }
  }

  /**
   * Toggles between light and dark themes.
   * Updates both state and localStorage.
   */
  toggleTheme = () => {
    const { isDarkMode } = this.state;
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      this.setState({ isDarkMode: false });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      this.setState({ isDarkMode: true });
    }
  };

  /**
   * Render Method
   * - Displays button with either Sun or Moon icon
   * - Uses TailwindCSS + utility `cn` for styling
   */
  render() {
    const { isDarkMode } = this.state;

    return (
      <button
        onClick={this.toggleTheme}
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
  }
}

export const ThemeToggle = ThemeToggleBase;
