
import { useState, useEffect } from "react";
import { theme, icons } from "../../read_only/config/theme";
import { getUser, User } from "../../read_only/services/endpoints/index";

const DashboardHeader = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response.results && response.results.length > 0) {
          setUser(response.results[0]);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const displayName = user ? `${user.name.first} ${user.name.last}` : "Shubham";
  const profilePicture = user?.picture.large || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGq7B7PzE6rNSHjsNdvpwJHZMyNl8VJKFexw&s";

  return (
    <div className={`${theme.background.card} ${theme.colors.border.default} border-b px-8 py-6`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${theme.spacing.gap.large}`}>
          <div className={`${icons.size.lg} ${theme.colors.primary.orange[100]} rounded flex items-center justify-center`}>
            <div className={`${icons.size.sm} ${theme.colors.primary.orange[400]} rounded-sm`}></div>
          </div>
          <h1 className={`${theme.typography.heading['2xl']} ${theme.colors.text.primary}`}>Volunteer Pulse Central</h1>
        </div>
        
        <div className={`flex items-center ${theme.spacing.gap.large}`}>
          <div className={`flex items-center ${theme.spacing.gap.medium}`}>
            <div className={`${icons.size.xl} rounded-full overflow-hidden`}>
              {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
              ) : (
                <img 
                  src={profilePicture}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <div className={`${theme.typography.body.medium} ${theme.colors.text.primary}`}>
                {loading ? "Loading..." : displayName}
              </div>
              <div className={`${theme.typography.body.sm} ${theme.colors.text.muted}`}>Central POC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
