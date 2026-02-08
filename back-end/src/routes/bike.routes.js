import express from "express";
import {
  createBike,
  getBikes,
  getBikeById,
  updateBike,
  deleteBike,
  markAsSold,
} from "../controllers/bike.controller.js";

import {
  createBike,
  getBikes,
  getBikeById,
  updateBike,
  deleteBike,
  markAsSold,
  getMyBikes,
} from "../controllers/bike.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
/**
 * Bicicletas del usuario logueado
 */
router.get("/mine", authMiddleware, getMyBikes);

/**
 * Rutas públicas
 */
router.get("/", getBikes);
router.get("/:id", getBikeById);

/**
 * Rutas protegidas (usuario logueado)
 */
router.post("/", authMiddleware, createBike);
router.put("/:id", authMiddleware, updateBike);
router.delete("/:id", authMiddleware, deleteBike);

/**
 * Marcar bicicleta como vendida
 */
router.patch("/:id/sold", authMiddleware, markAsSold);

export default router;
