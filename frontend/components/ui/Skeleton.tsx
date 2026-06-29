'use client';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-slate-700/50 rounded-lg ${className}`} />
  );
}

// Card skeleton for bills, payments, etc.
export function SkeletonCard() {
  return (
    <div className="card p-4 sm:p-5 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
    </div>
  );
}

// Stat card skeleton
export function SkeletonStatCard() {
  return (
    <div className="stat-card p-3 sm:p-4 md:p-5">
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-7 w-24 mt-1" />
      <Skeleton className="h-3 w-16 mt-1" />
    </div>
  );
}

// Bill card skeleton
export function SkeletonBillCard() {
  return (
    <div className="card-hover p-4 sm:p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
    </div>
  );
}

// Payment card skeleton
export function SkeletonPaymentCard() {
  return (
    <div className="card-hover p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-6 w-16" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Reminder card skeleton
export function SkeletonReminderCard() {
  return (
    <div className="card-hover p-3 sm:p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Bills page skeleton (full page)
export function SkeletonBillsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Search */}
      <Skeleton className="h-12 w-full rounded-xl" />

      {/* Filter tabs */}
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>

      {/* Results count */}
      <Skeleton className="h-4 w-32" />

      {/* Bill cards */}
      <div className="space-y-3">
        <SkeletonBillCard />
        <SkeletonBillCard />
        <SkeletonBillCard />
        <SkeletonBillCard />
        <SkeletonBillCard />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}

// Dashboard skeleton
export function SkeletonDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="card p-4 sm:p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-[200px] sm:h-[250px] w-full rounded-lg" />
        </div>
        <div className="card p-4 sm:p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-[200px] sm:h-[250px] w-full rounded-lg" />
        </div>
      </div>

      {/* Upcoming Bills & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="card p-4 sm:p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="card p-4 sm:p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <SkeletonReminderCard />
          <SkeletonReminderCard />
          <SkeletonReminderCard />
        </div>
      </div>
    </div>
  );
}