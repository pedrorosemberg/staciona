
import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  initialRating?: number;
}

export function StarRating({ onRatingChange, readOnly = false, initialRating = 0 }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRating = (currentRating: number) => {
    if (!readOnly) {
      setRating(currentRating);
      if (onRatingChange) {
        onRatingChange(currentRating);
      }
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => handleRating(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`p-1 transition-colors ${
            readOnly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-400'
          } ${
            (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}
