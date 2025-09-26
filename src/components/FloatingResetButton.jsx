import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSkill } from "@/store/skillSlice";
import { RotateCcw } from "lucide-react";

/**
 * FloatingResetButton Component
 * --------------------------------------------------
 * A draggable floating button that appears when a skill
 * filter is active. Clicking it resets the project filter
 * by dispatching `resetSkill()` and deselecting the active skill.
 *
 * Features:
 * - Only visible when a skill filter (`skillTag`) is applied
 * - Draggable anywhere on the screen (mouse + touch)
 * - Always kept inside viewport
 * - Stylish with hover/active transitions
 *
 * @component
 * @example
 * return <FloatingResetButton />
 */
export const FloatingResetButton = () => {
  const dispatch = useDispatch();
  const skillTag = useSelector((state) => state.skill.skillTag);

  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 120,
  });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  /** Clamp position so button stays inside viewport */
  const clampPosition = (x, y) => {
    const buttonSize = 60; // button size in px
    const maxX = window.innerWidth - buttonSize;
    const maxY = window.innerHeight - buttonSize;
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    };
  };

  /** Start drag */
  const handleStart = (clientX, clientY) => {
    setDragging(true);
    setRel({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  /** Move drag */
  const handleMove = (clientX, clientY) => {
    if (!dragging) return;
    const newPos = clampPosition(clientX - rel.x, clientY - rel.y);
    setPosition(newPos);
  };

  /** Stop drag */
  const handleEnd = () => setDragging(false);

  // Mouse events
  const handleMouseDown = (e) => handleStart(e.clientX, e.clientY);
  const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);

  // Touch events
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    handleStart(t.clientX, t.clientY);
  };
  const handleTouchMove = (e) => {
    const t = e.touches[0];
    handleMove(t.clientX, t.clientY);
  };

  // Window event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  });

  /** Reset filter when clicked */
  const handleClick = () => {
    dispatch(resetSkill());
  };

  // ⬇️ Only return JSX if skillTag exists
  if (!skillTag) return null;

  return (
    <div
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <button
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        className="w-14 h-14 flex items-center justify-center rounded-full
                   bg-gradient-to-r from-purple-500 to-indigo-500 text-white 
                   shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 
                   transition-transform duration-200 ease-in-out cursor-pointer
                   animate-bounce-slow"
        aria-label="Reset project filter"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};
