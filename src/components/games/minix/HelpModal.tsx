'use client';

import { Modal } from '@/components/shared';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play" maxWidth="max-w-[450px]">
      <div className="space-y-4 text-sm sm:text-base">
        <p>
          Fill in the 5×5 crossword grid using the clues provided.
        </p>

        <div className="space-y-3">
          <h3 className="font-bold">Controls</h3>
          
          <div className="space-y-2 text-[var(--foreground)]/80">
            <div className="flex items-start gap-3">
              <span className="bg-[var(--tile-bg)] px-2 py-1 rounded text-xs font-mono">Click</span>
              <span>Select a cell. Click again to switch direction.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-[var(--tile-bg)] px-2 py-1 rounded text-xs font-mono">A-Z</span>
              <span>Type a letter in the selected cell.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-[var(--tile-bg)] px-2 py-1 rounded text-xs font-mono">⌫</span>
              <span>Delete letter and move back.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-[var(--tile-bg)] px-2 py-1 rounded text-xs font-mono">Space</span>
              <span>Toggle between across and down.</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="bg-[var(--tile-bg)] px-2 py-1 rounded text-xs font-mono">↑↓←→</span>
              <span>Navigate between cells.</span>
            </div>
          </div>
        </div>

        <hr className="border-[var(--tile-border)]" />

        <div className="space-y-2">
          <h3 className="font-bold">Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-[var(--foreground)]/80">
            <li>Click on any clue to jump to that word</li>
            <li>Completed words will be crossed off</li>
            <li>Your progress is saved automatically</li>
            <li>A new puzzle is available each day</li>
          </ul>
        </div>

        <div className="text-center pt-2 text-[var(--foreground)]/50 text-sm">
          Good luck! 📝
        </div>
      </div>
    </Modal>
  );
}
