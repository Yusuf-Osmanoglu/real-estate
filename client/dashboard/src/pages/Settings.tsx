import { useState } from 'react';
import { User, Shield, Bell, Globe, Lock, Save } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('roles');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'roles', label: 'Users & Roles', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  const users = [
    { id: 1, name: 'Emre Yılmaz', email: 'emre@luxeestate.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@luxeestate.com', role: 'Agent', status: 'Active' },
    { id: 3, name: 'Caner Öztürk', email: 'caner@luxeestate.com', role: 'Editor', status: 'Inactive' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and dashboard preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">
          {activeTab === 'roles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Users & Roles</h2>
                  <p className="text-sm text-gray-500">Manage team members and their access levels.</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <select 
                            defaultValue={user.role}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option>Admin</option>
                            <option>Agent</option>
                            <option>Editor</option>
                            <option>Viewer</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Change Avatar
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" defaultValue="Emre" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="Yılmaz" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" defaultValue="emre@luxeestate.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <div className="pt-4">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {['notifications', 'security', 'preferences'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Globe size={48} className="mb-4 text-gray-300" />
              <p>Settings for {activeTab} will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
