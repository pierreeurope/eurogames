'use client';

import { formatTime } from '@/lib/games/minix';

interface TimerProps {
  elapsedTime: number;
  isCompleted: boolean;
}

export function Timer({ elapsedTime, isCompleted }: TimerProps) {
  return (
    <div
      className={`
        timer
        flex items-center gap-2
        text-lg font-mono font-semibold
        ${isCompleted ? 'text-[var(--success)]' : 'text-[var(--foreground)]/70'}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{formatTime(elapsedTime)}</span>
      {isCompleted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-[var(--success)]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </div>
  );
}
