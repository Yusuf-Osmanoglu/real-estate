import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Analytics() {
  const stats = [
    { title: 'Total Revenue', value: '$2.4M', change: '+12.5%', isPositive: true, icon: TrendingUp },
    { title: 'Property Views', value: '45.2K', change: '+5.2%', isPositive: true, icon: Eye },
    { title: 'New Leads', value: '1,240', change: '-2.1%', isPositive: false, icon: Users },
    { title: 'Conversion Rate', value: '3.8%', change: '+1.2%', isPositive: true, icon: BarChart3 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Track your property performance and leads</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 flex items-end gap-2 justify-between pt-4">
            {/* Mock Bar Chart */}
            {[40, 70, 45, 90, 65, 85, 100, 60, 75, 50, 80, 95].map((height, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:bg-blue-700" 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Secondary Chart / List */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Properties</h2>
          <div className="space-y-6">
            {[
              { name: 'Bosphorus Villa', views: '12.5K', trend: '+15%' },
              { name: 'Marina Penthouse', views: '8.2K', trend: '+8%' },
              { name: 'City Center Apt', views: '6.4K', trend: '-2%' },
              { name: 'Seaside Mansion', views: '5.1K', trend: '+5%' },
              { name: 'Luxury Loft', views: '4.8K', trend: '+12%' },
            ].map((prop, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{prop.name}</p>
                  <p className="text-xs text-gray-500">{prop.views} views</p>
                </div>
                <span className={`text-xs font-medium ${prop.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {prop.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
