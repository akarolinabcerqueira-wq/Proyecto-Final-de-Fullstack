import User from "../models/User.js";

/* --------------------------------------------------
   OBTENER TODOS LOS USUARIOS (ADMIN)
   Devuelve lista sin contraseñas
-------------------------------------------------- */
export const getAllUsers = async (req, res) => {
  try {
    // Buscar todos los usuarios y ocultar el campo password
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

/* --------------------------------------------------
   ELIMINAR USUARIO (ADMIN)
-------------------------------------------------- */
export const deleteUser = async (req, res) => {
  try {
    // Eliminar usuario por ID
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
