import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./util/db.js";
import cropRoutes from "./routes/cropRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// DB
connectDb();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use("/api/crop", cropRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
