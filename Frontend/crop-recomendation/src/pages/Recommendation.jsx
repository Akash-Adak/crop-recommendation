import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Recommendation = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    soilType: '',
    region: '',
    season: '',
    waterAvailability: '',
    budget: '',
    marketDemand: '',
    previousCrop: '',
    landSize: '',
    farmingType: ''
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const soilTypes = [
    'Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clay', 'Loamy', 'Mountain'
  ];

  const regions = [
    'North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'
  ];

  const seasons = [
    'Kharif (Jun-Oct)', 'Rabi (Nov-Mar)', 'Zaid (Apr-Jun)', 'Annual'
  ];

  const cropData = {
    'Alluvial': ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute'],
    'Black': ['Cotton', 'Wheat', 'Jowar', 'Sunflower', 'Groundnut'],
    'Red': ['Ragi', 'Groundnut', 'Potato', 'Rice', 'Tobacco'],
    'Loamy': ['Vegetables', 'Fruits', 'Maize', 'Wheat', 'Pulses']
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to get recommendations');
      navigate('/login');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations = [
        {
          name: 'Hybrid Wheat',
          suitability: '95%',
          profit: '₹45,000/acre',
          duration: '120 days',
          water: 'Medium',
          risk: 'Low',
          description: 'High yield variety suitable for your soil and region',
          image: '🌾'
        },
        {
          name: 'Basmati Rice',
          suitability: '88%',
          profit: '₹60,000/acre',
          duration: '150 days',
          water: 'High',
          risk: 'Medium',
          description: 'Premium quality rice with good market demand',
          image: '🌾'
        },
        {
          name: 'Organic Vegetables',
          suitability: '92%',
          profit: '₹75,000/acre',
          duration: '90 days',
          water: 'Medium',
          risk: 'Low',
          description: 'Mix of tomatoes, onions, and leafy vegetables',
          image: '🥬'
        }
      ];
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-roboto-slab text-farm-dark mb-4">
            Smart Crop Advisor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get AI-powered crop recommendations tailored to your farm's specific conditions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <div className="card shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-farm-green to-green-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-leaf text-2xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Farm Details</h2>
                  <p className="text-gray-600">Enter your farm information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Soil Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-mountain mr-2"></i>
                      Soil Type
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {soilTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, soilType: type})}
                          className={`py-2 px-3 rounded-lg text-center transition-all ${
                            formData.soilType === type
                              ? 'bg-farm-green text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      Region
                    </label>
                    <select
                      className="input-field"
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      required
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  {/* Season */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-cloud-sun mr-2"></i>
                      Season
                    </label>
                    <select
                      className="input-field"
                      value={formData.season}
                      onChange={(e) => setFormData({...formData, season: e.target.value})}
                      required
                    >
                      <option value="">Select Season</option>
                      {seasons.map((season) => (
                        <option key={season} value={season}>{season}</option>
                      ))}
                    </select>
                  </div>

                  {/* Water Availability */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-tint mr-2"></i>
                      Water Availability
                    </label>
                    <div className="flex space-x-2">
                      {['Low', 'Medium', 'High'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, waterAvailability: level})}
                          className={`flex-1 py-2.5 rounded-lg text-center transition-all ${
                            formData.waterAvailability === level
                              ? 'bg-sky-blue text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Land Size */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-ruler-combined mr-2"></i>
                      Land Size (acres)
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 5"
                      min="0.1"
                      step="0.1"
                      value={formData.landSize}
                      onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-rupee-sign mr-2"></i>
                      Budget (₹/acre)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="input-field pl-10"
                        placeholder="e.g., 50000"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      />
                      <i className="fas fa-rupee-sign absolute left-3 top-4 text-gray-400"></i>
                    </div>
                  </div>

                  {/* Market Demand */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-chart-line mr-2"></i>
                      Market Demand Priority
                    </label>
                    <select
                      className="input-field"
                      value={formData.marketDemand}
                      onChange={(e) => setFormData({...formData, marketDemand: e.target.value})}
                    >
                      <option value="">Select Priority</option>
                      <option value="high">High (Focus on profitable crops)</option>
                      <option value="medium">Medium (Balanced approach)</option>
                      <option value="low">Low (Focus on traditional crops)</option>
                    </select>
                  </div>

                  {/* Farming Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <i className="fas fa-tractor mr-2"></i>
                      Farming Type
                    </label>
                    <select
                      className="input-field"
                      value={formData.farmingType}
                      onChange={(e) => setFormData({...formData, farmingType: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="organic">Organic Farming</option>
                      <option value="conventional">Conventional</option>
                      <option value="mixed">Mixed Farming</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-seedling"></i>
                        <span>Get Crop Recommendations</span>
                        <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <div>
            <div className="sticky top-24">
              {recommendations.length > 0 ? (
                <div>
                  <div className="bg-gradient-to-r from-farm-green to-green-600 text-white p-6 rounded-xl shadow-lg mb-6">
                    <h3 className="text-2xl font-bold font-roboto-slab mb-2">Best Matches Found!</h3>
                    <p className="text-white/90">Based on your farm details</p>
                  </div>

                  <div className="space-y-6">
                    {recommendations.map((crop, index) => (
                      <div key={index} className="card card-hover border-2 border-green-100">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{crop.image}</div>
                            <div>
                              <h4 className="font-bold text-xl text-gray-800">{crop.name}</h4>
                              <span className="inline-block px-3 py-1 bg-green-100 text-farm-green rounded-full text-sm font-medium">
                                {crop.suitability} match
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-farm-dark">{crop.profit}</div>
                            <div className="text-sm text-gray-500">estimated profit</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{crop.description}</p>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <div className="font-semibold text-blue-700">{crop.duration}</div>
                            <div className="text-xs text-gray-500">Duration</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded-lg">
                            <div className="font-semibold text-green-700">{crop.water}</div>
                            <div className="text-xs text-gray-500">Water</div>
                          </div>
                          <div className={`p-2 rounded-lg ${
                            crop.risk === 'Low' ? 'bg-green-50 text-green-700' : 
                            crop.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 
                            'bg-red-50 text-red-700'
                          }`}>
                            <div className="font-semibold">{crop.risk}</div>
                            <div className="text-xs text-gray-500">Risk</div>
                          </div>
                        </div>
                        
                        <button className="w-full mt-4 bg-farm-green hover:bg-farm-dark text-white py-2.5 rounded-lg transition-colors">
                          <i className="fas fa-info-circle mr-2"></i>
                          View Detailed Plan
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="card text-center py-12 border-2 border-dashed border-gray-300">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-seedling text-3xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-3">Get Recommendations</h3>
                  <p className="text-gray-600 mb-6">
                    Fill in your farm details to receive personalized crop suggestions
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-check-circle text-farm-green mr-2"></i>
                      <span>AI-powered analysis</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-check-circle text-farm-green mr-2"></i>
                      <span>Market trend consideration</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-check-circle text-farm-green mr-2"></i>
                      <span>Profitability estimates</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;