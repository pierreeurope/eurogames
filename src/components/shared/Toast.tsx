'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
  type?: 'default' | 'success' | 'error';
}

export function Toast({
  message,
  isVisible,
  onHide,
  duration = 2000,
  type = 'default',
}: ToastProps) {
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

  const bgColor =
    type === 'success'
      ? 'bg-[var(--success)]'
      : type === 'error'
        ? 'bg-[var(--error)]'
        : 'bg-[var(--foreground)]';

  return (
    <div
      className={`
        fixed top-[10%] left-1/2 -translate-x-1/2
        px-4 py-2
        ${bgColor} text-white
        rounded-lg font-semibold text-sm
        z-50 shadow-lg
        transition-all duration-200
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
    >
      {message}
    </div>
  );
}
