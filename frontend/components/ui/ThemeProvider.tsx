'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('bt_theme') as Theme;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.background = theme === 'light' ? '#f0f4f8' : '#0f172a';
    document.body.style.background = theme === 'light' ? '#f0f4f8' : '#0f172a';
    document.body.style.color = theme === 'light' ? '#1a202c' : '#f1f5f9';
    localStorage.setItem('bt_theme', theme);
  }, [theme, mounted]);

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (!mounted) return <>{children}</>;
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
