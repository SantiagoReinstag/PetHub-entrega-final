const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const authMiddleware = require('../middle/authMiddleware');
const agregarPermisos = require('../middle/agregarPermisos'); 
const verificarPermiso = require('../middle/verificarpermiso');

router.use(authMiddleware);
router.use(agregarPermisos);

router.get('/', verificarPermiso('ver_mascotas'), mascotaController.obtenerMascotas);
router.post('/', verificarPermiso('crear_mascotas'), mascotaController.crearMascota);
router.put('/:id', verificarPermiso('editar_mascotas'), mascotaController.actualizarMascota);
router.patch('/desactivar/:id', verificarPermiso('borrar_mascotas'), mascotaController.desactivarMascota);
router.delete('/:id', verificarPermiso('borrar_mascotas'), mascotaController.eliminarMascota);

module.exports = router;
