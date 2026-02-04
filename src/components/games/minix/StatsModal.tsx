'use client';

import { GameStats, GameState } from '@/types/minix';
import { formatTime } from '@/lib/games/minix';
import { Modal } from '@/components/shared';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  gameState: GameState;
  elapsedTime: number;
  onShare: () => void;
}

interface StatBoxProps {
  value: string | number;
  label: string;
}

function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold">{value}</span>
      <span className="text-[10px] sm:text-xs text-center text-[var(--foreground)]/60">{label}</span>
    </div>
  );
}

export function StatsModal({
  isOpen,
  onClose,
  stats,
  gameState,
  elapsedTime,
  onShare,
}: StatsModalProps) {
  const winPercentage =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Statistics">
      {/* Current game result */}
      {gameState.isCompleted && (
        <div className="text-center mb-6 p-4 bg-[var(--success)]/10 rounded-xl">
          <p className="text-[var(--success)] font-bold text-lg mb-1">
            Puzzle Complete!
          </p>
          <p className="text-2xl font-mono font-bold">
            {formatTime(elapsedTime)}
          </p>
        </div>
      )}

      {/* Stats grid */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-6">
        <StatBox value={stats.gamesPlayed} label="Played" />
        <StatBox value={`${winPercentage}%`} label="Win Rate" />
        <StatBox value={stats.currentStreak} label="Streak" />
        <StatBox value={stats.maxStreak} label="Max Streak" />
      </div>

      {/* Time stats */}
      <div className="bg-[var(--tile-bg)] rounded-lg p-4 mb-6">
        <h3 className="text-sm font-bold mb-3 text-center text-[var(--foreground)]/70">
          Time Stats
        </h3>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-lg font-mono font-bold">
              {stats.bestTime !== null ? formatTime(stats.bestTime) : '--:--'}
            </p>
            <p className="text-xs text-[var(--foreground)]/60">Best</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-bold">
              {stats.averageTime > 0 ? formatTime(stats.averageTime) : '--:--'}
            </p>
            <p className="text-xs text-[var(--foreground)]/60">Average</p>
          </div>
        </div>
      </div>

      {/* Share button */}
      {gameState.isCompleted && (
        <button
          onClick={onShare}
          className="
            w-full py-3 px-6
            bg-[var(--info)] hover:bg-[var(--info)]/90
            text-white font-bold uppercase
            rounded-full
            flex items-center justify-center gap-2
            transition-colors btn-press
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
          Share Results
        </button>
      )}
    </Modal>
  );
}
