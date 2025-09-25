import { Star, StarHalf } from "lucide-react";

function StarRating({ rating = 2.5, totalStars = 5 }) {
  return (
    <>
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
          {/* Background (empty stars) */}
          <div className="stars">
            {Array.from({ length: totalStars }, (_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-border"
                fill="currentColor" 
                strokeWidth={0} />
            ))}
          </div>

          {/* Foreground (yellow stars with half if needed) */}
          <div className="stars rating">
            {Array.from({ length: Math.floor(rating) }, (_, i) => (
              <Star 
                key={i}
                className="w-6 h-6 text-primary text-glow animate-pulse-strong" 
                fill="currentColor" 
                strokeWidth={0} />
            ))}
            {(rating % 1 !== 0) && 
                <StarHalf
                    className="w-6 h-6 text-primary text-glow animate-pulse-strong" 
                    fill="currentColor" 
                    strokeWidth={0} />}
          </div>
        </div>
      </div>
    </>
  );
}

export { StarRating };
