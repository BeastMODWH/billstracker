'use client';
import { ReactNode } from 'react';
import { Plus, FileText, CreditCard, Users, Bell, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: 'file' | 'credit-card' | 'users' | 'bell' | 'trending' | 'plus';
  actionLabel?: string;
  actionLink?: string;
  actionOnClick?: () => void;
  children?: ReactNode;
};

const icons = {
  file: FileText,
  'credit-card': CreditCard,
  users: Users,
  bell: Bell,
  trending: TrendingUp,
  plus: Plus,
};

export function EmptyState({
  title,
  description,
  icon = 'file',
  actionLabel,
  actionLink,
  actionOnClick,
  children,
}: EmptyStateProps) {
  const Icon = icons[icon] || FileText;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12">
      {/* Icon with gradient background */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-600/10 border border-sky-500/20 flex items-center justify-center mb-4">
        <Icon size={32} className="sm:w-10 sm:h-10 text-sky-400" />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-400 max-w-md mb-6">
        {description}
      </p>

      {/* Action Button */}
      {(actionLabel && (actionLink || actionOnClick)) && (
        <>
          {actionLink ? (
            <Link
              href={actionLink}
              className="bg-sky-500 hover:bg-sky-400 text-white font-medium px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm sm:text-base shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30"
            >
              <Plus size={18} /> {actionLabel}
            </Link>
          ) : actionOnClick ? (
            <button
              onClick={actionOnClick}
              className="bg-sky-500 hover:bg-sky-400 text-white font-medium px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm sm:text-base shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30"
            >
              <Plus size={18} /> {actionLabel}
            </button>
          ) : null}
        </>
      )}

      {/* Optional children (extra content) */}
      {children}
    </div>
  );
}

// Specific empty states for different pages
export function EmptyBills() {
  return (
    <EmptyState
      icon="file"
      title="No bill records yet"
      description="Add your first bill to start tracking your expenses and never miss a payment."
      actionLabel="Add Your First Bill"
      actionLink="/bills?add=true"
    />
  );
}

export function EmptyPayments() {
  return (
    <EmptyState
      icon="credit-card"
      title="No payments recorded"
      description="Record your first payment to start tracking your spending history."
      actionLabel="Record a Payment"
      actionLink="/payments?add=true"
    />
  );
}

export function EmptyBillers() {
  return (
    <EmptyState
      icon="users"
      title="No billers added yet"
      description="Add your first biller — United Utilities, Council Tax, or any provider you pay."
      actionLabel="Add Your First Biller"
      actionLink="/billers?add=true"
    />
  );
}

export function EmptyReminders() {
  return (
    <EmptyState
      icon="bell"
      title="No reminders set"
      description="Set reminders for your bills so you never miss a payment deadline again."
      actionLabel="Set a Reminder"
      actionLink="/reminders?add=true"
    />
  );
}

export function EmptyReports() {
  return (
    <EmptyState
      icon="trending"
      title="No data to report yet"
      description="Start adding bills and payments to see insights and spending reports."
      actionLabel="Get Started"
      actionLink="/bills"
    />
  );
}