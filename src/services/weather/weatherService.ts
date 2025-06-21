import { apiClient } from '../api/apiClient';
import { WeatherForecastResponse, WeeklySummaryResponse } from '../../types/weather.types';

export class WeatherService {
  async getForecast(latitude: number, longitude: number): Promise<WeatherForecastResponse> {
    if (!this.isValidCoordinate(latitude, -90, 90)) {
      throw new Error('Invalid latitude: must be between -90 and 90');
    }
    
    if (!this.isValidCoordinate(longitude, -180, 180)) {
      throw new Error('Invalid longitude: must be between -180 and 180');
    }

    return apiClient.get<WeatherForecastResponse>('/weather/forecast', {
      latitude,
      longitude
    });
  }

  async getWeeklySummary(latitude: number, longitude: number): Promise<WeeklySummaryResponse> {
    return apiClient.get<WeeklySummaryResponse>('/weather/summary', {
      latitude,
      longitude
    });
  }

  private isValidCoordinate(value: number, min: number, max: number): boolean {
    return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
  }
}

export const weatherService = new WeatherService();