'use client';
import { useState } from 'react';

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
      <span>⚠</span> {message}
    </p>
  );
}

export function validateRequired(value: string | number | undefined | null, label: string): string | undefined {
  if (value === undefined || value === null || value === '' || value === 0) {
    return `${label} is required`;
  }
  return undefined;
}

export function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = (field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const clearError = (field: string) => {
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
  };

  const clearAll = () => setErrors({});

  const hasErrors = Object.keys(errors).length > 0;

  return { errors, setError, clearError, clearAll, hasErrors };
}
