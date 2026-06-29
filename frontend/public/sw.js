
const CACHE_NAME = 'billstracker-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'BillsTracker', {
      body: data.body || 'You have a reminder',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: data.tag || 'billstracker',
      requireInteraction: true,
      data: { url: data.url || '/' }
    })
  );
});

// Click notification - open app
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      const url = e.notification.data?.url || '/';
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// Background sync - check reminders every hour
self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'check-reminders') {
    e.waitUntil(checkReminders());
  }
});

async function checkReminders() {
  try {
    const res = await fetch('http://localhost:8090/api/collections/reminders/records?filter=status%3D%22pending%22&expand=biller_id&sort=reminder_date');
    const data = await res.json();
    const today = new Date(); today.setHours(0,0,0,0);
    
    for (const reminder of (data.items || [])) {
      const d = new Date(reminder.reminder_date.replace(' ', 'T'));
      d.setHours(0,0,0,0);
      const days = Math.ceil((d - today) / 86400000);
      
      if (days <= 1 && days >= 0) {
        const name = reminder.expand?.biller_id?.name || 'Bill';
        const msg = reminder.message || reminder.type?.replace('_', ' ');
        await self.registration.showNotification('BillsTracker Reminder', {
          body: `${name}: ${msg} — ${days === 0 ? 'Today!' : 'Tomorrow'}`,
          icon: '/icon-192.png',
          tag: `reminder-${reminder.id}`,
          requireInteraction: true,
          data: { url: '/reminders' }
        });
      }
    }
  } catch (e) {
    console.log('Reminder check failed:', e);
  }
}
