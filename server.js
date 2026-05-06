import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";



dotenv.config();

const app = express();

connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/dashboard", dashboardRoutes);

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});