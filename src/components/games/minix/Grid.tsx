'use client';

import { useMemo } from 'react';
import { PuzzleData, GRID_SIZE } from '@/types/minix';
import { isBlackCell, getCellNumber, isCellCorrect } from '@/lib/games/minix';

interface GridProps {
  puzzle: PuzzleData;
  userGrid: (string | null)[][];
  selectedCell: { row: number; col: number } | null;
  highlightedCells: { row: number; col: number }[];
  onCellClick: (row: number, col: number) => void;
  isCompleted: boolean;
  isWinAnimation: boolean;
}

interface CellProps {
  puzzle: PuzzleData;
  userGrid: (string | null)[][];
  row: number;
  col: number;
  isSelected: boolean;
  isHighlighted: boolean;
  isCompleted: boolean;
  onClick: () => void;
  animationDelay: number;
  isWinAnimation: boolean;
}

function Cell({
  puzzle,
  userGrid,
  row,
  col,
  isSelected,
  isHighlighted,
  isCompleted,
  onClick,
  animationDelay,
  isWinAnimation,
}: CellProps) {
  const isBlack = isBlackCell(puzzle, row, col);
  const cellNumber = getCellNumber(puzzle, row, col);
  const letter = userGrid[row]?.[col] || '';
  const isCorrect = isCompleted && isCellCorrect(puzzle, userGrid, row, col);

  if (isBlack) {
    return (
      <div className="crossword-cell crossword-cell-black w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] border border-[var(--tile-border)]" />
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        crossword-cell
        relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px]
        bg-[var(--tile-bg)] border-2 border-[var(--tile-border)]
        flex items-center justify-center
        text-xl sm:text-2xl font-bold uppercase
        transition-all duration-150
        focus:outline-none
        ${isSelected ? 'crossword-cell-selected !border-[var(--info)] ring-2 ring-[var(--info)]/30' : ''}
        ${isHighlighted && !isSelected ? 'crossword-cell-highlighted' : ''}
        ${isCorrect && isCompleted ? 'crossword-cell-correct' : ''}
        ${isWinAnimation ? 'win-celebration' : ''}
      `}
      style={{
        animationDelay: isWinAnimation ? `${animationDelay}ms` : '0ms',
      }}
      tabIndex={-1}
    >
      {cellNumber && (
        <span className="crossword-number">{cellNumber}</span>
      )}
      <span className="text-[var(--tile-text)]">{letter}</span>
    </button>
  );
}

export function Grid({
  puzzle,
  userGrid,
  selectedCell,
  highlightedCells,
  onCellClick,
  isCompleted,
  isWinAnimation,
}: GridProps) {
  const highlightedSet = useMemo(() => {
    return new Set(highlightedCells.map((c) => `${c.row}-${c.col}`));
  }, [highlightedCells]);

  return (
    <div 
      className={`
        grid gap-[2px] sm:gap-[3px]
        bg-[var(--tile-border)] p-[2px] sm:p-[3px]
        rounded-lg shadow-lg
        ${isWinAnimation ? 'scale-in' : ''}
      `}
    >
      {Array.from({ length: GRID_SIZE }).map((_, row) => (
        <div key={row} className="flex gap-[2px] sm:gap-[3px]">
          {Array.from({ length: GRID_SIZE }).map((_, col) => {
            const isSelected =
              selectedCell?.row === row && selectedCell?.col === col;
            const isHighlighted = highlightedSet.has(`${row}-${col}`);

            return (
              <Cell
                key={col}
                puzzle={puzzle}
                userGrid={userGrid}
                row={row}
                col={col}
                isSelected={isSelected}
                isHighlighted={isHighlighted}
                isCompleted={isCompleted}
                onClick={() => onCellClick(row, col)}
                animationDelay={(row * GRID_SIZE + col) * 50}
                isWinAnimation={isWinAnimation}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
