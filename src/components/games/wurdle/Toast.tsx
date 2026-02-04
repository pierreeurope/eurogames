'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, isVisible, onHide, duration = 2000 }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 200);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onHide]);

  if (!isVisible && !show) return null;

  return (
    <div
      className={`
        fixed top-[10%] left-1/2 -translate-x-1/2
        px-4 py-2
        bg-[var(--foreground)] text-[var(--background)]
        rounded-md font-semibold text-sm
        z-50
        transition-opacity duration-200
        ${show ? 'opacity-100' : 'opacity-0'}
        toast
      `}
    >
      {message}
    </div>
  );
}
