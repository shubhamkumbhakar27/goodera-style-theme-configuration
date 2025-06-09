
import { ApiConfig, ResponseMapping, CustomTheme } from '../types/configTypes';

export class ConfigService {
  private static readonly STORAGE_KEYS = {
    API_CONFIG: 'dashboard_api_config',
    RESPONSE_MAPPING: 'dashboard_response_mapping',
    CUSTOM_THEME: 'dashboard_custom_theme'
  };

  // Environment variable helpers for hybrid approach
  private static getEnvVariable(key: string): string | undefined {
    return import.meta.env[key];
  }

  static saveApiConfig(config: ApiConfig): void {
    localStorage.setItem(this.STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
  }

  static getApiConfig(): ApiConfig | null {
    // Hybrid approach: Try environment variables first, then localStorage
    const envBaseUrl = this.getEnvVariable('VITE_API_BASE_URL');
    const envApiKey = this.getEnvVariable('VITE_API_KEY');
    
    if (envBaseUrl && envApiKey) {
      return {
        baseUrl: envBaseUrl,
        apiKey: envApiKey,
        endpoints: {
          dashboard: this.getEnvVariable('VITE_DASHBOARD_ENDPOINT') || '/dashboard',
          metrics: this.getEnvVariable('VITE_METRICS_ENDPOINT') || '/metrics'
        }
      };
    }

    // Fallback to localStorage
    const stored = localStorage.getItem(this.STORAGE_KEYS.API_CONFIG);
    return stored ? JSON.parse(stored) : null;
  }

  static saveResponseMapping(mapping: ResponseMapping): void {
    localStorage.setItem(this.STORAGE_KEYS.RESPONSE_MAPPING, JSON.stringify(mapping));
  }

  static getResponseMapping(): ResponseMapping | null {
    const stored = localStorage.getItem(this.STORAGE_KEYS.RESPONSE_MAPPING);
    return stored ? JSON.parse(stored) : null;
  }

  static saveCustomTheme(theme: CustomTheme): void {
    localStorage.setItem(this.STORAGE_KEYS.CUSTOM_THEME, JSON.stringify(theme));
  }

  static getCustomTheme(): CustomTheme | null {
    const stored = localStorage.getItem(this.STORAGE_KEYS.CUSTOM_THEME);
    return stored ? JSON.parse(stored) : null;
  }

  static clearAllConfig(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Utility to check if using environment variables
  static isUsingEnvironmentVariables(): boolean {
    return !!(this.getEnvVariable('VITE_API_BASE_URL') && this.getEnvVariable('VITE_API_KEY'));
  }
}
