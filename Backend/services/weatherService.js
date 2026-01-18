const axios = require("axios");
require("dotenv").config();

exports.getWeatherData = async (lat, lon) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    // We explicitly ask for metric units (Celsius, mm)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    const response = await axios.get(url);
    const data = response.data;

    // OpenWeather returns rain volume for last 1h or 3h if available
    // If no rain object exists, it means 0 rainfall right now
    let rainfallValue = 0;
    if (data.rain) {
      rainfallValue = data.rain['1h'] || data.rain['3h'] || 0;
    }

    return {
      temperature: data.main.temp,     // automates 'temperature'
      humidity: data.main.humidity,    // automates 'humidity'
      rainfall: rainfallValue,         // automates 'rainfall'
      location: data.name
    };
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return null;
  }
};

/*
Rainfall Warning: Since OpenWeather gives current rainfall (mm/hour), it might be 0 on a sunny day. Your crop model likely expects seasonal rainfall (mm/year or mm/season).

Quick Fix: In the controller logic, I allowed the API to set it. If it's 0, it might affect the prediction. You might want to discuss with your team: "Should we stick to manual rainfall input since the AI needs seasonal averages, or do we want to trust the live API?" (For now, the code above uses the API value if coordinates are sent).
*/