import { Component } from "react";
import { Star, StarHalf } from "lucide-react";
import PropTypes from "prop-types";

/**
 * StarRating Component (Class-based)
 * ---------------------------------------
 * Displays a star-based rating system with:
 * - Empty background stars
 * - Filled stars in the foreground (with optional half-star)
 *
 * Props:
 * - rating (number): Current rating (default: 2.5)
 * - totalStars (number): Total number of stars to display (default: 5)
 *
 * Features:
 * - Supports fractional ratings (renders half star)
 * - Background stars appear gray (border color)
 * - Foreground stars appear glowing yellow with animation
 */
class StarRatingBase extends Component {
  // Default props (fallback values)
  static defaultProps = {
    rating: 2.5,
    totalStars: 5,
  };

  // Prop types for validation
  static propTypes = {
    rating: PropTypes.number.isRequired,     // number like 3, 4.5 etc.
    totalStars: PropTypes.number.isRequired, // usually 5 or 10
  };

  /**
   * Render Method
   * - Renders background stars
   * - Renders filled stars according to rating
   * - Adds half-star if rating is fractional
   */
  render() {
    const { rating, totalStars } = this.props;

    return (
      <>
        {/* Inline styles to control layout and positioning */}
        <style>
          {`
            .star-app {
              font-family: sans-serif;
            }

            .star-rating {
              position: relative;
              display: inline-block;
            }

            .stars {
              display: flex;
              gap: 4px;
            }

            .rating {
              position: absolute;
              top: 0;
              left: 0;
            }
          `}
        </style>

        <div className="star-app">
          <div className="star-rating">
            {/* Background (empty stars in gray) */}
            <div className="stars">
              {Array.from({ length: totalStars }, (_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-border"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>

            {/* Foreground (yellow glowing stars) */}
            <div className="stars rating">
              {Array.from({ length: Math.floor(rating) }, (_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-primary text-glow animate-pulse-strong"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}

              {/* Render half star if rating is fractional */}
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
      </>
    );
  }
}


export const StarRating = StarRatingBase;
