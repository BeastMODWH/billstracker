import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isToday, isTomorrow, isPast, addDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | undefined | null): string {
  if (amount == null) return '£0.00'
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)
}

export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return '—'
  try {
    return format(new Date(dateStr), 'd MMM yyyy')
  } catch { return '—' }
}

export function formatDateShort(dateStr: string | undefined | null): string {
  if (!dateStr) return '—'
  try {
    return format(new Date(dateStr), 'd MMM')
  } catch { return '—' }
}

export function relativeDueDate(dateStr: string | undefined | null): { label: string; urgency: 'overdue' | 'today' | 'soon' | 'upcoming' | 'none' } {
  if (!dateStr) return { label: 'No date', urgency: 'none' }
  const date = new Date(dateStr)
  if (isPast(date) && !isToday(date)) return { label: `Overdue · ${format(date, 'd MMM')}`, urgency: 'overdue' }
  if (isToday(date)) return { label: 'Due today', urgency: 'today' }
  if (isTomorrow(date)) return { label: 'Due tomorrow', urgency: 'soon' }
  const inWeek = addDays(new Date(), 7)
  if (date <= inWeek) return { label: `Due ${formatDateShort(dateStr)}`, urgency: 'soon' }
  return { label: `Due ${formatDate(dateStr)}`, urgency: 'upcoming' }
}

export function urgencyColor(urgency: string): string {
  switch (urgency) {
    case 'overdue': return 'text-red-600 bg-red-50'
    case 'today':   return 'text-orange-600 bg-orange-50'
    case 'soon':    return 'text-amber-600 bg-amber-50'
    default:        return 'text-ink-muted bg-surface-100'
  }
}

export function getDaysUntil(dateStr: string | undefined | null): number | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - new Date().getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
