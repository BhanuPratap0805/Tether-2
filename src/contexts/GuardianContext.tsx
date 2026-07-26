import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { guardianService } from '../services/guardianService';
import type { Guardian } from '../types';

interface GuardianContextValue {
  guardians: Guardian[];
  isLoading: boolean;
  addGuardian: (g: Omit<Guardian, 'id'>) => Promise<void>;
  updateGuardian: (id: string, patch: Partial<Guardian>) => Promise<void>;
  removeGuardian: (id: string) => Promise<void>;
}

const GuardianContext = createContext<GuardianContextValue | undefined>(undefined);

export function GuardianProvider({ children }: { children: ReactNode }) {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    guardianService.list().then((list) => {
      setGuardians(list);
      setIsLoading(false);
    });
  }, []);

  const addGuardian = async (g: Omit<Guardian, 'id'>) => {
    const created = await guardianService.add(g);
    setGuardians((prev) => [...prev, created]);
  };

  const updateGuardian = async (id: string, patch: Partial<Guardian>) => {
    const updated = await guardianService.update(id, patch);
    setGuardians((prev) => prev.map((g) => (g.id === id ? updated : g)));
  };

  const removeGuardian = async (id: string) => {
    await guardianService.remove(id);
    setGuardians((prev) => prev.filter((g) => g.id !== id));
  };

  const value = useMemo(
    () => ({ guardians, isLoading, addGuardian, updateGuardian, removeGuardian }),
    [guardians, isLoading],
  );

  return <GuardianContext.Provider value={value}>{children}</GuardianContext.Provider>;
}

export function useGuardians() {
  const ctx = useContext(GuardianContext);
  if (!ctx) throw new Error('useGuardians must be used within GuardianProvider');
  return ctx;
}
