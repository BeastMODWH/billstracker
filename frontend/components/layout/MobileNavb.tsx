'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, CreditCard, Bell, Search, Download, Lock } from 'lucide-react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { useLockApp } from '@/components/ui/PinLock';

const nav = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/bills', label: 'Bills', icon: FileText },
  { href: '/payments', label: 'Pay', icon: CreditCard },
  { href: '/reminders', label: 'Alerts', icon: Bell },
  { href: '/search', label: 'Search', icon: Search },
];

export function MobileNav() {
  const path = usePathname();
  const lockApp = useLockApp();
  const { theme, toggle } = useTheme();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-700/50 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== '/' && path.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                active ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
              }`}>
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
        <button onClick={toggle} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-slate-500 hover:text-slate-300">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-[10px] font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
        <button onClick={lockApp} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-slate-500 hover:text-slate-300">
          <Lock size={20} />
          <span className="text-[10px] font-medium">Lock</span>
        </button>
      </div>
    </nav>
  );
}
