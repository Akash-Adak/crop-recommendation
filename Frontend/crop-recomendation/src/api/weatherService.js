const MOCK_WEATHER = {
  temperature: 26,
  humidity: 70,
  rainfall: 0,
  location: "Mock Weather"
};

export default async function getWeatherData(lat, lon) {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,rain`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API failed");
    }

    const data = await response.json();

    if (!data?.current) {
      console.warn("⚠ Invalid weather format, using mock");
      return MOCK_WEATHER;
    }

    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      rainfall: data.current.rain || 0,
      location: `Lat ${lat}, Lon ${lon}`
    };

  } catch (error) {
    console.error("Weather API Error:", error.message);
    return MOCK_WEATHER;
  }
}
