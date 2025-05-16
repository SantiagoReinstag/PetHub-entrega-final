const db = require('../db');

const mascotaController = {
  obtenerMascotas: async (req, res) => {
    try {
      let mascotas;
      if (req.user.rol === 1) {
        mascotas = await db('mascotas').where('activo', true).select('*');
      } else {
        mascotas = await db('mascotas')
          .where('usuario_id', req.user.id)
          .andWhere('activo', true)
          .select('*');
      }
      res.json(mascotas);
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al obtener mascotas' });
    }
  },

  crearMascota: async (req, res) => {
    const { nombre, tipo, edad } = req.body;
    try {
      const [{id}] = await db('mascotas')
        .insert({
          nombre,
          tipo,
          edad,
          usuario_id: req.user.id,
          activo: true,
        })
        .returning('id');

      const nuevaMascota = await db('mascotas').where({ id }).first();
      res.status(201).json(nuevaMascota);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al crear mascota' });
    }
  },

  actualizarMascota: async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, edad } = req.body;
    try {
      let mascota;
      if (req.user.rol === 1) {
        mascota = await db('mascotas').where({ id, activo: true }).first();
      } else {
        mascota = await db('mascotas')
          .where({ id, usuario_id: req.user.id, activo: true })
          .first();
      }

      if (!mascota) return res.status(403).json({ mensaje: 'No autorizado' });

      await db('mascotas').where({ id }).update({ nombre, tipo, edad });

      const mascotaActualizada = await db('mascotas').where({ id }).first();
      res.json(mascotaActualizada);
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al actualizar mascota' });
    }
  },

  desactivarMascota: async (req, res) => {
    const { id } = req.params;
    try {
      let mascota;
      if (req.user.rol === 1) {
        mascota = await db('mascotas').where({ id, activo: true }).first();
      } else {
        mascota = await db('mascotas')
          .where({ id, usuario_id: req.user.id, activo: true })
          .first();
      }

      if (!mascota) return res.status(403).json({ mensaje: 'No autorizado' });

      await db('mascotas').where({ id }).update({ activo: false });

      await db('citas').where({ mascota_id: id }).update({ activo: false });

      res.json({ mensaje: 'Mascota y sus citas desactivadas (soft delete)' });
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al desactivar mascota' });
    }
  },

  eliminarMascota: async (req, res) => {
    if (req.user.rol !== 1)
      return res.status(403).json({ mensaje: 'Solo admins pueden borrar mascotas definitivamente' });

    const { id } = req.params;
    try {
      const mascota = await db('mascotas').where({ id }).first();
      if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });

      await db('mascotas').where({ id }).del();
      await db('citas').where({ mascota_id: id }).del();

      res.json({ mensaje: 'Mascota y sus citas eliminadas definitivamente' });
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al eliminar mascota' });
    }
  },
};

module.exports = mascotaController;
