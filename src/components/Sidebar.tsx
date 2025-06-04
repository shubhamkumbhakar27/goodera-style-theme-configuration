
import { BarChart3 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
          <div className="w-4 h-4 bg-orange-400 rounded-sm"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Goodera Hub</h2>
      </div>
      
      <nav>
        <div className="flex items-center gap-3 text-orange-500 bg-orange-50 p-3 rounded-lg">
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
