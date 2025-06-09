
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ConfigService } from '../../restricted/services/configService';
import { ApiConfig, ResponseMapping } from '../../restricted/types/configTypes';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigModal = ({ isOpen, onClose }: ConfigModalProps) => {
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    baseUrl: '',
    apiKey: '',
    endpoints: {
      dashboard: '/dashboard',
      metrics: '/metrics'
    }
  });

  const [responseMapping, setResponseMapping] = useState<ResponseMapping>({
    metricsPath: 'data.metrics',
    titleField: 'title',
    valueField: 'value', 
    changeField: 'change',
    subtitleField: 'subtitle'
  });

  useEffect(() => {
    if (isOpen) {
      const savedConfig = ConfigService.getApiConfig();
      const savedMapping = ConfigService.getResponseMapping();
      
      if (savedConfig) setApiConfig(savedConfig);
      if (savedMapping) setResponseMapping(savedMapping);
    }
  }, [isOpen]);

  const handleSave = () => {
    ConfigService.saveApiConfig(apiConfig);
    ConfigService.saveResponseMapping(responseMapping);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">API Configuration</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* API Configuration */}
          <div>
            <h3 className="text-lg font-semibold mb-4">API Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base URL</label>
                <input
                  type="text"
                  value={apiConfig.baseUrl}
                  onChange={(e) => setApiConfig({...apiConfig, baseUrl: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="https://api.example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <input
                  type="password"
                  value={apiConfig.apiKey}
                  onChange={(e) => setApiConfig({...apiConfig, apiKey: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Your API key"
                />
              </div>
            </div>
          </div>

          {/* Response Mapping */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Response Mapping</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Metrics Array Path</label>
                <input
                  type="text"
                  value={responseMapping.metricsPath}
                  onChange={(e) => setResponseMapping({...responseMapping, metricsPath: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="data.metrics"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title Field</label>
                  <input
                    type="text"
                    value={responseMapping.titleField}
                    onChange={(e) => setResponseMapping({...responseMapping, titleField: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Value Field</label>
                  <input
                    type="text"
                    value={responseMapping.valueField}
                    onChange={(e) => setResponseMapping({...responseMapping, valueField: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
