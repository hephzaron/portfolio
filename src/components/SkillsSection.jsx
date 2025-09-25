import { useState } from "react";
import { cn } from "@/lib/utils";
import {StarRating} from "./StarRating";

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
];

const categories = [
  "Programming Languages", "Machine Learning Frameworks", "Modelling and Tools", "Other Skills"
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Programming Languages");

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
                <StarRating
                  rating={skill.level / 20} 
                  totalStars={5} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
