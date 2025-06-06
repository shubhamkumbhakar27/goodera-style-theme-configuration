
import { BarChart3 } from "lucide-react";
import { theme, icons } from "../../read_only/config/theme";

const Sidebar = () => {
  return (
    <div className={`${theme.layout.sidebar.width} ${theme.background.secondary} ${theme.layout.sidebar.minHeight} ${theme.spacing.container}`}>
      <div className={`flex items-center ${theme.spacing.gap.medium} mb-8`}>
        <div className={`${icons.size.lg} ${theme.colors.primary.orange[100]} rounded flex items-center justify-center`}>
          <div className={`${icons.size.sm} ${theme.colors.primary.orange[400]} rounded-sm`}></div>
        </div>
        <h2 className={`${theme.typography.heading.xl} ${theme.colors.text.primary}`}>Goodera Hub</h2>
      </div>
      
      <nav>
        <div className={`flex items-center ${theme.spacing.gap.medium} text-orange-500 ${theme.colors.primary.orange[50]} p-3 rounded-lg`}>
          <BarChart3 className={icons.size.md} />
          <span className={theme.typography.body.medium}>Dashboard</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
