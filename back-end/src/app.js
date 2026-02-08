import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import bikeRoutes from './routes/bike.routes.js';

import error404 from './middlewares/error404.js';
import error500 from './middlewares/error500.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);

// Middleware 404 (si no coincide ninguna ruta)
app.use(error404);

// Middleware 500
app.use(error500);

export default app;
