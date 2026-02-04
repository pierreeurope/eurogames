// Wurdle Game Types

export type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export interface TileData {
  letter: string;
  state: LetterState;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  guesses: string[];
  currentGuess: string;
  gameStatus: GameStatus;
  solution: string;
  dayNumber: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastPlayedDay: number;
}

export interface KeyboardKey {
  key: string;
  state: LetterState;
  width?: 'normal' | 'wide';
}

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

// Keyboard layout
export const KEYBOARD_ROWS: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];
