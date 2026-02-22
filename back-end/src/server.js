import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import app from "./app.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

/* --------------------------------------------------
   DEBUG: Verificar variables de entorno de Cloudinary
-------------------------------------------------- */
console.log("ENV TEST:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

/* --------------------------------------------------
   RUTAS DE USUARIO
   (Se montan después de cargar la app)
-------------------------------------------------- */
app.use("/api/users", userRoutes);

/* --------------------------------------------------
   INICIAR SERVIDOR
-------------------------------------------------- */
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
