import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * REGISTRO
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña obligatorios",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    await User.create({
      email,
      password,
      whatsapp,
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password, whatsapp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        whatsapp: user.whatsapp,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al hacer login",
    });
  }
};
