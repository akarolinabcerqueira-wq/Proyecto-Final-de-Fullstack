import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

/* --------------------------------------------------
   CONFIGURACIÓN DE CLOUDINARY
   Se cargan las credenciales desde variables de entorno
-------------------------------------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* Log opcional para verificar configuración */
console.log("Cloudinary config:", cloudinary.config());

/* --------------------------------------------------
   EXPORTAR INSTANCIA CONFIGURADA
-------------------------------------------------- */
export default cloudinary;
