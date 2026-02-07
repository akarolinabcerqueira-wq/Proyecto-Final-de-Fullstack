import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas (luego las creamos)
app.get('/', (req, res) => {
  res.json({ message: 'API de Bicicletas funcionando' });
});

export default app;
