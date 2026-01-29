import axios from "axios";
import dotenv from "dotenv";
import { getWeatherData } from "../services/weatherService.js";
import { getMarketPrice } from "../services/marketService.js";
import Prediction from "../models/Prediction.js";

dotenv.config();

/* ================= SAFE NUMBER PARSER ================= */
const toNumber = (value, fallback = null) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export async function recommendCrop(req, res) {
  try {
    /* ================= JWT USER ================= */
    const user = req.user;
    console.log("user details",user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
   

    /* ================= INPUT NORMALIZATION ================= */
    const body = req.body || {};

    // Detect flat (FastAPI-style) payload
    const isFlatPayload =
      body.nitrogen !== undefined &&
      body.phosphorous !== undefined;

    const nutrients = body.nutrients || {};
    const climate   = body.climate   || {};
    const location  = body.location  || {};

    /* ================= FINAL ML INPUT ================= */
    const N = isFlatPayload
      ? toNumber(body.nitrogen)
      : toNumber(nutrients.nitrogen);

    const P = isFlatPayload
      ? toNumber(body.phosphorous)
      : toNumber(nutrients.phosphorus);

    const K = isFlatPayload
      ? toNumber(body.potassium)
      : toNumber(nutrients.potassium);

    const ph = isFlatPayload
      ? toNumber(body.ph)
      : toNumber(nutrients.ph);

    let finalTemperature = isFlatPayload
      ? toNumber(body.temperature, 25)
      : toNumber(climate.temperature, 25);

    let finalHumidity = isFlatPayload
      ? toNumber(body.humidity, 50)
      : toNumber(climate.humidity, 50);

    let finalRainfall = isFlatPayload
      ? toNumber(body.rainfall, 100)
      : toNumber(climate.rainfall, 100);

    let weatherSource = "Manual Input";

    /* ================= BASIC VALIDATION ================= */
    if (
      [N, P, K, ph, finalTemperature, finalHumidity, finalRainfall].some(
        v => v === null
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing input values"
      });
    }

    /* ================= WEATHER FETCH ================= */
    const lat = location.latitude;
    const lon = location.longitude;

    if (lat && lon) {
      const weather = await getWeatherData(lat, lon);
      if (weather) {
        finalTemperature = weather.temperature;
        finalHumidity    = weather.humidity;
        finalRainfall    = weather.rainfall;
        weatherSource    = `OpenWeatherMap (${weather.location})`;
      }
    }

    /* ================= ML PAYLOAD (FastAPI CONTRACT) ================= */
    const aiPayload = {
      nitrogen: N,
      phosphorous: P,
      potassium: K,
      ph,
      temperature: finalTemperature,
      humidity: finalHumidity,
      rainfall: finalRainfall
    };

    console.log("🚜 ML Payload → FastAPI:", aiPayload);

    /* ================= ML SERVER ================= */
    const mlResponse = await axios.post(
      process.env.ML_SERVER_URL || "http://localhost:8000/predict",
      aiPayload,
      { timeout: 5000 }
    );

    const { recommended_crop, top_3_crops, confidence } = mlResponse.data;

    if (!recommended_crop) {
      return res.status(500).json({
        success: false,
        message: "ML model did not return prediction"
      });
    }

    /* ================= MARKET PRICE ================= */
    const estimatedPrice = getMarketPrice(recommended_crop);

    /* ================= SAVE HISTORY ================= */
    try {
      await Prediction.create({
        user_id: user.email,
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
          confidence: `${Math.round((confidence || 0.9) * 100)}%`,
          season: "Seasonal",
          profit: "High",
          duration: "100–120 days",
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
    console.error("❌ Recommendation error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to process crop recommendation"
    });
  }
}
