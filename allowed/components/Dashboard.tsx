
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import { fetchHybridDashboardData } from '../../restricted/services/hybridApiService';
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchHybridDashboardData,
    retry: 1
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium">Error loading dashboard data</h3>
            <p className="text-red-600 text-sm mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your dashboard overview</p>
          </div>
          <div className="text-gray-500">
            {data?.lastUpdated || new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))
          ) : (
            data?.metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))
          )}
        </div>

        {/* Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
