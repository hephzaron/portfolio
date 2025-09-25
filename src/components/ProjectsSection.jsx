import { Component } from "react";
import { connect } from "react-redux";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL;

/**
 * Sample projects data
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

/**
 * ProjectsSection Component (Class-based + Redux integration)
 * -----------------------------------------------------------
 * Props from Redux:
 * - skillTag: currently selected skill tag from SkillsSection
 *
 * Features:
 * - Displays a portfolio grid of projects
 * - Filters projects dynamically by Redux `skillTag`
 * - Renders GitHub and demo links
 */
class ProjectsSectionBase extends Component {
  /**
   * Filters projects based on Redux skillTag
   * @returns {Array} Filtered projects
   */
  getFilteredProjects = () => {
    const { skillTag } = this.props;

    if (!skillTag || skillTag === "All") {
      return projects;
    }

    return projects.filter((project) =>
      project.tags.includes(skillTag)
    );
  };

  /**
   * Renders the section
   */
  render() {
    const filteredProjects = this.getFilteredProjects();

    return (
      <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured <span className="text-primary"> Projects </span>
          </h2>

          {/* Intro paragraph */}
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse my projects below. They are automatically filtered
            based on the selected skill from the Skills section.
          </p>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
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
                    <h3 className="text-xl font-semibold mb-1">
                      {project.title}
                    </h3>
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
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-full">
                No projects match the selected skill.
              </p>
            )}
          </div>

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
 * Maps Redux state to props
 * @param {Object} state - Redux store state
 */
const mapStateToProps = (state) => ({
  skillTag: state.skill.skillTag, // assuming Skills reducer holds selected tag
});

export const ProjectsSection = connect(mapStateToProps)(ProjectsSectionBase);
