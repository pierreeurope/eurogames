'use client';

import { useEffect, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = 'max-w-[400px]',
}: ModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`
          relative w-full ${maxWidth}
          bg-[var(--modal-bg)] rounded-2xl shadow-2xl
          p-6 sm:p-8
          modal-content
          border border-[var(--tile-border)]
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            w-8 h-8 flex items-center justify-center rounded-full
            text-[var(--foreground)] opacity-50 hover:opacity-100
            hover:bg-[var(--tile-border)]/30
            transition-all active:scale-95
          "
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
