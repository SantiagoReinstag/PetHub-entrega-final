const db = require('../db');


const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      const usuarioId = req.user.id;
      const rolId = req.user.rol;

      const permisos = await db('rol_permiso')
        .join('permisos', 'rol_permiso.permiso_id', 'permisos.id')
        .where('rol_permiso.rol_id', rolId)
        .select('permisos.nombre');

      const nombresPermisos = permisos.map(p => p.nombre);

      if (!nombresPermisos.includes(permisoRequerido)) {
        return res.status(403).json({ mensaje: 'No tienes permiso para esta acción' });
      }

      next();
    } catch (error) {
      console.error('Error en permisoMiddleware:', error);
      res.status(500).json({ mensaje: 'Error en validación de permisos' });
    }
  };
};

module.exports = verificarPermiso;
