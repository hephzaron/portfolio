import { Star, StarHalf } from "lucide-react";
import PropTypes from "prop-types";

/**
 * StarRating Component (Functional)
 * ---------------------------------------
 * Displays a star-based rating system with:
 * - Empty background stars
 * - Filled stars in the foreground (with optional half-star)
 *
 * Props:
 * - rating (number): Current rating (default: 2.5)
 * - totalStars (number): Total number of stars (default: 5)
 */
export function StarRating({ rating = 2.5, totalStars = 5 }) {
  return (
    <div className="star-app">
      <div className="star-rating relative inline-block">
        {/* Background (empty stars) */}
        <div className="flex gap-1">
          {Array.from({ length: totalStars }, (_, i) => (
            <Star
              key={i}
              className="w-6 h-6 text-border"
              fill="currentColor"
              strokeWidth={0}
            />
          ))}
        </div>

        {/* Foreground (yellow stars) */}
        <div className="flex gap-1 absolute top-0 left-0">
          {Array.from({ length: Math.floor(rating) }, (_, i) => (
            <Star
              key={i}
              className="w-6 h-6 text-primary text-glow animate-pulse-strong"
              fill="currentColor"
              strokeWidth={0}
            />
          ))}

          {/* Half star */}
          {rating % 1 !== 0 && (
            <StarHalf
              className="w-6 h-6 text-primary text-glow animate-pulse-strong"
              fill="currentColor"
              strokeWidth={0}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Optional: prop validation
StarRating.propTypes = {
  rating: PropTypes.number,
  totalStars: PropTypes.number,
};
