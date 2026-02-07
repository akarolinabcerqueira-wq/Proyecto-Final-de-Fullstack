import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Registro de usuario
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y contraseña son obligatorios'
      });
    }

    // Comprobar si el usuario ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        message: 'El usuario ya existe'
      });
    }

    // Crear usuario
    const user = await User.create({
      email,
      password
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar usuario'
    });
  }
};

/**
 * Login de usuario
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y contraseña son obligatorios'
      });
    }

    // Buscar usuario
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales incorrectas'
      });
    }

    // Comparar contraseña
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Credenciales incorrectas'
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      message: 'Login correcto',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error en el login'
    });
  }
};
