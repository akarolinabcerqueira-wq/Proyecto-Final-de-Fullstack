import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";               
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

console.log("ENV TEST:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

// Mount user routes AFTER app is imported
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
