import express from 'express';
import {
  createBike,
  getBikes,
  getBikeById,
  updateBike,
  deleteBike,
  markAsSold,
  getMyBikes
} from '../controllers/bike.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Bicicletas del usuario logueado
 * IMPORTANTE: va ANTES de "/:id"
 */
router.get('/mine', authMiddleware, getMyBikes);

/**
 * Rutas públicas
 */
router.get('/', getBikes);
router.get('/:id', getBikeById);

/**
 * Rutas protegidas
 */
router.post('/', authMiddleware, createBike);
router.put('/:id', authMiddleware, updateBike);
router.delete('/:id', authMiddleware, deleteBike);

/**
 * Marcar bicicleta como vendida
 */
router.patch('/:id/sold', authMiddleware, markAsSold);

export default router;
