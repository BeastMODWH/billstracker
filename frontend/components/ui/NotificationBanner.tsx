'use client';
import { useEffect, useState } from 'react';
import { Bell, BellRing, X, ArrowRight, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export function NotificationBanner() {
  const [state, setState] = useState<'loading' | 'show' | 'hide'>('loading');
  const [asking, setAsking] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (localStorage.getItem('notif-dismissed')) {
      setState('hide');
      return;
    }

    if ('Notification' in window) {
      setPermission(Notification.permission);
      if (Notification.permission === 'granted' || Notification.permission === 'denied') {
        setState('hide');
        return;
      }
    }

    setState('show');
    setTimer(5);

    // ── Countdown timer ──
    const countdownInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setState('hide');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // ── Auto-hide after 5 seconds ──
    const autoHideTimer = setTimeout(() => {
      setState('hide');
      clearInterval(countdownInterval);
    }, 5000);

    return () => {
      clearTimeout(autoHideTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  // ── Scroll handler ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        const atBottom = currentScrollY + windowHeight >= documentHeight - 50;
        const atTop = currentScrollY < 30;

        if (atBottom || (currentScrollY > 100 && currentScrollY > lastScrollY + 10)) {
          setIsVisible(false);
        } else if (atTop || currentScrollY < lastScrollY) {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
        timeout = null;
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [lastScrollY]);

  const handleEnable = async () => {
    setAsking(true);
    try {
      if (!('Notification' in window)) {
        alert('Your browser does not support notifications. Try Chrome or Firefox.');
        setAsking(false);
        return;
      }

      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        if ('serviceWorker' in navigator) {
          try {
            await navigator.serviceWorker.register('/sw.js');
          } catch (e) {
            console.log('SW error:', e);
          }
        }
        new Notification('BillsTracker ✅', {
          body: 'Notifications enabled! You will be alerted when bills are due.',
          icon: '/icon-192.png',
        });
        setState('hide');
        localStorage.setItem('notif-dismissed', '1');
      } else if (result === 'denied') {
        alert('Notifications blocked. Please enable them in your browser settings.');
        setState('hide');
        localStorage.setItem('notif-dismissed', '1');
      }
    } catch (e) {
      alert('Could not enable notifications on this browser/device. Try using Chrome.');
    }
    setAsking(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('notif-dismissed', '1');
    setState('hide');
  };

  if (state === 'loading' || state === 'hide') return null;

  return (
    <div 
      className={`fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-[400px] z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
    >
      <div 
        className="relative rounded-2xl border border-sky-500/20 shadow-2xl overflow-hidden animate-slide-up"
        style={{ 
          backgroundColor: '#1e293b',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.15)'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500" />
        
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/10 flex items-center justify-center shrink-0 border border-sky-500/20">
              <BellRing size={20} className="text-sky-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-800 animate-pulse" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-100 text-sm">Smart Notifications</p>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Never miss a bill again. Get <span className="text-sky-400 font-medium">real-time alerts</span> on your phone and laptop when payments are due.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Bell size={10} className="text-sky-400" />
                  <span>Due reminders</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <ShieldCheck size={10} className="text-emerald-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Sparkles size={10} className="text-amber-400" />
                  <span>Smart alerts</span>
                </div>
              </div>

              {/* ── Actions with Timer ── */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <button 
                  onClick={handleEnable} 
                  disabled={asking} 
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-white text-xs font-medium transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 flex items-center gap-2 touch-target disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {asking ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enabling...
                    </>
                  ) : (
                    <>
                      <Bell size={14} /> Enable Notifications
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={handleDismiss} 
                    className="px-4 py-2.5 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors touch-target"
                  >
                    Not now
                  </button>
                  <span className="text-xs text-slate-500 font-mono bg-slate-700/20 px-2 py-1 rounded-lg min-w-[28px] text-center">
                    {timer}s
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDismiss} 
              className="p-1.5 rounded-lg hover:bg-slate-700/30 text-slate-500 hover:text-slate-200 transition-colors shrink-0 touch-target"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center text-[8px] text-slate-400 border-2 border-slate-800">✓</div>
              <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center text-[8px] text-slate-400 border-2 border-slate-800">🔔</div>
              <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center text-[8px] text-slate-400 border-2 border-slate-800">📱</div>
            </div>
            <p className="text-[9px] text-slate-500">
              <span className="text-emerald-400">●</span> Works on all devices
            </p>
            <p className="text-[9px] text-slate-500">
              <span className="text-sky-400">●</span> One-click setup
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}