'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, CreditCard, Bell, BarChart3, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/',         icon: LayoutDashboard, label: 'Home' },
  { href: '/billers',  icon: Building2,       label: 'Billers' },
  { href: '/payments', icon: CreditCard,      label: 'Payments' },
  { href: '/reminders',icon: Bell,            label: 'Reminders' },
  { href: '/reports',  icon: BarChart3,       label: 'Reports' },
]

export function BottomNav() {
  const path = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-surface-200 z-50 safe-area-pb">
      <div className="flex items-center">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === '/' ? path === '/' : path.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center py-2.5 gap-0.5 text-[10px] font-medium transition-colors',
                active ? 'text-brand-500' : 'text-ink-faint hover:text-ink-muted'
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
