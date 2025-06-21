import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGeolocation } from './useGeolocation';

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};

// Ustaw mock dla geolocation
Object.defineProperty(navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useGeolocation());
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.getCurrentLocation).toBe('function');
  });

  it('successfully gets current location', async () => {
    const mockPosition = {
      coords: {
        latitude: 52.237049,
        longitude: 21.017532,
      },
    };

    // Mock successful geolocation
    mockGeolocation.getCurrentPosition.mockImplementation((successCallback: any) => {
      successCallback(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    let locationResult;
    await act(async () => {
      locationResult = await result.current.getCurrentLocation();
    });

    expect(locationResult).toEqual({
      lat: 52.237049,
      lng: 21.017532,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles geolocation error', async () => {
  const mockError = {
    code: 1, // PERMISSION_DENIED
    message: 'Permission denied',
  };

  // Mock failed geolocation
  mockGeolocation.getCurrentPosition.mockImplementation((successCallback: any, errorCallback: any) => {
    errorCallback(mockError);
  });

  const { result } = renderHook(() => useGeolocation());

  await act(async () => {
    try {
      await result.current.getCurrentLocation();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      // Zmień na rzeczywisty komunikat błędu
      expect((error as Error).message).toBe('Nie udało się pobrać lokalizacji');
    }
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe('Nie udało się pobrać lokalizacji');
});

  it('handles unsupported geolocation', async () => {
    // Temporarily remove geolocation
    const originalGeolocation = navigator.geolocation;
    (navigator as any).geolocation = undefined;

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      try {
        await result.current.getCurrentLocation();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Geolocation is not supported by this browser');
      }
    });

    // Restore geolocation
    (navigator as any).geolocation = originalGeolocation;
  });
});