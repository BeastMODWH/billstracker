import PocketBase from 'pocketbase';

const pb = new PocketBase(
  typeof window !== 'undefined'
    ? `http://${window.location.hostname}:8090`
    : 'http://127.0.0.1:8090'
);

pb.autoCancellation(false);

// Global error handler - ignore 404 client errors from stale subscriptions
if (typeof window !== 'undefined') {
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
