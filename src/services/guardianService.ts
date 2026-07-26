import { mockDelay } from './apiClient';
import type { Guardian } from '../types';

let guardians: Guardian[] = [
  { id: 'g_1', name: 'Meera Nair', relation: 'Mother', phone: '+91 98110 22334', avatarColor: '#4FA89B', isPrimary: true },
  { id: 'g_2', name: 'Kabir Singh', relation: 'Roommate', phone: '+91 99887 11223', avatarColor: '#5C8FB4' },
  { id: 'g_3', name: 'Dr. Priya Menon', relation: 'Family friend', phone: '+91 90123 45678', avatarColor: '#D97D6C' },
];

/**
 * BACKEND CONTRACT (future):
 *   GET    /guardian       -> Guardian[]
 *   POST   /guardian       -> Guardian
 *   PUT    /guardian/:id   -> Guardian
 *   DELETE /guardian/:id   -> 204
 */
export const guardianService = {
  async list(): Promise<Guardian[]> {
    return mockDelay([...guardians], 500);
  },
  async add(guardian: Omit<Guardian, 'id'>): Promise<Guardian> {
    const created: Guardian = { ...guardian, id: `g_${Date.now()}` };
    guardians = [...guardians, created];
    return mockDelay(created, 400);
  },
  async update(id: string, patch: Partial<Guardian>): Promise<Guardian> {
    guardians = guardians.map((g) => (g.id === id ? { ...g, ...patch } : g));
    const updated = guardians.find((g) => g.id === id)!;
    return mockDelay(updated, 400);
  },
  async remove(id: string): Promise<void> {
    guardians = guardians.filter((g) => g.id !== id);
    return mockDelay(undefined, 350);
  },
};
