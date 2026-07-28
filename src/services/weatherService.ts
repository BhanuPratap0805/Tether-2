export interface WeatherData {
  temp: number;
  condition: string;
  isRaining: boolean;
  precipitation: number;
  summary: string;
  isDay: boolean;
}

const WMO_CODE_MAP: Record<number, { condition: string; isRaining: boolean }> = {
  0: { condition: 'Clear Sky', isRaining: false },
  1: { condition: 'Mainly Clear', isRaining: false },
  2: { condition: 'Partly Cloudy', isRaining: false },
  3: { condition: 'Overcast', isRaining: false },
  45: { condition: 'Foggy', isRaining: false },
  48: { condition: 'Depositing Rime Fog', isRaining: false },
  51: { condition: 'Light Drizzle', isRaining: true },
  53: { condition: 'Moderate Drizzle', isRaining: true },
  55: { condition: 'Dense Drizzle', isRaining: true },
  56: { condition: 'Light Freezing Drizzle', isRaining: true },
  57: { condition: 'Dense Freezing Drizzle', isRaining: true },
  61: { condition: 'Slight Rain', isRaining: true },
  63: { condition: 'Moderate Rain', isRaining: true },
  65: { condition: 'Heavy Rain', isRaining: true },
  66: { condition: 'Light Freezing Rain', isRaining: true },
  67: { condition: 'Heavy Freezing Rain', isRaining: true },
  71: { condition: 'Slight Snow', isRaining: false },
  73: { condition: 'Moderate Snow', isRaining: false },
  75: { condition: 'Heavy Snow', isRaining: false },
  77: { condition: 'Snow Grains', isRaining: false },
  80: { condition: 'Slight Rain Showers', isRaining: true },
  81: { condition: 'Moderate Rain Showers', isRaining: true },
  82: { condition: 'Violent Rain Showers', isRaining: true },
  85: { condition: 'Slight Snow Showers', isRaining: false },
  86: { condition: 'Heavy Snow Showers', isRaining: false },
  95: { condition: 'Thunderstorm', isRaining: true },
  96: { condition: 'Thunderstorm with Slight Hail', isRaining: true },
  99: { condition: 'Thunderstorm with Heavy Hail', isRaining: true },
};

/**
 * Fetches real-time hyper-local weather using Open-Meteo API (100% free, no key required).
 */
export async function fetchCurrentWeather(lat = 28.4595, lng = 77.0266): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=weather_code,temperature_2m,precipitation,rain,showers,is_day`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather HTTP ${res.status}`);
    const data = await res.json();
    
    const current = data.current || {};
    const code = current.weather_code ?? 0;
    const info = WMO_CODE_MAP[code] || { condition: 'Unknown Weather', isRaining: false };
    const precip = (current.precipitation ?? 0) + (current.rain ?? 0) + (current.showers ?? 0);
    const isRaining = info.isRaining || precip > 0;
    const temp = Math.round(current.temperature_2m ?? 25);
    const isDay = current.is_day === 1;

    let summary = `${info.condition}, ${temp}°C`;
    if (isRaining) {
      summary = `Raining (${info.condition}), ${temp}°C, Precipitation: ${precip.toFixed(1)}mm`;
    }

    return {
      temp,
      condition: info.condition,
      isRaining,
      precipitation: precip,
      summary,
      isDay,
    };
  } catch (err) {
    console.warn('Weather fetch failed, using fallback:', err);
    return {
      temp: 24,
      condition: 'Clear',
      isRaining: false,
      precipitation: 0,
      summary: 'Clear, 24°C',
      isDay: true,
    };
  }
}
