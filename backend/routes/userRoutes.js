const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Esto es correcto

// Ruta para crear usuario
router.post('/signup', userController.createUser);

// Ruta para login 
router.post('/login', (req, res) => {
  res.send('Login exitoso');
});

// Ruta para obtener usuarios 
router.get('/', (req, res) => {
  res.send('Lista de usuarios');
});

module.exports = router;
