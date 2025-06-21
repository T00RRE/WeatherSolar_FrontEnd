import React, { useState } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle, 
  CloudLightning, 
  CloudFog, 
  CloudHail, 
  Cloudy, 
  Compass
} from 'lucide-react';

import { useWeather } from '../../../hooks/useWeather';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { APP_CONFIG } from '../../../utils/constants';
import { Location, WeatherIconConfig } from '../../../types/weather.types';

import ThemeToggle from '../../common/ThemeToggle';
import LoadingSpinner from '../../common/LoadingSpinner';
import Footer from '../Footer/Footer';
import LocationMap from '../../map/LocationMap/LocationMap';

const getWeatherIcon = (weatherCode: number): WeatherIconConfig => {
  switch (true) {
    case weatherCode === 0:
      return { icon: Sun, color: 'text-yellow-500' };
    case weatherCode <= 3:
      return { icon: Cloudy, color: 'text-gray-400' };
    case weatherCode <= 48:
      return { icon: CloudFog, color: 'text-gray-400' };
    case weatherCode <= 55:
      return { icon: CloudDrizzle, color: 'text-blue-400' };
    case weatherCode <= 65:
      return { icon: CloudRain, color: 'text-blue-500' };
    case weatherCode <= 77:
      return { icon: CloudSnow, color: 'text-blue-300' };
    case weatherCode <= 82:
      return { icon: CloudRain, color: 'text-blue-600' };
    case weatherCode <= 86:
      return { icon: CloudSnow, color: 'text-blue-400' };
    case weatherCode === 95:
      return { icon: CloudLightning, color: 'text-yellow-600' };
    case weatherCode >= 96:
      return { icon: CloudHail, color: 'text-gray-600' };
    default:
      return { icon: Cloud, color: 'text-gray-400' };
  }
};

const WeatherDashboard: React.FC = () => {
  const [location, setLocation] = useState<Location>(APP_CONFIG.DEFAULT_LOCATION);
  
  const { weatherData, loading, error, fetchWeather } = useWeather(location);
  const { getCurrentLocation, loading: locationLoading, error: locationError } = useGeolocation();

  const handleLocationSelect = (lat: number, lng: number) => {
    const newLocation = { lat, lng };
    setLocation(newLocation);
    fetchWeather(newLocation);
  };

  const handleGetCurrentLocation = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      fetchWeather(currentLocation);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Pobieranie danych pogodowych..." />
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-600 dark:text-red-400 mb-4 text-lg">
            {error}
          </div>
          <button 
            onClick={() => fetchWeather(location)} 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {APP_CONFIG.TITLE}
            </h1>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600 dark:text-gray-400">
              Współrzędne: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
            <button
              onClick={handleGetCurrentLocation}
              disabled={locationLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {locationLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Compass size={20} />
              )}
              {locationLoading ? 'Lokalizuję...' : 'Pobierz moją lokalizację'}
            </button>
          </div>
          {locationError && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">
              {locationError}
            </p>
          )}
        </header>

        {/* Map Component */}
        <div className="mb-8">
          <LocationMap 
            onLocationSelect={handleLocationSelect}
            initialPosition={[location.lat, location.lng]}
          />
        </div>

        {/* Loading state for weather update */}
        {loading && (
          <div className="mb-4">
            <LoadingSpinner size="sm" message="Aktualizowanie prognozy..." />
          </div>
        )}

        {/* Daily Forecast */}
        {weatherData && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Prognoza 7-dniowa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weatherData.dailyForecasts.map((day) => {
                const { icon: WeatherIcon, color } = getWeatherIcon(day.weatherCode);
                
                return (
                  <div 
                    key={day.date} 
                    className="text-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <div className="text-gray-600 dark:text-gray-400 mb-2">
                      {new Date(day.date).toLocaleDateString('pl-PL', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </div>
                    <WeatherIcon className={`h-8 w-8 mx-auto ${color} mb-2`} />
                    <div className="font-medium text-gray-900 dark:text-white">
                      {day.maxTemperature.toFixed(1)}°C
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {day.minTemperature.toFixed(1)}°C
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-yellow-600 dark:text-yellow-500 font-medium">
                        {day.solarEnergy.toFixed(1)} kWh
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        energia słoneczna
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        {weatherData && <Footer weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default WeatherDashboard;