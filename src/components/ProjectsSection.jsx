import { Component } from "react";
import { connect } from "react-redux";
import { ArrowRight, ExternalLink, Github, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import {Pagination} from "./Pagination";
import { resetSkill } from "@/store/skillSlice";

const BASE_URL = import.meta.env.BASE_URL;

/**
 * Sample Projects Data
 * --------------------
 */
const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["OpenCV", "Python", "LTSpice"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities.",
    image: "/projects/project2.png",
    tags: ["C++", "Pandas", "Numpy"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: "/projects/project3.png",
    tags: ["Vivado", "LTSpice", "TensorFlow Lite"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: "/projects/project3.png",
    tags: ["Vivado", "Pandas", "TensorFlow Lite"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["OpenCV", "Python", "LTSpice"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Orbit Analytics Dashboard",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities.",
    image: "/projects/project2.png",
    tags: ["C++", "Pandas", "Numpy"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 7,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: "/projects/project3.png",
    tags: ["Vivado", "LTSpice", "TensorFlow Lite"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 8,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: "/projects/project3.png",
    tags: ["Vivado", "Pandas", "TensorFlow Lite"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

/**
 * Utility function to join BASE_URL with relative path
 *
 * @param {string} base - Base URL (e.g., import.meta.env.BASE_URL)
 * @param {string} path - Path to append
 * @returns {string} - Joined valid URL
 */
function joinBaseUrl(base, path) {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

class ProjectsSectionBase extends Component {
  /**
   * Render a single project card
   * @param {Object} project - Project object with id, title, description, tags, image, demoUrl, githubUrl
   * @returns {JSX.Element}
   */
  renderProjectCard(project) {
    return (
      <div
        key={project.id}
        className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
      >
        {/* Project image */}
        <div className="h-48 overflow-hidden">
          <img
            src={`${joinBaseUrl(BASE_URL, project.image)}`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Project content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span
                className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                key={idx}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title + Description */}
          <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>

          {/* External Links */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render empty state when no projects match
   * @returns {JSX.Element}
   */
  renderEmptyState() {
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="col-span-full flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-gradient-to-br from-secondary/20 via-background to-primary/20"
      >
        <PackageOpen className="w-12 h-12 text-primary mb-4 animate-bounce" />
        <p className="text-lg font-medium text-muted-foreground">
          No projects match this skill.
        </p>
        <p className="text-sm text-muted-foreground/70 mb-4">
          Try selecting another skill to explore more.
        </p>

        {/* Action buttons */}
        <div className="flex gap-4">
          {/* Back to skills */}
          <button
            onClick={() =>
              document
                .getElementById("skills")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cosmic-button flex items-center gap-2"
          >
            Back to Skills
          </button>

          {/* Reset skill filter */}
          <button
            onClick={this.props.resetSkill}
            className="cosmic-button flex items-center gap-2"
          >
            Reset Filter
          </button>
        </div>
      </motion.div>
    );
  }

  /**
   * Render the projects grid (either paginated projects or empty state)
   * @param {Array} filteredProjects - projects after applying skillTag filter
   * @returns {JSX.Element}
   */
  renderProjectsGrid(filteredProjects) {
    if (filteredProjects.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <Pagination
        items={filteredProjects}
        itemsPerPage={6}
        renderPage={(pageItems) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageItems.map((project) => this.renderProjectCard(project))}
          </div>
        )}
      />
    );
  }

  render() {
    const { skillTag } = this.props;

    const filteredProjects =
      !skillTag || skillTag === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(skillTag));

    return (
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured <span className="text-primary"> Projects </span>
          </h2>

          {/* Intro paragraph */}
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse my projects below. They are automatically filtered based on
            the selected skill from the Skills section.
          </p>

          {/* Render Grid */}
          {this.renderProjectsGrid(filteredProjects)}

          {/* GitHub button */}
          <div className="text-center mt-12">
            <a
              className="cosmic-button w-fit flex items-center mx-auto gap-2"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/hephzaron"
            >
              Check My Github <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    );
  }
}

/**
 * Redux: map state to props
 * @param {Object} state - Redux store state
 * @returns {{ skillTag: string|null }}
 */
const mapStateToProps = (state) => ({
  skillTag: state.skill.skillTag,
});

/**
 * Maps Redux actions to props
 * @param {Function} dispatch - Redux dispatch function
 */
const mapDispatchToProps = (dispatch) => ({
  resetSkill: () => dispatch(resetSkill()),
});

// connect both state + dispatch to class component
export const ProjectsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsSectionBase);
