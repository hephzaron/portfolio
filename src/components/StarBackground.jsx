import { useState, useEffect, useCallback } from "react";

/**
 * StarBackground Component (Functional)
 * ---------------------------------------
 * Creates an animated background with:
 * - Randomly generated twinkling stars
 * - Randomly generated meteors shooting across the screen
 *
 * Features:
 * - Stars regenerate dynamically on window resize
 * - Stars twinkle with random opacity and duration
 * - Meteors animate with random size, delay, and duration
 *
 * State:
 * - stars: Array of star objects (id, size, x, y, opacity, animationDuration)
 * - meteors: Array of meteor objects (id, size, x, y, delay, animationDuration)
 */
export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  /**
   * Generates a set of stars based on viewport size.
   * Formula: (width * height) / 10000
   * Each star has random:
   * - size (1–4px)
   * - position (x%, y%)
   * - opacity (0.5–1.0)
   * - animation duration (2–6s)
   */
  const generateStars = useCallback(() => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = Array.from({ length: numberOfStars }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.5,
      animationDuration: Math.random() * 4 + 2,
    }));

    setStars(newStars);
  }, []);

  /**
   * Generates a fixed number of meteors (default: 4).
   * Each meteor has random:
   * - size (1–3px, scaled into width x height)
   * - position (x%, y% within top 20%)
   * - delay (0–15s)
   * - animation duration (3–6s)
   */
  const generateMeteors = useCallback(() => {
    const numberOfMeteors = 4;

    const newMeteors = Array.from({ length: numberOfMeteors }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 20,
      delay: Math.random() * 15,
      animationDuration: Math.random() * 3 + 3,
    }));

    setMeteors(newMeteors);
  }, []);

  /**
   * Lifecycle: componentDidMount + componentWillUnmount equivalent
   * - Generates initial stars and meteors
   * - Attaches and cleans up resize listener
   */
  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => generateStars();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [generateStars, generateMeteors]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Render Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}

      {/* Render Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 50}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};
