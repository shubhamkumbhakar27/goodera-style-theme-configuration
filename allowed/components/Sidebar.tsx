
import { Settings, BarChart3, Users, Calendar, Star, DollarSign } from 'lucide-react';
import { theme } from "../../restricted/config/theme";

interface SidebarProps {
  onConfigClick: () => void;
}

const Sidebar = ({ onConfigClick }: SidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Users, label: "Volunteers" },
    { icon: Calendar, label: "Events" },
    { icon: Star, label: "Reviews" },
    { icon: DollarSign, label: "Budget" },
  ];

  return (
    <div className={`${theme.layout.sidebar.width} ${theme.layout.sidebar.minHeight} ${theme.background.primary} border-r ${theme.colors.border.light} p-6`}>
      <div className="mb-8">
        <h2 className={`${theme.typography.heading.xl} ${theme.colors.text.primary}`}>VolunteerHub</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={index}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                item.active 
                  ? `${theme.colors.primary.orange[50]} ${theme.colors.primary.orange[600]} border-l-4 border-[#FF7A49]` 
                  : `${theme.colors.text.secondary} hover:${theme.background.muted}`
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className={theme.typography.body.medium}>{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button 
          onClick={onConfigClick}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${theme.colors.text.secondary} hover:${theme.background.muted} w-full`}
        >
          <Settings className="w-5 h-5" />
          <span className={theme.typography.body.medium}>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
