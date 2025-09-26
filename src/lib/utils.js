import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally merge TailwindCSS class names.
 *
 * @param {...any} inputs - Class names, conditionals, or arrays of class names
 * @returns {string} A merged, conflict-free class string
 *
 * @example
 * cn("px-2", isActive && "bg-blue-500", "px-4"); // => "bg-blue-500 px-4"
 */
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
