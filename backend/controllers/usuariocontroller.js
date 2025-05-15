const db = require('../db');
const bcrypt = require('bcryptjs');

const createUsuario = async (req, res) => {
  let { nombre, email, password, rol_id } = req.body;
  if (!rol_id) rol_id = 2;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [nuevoUsuario] = await db('usuarios')
      .insert({
        nombre,
        email,
        password: hashedPassword,
        rol_id,
        activo: true,
      })
      .returning(['id', 'nombre', 'email']);

    res.json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const getUsuarios = async (req, res) => {
  try {
    if (req.user.rol === 1 || req.user.rol === 'admin') {
      const usuarios = await db('usuarios')
        .select('id', 'nombre', 'email')
        .where('activo', true);
      res.json(usuarios);
    } else {
      const usuario = await db('usuarios')
        .select('id', 'nombre', 'email')
        .where({ id: req.user.id, activo: true })
        .first();

      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

      res.json([usuario]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const desactivarUsuario = async (req, res) => {
  const { id } = req.params;

  if (req.user.rol !== 1 && req.user.id !== Number(id)) {
    return res.status(403).json({ mensaje: 'No autorizado para desactivar este usuario' });
  }

  try {
    const usuario = await db('usuarios').where({ id, activo: true }).first();
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado o ya desactivado' });

    await db('usuarios').where({ id }).update({ activo: false });

    // Desactivar mascotas del usuario
    await db('mascotas').where({ usuario_id: id }).update({ activo: false });

    // Desactivar citas del usuario
    await db('citas').where({ usuario_id: id }).update({ activo: false });

    res.json({ mensaje: 'Usuario desactivado y registros relacionados desactivados' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al desactivar usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  if (req.user.rol !== 1)
    return res.status(403).json({ mensaje: 'Solo admins pueden eliminar usuarios definitivamente' });

  const { id } = req.params;

  try {
    const usuario = await db('usuarios').where({ id }).first();
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    await db('usuarios').where({ id }).del();

    await db('mascotas').where({ usuario_id: id }).del();
    await db('citas').where({ usuario_id: id }).del();

    res.json({ mensaje: 'Usuario eliminado definitivamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

module.exports = { createUsuario, getUsuarios, desactivarUsuario, eliminarUsuario };
