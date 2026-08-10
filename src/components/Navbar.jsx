import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const DesktopNav = () => (
  <div className="hidden md:flex md:items-center md:gap-8">
    {navItems.map((item, key) => (
      <a key={key} href={item.href} className="text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary">
        {item.name}
      </a>
    ))}
  </div>
);

const MobileNav = ({ isMenuOpen, closeMenu }) => (
  <div className={cn("fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden", isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
    <div className="flex flex-col space-y-8 text-xl">
      {navItems.map((item, key) => (
        <a key={key} href={item.href} className="text-foreground/80 transition-colors duration-300 hover:text-primary" onClick={closeMenu}>
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

const MenuToggle = ({ isMenuOpen, toggleMenu }) => (
  <button onClick={toggleMenu} className="z-50 rounded-full border border-border/80 bg-card/70 p-2 text-foreground md:hidden" aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
);

MenuToggle.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className={cn("fixed z-40 w-full transition-all duration-300", isScrolled ? "py-3" : "py-5")}>
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300", isScrolled ? "rounded-full border border-border/80 bg-card/70 px-5 py-2 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.25)] backdrop-blur-xl" : "")}>
        <a className="flex items-center text-lg font-semibold text-primary" href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">Tobi&apos;s</span> Portfolio
          </span>
        </a>

        <DesktopNav />
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <MobileNav isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      </div>
    </nav>
  );
};
