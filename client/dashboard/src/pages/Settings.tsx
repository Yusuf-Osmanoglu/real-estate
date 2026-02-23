import { useState, useEffect } from 'react';
import { User, Shield, Bell, Globe, Lock, Save, Plus, Loader2, X, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

// We need the config to initialize a secondary app for creating users without signing out the admin
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:YOUR_MESSAGING_SENDER_ID:web:0b3e4cd52c17d0406c24bc",
  measurementId: "YOUR_MEASUREMENT_ID"
};

interface AppUser {
  id: string;
  uid?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt?: unknown;
}

export default function Settings() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('roles');
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Agent'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'roles', label: 'Users & Roles', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  useEffect(() => {
    if (activeTab === 'roles') {
      fetchUsers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentUser]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch users from Firestore 'users' collection
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const usersData: AppUser[] = [];
      
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as AppUser);
      });

      // If the current user is not in the Firestore 'users' collection, add them
      if (currentUser && currentUser.email) {
        // Check by uid instead of email to be more precise, or check both
        const currentUserExists = usersData.some(u => u.uid === currentUser.uid || u.email === currentUser.email);
        if (!currentUserExists) {
          console.log("Current user not found in Firestore, adding now...");
          const userData = {
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email.split('@')[0],
            email: currentUser.email,
            role: 'Admin', // Default to Admin for the first user
            status: 'Active',
            createdAt: serverTimestamp()
          };
          const docRef = await addDoc(collection(db, 'users'), userData);
          usersData.unshift({ id: docRef.id, ...userData } as AppUser);
        }
      }

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingUser(true);
    try {
      // Initialize secondary app to create user without signing out current admin
      const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
      const secondaryAuth = getAuth(secondaryApp);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newUser.email, newUser.password);
      
      // Add user to Firestore
      const userData = {
        uid: userCredential.user.uid,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'Active',
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'users'), userData);
      
      // Sign out secondary app
      await secondaryAuth.signOut();
      
      // Reset form and refresh list
      setNewUser({ name: '', email: '', password: '', role: 'Agent' });
      setShowAddUser(false);
      fetchUsers();
      showNotification('User created successfully!', 'success');
    } catch (error: unknown) {
      console.error("Error creating user:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showNotification('Error creating user: ' + errorMessage, 'error');
    } finally {
      setSavingUser(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full relative">
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 text-sm font-medium text-white transition-all duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}
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
                <button 
                  onClick={() => setShowAddUser(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  Add User
                </button>
              </div>

              {showAddUser && (
                <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
                  <button 
                    onClick={() => setShowAddUser(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                  <h3 className="text-md font-bold text-gray-900 mb-4">Add New User</h3>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={newUser.name}
                          onChange={e => setNewUser({...newUser, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={newUser.email}
                          onChange={e => setNewUser({...newUser, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                          type="password" 
                          required
                          minLength={6}
                          value={newUser.password}
                          onChange={e => setNewUser({...newUser, password: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select 
                          value={newUser.role}
                          onChange={e => setNewUser({...newUser, role: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Agent">Agent</option>
                          <option value="Editor">Editor</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit"
                        disabled={savingUser}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {savingUser ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Create User
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 flex justify-center">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                  </div>
                ) : users.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No users found. Add a new user to get started.
                  </div>
                ) : (
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
                        <tr key={user.id} className={`hover:bg-gray-50 ${user.status !== 'Active' ? 'opacity-60' : ''}`}>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <select 
                              value={user.role}
                              onChange={(e) => changeUserRole(user.id, e.target.value)}
                              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-transparent"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Agent">Agent</option>
                              <option value="Editor">Editor</option>
                              <option value="Viewer">Viewer</option>
                            </select>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => toggleUserStatus(user.id, user.status)}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {user.status}
                            </button>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-400 text-2xl font-bold">
                    U
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Change Avatar
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" placeholder="First Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" placeholder="Last Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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

          {/* Other tabs placeholders */}
          {['notifications', 'security', 'preferences'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                {activeTab === 'notifications' && <Bell size={32} />}
                {activeTab === 'security' && <Lock size={32} />}
                {activeTab === 'preferences' && <Globe size={32} />}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">{activeTab} Settings</h3>
              <p className="text-gray-500 max-w-md">This section is currently under development. Check back later for updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
