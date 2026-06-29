'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Bell,
  Settings,
  Users,
  TrendingUp,
  Search
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/bills', icon: Receipt, label: 'Bills' },
  { href: '/billers', icon: Users, label: 'Billers' },
  { href: '/payments', icon: CreditCard, label: 'Payments' },
  { href: '/reminders', icon: Bell, label: 'Reminders' },
  { href: '/reports', icon: TrendingUp, label: 'Reports' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function MobileNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to prevent hydration issues
  if (!mounted) {
    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 z-40 safe-bottom">
        <div className="overflow-x-auto">
          <div className="flex min-w-full px-2 py-1 gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="flex-shrink-0 flex flex-col items-center justify-center px-3 py-1.5 rounded-xl min-w-[56px] text-slate-500"
              >
                <item.icon size={20} className="shrink-0" />
                <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Bottom Navigation - Fixed at bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 z-40 safe-bottom">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex min-w-full px-2 py-1 gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-shrink-0 flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all min-w-[56px] touch-target ${
                    isActive
                      ? 'text-sky-400 bg-sky-500/10'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Safe area spacer for iOS */}
      <div className="lg:hidden h-[72px] safe-bottom-spacer" />
    </>
  );
}