import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

app.use("/api/users", userRoutes);

dotenv.config();
console.log("ENV TEST:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
