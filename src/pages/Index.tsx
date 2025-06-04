
import { useState, useEffect } from "react";
import { Users, Calendar, Star, DollarSign } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import MetricCard from "../components/MetricCard";
import { fetchDashboardData, DashboardData } from "../services/dashboardApi";
import { theme, icons } from "../config/theme";

const Index = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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
      <div className={`min-h-screen ${theme.colors.background.secondary} flex items-center justify-center`}>
        <div className={`${theme.typography.heading.xl} ${theme.colors.text.secondary}`}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.colors.background.secondary} flex`}>
      <Sidebar />
      
      <div className="flex-1">
        <DashboardHeader />
        
        <div className={theme.spacing.section}>
          <div className={`flex items-center justify-between mb-8`}>
            <div>
              <h2 className={`${theme.typography.heading['3xl']} ${theme.colors.text.primary} mb-2`}>Impact Dashboard</h2>
              <p className={theme.colors.text.secondary}>Welcome back, Admin! Here's your volunteering program overview</p>
            </div>
            
            <div className={`flex items-center ${theme.spacing.gap.large}`}>
              <button className={`${theme.colors.primary.orange[500]} ${theme.colors.text.white} px-6 py-3 rounded-lg ${theme.typography.body.medium} flex items-center ${theme.spacing.gap.small} hover:${theme.colors.primary.orange[600]} transition-colors`}>
                DASHBOARD
                <span>→</span>
              </button>
              <span className={theme.colors.text.muted}>{dashboardData?.lastUpdated}</span>
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
    </div>
  );
};

export default Index;
