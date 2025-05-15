const db = require('../db');

const citaController = {
  obtenerCitas: async (req, res) => {
    try {
      let citas;
      if (req.user.rol === 1) {  // admin
        citas = await db('citas').where('activo', true).select('*');
      } else {
        citas = await db('citas')
          .where('usuario_id', req.user.id)
          .andWhere('activo', true);
      }
      res.json(citas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al obtener citas' });
    }
  },

  crearCita: async (req, res) => {
    const { fecha_cita, motivo, mascota_id } = req.body;
    try {
      // Verificar que la mascota exista y esté activa
      const mascota = await db('mascotas')
        .where({ id: mascota_id, activo: true })
        .first();

      if (!mascota) {
        return res.status(404).json({ mensaje: 'Mascota no encontrada o desactivada' });
      }

      // Si no es admin, validar que la mascota pertenezca al usuario
      if (req.user.rol !== 1 && mascota.usuario_id !== req.user.id) {
        return res.status(403).json({ mensaje: 'No autorizado para crear cita para esta mascota' });
      }

      await db('citas').insert({
        fecha_cita,
        motivo,
        mascota_id,
        usuario_id: req.user.id,
        activo: true
      });
      res.status(201).json({ mensaje: 'Cita creada' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al crear cita' });
    }
  },

  actualizarCita: async (req, res) => {
    const { id } = req.params;
    const { fecha_cita, motivo, mascota_id, asistio } = req.body;

    try {
      let cita;
      if (req.user.rol === 1) {  // admin
        cita = await db('citas').where({ id, activo: true }).first();
      } else {
        cita = await db('citas').where({ id, usuario_id: req.user.id, activo: true }).first();
      }

      if (!cita) return res.status(403).json({ mensaje: 'No autorizado' });

      // Si la mascota_id cambia, verificar que la nueva mascota pertenezca al usuario (o admin)
      if (mascota_id && req.user.rol !== 1) {
        const nuevaMascota = await db('mascotas').where({ id: mascota_id, activo: true }).first();
        if (!nuevaMascota) {
          return res.status(404).json({ mensaje: 'Nueva mascota no encontrada o desactivada' });
        }
        if (nuevaMascota.usuario_id !== req.user.id) {
          return res.status(403).json({ mensaje: 'No autorizado para asignar esta mascota a la cita' });
        }
      }

      const camposActualizar = {
        fecha_cita,
        motivo,
        mascota_id
      };

      // Solo admin puede modificar "asistio"
      if (req.user.rol === 1) {
        camposActualizar.asistio = asistio;
      }

      await db('citas').where({ id }).update(camposActualizar);

      res.json({ mensaje: 'Cita actualizada' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al actualizar cita' });
    }
  },

  desactivarCita: async (req, res) => {
    const { id } = req.params;

    try {
      let cita;
      if (req.user.rol === 1) {  // admin
        cita = await db('citas').where({ id, activo: true }).first();
      } else {
        cita = await db('citas').where({ id, usuario_id: req.user.id, activo: true }).first();
      }

      if (!cita) return res.status(403).json({ mensaje: 'No autorizado' });

      await db('citas').where({ id }).update({ activo: false });

      res.json({ mensaje: 'Cita desactivada (soft delete)' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al desactivar cita' });
    }
  },

  eliminarCita: async (req, res) => {
    const { id } = req.params;

    try {
      let cita;
      if (req.user.rol === 1) {  // admin
        cita = await db('citas').where({ id }).first();
      } else {
        cita = await db('citas').where({ id, usuario_id: req.user.id }).first();
      }

      if (!cita) return res.status(403).json({ mensaje: 'No autorizado' });

      await db('citas').where({ id }).del();
      res.json({ mensaje: 'Cita eliminada definitivamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al eliminar cita' });
    }
  }
};

module.exports = citaController;
