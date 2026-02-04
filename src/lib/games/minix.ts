// MiniX Game Logic

import { GameState, GameStats, PuzzleData, GRID_SIZE } from '@/types/minix';
import { getPuzzleForDay } from './minix-puzzles';

// Get the day number since a fixed epoch
export function getDayNumber(): number {
  const epoch = new Date('2024-01-01').getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  return Math.floor((now - epoch) / (1000 * 60 * 60 * 24));
}

// Create empty user grid matching puzzle dimensions
export function createEmptyUserGrid(puzzle: PuzzleData): (string | null)[][] {
  const grid: (string | null)[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      // null cells in puzzle (black cells) stay null
      grid[row][col] = puzzle.grid[row][col] === null ? null : '';
    }
  }
  return grid;
}

// Check if a cell is a black cell
export function isBlackCell(puzzle: PuzzleData, row: number, col: number): boolean {
  return puzzle.grid[row]?.[col] === null;
}

// Check if the puzzle is complete (all cells filled correctly)
export function isPuzzleComplete(puzzle: PuzzleData, userGrid: (string | null)[][]): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const expected = puzzle.grid[row][col];
      const actual = userGrid[row]?.[col];
      
      if (expected === null) continue; // Skip black cells
      
      if (!actual || actual.toUpperCase() !== expected.toUpperCase()) {
        return false;
      }
    }
  }
  return true;
}

// Check if a specific cell is correct
export function isCellCorrect(
  puzzle: PuzzleData,
  userGrid: (string | null)[][],
  row: number,
  col: number
): boolean {
  const expected = puzzle.grid[row]?.[col];
  const actual = userGrid[row]?.[col];
  
  if (expected === null) return true; // Black cells are always "correct"
  if (!actual) return false;
  
  return actual.toUpperCase() === expected.toUpperCase();
}

// Get the cell number for a position (if it starts a word)
export function getCellNumber(puzzle: PuzzleData, row: number, col: number): number | null {
  // Check if this cell starts any clue
  const allClues = [...puzzle.clues.across, ...puzzle.clues.down];
  const clue = allClues.find(c => c.row === row && c.col === col);
  return clue?.number || null;
}

// Find the next cell in a direction
export function getNextCell(
  puzzle: PuzzleData,
  row: number,
  col: number,
  direction: 'across' | 'down',
  forward: boolean = true
): { row: number; col: number } | null {
  const delta = forward ? 1 : -1;
  
  if (direction === 'across') {
    const newCol = col + delta;
    if (newCol >= 0 && newCol < GRID_SIZE && !isBlackCell(puzzle, row, newCol)) {
      return { row, col: newCol };
    }
  } else {
    const newRow = row + delta;
    if (newRow >= 0 && newRow < GRID_SIZE && !isBlackCell(puzzle, newRow, col)) {
      return { row: newRow, col };
    }
  }
  
  return null;
}

// Get all cells in a word (for highlighting)
export function getWordCells(
  puzzle: PuzzleData,
  row: number,
  col: number,
  direction: 'across' | 'down'
): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  
  if (isBlackCell(puzzle, row, col)) return cells;
  
  // Find the start of the word
  let startRow = row;
  let startCol = col;
  
  if (direction === 'across') {
    while (startCol > 0 && !isBlackCell(puzzle, startRow, startCol - 1)) {
      startCol--;
    }
  } else {
    while (startRow > 0 && !isBlackCell(puzzle, startRow - 1, startCol)) {
      startRow--;
    }
  }
  
  // Collect all cells in the word
  let currentRow = startRow;
  let currentCol = startCol;
  
  while (
    currentRow < GRID_SIZE &&
    currentCol < GRID_SIZE &&
    !isBlackCell(puzzle, currentRow, currentCol)
  ) {
    cells.push({ row: currentRow, col: currentCol });
    
    if (direction === 'across') {
      currentCol++;
    } else {
      currentRow++;
    }
  }
  
  return cells;
}

