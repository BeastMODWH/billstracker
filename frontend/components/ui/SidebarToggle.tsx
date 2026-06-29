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
  Lock,
  TrendingUp,
  Search,
  RefreshCcw,
  Wallet,
  Menu,
  ChevronRight,
  Sun, Moon,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
// Remove this import - it's causing the error
// import { useLockApp } from '@/components/ui/PinLock';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/billers', icon: Users, label: 'Billers' },
  { href: '/bills', icon: Receipt, label: 'Bill Records' },
  { href: '/payments', icon: CreditCard, label: 'Payments' },
  { href: '/direct-debits', icon: RefreshCcw, label: 'Direct Debits' },
  { href: '/reminders', icon: Bell, label: 'Reminders' },
  { href: '/reports', icon: TrendingUp, label: 'Reports' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggle } = useTheme();
  // Remove this line - it's causing the error
  // const lockApp = useLockApp();
  
  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile && mounted) {
      setIsOpen(false);
    }
  }, [pathname, isMobile, mounted]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <aside className="hidden lg:block fixed top-0 left-0 h-full w-[280px] bg-slate-900/98 backdrop-blur-xl border-r border-slate-700/50 z-40">
        <div className="flex flex-col h-full">
          {/* Logo placeholder */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">BillsTracker</h1>
              <p className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">Home Edition</p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.href} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400">
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* ✅ NEW: Pill Toggle Button */}
     <button
  onClick={toggleSidebar}
  className="lg:hidden fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-sky-500/10 active:scale-95 touch-target"
  style={{
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)'
  }}
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
>
  {/* Icon */}
  <div className="relative w-4 h-4 flex items-center justify-center">
    {isOpen ? (
      <X size={16} className="transition-transform duration-300 rotate-90" style={{ color: 'var(--color-text)' }} />
    ) : (
      <Menu size={16} className="transition-transform duration-300" style={{ color: 'var(--color-text)' }} />
    )}
  </div>
  
  {/* Text - Hidden on very small screens */}
  <span className="hidden sm:inline text-sm font-medium" style={{ color: 'var(--color-text)' }}>
    {isOpen ? 'Close' : 'Menu'}
  </span>
</button>
        {/* Icon */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isOpen ? (
            <X size={16} className="text-slate-200 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu size={16} className="text-slate-200 transition-transform duration-300" />
          )}
        </div>
        
        {/* Text - Hidden on very small screens */}
        <span className="hidden sm:inline text-sm font-medium text-slate-200">
          {isOpen ? 'Close' : 'Menu'}
        </span>
      </button>

      {/* Mobile Overlay */}
   {/* Mobile Overlay */}
{isMobile && isOpen && (
  <div
    className={`fixed inset-0 backdrop-blur-sm z-40 animate-in fade-in duration-200 ${
      theme === 'dark' ? 'bg-black/60' : 'bg-black/30'
    }`}
    onClick={() => setIsOpen(false)}
    aria-hidden="true"
  />
)}

      {/* Sidebar */}
      <aside
  className={`
    fixed top-0 left-0 h-full w-[280px] backdrop-blur-xl border-r z-40
    transition-transform duration-300 ease-in-out
    ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
    flex flex-col overflow-hidden
  `}
  style={{ 
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-border)'
  }}
>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--color-border)' }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Wallet size={20} className="text-white" />
          </div>
          <div>
          <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>BillsTracker</h1>
<p className="text-[11px] font-medium tracking-wider uppercase" style={{ color: 'var(--color-text-muted)' }}>Home Edition</p>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-4 xl:px-5 py-2.5 xl:py-3.5 rounded-xl transition-all duration-200 text-sm xl:text-base font-medium
                  ${isActive
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-lg shadow-sky-500/5'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
                  }
                `}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <Icon size={18} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 animate-pulse" />
                )}
                {!isActive && (
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50 space-y-3">
          <button onClick={toggle} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all text-sm">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          {/* Temporarily remove the Lock button until we fix the import */}
          {/* <button onClick={lockApp} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all text-sm">
            <Lock size={16} /> Lock App
          </button> */}
          <p className="text-[11px] text-slate-600 text-center">Syncing on local network</p>
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[11px] text-emerald-400">Live</p>
          </div>
        </div>
      </aside>
    </>
  );
}