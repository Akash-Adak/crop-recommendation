require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cropRoutes = require("./routes/cropRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/crop", cropRoutes);

app.listen(5000, () => {
  console.log("Node server running on port 5000");
});