// Get the clue for a cell in a given direction
export function getClueForCell(
  puzzle: PuzzleData,
  row: number,
  col: number,
  direction: 'across' | 'down'
) {
  const clues = direction === 'across' ? puzzle.clues.across : puzzle.clues.down;
  
  // Find the word start
  let startRow = row;
  let startCol = col;
  
  if (direction === 'across') {
    while (startCol > 0 && !isBlackCell(puzzle, startRow, startCol - 1)) {
      startCol--;
    }
  } else {
    while (startRow > 0 && !isBlackCell(puzzle, startRow - 1, startCol)) {
      startRow--;
    }
  }
  
  return clues.find(c => c.row === startRow && c.col === startCol);
}

// Check if a word is complete
export function isWordComplete(
  puzzle: PuzzleData,
  userGrid: (string | null)[][],
  row: number,
  col: number,
  direction: 'across' | 'down'
): boolean {
  const cells = getWordCells(puzzle, row, col, direction);
  
  return cells.every(({ row: r, col: c }) => {
    const expected = puzzle.grid[r][c];
    const actual = userGrid[r]?.[c];
    return actual && actual.toUpperCase() === expected?.toUpperCase();
  });
}

// Format time (seconds) as MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Generate share text
export function generateShareText(state: GameState): string {
  const time = state.endTime
    ? formatTime(Math.floor((state.endTime - state.startTime) / 1000))
    : 'DNF';
  
  let text = `MiniX #${state.dayNumber} 📝\n`;
  text += `⏱️ ${time}\n\n`;
  
  // Generate grid representation
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (state.puzzle.grid[row][col] === null) {
        text += '⬛';
      } else {
        text += '🟦';
      }
    }
    text += '\n';
  }
  
  text += '\neurogames.app/minix';
  return text;
}

// Create initial game state
export function createInitialGameState(dayNumber: number): GameState {
  const puzzle = getPuzzleForDay(dayNumber);
  return {
    puzzle,
    userGrid: createEmptyUserGrid(puzzle),
    selectedCell: { row: 0, col: 0 },
    direction: 'across',
    isCompleted: false,
    startTime: Date.now(),
    endTime: null,
    dayNumber,
  };
}

// Create initial stats
export function createInitialStats(): GameStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    totalTime: 0,
    bestTime: null,
    averageTime: 0,
    lastPlayedDay: -1,
  };
}

// Update stats after winning
export function updateStats(stats: GameStats, state: GameState): GameStats {
  const timeInSeconds = state.endTime
    ? Math.floor((state.endTime - state.startTime) / 1000)
    : 0;
  
  const newStats = { ...stats };
  newStats.gamesPlayed++;
  newStats.gamesWon++;
  newStats.totalTime += timeInSeconds;
  newStats.lastPlayedDay = state.dayNumber;
  
  // Update best time
  if (newStats.bestTime === null || timeInSeconds < newStats.bestTime) {
    newStats.bestTime = timeInSeconds;
  }
  
  // Update average
  newStats.averageTime = Math.floor(newStats.totalTime / newStats.gamesWon);
  
  // Update streak
  if (stats.lastPlayedDay === state.dayNumber - 1 || stats.lastPlayedDay === -1) {
    newStats.currentStreak = stats.currentStreak + 1;
  } else {
    newStats.currentStreak = 1;
  }
  
  newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
  
  return newStats;
}

// Local storage keys
export const STORAGE_KEY_GAME = 'minix-game-state';
export const STORAGE_KEY_STATS = 'minix-stats';

// Save game state to localStorage
export function saveGameState(state: GameState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_GAME, JSON.stringify(state));
  }
}

// Load game state from localStorage
export function loadGameState(): GameState | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY_GAME);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  }
  return null;
}

// Save stats to localStorage
export function saveStats(stats: GameStats): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  }
}

// Load stats from localStorage
export function loadStats(): GameStats {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY_STATS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return createInitialStats();
      }
    }
  }
  return createInitialStats();
}
