import { useState } from 'react';
import { Search, Bell, Filter, Plus, MoreVertical, CheckCircle2, MessageSquare, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Inquiry', message: 'John Doe asked about Bosphorus Villa', time: '5 min ago', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, title: 'Viewing Scheduled', message: 'Viewing for Marina Penthouse tomorrow at 14:00', time: '2 hours ago', icon: CalendarIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 3, title: 'Listing Approved', message: 'Your listing "City Center Apt" is now live', time: '1 day ago', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Dashboard</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsNotificationsOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">3 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.bg} ${notification.color}`}>
                          <notification.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1.5">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-blue-600">View All Notifications</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Views */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">124,592</div>
          <div className="flex items-end gap-1 h-10">
            {[40, 50, 45, 60, 55, 70, 65, 80, 90, 100].map((h, i) => (
              <div key={i} className={`w-full rounded-t-sm ${i > 6 ? 'bg-gray-800' : 'bg-gray-200'}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>

        {/* New Inquiries */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">New Inquiries</h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +5%
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">48</div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=32" alt="" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=12" alt="" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=45" alt="" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">+5</div>
            </div>
            <span className="text-sm text-gray-500">Pending review</span>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              +2%
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">156</div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Occupancy rate</span>
              <span className="font-medium text-gray-900">86%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Listings Performance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Listings Performance</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            <Link to="/properties/add" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
              <Plus size={16} />
              Add Listing
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Villa Bosphorus View" className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">Villa Bosphorus View</div>
                      <div className="text-sm text-gray-500">Istanbul, Sariyer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-5 bg-gray-900 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">12,405</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    8.2%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-end gap-1 h-8 w-24">
                    {[30, 40, 35, 50, 45, 60, 80, 100].map((h, i) => (
                      <div key={i} className={`w-full rounded-t-sm ${i > 5 ? 'bg-gray-800' : 'bg-gray-200'}`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Seaside Mansion" className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">Seaside Mansion</div>
                      <div className="text-sm text-gray-500">Bodrum, Mugla</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-5 bg-gray-900 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">8,102</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    12.5%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-end gap-1 h-8 w-24">
                    {[20, 30, 40, 35, 50, 60, 70, 90].map((h, i) => (
                      <div key={i} className={`w-full rounded-t-sm ${i > 5 ? 'bg-gray-800' : 'bg-gray-200'}`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1600607687931-cebfad74cb78?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Minimalist Loft" className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">Minimalist Loft</div>
                      <div className="text-sm text-gray-500">Istanbul, Beyoglu</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Passive</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">4,291</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    0.0%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-end gap-1 h-8 w-24">
                    {[60, 50, 40, 30, 20, 20, 20, 20].map((h, i) => (
                      <div key={i} className={`w-full rounded-t-sm bg-gray-200`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Penthouse Suite" className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">Penthouse Suite</div>
                      <div className="text-sm text-gray-500">Izmir, Alsancak</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-5 bg-gray-900 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">6,732</div>
                  <div className="text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    2.1%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-end gap-1 h-8 w-24">
                    {[80, 90, 85, 70, 60, 50, 40, 30].map((h, i) => (
                      <div key={i} className={`w-full rounded-t-sm bg-gray-300`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 4 of 156 listings</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
