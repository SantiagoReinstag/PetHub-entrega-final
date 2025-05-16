const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  res.setHeader("X-Middleware-Activo", "true"); 
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensaje: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token mal formado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user from token:', decoded);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
