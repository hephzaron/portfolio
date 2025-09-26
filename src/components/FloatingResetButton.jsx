import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSkill } from "@/store/skillSlice";
import { X } from "lucide-react";

/**
 * FloatingResetButton Component
 * --------------------------------------------------
 * A draggable floating button that appears when a skill
 * filter is active. Clicking it resets the project filter
 * by dispatching `resetSkill()` and deselecting the active skill.
 *
 * Features:
 * - Only visible when a skill filter (`skillTag`) is applied
 * - Draggable anywhere on the screen
 * - Stylish with hover/active transitions
 *
 * @component
 * @example
 * return (
 *   <FloatingResetButton />
 * )
 */
export const FloatingResetButton = () => {
  const dispatch = useDispatch();
  const skillTag = useSelector((state) => state.skill.skillTag);

  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 120 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  if (!skillTag) return null; // Hide button if no filter active

  /**
   * Handle mouse down event: starts dragging
   */
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setRel({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  /**
   * Handle mouse move event: updates button position
   */
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
  };

  /**
   * Handle mouse up event: stops dragging
   */
  const handleMouseUp = () => setDragging(false);

  /**
   * Reset filter when clicked
   */
  const handleClick = () => {
    dispatch(resetSkill()); // deselect active skill
  };

  return (
    <div
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white 
                   shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 
                   transition-transform duration-200 ease-in-out cursor-pointer"
        aria-label="Reset project filter"
      >
        <X size={22} />
      </button>
    </div>
  );
};
