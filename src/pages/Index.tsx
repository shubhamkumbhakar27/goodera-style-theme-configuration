
import { Users, Calendar, Star, DollarSign } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import MetricCard from "../components/MetricCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <DashboardHeader />
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h2>
              <p className="text-gray-600">Welcome back, Admin! Here's your volunteering program overview</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 transition-colors">
                DASHBOARD
                <span>→</span>
              </button>
              <span className="text-gray-500">June 4, 2025</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Volunteers"
              value="2,547"
              change="12%"
              subtitle="+12% from last month"
              icon={<Users className="w-5 h-5 text-purple-600" />}
              iconBg="bg-purple-100"
              changeColor="text-green-600"
            />
            
            <MetricCard
              title="Events Completed"
              value="156"
              change="8%"
              subtitle="+8 new events"
              icon={<Calendar className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
              changeColor="text-green-600"
            />
            
            <MetricCard
              title="Avg. Satisfaction"
              value="4.8/5"
              change="2%"
              subtitle="+0.2 from last quarter"
              icon={<Star className="w-5 h-5 text-orange-600" />}
              iconBg="bg-orange-100"
              changeColor="text-green-600"
            />
            
            <MetricCard
              title="Budget Utilization"
              value="62%"
              change=""
              subtitle="$218,000 remaining"
              icon={<DollarSign className="w-5 h-5 text-green-600" />}
              iconBg="bg-green-100"
              changeColor="text-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
