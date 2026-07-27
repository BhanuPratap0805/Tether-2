import { GoogleGenAI, Type } from '@google/genai';
import { mockDelay } from './apiClient';
import type { AIInsight, AlertRecord, Coordinates, RiskScore, SafePlace, TimelineEvent } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'fake' });
const hasApiKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY);

/** GET /risk */
export async function fetchRiskScore(contextData?: Record<string, any>): Promise<RiskScore> {
  const fallbackScore: RiskScore = {
    score: 50,
    level: 'moderate',
    factors: ['AI Prediction Unavailable', 'Please check Gemini API Key'],
    updatedAt: new Date().toISOString(),
  };

  if (!hasApiKey) return fallbackScore;

  try {
    const prompt = `You are a personal safety AI. Analyze the current context and generate a risk score.
Context:
Time: ${new Date().toLocaleTimeString()}
Location (if any): ${JSON.stringify(contextData?.location || 'Unknown')}
Other: ${JSON.stringify(contextData || {})}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: '0 to 100 representing danger level' },
            level: { type: Type.STRING, enum: ['low', 'moderate', 'elevated', 'high'] },
            factors: { type: Type.ARRAY, items: { type: Type.STRING }, description: '2 to 3 factors explaining the score' },
          },
          required: ['score', 'level', 'factors'],
        },
      },
    });

    if (!response.text) return fallbackScore;
    const parsed = JSON.parse(response.text);
    return { ...parsed, updatedAt: new Date().toISOString() };
  } catch (error) {
    console.error('Gemini API error (RiskScore):', error);
    return fallbackScore;
  }
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
export async function fetchAIInsights(contextData?: Record<string, any>): Promise<AIInsight[]> {
  const fallbackInsights: AIInsight[] = [
    { id: 'ai_err_1', tone: 'urgent', message: 'AI insights are currently unavailable. Please check your Gemini API connection.', createdAt: new Date().toISOString() },
  ];

  if (!hasApiKey) return fallbackInsights;

  try {
    const prompt = `You are a personal safety AI. Generate 2 personalized safety insights for a user based on their context. Make one reassuring and one advisory.
Context:
Time: ${new Date().toLocaleTimeString()}
Location (if any): ${JSON.stringify(contextData?.location || 'Unknown')}
Other: ${JSON.stringify(contextData || {})}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tone: { type: Type.STRING, enum: ['reassuring', 'advisory', 'urgent'] },
              message: { type: Type.STRING, description: 'A short 1-2 sentence personalized insight' },
            },
            required: ['tone', 'message'],
          },
        },
      },
    });

    if (!response.text) return fallbackInsights;
    const parsed = JSON.parse(response.text) as Omit<AIInsight, 'id' | 'createdAt'>[];
    return parsed.map((item, i) => ({
      ...item,
      id: `ai_${Date.now()}_${i}`,
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Gemini API error (AIInsights):', error);
    return fallbackInsights;
  }
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
