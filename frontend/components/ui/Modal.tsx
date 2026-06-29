'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideClose?: boolean;
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-0 sm:mx-4 rounded-t-3xl sm:rounded-2xl',
};

export function Modal({ open, onClose, title, children, size = 'md', hideClose = false }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`
          bg-slate-900 border border-slate-700/60 rounded-t-3xl sm:rounded-2xl 
          w-full ${sizeClasses[size]} 
          max-h-[92dvh] sm:max-h-[85vh] 
          overflow-hidden flex flex-col
          animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-8 duration-300
          ${size === 'full' ? 'mx-0 rounded-t-3xl sm:rounded-2xl' : ''}
        `}
      >
        {/* Header */}
        {(title || !hideClose) && (
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-4 border-b border-slate-700/40 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-1 h-6 rounded-full bg-sky-500 shrink-0" />
              <h2 id="modal-title" className="text-base sm:text-lg font-semibold text-slate-100 truncate">
                {title || 'Modal'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-xl hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors touch-target"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}