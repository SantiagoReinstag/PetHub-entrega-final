const db = require('../db');

const ROLES = {
  ADMIN: 1,
  USUARIO: 2
};

const citaController = {
  obtenerTodasCitasAdmin: async (req, res) => {
    try {
      if (req.user.rol !== ROLES.ADMIN) {
        return res.status(403).json({ mensaje: 'No autorizado' });
      }

      const citas = await db('citas').select('*');
      res.json(citas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al obtener citas' });
    }
  },

  obtenerCitasActivasUsuario: async (req, res) => {
    try {
      const citas = await db('citas')
        .where({ usuario_id: req.user.id, activo: true });
      res.json(citas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al obtener citas activas' });
    }
  },

  obtenerCitasInactivasUsuario: async (req, res) => {
    try {
      const citas = await db('citas')
        .where({ usuario_id: req.user.id, activo: false });
      res.json(citas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al obtener citas inactivas' });
    }
  },

  crearCita: async (req, res) => {
    const { fecha, hora, descripcion, mascotaId } = req.body;

    try {
      const mascota = await db('mascotas')
        .where({ id: mascotaId, activo: true })
        .first();

      if (!mascota) {
        return res.status(404).json({ mensaje: 'Mascota no encontrada o desactivada' });
      }

      if (req.user.rol !== ROLES.ADMIN && mascota.usuario_id !== req.user.id) {
        return res.status(403).json({ mensaje: 'No autorizado para crear cita para esta mascota' });
      }

      const fecha_cita = new Date(`${fecha}T${hora}:00`);

      if (isNaN(fecha_cita.getTime())) {
        return res.status(400).json({ mensaje: 'Fecha o hora inválida' });
      }

      if (req.user.rol === ROLES.USUARIO) {
        const ahora = new Date();
        const diferenciaHoras = (fecha_cita - ahora) / (1000 * 60 * 60);
        if (diferenciaHoras < 12) {
          return res.status(400).json({
            mensaje: 'Los usuarios deben programar la cita con al menos 12 horas de anticipación'
          });
        }
      }

      const [{ id: nuevaId }] = await db('citas').insert({
        fecha_cita,
        motivo: descripcion,
        mascota_id: mascotaId,
        usuario_id: req.user.id,
        activo: true
      }).returning('id');

      const nuevaCita = await db('citas').where({ id: nuevaId }).first();

      res.status(201).json(nuevaCita);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al crear cita' });
    }
  },

  actualizarCita: async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, descripcion, mascotaId, asistio } = req.body;

    try {
      const cita = req.user.rol === ROLES.ADMIN
        ? await db('citas').where({ id: parseInt(id), activo: true }).first()
        : await db('citas').where({ id: parseInt(id), usuario_id: req.user.id, activo: true }).first();

      if (!cita) return res.status(403).json({ mensaje: 'No autorizado o cita no encontrada' });

      if (mascotaId && req.user.rol !== ROLES.ADMIN) {
        const nuevaMascota = await db('mascotas').where({ id: mascotaId, activo: true }).first();
        if (!nuevaMascota || nuevaMascota.usuario_id !== req.user.id) {
          return res.status(403).json({ mensaje: 'No autorizado para asignar esta mascota' });
        }
      }

      const camposActualizar = {};

      if (fecha !== undefined && hora !== undefined) {
        const nuevaFechaCita = new Date(`${fecha}T${hora}:00`);
        if (isNaN(nuevaFechaCita.getTime())) {
          return res.status(400).json({ mensaje: 'Fecha o hora inválida' });
        }

        if (req.user.rol === ROLES.USUARIO) {
          const ahora = new Date();
          const diferenciaHoras = (nuevaFechaCita - ahora) / (1000 * 60 * 60);
          if (diferenciaHoras < 12) {
            return res.status(400).json({
              mensaje: 'Los usuarios deben reprogramar la cita con al menos 12 horas de anticipación'
            });
          }
        }

        camposActualizar.fecha_cita = nuevaFechaCita;
      } else if (fecha !== undefined || hora !== undefined) {
        return res.status(400).json({ mensaje: 'Se requieren fecha y hora para actualizar la cita' });
      }

      if (descripcion !== undefined) camposActualizar.motivo = descripcion;
      if (mascotaId !== undefined) camposActualizar.mascota_id = mascotaId;
      if (req.user.rol === ROLES.ADMIN && asistio !== undefined) camposActualizar.asistio = asistio;

      if (Object.keys(camposActualizar).length === 0) {
        return res.status(400).json({ mensaje: 'No hay campos para actualizar' });
      }

      await db('citas').where({ id: parseInt(id) }).update(camposActualizar);
      res.json({ mensaje: 'Cita actualizada' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al actualizar cita' });
    }
  },

  desactivarCita: async (req, res) => {
    const { id } = req.params;

    try {
      const cita = req.user.rol === ROLES.ADMIN
        ? await db('citas').where({ id: parseInt(id), activo: true }).first()
        : await db('citas').where({ id: parseInt(id), usuario_id: req.user.id, activo: true }).first();

      if (!cita) return res.status(403).json({ mensaje: 'No autorizado o cita no encontrada' });

      await db('citas').where({ id: parseInt(id) }).update({ activo: false });
      res.json({ mensaje: 'Cita desactivada (soft delete)' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al desactivar cita' });
    }
  },

  eliminarCita: async (req, res) => {
    const { id } = req.params;

    try {
      const cita = req.user.rol === ROLES.ADMIN
        ? await db('citas').where({ id: parseInt(id) }).first()
        : await db('citas').where({ id: parseInt(id), usuario_id: req.user.id }).first();

      if (!cita) return res.status(403).json({ mensaje: 'No autorizado o cita no encontrada' });

      await db('citas').where({ id: parseInt(id) }).del();
      res.json({ mensaje: 'Cita eliminada definitivamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al eliminar cita' });
    }
  }
};

module.exports = citaController;
