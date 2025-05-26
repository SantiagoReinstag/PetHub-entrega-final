const express = require('express');
const router = express.Router();

const citaController = require('../controllers/citaController');
const verificarPermiso = require('../middle/verificarpermiso');
const authMiddleware = require('../middle/authMiddleware');
const agregarPermisos = require('../middle/agregarPermisos');

// Middleware global para autenticación y agregar permisos
router.use(authMiddleware);
router.use(agregarPermisos);

// Rutas de citas

// Admin: ver todas las citas (permiso ver_citas_admin)
router.get(
  '/admin',
  verificarPermiso('ver_citas_admin'),
  citaController.obtenerTodasCitasAdmin
);

// Usuario: obtener citas activas (permiso ver_citas)
router.get(
  '/activas',
  verificarPermiso('ver_citas'),
  citaController.obtenerCitasActivasUsuario
);

// Usuario: obtener citas inactivas (permiso ver_citas)
router.get(
  '/inactivas',
  verificarPermiso('ver_citas'),
  citaController.obtenerCitasInactivasUsuario
);

// Crear cita (permiso crear_cita)
router.post(
  '/',
  verificarPermiso('crear_cita'),
  citaController.crearCita
);

// Actualizar cita (permiso editar_cita)
router.put(
  '/:id',
  verificarPermiso('editar_citas'),
  citaController.actualizarCita
);

// Desactivar cita (permiso desactivar_cita)
router.patch(
  '/desactivar/:id',
  verificarPermiso('desactivar_cita'),
  citaController.desactivarCita
);

// Eliminar cita (permiso eliminar_cita)
router.delete(
  '/:id',
  verificarPermiso('borrar_citas'),
  citaController.eliminarCita
);

module.exports = router;
