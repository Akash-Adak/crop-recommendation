import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  FindClimates from "../api/fetchClimateAverages";
// import {recommendCrop} from "../api/recommendCrop ";

const CropPrediction = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [predictionType, setPredictionType] = useState('basic');
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  // Predefined soil nutrient data for quick prediction
  const soilNutrientData = {
    'Black': {
      nitrogen: '80',
      phosphorus: '40',
      potassium: '180',
      ph: '7.2'
    },
    'Red': {
      nitrogen: '60',
      phosphorus: '25',
      potassium: '120',
      ph: '6.5'
    },
    'Clay': {
      nitrogen: '90',
      phosphorus: '45',
      potassium: '200',
      ph: '7.5'
    },
    'Sandy': {
      nitrogen: '40',
      phosphorus: '20',
      potassium: '90',
      ph: '6.0'
    },
    'Alluvial': {
      nitrogen: '70',
      phosphorus: '35',
      potassium: '160',
      ph: '7.0'
    }
  };

  // Basic form data - only location and soil type
  const [basicFormData, setBasicFormData] = useState({
    soilColor: ''
  });

  // Advanced form data - complete soil analysis
  const [advancedFormData, setAdvancedFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: ''
  });

  // Get user location automatically
  const getLocation = () => {
    setLocationLoading(true);
    setError('');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Reverse geocoding using OpenStreetMap Nominatim
          const res = await fetch(
  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
  {
    headers: {
      "User-Agent": "CropPredictionApp/1.0"
    }
  }
);

            const data = await res.json();

            setLocation({
              latitude,
              longitude,
              name: data.display_name || 'Your Location',
              state: data.address?.state || '',
              country: data.address?.country || ''
            });
          } catch (err) {
            console.error("Reverse geocoding error:", err);
            setLocation({ 
              latitude, 
              longitude, 
              name: 'Location detected' 
            });
          }

          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError('Unable to get location. Please enable location services.');
          setLocationLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleBasicChange = (value) => {
    setBasicFormData({ soilColor: value });
  };

  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFormData(prev => ({ ...prev, [name]: value }));
  };

const sendToBackend = async (payload) => {
  try {
    setLoading(true);
    setError('');

    const API_URL = 'http://localhost:5000/api/crop/recommend';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // ✅ normalize response
    return (
      data.predictions ||
      data.recommendations ||
      data.data ||
      []
    );

  } catch (err) {
    console.error('API Error:', err);
    setError('Prediction service unavailable. Showing sample results.');
   
  } finally {
    setLoading(false);
  }
};



// submit basic details
const handleBasicSubmit = async (e) => {
  e.preventDefault();

  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  if (!location || !basicFormData.soilColor) {
    setError("Location and soil type are required");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const soilData = soilNutrientData[basicFormData.soilColor];

    const climate = await FindClimates(
      location.latitude,
      location.longitude,
      2023,
      2024
    );

    const finalClimate = {
      temperature: climate?.avgTemp ?? 25,
      humidity: climate?.avgHumidity ?? 50,
      rainfall: climate?.avgRain ?? 100
    };

    /* ✅ PAYLOAD MATCHES FASTAPI 1:1 */
    const payload = {
      nitrogen: Number(soilData.nitrogen),
      phosphorous: Number(soilData.phosphorus), // 👈 spelling FIXED
      potassium: Number(soilData.potassium),
      ph: Number(soilData.ph),
      temperature: finalClimate.temperature,
      humidity: finalClimate.humidity,
      rainfall: finalClimate.rainfall
    };

    const result = await sendToBackend(payload);

    if (Array.isArray(result) && result.length > 0) {
      setPredictions(result);
      setShowResults(true);
    } else {
      setError("No predictions received");
    }

  } catch (err) {
    console.error("Basic prediction error:", err);
    setError("Failed to fetch climate or prediction data");
  } finally {
    setLoading(false);
  }
};



