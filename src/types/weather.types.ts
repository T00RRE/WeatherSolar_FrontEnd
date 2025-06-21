export interface DailyWeather {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  solarEnergy: number;
  daylightHours?: number;
}

export interface WeatherForecastResponse {
  dailyForecasts: DailyWeather[];
  averagePressure: number;
  averageSunExposure: number;
  minTemperature: number;
  maxTemperature: number;
  weatherSummary: string;
}

export interface WeeklySummaryResponse {
  averagePressure: number;
  averageSunExposure: number;
  minTemperature: number;
  maxTemperature: number;
  weatherDescription: string;
  weatherSummary: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface WeatherIconConfig {
  icon: React.ComponentType<any>;
  color: string;
}