import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <ToastStack toasts={toasts} onDismiss={removeToast} />
      )}
    </ToastContext.Provider>
  );
}

function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2 items-center w-full max-w-md px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`pointer-events-auto w-full flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-300 ${
            toast.type === 'error'
              ? 'bg-gray-950 border-red-800/60 text-slate-100 border-l-4 border-l-red-500'
              : 'bg-gray-950 border-slate-700/60 text-slate-100 border-l-4 border-l-emerald-500'
          }`}
          style={{ boxShadow: toast.type === 'error' ? '0 8px 32px rgba(239,68,68,0.15)' : '0 8px 32px rgba(16,185,129,0.15)' }}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          ) : (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
          )}
          <p className="text-sm font-semibold flex-1 text-slate-100">{toast.message}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
