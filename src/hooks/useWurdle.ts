'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  GameState,
  GameStats,
  WORD_LENGTH,
  MAX_GUESSES,
} from '@/types/wurdle';
import {
  getDayNumber,
  isValidWord,
  createInitialGameState,
  createInitialStats,
  updateStats,
  saveGameState,
  loadGameState,
  saveStats,
  loadStats,
  generateShareText,
} from '@/lib/games/wurdle';

export interface UseWurdleReturn {
  gameState: GameState;
  stats: GameStats;
  handleKeyPress: (key: string) => void;
  shareResults: () => Promise<boolean>;
  isInvalidWord: boolean;
  justSubmitted: number | null;
  isRevealing: boolean;
}

export function useWurdle(): UseWurdleReturn {
  const [gameState, setGameState] = useState<GameState>(() => {
    return createInitialGameState(getDayNumber());
  });
  const [stats, setStats] = useState<GameStats>(createInitialStats);
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadGameState();
    const savedStats = loadStats();
    const currentDay = getDayNumber();

    if (savedState && savedState.dayNumber === currentDay) {
      setGameState(savedState);
    } else {
      // New day, create fresh game state
      const newState = createInitialGameState(currentDay);
      setGameState(newState);
      saveGameState(newState);
    }

    setStats(savedStats);
    setIsInitialized(true);
  }, []);

  // Save state whenever it changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveGameState(gameState);
    }
  }, [gameState, isInitialized]);

  // Clear invalid word shake after animation
  useEffect(() => {
    if (isInvalidWord) {
      const timer = setTimeout(() => setIsInvalidWord(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isInvalidWord]);

  // Clear justSubmitted after animations complete
  useEffect(() => {
    if (justSubmitted !== null) {
      const timer = setTimeout(() => {
        setJustSubmitted(null);
        setIsRevealing(false);
      }, WORD_LENGTH * 300 + 500);
      return () => clearTimeout(timer);
    }
  }, [justSubmitted]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState.gameStatus !== 'playing' || isRevealing) return;

      const upperKey = key.toUpperCase();

      if (upperKey === 'ENTER') {
        // Submit guess
        if (gameState.currentGuess.length !== WORD_LENGTH) return;

        if (!isValidWord(gameState.currentGuess)) {
          setIsInvalidWord(true);
          return;
        }

        const newGuesses = [...gameState.guesses, gameState.currentGuess];
        const won = gameState.currentGuess.toUpperCase() === gameState.solution.toUpperCase();
        const lost = !won && newGuesses.length >= MAX_GUESSES;
        const newStatus = won ? 'won' : lost ? 'lost' : 'playing';

        const newGameState: GameState = {
          ...gameState,
          guesses: newGuesses,
          currentGuess: '',
          gameStatus: newStatus,
        };

        setJustSubmitted(newGuesses.length - 1);
        setIsRevealing(true);
        setGameState(newGameState);

        // Update stats if game ended
        if (newStatus !== 'playing') {
          const newStats = updateStats(stats, newGameState);
          setStats(newStats);
          saveStats(newStats);
        }
      } else if (upperKey === 'BACKSPACE' || upperKey === 'DELETE') {
        // Remove last letter
        if (gameState.currentGuess.length > 0) {
          setGameState((prev) => ({
            ...prev,
            currentGuess: prev.currentGuess.slice(0, -1),
          }));
        }
      } else if (/^[A-Z]$/.test(upperKey)) {
        // Add letter
        if (gameState.currentGuess.length < WORD_LENGTH) {
          setGameState((prev) => ({
            ...prev,
            currentGuess: prev.currentGuess + upperKey,
          }));
        }
      }
    },
    [gameState, stats, isRevealing]
  );

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const shareResults = useCallback(async (): Promise<boolean> => {
    const text = generateShareText(gameState);
    
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return true;
      } else {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    }
  }, [gameState]);

  return {
    gameState,
    stats,
    handleKeyPress,
    shareResults,
    isInvalidWord,
    justSubmitted,
    isRevealing,
  };
}
