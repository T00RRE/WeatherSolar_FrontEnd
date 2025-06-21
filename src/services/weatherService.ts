interface WeatherData {
  averagePressure: number;
  averageSunExposure: number;
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_URL}/weather/forecast?latitude=${latitude}&longitude=${longitude}`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};