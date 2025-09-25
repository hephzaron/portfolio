import React, { Component } from "react";
import { UtilityPole, CircuitBoard, BrainCircuit } from "lucide-react";

/**
 * @class AboutSection
 * @classdesc A section component that introduces the user, their experience,
 *            and areas of expertise (Power Systems, Embedded Systems, ML).
 */
class AboutSectionBase extends Component {
  /**
   * Render the section header.
   * @returns {JSX.Element} A heading with title "About Me".
   */
  renderHeader() {
    return (
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        About <span className="text-primary"> Me</span>
      </h2>
    );
  }

  /**
   * Render the descriptive content (intro + bio paragraphs + buttons).
   * @returns {JSX.Element} Left-side content with paragraphs and action buttons.
   */
  renderDescription() {
    return (
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
  }

  /**
   * Render a single skill card with icon, title, and description.
   * Modularized for reusability.
   * 
   * @param {React.ElementType} Icon - Lucide icon component.
   * @param {string} title - Title of the skill category.
   * @param {string} description - Description text for the skill.
   * @returns {JSX.Element} A styled skill card.
   */
  renderSkillCard(Icon, title, description) {
    return (
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
  }

  /**
   * Render the skills area with multiple cards (right-side content).
   * @returns {JSX.Element} Grid containing skills cards.
   */
  renderSkills() {
    return (
      <div className="grid grid-cols-1 gap-6">
        {this.renderSkillCard(
          UtilityPole,
          "Power Systems",
          "Design and support labs for power system analysis, simulation (e.g., using MATLAB, PSCAD, ETAP), and hardware experiments."
        )}
        {this.renderSkillCard(
          CircuitBoard,
          "Embedded Systems",
          "Firmware design in C/C++, hardware design & prototyping and IoT solutions."
        )}
        {this.renderSkillCard(
          BrainCircuit,
          "Machine Learning",
          "Implements On-device ML inference (e.g., TensorFlow Lite, TinyML) for real-time decision-making, edge ML model optimization, and deployment on resource-constrained devices."
        )}
      </div>
    );
  }

  /**
   * Main render method.
   * Assembles header, description, and skills grid into the layout.
   */
  render() {
    return (
      <section id="about" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          {this.renderHeader()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {this.renderDescription()}
            {this.renderSkills()}
          </div>
        </div>
      </section>
    );
  }
}

export const AboutSection = AboutSectionBase;
