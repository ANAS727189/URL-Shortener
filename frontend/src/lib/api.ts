export interface ShortenRequest {
  url: string;
  short?: string;
  expiry?: number;
}

export interface ShortenResponse {
  url: string;
  short: string;
  expiry: number;
  rate_limit: number;
  rate_limit_reset: number;
}

export interface ApiError {
  error: string;
  rate_limit_reset?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  async shortenURL(url: string, custom?: string, expiry?: number): Promise<ShortenResponse> {
    const requestBody: ShortenRequest = {
      url,
      ...(custom && { short: custom }),
      ...(expiry && { expiry })
    };

    const response = await fetch(`${this.baseUrl}/api/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      
      // Handling specific error cases
      if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Try again in ${errorData.rate_limit_reset} minutes.`);
      } else if (response.status === 409) {
        throw new Error('This custom alias is already taken. Please choose another one.');
      } else if (response.status === 400) {
        if (errorData.error.includes('Invalid URL')) {
          throw new Error('Please enter a valid URL starting with http:// or https://');
        } else if (errorData.error.includes('Invalid domain')) {
          throw new Error('Cannot shorten URLs from this domain');
        } else {
          throw new Error(errorData.error || 'Invalid request format');
        }
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(errorData.error || `HTTP ${response.status}: Request failed`);
      }
    }

    const data: ShortenResponse = await response.json();
    return data;
  }

  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error('Backend service unavailable');
    }
  }

  async validateUrl(url: string): Promise<boolean> {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Backward compatibility
export const shortenURL = apiClient.shortenURL.bind(apiClient);