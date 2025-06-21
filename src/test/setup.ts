import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock dla Leaflet (problemy z DOM w testach)
Object.defineProperty(window, 'L', {
  value: {
    icon: () => ({}),
    Marker: {
      prototype: {
        options: {
          icon: {}
        }
      }
    }
  }
});

// Mock dla geolocation
Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: vi.fn((success) => {
      success({
        coords: {
          latitude: 52.237049,
          longitude: 21.017532
        }
      });
    }),
  },
  writable: true,
});

// Mock dla matchMedia (używane w ThemeContext)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock dla localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});