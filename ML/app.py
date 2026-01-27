from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os
import uvicorn

# -------------------- APP INIT --------------------
app = FastAPI(title="Crop Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- LOAD ARTIFACTS --------------------
MODEL_PATH = "./crop_model.pkl"
SCALER_PATH = "./scaler.pkl"
ENCODER_PATH = "./label_encoder.pkl"

assert os.path.exists(MODEL_PATH), "❌ crop_model.pkl not found"
assert os.path.exists(SCALER_PATH), "❌ scaler.pkl not found"
assert os.path.exists(ENCODER_PATH), "❌ crop_label_encoder.pkl not found"

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
encoder = joblib.load(ENCODER_PATH)

# -------------------- REQUEST SCHEMA --------------------
class CropInput(BaseModel):
    nitrogen: float = Field(..., ge=0, le=200)
    phosphorous: float = Field(..., ge=0, le=200)
    potassium: float = Field(..., ge=0, le=200)
    temperature: float = Field(..., ge=-10, le=60)
    humidity: float = Field(..., ge=0, le=100)
    ph: float = Field(..., ge=0, le=14)
    rainfall: float = Field(..., ge=0, le=500)

# -------------------- HEALTH CHECK --------------------
@app.get("/")
def health():
    return {"status": "✅ Crop Recommendation API is running"}

# -------------------- PREDICTION --------------------
@app.post("/predict")
def predict_crop(data: CropInput):
    # 1️⃣ Raw input
    features = np.array([[  
        data.nitrogen,
        data.phosphorous,
        data.potassium,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]])

    # 2️⃣ Scale input (CRITICAL)
    features_scaled = scaler.transform(features)

    # 3️⃣ Prediction
    pred = model.predict(features_scaled)
    crop = encoder.inverse_transform(pred)[0]

    # 4️⃣ Top-3 probabilities
    probs = model.predict_proba(features_scaled)[0]
    top_idx = np.argsort(probs)[::-1][:3]
    top_crops = encoder.inverse_transform(top_idx)

    return {
        "recommended_crop": crop,
        "top_3_crops": top_crops.tolist(),
        "confidence": round(float(probs[top_idx[0]]), 4)
    }

# -------------------- RUN SERVER --------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port)




# python -m pip install -r requirements.txt
#  python -m uvicorn app:app --reload --port 8000