import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/auth.middleware.js";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllUsers);
router.delete("/:id", authMiddleware, adminOnly, deleteUser);

export default router;
