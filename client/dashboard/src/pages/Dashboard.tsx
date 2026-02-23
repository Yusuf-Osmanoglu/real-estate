import { useState, useEffect } from 'react';
import { Search, Bell, Filter, Plus, MoreVertical, CheckCircle2, MessageSquare, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { formatDistanceToNow } from 'date-fns';

interface Property {
  id: string;
  title: string;
  price: number;
  location: { city: string; district: string };
  images: string[];
  isActive: boolean;
  status: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: any;
  link: string;
}

export default function Dashboard() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, totalValue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();

    // Real-time notifications listener
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifsData: Notification[] = [];
      snapshot.forEach((doc) => {
        notifsData.push({ id: doc.id, ...doc.data() } as Notification);
      });
      setNotifications(notifsData);
    });

    return () => unsubscribe();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const propsData: Property[] = [];
      let totalValue = 0;
      let activeCount = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        propsData.push({ id: doc.id, ...data });

        if (data.isActive) activeCount++;
        if (data.status === 'sale' && data.price) totalValue += data.price;
      });

      setProperties(propsData.slice(0, 5)); // Get top 5 recent
      setStats({
        total: propsData.length,
        active: activeCount,
        totalValue
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await updateDoc(doc(db, 'notifications', notification.id), {
          isRead: true
        });
      } catch (error) {
        console.error("Error updating notification:", error);
      }
    }
    setIsNotificationsOpen(false);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <CalendarIcon size={18} className="text-purple-600" />;
      case 'message':
        return <MessageSquare size={18} className="text-blue-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-purple-50';
      case 'message':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

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
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsNotificationsOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <h3 className="font-bold text-gray-900">Bildirimler</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{unreadCount} Yeni</span>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">Bildirim bulunmuyor.</div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getNotificationBg(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <p className={`text-sm text-gray-900 ${!notification.isRead ? 'font-bold' : 'font-medium'}`}>{notification.title}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1.5">
                              {notification.createdAt ? formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
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
        {/* Total Properties */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">{stats.total}</div>
          <div className="flex items-end gap-1 h-10">
            {[40, 50, 45, 60, 55, 70, 65, 80, 90, 100].map((h, i) => (
              <div key={i} className={`w-full rounded-t-sm ${i > 6 ? 'bg-blue-600' : 'bg-blue-100'}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Portfolio Value</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">₺{stats.totalValue.toLocaleString('tr-TR')}</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Based on properties for sale</span>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">{stats.active}</div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Active Rate</span>
              <span className="font-medium text-gray-900">
                {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.total > 0 ? (stats.active / stats.total) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Listings Performance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Listings</h2>
          <div className="flex items-center gap-3">
            <Link to="/properties" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Plus size={16} />
              Add Listing
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : properties.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No properties found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {property.images && property.images.length > 0 ? (
                          <img src={property.images[0]} alt={property.title} className="w-16 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-16 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">No Img</div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">{property.location?.district}, {property.location?.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">₺{property.price?.toLocaleString('tr-TR')}</div>
                      <div className="text-xs text-gray-500 capitalize">{property.status}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/properties" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
