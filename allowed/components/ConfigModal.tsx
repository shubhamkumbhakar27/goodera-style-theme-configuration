import { useState, useEffect } from "react";
import { X, Save, Settings } from "lucide-react";
import { ConfigService, ApiConfig, ResponseMapping, CustomTheme } from "../services/configService";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ConfigModal = ({ isOpen, onClose, onSave }: ConfigModalProps) => {
  const [activeTab, setActiveTab] = useState<'api' | 'mapping' | 'theme'>('api');
  
  // API Configuration
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    baseUrl: '',
    apiKey: '',
    endpoints: {
      dashboard: '/dashboard',
      metrics: '/metrics'
    }
  });

  // Response Mapping
  const [responseMapping, setResponseMapping] = useState<ResponseMapping>({
    metricsPath: 'data.metrics',
    titleField: 'title',
    valueField: 'value',
    changeField: 'change',
    subtitleField: 'subtitle'
  });

  // Custom Theme
  const [customTheme, setCustomTheme] = useState<CustomTheme>({
    primaryColor: '#f97316',
    secondaryColor: '#6b7280',
    accentColor: '#10b981',
    backgroundColor: '#f9fafb',
    textColor: '#111827',
    borderRadius: '0.75rem'
  });

  useEffect(() => {
    // Load saved configurations
    const savedApiConfig = ConfigService.getApiConfig();
    const savedResponseMapping = ConfigService.getResponseMapping();
    const savedCustomTheme = ConfigService.getCustomTheme();

    if (savedApiConfig) setApiConfig(savedApiConfig);
    if (savedResponseMapping) setResponseMapping(savedResponseMapping);
    if (savedCustomTheme) setCustomTheme(savedCustomTheme);
  }, [isOpen]);

  const handleSave = () => {
    ConfigService.saveApiConfig(apiConfig);
    ConfigService.saveResponseMapping(responseMapping);
    ConfigService.saveCustomTheme(customTheme);
    onSave();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Configuration</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {[
            { id: 'api', label: 'API Settings' },
            { id: 'mapping', label: 'Data Mapping' },
            { id: 'theme', label: 'Custom Theme' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Base URL</label>
                <input
                  type="url"
                  value={apiConfig.baseUrl}
                  onChange={(e) => setApiConfig({ ...apiConfig, baseUrl: e.target.value })}
                  placeholder="https://api.yourservice.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key (Private)</label>
                <input
                  type="password"
                  value={apiConfig.apiKey}
                  onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
                  placeholder="Your private API key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Endpoint</label>
                <input
                  type="text"
                  value={apiConfig.endpoints.dashboard}
                  onChange={(e) => setApiConfig({
                    ...apiConfig,
                    endpoints: { ...apiConfig.endpoints, dashboard: e.target.value }
                  })}
                  placeholder="/dashboard"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'mapping' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metrics Array Path</label>
                <input
                  type="text"
                  value={responseMapping.metricsPath}
                  onChange={(e) => setResponseMapping({ ...responseMapping, metricsPath: e.target.value })}
                  placeholder="data.metrics or response.results"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Field</label>
                  <input
                    type="text"
                    value={responseMapping.titleField}
                    onChange={(e) => setResponseMapping({ ...responseMapping, titleField: e.target.value })}
                    placeholder="title or name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Field</label>
                  <input
                    type="text"
                    value={responseMapping.valueField}
                    onChange={(e) => setResponseMapping({ ...responseMapping, valueField: e.target.value })}
                    placeholder="value or count"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                  <input
                    type="color"
                    value={customTheme.primaryColor}
                    onChange={(e) => setCustomTheme({ ...customTheme, primaryColor: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                  <input
                    type="color"
                    value={customTheme.secondaryColor}
                    onChange={(e) => setCustomTheme({ ...customTheme, secondaryColor: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                  <input
                    type="color"
                    value={customTheme.accentColor}
                    onChange={(e) => setCustomTheme({ ...customTheme, accentColor: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <input
                    type="color"
                    value={customTheme.backgroundColor}
                    onChange={(e) => setCustomTheme({ ...customTheme, backgroundColor: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              ConfigService.clearAllConfig();
              setApiConfig({
                baseUrl: '',
                apiKey: '',
                endpoints: { dashboard: '/dashboard', metrics: '/metrics' }
              });
              setResponseMapping({
                metricsPath: 'data.metrics',
                titleField: 'title',
                valueField: 'value',
                changeField: 'change',
                subtitleField: 'subtitle'
              });
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset to Defaults
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
