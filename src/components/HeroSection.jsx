import React, { Component } from "react";
import { ArrowDown } from "lucide-react";

/**
 * @class HeroSection
 * @classdesc Hero banner section that introduces the user
 * with animated text, a call-to-action button, and a scroll indicator.
 */
class HeroSectionBase extends Component {
  /**
   * Render the animated headline (name + intro).
   *
   * @returns {JSX.Element}
   */
  renderHeadline() {
    return (
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
        <span className="text-primary opacity-0 animate-fade-in-delay-1">
          {" "}
          Tobi
        </span>
        <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
          {" "}
          Daramola
        </span>
      </h1>
    );
  }

  /**
   * Render the description paragraph under the headline.
   *
   * @returns {JSX.Element}
   */
  renderDescription() {
    return (
      <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
        I specialize in designing efficient hardware-software solutions for
        reliable, scalable, and energy-optimized systems
      </p>
    );
  }

  /**
   * Render the call-to-action button (scrolls to projects).
   *
   * @returns {JSX.Element}
   */
  renderCTA() {
    return (
      <div className="pt-4 opacity-0 animate-fade-in-delay-4">
        <a href="#projects" className="cosmic-button">
          View My Work
        </a>
      </div>
    );
  }

  /**
   * Render the scroll-down indicator with ArrowDown icon.
   *
   * @returns {JSX.Element}
   */
  renderScrollIndicator() {
    return (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    );
  }

  /**
   * Main render method for HeroSection.
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
      >
        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-6">
            {this.renderHeadline()}
            {this.renderDescription()}
            {this.renderCTA()}
          </div>
        </div>

        {this.renderScrollIndicator()}
      </section>
    );
  }
}

export const HeroSection = HeroSectionBase;
