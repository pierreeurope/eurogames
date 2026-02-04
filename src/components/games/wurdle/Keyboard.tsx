'use client';

import { useMemo, useCallback } from 'react';
import { KEYBOARD_ROWS, LetterState } from '@/types/wurdle';
import { getKeyboardStates } from '@/lib/games/wurdle';

interface KeyboardProps {
  guesses: string[];
  solution: string;
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

interface KeyProps {
  keyValue: string;
  state: LetterState;
  onClick: () => void;
  disabled?: boolean;
}

function Key({ keyValue, state, onClick, disabled }: KeyProps) {
  const isWide = keyValue === 'ENTER' || keyValue === 'BACKSPACE';
  const displayValue = keyValue === 'BACKSPACE' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 sm:w-6 sm:h-6"
    >
      <path
        fillRule="evenodd"
        d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zm4.28-1.42a.75.75 0 011.06 0L11 12.44l3.146-3.186a.75.75 0 111.068 1.052l-3.146 3.186 3.146 3.186a.75.75 0 11-1.068 1.052L11 14.544l-3.146 3.186a.75.75 0 01-1.068-1.052l3.146-3.186-3.146-3.186a.75.75 0 01.008-1.052z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    keyValue
  );

  const stateClass = useMemo(() => {
    switch (state) {
      case 'correct':
        return 'key-correct';
      case 'present':
        return 'key-present';
      case 'absent':
        return 'key-absent';
      default:
        return 'bg-[var(--key-bg)]';
    }
  }, [state]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        ${isWide ? 'w-[52px] sm:w-[65px]' : 'w-[32px] sm:w-[43px]'}
        h-[52px] sm:h-[58px]
        rounded-[4px]
        text-xs sm:text-sm font-bold uppercase
        select-none cursor-pointer
        transition-all duration-100
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${stateClass}
      `}
      style={{
        color: state === 'empty' ? 'var(--key-text)' : undefined,
      }}
    >
      {displayValue}
    </button>
  );
}

export function Keyboard({ guesses, solution, onKeyPress, disabled }: KeyboardProps) {
  const keyStates = useMemo(() => {
    return getKeyboardStates(guesses, solution);
  }, [guesses, solution]);

  const handleClick = useCallback(
    (key: string) => {
      if (!disabled) {
        onKeyPress(key);
      }
    },
    [onKeyPress, disabled]
  );

  return (
    <div className="flex flex-col items-center gap-[6px] sm:gap-2 w-full max-w-[500px] px-1">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`
            flex gap-[5px] sm:gap-[6px]
            ${rowIndex === 1 ? 'px-3 sm:px-5' : ''}
          `}
        >
          {row.map((key) => (
            <Key
              key={key}
              keyValue={key}
              state={keyStates[key] || 'empty'}
              onClick={() => handleClick(key)}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
