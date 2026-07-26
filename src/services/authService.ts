import { mockDelay } from './apiClient';
import type { User } from '../types';

const MOCK_USER: User = {
  id: 'usr_001',
  name: 'Aanya Rao',
  email: 'aanya.rao@example.com',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  medicalNotes: 'No known allergies. Carries an inhaler for mild asthma.',
};

/**
 * BACKEND CONTRACT (future):
 *   POST /login   -> { token: string, user: User }
 *   POST /logout  -> 204
 * For now, any login method resolves instantly with a mock user + token.
 */
export const authService = {
  async loginWithGoogle(): Promise<{ token: string; user: User }> {
    const result = await mockDelay({ token: 'mock-google-token', user: MOCK_USER }, 700);
    localStorage.setItem('tether_token', result.token);
    return result;
  },

  async loginAsGuest(): Promise<{ token: string; user: User }> {
    const guest: User = { ...MOCK_USER, name: 'Guest User', email: 'guest@tether.app' };
    const result = await mockDelay({ token: 'mock-guest-token', user: guest }, 500);
    localStorage.setItem('tether_token', result.token);
    return result;
  },

  async logout(): Promise<void> {
    await mockDelay(undefined, 300);
    localStorage.removeItem('tether_token');
  },
};
