
export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  iconType: "users" | "calendar" | "star" | "dollar";
  changeColor: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  lastUpdated: string;
}
