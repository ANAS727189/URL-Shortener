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
