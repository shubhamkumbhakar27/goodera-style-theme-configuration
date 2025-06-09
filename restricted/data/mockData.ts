
import { DashboardData } from '../types/dashboardTypes';

export const mockDashboardData: DashboardData = {
  metrics: [
    {
      title: "Total Volunteers",
      value: "2,547",
      change: "12%",
      subtitle: "+12% from last month",
      iconType: "users",
      changeColor: "text-green-600",
    },
    {
      title: "Events Completed",
      value: "156",
      change: "8%",
      subtitle: "+8 new events",
      iconType: "calendar",
      changeColor: "text-green-600",
    },
    {
      title: "Avg. Satisfaction",
      value: "4.8/5",
      change: "2%",
      subtitle: "+0.2 from last quarter",
      iconType: "star",
      changeColor: "text-green-600",
    },
    {
      title: "Budget Utilization",
      value: "62%",
      change: "",
      subtitle: "$218,000 remaining",
      iconType: "dollar",
      changeColor: "text-green-600",
    },
  ],
  lastUpdated: "June 9, 2025",
};
