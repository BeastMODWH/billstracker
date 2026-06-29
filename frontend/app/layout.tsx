import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/Toaster';
import { NotificationBanner } from '@/components/ui/NotificationBanner';
import { NotificationBell } from '@/components/ui/NotificationBell';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { PinLock } from '@/components/ui/PinLock';
import { ClientLayoutWrapper } from '@/components/layout/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BillsTracker',
  description: 'Track, manage and stay on top of all your bills in one place.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* ✅ Cache Control */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* ✅ Favicons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="BillsTracker" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen" suppressHydrationWarning>
        <ThemeProvider>
          <PinLock>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
            <Toaster />
            <NotificationBanner />
            <NotificationBell /> 
          </PinLock>
        </ThemeProvider>
        
        {/* ✅ Force refresh once when opening from home screen */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Check if running as PWA (home screen app)
                if (window.matchMedia('(display-mode: standalone)').matches) {
                  if (!sessionStorage.getItem('pwa_refreshed')) {
                    sessionStorage.setItem('pwa_refreshed', 'true');
                    // Small delay to ensure everything loads
                    setTimeout(function() {
                      window.location.reload();
                    }, 200);
                  }
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}