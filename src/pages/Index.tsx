import { useState, useEffect } from "react";
import { Users, Calendar, Star, DollarSign, Settings } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import MetricCard from "../components/MetricCard";
import ConfigModal from "../components/ConfigModal";
import { fetchDashboardData, DashboardData } from "../services/dashboardApi";
import { fetchCustomDashboardData } from "../services/customDashboardApi";
import { ConfigService } from "../services/configService";
import { theme, icons } from "../config/theme";

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
        <div className={`${theme.typography.heading.xl} ${theme.colors.text.secondary}`}>Loading dashboard...</div>
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
        
        <div className={theme.spacing.section}>
          <div className={`flex items-center justify-between mb-8`}>
            <div>
              <h2 
                className={`${theme.typography.heading['3xl']} ${theme.colors.text.primary} mb-2`}
                style={appliedTheme ? { color: appliedTheme.textColor } : undefined}
              >
                Impact Dashboard
              </h2>
              <p className={theme.colors.text.secondary}>
                {useCustomApi ? 'Connected to your custom API' : 'Using demo data'} • {dashboardData?.lastUpdated}
              </p>
              {error && (
                <p className="text-red-600 text-sm mt-1">⚠️ {error}</p>
              )}
            </div>
            
            <div className={`flex items-center ${theme.spacing.gap.large}`}>
              <button
                onClick={() => setShowConfigModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Configure
              </button>
              <button 
                className={`${theme.colors.primary.orange[500]} ${theme.colors.text.white} px-6 py-3 rounded-lg ${theme.typography.body.medium} flex items-center ${theme.spacing.gap.small} hover:${theme.colors.primary.orange[600]} transition-colors`}
                style={appliedTheme ? { backgroundColor: appliedTheme.primaryColor } : undefined}
              >
                DASHBOARD
                <span>→</span>
              </button>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${theme.spacing.gap.xlarge}`}>
            {dashboardData?.metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                subtitle={metric.subtitle}
                icon={getIcon(metric.iconType)}
                iconBg={getIconBg(metric.iconType)}
                changeColor={metric.changeColor}
              />
            ))}
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
