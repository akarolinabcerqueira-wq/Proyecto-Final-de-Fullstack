import dotenv from "dotenv";
dotenv.config(); // <-- Vercel injects env vars automatically

import app from "./app.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

// Debug (optional)
console.log("ENV TEST:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

// Routes
app.use("/api/users", userRoutes);

// Connect to DB
connectDB();

export default app; // <-- REQUIRED for Vercel
