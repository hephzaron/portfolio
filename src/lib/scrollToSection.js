/**
 * Smoothly scrolls to a given section by its element ID.
 *
 * @param {string} id - The ID of the target element
 * @param {ScrollIntoViewOptions} [options] - Optional scroll configuration
 * @example
 * scrollToSection("projects");
 */
export const scrollToSection = (
  id,
  options = { behavior: "smooth", block: "start" }
) => {
  if (typeof window === "undefined") return; // ✅ prevent SSR errors

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView(options);
  }
};
