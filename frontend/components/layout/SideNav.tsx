'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, FileText, CreditCard, RefreshCw, Bell, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/',               icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/billers',        icon: Building2,       label: 'Billers' },
  { href: '/bills',          icon: FileText,        label: 'Bill Records' },
  { href: '/payments',       icon: CreditCard,      label: 'Payments' },
  { href: '/direct-debits',  icon: RefreshCw,       label: 'Direct Debits' },
  { href: '/reminders',      icon: Bell,            label: 'Reminders' },
  { href: '/reports',        icon: BarChart3,       label: 'Reports' },
  { href: '/settings',       icon: Settings,        label: 'Settings' },
]

export function SideNav() {
  const path = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-surface-200 h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-surface-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <div>
            <div className="text-sm font-bold text-ink leading-tight">Bills Tracker</div>
            <div className="text-[10px] text-ink-faint">Local · All devices</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === '/' ? path === '/' : path.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(active ? 'nav-item-active' : 'nav-item-inactive')}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-surface-200">
        <div className="text-[11px] text-ink-faint text-center">
          All data stored locally
        </div>
      </div>
    </aside>
  )
}
