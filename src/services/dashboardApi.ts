
export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  iconType: 'users' | 'calendar' | 'star' | 'dollar';
  changeColor: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  lastUpdated: string;
}

// Mock API function - replace with real API endpoint
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    metrics: [
      {
        title: "Total Volunteers",
        value: "2,547",
        change: "12%",
        subtitle: "+12% from last month",
        iconType: "users",
        changeColor: "text-green-600"
      },
      {
        title: "Events Completed",
        value: "156",
        change: "8%",
        subtitle: "+8 new events",
        iconType: "calendar",
        changeColor: "text-green-600"
      },
      {
        title: "Avg. Satisfaction",
        value: "4.8/5",
        change: "2%",
        subtitle: "+0.2 from last quarter",
        iconType: "star",
        changeColor: "text-green-600"
      },
      {
        title: "Budget Utilization",
        value: "62%",
        change: "",
        subtitle: "$218,000 remaining",
        iconType: "dollar",
        changeColor: "text-green-600"
      }
    ],
    lastUpdated: "June 4, 2025"
  };
};
