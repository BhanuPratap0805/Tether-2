import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AppSettings } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: true,
  notifications: { push: true, sms: true, email: false },
  privacy: { shareLiveLocation: true, shareWithGuardiansOnly: true },
  locationAccuracy: 'high',
  language: 'en',
};

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (patch: Partial<AppSettings>) => void;
  updateNested: <K extends 'notifications' | 'privacy'>(key: K, patch: Partial<AppSettings[K]>) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
const STORAGE_KEY = 'tether_settings';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? { ...DEFAULT_SETTINGS, ...JSON.parse(cached) } : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle('dark', settings.darkMode);
  }, [settings]);

  const updateSettings = (patch: Partial<AppSettings>) => setSettings((prev) => ({ ...prev, ...patch }));

  const updateNested = <K extends 'notifications' | 'privacy'>(key: K, patch: Partial<AppSettings[K]>) =>
    setSettings((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  const value = useMemo(() => ({ settings, updateSettings, updateNested }), [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
