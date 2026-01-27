import axios from "axios";
import dotenv from "dotenv";
import { getWeatherData } from "../services/weatherService.js";
import { getMarketPrice } from "../services/marketService.js";
import Prediction from "../models/Prediction.js";

dotenv.config();

export async function recommendCrop(req, res) {
  try {
    /* ================= JWT USER ================= */
    const user = req.user; // from authMiddleware
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    /* ================= INPUT MAPPING ================= */
    const {
      nutrients = {},
      climate = {},
      location = {}
    } = req.body;

    const N  = Number(nutrients.nitrogen);
    const P  = Number(nutrients.phosphorus);
    const K  = Number(nutrients.potassium);
    const ph = Number(nutrients.ph);

    const lat = location.latitude;
    const lon = location.longitude;

    let finalTemperature = Number(climate.temperature) || 25;
    let finalHumidity    = Number(climate.humidity) || 50;
    let finalRainfall    = Number(climate.rainfall) || 100;
    let weatherSource    = "Manual Input";

    /* ================= WEATHER FETCH ================= */
    if (lat && lon) {
      const weather = await getWeatherData(lat, lon);
      if (weather) {
        finalTemperature = weather.temperature;
        finalHumidity    = weather.humidity;
        finalRainfall    = weather.rainfall;
        weatherSource    = `OpenWeatherMap (${weather.location})`;
      }
    }

    /* ================= ML PAYLOAD ================= */
    const aiPayload = {
      nitrogen: N,
      phosphorous: P,
      potassium: K,
      ph,
      temperature: finalTemperature,
      humidity: finalHumidity,
      rainfall: finalRainfall
    };

    /* ================= ML SERVER ================= */
    const mlResponse = await axios.post(
      process.env.ML_SERVER_URL || "http://localhost:8000/predict",
      aiPayload,
      { timeout: 5000 }
    );

    const { recommended_crop, top_3_crops } = mlResponse.data;

    if (!recommended_crop) {
      return res.status(500).json({
        success: false,
        message: "ML model did not return prediction"
      });
    }

    const estimatedPrice = getMarketPrice(recommended_crop);

    /* ================= SAVE HISTORY ================= */
    try {
      await Prediction.create({
        userId: user.id,
        inputs: {
          nitrogen: N,
          phosphorus: P,
          potassium: K,
          ph,
          temperature: finalTemperature,
          humidity: finalHumidity,
          rainfall: finalRainfall
        },
        predicted_crop: recommended_crop,
        alternatives: top_3_crops,
        market_price: estimatedPrice,
        weather_source: weatherSource
      });
    } catch (dbError) {
      console.error("⚠️ Prediction save failed:", dbError.message);
    }

    /* ================= RESPONSE ================= */
    return res.status(200).json({
      success: true,
      predictions: [
        {
          id: 1,
          name: recommended_crop,
          confidence: "90%",
          season: "Seasonal",
          profit: "High",
          duration: "100-120 days",
          water: "Medium",
          fertilizer: "Recommended as per soil"
        }
      ],
      top_alternatives: top_3_crops,
      market_price: estimatedPrice,
      currency: "INR/Quintal",
      weather_used: {
        source: weatherSource,
        temperature: finalTemperature,
        humidity: finalHumidity,
        rainfall: finalRainfall
      }
    });

  } catch (err) {
    console.error("❌ Recommendation error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to process crop recommendation"
    });
  }
}
