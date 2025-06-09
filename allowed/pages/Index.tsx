import { useState, useEffect } from "react";
import { Users, Calendar, Star, DollarSign, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Collapsible } from "../../src/components/ui/collapsible";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import MetricCard from "../components/MetricCard";
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
        return <Users className={`${icons.size.md} ${theme.colors.primary.purple[600]}`} />;
      case 'calendar':
        return <Calendar className={`${icons.size.md} ${theme.colors.primary.blue[600]}`} />;
      case 'star':
        return <Star className={`${icons.size.md} text-orange-600`} />;
      case 'dollar':
        return <DollarSign className={`${icons.size.md} ${theme.colors.primary.green[600]}`} />;
      default:
        return <Users className={`${icons.size.md} ${theme.colors.primary.purple[600]}`} />;
    }
  };

  const getIconBg = (iconType: string) => {
    switch (iconType) {
      case 'users':
        return theme.colors.primary.purple[100];
      case 'calendar':
        return theme.colors.primary.blue[100];
      case 'star':
        return theme.colors.primary.orange[100];
      case 'dollar':
        return theme.colors.primary.green[100];
      default:
        return theme.colors.primary.purple[100];
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
        
        <div className={`${theme.spacing.section} space-y-8`}>
          {/* Header Section with improved styling */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <div className={`flex items-center justify-between`}>
              <div>
                <h2 
                  className={`${theme.typography.heading['3xl']} ${theme.colors.text.primary} mb-3 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent`}
                  style={appliedTheme ? { color: appliedTheme.textColor } : undefined}
                >
                  Impact Dashboard
                </h2>
                <div className="flex items-center gap-4">
                  <p className={`${theme.colors.text.secondary} flex items-center gap-2`}>
                    <div className={`w-2 h-2 rounded-full ${useCustomApi ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                    {useCustomApi ? 'Connected to your custom API' : 'Using demo data'} • {dashboardData?.lastUpdated}
                  </p>
                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 px-3 py-1 rounded-full border border-red-200">⚠️ {error}</p>
                  )}
                </div>
              </div>
              
              <div className={`flex items-center ${theme.spacing.gap.large}`}>
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200 hover:shadow-md hover:scale-105"
                >
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
                <button 
                  className={`${theme.colors.primary.orange[500]} ${theme.colors.text.white} px-8 py-3 rounded-xl ${theme.typography.body.medium} flex items-center ${theme.spacing.gap.small} hover:${theme.colors.primary.orange[600]} transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105`}
                  style={appliedTheme ? { backgroundColor: appliedTheme.primaryColor } : undefined}
                >
                  DASHBOARD
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Metrics Section with Collapsible */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <Collapsible>
              <Collapsible.Head className="w-full outline-none group">
                <CardHeader className="pb-4 hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-gray-700 uppercase tracking-wider flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                      DASHBOARD METRICS
                    </CardTitle>
                    <Collapsible.Toggle 
                      openText="Hide Metrics" 
                      closeText="Show Metrics"
                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium text-sm"
                    />
                  </div>
                </CardHeader>
              </Collapsible.Head>
              
              <Collapsible.Content>
                <CardContent className="pt-0 pb-8">
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${theme.spacing.gap.xlarge}`}>
                    {dashboardData?.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="transform transition-all duration-300 hover:scale-105 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <MetricCard
                          title={metric.title}
                          value={metric.value}
                          change={metric.change}
                          subtitle={metric.subtitle}
                          icon={getIcon(metric.iconType)}
                          iconBg={getIconBg(metric.iconType)}
                          changeColor={metric.changeColor}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Collapsible.Content>
            </Collapsible>
          </Card>

          {/* Additional Visual Enhancement - Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Total Impact</h3>
              <p className="text-3xl font-bold">2.5M+</p>
              <p className="text-purple-200 text-sm">Lives Transformed</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
              <p className="text-3xl font-bold">150+</p>
              <p className="text-blue-200 text-sm">Countries Served</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Partner Network</h3>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-green-200 text-sm">Active Partners</p>
            </div>
          </div>
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
