
import { ReactNode } from "react";
import { theme } from "../config/theme";

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
    <div className={`${theme.colors.background.primary} ${theme.spacing.card} ${theme.layout.card.rounded} ${theme.layout.card.shadow} ${theme.colors.border.light} border`}>
      <div className={`flex items-start justify-between mb-4`}>
        <div className={`flex items-center ${theme.spacing.gap.medium}`}>
          <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className={`${theme.colors.text.secondary} ${theme.typography.body.medium}`}>{title}</h3>
        </div>
      </div>
      
      <div className={`flex items-end ${theme.spacing.gap.small} mb-2`}>
        <span className={`text-3xl font-bold ${theme.colors.text.primary}`}>{value}</span>
        <span className={`${theme.typography.body.sm} ${theme.typography.body.medium} ${changeColor} flex items-center gap-1`}>
          <span>↗</span>
          {change}
        </span>
      </div>
      
      <p className={`${theme.colors.text.muted} ${theme.typography.body.sm}`}>{subtitle}</p>
    </div>
  );
};

export default MetricCard;
