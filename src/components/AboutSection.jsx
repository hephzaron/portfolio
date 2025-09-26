import { UtilityPole, CircuitBoard, BrainCircuit } from "lucide-react";

/**
 * Render the section header.
 * @returns {JSX.Element} A heading with title "About Me".
 */
const AboutHeader = () => (
  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
    About <span className="text-primary"> Me</span>
  </h2>
);

/**
 * Render the descriptive content (intro + bio paragraphs + buttons).
 * @returns {JSX.Element} Left-side content with paragraphs and action buttons.
 */
const AboutDescription = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-semibold">
      A power and embedded systems engineer with expertise in machine learning algorithms
    </h3>

    <p className="text-muted-foreground">
      I have over eight years of experience in the power sector and self-learning, I have garnered skills in 
      smart power electronics, FPGAs, machine learning, and energy-aware system design, 
      applying research and industry experience to develop reliable and efficient solutions.
    </p>

    <p className="text-muted-foreground">
      Beyond industry, I am deeply engaged in emerging technologies such as IoT, Embedded Systems, and Machine Learning. 
      As a member of COREN, NSE, and IEEE, I remain committed to continuous learning, research, and professional excellence. 
      My vision is to build sustainable, intelligent, and energy-aware systems that shape the future of power and embedded technologies.
    </p>

    {/* Action buttons */}
    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
      <a href="#contact" className="cosmic-button">
        Get In Touch
      </a>
      <a
        href=""
        className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
      >
        Download CV
      </a>
    </div>
  </div>
);

/**
 * Render a single skill card with icon, title, and description.
 * Modularized for reusability.
 * 
 * @param {object} props
 * @param {React.ElementType} props.Icon - Lucide icon component.
 * @param {string} props.title - Title of the skill category.
 * @param {string} props.description - Description text for the skill.
 * @returns {JSX.Element} A styled skill card.
 */
const SkillCard = ({ Icon, title, description }) => (
  <div className="gradient-border p-6 card-hover">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-left">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

/**
 * Render the skills area with multiple cards (right-side content).
 * @returns {JSX.Element} Grid containing skills cards.
 */
const AboutSkills = () => (
  <div className="grid grid-cols-1 gap-6">
    <SkillCard
      Icon={UtilityPole}
      title="Power Systems"
      description="Design and support labs for power system analysis, simulation (e.g., using MATLAB, PSCAD, ETAP), and hardware experiments."
    />
    <SkillCard
      Icon={CircuitBoard}
      title="Embedded Systems"
      description="Firmware design in C/C++, hardware design & prototyping and IoT solutions."
    />
    <SkillCard
      Icon={BrainCircuit}
      title="Machine Learning"
      description="Implements On-device ML inference (e.g., TensorFlow Lite, TinyML) for real-time decision-making, edge ML model optimization, and deployment on resource-constrained devices."
    />
  </div>
);

/**
 * @function AboutSection
 * @description A section component that introduces the user, their experience,
 *              and areas of expertise (Power Systems, Embedded Systems, ML).
 */
export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <AboutHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AboutDescription />
          <AboutSkills />
        </div>
      </div>
    </section>
  );
};
