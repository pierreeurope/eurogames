'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  GameBoard,
  Keyboard,
  StatsModal,
  Toast,
  Header,
  HelpModal,
} from '@/components/games/wurdle';
import { useWurdle } from '@/hooks/useWurdle';

export default function WurdlePage() {
  const {
    gameState,
    stats,
    handleKeyPress,
    shareResults,
    isInvalidWord,
    justSubmitted,
    isRevealing,
  } = useWurdle();

  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [hasShownResult, setHasShownResult] = useState(false);

  // Show stats modal when game ends (after reveal animation)
  useEffect(() => {
    if (
      gameState.gameStatus !== 'playing' &&
      !isRevealing &&
      !hasShownResult
    ) {
      const timer = setTimeout(() => {
        setShowStats(true);
        setHasShownResult(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus, isRevealing, hasShownResult]);

  // Show toast for invalid word
  useEffect(() => {
    if (isInvalidWord) {
      setToastMessage('Not in word list');
      setShowToast(true);
    }
  }, [isInvalidWord]);

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

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--background)]">
      <Header
        onStatsClick={() => setShowStats(true)}
        onHelpClick={() => setShowHelp(true)}
      />

      <main className="flex-1 flex flex-col items-center justify-between py-4 sm:py-6 px-2">
        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center">
          <GameBoard
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            solution={gameState.solution}
            isInvalidWord={isInvalidWord}
            justSubmitted={justSubmitted}
            gameStatus={gameState.gameStatus}
          />
        </div>

        {/* Keyboard */}
        <div className="w-full flex justify-center pb-2 sm:pb-4">
          <Keyboard
            guesses={gameState.guesses}
            solution={gameState.solution}
            onKeyPress={handleKeyPress}
            disabled={gameState.gameStatus !== 'playing' || isRevealing}
          />
        </div>
      </main>

      {/* Modals */}
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameState={gameState}
        onShare={handleShare}
      />

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onHide={hideToast}
      />
    </div>
  );
}
