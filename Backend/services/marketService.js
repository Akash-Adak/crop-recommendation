// Base prices in ₹ per Quintal [Mocked Data]
const MARKET_PRICES = {
  rice: 2500, maize: 2150, jute: 4500, cotton: 6200, 
  coconut: 3500, papaya: 2800, orange: 3200, apple: 8000, 
  muskmelon: 1800, watermelon: 1500, grapes: 5500, 
  mango: 4200, banana: 2200, pomegranate: 6500, 
  lentil: 5800, blackgram: 6300, mungbean: 7100, 
  mothbeans: 6000, pigeonpeas: 5900, kidneybeans: 7500, 
  chickpea: 5100, coffee: 18000
};

exports.getMarketPrice = (cropName) => {
  if (!cropName) return null;
  
  const crop = cropName.toLowerCase();
  const basePrice = MARKET_PRICES[crop] || 2000; // Default fallback
  
  // Add ±5% fluctuation
  const fluctuation = (Math.random() * 0.1) - 0.05; 
  const livePrice = Math.floor(basePrice * (1 + fluctuation));
  
  return livePrice;
};