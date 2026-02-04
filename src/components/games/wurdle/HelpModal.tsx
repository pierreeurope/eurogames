'use client';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ExampleTile({
  letter,
  state,
}: {
  letter: string;
  state: 'correct' | 'present' | 'absent' | 'empty';
}) {
  const stateClass =
    state === 'correct'
      ? 'tile-correct'
      : state === 'present'
        ? 'tile-present'
        : state === 'absent'
          ? 'tile-absent'
          : 'bg-[var(--tile-bg)] border-[var(--tile-border)]';

  return (
    <div
      className={`
        w-10 h-10 sm:w-12 sm:h-12
        flex items-center justify-center
        text-lg sm:text-xl font-bold uppercase
        border-2
        ${stateClass}
      `}
    >
      {letter}
    </div>
  );
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          relative w-full max-w-[480px]
          bg-[var(--modal-bg)] rounded-lg shadow-xl
          p-6 sm:p-8
          fade-in
          my-8
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            w-8 h-8 flex items-center justify-center
            text-[var(--foreground)] opacity-60 hover:opacity-100
            transition-opacity
          "
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">How to Play</h2>

        {/* Instructions */}
        <div className="space-y-4 text-sm sm:text-base">
          <p>
            Guess the <strong>Wurdle</strong> in 6 tries.
          </p>
          
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The color of the tiles will change to show how close your guess was to the word.</li>
          </ul>

          <hr className="border-[var(--tile-border)]" />

          {/* Examples */}
          <div>
            <p className="font-bold mb-3">Examples</p>

            {/* Correct example */}
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <ExampleTile letter="W" state="correct" />
                <ExampleTile letter="E" state="empty" />
                <ExampleTile letter="A" state="empty" />
                <ExampleTile letter="R" state="empty" />
                <ExampleTile letter="Y" state="empty" />
              </div>
              <p>
                <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>

            {/* Present example */}
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <ExampleTile letter="P" state="empty" />
                <ExampleTile letter="I" state="present" />
                <ExampleTile letter="L" state="empty" />
                <ExampleTile letter="O" state="empty" />
                <ExampleTile letter="T" state="empty" />
              </div>
              <p>
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>

            {/* Absent example */}
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <ExampleTile letter="V" state="empty" />
                <ExampleTile letter="A" state="empty" />
                <ExampleTile letter="G" state="empty" />
                <ExampleTile letter="U" state="absent" />
                <ExampleTile letter="E" state="empty" />
              </div>
              <p>
                <strong>U</strong> is not in the word in any spot.
              </p>
            </div>
          </div>

          <hr className="border-[var(--tile-border)]" />

          <p className="text-center text-[var(--foreground)]/70">
            A new Wurdle will be available each day!
          </p>
        </div>
      </div>
    </div>
  );
}
