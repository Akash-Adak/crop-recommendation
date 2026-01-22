const CropCard = ({ crop }) => {
  const getSeasonColor = (season) => {
    const colors = {
      'Kharif': 'bg-green-100 text-green-800',
      'Rabi': 'bg-blue-100 text-blue-800',
      'Zaid': 'bg-yellow-100 text-yellow-800',
      'All': 'bg-gray-100 text-gray-800'
    };
    return colors[season] || colors['All'];
  };

  return (
    <div className="card hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-green-50">
            <i className={`fas ${crop.icon} text-2xl text-farm-green`}></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
            <p className="text-gray-600">{crop.scientificName}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeasonColor(crop.season)}`}>
          {crop.season}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4">{crop.description}</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-thermometer-half text-gray-500"></i>
          <span className="text-sm">{crop.temperature}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-tint text-gray-500"></i>
          <span className="text-sm">{crop.rainfall} mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-cloud-sun text-gray-500"></i>
          <span className="text-sm">{crop.sunlight}</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-mountain text-gray-500"></i>
          <span className="text-sm">{crop.soilType}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-farm-green font-bold">
          Yield: <span className="text-2xl">{crop.yield}</span>
        </div>
        <button className="btn-primary text-sm py-2 px-4">
          View Details <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
    </div>
  );
};

export default CropCard;