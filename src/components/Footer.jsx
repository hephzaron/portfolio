import { ArrowUp } from "lucide-react";

/**
 * Render the copyright text.
 *
 * @returns {JSX.Element}
 */
const FooterCopyright = () => (
  <p className="text-sm text-muted-foreground">
    &copy; {new Date().getFullYear()} All rights reserved.
  </p>
);

/**
 * Render the scroll-to-top button.
 *
 * @returns {JSX.Element}
 */
const FooterScrollTop = () => (
  <a
    href="#hero"
    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
  >
    <ArrowUp size={20} />
  </a>
);

/**
 * @function Footer
 * @description Website footer with copyright information and
 * a scroll-to-top link button.
 */
export const Footer = () => (
  <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
    <FooterCopyright />
    <FooterScrollTop />
  </footer>
);
