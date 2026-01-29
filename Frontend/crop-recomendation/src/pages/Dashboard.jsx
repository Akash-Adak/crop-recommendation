import { useEffect, useState } from "react";
import getWeatherData from "../api/weatherService";
import { fetchPredictionHistory } from "../api/auth";
import { 
  CloudIcon, 
  SunIcon, 
  CalendarIcon, 
  MapPinIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";

const DashboardPage = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");
  const username = localStorage.getItem("user");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadPredictionHistory();
    detectLocation();
  }, []);

  /* ================= HISTORY ================= */
  const loadPredictionHistory = async () => {
    try {
      const res = await fetchPredictionHistory();
      setRecommendations(Array.isArray(res.data.history) ? res.data.history : []);
    } catch (err) {
      console.error("History fetch failed", err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOCATION ================= */
  const detectLocation = () => {
    setLocationLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        setLocationLoading(false);
        loadWeather(latitude, longitude);
      },
      () => {
        setError("Unable to fetch location");
        setLocationLoading(false);
      }
    );
  };

  /* ================= WEATHER ================= */
  const loadWeather = async (lat, lon) => {
    try {
      const weatherData = await getWeatherData(lat, lon);
      setWeather(weatherData);
    } catch (err) {
      console.error("Weather fetch failed", err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-green-600">{username || "Farmer"}</span> 👋
          </h1>
          <p className="text-gray-600">Here's your farming dashboard overview</p>
        </div>

        {/* WEATHER & LOCATION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* WEATHER CARD */}
          {weather && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <CloudIcon className="h-6 w-6" />
                  Today's Weather
                </h3>
                <SunIcon className="h-8 w-8 text-yellow-300" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-5xl font-bold mb-2">{weather.temperature}°C</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <p>Humidity: <span className="font-semibold">{weather.humidity}%</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <p>Rainfall: <span className="font-semibold">{weather.rainfall} mm</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              {locationLoading && (
                <div className="mt-4 flex items-center gap-2 text-blue-100">
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  <p>Updating location...</p>
                </div>
              )}
            </div>
          )}

          {/* LOCATION STATUS */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPinIcon className="h-6 w-6 text-green-600" />
              Location Status
            </h3>
            
            {locationLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Detecting your location...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-medium">⚠️ {error}</p>
                <p className="text-red-500 text-sm mt-1">
                  Please enable location permissions for weather data
                </p>
              </div>
            ) : weather ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Location detected successfully</p>
                    <p className="text-sm text-gray-600">Weather data is from your current location</p>
                  </div>
                </div>
                <button
                  onClick={detectLocation}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  Refresh Location
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* HISTORY SECTION */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-green-600" />
              Prediction History
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Track your previous crop predictions
            </p>
          </div>

          <div className="p-6">
            {recommendations.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-gray-700 font-medium mb-2">No predictions yet</h4>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Your crop prediction history will appear here once you start using the system.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Crop
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recommendations.map((r) => (
                      <tr 
                        key={r._id} 
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-800 font-semibold text-sm">
                                {r.predicted_crop?.charAt(0) || "—"}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {r.predicted_crop || "Unknown Crop"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">
                            {new Date(r.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {new Date(r.created_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* STATS FOOTER */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Showing {recommendations.length} prediction{recommendations.length !== 1 ? 's' : ''} • 
            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;