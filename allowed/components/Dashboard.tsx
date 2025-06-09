
import React from 'react';
import { Users, Calendar, Star, DollarSign, ArrowRight, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Volunteers",
      value: "2,547",
      change: "+12%",
      changeText: "+12% from last month",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      changeColor: "text-green-600"
    },
    {
      title: "Events Completed",
      value: "156",
      change: "+8%",
      changeText: "+8 new events",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      changeColor: "text-green-600"
    },
    {
      title: "Avg. Satisfaction",
      value: "4.8/5",
      change: "+2%",
      changeText: "+0.2 from last quarter",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      changeColor: "text-green-600"
    },
    {
      title: "Budget Utilization",
      value: "62%",
      change: "",
      changeText: "$218,000 remaining",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      changeColor: "text-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin! Here's your volunteering program overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-white px-6 py-3 rounded-lg flex items-center space-x-2 cursor-pointer group">
              <span className="font-medium">DASHBOARD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
            <div className="text-gray-500">June 9, 2025</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header with Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                  </div>
                </div>

                {/* Value */}
                <div className="mb-3">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                  {metric.change && (
                    <span className={`ml-3 inline-flex items-center text-sm font-medium ${metric.changeColor}`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </span>
                  )}
                </div>

                {/* Change Text */}
                <div className={`text-sm ${metric.changeColor}`}>
                  {metric.changeText}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Content Area */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <span className="text-gray-700">Create New Event</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <span className="text-gray-700">Manage Volunteers</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <span className="text-gray-700">View Reports</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-700">Community cleanup event completed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-700">25 new volunteers registered</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-700">Food drive planning meeting scheduled</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
