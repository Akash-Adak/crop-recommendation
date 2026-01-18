const axios = require("axios");
const { getWeatherData } = require("../services/weatherService");
const { getMarketPrice } = require("../services/marketService");
require("dotenv").config();

exports.recommendCrop = async (req, res) => {
  try {
    let { N, P, K, ph, lat, lon, ...otherInputs } = req.body;
    
    // Default values if manual input is missing
    let finalTemperature = parseFloat(otherInputs.temperature) || 25.0;
    let finalHumidity = parseFloat(otherInputs.humidity) || 50.0;
    let finalRainfall = parseFloat(otherInputs.rainfall) || 100.0; // Default reasonable rain
    let weatherSource = "Manual Input";

    // 1. INTELLIGENCE LAYER: Automate what we can (Temp, Humidity, Rain)
    if (lat && lon) {
      console.log("📍 Coordinates detected. Fetching live weather...");
      const weather = await getWeatherData(lat, lon);
      
      if (weather) {
        finalTemperature = weather.temperature;
        finalHumidity = weather.humidity;
        
        // Only override rainfall if the API actually reports rain (preventing 0 override if user typed a value)
        // Or, strict automation: Assume current weather is what matters
        finalRainfall = weather.rainfall; 
        
        weatherSource = `OpenWeatherMap (${weather.location})`;
      }
    }

    // 2. PREPARE PYTHON PAYLOAD
    // Your FastAPI 'CropInput' class demands these EXACT keys:
    const aiPayload = {
      nitrogen: parseFloat(N),        // Maps frontend 'N' to Python 'nitrogen'
      phosphorous: parseFloat(P),     // Maps frontend 'P' to Python 'phosphorous'
      potassium: parseFloat(K),       // Maps frontend 'K' to Python 'potassium'
      ph: parseFloat(ph),             // MUST be manual
      temperature: finalTemperature,  // Automated or Manual
      humidity: finalHumidity,        // Automated or Manual
      rainfall: finalRainfall         // Automated or Manual
    };

    console.log("📤 Sending payload to AI:", aiPayload);

    // 3. PREDICTION LAYER: Call Python
    const mlResponse = await axios.post(
      process.env.ML_SERVER_URL || "http://localhost:8000/predict",
      aiPayload
    );

    // Python returns: { "recommended_crop": "Rice", "top_3_crops": [...] }
    const { recommended_crop, top_3_crops } = mlResponse.data;

    // 4. VALUE LAYER: Calculate Price
    const estimatedPrice = getMarketPrice(recommended_crop);

    // 5. Send Unified Response
    res.json({
      success: true,
      prediction: recommended_crop,
      top_alternatives: top_3_crops,
      market_price: estimatedPrice,
      currency: "INR/Quintal",
      weather_used: {
        source: weatherSource,
        temp: finalTemperature,
        humid: finalHumidity,
        rain: finalRainfall
      }
    });

  } catch (err) {
    console.error("Error in recommendation flow:", err.message);
    if (err.response) {
      console.error("Python Server Error Data:", err.response.data);
    }
    res.status(500).json({ error: "Failed to process crop recommendation" });
  }
};