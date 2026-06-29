'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, FileText, CreditCard,
  RefreshCcw, Bell, BarChart3, Lock, Settings, Sun, Moon, Search, Download
} from 'lucide-react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useLockApp } from '@/components/ui/PinLock';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/billers', label: 'Billers', icon: Building2 },
  { href: '/bills', label: 'Bill Records', icon: FileText },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/direct-debits', label: 'Direct Debits', icon: RefreshCcw },
  { href: '/reminders', label: 'Reminders', icon: Bell },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/export', label: 'Export', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const path = usePathname();
  const lockApp = useLockApp();
  const { theme, toggle } = useTheme();
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-slate-900/80 border-r border-slate-700/50 backdrop-blur-xl z-40">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-100 text-sm tracking-tight">BillsTracker</p>
            <p className="text-[10px] text-slate-500 tracking-wide uppercase">Home Edition</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== '/' && path.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700/50 space-y-3">
        <button onClick={toggle} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all text-sm">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={lockApp} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all text-sm">
          <Lock size={16} /> Lock App
        </button>
        <p className="text-[11px] text-slate-600 text-center">Syncing on local network</p>
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[11px] text-emerald-400">Live</p>
        </div>
      </div>
    </aside>
  );
}
