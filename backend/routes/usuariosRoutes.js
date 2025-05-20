const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middle/authMiddleware');
const agregarPermisos= require("../middle/agregarPermisos")
const verificarPermiso = require('../middle/verificarpermiso');

router.post('/signup', usuarioController.createUsuario);



router.use(authMiddleware);
router.use(agregarPermisos);


router.get('/', usuarioController.getUsuarios);


router.get('/:id', usuarioController.getUsuarioPorId);

router.patch(
  '/desactivar/:id',
  verificarPermiso('desactivar_cuenta'),
  usuarioController.desactivarUsuario
);


router.delete(
  '/:id',
  verificarPermiso('borrar_usuarios'),
  usuarioController.eliminarUsuario
);

module.exports = router;