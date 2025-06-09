
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
