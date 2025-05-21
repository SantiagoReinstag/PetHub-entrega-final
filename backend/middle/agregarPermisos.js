const db = require("../db");

const obtenerPermisos = async (rolId) => {
  const filas = await db('permisos')
    .join('rol_permiso', 'permisos.id', 'rol_permiso.permiso_id')
    .where('rol_permiso.rol_id', rolId)
    .select('permisos.nombre');

  return filas.map(p => p.nombre);
};

const agregarPermisos = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const usuario = await db('usuarios').where({ id: req.user.id }).first();

    if (!usuario || !usuario.activo) {
      return res.status(403).json({ mensaje: 'Usuario desactivado o inexistente' });
    }

    req.user.rol = usuario.rol_id;

    const permisos = await obtenerPermisos(usuario.rol_id);
    req.user.permisos = permisos;

    next();
  } catch (error) {
    console.error('Error al agregar permisos:', error);
    res.status(500).json({ mensaje: 'Error al cargar permisos del usuario' });
  }
};

module.exports = agregarPermisos; 
