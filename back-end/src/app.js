import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import bikeRoutes from "./routes/bike.routes.js";
import userRoutes from "./routes/user.routes.js";

import error404 from "./middlewares/error404.js";
import error500 from "./middlewares/error500.js";

import helmet from "helmet";


const app = express();
app.use(helmet());
// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/users", userRoutes);

// Middleware 404
app.use(error404);

// Middleware 500
app.use(error500);

export default app;
