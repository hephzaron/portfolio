import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Navigation items for the portfolio.
 * Each contains a name (display text) and href (anchor target).
 */
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

/**
 * Render the desktop navigation links.
 *
 * @returns {JSX.Element}
 */
const DesktopNav = () => (
  <div className="hidden md:flex space-x-8">
    {navItems.map((item, key) => (
      <a
        key={key}
        href={item.href}
        className="text-foreground/80 hover:text-primary transition-colors duration-300"
      >
        {item.name}
      </a>
    ))}
  </div>
);

/**
 * Render the mobile navigation menu.
 *
 * @param {Object} props
 * @param {boolean} props.isMenuOpen - Whether the mobile menu is open.
 * @param {Function} props.closeMenu - Function to close the menu.
 * @returns {JSX.Element}
 */
const MobileNav = ({ isMenuOpen, closeMenu }) => (
  <div
    className={cn(
      "fixed inset-0 bg-background/95 backdroup-blur-md z-40 flex flex-col items-center justify-center",
      "transition-all duration-300 md:hidden",
      isMenuOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    )}
  >
    <div className="flex flex-col space-y-8 text-xl">
      {navItems.map((item, key) => (
        <a
          key={key}
          href={item.href}
          className="text-foreground/80 hover:text-primary transition-colors duration-300"
          onClick={closeMenu}
        >
          {item.name}
        </a>
      ))}
    </div>
  </div>
);

MobileNav.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

/**
 * Render the menu toggle button for mobile view.
 *
 * @param {Object} props
 * @param {boolean} props.isMenuOpen - Whether the menu is open.
 * @param {Function} props.toggleMenu - Function to toggle the menu.
 * @returns {JSX.Element}
 */
const MenuToggle = ({ isMenuOpen, toggleMenu }) => (
  <button
    onClick={toggleMenu}
    className="md:hidden p-2 text-foreground z-50"
    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
  >
    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

MenuToggle.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

/**
 * @function Navbar
 * @description Responsive navigation bar with scroll detection and
 * a collapsible mobile menu.
 */
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Event handler for page scroll.
   * Updates state to apply a background and shadow when scrolled.
   */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  /**
   * Toggles the mobile menu state.
   */
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  /**
   * Closes the mobile menu.
   */
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Lifecycle replacement with useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo / Branding */}
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Tobi&apos;s</span>{" "}
            Portfolio
          </span>
        </a>

        {/* Desktop nav */}
        <DesktopNav />

        {/* Mobile nav toggle */}
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Mobile menu */}
        <MobileNav isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      </div>
    </nav>
  );
};
