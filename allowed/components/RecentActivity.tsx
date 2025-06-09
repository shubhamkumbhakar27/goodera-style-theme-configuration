
const RecentActivity = () => {
  const activities = [
    {
      text: "Community cleanup event completed",
      time: "2 hours ago",
      color: "bg-green-500"
    },
    {
      text: "25 new volunteers registered", 
      time: "5 hours ago",
      color: "bg-blue-500"
    },
    {
      text: "Food drive planning meeting scheduled",
      time: "1 day ago", 
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-2 h-2 ${activity.color} rounded-full mt-2 flex-shrink-0`}></div>
            <div>
              <p className="text-sm text-gray-700">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
