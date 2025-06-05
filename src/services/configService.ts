
export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  endpoints: {
    dashboard: string;
    metrics: string;
  };
}

export interface ResponseMapping {
  metricsPath: string;
  titleField: string;
  valueField: string;
  changeField: string;
  subtitleField: string;
}

export interface CustomTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
}

export class ConfigService {
  private static readonly STORAGE_KEYS = {
    API_CONFIG: 'dashboard_api_config',
    RESPONSE_MAPPING: 'dashboard_response_mapping',
    CUSTOM_THEME: 'dashboard_custom_theme'
  };

  static saveApiConfig(config: ApiConfig): void {
    localStorage.setItem(this.STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
  }

  static getApiConfig(): ApiConfig | null {
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
}
