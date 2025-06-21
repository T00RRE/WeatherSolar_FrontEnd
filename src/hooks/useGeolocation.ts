import { useState, useCallback } from 'react';
import { Location } from '../types/weather.types';

interface UseGeolocationResult {
  getCurrentLocation: () => Promise<Location>;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = (): UseGeolocationResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback((): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported by this browser';
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLoading(false);
          let errorMessage = 'Nie udało się pobrać lokalizacji';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Dostęp do lokalizacji został odrzucony';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Lokalizacja jest niedostępna';
              break;
            case error.TIMEOUT:
              errorMessage = 'Przekroczono czas oczekiwania na lokalizację';
              break;
          }
          
          setError(errorMessage);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, []);

  return {
    getCurrentLocation,
    loading,
    error,
  };
};