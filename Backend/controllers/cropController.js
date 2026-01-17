const axios = require("axios");

exports.recommendCrop = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "ML service error" });
  }
};
