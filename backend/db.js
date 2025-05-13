const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});

// Prueba de conexión
db.raw('SELECT 1')
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error de conexión a la base de datos:', err));

module.exports = db;
