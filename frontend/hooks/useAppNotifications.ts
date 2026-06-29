'use client';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/Toaster';

type NotificationType = 'toast' | 'browser' | 'banner';

interface NotificationOptions {
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
  duration?: number;
  icon?: string;
}

export function useAppNotifications() {
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      setBrowserPermission(Notification.permission);
    }
  }, []);

  // Check if browser notifications are available
  const isBrowserNotificationAvailable = () => {
    return isSupported && browserPermission === 'granted';
  };

  // Request permission - Clean version
  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) {
      toast('Notifications not supported in this browser', 'error');
      return false;
    }

    if (browserPermission === 'granted') {
      return true;
    }

    if (browserPermission === 'denied') {
      toast('Notifications blocked — allow in browser settings', 'error');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setBrowserPermission(result);
      
      if (result === 'granted') {
        toast('🔔 Notifications enabled!', 'success');
        return true;
      } else {
        toast('Permission denied', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  };

  // Main notification function - tries all methods
  const notify = (options: NotificationOptions): void => {
    const { title, message, type = 'toast', link, duration = 5000, icon = '/icon-192.png' } = options;

    // 1. Always show toast notification (works everywhere)
    if (type === 'banner') {
      // Banner style toast
      toast(message, 'info');
    } else {
      toast(message, 'info');
    }

    // 2. Try browser notification (Chrome/Firefox)
    if (type !== 'banner' && isBrowserNotificationAvailable()) {
      try {
        const notification = new Notification(`📌 ${title}`, {
          body: message,
          icon: icon,
          tag: `bill-${Date.now()}`,
          requireInteraction: true,
          data: { link },
        });

        notification.onclick = () => {
          window.focus();
          if (link) {
            window.location.href = link;
          }
          notification.close();
        };

        setTimeout(() => notification.close(), duration);
      } catch (error) {
        console.log('Browser notification failed, toast already shown');
      }
    }
  };

  // Specific notification types with beautiful messages
  const notifyBillDue = (billerName: string, dueDate: string, billId?: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / 86400000);
    let title: string, message: string, type: NotificationType = 'toast';

    if (days === 0) {
      title = '🔔 Due Today!';
      message = `${billerName} - Payment due today!`;
      type = 'banner';
    } else if (days === 1) {
      title = '⏰ Due Tomorrow!';
      message = `${billerName} - Payment due tomorrow!`;
      type = 'banner';
    } else if (days < 0) {
      title = '⚠️ Overdue!';
      message = `${billerName} - ${Math.abs(days)} days overdue!`;
      type = 'banner';
    } else if (days <= 3) {
      title = '📅 Due Soon!';
      message = `${billerName} - Due in ${days} days`;
      type = 'toast';
    } else if (days <= 7) {
      title = '📅 Upcoming Bill';
      message = `${billerName} - Due in ${days} days`;
      type = 'toast';
    } else {
      return;
    }

    notify({
      title,
      message,
      type,
      link: billId ? `/bills?highlight=${billId}` : '/bills',
      duration: days <= 1 ? 8000 : 5000,
    });
  };

  const notifyPaymentRecorded = (billerName: string, amount: number) => {
    const formatted = new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP' 
    }).format(amount);
    
    notify({
      title: '✅ Payment Recorded',
      message: `${billerName} - ${formatted}`,
      type: 'toast',
      duration: 3000,
    });
  };

  const notifyReminderSet = (billerName: string, dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / 86400000);
    const dayText = days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`;
    
    notify({
      title: '🔔 Reminder Set',
      message: `${billerName} - You'll be reminded ${dayText}`,
      type: 'toast',
      duration: 3000,
    });
  };

  const notifyError = (message: string) => {
    toast(message, 'error');
  };

  const notifySuccess = (message: string) => {
    toast(message, 'success');
  };

  const notifyWarning = (message: string) => {
    toast(message, 'warning');
  };

  // Check for upcoming bills and notify
  const checkUpcomingBills = (bills: any[], daysUntil: (date: string) => number | null) => {
    bills.forEach(bill => {
      const days = daysUntil(bill.next_bill_date);
      if (days === null) return;

      if (days <= 1 || days < 0) {
        const biller = bill.expand?.biller_id;
        notifyBillDue(biller?.name || 'Bill', bill.next_bill_date, bill.id);
      }
    });
  };

  // Check if notifications are blocked
  const isBlocked = () => {
    return browserPermission === 'denied';
  };

  // Get a friendly message for the user
  const getPermissionMessage = () => {
    if (browserPermission === 'granted') return '✅ Notifications enabled';
    if (browserPermission === 'denied') return '🔒 Blocked — allow in browser';
    return '🔔 Click to enable';
  };

  // Get a detailed status for display
  const getPermissionStatus = () => {
    if (browserPermission === 'granted') {
      return {
        status: 'enabled',
        label: 'On',
        color: 'emerald',
        icon: '✅',
        message: 'Notifications are active',
      };
    }
    if (browserPermission === 'denied') {
      return {
        status: 'blocked',
        label: 'Blocked',
        color: 'red',
        icon: '🔒',
        message: 'Allow in browser settings',
      };
    }
    return {
      status: 'prompt',
      label: 'Off',
      color: 'slate',
      icon: '🔔',
      message: 'Enable to get alerts',
    };
  };

  return {
    permission: browserPermission,
    isSupported,
    isBrowserNotificationAvailable,
    requestPermission,
    notify,
    notifyBillDue,
    notifyPaymentRecorded,
    notifyReminderSet,
    checkUpcomingBills,
    isBlocked,
    getPermissionMessage,
    getPermissionStatus,
    notifyError,
    notifySuccess,
    notifyWarning,
  };
}