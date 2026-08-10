import { ArrowUp } from "lucide-react";

const FooterCopyright = () => (
  <p className="text-sm text-foreground/70">
    &copy; {new Date().getFullYear()} Tobi Daramola. All rights reserved.
  </p>
);

const FooterScrollTop = () => (
  <a href="#hero" className="rounded-full border border-border/80 bg-card/70 p-2.5 text-primary transition-colors hover:bg-primary/10">
    <ArrowUp size={18} />
  </a>
);

export const Footer = () => (
  <footer className="relative mt-12 border-t border-border/80 bg-card/70 px-4 py-8 backdrop-blur-sm">
    <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
      <FooterCopyright />
      <FooterScrollTop />
    </div>
  </footer>
);
