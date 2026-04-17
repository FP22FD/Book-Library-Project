import { PiStarLight } from 'react-icons/pi';

type Props = {
  rating: number;
  size?: number;
  muted?: boolean;
};

export default function Stars({ size = 12, muted = false }: Props) {
  return (
    <div className="flex gap-1 justify-center" aria-label="Not rated">
      {[1, 2, 3, 4, 5].map((star) => (
        <PiStarLight key={star} className={muted ? "text-light-gold" : "text-light-text-0"} size={size} aria-hidden="true" />
      ))}
    </div>
  );
}