// submit form based input
 const handleAdvancedSubmit = async (e) => {
  e.preventDefault();

  if (!isAuthenticated) {
    navigate('/login');
    return;
  }

  if (!location) {
    setError('Location is required for detailed prediction');
    return;
  }

  const payload = {
      nitrogen: Number(advancedFormData.nitrogen),
      phosphorus: Number(advancedFormData.phosphorus),
      potassium: Number(advancedFormData.potassium),
      ph: Number(advancedFormData.ph),

      temperature: Number(advancedFormData.temperature),
      humidity: Number(advancedFormData.humidity),
      rainfall: Number(advancedFormData.rainfall)
  };

  const result = await sendToBackend(payload);

  if (Array.isArray(result) && result.length) {
    setPredictions(result);
    setShowResults(true);
  }
};


  const soilColors = [
    { value: 'Black', label: 'Black Soil', color: 'bg-gray-900' },
    { value: 'Red', label: 'Red Soil', color: 'bg-red-600' },
    { value: 'Clay', label: 'Clay Soil', color: 'bg-yellow-800' },
    { value: 'Sandy', label: 'Sandy Soil', color: 'bg-yellow-400' },
    { value: 'Alluvial', label: 'Alluvial Soil', color: 'bg-green-800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Crop Prediction
          </h1>
          <p className="text-gray-600">
            Get AI-powered crop recommendations
          </p>
        </div>

        {/* Prediction Type Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => { 
                setPredictionType('basic'); 
                setShowResults(false); 
                setError('');
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                predictionType === 'basic'
                  ? 'bg-white text-farm-green shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quick Prediction
            </button>
            <button
              onClick={() => { 
                setPredictionType('advanced'); 
                setShowResults(false); 
                setError('');
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                predictionType === 'advanced'
                  ? 'bg-white text-farm-green shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Detailed Analysis
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!showResults ? (
          <div>
            {/* Basic Form */}
            {predictionType === 'basic' && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Prediction</h2>
                
                {/* Location Status */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">Location</span>
                    <button
                      onClick={getLocation}
                      disabled={locationLoading}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <i className={`fas ${locationLoading ? 'fa-spin fa-sync-alt' : 'fa-sync-alt'} mr-1`}></i>
                      {locationLoading ? 'Detecting...' : 'Refresh'}
                    </button>
                  </div>
                  
                  {location ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <div>
                          <div className="font-medium">{location.name}</div>
                          {location.latitude && location.longitude && (
                            <div className="text-xs text-gray-500 mt-1">
                              Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <i className="fas fa-map-marker-alt text-2xl text-gray-400 mb-3"></i>
                      <p className="text-gray-600 mb-3">Location not detected</p>
                      <button
                        onClick={getLocation}
                        disabled={locationLoading}
                        className="bg-farm-green hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mx-auto"
                      >
                        {locationLoading ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Detecting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-location-dot mr-2"></i>
                            Enable Location
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Soil Type Selection */}
                <div className="mb-8">
                  <label className="block font-medium text-gray-700 mb-3">
                    Select Soil Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {soilColors.map((soil) => (
                      <button
                        key={soil.value}
                        type="button"
                        onClick={() => handleBasicChange(soil.value)}
                        className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                          basicFormData.soilColor === soil.value
                            ? 'border-farm-green bg-green-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-md ${soil.color} mb-2`}></div>
                        <span className="text-sm font-medium text-gray-700">{soil.label}</span>
                        {basicFormData.soilColor === soil.value && (
                          <div className="text-xs text-farm-green mt-1">
                            <i className="fas fa-check"></i> Selected
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Show nutrient data for selected soil */}
                  {basicFormData.soilColor && soilNutrientData[basicFormData.soilColor] && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-gray-700 mb-2">
                        <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                        Predefined nutrient values for {basicFormData.soilColor} soil:
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium">Nitrogen</div>
                          <div className="text-gray-600">{soilNutrientData[basicFormData.soilColor].nitrogen} ppm</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Phosphorus</div>
                          <div className="text-gray-600">{soilNutrientData[basicFormData.soilColor].phosphorus} ppm</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Potassium</div>
                          <div className="text-gray-600">{soilNutrientData[basicFormData.soilColor].potassium} ppm</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">pH</div>
                          <div className="text-gray-600">{soilNutrientData[basicFormData.soilColor].ph}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleBasicSubmit}
                  disabled={loading || !location || !basicFormData.soilColor}
                  className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                    location && basicFormData.soilColor
                      ? 'bg-farm-green hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending to AI Model...
                    </>
                  ) : (
                    'Get Predictions'
                  )}
                </button>
              </div>
            )}

            {/* Advanced Form */}
            {predictionType === 'advanced' && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Detailed Soil Analysis</h2>
                
                <form onSubmit={handleAdvancedSubmit}>
                  <div className="space-y-6">
                    {/* Soil Nutrients */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                        <i className="fas fa-flask text-purple-500 mr-2"></i>
                        Soil Nutrient Levels (ppm)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Nitrogen (N)</label>
                          <input
                            type="number"
                            name="nitrogen"
                            min="0"
                            max="140"
                            step="1"
                            placeholder="Enter N level"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.nitrogen}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Range: 0-140 ppm</div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Phosphorus (P)</label>
                          <input
                            type="number"
                            name="phosphorus"
                            min="5"
                            max="145"
                            step="1"
                            placeholder="Enter P level"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.phosphorus}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Range: 5-145 ppm</div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Potassium (K)</label>
                          <input
                            type="number"
                            name="potassium"
                            min="5"
                            max="205"
                            step="1"
                            placeholder="Enter K level"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.potassium}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Range: 5-205 ppm</div>
                        </div>
                      </div>
                    </div>

                    {/* Climate Parameters */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                        <i className="fas fa-cloud-sun text-blue-500 mr-2"></i>
                        Climate Parameters
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">pH Level</label>
                          <input
                            type="number"
                            name="ph"
                            min="3.5"
                            max="9.0"
                            step="0.1"
                            placeholder="e.g., 6.5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.ph}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Ideal: 6.0-7.5</div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Temperature (°C)</label>
                          <input
                            type="number"
                            name="temperature"
                            min="10"
                            max="50"
                            step="0.1"
                            placeholder="e.g., 25"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.temperature}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Range: 10-50°C</div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Humidity (%)</label>
                          <input
                            type="number"
                            name="humidity"
                            min="15"
                            max="100"
                            step="1"
                            placeholder="e.g., 65"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.humidity}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Range: 15-100%</div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Rainfall (mm)</label>
                          <input
                            type="number"
                            name="rainfall"
                            min="20"
                            max="300"
                            step="1"
                            placeholder="e.g., 100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-farm-green focus:border-transparent"
                            value={advancedFormData.rainfall}
                            onChange={handleAdvancedChange}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">Range: 20-300 mm</div>
                        </div>
                      </div>
                    </div>

                    {/* Data Preview */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-sm text-gray-700 mb-2">
                        <i className="fas fa-database text-gray-500 mr-2"></i>
                        Data to be sent to AI model:
                      </div>
                      <pre className="text-xs bg-white p-2 rounded border text-gray-600 overflow-x-auto">
                        {JSON.stringify({
                          type: 'advanced',
                          nutrients: {
                            nitrogen: advancedFormData.nitrogen || '(empty)',
                            phosphorus: advancedFormData.phosphorus || '(empty)',
                            potassium: advancedFormData.potassium || '(empty)',
                            ph: advancedFormData.ph || '(empty)'
                          },
                          climate: {
                            temperature: advancedFormData.temperature || '(empty)',
                            humidity: advancedFormData.humidity || '(empty)',
                            rainfall: advancedFormData.rainfall || '(empty)'
                          }
                        }, null, 2)}
                      </pre>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-farm-green hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending to AI Model...
                        </>
                      ) : (
                        'Get Detailed Predictions'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* Results Display */
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">AI Prediction Results</h2>
                <p className="text-gray-600 text-sm">
                  Based on {predictionType === 'basic' ? 'location and soil type' : 'detailed soil analysis'}
                </p>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back to Input
              </button>
            </div>

            {/* Results Summary */}
            <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Analysis complete
                  </p>
                  <p className="text-sm text-gray-500">
                    AI model processed your data and found {predictions.length} suitable crops
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-farm-green">{predictions[0]?.confidence}</div>
                  <div className="text-sm text-gray-500">Top match confidence</div>
                </div>
              </div>
            </div>

            {/* Crop Cards */}
            <div className="space-y-4">
              {predictions.map((crop) => (
                <div key={crop.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-2xl">{crop.icon || '🌾'}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{crop.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            {crop.confidence} match
                          </span>
                          <span className="text-xs text-gray-500">{crop.season}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-500 text-xs mb-1">Profit Potential</div>
                      <div className="font-medium text-gray-800">{crop.profit}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-500 text-xs mb-1">Duration</div>
                      <div className="font-medium text-gray-800">{crop.duration}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-500 text-xs mb-1">Water Needs</div>
                      <div className="font-medium text-gray-800">{crop.water}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-500 text-xs mb-1">Fertilizer</div>
                      <div className="font-medium text-gray-800 text-xs">{crop.fertilizer}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button className="text-sm text-farm-green hover:text-green-700 flex items-center">
                      <i className="fas fa-info-circle mr-1"></i>
                      View detailed plan
                    </button>
                    <button className="text-sm bg-farm-green text-white px-3 py-1 rounded hover:bg-green-600">
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setShowResults(false)}
                  className="py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Try Again
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setPredictionType(predictionType === 'basic' ? 'advanced' : 'basic');
                  }}
                  className="py-3 border border-farm-green text-farm-green rounded-lg hover:bg-green-50 transition-colors"
                >
                  <i className="fas fa-exchange-alt mr-2"></i>
                  Try {predictionType === 'basic' ? 'Detailed' : 'Quick'}
                </button>
                <button
                  className="py-3 bg-farm-green text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simple Footer Note */}
        {!showResults && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              <i className="fas fa-shield-alt mr-2"></i>
              Your data is sent securely to our AI model for analysis
            </p>
            <p className="text-xs mt-1">
              API Endpoint: https://your-backend-api.com/predict
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;