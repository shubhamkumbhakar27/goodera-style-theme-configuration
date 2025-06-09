
import { ArrowRight } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    "Create New Event",
    "Manage Volunteers", 
    "View Reports"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button 
            key={index}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
          >
            <span className="text-gray-700">{action}</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
