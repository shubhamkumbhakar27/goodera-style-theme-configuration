
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { theme } from "../../read_only/config/theme";

const Index = () => {
  return (
    <div className={`min-h-screen ${theme.background.secondary} flex`}>
      <Sidebar />
      
      <div className="flex-1">
        <DashboardHeader />
      </div>
    </div>
  );
};

export default Index;
