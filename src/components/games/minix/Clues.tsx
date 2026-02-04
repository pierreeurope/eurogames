'use client';

import { PuzzleData, ClueData } from '@/types/minix';
import { isWordComplete } from '@/lib/games/minix';

interface CluesProps {
  puzzle: PuzzleData;
  userGrid: (string | null)[][];
  selectedClue: { direction: 'across' | 'down'; number: number } | null;
  onClueClick: (direction: 'across' | 'down', number: number) => void;
  isCompleted: boolean;
}

interface ClueItemProps {
  clue: ClueData;
  isSelected: boolean;
  isWordDone: boolean;
  onClick: () => void;
}

function ClueItem({ clue, isSelected, isWordDone, onClick }: ClueItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        clue-item
        w-full text-left text-sm
        transition-all duration-150
        ${isSelected ? 'clue-item-selected' : ''}
        ${isWordDone ? 'clue-item-completed' : ''}
      `}
    >
      <span className="font-bold mr-2 text-[var(--foreground)]/70">{clue.number}.</span>
      <span>{clue.clue}</span>
    </button>
  );
}

interface ClueSectionProps {
  title: string;
  clues: ClueData[];
  direction: 'across' | 'down';
  selectedClue: { direction: 'across' | 'down'; number: number } | null;
  puzzle: PuzzleData;
  userGrid: (string | null)[][];
  onClueClick: (direction: 'across' | 'down', number: number) => void;
}

function ClueSection({
  title,
  clues,
  direction,
  selectedClue,
  puzzle,
  userGrid,
  onClueClick,
}: ClueSectionProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)]/50 mb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {clues.map((clue) => {
          const isSelected =
            selectedClue?.direction === direction &&
            selectedClue?.number === clue.number;
          const isWordDone = isWordComplete(puzzle, userGrid, clue.row, clue.col, direction);

          return (
            <ClueItem
              key={clue.number}
              clue={clue}
              isSelected={isSelected}
              isWordDone={isWordDone}
              onClick={() => onClueClick(direction, clue.number)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Clues({
  puzzle,
  userGrid,
  selectedClue,
  onClueClick,
}: CluesProps) {
  return (
    <div className="flex gap-6 sm:gap-8">
      <ClueSection
        title="Across"
        clues={puzzle.clues.across}
        direction="across"
        selectedClue={selectedClue}
        puzzle={puzzle}
        userGrid={userGrid}
        onClueClick={onClueClick}
      />
      <ClueSection
        title="Down"
        clues={puzzle.clues.down}
        direction="down"
        selectedClue={selectedClue}
        puzzle={puzzle}
        userGrid={userGrid}
        onClueClick={onClueClick}
      />
    </div>
  );
}
