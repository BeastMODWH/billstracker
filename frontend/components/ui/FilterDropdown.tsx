'use client';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  icon?: string;
  count?: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  activeValue: string;
  onChange: (value: string) => void;
  type?: 'checkbox' | 'radio';
}

interface FilterDropdownProps {
  sections: FilterSection[];
  hasActiveFilters: boolean;
  onClearAll?: () => void;
  children?: ReactNode;
  triggerLabel?: string;
  onClose?: () => void;
  className?: string;
}

export function FilterDropdown({ 
  sections, 
  hasActiveFilters, 
  onClearAll,
  children,
  triggerLabel = 'Filters',
  onClose,
  className = ''
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when filter is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const getActiveFilterCount = () => {
    let count = 0;
    sections.forEach(section => {
      if (section.activeValue !== 'all' && section.activeValue !== '') {
        count++;
      }
    });
    return count;
  };

  const closeDropdown = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className={`relative z-[50] ${className}`} ref={filterRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-secondary flex items-center gap-2 px-4 min-h-[48px] ${
          hasActiveFilters ? 'border-accent/50 text-accent' : ''
        }`}
      >
        <Filter size={18} className="sm:w-4 sm:h-4" />
        <span className="hidden sm:inline text-sm">{triggerLabel}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        {hasActiveFilters && (
          <>
            <span className="hidden sm:inline w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="sm:hidden text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
              {getActiveFilterCount()}
            </span>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 z-[9998] ${isMobile ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent'}`}
            onClick={closeDropdown}
          />
          
          {/* Dropdown Panel */}
          <div 
            className={`
              ${isMobile 
                ? 'fixed bottom-0 left-0 right-0 z-[9999] rounded-t-2xl pb-safe max-h-[70vh]' 
                : 'absolute z-[9999] mt-2 min-w-[280px] max-w-[400px] right-0'
              }
              bg-surface border border-slate-700/50 shadow-2xl overflow-hidden
            `}
            style={{ 
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.15)',
              ...(isMobile ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                maxHeight: '70vh',
              } : {
                borderRadius: '16px',
                maxHeight: '80vh',
              })
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed at top of dropdown */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-700/30 sticky top-0 bg-surface z-20">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-accent" />
                <span className="text-base font-semibold text-slate-100">Filters</span>
                {hasActiveFilters && (
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium ml-1">
                    {getActiveFilterCount()} active
                  </span>
                )}
              </div>
              <button 
                onClick={closeDropdown}
                className="p-2 rounded-xl hover:bg-slate-700/30 active:bg-slate-700/50 transition-colors touch-target min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(70vh-80px)] sm:max-h-[calc(80vh-80px)]">
              {/* Active Filter Chips */}
              {hasActiveFilters && children && (
                <div className="px-5 py-3 border-b border-slate-700/30 flex flex-wrap gap-1.5">
                  {children}
                  {onClearAll && (
                    <button
                      onClick={() => {
                        onClearAll();
                        if (isMobile) closeDropdown();
                      }}
                      className="text-[10px] text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 px-2 py-0.5 rounded-full transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}

              {/* Filter Sections */}
              <div className="px-5 py-3 space-y-4">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {section.title}
                    </p>
                    <div className="space-y-1">
                      {section.options.map((option) => {
                        const isActive = section.activeValue === option.value;
                        
                        return (
                          <div
                            key={option.value}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all touch-target min-h-[40px] ${
                              isActive ? 'bg-accent/10' : 'hover:bg-slate-700/30'
                            }`}
                            onClick={() => {
                              if (section.activeValue === option.value) {
                                section.onChange('all');
                              } else {
                                section.onChange(option.value);
                              }
                              if (isMobile) {
                                setTimeout(closeDropdown, 150);
                              }
                            }}
                          >
                            {/* Checkbox */}
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                              isActive ? 'bg-accent border-accent' : 'border-slate-500'
                            }`}>
                              {isActive && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm ${isActive ? 'text-accent font-medium' : 'text-slate-300'}`}>
                              {option.icon && <span className="mr-1.5">{option.icon}</span>}
                              {option.label}
                            </span>
                            {option.count !== undefined && (
                              <span className={`text-xs ml-auto ${isActive ? 'text-accent/70' : 'text-slate-500'}`}>
                                {option.count}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear All Button - Bottom */}
              {hasActiveFilters && onClearAll && !children && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-700/30">
                  <button
                    onClick={() => {
                      onClearAll();
                      closeDropdown();
                    }}
                    className="w-full py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 active:bg-slate-700/50 transition-colors flex items-center justify-center gap-2 touch-target min-h-[44px]"
                  >
                    <X size={16} /> Clear All Filters
                  </button>
                </div>
              )}

              {/* Mobile Apply Button */}
              {isMobile && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-700/30">
                  <button
                    onClick={closeDropdown}
                    className="w-full btn-primary justify-center"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}