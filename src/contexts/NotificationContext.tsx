import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';

export type ToastTone = 'success' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  tone: ToastTone;
}

interface NotificationContextValue {
  notify: (message: string, tone?: ToastTone) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

const toneIcon: Record<ToastTone, ReactNode> = {
  success: <FiCheckCircle className="text-teal-400" />,
  info: <FiInfo className="text-sky-300" />,
  warning: <FiAlertTriangle className="text-coral-400" />,
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              className="glass rounded-full px-4 py-2.5 flex items-center gap-2.5 text-sm text-sky-50 shadow-lg max-w-xs"
            >
              {toneIcon[toast.tone]}
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotify must be used within NotificationProvider');
  return ctx.notify;
}
