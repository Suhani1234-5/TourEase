import React from 'react';
import { AlertTriangle } from 'lucide-react';

/** Displays API or validation errors in a friendly banner */
export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800"
    >
      <div className="flex items-start gap-3 flex-1">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-red-800 dark:text-red-200">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition shrink-0"
        >
          Try again
        </button>
      )}
    </div>
  );
}
