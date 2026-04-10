import { PiStarFill, PiStarLight } from 'react-icons/pi';

type Props = {
  rating: number;
  size?: number; // optional to control the size
};

export default function Stars({ rating, size = 12 }: Props) {
  return (
    <div className="flex gap-1 justify-center" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.floor(rating) ? (
          <PiStarFill key={star} className="text-light-gold" size={size} aria-hidden="true" />
        ) : (
          <PiStarLight key={star} className="text-light-text2" size={size} aria-hidden="true" />
        ),
      )}
    </div>
  );
}
