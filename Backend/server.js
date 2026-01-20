import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cropRoutes from "./routes/cropRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/crop", cropRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});

export default app;
