import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRight, ExternalLink, Github, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Pagination } from "./Pagination";
import { resetSkill } from "@/store/skillSlice";
import { FloatingResetButton } from "./FloatingResetButton";

const BASE_URL = import.meta.env.BASE_URL;

const projects = [
  {
    id: 1,
    title: "Data Structure & Algorithm Visual",
    description: "A beautiful app to visualize data structures and graph algorithms in an interactive way.",
    image: "/projects/algoviz.JPG",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Data Structures", "Graph Algorithms"],
    demoUrl: "#",
    githubUrl: "https://github.com/hephzaron/AlgoVis",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description: "Interactive analytics dashboard with rich visualizations and filtering workflows.",
    image: "/projects/project2.png",
    tags: ["C++", "Pandas", "Numpy"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "A complete commerce experience featuring user auth, product browsing, and payments.",
    image: "/projects/project3.png",
    tags: ["Vivado", "LTSpice", "TensorFlow Lite"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Embedded Insight Suite",
    description: "A polished interface built to explore embedded system data and diagnostics.",
    image: "/projects/project3.png",
    tags: ["Vivado", "Pandas", "TensorFlow Lite"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "SaaS Landing Page",
    description: "A modern landing experience crafted with React and Tailwind for a high-conversion product story.",
    image: "/projects/project1.png",
    tags: ["OpenCV", "Python", "LTSpice"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Signal Exploration Lab",
    description: "A compact toolkit for examining engineering data and visual patterns in motion.",
    image: "/projects/project2.png",
    tags: ["C++", "Pandas", "Numpy"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

function joinBaseUrl(base, path) {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export const ProjectsSection = () => {
  const skillTag = useSelector((state) => state.skill.skillTag);
  const dispatch = useDispatch();

  const filteredProjects = useMemo(() => {
    if (!skillTag || skillTag === "All") return projects;
    return projects.filter((project) => project.tags.includes(skillTag));
  }, [skillTag]);

  const renderProjectCard = (project) => (
    <div key={project.id} className="group glass-panel card-hover overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={joinBaseUrl(BASE_URL, project.image)}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="p-6 text-left">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="rounded-full border border-border/80 bg-primary/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-foreground/70">{project.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-card/80 p-2 text-foreground/80 transition-colors duration-300 hover:text-primary">
              <ExternalLink size={18} />
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-card/80 p-2 text-foreground/80 transition-colors duration-300 hover:text-primary">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="col-span-full flex h-64 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-gradient-to-br from-primary/10 via-background to-emerald-400/10"
    >
      <PackageOpen className="mb-4 h-12 w-12 text-primary animate-bounce" />
      <p className="text-lg font-medium text-foreground/80">No projects match this skill.</p>
      <p className="mb-4 text-sm text-foreground/60">Try selecting another skill to explore more.</p>

      <div className="flex gap-4">
        <button onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })} className="cosmic-button">
          Back to Skills
        </button>
        <button onClick={() => dispatch(resetSkill())} className="rounded-full border border-primary/30 px-6 py-2.5 font-medium text-primary transition-colors duration-300 hover:bg-primary/10">
          Reset Filter
        </button>
      </div>
    </motion.div>
  );

  const renderProjectsGrid = () =>
    filteredProjects.length === 0 ? (
      renderEmptyState()
    ) : (
      <Pagination
        items={filteredProjects}
        itemsPerPage={6}
        renderPage={(pageItems) => (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((project) => renderProjectCard(project))}
          </div>
        )}
      />
    );

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Selected work</p>
          <h2 className="section-title">
            Featured <span className="text-gradient">projects</span>
          </h2>
        </div>

        <p className="mx-auto mb-12 max-w-2xl text-center text-foreground/70">
          Browse my projects below. They are automatically filtered by the selected skill from the skills section.
        </p>

        {renderProjectsGrid()}

        <div className="mt-12 text-center">
          <a className="cosmic-button mx-auto w-fit gap-2" target="_blank" rel="noopener noreferrer" href="https://github.com/hephzaron">
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
      <FloatingResetButton />
    </section>
  );
};
