import { useState } from 'react';

const DashboardPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Recommendations', value: '24', icon: 'fa-leaf', color: 'bg-green-500' },
    { label: 'Yield Increase', value: '35%', icon: 'fa-chart-line', color: 'bg-blue-500' },
    { label: 'Saved Water', value: '12k L', icon: 'fa-tint', color: 'bg-cyan-500' },
    { label: 'Profit Increase', value: '₹1.2L', icon: 'fa-rupee-sign', color: 'bg-yellow-500' }
  ];

  const recentRecommendations = [
    { crop: 'Hybrid Wheat', date: '2024-01-15', status: 'Planted', profit: '₹45,000' },
    { crop: 'Basmati Rice', date: '2023-12-10', status: 'Harvested', profit: '₹60,000' },
    { crop: 'Organic Vegetables', date: '2023-11-05', status: 'Growing', profit: '₹75,000' }
  ];

  const weather = {
    temperature: '28°C',
    condition: 'Sunny',
    humidity: '65%',
    rainfall: 'Low',
    forecast: 'Good for irrigation'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-roboto-slab text-farm-dark mb-2">
            Welcome back, {user?.name || 'Farmer'}! 👋
          </h1>
          <p className="text-gray-600">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {user?.location || 'Location not set'} • {user?.farmSize || '0'} acres
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <i className={`fas ${stat.icon} text-white text-xl`}></i>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              {['overview', 'crops', 'reports', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-farm-green text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="card">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Farm Overview</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center">
                        <i className="fas fa-calendar-check mr-2 text-farm-green"></i>
                        Current Season Plan
                      </h4>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                        <p className="text-gray-700">
                          <strong>Kharif Season:</strong> Rice cultivation recommended. 
                          Plant by June 15th for optimal yield.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center">
                        <i className="fas fa-tasks mr-2 text-farm-green"></i>
                        Recent Activities
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <i className="fas fa-seedling text-farm-green mr-3"></i>
                            <span>Wheat seeds ordered</span>
                          </div>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <i className="fas fa-tint text-blue-500 mr-3"></i>
                            <span>Irrigation scheduled</span>
                          </div>
                          <span className="text-sm text-gray-500">1 week ago</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations Table */}
            <div className="card mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Recommendations</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3">Crop</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Profit</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRecommendations.map((rec, index) => (
                      <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center">
                            <i className="fas fa-seedling text-farm-green mr-3"></i>
                            {rec.crop}
                          </div>
                        </td>
                        <td className="p-3">{rec.date}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            rec.status === 'Harvested' ? 'bg-green-100 text-green-700' :
                            rec.status === 'Planted' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-gray-800">{rec.profit}</td>
                        <td className="p-3">
                          <button className="text-farm-green hover:text-farm-dark">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weather Card */}
            <div className="card bg-gradient-to-br from-sky-blue to-blue-500 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Weather</h3>
                  <p className="text-white/90">Today's forecast</p>
                </div>
                <i className="fas fa-cloud-sun text-3xl"></i>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">{weather.temperature}</div>
                <p className="text-xl">{weather.condition}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <div className="text-sm opacity-90">Humidity</div>
                  <div className="text-xl font-bold">{weather.humidity}</div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <div className="text-sm opacity-90">Rainfall</div>
                  <div className="text-xl font-bold">{weather.rainfall}</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-center">
                  <i className="fas fa-lightbulb mr-2"></i>
                  {weather.forecast}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-farm-green rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <i className="fas fa-leaf text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Get New Recommendation</p>
                      <p className="text-sm text-gray-600">Get crop suggestions</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <i className="fas fa-chart-bar text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold">View Reports</p>
                      <p className="text-sm text-gray-600">Analytics & insights</p>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors group">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-sun-yellow rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <i className="fas fa-shopping-cart text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Market Prices</p>
                      <p className="text-sm text-gray-600">Check crop rates</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Farm Tips */}
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Farm Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-lightbulb text-sun-yellow text-xl mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-800">Soil Testing</p>
                    <p className="text-sm text-gray-600">Test soil every 6 months for optimal nutrients</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-lightbulb text-sun-yellow text-xl mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-800">Water Conservation</p>
                    <p className="text-sm text-gray-600">Use drip irrigation to save 30% water</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;   