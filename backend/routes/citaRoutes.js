const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const authMiddleware = require('../middle/authMiddleware');
const verificarPermiso = require('../middle/verificarpermiso');

router.use(authMiddleware);

router.get('/', verificarPermiso('ver_citas'), citaController.obtenerCitas);
router.post('/', verificarPermiso('crear_citas'), citaController.crearCita);
router.put('/:id', verificarPermiso('editar_citas'), citaController.actualizarCita);

// Soft delete (desactivar)
router.patch(
  '/desactivar/:id',
  verificarPermiso('borrar_citas'),
  citaController.desactivarCita
);

// Delete definitivo (solo admin)
router.delete(
  '/:id',
  verificarPermiso('borrar_citas'),
  citaController.eliminarCita
);

module.exports = router;
