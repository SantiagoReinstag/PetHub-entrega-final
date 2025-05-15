const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middle/authMiddleware');
const verificarPermiso = require('../middle/verificarpermiso');

router.post('/signup', usuarioController.createUsuario);

// Ruta protegida con roles
router.get(
  '/',
  authMiddleware,
  verificarPermiso('ver_usuarios'),
  usuarioController.getUsuarios
);

// Soft delete (desactivar usuario)
router.patch(
  '/desactivar/:id',
  authMiddleware,
  verificarPermiso('borrar_usuarios'),
  usuarioController.desactivarUsuario
);

// Delete definitivo (solo admin)
router.delete(
  '/:id',
  authMiddleware,
  verificarPermiso('borrar_usuarios'),
  usuarioController.eliminarUsuario
);

module.exports = router;
