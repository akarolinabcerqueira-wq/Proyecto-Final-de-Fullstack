import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import bikeRoutes from './routes/bike.routes.js';


const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Bicicletas funcionando' });
});

export default app;