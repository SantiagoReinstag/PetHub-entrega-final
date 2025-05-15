require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;

const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes')
const citaRoutes= require('./routes/citaRoutes')

app.use(express.json()); 
app.use('/users', usuariosRoutes); 
app.use('/auth', authRoutes);
app.use('/mascotas', mascotaRoutes);
app.use('/citas', citaRoutes)

app.get('/', (req, res) => {
  res.send('¡Hola, PetHub! El servidor está corriendo.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
