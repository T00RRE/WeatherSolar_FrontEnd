// src/services/weatherService.ts

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

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/weather/forecast?latitude=${latitude}&longitude=${longitude}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};