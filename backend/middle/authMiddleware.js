const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensaje: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token mal formado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Datos del usuario para usar en rutas protegidas
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
