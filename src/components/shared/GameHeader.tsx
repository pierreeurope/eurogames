'use client';

import Link from 'next/link';

interface GameHeaderProps {
  title: string;
  emoji?: string;
  onStatsClick?: () => void;
  onHelpClick?: () => void;
  showBackButton?: boolean;
  accentColor?: string;
}

export function GameHeader({
  title,
  emoji = '🇪🇺',
  onStatsClick,
  onHelpClick,
  showBackButton = true,
  accentColor,
}: GameHeaderProps) {
  return (
    <header className="w-full border-b border-[var(--tile-border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-[500px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side - Back or Help */}
        <div className="w-10 flex justify-start">
          {showBackButton ? (
            <Link
              href="/"
              className="w-9 h-9 flex items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-[var(--tile-border)]/30 transition-all active:scale-95"
              aria-label="Back to home"
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
          ) : onHelpClick ? (
            <button
              onClick={onHelpClick}
              className="w-9 h-9 flex items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-[var(--tile-border)]/30 transition-all active:scale-95"
              aria-label="How to play"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </button>
          ) : (
            <div className="w-9" />
          )}
        </div>

        {/* Center - Title */}
        <Link href="/" className="flex items-center gap-2 group">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">
            <span
              className="transition-colors"
              style={{ color: accentColor || 'var(--primary)' }}
            >
              {title.charAt(0)}
            </span>
            <span className="group-hover:text-[var(--foreground)]/80 transition-colors">
              {title.slice(1)}
            </span>
          </h1>
          <span className="text-lg group-hover:scale-110 transition-transform">{emoji}</span>
        </Link>

        {/* Right side - Actions */}
        <div className="w-10 flex justify-end gap-1">
          {onHelpClick && showBackButton && (
            <button
              onClick={onHelpClick}
              className="w-9 h-9 flex items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-[var(--tile-border)]/30 transition-all active:scale-95"
              aria-label="How to play"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </button>
          )}
          {onStatsClick && (
            <button
              onClick={onStatsClick}
              className="w-9 h-9 flex items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-[var(--tile-border)]/30 transition-all active:scale-95"
              aria-label="Statistics"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
