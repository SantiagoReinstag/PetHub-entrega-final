const obtenerPermisos = require('../utils/obtenerPermisos');

const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      const usuario = req.user;

      if (!usuario || !usuario.rol) {
        return res.status(403).json({ mensaje: "Rol no identificado" });
      }

      const permisos = await obtenerPermisos(usuario.rol);

      if (!permisos.includes(permisoRequerido)) {
        return res.status(403).json({ mensaje: "No tienes permiso para esta acción" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error verificando permisos" });
    }
  };
};

module.exports = verificarPermiso;
