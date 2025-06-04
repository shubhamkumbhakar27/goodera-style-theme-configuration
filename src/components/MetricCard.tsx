
import { ReactNode } from "react";

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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-gray-600 font-medium">{title}</h3>
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className={`text-sm font-medium ${changeColor} flex items-center gap-1`}>
          <span>↗</span>
          {change}
        </span>
      </div>
      
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
};

export default MetricCard;
