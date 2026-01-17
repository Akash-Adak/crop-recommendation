from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

model = joblib.load("crop_model.pkl")
encoder = joblib.load("crop_label_encoder.pkl")

@app.post("/predict")
def predict_crop(data: dict):
    features = np.array([[
        data["nitrogen"],
        data["phosphorous"],
        data["potassium"],
        data["temperature"],
        data["humidity"],
        data["ph"],
        data["rainfall"]
    ]])

    pred = model.predict(features)
    crop = encoder.inverse_transform(pred)[0]

    probs = model.predict_proba(features)[0]
    top_idx = np.argsort(probs)[::-1][:3]
    top_crops = encoder.inverse_transform(top_idx)

    return {
        "recommended_crop": crop,
        "top_3_crops": top_crops.tolist()
    }




# python -m pip install -r requirements.txt
#  python -m uvicorn app:app --reload --port 8000

