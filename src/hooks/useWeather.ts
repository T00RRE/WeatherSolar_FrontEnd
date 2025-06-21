import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weather/weatherService';
import { WeatherForecastResponse, Location } from '../types/weather.types';

interface UseWeatherResult {
  weatherData: WeatherForecastResponse | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (location: Location) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useWeather = (initialLocation?: Location): UseWeatherResult => {
  const [weatherData, setWeatherData] = useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | undefined>(initialLocation);

  const fetchWeather = useCallback(async (location: Location) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentLocation(location);
      
      const data = await weatherService.getForecast(location.lat, location.lng);
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się pobrać danych pogodowych';
      setError(errorMessage);
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (currentLocation) {
      await fetchWeather(currentLocation);
    }
  }, [currentLocation, fetchWeather]);

  useEffect(() => {
    if (initialLocation) {
      fetchWeather(initialLocation);
    }
  }, [initialLocation, fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    refetch,
  };
};