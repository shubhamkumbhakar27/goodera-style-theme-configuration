
import { Bell, Search } from 'lucide-react';
import { theme } from "../../restricted/config/theme";

const DashboardHeader = () => {
  return (
    <header className={`${theme.background.primary} border-b ${theme.colors.border.light} px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.colors.text.muted} w-4 h-4`} />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border ${theme.colors.border.default} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A49] focus:border-transparent`}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className={`p-2 ${theme.colors.text.muted} hover:${theme.colors.text.primary} transition-colors duration-200`}>
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${theme.colors.primary.orange[500]} rounded-full flex items-center justify-center`}>
              <span className={`${theme.colors.text.white} ${theme.typography.body.sm} font-medium`}>A</span>
            </div>
            <div>
              <div className={`${theme.typography.body.sm} font-medium ${theme.colors.text.primary}`}>Admin User</div>
              <div className={`${theme.typography.body.sm} ${theme.colors.text.muted}`}>Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
