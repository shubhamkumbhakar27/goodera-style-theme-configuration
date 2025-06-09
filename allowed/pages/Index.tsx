import { useState, useEffect } from "react";
import { Users, Calendar, Star, DollarSign, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Collapsible } from "../../src/components/ui/collapsible";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ConfigModal from "../components/ConfigModal";
import { fetchDashboardData, DashboardData } from "../../read_only/services/dashboardApi";
import { fetchCustomDashboardData } from "../services/customDashboardApi";
import { ConfigService } from "../services/configService";
import { theme, icons } from "../../read_only/config/theme";

const Index = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [useCustomApi, setUseCustomApi] = useState(false);

  useEffect(() => {
    // Check if custom API is configured
    const apiConfig = ConfigService.getApiConfig();
    setUseCustomApi(!!apiConfig?.baseUrl && !!apiConfig?.apiKey);
  }, []);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data: DashboardData;
        
        if (useCustomApi) {
          console.log('Loading data from custom API...');
          data = await fetchCustomDashboardData();
        } else {
          console.log('Loading mock data...');
          data = await fetchDashboardData();
        }
        
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
        
        // Fallback to mock data if custom API fails
        if (useCustomApi) {
          console.log('Falling back to mock data...');
          try {
            const fallbackData = await fetchDashboardData();
            setDashboardData(fallbackData);
            setError(null);
          } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [useCustomApi]);

  const handleConfigSave = () => {
    // Re-check if custom API is now configured
    const apiConfig = ConfigService.getApiConfig();
    const newUseCustomApi = !!apiConfig?.baseUrl && !!apiConfig?.apiKey;
    setUseCustomApi(newUseCustomApi);
  };

  // Apply custom theme if available
  const customTheme = ConfigService.getCustomTheme();
  const appliedTheme = customTheme ? {
    primaryColor: customTheme.primaryColor,
    backgroundColor: customTheme.backgroundColor,
    textColor: customTheme.textColor
  } : null;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'users':
        return <Users className="w-6 h-6 text-blue-600" />;
      case 'calendar':
        return <Calendar className="w-6 h-6 text-green-600" />;
      case 'star':
        return <Star className="w-6 h-6 text-orange-600" />;
      case 'dollar':
        return <DollarSign className="w-6 h-6 text-purple-600" />;
      default:
        return <Users className="w-6 h-6 text-blue-600" />;
    }
  };

  const getIconBg = (iconType: string) => {
    switch (iconType) {
      case 'users':
        return 'bg-blue-50';
      case 'calendar':
        return 'bg-green-50';
      case 'star':
        return 'bg-orange-50';
      case 'dollar':
        return 'bg-purple-50';
      default:
        return 'bg-blue-50';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.background.secondary} flex items-center justify-center`}>
        <div className="animate-pulse">
          <div className={`${theme.typography.heading.xl} ${theme.colors.text.secondary}`}>Loading dashboard...</div>
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen ${theme.background.secondary} flex`}
      style={appliedTheme ? { backgroundColor: appliedTheme.backgroundColor } : undefined}
    >
      <Sidebar />
      
      <div className="flex-1">
        <DashboardHeader />
        
        <div className="p-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
              <p className="text-gray-600">Welcome back, Admin! Here's your volunteering program overview</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowConfigModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Configure
              </button>
              <span className="text-gray-500">{dashboardData?.lastUpdated}</span>
            </div>
          </div>
          
          {/* Metrics Grid - Clean 4 column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {dashboardData?.metrics.map((metric, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${getIconBg(metric.iconType)} rounded-lg flex items-center justify-center`}>
                      {getIcon(metric.iconType)}
                    </div>
                    {metric.change && (
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        +{metric.change}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Insights Section */}
          <Card className="bg-white shadow-sm border border-gray-100">
            <Collapsible>
              <Collapsible.Head>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-800">Additional Insights</CardTitle>
                    <Collapsible.Toggle 
                      openText="Hide Details" 
                      closeText="Show Details"
                      className="text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
                    />
                  </div>
                </CardHeader>
              </Collapsible.Head>
              
              <Collapsible.Content>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Total Impact</h3>
                      <p className="text-3xl font-bold">2.5M+</p>
                      <p className="text-purple-200 text-sm">Lives Transformed</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                      <p className="text-3xl font-bold">150+</p>
                      <p className="text-blue-200 text-sm">Countries Served</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Partner Network</h3>
                      <p className="text-3xl font-bold">500+</p>
                      <p className="text-green-200 text-sm">Active Partners</p>
                    </div>
                  </div>
                </CardContent>
              </Collapsible.Content>
            </Collapsible>
          </Card>
        </div>
      </div>

      <ConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSave={handleConfigSave}
      />
    </div>
  );
};

export default Index;
