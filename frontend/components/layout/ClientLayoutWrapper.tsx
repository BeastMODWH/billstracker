'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu, PanelLeft } from 'lucide-react';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        try {
          const saved = localStorage.getItem('sidebarOpen');
          if (saved !== null) {
            setIsSidebarOpen(JSON.parse(saved));
          } else {
            setIsSidebarOpen(true);
          }
        } catch {
          setIsSidebarOpen(true);
        }
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    try {
      localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    } catch {}
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden lg:block fixed top-0 left-0 h-full w-[260px] sm:w-[280px] md:w-[300px] xl:w-[320px] bg-slate-900/98 backdrop-blur-xl border-r border-slate-700/50 z-40" />
        <main className="flex-1 flex flex-col min-h-screen lg:ml-[260px] xl:ml-[320px]">
          <div className="flex-1 w-full max-w-full px-3 sm:px-4 lg:px-6 pb-28 lg:pb-6">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Open Sidebar Button */}
      {!isSidebarOpen && !isMobile && (
       <button
  onClick={toggleSidebar}
  className="fixed top-3 left-3 z-50 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:shadow-lg active:scale-95 touch-target"
  style={{
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)'
  }}
  aria-label="Open sidebar"
>
  <PanelLeft size={16} style={{ color: 'var(--color-text)' }} />
  <span className="hidden sm:inline text-sm font-medium" style={{ color: 'var(--color-text)' }}>Menu</span>
</button>
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar}
        isMobile={isMobile}
      />
      
      <main 
        className={`
          flex-1 flex flex-col min-h-screen w-full
          transition-all duration-300 ease-in-out
          ${isSidebarOpen && !isMobile ? 'lg:ml-[260px] xl:ml-[320px]' : 'lg:ml-0'}
        `}
      >
        {/* ✅ FIXED: No top padding, content starts at top */}
        <div className="flex-1 w-full max-w-full pb-28 lg:pb-6">
          <div className="w-full max-w-full px-3 sm:px-4 lg:px-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}