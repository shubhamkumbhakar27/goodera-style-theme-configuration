
import { Users, Calendar, Star, DollarSign, TrendingUp } from 'lucide-react';
import { DashboardMetric } from '../../restricted/types/dashboardTypes';

interface MetricCardProps {
  metric: DashboardMetric;
}

const MetricCard = ({ metric }: MetricCardProps) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'users': return Users;
      case 'calendar': return Calendar;
      case 'star': return Star;
      case 'dollar': return DollarSign;
      default: return Users;
    }
  };

  const getIconColors = (iconType: string) => {
    switch (iconType) {
      case 'users': return { color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'calendar': return { color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'star': return { color: 'text-yellow-600', bg: 'bg-yellow-50' };
      case 'dollar': return { color: 'text-green-600', bg: 'bg-green-50' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const IconComponent = getIcon(metric.iconType);
  const colors = getIconColors(metric.iconType);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <IconComponent className={`w-5 h-5 ${colors.color}`} />
        </div>
      </div>

      <div className="mb-3">
        <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
        {metric.change && (
          <span className={`ml-3 inline-flex items-center text-sm font-medium ${metric.changeColor}`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {metric.change}
          </span>
        )}
      </div>

      <div className={`text-sm ${metric.changeColor}`}>
        {metric.subtitle}
      </div>
    </div>
  );
};

export default MetricCard;
