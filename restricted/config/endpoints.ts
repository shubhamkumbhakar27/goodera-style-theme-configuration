
export const API_ENDPOINTS = {
  DASHBOARD: '/api/dashboard',
  METRICS: '/api/metrics',
  VOLUNTEERS: '/api/volunteers',
  EVENTS: '/api/events',
  REPORTS: '/api/reports'
};

export const EXTERNAL_APIS = {
  USER_SERVICE: 'https://randomuser.me/api/',
  ANALYTICS: '/api/analytics'
};

// Environment variable mappings for production
export const ENV_MAPPINGS = {
  API_BASE_URL: 'VITE_API_BASE_URL',
  API_KEY: 'VITE_API_KEY',
  DASHBOARD_ENDPOINT: 'VITE_DASHBOARD_ENDPOINT',
  METRICS_ENDPOINT: 'VITE_METRICS_ENDPOINT'
};
