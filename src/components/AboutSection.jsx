import { UtilityPole, CircuitBoard, BrainCircuit } from "lucide-react";
import PropTypes from "prop-types";

const AboutHeader = () => (
  <div className="mb-10 text-center">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">About me</p>
    <h2 className="section-title">
      Building <span className="text-gradient">intelligent systems</span> with clarity and impact.
    </h2>
  </div>
);

const AboutDescription = () => (
  <div className="space-y-6 text-left">
    <h3 className="text-2xl font-semibold text-foreground/90">
      A power and embedded systems engineer with deep expertise in machine learning algorithms.
    </h3>

    <p className="text-foreground/70 leading-relaxed">
      I bring over eight years of experience across power systems, smart electronics, and research-driven engineering.
      My work blends practical hardware knowledge with modern computational methods to create dependable, energy-aware solutions.
    </p>

    <p className="text-foreground/70 leading-relaxed">
      Beyond industry projects, I stay engaged with emerging technologies in IoT, embedded systems, and machine learning.
      I remain committed to continuous learning, professional growth, and solutions that make real-world impact.
    </p>

    <div className="flex flex-col justify-start gap-4 pt-3 sm:flex-row">
      <a href="#contact" className="cosmic-button">
        Get In Touch
      </a>
      <a href="/resume.pdf" className="rounded-full border border-primary/30 px-6 py-2.5 font-medium text-primary transition-colors duration-300 hover:bg-primary/10">
        Download CV
      </a>
    </div>
  </div>
);

const SkillCard = ({ Icon, title, description }) => (
  <div className="glass-panel card-hover p-6 text-left">
    <div className="flex items-start gap-4">
      <div className="rounded-2xl bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{description}</p>
      </div>
    </div>
  </div>
);

SkillCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const AboutSkills = () => (
  <div className="grid grid-cols-1 gap-6">
    <SkillCard
      Icon={UtilityPole}
      title="Power Systems"
      description="Design and support labs for power system analysis, simulation, and hardware experiments with a strong emphasis on reliable operation."
    />
    <SkillCard
      Icon={CircuitBoard}
      title="Embedded Systems"
      description="Firmware design, prototyping, and embedded solutions that connect sensing, control, and intelligent behavior."
    />
    <SkillCard
      Icon={BrainCircuit}
      title="Machine Learning"
      description="Deployment of edge ML, optimization for resource-constrained devices, and real-time inference workflows."
    />
  </div>
);

export const AboutSection = () => {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <AboutHeader />
        <div className="grid items-center gap-12 md:grid-cols-2">
          <AboutDescription />
          <AboutSkills />
        </div>
      </div>
    </section>
  );
};