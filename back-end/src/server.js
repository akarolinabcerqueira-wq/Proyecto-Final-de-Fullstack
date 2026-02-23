import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import bikeRoutes from "./routes/bike.routes.js";

// Debug
console.log("ENV TEST:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bikes", bikeRoutes);

// Connect DB
connectDB();

export default app;
