'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Grid,
  Clues,
  Timer,
  Keyboard,
  StatsModal,
  HelpModal,
} from '@/components/games/minix';
import { GameHeader, Toast } from '@/components/shared';
import { useMiniX } from '@/hooks/useMiniX';

export default function MiniXPage() {
  const {
    gameState,
    stats,
    elapsedTime,
    selectedClue,
    highlightedCells,
    handleCellClick,
    handleKeyPress,
    handleClueClick,
    shareResults,
    isWinAnimation,
  } = useMiniX();

  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [hasShownResult, setHasShownResult] = useState(false);

  // Show stats modal when game ends
  useEffect(() => {
    if (gameState.isCompleted && !hasShownResult) {
      const timer = setTimeout(() => {
        setShowStats(true);
        setHasShownResult(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.isCompleted, hasShownResult]);

  const handleShare = useCallback(async () => {
    const success = await shareResults();
    if (success) {
      setToastMessage('Copied to clipboard!');
      setShowToast(true);
    } else {
      setToastMessage('Failed to share');
      setShowToast(true);
    }
  }, [shareResults]);

  const hideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  // Get current clue text for mobile display
  const currentClueText = selectedClue
    ? (() => {
        const clues =
          selectedClue.direction === 'across'
            ? gameState.puzzle.clues.across
            : gameState.puzzle.clues.down;
        const clue = clues.find((c) => c.number === selectedClue.number);
        return clue
          ? `${selectedClue.number}${selectedClue.direction === 'across' ? 'A' : 'D'}. ${clue.clue}`
          : '';
      })()
    : '';

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--background)]">
      <GameHeader
        title="MiniX"
        emoji="📝"
        onStatsClick={() => setShowStats(true)}
        onHelpClick={() => setShowHelp(true)}
        accentColor="var(--info)"
      />

      <main className="flex-1 flex flex-col items-center py-4 px-4 page-enter">
        {/* Timer */}
        <div className="mb-4">
          <Timer elapsedTime={elapsedTime} isCompleted={gameState.isCompleted} />
        </div>

        {/* Mobile: Current clue */}
        <div className="sm:hidden w-full max-w-[300px] mb-4">
          <div
            className={`
              text-sm text-center p-3 rounded-lg
              bg-[var(--tile-bg)] border border-[var(--tile-border)]
              min-h-[60px] flex items-center justify-center
              ${selectedClue ? '' : 'text-[var(--foreground)]/50'}
            `}
          >
            {currentClueText || 'Tap a cell to start'}
          </div>
        </div>

        {/* Desktop layout: Grid + Clues side by side */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start justify-center w-full max-w-[900px]">
          {/* Grid */}
          <div className="flex justify-center">
            <Grid
              puzzle={gameState.puzzle}
              userGrid={gameState.userGrid}
              selectedCell={gameState.selectedCell}
              highlightedCells={highlightedCells}
              onCellClick={handleCellClick}
              isCompleted={gameState.isCompleted}
              isWinAnimation={isWinAnimation}
            />
          </div>

          {/* Clues - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:block flex-1 max-w-[400px]">
            <Clues
              puzzle={gameState.puzzle}
              userGrid={gameState.userGrid}
              selectedClue={selectedClue}
              onClueClick={handleClueClick}
              isCompleted={gameState.isCompleted}
            />
          </div>
        </div>

        {/* Mobile: Clues in expandable section */}
        <div className="sm:hidden w-full max-w-[300px] mt-4">
          <details className="bg-[var(--tile-bg)] rounded-lg border border-[var(--tile-border)]">
            <summary className="px-4 py-3 cursor-pointer font-semibold text-sm flex items-center justify-between">
              <span>All Clues</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <Clues
                puzzle={gameState.puzzle}
                userGrid={gameState.userGrid}
                selectedClue={selectedClue}
                onClueClick={handleClueClick}
                isCompleted={gameState.isCompleted}
              />
            </div>
          </details>
        </div>

        {/* Mobile Keyboard */}
        <div className="mt-auto pt-4 pb-2 w-full flex justify-center sm:hidden">
          <Keyboard
            onKeyPress={handleKeyPress}
            disabled={gameState.isCompleted}
          />
        </div>
      </main>

      {/* Modals */}
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameState={gameState}
        elapsedTime={elapsedTime}
        onShare={handleShare}
      />

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      {/* Toast */}
      <Toast message={toastMessage} isVisible={showToast} onHide={hideToast} />
    </div>
  );
}
