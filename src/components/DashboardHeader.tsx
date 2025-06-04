
import { theme, icons } from "../config/theme";

const DashboardHeader = () => {
  return (
    <div className={`${theme.background.primary} ${theme.colors.border.default} border-b px-8 py-6`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${theme.spacing.gap.large}`}>
          <div className={`${icons.size.lg} ${theme.colors.primary.orange[100]} rounded flex items-center justify-center`}>
            <div className={`${icons.size.sm} ${theme.colors.primary.orange[400]} rounded-sm`}></div>
          </div>
          <h1 className={`${theme.typography.heading['2xl']} ${theme.colors.text.primary}`}>Volunteer Pulse Central</h1>
        </div>
        
        <div className={`flex items-center ${theme.spacing.gap.large}`}>
          <div className={`flex items-center ${theme.spacing.gap.medium}`}>
            <div className={`${icons.size.xl} ${theme.colors.primary.orange[500]} rounded-full flex items-center justify-center ${theme.colors.text.white} ${theme.typography.body.medium}`}>
              AN
            </div>
            <div>
              <div className={`${theme.typography.body.medium} ${theme.colors.text.primary}`}>Admin Name</div>
              <div className={`${theme.typography.body.sm} ${theme.colors.text.muted}`}>Central POC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
