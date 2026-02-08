/**
 * Middleware para manejar errores del servidor
 */
const error500 = (err, req, res, next) => {
  res.status(500).json({
    message: 'Error interno del servidor'
  });
};

export default error500;
