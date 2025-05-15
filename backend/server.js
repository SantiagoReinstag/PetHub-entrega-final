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

// Middleware para parsear JSON
app.use(express.json());

// Sesión
app.use(session({
  secret: 'secreto_super_seguro', // puedes usar process.env.SESSION_SECRET también
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // ponlo en true si usas HTTPS
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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
