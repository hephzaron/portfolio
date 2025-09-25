import React, { Component } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
 * @class Navbar
 * @classdesc Responsive navigation bar with scroll detection and
 * a collapsible mobile menu.
 */
class NavbarBase extends Component {
  constructor(props) {
    super(props);

    /**
     * Component state.
     * @property {boolean} isScrolled - Whether the page has been scrolled.
     * @property {boolean} isMenuOpen - Whether the mobile menu is open.
     */
    this.state = {
      isScrolled: false,
      isMenuOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  /**
   * Lifecycle method - Adds scroll event listener when the component mounts.
   */
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  /**
   * Lifecycle method - Removes scroll event listener when the component unmounts.
   */
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Event handler for page scroll.
   * Updates state to apply a background and shadow when scrolled.
   */
  handleScroll() {
    this.setState({ isScrolled: window.scrollY > 10 });
  }

  /**
   * Toggles the mobile menu state.
   */
  toggleMenu() {
    this.setState((prev) => ({ isMenuOpen: !prev.isMenuOpen }));
  }

  /**
   * Closes the mobile menu.
   */
  closeMenu() {
    this.setState({ isMenuOpen: false });
  }

  /**
   * Renders the desktop navigation links.
   *
   * @returns {JSX.Element}
   */
  renderDesktopNav() {
    return (
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
  }

  /**
   * Renders the mobile navigation menu.
   *
   * @returns {JSX.Element}
   */
  renderMobileNav() {
    const { isMenuOpen } = this.state;

    return (
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
              onClick={this.closeMenu}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    );
  }

  /**
   * Renders the menu toggle button for mobile view.
   *
   * @returns {JSX.Element}
   */
  renderMenuToggle() {
    const { isMenuOpen } = this.state;

    return (
      <button
        onClick={this.toggleMenu}
        className="md:hidden p-2 text-foreground z-50"
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    );
  }

  /**
   * Main render method for Navbar.
   *
   * @returns {JSX.Element}
   */
  render() {
    const { isScrolled } = this.state;

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
              <span className="text-glow text-foreground">Tobi's</span>{" "}
              Portfolio
            </span>
          </a>

          {/* Desktop nav */}
          {this.renderDesktopNav()}

          {/* Mobile nav toggle */}
          {this.renderMenuToggle()}

          {/* Mobile menu */}
          {this.renderMobileNav()}
        </div>
      </nav>
    );
  }
}

export const Navbar = NavbarBase;
