import { API_CONFIG } from '../../utils/constants';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function dla type checking
const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const isAbortError = (error: unknown): boolean => {
  return isError(error) && error.name === 'AbortError';
};

export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.status}`,
          response.status,
          response.statusText
        );
      }

      return response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      
      // Type guard - sprawdź czy to ApiError
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Type guard - sprawdź czy to AbortError
      if (isAbortError(error)) {
        throw new Error('Request timeout');
      }
      
      // Type guard - sprawdź czy to Error
      if (isError(error)) {
        throw new Error(`Network error: ${error.message}`);
      }
      
      // Fallback dla nieznanego typu błędu
      throw new Error(`Network error: ${String(error)}`);
    }
  }
}

export const apiClient = new ApiClient();