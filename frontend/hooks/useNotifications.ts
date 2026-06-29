'use client';
import { useEffect, useState } from 'react';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
      setSupported(true);
      setPermission(Notification.permission);

      // Register service worker
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('SW registered:', reg.scope);

        // Try periodic background sync
        if ('periodicSync' in reg) {
          (reg as any).periodicSync.register('check-reminders', {
            minInterval: 60 * 60 * 1000 // 1 hour
          }).catch(() => {});
        }
      }).catch(console.error);
    }
  }, []);

  const requestPermission = async () => {
    if (!supported) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  const sendNotification = (title: string, body: string, url = '/reminders') => {
    if (permission !== 'granted') return;
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification(title, {
        body,
        icon: '/icon-192.png',
        tag: 'billstracker-' + Date.now(),
        requireInteraction: false,
        data: { url }
      });
    });
  };

  // Check reminders and fire notifications
  const checkAndNotify = async (reminders: any[]) => {
    if (permission !== 'granted') return;
    const today = new Date(); today.setHours(0,0,0,0);

    for (const r of reminders) {
      if (r.status !== 'pending') continue;
      const d = new Date(r.reminder_date.replace(' ', 'T'));
      d.setHours(0,0,0,0);
      const days = Math.ceil((d.getTime() - today.getTime()) / 86400000);
      const name = r.expand?.biller_id?.name || 'Bill reminder';
      const msg = r.message || r.type?.replace('_', ' ') || 'Reminder';

      if (days === 0) {
        sendNotification('Due Today! 🔔', `${name}: ${msg}`, '/reminders');
      } else if (days === 1) {
        sendNotification('Due Tomorrow ⚠️', `${name}: ${msg}`, '/reminders');
      } else if (days < 0 && days >= -1) {
        sendNotification('Overdue! ❗', `${name}: ${msg} was due ${Math.abs(days)}d ago`, '/reminders');
      }
    }
  };

  return { permission, supported, requestPermission, sendNotification, checkAndNotify };
}
