import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Calendar, BarChart3, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
          <Building2 size={20} />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-lg leading-tight">LuxeEstate</h1>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Admin Portal</p>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Building2 size={18} />
            Properties
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Calendar size={18} />
            Calendar
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <BarChart3 size={18} />
            Analytics
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto px-4 py-4 border-t border-gray-200">
        <nav className="space-y-1 mb-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
        
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="Emre Yılmaz" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Emre Yılmaz</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
