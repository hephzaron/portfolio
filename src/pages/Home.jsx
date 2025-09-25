import { Component } from "react";
import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

/**
 * Home
 * --------------------------------------------------
 * Root page component for the portfolio website.
 *
 * - Includes global background effects
 * - Contains navigation, hero, about, skills, projects, contact, and footer sections
 * - Provides theme toggle functionality
 *
 * @remarks
 * This component serves as the main entry point of the application.
 */
export class Home extends Component {
  /**
   * Render the portfolio homepage
   *
   * @returns {JSX.Element} Fully structured home page with sections
   */
  render() {
    return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Background Effects */}
        <StarBackground />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}
