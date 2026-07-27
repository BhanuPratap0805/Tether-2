import { mockDelay } from './apiClient';
import type { User } from '../types';

/**
 * Decodes the payload of a Google ID token (JWT) without verifying the
 * signature — Google's Identity Services SDK already verified it before
 * handing us the credential. We just need the user-info claims.
 */
function decodeGoogleCredential(credential: string): {
  sub: string;
  name: string;
  email: string;
  picture?: string;
} {
  const [, payload] = credential.split('.');
  // Base64url → Base64 → JSON (with unicode support)
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(json) as { sub: string; name: string; email: string; picture?: string };
}

/**
 * BACKEND CONTRACT (future):
 *   POST /login   { credential } -> { token: string, user: User }
 *   POST /logout  -> 204
 *
 * To switch to a real backend, replace the body of loginWithGoogle() with:
 *   const { data } = await apiClient.post<{ token: string; user: User }>('/login', { credential });
 *   localStorage.setItem('tether_token', data.token);
 *   return data;
 */
export const authService = {
  /**
   * Accepts the real Google ID-token credential from @react-oauth/google,
   * decodes it client-side, and builds a User from the Google claims.
   * The credential itself is stored as the session token until a real backend exists.
   */
  async loginWithGoogle(credential: string): Promise<{ token: string; user: User }> {
    const claims = decodeGoogleCredential(credential);
    const user: User = {
      id: claims.sub,               // Google's stable unique user ID
      name: claims.name,
      email: claims.email,
      avatarUrl: claims.picture,    // Google profile photo URL
    };
    localStorage.setItem('tether_token', credential);
    return { token: credential, user };
  },

  async loginAsGuest(): Promise<{ token: string; user: User }> {
    const guest: User = {
      id: 'guest_000',
      name: 'Guest User',
      email: 'guest@tether.app',
    };
    const result = await mockDelay({ token: 'mock-guest-token', user: guest }, 500);
    localStorage.setItem('tether_token', result.token);
    return result;
  },

  async logout(): Promise<void> {
    await mockDelay(undefined, 300);
    localStorage.removeItem('tether_token');
  },
};
