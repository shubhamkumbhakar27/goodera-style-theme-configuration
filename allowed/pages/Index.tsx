
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Dashboard from "../components/Dashboard";
import ConfigModal from "../components/ConfigModal";
import { theme } from "../../restricted/config/theme";

const Index = () => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  return (
    <div className={`min-h-screen ${theme.background.secondary} flex`}>
      <Sidebar onConfigClick={() => setIsConfigModalOpen(true)} />
      
      <div className="flex-1">
        <DashboardHeader />
        <div className="mt-4">
          <Dashboard />
        </div>
      </div>

      <ConfigModal 
        isOpen={isConfigModalOpen} 
        onClose={() => setIsConfigModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
