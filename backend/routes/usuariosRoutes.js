const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middle/authMiddleware');
const verificarPermiso = require('../middle/verificarpermiso');

router.post('/signup', usuarioController.createUsuario);


router.get(
  '/',
  authMiddleware,
  usuarioController.getUsuarios
);


router.get(
  '/:id',
  authMiddleware,
  usuarioController.getUsuarioPorId
);

router.patch(
  '/desactivar/:id',
  authMiddleware,
  verificarPermiso('borrar_usuarios'),
  usuarioController.desactivarUsuario
);

router.delete(
  '/:id',
  authMiddleware,
  verificarPermiso('borrar_usuarios'),
  usuarioController.eliminarUsuario
);

module.exports = router;
