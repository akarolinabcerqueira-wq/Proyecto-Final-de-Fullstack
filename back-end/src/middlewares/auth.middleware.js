import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware de autenticación
 * Comprueba si el usuario está logueado mediante JWT
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Usuario no válido",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

/**
 * Middleware para comprobar rol de administrador
 */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo admin" });
  }
  next();
};
