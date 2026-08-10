import { ArrowDown, Sparkles } from "lucide-react";

const HeroHeadline = () => (
  <div className="space-y-5">
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm opacity-0 animate-fade-in">
      <Sparkles className="h-4 w-4" />
      Available for advanced engineering collaborations
    </div>

    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
      <span className="mb-2 block text-foreground/90 opacity-0 animate-fade-in">Hi, I&apos;m</span>
      <span className="mb-2 block text-primary opacity-0 animate-fade-in-delay-1">Tobi</span>
      <span className="block text-gradient opacity-0 animate-fade-in-delay-2">Daramola</span>
    </h1>
  </div>
);

const HeroDescription = () => (
  <p className="mx-auto max-w-2xl text-lg text-foreground/70 opacity-0 animate-fade-in-delay-3 md:text-xl">
    I design efficient hardware-software solutions for reliable, scalable, and energy-conscious systems.
  </p>
);

const HeroCTA = () => (
  <div className="flex flex-col justify-center gap-3 pt-4 opacity-0 animate-fade-in-delay-4 sm:flex-row">
    <a href="#projects" className="cosmic-button">
      View My Work
    </a>
    <a href="#about" className="rounded-full border border-border bg-card/70 px-6 py-2.5 font-medium text-foreground/80 transition-all duration-300 hover:border-primary/40 hover:text-primary">
      Learn More
    </a>
  </div>
);

const HeroBottomStats = () => (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/70">
    <span className="rounded-full border border-border/80 bg-white/60 px-3 py-1.5 shadow-sm dark:bg-card/60">8+ years in power systems</span>
    <span className="rounded-full border border-border/80 bg-white/60 px-3 py-1.5 shadow-sm dark:bg-card/60">Embedded + ML solutions</span>
    <span className="rounded-full border border-border/80 bg-white/60 px-3 py-1.5 shadow-sm dark:bg-card/60">Research-driven engineering</span>
  </div>
);

const HeroScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center animate-bounce">
    <span className="mb-2 text-sm text-foreground/60">Scroll</span>
    <ArrowDown className="h-5 w-5 text-primary" />
  </div>
);

export const HeroSection = () => (
  <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:py-24">
    <div className="absolute inset-x-0 top-20 mx-auto h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
    <div className="container z-10 mx-auto max-w-5xl text-center">
      <div className="section-shell relative overflow-hidden px-8 py-12 md:px-12 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-400/10" />
        <div className="relative space-y-6">
          <HeroHeadline />
          <HeroDescription />
          <HeroCTA />
          <HeroBottomStats />
        </div>
      </div>
    </div>

    <HeroScrollIndicator />
  </section>
);
