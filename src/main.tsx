import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

if (!googleClientId) {
  console.warn(
    '[Tether] VITE_GOOGLE_CLIENT_ID is not set. ' +
      'Copy .env.example to .env and add your Google OAuth Client ID. ' +
      'Guest login still works without it.',
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId || 'dummy_client_id'}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);

