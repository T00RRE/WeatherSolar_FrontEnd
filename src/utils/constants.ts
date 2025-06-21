export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
} as const;

export const APP_CONFIG = {
  TITLE: import.meta.env.VITE_APP_TITLE || 'Weather Solar App',
  DEFAULT_LOCATION: {
    lat: Number(import.meta.env.VITE_DEFAULT_LAT) || 52.237049,
    lng: Number(import.meta.env.VITE_DEFAULT_LNG) || 21.017532,
  },
} as const;

export const SOLAR_CONFIG = {
  INSTALLATION_POWER: 2.5, // kW
  PANEL_EFFICIENCY: 0.2,
} as const;