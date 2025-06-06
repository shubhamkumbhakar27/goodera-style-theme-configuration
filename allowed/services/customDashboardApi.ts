
import { ConfigService } from "./configService";
import { DashboardData, DashboardMetric } from "../../read_only/services/dashboardApi";

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export const fetchCustomDashboardData = async (): Promise<DashboardData> => {
  const apiConfig = ConfigService.getApiConfig();
  const responseMapping = ConfigService.getResponseMapping();

  if (!apiConfig || !apiConfig.baseUrl || !apiConfig.apiKey) {
    throw new Error('API configuration not found. Please configure your API settings.');
  }

  try {
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.dashboard}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiConfig.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();
    console.log('Raw API Response:', rawData);

    if (!responseMapping) {
      throw new Error('Response mapping configuration not found.');
    }

    // Extract metrics array from response
    const metricsArray = getNestedValue(rawData, responseMapping.metricsPath);
    
    if (!Array.isArray(metricsArray)) {
      throw new Error(`No metrics array found at path: ${responseMapping.metricsPath}`);
    }

    // Map the response to our expected format
    const metrics: DashboardMetric[] = metricsArray.map((item: any, index: number) => {
      const iconTypes: Array<'users' | 'calendar' | 'star' | 'dollar'> = ['users', 'calendar', 'star', 'dollar'];
      
      return {
        title: getNestedValue(item, responseMapping.titleField) || 'Unknown Metric',
        value: String(getNestedValue(item, responseMapping.valueField) || '0'),
        change: String(getNestedValue(item, responseMapping.changeField) || '0%'),
        subtitle: getNestedValue(item, responseMapping.subtitleField) || '',
        iconType: iconTypes[index % iconTypes.length],
        changeColor: 'text-green-600'
      };
    });

    return {
      metrics,
      lastUpdated: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

  } catch (error) {
    console.error('Failed to fetch custom dashboard data:', error);
    throw error;
  }
};
