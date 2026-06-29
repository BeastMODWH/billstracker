'use client';

import React from 'react';
import { Edit2, Trash2, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

type HybridCardProps = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  category?: string;
  frequency?: string;
  accountNumber?: string;
  contactInfo?: string;
  amount: number;
  balance?: number;
  lastAmount?: number;
  lastDate?: string;
  nextDue?: string;
  status: 'overdue' | 'paid' | 'upcoming' | 'active';
  notes?: string;
  prediction?: string;
  href?: string;
  
  // Actions
  onMarkPaid?: () => void;
  onRecreateReminder?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  hideActions?: boolean;
};

export function HybridCard({
  id,
  name,
  icon,
  category,
  frequency,
  accountNumber,
  contactInfo,
  amount,
  balance,
  lastAmount,
  lastDate,
  nextDue,
  status,
  notes,
  prediction,
  href,
  onMarkPaid,
  onRecreateReminder,
  onEdit,
  onDelete,
  onClick,
  hideActions = false,
}: HybridCardProps) {
  const router = useRouter();

  // Get status configuration
  const getStatusConfig = () => {
    switch (status) {
      case 'overdue':
        return {
          label: `🔴 ${Math.abs(amount)}d overdue`,
          badgeClass: 'bg-red-500/15 text-red-400 border-red-500/20',
          borderClass: 'border-l-red-500',
          amountClass: 'text-red-400',
        };
      case 'paid':
        return {
          label: '✅ Paid',
          badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
          borderClass: 'border-l-emerald-500',
          amountClass: 'text-emerald-400',
        };
      case 'upcoming':
        return {
          label: `${Math.abs(amount)}d`,
          badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
          borderClass: 'border-l-sky-500',
          amountClass: 'text-sky-400',
        };
      default:
        return {
          label: '● Active',
          badgeClass: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
          borderClass: 'border-l-slate-500',
          amountClass: 'text-slate-200',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(value);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  const displayIcon = icon || (() => {
    if (category === 'Energy') return '⚡';
    if (category === 'Council Tax') return '🏛️';
    if (category === 'School') return '🏫';
    if (category === 'Water') return '💧';
    if (category === 'Internet') return '🌐';
    if (category === 'Insurance') return '🛡️';
    if (category === 'Mobile') return '📱';
    return '📄';
  })();

  return (
    <div 
      className={`card-hover p-4 border-l-4 ${statusConfig.borderClass}`}
      onClick={handleClick}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-slate-700/30 flex items-center justify-center shrink-0 text-lg">
            {typeof displayIcon === 'string' ? displayIcon : displayIcon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate max-w-[120px] xs:max-w-[200px]">
              {name}
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {category && (
                <span className="text-[10px] text-slate-400">{category}</span>
              )}
              {frequency && frequency !== 'one_off' && (
                <span className="text-[10px] text-slate-500">· {frequency}</span>
              )}
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full border ${statusConfig.badgeClass}`}>
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!hideActions && (
          <div className="flex gap-0.5 shrink-0">
            {status !== 'paid' && onMarkPaid && (
              <button
                onClick={(e) => { e.stopPropagation(); onMarkPaid(); }}
                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all"
                title="Mark as paid"
              >
                <CheckCircle size={14} />
              </button>
            )}
            {onRecreateReminder && (
              <button
                onClick={(e) => { e.stopPropagation(); onRecreateReminder(); }}
                className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-all"
                title="Recreate reminder"
              >
                <RefreshCw size={14} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="p-1.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/60 text-slate-400 transition-all"
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1.5 rounded-lg bg-slate-700/30 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-2.5">
        <div className="bg-slate-700/20 rounded-lg p-1.5 sm:p-2 text-center">
          <p className="text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-wider">Balance</p>
          <p className={`text-[11px] sm:text-sm font-bold ${statusConfig.amountClass}`}>
            {formatCurrency(balance || amount)}
          </p>
        </div>
        <div className="bg-slate-700/20 rounded-lg p-1.5 sm:p-2 text-center">
          <p className="text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-wider">Last</p>
          <p className="text-[11px] sm:text-sm font-semibold text-slate-300">
            {lastAmount ? formatCurrency(lastAmount) : '—'}
          </p>
        </div>
        <div className="bg-slate-700/20 rounded-lg p-1.5 sm:p-2 text-center">
          <p className="text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-wider">Last Date</p>
          <p className="text-[9px] sm:text-xs text-slate-300 truncate">
            {lastDate || '—'}
          </p>
        </div>
        <div className="bg-slate-700/20 rounded-lg p-1.5 sm:p-2 text-center">
          <p className="text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-wider">Next Due</p>
          <p className={`text-[9px] sm:text-xs font-medium ${status === 'paid' ? 'text-emerald-400' : 'text-slate-300'}`}>
            {nextDue || '—'}
          </p>
        </div>
      </div>

      {/* Notes / Extra Info */}
      {(notes || prediction) && (
        <div className="mt-2 px-2 py-1 bg-slate-700/10 rounded-lg">
          <p className="text-[8px] sm:text-[9px] text-slate-400 truncate">
            {prediction && `📊 ${prediction}`}
            {prediction && notes && ' · '}
            {notes && `📝 ${notes}`}
          </p>
        </div>
      )}

      {/* Account / Contact */}
      {(accountNumber || contactInfo) && (
        <div className="mt-1.5 flex items-center gap-2 text-[8px] sm:text-[9px] text-slate-500">
          {accountNumber && <span>Acc: {accountNumber}</span>}
          {accountNumber && contactInfo && <span className="text-slate-700">·</span>}
          {contactInfo && <span>{contactInfo}</span>}
        </div>
      )}
    </div>
  );
}