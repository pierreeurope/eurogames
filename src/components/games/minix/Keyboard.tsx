'use client';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

interface KeyProps {
  keyValue: string;
  onClick: () => void;
  disabled?: boolean;
}

function Key({ keyValue, onClick, disabled }: KeyProps) {
  const isBackspace = keyValue === 'BACKSPACE';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        ${isBackspace ? 'w-[48px] sm:w-[56px]' : 'w-[30px] sm:w-[36px]'}
        h-[44px] sm:h-[48px]
        rounded-md
        text-sm sm:text-base font-semibold
        bg-[var(--key-bg)] text-[var(--key-text)]
        select-none cursor-pointer
        transition-all duration-100
        active:scale-95 active:bg-[var(--key-bg)]/80
        disabled:opacity-50 disabled:cursor-not-allowed
        btn-press
      `}
    >
      {isBackspace ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zm4.28-1.42a.75.75 0 011.06 0L11 12.44l3.146-3.186a.75.75 0 111.068 1.052l-3.146 3.186 3.146 3.186a.75.75 0 11-1.068 1.052L11 14.544l-3.146 3.186a.75.75 0 01-1.068-1.052l3.146-3.186-3.146-3.186a.75.75 0 01.008-1.052z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        keyValue
      )}
    </button>
  );
}

export function Keyboard({ onKeyPress, disabled }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-[5px] sm:gap-[6px] w-full max-w-[400px]">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`
            flex gap-[4px] sm:gap-[5px]
            ${rowIndex === 1 ? 'px-3' : ''}
          `}
        >
          {row.map((key) => (
            <Key
              key={key}
              keyValue={key}
              onClick={() => onKeyPress(key)}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
