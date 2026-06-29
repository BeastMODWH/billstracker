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
  X,
  ChevronLeft,
  PanelLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useLockApp } from '@/components/ui/PinLock';

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

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
};

// Custom panel icon
const PanelIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'} shrink-0`}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C3.81478 14.0642 3.99127 14.0774 4.1828 14.0873V1.91166Z" 
      fill="currentColor"
    />
  </svg>
);

export function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const lockApp = useLockApp();

  return (
    <>
      {/* Mobile Hamburger Button - FIXED */}
      {isMobile && !isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:shadow-lg active:scale-95 touch-target"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)'
          }}
          aria-label="Open menu"
        >
          <Menu size={16} style={{ color: 'var(--color-text)' }} />
          <span className="hidden sm:inline text-sm font-medium" style={{ color: 'var(--color-text)' }}>Menu</span>
        </button>
      )}

      {/* Mobile Overlay - FIXED */}
    {/* Mobile Overlay - FIXED */}
{isMobile && isOpen && (
  <div
    className={`fixed inset-0 backdrop-blur-sm z-[99] animate-in fade-in duration-200 ${
      theme === 'dark' ? 'bg-black/60' : 'bg-black/30'
    }`}
    onClick={onToggle}
    aria-hidden="true"
  />
)}

      {/* Sidebar - FIXED */}
<aside
  className={`
    fixed top-0 left-0 h-full backdrop-blur-xl border-r z-[100]
    transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    flex flex-col overflow-hidden
    shadow-2xl
  `}
  style={{
    width: isMobile ? '75%' : '300px',
    maxWidth: isMobile ? '280px' : '320px',
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-border)',
    boxShadow: theme === 'dark' ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.15)'
  }}
>
        {/* Logo with Close Button - FIXED */}
        <div className="flex items-center justify-between px-4 py-4 border-b shrink-0" style={{ borderColor: 'var(--color-border)' }}>
  <div className="flex items-center gap-3 min-w-0">
    <div 
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' 
          : 'linear-gradient(135deg, #d97706, #ea580c)',
        boxShadow: theme === 'dark' 
          ? '0 8px 32px rgba(14, 165, 233, 0.3)' 
          : '0 8px 32px rgba(217, 119, 6, 0.3)'
      }}
    >
      <Wallet size={18} className="text-white" />
    </div>
    <div className="min-w-0">
      <h1 className="text-base font-bold tracking-tight truncate" style={{ color: 'var(--color-text)' }}>BillsTracker</h1>
      <p className="text-[10px] font-medium tracking-wider uppercase truncate" style={{ color: 'var(--color-text-muted)' }}>Home Edition</p>
    </div>
  </div>
  
  {/* Close/Collapse Button - FIXED */}
  <button
    onClick={onToggle}
    className="p-1 rounded-lg hover:bg-slate-700/60 transition-all touch-target shrink-0 flex items-center justify-center w-8 h-8"
    style={{ color: 'var(--color-text-muted)' }}
    aria-label={isMobile ? 'Close sidebar' : 'Collapse sidebar'}
  >
    <PanelIcon isOpen={isOpen} />
  </button>
</div>

        {/* Navigation - FIXED */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
         <Link
  key={item.href}
  href={item.href}
  className={`
    group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
    ${isActive
      ? 'bg-sky-500/15 shadow-lg shadow-sky-500/5'
      : 'hover:translate-x-0.5'
    }
    focus:outline-none active:scale-[0.98]
  `}
  style={{
    color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
    backgroundColor: isActive ? 'var(--color-accent-bg)' : 'transparent',
    border: isActive ? '1px solid var(--color-accent-border)' : 'none'
  }}
  onClick={() => isMobile && onToggle()}
>
  <Icon size={17} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
  <span className="truncate">{item.label}</span>
  {isActive && (
    <span 
      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" 
      style={{ backgroundColor: 'var(--color-accent)' }} 
    />
  )}
</Link>
            );
          })}
        </nav>

        {/* Footer - FIXED */}
        <div className="p-3 border-t space-y-2" style={{ borderColor: 'var(--color-border)' }}>
          <button 
            onClick={toggle} 
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button 
            onClick={lockApp} 
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <Lock size={15} /> Lock App
          </button>
          <div className="flex items-center justify-between px-1 pt-1">
            <p className="text-[10px]" style={{ color: 'var(--color-text-dim)' }}>Syncing on local network</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[10px] text-emerald-400">Live</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}