import { useState } from "react";
import { recommendCrop } from "./api";

function CropForm() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nitrogen: 90,
      phosphorous: 42,
      potassium: 43,
      temperature: 20.8,
      humidity: 82,
      ph: 6.5,
      rainfall: 202
    };

    const res = await recommendCrop(data);
    setResult(res);
  };

  return (
    <div>
      <button onClick={handleSubmit}>Recommend Crop</button>

      {result && (
        <>
          <h3>Best Crop: {result.recommended_crop}</h3>
          <ul>
            {result.top_3_crops.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CropForm;
