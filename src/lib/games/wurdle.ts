// Wurdle Game Logic

import { LetterState, GameState, GameStats, WORD_LENGTH, MAX_GUESSES } from '@/types/wurdle';
import { SOLUTIONS, VALID_GUESSES_SET } from './wordlist';

// Get the day number since a fixed epoch (for daily word)
export function getDayNumber(): number {
  const epoch = new Date('2024-01-01').getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  return Math.floor((now - epoch) / (1000 * 60 * 60 * 24));
}

// Get the daily word using a seeded random based on day number
export function getDailyWord(dayNumber: number): string {
  // Simple seeded random using day number
  const index = dayNumber % SOLUTIONS.length;
  return SOLUTIONS[index];
}

// Validate if a word is in the valid guesses list
export function isValidWord(word: string): boolean {
  return VALID_GUESSES_SET.has(word.toUpperCase());
}

// Get letter states for a guess compared to the solution
export function getLetterStates(guess: string, solution: string): LetterState[] {
  const guessArr = guess.toUpperCase().split('');
  const solutionArr = solution.toUpperCase().split('');
  const states: LetterState[] = new Array(WORD_LENGTH).fill('absent');
  const solutionLetterCount: { [key: string]: number } = {};

  // Count letters in solution
  for (const letter of solutionArr) {
    solutionLetterCount[letter] = (solutionLetterCount[letter] || 0) + 1;
  }

  // First pass: mark correct letters (green)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === solutionArr[i]) {
      states[i] = 'correct';
      solutionLetterCount[guessArr[i]]--;
    }
  }

  // Second pass: mark present letters (yellow)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (states[i] !== 'correct') {
      if (solutionLetterCount[guessArr[i]] > 0) {
        states[i] = 'present';
        solutionLetterCount[guessArr[i]]--;
      }
    }
  }

  return states;
}

// Get keyboard letter states from all guesses
export function getKeyboardStates(
  guesses: string[],
  solution: string
): { [key: string]: LetterState } {
  const keyStates: { [key: string]: LetterState } = {};

  for (const guess of guesses) {
    const states = getLetterStates(guess, solution);
    const guessArr = guess.toUpperCase().split('');

    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guessArr[i];
      const currentState = keyStates[letter];
      const newState = states[i];

      // Priority: correct > present > absent
      if (currentState === 'correct') continue;
      if (currentState === 'present' && newState !== 'correct') continue;
      keyStates[letter] = newState;
    }
  }

  return keyStates;
}

// Generate share text for the game
export function generateShareText(gameState: GameState): string {
  const { guesses, gameStatus, dayNumber } = gameState;
  const won = gameStatus === 'won';
  const attempts = won ? guesses.length : 'X';

  let text = `Wurdle ${dayNumber} ${attempts}/${MAX_GUESSES} 🇪🇺\n\n`;

  for (const guess of guesses) {
    const states = getLetterStates(guess, gameState.solution);
    const row = states
      .map((state) => {
        switch (state) {
          case 'correct':
            return '🟩';
          case 'present':
            return '🟨';
          default:
            return '⬛';
        }
      })
      .join('');
    text += row + '\n';
  }

  text += '\neurogames.app/wurdle';
  return text;
}

// Initialize empty game state
export function createInitialGameState(dayNumber: number): GameState {
  return {
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    solution: getDailyWord(dayNumber),
    dayNumber,
  };
}

// Initialize empty stats
export function createInitialStats(): GameStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    lastPlayedDay: -1,
  };
}

// Update stats after a game
export function updateStats(
  stats: GameStats,
  gameState: GameState
): GameStats {
  const { gameStatus, guesses, dayNumber } = gameState;
  const won = gameStatus === 'won';

  const newStats = { ...stats };
  newStats.gamesPlayed++;
  newStats.lastPlayedDay = dayNumber;

  if (won) {
    newStats.gamesWon++;
    newStats.guessDistribution[guesses.length - 1]++;
    
    // Check if this is a continuation of streak (played yesterday or first game)
    if (stats.lastPlayedDay === dayNumber - 1 || stats.lastPlayedDay === -1) {
      newStats.currentStreak = stats.currentStreak + 1;
    } else {
      newStats.currentStreak = 1;
    }
    
    newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
  } else {
    newStats.currentStreak = 0;
  }

  return newStats;
}

// Local storage keys
export const STORAGE_KEY_GAME = 'wurdle-game-state';
export const STORAGE_KEY_STATS = 'wurdle-stats';

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
