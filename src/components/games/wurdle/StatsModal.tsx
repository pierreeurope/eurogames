'use client';

import { useMemo } from 'react';
import { GameStats, GameState, MAX_GUESSES } from '@/types/wurdle';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  gameState: GameState;
  onShare: () => void;
}

interface StatBoxProps {
  value: number | string;
  label: string;
}

function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl font-bold">{value}</span>
      <span className="text-[10px] sm:text-xs text-center leading-tight">{label}</span>
    </div>
  );
}

interface DistributionBarProps {
  count: number;
  maxCount: number;
  guessNumber: number;
  isCurrentGuess: boolean;
}

function DistributionBar({
  count,
  maxCount,
  guessNumber,
  isCurrentGuess,
}: DistributionBarProps) {
  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const minWidth = count > 0 ? 8 : 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-3 text-right font-semibold">{guessNumber}</span>
      <div
        className={`
          min-h-[20px] px-2 flex items-center justify-end
          text-white text-xs font-semibold
          transition-all duration-300
          ${isCurrentGuess ? 'bg-[var(--success)]' : 'bg-[var(--key-bg)]'}
        `}
        style={{
          width: `${Math.max(percentage, minWidth)}%`,
          minWidth: count > 0 ? '24px' : '8px',
        }}
      >
        {count}
      </div>
    </div>
  );
}

export function StatsModal({
  isOpen,
  onClose,
  stats,
  gameState,
  onShare,
}: StatsModalProps) {
  const winPercentage = useMemo(() => {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
  }, [stats]);

  const maxDistribution = useMemo(() => {
    return Math.max(...stats.guessDistribution, 1);
  }, [stats]);

  const currentGuessCount = gameState.gameStatus === 'won' ? gameState.guesses.length : null;
  const gameEnded = gameState.gameStatus !== 'playing';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          relative w-full max-w-[360px] sm:max-w-[400px]
          bg-[var(--modal-bg)] rounded-lg shadow-xl
          p-6 sm:p-8
          fade-in
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            w-8 h-8 flex items-center justify-center
            text-[var(--foreground)] opacity-60 hover:opacity-100
            transition-opacity
          "
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-6">Statistics</h2>

        {/* Stats grid */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <StatBox value={stats.gamesPlayed} label="Played" />
          <StatBox value={winPercentage} label="Win %" />
          <StatBox value={stats.currentStreak} label="Current Streak" />
          <StatBox value={stats.maxStreak} label="Max Streak" />
        </div>

        {/* Guess distribution */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 text-center">Guess Distribution</h3>
          <div className="flex flex-col gap-1">
            {stats.guessDistribution.map((count, index) => (
              <DistributionBar
                key={index}
                count={count}
                maxCount={maxDistribution}
                guessNumber={index + 1}
                isCurrentGuess={currentGuessCount === index + 1}
              />
            ))}
          </div>
        </div>

        {/* Game result message */}
        {gameEnded && (
          <div className="text-center mb-4">
            {gameState.gameStatus === 'won' ? (
              <p className="text-[var(--success)] font-semibold">
                Congratulations! You got it in {gameState.guesses.length}!
              </p>
            ) : (
              <p className="text-[var(--error)]">
                The word was <span className="font-bold uppercase">{gameState.solution}</span>
              </p>
            )}
          </div>
        )}

        {/* Share button */}
        {gameEnded && (
          <button
            onClick={onShare}
            className="
              w-full py-3 px-6
              bg-[var(--success)] hover:bg-[var(--success)]/90
              text-white font-bold uppercase
              rounded-full
              flex items-center justify-center gap-2
              transition-colors
            "
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
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            Share
          </button>
        )}
      </div>
    </div>
  );
}
