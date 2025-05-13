const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');

app.use(express.json()); 
app.use('/users', userRoutes); 

app.get('/', (req, res) => {
  res.send('¡Hola, PetHub! El servidor está corriendo.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
