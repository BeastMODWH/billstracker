'use client';
import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbase';

export type Budget = {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  createdAt: string;
  updatedAt: string;
};

export function useBudget() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  // Load budgets
  const loadBudgets = async () => {
    try {
      const data = await pb.collection('budgets').getFullList({
        sort: 'category',
      });
      setBudgets(data as Budget[]);
    } catch (error) {
      console.error('Error loading budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save budget
  const saveBudget = async (budget: Partial<Budget>) => {
    try {
      if (budget.id) {
        await pb.collection('budgets').update(budget.id, budget);
      } else {
        await pb.collection('budgets').create(budget);
      }
      await loadBudgets();
      return { success: true, message: 'Budget saved successfully' };
    } catch (error) {
      console.error('Error saving budget:', error);
      return { success: false, message: 'Failed to save budget' };
    }
  };

  // Delete budget
  const deleteBudget = async (id: string) => {
    try {
      await pb.collection('budgets').delete(id);
      await loadBudgets();
      return { success: true, message: 'Budget deleted' };
    } catch (error) {
      console.error('Error deleting budget:', error);
      return { success: false, message: 'Failed to delete budget' };
    }
  };

  // Calculate spending by category for current month
  const getCategorySpending = (bills: any[], payments: any[]) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Get all payments for current month
    const monthPayments = payments.filter(p => {
      const date = new Date(p.payment_date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // Calculate spending by category
    const spending: Record<string, number> = {};
    
    monthPayments.forEach(p => {
      const bill = bills.find(b => b.biller_id === p.biller_id);
      const category = bill?.expand?.biller_id?.category || 'Other';
      spending[category] = (spending[category] || 0) + p.amount;
    });

    return spending;
  };

  // Calculate budget progress for each category
  const getBudgetProgress = (spending: Record<string, number>) => {
    return budgets.map(budget => {
      const spent = spending[budget.category] || 0;
      const percentage = budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 100) : 0;
      const remaining = Math.max(budget.amount - spent, 0);
      
      return {
        ...budget,
        spent,
        percentage,
        remaining,
        status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'good',
      };
    });
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  return {
    budgets,
    loading,
    loadBudgets,
    saveBudget,
    deleteBudget,
    getCategorySpending,
    getBudgetProgress,
  };
}