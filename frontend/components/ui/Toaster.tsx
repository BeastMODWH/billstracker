'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

type Toast = { id: string; message: string; type: 'success' | 'error' };
const listeners: ((t: Toast) => void)[] = [];

export function toast(message: string, type: 'success' | 'error' = 'success') {
  const t: Toast = { id: Math.random().toString(36), message, type };
  listeners.forEach(fn => fn(t));
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const fn = (t: Toast) => {
      setToasts(p => [...p, t]);
      setTimeout(() => setToasts(p => p.filter(x => x.id !== t.id)), 3500);
    };
    listeners.push(fn);
    return () => { const i = listeners.indexOf(fn); if (i > -1) listeners.splice(i, 1); };
  }, []);
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium pointer-events-auto ${
          t.type === 'success'
            ? 'bg-emerald-900/90 border-emerald-700/50 text-emerald-100'
            : 'bg-red-900/90 border-red-700/50 text-red-100'
        }`}>
          {t.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {t.message}
          <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} className="ml-1 opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
