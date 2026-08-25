import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // e.g. 4.5
  count?: number; // e.g. 128 reviews
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  count,
  size = 'small',
  showCount = true,
}) => {
  const iconSize = size === 'small' ? 'w-3.5 h-3.5' : size === 'medium' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = rating >= star;
          const isHalf = rating >= star - 0.5 && rating < star;

          return (
            <Star
              key={star}
              className={`${iconSize} ${
                isFull
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-200 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          );
        })}
      </div>

      <span className="text-xs font-semibold text-slate-700">{rating.toFixed(1)}</span>

      {showCount && count !== undefined && (
        <span className="text-xs text-slate-400">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
