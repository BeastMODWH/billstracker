import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Toaster } from '@/components/ui/Toaster';
import { NotificationBanner } from '@/components/ui/NotificationBanner';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { PinLock } from '@/components/ui/PinLock';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BillsTracker',
  description: 'Track, manage and stay on top of all your bills in one place.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 min-h-screen" suppressHydrationWarning>
        <ThemeProvider>
          <PinLock>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 flex flex-col min-h-screen lg:ml-64">
                <div className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
                  {children}
                </div>
              </main>
            </div>
            <MobileNav />
            <Toaster />
            <NotificationBanner />
          </PinLock>
        </ThemeProvider>
      </body>
    </html>
  );
}
