import { WeatherForecastResponse } from '../../types/weather.types';

export const mockWeatherData: WeatherForecastResponse = {
  dailyForecasts: [
    {
      date: '2024-01-01',
      weatherCode: 3,
      minTemperature: 10.5,
      maxTemperature: 20.5,
      solarEnergy: 8.0,
      daylightHours: 12.5
    },
    {
      date: '2024-01-02',
      weatherCode: 1,
      minTemperature: 12.0,
      maxTemperature: 22.0,
      solarEnergy: 7.5,
      daylightHours: 12.0
    }
  ],
  averagePressure: 1013.25,
  averageSunExposure: 7.75,
  minTemperature: 10.5,
  maxTemperature: 22.0,
  weatherSummary: 'Przeważnie bez opadów'
};

export const createMockWeatherService = () => ({
  getForecast: vi.fn().mockResolvedValue(mockWeatherData),
  getWeeklySummary: vi.fn().mockResolvedValue({
    averagePressure: 1013.25,
    averageSunExposure: 7.75,
    minTemperature: 10.5,
    maxTemperature: 22.0,
    weatherDescription: 'Test description',
    weatherSummary: 'Przeważnie bez opadów'
  })
});