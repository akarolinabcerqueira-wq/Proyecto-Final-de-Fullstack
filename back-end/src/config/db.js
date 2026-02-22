import mongoose from 'mongoose';

/* --------------------------------------------------
   CONEXIÓN A MONGODB
   Usa la URI definida en variables de entorno
-------------------------------------------------- */
export const connectDB = async () => {
  try {
    // Intentar conexión con la base de datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectada');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1); // Detener servidor si falla la conexión
  }
};
