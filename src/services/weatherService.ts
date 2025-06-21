interface WeatherData {
  averagePressure: number;
  averageSunExposure: number;  // ← To jest OK
  minTemperature: number;
  maxTemperature: number;
  weatherSummary: string;
  dailyForecasts: Array<{
    date: string;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    solarEnergy: number;
  }>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'; // ← Dodałem fallback
if (!API_URL) throw new Error('VITE_API_URL not configured');

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_URL}/weather/forecast?latitude=${latitude}&longitude=${longitude}`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log('API Response:', data); // ← Dodaj dla debugowania
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};