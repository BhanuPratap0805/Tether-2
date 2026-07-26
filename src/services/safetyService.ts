import { mockDelay } from './apiClient';
import type { AIInsight, AlertRecord, Coordinates, RiskScore, SafePlace, TimelineEvent } from '../types';

/** GET /risk */
export async function fetchRiskScore(): Promise<RiskScore> {
  return mockDelay(
    {
      score: 24,
      level: 'low',
      factors: ['Well-lit route detected', 'Familiar neighbourhood', 'No unusual movement patterns'],
      updatedAt: new Date().toISOString(),
    },
    550,
  );
}

/** GET /timeline */
export async function fetchTimeline(): Promise<TimelineEvent[]> {
  const now = Date.now();
  return mockDelay(
    [
      { id: 't1', type: 'system', title: 'Tether activated', description: 'Live protection turned on for your evening commute.', timestamp: new Date(now - 1000 * 60 * 62).toISOString() },
      { id: 't2', type: 'location', title: 'Location checkpoint', description: 'Arrived near Cyber Hub, Gurugram — matches your usual route.', timestamp: new Date(now - 1000 * 60 * 48).toISOString() },
      { id: 't3', type: 'ai', title: 'AI check-in', description: 'Walking pace and route look consistent with past trips. No action needed.', timestamp: new Date(now - 1000 * 60 * 30).toISOString() },
      { id: 't4', type: 'guardian', title: 'Guardian notified', description: 'Meera Nair received your scheduled check-in update.', timestamp: new Date(now - 1000 * 60 * 12).toISOString() },
    ],
    600,
  );
}

/** GET /safe-places */
export async function fetchSafePlaces(origin?: Coordinates): Promise<SafePlace[]> {
  const lat = origin?.lat ?? 28.4595;
  const lng = origin?.lng ?? 77.0266;
  return mockDelay(
    [
      { id: 's1', name: 'Sector 29 Police Post', type: 'police', distanceKm: 0.6, lat: lat + 0.004, lng: lng + 0.003 },
      { id: 's2', name: 'Artemis Hospital', type: 'hospital', distanceKm: 1.2, lat: lat - 0.006, lng: lng + 0.008 },
      { id: 's3', name: '24x7 Metro Store', type: 'store', distanceKm: 0.3, lat: lat + 0.001, lng: lng - 0.004 },
      { id: 's4', name: "Kabir's place (guardian)", type: 'friend', distanceKm: 2.1, lat: lat - 0.012, lng: lng - 0.01 },
    ],
    500,
  );
}

/** Rotating reassuring / advisory AI insights shown on the dashboard. */
export async function fetchAIInsights(): Promise<AIInsight[]> {
  return mockDelay(
    [
      { id: 'ai1', tone: 'reassuring', message: 'Your evening route has been steady for the last 3 weeks. Everything looks normal tonight.', createdAt: new Date().toISOString() },
      { id: 'ai2', tone: 'advisory', message: 'Rain is expected after 9 PM — visibility on your usual path may drop. Consider the lit route via MG Road.', createdAt: new Date().toISOString() },
    ],
    500,
  );
}

/** POST /emergency — pretends an alert was sent to guardians with live location. */
export async function triggerEmergencyAlert(location: Coordinates): Promise<AlertRecord> {
  return mockDelay(
    {
      id: `alert_${Date.now()}`,
      status: 'sent',
      location: { lat: location.lat, lng: location.lng },
      triggeredAt: new Date().toISOString(),
      guardiansNotified: ['Meera Nair', 'Kabir Singh', 'Dr. Priya Menon'],
    },
    1400,
  );
}

/** GET /history */
export async function fetchHistory(): Promise<TimelineEvent[]> {
  const now = Date.now();
  return mockDelay(
    [
      { id: 'h1', type: 'alert', title: 'Emergency alert resolved', description: 'Alert triggered near Sector 18 was marked safe by you after 4 minutes.', timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString() },
      { id: 'h2', type: 'guardian', title: 'Guardian added', description: 'Dr. Priya Menon was added as a trusted guardian.', timestamp: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString() },
      { id: 'h3', type: 'location', title: 'Late-night trip completed', description: 'Live tracking ran for 38 minutes with no risk flags.', timestamp: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString() },
      { id: 'h4', type: 'ai', title: 'Risk model updated', description: 'AI recalibrated your baseline routes after 2 weeks of activity.', timestamp: new Date(now - 1000 * 60 * 60 * 24 * 12).toISOString() },
    ],
    550,
  );
}
