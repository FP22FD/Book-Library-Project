import { PiHeartFill } from 'react-icons/pi';

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <div
      className={`flex justify-center border-t p-4 bg-light-gradientA text-light-text2 px-3 py-6 text-sm ${className}`}
    >
      <p className="flex items-center gap-1">
        Developed and designed with
        <span className="text-light-purpleBd">
          <PiHeartFill />
        </span>
        by Fernanda Gomes · © 2026 Book Library
      </p>
    </div>
  );
}
