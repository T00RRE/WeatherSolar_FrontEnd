import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle, 
  CloudLightning, 
  CloudFog, 
  CloudHail, 
  Cloudy 
} from 'lucide-react';
import { WeatherIconConfig } from '../../../types/weather.types';

export const getWeatherIcon = (weatherCode: number): WeatherIconConfig => {
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
