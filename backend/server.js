process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
dotenv.config();

import contentRoutes from "./routes/content.js";
import favoriteRoutes from "./routes/favorites.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api", contentRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
