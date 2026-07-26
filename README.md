# Tether

**Predict. Protect. Preserve.**

Tether is a frontend-only, production-quality Progressive Web App (PWA) for an
AI-powered personal safety platform. It predicts risky moments, keeps
encrypted evidence and live location ready, and pulls a trusted "guardian
circle" in the instant it's needed — all backed by mock data and local state
until a real backend is connected.

---

## Table of contents

1. [Project overview](#project-overview)
2. [Tech stack](#tech-stack)
3. [Folder structure](#folder-structure)
4. [Installation](#installation)
5. [Running the app](#running-the-app)
6. [Building for production](#building-for-production)
7. [Enabling the PWA](#enabling-the-pwa)
8. [Environment variables](#environment-variables)
9. [Architecture](#architecture)
10. [Routes](#routes)
11. [State management](#state-management)
12. [Replacing fake login with Google OAuth](#replacing-fake-login-with-google-oauth)
13. [Connecting a FastAPI backend](#connecting-a-fastapi-backend)
14. [Connecting MongoDB](#connecting-mongodb)
15. [Replacing mock APIs](#replacing-mock-apis)
16. [Expected backend endpoints & API contracts](#expected-backend-endpoints--api-contracts)
17. [Design philosophy](#design-philosophy)
18. [Future improvements](#future-improvements)

---

## Project overview

Tether opens with an animated loading screen, moves to a marketing landing
page, then a login screen (Google or Guest — both are fake and always land on
the dashboard), and finally the dashboard itself: live map, risk score,
guardian circle, AI insights, quick actions, and an incident timeline. Every
button works against realistic mock data — nothing is a dead click.

There is **no backend** in this repository. Every service in `src/services`
is written against the API contract the real backend will eventually expose,
so wiring it up later is a matter of pointing `VITE_API_BASE_URL` at a real
server and removing the mock delay/resolve logic.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, using the new `@theme` token system)
- **React Router v7** for routing
- **Leaflet** + **React-Leaflet** + **OpenStreetMap** tiles for the live map
- **Framer Motion** for animation
- **React Icons** for iconography
- **Axios** for the (currently mocked) HTTP layer
- **Context API** for state management
- **vite-plugin-pwa** for installable, offline-ready PWA support

## Folder structure

```
tether/
├─ public/
│  ├─ favicon.svg
│  └─ icons/                 # PWA icons (192 / 512)
├─ src/
│  ├─ components/common/     # Button, Card, Modal, Loader, Toggle, TetherMark, SkyBackground
│  ├─ contexts/              # AuthContext, SettingsContext, GuardianContext, NotificationContext
│  ├─ features/              # Feature-based modules (see below)
│  │  ├─ landing/             # Marketing site: Hero, Features, HowItWorks, WhyTether, Screenshots, Testimonials, CTA, Footer
│  │  ├─ auth/                 # LoginPage
│  │  ├─ dashboard/            # DashboardLayout, Sidebar, TopNavbar, DashboardPage + all dashboard widgets
│  │  ├─ profile/               # ProfilePage
│  │  ├─ guardians/              # GuardiansPage (add / edit / delete)
│  │  ├─ emergency/                # EmergencyPage (the big button flow)
│  │  ├─ history/                   # HistoryPage
│  │  ├─ settings/                   # SettingsPage
│  │  ├─ map/                          # LiveMap (Leaflet)
│  │  └─ shared/                        # LoadingScreen, NotFoundPage
│  ├─ hooks/                  # useLiveLocation (geolocation + watchPosition)
│  ├─ routes/                 # ProtectedRoute
│  ├─ services/               # apiClient (Axios) + mock services per domain
│  ├─ styles/                 # index.css — design tokens, sky/cloud animation
│  ├─ types/                  # Shared TypeScript types
│  ├─ utils/                  # format.ts (time-ago, coordinates, initials)
│  ├─ App.tsx
│  └─ main.tsx
├─ .env.example
├─ vite.config.ts
└─ package.json
```

Every component lives in its own file; the app follows a **feature-based
architecture** rather than a type-based one (no giant shared `components/`
dumping ground for page-specific UI) — each feature folder is close to
self-contained.

## Installation

```bash
git clone <your-repo-url> tether
cd tether
npm install
```

## Running the app

```bash
npm run dev
```

Vite will start a dev server (default `http://localhost:5173`). Grant
location permission when prompted so the live map can center on you.

## Building for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check it
```

The build output is written to `dist/`.

## Deploying

Tether is a static site after build — deploy `dist/` to any static host:

- **Vercel / Netlify**: connect the repo, build command `npm run build`, output directory `dist`.
- **Static hosting (S3, GitHub Pages, Nginx, etc.)**: upload the contents of `dist/` as-is. Because this is a client-side-routed SPA, configure your host to rewrite unknown paths to `index.html`.

## Enabling the PWA

PWA support is already wired up via `vite-plugin-pwa` in `vite.config.ts` —
a manifest, service worker, and app icons are generated automatically on
`npm run build`. To customize:

- Edit the `manifest` block in `vite.config.ts` (name, colors, icons).
- Replace `public/icons/icon-192.png` and `public/icons/icon-512.png` with your own artwork (keep the same filenames/sizes, or update the manifest paths).
- `npm run dev` does **not** register the service worker by default; test PWA installability against `npm run build && npm run preview`.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base URL the Axios client (`src/services/apiClient.ts`) sends requests to. Leave unset while there's no backend — every service function will keep resolving from its own in-memory mock instead of actually calling this URL. | `/api` |

## Architecture

- **`services/apiClient.ts`** exports a configured Axios instance (base URL,
  timeout, auth header interceptor reading `tether_token` from
  `localStorage`) and a `mockDelay` helper that simulates network latency.
  Every mock service (`authService`, `guardianService`, `profileService`,
  `safetyService`) is written as if it were calling a real endpoint, so
  swapping the mock body for a real `apiClient.get/post/put/delete` call is a
  one-function change per endpoint.
- **`contexts/`** hold cross-cutting app state: the logged-in user, app
  settings, the guardian list, and toast notifications. Pages consume these
  via hooks (`useAuth`, `useSettings`, `useGuardians`, `useNotify`) instead of
  prop-drilling.
- **`features/`** is where almost all UI logic lives, grouped by the part of
  the product it belongs to — a page-per-feature rather than a
  components/pages split. This keeps everything a given feature needs (its
  widgets, its page, its page-specific logic) in one place.
- **`hooks/useLiveLocation.ts`** wraps the Geolocation API's
  `getCurrentPosition` + `watchPosition`, exposing `coords`, a `status`
  state machine (`idle | requesting | granted | denied | unavailable`), and a
  manual `refresh()` — the `LiveMap` component renders a different state per
  value instead of crashing on missing permissions.

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Landing | Public marketing page |
| `/login` | Login | Fake Google / Guest login, both redirect to `/dashboard` |
| `/dashboard` | Dashboard | Protected |
| `/profile` | Profile | Protected |
| `/guardians` | Guardians | Protected |
| `/emergency` | Emergency | Protected |
| `/history` | History | Protected |
| `/settings` | Settings | Protected |
| `*` | 404 | Catch-all |

Protected routes are wrapped in `<ProtectedRoute />`
(`src/routes/ProtectedRoute.tsx`), which redirects to `/login` if
`useAuth().isAuthenticated` is false.

## State management

Context API only — no Redux/Zustand, to keep the mental model simple for a
frontend this size:

- **AuthContext** — current user, login/logout, profile updates. User is
  cached in `localStorage` under `tether_user` so a refresh doesn't lose the
  fake session.
- **SettingsContext** — dark mode, notification toggles, privacy toggles,
  location accuracy, language. Persisted to `localStorage` under
  `tether_settings` and applied to `<html class="dark">` reactively.
- **GuardianContext** — the guardian list, backed by `guardianService`
  (in-memory array, resets on page reload — swap for real persistence once
  the backend exists).
- **NotificationContext** — a simple toast queue (`useNotify()`) used for
  "Guardian added", "Profile updated", validation warnings, etc.

## Replacing fake login with Google OAuth

1. Create an OAuth 2.0 Client ID in Google Cloud Console (Web application),
   and add your dev/prod origins to Authorized JavaScript origins.
2. Install a client library, e.g. `@react-oauth/google`, and wrap `<App />`
   with `<GoogleOAuthProvider clientId="...">`.
3. In `src/features/auth/LoginPage.tsx`, replace the `handleGoogle` handler:
   swap the fake button for `<GoogleLogin onSuccess={...} onError={...} />`,
   and send the returned credential to your backend's `POST /login` endpoint
   instead of calling `authService.loginWithGoogle()`.
4. Update `src/services/authService.ts` so `loginWithGoogle` posts the Google
   credential to `apiClient.post('/login', { credential })` and stores the
   real JWT/session token returned by your backend.
5. Everything downstream (AuthContext, ProtectedRoute) needs no changes — they
   only care about `user` and `isAuthenticated`.

## Connecting a FastAPI backend

1. Stand up your FastAPI service exposing the endpoints listed below.
2. Set `VITE_API_BASE_URL` in `.env` to your API's base URL (e.g.
   `http://localhost:8000/api`).
3. In each file under `src/services/`, replace the `mockDelay(...)` mock body
   with a real call through `apiClient`, e.g.:

   ```ts
   // Before (mock)
   async list(): Promise<Guardian[]> {
     return mockDelay([...guardians], 500);
   }

   // After (real backend)
   async list(): Promise<Guardian[]> {
     const { data } = await apiClient.get<Guardian[]>('/guardian');
     return data;
   }
   ```

4. Enable CORS on the FastAPI app for your frontend's origin during
   development.

## Connecting MongoDB

This frontend has no direct database dependency — MongoDB (or any store)
sits behind FastAPI. On the backend:

1. Use `motor` (async) or `pymongo` (sync) to connect to your MongoDB
   instance.
2. Model collections matching the shapes in `src/types/index.ts` (`User`,
   `Guardian`, `RiskScore`, `TimelineEvent`, `AlertRecord`, `SafePlace`).
3. Return documents shaped exactly like those TypeScript interfaces (or add a
   thin serializer) so the existing frontend types keep working unmodified.

## Replacing mock APIs

Every mock lives in `src/services/*.ts` and is intentionally written with a
comment block stating the exact future REST contract. To go live:

- Search the codebase for `mockDelay(` — each call site is a mock that needs
  a matching real `apiClient` call.
- No component imports mock data directly; everything goes through a
  service function, so this is the **only** place you need to touch.

## Expected backend endpoints & API contracts

```
POST   /login                    { credential } -> { token, user: User }
POST   /logout                   -> 204

GET    /profile                  -> User
PUT    /profile                  { ...partial User } -> User

POST   /guardian                 { name, relation, phone, email?, avatarColor } -> Guardian
GET    /guardian                 -> Guardian[]
DELETE /guardian/:id             -> 204

POST   /emergency                { lat, lng } -> AlertRecord
GET    /risk                     -> RiskScore
GET    /timeline                 -> TimelineEvent[]
GET    /safe-places               ?lat=&lng= -> SafePlace[]
POST   /upload                    multipart/form-data -> { url }
GET    /history                   -> TimelineEvent[]
```

See `src/types/index.ts` for the exact shape of every object referenced
above.

## Design philosophy

Tether's visual identity is deliberately **calm, human, and premium** rather
than a stereotypical "AI safety" look:

- **Palette** — a sky-blue and dusk-navy base with a muted safety-teal
  accent and soft warm neutrals; a muted coral (not neon red) marks
  emergencies. No neon, no glowing-brain blue.
- **Typography** — Fraunces (a warm display serif) for headings, Inter for
  body copy, JetBrains Mono for coordinates, timers, and the risk score.
- **Signature motif** — "the tether line": a single rope-like line running
  from an anchor point to a small dot, used in the logo, the loading screen,
  and conceptually throughout (a guardian is always one line away).
- **Motion** — a three-layer moving cloud background using pure CSS
  transforms (GPU-accelerated, `will-change: transform`), so it stays smooth
  without per-frame JavaScript work. `prefers-reduced-motion` is respected
  globally.

## Future improvements

- Replace in-memory guardian/profile state with real persistence once the
  backend exists.
- Add automated tests (Vitest + React Testing Library) for contexts and the
  emergency trigger flow.
- Code-split the dashboard/map bundle (Leaflet is the largest dependency) to
  shrink the initial JS payload.
- Real push notifications via the Push API once a backend can send them.
- Internationalize the copy fully (the language toggle currently only
  persists a preference, without translated strings).
