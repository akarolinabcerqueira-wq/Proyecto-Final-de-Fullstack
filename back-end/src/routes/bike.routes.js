import express from 'express';
import {
  createBike,
  getBikes,
  getBikeById,
  updateBike,
  deleteBike,
  toggleSold,
  getMyBikes
} from '../controllers/bike.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const storage = multer.diskStorage({});
const upload = multer({ storage });

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
router.post('/', authMiddleware, upload.array('images'), createBike);
router.put('/:id', authMiddleware, updateBike);
router.delete('/:id', authMiddleware, deleteBike);

/**
 * Marcar bicicleta como vendida
 */
router.patch('/:id/toggle-sold', authMiddleware, toggleSold);


export default router;
