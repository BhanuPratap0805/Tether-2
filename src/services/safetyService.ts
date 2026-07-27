import Groq from 'groq-sdk';
import { mockDelay } from './apiClient';
import type { AIInsight, AlertRecord, Coordinates, RiskScore, SafePlace, TimelineEvent } from '../types';

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY || 'fake', dangerouslyAllowBrowser: true });
const hasApiKey = Boolean(import.meta.env.VITE_GROQ_API_KEY);

export interface RiskContext {
  location?: Coordinates;
  timeOfDay?: string;
  currentSpeed?: number; // km/h
  isOnUsualRoute?: boolean;
  batteryLevel?: number;
  recentStops?: number; // sudden stops detected
}

/** GET /risk */
export async function fetchRiskScore(contextData: RiskContext = {}): Promise<RiskScore> {
  const fallbackScore: RiskScore = {
    score: 50,
    level: 'moderate',
    factors: ['AI Prediction Unavailable', 'Please check Gemini API Key'],
    updatedAt: new Date().toISOString(),
  };

  if (!hasApiKey) return fallbackScore;

  try {

    // 2. The "Judge-Winning" Prompt
    const prompt = `You are an expert personal safety AI analyst. Your job is to assess the real-world risk level of a user based on contextual telemetry.

### RULES FOR ASSESSMENT:
1. TIME CONTEXT: 10 PM - 5 AM is inherently higher risk than daytime, UNLESS the context indicates a known 24/7 safe zone (e.g., major hospital, 24/7 transit hub, police station).
2. MOVEMENT CONTEXT: Steady movement is low risk. Sudden stops, erratic speed changes, or moving into isolated/unmapped areas increase risk.
3. LOCATION CONTEXT: If coordinates are provided, use your general knowledge of the area (if recognizable) to assess isolation. If unknown, base the risk purely on time and movement patterns.
4. DO NOT HALLUCINATE: Do not invent weather conditions, lighting, or specific events unless explicitly provided in the "Telemetry" context. Be grounded and realistic.

### CONTEXT DATA:
- Time: ${new Date().toLocaleTimeString()}
- Location: ${JSON.stringify(contextData?.location || 'Unknown')}
- Telemetry: ${JSON.stringify(contextData || {})}

### OUTPUT FORMAT:
Return ONLY valid JSON matching this schema:
{
  "score": <integer 0-100>,
  "level": "<low | moderate | elevated | high>",
  "factors": ["<concise, realistic reason 1>", "<concise, realistic reason 2>"]
}
Ensure the 'level' strictly matches the 'score' (0-25: low, 26-50: moderate, 51-75: elevated, 76-100: high).`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.1, // Keep it deterministic
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return fallbackScore;
    const parsed = JSON.parse(content);
    return { ...parsed, updatedAt: new Date().toISOString() };
  } catch (error) {
    console.error('Groq API error (RiskScore):', error);
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
Other: ${JSON.stringify(contextData || {})}

Return ONLY a JSON object with a single "insights" array. Each item must have:
- "tone": either "reassuring", "advisory", or "urgent"
- "message": A short 1-2 sentence personalized insight
Example: { "insights": [{ "tone": "advisory", "message": "..." }] }`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return fallbackInsights;
    const parsed = JSON.parse(content) as { insights: Omit<AIInsight, 'id' | 'createdAt'>[] };
    
    return parsed.insights.map((item, i) => ({
      ...item,
      id: `ai_${Date.now()}_${i}`,
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Groq API error (AIInsights):', error);
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
