// Fetch NASA POWER climate averages for a given lat/lng and year range
 export default async function FindClimates(lat, lng, startYear, endYear) {
  try {
    const response = await fetch(
      `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,RH2M&community=AG&longitude=${lng}&latitude=${lat}&start=${startYear}&end=${endYear}&format=JSON`
    );
    const jsonData = await response.json();
    const params = jsonData?.properties?.parameter;
    if (!params) throw new Error("No parameter data returned from NASA POWER");

    // Group by year
    const yearlyData = {};

    for (const [date, temp] of Object.entries(params.T2M || {})) {
      const year = date.slice(0, 4);
      if (!yearlyData[year]) yearlyData[year] = { temps: [], rains: [], hums: [] };
      yearlyData[year].temps.push(temp);
    }

    for (const [date, rain] of Object.entries(params.PRECTOTCORR || {})) {
      const year = date.slice(0, 4);
      if (!yearlyData[year]) yearlyData[year] = { temps: [], rains: [], hums: [] };
      yearlyData[year].rains.push(rain);
    }

    for (const [date, hum] of Object.entries(params.RH2M || {})) {
      const year = date.slice(0, 4);
      if (!yearlyData[year]) yearlyData[year] = { temps: [], rains: [], hums: [] };
      yearlyData[year].hums.push(hum);
    }

    // Compute averages per year
    const results = Object.entries(yearlyData).map(([_, values]) => {
      const meanTemp = values.temps.reduce((a, b) => a + b, 0) / values.temps.length;
      const totalRain = values.rains.reduce((a, b) => a + b, 0); // mm/year
      const meanHumidity = values.hums.reduce((a, b) => a + b, 0) / values.hums.length;
      return { meanTemp, totalRain, meanHumidity };
    });

    // Compute overall averages across all years
    const avgTemp = results.reduce((a, b) => a + b.meanTemp, 0) / results.length;
    const avgRain = results.reduce((a, b) => a + b.totalRain, 0) / results.length;
    const avgHumidity = results.reduce((a, b) => a + b.meanHumidity, 0) / results.length;

    // Return only the three average values
    return {
      avgTemp: Number(avgTemp.toFixed(3)),
      avgRain: Number(avgRain.toFixed(3)),
      avgHumidity: Number(avgHumidity.toFixed(3))
    };
  } catch (err) {
    console.error("NASA POWER error:", err);
    throw err;
  }
}
// export default FindClimates;

// (async () => {
//   const lat = 22.0627;   // Example: Haldia, India
//   const lng = 88.0833;

//   const averages = await fetchClimateAverages(lat, lng, "2015", "2024");
//   console.log("Climate Averages:", averages);
//   // Output: { avgTemp: 23.456, avgRain: 1265.432, avgHumidity: 81.567 }
// })();

