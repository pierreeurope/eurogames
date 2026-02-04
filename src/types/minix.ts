// MiniX Crossword Types

export interface ClueData {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
}

export interface PuzzleData {
  id: number;
  grid: (string | null)[][]; // null = black cell, string = letter
  clues: {
    across: ClueData[];
    down: ClueData[];
  };
  date: string;
}

export interface CellState {
  letter: string;
  isCorrect: boolean;
  isRevealed: boolean;
}

export interface GameState {
  puzzle: PuzzleData;
  userGrid: (string | null)[][];
  selectedCell: { row: number; col: number } | null;
  direction: 'across' | 'down';
  isCompleted: boolean;
  startTime: number;
  endTime: number | null;
  dayNumber: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  totalTime: number; // in seconds
  bestTime: number | null; // in seconds
  averageTime: number; // in seconds
  lastPlayedDay: number;
}

export const GRID_SIZE = 5;
