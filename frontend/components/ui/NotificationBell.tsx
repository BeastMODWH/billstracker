'use client';
import { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, BellRing, Sparkles, X, Check, AlertCircle } from 'lucide-react';
import { useAppNotifications } from '@/hooks/useAppNotifications';

export function NotificationBell() {
  const { permission, isSupported, requestPermission } = useAppNotifications();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [modalTimer, setModalTimer] = useState(5);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const modalIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Auto-hide bell after 5 seconds ──
  useEffect(() => {
    if (mounted) {
      setIsVisible(true);
      
      autoHideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => {
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current);
          autoHideTimerRef.current = null;
        }
      };
    }
  }, [mounted]);

  // ── Modal timer logic ──
  useEffect(() => {
    if (showModal) {
      setModalTimer(5);

      // Countdown interval
      modalIntervalRef.current = setInterval(() => {
        setModalTimer((prev) => {
          if (prev <= 1) {
            clearInterval(modalIntervalRef.current!);
            setShowModal(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto-close after 5 seconds
      modalTimerRef.current = setTimeout(() => {
        setShowModal(false);
        clearInterval(modalIntervalRef.current!);
      }, 5000);

      return () => {
        if (modalTimerRef.current) {
          clearTimeout(modalTimerRef.current);
          modalTimerRef.current = null;
        }
        if (modalIntervalRef.current) {
          clearInterval(modalIntervalRef.current);
          modalIntervalRef.current = null;
        }
      };
    }
  }, [showModal]);

  // ── Scroll handler ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;
    let timeout: NodeJS.Timeout | null = null;
    let isAtBottom = false;

    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        const atBottom = currentScrollY + windowHeight >= documentHeight - 50;
        const atTop = currentScrollY < 30;

        if (atBottom) {
          setIsVisible(false);
          isAtBottom = true;
          if (autoHideTimerRef.current) {
            clearTimeout(autoHideTimerRef.current);
            autoHideTimerRef.current = null;
          }
        } else if (atTop) {
          setIsVisible(true);
          isAtBottom = false;
          if (autoHideTimerRef.current) {
            clearTimeout(autoHideTimerRef.current);
          }
          autoHideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        } else if (currentScrollY < lastScrollY && isAtBottom) {
          setIsVisible(true);
          isAtBottom = false;
          if (autoHideTimerRef.current) {
            clearTimeout(autoHideTimerRef.current);
          }
          autoHideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        } else if (currentScrollY > 100 && currentScrollY > lastScrollY + 10) {
          setIsVisible(false);
          if (autoHideTimerRef.current) {
            clearTimeout(autoHideTimerRef.current);
            autoHideTimerRef.current = null;
          }
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
          if (autoHideTimerRef.current) {
            clearTimeout(autoHideTimerRef.current);
          }
          autoHideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        }

        lastScrollY = currentScrollY;
        timeout = null;
      }, 50);
    };

    const initialScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (initialScrollY + windowHeight >= documentHeight - 50) {
      setIsVisible(false);
    } else if (initialScrollY < 30) {
      setIsVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, []);

  // Close tooltip after 5 seconds on hover
  const handleMouseEnter = () => {
    setShowTooltip(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  const handleClick = () => {
    if (permission === 'denied') {
      setShowModal(true);
    } else {
      requestPermission();
    }
  };

  if (!mounted) return null;
  if (!isSupported) return null;

  const isEnabled = permission === 'granted';
  const isDenied = permission === 'denied';

  return (
    <>
      {/* Notification Bell Button */}
      <div 
        className={`fixed bottom-24 right-4 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
      >
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative p-3.5 rounded-2xl shadow-2xl transition-all touch-target group ${
            isEnabled 
              ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 hover:scale-105 active:scale-95 hover:shadow-emerald-500/20' 
              : isDenied
                ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:scale-105 active:scale-95 hover:shadow-red-500/20'
                : 'bg-slate-800/90 border border-slate-700/50 text-slate-400 hover:bg-slate-700/80 hover:scale-105 active:scale-95 hover:shadow-slate-500/10'
          }`}
          style={{
            backdropFilter: 'blur(12px)',
            backgroundColor: isEnabled ? 'rgba(16, 185, 129, 0.15)' : isDenied ? 'rgba(239, 68, 68, 0.12)' : 'rgba(30, 41, 59, 0.85)',
          }}
          aria-label={isEnabled ? 'Notifications enabled' : isDenied ? 'Notifications blocked' : 'Enable notifications'}
        >
          {/* Status Dot */}
          <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
            isEnabled ? 'bg-emerald-400 animate-pulse' : isDenied ? 'bg-red-400' : 'bg-slate-500'
          }`} />
          
          {/* Bell Icon with animation */}
          {isEnabled ? (
            <BellRing 
              size={20} 
              className="text-emerald-400" 
              style={{ animation: 'gentleRing 3s ease-in-out infinite' }}
            />
          ) : isDenied ? (
            <BellOff size={20} className="text-red-400" />
          ) : (
            <Bell size={20} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
          )}

          {/* Status label - shows on hover */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full text-[8px] font-medium text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isEnabled ? 'ON' : isDenied ? 'BLOCKED' : 'OFF'}
          </span>
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div 
            ref={tooltipRef}
            className="absolute bottom-full right-0 mb-3 w-64 bg-surface border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div className="px-4 py-3 flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isEnabled ? 'bg-emerald-500/20' : isDenied ? 'bg-red-500/20' : 'bg-slate-700/30'
              }`}>
                {isEnabled ? (
                  <BellRing size={14} className="text-emerald-400" />
                ) : isDenied ? (
                  <BellOff size={14} className="text-red-400" />
                ) : (
                  <Bell size={14} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-100">
                  {isEnabled 
                    ? '✅ Notifications Enabled' 
                    : isDenied 
                      ? '🔒 Notifications Blocked'
                      : '🔔 Notifications Off'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isEnabled 
                    ? 'You\'ll receive bill reminders and alerts' 
                    : isDenied 
                      ? 'Click the lock icon in your address bar to allow notifications'
                      : 'Tap to enable notifications for bill reminders'}
                </p>
                {isDenied && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-1.5 text-[10px] text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                  >
                    <AlertCircle size={10} /> How to enable
                  </button>
                )}
              </div>
              <button 
                onClick={() => setShowTooltip(false)}
                className="p-1 rounded-lg hover:bg-slate-700/30 text-slate-500 hover:text-slate-200 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal - For blocked notifications with timer */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setShowModal(false)}
          />
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] bg-surface border border-slate-700/50 rounded-2xl shadow-2xl z-[9999] p-6"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <BellOff size={18} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Notifications Blocked</h3>
                  <p className="text-xs text-slate-400">Allow notifications to get bill reminders</p>
                </div>
              </div>
              {/* ── Timer display ── */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">Auto-closing in</span>
                <span className="text-sm font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg min-w-[32px] text-center">
                  {modalTimer}s
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="bg-slate-700/20 rounded-xl p-4 space-y-2">
                <p className="text-xs font-medium text-slate-300">How to enable:</p>
                <ol className="space-y-2 text-xs">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-700/50 text-slate-300 flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Click the <span className="text-sky-400">🔒 lock icon</span> in your address bar</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-700/50 text-slate-300 flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Select <span className="text-emerald-400">"Allow notifications"</span> from the menu</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-700/50 text-slate-300 flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Refresh the page and click the bell again</span>
                  </li>
                </ol>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-amber-400/80 bg-amber-500/5 border border-amber-500/10 rounded-xl p-3">
                <AlertCircle size={14} className="shrink-0" />
                <p>You won't receive bill reminders until notifications are enabled</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  requestPermission();
                }}
                className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors touch-target"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  if (modalTimerRef.current) {
                    clearTimeout(modalTimerRef.current);
                  }
                  if (modalIntervalRef.current) {
                    clearInterval(modalIntervalRef.current);
                  }
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 text-sm font-medium transition-colors touch-target"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes gentleRing {
          0%, 80%, 100% { transform: rotate(0deg); }
          85% { transform: rotate(-10deg); }
          90% { transform: rotate(10deg); }
          95% { transform: rotate(-5deg); }
        }
      `}</style>
    </>
  );
}