const db = require("../db");

const obtenerPermisos = async (rolId) => {
  const permisos = await db("rol_permiso")
    .join("permisos", "rol_permiso.permiso_id", "permisos.id")
    .where("rol_permiso.rol_id", rolId)
    .select("permisos.nombre");

  return permisos.map(p => p.nombre);
};

module.exports = obtenerPermisos;
