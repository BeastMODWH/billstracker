'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toaster';

type BudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: any) => void;
  editing?: any;
  categories: string[];
};

const PERIODS = ['monthly', 'quarterly', 'yearly'];

export function BudgetModal({ isOpen, onClose, onSave, editing, categories }: BudgetModalProps) {
  const [category, setCategory] = useState(editing?.category || '');
  const [amount, setAmount] = useState(editing?.amount || '');
  const [period, setPeriod] = useState(editing?.period || 'monthly');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!category) {
      toast('Please select a category', 'error');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast('Please enter a valid amount', 'error');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        id: editing?.id,
        category,
        amount: parseFloat(amount),
        period,
      });
      toast(editing ? '✅ Budget updated' : '✅ Budget created');
      onClose();
    } catch (error) {
      toast('Failed to save budget', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title={editing ? 'Edit Budget' : 'Set Budget'}>
      <div className="space-y-4">
        <div>
          <label className="label">Category</label>
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!!editing}
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Budget Amount (£)</label>
          <input
            type="number"
            step="0.01"
            className="input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Period</label>
          <select
            className="input"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            {PERIODS.map(p => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex-1 justify-center"
          >
            {saving ? 'Saving...' : editing ? 'Update Budget' : 'Set Budget'}
          </button>
          <button
            onClick={onClose}
            className="btn-secondary flex-1 justify-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}