/**
 * Middleware para manejar rutas no encontradas
 */
const error404 = (req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
};

export default error404;
