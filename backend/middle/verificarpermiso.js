const verificarPermiso = (permisoRequerido) => {
  return (req, res, next) => {
    try {
      const permisos = req.user.permisos;

      if (!permisos || !Array.isArray(permisos)) {
        return res.status(403).json({ mensaje: 'Permisos no disponibles' });
      }

      if (!permisos.includes(permisoRequerido)) {
        return res.status(403).json({ mensaje: 'No tienes permiso para esta acción' });
      }

      next();
    } catch (error) {
      console.error('Error en verificarPermiso:', error);
      res.status(500).json({ mensaje: 'Error en validación de permisos' });
    }
  };
};

module.exports = verificarPermiso;
