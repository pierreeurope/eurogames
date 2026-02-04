'use client';

import { useMemo } from 'react';
import { TileData, LetterState, WORD_LENGTH, MAX_GUESSES } from '@/types/wurdle';
import { getLetterStates } from '@/lib/games/wurdle';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  isInvalidWord: boolean;
  justSubmitted: number | null;
  gameStatus: 'playing' | 'won' | 'lost';
}

interface TileProps {
  tile: TileData;
  position: number;
  rowIndex: number;
  isCurrentRow: boolean;
  shouldFlip: boolean;
  shouldBounce: boolean;
  hasLetter: boolean;
}

function Tile({
  tile,
  position,
  isCurrentRow,
  shouldFlip,
  shouldBounce,
  hasLetter,
}: TileProps) {
  const stateClass = useMemo(() => {
    switch (tile.state) {
      case 'correct':
        return 'tile-correct';
      case 'present':
        return 'tile-present';
      case 'absent':
        return 'tile-absent';
      default:
        return '';
    }
  }, [tile.state]);

  const animationDelay = `${position * 300}ms`;
  const bounceDelay = `${position * 100}ms`;

  return (
    <div
      className={`
        relative w-[52px] h-[52px] sm:w-[62px] sm:h-[62px]
        flex items-center justify-center
        text-2xl sm:text-3xl font-bold uppercase
        border-2 select-none
        transition-colors duration-100
        ${
          tile.state === 'empty' || tile.state === 'tbd'
            ? 'bg-[var(--tile-bg)] border-[var(--tile-border)]'
            : ''
        }
        ${tile.state === 'tbd' && hasLetter ? 'border-[var(--foreground)]/50' : ''}
        ${stateClass}
        ${shouldFlip ? 'tile-flip' : ''}
        ${shouldBounce ? 'tile-bounce' : ''}
        ${isCurrentRow && hasLetter && tile.state === 'tbd' ? 'tile-pop' : ''}
      `}
      style={{
        animationDelay: shouldFlip ? animationDelay : shouldBounce ? bounceDelay : '0ms',
        color: tile.state === 'empty' || tile.state === 'tbd' ? 'var(--tile-text)' : undefined,
      }}
    >
      <span
        className={shouldFlip ? 'opacity-0' : ''}
        style={{
          animationDelay: shouldFlip ? animationDelay : '0ms',
        }}
      >
        {tile.letter}
      </span>
      {shouldFlip && (
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: `fadeIn 0.1s ease-out ${parseInt(animationDelay) + 250}ms forwards`,
            opacity: 0,
          }}
        >
          {tile.letter}
        </span>
      )}
    </div>
  );
}

export function GameBoard({
  guesses,
  currentGuess,
  solution,
  isInvalidWord,
  justSubmitted,
  gameStatus,
}: GameBoardProps) {
  const rows = useMemo(() => {
    const result: TileData[][] = [];

    for (let i = 0; i < MAX_GUESSES; i++) {
      const row: TileData[] = [];

      if (i < guesses.length) {
        // Completed guess row
        const guess = guesses[i];
        const states = getLetterStates(guess, solution);
        for (let j = 0; j < WORD_LENGTH; j++) {
          row.push({
            letter: guess[j] || '',
            state: states[j],
          });
        }
      } else if (i === guesses.length) {
        // Current guess row
        for (let j = 0; j < WORD_LENGTH; j++) {
          row.push({
            letter: currentGuess[j] || '',
            state: currentGuess[j] ? 'tbd' : 'empty',
          });
        }
      } else {
        // Empty row
        for (let j = 0; j < WORD_LENGTH; j++) {
          row.push({
            letter: '',
            state: 'empty',
          });
        }
      }

      result.push(row);
    }

    return result;
  }, [guesses, currentGuess, solution]);

  const currentRowIndex = guesses.length;

  return (
    <div className="flex flex-col items-center gap-[5px] sm:gap-[6px]">
      {rows.map((row, rowIndex) => {
        const isCurrentRow = rowIndex === currentRowIndex && gameStatus === 'playing';
        const shouldShake = isCurrentRow && isInvalidWord;
        const shouldFlip = rowIndex === justSubmitted;
        const isWinningRow = gameStatus === 'won' && rowIndex === guesses.length - 1;

        return (
          <div
            key={rowIndex}
            className={`flex gap-[5px] sm:gap-[6px] ${shouldShake ? 'tile-shake' : ''}`}
          >
            {row.map((tile, tileIndex) => (
              <Tile
                key={tileIndex}
                tile={tile}
                position={tileIndex}
                rowIndex={rowIndex}
                isCurrentRow={isCurrentRow}
                shouldFlip={shouldFlip}
                shouldBounce={isWinningRow && !shouldFlip}
                hasLetter={!!tile.letter}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
