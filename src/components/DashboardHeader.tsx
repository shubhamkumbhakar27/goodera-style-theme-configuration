
const DashboardHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-400 rounded-sm"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Pulse Central</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
              AN
            </div>
            <div>
              <div className="font-semibold text-gray-900">Admin Name</div>
              <div className="text-sm text-gray-500">Central POC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
