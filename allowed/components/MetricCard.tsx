
import { ReactNode } from "react";
import { theme } from "../../read_only/config/theme";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
  changeColor: string;
}

const MetricCard = ({ title, value, change, subtitle, icon, iconBg, changeColor }: MetricCardProps) => {
  return (
    <div className={`${theme.background.primary} ${theme.spacing.card} ${theme.layout.card.rounded} shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-orange-200 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm`}>
      <div className={`flex items-start justify-between mb-6`}>
        <div className={`flex items-center ${theme.spacing.gap.medium}`}>
          <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <h3 className={`${theme.colors.text.secondary} ${theme.typography.body.medium} text-xs uppercase tracking-wider`}>{title}</h3>
        </div>
      </div>
      
      <div className={`flex items-end ${theme.spacing.gap.small} mb-3`}>
        <span className={`text-3xl font-bold ${theme.colors.text.primary} bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent`}>{value}</span>
        <span className={`${theme.typography.body.sm} ${theme.typography.body.medium} ${changeColor} flex items-center gap-1 px-2 py-1 rounded-full text-xs`}>
          <span className="text-lg">↗</span>
          {change}
        </span>
      </div>
      
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full w-3/4 animate-pulse"></div>
      </div>
      
      <p className={`${theme.colors.text.muted} ${theme.typography.body.sm} leading-relaxed`}>{subtitle}</p>
    </div>
  );
};

export default MetricCard;
