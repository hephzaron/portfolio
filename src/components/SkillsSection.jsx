import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetSkill, toggleSkill } from "@/store/skillSlice";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";

const skills = [
  { name: "Python", level: 90, category: "Programming Languages" },
  { name: "JavaScript", level: 90, category: "Programming Languages" },
  { name: "C++", level: 50, category: "Programming Languages" },
  { name: "Verilog HDL", level: 55, category: "Programming Languages" },

  { name: "Scikit-learn", level: 80, category: "Machine Learning Frameworks" },
  { name: "Pandas", level: 75, category: "Machine Learning Frameworks" },
  { name: "Numpy", level: 70, category: "Machine Learning Frameworks" },
  { name: "TensorFlow", level: 65, category: "Machine Learning Frameworks" },
  { name: "Pytorch", level: 60, category: "Machine Learning Frameworks" },
  { name: "OpenCV", level: 50, category: "Machine Learning Frameworks" },
  { name: "PySpark", level: 50, category: "Machine Learning Frameworks" },
  { name: "TensorFlow Lite", level: 50, category: "Machine Learning Frameworks" },
  { name: "Natural Language Toolkit (NLTK)", level: 50, category: "Machine Learning Frameworks" },

  { name: "Proteus", level: 70, category: "Modelling and Tools" },
  { name: "LTSpice", level: 70, category: "Modelling and Tools" },
  { name: "MATLAB", level: 65, category: "Modelling and Tools" },
  { name: "Vivado", level: 60, category: "Modelling and Tools" },
  { name: "PSCAD", level: 40, category: "Modelling and Tools" },
  { name: "ETAP", level: 40, category: "Modelling and Tools" },

  { name: "Digital Signal Processing (DSP)", level: 68, category: "Other Skills" },
  { name: "Mathematical Optimization Technique", level: 50, category: "Other Skills" },
  { name: "Web application development", level: 50, category: "Other Skills" },
];

const categories = [
  "Programming Languages",
  "Machine Learning Frameworks",
  "Modelling and Tools",
  "Other Skills",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Programming Languages");
  const skillTag = useSelector((state) => state.skill.skillTag);
  const dispatch = useDispatch();

  const handleCategoryChange = useCallback(
    (category) => {
      setActiveCategory(category);
      dispatch(resetSkill());
    },
    [dispatch]
  );

  const handleSkillClick = useCallback(
    (skillName) => {
      dispatch(toggleSkill(skillName));
      if (skillTag !== skillName) {
        scrollToSection("projects");
      }
    },
    [dispatch, skillTag]
  );

  const renderCategoryButtons = () => (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryChange(category)}
          className={cn(
            "rounded-full border px-5 py-2 text-sm font-medium capitalize transition-all duration-300",
            activeCategory === category
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border/80 bg-card/70 text-foreground/80 hover:border-primary/40 hover:text-primary"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const renderSkillsGrid = () => {
    const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            onClick={() => handleSkillClick(skill.name)}
            className={cn(
              "glass-panel card-hover cursor-pointer p-6 text-left",
              skillTag === skill.name ? "ring-2 ring-primary/50" : ""
            )}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{skill.name}</h3>
            </div>
            <StarRating rating={skill.level / 20} totalStars={5} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="skills" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Technical strengths</p>
          <h2 className="section-title">
            My <span className="text-gradient">skills</span> and tools.
          </h2>
        </div>

        {renderCategoryButtons()}
        {renderSkillsGrid()}
      </div>
    </section>
  );
};
