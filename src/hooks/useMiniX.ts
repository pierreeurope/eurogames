'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, GameStats, GRID_SIZE } from '@/types/minix';
import {
  getDayNumber,
  createInitialGameState,
  createInitialStats,
  isPuzzleComplete,
  isBlackCell,
  getNextCell,
  getWordCells,
  getClueForCell,
  updateStats,
  saveGameState,
  loadGameState,
  saveStats,
  loadStats,
  generateShareText,
} from '@/lib/games/minix';

export interface UseMiniXReturn {
  gameState: GameState;
  stats: GameStats;
  elapsedTime: number;
  selectedClue: { direction: 'across' | 'down'; number: number } | null;
  highlightedCells: { row: number; col: number }[];
  handleCellClick: (row: number, col: number) => void;
  handleKeyPress: (key: string) => void;
  handleClueClick: (direction: 'across' | 'down', number: number) => void;
  shareResults: () => Promise<boolean>;
  isWinAnimation: boolean;
}

export function useMiniX(): UseMiniXReturn {
  const [gameState, setGameState] = useState<GameState>(() => {
    return createInitialGameState(getDayNumber());
  });
  const [stats, setStats] = useState<GameStats>(createInitialStats);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isWinAnimation, setIsWinAnimation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadGameState();
    const savedStats = loadStats();
    const currentDay = getDayNumber();

    if (savedState && savedState.dayNumber === currentDay) {
      setGameState(savedState);
      // Calculate elapsed time from saved state
      if (!savedState.isCompleted) {
        const elapsed = Math.floor((Date.now() - savedState.startTime) / 1000);
        setElapsedTime(elapsed);
      } else if (savedState.endTime) {
        setElapsedTime(Math.floor((savedState.endTime - savedState.startTime) / 1000));
      }
    } else {
      const newState = createInitialGameState(currentDay);
      setGameState(newState);
      saveGameState(newState);
    }

    setStats(savedStats);
    setIsInitialized(true);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isInitialized || gameState.isCompleted) return;

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInitialized, gameState.isCompleted]);

  // Save state whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveGameState(gameState);
    }
  }, [gameState, isInitialized]);

  // Get selected clue info
  const selectedClue = gameState.selectedCell
    ? (() => {
        const clue = getClueForCell(
          gameState.puzzle,
          gameState.selectedCell.row,
          gameState.selectedCell.col,
          gameState.direction
        );
        return clue ? { direction: gameState.direction, number: clue.number } : null;
      })()
    : null;

  // Get highlighted cells (current word)
  const highlightedCells = gameState.selectedCell
    ? getWordCells(
        gameState.puzzle,
        gameState.selectedCell.row,
        gameState.selectedCell.col,
        gameState.direction
      )
    : [];

  // Handle cell click
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gameState.isCompleted) return;
      if (isBlackCell(gameState.puzzle, row, col)) return;

      setGameState((prev) => {
        // If clicking the same cell, toggle direction
        if (prev.selectedCell?.row === row && prev.selectedCell?.col === col) {
          return {
            ...prev,
            direction: prev.direction === 'across' ? 'down' : 'across',
          };
        }
        
        return {
          ...prev,
          selectedCell: { row, col },
        };
      });
    },
    [gameState.isCompleted, gameState.puzzle]
  );

  // Handle clue click
  const handleClueClick = useCallback(
    (direction: 'across' | 'down', number: number) => {
      if (gameState.isCompleted) return;

      const clues = direction === 'across' 
        ? gameState.puzzle.clues.across 
        : gameState.puzzle.clues.down;
      const clue = clues.find((c) => c.number === number);

      if (clue) {
        setGameState((prev) => ({
          ...prev,
          selectedCell: { row: clue.row, col: clue.col },
          direction,
        }));
      }
    },
    [gameState.isCompleted, gameState.puzzle]
  );

  // Handle key press
  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState.isCompleted || !gameState.selectedCell) return;

      const { row, col } = gameState.selectedCell;
      const upperKey = key.toUpperCase();

      if (/^[A-Z]$/.test(upperKey)) {
        // Type a letter
        setGameState((prev) => {
          const newGrid = prev.userGrid.map((r) => [...r]);
          newGrid[row][col] = upperKey;

          // Move to next cell
          const nextCell = getNextCell(prev.puzzle, row, col, prev.direction, true);
          const newSelectedCell = nextCell || prev.selectedCell;

          // Check if puzzle is complete
          const isComplete = isPuzzleComplete(prev.puzzle, newGrid);

          if (isComplete && !prev.isCompleted) {
            // Trigger win animation
            setIsWinAnimation(true);
            setTimeout(() => setIsWinAnimation(false), 1000);

            // Update stats
            const endTime = Date.now();
            const newStats = updateStats(stats, {
              ...prev,
              userGrid: newGrid,
              isCompleted: true,
              endTime,
            });
            setStats(newStats);
            saveStats(newStats);

            return {
              ...prev,
              userGrid: newGrid,
              selectedCell: newSelectedCell,
              isCompleted: true,
              endTime,
            };
          }

          return {
            ...prev,
            userGrid: newGrid,
            selectedCell: newSelectedCell,
          };
        });
      } else if (upperKey === 'BACKSPACE' || upperKey === 'DELETE') {
        // Delete letter and move back
        setGameState((prev) => {
          const currentLetter = prev.userGrid[row][col];
          
          if (currentLetter) {
            // If there's a letter, just delete it
            const newGrid = prev.userGrid.map((r) => [...r]);
            newGrid[row][col] = '';
            return { ...prev, userGrid: newGrid };
          } else {
            // If empty, move back and delete
            const prevCell = getNextCell(prev.puzzle, row, col, prev.direction, false);
            if (prevCell) {
              const newGrid = prev.userGrid.map((r) => [...r]);
              newGrid[prevCell.row][prevCell.col] = '';
              return {
                ...prev,
                userGrid: newGrid,
                selectedCell: prevCell,
              };
            }
          }
          
          return prev;
        });
      } else if (upperKey === 'TAB' || upperKey === ' ') {
        // Toggle direction
        setGameState((prev) => ({
          ...prev,
          direction: prev.direction === 'across' ? 'down' : 'across',
        }));
      } else if (upperKey === 'ARROWUP') {
        // Move up
        const newRow = Math.max(0, row - 1);
        if (!isBlackCell(gameState.puzzle, newRow, col)) {
          setGameState((prev) => ({
            ...prev,
            selectedCell: { row: newRow, col },
            direction: 'down',
          }));
        }
      } else if (upperKey === 'ARROWDOWN') {
        // Move down
        const newRow = Math.min(GRID_SIZE - 1, row + 1);
        if (!isBlackCell(gameState.puzzle, newRow, col)) {
          setGameState((prev) => ({
            ...prev,
            selectedCell: { row: newRow, col },
            direction: 'down',
          }));
        }
      } else if (upperKey === 'ARROWLEFT') {
        // Move left
        const newCol = Math.max(0, col - 1);
        if (!isBlackCell(gameState.puzzle, row, newCol)) {
          setGameState((prev) => ({
            ...prev,
            selectedCell: { row, col: newCol },
            direction: 'across',
          }));
        }
      } else if (upperKey === 'ARROWRIGHT') {
        // Move right
        const newCol = Math.min(GRID_SIZE - 1, col + 1);
        if (!isBlackCell(gameState.puzzle, row, newCol)) {
          setGameState((prev) => ({
            ...prev,
            selectedCell: { row, col: newCol },
            direction: 'across',
          }));
        }
      }
    },
    [gameState, stats]
  );

  // Physical keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      // Prevent default for arrow keys and space to avoid scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Tab'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Tab') {
        handleKeyPress('TAB');
      } else if (e.key === ' ') {
        handleKeyPress(' ');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (e.key.startsWith('Arrow')) {
        handleKeyPress(e.key.toUpperCase());
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  // Share results
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
    elapsedTime,
    selectedClue,
    highlightedCells,
    handleCellClick,
    handleKeyPress,
    handleClueClick,
    shareResults,
    isWinAnimation,
  };
}
