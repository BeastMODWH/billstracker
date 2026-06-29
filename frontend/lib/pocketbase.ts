import PocketBase from 'pocketbase';

// PocketBase URL - fully dynamic at runtime, no rebuild needed
function getPocketBaseUrl() {
  if (typeof window === 'undefined') return 'http://192.168.1.19:8090';
  const host = window.location.hostname;
  // Local access - always use local IP:8090
  if (host === 'localhost' || host === '192.168.1.19' || host.match(/^192\.168\./) || host.match(/^10\./) || host.match(/^172\./)) {
    return `http://${host}:8090`;
  }
  // External - try runtime config file first (most reliable)
  const winConfig = (window as any).__BT_CONFIG__?.pbUrl;
  if (winConfig && winConfig !== 'POCKETBASE_URL_PLACEHOLDER') return winConfig;
  // Then try localStorage (set via Settings page)
  const saved = localStorage.getItem('bt_pb_url');
  if (saved) return saved;
  return 'http://localhost:8090';
}

const pb = new PocketBase(getPocketBaseUrl());

pb.autoCancellation(false);

// ✅ FIX: Handle missing realtime functions
if (typeof window !== 'undefined') {
  // Check if realtime is available
  const hasRealtime = pb.realtime && typeof pb.realtime.subscribe === 'function';
  
  if (!hasRealtime) {
    console.warn('PocketBase realtime not available - running without live updates');
    
    // Create dummy realtime functions to prevent errors
    pb.realtime = {
      subscribe: () => ({ unsubscribe: () => {} }),
      unsubscribe: () => {},
      unsubscribeByPrefix: () => {},
      send: () => {},
    } as any;
  }

  // Override collection subscribe/unsubscribe with safe versions
  const originalSubscribe = pb.collection('bills').subscribe?.bind(pb.collection('bills'));
  const originalUnsubscribe = pb.collection('bills').unsubscribe?.bind(pb.collection('bills'));

  if (originalSubscribe) {
    pb.collection('bills').subscribe = async function(...args: any[]) {
      try {
        return await originalSubscribe(...args);
      } catch (error: any) {
        if (error?.status === 404 || error?.message?.includes('realtime')) {
          console.warn('Realtime unavailable - running without live updates');
          return { unsubscribe: () => Promise.resolve() };
        }
        throw error;
      }
    };
  }

  if (originalUnsubscribe) {
    pb.collection('bills').unsubscribe = async function(...args: any[]) {
      try {
        return await originalUnsubscribe(...args);
      } catch (error: any) {
        if (error?.status === 404 || error?.message?.includes('realtime')) {
          console.warn('Realtime unsubscribe failed - ignoring');
          return;
        }
        throw error;
      }
    };
  }

  // Global error handler
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason?.status === 404 || e.reason?.status === 400) {
      e.preventDefault();
    }
  });
}

export default pb;

export type Biller = {
  id: string;
  name: string;
  category: string;
  account_number: string;
  contact_info: string;
  notes: string;
  vulnerability_flag: boolean;
  is_active: boolean;
  created: string;
  updated: string;
};

export type Bill = {
  id: string;
  biller_id: string;
  expand?: { biller_id?: Biller };
  current_balance: number;
  last_bill_date: string;
  last_bill_amount: number;
  next_bill_date: string;
  notes: string;
  frequency: string;
  created: string;
  updated: string;
};

export type Payment = {
  id: string;
  bill_id: string;
  biller_id: string;
  expand?: { biller_id?: Biller };
  amount: number;
  payment_date: string;
  method: string;
  notes: string;
  receipt?: string;
  created: string;
};

export type DirectDebit = {
  id: string;
  biller_id: string;
  expand?: { biller_id?: Biller };
  amount: number;
  collection_day: number;
  next_dd_date: string;
  status: 'active' | 'paused' | 'cancelled';
  notes: string;
};

export type Reminder = {
  id: string;
  biller_id: string;
  expand?: { biller_id?: Biller };
  reminder_date: string;
  type: 'payment_due' | 'follow_up' | 'review' | 'custom';
  message: string;
  status: 'pending' | 'snoozed' | 'done';
};