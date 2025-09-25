import { Component } from "react";
import { connect } from "react-redux";
import { resetSkill, toggleSkill } from "@/store/skillSlice";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";
import PropTypes from "prop-types";

// ================== DATA ==================
/**
 * Skill dataset containing name, proficiency level, and category.
 * @type {Array<{name: string, level: number, category: string}>}
 */
const skills = [
  // Programming Languages
  { name: "Python", level: 90, category: "Programming Languages" },
  { name: "JavaScript", level: 90, category: "Programming Languages" },
  { name: "C++", level: 50, category: "Programming Languages" },
  { name: "Verilog HDL", level: 55, category: "Programming Languages" },

  // Machine Learning Frameworks
  { name: "Scikit-learn", level: 80, category: "Machine Learning Frameworks" },
  { name: "Pandas", level: 75, category: "Machine Learning Frameworks" },
  { name: "Numpy", level: 70, category: "Machine Learning Frameworks" },
  { name: "TensorFlow", level: 65, category: "Machine Learning Frameworks" },
  { name: "Pytorch", level: 60, category: "Machine Learning Frameworks" },
  { name: "OpenCV", level: 50, category: "Machine Learning Frameworks" },
  { name: "PySpark", level: 50, category: "Machine Learning Frameworks" },
  { name: "TensorFlow Lite", level: 50, category: "Machine Learning Frameworks" },
  { name: "Natural Language Toolkit (NLTK)", level: 50, category: "Machine Learning Frameworks" },

  // Modelling and Tools
  { name: "Proteus", level: 70, category: "Modelling and Tools" },
  { name: "LTSpice", level: 70, category: "Modelling and Tools" },
  { name: "MATLAB", level: 65, category: "Modelling and Tools" },
  { name: "Vivado", level: 60, category: "Modelling and Tools" },
  { name: "PSCAD", level: 40, category: "Modelling and Tools" },
  { name: "ETAP", level: 40, category: "Modelling and Tools" },

  // Other Skills
  { name: "Digital Signal Processing (DSP)", level: 68, category: "Other Skills" },
  { name: "Mathematical Optimization Technique", level: 50, category: "Other Skills" },
  { name: "Web application development", level: 50, category: "Other Skills" },
];

/**
 * Skill categories used to group skills.
 * @type {Array<string>}
 */
const categories = [
  "Programming Languages",
  "Machine Learning Frameworks",
  "Modelling and Tools",
  "Other Skills",
];

// ================== COMPONENT ==================
/**
 * Class component to render skills section with category filtering,
 * Redux-based skill selection, and project section scrolling.
 */
class SkillsSectionBase extends Component {
  /**
   * @constructor
   * @param {object} props - React props
   */
  constructor(props) {
    super(props);

    /** @type {{ activeCategory: string }} */
    this.state = {
      activeCategory: "Programming Languages",
    };
  }

  /**
   * Handle category button click.
   * Updates active category and resets selected skill in Redux.
   * @param {string} category - Selected skill category
   * @returns {void}
   */
  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category });
    this.props.resetSkill();
  };

  /**
   * Handle skill card click.
   * Dispatches toggleSkill to Redux and scrolls to "projects" section.
   * @param {string} skillName - Name of the clicked skill
   * @returns {void}
   */
  handleSkillClick = (skillName) => {
    this.props.toggleSkill(skillName);
    if (this.props.skillTag !== skillName) {
      scrollToSection("projects");
    }
  };

  /**
   * Renders category filter buttons.
   * @returns {JSX.Element}
   */
  renderCategoryButtons() {
    const { activeCategory } = this.state;

    return (
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => this.handleCategoryChange(category)}
            className={cn(
              "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/70 text-foreground hover:bd-secondary"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }

  /**
   * Renders skill cards for the selected category.
   * @returns {JSX.Element}
   */
  renderSkillsGrid() {
    const { activeCategory } = this.state;
    const filteredSkills = skills.filter(
      (skill) => skill.category === activeCategory
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            onClick={() => this.handleSkillClick(skill.name)}
            className={cn(
              "bg-card p-6 rounded-lg shadow-xs card-hover cursor-pointer",
              this.props.skillTag === skill.name ? "ring-2 ring-primary" : ""
            )}
          >
            <div className="text-left mb-4">
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
            <StarRating rating={skill.level / 20} totalStars={5} />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Main render method.
   * @returns {JSX.Element}
   */
  render() {
    return (
      <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-primary"> Skills</span>
          </h2>

          {this.renderCategoryButtons()}
          {this.renderSkillsGrid()}
        </div>
      </section>
    );
  }
}

// PropTypes must be declared on the base class
SkillsSectionBase.propTypes = {
  skillTag: PropTypes.string,
  resetSkill: PropTypes.func.isRequired,
  toggleSkill: PropTypes.func.isRequired,
};


// ================== REDUX CONNECTION ==================
/**
 * Maps Redux state to component props.
 * @param {object} state - Redux state
 * @returns {object}
 */
const mapStateToProps = (state) => ({
  skillTag: state.skill.skillTag,
});

/**
 * Maps Redux actions to component props.
 */
const mapDispatchToProps = {
  resetSkill,
  toggleSkill,
};

export const SkillsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsSectionBase);
