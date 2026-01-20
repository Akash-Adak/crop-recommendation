require("dotenv").config();
import express, { json } from "express";
import cors from "cors";
import cropRoutes from "./routes/cropRoutes.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/crop", cropRoutes);

app.listen(5000, () => {
  console.log("Node server running on port 5000");
});


export default app;