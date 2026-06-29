'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

// VERSION: 2.0 - FIXED SCROLL
export function Modal({ open, onClose, title, children, size = 'md' }: Props) {
  console.log('[Modal v2.0] rendered, open:', open, 'title:', title);
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const sizeClass = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizeClass} bg-slate-900 border border-slate-700/60 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 shrink-0">
          <h2 className="text-base font-semibold text-slate-100">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4 pb-8" style={{WebkitOverflowScrolling: "touch", overflowY: "auto", maxHeight: "calc(85vh - 65px)"}}>{children}</div>
      </div>
    </div>
  );
}
