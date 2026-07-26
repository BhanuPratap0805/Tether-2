import { mockDelay } from './apiClient';
import type { User } from '../types';

/**
 * BACKEND CONTRACT (future):
 *   GET  /profile        -> User
 *   PUT  /profile        -> User
 *   POST /upload          -> { url: string }   (e.g. avatar image)
 */
export const profileService = {
  async update(current: User, patch: Partial<User>): Promise<User> {
    const updated = { ...current, ...patch };
    return mockDelay(updated, 450);
  },
  async uploadAvatar(file: File): Promise<{ url: string }> {
    const url = URL.createObjectURL(file);
    return mockDelay({ url }, 500);
  },
};
