import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Property {
  id: string;
  title: string;
  price: number;
  views?: number;
  createdAt?: any;
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState({
    totalValue: 0,
    totalProperties: 0,
    avgPrice: 0,
    topProperties: [] as Property[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propsData: Property[] = [];
      let totalVal = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const price = Number(data.price) || 0;
        totalVal += price;
        propsData.push({
          id: doc.id,
          title: data.title || 'Unnamed Listing',
          price: price,
          views: Math.floor(Math.random() * 1000) + 100, // Mock views for now
          createdAt: data.createdAt
        });
      });

      // Sort by views (mocked) to get top properties
      const sortedProps = [...propsData].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

      setProperties(propsData);
      setStats({
        totalValue: totalVal,
        totalProperties: propsData.length,
        avgPrice: propsData.length > 0 ? totalVal / propsData.length : 0,
        topProperties: sortedProps
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const statCards = [
    { title: 'Total Portfolio Value', value: formatCurrency(stats.totalValue), change: '+12.5%', isPositive: true, icon: TrendingUp },
    { title: 'Total Properties', value: stats.totalProperties.toString(), change: '+5.2%', isPositive: true, icon: Eye },
    { title: 'Average Price', value: formatCurrency(stats.avgPrice), change: '-2.1%', isPositive: false, icon: Users },
    { title: 'Conversion Rate', value: '3.8%', change: '+1.2%', isPositive: true, icon: BarChart3 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Track your property performance and portfolio value</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
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
            <h2 className="text-lg font-bold text-gray-900">Portfolio Growth</h2>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>This Year</option>
              <option>Last Year</option>
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
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Properties (Views)</h2>
          <div className="space-y-6">
            {stats.topProperties.length > 0 ? (
              stats.topProperties.map((prop, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="overflow-hidden pr-4">
                    <p className="text-sm font-medium text-gray-900 truncate">{prop.title}</p>
                    <p className="text-xs text-gray-500">{prop.views} views</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 whitespace-nowrap">
                    +{(Math.random() * 15 + 1).toFixed(1)}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No properties found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
