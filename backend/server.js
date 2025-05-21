require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 3001;


const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const citaRoutes = require('./routes/citaRoutes');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json());

// Sesión
app.use(session({
  secret: 'secreto_super_seguro', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  }
}));

// Rutas
app.use('/users', usuariosRoutes); 
app.use('/auth', authRoutes);
app.use('/mascotas', mascotaRoutes);
app.use('/citas', citaRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, PetHub! El servidor está corriendo.');
});
const cron = require('node-cron');
const actualizarCitasPasadas = require('./middle/cronjobCitas');

cron.schedule('*/10 * * * *', () => {
  actualizarCitasPasadas();
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
