import { PiStarFill, PiStar } from 'react-icons/pi';

type Props = {
  rating: number;
  size?: number;
  showValue?: boolean;
};

export default function Stars({ rating, size = 12, showValue = true }: Props) {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const roundedRating = Math.round(clampedRating);
  const hasRating = clampedRating > 0;

  return (
    <div
      className="flex items-center gap-2 justify-center"
      aria-label={
        hasRating
          ? `Rating: ${roundedRating} out of 5`
          : 'No reviews'
      }
    >
      {/* Stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= roundedRating ? (
            <PiStarFill
              key={star}
              className="text-light-gold"
              size={size}
              aria-hidden="true"
            />
          ) : (
            <PiStar
              key={star}
              className="text-light-text2 opacity-35"
              size={size}
              aria-hidden="true"
            />
          )
        )}
      </div>

      {/* Rating value */}

      <span className="text-sm text-light-text2 opacity-50 font-medium">
        ({roundedRating})
      </span>

    </div>
  );
}